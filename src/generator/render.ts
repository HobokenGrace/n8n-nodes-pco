import type { ProductConfig } from './config';
import { normalizeIdentifierDisplayLabel } from './labels';
import type { GeneratedField, GeneratedOperation, ProductGenerationResult } from './model';

function q(value: unknown): string {
  return JSON.stringify(value);
}

function bodyFieldDisplayName(prefix: 'Attribute' | 'Relationship', displayName: string): string {
  return `${prefix}: ${normalizeIdentifierDisplayLabel(displayName)}`;
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
      type: ${q(field.type)},
      default: ${field.type === 'number' ? 'undefined' : field.type === 'boolean' ? 'false' : "''"},
      required: ${field.required},
      displayOptions: ${q(displayOptions)},
    },`;
}

function renderOperations(operations: GeneratedOperation[]): string {
  const runtimeOperations = operations.map((operation) => ({
    ...operation,
    queryParameters: operation.queryParameters.map(({ valueOptions: _valueOptions, ...parameter }) => parameter),
    queryOptions: operation.queryOptions.map(({ valueOptions: _valueOptions, ...option }) => option),
  }));
  return JSON.stringify(runtimeOperations, null, 2);
}

function renderQueryOptionsProperty(operation: GeneratedOperation): string | undefined {
  if (!operation.queryOptions.length) return undefined;

  const displayOptions = { show: { resource: [operation.resource], operation: [operation.id] } };
  const options = operation.queryOptions.map((option) => ({
    displayName: option.displayName,
    name: option.name,
    values: [
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
        type: option.valueOptions?.length ? 'options' : option.type,
        ...(option.valueOptions?.length ? { options: option.valueOptions } : {}),
        default: option.valueOptions?.length ? '' : option.type === 'number' ? undefined : option.type === 'boolean' ? false : '',
      },
    ],
  }));

  return `    {
      displayName: 'Options',
      name: ${q(`${operation.id}_options`)},
      type: 'fixedCollection',
      default: {},
      placeholder: 'Add Option',
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

    const queryOptionsProperty = renderQueryOptionsProperty(operation);
    if (queryOptionsProperty) fields.push(queryOptionsProperty);

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
      type: 'string',
      default: '',
      description: ${q(relationship.multiple ? 'Comma-separated relationship IDs.' : 'Relationship ID.')},
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
  return `import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { executeItemWithContinueOnFail } from '../../../src/runtime/execute';
import { normalizeJsonApiResponse } from '../../../src/runtime/jsonApi';
import { collectPaginatedPlanningCenterResults } from '../../../src/runtime/pagination';
import { planningCenterApiRequest } from '../../../src/runtime/request';

interface GeneratedField {
  name: string;
  sourceName: string;
  displayName: string;
  required: boolean;
  type: 'boolean' | 'number' | 'string';
}

interface GeneratedQueryOptionOperator {
  name: string;
  value: string;
  sourceName: string;
}

interface GeneratedQueryOption {
  name: string;
  displayName: string;
  type: 'boolean' | 'number' | 'string';
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: GeneratedQueryOptionOperator[];
}

interface GeneratedRelationshipField {
  name: string;
  displayName: string;
  relationshipName: string;
  relationshipType: string;
  multiple: boolean;
}

interface Operation {
  id: string;
  resource: string;
  operation: string;
  description: string;
  method: IHttpRequestMethods;
  path: string;
  deprecated: boolean;
  isList: boolean;
  pathParameters: GeneratedField[];
  queryParameters: GeneratedField[];
  queryOptions: GeneratedQueryOption[];
  attributeFields: GeneratedField[];
  relationshipFields: GeneratedRelationshipField[];
}

const OPERATIONS: Operation[] = ${renderOperations(result.operations)};

const NODE_PROPERTIES = Function('return ' + ${q(renderProperties(result.operations))})() as any;

function addAdditionalQuery(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const additional = context.getNodeParameter('additionalQueryParameters', itemIndex, {}) as { parameters?: Array<{ name?: string; value?: unknown }> };
  for (const parameter of additional.parameters ?? []) {
    if (parameter.name) {
      qs[parameter.name] = parameter.value;
    }
  }
}

function addQueryOptions(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const options = context.getNodeParameter(\`${'${operation.id}'}_options\`, itemIndex, {}) as Record<string, { operator?: string; value?: unknown } | undefined>;
  for (const option of operation.queryOptions) {
    const selected = options[option.name];
    const value = selected?.value;
    if (value === undefined || value === '') continue;

    if (option.kind === 'operator') {
      const operator = option.operators?.find((candidate) => candidate.value === selected?.operator) ?? option.operators?.[0];
      if (operator) qs[operator.sourceName] = value;
      continue;
    }

    if (option.sourceName) {
      qs[option.sourceName] = value;
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
    if (value !== undefined && value !== '') {
      attributes[field.sourceName] = value;
    }
  }

  const relationships: Record<string, unknown> = {};
  for (const field of operation.relationshipFields) {
    const value = context.getNodeParameter(\`${'${operation.id}'}_\${field.name}\`, itemIndex, '') as string;
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
      type: operation.resource,
      ...(Object.keys(attributes).length ? { attributes } : {}),
      ...(Object.keys(relationships).length ? { relationships } : {}),
    },
  };
}

function buildPath(context: IExecuteFunctions, itemIndex: number, operation: Operation): string {
  let path = operation.path;
  for (const parameter of operation.pathParameters) {
    const value = context.getNodeParameter(\`${'${operation.id}'}_\${parameter.name}\`, itemIndex) as string;
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
    icon: 'file:pco.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
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
