import SwaggerParser from '@apidevtools/swagger-parser';
import { createHash } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

import type { ProductConfig } from './config';
import { snapshotPath, supplementsPath } from './config';
import type { OperationStability } from './model';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;
const HTTP_METHOD_SET = new Set<string>(HTTP_METHODS);
export const PCO_STABILITY_EXTENSION = 'x-pco-stability';

type JsonObject = Record<string, any>;
type SupplementMethod = (typeof HTTP_METHODS)[number];

interface SupplementProvenance {
  source: string;
  observedAt?: string;
}

interface ObservedResponse {
  status: number;
  contentType: string | null;
  hasBody: boolean;
}

interface SupplementMetadataBase {
  method: SupplementMethod;
  path: string;
  stability: OperationStability;
  provenance: SupplementProvenance;
  observedResponse: ObservedResponse;
}

interface AddSupplementMetadata extends SupplementMetadataBase {
  mode: 'add';
}

interface OverrideSupplementMetadata extends SupplementMetadataBase {
  mode: 'override';
  expectedUpstreamFingerprint: string;
}

export type SupplementMetadata = AddSupplementMetadata | OverrideSupplementMetadata;

export interface EffectiveOpenApiPaths {
  snapshotFile?: string;
  supplementsDirectory?: string;
}

interface SupplementPackage {
  directory: string;
  name: string;
  metadata: SupplementMetadata;
}

function isObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readJson(path: string, context: string): Promise<any> {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    throw new Error(`${context} must contain valid JSON: ${(error as Error).message}`);
  }
}

function validateMetadata(value: unknown, name: string): SupplementMetadata {
  if (!isObject(value)) throw new Error(`Supplement ${name} metadata.json must contain an object`);

  const mode = value.mode;
  const rawMethod = value.method;
  const method = typeof rawMethod === 'string' ? rawMethod.toLowerCase() : '';
  if (mode !== 'add' && mode !== 'override') {
    throw new Error(`Supplement ${name} metadata mode must be add or override`);
  }
  if (!HTTP_METHOD_SET.has(method)) {
    throw new Error(`Supplement ${name} metadata method is unsupported`);
  }
  if (typeof value.path !== 'string' || !value.path.startsWith('/')) {
    throw new Error(`Supplement ${name} metadata path must be snapshot-relative`);
  }
  if (value.stability !== 'official' && value.stability !== 'unofficial') {
    throw new Error(`Supplement ${name} metadata stability must be official or unofficial`);
  }
  if (!isObject(value.provenance) || typeof value.provenance.source !== 'string') {
    throw new Error(`Supplement ${name} metadata provenance is required`);
  }
  if (!isObject(value.observedResponse)) {
    throw new Error(`Supplement ${name} metadata observedResponse is required`);
  }

  const response = value.observedResponse;
  if (!Number.isInteger(response.status) || response.status < 100 || response.status > 599) {
    throw new Error(`Supplement ${name} observed response status is invalid`);
  }
  if (typeof response.hasBody !== 'boolean') {
    throw new Error(`Supplement ${name} observed response hasBody must be boolean`);
  }
  if (response.hasBody ? typeof response.contentType !== 'string' : response.contentType !== null) {
    throw new Error(
      `Supplement ${name} observed response contentType does not match body presence`,
    );
  }

  const base: SupplementMetadataBase = {
    method: method as SupplementMethod,
    path: value.path,
    stability: value.stability,
    provenance: value.provenance as SupplementProvenance,
    observedResponse: response as ObservedResponse,
  };
  if (mode === 'add') {
    if (value.expectedUpstreamFingerprint !== undefined) {
      throw new Error(
        `Supplement ${name} add metadata cannot declare an expected upstream fingerprint`,
      );
    }
    return { ...base, mode };
  }

  if (
    typeof value.expectedUpstreamFingerprint !== 'string' ||
    !/^[a-f0-9]{64}$/.test(value.expectedUpstreamFingerprint)
  ) {
    throw new Error(
      `Supplement ${name} override metadata requires an expected upstream fingerprint`,
    );
  }
  return { ...base, mode, expectedUpstreamFingerprint: value.expectedUpstreamFingerprint };
}

