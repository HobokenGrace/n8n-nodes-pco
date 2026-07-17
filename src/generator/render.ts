import type { ProductConfig } from './config';
import { normalizeIdentifierDisplayLabel } from './labels';
import type { GeneratedField, GeneratedLookup, GeneratedOperation, GeneratedQueryOption, ProductGenerationResult } from './model';

type QueryOptionGroup = GeneratedQueryOption['group'];

const QUERY_OPTION_GROUPS: Array<{
  group: QueryOptionGroup;
  displayName: string;
  placeholder: string;
}> = [
  { group: 'filter', displayName: 'Filter', placeholder: 'Filter by' },
  { group: 'order', displayName: 'Order', placeholder: 'Order by' },
  { group: 'include', displayName: 'Include', placeholder: 'Include data' },
];

function q(value: unknown): string {
  return JSON.stringify(value);
}

function bodyFieldDisplayName(prefix: 'Attribute' | 'Relationship', displayName: string): string {
  return `${prefix}: ${normalizeIdentifierDisplayLabel(displayName)}`;
}

function locatorDefault(): string {
  return q({ mode: 'list', value: '' });
}

function locatorModes(lookup: GeneratedLookup): Array<Record<string, unknown>> {
  return [
    {
      displayName: 'List',
      name: 'list',
      type: 'list',
      typeOptions: {
        searchListMethod: lookup.methodName,
        searchable: true,
      },
    },
    {
      displayName: 'ID',
      name: 'id',
      type: 'string',
      placeholder: 'e.g. 12345',
    },
  ];
}

function fieldProperty(field: GeneratedField, operation: GeneratedOperation, source: 'path' | 'query' | 'attribute'): string {
  const displayOptions = {
    show: {
      resource: [operation.resource],
      operation: [operation.id],
      ...(source === 'attribute' ? { bodyMode: ['fields'] } : {}),
    },
  };

  return `    {
      displayName: ${q(source === 'attribute' ? bodyFieldDisplayName('Attribute', field.displayName) : field.displayName)},
      name: ${q(`${operation.id}_${field.name}`)},
      type: ${q(field.lookup ? 'resourceLocator' : field.type)},
      default: ${field.lookup ? locatorDefault() : field.type === 'number' ? 'undefined' : field.type === 'boolean' ? 'false' : "''"},
      required: ${field.required},
      ${field.lookup ? `modes: ${q(locatorModes(field.lookup))},\n      ` : ''}displayOptions: ${q(displayOptions)},
    },`;
}

function renderOperations(operations: GeneratedOperation[]): string {
  const runtimeOperations = operations.map(({ lookupQueryParameterNames: _lookupQueryParameterNames, ...operation }) => ({
    ...operation,
    queryParameters: operation.queryParameters.map(({ valueOptions: _valueOptions, ...parameter }) => parameter),
    queryOptions: operation.queryOptions.map(({ valueOptions: _valueOptions, ...option }) => option),
  }));
  return JSON.stringify(runtimeOperations, null, 2);
}

function renderOperationSubtitle(operations: GeneratedOperation[]): string {
  const descriptions = Object.fromEntries(operations.map((operation) => [operation.id, operation.description]));
  return `={{(${JSON.stringify(descriptions)})[$parameter["operation"]] || $parameter["operation"]}}`;
}

function renderQueryOptionValues(option: GeneratedQueryOption): unknown[] {
  return [
    ...(option.kind === 'operator'
      ? [
          {
            displayName: 'Operator',
            name: 'operator',
            type: 'options',
            options: option.operators?.map((operator) => ({ name: operator.name, value: operator.value })) ?? [],
            default: option.operators?.[0]?.value ?? '',
          },
        ]
      : []),
    {
      displayName: 'Value',
      name: 'value',
      type: option.lookup ? 'resourceLocator' : option.valueOptions?.length ? 'options' : option.type,
      ...(option.valueOptions?.length ? { options: option.valueOptions } : {}),
      ...(option.lookup ? { modes: locatorModes(option.lookup) } : {}),
      default: option.lookup ? { mode: 'list', value: '' } : option.valueOptions?.length ? '' : option.type === 'number' ? undefined : option.type === 'boolean' ? false : '',
    },
  ];
}

