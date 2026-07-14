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
    "id": "getCampusesCampusId",
    "resource": "Campus",
    "operation": "Get Campus",
    "description": "GET /campuses/{campus_id}",
    "method": "GET",
    "path": "/groups/v2/campuses/{campus_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
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
    "id": "getCampusesCampusIdGroupsGroupId",
    "resource": "Campus",
    "operation": "Get Group (via Campus)",
    "description": "GET /campuses/{campus_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/campuses/{campus_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampuses",
    "resource": "Campus",
    "operation": "List Campuses",
    "description": "GET /campuses",
    "method": "GET",
    "path": "/groups/v2/campuses",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
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
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusIdGroups",
    "resource": "Campus",
    "operation": "List Groups (via Campus)",
    "description": "GET /campuses/{campus_id}/groups",
    "method": "GET",
    "path": "/groups/v2/campuses/{campus_id}/groups",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchCampusesCampusIdGroupsGroupId",
    "resource": "Campus",
    "operation": "Update Group (via Campus)",
    "description": "PATCH /campuses/{campus_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/campuses/{campus_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "getEventsEventId",
    "resource": "Event",
    "operation": "Get Event",
    "description": "GET /events/{event_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdGroupGroupId",
    "resource": "Event",
    "operation": "Get Group (via Event)",
    "description": "GET /events/{event_id}/group/{group_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocationLocationIdGroupGroupId",
    "resource": "Event",
    "operation": "Get Group (via Location)",
    "description": "GET /events/{event_id}/location/{location_id}/group/{group_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location/{location_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocationLocationId",
    "resource": "Event",
    "operation": "Get Location (via Event)",
    "description": "GET /events/{event_id}/location/{location_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotesNoteId",
    "resource": "Event",
    "operation": "Get Note (via Event)",
    "description": "GET /events/{event_id}/notes/{note_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes/{note_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "noteId",
        "sourceName": "note_id",
        "displayName": "Note Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotesEventNoteIdOwnerOwnerId",
    "resource": "Event",
    "operation": "Get Owner (via Note)",
    "description": "GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes/{event_note_id}/owner/{owner_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventNoteId",
        "sourceName": "event_note_id",
        "displayName": "Event Note Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "ownerId",
        "sourceName": "owner_id",
        "displayName": "Owner Id",
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
    "id": "getEventsEventIdAttendancesAttendanceIdPersonPersonId",
    "resource": "Event",
    "operation": "Get Person (via Attendance)",
    "description": "GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/attendances/{attendance_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceId",
        "sourceName": "attendance_id",
        "displayName": "Attendance Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
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
    "id": "getEventsEventIdAttendances",
    "resource": "Event",
    "operation": "List Attendances (via Event)",
    "description": "GET /events/{event_id}/attendances",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/attendances",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
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
    "path": "/groups/v2/events",
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
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdGroup",
    "resource": "Event",
    "operation": "List Group (via Event)",
    "description": "GET /events/{event_id}/group",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/group",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocationLocationIdGroup",
    "resource": "Event",
    "operation": "List Group (via Location)",
    "description": "GET /events/{event_id}/location/{location_id}/group",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location/{location_id}/group",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocation",
    "resource": "Event",
    "operation": "List Location (via Event)",
    "description": "GET /events/{event_id}/location",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotes",
    "resource": "Event",
    "operation": "List Notes (via Event)",
    "description": "GET /events/{event_id}/notes",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotesEventNoteIdOwner",
    "resource": "Event",
    "operation": "List Owner (via Note)",
    "description": "GET /events/{event_id}/notes/{event_note_id}/owner",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes/{event_note_id}/owner",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventNoteId",
        "sourceName": "event_note_id",
        "displayName": "Event Note Id",
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
    "id": "getEventsEventIdAttendancesAttendanceIdPerson",
    "resource": "Event",
    "operation": "List Person (via Attendance)",
    "description": "GET /events/{event_id}/attendances/{attendance_id}/person",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/attendances/{attendance_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendanceId",
        "sourceName": "attendance_id",
        "displayName": "Attendance Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdRsvps",
    "resource": "Event",
    "operation": "List Rsvps (via Event)",
    "description": "GET /events/{event_id}/rsvps",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/rsvps",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchEventsEventIdGroupGroupId",
    "resource": "Event",
    "operation": "Update Group (via Event)",
    "description": "PATCH /events/{event_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/events/{event_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchEventsEventIdLocationLocationIdGroupGroupId",
    "resource": "Event",
    "operation": "Update Group (via Location)",
    "description": "PATCH /events/{event_id}/location/{location_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/events/{event_id}/location/{location_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "postGroupApplicationsGroupApplicationIdApprove",
    "resource": "Group Application",
    "operation": "Create Approve (via Group Application)",
    "description": "POST /group_applications/{group_application_id}/approve",
    "method": "POST",
    "path": "/groups/v2/group_applications/{group_application_id}/approve",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
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
    "id": "postGroupApplicationsGroupApplicationIdReject",
    "resource": "Group Application",
    "operation": "Create Reject (via Group Application)",
    "description": "POST /group_applications/{group_application_id}/reject",
    "method": "POST",
    "path": "/groups/v2/group_applications/{group_application_id}/reject",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
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
    "id": "getGroupApplicationsGroupApplicationIdGroupGroupId",
    "resource": "Group Application",
    "operation": "Get Group (via Group Application)",
    "description": "GET /group_applications/{group_application_id}/group/{group_id}",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationId",
    "resource": "Group Application",
    "operation": "Get Group Application",
    "description": "GET /group_applications/{group_application_id}",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationIdPersonPersonId",
    "resource": "Group Application",
    "operation": "Get Person (via Group Application)",
    "description": "GET /group_applications/{group_application_id}/person/{person_id}",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
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
    "id": "getGroupApplicationsGroupApplicationIdGroup",
    "resource": "Group Application",
    "operation": "List Group (via Group Application)",
    "description": "GET /group_applications/{group_application_id}/group",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}/group",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplications",
    "resource": "Group Application",
    "operation": "List Group Applications",
    "description": "GET /group_applications",
    "method": "GET",
    "path": "/groups/v2/group_applications",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "whereappliedAt",
        "sourceName": "where[applied_at]",
        "displayName": "Where[applied At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtgt",
        "sourceName": "where[applied_at][gt]",
        "displayName": "Where[applied At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtgte",
        "sourceName": "where[applied_at][gte]",
        "displayName": "Where[applied At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtlt",
        "sourceName": "where[applied_at][lt]",
        "displayName": "Where[applied At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtlte",
        "sourceName": "where[applied_at][lte]",
        "displayName": "Where[applied At][lte]",
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
        "name": "whereappliedAtFilter",
        "displayName": "Applied At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[applied_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[applied_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[applied_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[applied_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[applied_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationIdPerson",
    "resource": "Group Application",
    "operation": "List Person (via Group Application)",
    "description": "GET /group_applications/{group_application_id}/person",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchGroupApplicationsGroupApplicationIdGroupGroupId",
    "resource": "Group Application",
    "operation": "Update Group (via Group Application)",
    "description": "PATCH /group_applications/{group_application_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/group_applications/{group_application_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId",
    "resource": "Group Type",
    "operation": "Get Download (via Resource)",
    "description": "GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources/{resource_id}/download/{download_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "downloadId",
        "sourceName": "download_id",
        "displayName": "Download Id",
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
    "id": "getGroupTypesGroupTypeIdEventsEventId",
    "resource": "Group Type",
    "operation": "Get Event (via Group Type)",
    "description": "GET /group_types/{group_type_id}/events/{event_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdGroupsGroupId",
    "resource": "Group Type",
    "operation": "Get Group (via Group Type)",
    "description": "GET /group_types/{group_type_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeId",
    "resource": "Group Type",
    "operation": "Get Group Type",
    "description": "GET /group_types/{group_type_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
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
    "id": "getGroupTypesGroupTypeIdResourcesResourceId",
    "resource": "Group Type",
    "operation": "Get Resource (via Group Type)",
    "description": "GET /group_types/{group_type_id}/resources/{resource_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources/{resource_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource Id",
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
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId",
    "resource": "Group Type",
    "operation": "Get Visit (via Resource)",
    "description": "GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "visitId",
        "sourceName": "visit_id",
        "displayName": "Visit Id",
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
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdDownload",
    "resource": "Group Type",
    "operation": "List Download (via Resource)",
    "description": "GET /group_types/{group_type_id}/resources/{resource_id}/download",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources/{resource_id}/download",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdEvents",
    "resource": "Group Type",
    "operation": "List Events (via Group Type)",
    "description": "GET /group_types/{group_type_id}/events",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/events",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
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
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypes",
    "resource": "Group Type",
    "operation": "List Group Types",
    "description": "GET /group_types",
    "method": "GET",
    "path": "/groups/v2/group_types",
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
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdGroups",
    "resource": "Group Type",
    "operation": "List Groups (via Group Type)",
    "description": "GET /group_types/{group_type_id}/groups",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/groups",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResources",
    "resource": "Group Type",
    "operation": "List Resources (via Group Type)",
    "description": "GET /group_types/{group_type_id}/resources",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdVisit",
    "resource": "Group Type",
    "operation": "List Visit (via Resource)",
    "description": "GET /group_types/{group_type_id}/resources/{resource_id}/visit",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources/{resource_id}/visit",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchGroupTypesGroupTypeIdGroupsGroupId",
    "resource": "Group Type",
    "operation": "Update Group (via Group Type)",
    "description": "PATCH /group_types/{group_type_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/group_types/{group_type_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "postGroupsGroupIdAssignCampuses",
    "resource": "Group",
    "operation": "Create Assign Campus (via Group)",
    "description": "POST /groups/{group_id}/assign_campuses",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/assign_campuses",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
    "id": "postGroupsGroupIdDisableChat",
    "resource": "Group",
    "operation": "Create Disable Chat (via Group)",
    "description": "POST /groups/{group_id}/disable_chat",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/disable_chat",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
    "id": "postGroupsGroupIdDuplicate",
    "resource": "Group",
    "operation": "Create Duplicate (via Group)",
    "description": "POST /groups/{group_id}/duplicate",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/duplicate",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
    "id": "postGroupsGroupIdEnableChat",
    "resource": "Group",
    "operation": "Create Enable Chat (via Group)",
    "description": "POST /groups/{group_id}/enable_chat",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/enable_chat",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
    "id": "postGroupsGroupIdMemberships",
    "resource": "Group",
    "operation": "Create Membership (via Group)",
    "description": "POST /groups/{group_id}/memberships",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/memberships",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "joinedAt",
        "sourceName": "joined_at",
        "displayName": "Joined At",
        "required": false,
        "type": "string"
      },
      {
        "name": "role",
        "sourceName": "role",
        "displayName": "Role",
        "required": false,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      }
    ]
  },
  {
    "id": "deleteGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "operation": "Delete Membership (via Group)",
    "description": "DELETE /groups/{group_id}/memberships/{membership_id}",
    "method": "DELETE",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
    "id": "deleteGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "Delete My Membership (via Group)",
    "description": "DELETE /groups/{group_id}/my_membership/{my_membership_id}",
    "method": "DELETE",
    "path": "/groups/v2/groups/{group_id}/my_membership/{my_membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "myMembershipId",
        "sourceName": "my_membership_id",
        "displayName": "My Membership Id",
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
    "id": "getGroupsGroupIdApplicationsApplicationId",
    "resource": "Group",
    "operation": "Get Application (via Group)",
    "description": "GET /groups/{group_id}/applications/{application_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/applications/{application_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "applicationId",
        "sourceName": "application_id",
        "displayName": "Application Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdCampusesCampusId",
    "resource": "Group",
    "operation": "Get Campus (via Group)",
    "description": "GET /groups/{group_id}/campuses/{campus_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/campuses/{campus_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
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
    "id": "getGroupsGroupIdEventsEventId",
    "resource": "Group",
    "operation": "Get Event (via Group)",
    "description": "GET /groups/{group_id}/events/{event_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipIdGroupGroupId",
    "resource": "Group",
    "operation": "Get Group (via Membership)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdTagsTagIdGroupsGroupId",
    "resource": "Group",
    "operation": "Get Group (via Tag)",
    "description": "GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdGroupTypeGroupTypeId",
    "resource": "Group",
    "operation": "Get Group Type (via Group)",
    "description": "GET /groups/{group_id}/group_type/{group_type_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/group_type/{group_type_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
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
    "id": "getGroupsGroupId",
    "resource": "Group",
    "operation": "Get Group",
    "description": "GET /groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdLocationLocationId",
    "resource": "Group",
    "operation": "Get Location (via Group)",
    "description": "GET /groups/{group_id}/location/{location_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "operation": "Get Membership (via Group)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "Get My Membership (via Group)",
    "description": "GET /groups/{group_id}/my_membership/{my_membership_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/my_membership/{my_membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "myMembershipId",
        "sourceName": "my_membership_id",
        "displayName": "My Membership Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdPeoplePersonId",
    "resource": "Group",
    "operation": "Get Person (via Group)",
    "description": "GET /groups/{group_id}/people/{person_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
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
    "id": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId",
    "resource": "Group",
    "operation": "Get Person (via Membership)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
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
    "id": "getGroupsGroupIdResourcesResourceId",
    "resource": "Group",
    "operation": "Get Resource (via Group)",
    "description": "GET /groups/{group_id}/resources/{resource_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/resources/{resource_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource Id",
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
    "id": "getGroupsGroupIdTagsTagId",
    "resource": "Group",
    "operation": "Get Tag (via Group)",
    "description": "GET /groups/{group_id}/tags/{tag_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/tags/{tag_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag Id",
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
    "id": "getGroupsGroupIdApplications",
    "resource": "Group",
    "operation": "List Applications (via Group)",
    "description": "GET /groups/{group_id}/applications",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/applications",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "whereappliedAt",
        "sourceName": "where[applied_at]",
        "displayName": "Where[applied At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtgt",
        "sourceName": "where[applied_at][gt]",
        "displayName": "Where[applied At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtgte",
        "sourceName": "where[applied_at][gte]",
        "displayName": "Where[applied At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtlt",
        "sourceName": "where[applied_at][lt]",
        "displayName": "Where[applied At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereappliedAtlte",
        "sourceName": "where[applied_at][lte]",
        "displayName": "Where[applied At][lte]",
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
        "name": "whereappliedAtFilter",
        "displayName": "Applied At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[applied_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[applied_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[applied_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[applied_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[applied_at][lte]"
          }
        ]
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdCampuses",
    "resource": "Group",
    "operation": "List Campuses (via Group)",
    "description": "GET /groups/{group_id}/campuses",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/campuses",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdEnrollment",
    "resource": "Group",
    "operation": "List Enrollment (via Group)",
    "description": "GET /groups/{group_id}/enrollment",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/enrollment",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
    "id": "getGroupsGroupIdEvents",
    "resource": "Group",
    "operation": "List Events (via Group)",
    "description": "GET /groups/{group_id}/events",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/events",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipIdGroup",
    "resource": "Group",
    "operation": "List Group (via Membership)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}/group",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/group",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdGroupType",
    "resource": "Group",
    "operation": "List Group Type (via Group)",
    "description": "GET /groups/{group_id}/group_type",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/group_type",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdTagsTagIdGroups",
    "resource": "Group",
    "operation": "List Groups (via Tag)",
    "description": "GET /groups/{group_id}/tags/{tag_id}/groups",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/tags/{tag_id}/groups",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroups",
    "resource": "Group",
    "operation": "List Groups",
    "description": "GET /groups",
    "method": "GET",
    "path": "/groups/v2/groups",
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
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdLocation",
    "resource": "Group",
    "operation": "List Location (via Group)",
    "description": "GET /groups/{group_id}/location",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/location",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMemberships",
    "resource": "Group",
    "operation": "List Memberships (via Group)",
    "description": "GET /groups/{group_id}/memberships",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMyMembership",
    "resource": "Group",
    "operation": "List My Membership (via Group)",
    "description": "GET /groups/{group_id}/my_membership",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/my_membership",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdPeople",
    "resource": "Group",
    "operation": "List People (via Group)",
    "description": "GET /groups/{group_id}/people",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/people",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipIdPerson",
    "resource": "Group",
    "operation": "List Person (via Membership)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}/person",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdResources",
    "resource": "Group",
    "operation": "List Resources (via Group)",
    "description": "GET /groups/{group_id}/resources",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/resources",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdTags",
    "resource": "Group",
    "operation": "List Tags (via Group)",
    "description": "GET /groups/{group_id}/tags",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/tags",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId",
    "resource": "Group",
    "operation": "Update Group (via Membership)",
    "description": "PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchGroupsGroupIdTagsTagIdGroupsGroupId",
    "resource": "Group",
    "operation": "Update Group (via Tag)",
    "description": "PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchGroupsGroupId",
    "resource": "Group",
    "operation": "Update Group",
    "description": "PATCH /groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "operation": "Update Membership (via Group)",
    "description": "PATCH /groups/{group_id}/memberships/{membership_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "joinedAt",
        "sourceName": "joined_at",
        "displayName": "Joined At",
        "required": false,
        "type": "string"
      },
      {
        "name": "role",
        "sourceName": "role",
        "displayName": "Role",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "Update My Membership (via Group)",
    "description": "PATCH /groups/{group_id}/my_membership/{my_membership_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/my_membership/{my_membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "myMembershipId",
        "sourceName": "my_membership_id",
        "displayName": "My Membership Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "joinedAt",
        "sourceName": "joined_at",
        "displayName": "Joined At",
        "required": false,
        "type": "string"
      },
      {
        "name": "role",
        "sourceName": "role",
        "displayName": "Role",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdMembershipsMembershipId",
    "resource": "Person",
    "operation": "Delete Membership (via Person)",
    "description": "DELETE /people/{person_id}/memberships/{membership_id}",
    "method": "DELETE",
    "path": "/groups/v2/people/{person_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
    "id": "getPeoplePersonIdEventsEventId",
    "resource": "Person",
    "operation": "Get Event (via Person)",
    "description": "GET /people/{person_id}/events/{event_id}",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdGroupsGroupId",
    "resource": "Person",
    "operation": "Get Group (via Person)",
    "description": "GET /people/{person_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdMembershipsMembershipId",
    "resource": "Person",
    "operation": "Get Membership (via Person)",
    "description": "GET /people/{person_id}/memberships/{membership_id}",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
    "path": "/groups/v2/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
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
    "id": "getPeoplePersonIdEvents",
    "resource": "Person",
    "operation": "List Events (via Person)",
    "description": "GET /people/{person_id}/events",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/events",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
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
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdGroups",
    "resource": "Person",
    "operation": "List Groups (via Person)",
    "description": "GET /people/{person_id}/groups",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/groups",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheregroupTypeid",
        "sourceName": "where[group_type][id]",
        "displayName": "Where[group Type][id]",
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
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
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
    "operation": "List Me",
    "description": "GET /me",
    "method": "GET",
    "path": "/groups/v2/me",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdMemberships",
    "resource": "Person",
    "operation": "List Memberships (via Person)",
    "description": "GET /people/{person_id}/memberships",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/memberships",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
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
    "path": "/groups/v2/people",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonIdGroupsGroupId",
    "resource": "Person",
    "operation": "Update Group (via Person)",
    "description": "PATCH /people/{person_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/people/{person_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "publicEnrollment",
        "sourceName": "public_enrollment",
        "displayName": "Public Enrollment",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyDisplayMeetingSchedule",
        "sourceName": "publicly_display_meeting_schedule",
        "displayName": "Publicly Display Meeting Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "publiclyVisible",
        "sourceName": "publicly_visible",
        "displayName": "Publicly Visible",
        "required": false,
        "type": "string"
      },
      {
        "name": "schedule",
        "sourceName": "schedule",
        "displayName": "Schedule",
        "required": false,
        "type": "string"
      },
      {
        "name": "tagIds",
        "sourceName": "tag_ids",
        "displayName": "Tag Ids",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": [
      {
        "name": "groupTypeIds",
        "displayName": "Group Type ID",
        "relationshipName": "group_type",
        "relationshipType": "GroupType",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchPeoplePersonIdMembershipsMembershipId",
    "resource": "Person",
    "operation": "Update Membership (via Person)",
    "description": "PATCH /people/{person_id}/memberships/{membership_id}",
    "method": "PATCH",
    "path": "/groups/v2/people/{person_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership Id",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "joinedAt",
        "sourceName": "joined_at",
        "displayName": "Joined At",
        "required": false,
        "type": "string"
      },
      {
        "name": "role",
        "sourceName": "role",
        "displayName": "Role",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "getTagGroupsTagGroupIdTagsTagId",
    "resource": "Tag Group",
    "operation": "Get Tag (via Tag Group)",
    "description": "GET /tag_groups/{tag_group_id}/tags/{tag_id}",
    "method": "GET",
    "path": "/groups/v2/tag_groups/{tag_group_id}/tags/{tag_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "tagGroupId",
        "sourceName": "tag_group_id",
        "displayName": "Tag Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag Id",
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
    "id": "getTagGroupsTagGroupId",
    "resource": "Tag Group",
    "operation": "Get Tag Group",
    "description": "GET /tag_groups/{tag_group_id}",
    "method": "GET",
    "path": "/groups/v2/tag_groups/{tag_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "tagGroupId",
        "sourceName": "tag_group_id",
        "displayName": "Tag Group Id",
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
    "id": "getTagGroups",
    "resource": "Tag Group",
    "operation": "List Tag Groups",
    "description": "GET /tag_groups",
    "method": "GET",
    "path": "/groups/v2/tag_groups",
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
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getTagGroupsTagGroupIdTags",
    "resource": "Tag Group",
    "operation": "List Tags (via Tag Group)",
    "description": "GET /tag_groups/{tag_group_id}/tags",
    "method": "GET",
    "path": "/groups/v2/tag_groups/{tag_group_id}/tags",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "tagGroupId",
        "sourceName": "tag_group_id",
        "displayName": "Tag Group Id",
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
      }
    ],
    "queryOptions": [
      {
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  }
];

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Campus\",\"value\":\"Campus\"},{\"name\":\"Event\",\"value\":\"Event\"},{\"name\":\"Group\",\"value\":\"Group\"},{\"name\":\"Group Application\",\"value\":\"Group Application\"},{\"name\":\"Group Type\",\"value\":\"Group Type\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Tag Group\",\"value\":\"Tag Group\"}],\n      default: \"Campus\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"]}},\n      options: [{\"name\":\"Get Campus\",\"value\":\"getCampusesCampusId\",\"description\":\"GET /campuses/{campus_id}\",\"action\":\"Get Campus\"},{\"name\":\"Get Group (via Campus)\",\"value\":\"getCampusesCampusIdGroupsGroupId\",\"description\":\"GET /campuses/{campus_id}/groups/{group_id}\",\"action\":\"Get Group (via Campus)\"},{\"name\":\"List Campuses\",\"value\":\"getCampuses\",\"description\":\"GET /campuses\",\"action\":\"List Campuses\"},{\"name\":\"List Groups (via Campus)\",\"value\":\"getCampusesCampusIdGroups\",\"description\":\"GET /campuses/{campus_id}/groups\",\"action\":\"List Groups (via Campus)\"},{\"name\":\"Update Group (via Campus)\",\"value\":\"patchCampusesCampusIdGroupsGroupId\",\"description\":\"PATCH /campuses/{campus_id}/groups/{group_id}\",\"action\":\"Update Group (via Campus)\"}],\n      default: \"getCampusesCampusId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"]}},\n      options: [{\"name\":\"Get Event\",\"value\":\"getEventsEventId\",\"description\":\"GET /events/{event_id}\",\"action\":\"Get Event\"},{\"name\":\"Get Group (via Event)\",\"value\":\"getEventsEventIdGroupGroupId\",\"description\":\"GET /events/{event_id}/group/{group_id}\",\"action\":\"Get Group (via Event)\"},{\"name\":\"Get Group (via Location)\",\"value\":\"getEventsEventIdLocationLocationIdGroupGroupId\",\"description\":\"GET /events/{event_id}/location/{location_id}/group/{group_id}\",\"action\":\"Get Group (via Location)\"},{\"name\":\"Get Location (via Event)\",\"value\":\"getEventsEventIdLocationLocationId\",\"description\":\"GET /events/{event_id}/location/{location_id}\",\"action\":\"Get Location (via Event)\"},{\"name\":\"Get Note (via Event)\",\"value\":\"getEventsEventIdNotesNoteId\",\"description\":\"GET /events/{event_id}/notes/{note_id}\",\"action\":\"Get Note (via Event)\"},{\"name\":\"Get Owner (via Note)\",\"value\":\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\",\"description\":\"GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}\",\"action\":\"Get Owner (via Note)\"},{\"name\":\"Get Person (via Attendance)\",\"value\":\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\",\"description\":\"GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}\",\"action\":\"Get Person (via Attendance)\"},{\"name\":\"List Attendances (via Event)\",\"value\":\"getEventsEventIdAttendances\",\"description\":\"GET /events/{event_id}/attendances\",\"action\":\"List Attendances (via Event)\"},{\"name\":\"List Events\",\"value\":\"getEvents\",\"description\":\"GET /events\",\"action\":\"List Events\"},{\"name\":\"List Group (via Event)\",\"value\":\"getEventsEventIdGroup\",\"description\":\"GET /events/{event_id}/group\",\"action\":\"List Group (via Event)\"},{\"name\":\"List Group (via Location)\",\"value\":\"getEventsEventIdLocationLocationIdGroup\",\"description\":\"GET /events/{event_id}/location/{location_id}/group\",\"action\":\"List Group (via Location)\"},{\"name\":\"List Location (via Event)\",\"value\":\"getEventsEventIdLocation\",\"description\":\"GET /events/{event_id}/location\",\"action\":\"List Location (via Event)\"},{\"name\":\"List Notes (via Event)\",\"value\":\"getEventsEventIdNotes\",\"description\":\"GET /events/{event_id}/notes\",\"action\":\"List Notes (via Event)\"},{\"name\":\"List Owner (via Note)\",\"value\":\"getEventsEventIdNotesEventNoteIdOwner\",\"description\":\"GET /events/{event_id}/notes/{event_note_id}/owner\",\"action\":\"List Owner (via Note)\"},{\"name\":\"List Person (via Attendance)\",\"value\":\"getEventsEventIdAttendancesAttendanceIdPerson\",\"description\":\"GET /events/{event_id}/attendances/{attendance_id}/person\",\"action\":\"List Person (via Attendance)\"},{\"name\":\"List Rsvps (via Event)\",\"value\":\"getEventsEventIdRsvps\",\"description\":\"GET /events/{event_id}/rsvps\",\"action\":\"List Rsvps (via Event)\"},{\"name\":\"Update Group (via Event)\",\"value\":\"patchEventsEventIdGroupGroupId\",\"description\":\"PATCH /events/{event_id}/group/{group_id}\",\"action\":\"Update Group (via Event)\"},{\"name\":\"Update Group (via Location)\",\"value\":\"patchEventsEventIdLocationLocationIdGroupGroupId\",\"description\":\"PATCH /events/{event_id}/location/{location_id}/group/{group_id}\",\"action\":\"Update Group (via Location)\"}],\n      default: \"getEventsEventId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"]}},\n      options: [{\"name\":\"Create Assign Campus (via Group)\",\"value\":\"postGroupsGroupIdAssignCampuses\",\"description\":\"POST /groups/{group_id}/assign_campuses\",\"action\":\"Create Assign Campus (via Group)\"},{\"name\":\"Create Disable Chat (via Group)\",\"value\":\"postGroupsGroupIdDisableChat\",\"description\":\"POST /groups/{group_id}/disable_chat\",\"action\":\"Create Disable Chat (via Group)\"},{\"name\":\"Create Duplicate (via Group)\",\"value\":\"postGroupsGroupIdDuplicate\",\"description\":\"POST /groups/{group_id}/duplicate\",\"action\":\"Create Duplicate (via Group)\"},{\"name\":\"Create Enable Chat (via Group)\",\"value\":\"postGroupsGroupIdEnableChat\",\"description\":\"POST /groups/{group_id}/enable_chat\",\"action\":\"Create Enable Chat (via Group)\"},{\"name\":\"Create Membership (via Group)\",\"value\":\"postGroupsGroupIdMemberships\",\"description\":\"POST /groups/{group_id}/memberships\",\"action\":\"Create Membership (via Group)\"},{\"name\":\"Delete Membership (via Group)\",\"value\":\"deleteGroupsGroupIdMembershipsMembershipId\",\"description\":\"DELETE /groups/{group_id}/memberships/{membership_id}\",\"action\":\"Delete Membership (via Group)\"},{\"name\":\"Delete My Membership (via Group)\",\"value\":\"deleteGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"DELETE /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"Delete My Membership (via Group)\"},{\"name\":\"Get Application (via Group)\",\"value\":\"getGroupsGroupIdApplicationsApplicationId\",\"description\":\"GET /groups/{group_id}/applications/{application_id}\",\"action\":\"Get Application (via Group)\"},{\"name\":\"Get Campus (via Group)\",\"value\":\"getGroupsGroupIdCampusesCampusId\",\"description\":\"GET /groups/{group_id}/campuses/{campus_id}\",\"action\":\"Get Campus (via Group)\"},{\"name\":\"Get Event (via Group)\",\"value\":\"getGroupsGroupIdEventsEventId\",\"description\":\"GET /groups/{group_id}/events/{event_id}\",\"action\":\"Get Event (via Group)\"},{\"name\":\"Get Group (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"action\":\"Get Group (via Membership)\"},{\"name\":\"Get Group (via Tag)\",\"value\":\"getGroupsGroupIdTagsTagIdGroupsGroupId\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"action\":\"Get Group (via Tag)\"},{\"name\":\"Get Group Type (via Group)\",\"value\":\"getGroupsGroupIdGroupTypeGroupTypeId\",\"description\":\"GET /groups/{group_id}/group_type/{group_type_id}\",\"action\":\"Get Group Type (via Group)\"},{\"name\":\"Get Group\",\"value\":\"getGroupsGroupId\",\"description\":\"GET /groups/{group_id}\",\"action\":\"Get Group\"},{\"name\":\"Get Location (via Group)\",\"value\":\"getGroupsGroupIdLocationLocationId\",\"description\":\"GET /groups/{group_id}/location/{location_id}\",\"action\":\"Get Location (via Group)\"},{\"name\":\"Get Membership (via Group)\",\"value\":\"getGroupsGroupIdMembershipsMembershipId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}\",\"action\":\"Get Membership (via Group)\"},{\"name\":\"Get My Membership (via Group)\",\"value\":\"getGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"GET /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"Get My Membership (via Group)\"},{\"name\":\"Get Person (via Group)\",\"value\":\"getGroupsGroupIdPeoplePersonId\",\"description\":\"GET /groups/{group_id}/people/{person_id}\",\"action\":\"Get Person (via Group)\"},{\"name\":\"Get Person (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}\",\"action\":\"Get Person (via Membership)\"},{\"name\":\"Get Resource (via Group)\",\"value\":\"getGroupsGroupIdResourcesResourceId\",\"description\":\"GET /groups/{group_id}/resources/{resource_id}\",\"action\":\"Get Resource (via Group)\"},{\"name\":\"Get Tag (via Group)\",\"value\":\"getGroupsGroupIdTagsTagId\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}\",\"action\":\"Get Tag (via Group)\"},{\"name\":\"List Applications (via Group)\",\"value\":\"getGroupsGroupIdApplications\",\"description\":\"GET /groups/{group_id}/applications\",\"action\":\"List Applications (via Group)\"},{\"name\":\"List Campuses (via Group)\",\"value\":\"getGroupsGroupIdCampuses\",\"description\":\"GET /groups/{group_id}/campuses\",\"action\":\"List Campuses (via Group)\"},{\"name\":\"List Enrollment (via Group)\",\"value\":\"getGroupsGroupIdEnrollment\",\"description\":\"GET /groups/{group_id}/enrollment\",\"action\":\"List Enrollment (via Group)\"},{\"name\":\"List Events (via Group)\",\"value\":\"getGroupsGroupIdEvents\",\"description\":\"GET /groups/{group_id}/events\",\"action\":\"List Events (via Group)\"},{\"name\":\"List Group (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdGroup\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/group\",\"action\":\"List Group (via Membership)\"},{\"name\":\"List Group Type (via Group)\",\"value\":\"getGroupsGroupIdGroupType\",\"description\":\"GET /groups/{group_id}/group_type\",\"action\":\"List Group Type (via Group)\"},{\"name\":\"List Groups (via Tag)\",\"value\":\"getGroupsGroupIdTagsTagIdGroups\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}/groups\",\"action\":\"List Groups (via Tag)\"},{\"name\":\"List Groups\",\"value\":\"getGroups\",\"description\":\"GET /groups\",\"action\":\"List Groups\"},{\"name\":\"List Location (via Group)\",\"value\":\"getGroupsGroupIdLocation\",\"description\":\"GET /groups/{group_id}/location\",\"action\":\"List Location (via Group)\"},{\"name\":\"List Memberships (via Group)\",\"value\":\"getGroupsGroupIdMemberships\",\"description\":\"GET /groups/{group_id}/memberships\",\"action\":\"List Memberships (via Group)\"},{\"name\":\"List My Membership (via Group)\",\"value\":\"getGroupsGroupIdMyMembership\",\"description\":\"GET /groups/{group_id}/my_membership\",\"action\":\"List My Membership (via Group)\"},{\"name\":\"List People (via Group)\",\"value\":\"getGroupsGroupIdPeople\",\"description\":\"GET /groups/{group_id}/people\",\"action\":\"List People (via Group)\"},{\"name\":\"List Person (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdPerson\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/person\",\"action\":\"List Person (via Membership)\"},{\"name\":\"List Resources (via Group)\",\"value\":\"getGroupsGroupIdResources\",\"description\":\"GET /groups/{group_id}/resources\",\"action\":\"List Resources (via Group)\"},{\"name\":\"List Tags (via Group)\",\"value\":\"getGroupsGroupIdTags\",\"description\":\"GET /groups/{group_id}/tags\",\"action\":\"List Tags (via Group)\"},{\"name\":\"Update Group (via Membership)\",\"value\":\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\",\"description\":\"PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"action\":\"Update Group (via Membership)\"},{\"name\":\"Update Group (via Tag)\",\"value\":\"patchGroupsGroupIdTagsTagIdGroupsGroupId\",\"description\":\"PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"action\":\"Update Group (via Tag)\"},{\"name\":\"Update Group\",\"value\":\"patchGroupsGroupId\",\"description\":\"PATCH /groups/{group_id}\",\"action\":\"Update Group\"},{\"name\":\"Update Membership (via Group)\",\"value\":\"patchGroupsGroupIdMembershipsMembershipId\",\"description\":\"PATCH /groups/{group_id}/memberships/{membership_id}\",\"action\":\"Update Membership (via Group)\"},{\"name\":\"Update My Membership (via Group)\",\"value\":\"patchGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"PATCH /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"Update My Membership (via Group)\"}],\n      default: \"postGroupsGroupIdAssignCampuses\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"]}},\n      options: [{\"name\":\"Create Approve (via Group Application)\",\"value\":\"postGroupApplicationsGroupApplicationIdApprove\",\"description\":\"POST /group_applications/{group_application_id}/approve\",\"action\":\"Create Approve (via Group Application)\"},{\"name\":\"Create Reject (via Group Application)\",\"value\":\"postGroupApplicationsGroupApplicationIdReject\",\"description\":\"POST /group_applications/{group_application_id}/reject\",\"action\":\"Create Reject (via Group Application)\"},{\"name\":\"Get Group (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdGroupGroupId\",\"description\":\"GET /group_applications/{group_application_id}/group/{group_id}\",\"action\":\"Get Group (via Group Application)\"},{\"name\":\"Get Group Application\",\"value\":\"getGroupApplicationsGroupApplicationId\",\"description\":\"GET /group_applications/{group_application_id}\",\"action\":\"Get Group Application\"},{\"name\":\"Get Person (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdPersonPersonId\",\"description\":\"GET /group_applications/{group_application_id}/person/{person_id}\",\"action\":\"Get Person (via Group Application)\"},{\"name\":\"List Group (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdGroup\",\"description\":\"GET /group_applications/{group_application_id}/group\",\"action\":\"List Group (via Group Application)\"},{\"name\":\"List Group Applications\",\"value\":\"getGroupApplications\",\"description\":\"GET /group_applications\",\"action\":\"List Group Applications\"},{\"name\":\"List Person (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdPerson\",\"description\":\"GET /group_applications/{group_application_id}/person\",\"action\":\"List Person (via Group Application)\"},{\"name\":\"Update Group (via Group Application)\",\"value\":\"patchGroupApplicationsGroupApplicationIdGroupGroupId\",\"description\":\"PATCH /group_applications/{group_application_id}/group/{group_id}\",\"action\":\"Update Group (via Group Application)\"}],\n      default: \"postGroupApplicationsGroupApplicationIdApprove\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"]}},\n      options: [{\"name\":\"Get Download (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}\",\"action\":\"Get Download (via Resource)\"},{\"name\":\"Get Event (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdEventsEventId\",\"description\":\"GET /group_types/{group_type_id}/events/{event_id}\",\"action\":\"Get Event (via Group Type)\"},{\"name\":\"Get Group (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdGroupsGroupId\",\"description\":\"GET /group_types/{group_type_id}/groups/{group_id}\",\"action\":\"Get Group (via Group Type)\"},{\"name\":\"Get Group Type\",\"value\":\"getGroupTypesGroupTypeId\",\"description\":\"GET /group_types/{group_type_id}\",\"action\":\"Get Group Type\"},{\"name\":\"Get Resource (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}\",\"action\":\"Get Resource (via Group Type)\"},{\"name\":\"Get Visit (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}\",\"action\":\"Get Visit (via Resource)\"},{\"name\":\"List Download (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download\",\"action\":\"List Download (via Resource)\"},{\"name\":\"List Events (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdEvents\",\"description\":\"GET /group_types/{group_type_id}/events\",\"action\":\"List Events (via Group Type)\"},{\"name\":\"List Group Types\",\"value\":\"getGroupTypes\",\"description\":\"GET /group_types\",\"action\":\"List Group Types\"},{\"name\":\"List Groups (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdGroups\",\"description\":\"GET /group_types/{group_type_id}/groups\",\"action\":\"List Groups (via Group Type)\"},{\"name\":\"List Resources (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdResources\",\"description\":\"GET /group_types/{group_type_id}/resources\",\"action\":\"List Resources (via Group Type)\"},{\"name\":\"List Visit (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit\",\"action\":\"List Visit (via Resource)\"},{\"name\":\"Update Group (via Group Type)\",\"value\":\"patchGroupTypesGroupTypeIdGroupsGroupId\",\"description\":\"PATCH /group_types/{group_type_id}/groups/{group_id}\",\"action\":\"Update Group (via Group Type)\"}],\n      default: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"Delete Membership (via Person)\",\"value\":\"deletePeoplePersonIdMembershipsMembershipId\",\"description\":\"DELETE /people/{person_id}/memberships/{membership_id}\",\"action\":\"Delete Membership (via Person)\"},{\"name\":\"Get Event (via Person)\",\"value\":\"getPeoplePersonIdEventsEventId\",\"description\":\"GET /people/{person_id}/events/{event_id}\",\"action\":\"Get Event (via Person)\"},{\"name\":\"Get Group (via Person)\",\"value\":\"getPeoplePersonIdGroupsGroupId\",\"description\":\"GET /people/{person_id}/groups/{group_id}\",\"action\":\"Get Group (via Person)\"},{\"name\":\"Get Membership (via Person)\",\"value\":\"getPeoplePersonIdMembershipsMembershipId\",\"description\":\"GET /people/{person_id}/memberships/{membership_id}\",\"action\":\"Get Membership (via Person)\"},{\"name\":\"Get Person\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"Get Person\"},{\"name\":\"List Events (via Person)\",\"value\":\"getPeoplePersonIdEvents\",\"description\":\"GET /people/{person_id}/events\",\"action\":\"List Events (via Person)\"},{\"name\":\"List Groups (via Person)\",\"value\":\"getPeoplePersonIdGroups\",\"description\":\"GET /people/{person_id}/groups\",\"action\":\"List Groups (via Person)\"},{\"name\":\"List Me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"List Me\"},{\"name\":\"List Memberships (via Person)\",\"value\":\"getPeoplePersonIdMemberships\",\"description\":\"GET /people/{person_id}/memberships\",\"action\":\"List Memberships (via Person)\"},{\"name\":\"List People\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"List People\"},{\"name\":\"Update Group (via Person)\",\"value\":\"patchPeoplePersonIdGroupsGroupId\",\"description\":\"PATCH /people/{person_id}/groups/{group_id}\",\"action\":\"Update Group (via Person)\"},{\"name\":\"Update Membership (via Person)\",\"value\":\"patchPeoplePersonIdMembershipsMembershipId\",\"description\":\"PATCH /people/{person_id}/memberships/{membership_id}\",\"action\":\"Update Membership (via Person)\"}],\n      default: \"deletePeoplePersonIdMembershipsMembershipId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"]}},\n      options: [{\"name\":\"Get Tag (via Tag Group)\",\"value\":\"getTagGroupsTagGroupIdTagsTagId\",\"description\":\"GET /tag_groups/{tag_group_id}/tags/{tag_id}\",\"action\":\"Get Tag (via Tag Group)\"},{\"name\":\"Get Tag Group\",\"value\":\"getTagGroupsTagGroupId\",\"description\":\"GET /tag_groups/{tag_group_id}\",\"action\":\"Get Tag Group\"},{\"name\":\"List Tag Groups\",\"value\":\"getTagGroups\",\"description\":\"GET /tag_groups\",\"action\":\"List Tag Groups\"},{\"name\":\"List Tags (via Tag Group)\",\"value\":\"getTagGroupsTagGroupIdTags\",\"description\":\"GET /tag_groups/{tag_group_id}/tags\",\"action\":\"List Tags (via Tag Group)\"}],\n      default: \"getTagGroupsTagGroupIdTagsTagId\",\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdGroupsGroupId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getCampusesCampusIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getCampusesCampusIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getCampuses_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"],\"getCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdGroups_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getCampusesCampusIdGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampusesCampusIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampusesCampusIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"],\"getCampusesCampusIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchCampusesCampusIdGroupsGroupId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchCampusesCampusIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchCampusesCampusIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchCampusesCampusIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchCampusesCampusIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getEventsEventIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocationLocationId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getEventsEventIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdLocationLocationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotesNoteId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n    },\n    {\n      displayName: \"Note Id\",\n      name: \"getEventsEventIdNotesNoteId_noteId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdNotesNoteId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Event Note Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventNoteId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Attendance Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_attendanceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdAttendances_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdAttendances_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Attended\",\"value\":\"attended\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"},{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendances_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendances_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"],\"getEventsEventIdAttendances_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getEvents_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Canceled\",\"value\":\"canceled\"},{\"name\":\"Not Canceled\",\"value\":\"not_canceled\"},{\"name\":\"Upcoming\",\"value\":\"upcoming\"},{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"My Groups\",\"value\":\"my_groups\"},{\"name\":\"Campus\",\"value\":\"campus\"}],\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"],\"getEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdGroup_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdGroup_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"],\"getEventsEventIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocationLocationIdGroup_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getEventsEventIdLocationLocationIdGroup_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdLocationLocationIdGroup_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdLocationLocationIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdLocationLocationIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"],\"getEventsEventIdLocationLocationIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocation_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdLocation_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"],\"getEventsEventIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotes_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdNotes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdNotes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdNotes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"],\"getEventsEventIdNotes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwner_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: \"Event Note Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwner_eventNoteId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdNotesEventNoteIdOwner_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdNotesEventNoteIdOwner_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"],\"getEventsEventIdNotesEventNoteIdOwner_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: \"Attendance Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_attendanceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"],\"getEventsEventIdAttendancesAttendanceIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdRsvps_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEventsEventIdRsvps_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Response Ascending\",\"value\":\"response\"},{\"name\":\"Response Descending\",\"value\":\"-response\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdRsvps_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdRsvps_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"],\"getEventsEventIdRsvps_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"patchEventsEventIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchEventsEventIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchEventsEventIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchEventsEventIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchEventsEventIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchEventsEventIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchEventsEventIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchEventsEventIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchEventsEventIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchEventsEventIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchEventsEventIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"postGroupApplicationsGroupApplicationIdApprove_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"postGroupApplicationsGroupApplicationIdReject_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupApplicationsGroupApplicationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdPersonPersonId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getGroupApplicationsGroupApplicationIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupApplicationsGroupApplicationIdGroup_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplicationsGroupApplicationIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplicationsGroupApplicationIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"],\"getGroupApplicationsGroupApplicationIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupApplications_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n      options: [{\"displayName\":\"Applied At\",\"name\":\"whereappliedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Applied At Ascending\",\"value\":\"applied_at\"},{\"name\":\"Applied At Descending\",\"value\":\"-applied_at\"},{\"name\":\"Status Ascending\",\"value\":\"status\"},{\"name\":\"Status Descending\",\"value\":\"-status\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"],\"getGroupApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdPerson_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupApplicationsGroupApplicationIdPerson_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplicationsGroupApplicationIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplicationsGroupApplicationIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"],\"getGroupApplicationsGroupApplicationIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: \"Download Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_downloadId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypesGroupTypeIdEventsEventId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: \"Visit Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_visitId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"],\"getGroupTypesGroupTypeIdResourcesResourceIdDownload_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdEvents_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypesGroupTypeIdEvents_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Upcoming\",\"value\":\"upcoming\"},{\"name\":\"Canceled\",\"value\":\"canceled\"},{\"name\":\"Not Canceled\",\"value\":\"not_canceled\"}],\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"],\"getGroupTypesGroupTypeIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Church Center Visible\",\"value\":\"church_center_visible\"},{\"name\":\"Not Church Center Visible\",\"value\":\"not_church_center_visible\"}],\"default\":\"\"}]},{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"],\"getGroupTypes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdGroups_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypesGroupTypeIdGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"],\"getGroupTypesGroupTypeIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResources_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypesGroupTypeIdResources_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"],\"getGroupTypesGroupTypeIdResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"],\"getGroupTypesGroupTypeIdResourcesResourceIdVisit_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdAssignCampuses_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdDisableChat_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdDuplicate_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdEnableChat_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdMemberships_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postGroupsGroupIdMemberships_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"postGroupsGroupIdMemberships_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"postGroupsGroupIdMemberships_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Person ID\",\n      name: \"postGroupsGroupIdMemberships_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Person ID\",\n      name: \"postGroupsGroupIdMemberships_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"deleteGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"deleteGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"deleteGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership Id\",\n      name: \"deleteGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n    },\n    {\n      displayName: \"Application Id\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_applicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdApplicationsApplicationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdCampusesCampusId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getGroupsGroupIdCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdEventsEventId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getGroupsGroupIdEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdEventsEventId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdGroupTypeGroupTypeId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupsGroupIdGroupTypeGroupTypeId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdLocationLocationId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getGroupsGroupIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdLocationLocationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdMembershipsMembershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership Id\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdPeoplePersonId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getGroupsGroupIdPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdResourcesResourceId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupsGroupIdResourcesResourceId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTagsTagId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getGroupsGroupIdTagsTagId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdApplications_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdApplications_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n      options: [{\"displayName\":\"Applied At\",\"name\":\"whereappliedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Applied At Ascending\",\"value\":\"applied_at\"},{\"name\":\"Applied At Descending\",\"value\":\"-applied_at\"},{\"name\":\"Status Ascending\",\"value\":\"status\"},{\"name\":\"Status Descending\",\"value\":\"-status\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"],\"getGroupsGroupIdApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdCampuses_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdCampuses_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n      options: [{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"],\"getGroupsGroupIdCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdEnrollment_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdEnrollment_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdEnrollment_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"],\"getGroupsGroupIdEnrollment_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdEvents_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdEvents_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Canceled\",\"value\":\"canceled\"},{\"name\":\"Not Canceled\",\"value\":\"not_canceled\"}],\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"],\"getGroupsGroupIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"],\"getGroupsGroupIdMembershipsMembershipIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdGroupType_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdGroupType_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n      options: [{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdGroupType_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdGroupType_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"],\"getGroupsGroupIdGroupType_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdTagsTagIdGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdTagsTagIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdTagsTagIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"],\"getGroupsGroupIdTagsTagIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Hidden\",\"value\":\"hidden\"},{\"name\":\"Meeting Schedule\",\"value\":\"meeting_schedule\"},{\"name\":\"My Groups\",\"value\":\"my_groups\"},{\"name\":\"People Database Searchable\",\"value\":\"people_database_searchable\"},{\"name\":\"Published\",\"value\":\"published\"},{\"name\":\"Tag\",\"value\":\"tag\"}],\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"],\"getGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdLocation_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdLocation_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"],\"getGroupsGroupIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMemberships_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdMemberships_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Joined At Ascending\",\"value\":\"joined_at\"},{\"name\":\"Joined At Descending\",\"value\":\"-joined_at\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMemberships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMemberships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"],\"getGroupsGroupIdMemberships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMyMembership_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdMyMembership_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Joined At Ascending\",\"value\":\"joined_at\"},{\"name\":\"Joined At Descending\",\"value\":\"-joined_at\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMyMembership_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMyMembership_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"],\"getGroupsGroupIdMyMembership_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdPeople_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdPeople_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"],\"getGroupsGroupIdPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"],\"getGroupsGroupIdMembershipsMembershipIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdResources_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdResources_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Leaders\",\"value\":\"leaders\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"],\"getGroupsGroupIdResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTags_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getGroupsGroupIdTags_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n      options: [{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdTags_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdTags_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"],\"getGroupsGroupIdTags_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchGroupsGroupIdMembershipsMembershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership Id\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"deletePeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdEventsEventId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getPeoplePersonIdEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdEventsEventId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdGroupsGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getPeoplePersonIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdMembershipsMembershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdEvents_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdEvents_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Canceled\",\"value\":\"canceled\"},{\"name\":\"Not Canceled\",\"value\":\"not_canceled\"}],\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"],\"getPeoplePersonIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdGroups_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type Id\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"],\"getPeoplePersonIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getMe_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getMe_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"],\"getMe_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdMemberships_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdMemberships_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Joined At Ascending\",\"value\":\"joined_at\"},{\"name\":\"Joined At Descending\",\"value\":\"-joined_at\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdMemberships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdMemberships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"],\"getPeoplePersonIdMemberships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeople_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdGroupsGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdGroupsGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchPeoplePersonIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchPeoplePersonIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchPeoplePersonIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdMembershipsMembershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group Id\",\n      name: \"getTagGroupsTagGroupIdTagsTagId_tagGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getTagGroupsTagGroupIdTagsTagId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group Id\",\n      name: \"getTagGroupsTagGroupId_tagGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getTagGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Public\",\"value\":\"public\"}],\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getTagGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getTagGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"],\"getTagGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group Id\",\n      name: \"getTagGroupsTagGroupIdTags_tagGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getTagGroupsTagGroupIdTags_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n      options: [{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getTagGroupsTagGroupIdTags_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getTagGroupsTagGroupIdTags_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"],\"getTagGroupsTagGroupIdTags_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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

export class PlanningCenterGroups implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Groups",
    name: "planningCenterGroups",
    icon: 'file:pco.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Planning Center Groups generated from the Planning Center OpenAPI snapshot.",
    defaults: {
      name: "Planning Center Groups",
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
        throw new Error(`Unsupported Planning Center Groups operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
