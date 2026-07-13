import SwaggerParser from '@apidevtools/swagger-parser';
import { singularize } from 'inflection';
import { readFile } from 'node:fs/promises';

import type { ProductConfig } from './config';
import { snapshotPath } from './config';
import type {
  GeneratedField,
  GeneratedOperation,
  GeneratedQueryOption,
  GeneratedValueOption,
  GeneratedRelationshipField,
  HttpMethod,
  ProductGenerationResult,
} from './model';

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete']);
const GENERIC_TAGS = new Set(['default', 'api', 'openapi']);
const RANGE_OPERATORS = new Set(['gt', 'gte', 'lt', 'lte']);
const USEFUL_STRING_FILTERS = new Set([
  'address',
  'email',
  'name',
  'search_name',
  'search_name_or_email',
  'search_name_or_email_or_phone_number',
  'search_phone_number',
  'subject',
  'submitter_name',
  'title',
]);

type JsonSchema = Record<string, any>;

interface OperationQueryContext {
  directRelationships: Set<string>;
  pathRelationshipConstraints: Set<string>;
}

interface ParsedWhereParameter {
  field: string;
  operator?: string;
  segments: string[];
}

function titleCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\-/.{}]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function camelCase(value: string): string {
  const words = titleCase(value).split(' ').filter(Boolean);
  if (words.length === 0) return 'value';
  return words
    .map((word, index) => (index === 0 ? word.charAt(0).toLowerCase() + word.slice(1) : word))
    .join('')
    .replace(/[^A-Za-z0-9]/g, '');
}

function pathSegments(path: string): string[] {
  return path.split('/').filter(Boolean);
}

function isPathParameter(segment: string): boolean {
  return segment.startsWith('{') && segment.endsWith('}');
}

function operationAction(method: string, path: string): string {
  if (method === 'get') {
    const lastSegment = pathSegments(path).at(-1) ?? '';
    return isPathParameter(lastSegment) ? 'Get' : 'List';
  }
  if (method === 'post') return 'Create';
  if (method === 'put' || method === 'patch') return 'Update';
  if (method === 'delete') return 'Delete';
  return titleCase(method);
}

function operationTargetSegment(path: string): string {
  const segments = pathSegments(path);
  for (let index = segments.length - 1; index >= 0; index--) {
    if (!isPathParameter(segments[index])) return segments[index];
  }
  return 'item';
}

function singularizeLastWord(segment: string): string {
  const parts = segment.split(/([_\-.\s]+)/);
  let lastWordIndex = -1;
  for (let index = parts.length - 1; index >= 0; index--) {
    if (/[A-Za-z]/.test(parts[index])) {
      lastWordIndex = index;
      break;
    }
  }
  if (lastWordIndex === -1) return segment;

  parts[lastWordIndex] = singularize(parts[lastWordIndex]);

  return parts.join('');
}

function operationTarget(path: string, action: string): string {
  const segment = operationTargetSegment(path);
  return titleCase(action === 'List' ? segment : singularizeLastWord(segment));
}

function operationLabel(operation: any, method: string, path: string): string {
  const source = operation.operationId ?? operation.summary;
  const action = operationAction(method, path);
  const label = source ? titleCase(source) : `${action} ${operationTarget(path, action)}`;
  return operation.deprecated ? `${label} (Deprecated)` : label;
}

function resourceLabel(operation: any, path: string): string {
  const tag = Array.isArray(operation.tags)
    ? operation.tags.find((candidate: string) => !GENERIC_TAGS.has(String(candidate).toLowerCase()))
    : undefined;
  if (tag) return titleCase(tag);

  const segment = path.split('/').find((part) => part && !part.startsWith('{') && part !== 'v2');
  return titleCase(segment ?? 'General');
}

function schemaType(schema: JsonSchema | undefined): GeneratedField['type'] {
  if (schema?.type === 'integer' || schema?.type === 'number') return 'number';
  if (schema?.type === 'boolean') return 'boolean';
  return 'string';
}

function jsonApiResponseSchema(operation: any): JsonSchema | undefined {
  return operation.responses?.['200']?.content?.['application/vnd.api+json']?.schema
    ?? operation.responses?.['200']?.content?.['application/json']?.schema;
}

