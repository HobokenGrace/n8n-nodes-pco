import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  IPollFunctions,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { normalizeJsonApiResource, type JsonObject } from './jsonApi';
import { planningCenterApiRequest, type PlanningCenterCredentials } from './request';
import { extractResourceLocatorId } from './resourceLocator';

const STATE_KEY = 'planningCenterPollingState';
const STATE_VERSION = 1;
const EMPTY_WATERMARK = '1970-01-01T00:00:00.000Z';
const MAX_PAGE_SIZE = 100;
const RFC3339_WITH_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const N8N_LOCAL_DATE_TIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;

export type PollingCursorField = 'created_at' | 'updated_at';

export interface PollingField {
  name: string;
  sourceName: string;
  required: boolean;
  type: 'boolean' | 'number' | 'string';
  lookup?: unknown;
}

export interface PollingQueryOptionOperator {
  value: string;
  sourceName: string;
}

export interface PollingQueryOption {
  name: string;
  group: 'filter' | 'order' | 'include' | 'fields';
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: PollingQueryOptionOperator[];
  lookup?: unknown;
}

export interface PollingOperation {
  id: string;
  resource: string;
  cursorField: PollingCursorField;
  cursorSparseFieldSourceName?: string;
  path: string;
  pathParameters: PollingField[];
  ordinaryQueryFields?: PollingField[];
  queryOptions: PollingQueryOption[];
}

export interface PollingStateV1 {
  version: 1;
  initialized: true;
  fingerprint: string;
  cursorField: PollingCursorField;
  watermark: string;
  boundaryIdentities: string[];
}

interface QueryOptionSelection {
  operator?: string;
  value?: unknown;
}

interface ResolvedPollingConfiguration {
  operation: PollingOperation;
  path: string;
  startTime: string;
  batchSize: number;
  query: IDataObject;
  resultFilters: Record<string, unknown>;
  scope: Record<string, string>;
  sparseCursorOutputKey?: string;
}

interface ValidatedResource {
  raw: JsonObject;
  type: string;
  id: string;
  identity: string;
  cursor: string;
  cursorMs: number;
}

interface JsonApiPage {
  data?: unknown;
  links?: { next?: string | null };
  included?: unknown;
}

function stateError(context: IPollFunctions, detail: string): NodeOperationError {
  return new NodeOperationError(
    context.getNode(),
    `Planning Center polling state is ${detail}. Replace this trigger node to create fresh state, and configure Start Time if historical catch-up is required.`,
  );
}