function operationLookups(operations: GeneratedOperation[]): GeneratedLookup[] {
  const lookups = new Map<string, GeneratedLookup>();

  for (const operation of operations) {
    for (const field of operation.pathParameters) if (field.lookup) lookups.set(field.lookup.methodName, field.lookup);
    for (const option of operation.queryOptions) if (option.lookup) lookups.set(option.lookup.methodName, option.lookup);
    for (const field of operation.attributeFields) if (field.lookup) lookups.set(field.lookup.methodName, field.lookup);
    for (const field of operation.relationshipFields) if (field.lookup) lookups.set(field.lookup.methodName, field.lookup);
  }

  return [...lookups.values()].sort((a, b) => a.methodName.localeCompare(b.methodName));
}

function renderLookupSources(operations: GeneratedOperation[]): string {
  const sources = Object.fromEntries(operationLookups(operations).map((lookup) => [lookup.methodName, lookup]));
  return JSON.stringify(sources, null, 2);
}

function renderListSearchMethods(operations: GeneratedOperation[]): string {
  const lookups = operationLookups(operations);
  if (!lookups.length) return '{}';

  return `{
${lookups.map((lookup) => `      ${lookup.methodName}: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES[${q(lookup.methodName)}], filter);
      },`).join('\n')}
    }`;
}

function renderQueryOptionsProperty(
  operation: GeneratedOperation,
  definition: { group: QueryOptionGroup; displayName: string; placeholder: string },
): string | undefined {
  const groupOptions = operation.queryOptions.filter((option) => option.group === definition.group);
  if (!groupOptions.length) return undefined;

  const displayOptions = { show: { resource: [operation.resource], operation: [operation.id] } };
  const options = groupOptions.map((option) => ({
    displayName: option.displayName,
    name: option.name,
    values: renderQueryOptionValues(option),
  }));

  return `    {
      displayName: ${q(definition.displayName)},
      name: ${q(`${operation.id}_${definition.group}`)},
      type: 'fixedCollection',
      default: {},
      placeholder: ${q(definition.placeholder)},
      typeOptions: { multipleValues: true },
      displayOptions: ${q(displayOptions)},
      options: ${q(options)},
    },`;
}

function renderProperties(operations: GeneratedOperation[]): string {
  const resources = [...new Set(operations.map((operation) => operation.resource))].sort();
  const resourceOptions = resources.map((resource) => ({ name: resource, value: resource }));
  const operationOptionsByResource = resources.map((resource) => {
    const options = operations
      .filter((operation) => operation.resource === resource)
      .map((operation) => ({
        name: operation.operation,
        value: operation.id,
        description: operation.description,
        action: operation.operation,
      }));

    return `    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: ${q({ show: { resource: [resource] } })},
      options: ${q(options)},
      default: ${q(options[0]?.value ?? '')},
    },`;
  });

  const extraFields = operations.flatMap((operation) => {
    const displayOptions = { show: { resource: [operation.resource], operation: [operation.id] } };
    const fields = [
      ...operation.pathParameters.map((field) => fieldProperty(field, operation, 'path')),
    ];

    fields.push(...QUERY_OPTION_GROUPS.flatMap((definition) => renderQueryOptionsProperty(operation, definition) ?? []));

    if (operation.isList) {
      fields.push(`    {
      displayName: 'Return All',
      name: ${q(`${operation.id}_returnAll`)},
      type: 'boolean',
      default: false,
      displayOptions: ${q(displayOptions)},
    },`);
      fields.push(`    {
      displayName: 'Limit',
      name: ${q(`${operation.id}_limit`)},
      type: 'number',
      default: 100,
      typeOptions: { minValue: 1 },
      displayOptions: ${q({ show: { resource: [operation.resource], operation: [operation.id], [`${operation.id}_returnAll`]: [false] } })},
    },`);
    }

    if (operation.attributeFields.length || operation.relationshipFields.length || ['POST', 'PUT', 'PATCH'].includes(operation.method)) {
      fields.push(`    {
      displayName: 'Body Mode',
      name: 'bodyMode',
      type: 'options',
      options: ${q([{ name: 'Fields', value: 'fields' }, { name: 'Raw JSON', value: 'rawJson' }])},
      default: 'fields',
      displayOptions: ${q(displayOptions)},
    },`);
      fields.push(...operation.attributeFields.map((field) => fieldProperty(field, operation, 'attribute')));
      for (const relationship of operation.relationshipFields) {
        fields.push(`    {
      displayName: ${q(bodyFieldDisplayName('Relationship', relationship.displayName))},
      name: ${q(`${operation.id}_${relationship.name}`)},
      type: ${q(relationship.lookup ? 'resourceLocator' : 'string')},
      default: ${relationship.lookup ? locatorDefault() : "''"},
      ${relationship.lookup ? `modes: ${q(locatorModes(relationship.lookup))},\n      ` : ''}description: ${q(relationship.multiple ? 'Comma-separated relationship IDs.' : 'Relationship ID.')},
      displayOptions: ${q({ show: { resource: [operation.resource], operation: [operation.id], bodyMode: ['fields'] } })},
    },`);
      }
      fields.push(`    {
      displayName: 'Raw JSON Body',
      name: 'rawJsonBody',
      type: 'json',
      default: '{}',
      displayOptions: ${q({ show: { resource: [operation.resource], operation: [operation.id], bodyMode: ['rawJson'] } })},
    },`);
    }

    fields.push(`    {
      displayName: 'Additional Query Parameters',
      name: 'additionalQueryParameters',
      type: 'fixedCollection',
      default: {},
      placeholder: 'Add Parameter',
      typeOptions: { multipleValues: true },
      displayOptions: ${q(displayOptions)},
      options: [{
        displayName: 'Parameter',
        name: 'parameters',
        values: [
          { displayName: 'Name', name: 'name', type: 'string', default: '' },
          { displayName: 'Value', name: 'value', type: 'string', default: '' },
        ],
      }],
    },`);

    return fields;
  });

  return `[
    {
      displayName: 'Resource',
      name: 'resource',
      type: 'options',
      noDataExpression: true,
      options: ${q(resourceOptions)},
      default: ${q(resourceOptions[0]?.value ?? '')},
    },
${operationOptionsByResource.join('\n')}
${extraFields.join('\n')}
  ]`;
}

