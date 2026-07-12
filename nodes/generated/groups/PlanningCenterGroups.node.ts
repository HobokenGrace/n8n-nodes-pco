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
  attributeFields: GeneratedField[];
  relationshipFields: GeneratedRelationshipField[];
}

const OPERATIONS: Operation[] = [
  {
    "id": "getCampuses",
    "resource": "Campus",
    "operation": "GET /campuses",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusId",
    "resource": "Campus",
    "operation": "GET /campuses/{campus_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusIdGroups",
    "resource": "Campus",
    "operation": "GET /campuses/{campus_id}/groups",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusIdGroupsGroupId",
    "resource": "Campus",
    "operation": "GET /campuses/{campus_id}/groups/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchCampusesCampusIdGroupsGroupId",
    "resource": "Campus",
    "operation": "PATCH /campuses/{campus_id}/groups/{group_id}",
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
    "id": "getEvents",
    "resource": "Event",
    "operation": "GET /events",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventId",
    "resource": "Event",
    "operation": "GET /events/{event_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendances",
    "resource": "Event",
    "operation": "GET /events/{event_id}/attendances",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendancesAttendanceIdPerson",
    "resource": "Event",
    "operation": "GET /events/{event_id}/attendances/{attendance_id}/person",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdAttendancesAttendanceIdPersonPersonId",
    "resource": "Event",
    "operation": "GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdGroup",
    "resource": "Event",
    "operation": "GET /events/{event_id}/group",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdGroupGroupId",
    "resource": "Event",
    "operation": "GET /events/{event_id}/group/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocation",
    "resource": "Event",
    "operation": "GET /events/{event_id}/location",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocationLocationId",
    "resource": "Event",
    "operation": "GET /events/{event_id}/location/{location_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocationLocationIdGroup",
    "resource": "Event",
    "operation": "GET /events/{event_id}/location/{location_id}/group",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdLocationLocationIdGroupGroupId",
    "resource": "Event",
    "operation": "GET /events/{event_id}/location/{location_id}/group/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotes",
    "resource": "Event",
    "operation": "GET /events/{event_id}/notes",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotesEventNoteIdOwner",
    "resource": "Event",
    "operation": "GET /events/{event_id}/notes/{event_note_id}/owner",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotesEventNoteIdOwnerOwnerId",
    "resource": "Event",
    "operation": "GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdNotesNoteId",
    "resource": "Event",
    "operation": "GET /events/{event_id}/notes/{note_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getEventsEventIdRsvps",
    "resource": "Event",
    "operation": "GET /events/{event_id}/rsvps",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchEventsEventIdGroupGroupId",
    "resource": "Event",
    "operation": "PATCH /events/{event_id}/group/{group_id}",
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
    "operation": "PATCH /events/{event_id}/location/{location_id}/group/{group_id}",
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
    "id": "getGroupApplications",
    "resource": "Group Application",
    "operation": "GET /group_applications",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationId",
    "resource": "Group Application",
    "operation": "GET /group_applications/{group_application_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationIdGroup",
    "resource": "Group Application",
    "operation": "GET /group_applications/{group_application_id}/group",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationIdGroupGroupId",
    "resource": "Group Application",
    "operation": "GET /group_applications/{group_application_id}/group/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationIdPerson",
    "resource": "Group Application",
    "operation": "GET /group_applications/{group_application_id}/person",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupApplicationsGroupApplicationIdPersonPersonId",
    "resource": "Group Application",
    "operation": "GET /group_applications/{group_application_id}/person/{person_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchGroupApplicationsGroupApplicationIdGroupGroupId",
    "resource": "Group Application",
    "operation": "PATCH /group_applications/{group_application_id}/group/{group_id}",
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
    "operation": "POST /group_applications/{group_application_id}/approve",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "postGroupApplicationsGroupApplicationIdReject",
    "resource": "Group Application",
    "operation": "POST /group_applications/{group_application_id}/reject",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypes",
    "resource": "Group Type",
    "operation": "GET /group_types",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeId",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdEvents",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/events",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdEventsEventId",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/events/{event_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdGroups",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/groups",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdGroupsGroupId",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/groups/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResources",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/resources",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResourcesResourceId",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/resources/{resource_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdDownload",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/resources/{resource_id}/download",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdVisit",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/resources/{resource_id}/visit",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId",
    "resource": "Group Type",
    "operation": "GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchGroupTypesGroupTypeIdGroupsGroupId",
    "resource": "Group Type",
    "operation": "PATCH /group_types/{group_type_id}/groups/{group_id}",
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
    "id": "deleteGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "operation": "DELETE /groups/{group_id}/memberships/{membership_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "DELETE /groups/{group_id}/my_membership/{my_membership_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroups",
    "resource": "Group",
    "operation": "GET /groups",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdApplications",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/applications",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdApplicationsApplicationId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/applications/{application_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdCampuses",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/campuses",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdCampusesCampusId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/campuses/{campus_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdEnrollment",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/enrollment",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdEvents",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/events",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdEventsEventId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/events/{event_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdGroupType",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/group_type",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdGroupTypeGroupTypeId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/group_type/{group_type_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdLocation",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/location",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdLocationLocationId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/location/{location_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMemberships",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/memberships",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/memberships/{membership_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipIdGroup",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/memberships/{membership_id}/group",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipIdGroupGroupId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipIdPerson",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/memberships/{membership_id}/person",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMyMembership",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/my_membership",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/my_membership/{my_membership_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdPeople",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/people",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdPeoplePersonId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/people/{person_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdResources",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/resources",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdResourcesResourceId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/resources/{resource_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdTags",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/tags",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdTagsTagId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/tags/{tag_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdTagsTagIdGroups",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/tags/{tag_id}/groups",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getGroupsGroupIdTagsTagIdGroupsGroupId",
    "resource": "Group",
    "operation": "GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchGroupsGroupId",
    "resource": "Group",
    "operation": "PATCH /groups/{group_id}",
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
    "operation": "PATCH /groups/{group_id}/memberships/{membership_id}",
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
    "id": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId",
    "resource": "Group",
    "operation": "PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}",
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
    "id": "patchGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "PATCH /groups/{group_id}/my_membership/{my_membership_id}",
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
    "id": "patchGroupsGroupIdTagsTagIdGroupsGroupId",
    "resource": "Group",
    "operation": "PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}",
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
    "operation": "POST /groups/{group_id}/assign_campuses",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "postGroupsGroupIdDisableChat",
    "resource": "Group",
    "operation": "POST /groups/{group_id}/disable_chat",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "postGroupsGroupIdDuplicate",
    "resource": "Group",
    "operation": "POST /groups/{group_id}/duplicate",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "postGroupsGroupIdEnableChat",
    "resource": "Group",
    "operation": "POST /groups/{group_id}/enable_chat",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "postGroupsGroupIdMemberships",
    "resource": "Group",
    "operation": "POST /groups/{group_id}/memberships",
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
    "id": "deletePeoplePersonIdMembershipsMembershipId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/memberships/{membership_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getMe",
    "resource": "Person",
    "operation": "GET /me",
    "description": "GET /me",
    "method": "GET",
    "path": "/groups/v2/me",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeople",
    "resource": "Person",
    "operation": "GET /people",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonId",
    "resource": "Person",
    "operation": "GET /people/{person_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdEvents",
    "resource": "Person",
    "operation": "GET /people/{person_id}/events",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdEventsEventId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/events/{event_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdGroups",
    "resource": "Person",
    "operation": "GET /people/{person_id}/groups",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdGroupsGroupId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/groups/{group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdMemberships",
    "resource": "Person",
    "operation": "GET /people/{person_id}/memberships",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdMembershipsMembershipId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/memberships/{membership_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonIdGroupsGroupId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/groups/{group_id}",
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
    "operation": "PATCH /people/{person_id}/memberships/{membership_id}",
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
    "id": "getTagGroups",
    "resource": "Tag Group",
    "operation": "GET /tag_groups",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getTagGroupsTagGroupId",
    "resource": "Tag Group",
    "operation": "GET /tag_groups/{tag_group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getTagGroupsTagGroupIdTags",
    "resource": "Tag Group",
    "operation": "GET /tag_groups/{tag_group_id}/tags",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getTagGroupsTagGroupIdTagsTagId",
    "resource": "Tag Group",
    "operation": "GET /tag_groups/{tag_group_id}/tags/{tag_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  }
];

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Campus\",\"value\":\"Campus\"},{\"name\":\"Event\",\"value\":\"Event\"},{\"name\":\"Group\",\"value\":\"Group\"},{\"name\":\"Group Application\",\"value\":\"Group Application\"},{\"name\":\"Group Type\",\"value\":\"Group Type\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Tag Group\",\"value\":\"Tag Group\"}],\n      default: \"Campus\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"]}},\n      options: [{\"name\":\"GET /campuses\",\"value\":\"getCampuses\",\"description\":\"GET /campuses\",\"action\":\"GET /campuses\"},{\"name\":\"GET /campuses/{campus_id}\",\"value\":\"getCampusesCampusId\",\"description\":\"GET /campuses/{campus_id}\",\"action\":\"GET /campuses/{campus_id}\"},{\"name\":\"GET /campuses/{campus_id}/groups\",\"value\":\"getCampusesCampusIdGroups\",\"description\":\"GET /campuses/{campus_id}/groups\",\"action\":\"GET /campuses/{campus_id}/groups\"},{\"name\":\"GET /campuses/{campus_id}/groups/{group_id}\",\"value\":\"getCampusesCampusIdGroupsGroupId\",\"description\":\"GET /campuses/{campus_id}/groups/{group_id}\",\"action\":\"GET /campuses/{campus_id}/groups/{group_id}\"},{\"name\":\"PATCH /campuses/{campus_id}/groups/{group_id}\",\"value\":\"patchCampusesCampusIdGroupsGroupId\",\"description\":\"PATCH /campuses/{campus_id}/groups/{group_id}\",\"action\":\"PATCH /campuses/{campus_id}/groups/{group_id}\"}],\n      default: \"getCampuses\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"]}},\n      options: [{\"name\":\"GET /events\",\"value\":\"getEvents\",\"description\":\"GET /events\",\"action\":\"GET /events\"},{\"name\":\"GET /events/{event_id}\",\"value\":\"getEventsEventId\",\"description\":\"GET /events/{event_id}\",\"action\":\"GET /events/{event_id}\"},{\"name\":\"GET /events/{event_id}/attendances\",\"value\":\"getEventsEventIdAttendances\",\"description\":\"GET /events/{event_id}/attendances\",\"action\":\"GET /events/{event_id}/attendances\"},{\"name\":\"GET /events/{event_id}/attendances/{attendance_id}/person\",\"value\":\"getEventsEventIdAttendancesAttendanceIdPerson\",\"description\":\"GET /events/{event_id}/attendances/{attendance_id}/person\",\"action\":\"GET /events/{event_id}/attendances/{attendance_id}/person\"},{\"name\":\"GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}\",\"value\":\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\",\"description\":\"GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}\",\"action\":\"GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}\"},{\"name\":\"GET /events/{event_id}/group\",\"value\":\"getEventsEventIdGroup\",\"description\":\"GET /events/{event_id}/group\",\"action\":\"GET /events/{event_id}/group\"},{\"name\":\"GET /events/{event_id}/group/{group_id}\",\"value\":\"getEventsEventIdGroupGroupId\",\"description\":\"GET /events/{event_id}/group/{group_id}\",\"action\":\"GET /events/{event_id}/group/{group_id}\"},{\"name\":\"GET /events/{event_id}/location\",\"value\":\"getEventsEventIdLocation\",\"description\":\"GET /events/{event_id}/location\",\"action\":\"GET /events/{event_id}/location\"},{\"name\":\"GET /events/{event_id}/location/{location_id}\",\"value\":\"getEventsEventIdLocationLocationId\",\"description\":\"GET /events/{event_id}/location/{location_id}\",\"action\":\"GET /events/{event_id}/location/{location_id}\"},{\"name\":\"GET /events/{event_id}/location/{location_id}/group\",\"value\":\"getEventsEventIdLocationLocationIdGroup\",\"description\":\"GET /events/{event_id}/location/{location_id}/group\",\"action\":\"GET /events/{event_id}/location/{location_id}/group\"},{\"name\":\"GET /events/{event_id}/location/{location_id}/group/{group_id}\",\"value\":\"getEventsEventIdLocationLocationIdGroupGroupId\",\"description\":\"GET /events/{event_id}/location/{location_id}/group/{group_id}\",\"action\":\"GET /events/{event_id}/location/{location_id}/group/{group_id}\"},{\"name\":\"GET /events/{event_id}/notes\",\"value\":\"getEventsEventIdNotes\",\"description\":\"GET /events/{event_id}/notes\",\"action\":\"GET /events/{event_id}/notes\"},{\"name\":\"GET /events/{event_id}/notes/{event_note_id}/owner\",\"value\":\"getEventsEventIdNotesEventNoteIdOwner\",\"description\":\"GET /events/{event_id}/notes/{event_note_id}/owner\",\"action\":\"GET /events/{event_id}/notes/{event_note_id}/owner\"},{\"name\":\"GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}\",\"value\":\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\",\"description\":\"GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}\",\"action\":\"GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}\"},{\"name\":\"GET /events/{event_id}/notes/{note_id}\",\"value\":\"getEventsEventIdNotesNoteId\",\"description\":\"GET /events/{event_id}/notes/{note_id}\",\"action\":\"GET /events/{event_id}/notes/{note_id}\"},{\"name\":\"GET /events/{event_id}/rsvps\",\"value\":\"getEventsEventIdRsvps\",\"description\":\"GET /events/{event_id}/rsvps\",\"action\":\"GET /events/{event_id}/rsvps\"},{\"name\":\"PATCH /events/{event_id}/group/{group_id}\",\"value\":\"patchEventsEventIdGroupGroupId\",\"description\":\"PATCH /events/{event_id}/group/{group_id}\",\"action\":\"PATCH /events/{event_id}/group/{group_id}\"},{\"name\":\"PATCH /events/{event_id}/location/{location_id}/group/{group_id}\",\"value\":\"patchEventsEventIdLocationLocationIdGroupGroupId\",\"description\":\"PATCH /events/{event_id}/location/{location_id}/group/{group_id}\",\"action\":\"PATCH /events/{event_id}/location/{location_id}/group/{group_id}\"}],\n      default: \"getEvents\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"]}},\n      options: [{\"name\":\"DELETE /groups/{group_id}/memberships/{membership_id}\",\"value\":\"deleteGroupsGroupIdMembershipsMembershipId\",\"description\":\"DELETE /groups/{group_id}/memberships/{membership_id}\",\"action\":\"DELETE /groups/{group_id}/memberships/{membership_id}\"},{\"name\":\"DELETE /groups/{group_id}/my_membership/{my_membership_id}\",\"value\":\"deleteGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"DELETE /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"DELETE /groups/{group_id}/my_membership/{my_membership_id}\"},{\"name\":\"GET /groups\",\"value\":\"getGroups\",\"description\":\"GET /groups\",\"action\":\"GET /groups\"},{\"name\":\"GET /groups/{group_id}\",\"value\":\"getGroupsGroupId\",\"description\":\"GET /groups/{group_id}\",\"action\":\"GET /groups/{group_id}\"},{\"name\":\"GET /groups/{group_id}/applications\",\"value\":\"getGroupsGroupIdApplications\",\"description\":\"GET /groups/{group_id}/applications\",\"action\":\"GET /groups/{group_id}/applications\"},{\"name\":\"GET /groups/{group_id}/applications/{application_id}\",\"value\":\"getGroupsGroupIdApplicationsApplicationId\",\"description\":\"GET /groups/{group_id}/applications/{application_id}\",\"action\":\"GET /groups/{group_id}/applications/{application_id}\"},{\"name\":\"GET /groups/{group_id}/campuses\",\"value\":\"getGroupsGroupIdCampuses\",\"description\":\"GET /groups/{group_id}/campuses\",\"action\":\"GET /groups/{group_id}/campuses\"},{\"name\":\"GET /groups/{group_id}/campuses/{campus_id}\",\"value\":\"getGroupsGroupIdCampusesCampusId\",\"description\":\"GET /groups/{group_id}/campuses/{campus_id}\",\"action\":\"GET /groups/{group_id}/campuses/{campus_id}\"},{\"name\":\"GET /groups/{group_id}/enrollment\",\"value\":\"getGroupsGroupIdEnrollment\",\"description\":\"GET /groups/{group_id}/enrollment\",\"action\":\"GET /groups/{group_id}/enrollment\"},{\"name\":\"GET /groups/{group_id}/events\",\"value\":\"getGroupsGroupIdEvents\",\"description\":\"GET /groups/{group_id}/events\",\"action\":\"GET /groups/{group_id}/events\"},{\"name\":\"GET /groups/{group_id}/events/{event_id}\",\"value\":\"getGroupsGroupIdEventsEventId\",\"description\":\"GET /groups/{group_id}/events/{event_id}\",\"action\":\"GET /groups/{group_id}/events/{event_id}\"},{\"name\":\"GET /groups/{group_id}/group_type\",\"value\":\"getGroupsGroupIdGroupType\",\"description\":\"GET /groups/{group_id}/group_type\",\"action\":\"GET /groups/{group_id}/group_type\"},{\"name\":\"GET /groups/{group_id}/group_type/{group_type_id}\",\"value\":\"getGroupsGroupIdGroupTypeGroupTypeId\",\"description\":\"GET /groups/{group_id}/group_type/{group_type_id}\",\"action\":\"GET /groups/{group_id}/group_type/{group_type_id}\"},{\"name\":\"GET /groups/{group_id}/location\",\"value\":\"getGroupsGroupIdLocation\",\"description\":\"GET /groups/{group_id}/location\",\"action\":\"GET /groups/{group_id}/location\"},{\"name\":\"GET /groups/{group_id}/location/{location_id}\",\"value\":\"getGroupsGroupIdLocationLocationId\",\"description\":\"GET /groups/{group_id}/location/{location_id}\",\"action\":\"GET /groups/{group_id}/location/{location_id}\"},{\"name\":\"GET /groups/{group_id}/memberships\",\"value\":\"getGroupsGroupIdMemberships\",\"description\":\"GET /groups/{group_id}/memberships\",\"action\":\"GET /groups/{group_id}/memberships\"},{\"name\":\"GET /groups/{group_id}/memberships/{membership_id}\",\"value\":\"getGroupsGroupIdMembershipsMembershipId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}\",\"action\":\"GET /groups/{group_id}/memberships/{membership_id}\"},{\"name\":\"GET /groups/{group_id}/memberships/{membership_id}/group\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdGroup\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/group\",\"action\":\"GET /groups/{group_id}/memberships/{membership_id}/group\"},{\"name\":\"GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"action\":\"GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}\"},{\"name\":\"GET /groups/{group_id}/memberships/{membership_id}/person\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdPerson\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/person\",\"action\":\"GET /groups/{group_id}/memberships/{membership_id}/person\"},{\"name\":\"GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}\",\"action\":\"GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}\"},{\"name\":\"GET /groups/{group_id}/my_membership\",\"value\":\"getGroupsGroupIdMyMembership\",\"description\":\"GET /groups/{group_id}/my_membership\",\"action\":\"GET /groups/{group_id}/my_membership\"},{\"name\":\"GET /groups/{group_id}/my_membership/{my_membership_id}\",\"value\":\"getGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"GET /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"GET /groups/{group_id}/my_membership/{my_membership_id}\"},{\"name\":\"GET /groups/{group_id}/people\",\"value\":\"getGroupsGroupIdPeople\",\"description\":\"GET /groups/{group_id}/people\",\"action\":\"GET /groups/{group_id}/people\"},{\"name\":\"GET /groups/{group_id}/people/{person_id}\",\"value\":\"getGroupsGroupIdPeoplePersonId\",\"description\":\"GET /groups/{group_id}/people/{person_id}\",\"action\":\"GET /groups/{group_id}/people/{person_id}\"},{\"name\":\"GET /groups/{group_id}/resources\",\"value\":\"getGroupsGroupIdResources\",\"description\":\"GET /groups/{group_id}/resources\",\"action\":\"GET /groups/{group_id}/resources\"},{\"name\":\"GET /groups/{group_id}/resources/{resource_id}\",\"value\":\"getGroupsGroupIdResourcesResourceId\",\"description\":\"GET /groups/{group_id}/resources/{resource_id}\",\"action\":\"GET /groups/{group_id}/resources/{resource_id}\"},{\"name\":\"GET /groups/{group_id}/tags\",\"value\":\"getGroupsGroupIdTags\",\"description\":\"GET /groups/{group_id}/tags\",\"action\":\"GET /groups/{group_id}/tags\"},{\"name\":\"GET /groups/{group_id}/tags/{tag_id}\",\"value\":\"getGroupsGroupIdTagsTagId\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}\",\"action\":\"GET /groups/{group_id}/tags/{tag_id}\"},{\"name\":\"GET /groups/{group_id}/tags/{tag_id}/groups\",\"value\":\"getGroupsGroupIdTagsTagIdGroups\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}/groups\",\"action\":\"GET /groups/{group_id}/tags/{tag_id}/groups\"},{\"name\":\"GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"value\":\"getGroupsGroupIdTagsTagIdGroupsGroupId\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"action\":\"GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}\"},{\"name\":\"PATCH /groups/{group_id}\",\"value\":\"patchGroupsGroupId\",\"description\":\"PATCH /groups/{group_id}\",\"action\":\"PATCH /groups/{group_id}\"},{\"name\":\"PATCH /groups/{group_id}/memberships/{membership_id}\",\"value\":\"patchGroupsGroupIdMembershipsMembershipId\",\"description\":\"PATCH /groups/{group_id}/memberships/{membership_id}\",\"action\":\"PATCH /groups/{group_id}/memberships/{membership_id}\"},{\"name\":\"PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"value\":\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\",\"description\":\"PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"action\":\"PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}\"},{\"name\":\"PATCH /groups/{group_id}/my_membership/{my_membership_id}\",\"value\":\"patchGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"PATCH /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"PATCH /groups/{group_id}/my_membership/{my_membership_id}\"},{\"name\":\"PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"value\":\"patchGroupsGroupIdTagsTagIdGroupsGroupId\",\"description\":\"PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"action\":\"PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}\"},{\"name\":\"POST /groups/{group_id}/assign_campuses\",\"value\":\"postGroupsGroupIdAssignCampuses\",\"description\":\"POST /groups/{group_id}/assign_campuses\",\"action\":\"POST /groups/{group_id}/assign_campuses\"},{\"name\":\"POST /groups/{group_id}/disable_chat\",\"value\":\"postGroupsGroupIdDisableChat\",\"description\":\"POST /groups/{group_id}/disable_chat\",\"action\":\"POST /groups/{group_id}/disable_chat\"},{\"name\":\"POST /groups/{group_id}/duplicate\",\"value\":\"postGroupsGroupIdDuplicate\",\"description\":\"POST /groups/{group_id}/duplicate\",\"action\":\"POST /groups/{group_id}/duplicate\"},{\"name\":\"POST /groups/{group_id}/enable_chat\",\"value\":\"postGroupsGroupIdEnableChat\",\"description\":\"POST /groups/{group_id}/enable_chat\",\"action\":\"POST /groups/{group_id}/enable_chat\"},{\"name\":\"POST /groups/{group_id}/memberships\",\"value\":\"postGroupsGroupIdMemberships\",\"description\":\"POST /groups/{group_id}/memberships\",\"action\":\"POST /groups/{group_id}/memberships\"}],\n      default: \"deleteGroupsGroupIdMembershipsMembershipId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"]}},\n      options: [{\"name\":\"GET /group_applications\",\"value\":\"getGroupApplications\",\"description\":\"GET /group_applications\",\"action\":\"GET /group_applications\"},{\"name\":\"GET /group_applications/{group_application_id}\",\"value\":\"getGroupApplicationsGroupApplicationId\",\"description\":\"GET /group_applications/{group_application_id}\",\"action\":\"GET /group_applications/{group_application_id}\"},{\"name\":\"GET /group_applications/{group_application_id}/group\",\"value\":\"getGroupApplicationsGroupApplicationIdGroup\",\"description\":\"GET /group_applications/{group_application_id}/group\",\"action\":\"GET /group_applications/{group_application_id}/group\"},{\"name\":\"GET /group_applications/{group_application_id}/group/{group_id}\",\"value\":\"getGroupApplicationsGroupApplicationIdGroupGroupId\",\"description\":\"GET /group_applications/{group_application_id}/group/{group_id}\",\"action\":\"GET /group_applications/{group_application_id}/group/{group_id}\"},{\"name\":\"GET /group_applications/{group_application_id}/person\",\"value\":\"getGroupApplicationsGroupApplicationIdPerson\",\"description\":\"GET /group_applications/{group_application_id}/person\",\"action\":\"GET /group_applications/{group_application_id}/person\"},{\"name\":\"GET /group_applications/{group_application_id}/person/{person_id}\",\"value\":\"getGroupApplicationsGroupApplicationIdPersonPersonId\",\"description\":\"GET /group_applications/{group_application_id}/person/{person_id}\",\"action\":\"GET /group_applications/{group_application_id}/person/{person_id}\"},{\"name\":\"PATCH /group_applications/{group_application_id}/group/{group_id}\",\"value\":\"patchGroupApplicationsGroupApplicationIdGroupGroupId\",\"description\":\"PATCH /group_applications/{group_application_id}/group/{group_id}\",\"action\":\"PATCH /group_applications/{group_application_id}/group/{group_id}\"},{\"name\":\"POST /group_applications/{group_application_id}/approve\",\"value\":\"postGroupApplicationsGroupApplicationIdApprove\",\"description\":\"POST /group_applications/{group_application_id}/approve\",\"action\":\"POST /group_applications/{group_application_id}/approve\"},{\"name\":\"POST /group_applications/{group_application_id}/reject\",\"value\":\"postGroupApplicationsGroupApplicationIdReject\",\"description\":\"POST /group_applications/{group_application_id}/reject\",\"action\":\"POST /group_applications/{group_application_id}/reject\"}],\n      default: \"getGroupApplications\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"]}},\n      options: [{\"name\":\"GET /group_types\",\"value\":\"getGroupTypes\",\"description\":\"GET /group_types\",\"action\":\"GET /group_types\"},{\"name\":\"GET /group_types/{group_type_id}\",\"value\":\"getGroupTypesGroupTypeId\",\"description\":\"GET /group_types/{group_type_id}\",\"action\":\"GET /group_types/{group_type_id}\"},{\"name\":\"GET /group_types/{group_type_id}/events\",\"value\":\"getGroupTypesGroupTypeIdEvents\",\"description\":\"GET /group_types/{group_type_id}/events\",\"action\":\"GET /group_types/{group_type_id}/events\"},{\"name\":\"GET /group_types/{group_type_id}/events/{event_id}\",\"value\":\"getGroupTypesGroupTypeIdEventsEventId\",\"description\":\"GET /group_types/{group_type_id}/events/{event_id}\",\"action\":\"GET /group_types/{group_type_id}/events/{event_id}\"},{\"name\":\"GET /group_types/{group_type_id}/groups\",\"value\":\"getGroupTypesGroupTypeIdGroups\",\"description\":\"GET /group_types/{group_type_id}/groups\",\"action\":\"GET /group_types/{group_type_id}/groups\"},{\"name\":\"GET /group_types/{group_type_id}/groups/{group_id}\",\"value\":\"getGroupTypesGroupTypeIdGroupsGroupId\",\"description\":\"GET /group_types/{group_type_id}/groups/{group_id}\",\"action\":\"GET /group_types/{group_type_id}/groups/{group_id}\"},{\"name\":\"GET /group_types/{group_type_id}/resources\",\"value\":\"getGroupTypesGroupTypeIdResources\",\"description\":\"GET /group_types/{group_type_id}/resources\",\"action\":\"GET /group_types/{group_type_id}/resources\"},{\"name\":\"GET /group_types/{group_type_id}/resources/{resource_id}\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}\",\"action\":\"GET /group_types/{group_type_id}/resources/{resource_id}\"},{\"name\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download\",\"action\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download\"},{\"name\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}\",\"action\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}\"},{\"name\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit\",\"action\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit\"},{\"name\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}\",\"action\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}\"},{\"name\":\"PATCH /group_types/{group_type_id}/groups/{group_id}\",\"value\":\"patchGroupTypesGroupTypeIdGroupsGroupId\",\"description\":\"PATCH /group_types/{group_type_id}/groups/{group_id}\",\"action\":\"PATCH /group_types/{group_type_id}/groups/{group_id}\"}],\n      default: \"getGroupTypes\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"DELETE /people/{person_id}/memberships/{membership_id}\",\"value\":\"deletePeoplePersonIdMembershipsMembershipId\",\"description\":\"DELETE /people/{person_id}/memberships/{membership_id}\",\"action\":\"DELETE /people/{person_id}/memberships/{membership_id}\"},{\"name\":\"GET /me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"GET /me\"},{\"name\":\"GET /people\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"GET /people\"},{\"name\":\"GET /people/{person_id}\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"GET /people/{person_id}\"},{\"name\":\"GET /people/{person_id}/events\",\"value\":\"getPeoplePersonIdEvents\",\"description\":\"GET /people/{person_id}/events\",\"action\":\"GET /people/{person_id}/events\"},{\"name\":\"GET /people/{person_id}/events/{event_id}\",\"value\":\"getPeoplePersonIdEventsEventId\",\"description\":\"GET /people/{person_id}/events/{event_id}\",\"action\":\"GET /people/{person_id}/events/{event_id}\"},{\"name\":\"GET /people/{person_id}/groups\",\"value\":\"getPeoplePersonIdGroups\",\"description\":\"GET /people/{person_id}/groups\",\"action\":\"GET /people/{person_id}/groups\"},{\"name\":\"GET /people/{person_id}/groups/{group_id}\",\"value\":\"getPeoplePersonIdGroupsGroupId\",\"description\":\"GET /people/{person_id}/groups/{group_id}\",\"action\":\"GET /people/{person_id}/groups/{group_id}\"},{\"name\":\"GET /people/{person_id}/memberships\",\"value\":\"getPeoplePersonIdMemberships\",\"description\":\"GET /people/{person_id}/memberships\",\"action\":\"GET /people/{person_id}/memberships\"},{\"name\":\"GET /people/{person_id}/memberships/{membership_id}\",\"value\":\"getPeoplePersonIdMembershipsMembershipId\",\"description\":\"GET /people/{person_id}/memberships/{membership_id}\",\"action\":\"GET /people/{person_id}/memberships/{membership_id}\"},{\"name\":\"PATCH /people/{person_id}/groups/{group_id}\",\"value\":\"patchPeoplePersonIdGroupsGroupId\",\"description\":\"PATCH /people/{person_id}/groups/{group_id}\",\"action\":\"PATCH /people/{person_id}/groups/{group_id}\"},{\"name\":\"PATCH /people/{person_id}/memberships/{membership_id}\",\"value\":\"patchPeoplePersonIdMembershipsMembershipId\",\"description\":\"PATCH /people/{person_id}/memberships/{membership_id}\",\"action\":\"PATCH /people/{person_id}/memberships/{membership_id}\"}],\n      default: \"deletePeoplePersonIdMembershipsMembershipId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"]}},\n      options: [{\"name\":\"GET /tag_groups\",\"value\":\"getTagGroups\",\"description\":\"GET /tag_groups\",\"action\":\"GET /tag_groups\"},{\"name\":\"GET /tag_groups/{tag_group_id}\",\"value\":\"getTagGroupsTagGroupId\",\"description\":\"GET /tag_groups/{tag_group_id}\",\"action\":\"GET /tag_groups/{tag_group_id}\"},{\"name\":\"GET /tag_groups/{tag_group_id}/tags\",\"value\":\"getTagGroupsTagGroupIdTags\",\"description\":\"GET /tag_groups/{tag_group_id}/tags\",\"action\":\"GET /tag_groups/{tag_group_id}/tags\"},{\"name\":\"GET /tag_groups/{tag_group_id}/tags/{tag_id}\",\"value\":\"getTagGroupsTagGroupIdTagsTagId\",\"description\":\"GET /tag_groups/{tag_group_id}/tags/{tag_id}\",\"action\":\"GET /tag_groups/{tag_group_id}/tags/{tag_id}\"}],\n      default: \"getTagGroups\",\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getCampuses_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getCampuses_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCampuses_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"],\"getCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdGroups_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getCampusesCampusIdGroups_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getCampusesCampusIdGroups_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCampusesCampusIdGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCampusesCampusIdGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampusesCampusIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampusesCampusIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"],\"getCampusesCampusIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdGroupsGroupId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getCampusesCampusIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCampusesCampusIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchCampusesCampusIdGroupsGroupId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchCampusesCampusIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchCampusesCampusIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchCampusesCampusIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchCampusesCampusIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEvents_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getEvents_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At]\",\n      name: \"getEvents_wherestartsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gt]\",\n      name: \"getEvents_wherestartsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gte]\",\n      name: \"getEvents_wherestartsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lt]\",\n      name: \"getEvents_wherestartsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lte]\",\n      name: \"getEvents_wherestartsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At]\",\n      name: \"getEvents_whereendsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gt]\",\n      name: \"getEvents_whereendsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gte]\",\n      name: \"getEvents_whereendsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lt]\",\n      name: \"getEvents_whereendsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lte]\",\n      name: \"getEvents_whereendsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEvents_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEvents_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"],\"getEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdAttendances_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdAttendances_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdAttendances_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendances_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendances_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendances_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"],\"getEventsEventIdAttendances_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: \"Attendance Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_attendanceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"],\"getEventsEventIdAttendancesAttendanceIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Attendance Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_attendanceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdGroup_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getEventsEventIdGroup_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getEventsEventIdGroup_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdGroup_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdGroup_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"],\"getEventsEventIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getEventsEventIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocation_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocation_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"],\"getEventsEventIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocationLocationId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getEventsEventIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocationLocationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocationLocationIdGroup_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getEventsEventIdLocationLocationIdGroup_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getEventsEventIdLocationLocationIdGroup_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getEventsEventIdLocationLocationIdGroup_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdLocationLocationIdGroup_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocationLocationIdGroup_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdLocationLocationIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdLocationLocationIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"],\"getEventsEventIdLocationLocationIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotes_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdNotes_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdNotes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdNotes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"],\"getEventsEventIdNotes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwner_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: \"Event Note Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwner_eventNoteId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdNotesEventNoteIdOwner_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdNotesEventNoteIdOwner_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"],\"getEventsEventIdNotesEventNoteIdOwner_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Event Note Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventNoteId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdNotesNoteId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n    },\n    {\n      displayName: \"Note Id\",\n      name: \"getEventsEventIdNotesNoteId_noteId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdNotesNoteId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getEventsEventIdRsvps_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdRsvps_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdRsvps_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdRsvps_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"],\"getEventsEventIdRsvps_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"patchEventsEventIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchEventsEventIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEventsEventIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchEventsEventIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchEventsEventIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchEventsEventIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchEventsEventIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchEventsEventIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchEventsEventIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchEventsEventIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchEventsEventIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Where[applied At]\",\n      name: \"getGroupApplications_whereappliedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][gt]\",\n      name: \"getGroupApplications_whereappliedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][gte]\",\n      name: \"getGroupApplications_whereappliedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][lt]\",\n      name: \"getGroupApplications_whereappliedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][lte]\",\n      name: \"getGroupApplications_whereappliedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupApplications_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplications_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"],\"getGroupApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplicationsGroupApplicationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplicationsGroupApplicationIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplicationsGroupApplicationIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"],\"getGroupApplicationsGroupApplicationIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdPerson_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupApplicationsGroupApplicationIdPerson_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplicationsGroupApplicationIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplicationsGroupApplicationIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"],\"getGroupApplicationsGroupApplicationIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"getGroupApplicationsGroupApplicationIdPersonPersonId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getGroupApplicationsGroupApplicationIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"postGroupApplicationsGroupApplicationIdApprove_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application Id\",\n      name: \"postGroupApplicationsGroupApplicationIdReject_groupApplicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupTypes_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getGroupTypes_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypes_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"],\"getGroupTypes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdEvents_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupTypesGroupTypeIdEvents_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupTypesGroupTypeIdEvents_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At]\",\n      name: \"getGroupTypesGroupTypeIdEvents_wherestartsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gt]\",\n      name: \"getGroupTypesGroupTypeIdEvents_wherestartsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gte]\",\n      name: \"getGroupTypesGroupTypeIdEvents_wherestartsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lt]\",\n      name: \"getGroupTypesGroupTypeIdEvents_wherestartsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lte]\",\n      name: \"getGroupTypesGroupTypeIdEvents_wherestartsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At]\",\n      name: \"getGroupTypesGroupTypeIdEvents_whereendsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gt]\",\n      name: \"getGroupTypesGroupTypeIdEvents_whereendsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gte]\",\n      name: \"getGroupTypesGroupTypeIdEvents_whereendsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lt]\",\n      name: \"getGroupTypesGroupTypeIdEvents_whereendsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lte]\",\n      name: \"getGroupTypesGroupTypeIdEvents_whereendsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdEvents_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdEvents_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"],\"getGroupTypesGroupTypeIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdGroups_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupTypesGroupTypeIdGroups_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"],\"getGroupTypesGroupTypeIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResources_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdResources_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"],\"getGroupTypesGroupTypeIdResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"],\"getGroupTypesGroupTypeIdResourcesResourceIdDownload_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: \"Download Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_downloadId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"],\"getGroupTypesGroupTypeIdResourcesResourceIdVisit_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: \"Visit Id\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_visitId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"deleteGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"deleteGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"deleteGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership Id\",\n      name: \"deleteGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroups_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroups_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getGroups_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"],\"getGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdApplications_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At]\",\n      name: \"getGroupsGroupIdApplications_whereappliedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][gt]\",\n      name: \"getGroupsGroupIdApplications_whereappliedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][gte]\",\n      name: \"getGroupsGroupIdApplications_whereappliedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][lt]\",\n      name: \"getGroupsGroupIdApplications_whereappliedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Where[applied At][lte]\",\n      name: \"getGroupsGroupIdApplications_whereappliedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdApplications_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdApplications_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"],\"getGroupsGroupIdApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n    },\n    {\n      displayName: \"Application Id\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_applicationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdCampuses_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getGroupsGroupIdCampuses_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupsGroupIdCampuses_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdCampuses_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"],\"getGroupsGroupIdCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdCampusesCampusId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getGroupsGroupIdCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdEnrollment_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdEnrollment_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdEnrollment_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"],\"getGroupsGroupIdEnrollment_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdEvents_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdEvents_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupsGroupIdEvents_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At]\",\n      name: \"getGroupsGroupIdEvents_wherestartsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gt]\",\n      name: \"getGroupsGroupIdEvents_wherestartsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gte]\",\n      name: \"getGroupsGroupIdEvents_wherestartsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lt]\",\n      name: \"getGroupsGroupIdEvents_wherestartsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lte]\",\n      name: \"getGroupsGroupIdEvents_wherestartsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At]\",\n      name: \"getGroupsGroupIdEvents_whereendsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gt]\",\n      name: \"getGroupsGroupIdEvents_whereendsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gte]\",\n      name: \"getGroupsGroupIdEvents_whereendsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lt]\",\n      name: \"getGroupsGroupIdEvents_whereendsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lte]\",\n      name: \"getGroupsGroupIdEvents_whereendsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdEvents_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdEvents_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"],\"getGroupsGroupIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdEventsEventId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getGroupsGroupIdEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdEventsEventId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdGroupType_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getGroupsGroupIdGroupType_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdGroupType_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdGroupType_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdGroupType_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"],\"getGroupsGroupIdGroupType_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdGroupTypeGroupTypeId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"getGroupsGroupIdGroupTypeGroupTypeId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdLocation_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdLocation_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"],\"getGroupsGroupIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdLocationLocationId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location Id\",\n      name: \"getGroupsGroupIdLocationLocationId_locationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdLocationLocationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMemberships_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMemberships_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMemberships_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMemberships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMemberships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"],\"getGroupsGroupIdMemberships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"],\"getGroupsGroupIdMembershipsMembershipIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"],\"getGroupsGroupIdMembershipsMembershipIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMyMembership_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMyMembership_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMyMembership_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMyMembership_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMyMembership_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"],\"getGroupsGroupIdMyMembership_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership Id\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdPeople_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdPeople_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"],\"getGroupsGroupIdPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdPeoplePersonId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getGroupsGroupIdPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdResources_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdResources_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdResources_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"],\"getGroupsGroupIdResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdResourcesResourceId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: \"Resource Id\",\n      name: \"getGroupsGroupIdResourcesResourceId_resourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTags_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getGroupsGroupIdTags_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupsGroupIdTags_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdTags_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdTags_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdTags_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"],\"getGroupsGroupIdTags_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTagsTagId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getGroupsGroupIdTagsTagId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdTagsTagIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdTagsTagIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"],\"getGroupsGroupIdTagsTagIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Joined At\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Role\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership Id\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"Joined At\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Role\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdAssignCampuses_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdDisableChat_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdDuplicate_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdEnableChat_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"postGroupsGroupIdMemberships_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postGroupsGroupIdMemberships_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Joined At\",\n      name: \"postGroupsGroupIdMemberships_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Role\",\n      name: \"postGroupsGroupIdMemberships_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postGroupsGroupIdMemberships_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"postGroupsGroupIdMemberships_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"deletePeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getMe_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getMe_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"],\"getMe_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeople_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdEvents_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeoplePersonIdEvents_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getPeoplePersonIdEvents_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At]\",\n      name: \"getPeoplePersonIdEvents_wherestartsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gt]\",\n      name: \"getPeoplePersonIdEvents_wherestartsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gte]\",\n      name: \"getPeoplePersonIdEvents_wherestartsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lt]\",\n      name: \"getPeoplePersonIdEvents_wherestartsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lte]\",\n      name: \"getPeoplePersonIdEvents_wherestartsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At]\",\n      name: \"getPeoplePersonIdEvents_whereendsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gt]\",\n      name: \"getPeoplePersonIdEvents_whereendsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gte]\",\n      name: \"getPeoplePersonIdEvents_whereendsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lt]\",\n      name: \"getPeoplePersonIdEvents_whereendsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lte]\",\n      name: \"getPeoplePersonIdEvents_whereendsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdEvents_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdEvents_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"],\"getPeoplePersonIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdEventsEventId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event Id\",\n      name: \"getPeoplePersonIdEventsEventId_eventId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdEventsEventId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdGroups_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getPeoplePersonIdGroups_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: \"Where[group Type][id]\",\n      name: \"getPeoplePersonIdGroups_wheregroupTypeid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"],\"getPeoplePersonIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdGroupsGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"getPeoplePersonIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdMemberships_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdMemberships_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdMemberships_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdMemberships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdMemberships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"],\"getPeoplePersonIdMemberships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdGroupsGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group Id\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdGroupsGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchPeoplePersonIdGroupsGroupId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type Id\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupTypeId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Public Enrollment\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Display Meeting Schedule\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Publicly Visible\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Schedule\",\n      name: \"patchPeoplePersonIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Tag Ids\",\n      name: \"patchPeoplePersonIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupTypeIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership Id\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Joined At\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_joinedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Role\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_role\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getTagGroups_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getTagGroups_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getTagGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getTagGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getTagGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"],\"getTagGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group Id\",\n      name: \"getTagGroupsTagGroupId_tagGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group Id\",\n      name: \"getTagGroupsTagGroupIdTags_tagGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getTagGroupsTagGroupIdTags_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getTagGroupsTagGroupIdTags_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getTagGroupsTagGroupIdTags_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getTagGroupsTagGroupIdTags_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getTagGroupsTagGroupIdTags_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"],\"getTagGroupsTagGroupIdTags_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group Id\",\n      name: \"getTagGroupsTagGroupIdTagsTagId_tagGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: \"Tag Id\",\n      name: \"getTagGroupsTagGroupIdTagsTagId_tagId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

function addAdditionalQuery(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const additional = context.getNodeParameter('additionalQueryParameters', itemIndex, {}) as { parameters?: Array<{ name?: string; value?: unknown }> };
  for (const parameter of additional.parameters ?? []) {
    if (parameter.name) {
      qs[parameter.name] = parameter.value;
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
  for (const parameter of operation.queryParameters) {
    const value = parameter.required
      ? context.getNodeParameter(`${operation.id}_${parameter.name}`, itemIndex)
      : context.getNodeParameter(`${operation.id}_${parameter.name}`, itemIndex, '');
    if (value !== undefined && value !== '') {
      qs[parameter.sourceName] = value;
    }
  }
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
