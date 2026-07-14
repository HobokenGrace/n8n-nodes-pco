import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

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

const OPERATIONS: Operation[] = [
  {
    "id": "getConnectedApplications",
    "resource": "Connected Application",
    "operation": "List Connected Applications",
    "description": "GET /connected_applications",
    "method": "GET",
    "path": "/api/v2/connected_applications",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getConnectedApplicationsConnectedApplicationIdPeople",
    "resource": "Connected Application",
    "operation": "List People (via Connected Application)",
    "description": "GET /connected_applications/{connected_application_id}/people",
    "method": "GET",
    "path": "/api/v2/connected_applications/{connected_application_id}/people",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "connectedApplicationId",
        "sourceName": "connected_application_id",
        "displayName": "Connected Application ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getConnectedApplicationsConnectedApplicationId",
    "resource": "Connected Application",
    "operation": "Get Connected Application",
    "description": "GET /connected_applications/{connected_application_id}",
    "method": "GET",
    "path": "/api/v2/connected_applications/{connected_application_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "connectedApplicationId",
        "sourceName": "connected_application_id",
        "displayName": "Connected Application ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getConnectedApplicationsConnectedApplicationIdPeoplePersonId",
    "resource": "Connected Application",
    "operation": "Get Person (via Connected Application)",
    "description": "GET /connected_applications/{connected_application_id}/people/{person_id}",
    "method": "GET",
    "path": "/api/v2/connected_applications/{connected_application_id}/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "connectedApplicationId",
        "sourceName": "connected_application_id",
        "displayName": "Connected Application ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOauthApplicationsOauthApplicationIdMau",
    "resource": "Oauth Application",
    "operation": "List Mau (via Oauth Application)",
    "description": "GET /oauth_applications/{oauth_application_id}/mau",
    "method": "GET",
    "path": "/api/v2/oauth_applications/{oauth_application_id}/mau",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "oauthApplicationId",
        "sourceName": "oauth_application_id",
        "displayName": "Oauth Application ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOauthApplications",
    "resource": "Oauth Application",
    "operation": "List Oauth Applications",
    "description": "GET /oauth_applications",
    "method": "GET",
    "path": "/api/v2/oauth_applications",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOauthApplicationsOauthApplicationIdMauMauId",
    "resource": "Oauth Application",
    "operation": "Get Mau (via Oauth Application)",
    "description": "GET /oauth_applications/{oauth_application_id}/mau/{mau_id}",
    "method": "GET",
    "path": "/api/v2/oauth_applications/{oauth_application_id}/mau/{mau_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "oauthApplicationId",
        "sourceName": "oauth_application_id",
        "displayName": "Oauth Application ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "mauId",
        "sourceName": "mau_id",
        "displayName": "Mau ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOauthApplicationsOauthApplicationId",
    "resource": "Oauth Application",
    "operation": "Get Oauth Application",
    "description": "GET /oauth_applications/{oauth_application_id}",
    "method": "GET",
    "path": "/api/v2/oauth_applications/{oauth_application_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "oauthApplicationId",
        "sourceName": "oauth_application_id",
        "displayName": "Oauth Application ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPersonalAccessTokens",
    "resource": "Personal Access Token",
    "operation": "List Personal Access Tokens",
    "description": "GET /personal_access_tokens",
    "method": "GET",
    "path": "/api/v2/personal_access_tokens",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPersonalAccessTokensPersonalAccessTokenId",
    "resource": "Personal Access Token",
    "operation": "Get Personal Access Token",
    "description": "GET /personal_access_tokens/{personal_access_token_id}",
    "method": "GET",
    "path": "/api/v2/personal_access_tokens/{personal_access_token_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personalAccessTokenId",
        "sourceName": "personal_access_token_id",
        "displayName": "Personal Access Token ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  }
];

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Connected Application\",\"value\":\"Connected Application\"},{\"name\":\"Oauth Application\",\"value\":\"Oauth Application\"},{\"name\":\"Personal Access Token\",\"value\":\"Personal Access Token\"}],\n      default: \"Connected Application\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"]}},\n      options: [{\"name\":\"List Connected Applications\",\"value\":\"getConnectedApplications\",\"description\":\"GET /connected_applications\",\"action\":\"List Connected Applications\"},{\"name\":\"List People (via Connected Application)\",\"value\":\"getConnectedApplicationsConnectedApplicationIdPeople\",\"description\":\"GET /connected_applications/{connected_application_id}/people\",\"action\":\"List People (via Connected Application)\"},{\"name\":\"Get Connected Application\",\"value\":\"getConnectedApplicationsConnectedApplicationId\",\"description\":\"GET /connected_applications/{connected_application_id}\",\"action\":\"Get Connected Application\"},{\"name\":\"Get Person (via Connected Application)\",\"value\":\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\",\"description\":\"GET /connected_applications/{connected_application_id}/people/{person_id}\",\"action\":\"Get Person (via Connected Application)\"}],\n      default: \"getConnectedApplications\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"]}},\n      options: [{\"name\":\"List Mau (via Oauth Application)\",\"value\":\"getOauthApplicationsOauthApplicationIdMau\",\"description\":\"GET /oauth_applications/{oauth_application_id}/mau\",\"action\":\"List Mau (via Oauth Application)\"},{\"name\":\"List Oauth Applications\",\"value\":\"getOauthApplications\",\"description\":\"GET /oauth_applications\",\"action\":\"List Oauth Applications\"},{\"name\":\"Get Mau (via Oauth Application)\",\"value\":\"getOauthApplicationsOauthApplicationIdMauMauId\",\"description\":\"GET /oauth_applications/{oauth_application_id}/mau/{mau_id}\",\"action\":\"Get Mau (via Oauth Application)\"},{\"name\":\"Get Oauth Application\",\"value\":\"getOauthApplicationsOauthApplicationId\",\"description\":\"GET /oauth_applications/{oauth_application_id}\",\"action\":\"Get Oauth Application\"}],\n      default: \"getOauthApplicationsOauthApplicationIdMau\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"]}},\n      options: [{\"name\":\"List Personal Access Tokens\",\"value\":\"getPersonalAccessTokens\",\"description\":\"GET /personal_access_tokens\",\"action\":\"List Personal Access Tokens\"},{\"name\":\"Get Personal Access Token\",\"value\":\"getPersonalAccessTokensPersonalAccessTokenId\",\"description\":\"GET /personal_access_tokens/{personal_access_token_id}\",\"action\":\"Get Personal Access Token\"}],\n      default: \"getPersonalAccessTokens\",\n    },\n    {\n      displayName: 'Return All',\n      name: \"getConnectedApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getConnectedApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplications\"],\"getConnectedApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Connected Application ID\",\n      name: \"getConnectedApplicationsConnectedApplicationIdPeople_connectedApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getConnectedApplicationsConnectedApplicationIdPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getConnectedApplicationsConnectedApplicationIdPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"],\"getConnectedApplicationsConnectedApplicationIdPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Connected Application ID\",\n      name: \"getConnectedApplicationsConnectedApplicationId_connectedApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Connected Application ID\",\n      name: \"getConnectedApplicationsConnectedApplicationIdPeoplePersonId_connectedApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getConnectedApplicationsConnectedApplicationIdPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Oauth Application ID\",\n      name: \"getOauthApplicationsOauthApplicationIdMau_oauthApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getOauthApplicationsOauthApplicationIdMau_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getOauthApplicationsOauthApplicationIdMau_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"],\"getOauthApplicationsOauthApplicationIdMau_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getOauthApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getOauthApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplications\"],\"getOauthApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Oauth Application ID\",\n      name: \"getOauthApplicationsOauthApplicationIdMauMauId_oauthApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMauMauId\"]}},\n    },\n    {\n      displayName: \"Mau ID\",\n      name: \"getOauthApplicationsOauthApplicationIdMauMauId_mauId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMauMauId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMauMauId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Oauth Application ID\",\n      name: \"getOauthApplicationsOauthApplicationId_oauthApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPersonalAccessTokens_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokens\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPersonalAccessTokens_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokens\"],\"getPersonalAccessTokens_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokens\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Personal Access Token ID\",\n      name: \"getPersonalAccessTokensPersonalAccessTokenId_personalAccessTokenId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokensPersonalAccessTokenId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokensPersonalAccessTokenId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

