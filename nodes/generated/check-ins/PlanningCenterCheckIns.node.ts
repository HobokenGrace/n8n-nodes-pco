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
  group: 'filter' | 'order' | 'include';
  type: 'boolean' | 'number' | 'string';
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: GeneratedQueryOptionOperator[];
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
    "id": "getCheckInsCheckInIdCheckInGroup",
    "resource": "Check In",
    "operation": "List Check In Group (via Check In)",
    "description": "GET /check_ins/{check_in_id}/check_in_group",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/check_in_group",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckInTimes",
    "resource": "Check In",
    "operation": "List Check In Times (via Check In)",
    "description": "GET /check_ins/{check_in_id}/check_in_times",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/check_in_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
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
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns",
    "resource": "Check In",
    "operation": "List Check Ins (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns",
    "resource": "Check In",
    "operation": "List Check Ins (via Location Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdCheckIns",
    "resource": "Check In",
    "operation": "List Check Ins (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckIns",
    "resource": "Check In",
    "operation": "List Check Ins",
    "description": "GET /check_ins",
    "method": "GET",
    "path": "/check-ins/v2/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckedInAt",
    "resource": "Check In",
    "operation": "List Checked In At (via Check In)",
    "description": "GET /check_ins/{check_in_id}/checked_in_at",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/checked_in_at",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckedInBy",
    "resource": "Check In",
    "operation": "List Checked In By (via Check In)",
    "description": "GET /check_ins/{check_in_id}/checked_in_by",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/checked_in_by",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wheresearchName",
        "sourceName": "where[search_name]",
        "displayName": "Where[search Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wheresearchName",
        "displayName": "Search Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[search_name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckedOutBy",
    "resource": "Check In",
    "operation": "List Checked Out By (via Check In)",
    "description": "GET /check_ins/{check_in_id}/checked_out_by",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/checked_out_by",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wheresearchName",
        "sourceName": "where[search_name]",
        "displayName": "Where[search Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wheresearchName",
        "displayName": "Search Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[search_name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEvent",
    "resource": "Check In",
    "operation": "List Event (via Check In)",
    "description": "GET /check_ins/{check_in_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdEvent",
    "resource": "Check In",
    "operation": "List Event (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdEvent",
    "resource": "Check In",
    "operation": "List Event (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriod",
    "resource": "Check In",
    "operation": "List Event Period (via Check In)",
    "description": "GET /check_ins/{check_in_id}/event_period",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherestartsAt",
        "sourceName": "where[starts_at]",
        "displayName": "Where[starts At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgt",
        "sourceName": "where[starts_at][gt]",
        "displayName": "Where[starts At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgte",
        "sourceName": "where[starts_at][gte]",
        "displayName": "Where[starts At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlt",
        "sourceName": "where[starts_at][lt]",
        "displayName": "Where[starts At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlte",
        "sourceName": "where[starts_at][lte]",
        "displayName": "Where[starts At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAt",
        "sourceName": "where[ends_at]",
        "displayName": "Where[ends At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgt",
        "sourceName": "where[ends_at][gt]",
        "displayName": "Where[ends At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgte",
        "sourceName": "where[ends_at][gte]",
        "displayName": "Where[ends At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlt",
        "sourceName": "where[ends_at][lt]",
        "displayName": "Where[ends At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlte",
        "sourceName": "where[ends_at][lte]",
        "displayName": "Where[ends At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherestartsAtFilter",
        "displayName": "Starts At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "displayName": "Ends At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod",
    "resource": "Check In",
    "operation": "List Event Period (via Location Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/event_period",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/event_period",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherestartsAt",
        "sourceName": "where[starts_at]",
        "displayName": "Where[starts At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgt",
        "sourceName": "where[starts_at][gt]",
        "displayName": "Where[starts At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgte",
        "sourceName": "where[starts_at][gte]",
        "displayName": "Where[starts At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlt",
        "sourceName": "where[starts_at][lt]",
        "displayName": "Where[starts At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlte",
        "sourceName": "where[starts_at][lte]",
        "displayName": "Where[starts At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAt",
        "sourceName": "where[ends_at]",
        "displayName": "Where[ends At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgt",
        "sourceName": "where[ends_at][gt]",
        "displayName": "Where[ends At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgte",
        "sourceName": "where[ends_at][gte]",
        "displayName": "Where[ends At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlt",
        "sourceName": "where[ends_at][lt]",
        "displayName": "Where[ends At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlte",
        "sourceName": "where[ends_at][lte]",
        "displayName": "Where[ends At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherestartsAtFilter",
        "displayName": "Starts At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "displayName": "Ends At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventTimes",
    "resource": "Check In",
    "operation": "List Event Times (via Check In)",
    "description": "GET /check_ins/{check_in_id}/event_times",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes",
    "resource": "Check In",
    "operation": "List Event Times (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/event_times",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/event_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdIntegrationLinks",
    "resource": "Check In",
    "operation": "List Integration Links (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/integration_links",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/integration_links",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
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
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation",
    "resource": "Check In",
    "operation": "List Location (via Location Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/location",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/location",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods",
    "resource": "Check In",
    "operation": "List Location Event Periods (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods",
    "resource": "Check In",
    "operation": "List Location Event Periods (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/location_event_periods",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/location_event_periods",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocationEventTimes",
    "resource": "Check In",
    "operation": "List Location Event Times (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/location_event_times",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/location_event_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocationLabels",
    "resource": "Check In",
    "operation": "List Location Labels (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/location_labels",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/location_labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocations",
    "resource": "Check In",
    "operation": "List Locations (via Check In)",
    "description": "GET /check_ins/{check_in_id}/locations",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocations",
    "resource": "Check In",
    "operation": "List Locations (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/locations",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/locations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdOptions",
    "resource": "Check In",
    "operation": "List Options (via Check In)",
    "description": "GET /check_ins/{check_in_id}/options",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/options",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdOptions",
    "resource": "Check In",
    "operation": "List Options (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/options",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/options",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdParent",
    "resource": "Check In",
    "operation": "List Parent (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/parent",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/parent",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdPerson",
    "resource": "Check In",
    "operation": "List Person (via Check In)",
    "description": "GET /check_ins/{check_in_id}/person",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wheresearchName",
        "sourceName": "where[search_name]",
        "displayName": "Where[search Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wheresearchName",
        "displayName": "Search Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[search_name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId",
    "resource": "Check In",
    "operation": "Get Check In (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId",
    "resource": "Check In",
    "operation": "Get Check In (via Location Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId",
    "resource": "Check In",
    "operation": "Get Check In (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckInGroupCheckInGroupId",
    "resource": "Check In",
    "operation": "Get Check In Group (via Check In)",
    "description": "GET /check_ins/{check_in_id}/check_in_group/{check_in_group_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/check_in_group/{check_in_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckInTimesCheckInTimeId",
    "resource": "Check In",
    "operation": "Get Check In Time (via Check In)",
    "description": "GET /check_ins/{check_in_id}/check_in_times/{check_in_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/check_in_times/{check_in_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInTimeId",
        "sourceName": "check_in_time_id",
        "displayName": "Check In Time ID",
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
    "id": "getCheckInsCheckInId",
    "resource": "Check In",
    "operation": "Get Check In",
    "description": "GET /check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckedInAtCheckedInAtId",
    "resource": "Check In",
    "operation": "Get Checked In At (via Check In)",
    "description": "GET /check_ins/{check_in_id}/checked_in_at/{checked_in_at_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/checked_in_at/{checked_in_at_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkedInAtId",
        "sourceName": "checked_in_at_id",
        "displayName": "Checked In At ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckedInByCheckedInById",
    "resource": "Check In",
    "operation": "Get Checked In By (via Check In)",
    "description": "GET /check_ins/{check_in_id}/checked_in_by/{checked_in_by_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/checked_in_by/{checked_in_by_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkedInById",
        "sourceName": "checked_in_by_id",
        "displayName": "Checked In By ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdCheckedOutByCheckedOutById",
    "resource": "Check In",
    "operation": "Get Checked Out By (via Check In)",
    "description": "GET /check_ins/{check_in_id}/checked_out_by/{checked_out_by_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/checked_out_by/{checked_out_by_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkedOutById",
        "sourceName": "checked_out_by_id",
        "displayName": "Checked Out By ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventEventId",
    "resource": "Check In",
    "operation": "Get Event (via Check In)",
    "description": "GET /check_ins/{check_in_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId",
    "resource": "Check In",
    "operation": "Get Event (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdEventEventId",
    "resource": "Check In",
    "operation": "Get Event (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodId",
    "resource": "Check In",
    "operation": "Get Event Period (via Check In)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId",
    "resource": "Check In",
    "operation": "Get Event Period (via Location Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/event_period/{event_period_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/event_period/{event_period_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventTimesEventTimeId",
    "resource": "Check In",
    "operation": "Get Event Time (via Check In)",
    "description": "GET /check_ins/{check_in_id}/event_times/{event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_times/{event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId",
    "resource": "Check In",
    "operation": "Get Event Time (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/event_times/{event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/event_times/{event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId",
    "resource": "Check In",
    "operation": "Get Integration Link (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/integration_links/{integration_link_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/integration_links/{integration_link_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "integrationLinkId",
        "sourceName": "integration_link_id",
        "displayName": "Integration Link ID",
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
    "id": "getCheckInsCheckInIdLocationsLocationId",
    "resource": "Check In",
    "operation": "Get Location (via Check In)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId",
    "resource": "Check In",
    "operation": "Get Location (via Location Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/location/{location_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocationsLocationId",
    "resource": "Check In",
    "operation": "Get Location (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/locations/{location_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/locations/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId",
    "resource": "Check In",
    "operation": "Get Location Event Period (via Event Period)",
    "description": "GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId",
    "resource": "Check In",
    "operation": "Get Location Event Period (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/location_event_periods/{location_event_period_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/location_event_periods/{location_event_period_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "displayName": "Location Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId",
    "resource": "Check In",
    "operation": "Get Location Event Time (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/location_event_times/{location_event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/location_event_times/{location_event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId",
    "resource": "Check In",
    "operation": "Get Location Label (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/location_labels/{location_label_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/location_labels/{location_label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationLabelId",
        "sourceName": "location_label_id",
        "displayName": "Location Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdOptionsOptionId",
    "resource": "Check In",
    "operation": "Get Option (via Check In)",
    "description": "GET /check_ins/{check_in_id}/options/{option_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/options/{option_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "optionId",
        "sourceName": "option_id",
        "displayName": "Option ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdOptionsOptionId",
    "resource": "Check In",
    "operation": "Get Option (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/options/{option_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/options/{option_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "optionId",
        "sourceName": "option_id",
        "displayName": "Option ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdParentParentId",
    "resource": "Check In",
    "operation": "Get Parent (via Location)",
    "description": "GET /check_ins/{check_in_id}/locations/{location_id}/parent/{parent_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/parent/{parent_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "parentId",
        "sourceName": "parent_id",
        "displayName": "Parent ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCheckInsCheckInIdPersonPersonId",
    "resource": "Check In",
    "operation": "Get Person (via Check In)",
    "description": "GET /check_ins/{check_in_id}/person/{person_id}",
    "method": "GET",
    "path": "/check-ins/v2/check_ins/{check_in_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
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
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdAvailableLocations",
    "resource": "Event Time",
    "operation": "List Available Locations (via Event Time)",
    "description": "GET /event_times/{event_time_id}/available_locations",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/available_locations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdCheckIns",
    "resource": "Event Time",
    "operation": "List Check Ins (via Event Time)",
    "description": "GET /event_times/{event_time_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns",
    "resource": "Event Time",
    "operation": "List Check Ins (via Location Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdEvent",
    "resource": "Event Time",
    "operation": "List Event (via Event Time)",
    "description": "GET /event_times/{event_time_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdEventPeriod",
    "resource": "Event Time",
    "operation": "List Event Period (via Event Time)",
    "description": "GET /event_times/{event_time_id}/event_period",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/event_period",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherestartsAt",
        "sourceName": "where[starts_at]",
        "displayName": "Where[starts At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgt",
        "sourceName": "where[starts_at][gt]",
        "displayName": "Where[starts At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgte",
        "sourceName": "where[starts_at][gte]",
        "displayName": "Where[starts At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlt",
        "sourceName": "where[starts_at][lt]",
        "displayName": "Where[starts At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlte",
        "sourceName": "where[starts_at][lte]",
        "displayName": "Where[starts At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAt",
        "sourceName": "where[ends_at]",
        "displayName": "Where[ends At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgt",
        "sourceName": "where[ends_at][gt]",
        "displayName": "Where[ends At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgte",
        "sourceName": "where[ends_at][gte]",
        "displayName": "Where[ends At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlt",
        "sourceName": "where[ends_at][lt]",
        "displayName": "Where[ends At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlte",
        "sourceName": "where[ends_at][lte]",
        "displayName": "Where[ends At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherestartsAtFilter",
        "displayName": "Starts At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "displayName": "Ends At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime",
    "resource": "Event Time",
    "operation": "List Event Time (via Location Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/event_time",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/event_time",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimes",
    "resource": "Event Time",
    "operation": "List Event Times",
    "description": "GET /event_times",
    "method": "GET",
    "path": "/check-ins/v2/event_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdHeadcounts",
    "resource": "Event Time",
    "operation": "List Headcounts (via Event Time)",
    "description": "GET /event_times/{event_time_id}/headcounts",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/headcounts",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereattendanceTypeid",
        "sourceName": "where[attendance_type][id]",
        "displayName": "Where[attendance Type][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereattendanceTypeid",
        "displayName": "Attendance Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[attendance_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation",
    "resource": "Event Time",
    "operation": "List Location (via Location Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/location",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/location",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimes",
    "resource": "Event Time",
    "operation": "List Location Event Times (via Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdAvailableLocationsAvailableLocationId",
    "resource": "Event Time",
    "operation": "Get Available Location (via Event Time)",
    "description": "GET /event_times/{event_time_id}/available_locations/{available_location_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/available_locations/{available_location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "availableLocationId",
        "sourceName": "available_location_id",
        "displayName": "Available Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdCheckInsCheckInId",
    "resource": "Event Time",
    "operation": "Get Check In (via Event Time)",
    "description": "GET /event_times/{event_time_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId",
    "resource": "Event Time",
    "operation": "Get Check In (via Location Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdEventEventId",
    "resource": "Event Time",
    "operation": "Get Event (via Event Time)",
    "description": "GET /event_times/{event_time_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdEventPeriodEventPeriodId",
    "resource": "Event Time",
    "operation": "Get Event Period (via Event Time)",
    "description": "GET /event_times/{event_time_id}/event_period/{event_period_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/event_period/{event_period_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId",
    "resource": "Event Time",
    "operation": "Get Event Time (via Location Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/event_time/{event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/event_time/{event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeId",
    "resource": "Event Time",
    "operation": "Get Event Time",
    "description": "GET /event_times/{event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdHeadcountsHeadcountId",
    "resource": "Event Time",
    "operation": "Get Headcount (via Event Time)",
    "description": "GET /event_times/{event_time_id}/headcounts/{headcount_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/headcounts/{headcount_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "headcountId",
        "sourceName": "headcount_id",
        "displayName": "Headcount ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId",
    "resource": "Event Time",
    "operation": "Get Location (via Location Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/location/{location_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId",
    "resource": "Event Time",
    "operation": "Get Location Event Time (via Event Time)",
    "description": "GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "displayName": "Location Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendanceTypes",
    "resource": "Event",
    "operation": "List Attendance Types (via Event)",
    "description": "GET /events/{event_id}/attendance_types",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/attendance_types",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdCheckIns",
    "resource": "Event",
    "operation": "List Check Ins (via Event)",
    "description": "GET /events/{event_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdCurrentEventTimes",
    "resource": "Event",
    "operation": "List Current Event Times (via Event)",
    "description": "GET /events/{event_id}/current_event_times",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/current_event_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendanceTypesAttendanceTypeIdEvent",
    "resource": "Event",
    "operation": "List Event (via Attendance Type)",
    "description": "GET /events/{event_id}/attendance_types/{attendance_type_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/attendance_types/{attendance_type_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "displayName": "Attendance Type ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdEventLabelsEventLabelIdEvent",
    "resource": "Event",
    "operation": "List Event (via Event Label)",
    "description": "GET /events/{event_id}/event_labels/{event_label_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_labels/{event_label_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventLabelId",
        "sourceName": "event_label_id",
        "displayName": "Event Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdEvent",
    "resource": "Event",
    "operation": "List Event (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdEventLabels",
    "resource": "Event",
    "operation": "List Event Labels (via Event)",
    "description": "GET /events/{event_id}/event_labels",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdEventPeriods",
    "resource": "Event",
    "operation": "List Event Periods (via Event)",
    "description": "GET /events/{event_id}/event_periods",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_periods",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherestartsAt",
        "sourceName": "where[starts_at]",
        "displayName": "Where[starts At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgt",
        "sourceName": "where[starts_at][gt]",
        "displayName": "Where[starts At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgte",
        "sourceName": "where[starts_at][gte]",
        "displayName": "Where[starts At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlt",
        "sourceName": "where[starts_at][lt]",
        "displayName": "Where[starts At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlte",
        "sourceName": "where[starts_at][lte]",
        "displayName": "Where[starts At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAt",
        "sourceName": "where[ends_at]",
        "displayName": "Where[ends At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgt",
        "sourceName": "where[ends_at][gt]",
        "displayName": "Where[ends At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgte",
        "sourceName": "where[ends_at][gte]",
        "displayName": "Where[ends At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlt",
        "sourceName": "where[ends_at][lt]",
        "displayName": "Where[ends At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlte",
        "sourceName": "where[ends_at][lte]",
        "displayName": "Where[ends At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherestartsAtFilter",
        "displayName": "Starts At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "displayName": "Ends At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEvents",
    "resource": "Event",
    "operation": "List Events",
    "description": "GET /events",
    "method": "GET",
    "path": "/check-ins/v2/events",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn",
    "resource": "Event",
    "operation": "List First Check In (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/first_check_in",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/first_check_in",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts",
    "resource": "Event",
    "operation": "List Headcounts (via Attendance Type)",
    "description": "GET /events/{event_id}/attendance_types/{attendance_type_id}/headcounts",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/attendance_types/{attendance_type_id}/headcounts",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "displayName": "Attendance Type ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdIntegrationLinks",
    "resource": "Event",
    "operation": "List Integration Links (via Event)",
    "description": "GET /events/{event_id}/integration_links",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/integration_links",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
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
    "id": "getEventsEventIdEventLabelsEventLabelIdLabel",
    "resource": "Event",
    "operation": "List Label (via Event Label)",
    "description": "GET /events/{event_id}/event_labels/{event_label_id}/label",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_labels/{event_label_id}/label",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventLabelId",
        "sourceName": "event_label_id",
        "displayName": "Event Label ID",
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
    "id": "getEventsEventIdPersonEventsPersonEventIdLastCheckIn",
    "resource": "Event",
    "operation": "List Last Check In (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/last_check_in",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/last_check_in",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocations",
    "resource": "Event",
    "operation": "List Locations (via Event)",
    "description": "GET /events/{event_id}/locations",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/locations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdPerson",
    "resource": "Event",
    "operation": "List Person (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/person",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wheresearchName",
        "sourceName": "where[search_name]",
        "displayName": "Where[search Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wheresearchName",
        "displayName": "Search Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[search_name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEvents",
    "resource": "Event",
    "operation": "List Person Events (via Event)",
    "description": "GET /events/{event_id}/person_events",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendanceTypesAttendanceTypeId",
    "resource": "Event",
    "operation": "Get Attendance Type (via Event)",
    "description": "GET /events/{event_id}/attendance_types/{attendance_type_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/attendance_types/{attendance_type_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "displayName": "Attendance Type ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdCheckInsCheckInId",
    "resource": "Event",
    "operation": "Get Check In (via Event)",
    "description": "GET /events/{event_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdCurrentEventTimesCurrentEventTimeId",
    "resource": "Event",
    "operation": "Get Current Event Time (via Event)",
    "description": "GET /events/{event_id}/current_event_times/{current_event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/current_event_times/{current_event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "currentEventTimeId",
        "sourceName": "current_event_time_id",
        "displayName": "Current Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId",
    "resource": "Event",
    "operation": "Get Event (via Attendance Type)",
    "description": "GET /events/{event_id}/attendance_types/{attendance_type_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/attendance_types/{attendance_type_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "displayName": "Attendance Type ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdEventLabelsEventLabelIdEventEventId",
    "resource": "Event",
    "operation": "Get Event (via Event Label)",
    "description": "GET /events/{event_id}/event_labels/{event_label_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_labels/{event_label_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventLabelId",
        "sourceName": "event_label_id",
        "displayName": "Event Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdEventEventId",
    "resource": "Event",
    "operation": "Get Event (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdEventLabelsEventLabelId",
    "resource": "Event",
    "operation": "Get Event Label (via Event)",
    "description": "GET /events/{event_id}/event_labels/{event_label_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_labels/{event_label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventLabelId",
        "sourceName": "event_label_id",
        "displayName": "Event Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdEventPeriodsEventPeriodId",
    "resource": "Event",
    "operation": "Get Event Period (via Event)",
    "description": "GET /events/{event_id}/event_periods/{event_period_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_periods/{event_period_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventId",
    "resource": "Event",
    "operation": "Get Event",
    "description": "GET /events/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId",
    "resource": "Event",
    "operation": "Get First Check In (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/first_check_in/{first_check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/first_check_in/{first_check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "firstCheckInId",
        "sourceName": "first_check_in_id",
        "displayName": "First Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId",
    "resource": "Event",
    "operation": "Get Headcount (via Attendance Type)",
    "description": "GET /events/{event_id}/attendance_types/{attendance_type_id}/headcounts/{headcount_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/attendance_types/{attendance_type_id}/headcounts/{headcount_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "displayName": "Attendance Type ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "headcountId",
        "sourceName": "headcount_id",
        "displayName": "Headcount ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdIntegrationLinksIntegrationLinkId",
    "resource": "Event",
    "operation": "Get Integration Link (via Event)",
    "description": "GET /events/{event_id}/integration_links/{integration_link_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/integration_links/{integration_link_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "integrationLinkId",
        "sourceName": "integration_link_id",
        "displayName": "Integration Link ID",
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
    "id": "getEventsEventIdEventLabelsEventLabelIdLabelLabelId",
    "resource": "Event",
    "operation": "Get Label (via Event Label)",
    "description": "GET /events/{event_id}/event_labels/{event_label_id}/label/{label_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/event_labels/{event_label_id}/label/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventLabelId",
        "sourceName": "event_label_id",
        "displayName": "Event Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
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
    "id": "getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId",
    "resource": "Event",
    "operation": "Get Last Check In (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/last_check_in/{last_check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/last_check_in/{last_check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "lastCheckInId",
        "sourceName": "last_check_in_id",
        "displayName": "Last Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocationsLocationId",
    "resource": "Event",
    "operation": "Get Location (via Event)",
    "description": "GET /events/{event_id}/locations/{location_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/locations/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdPersonPersonId",
    "resource": "Event",
    "operation": "Get Person (via Person Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}/person/{person_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
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
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventId",
    "resource": "Event",
    "operation": "Get Person Event (via Event)",
    "description": "GET /events/{event_id}/person_events/{person_event_id}",
    "method": "GET",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getHeadcountsHeadcountIdAttendanceType",
    "resource": "Headcount",
    "operation": "List Attendance Type (via Headcount)",
    "description": "GET /headcounts/{headcount_id}/attendance_type",
    "method": "GET",
    "path": "/check-ins/v2/headcounts/{headcount_id}/attendance_type",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "headcountId",
        "sourceName": "headcount_id",
        "displayName": "Headcount ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getHeadcountsHeadcountIdEventTime",
    "resource": "Headcount",
    "operation": "List Event Time (via Headcount)",
    "description": "GET /headcounts/{headcount_id}/event_time",
    "method": "GET",
    "path": "/check-ins/v2/headcounts/{headcount_id}/event_time",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "headcountId",
        "sourceName": "headcount_id",
        "displayName": "Headcount ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getHeadcounts",
    "resource": "Headcount",
    "operation": "List Headcounts",
    "description": "GET /headcounts",
    "method": "GET",
    "path": "/check-ins/v2/headcounts",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereattendanceTypeid",
        "sourceName": "where[attendance_type][id]",
        "displayName": "Where[attendance Type][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereattendanceTypeid",
        "displayName": "Attendance Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[attendance_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId",
    "resource": "Headcount",
    "operation": "Get Attendance Type (via Headcount)",
    "description": "GET /headcounts/{headcount_id}/attendance_type/{attendance_type_id}",
    "method": "GET",
    "path": "/check-ins/v2/headcounts/{headcount_id}/attendance_type/{attendance_type_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "headcountId",
        "sourceName": "headcount_id",
        "displayName": "Headcount ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "displayName": "Attendance Type ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getHeadcountsHeadcountIdEventTimeEventTimeId",
    "resource": "Headcount",
    "operation": "Get Event Time (via Headcount)",
    "description": "GET /headcounts/{headcount_id}/event_time/{event_time_id}",
    "method": "GET",
    "path": "/check-ins/v2/headcounts/{headcount_id}/event_time/{event_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "headcountId",
        "sourceName": "headcount_id",
        "displayName": "Headcount ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "displayName": "Event Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getHeadcountsHeadcountId",
    "resource": "Headcount",
    "operation": "Get Headcount",
    "description": "GET /headcounts/{headcount_id}",
    "method": "GET",
    "path": "/check-ins/v2/headcounts/{headcount_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "headcountId",
        "sourceName": "headcount_id",
        "displayName": "Headcount ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getIntegrationLinks",
    "resource": "Integration Link",
    "operation": "List Integration Links",
    "description": "GET /integration_links",
    "method": "GET",
    "path": "/check-ins/v2/integration_links",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getIntegrationLinksIntegrationLinkId",
    "resource": "Integration Link",
    "operation": "Get Integration Link",
    "description": "GET /integration_links/{integration_link_id}",
    "method": "GET",
    "path": "/check-ins/v2/integration_links/{integration_link_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "integrationLinkId",
        "sourceName": "integration_link_id",
        "displayName": "Integration Link ID",
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
    "id": "getLabelsLabelIdEventLabels",
    "resource": "Label",
    "operation": "List Event Labels (via Label)",
    "description": "GET /labels/{label_id}/event_labels",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/event_labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabelsLabelIdLocationLabelsLocationLabelIdLabel",
    "resource": "Label",
    "operation": "List Label (via Location Label)",
    "description": "GET /labels/{label_id}/location_labels/{location_label_id}/label",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/location_labels/{location_label_id}/label",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationLabelId",
        "sourceName": "location_label_id",
        "displayName": "Location Label ID",
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
    "id": "getLabels",
    "resource": "Label",
    "operation": "List Labels",
    "description": "GET /labels",
    "method": "GET",
    "path": "/check-ins/v2/labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabelsLabelIdLocationLabelsLocationLabelIdLocation",
    "resource": "Label",
    "operation": "List Location (via Location Label)",
    "description": "GET /labels/{label_id}/location_labels/{location_label_id}/location",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/location_labels/{location_label_id}/location",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationLabelId",
        "sourceName": "location_label_id",
        "displayName": "Location Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabelsLabelIdLocationLabels",
    "resource": "Label",
    "operation": "List Location Labels (via Label)",
    "description": "GET /labels/{label_id}/location_labels",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/location_labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabelsLabelIdEventLabelsEventLabelId",
    "resource": "Label",
    "operation": "Get Event Label (via Label)",
    "description": "GET /labels/{label_id}/event_labels/{event_label_id}",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/event_labels/{event_label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventLabelId",
        "sourceName": "event_label_id",
        "displayName": "Event Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabelsLabelIdLocationLabelsLocationLabelIdLabelLabelId",
    "resource": "Label",
    "operation": "Get Label (via Location Label)",
    "description": "GET /labels/{label_id}/location_labels/{location_label_id}/label/{label_id}",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/location_labels/{location_label_id}/label/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationLabelId",
        "sourceName": "location_label_id",
        "displayName": "Location Label ID",
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
    "id": "getLabelsLabelId",
    "resource": "Label",
    "operation": "Get Label",
    "description": "GET /labels/{label_id}",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
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
    "id": "getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId",
    "resource": "Label",
    "operation": "Get Location (via Location Label)",
    "description": "GET /labels/{label_id}/location_labels/{location_label_id}/location/{location_id}",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/location_labels/{location_label_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationLabelId",
        "sourceName": "location_label_id",
        "displayName": "Location Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabelsLabelIdLocationLabelsLocationLabelId",
    "resource": "Label",
    "operation": "Get Location Label (via Label)",
    "description": "GET /labels/{label_id}/location_labels/{location_label_id}",
    "method": "GET",
    "path": "/check-ins/v2/labels/{label_id}/location_labels/{location_label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationLabelId",
        "sourceName": "location_label_id",
        "displayName": "Location Label ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOptionsOptionIdCheckIns",
    "resource": "Option",
    "operation": "List Check Ins (via Option)",
    "description": "GET /options/{option_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/options/{option_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "optionId",
        "sourceName": "option_id",
        "displayName": "Option ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOptionsOptionIdLabel",
    "resource": "Option",
    "operation": "List Label (via Option)",
    "description": "GET /options/{option_id}/label",
    "method": "GET",
    "path": "/check-ins/v2/options/{option_id}/label",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "optionId",
        "sourceName": "option_id",
        "displayName": "Option ID",
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
    "id": "getOptions",
    "resource": "Option",
    "operation": "List Options",
    "description": "GET /options",
    "method": "GET",
    "path": "/check-ins/v2/options",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOptionsOptionIdCheckInsCheckInId",
    "resource": "Option",
    "operation": "Get Check In (via Option)",
    "description": "GET /options/{option_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/options/{option_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "optionId",
        "sourceName": "option_id",
        "displayName": "Option ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getOptionsOptionIdLabelLabelId",
    "resource": "Option",
    "operation": "Get Label (via Option)",
    "description": "GET /options/{option_id}/label/{label_id}",
    "method": "GET",
    "path": "/check-ins/v2/options/{option_id}/label/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "optionId",
        "sourceName": "option_id",
        "displayName": "Option ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label ID",
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
    "id": "getOptionsOptionId",
    "resource": "Option",
    "operation": "Get Option",
    "description": "GET /options/{option_id}",
    "method": "GET",
    "path": "/check-ins/v2/options/{option_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "optionId",
        "sourceName": "option_id",
        "displayName": "Option ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPasses",
    "resource": "Pass",
    "operation": "List Passes",
    "description": "GET /passes",
    "method": "GET",
    "path": "/check-ins/v2/passes",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPassesPassIdPerson",
    "resource": "Pass",
    "operation": "List Person (via Pass)",
    "description": "GET /passes/{pass_id}/person",
    "method": "GET",
    "path": "/check-ins/v2/passes/{pass_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "passId",
        "sourceName": "pass_id",
        "displayName": "Pass ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wheresearchName",
        "sourceName": "where[search_name]",
        "displayName": "Where[search Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wheresearchName",
        "displayName": "Search Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[search_name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPassesPassId",
    "resource": "Pass",
    "operation": "Get Pass",
    "description": "GET /passes/{pass_id}",
    "method": "GET",
    "path": "/check-ins/v2/passes/{pass_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "passId",
        "sourceName": "pass_id",
        "displayName": "Pass ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPassesPassIdPersonPersonId",
    "resource": "Pass",
    "operation": "Get Person (via Pass)",
    "description": "GET /passes/{pass_id}/person/{person_id}",
    "method": "GET",
    "path": "/check-ins/v2/passes/{pass_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "passId",
        "sourceName": "pass_id",
        "displayName": "Pass ID",
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
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdCheckIns",
    "resource": "Person",
    "operation": "List Check Ins (via Person)",
    "description": "GET /people/{person_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdOrganization",
    "resource": "Person",
    "operation": "List Organization (via Person)",
    "description": "GET /people/{person_id}/organization",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/organization",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
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
    "id": "getPeoplePersonIdPasses",
    "resource": "Person",
    "operation": "List Passes (via Person)",
    "description": "GET /people/{person_id}/passes",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/passes",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeople",
    "resource": "Person",
    "operation": "List People",
    "description": "GET /people",
    "method": "GET",
    "path": "/check-ins/v2/people",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "wheresearchName",
        "sourceName": "where[search_name]",
        "displayName": "Where[search Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wheresearchName",
        "displayName": "Search Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[search_name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPersonEvents",
    "resource": "Person",
    "operation": "List Person Events (via Person)",
    "description": "GET /people/{person_id}/person_events",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/person_events",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdCheckInsCheckInId",
    "resource": "Person",
    "operation": "Get Check In (via Person)",
    "description": "GET /people/{person_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getMe",
    "resource": "Person",
    "operation": "Get Me",
    "description": "GET /me",
    "method": "GET",
    "path": "/check-ins/v2/me",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdOrganizationOrganizationId",
    "resource": "Person",
    "operation": "Get Organization (via Person)",
    "description": "GET /people/{person_id}/organization/{organization_id}",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/organization/{organization_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "organizationId",
        "sourceName": "organization_id",
        "displayName": "Organization ID",
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
    "id": "getPeoplePersonIdPassesPassId",
    "resource": "Person",
    "operation": "Get Pass (via Person)",
    "description": "GET /people/{person_id}/passes/{pass_id}",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/passes/{pass_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "passId",
        "sourceName": "pass_id",
        "displayName": "Pass ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPersonEventsPersonEventId",
    "resource": "Person",
    "operation": "Get Person Event (via Person)",
    "description": "GET /people/{person_id}/person_events/{person_event_id}",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}/person_events/{person_event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personEventId",
        "sourceName": "person_event_id",
        "displayName": "Person Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonId",
    "resource": "Person",
    "operation": "Get Person",
    "description": "GET /people/{person_id}",
    "method": "GET",
    "path": "/check-ins/v2/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckInGroups",
    "resource": "Stations",
    "operation": "List Check In Groups (via Station)",
    "description": "GET /stations/{station_id}/check_in_groups",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns",
    "resource": "Stations",
    "operation": "List Check Ins (via Check In Group)",
    "description": "GET /stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckedInAtCheckIns",
    "resource": "Stations",
    "operation": "List Checked In At Check Ins (via Station)",
    "description": "GET /stations/{station_id}/checked_in_at_check_ins",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/checked_in_at_check_ins",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAt",
        "sourceName": "where[created_at]",
        "displayName": "Where[created At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgt",
        "sourceName": "where[created_at][gt]",
        "displayName": "Where[created At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtgte",
        "sourceName": "where[created_at][gte]",
        "displayName": "Where[created At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlt",
        "sourceName": "where[created_at][lt]",
        "displayName": "Where[created At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecreatedAtlte",
        "sourceName": "where[created_at][lte]",
        "displayName": "Where[created At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAt",
        "sourceName": "where[updated_at]",
        "displayName": "Where[updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgt",
        "sourceName": "where[updated_at][gt]",
        "displayName": "Where[updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtgte",
        "sourceName": "where[updated_at][gte]",
        "displayName": "Where[updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlt",
        "sourceName": "where[updated_at][lt]",
        "displayName": "Where[updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereupdatedAtlte",
        "sourceName": "where[updated_at][lte]",
        "displayName": "Where[updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdEvent",
    "resource": "Stations",
    "operation": "List Event (via Station)",
    "description": "GET /stations/{station_id}/event",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/event",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod",
    "resource": "Stations",
    "operation": "List Event Period (via Check In Group)",
    "description": "GET /stations/{station_id}/check_in_groups/{check_in_group_id}/event_period",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/event_period",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherestartsAt",
        "sourceName": "where[starts_at]",
        "displayName": "Where[starts At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgt",
        "sourceName": "where[starts_at][gt]",
        "displayName": "Where[starts At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtgte",
        "sourceName": "where[starts_at][gte]",
        "displayName": "Where[starts At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlt",
        "sourceName": "where[starts_at][lt]",
        "displayName": "Where[starts At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherestartsAtlte",
        "sourceName": "where[starts_at][lte]",
        "displayName": "Where[starts At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAt",
        "sourceName": "where[ends_at]",
        "displayName": "Where[ends At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgt",
        "sourceName": "where[ends_at][gt]",
        "displayName": "Where[ends At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtgte",
        "sourceName": "where[ends_at][gte]",
        "displayName": "Where[ends At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlt",
        "sourceName": "where[ends_at][lt]",
        "displayName": "Where[ends At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereendsAtlte",
        "sourceName": "where[ends_at][lte]",
        "displayName": "Where[ends At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereeventid",
        "sourceName": "where[event][id]",
        "displayName": "Where[event][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "wherestartsAtFilter",
        "displayName": "Starts At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "displayName": "Ends At",
        "group": "filter",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "whereeventid",
        "displayName": "Event ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[event][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdLocation",
    "resource": "Stations",
    "operation": "List Location (via Station)",
    "description": "GET /stations/{station_id}/location",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/location",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation",
    "resource": "Stations",
    "operation": "List Print Station (via Check In Group)",
    "description": "GET /stations/{station_id}/check_in_groups/{check_in_group_id}/print_station",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/print_station",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdPrintStation",
    "resource": "Stations",
    "operation": "List Print Station (via Station)",
    "description": "GET /stations/{station_id}/print_station",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/print_station",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStations",
    "resource": "Stations",
    "operation": "List Stations",
    "description": "GET /stations",
    "method": "GET",
    "path": "/check-ins/v2/stations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdTheme",
    "resource": "Stations",
    "operation": "List Theme (via Station)",
    "description": "GET /stations/{station_id}/theme",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/theme",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
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
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId",
    "resource": "Stations",
    "operation": "Get Check In (via Check In Group)",
    "description": "GET /stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins/{check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins/{check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "displayName": "Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupId",
    "resource": "Stations",
    "operation": "Get Check In Group (via Station)",
    "description": "GET /stations/{station_id}/check_in_groups/{check_in_group_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId",
    "resource": "Stations",
    "operation": "Get Checked In At Check In (via Station)",
    "description": "GET /stations/{station_id}/checked_in_at_check_ins/{checked_in_at_check_in_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/checked_in_at_check_ins/{checked_in_at_check_in_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkedInAtCheckInId",
        "sourceName": "checked_in_at_check_in_id",
        "displayName": "Checked In At Check In ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdEventEventId",
    "resource": "Stations",
    "operation": "Get Event (via Station)",
    "description": "GET /stations/{station_id}/event/{event_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/event/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId",
    "resource": "Stations",
    "operation": "Get Event Period (via Check In Group)",
    "description": "GET /stations/{station_id}/check_in_groups/{check_in_group_id}/event_period/{event_period_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/event_period/{event_period_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "displayName": "Event Period ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdLocationLocationId",
    "resource": "Stations",
    "operation": "Get Location (via Station)",
    "description": "GET /stations/{station_id}/location/{location_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId",
    "resource": "Stations",
    "operation": "Get Print Station (via Check In Group)",
    "description": "GET /stations/{station_id}/check_in_groups/{check_in_group_id}/print_station/{print_station_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/print_station/{print_station_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "displayName": "Check In Group ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "printStationId",
        "sourceName": "print_station_id",
        "displayName": "Print Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdPrintStationPrintStationId",
    "resource": "Stations",
    "operation": "Get Print Station (via Station)",
    "description": "GET /stations/{station_id}/print_station/{print_station_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/print_station/{print_station_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "printStationId",
        "sourceName": "print_station_id",
        "displayName": "Print Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationId",
    "resource": "Stations",
    "operation": "Get Station",
    "description": "GET /stations/{station_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getStationsStationIdThemeThemeId",
    "resource": "Stations",
    "operation": "Get Theme (via Station)",
    "description": "GET /stations/{station_id}/theme/{theme_id}",
    "method": "GET",
    "path": "/check-ins/v2/stations/{station_id}/theme/{theme_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "displayName": "Station ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "themeId",
        "sourceName": "theme_id",
        "displayName": "Theme ID",
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
    "id": "getThemes",
    "resource": "Theme",
    "operation": "List Themes",
    "description": "GET /themes",
    "method": "GET",
    "path": "/check-ins/v2/themes",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getThemesThemeId",
    "resource": "Theme",
    "operation": "Get Theme",
    "description": "GET /themes/{theme_id}",
    "method": "GET",
    "path": "/check-ins/v2/themes/{theme_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "themeId",
        "sourceName": "theme_id",
        "displayName": "Theme ID",
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

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Check In\",\"value\":\"Check In\"},{\"name\":\"Event\",\"value\":\"Event\"},{\"name\":\"Event Time\",\"value\":\"Event Time\"},{\"name\":\"Headcount\",\"value\":\"Headcount\"},{\"name\":\"Integration Link\",\"value\":\"Integration Link\"},{\"name\":\"Label\",\"value\":\"Label\"},{\"name\":\"Option\",\"value\":\"Option\"},{\"name\":\"Pass\",\"value\":\"Pass\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Stations\",\"value\":\"Stations\"},{\"name\":\"Theme\",\"value\":\"Theme\"}],\n      default: \"Check In\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"]}},\n      options: [{\"name\":\"List Check In Group (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckInGroup\",\"description\":\"GET /check_ins/{check_in_id}/check_in_group\",\"action\":\"List Check In Group (via Check In)\"},{\"name\":\"List Check In Times (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckInTimes\",\"description\":\"GET /check_ins/{check_in_id}/check_in_times\",\"action\":\"List Check In Times (via Check In)\"},{\"name\":\"List Check Ins (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/check_ins\",\"action\":\"List Check Ins (via Event Period)\"},{\"name\":\"List Check Ins (via Location Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins\",\"action\":\"List Check Ins (via Location Event Period)\"},{\"name\":\"List Check Ins (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdCheckIns\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/check_ins\",\"action\":\"List Check Ins (via Location)\"},{\"name\":\"List Check Ins\",\"value\":\"getCheckIns\",\"description\":\"GET /check_ins\",\"action\":\"List Check Ins\"},{\"name\":\"List Checked In At (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckedInAt\",\"description\":\"GET /check_ins/{check_in_id}/checked_in_at\",\"action\":\"List Checked In At (via Check In)\"},{\"name\":\"List Checked In By (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckedInBy\",\"description\":\"GET /check_ins/{check_in_id}/checked_in_by\",\"action\":\"List Checked In By (via Check In)\"},{\"name\":\"List Checked Out By (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckedOutBy\",\"description\":\"GET /check_ins/{check_in_id}/checked_out_by\",\"action\":\"List Checked Out By (via Check In)\"},{\"name\":\"List Event (via Check In)\",\"value\":\"getCheckInsCheckInIdEvent\",\"description\":\"GET /check_ins/{check_in_id}/event\",\"action\":\"List Event (via Check In)\"},{\"name\":\"List Event (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/event\",\"action\":\"List Event (via Event Period)\"},{\"name\":\"List Event (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdEvent\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/event\",\"action\":\"List Event (via Location)\"},{\"name\":\"List Event Period (via Check In)\",\"value\":\"getCheckInsCheckInIdEventPeriod\",\"description\":\"GET /check_ins/{check_in_id}/event_period\",\"action\":\"List Event Period (via Check In)\"},{\"name\":\"List Event Period (via Location Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/event_period\",\"action\":\"List Event Period (via Location Event Period)\"},{\"name\":\"List Event Times (via Check In)\",\"value\":\"getCheckInsCheckInIdEventTimes\",\"description\":\"GET /check_ins/{check_in_id}/event_times\",\"action\":\"List Event Times (via Check In)\"},{\"name\":\"List Event Times (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/event_times\",\"action\":\"List Event Times (via Event Period)\"},{\"name\":\"List Integration Links (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/integration_links\",\"action\":\"List Integration Links (via Location)\"},{\"name\":\"List Location (via Location Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/location\",\"action\":\"List Location (via Location Event Period)\"},{\"name\":\"List Location Event Periods (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods\",\"action\":\"List Location Event Periods (via Event Period)\"},{\"name\":\"List Location Event Periods (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/location_event_periods\",\"action\":\"List Location Event Periods (via Location)\"},{\"name\":\"List Location Event Times (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/location_event_times\",\"action\":\"List Location Event Times (via Location)\"},{\"name\":\"List Location Labels (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocationLabels\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/location_labels\",\"action\":\"List Location Labels (via Location)\"},{\"name\":\"List Locations (via Check In)\",\"value\":\"getCheckInsCheckInIdLocations\",\"description\":\"GET /check_ins/{check_in_id}/locations\",\"action\":\"List Locations (via Check In)\"},{\"name\":\"List Locations (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocations\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/locations\",\"action\":\"List Locations (via Location)\"},{\"name\":\"List Options (via Check In)\",\"value\":\"getCheckInsCheckInIdOptions\",\"description\":\"GET /check_ins/{check_in_id}/options\",\"action\":\"List Options (via Check In)\"},{\"name\":\"List Options (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdOptions\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/options\",\"action\":\"List Options (via Location)\"},{\"name\":\"List Parent (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdParent\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/parent\",\"action\":\"List Parent (via Location)\"},{\"name\":\"List Person (via Check In)\",\"value\":\"getCheckInsCheckInIdPerson\",\"description\":\"GET /check_ins/{check_in_id}/person\",\"action\":\"List Person (via Check In)\"},{\"name\":\"Get Check In (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Event Period)\"},{\"name\":\"Get Check In (via Location Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Location Event Period)\"},{\"name\":\"Get Check In (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Location)\"},{\"name\":\"Get Check In Group (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckInGroupCheckInGroupId\",\"description\":\"GET /check_ins/{check_in_id}/check_in_group/{check_in_group_id}\",\"action\":\"Get Check In Group (via Check In)\"},{\"name\":\"Get Check In Time (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckInTimesCheckInTimeId\",\"description\":\"GET /check_ins/{check_in_id}/check_in_times/{check_in_time_id}\",\"action\":\"Get Check In Time (via Check In)\"},{\"name\":\"Get Check In\",\"value\":\"getCheckInsCheckInId\",\"description\":\"GET /check_ins/{check_in_id}\",\"action\":\"Get Check In\"},{\"name\":\"Get Checked In At (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckedInAtCheckedInAtId\",\"description\":\"GET /check_ins/{check_in_id}/checked_in_at/{checked_in_at_id}\",\"action\":\"Get Checked In At (via Check In)\"},{\"name\":\"Get Checked In By (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckedInByCheckedInById\",\"description\":\"GET /check_ins/{check_in_id}/checked_in_by/{checked_in_by_id}\",\"action\":\"Get Checked In By (via Check In)\"},{\"name\":\"Get Checked Out By (via Check In)\",\"value\":\"getCheckInsCheckInIdCheckedOutByCheckedOutById\",\"description\":\"GET /check_ins/{check_in_id}/checked_out_by/{checked_out_by_id}\",\"action\":\"Get Checked Out By (via Check In)\"},{\"name\":\"Get Event (via Check In)\",\"value\":\"getCheckInsCheckInIdEventEventId\",\"description\":\"GET /check_ins/{check_in_id}/event/{event_id}\",\"action\":\"Get Event (via Check In)\"},{\"name\":\"Get Event (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/event/{event_id}\",\"action\":\"Get Event (via Event Period)\"},{\"name\":\"Get Event (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdEventEventId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/event/{event_id}\",\"action\":\"Get Event (via Location)\"},{\"name\":\"Get Event Period (via Check In)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}\",\"action\":\"Get Event Period (via Check In)\"},{\"name\":\"Get Event Period (via Location Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/event_period/{event_period_id}\",\"action\":\"Get Event Period (via Location Event Period)\"},{\"name\":\"Get Event Time (via Check In)\",\"value\":\"getCheckInsCheckInIdEventTimesEventTimeId\",\"description\":\"GET /check_ins/{check_in_id}/event_times/{event_time_id}\",\"action\":\"Get Event Time (via Check In)\"},{\"name\":\"Get Event Time (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/event_times/{event_time_id}\",\"action\":\"Get Event Time (via Event Period)\"},{\"name\":\"Get Integration Link (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/integration_links/{integration_link_id}\",\"action\":\"Get Integration Link (via Location)\"},{\"name\":\"Get Location (via Check In)\",\"value\":\"getCheckInsCheckInIdLocationsLocationId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}\",\"action\":\"Get Location (via Check In)\"},{\"name\":\"Get Location (via Location Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/location/{location_id}\",\"action\":\"Get Location (via Location Event Period)\"},{\"name\":\"Get Location (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/locations/{location_id}\",\"action\":\"Get Location (via Location)\"},{\"name\":\"Get Location Event Period (via Event Period)\",\"value\":\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId\",\"description\":\"GET /check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}\",\"action\":\"Get Location Event Period (via Event Period)\"},{\"name\":\"Get Location Event Period (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/location_event_periods/{location_event_period_id}\",\"action\":\"Get Location Event Period (via Location)\"},{\"name\":\"Get Location Event Time (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/location_event_times/{location_event_time_id}\",\"action\":\"Get Location Event Time (via Location)\"},{\"name\":\"Get Location Label (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/location_labels/{location_label_id}\",\"action\":\"Get Location Label (via Location)\"},{\"name\":\"Get Option (via Check In)\",\"value\":\"getCheckInsCheckInIdOptionsOptionId\",\"description\":\"GET /check_ins/{check_in_id}/options/{option_id}\",\"action\":\"Get Option (via Check In)\"},{\"name\":\"Get Option (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/options/{option_id}\",\"action\":\"Get Option (via Location)\"},{\"name\":\"Get Parent (via Location)\",\"value\":\"getCheckInsCheckInIdLocationsLocationIdParentParentId\",\"description\":\"GET /check_ins/{check_in_id}/locations/{location_id}/parent/{parent_id}\",\"action\":\"Get Parent (via Location)\"},{\"name\":\"Get Person (via Check In)\",\"value\":\"getCheckInsCheckInIdPersonPersonId\",\"description\":\"GET /check_ins/{check_in_id}/person/{person_id}\",\"action\":\"Get Person (via Check In)\"}],\n      default: \"getCheckInsCheckInIdCheckInGroup\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"]}},\n      options: [{\"name\":\"List Attendance Types (via Event)\",\"value\":\"getEventsEventIdAttendanceTypes\",\"description\":\"GET /events/{event_id}/attendance_types\",\"action\":\"List Attendance Types (via Event)\"},{\"name\":\"List Check Ins (via Event)\",\"value\":\"getEventsEventIdCheckIns\",\"description\":\"GET /events/{event_id}/check_ins\",\"action\":\"List Check Ins (via Event)\"},{\"name\":\"List Current Event Times (via Event)\",\"value\":\"getEventsEventIdCurrentEventTimes\",\"description\":\"GET /events/{event_id}/current_event_times\",\"action\":\"List Current Event Times (via Event)\"},{\"name\":\"List Event (via Attendance Type)\",\"value\":\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\",\"description\":\"GET /events/{event_id}/attendance_types/{attendance_type_id}/event\",\"action\":\"List Event (via Attendance Type)\"},{\"name\":\"List Event (via Event Label)\",\"value\":\"getEventsEventIdEventLabelsEventLabelIdEvent\",\"description\":\"GET /events/{event_id}/event_labels/{event_label_id}/event\",\"action\":\"List Event (via Event Label)\"},{\"name\":\"List Event (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdEvent\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/event\",\"action\":\"List Event (via Person Event)\"},{\"name\":\"List Event Labels (via Event)\",\"value\":\"getEventsEventIdEventLabels\",\"description\":\"GET /events/{event_id}/event_labels\",\"action\":\"List Event Labels (via Event)\"},{\"name\":\"List Event Periods (via Event)\",\"value\":\"getEventsEventIdEventPeriods\",\"description\":\"GET /events/{event_id}/event_periods\",\"action\":\"List Event Periods (via Event)\"},{\"name\":\"List Events\",\"value\":\"getEvents\",\"description\":\"GET /events\",\"action\":\"List Events\"},{\"name\":\"List First Check In (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/first_check_in\",\"action\":\"List First Check In (via Person Event)\"},{\"name\":\"List Headcounts (via Attendance Type)\",\"value\":\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\",\"description\":\"GET /events/{event_id}/attendance_types/{attendance_type_id}/headcounts\",\"action\":\"List Headcounts (via Attendance Type)\"},{\"name\":\"List Integration Links (via Event)\",\"value\":\"getEventsEventIdIntegrationLinks\",\"description\":\"GET /events/{event_id}/integration_links\",\"action\":\"List Integration Links (via Event)\"},{\"name\":\"List Label (via Event Label)\",\"value\":\"getEventsEventIdEventLabelsEventLabelIdLabel\",\"description\":\"GET /events/{event_id}/event_labels/{event_label_id}/label\",\"action\":\"List Label (via Event Label)\"},{\"name\":\"List Last Check In (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/last_check_in\",\"action\":\"List Last Check In (via Person Event)\"},{\"name\":\"List Locations (via Event)\",\"value\":\"getEventsEventIdLocations\",\"description\":\"GET /events/{event_id}/locations\",\"action\":\"List Locations (via Event)\"},{\"name\":\"List Person (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdPerson\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/person\",\"action\":\"List Person (via Person Event)\"},{\"name\":\"List Person Events (via Event)\",\"value\":\"getEventsEventIdPersonEvents\",\"description\":\"GET /events/{event_id}/person_events\",\"action\":\"List Person Events (via Event)\"},{\"name\":\"Get Attendance Type (via Event)\",\"value\":\"getEventsEventIdAttendanceTypesAttendanceTypeId\",\"description\":\"GET /events/{event_id}/attendance_types/{attendance_type_id}\",\"action\":\"Get Attendance Type (via Event)\"},{\"name\":\"Get Check In (via Event)\",\"value\":\"getEventsEventIdCheckInsCheckInId\",\"description\":\"GET /events/{event_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Event)\"},{\"name\":\"Get Current Event Time (via Event)\",\"value\":\"getEventsEventIdCurrentEventTimesCurrentEventTimeId\",\"description\":\"GET /events/{event_id}/current_event_times/{current_event_time_id}\",\"action\":\"Get Current Event Time (via Event)\"},{\"name\":\"Get Event (via Attendance Type)\",\"value\":\"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId\",\"description\":\"GET /events/{event_id}/attendance_types/{attendance_type_id}/event/{event_id}\",\"action\":\"Get Event (via Attendance Type)\"},{\"name\":\"Get Event (via Event Label)\",\"value\":\"getEventsEventIdEventLabelsEventLabelIdEventEventId\",\"description\":\"GET /events/{event_id}/event_labels/{event_label_id}/event/{event_id}\",\"action\":\"Get Event (via Event Label)\"},{\"name\":\"Get Event (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdEventEventId\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/event/{event_id}\",\"action\":\"Get Event (via Person Event)\"},{\"name\":\"Get Event Label (via Event)\",\"value\":\"getEventsEventIdEventLabelsEventLabelId\",\"description\":\"GET /events/{event_id}/event_labels/{event_label_id}\",\"action\":\"Get Event Label (via Event)\"},{\"name\":\"Get Event Period (via Event)\",\"value\":\"getEventsEventIdEventPeriodsEventPeriodId\",\"description\":\"GET /events/{event_id}/event_periods/{event_period_id}\",\"action\":\"Get Event Period (via Event)\"},{\"name\":\"Get Event\",\"value\":\"getEventsEventId\",\"description\":\"GET /events/{event_id}\",\"action\":\"Get Event\"},{\"name\":\"Get First Check In (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/first_check_in/{first_check_in_id}\",\"action\":\"Get First Check In (via Person Event)\"},{\"name\":\"Get Headcount (via Attendance Type)\",\"value\":\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId\",\"description\":\"GET /events/{event_id}/attendance_types/{attendance_type_id}/headcounts/{headcount_id}\",\"action\":\"Get Headcount (via Attendance Type)\"},{\"name\":\"Get Integration Link (via Event)\",\"value\":\"getEventsEventIdIntegrationLinksIntegrationLinkId\",\"description\":\"GET /events/{event_id}/integration_links/{integration_link_id}\",\"action\":\"Get Integration Link (via Event)\"},{\"name\":\"Get Label (via Event Label)\",\"value\":\"getEventsEventIdEventLabelsEventLabelIdLabelLabelId\",\"description\":\"GET /events/{event_id}/event_labels/{event_label_id}/label/{label_id}\",\"action\":\"Get Label (via Event Label)\"},{\"name\":\"Get Last Check In (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/last_check_in/{last_check_in_id}\",\"action\":\"Get Last Check In (via Person Event)\"},{\"name\":\"Get Location (via Event)\",\"value\":\"getEventsEventIdLocationsLocationId\",\"description\":\"GET /events/{event_id}/locations/{location_id}\",\"action\":\"Get Location (via Event)\"},{\"name\":\"Get Person (via Person Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventIdPersonPersonId\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}/person/{person_id}\",\"action\":\"Get Person (via Person Event)\"},{\"name\":\"Get Person Event (via Event)\",\"value\":\"getEventsEventIdPersonEventsPersonEventId\",\"description\":\"GET /events/{event_id}/person_events/{person_event_id}\",\"action\":\"Get Person Event (via Event)\"}],\n      default: \"getEventsEventIdAttendanceTypes\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"]}},\n      options: [{\"name\":\"List Available Locations (via Event Time)\",\"value\":\"getEventTimesEventTimeIdAvailableLocations\",\"description\":\"GET /event_times/{event_time_id}/available_locations\",\"action\":\"List Available Locations (via Event Time)\"},{\"name\":\"List Check Ins (via Event Time)\",\"value\":\"getEventTimesEventTimeIdCheckIns\",\"description\":\"GET /event_times/{event_time_id}/check_ins\",\"action\":\"List Check Ins (via Event Time)\"},{\"name\":\"List Check Ins (via Location Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\",\"description\":\"GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins\",\"action\":\"List Check Ins (via Location Event Time)\"},{\"name\":\"List Event (via Event Time)\",\"value\":\"getEventTimesEventTimeIdEvent\",\"description\":\"GET /event_times/{event_time_id}/event\",\"action\":\"List Event (via Event Time)\"},{\"name\":\"List Event Period (via Event Time)\",\"value\":\"getEventTimesEventTimeIdEventPeriod\",\"description\":\"GET /event_times/{event_time_id}/event_period\",\"action\":\"List Event Period (via Event Time)\"},{\"name\":\"List Event Time (via Location Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\",\"description\":\"GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/event_time\",\"action\":\"List Event Time (via Location Event Time)\"},{\"name\":\"List Event Times\",\"value\":\"getEventTimes\",\"description\":\"GET /event_times\",\"action\":\"List Event Times\"},{\"name\":\"List Headcounts (via Event Time)\",\"value\":\"getEventTimesEventTimeIdHeadcounts\",\"description\":\"GET /event_times/{event_time_id}/headcounts\",\"action\":\"List Headcounts (via Event Time)\"},{\"name\":\"List Location (via Location Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\",\"description\":\"GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/location\",\"action\":\"List Location (via Location Event Time)\"},{\"name\":\"List Location Event Times (via Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimes\",\"description\":\"GET /event_times/{event_time_id}/location_event_times\",\"action\":\"List Location Event Times (via Event Time)\"},{\"name\":\"Get Available Location (via Event Time)\",\"value\":\"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId\",\"description\":\"GET /event_times/{event_time_id}/available_locations/{available_location_id}\",\"action\":\"Get Available Location (via Event Time)\"},{\"name\":\"Get Check In (via Event Time)\",\"value\":\"getEventTimesEventTimeIdCheckInsCheckInId\",\"description\":\"GET /event_times/{event_time_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Event Time)\"},{\"name\":\"Get Check In (via Location Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId\",\"description\":\"GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Location Event Time)\"},{\"name\":\"Get Event (via Event Time)\",\"value\":\"getEventTimesEventTimeIdEventEventId\",\"description\":\"GET /event_times/{event_time_id}/event/{event_id}\",\"action\":\"Get Event (via Event Time)\"},{\"name\":\"Get Event Period (via Event Time)\",\"value\":\"getEventTimesEventTimeIdEventPeriodEventPeriodId\",\"description\":\"GET /event_times/{event_time_id}/event_period/{event_period_id}\",\"action\":\"Get Event Period (via Event Time)\"},{\"name\":\"Get Event Time (via Location Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId\",\"description\":\"GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/event_time/{event_time_id}\",\"action\":\"Get Event Time (via Location Event Time)\"},{\"name\":\"Get Event Time\",\"value\":\"getEventTimesEventTimeId\",\"description\":\"GET /event_times/{event_time_id}\",\"action\":\"Get Event Time\"},{\"name\":\"Get Headcount (via Event Time)\",\"value\":\"getEventTimesEventTimeIdHeadcountsHeadcountId\",\"description\":\"GET /event_times/{event_time_id}/headcounts/{headcount_id}\",\"action\":\"Get Headcount (via Event Time)\"},{\"name\":\"Get Location (via Location Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId\",\"description\":\"GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}/location/{location_id}\",\"action\":\"Get Location (via Location Event Time)\"},{\"name\":\"Get Location Event Time (via Event Time)\",\"value\":\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId\",\"description\":\"GET /event_times/{event_time_id}/location_event_times/{location_event_time_id}\",\"action\":\"Get Location Event Time (via Event Time)\"}],\n      default: \"getEventTimesEventTimeIdAvailableLocations\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"]}},\n      options: [{\"name\":\"List Attendance Type (via Headcount)\",\"value\":\"getHeadcountsHeadcountIdAttendanceType\",\"description\":\"GET /headcounts/{headcount_id}/attendance_type\",\"action\":\"List Attendance Type (via Headcount)\"},{\"name\":\"List Event Time (via Headcount)\",\"value\":\"getHeadcountsHeadcountIdEventTime\",\"description\":\"GET /headcounts/{headcount_id}/event_time\",\"action\":\"List Event Time (via Headcount)\"},{\"name\":\"List Headcounts\",\"value\":\"getHeadcounts\",\"description\":\"GET /headcounts\",\"action\":\"List Headcounts\"},{\"name\":\"Get Attendance Type (via Headcount)\",\"value\":\"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId\",\"description\":\"GET /headcounts/{headcount_id}/attendance_type/{attendance_type_id}\",\"action\":\"Get Attendance Type (via Headcount)\"},{\"name\":\"Get Event Time (via Headcount)\",\"value\":\"getHeadcountsHeadcountIdEventTimeEventTimeId\",\"description\":\"GET /headcounts/{headcount_id}/event_time/{event_time_id}\",\"action\":\"Get Event Time (via Headcount)\"},{\"name\":\"Get Headcount\",\"value\":\"getHeadcountsHeadcountId\",\"description\":\"GET /headcounts/{headcount_id}\",\"action\":\"Get Headcount\"}],\n      default: \"getHeadcountsHeadcountIdAttendanceType\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Integration Link\"]}},\n      options: [{\"name\":\"List Integration Links\",\"value\":\"getIntegrationLinks\",\"description\":\"GET /integration_links\",\"action\":\"List Integration Links\"},{\"name\":\"Get Integration Link\",\"value\":\"getIntegrationLinksIntegrationLinkId\",\"description\":\"GET /integration_links/{integration_link_id}\",\"action\":\"Get Integration Link\"}],\n      default: \"getIntegrationLinks\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"]}},\n      options: [{\"name\":\"List Event Labels (via Label)\",\"value\":\"getLabelsLabelIdEventLabels\",\"description\":\"GET /labels/{label_id}/event_labels\",\"action\":\"List Event Labels (via Label)\"},{\"name\":\"List Label (via Location Label)\",\"value\":\"getLabelsLabelIdLocationLabelsLocationLabelIdLabel\",\"description\":\"GET /labels/{label_id}/location_labels/{location_label_id}/label\",\"action\":\"List Label (via Location Label)\"},{\"name\":\"List Labels\",\"value\":\"getLabels\",\"description\":\"GET /labels\",\"action\":\"List Labels\"},{\"name\":\"List Location (via Location Label)\",\"value\":\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\",\"description\":\"GET /labels/{label_id}/location_labels/{location_label_id}/location\",\"action\":\"List Location (via Location Label)\"},{\"name\":\"List Location Labels (via Label)\",\"value\":\"getLabelsLabelIdLocationLabels\",\"description\":\"GET /labels/{label_id}/location_labels\",\"action\":\"List Location Labels (via Label)\"},{\"name\":\"Get Event Label (via Label)\",\"value\":\"getLabelsLabelIdEventLabelsEventLabelId\",\"description\":\"GET /labels/{label_id}/event_labels/{event_label_id}\",\"action\":\"Get Event Label (via Label)\"},{\"name\":\"Get Label (via Location Label)\",\"value\":\"getLabelsLabelIdLocationLabelsLocationLabelIdLabelLabelId\",\"description\":\"GET /labels/{label_id}/location_labels/{location_label_id}/label/{label_id}\",\"action\":\"Get Label (via Location Label)\"},{\"name\":\"Get Label\",\"value\":\"getLabelsLabelId\",\"description\":\"GET /labels/{label_id}\",\"action\":\"Get Label\"},{\"name\":\"Get Location (via Location Label)\",\"value\":\"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId\",\"description\":\"GET /labels/{label_id}/location_labels/{location_label_id}/location/{location_id}\",\"action\":\"Get Location (via Location Label)\"},{\"name\":\"Get Location Label (via Label)\",\"value\":\"getLabelsLabelIdLocationLabelsLocationLabelId\",\"description\":\"GET /labels/{label_id}/location_labels/{location_label_id}\",\"action\":\"Get Location Label (via Label)\"}],\n      default: \"getLabelsLabelIdEventLabels\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"]}},\n      options: [{\"name\":\"List Check Ins (via Option)\",\"value\":\"getOptionsOptionIdCheckIns\",\"description\":\"GET /options/{option_id}/check_ins\",\"action\":\"List Check Ins (via Option)\"},{\"name\":\"List Label (via Option)\",\"value\":\"getOptionsOptionIdLabel\",\"description\":\"GET /options/{option_id}/label\",\"action\":\"List Label (via Option)\"},{\"name\":\"List Options\",\"value\":\"getOptions\",\"description\":\"GET /options\",\"action\":\"List Options\"},{\"name\":\"Get Check In (via Option)\",\"value\":\"getOptionsOptionIdCheckInsCheckInId\",\"description\":\"GET /options/{option_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Option)\"},{\"name\":\"Get Label (via Option)\",\"value\":\"getOptionsOptionIdLabelLabelId\",\"description\":\"GET /options/{option_id}/label/{label_id}\",\"action\":\"Get Label (via Option)\"},{\"name\":\"Get Option\",\"value\":\"getOptionsOptionId\",\"description\":\"GET /options/{option_id}\",\"action\":\"Get Option\"}],\n      default: \"getOptionsOptionIdCheckIns\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"]}},\n      options: [{\"name\":\"List Passes\",\"value\":\"getPasses\",\"description\":\"GET /passes\",\"action\":\"List Passes\"},{\"name\":\"List Person (via Pass)\",\"value\":\"getPassesPassIdPerson\",\"description\":\"GET /passes/{pass_id}/person\",\"action\":\"List Person (via Pass)\"},{\"name\":\"Get Pass\",\"value\":\"getPassesPassId\",\"description\":\"GET /passes/{pass_id}\",\"action\":\"Get Pass\"},{\"name\":\"Get Person (via Pass)\",\"value\":\"getPassesPassIdPersonPersonId\",\"description\":\"GET /passes/{pass_id}/person/{person_id}\",\"action\":\"Get Person (via Pass)\"}],\n      default: \"getPasses\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"List Check Ins (via Person)\",\"value\":\"getPeoplePersonIdCheckIns\",\"description\":\"GET /people/{person_id}/check_ins\",\"action\":\"List Check Ins (via Person)\"},{\"name\":\"List Organization (via Person)\",\"value\":\"getPeoplePersonIdOrganization\",\"description\":\"GET /people/{person_id}/organization\",\"action\":\"List Organization (via Person)\"},{\"name\":\"List Passes (via Person)\",\"value\":\"getPeoplePersonIdPasses\",\"description\":\"GET /people/{person_id}/passes\",\"action\":\"List Passes (via Person)\"},{\"name\":\"List People\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"List People\"},{\"name\":\"List Person Events (via Person)\",\"value\":\"getPeoplePersonIdPersonEvents\",\"description\":\"GET /people/{person_id}/person_events\",\"action\":\"List Person Events (via Person)\"},{\"name\":\"Get Check In (via Person)\",\"value\":\"getPeoplePersonIdCheckInsCheckInId\",\"description\":\"GET /people/{person_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Person)\"},{\"name\":\"Get Me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"Get Me\"},{\"name\":\"Get Organization (via Person)\",\"value\":\"getPeoplePersonIdOrganizationOrganizationId\",\"description\":\"GET /people/{person_id}/organization/{organization_id}\",\"action\":\"Get Organization (via Person)\"},{\"name\":\"Get Pass (via Person)\",\"value\":\"getPeoplePersonIdPassesPassId\",\"description\":\"GET /people/{person_id}/passes/{pass_id}\",\"action\":\"Get Pass (via Person)\"},{\"name\":\"Get Person Event (via Person)\",\"value\":\"getPeoplePersonIdPersonEventsPersonEventId\",\"description\":\"GET /people/{person_id}/person_events/{person_event_id}\",\"action\":\"Get Person Event (via Person)\"},{\"name\":\"Get Person\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"Get Person\"}],\n      default: \"getPeoplePersonIdCheckIns\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"]}},\n      options: [{\"name\":\"List Check In Groups (via Station)\",\"value\":\"getStationsStationIdCheckInGroups\",\"description\":\"GET /stations/{station_id}/check_in_groups\",\"action\":\"List Check In Groups (via Station)\"},{\"name\":\"List Check Ins (via Check In Group)\",\"value\":\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\",\"description\":\"GET /stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins\",\"action\":\"List Check Ins (via Check In Group)\"},{\"name\":\"List Checked In At Check Ins (via Station)\",\"value\":\"getStationsStationIdCheckedInAtCheckIns\",\"description\":\"GET /stations/{station_id}/checked_in_at_check_ins\",\"action\":\"List Checked In At Check Ins (via Station)\"},{\"name\":\"List Event (via Station)\",\"value\":\"getStationsStationIdEvent\",\"description\":\"GET /stations/{station_id}/event\",\"action\":\"List Event (via Station)\"},{\"name\":\"List Event Period (via Check In Group)\",\"value\":\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\",\"description\":\"GET /stations/{station_id}/check_in_groups/{check_in_group_id}/event_period\",\"action\":\"List Event Period (via Check In Group)\"},{\"name\":\"List Location (via Station)\",\"value\":\"getStationsStationIdLocation\",\"description\":\"GET /stations/{station_id}/location\",\"action\":\"List Location (via Station)\"},{\"name\":\"List Print Station (via Check In Group)\",\"value\":\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation\",\"description\":\"GET /stations/{station_id}/check_in_groups/{check_in_group_id}/print_station\",\"action\":\"List Print Station (via Check In Group)\"},{\"name\":\"List Print Station (via Station)\",\"value\":\"getStationsStationIdPrintStation\",\"description\":\"GET /stations/{station_id}/print_station\",\"action\":\"List Print Station (via Station)\"},{\"name\":\"List Stations\",\"value\":\"getStations\",\"description\":\"GET /stations\",\"action\":\"List Stations\"},{\"name\":\"List Theme (via Station)\",\"value\":\"getStationsStationIdTheme\",\"description\":\"GET /stations/{station_id}/theme\",\"action\":\"List Theme (via Station)\"},{\"name\":\"Get Check In (via Check In Group)\",\"value\":\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId\",\"description\":\"GET /stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins/{check_in_id}\",\"action\":\"Get Check In (via Check In Group)\"},{\"name\":\"Get Check In Group (via Station)\",\"value\":\"getStationsStationIdCheckInGroupsCheckInGroupId\",\"description\":\"GET /stations/{station_id}/check_in_groups/{check_in_group_id}\",\"action\":\"Get Check In Group (via Station)\"},{\"name\":\"Get Checked In At Check In (via Station)\",\"value\":\"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId\",\"description\":\"GET /stations/{station_id}/checked_in_at_check_ins/{checked_in_at_check_in_id}\",\"action\":\"Get Checked In At Check In (via Station)\"},{\"name\":\"Get Event (via Station)\",\"value\":\"getStationsStationIdEventEventId\",\"description\":\"GET /stations/{station_id}/event/{event_id}\",\"action\":\"Get Event (via Station)\"},{\"name\":\"Get Event Period (via Check In Group)\",\"value\":\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId\",\"description\":\"GET /stations/{station_id}/check_in_groups/{check_in_group_id}/event_period/{event_period_id}\",\"action\":\"Get Event Period (via Check In Group)\"},{\"name\":\"Get Location (via Station)\",\"value\":\"getStationsStationIdLocationLocationId\",\"description\":\"GET /stations/{station_id}/location/{location_id}\",\"action\":\"Get Location (via Station)\"},{\"name\":\"Get Print Station (via Check In Group)\",\"value\":\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId\",\"description\":\"GET /stations/{station_id}/check_in_groups/{check_in_group_id}/print_station/{print_station_id}\",\"action\":\"Get Print Station (via Check In Group)\"},{\"name\":\"Get Print Station (via Station)\",\"value\":\"getStationsStationIdPrintStationPrintStationId\",\"description\":\"GET /stations/{station_id}/print_station/{print_station_id}\",\"action\":\"Get Print Station (via Station)\"},{\"name\":\"Get Station\",\"value\":\"getStationsStationId\",\"description\":\"GET /stations/{station_id}\",\"action\":\"Get Station\"},{\"name\":\"Get Theme (via Station)\",\"value\":\"getStationsStationIdThemeThemeId\",\"description\":\"GET /stations/{station_id}/theme/{theme_id}\",\"action\":\"Get Theme (via Station)\"}],\n      default: \"getStationsStationIdCheckInGroups\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Theme\"]}},\n      options: [{\"name\":\"List Themes\",\"value\":\"getThemes\",\"description\":\"GET /themes\",\"action\":\"List Themes\"},{\"name\":\"Get Theme\",\"value\":\"getThemesThemeId\",\"description\":\"GET /themes/{theme_id}\",\"action\":\"Get Theme\"}],\n      default: \"getThemes\",\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckInGroup_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroup\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckInGroup_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroup\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check Ins\",\"value\":\"check_ins\"},{\"name\":\"Check Ins Check In Times\",\"value\":\"check_ins.check_in_times\"},{\"name\":\"Check Ins Checked In At\",\"value\":\"check_ins.checked_in_at\"},{\"name\":\"Check Ins Checked In By\",\"value\":\"check_ins.checked_in_by\"},{\"name\":\"Check Ins Checked Out By\",\"value\":\"check_ins.checked_out_by\"},{\"name\":\"Check Ins Event\",\"value\":\"check_ins.event\"},{\"name\":\"Check Ins Event Period\",\"value\":\"check_ins.event_period\"},{\"name\":\"Check Ins Event Times\",\"value\":\"check_ins.event_times\"},{\"name\":\"Check Ins Locations\",\"value\":\"check_ins.locations\"},{\"name\":\"Check Ins Options\",\"value\":\"check_ins.options\"},{\"name\":\"Check Ins Person\",\"value\":\"check_ins.person\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdCheckInGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdCheckInGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroup\"],\"getCheckInsCheckInIdCheckInGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckInTimes_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInTimes\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdCheckInTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdCheckInTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInTimes\"],\"getCheckInsCheckInIdCheckInTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"],\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"],\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckIns_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckIns_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"],\"getCheckInsCheckInIdLocationsLocationIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckIns\"],\"getCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckedInAt_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAt\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckedInAt_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAt\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdCheckedInAt_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAt\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdCheckedInAt_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAt\"],\"getCheckInsCheckInIdCheckedInAt_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAt\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckedInBy_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInBy\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdCheckedInBy_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInBy\"]}},\n      options: [{\"displayName\":\"Search Name\",\"name\":\"wheresearchName\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdCheckedInBy_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInBy\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Last Checked In At Ascending\",\"value\":\"last_checked_in_at\"},{\"name\":\"Last Checked In At Descending\",\"value\":\"-last_checked_in_at\"},{\"name\":\"Check In Count Ascending\",\"value\":\"check_in_count\"},{\"name\":\"Check In Count Descending\",\"value\":\"-check_in_count\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckedInBy_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInBy\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdCheckedInBy_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInBy\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdCheckedInBy_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInBy\"],\"getCheckInsCheckInIdCheckedInBy_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInBy\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckedOutBy_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutBy\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdCheckedOutBy_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutBy\"]}},\n      options: [{\"displayName\":\"Search Name\",\"name\":\"wheresearchName\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdCheckedOutBy_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutBy\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Last Checked In At Ascending\",\"value\":\"last_checked_in_at\"},{\"name\":\"Last Checked In At Descending\",\"value\":\"-last_checked_in_at\"},{\"name\":\"Check In Count Ascending\",\"value\":\"check_in_count\"},{\"name\":\"Check In Count Descending\",\"value\":\"-check_in_count\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckedOutBy_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutBy\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdCheckedOutBy_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutBy\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdCheckedOutBy_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutBy\"],\"getCheckInsCheckInIdCheckedOutBy_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutBy\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEvent_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEvent\"],\"getCheckInsCheckInIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"],\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEvent_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEvent_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"],\"getCheckInsCheckInIdLocationsLocationIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriod_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriod\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEventPeriod_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventPeriod_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriod_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriod_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriod\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriod_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriod\"],\"getCheckInsCheckInIdEventPeriod_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriod\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"],\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriod\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventTimes_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimes\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEventTimes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimes\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventTimes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Shows At Ascending\",\"value\":\"shows_at\"},{\"name\":\"Shows At Descending\",\"value\":\"-shows_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventTimes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimes\"],\"getCheckInsCheckInIdEventTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Shows At Ascending\",\"value\":\"shows_at\"},{\"name\":\"Shows At Descending\",\"value\":\"-shows_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"],\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks\"],\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinks\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"],\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods\"],\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriods\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods\"],\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriods\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\"],\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabels_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabels\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabels_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabels\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabels_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabels\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabels\"],\"getCheckInsCheckInIdLocationsLocationIdLocationLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocations_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdLocations_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocations_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocations\"],\"getCheckInsCheckInIdLocations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocations_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocations\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocations_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocations_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocations_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocations\"],\"getCheckInsCheckInIdLocationsLocationIdLocations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdOptions_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptions\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdOptions_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptions\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdOptions_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptions\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdOptions_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptions\"],\"getCheckInsCheckInIdOptions_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptions\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptions_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptions\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptions_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptions\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptions_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptions\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptions_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptions\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptions_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptions\"],\"getCheckInsCheckInIdLocationsLocationIdOptions_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptions\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParent_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParent\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParent_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParent\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdLocationsLocationIdParent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdLocationsLocationIdParent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParent\"],\"getCheckInsCheckInIdLocationsLocationIdParent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdPerson_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPerson\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCheckInsCheckInIdPerson_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPerson\"]}},\n      options: [{\"displayName\":\"Search Name\",\"name\":\"wheresearchName\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCheckInsCheckInIdPerson_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Last Checked In At Ascending\",\"value\":\"last_checked_in_at\"},{\"name\":\"Last Checked In At Descending\",\"value\":\"-last_checked_in_at\"},{\"name\":\"Check In Count Ascending\",\"value\":\"check_in_count\"},{\"name\":\"Check In Count Descending\",\"value\":\"-check_in_count\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdPerson_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPerson\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCheckInsCheckInIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCheckInsCheckInIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPerson\"],\"getCheckInsCheckInIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckInGroupCheckInGroupId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroupCheckInGroupId\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getCheckInsCheckInIdCheckInGroupCheckInGroupId_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroupCheckInGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckInGroupCheckInGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroupCheckInGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check Ins\",\"value\":\"check_ins\"},{\"name\":\"Check Ins Check In Times\",\"value\":\"check_ins.check_in_times\"},{\"name\":\"Check Ins Checked In At\",\"value\":\"check_ins.checked_in_at\"},{\"name\":\"Check Ins Checked In By\",\"value\":\"check_ins.checked_in_by\"},{\"name\":\"Check Ins Checked Out By\",\"value\":\"check_ins.checked_out_by\"},{\"name\":\"Check Ins Event\",\"value\":\"check_ins.event\"},{\"name\":\"Check Ins Event Period\",\"value\":\"check_ins.event_period\"},{\"name\":\"Check Ins Event Times\",\"value\":\"check_ins.event_times\"},{\"name\":\"Check Ins Locations\",\"value\":\"check_ins.locations\"},{\"name\":\"Check Ins Options\",\"value\":\"check_ins.options\"},{\"name\":\"Check Ins Person\",\"value\":\"check_ins.person\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInGroupCheckInGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckInTimesCheckInTimeId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInTimesCheckInTimeId\"]}},\n    },\n    {\n      displayName: \"Check In Time ID\",\n      name: \"getCheckInsCheckInIdCheckInTimesCheckInTimeId_checkInTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInTimesCheckInTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckInTimesCheckInTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckedInAtCheckedInAtId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAtCheckedInAtId\"]}},\n    },\n    {\n      displayName: \"Checked In At ID\",\n      name: \"getCheckInsCheckInIdCheckedInAtCheckedInAtId_checkedInAtId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAtCheckedInAtId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckedInAtCheckedInAtId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAtCheckedInAtId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInAtCheckedInAtId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckedInByCheckedInById_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInByCheckedInById\"]}},\n    },\n    {\n      displayName: \"Checked In By ID\",\n      name: \"getCheckInsCheckInIdCheckedInByCheckedInById_checkedInById\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInByCheckedInById\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckedInByCheckedInById_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInByCheckedInById\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedInByCheckedInById\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdCheckedOutByCheckedOutById_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutByCheckedOutById\"]}},\n    },\n    {\n      displayName: \"Checked Out By ID\",\n      name: \"getCheckInsCheckInIdCheckedOutByCheckedOutById_checkedOutById\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutByCheckedOutById\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdCheckedOutByCheckedOutById_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutByCheckedOutById\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdCheckedOutByCheckedOutById\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventEventId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getCheckInsCheckInIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEventEventId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEventEventId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdEventPeriodEventPeriodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventTimesEventTimeId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimesEventTimeId\"]}},\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getCheckInsCheckInIdEventTimesEventTimeId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimesEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventTimesEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimesEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventTimesEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId\"]}},\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdEventTimesEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId\"]}},\n    },\n    {\n      displayName: \"Integration Link ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId_integrationLinkId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdIntegrationLinksIntegrationLinkId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationsLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Location Event Period ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId_locationEventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventPeriodsLocationEventPeriodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationEventTimesLocationEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId\"]}},\n    },\n    {\n      displayName: \"Location Label ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId_locationLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdLocationLabelsLocationLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdOptionsOptionId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptionsOptionId\"]}},\n    },\n    {\n      displayName: \"Option ID\",\n      name: \"getCheckInsCheckInIdOptionsOptionId_optionId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptionsOptionId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdOptionsOptionId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptionsOptionId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdOptionsOptionId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId\"]}},\n    },\n    {\n      displayName: \"Option ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId_optionId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdOptionsOptionId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParentParentId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParentParentId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParentParentId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParentParentId\"]}},\n    },\n    {\n      displayName: \"Parent ID\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParentParentId_parentId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParentParentId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdLocationsLocationIdParentParentId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParentParentId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdLocationsLocationIdParentParentId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getCheckInsCheckInIdPersonPersonId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getCheckInsCheckInIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCheckInsCheckInIdPersonPersonId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPersonPersonId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Check In\"],\"operation\":[\"getCheckInsCheckInIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdAvailableLocations_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdAvailableLocations_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdAvailableLocations_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdAvailableLocations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdAvailableLocations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocations\"],\"getEventTimesEventTimeIdAvailableLocations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdCheckIns_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimesEventTimeIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckIns\"],\"getEventTimesEventTimeIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"],\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdEvent_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimesEventTimeIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEvent\"],\"getEventTimesEventTimeIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdEventPeriod_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriod\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimesEventTimeIdEventPeriod_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdEventPeriod_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdEventPeriod_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdEventPeriod_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriod\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdEventPeriod_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriod\"],\"getEventTimesEventTimeIdEventPeriod_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriod\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Shows At Ascending\",\"value\":\"shows_at\"},{\"name\":\"Shows At Descending\",\"value\":\"-shows_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"],\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTime\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimes\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Shows At Ascending\",\"value\":\"shows_at\"},{\"name\":\"Shows At Descending\",\"value\":\"-shows_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimes\"],\"getEventTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdHeadcounts_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcounts\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimesEventTimeIdHeadcounts_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcounts\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Attendance Type ID\",\"name\":\"whereattendanceTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdHeadcounts_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcounts\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Total Ascending\",\"value\":\"total\"},{\"name\":\"Total Descending\",\"value\":\"-total\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdHeadcounts_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcounts\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Type\",\"value\":\"attendance_type\"},{\"name\":\"Attendance Type Event\",\"value\":\"attendance_type.event\"},{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdHeadcounts_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcounts\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdHeadcounts_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcounts\"],\"getEventTimesEventTimeIdHeadcounts_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcounts\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\"],\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimes_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimes\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventTimesEventTimeIdLocationEventTimes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimes\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventTimesEventTimeIdLocationEventTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventTimesEventTimeIdLocationEventTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimes\"],\"getEventTimesEventTimeIdLocationEventTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId\"]}},\n    },\n    {\n      displayName: \"Available Location ID\",\n      name: \"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId_availableLocationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdAvailableLocationsAvailableLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdCheckInsCheckInId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getEventTimesEventTimeIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdEventEventId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventTimesEventTimeIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdEventPeriodEventPeriodId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getEventTimesEventTimeIdEventPeriodEventPeriodId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdEventPeriodEventPeriodId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriodEventPeriodId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdEventPeriodEventPeriodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdEventTimeEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdHeadcountsHeadcountId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcountsHeadcountId\"]}},\n    },\n    {\n      displayName: \"Headcount ID\",\n      name: \"getEventTimesEventTimeIdHeadcountsHeadcountId_headcountId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcountsHeadcountId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdHeadcountsHeadcountId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcountsHeadcountId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Type\",\"value\":\"attendance_type\"},{\"name\":\"Attendance Type Event\",\"value\":\"attendance_type.event\"},{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdHeadcountsHeadcountId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId\"]}},\n    },\n    {\n      displayName: \"Location Event Time ID\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId_locationEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event Time\"],\"operation\":[\"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendanceTypes_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypes\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdAttendanceTypes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypes\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendanceTypes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendanceTypes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendanceTypes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypes\"],\"getEventsEventIdAttendanceTypes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdCheckIns_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckIns\"],\"getEventsEventIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdCurrentEventTimes_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimes\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdCurrentEventTimes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimes\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdCurrentEventTimes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Shows At Ascending\",\"value\":\"shows_at\"},{\"name\":\"Shows At Descending\",\"value\":\"-shows_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdCurrentEventTimes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdCurrentEventTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdCurrentEventTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimes\"],\"getEventsEventIdCurrentEventTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"]}},\n    },\n    {\n      displayName: \"Attendance Type ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_attendanceTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"],\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEvent_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"]}},\n    },\n    {\n      displayName: \"Event Label ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEvent_eventLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdEventLabelsEventLabelIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdEventLabelsEventLabelIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"],\"getEventsEventIdEventLabelsEventLabelIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEvent_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEvent_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdPersonEventsPersonEventIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdPersonEventsPersonEventIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"],\"getEventsEventIdPersonEventsPersonEventIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventLabels_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabels\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdEventLabels_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabels\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdEventLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdEventLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabels\"],\"getEventsEventIdEventLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventPeriods_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriods\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdEventPeriods_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriods\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdEventPeriods_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriods\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdEventPeriods_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriods\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdEventPeriods_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriods\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdEventPeriods_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriods\"],\"getEventsEventIdEventPeriods_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriods\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEvents_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEvents_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEvents_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"],\"getEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"],\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"]}},\n    },\n    {\n      displayName: \"Attendance Type ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_attendanceTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Total Ascending\",\"value\":\"total\"},{\"name\":\"Total Descending\",\"value\":\"-total\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Type\",\"value\":\"attendance_type\"},{\"name\":\"Attendance Type Event\",\"value\":\"attendance_type.event\"},{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"],\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdIntegrationLinks_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdIntegrationLinks\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdIntegrationLinks_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdIntegrationLinks\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdIntegrationLinks_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdIntegrationLinks\"],\"getEventsEventIdIntegrationLinks_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdIntegrationLinks\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdLabel_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabel\"]}},\n    },\n    {\n      displayName: \"Event Label ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdLabel_eventLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabel\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdEventLabelsEventLabelIdLabel_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabel\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdEventLabelsEventLabelIdLabel_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabel\"],\"getEventsEventIdEventLabelsEventLabelIdLabel_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"],\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckIn\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdLocations_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdLocations_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocations_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdLocations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdLocations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocations\"],\"getEventsEventIdLocations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPerson_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPerson_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPerson_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"]}},\n      options: [{\"displayName\":\"Search Name\",\"name\":\"wheresearchName\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPerson_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Last Checked In At Ascending\",\"value\":\"last_checked_in_at\"},{\"name\":\"Last Checked In At Descending\",\"value\":\"-last_checked_in_at\"},{\"name\":\"Check In Count Ascending\",\"value\":\"check_in_count\"},{\"name\":\"Check In Count Descending\",\"value\":\"-check_in_count\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPerson_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdPersonEventsPersonEventIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdPersonEventsPersonEventIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"],\"getEventsEventIdPersonEventsPersonEventIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEvents_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEvents\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEvents_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEvents\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"First Check In\",\"value\":\"first_check_in\"},{\"name\":\"First Check In Check In Times\",\"value\":\"first_check_in.check_in_times\"},{\"name\":\"First Check In Checked In At\",\"value\":\"first_check_in.checked_in_at\"},{\"name\":\"First Check In Checked In By\",\"value\":\"first_check_in.checked_in_by\"},{\"name\":\"First Check In Checked Out By\",\"value\":\"first_check_in.checked_out_by\"},{\"name\":\"First Check In Event\",\"value\":\"first_check_in.event\"},{\"name\":\"First Check In Event Period\",\"value\":\"first_check_in.event_period\"},{\"name\":\"First Check In Event Times\",\"value\":\"first_check_in.event_times\"},{\"name\":\"First Check In Locations\",\"value\":\"first_check_in.locations\"},{\"name\":\"First Check In Options\",\"value\":\"first_check_in.options\"},{\"name\":\"First Check In Person\",\"value\":\"first_check_in.person\"},{\"name\":\"Last Check In\",\"value\":\"last_check_in\"},{\"name\":\"Last Check In Check In Times\",\"value\":\"last_check_in.check_in_times\"},{\"name\":\"Last Check In Checked In At\",\"value\":\"last_check_in.checked_in_at\"},{\"name\":\"Last Check In Checked In By\",\"value\":\"last_check_in.checked_in_by\"},{\"name\":\"Last Check In Checked Out By\",\"value\":\"last_check_in.checked_out_by\"},{\"name\":\"Last Check In Event\",\"value\":\"last_check_in.event\"},{\"name\":\"Last Check In Event Period\",\"value\":\"last_check_in.event_period\"},{\"name\":\"Last Check In Event Times\",\"value\":\"last_check_in.event_times\"},{\"name\":\"Last Check In Locations\",\"value\":\"last_check_in.locations\"},{\"name\":\"Last Check In Options\",\"value\":\"last_check_in.options\"},{\"name\":\"Last Check In Person\",\"value\":\"last_check_in.person\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdPersonEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdPersonEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEvents\"],\"getEventsEventIdPersonEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeId\"]}},\n    },\n    {\n      displayName: \"Attendance Type ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeId_attendanceTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdCheckInsCheckInId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getEventsEventIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdCurrentEventTimesCurrentEventTimeId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimesCurrentEventTimeId\"]}},\n    },\n    {\n      displayName: \"Current Event Time ID\",\n      name: \"getEventsEventIdCurrentEventTimesCurrentEventTimeId_currentEventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimesCurrentEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdCurrentEventTimesCurrentEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimesCurrentEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdCurrentEventTimesCurrentEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Attendance Type ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId_attendanceTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Event Label ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEventEventId_eventLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEventEventId_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelId\"]}},\n    },\n    {\n      displayName: \"Event Label ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelId_eventLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdEventLabelsEventLabelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventPeriodsEventPeriodId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriodsEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getEventsEventIdEventPeriodsEventPeriodId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriodsEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdEventPeriodsEventPeriodId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriodsEventPeriodId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventPeriodsEventPeriodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId\"]}},\n    },\n    {\n      displayName: \"First Check In ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId_firstCheckInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdFirstCheckInFirstCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId\"]}},\n    },\n    {\n      displayName: \"Attendance Type ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId_attendanceTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId\"]}},\n    },\n    {\n      displayName: \"Headcount ID\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId_headcountId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Type\",\"value\":\"attendance_type\"},{\"name\":\"Attendance Type Event\",\"value\":\"attendance_type.event\"},{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsHeadcountId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdIntegrationLinksIntegrationLinkId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdIntegrationLinksIntegrationLinkId\"]}},\n    },\n    {\n      displayName: \"Integration Link ID\",\n      name: \"getEventsEventIdIntegrationLinksIntegrationLinkId_integrationLinkId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdIntegrationLinksIntegrationLinkId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdIntegrationLinksIntegrationLinkId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdLabelLabelId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabelLabelId\"]}},\n    },\n    {\n      displayName: \"Event Label ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdLabelLabelId_eventLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabelLabelId\"]}},\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getEventsEventIdEventLabelsEventLabelIdLabelLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabelLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdEventLabelsEventLabelIdLabelLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId\"]}},\n    },\n    {\n      displayName: \"Last Check In ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId_lastCheckInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdLastCheckInLastCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdLocationsLocationId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationsLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getEventsEventIdLocationsLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationsLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocationsLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationsLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationsLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPersonPersonId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPersonPersonId_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventIdPersonPersonId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPersonPersonId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventId\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getEventsEventIdPersonEventsPersonEventId_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdPersonEventsPersonEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"First Check In\",\"value\":\"first_check_in\"},{\"name\":\"First Check In Check In Times\",\"value\":\"first_check_in.check_in_times\"},{\"name\":\"First Check In Checked In At\",\"value\":\"first_check_in.checked_in_at\"},{\"name\":\"First Check In Checked In By\",\"value\":\"first_check_in.checked_in_by\"},{\"name\":\"First Check In Checked Out By\",\"value\":\"first_check_in.checked_out_by\"},{\"name\":\"First Check In Event\",\"value\":\"first_check_in.event\"},{\"name\":\"First Check In Event Period\",\"value\":\"first_check_in.event_period\"},{\"name\":\"First Check In Event Times\",\"value\":\"first_check_in.event_times\"},{\"name\":\"First Check In Locations\",\"value\":\"first_check_in.locations\"},{\"name\":\"First Check In Options\",\"value\":\"first_check_in.options\"},{\"name\":\"First Check In Person\",\"value\":\"first_check_in.person\"},{\"name\":\"Last Check In\",\"value\":\"last_check_in\"},{\"name\":\"Last Check In Check In Times\",\"value\":\"last_check_in.check_in_times\"},{\"name\":\"Last Check In Checked In At\",\"value\":\"last_check_in.checked_in_at\"},{\"name\":\"Last Check In Checked In By\",\"value\":\"last_check_in.checked_in_by\"},{\"name\":\"Last Check In Checked Out By\",\"value\":\"last_check_in.checked_out_by\"},{\"name\":\"Last Check In Event\",\"value\":\"last_check_in.event\"},{\"name\":\"Last Check In Event Period\",\"value\":\"last_check_in.event_period\"},{\"name\":\"Last Check In Event Times\",\"value\":\"last_check_in.event_times\"},{\"name\":\"Last Check In Locations\",\"value\":\"last_check_in.locations\"},{\"name\":\"Last Check In Options\",\"value\":\"last_check_in.options\"},{\"name\":\"Last Check In Person\",\"value\":\"last_check_in.person\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdPersonEventsPersonEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Headcount ID\",\n      name: \"getHeadcountsHeadcountIdAttendanceType_headcountId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceType\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getHeadcountsHeadcountIdAttendanceType_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceType\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getHeadcountsHeadcountIdAttendanceType_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceType\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getHeadcountsHeadcountIdAttendanceType_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceType\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getHeadcountsHeadcountIdAttendanceType_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceType\"],\"getHeadcountsHeadcountIdAttendanceType_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceType\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Headcount ID\",\n      name: \"getHeadcountsHeadcountIdEventTime_headcountId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTime\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getHeadcountsHeadcountIdEventTime_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTime\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getHeadcountsHeadcountIdEventTime_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTime\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Shows At Ascending\",\"value\":\"shows_at\"},{\"name\":\"Shows At Descending\",\"value\":\"-shows_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getHeadcountsHeadcountIdEventTime_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTime\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getHeadcountsHeadcountIdEventTime_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTime\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getHeadcountsHeadcountIdEventTime_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTime\"],\"getHeadcountsHeadcountIdEventTime_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTime\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getHeadcounts_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcounts\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Attendance Type ID\",\"name\":\"whereattendanceTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getHeadcounts_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcounts\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Total Ascending\",\"value\":\"total\"},{\"name\":\"Total Descending\",\"value\":\"-total\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getHeadcounts_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcounts\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Type\",\"value\":\"attendance_type\"},{\"name\":\"Attendance Type Event\",\"value\":\"attendance_type.event\"},{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getHeadcounts_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcounts\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getHeadcounts_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcounts\"],\"getHeadcounts_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcounts\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Headcount ID\",\n      name: \"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId_headcountId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId\"]}},\n    },\n    {\n      displayName: \"Attendance Type ID\",\n      name: \"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId_attendanceTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdAttendanceTypeAttendanceTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Headcount ID\",\n      name: \"getHeadcountsHeadcountIdEventTimeEventTimeId_headcountId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTimeEventTimeId\"]}},\n    },\n    {\n      displayName: \"Event Time ID\",\n      name: \"getHeadcountsHeadcountIdEventTimeEventTimeId_eventTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTimeEventTimeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getHeadcountsHeadcountIdEventTimeEventTimeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTimeEventTimeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Headcounts\",\"value\":\"headcounts\"},{\"name\":\"Headcounts Attendance Type\",\"value\":\"headcounts.attendance_type\"},{\"name\":\"Headcounts Event Time\",\"value\":\"headcounts.event_time\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountIdEventTimeEventTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Headcount ID\",\n      name: \"getHeadcountsHeadcountId_headcountId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getHeadcountsHeadcountId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Type\",\"value\":\"attendance_type\"},{\"name\":\"Attendance Type Event\",\"value\":\"attendance_type.event\"},{\"name\":\"Event Time\",\"value\":\"event_time\"},{\"name\":\"Event Time Event\",\"value\":\"event_time.event\"},{\"name\":\"Event Time Event Period\",\"value\":\"event_time.event_period\"},{\"name\":\"Event Time Headcounts\",\"value\":\"event_time.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Headcount\"],\"operation\":[\"getHeadcountsHeadcountId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getIntegrationLinks_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Integration Link\"],\"operation\":[\"getIntegrationLinks\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getIntegrationLinks_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Integration Link\"],\"operation\":[\"getIntegrationLinks\"],\"getIntegrationLinks_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Integration Link\"],\"operation\":[\"getIntegrationLinks\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Integration Link ID\",\n      name: \"getIntegrationLinksIntegrationLinkId_integrationLinkId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Integration Link\"],\"operation\":[\"getIntegrationLinksIntegrationLinkId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Integration Link\"],\"operation\":[\"getIntegrationLinksIntegrationLinkId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdEventLabels_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabels\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getLabelsLabelIdEventLabels_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabels\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getLabelsLabelIdEventLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getLabelsLabelIdEventLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabels\"],\"getLabelsLabelIdEventLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLabel_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabel\"]}},\n    },\n    {\n      displayName: \"Location Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLabel_locationLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabel\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLabel_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabel\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLabel_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabel\"],\"getLabelsLabelIdLocationLabelsLocationLabelIdLabel_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"],\"getLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocation_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\"]}},\n    },\n    {\n      displayName: \"Location Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocation_locationLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocation_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\"],\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdLocationLabels_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabels\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getLabelsLabelIdLocationLabels_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabels\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getLabelsLabelIdLocationLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getLabelsLabelIdLocationLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabels\"],\"getLabelsLabelIdLocationLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdEventLabelsEventLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabelsEventLabelId\"]}},\n    },\n    {\n      displayName: \"Event Label ID\",\n      name: \"getLabelsLabelIdEventLabelsEventLabelId_eventLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabelsEventLabelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getLabelsLabelIdEventLabelsEventLabelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabelsEventLabelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdEventLabelsEventLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLabelLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabelLabelId\"]}},\n    },\n    {\n      displayName: \"Location Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLabelLabelId_locationLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabelLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLabelLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId_locationLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelId\"]}},\n    },\n    {\n      displayName: \"Location Label ID\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelId_locationLabelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getLabelsLabelIdLocationLabelsLocationLabelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelIdLocationLabelsLocationLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Option ID\",\n      name: \"getOptionsOptionIdCheckIns_optionId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getOptionsOptionIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getOptionsOptionIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getOptionsOptionIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getOptionsOptionIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getOptionsOptionIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckIns\"],\"getOptionsOptionIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Option ID\",\n      name: \"getOptionsOptionIdLabel_optionId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdLabel\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getOptionsOptionIdLabel_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdLabel\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getOptionsOptionIdLabel_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdLabel\"],\"getOptionsOptionIdLabel_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdLabel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getOptions_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptions\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getOptions_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptions\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getOptions_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptions\"],\"getOptions_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptions\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Option ID\",\n      name: \"getOptionsOptionIdCheckInsCheckInId_optionId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getOptionsOptionIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getOptionsOptionIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Option ID\",\n      name: \"getOptionsOptionIdLabelLabelId_optionId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdLabelLabelId\"]}},\n    },\n    {\n      displayName: \"Label ID\",\n      name: \"getOptionsOptionIdLabelLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdLabelLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionIdLabelLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Option ID\",\n      name: \"getOptionsOptionId_optionId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getOptionsOptionId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Label\",\"value\":\"label\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Option\"],\"operation\":[\"getOptionsOptionId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPasses_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPasses\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPasses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPasses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPasses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPasses\"],\"getPasses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPasses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Pass ID\",\n      name: \"getPassesPassIdPerson_passId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPerson\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPassesPassIdPerson_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPerson\"]}},\n      options: [{\"displayName\":\"Search Name\",\"name\":\"wheresearchName\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPassesPassIdPerson_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Last Checked In At Ascending\",\"value\":\"last_checked_in_at\"},{\"name\":\"Last Checked In At Descending\",\"value\":\"-last_checked_in_at\"},{\"name\":\"Check In Count Ascending\",\"value\":\"check_in_count\"},{\"name\":\"Check In Count Descending\",\"value\":\"-check_in_count\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPassesPassIdPerson_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPerson\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPassesPassIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPassesPassIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPerson\"],\"getPassesPassIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Pass ID\",\n      name: \"getPassesPassId_passId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPassesPassId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Pass ID\",\n      name: \"getPassesPassIdPersonPersonId_passId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPassesPassIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPassesPassIdPersonPersonId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPersonPersonId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Pass\"],\"operation\":[\"getPassesPassIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdCheckIns_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeoplePersonIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckIns\"],\"getPeoplePersonIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdOrganization_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdOrganization\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdOrganization_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdOrganization\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdOrganization_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdOrganization\"],\"getPeoplePersonIdOrganization_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdOrganization\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdPasses_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPasses\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPasses_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPasses\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPasses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPasses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPasses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPasses\"],\"getPeoplePersonIdPasses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPasses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeople_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\"displayName\":\"Search Name\",\"name\":\"wheresearchName\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeople_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Last Checked In At Ascending\",\"value\":\"last_checked_in_at\"},{\"name\":\"Last Checked In At Descending\",\"value\":\"-last_checked_in_at\"},{\"name\":\"Check In Count Ascending\",\"value\":\"check_in_count\"},{\"name\":\"Check In Count Descending\",\"value\":\"-check_in_count\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeople_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdPersonEvents_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEvents\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPersonEvents_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEvents\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"First Check In\",\"value\":\"first_check_in\"},{\"name\":\"First Check In Check In Times\",\"value\":\"first_check_in.check_in_times\"},{\"name\":\"First Check In Checked In At\",\"value\":\"first_check_in.checked_in_at\"},{\"name\":\"First Check In Checked In By\",\"value\":\"first_check_in.checked_in_by\"},{\"name\":\"First Check In Checked Out By\",\"value\":\"first_check_in.checked_out_by\"},{\"name\":\"First Check In Event\",\"value\":\"first_check_in.event\"},{\"name\":\"First Check In Event Period\",\"value\":\"first_check_in.event_period\"},{\"name\":\"First Check In Event Times\",\"value\":\"first_check_in.event_times\"},{\"name\":\"First Check In Locations\",\"value\":\"first_check_in.locations\"},{\"name\":\"First Check In Options\",\"value\":\"first_check_in.options\"},{\"name\":\"First Check In Person\",\"value\":\"first_check_in.person\"},{\"name\":\"Last Check In\",\"value\":\"last_check_in\"},{\"name\":\"Last Check In Check In Times\",\"value\":\"last_check_in.check_in_times\"},{\"name\":\"Last Check In Checked In At\",\"value\":\"last_check_in.checked_in_at\"},{\"name\":\"Last Check In Checked In By\",\"value\":\"last_check_in.checked_in_by\"},{\"name\":\"Last Check In Checked Out By\",\"value\":\"last_check_in.checked_out_by\"},{\"name\":\"Last Check In Event\",\"value\":\"last_check_in.event\"},{\"name\":\"Last Check In Event Period\",\"value\":\"last_check_in.event_period\"},{\"name\":\"Last Check In Event Times\",\"value\":\"last_check_in.event_times\"},{\"name\":\"Last Check In Locations\",\"value\":\"last_check_in.locations\"},{\"name\":\"Last Check In Options\",\"value\":\"last_check_in.options\"},{\"name\":\"Last Check In Person\",\"value\":\"last_check_in.person\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPersonEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPersonEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEvents\"],\"getPeoplePersonIdPersonEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdCheckInsCheckInId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getPeoplePersonIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getMe_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdOrganizationOrganizationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdOrganizationOrganizationId\"]}},\n    },\n    {\n      displayName: \"Organization ID\",\n      name: \"getPeoplePersonIdOrganizationOrganizationId_organizationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdOrganizationOrganizationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdOrganizationOrganizationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdPassesPassId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPassesPassId\"]}},\n    },\n    {\n      displayName: \"Pass ID\",\n      name: \"getPeoplePersonIdPassesPassId_passId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPassesPassId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPassesPassId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPassesPassId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPassesPassId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdPersonEventsPersonEventId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEventsPersonEventId\"]}},\n    },\n    {\n      displayName: \"Person Event ID\",\n      name: \"getPeoplePersonIdPersonEventsPersonEventId_personEventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEventsPersonEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPersonEventsPersonEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEventsPersonEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"First Check In\",\"value\":\"first_check_in\"},{\"name\":\"First Check In Check In Times\",\"value\":\"first_check_in.check_in_times\"},{\"name\":\"First Check In Checked In At\",\"value\":\"first_check_in.checked_in_at\"},{\"name\":\"First Check In Checked In By\",\"value\":\"first_check_in.checked_in_by\"},{\"name\":\"First Check In Checked Out By\",\"value\":\"first_check_in.checked_out_by\"},{\"name\":\"First Check In Event\",\"value\":\"first_check_in.event\"},{\"name\":\"First Check In Event Period\",\"value\":\"first_check_in.event_period\"},{\"name\":\"First Check In Event Times\",\"value\":\"first_check_in.event_times\"},{\"name\":\"First Check In Locations\",\"value\":\"first_check_in.locations\"},{\"name\":\"First Check In Options\",\"value\":\"first_check_in.options\"},{\"name\":\"First Check In Person\",\"value\":\"first_check_in.person\"},{\"name\":\"Last Check In\",\"value\":\"last_check_in\"},{\"name\":\"Last Check In Check In Times\",\"value\":\"last_check_in.check_in_times\"},{\"name\":\"Last Check In Checked In At\",\"value\":\"last_check_in.checked_in_at\"},{\"name\":\"Last Check In Checked In By\",\"value\":\"last_check_in.checked_in_by\"},{\"name\":\"Last Check In Checked Out By\",\"value\":\"last_check_in.checked_out_by\"},{\"name\":\"Last Check In Event\",\"value\":\"last_check_in.event\"},{\"name\":\"Last Check In Event Period\",\"value\":\"last_check_in.event_period\"},{\"name\":\"Last Check In Event Times\",\"value\":\"last_check_in.event_times\"},{\"name\":\"Last Check In Locations\",\"value\":\"last_check_in.locations\"},{\"name\":\"Last Check In Options\",\"value\":\"last_check_in.options\"},{\"name\":\"Last Check In Person\",\"value\":\"last_check_in.person\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPersonEventsPersonEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Organization\",\"value\":\"organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroups_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroups_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check Ins\",\"value\":\"check_ins\"},{\"name\":\"Check Ins Check In Times\",\"value\":\"check_ins.check_in_times\"},{\"name\":\"Check Ins Checked In At\",\"value\":\"check_ins.checked_in_at\"},{\"name\":\"Check Ins Checked In By\",\"value\":\"check_ins.checked_in_by\"},{\"name\":\"Check Ins Checked Out By\",\"value\":\"check_ins.checked_out_by\"},{\"name\":\"Check Ins Event\",\"value\":\"check_ins.event\"},{\"name\":\"Check Ins Event Period\",\"value\":\"check_ins.event_period\"},{\"name\":\"Check Ins Event Times\",\"value\":\"check_ins.event_times\"},{\"name\":\"Check Ins Locations\",\"value\":\"check_ins.locations\"},{\"name\":\"Check Ins Options\",\"value\":\"check_ins.options\"},{\"name\":\"Check Ins Person\",\"value\":\"check_ins.person\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdCheckInGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdCheckInGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroups\"],\"getStationsStationIdCheckInGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"],\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckedInAtCheckIns_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckIns\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getStationsStationIdCheckedInAtCheckIns_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckIns\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getStationsStationIdCheckedInAtCheckIns_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckIns\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Number Ascending\",\"value\":\"number\"},{\"name\":\"Number Descending\",\"value\":\"-number\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Checked Out At Ascending\",\"value\":\"checked_out_at\"},{\"name\":\"Checked Out At Descending\",\"value\":\"-checked_out_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckedInAtCheckIns_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckIns\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdCheckedInAtCheckIns_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckIns\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdCheckedInAtCheckIns_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckIns\"],\"getStationsStationIdCheckedInAtCheckIns_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckIns\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdEvent_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEvent\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getStationsStationIdEvent_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEvent\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getStationsStationIdEvent_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEvent\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdEvent_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEvent\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdEvent_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEvent\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdEvent_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEvent\"],\"getStationsStationIdEvent_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEvent\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Event ID\",\"name\":\"whereeventid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"],\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriod\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdLocation_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocation\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getStationsStationIdLocation_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocation\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Kind Ascending\",\"value\":\"kind\"},{\"name\":\"Kind Descending\",\"value\":\"-kind\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdLocation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocation\"],\"getStationsStationIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation\"],\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdPrintStation_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStation\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdPrintStation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdPrintStation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdPrintStation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStation\"],\"getStationsStationIdPrintStation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStations_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStations\"],\"getStations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdTheme_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdTheme\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getStationsStationIdTheme_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdTheme\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getStationsStationIdTheme_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdTheme\"],\"getStationsStationIdTheme_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdTheme\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Check In ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId_checkInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupId\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupId_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check Ins\",\"value\":\"check_ins\"},{\"name\":\"Check Ins Check In Times\",\"value\":\"check_ins.check_in_times\"},{\"name\":\"Check Ins Checked In At\",\"value\":\"check_ins.checked_in_at\"},{\"name\":\"Check Ins Checked In By\",\"value\":\"check_ins.checked_in_by\"},{\"name\":\"Check Ins Checked Out By\",\"value\":\"check_ins.checked_out_by\"},{\"name\":\"Check Ins Event\",\"value\":\"check_ins.event\"},{\"name\":\"Check Ins Event Period\",\"value\":\"check_ins.event_period\"},{\"name\":\"Check Ins Event Times\",\"value\":\"check_ins.event_times\"},{\"name\":\"Check Ins Locations\",\"value\":\"check_ins.locations\"},{\"name\":\"Check Ins Options\",\"value\":\"check_ins.options\"},{\"name\":\"Check Ins Person\",\"value\":\"check_ins.person\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId\"]}},\n    },\n    {\n      displayName: \"Checked In At Check In ID\",\n      name: \"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId_checkedInAtCheckInId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Check In Times\",\"value\":\"check_in_times\"},{\"name\":\"Checked In At\",\"value\":\"checked_in_at\"},{\"name\":\"Checked In At Event\",\"value\":\"checked_in_at.event\"},{\"name\":\"Checked In At Location\",\"value\":\"checked_in_at.location\"},{\"name\":\"Checked In At Print Station\",\"value\":\"checked_in_at.print_station\"},{\"name\":\"Checked In At Theme\",\"value\":\"checked_in_at.theme\"},{\"name\":\"Checked In By\",\"value\":\"checked_in_by\"},{\"name\":\"Checked In By Organization\",\"value\":\"checked_in_by.organization\"},{\"name\":\"Checked Out By\",\"value\":\"checked_out_by\"},{\"name\":\"Checked Out By Organization\",\"value\":\"checked_out_by.organization\"},{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Period\",\"value\":\"event_period\"},{\"name\":\"Event Period Event\",\"value\":\"event_period.event\"},{\"name\":\"Event Period Event Times\",\"value\":\"event_period.event_times\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Person Organization\",\"value\":\"person.organization\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckedInAtCheckInsCheckedInAtCheckInId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdEventEventId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getStationsStationIdEventEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEventEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdEventEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEventEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attendance Types\",\"value\":\"attendance_types\"},{\"name\":\"Attendance Types Event\",\"value\":\"attendance_types.event\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdEventEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Event Period ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId_eventPeriodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Event Times\",\"value\":\"event_times\"},{\"name\":\"Event Times Event\",\"value\":\"event_times.event\"},{\"name\":\"Event Times Event Period\",\"value\":\"event_times.event_period\"},{\"name\":\"Event Times Headcounts\",\"value\":\"event_times.headcounts\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdEventPeriodEventPeriodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdLocationLocationId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getStationsStationIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdLocationLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Locations\",\"value\":\"locations\"},{\"name\":\"Locations Event\",\"value\":\"locations.event\"},{\"name\":\"Locations Locations\",\"value\":\"locations.locations\"},{\"name\":\"Locations Options\",\"value\":\"locations.options\"},{\"name\":\"Locations Parent\",\"value\":\"locations.parent\"},{\"name\":\"Options\",\"value\":\"options\"},{\"name\":\"Options Label\",\"value\":\"options.label\"},{\"name\":\"Parent\",\"value\":\"parent\"},{\"name\":\"Parent Event\",\"value\":\"parent.event\"},{\"name\":\"Parent Locations\",\"value\":\"parent.locations\"},{\"name\":\"Parent Options\",\"value\":\"parent.options\"},{\"name\":\"Parent Parent\",\"value\":\"parent.parent\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId\"]}},\n    },\n    {\n      displayName: \"Check In Group ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId_checkInGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId\"]}},\n    },\n    {\n      displayName: \"Print Station ID\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId_printStationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdCheckInGroupsCheckInGroupIdPrintStationPrintStationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdPrintStationPrintStationId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStationPrintStationId\"]}},\n    },\n    {\n      displayName: \"Print Station ID\",\n      name: \"getStationsStationIdPrintStationPrintStationId_printStationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStationPrintStationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationIdPrintStationPrintStationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStationPrintStationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdPrintStationPrintStationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getStationsStationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Event\",\"value\":\"event\"},{\"name\":\"Event Attendance Types\",\"value\":\"event.attendance_types\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Event\",\"value\":\"location.event\"},{\"name\":\"Location Locations\",\"value\":\"location.locations\"},{\"name\":\"Location Options\",\"value\":\"location.options\"},{\"name\":\"Location Parent\",\"value\":\"location.parent\"},{\"name\":\"Print Station\",\"value\":\"print_station\"},{\"name\":\"Print Station Event\",\"value\":\"print_station.event\"},{\"name\":\"Print Station Location\",\"value\":\"print_station.location\"},{\"name\":\"Print Station Print Station\",\"value\":\"print_station.print_station\"},{\"name\":\"Print Station Theme\",\"value\":\"print_station.theme\"},{\"name\":\"Theme\",\"value\":\"theme\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Station ID\",\n      name: \"getStationsStationIdThemeThemeId_stationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdThemeThemeId\"]}},\n    },\n    {\n      displayName: \"Theme ID\",\n      name: \"getStationsStationIdThemeThemeId_themeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdThemeThemeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Stations\"],\"operation\":[\"getStationsStationIdThemeThemeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getThemes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Theme\"],\"operation\":[\"getThemes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getThemes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Theme\"],\"operation\":[\"getThemes\"],\"getThemes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Theme\"],\"operation\":[\"getThemes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Theme ID\",\n      name: \"getThemesThemeId_themeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Theme\"],\"operation\":[\"getThemesThemeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Theme\"],\"operation\":[\"getThemesThemeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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
      const value = selected.value;
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

export class PlanningCenterCheckIns implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Check-Ins",
    name: "planningCenterCheckIns",
    icon: 'file:check-ins.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Planning Center Check-Ins generated from the Planning Center OpenAPI snapshot.",
    defaults: {
      name: "Planning Center Check-Ins",
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
        throw new Error(`Unsupported Planning Center Check-Ins operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