async function discoverSupplements(directory: string): Promise<SupplementPackage[]> {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }

  const packages: SupplementPackage[] = [];
  for (const entry of entries
    .filter((candidate) => candidate.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const packageDirectory = join(directory, entry.name);
    const metadata = validateMetadata(
      await readJson(
        join(packageDirectory, 'metadata.json'),
        `Supplement ${entry.name} metadata.json`,
      ),
      entry.name,
    );
    if (!(await fileExists(join(packageDirectory, 'request.http')))) {
      throw new Error(`Supplement ${entry.name} is missing request.http`);
    }

    const responsePath = join(packageDirectory, 'response.json');
    const hasResponseFile = await fileExists(responsePath);
    if (metadata.observedResponse.hasBody) {
      if (!hasResponseFile) throw new Error(`Supplement ${entry.name} is missing response.json`);
      await readJson(responsePath, `Supplement ${entry.name} response.json`);
    } else if (hasResponseFile) {
      throw new Error(
        `Supplement ${entry.name} response.json is incompatible with a bodyless response`,
      );
    }

    const openApiPath = join(packageDirectory, 'openapi.json');
    const patchPath = join(packageDirectory, 'patch.json');
    const hasOpenApi = await fileExists(openApiPath);
    const hasPatch = await fileExists(patchPath);
    if (metadata.mode === 'add' && (!hasOpenApi || hasPatch)) {
      throw new Error(
        `Supplement ${entry.name} patch.json is forbidden in add mode; openapi.json is required`,
      );
    }
    if (metadata.mode === 'override' && (!hasPatch || hasOpenApi)) {
      throw new Error(
        `Supplement ${entry.name} override mode requires patch.json and forbids openapi.json`,
      );
    }

    packages.push({ directory: packageDirectory, name: entry.name, metadata });
  }
  return packages;
}

function rejectExternalReferences(
  value: unknown,
  context: string,
  seen = new Set<unknown>(),
): void {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((item) => rejectExternalReferences(item, context, seen));
    return;
  }
  for (const [key, nested] of Object.entries(value)) {
    if (key === '$ref' && (typeof nested !== 'string' || !nested.startsWith('#/'))) {
      throw new Error(`${context} contains a non-local reference`);
    }
    rejectExternalReferences(nested, context, seen);
  }
}

function operationEntries(
  document: JsonObject,
): Array<{ method: SupplementMethod; operation: JsonObject; path: string }> {
  const entries: Array<{ method: SupplementMethod; operation: JsonObject; path: string }> = [];
  for (const [path, pathItem] of Object.entries<JsonObject>(document.paths ?? {})) {
    if (!isObject(pathItem)) continue;
    for (const [method, operation] of Object.entries(pathItem)) {
      if (HTTP_METHOD_SET.has(method) && isObject(operation)) {
        entries.push({ method: method as SupplementMethod, operation, path });
      }
    }
  }
  return entries;
}

function routeKey(method: string, path: string): string {
  return `${method.toUpperCase()} ${path}`;
}

function operationAt(
  document: JsonObject,
  method: SupplementMethod,
  path: string,
): JsonObject | undefined {
  const operation = document.paths?.[path]?.[method];
  return isObject(operation) ? operation : undefined;
}

function parameterKey(parameter: any): string {
  return `${parameter?.in ?? ''}:${parameter?.name ?? ''}`;
}

function normalizedOperation(pathItem: JsonObject, operation: JsonObject): JsonObject {
  const parameters = new Map<string, any>();
  for (const parameter of pathItem.parameters ?? [])
    parameters.set(parameterKey(parameter), parameter);
  for (const parameter of operation.parameters ?? [])
    parameters.set(parameterKey(parameter), parameter);
  const result = structuredClone(operation);
  if (parameters.size > 0)
    result.parameters = [...parameters.values()].map((parameter) => structuredClone(parameter));
  else delete result.parameters;
  return result;
}

function withStabilityMetadata(operation: JsonObject, metadata: SupplementMetadata): JsonObject {
  return {
    ...operation,
    [PCO_STABILITY_EXTENSION]: metadata.stability,
  };
}

function canonicalValue(value: any, ancestors: Set<any>): any {
  if (!value || typeof value !== 'object') return value;
  if (ancestors.has(value)) throw new Error('Cannot canonically serialize a cyclic value');
  const nextAncestors = new Set(ancestors).add(value);
  if (Array.isArray(value)) return value.map((item) => canonicalValue(item, nextAncestors));
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .filter((key) => value[key] !== undefined)
      .map((key) => [key, canonicalValue(value[key], nextAncestors)]),
  );
}

export function canonicalSerialize(value: any): string {
  return JSON.stringify(canonicalValue(value, new Set()));
}

export function fingerprintOperation(operation: any): string {
  return createHash('sha256').update(canonicalSerialize(operation)).digest('hex');
}

export function applyMergePatch(target: any, patch: any): any {
  if (!isObject(patch)) return structuredClone(patch);
  const result: JsonObject = isObject(target) ? structuredClone(target) : {};
  for (const [key, value] of Object.entries(patch)) {
    if (value === null) delete result[key];
    else result[key] = applyMergePatch(result[key], value);
  }
  return result;
}