function addAdditionalQuery(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const additional = context.getNodeParameter('additionalQueryParameters', itemIndex, {}) as { parameters?: Array<{ name?: string; value?: unknown }> };
  for (const parameter of additional.parameters ?? []) {
    if (parameter.name) {
      qs[parameter.name] = parameter.value;
    }
  }
}

function addQueryOptions(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const options = context.getNodeParameter(`${operation.id}_options`, itemIndex, {}) as Record<string, { operator?: string; value?: unknown } | undefined>;
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
      ? context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex)
      : context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, '');
    if (value !== undefined && value !== '') {
      attributes[field.sourceName] = value;
    }
  }

  const relationships: Record<string, unknown> = {};
  for (const field of operation.relationshipFields) {
    const value = context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, '') as string;
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
    const value = context.getNodeParameter(`${operation.id}_${parameter.name}`, itemIndex) as string;
    path = path.replace(`{${parameter.sourceName}}`, encodeURIComponent(value));
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
        returnAll: context.getNodeParameter(`${operation.id}_returnAll`, itemIndex, false) as boolean,
        limit: context.getNodeParameter(`${operation.id}_limit`, itemIndex, 100) as number,
      })
    : normalizeJsonApiResponse(await planningCenterApiRequest.call(context, request));

  return data.map((json) => ({ json, pairedItem: { item: itemIndex } }));
}

export class PlanningCenterApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center API",
    name: "planningCenterApi",
    icon: 'file:api.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Planning Center API generated from the Planning Center OpenAPI snapshot.",
    defaults: {
      name: "Planning Center API",
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
        throw new Error(`Unsupported Planning Center API operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