export function canonicalStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
      .map(([key, nested]) => `${JSON.stringify(key)}:${canonicalStringify(nested)}`)
      .join(',')}}`;
  }
  const serialized = JSON.stringify(value);
  return serialized === undefined ? 'null' : serialized;
}

export function canonicalizeRfc3339(value: unknown, label = 'date-time'): string {
  if (typeof value !== 'string' || !RFC3339_WITH_OFFSET.test(value)) {
    throw new Error(`${label} must be a valid RFC 3339 date-time with an explicit offset.`);
  }
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    throw new Error(`${label} must be a valid RFC 3339 date-time with an explicit offset.`);
  }
  return new Date(timestamp).toISOString();
}

function canonicalizeStartTime(value: unknown, timezone: string): string {
  if (typeof value === 'string' && RFC3339_WITH_OFFSET.test(value)) {
    return canonicalizeRfc3339(value, 'Start Time');
  }
  const match = typeof value === 'string' ? N8N_LOCAL_DATE_TIME.exec(value) : null;
  if (!match) {
    throw new Error(`Start Time must be a valid date-time.`);
  }

  try {
    const [year, month, day, hour, minute, second] = match.slice(1).map(Number);
    const wallTime = Date.UTC(year, month - 1, day, hour, minute, second);
    const calendarCheck = new Date(wallTime);
    if (
      calendarCheck.getUTCFullYear() !== year ||
      calendarCheck.getUTCMonth() !== month - 1 ||
      calendarCheck.getUTCDate() !== day ||
      calendarCheck.getUTCHours() !== hour ||
      calendarCheck.getUTCMinutes() !== minute ||
      calendarCheck.getUTCSeconds() !== second
    ) {
      throw new Error('invalid calendar date');
    }

    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const wallTimeAt = (timestamp: number): number => {
      const parts = Object.fromEntries(
        formatter
          .formatToParts(timestamp)
          .filter((part) => part.type !== 'literal')
          .map((part) => [part.type, Number(part.value)]),
      );
      return Date.UTC(
        parts.year,
        parts.month - 1,
        parts.day,
        parts.hour,
        parts.minute,
        parts.second,
      );
    };

    let timestamp = wallTime;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const adjusted = wallTime - (wallTimeAt(timestamp) - timestamp);
      if (adjusted === timestamp) break;
      timestamp = adjusted;
    }
    if (wallTimeAt(timestamp) === wallTime) return new Date(timestamp).toISOString();
  } catch {
    // Fall through to the trigger's consistent validation error.
  }
  throw new Error('Start Time must be a valid date-time.');
}

function parseIdentity(value: string): [string, string] | undefined {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) &&
      parsed.length === 2 &&
      parsed.every((part) => typeof part === 'string' && part.length > 0)
      ? [parsed[0], parsed[1]]
      : undefined;
  } catch {
    return undefined;
  }
}

export function validatePollingState(
  context: IPollFunctions,
  value: unknown,
): PollingStateV1 | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw stateError(context, 'malformed');
  }
  const state = value as Record<string, unknown>;
  if (state.version !== STATE_VERSION) throw stateError(context, 'an unsupported version');
  let canonicalWatermark: string | undefined;
  try {
    canonicalWatermark = canonicalizeRfc3339(state.watermark, 'Polling watermark');
  } catch {
    throw stateError(context, 'malformed or internally inconsistent');
  }
  if (
    state.initialized !== true ||
    (state.cursorField !== 'created_at' && state.cursorField !== 'updated_at') ||
    typeof state.fingerprint !== 'string' ||
    !state.fingerprint ||
    typeof state.watermark !== 'string' ||
    canonicalWatermark !== state.watermark ||
    !Array.isArray(state.boundaryIdentities)
  ) {
    throw stateError(context, 'malformed or internally inconsistent');
  }
  const identities = state.boundaryIdentities as unknown[];
  if (
    identities.some((identity) => typeof identity !== 'string' || !parseIdentity(identity)) ||
    new Set(identities).size !== identities.length
  ) {
    throw stateError(context, 'malformed or internally inconsistent');
  }
  return state as unknown as PollingStateV1;
}

function selections(value: unknown): QueryOptionSelection[] {
  if (Array.isArray(value)) return value as QueryOptionSelection[];
  return value && typeof value === 'object' ? [value as QueryOptionSelection] : [];
}

function appendQueryValue(qs: IDataObject, sourceName: string, value: unknown): void {
  if (qs[sourceName] === undefined) {
    qs[sourceName] = value as never;
  } else {
    qs[sourceName] = `${String(qs[sourceName])},${String(value)}`;
  }
}

function selectedValues(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function resolveConfiguration(
  context: IPollFunctions,
  operations: PollingOperation[],
): ResolvedPollingConfiguration {
  const resource = context.getNodeParameter('resource') as string;
  const operationId = context.getNodeParameter('operation') as string;
  const operation = operations.find(
    (candidate) => candidate.resource === resource && candidate.id === operationId,
  );
  if (!operation) {
    throw new NodeOperationError(
      context.getNode(),
      `Unsupported polling operation: ${resource}.${operationId}`,
    );
  }

  const batchSize = Number(context.getNodeParameter('maxRecordsPerPoll', 100));
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 1000) {
    throw new NodeOperationError(
      context.getNode(),
      'Max Records Per Poll must be an integer from 1 through 1000.',
    );
  }
  const rawStartTime = context.getNodeParameter('startTime', '');
  const startTime =
    rawStartTime === '' ? '' : canonicalizeStartTime(rawStartTime, context.getTimezone());

  let path = operation.path;
  const scope: Record<string, string> = {};
  for (const field of operation.pathParameters) {
    const value = extractResourceLocatorId(
      context.getNodeParameter(`${operation.id}_${field.name}`, ''),
    );
    if (field.required && !value) {
      throw new NodeOperationError(context.getNode(), `${field.name} is required.`);
    }
    if (value) {
      scope[field.sourceName] = value;
      path = path.replace(`{${field.sourceName}}`, encodeURIComponent(value));
    }
  }

  const query: IDataObject = {};
  const resultFilters: Record<string, unknown> = {};
  for (const field of operation.ordinaryQueryFields ?? []) {
    const value = context.getNodeParameter(`${operation.id}_${field.name}`, '');
    if (value === '' || value === undefined) continue;
    query[field.sourceName] = value as never;
    resultFilters[field.sourceName] = value;
  }

  let sparseCursorOutputKey: string | undefined;
  for (const option of operation.queryOptions) {
    const group = context.getNodeParameter(`${operation.id}_${option.group}`, {}) as Record<
      string,
      unknown
    >;
    for (const selected of selections(group[option.name])) {
      const value = option.lookup ? extractResourceLocatorId(selected.value) : selected.value;
      if (value === undefined || value === '') continue;
      const sourceName =
        option.kind === 'operator'
          ? (
              option.operators?.find((candidate) => candidate.value === selected.operator) ??
              option.operators?.[0]
            )?.sourceName
          : option.sourceName;
      if (!sourceName) continue;

      if (option.group === 'fields') {
        const fields = selectedValues(value);
        if (
          sourceName === operation.cursorSparseFieldSourceName &&
          !fields.includes(operation.cursorField)
        ) {
          sparseCursorOutputKey = operation.cursorField;
          fields.push(operation.cursorField);
        }
        appendQueryValue(query, sourceName, fields.join(','));
      } else {
        const resolvedValue = option.lookup ? extractResourceLocatorId(value) : value;
        appendQueryValue(query, sourceName, resolvedValue);
        if (option.group === 'filter') resultFilters[sourceName] = resolvedValue;
      }
    }
  }

  return {
    operation,
    path,
    startTime,
    batchSize,
    query,
    resultFilters,
    scope,
    sparseCursorOutputKey,
  };
}

async function configurationFingerprint(
  context: IPollFunctions,
  configuration: ResolvedPollingConfiguration,
): Promise<string> {
  const credentials = (await context.getCredentials(
    'planningCenterPatApi',
  )) as PlanningCenterCredentials;
  const credentialReference = context.getNode().credentials?.planningCenterPatApi;
  return canonicalStringify({
    credential: {
      reference: credentialReference ?? null,
      applicationId: credentials.applicationId,
      baseUrl: credentials.baseUrl,
    },
    operation: configuration.operation.id,
    scope: configuration.scope,
    startTime: configuration.startTime,
    resultFilters: configuration.resultFilters,
  });
}

function validateResource(resource: unknown, cursorField: PollingCursorField): ValidatedResource {
  if (!resource || typeof resource !== 'object' || Array.isArray(resource)) {
    throw new Error('Planning Center returned an invalid JSON:API primary resource.');
  }
  const raw = resource as JsonObject;
  if (typeof raw.type !== 'string' || !raw.type || typeof raw.id !== 'string' || !raw.id) {
    throw new Error('Planning Center returned a resource without a valid JSON:API type and id.');
  }
  const cursor = canonicalizeRfc3339(raw.attributes?.[cursorField], cursorField);
  return {
    raw,
    type: raw.type,
    id: raw.id,
    identity: JSON.stringify([raw.type, raw.id]),
    cursor,
    cursorMs: Date.parse(cursor),
  };
}

function compareResources(left: ValidatedResource, right: ValidatedResource): number {
  if (left.cursorMs !== right.cursorMs) return left.cursorMs - right.cursorMs;
  if (left.type !== right.type) return left.type < right.type ? -1 : 1;
  if (left.id !== right.id) return left.id < right.id ? -1 : 1;
  return 0;
}

async function requestPage(
  context: IPollFunctions,
  configuration: ResolvedPollingConfiguration,
  qs: IDataObject,
): Promise<{ resources: ValidatedResource[]; hasNext: boolean; included?: unknown }> {
  const response = (await planningCenterApiRequest.call(context as unknown as IExecuteFunctions, {
    method: 'GET',
    path: configuration.path,
    qs,
  })) as JsonApiPage;
  if (!response || !Array.isArray(response.data)) {
    throw new Error('Planning Center returned an invalid JSON:API collection response.');
  }
  return {
    resources: response.data.map((resource) =>
      validateResource(resource, configuration.operation.cursorField),
    ),
    hasNext: Boolean(response.links?.next),
    included: response.included,
  };
}

function newState(
  configuration: ResolvedPollingConfiguration,
  fingerprint: string,
  watermark: string,
  boundaryIdentities: string[],
): PollingStateV1 {
  return {
    version: 1,
    initialized: true,
    fingerprint,
    cursorField: configuration.operation.cursorField,
    watermark,
    boundaryIdentities: [...new Set(boundaryIdentities)].sort(),
  };
}

async function baselineState(
  context: IPollFunctions,
  configuration: ResolvedPollingConfiguration,
  fingerprint: string,
): Promise<PollingStateV1> {
  if (configuration.startTime) {
    return newState(configuration, fingerprint, configuration.startTime, []);
  }

  const page = await requestPage(context, configuration, {
    ...configuration.query,
    order: `-${configuration.operation.cursorField}`,
    per_page: MAX_PAGE_SIZE,
  });
  if (!page.resources.length) return newState(configuration, fingerprint, EMPTY_WATERMARK, []);

  page.resources.sort(compareResources);
  let watermark = page.resources.at(-1)!.cursor;
  let identities = page.resources
    .filter((resource) => resource.cursor === watermark)
    .map((resource) => resource.identity);
  let hasNext = page.hasNext;
  const pageSignatures = new Set<string>();
  while (hasNext) {
    const boundaryPage = await requestPage(context, configuration, {
      ...configuration.query,
      [`where[${configuration.operation.cursorField}][gte]`]: watermark,
      order: configuration.operation.cursorField,
      per_page: MAX_PAGE_SIZE,
      offset: identities.length,
    });
    boundaryPage.resources.sort(compareResources);
    const signature = canonicalStringify(
      boundaryPage.resources.map((resource) => [resource.cursor, resource.type, resource.id]),
    );
    if (boundaryPage.resources.length === 0) break;
    if (pageSignatures.has(signature)) {
      throw new Error('Planning Center pagination made no progress while baselining.');
    }
    pageSignatures.add(signature);
    const greatest = boundaryPage.resources.at(-1)?.cursor;
    if (greatest && greatest > watermark) {
      watermark = greatest;
      identities = boundaryPage.resources
        .filter((resource) => resource.cursor === watermark)
        .map((resource) => resource.identity);
    } else {
      identities.push(
        ...boundaryPage.resources
          .filter((resource) => resource.cursor === watermark)
          .map((resource) => resource.identity),
      );
    }
    hasNext = boundaryPage.hasNext;
  }
  return newState(configuration, fingerprint, watermark, identities);
}

function normalizedItems(
  resources: ValidatedResource[],
  sparseCursorOutputKey?: string,
): INodeExecutionData[] {
  return resources.map((resource) => {
    const json = normalizeJsonApiResource(resource.raw);
    if (sparseCursorOutputKey) delete json[sparseCursorOutputKey];
    return { json };
  });
}

async function manualPreview(
  context: IPollFunctions,
  configuration: ResolvedPollingConfiguration,
): Promise<INodeExecutionData[][] | null> {
  const page = await requestPage(context, configuration, {
    ...configuration.query,
    order: `-${configuration.operation.cursorField}`,
    per_page: 1,
  });
  if (!page.resources.length) return null;
  page.resources.sort(compareResources);
  return [normalizedItems([page.resources.at(-1)!], configuration.sparseCursorOutputKey)];
}

async function collectBatch(
  context: IPollFunctions,
  configuration: ResolvedPollingConfiguration,
  state: PollingStateV1,
): Promise<ValidatedResource[]> {
  let traversalWatermark = state.watermark;
  let offset = 0;
  const collected = new Map<string, ValidatedResource>();
  const initialBoundary = new Set(state.boundaryIdentities);
  const pageSignatures = new Set<string>();

  while (collected.size < configuration.batchSize) {
    const page = await requestPage(context, configuration, {
      ...configuration.query,
      [`where[${configuration.operation.cursorField}][gte]`]: traversalWatermark,
      order: configuration.operation.cursorField,
      per_page: Math.min(MAX_PAGE_SIZE, configuration.batchSize - collected.size),
      ...(offset ? { offset } : {}),
    });
    page.resources.sort(compareResources);
    const signature = canonicalStringify(
      page.resources.map((resource) => [resource.cursor, resource.type, resource.id]),
    );
    if (pageSignatures.has(signature) && page.resources.length) {
      throw new Error('Planning Center pagination made no progress while polling.');
    }
    pageSignatures.add(signature);

    for (const resource of page.resources) {
      if (resource.cursorMs < Date.parse(state.watermark)) {
        throw new Error('Planning Center returned a cursor before the requested watermark.');
      }
      if (resource.cursor === state.watermark && initialBoundary.has(resource.identity)) continue;
      const previous = collected.get(resource.identity);
      if (!previous || resource.cursorMs > previous.cursorMs)
        collected.set(resource.identity, resource);
    }

    if (!page.hasNext || page.resources.length === 0) break;
    const greatestCursor = page.resources.at(-1)!.cursor;
    const greatestCount = page.resources.filter(
      (resource) => resource.cursor === greatestCursor,
    ).length;
    if (greatestCursor === traversalWatermark) offset += greatestCount;
    else {
      traversalWatermark = greatestCursor;
      offset = greatestCount;
    }
  }

  return [...collected.values()].sort(compareResources).slice(0, configuration.batchSize);
}

function advancedState(
  configuration: ResolvedPollingConfiguration,
  state: PollingStateV1,
  resources: ValidatedResource[],
): PollingStateV1 {
  const watermark = resources.at(-1)!.cursor;
  const previousIdentities = watermark === state.watermark ? state.boundaryIdentities : [];
  const boundaryIdentities = [
    ...previousIdentities,
    ...resources
      .filter((resource) => resource.cursor === watermark)
      .map((resource) => resource.identity),
  ];
  return newState(configuration, state.fingerprint, watermark, boundaryIdentities);
}

export async function pollPlanningCenter(
  this: IPollFunctions,
  operations: PollingOperation[],
): Promise<INodeExecutionData[][] | null> {
  const configuration = resolveConfiguration(this, operations);
  if (this.getMode() === 'manual') return manualPreview(this, configuration);

  const staticData = this.getWorkflowStaticData('node');
  const storedState = validatePollingState(this, staticData[STATE_KEY]);
  const fingerprint = await configurationFingerprint(this, configuration);

  if (!storedState) {
    const state = await baselineState(this, configuration, fingerprint);
    staticData[STATE_KEY] = state as unknown as IDataObject;
    return null;
  }
  if (storedState.fingerprint !== fingerprint) {
    const state = await baselineState(this, configuration, fingerprint);
    staticData[STATE_KEY] = state as unknown as IDataObject;
    return [[]];
  }
  if (Date.parse(storedState.watermark) > Date.now()) return null;

  const resources = await collectBatch(this, configuration, storedState);
  if (!resources.length) return null;
  const items = normalizedItems(resources, configuration.sparseCursorOutputKey);
  staticData[STATE_KEY] = advancedState(
    configuration,
    storedState,
    resources,
  ) as unknown as IDataObject;
  return [items];
}
