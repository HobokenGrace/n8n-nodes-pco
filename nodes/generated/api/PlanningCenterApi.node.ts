import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, ILoadOptionsFunctions, INodeExecutionData, INodeListSearchResult, INodeType, INodeTypeDescription } from 'n8n-workflow';

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
  description?: string;
  defaultValue?: string | number | boolean;
  format?: 'date-time';
  valueKind?: 'scalar' | 'stringCollection';
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
  stability: 'official' | 'unofficial';
  method: IHttpRequestMethods;
  path: string;
  deprecated: boolean;
  isList: boolean;
  lookupTarget: string;
  pathParameters: GeneratedField[];
  queryParameters: GeneratedField[];
  ordinaryQueryFields?: GeneratedField[];
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/connected_applications",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "connected application",
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/connected_applications/{connected_application_id}/people",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "connected application person",
    "pathParameters": [
      {
        "name": "connectedApplicationId",
        "sourceName": "connected_application_id",
        "displayName": "Connected Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetConnectedApplicationsConnectedApplicationIdPeopleConnectedApplicationId",
          "sourcePath": "/api/v2/connected_applications",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/connected_applications/{connected_application_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "connected application",
    "pathParameters": [
      {
        "name": "connectedApplicationId",
        "sourceName": "connected_application_id",
        "displayName": "Connected Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetConnectedApplicationsConnectedApplicationIdConnectedApplicationId",
          "sourcePath": "/api/v2/connected_applications",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/connected_applications/{connected_application_id}/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "connected application person",
    "pathParameters": [
      {
        "name": "connectedApplicationId",
        "sourceName": "connected_application_id",
        "displayName": "Connected Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetConnectedApplicationsConnectedApplicationIdPeoplePersonIdConnectedApplicationId",
          "sourcePath": "/api/v2/connected_applications",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/oauth_applications/{oauth_application_id}/mau",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "oauth application mau",
    "pathParameters": [
      {
        "name": "oauthApplicationId",
        "sourceName": "oauth_application_id",
        "displayName": "Oauth Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetOauthApplicationsOauthApplicationIdMauOauthApplicationId",
          "sourcePath": "/api/v2/oauth_applications",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/oauth_applications",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "oauth application",
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/oauth_applications/{oauth_application_id}/mau/{mau_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "oauth application mau",
    "pathParameters": [
      {
        "name": "oauthApplicationId",
        "sourceName": "oauth_application_id",
        "displayName": "Oauth Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetOauthApplicationsOauthApplicationIdMauMauIdOauthApplicationId",
          "sourcePath": "/api/v2/oauth_applications",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/oauth_applications/{oauth_application_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "oauth application",
    "pathParameters": [
      {
        "name": "oauthApplicationId",
        "sourceName": "oauth_application_id",
        "displayName": "Oauth Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetOauthApplicationsOauthApplicationIdOauthApplicationId",
          "sourcePath": "/api/v2/oauth_applications",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/personal_access_tokens",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "personal access token",
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
    "stability": "official",
    "method": "GET",
    "path": "/api/v2/personal_access_tokens/{personal_access_token_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "personal access token",
    "pathParameters": [
      {
        "name": "personalAccessTokenId",
        "sourceName": "personal_access_token_id",
        "displayName": "Personal Access Token ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPersonalAccessTokensPersonalAccessTokenIdPersonalAccessTokenId",
          "sourcePath": "/api/v2/personal_access_tokens",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  }
];

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = {
  "searchGetConnectedApplicationsConnectedApplicationIdConnectedApplicationId": {
    "methodName": "searchGetConnectedApplicationsConnectedApplicationIdConnectedApplicationId",
    "sourcePath": "/api/v2/connected_applications",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetConnectedApplicationsConnectedApplicationIdPeopleConnectedApplicationId": {
    "methodName": "searchGetConnectedApplicationsConnectedApplicationIdPeopleConnectedApplicationId",
    "sourcePath": "/api/v2/connected_applications",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetConnectedApplicationsConnectedApplicationIdPeoplePersonIdConnectedApplicationId": {
    "methodName": "searchGetConnectedApplicationsConnectedApplicationIdPeoplePersonIdConnectedApplicationId",
    "sourcePath": "/api/v2/connected_applications",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetOauthApplicationsOauthApplicationIdMauMauIdOauthApplicationId": {
    "methodName": "searchGetOauthApplicationsOauthApplicationIdMauMauIdOauthApplicationId",
    "sourcePath": "/api/v2/oauth_applications",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetOauthApplicationsOauthApplicationIdMauOauthApplicationId": {
    "methodName": "searchGetOauthApplicationsOauthApplicationIdMauOauthApplicationId",
    "sourcePath": "/api/v2/oauth_applications",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetOauthApplicationsOauthApplicationIdOauthApplicationId": {
    "methodName": "searchGetOauthApplicationsOauthApplicationIdOauthApplicationId",
    "sourcePath": "/api/v2/oauth_applications",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetPersonalAccessTokensPersonalAccessTokenIdPersonalAccessTokenId": {
    "methodName": "searchGetPersonalAccessTokensPersonalAccessTokenIdPersonalAccessTokenId",
    "sourcePath": "/api/v2/personal_access_tokens",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  }
};

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Connected Application\",\"value\":\"Connected Application\"},{\"name\":\"Oauth Application\",\"value\":\"Oauth Application\"},{\"name\":\"Personal Access Token\",\"value\":\"Personal Access Token\"}],\n      default: \"Connected Application\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"]}},\n      options: [{\"name\":\"List Connected Applications\",\"value\":\"getConnectedApplications\",\"description\":\"GET /connected_applications\",\"action\":\"List Connected Applications\"},{\"name\":\"List People (via Connected Application)\",\"value\":\"getConnectedApplicationsConnectedApplicationIdPeople\",\"description\":\"GET /connected_applications/{connected_application_id}/people\",\"action\":\"List People (via Connected Application)\"},{\"name\":\"Get Connected Application\",\"value\":\"getConnectedApplicationsConnectedApplicationId\",\"description\":\"GET /connected_applications/{connected_application_id}\",\"action\":\"Get Connected Application\"},{\"name\":\"Get Person (via Connected Application)\",\"value\":\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\",\"description\":\"GET /connected_applications/{connected_application_id}/people/{person_id}\",\"action\":\"Get Person (via Connected Application)\"}],\n      default: \"getConnectedApplications\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"]}},\n      options: [{\"name\":\"List Mau (via Oauth Application)\",\"value\":\"getOauthApplicationsOauthApplicationIdMau\",\"description\":\"GET /oauth_applications/{oauth_application_id}/mau\",\"action\":\"List Mau (via Oauth Application)\"},{\"name\":\"List Oauth Applications\",\"value\":\"getOauthApplications\",\"description\":\"GET /oauth_applications\",\"action\":\"List Oauth Applications\"},{\"name\":\"Get Mau (via Oauth Application)\",\"value\":\"getOauthApplicationsOauthApplicationIdMauMauId\",\"description\":\"GET /oauth_applications/{oauth_application_id}/mau/{mau_id}\",\"action\":\"Get Mau (via Oauth Application)\"},{\"name\":\"Get Oauth Application\",\"value\":\"getOauthApplicationsOauthApplicationId\",\"description\":\"GET /oauth_applications/{oauth_application_id}\",\"action\":\"Get Oauth Application\"}],\n      default: \"getOauthApplicationsOauthApplicationIdMau\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"]}},\n      options: [{\"name\":\"List Personal Access Tokens\",\"value\":\"getPersonalAccessTokens\",\"description\":\"GET /personal_access_tokens\",\"action\":\"List Personal Access Tokens\"},{\"name\":\"Get Personal Access Token\",\"value\":\"getPersonalAccessTokensPersonalAccessTokenId\",\"description\":\"GET /personal_access_tokens/{personal_access_token_id}\",\"action\":\"Get Personal Access Token\"}],\n      default: \"getPersonalAccessTokens\",\n    },\n    {\n      displayName: 'Return All',\n      name: \"getConnectedApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getConnectedApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplications\"],\"getConnectedApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Connected Application ID\",\n      name: \"getConnectedApplicationsConnectedApplicationIdPeople_connectedApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetConnectedApplicationsConnectedApplicationIdPeopleConnectedApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getConnectedApplicationsConnectedApplicationIdPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getConnectedApplicationsConnectedApplicationIdPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"],\"getConnectedApplicationsConnectedApplicationIdPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Connected Application ID\",\n      name: \"getConnectedApplicationsConnectedApplicationId_connectedApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetConnectedApplicationsConnectedApplicationIdConnectedApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Connected Application ID\",\n      name: \"getConnectedApplicationsConnectedApplicationIdPeoplePersonId_connectedApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetConnectedApplicationsConnectedApplicationIdPeoplePersonIdConnectedApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getConnectedApplicationsConnectedApplicationIdPeoplePersonId_personId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Connected Application\"],\"operation\":[\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Oauth Application ID\",\n      name: \"getOauthApplicationsOauthApplicationIdMau_oauthApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetOauthApplicationsOauthApplicationIdMauOauthApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getOauthApplicationsOauthApplicationIdMau_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getOauthApplicationsOauthApplicationIdMau_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"],\"getOauthApplicationsOauthApplicationIdMau_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMau\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getOauthApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getOauthApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplications\"],\"getOauthApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Oauth Application ID\",\n      name: \"getOauthApplicationsOauthApplicationIdMauMauId_oauthApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetOauthApplicationsOauthApplicationIdMauMauIdOauthApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMauMauId\"]}},\n    },\n    {\n      displayName: \"Mau ID\",\n      name: \"getOauthApplicationsOauthApplicationIdMauMauId_mauId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMauMauId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationIdMauMauId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Oauth Application ID\",\n      name: \"getOauthApplicationsOauthApplicationId_oauthApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetOauthApplicationsOauthApplicationIdOauthApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Oauth Application\"],\"operation\":[\"getOauthApplicationsOauthApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPersonalAccessTokens_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokens\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPersonalAccessTokens_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokens\"],\"getPersonalAccessTokens_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokens\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Personal Access Token ID\",\n      name: \"getPersonalAccessTokensPersonalAccessTokenId_personalAccessTokenId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPersonalAccessTokensPersonalAccessTokenIdPersonalAccessTokenId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokensPersonalAccessTokenId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Personal Access Token\"],\"operation\":[\"getPersonalAccessTokensPersonalAccessTokenId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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
  const terms = filter.trim().split(/\s+/).filter(Boolean);
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
    const options = context.getNodeParameter(`${operation.id}_${option.group}`, itemIndex, {}) as Record<string, QueryOptionSelection | QueryOptionSelection[] | undefined>;
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

function addOrdinaryQuery(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  for (const field of operation.ordinaryQueryFields ?? []) {
    const value = field.required
      ? context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex)
      : context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, '');
    if (value !== undefined && value !== '') qs[field.sourceName] = value;
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
    let attributeValue = field.lookup ? extractResourceLocatorId(value) : value;
    if (field.valueKind === 'stringCollection') {
      attributeValue = Array.isArray(attributeValue)
        ? attributeValue
        : String(attributeValue ?? '').split(',').map((item) => item.trim()).filter(Boolean);
    }
    if (attributeValue !== undefined && attributeValue !== '' && (field.required || !Array.isArray(attributeValue) || attributeValue.length)) {
      attributes[field.sourceName] = attributeValue;
    }
  }

  const relationships: Record<string, unknown> = {};
  for (const field of operation.relationshipFields) {
    const rawValue = context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, '');
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
      ...(operation.jsonApiType ? { type: operation.jsonApiType } : {}),
      ...(Object.keys(attributes).length ? { attributes } : {}),
      ...(Object.keys(relationships).length ? { relationships } : {}),
    },
  };
}

function buildPath(context: IExecuteFunctions, itemIndex: number, operation: Operation): string {
  let path = operation.path;
  for (const parameter of operation.pathParameters) {
    const value = extractResourceLocatorId(context.getNodeParameter(`${operation.id}_${parameter.name}`, itemIndex));
    path = path.replace(`{${parameter.sourceName}}`, encodeURIComponent(value));
  }
  return path;
}

async function executeOperation(context: IExecuteFunctions, itemIndex: number, operation: Operation): Promise<INodeExecutionData[]> {
  const qs: IDataObject = {};
  addQueryOptions(context, itemIndex, operation, qs);
  addOrdinaryQuery(context, itemIndex, operation, qs);
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
    subtitle: "={{({\"getConnectedApplications\":\"GET /connected_applications\",\"getConnectedApplicationsConnectedApplicationIdPeople\":\"GET /connected_applications/{connected_application_id}/people\",\"getConnectedApplicationsConnectedApplicationId\":\"GET /connected_applications/{connected_application_id}\",\"getConnectedApplicationsConnectedApplicationIdPeoplePersonId\":\"GET /connected_applications/{connected_application_id}/people/{person_id}\",\"getOauthApplicationsOauthApplicationIdMau\":\"GET /oauth_applications/{oauth_application_id}/mau\",\"getOauthApplications\":\"GET /oauth_applications\",\"getOauthApplicationsOauthApplicationIdMauMauId\":\"GET /oauth_applications/{oauth_application_id}/mau/{mau_id}\",\"getOauthApplicationsOauthApplicationId\":\"GET /oauth_applications/{oauth_application_id}\",\"getPersonalAccessTokens\":\"GET /personal_access_tokens\",\"getPersonalAccessTokensPersonalAccessTokenId\":\"GET /personal_access_tokens/{personal_access_token_id}\"})[$parameter[\"operation\"]] || $parameter[\"operation\"]}}",
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

  methods = {
    listSearch: {
      searchGetConnectedApplicationsConnectedApplicationIdConnectedApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetConnectedApplicationsConnectedApplicationIdConnectedApplicationId"], filter);
      },
      searchGetConnectedApplicationsConnectedApplicationIdPeopleConnectedApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetConnectedApplicationsConnectedApplicationIdPeopleConnectedApplicationId"], filter);
      },
      searchGetConnectedApplicationsConnectedApplicationIdPeoplePersonIdConnectedApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetConnectedApplicationsConnectedApplicationIdPeoplePersonIdConnectedApplicationId"], filter);
      },
      searchGetOauthApplicationsOauthApplicationIdMauMauIdOauthApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetOauthApplicationsOauthApplicationIdMauMauIdOauthApplicationId"], filter);
      },
      searchGetOauthApplicationsOauthApplicationIdMauOauthApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetOauthApplicationsOauthApplicationIdMauOauthApplicationId"], filter);
      },
      searchGetOauthApplicationsOauthApplicationIdOauthApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetOauthApplicationsOauthApplicationIdOauthApplicationId"], filter);
      },
      searchGetPersonalAccessTokensPersonalAccessTokenIdPersonalAccessTokenId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPersonalAccessTokensPersonalAccessTokenIdPersonalAccessTokenId"], filter);
      },
    },
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
