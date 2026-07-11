import SwaggerParser from '@apidevtools/swagger-parser';
import { readFile } from 'node:fs/promises';

import type { ProductConfig } from './config';
import { snapshotPath } from './config';
import type {
  GeneratedField,
  GeneratedOperation,
  GeneratedRelationshipField,
  HttpMethod,
  ProductGenerationResult,
} from './model';

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete']);
const GENERIC_TAGS = new Set(['default', 'api', 'openapi']);

type JsonSchema = Record<string, any>;

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

function operationLabel(operation: any, method: string, path: string): string {
  const source = operation.operationId ?? operation.summary;
  const label = source ? titleCase(source) : `${method.toUpperCase()} ${path}`;
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

function parameterField(parameter: any): GeneratedField {
  return {
    name: camelCase(parameter.name),
    sourceName: parameter.name,
    displayName: titleCase(parameter.name),
    required: Boolean(parameter.required),
    type: schemaType(parameter.schema),
  };
}

function collectParameters(pathItem: any, operation: any, where: 'path' | 'query'): GeneratedField[] {
  const parameters = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])];
  const seen = new Set<string>();
  return parameters
    .filter((parameter) => parameter?.in === where && parameter.name && !seen.has(parameter.name))
    .map((parameter) => {
      seen.add(parameter.name);
      return parameterField(parameter);
    });
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
  const last = path.split('/').filter(Boolean).at(-1) ?? '';
  return method === 'get' && !last.startsWith('{');
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
      operations.push({
        id,
        resource: resourceLabel(operation, path),
        operation: operationLabel(operation, method, path),
        description: operation.description ?? operation.summary ?? `${method.toUpperCase()} ${path}`,
        method: method.toUpperCase() as HttpMethod,
        path: requestPath(config, path),
        deprecated: Boolean(operation.deprecated),
        isList: isListOperation(method, path),
        pathParameters: collectParameters(pathItem, operation, 'path'),
        queryParameters: collectParameters(pathItem, operation, 'query'),
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