function responseResourceSchema(operation: any): JsonSchema | undefined {
  const dataSchema = jsonApiResponseSchema(operation)?.properties?.data;
  if (!dataSchema) return undefined;

  return dataSchema.type === 'array' ? dataSchema.items : dataSchema;
}

function directRelationships(operation: any): Set<string> {
  const relationships = responseResourceSchema(operation)?.properties?.relationships?.properties;
  return new Set(Object.keys(relationships ?? {}));
}

function pathRelationshipConstraints(path: string): Set<string> {
  const constraints = new Set<string>();
  for (const match of path.matchAll(/\{([^}]+)_id\}/g)) {
    constraints.add(match[1]);
  }
  return constraints;
}

function operationQueryContext(path: string, operation: any): OperationQueryContext {
  return {
    directRelationships: directRelationships(operation),
    pathRelationshipConstraints: pathRelationshipConstraints(path),
  };
}

function parseWhereParameter(name: string): ParsedWhereParameter | undefined {
  if (!name.startsWith('where[')) return undefined;

  const segments = [...name.matchAll(/\[([^\]]+)\]/g)].map((match) => match[1]);
  if (!segments.length) return undefined;

  const lastSegment = segments.at(-1) ?? '';
  const operator = RANGE_OPERATORS.has(lastSegment) ? lastSegment : undefined;
  const baseSegments = operator ? segments.slice(0, -1) : segments;
  const field = baseSegments.at(-1);
  if (!field) return undefined;

  return { field, operator, segments: baseSegments };
}

function whereParameterName(segments: string[], operator?: string): string {
  return `where${[...segments, ...(operator ? [operator] : [])].map((segment) => `[${segment}]`).join('')}`;
}

function queryOptionDisplayName(sourceName: string): string {
  const parsed = parseWhereParameter(sourceName);
  if (parsed) return titleCase(parsed.segments.join(' '));

  return titleCase(sourceName);
}

function queryOptionName(sourceName: string, suffix = ''): string {
  return `${camelCase(sourceName)}${suffix}`;
}

function operatorLabel(operator: string): string {
  if (operator === 'eq') return 'Equals';
  if (operator === 'gt') return 'Greater Than';
  if (operator === 'gte') return 'Greater Than Or Equal';
  if (operator === 'lt') return 'Less Than';
  if (operator === 'lte') return 'Less Than Or Equal';
  return titleCase(operator);
}

function schemaEnumValues(schema: JsonSchema | undefined): Array<string | number | boolean> {
  const values = schema?.enum ?? schema?.items?.enum;
  if (!Array.isArray(values)) return [];
  return values.filter((value): value is string | number | boolean => ['string', 'number', 'boolean'].includes(typeof value));
}