async function applyAddition(document: JsonObject, supplement: SupplementPackage): Promise<void> {
  const metadata = supplement.metadata as AddSupplementMetadata;
  if (operationAt(document, metadata.method, metadata.path)) {
    throw new Error(
      `Supplement ${supplement.name}: ${routeKey(metadata.method, metadata.path)} already exists upstream`,
    );
  }

  const addition = await readJson(
    join(supplement.directory, 'openapi.json'),
    `Supplement ${supplement.name} openapi.json`,
  );
  rejectExternalReferences(addition, `Supplement ${supplement.name} openapi.json`);
  let dereferenced: JsonObject;
  try {
    dereferenced = (await SwaggerParser.validate(addition)) as JsonObject;
  } catch (error) {
    throw new Error(
      `Supplement ${supplement.name} openapi.json is invalid: ${(error as Error).message}`,
    );
  }
  const entries = operationEntries(dereferenced);
  if (entries.length !== 1) {
    throw new Error(
      `Supplement ${supplement.name} openapi.json must contain exactly one operation`,
    );
  }
  const entry = entries[0];
  if (entry.method !== metadata.method || entry.path !== metadata.path) {
    throw new Error(`Supplement ${supplement.name} route does not match metadata`);
  }
  if (typeof entry.operation.operationId !== 'string' || !entry.operation.operationId) {
    throw new Error(`Supplement ${supplement.name} add operation requires an explicit operationId`);
  }

  document.paths ??= {};
  document.paths[entry.path] ??= {};
  const pathItem = dereferenced.paths[entry.path];
  document.paths[entry.path][entry.method] = withStabilityMetadata(
    normalizedOperation(pathItem, entry.operation),
    metadata,
  );
}

async function applyOverride(document: JsonObject, supplement: SupplementPackage): Promise<void> {
  const metadata = supplement.metadata as OverrideSupplementMetadata;
  const pathItem = document.paths?.[metadata.path];
  const operation = operationAt(document, metadata.method, metadata.path);
  if (!isObject(pathItem) || !operation) {
    throw new Error(
      `Supplement ${supplement.name}: ${routeKey(metadata.method, metadata.path)} does not exist upstream`,
    );
  }

  const normalized = normalizedOperation(pathItem, operation);
  const actualFingerprint = fingerprintOperation(normalized);
  if (actualFingerprint !== metadata.expectedUpstreamFingerprint) {
    throw new Error(
      `Supplement ${supplement.name} fingerprint mismatch for ${routeKey(metadata.method, metadata.path)}: expected ${metadata.expectedUpstreamFingerprint}, received ${actualFingerprint}`,
    );
  }
  const patch = await readJson(
    join(supplement.directory, 'patch.json'),
    `Supplement ${supplement.name} patch.json`,
  );
  if (!isObject(patch))
    throw new Error(`Supplement ${supplement.name} patch.json must contain an object`);
  const patched = applyMergePatch(normalized, patch);
  if (!isObject(patched))
    throw new Error(`Supplement ${supplement.name} patch.json must produce an operation object`);

  pathItem.parameters = [];
  pathItem[metadata.method] = withStabilityMetadata(patched, metadata);
}

function validateUniqueOperationIds(document: JsonObject): void {
  const ids = new Map<string, string>();
  for (const entry of operationEntries(document)) {
    const id = entry.operation.operationId;
    if (typeof id !== 'string' || !id) continue;
    const previous = ids.get(id);
    if (previous)
      throw new Error(
        `Duplicate operationId ${id} on ${previous} and ${routeKey(entry.method, entry.path)}`,
      );
    ids.set(id, routeKey(entry.method, entry.path));
  }
}

export async function loadEffectiveOpenApi(
  config: ProductConfig,
  paths: EffectiveOpenApiPaths = {},
): Promise<JsonObject> {
  const snapshotFile = paths.snapshotFile ?? snapshotPath(config);
  const supplementsDirectory = paths.supplementsDirectory ?? supplementsPath(config);
  const source = await readJson(snapshotFile, `Vendor snapshot ${snapshotFile}`);
  const document = (await SwaggerParser.dereference(source)) as JsonObject;
  const supplements = await discoverSupplements(supplementsDirectory);
  const routes = new Set<string>();

  for (const supplement of supplements) {
    const key = routeKey(supplement.metadata.method, supplement.metadata.path);
    if (routes.has(key)) throw new Error(`Duplicate supplement route ${key}`);
    routes.add(key);
  }
  for (const supplement of supplements) {
    if (supplement.metadata.mode === 'add') await applyAddition(document, supplement);
    else await applyOverride(document, supplement);
  }
  validateUniqueOperationIds(document);
  return document;
}