export function renderNode(config: ProductConfig, result: ProductGenerationResult): string {
  return `import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, ILoadOptionsFunctions, INodeExecutionData, INodeListSearchResult, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { executeItemWithContinueOnFail } from '../../../src/runtime/execute';
import { normalizeJsonApiResponse } from '../../../src/runtime/jsonApi';
import { collectPaginatedPlanningCenterResults } from '../../../src/runtime/pagination';
import { planningCenterApiRequest } from '../../../src/runtime/request';
import { extractResourceLocatorId } from '../../../src/runtime/resourceLocator';

interface GeneratedLookupParentBinding {
  sourceName: string;
  fieldName: string;
}

interface GeneratedLookupSplitNameSearch {
  firstNameFilter: string;
  lastNameFilter: string;
}

interface GeneratedLookup {
  methodName: string;
  sourcePath: string;
  parentBindings: GeneratedLookupParentBinding[];
  searchFilter?: string;
  splitNameSearch?: GeneratedLookupSplitNameSearch;
  labelFields: string[];
  resultLimit: number;
}

interface GeneratedField {
  name: string;
  sourceName: string;
  displayName: string;
  required: boolean;
  type: 'boolean' | 'number' | 'string';
  lookup?: GeneratedLookup;
}

interface GeneratedQueryOptionOperator {
  name: string;
  value: string;
  sourceName: string;
}

interface GeneratedQueryOption {
  name: string;
  displayName: string;
  group: 'filter' | 'order' | 'include';
  type: 'boolean' | 'number' | 'string';
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: GeneratedQueryOptionOperator[];
  lookup?: GeneratedLookup;
}

interface QueryOptionSelection {
  operator?: string;
  value?: unknown;
}

interface GeneratedRelationshipField {
  name: string;
  displayName: string;
  relationshipName: string;
  relationshipType: string;
  multiple: boolean;
  lookup?: GeneratedLookup;
}

interface Operation {
  id: string;
  resource: string;
  jsonApiType?: string;
  operation: string;
  description: string;
  method: IHttpRequestMethods;
  path: string;
  deprecated: boolean;
  isList: boolean;
  lookupTarget: string;
  pathParameters: GeneratedField[];
  queryParameters: GeneratedField[];
  queryOptions: GeneratedQueryOption[];
  attributeFields: GeneratedField[];
  relationshipFields: GeneratedRelationshipField[];
}

const OPERATIONS: Operation[] = ${renderOperations(result.operations)};

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = ${renderLookupSources(result.operations)};

const NODE_PROPERTIES = Function('return ' + ${q(renderProperties(result.operations))})() as any;

function lookupResultName(item: any, lookup: GeneratedLookup): string {
  const id = item?.id === undefined || item?.id === null ? '' : String(item.id);
  const attributes = item?.attributes && typeof item.attributes === 'object' ? item.attributes as Record<string, unknown> : {};
  const display = lookup.labelFields
    .map((field) => {
      const values = field.split(' ').map((part) => attributes[part]);
      if (values.some((value) => typeof value !== 'string' || !value.trim())) return '';
      return values.map((value) => String(value).trim()).join(' ');
    })
    .find((value) => value.trim());

  return display ? String(display) + ' (' + id + ')' : id;
}

function lookupPath(context: ILoadOptionsFunctions, lookup: GeneratedLookup): string | undefined {
  let path = lookup.sourcePath;
  for (const binding of lookup.parentBindings) {
    const id = extractResourceLocatorId(context.getNodeParameter(binding.fieldName, ''));
    if (!id) return undefined;
    path = path.replace('{' + binding.sourceName + '}', encodeURIComponent(id));
  }

  return path;
}

async function requestLookup(context: ILoadOptionsFunctions, path: string, qs: IDataObject): Promise<any[]> {
  const response = await planningCenterApiRequest.call(context as unknown as IExecuteFunctions, { method: 'GET', path, qs });
  return Array.isArray((response as any)?.data) ? (response as any).data : [];
}

function lookupResults(dataSets: any[][], lookup: GeneratedLookup): INodeListSearchResult {
  const seen = new Set<string>();
  const results: INodeListSearchResult['results'] = [];

  for (const data of dataSets) {
    for (const item of data) {
      const value = item?.id === undefined || item?.id === null ? '' : String(item.id);
      if (!value || seen.has(value)) continue;
      seen.add(value);
      results.push({ name: lookupResultName(item, lookup), value });
      if (results.length >= lookup.resultLimit) return { results };
    }
  }

  return { results };
}

function splitNameRequests(lookup: GeneratedLookup, filter: string): IDataObject[] {
  const terms = filter.trim().split(/\\s+/).filter(Boolean);
  const splitNameSearch = lookup.splitNameSearch;
  if (!terms.length || !splitNameSearch) return [];

  return [
    { per_page: lookup.resultLimit, [splitNameSearch.firstNameFilter]: terms[0] },
    { per_page: lookup.resultLimit, [splitNameSearch.lastNameFilter]: terms[terms.length - 1] },
  ];
}

async function searchLookup(context: ILoadOptionsFunctions, lookup: GeneratedLookup, filter?: string): Promise<INodeListSearchResult> {
  const path = lookupPath(context, lookup);
  if (!path) return { results: [] };

  const trimmedFilter = filter?.trim() ?? '';
  let requests: IDataObject[] = [{ per_page: lookup.resultLimit }];
  if (trimmedFilter && lookup.searchFilter) {
    requests = [{ per_page: lookup.resultLimit, [lookup.searchFilter]: trimmedFilter }];
  } else if (trimmedFilter && lookup.splitNameSearch) {
    requests = splitNameRequests(lookup, trimmedFilter);
  }

  const dataSets = await Promise.all(requests.map((qs) => requestLookup(context, path, qs)));
  return lookupResults(dataSets, lookup);
}

function addAdditionalQuery(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const additional = context.getNodeParameter('additionalQueryParameters', itemIndex, {}) as { parameters?: Array<{ name?: string; value?: unknown }> };
  for (const parameter of additional.parameters ?? []) {
    if (parameter.name) {
      qs[parameter.name] = parameter.value;
    }
  }
}

function queryOptionSelections(
  groupOptions: Record<string, QueryOptionSelection | QueryOptionSelection[] | undefined>,
  optionName: string,
): QueryOptionSelection[] {
  const selected = groupOptions[optionName];
  if (Array.isArray(selected)) return selected;
  return selected ? [selected] : [];
}

function addQueryStringValue(qs: Record<string, unknown>, sourceName: string, value: unknown): void {
  if (qs[sourceName] === undefined) {
    qs[sourceName] = value;
    return;
  }

  qs[sourceName] = String(qs[sourceName]) + ',' + String(value);
}

function addQueryOptions(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  for (const option of operation.queryOptions) {
    const options = context.getNodeParameter(\`${'${operation.id}'}_${'${option.group}'}\`, itemIndex, {}) as Record<string, QueryOptionSelection | QueryOptionSelection[] | undefined>;
    for (const selected of queryOptionSelections(options, option.name)) {
      const value = option.lookup ? extractResourceLocatorId(selected.value) : selected.value;
      if (value === undefined || value === '') continue;

      if (option.kind === 'operator') {
        const operator = option.operators?.find((candidate) => candidate.value === selected.operator) ?? option.operators?.[0];
        if (operator) addQueryStringValue(qs, operator.sourceName, value);
        continue;
      }

      if (option.sourceName) {
        addQueryStringValue(qs, option.sourceName, value);
      }
    }
  }
}

function buildBody(context: IExecuteFunctions, itemIndex: number, operation: Operation): unknown {
  if (!['POST', 'PUT', 'PATCH'].includes(operation.method)) return undefined;

  const bodyMode = context.getNodeParameter('bodyMode', itemIndex, 'fields') as string;
  if (bodyMode === 'rawJson') {
    return JSON.parse(context.getNodeParameter('rawJsonBody', itemIndex, '{}') as string);
  }

  const attributes: Record<string, unknown> = {};
  for (const field of operation.attributeFields) {
    const value = field.required
      ? context.getNodeParameter(\`${'${operation.id}'}_\${field.name}\`, itemIndex)
      : context.getNodeParameter(\`${'${operation.id}'}_\${field.name}\`, itemIndex, '');
    const attributeValue = field.lookup ? extractResourceLocatorId(value) : value;
    if (attributeValue !== undefined && attributeValue !== '') {
      attributes[field.sourceName] = attributeValue;
    }
  }

  const relationships: Record<string, unknown> = {};
  for (const field of operation.relationshipFields) {
    const rawValue = context.getNodeParameter(\`${'${operation.id}'}_\${field.name}\`, itemIndex, '');
    const value = field.lookup ? extractResourceLocatorId(rawValue) : String(rawValue);
    if (!value) continue;
    const ids = field.multiple ? value.split(',').map((id) => id.trim()).filter(Boolean) : [value];
    relationships[field.relationshipName] = {
      data: field.multiple
        ? ids.map((id) => ({ type: field.relationshipType, id }))
        : { type: field.relationshipType, id: ids[0] },
    };
  }

  return {
    data: {
      type: operation.jsonApiType ?? operation.resource,
      ...(Object.keys(attributes).length ? { attributes } : {}),
      ...(Object.keys(relationships).length ? { relationships } : {}),
    },
  };
}

function buildPath(context: IExecuteFunctions, itemIndex: number, operation: Operation): string {
  let path = operation.path;
  for (const parameter of operation.pathParameters) {
    const value = extractResourceLocatorId(context.getNodeParameter(\`${'${operation.id}'}_\${parameter.name}\`, itemIndex));
    path = path.replace(\`{\${parameter.sourceName}}\`, encodeURIComponent(value));
  }
  return path;
}

async function executeOperation(context: IExecuteFunctions, itemIndex: number, operation: Operation): Promise<INodeExecutionData[]> {
  const qs: IDataObject = {};
  addQueryOptions(context, itemIndex, operation, qs);
  addAdditionalQuery(context, itemIndex, operation, qs);

  const request = {
    method: operation.method,
    path: buildPath(context, itemIndex, operation),
    qs,
    body: buildBody(context, itemIndex, operation),
  };

  const data = operation.isList
    ? await collectPaginatedPlanningCenterResults.call(context, request, {
        returnAll: context.getNodeParameter(\`${'${operation.id}'}_returnAll\`, itemIndex, false) as boolean,
        limit: context.getNodeParameter(\`${'${operation.id}'}_limit\`, itemIndex, 100) as number,
      })
    : normalizeJsonApiResponse(await planningCenterApiRequest.call(context, request));

  return data.map((json) => ({ json, pairedItem: { item: itemIndex } }));
}

export class ${config.className} implements INodeType {
  description: INodeTypeDescription = {
    displayName: ${q(config.displayName)},
    name: ${q(config.nodeName)},
    icon: 'file:${config.product}.svg',
    group: ['transform'],
    version: 1,
    subtitle: ${q(renderOperationSubtitle(result.operations))},
    description: ${q(`${config.displayName} generated from the Planning Center OpenAPI snapshot.`)},
    defaults: {
      name: ${q(config.displayName)},
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'planningCenterPatApi',
        required: true,
      },
    ],
    properties: NODE_PROPERTIES,
  };

  methods = {
    listSearch: ${renderListSearchMethods(result.operations)},
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      const resource = this.getNodeParameter('resource', itemIndex) as string;
      const operationId = this.getNodeParameter('operation', itemIndex) as string;
      const operation = OPERATIONS.find((candidate) => candidate.resource === resource && candidate.id === operationId);
      if (!operation) {
        throw new Error(\`Unsupported ${config.displayName} operation: \${resource}.\${operationId}\`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
`;
}