function uniqueValueOptions(options: GeneratedValueOption[]): GeneratedValueOption[] {
  const seen = new Set<string>();
  return options.filter((option) => {
    const key = String(option.value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function queryValueOptions(parameter: any): GeneratedValueOption[] | undefined {
  const values = schemaEnumValues(parameter.schema);
  if (!values.length) return undefined;

  if (parameter.name === 'order') {
    return uniqueValueOptions(values.flatMap((value) => {
      const sourceValue = String(value);
      const orderField = sourceValue.startsWith('-') ? sourceValue.slice(1) : sourceValue;
      return [
        { name: `${titleCase(orderField)} Ascending`, value: orderField },
        { name: `${titleCase(orderField)} Descending`, value: `-${orderField}` },
      ];
    }));
  }

  return values.map((value) => ({ name: titleCase(String(value)), value }));
}

function isDateFilter(schema: JsonSchema | undefined): boolean {
  return schema?.format === 'date' || schema?.format === 'date-time';
}

function isUsefulStringFilter(field: string, schema: JsonSchema | undefined): boolean {
  return schemaType(schema) === 'string' && USEFUL_STRING_FILTERS.has(field);
}

function shouldRenderWhereParameter(parameter: any, context: OperationQueryContext): boolean {
  const parsed = parseWhereParameter(parameter.name);
  if (!parsed) return false;

  const { field, segments } = parsed;
  if (segments.length === 1) {
    return field === 'id' || isDateFilter(parameter.schema) || isUsefulStringFilter(field, parameter.schema);
  }

  if (segments.length === 2) {
    const relationship = segments[0];
    if (context.pathRelationshipConstraints.has(relationship)) return false;
    return context.directRelationships.has(relationship) && field === 'id';
  }

  return false;
}

function shouldRenderQueryParameter(parameter: any, context: OperationQueryContext): boolean {
  const name = parameter.name;
  if (!name) return false;
  if (name === 'per_page' || name === 'offset') return false;
  if (name.startsWith('fields[')) return false;
  if (name.startsWith('where[')) return shouldRenderWhereParameter(parameter, context);

  return true;
}

function buildQueryOptions(parameters: GeneratedField[]): GeneratedQueryOption[] {
  const dateRangeGroups = new Map<string, GeneratedField[]>();
  const fieldsBySourceName = new Map(parameters.map((parameter) => [parameter.sourceName, parameter]));
  const usedSourceNames = new Set<string>();

  for (const parameter of parameters) {
    const parsed = parseWhereParameter(parameter.sourceName);
    if (!parsed?.operator) continue;

    const baseSourceName = whereParameterName(parsed.segments);
    dateRangeGroups.set(baseSourceName, [
      ...(dateRangeGroups.get(baseSourceName) ?? []),
      parameter,
    ]);
  }

  const options: GeneratedQueryOption[] = [];
  for (const [baseSourceName, rangeParameters] of dateRangeGroups) {
    const baseParameter = fieldsBySourceName.get(baseSourceName);
    const allParameters = [baseParameter, ...rangeParameters].filter((parameter): parameter is GeneratedField => Boolean(parameter));
    const sourceNames = new Set(allParameters.map((parameter) => parameter.sourceName));
    for (const sourceName of sourceNames) usedSourceNames.add(sourceName);

    options.push({
      name: queryOptionName(baseSourceName, 'Filter'),
      displayName: queryOptionDisplayName(baseSourceName),
      type: allParameters[0]?.type ?? 'string',
      kind: 'operator',
      operators: allParameters.map((parameter) => {
        const parsed = parseWhereParameter(parameter.sourceName);
        const operator = parsed?.operator ?? 'eq';
        return {
          name: operatorLabel(operator),
          value: operator,
          sourceName: parameter.sourceName,
        };
      }),
    });
  }

  for (const parameter of parameters) {
    if (usedSourceNames.has(parameter.sourceName)) continue;

    options.push({
      name: queryOptionName(parameter.sourceName),
      displayName: queryOptionDisplayName(parameter.sourceName),
      type: parameter.type,
      kind: 'single',
      sourceName: parameter.sourceName,
      valueOptions: parameter.valueOptions,
    });
  }

  return options;
}

function parameterField(parameter: any): GeneratedField {
  return {
    name: camelCase(parameter.name),
    sourceName: parameter.name,
    displayName: titleCase(parameter.name),
    required: Boolean(parameter.required),
    type: schemaType(parameter.schema),
    valueOptions: parameter.in === 'query' ? queryValueOptions(parameter) : undefined,
  };
}

function collectParameters(path: string, pathItem: any, operation: any, where: 'path' | 'query'): GeneratedField[] {
  const parameters = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])];
  const seen = new Set<string>();
  const context = operationQueryContext(path, operation);
  return parameters
    .filter((parameter) => {
      if (parameter?.in !== where || !parameter.name || seen.has(parameter.name)) return false;
      seen.add(parameter.name);
      return true;
    })
    .filter((parameter) => where !== 'query' || shouldRenderQueryParameter(parameter, context))
    .map((parameter) => parameterField(parameter));
}

function requestBodySchema(operation: any): JsonSchema | undefined {
  return operation.requestBody?.content?.['application/vnd.api+json']?.schema
    ?? operation.requestBody?.content?.['application/json']?.schema;
}

function collectAttributeFields(operation: any): GeneratedField[] {
  const attributes = requestBodySchema(operation)?.properties?.data?.properties?.attributes;
  const properties = attributes?.properties;
  if (!properties || typeof properties !== 'object') return [];

  const required = new Set<string>(attributes.required ?? []);
  return Object.entries(properties)
    .filter(([, schema]: [string, any]) => !schema?.readOnly && !schema?.writeOnly)
    .map(([name, schema]: [string, any]) => ({
      name: camelCase(name),
      sourceName: name,
      displayName: titleCase(name),
      required: required.has(name),
      type: schemaType(schema),
    }));
}

function relationshipDataSchema(schema: any): any {
  return schema?.properties?.data;
}

function relationshipLooksSimple(dataSchema: any): boolean {
  const itemSchema = dataSchema?.type === 'array' ? dataSchema.items : dataSchema;
  const properties = itemSchema?.properties;
  return Boolean(properties?.type && properties?.id);
}

function collectRelationshipFields(operation: any): GeneratedRelationshipField[] {
  const relationships = requestBodySchema(operation)?.properties?.data?.properties?.relationships?.properties;
  if (!relationships || typeof relationships !== 'object') return [];

  return Object.entries(relationships).flatMap(([name, schema]: [string, any]) => {
    const dataSchema = relationshipDataSchema(schema);
    if (!relationshipLooksSimple(dataSchema)) return [];

    const itemSchema = dataSchema.type === 'array' ? dataSchema.items : dataSchema;
    const relationshipType = itemSchema?.properties?.type?.enum?.[0] ?? name;
    const multiple = dataSchema.type === 'array';

    return [
      {
        name: `${camelCase(name)}Ids`,
        displayName: `${titleCase(name)} ID${multiple ? 's' : ''}`,
        relationshipName: name,
        relationshipType,
        multiple,
      },
    ];
  });
}

function isListOperation(method: string, path: string): boolean {
  return operationAction(method, path) === 'List';
}

function requestPath(config: ProductConfig, path: string): string {
  const prefix = `/${config.product}/v2`;
  if (path.startsWith(prefix)) return path;
  if (!path) return prefix;
  return `${prefix}${path.startsWith('/') ? path : `/${path}`}`;
}

export async function buildProductGeneration(config: ProductConfig): Promise<ProductGenerationResult> {
  const file = snapshotPath(config);
  const spec = JSON.parse(await readFile(file, 'utf8'));
  const api = (await SwaggerParser.dereference(spec)) as any;
  const operations: GeneratedOperation[] = [];
  const exclusions: string[] = [];

  for (const [path, pathItem] of Object.entries<any>(api.paths ?? {})) {
    for (const [method, operation] of Object.entries<any>(pathItem)) {
      if (!HTTP_METHODS.has(method)) continue;
      if (!operation || typeof operation !== 'object') {
        exclusions.push(`${method.toUpperCase()} ${path}: operation is not an object`);
        continue;
      }

      const id = operation.operationId ? camelCase(operation.operationId) : camelCase(`${method} ${path}`);
      const queryParameters = collectParameters(path, pathItem, operation, 'query');
      operations.push({
        id,
        resource: resourceLabel(operation, path),
        operation: operationLabel(operation, method, path),
        description: operation.description ?? operation.summary ?? `${method.toUpperCase()} ${path}`,
        method: method.toUpperCase() as HttpMethod,
        path: requestPath(config, path),
        deprecated: Boolean(operation.deprecated),
        isList: isListOperation(method, path),
        pathParameters: collectParameters(path, pathItem, operation, 'path'),
        queryParameters,
        queryOptions: buildQueryOptions(queryParameters),
        attributeFields: collectAttributeFields(operation),
        relationshipFields: collectRelationshipFields(operation),
      });
    }
  }

  const resources = new Set(operations.map((operation) => operation.resource));
  operations.sort((a, b) => `${a.resource}:${a.operation}:${a.id}`.localeCompare(`${b.resource}:${b.operation}:${b.id}`));

  return {
    product: config.product,
    displayName: config.displayName,
    className: config.className,
    operationCount: operations.length,
    resourceCount: resources.size,
    operations,
    exclusions,
  };
}
