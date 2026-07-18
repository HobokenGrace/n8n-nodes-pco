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
    "id": "getCampuses",
    "resource": "Campus",
    "operation": "List Campuses",
    "description": "GET /campuses",
    "method": "GET",
    "path": "/groups/v2/campuses",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "campus",
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
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetCampusesWhereid",
          "sourcePath": "/groups/v2/campuses",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdGroupsCampusId",
          "sourcePath": "/groups/v2/campuses",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdGroupsWheregroupTypeid",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getCampusesCampusId",
    "resource": "Campus",
    "operation": "Get Campus",
    "description": "GET /campuses/{campus_id}",
    "method": "GET",
    "path": "/groups/v2/campuses/{campus_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "campus",
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdCampusId",
          "sourcePath": "/groups/v2/campuses",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getCampusesCampusIdGroupsGroupId",
    "resource": "Campus",
    "operation": "Get Group (via Campus)",
    "description": "GET /campuses/{campus_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/campuses/{campus_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdGroupsGroupIdCampusId",
          "sourcePath": "/groups/v2/groups/{group_id}/campuses",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getCampusesCampusIdGroupsGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/campuses/{campus_id}/groups",
          "parentBindings": [
            {
              "sourceName": "campus_id",
              "fieldName": "getCampusesCampusIdGroupsGroupId_campusId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "patchCampusesCampusIdGroupsGroupId",
    "resource": "Campus",
    "jsonApiType": "Group",
    "operation": "Update Group (via Campus)",
    "description": "PATCH /campuses/{campus_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/campuses/{campus_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchCampusesCampusIdGroupsGroupIdCampusId",
          "sourcePath": "/groups/v2/groups/{group_id}/campuses",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchCampusesCampusIdGroupsGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchCampusesCampusIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/campuses/{campus_id}/groups",
          "parentBindings": [
            {
              "sourceName": "campus_id",
              "fieldName": "patchCampusesCampusIdGroupsGroupId_campusId"
            }
          ],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchCampusesCampusIdGroupsGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchCampusesCampusIdGroupsGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchCampusesCampusIdGroupsGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchCampusesCampusIdGroupsGroupId_groupId"
            }
          ],
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
    ]
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
    "lookupTarget": "attendance",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendancesEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getEvents",
    "resource": "Event",
    "operation": "List Events",
    "description": "GET /events",
    "method": "GET",
    "path": "/groups/v2/events",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "event",
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
    "id": "getEventsEventIdGroup",
    "resource": "Event",
    "operation": "List Group (via Event)",
    "description": "GET /events/{event_id}/group",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/group",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdGroupEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetEventsEventIdGroupWheregroupTypeid",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getEventsEventIdLocationLocationIdGroup",
    "resource": "Event",
    "operation": "List Group (via Location)",
    "description": "GET /events/{event_id}/location/{location_id}/group",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location/{location_id}/group",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdGroupEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdGroupLocationId",
          "sourcePath": "/groups/v2/events/{event_id}/location",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdLocationLocationIdGroup_eventId"
            }
          ],
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
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdGroupWheregroupTypeid",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getEventsEventIdLocation",
    "resource": "Event",
    "operation": "List Location (via Event)",
    "description": "GET /events/{event_id}/location",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "location",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getEventsEventIdNotes",
    "resource": "Event",
    "operation": "List Notes (via Event)",
    "description": "GET /events/{event_id}/notes",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "event note",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdNotesEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getEventsEventIdNotesEventNoteIdOwner",
    "resource": "Event",
    "operation": "List Owner (via Note)",
    "description": "GET /events/{event_id}/notes/{event_note_id}/owner",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes/{event_note_id}/owner",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "owner",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "eventNoteId",
        "sourceName": "event_note_id",
        "displayName": "Event Note ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerEventNoteId",
          "sourcePath": "/groups/v2/events/{event_id}/notes",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdNotesEventNoteIdOwner_eventId"
            }
          ],
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
    "id": "getEventsEventIdAttendancesAttendanceIdPerson",
    "resource": "Event",
    "operation": "List Person (via Attendance)",
    "description": "GET /events/{event_id}/attendances/{attendance_id}/person",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/attendances/{attendance_id}/person",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "attendanceId",
        "sourceName": "attendance_id",
        "displayName": "Attendance ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonAttendanceId",
          "sourcePath": "/groups/v2/events/{event_id}/attendances",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdAttendancesAttendanceIdPerson_eventId"
            }
          ],
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
        "group": "order",
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
    "lookupTarget": "rsvp",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdRsvpsEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
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
    "path": "/groups/v2/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getEventsEventIdGroupGroupId",
    "resource": "Event",
    "operation": "Get Group (via Event)",
    "description": "GET /events/{event_id}/group/{group_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdGroupGroupIdEventId",
          "sourcePath": "/groups/v2/groups/{group_id}/events",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getEventsEventIdGroupGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/events/{event_id}/group",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdGroupGroupId_eventId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getEventsEventIdLocationLocationIdGroupGroupId",
    "resource": "Event",
    "operation": "Get Group (via Location)",
    "description": "GET /events/{event_id}/location/{location_id}/group/{group_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location/{location_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdGroupGroupIdEventId",
          "sourcePath": "/groups/v2/groups/{group_id}/events",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdGroupGroupIdLocationId",
          "sourcePath": "/groups/v2/events/{event_id}/location",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_eventId"
            }
          ],
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/events/{event_id}/location/{location_id}/group",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_eventId"
            },
            {
              "sourceName": "location_id",
              "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_locationId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getEventsEventIdLocationLocationId",
    "resource": "Event",
    "operation": "Get Location (via Event)",
    "description": "GET /events/{event_id}/location/{location_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "location",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdLocationLocationIdLocationId",
          "sourcePath": "/groups/v2/events/{event_id}/location",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdLocationLocationId_eventId"
            }
          ],
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
    "id": "getEventsEventIdNotesNoteId",
    "resource": "Event",
    "operation": "Get Note (via Event)",
    "description": "GET /events/{event_id}/notes/{note_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes/{note_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "event note",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdNotesNoteIdEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "noteId",
        "sourceName": "note_id",
        "displayName": "Note ID",
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
    "id": "getEventsEventIdNotesEventNoteIdOwnerOwnerId",
    "resource": "Event",
    "operation": "Get Owner (via Note)",
    "description": "GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/notes/{event_note_id}/owner/{owner_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "owner",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventId",
          "sourcePath": "/groups/v2/events",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "eventNoteId",
        "sourceName": "event_note_id",
        "displayName": "Event Note ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventNoteId",
          "sourcePath": "/groups/v2/events/{event_id}/notes",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventId"
            }
          ],
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
        "name": "ownerId",
        "sourceName": "owner_id",
        "displayName": "Owner ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdOwnerId",
          "sourcePath": "/groups/v2/events/{event_id}/notes/{event_note_id}/owner",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventId"
            },
            {
              "sourceName": "event_note_id",
              "fieldName": "getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventNoteId"
            }
          ],
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
    "id": "getEventsEventIdAttendancesAttendanceIdPersonPersonId",
    "resource": "Event",
    "operation": "Get Person (via Attendance)",
    "description": "GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}",
    "method": "GET",
    "path": "/groups/v2/events/{event_id}/attendances/{attendance_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdEventId",
          "sourcePath": "/groups/v2/people/{person_id}/events",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_personId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "attendanceId",
        "sourceName": "attendance_id",
        "displayName": "Attendance ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdAttendanceId",
          "sourcePath": "/groups/v2/events/{event_id}/attendances",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_eventId"
            }
          ],
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
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdPersonId",
          "sourcePath": "/groups/v2/events/{event_id}/attendances/{attendance_id}/person",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_eventId"
            },
            {
              "sourceName": "attendance_id",
              "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_attendanceId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "id": "patchEventsEventIdGroupGroupId",
    "resource": "Event",
    "jsonApiType": "Group",
    "operation": "Update Group (via Event)",
    "description": "PATCH /events/{event_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/events/{event_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEventsEventIdGroupGroupIdEventId",
          "sourcePath": "/groups/v2/groups/{group_id}/events",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchEventsEventIdGroupGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEventsEventIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/events/{event_id}/group",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "patchEventsEventIdGroupGroupId_eventId"
            }
          ],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEventsEventIdGroupGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchEventsEventIdGroupGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchEventsEventIdGroupGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchEventsEventIdGroupGroupId_groupId"
            }
          ],
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
    ]
  },
  {
    "id": "patchEventsEventIdLocationLocationIdGroupGroupId",
    "resource": "Event",
    "jsonApiType": "Group",
    "operation": "Update Group (via Location)",
    "description": "PATCH /events/{event_id}/location/{location_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/events/{event_id}/location/{location_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdEventId",
          "sourcePath": "/groups/v2/groups/{group_id}/events",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdLocationId",
          "sourcePath": "/groups/v2/events/{event_id}/location",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_eventId"
            }
          ],
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/events/{event_id}/location/{location_id}/group",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_eventId"
            },
            {
              "sourceName": "location_id",
              "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_locationId"
            }
          ],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_groupId"
            }
          ],
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
    ]
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
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupGroupApplicationId",
          "sourcePath": "/groups/v2/group_applications",
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
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupWheregroupTypeid",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getGroupApplications",
    "resource": "Group Application",
    "operation": "List Group Applications",
    "description": "GET /group_applications",
    "method": "GET",
    "path": "/groups/v2/group_applications",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group application",
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
        "group": "filter",
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
    "id": "getGroupApplicationsGroupApplicationIdPerson",
    "resource": "Group Application",
    "operation": "List Person (via Group Application)",
    "description": "GET /group_applications/{group_application_id}/person",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}/person",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdPersonGroupApplicationId",
          "sourcePath": "/groups/v2/group_applications",
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
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
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId",
          "sourcePath": "/groups/v2/groups/{group_id}/applications",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
            }
          ],
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/group_applications/{group_application_id}/group",
          "parentBindings": [
            {
              "sourceName": "group_application_id",
              "fieldName": "getGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getGroupApplicationsGroupApplicationId",
    "resource": "Group Application",
    "operation": "Get Group Application",
    "description": "GET /group_applications/{group_application_id}",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group application",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupApplicationId",
          "sourcePath": "/groups/v2/group_applications",
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
    "id": "getGroupApplicationsGroupApplicationIdPersonPersonId",
    "resource": "Group Application",
    "operation": "Get Person (via Group Application)",
    "description": "GET /group_applications/{group_application_id}/person/{person_id}",
    "method": "GET",
    "path": "/groups/v2/group_applications/{group_application_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdPersonPersonIdGroupApplicationId",
          "sourcePath": "/groups/v2/group_applications",
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
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupApplicationsGroupApplicationIdPersonPersonIdPersonId",
          "sourcePath": "/groups/v2/group_applications/{group_application_id}/person",
          "parentBindings": [
            {
              "sourceName": "group_application_id",
              "fieldName": "getGroupApplicationsGroupApplicationIdPersonPersonId_groupApplicationId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "id": "postGroupApplicationsGroupApplicationIdApprove",
    "resource": "Group Application",
    "operation": "Create Approve (via Group Application)",
    "description": "POST /group_applications/{group_application_id}/approve",
    "method": "POST",
    "path": "/groups/v2/group_applications/{group_application_id}/approve",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "approve",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupApplicationsGroupApplicationIdApproveGroupApplicationId",
          "sourcePath": "/groups/v2/group_applications",
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
    "id": "postGroupApplicationsGroupApplicationIdReject",
    "resource": "Group Application",
    "operation": "Create Reject (via Group Application)",
    "description": "POST /group_applications/{group_application_id}/reject",
    "method": "POST",
    "path": "/groups/v2/group_applications/{group_application_id}/reject",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "reject",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupApplicationsGroupApplicationIdRejectGroupApplicationId",
          "sourcePath": "/groups/v2/group_applications",
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
    "id": "patchGroupApplicationsGroupApplicationIdGroupGroupId",
    "resource": "Group Application",
    "jsonApiType": "Group",
    "operation": "Update Group (via Group Application)",
    "description": "PATCH /group_applications/{group_application_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/group_applications/{group_application_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupApplicationId",
        "sourceName": "group_application_id",
        "displayName": "Group Application ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId",
          "sourcePath": "/groups/v2/groups/{group_id}/applications",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
            }
          ],
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/group_applications/{group_application_id}/group",
          "parentBindings": [
            {
              "sourceName": "group_application_id",
              "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId"
            }
          ],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
            }
          ],
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
    ]
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
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadResourceId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdDownload_groupTypeId"
            }
          ],
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
        "group": "order",
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
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdEventsGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getGroupTypes",
    "resource": "Group Type",
    "operation": "List Group Types",
    "description": "GET /group_types",
    "method": "GET",
    "path": "/groups/v2/group_types",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group type",
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
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetGroupTypesWhereid",
          "sourcePath": "/groups/v2/group_types",
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
        "name": "order",
        "displayName": "Order",
        "group": "order",
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
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdGroupsGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getGroupTypesGroupTypeIdResources",
    "resource": "Group Type",
    "operation": "List Resources (via Group Type)",
    "description": "GET /group_types/{group_type_id}/resources",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
        "group": "order",
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
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitResourceId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdVisit_groupTypeId"
            }
          ],
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
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
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdResourceId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_groupTypeId"
            }
          ],
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
        "name": "downloadId",
        "sourceName": "download_id",
        "displayName": "Download ID",
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
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdEventsEventIdGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdEventsEventIdEventId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/events",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupTypesGroupTypeIdEventsEventId_groupTypeId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getGroupTypesGroupTypeIdGroupsGroupId",
    "resource": "Group Type",
    "operation": "Get Group (via Group Type)",
    "description": "GET /group_types/{group_type_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupTypesGroupTypeIdGroupsGroupId_groupId"
            }
          ],
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/groups",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupTypesGroupTypeIdGroupsGroupId_groupTypeId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getGroupTypesGroupTypeId",
    "resource": "Group Type",
    "operation": "Get Group Type",
    "description": "GET /group_types/{group_type_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group type",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getGroupTypesGroupTypeIdResourcesResourceId",
    "resource": "Group Type",
    "operation": "Get Resource (via Group Type)",
    "description": "GET /group_types/{group_type_id}/resources/{resource_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources/{resource_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdResourceId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupTypesGroupTypeIdResourcesResourceId_groupTypeId"
            }
          ],
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
    "id": "getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId",
    "resource": "Group Type",
    "operation": "Get Visit (via Resource)",
    "description": "GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}",
    "method": "GET",
    "path": "/groups/v2/group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdGroupTypeId",
          "sourcePath": "/groups/v2/group_types",
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
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdResourceId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_groupTypeId"
            }
          ],
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
        "name": "visitId",
        "sourceName": "visit_id",
        "displayName": "Visit ID",
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
    "id": "patchGroupTypesGroupTypeIdGroupsGroupId",
    "resource": "Group Type",
    "jsonApiType": "Group",
    "operation": "Update Group (via Group Type)",
    "description": "PATCH /group_types/{group_type_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/group_types/{group_type_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupTypesGroupTypeIdGroupsGroupId_groupId"
            }
          ],
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/groups",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId"
            }
          ],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupTypesGroupTypeIdGroupsGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupTypesGroupTypeIdGroupsGroupId_groupId"
            }
          ],
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
    ]
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
    "lookupTarget": "group application",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdApplicationsGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "group": "filter",
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
    "id": "getGroupsGroupIdCampuses",
    "resource": "Group",
    "operation": "List Campuses (via Group)",
    "description": "GET /groups/{group_id}/campuses",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/campuses",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "campus",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdCampusesGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdCampusesWhereid",
          "sourcePath": "/groups/v2/groups/{group_id}/campuses",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdCampuses_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
      }
    ],
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
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdEventsGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdMembershipsMembershipIdGroup",
    "resource": "Group",
    "operation": "List Group (via Membership)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}/group",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/group",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdGroup_groupId"
            }
          ],
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
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupWheregroupTypeid",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdGroup_groupId"
            }
          ],
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
    "id": "getGroupsGroupIdGroupType",
    "resource": "Group",
    "operation": "List Group Type (via Group)",
    "description": "GET /groups/{group_id}/group_type",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/group_type",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group type",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdGroupTypeGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdGroupTypeWhereid",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdGroupType_groupId"
            }
          ],
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
        "name": "order",
        "displayName": "Order",
        "group": "order",
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
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsTagId",
          "sourcePath": "/groups/v2/groups/{group_id}/tags",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdTagsTagIdGroups_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsWheregroupTypeid",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdTagsTagIdGroups_groupId"
            }
          ],
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
    "id": "getGroups",
    "resource": "Group",
    "operation": "List Groups",
    "description": "GET /groups",
    "method": "GET",
    "path": "/groups/v2/groups",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group",
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
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetGroupsWheregroupTypeid",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getGroupsGroupIdLocation",
    "resource": "Group",
    "operation": "List Location (via Group)",
    "description": "GET /groups/{group_id}/location",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/location",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "location",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdLocationGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdMemberships",
    "resource": "Group",
    "operation": "List Memberships (via Group)",
    "description": "GET /groups/{group_id}/memberships",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdMyMembership",
    "resource": "Group",
    "operation": "List My Membership (via Group)",
    "description": "GET /groups/{group_id}/my_membership",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/my_membership",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMyMembershipGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdPeople",
    "resource": "Group",
    "operation": "List People (via Group)",
    "description": "GET /groups/{group_id}/people",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/people",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdPeopleGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "group": "order",
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdPerson_groupId"
            }
          ],
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
        "group": "order",
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
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdResourcesGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "order",
        "displayName": "Order",
        "group": "order",
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
    "lookupTarget": "tag",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsWhereid",
          "sourcePath": "/groups/v2/groups/{group_id}/tags",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdTags_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
      }
    ],
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
    "lookupTarget": "group application",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdApplicationsApplicationIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "applicationId",
        "sourceName": "application_id",
        "displayName": "Application ID",
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
    "id": "getGroupsGroupIdCampusesCampusId",
    "resource": "Group",
    "operation": "Get Campus (via Group)",
    "description": "GET /groups/{group_id}/campuses/{campus_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/campuses/{campus_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "campus",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdCampusesCampusIdGroupId",
          "sourcePath": "/groups/v2/campuses/{campus_id}/groups",
          "parentBindings": [
            {
              "sourceName": "campus_id",
              "fieldName": "getGroupsGroupIdCampusesCampusId_campusId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdCampusesCampusIdCampusId",
          "sourcePath": "/groups/v2/groups/{group_id}/campuses",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdCampusesCampusId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdEnrollment",
    "resource": "Group",
    "operation": "Get Enrollment (via Group)",
    "description": "GET /groups/{group_id}/enrollment",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/enrollment",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "enrollment",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdEnrollmentGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdEventsEventId",
    "resource": "Group",
    "operation": "Get Event (via Group)",
    "description": "GET /groups/{group_id}/events/{event_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdEventsEventIdGroupId",
          "sourcePath": "/groups/v2/events/{event_id}/group",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getGroupsGroupIdEventsEventId_eventId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdEventsEventIdEventId",
          "sourcePath": "/groups/v2/groups/{group_id}/events",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdEventsEventId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdMembershipsMembershipIdGroupGroupId",
    "resource": "Group",
    "operation": "Get Group (via Membership)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
            }
          ],
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
    "id": "getGroupsGroupIdTagsTagIdGroupsGroupId",
    "resource": "Group",
    "operation": "Get Group (via Tag)",
    "description": "GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsGroupIdTagId",
          "sourcePath": "/groups/v2/groups/{group_id}/tags",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdGroupTypeGroupTypeId",
    "resource": "Group",
    "operation": "Get Group Type (via Group)",
    "description": "GET /groups/{group_id}/group_type/{group_type_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/group_type/{group_type_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group type",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupId",
          "sourcePath": "/groups/v2/group_types/{group_type_id}/groups",
          "parentBindings": [
            {
              "sourceName": "group_type_id",
              "fieldName": "getGroupsGroupIdGroupTypeGroupTypeId_groupTypeId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "groupTypeId",
        "sourceName": "group_type_id",
        "displayName": "Group Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdGroupTypeGroupTypeId_groupId"
            }
          ],
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
    "id": "getGroupsGroupId",
    "resource": "Group",
    "operation": "Get Group",
    "description": "GET /groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "getGroupsGroupIdLocationLocationId",
    "resource": "Group",
    "operation": "Get Location (via Group)",
    "description": "GET /groups/{group_id}/location/{location_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/location/{location_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "location",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdLocationLocationIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "locationId",
        "sourceName": "location_id",
        "displayName": "Location ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdLocationLocationIdLocationId",
          "sourcePath": "/groups/v2/groups/{group_id}/location",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdLocationLocationId_groupId"
            }
          ],
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
    "id": "getGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "operation": "Get Membership (via Group)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipId_groupId"
            }
          ],
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
    "id": "getGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "Get My Membership (via Group)",
    "description": "GET /groups/{group_id}/my_membership/{my_membership_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/my_membership/{my_membership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMyMembershipMyMembershipIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "myMembershipId",
        "sourceName": "my_membership_id",
        "displayName": "My Membership ID",
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
    "id": "getGroupsGroupIdPeoplePersonId",
    "resource": "Group",
    "operation": "Get Person (via Group)",
    "description": "GET /groups/{group_id}/people/{person_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdPeoplePersonIdGroupId",
          "sourcePath": "/groups/v2/people/{person_id}/groups",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getGroupsGroupIdPeoplePersonId_personId"
            }
          ],
          "searchFilter": "where[name]",
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
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdPeoplePersonIdPersonId",
          "sourcePath": "/groups/v2/groups/{group_id}/people",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdPeoplePersonId_groupId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "id": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId",
    "resource": "Group",
    "operation": "Get Person (via Membership)",
    "description": "GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdGroupId",
          "sourcePath": "/groups/v2/people/{person_id}/groups",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_personId"
            }
          ],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_groupId"
            }
          ],
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
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdPersonId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships/{membership_id}/person",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_groupId"
            },
            {
              "sourceName": "membership_id",
              "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_membershipId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "id": "getGroupsGroupIdResourcesResourceId",
    "resource": "Group",
    "operation": "Get Resource (via Group)",
    "description": "GET /groups/{group_id}/resources/{resource_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/resources/{resource_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "resource",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdResourcesResourceIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "resourceId",
        "sourceName": "resource_id",
        "displayName": "Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdResourcesResourceIdResourceId",
          "sourcePath": "/groups/v2/groups/{group_id}/resources",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdResourcesResourceId_groupId"
            }
          ],
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
    "id": "getGroupsGroupIdTagsTagId",
    "resource": "Group",
    "operation": "Get Tag (via Group)",
    "description": "GET /groups/{group_id}/tags/{tag_id}",
    "method": "GET",
    "path": "/groups/v2/groups/{group_id}/tags/{tag_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "tag",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsTagIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetGroupsGroupIdTagsTagIdTagId",
          "sourcePath": "/groups/v2/groups/{group_id}/tags",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getGroupsGroupIdTagsTagId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "postGroupsGroupIdAssignCampuses",
    "resource": "Group",
    "operation": "Create Assign Campus (via Group)",
    "description": "POST /groups/{group_id}/assign_campuses",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/assign_campuses",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "assign campus",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupsGroupIdAssignCampusesGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "postGroupsGroupIdDisableChat",
    "resource": "Group",
    "operation": "Create Disable Chat (via Group)",
    "description": "POST /groups/{group_id}/disable_chat",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/disable_chat",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "disable chat",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupsGroupIdDisableChatGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "postGroupsGroupIdDuplicate",
    "resource": "Group",
    "operation": "Create Duplicate (via Group)",
    "description": "POST /groups/{group_id}/duplicate",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/duplicate",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "duplicate",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupsGroupIdDuplicateGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "postGroupsGroupIdEnableChat",
    "resource": "Group",
    "operation": "Create Enable Chat (via Group)",
    "description": "POST /groups/{group_id}/enable_chat",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/enable_chat",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "enable chat",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupsGroupIdEnableChatGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
    "id": "postGroupsGroupIdMemberships",
    "resource": "Group",
    "jsonApiType": "Membership",
    "operation": "Create Membership (via Group)",
    "description": "POST /groups/{group_id}/memberships",
    "method": "POST",
    "path": "/groups/v2/groups/{group_id}/memberships",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupsGroupIdMembershipsGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "displayName": "Person ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPostGroupsGroupIdMembershipsPersonId",
          "sourcePath": "/groups/v2/groups/{group_id}/people",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "postGroupsGroupIdMemberships_groupId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "relationshipFields": [
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false,
        "lookup": {
          "methodName": "searchPostGroupsGroupIdMembershipsPersonIds",
          "sourcePath": "/groups/v2/groups/{group_id}/people",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "postGroupsGroupIdMemberships_groupId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    ]
  },
  {
    "id": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId",
    "resource": "Group",
    "jsonApiType": "Group",
    "operation": "Update Group (via Membership)",
    "description": "PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}/group/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
            }
          ],
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
            }
          ],
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
    ]
  },
  {
    "id": "patchGroupsGroupIdTagsTagIdGroupsGroupId",
    "resource": "Group",
    "jsonApiType": "Group",
    "operation": "Update Group (via Tag)",
    "description": "PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/tags/{tag_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdTagId",
          "sourcePath": "/groups/v2/groups/{group_id}/tags",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
            }
          ],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
            }
          ],
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
    ]
  },
  {
    "id": "patchGroupsGroupId",
    "resource": "Group",
    "jsonApiType": "Group",
    "operation": "Update Group",
    "description": "PATCH /groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupId_groupId"
            }
          ],
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
    ]
  },
  {
    "id": "patchGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "jsonApiType": "Membership",
    "operation": "Update Membership (via Group)",
    "description": "PATCH /groups/{group_id}/memberships/{membership_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchGroupsGroupIdMembershipsMembershipId_groupId"
            }
          ],
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
    "jsonApiType": "Membership",
    "operation": "Update My Membership (via Group)",
    "description": "PATCH /groups/{group_id}/my_membership/{my_membership_id}",
    "method": "PATCH",
    "path": "/groups/v2/groups/{group_id}/my_membership/{my_membership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchGroupsGroupIdMyMembershipMyMembershipIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "myMembershipId",
        "sourceName": "my_membership_id",
        "displayName": "My Membership ID",
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
    "id": "deleteGroupsGroupIdMembershipsMembershipId",
    "resource": "Group",
    "operation": "Delete Membership (via Group)",
    "description": "DELETE /groups/{group_id}/memberships/{membership_id}",
    "method": "DELETE",
    "path": "/groups/v2/groups/{group_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteGroupsGroupIdMembershipsMembershipIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteGroupsGroupIdMembershipsMembershipIdMembershipId",
          "sourcePath": "/groups/v2/groups/{group_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "deleteGroupsGroupIdMembershipsMembershipId_groupId"
            }
          ],
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
    "id": "deleteGroupsGroupIdMyMembershipMyMembershipId",
    "resource": "Group",
    "operation": "Delete My Membership (via Group)",
    "description": "DELETE /groups/{group_id}/my_membership/{my_membership_id}",
    "method": "DELETE",
    "path": "/groups/v2/groups/{group_id}/my_membership/{my_membership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "my membership",
    "pathParameters": [
      {
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteGroupsGroupIdMyMembershipMyMembershipIdGroupId",
          "sourcePath": "/groups/v2/groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "myMembershipId",
        "sourceName": "my_membership_id",
        "displayName": "My Membership ID",
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
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdEventsPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "id": "getPeoplePersonIdGroups",
    "resource": "Person",
    "operation": "List Groups (via Person)",
    "description": "GET /people/{person_id}/groups",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/groups",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdGroupsPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "wheregroupTypeid",
        "displayName": "Group Type ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[group_type][id]",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdGroupsWheregroupTypeid",
          "sourcePath": "/groups/v2/group_types",
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
    "id": "getPeoplePersonIdMemberships",
    "resource": "Person",
    "operation": "List Memberships (via Person)",
    "description": "GET /people/{person_id}/memberships",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/memberships",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdMembershipsPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "id": "getPeople",
    "resource": "Person",
    "operation": "List People",
    "description": "GET /people",
    "method": "GET",
    "path": "/groups/v2/people",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "person",
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      }
    ],
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
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdEventsEventIdPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
        "name": "eventId",
        "sourceName": "event_id",
        "displayName": "Event ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdEventsEventIdEventId",
          "sourcePath": "/groups/v2/people/{person_id}/events",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdEventsEventId_personId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getPeoplePersonIdGroupsGroupId",
    "resource": "Person",
    "operation": "Get Group (via Person)",
    "description": "GET /people/{person_id}/groups/{group_id}",
    "method": "GET",
    "path": "/groups/v2/people/{person_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdGroupsGroupIdPersonId",
          "sourcePath": "/groups/v2/groups/{group_id}/people",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "getPeoplePersonIdGroupsGroupId_groupId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/people/{person_id}/groups",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdGroupsGroupId_personId"
            }
          ],
          "searchFilter": "where[name]",
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
    "path": "/groups/v2/me",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "person",
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
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
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdMembershipsMembershipIdPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdMembershipsMembershipIdMembershipId",
          "sourcePath": "/groups/v2/people/{person_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdMembershipsMembershipId_personId"
            }
          ],
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
    "path": "/groups/v2/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
    "id": "patchPeoplePersonIdGroupsGroupId",
    "resource": "Person",
    "jsonApiType": "Group",
    "operation": "Update Group (via Person)",
    "description": "PATCH /people/{person_id}/groups/{group_id}",
    "method": "PATCH",
    "path": "/groups/v2/people/{person_id}/groups/{group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "group",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchPeoplePersonIdGroupsGroupIdPersonId",
          "sourcePath": "/groups/v2/groups/{group_id}/people",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchPeoplePersonIdGroupsGroupId_groupId"
            }
          ],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
        "name": "groupId",
        "sourceName": "group_id",
        "displayName": "Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchPeoplePersonIdGroupsGroupIdGroupId",
          "sourcePath": "/groups/v2/people/{person_id}/groups",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "patchPeoplePersonIdGroupsGroupId_personId"
            }
          ],
          "searchFilter": "where[name]",
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
        "displayName": "Group Type ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchPeoplePersonIdGroupsGroupIdGroupTypeId",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchPeoplePersonIdGroupsGroupId_groupId"
            }
          ],
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
        "displayName": "Tag IDs",
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
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchPeoplePersonIdGroupsGroupIdGroupTypeIds",
          "sourcePath": "/groups/v2/groups/{group_id}/group_type",
          "parentBindings": [
            {
              "sourceName": "group_id",
              "fieldName": "patchPeoplePersonIdGroupsGroupId_groupId"
            }
          ],
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
    ]
  },
  {
    "id": "patchPeoplePersonIdMembershipsMembershipId",
    "resource": "Person",
    "jsonApiType": "Membership",
    "operation": "Update Membership (via Person)",
    "description": "PATCH /people/{person_id}/memberships/{membership_id}",
    "method": "PATCH",
    "path": "/groups/v2/people/{person_id}/memberships/{membership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchPeoplePersonIdMembershipsMembershipIdPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchPeoplePersonIdMembershipsMembershipIdMembershipId",
          "sourcePath": "/groups/v2/people/{person_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "patchPeoplePersonIdMembershipsMembershipId_personId"
            }
          ],
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
    "lookupTarget": "membership",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeletePeoplePersonIdMembershipsMembershipIdPersonId",
          "sourcePath": "/groups/v2/people",
          "parentBindings": [],
          "splitNameSearch": {
            "firstNameFilter": "where[first_name]",
            "lastNameFilter": "where[last_name]"
          },
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
        "name": "membershipId",
        "sourceName": "membership_id",
        "displayName": "Membership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeletePeoplePersonIdMembershipsMembershipIdMembershipId",
          "sourcePath": "/groups/v2/people/{person_id}/memberships",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "deletePeoplePersonIdMembershipsMembershipId_personId"
            }
          ],
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
    "id": "getTagGroups",
    "resource": "Tag Group",
    "operation": "List Tag Groups",
    "description": "GET /tag_groups",
    "method": "GET",
    "path": "/groups/v2/tag_groups",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "tag group",
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
    "lookupTarget": "tag",
    "pathParameters": [
      {
        "name": "tagGroupId",
        "sourceName": "tag_group_id",
        "displayName": "Tag Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetTagGroupsTagGroupIdTagsTagGroupId",
          "sourcePath": "/groups/v2/tag_groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetTagGroupsTagGroupIdTagsWhereid",
          "sourcePath": "/groups/v2/tag_groups/{tag_group_id}/tags",
          "parentBindings": [
            {
              "sourceName": "tag_group_id",
              "fieldName": "getTagGroupsTagGroupIdTags_tagGroupId"
            }
          ],
          "searchFilter": "where[name]",
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
      }
    ],
    "attributeFields": [],
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
    "lookupTarget": "tag",
    "pathParameters": [
      {
        "name": "tagGroupId",
        "sourceName": "tag_group_id",
        "displayName": "Tag Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetTagGroupsTagGroupIdTagsTagIdTagGroupId",
          "sourcePath": "/groups/v2/tag_groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
        "name": "tagId",
        "sourceName": "tag_id",
        "displayName": "Tag ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetTagGroupsTagGroupIdTagsTagIdTagId",
          "sourcePath": "/groups/v2/tag_groups/{tag_group_id}/tags",
          "parentBindings": [
            {
              "sourceName": "tag_group_id",
              "fieldName": "getTagGroupsTagGroupIdTagsTagId_tagGroupId"
            }
          ],
          "searchFilter": "where[name]",
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
    "id": "getTagGroupsTagGroupId",
    "resource": "Tag Group",
    "operation": "Get Tag Group",
    "description": "GET /tag_groups/{tag_group_id}",
    "method": "GET",
    "path": "/groups/v2/tag_groups/{tag_group_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "tag group",
    "pathParameters": [
      {
        "name": "tagGroupId",
        "sourceName": "tag_group_id",
        "displayName": "Tag Group ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetTagGroupsTagGroupIdTagGroupId",
          "sourcePath": "/groups/v2/tag_groups",
          "parentBindings": [],
          "searchFilter": "where[name]",
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
  "searchDeleteGroupsGroupIdMembershipsMembershipIdGroupId": {
    "methodName": "searchDeleteGroupsGroupIdMembershipsMembershipIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchDeleteGroupsGroupIdMembershipsMembershipIdMembershipId": {
    "methodName": "searchDeleteGroupsGroupIdMembershipsMembershipIdMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "deleteGroupsGroupIdMembershipsMembershipId_groupId"
      }
    ],
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
  "searchDeleteGroupsGroupIdMyMembershipMyMembershipIdGroupId": {
    "methodName": "searchDeleteGroupsGroupIdMyMembershipMyMembershipIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchDeletePeoplePersonIdMembershipsMembershipIdMembershipId": {
    "methodName": "searchDeletePeoplePersonIdMembershipsMembershipIdMembershipId",
    "sourcePath": "/groups/v2/people/{person_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "deletePeoplePersonIdMembershipsMembershipId_personId"
      }
    ],
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
  "searchDeletePeoplePersonIdMembershipsMembershipIdPersonId": {
    "methodName": "searchDeletePeoplePersonIdMembershipsMembershipIdPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetCampusesCampusIdCampusId": {
    "methodName": "searchGetCampusesCampusIdCampusId",
    "sourcePath": "/groups/v2/campuses",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetCampusesCampusIdGroupsCampusId": {
    "methodName": "searchGetCampusesCampusIdGroupsCampusId",
    "sourcePath": "/groups/v2/campuses",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetCampusesCampusIdGroupsGroupIdCampusId": {
    "methodName": "searchGetCampusesCampusIdGroupsGroupIdCampusId",
    "sourcePath": "/groups/v2/groups/{group_id}/campuses",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getCampusesCampusIdGroupsGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetCampusesCampusIdGroupsGroupIdGroupId": {
    "methodName": "searchGetCampusesCampusIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/campuses/{campus_id}/groups",
    "parentBindings": [
      {
        "sourceName": "campus_id",
        "fieldName": "getCampusesCampusIdGroupsGroupId_campusId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetCampusesCampusIdGroupsWheregroupTypeid": {
    "methodName": "searchGetCampusesCampusIdGroupsWheregroupTypeid",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetCampusesWhereid": {
    "methodName": "searchGetCampusesWhereid",
    "sourcePath": "/groups/v2/campuses",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdAttendancesAttendanceIdPersonAttendanceId": {
    "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonAttendanceId",
    "sourcePath": "/groups/v2/events/{event_id}/attendances",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdAttendancesAttendanceIdPerson_eventId"
      }
    ],
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
  "searchGetEventsEventIdAttendancesAttendanceIdPersonEventId": {
    "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdAttendanceId": {
    "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdAttendanceId",
    "sourcePath": "/groups/v2/events/{event_id}/attendances",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_eventId"
      }
    ],
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
  "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdEventId": {
    "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdEventId",
    "sourcePath": "/groups/v2/people/{person_id}/events",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_personId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdPersonId": {
    "methodName": "searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdPersonId",
    "sourcePath": "/groups/v2/events/{event_id}/attendances/{attendance_id}/person",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_eventId"
      },
      {
        "sourceName": "attendance_id",
        "fieldName": "getEventsEventIdAttendancesAttendanceIdPersonPersonId_attendanceId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetEventsEventIdAttendancesEventId": {
    "methodName": "searchGetEventsEventIdAttendancesEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdEventId": {
    "methodName": "searchGetEventsEventIdEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdGroupEventId": {
    "methodName": "searchGetEventsEventIdGroupEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdGroupGroupIdEventId": {
    "methodName": "searchGetEventsEventIdGroupGroupIdEventId",
    "sourcePath": "/groups/v2/groups/{group_id}/events",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getEventsEventIdGroupGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdGroupGroupIdGroupId": {
    "methodName": "searchGetEventsEventIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/events/{event_id}/group",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdGroupGroupId_eventId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdGroupWheregroupTypeid": {
    "methodName": "searchGetEventsEventIdGroupWheregroupTypeid",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetEventsEventIdLocationEventId": {
    "methodName": "searchGetEventsEventIdLocationEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdLocationLocationIdEventId": {
    "methodName": "searchGetEventsEventIdLocationLocationIdEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdLocationLocationIdGroupEventId": {
    "methodName": "searchGetEventsEventIdLocationLocationIdGroupEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdLocationLocationIdGroupGroupIdEventId": {
    "methodName": "searchGetEventsEventIdLocationLocationIdGroupGroupIdEventId",
    "sourcePath": "/groups/v2/groups/{group_id}/events",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdLocationLocationIdGroupGroupIdGroupId": {
    "methodName": "searchGetEventsEventIdLocationLocationIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/events/{event_id}/location/{location_id}/group",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_eventId"
      },
      {
        "sourceName": "location_id",
        "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_locationId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdLocationLocationIdGroupGroupIdLocationId": {
    "methodName": "searchGetEventsEventIdLocationLocationIdGroupGroupIdLocationId",
    "sourcePath": "/groups/v2/events/{event_id}/location",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdLocationLocationIdGroupGroupId_eventId"
      }
    ],
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
  "searchGetEventsEventIdLocationLocationIdGroupLocationId": {
    "methodName": "searchGetEventsEventIdLocationLocationIdGroupLocationId",
    "sourcePath": "/groups/v2/events/{event_id}/location",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdLocationLocationIdGroup_eventId"
      }
    ],
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
  "searchGetEventsEventIdLocationLocationIdGroupWheregroupTypeid": {
    "methodName": "searchGetEventsEventIdLocationLocationIdGroupWheregroupTypeid",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetEventsEventIdLocationLocationIdLocationId": {
    "methodName": "searchGetEventsEventIdLocationLocationIdLocationId",
    "sourcePath": "/groups/v2/events/{event_id}/location",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdLocationLocationId_eventId"
      }
    ],
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
  "searchGetEventsEventIdNotesEventId": {
    "methodName": "searchGetEventsEventIdNotesEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdNotesEventNoteIdOwnerEventId": {
    "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdNotesEventNoteIdOwnerEventNoteId": {
    "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerEventNoteId",
    "sourcePath": "/groups/v2/events/{event_id}/notes",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdNotesEventNoteIdOwner_eventId"
      }
    ],
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
  "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventId": {
    "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventNoteId": {
    "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventNoteId",
    "sourcePath": "/groups/v2/events/{event_id}/notes",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventId"
      }
    ],
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
  "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdOwnerId": {
    "methodName": "searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdOwnerId",
    "sourcePath": "/groups/v2/events/{event_id}/notes/{event_note_id}/owner",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventId"
      },
      {
        "sourceName": "event_note_id",
        "fieldName": "getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventNoteId"
      }
    ],
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
  "searchGetEventsEventIdNotesNoteIdEventId": {
    "methodName": "searchGetEventsEventIdNotesNoteIdEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetEventsEventIdRsvpsEventId": {
    "methodName": "searchGetEventsEventIdRsvpsEventId",
    "sourcePath": "/groups/v2/events",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupApplicationsGroupApplicationIdGroupApplicationId": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupApplicationId",
    "sourcePath": "/groups/v2/group_applications",
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
  "searchGetGroupApplicationsGroupApplicationIdGroupGroupApplicationId": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupGroupApplicationId",
    "sourcePath": "/groups/v2/group_applications",
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
  "searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId",
    "sourcePath": "/groups/v2/groups/{group_id}/applications",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
      }
    ],
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
  "searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupId": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/group_applications/{group_application_id}/group",
    "parentBindings": [
      {
        "sourceName": "group_application_id",
        "fieldName": "getGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupApplicationsGroupApplicationIdGroupWheregroupTypeid": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdGroupWheregroupTypeid",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupApplicationsGroupApplicationIdPersonGroupApplicationId": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdPersonGroupApplicationId",
    "sourcePath": "/groups/v2/group_applications",
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
  "searchGetGroupApplicationsGroupApplicationIdPersonPersonIdGroupApplicationId": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdPersonPersonIdGroupApplicationId",
    "sourcePath": "/groups/v2/group_applications",
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
  "searchGetGroupApplicationsGroupApplicationIdPersonPersonIdPersonId": {
    "methodName": "searchGetGroupApplicationsGroupApplicationIdPersonPersonIdPersonId",
    "sourcePath": "/groups/v2/group_applications/{group_application_id}/person",
    "parentBindings": [
      {
        "sourceName": "group_application_id",
        "fieldName": "getGroupApplicationsGroupApplicationIdPersonPersonId_groupApplicationId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetGroupsGroupIdApplicationsApplicationIdGroupId": {
    "methodName": "searchGetGroupsGroupIdApplicationsApplicationIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdApplicationsGroupId": {
    "methodName": "searchGetGroupsGroupIdApplicationsGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdCampusesCampusIdCampusId": {
    "methodName": "searchGetGroupsGroupIdCampusesCampusIdCampusId",
    "sourcePath": "/groups/v2/groups/{group_id}/campuses",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdCampusesCampusId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdCampusesCampusIdGroupId": {
    "methodName": "searchGetGroupsGroupIdCampusesCampusIdGroupId",
    "sourcePath": "/groups/v2/campuses/{campus_id}/groups",
    "parentBindings": [
      {
        "sourceName": "campus_id",
        "fieldName": "getGroupsGroupIdCampusesCampusId_campusId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdCampusesGroupId": {
    "methodName": "searchGetGroupsGroupIdCampusesGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdCampusesWhereid": {
    "methodName": "searchGetGroupsGroupIdCampusesWhereid",
    "sourcePath": "/groups/v2/groups/{group_id}/campuses",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdCampuses_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdEnrollmentGroupId": {
    "methodName": "searchGetGroupsGroupIdEnrollmentGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdEventsEventIdEventId": {
    "methodName": "searchGetGroupsGroupIdEventsEventIdEventId",
    "sourcePath": "/groups/v2/groups/{group_id}/events",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdEventsEventId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdEventsEventIdGroupId": {
    "methodName": "searchGetGroupsGroupIdEventsEventIdGroupId",
    "sourcePath": "/groups/v2/events/{event_id}/group",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getGroupsGroupIdEventsEventId_eventId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdEventsGroupId": {
    "methodName": "searchGetGroupsGroupIdEventsGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdGroupId": {
    "methodName": "searchGetGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdGroupTypeGroupId": {
    "methodName": "searchGetGroupsGroupIdGroupTypeGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupId": {
    "methodName": "searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/groups",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupsGroupIdGroupTypeGroupTypeId_groupTypeId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupTypeId": {
    "methodName": "searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdGroupTypeGroupTypeId_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdGroupTypeWhereid": {
    "methodName": "searchGetGroupsGroupIdGroupTypeWhereid",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdGroupType_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdLocationGroupId": {
    "methodName": "searchGetGroupsGroupIdLocationGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdLocationLocationIdGroupId": {
    "methodName": "searchGetGroupsGroupIdLocationLocationIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdLocationLocationIdLocationId": {
    "methodName": "searchGetGroupsGroupIdLocationLocationIdLocationId",
    "sourcePath": "/groups/v2/groups/{group_id}/location",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdLocationLocationId_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdMembershipsGroupId": {
    "methodName": "searchGetGroupsGroupIdMembershipsGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdMembershipsMembershipIdGroupId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdMembershipsMembershipIdGroupMembershipId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdGroup_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdMembershipsMembershipIdGroupWheregroupTypeid": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdGroupWheregroupTypeid",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdGroup_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdMembershipsMembershipIdMembershipId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipId_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdMembershipsMembershipIdPersonGroupId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdMembershipsMembershipIdPersonMembershipId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdPerson_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdGroupId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdGroupId",
    "sourcePath": "/groups/v2/people/{person_id}/groups",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_personId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdMembershipId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdPersonId": {
    "methodName": "searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdPersonId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships/{membership_id}/person",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_groupId"
      },
      {
        "sourceName": "membership_id",
        "fieldName": "getGroupsGroupIdMembershipsMembershipIdPersonPersonId_membershipId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetGroupsGroupIdMyMembershipGroupId": {
    "methodName": "searchGetGroupsGroupIdMyMembershipGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdMyMembershipMyMembershipIdGroupId": {
    "methodName": "searchGetGroupsGroupIdMyMembershipMyMembershipIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdPeopleGroupId": {
    "methodName": "searchGetGroupsGroupIdPeopleGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdPeoplePersonIdGroupId": {
    "methodName": "searchGetGroupsGroupIdPeoplePersonIdGroupId",
    "sourcePath": "/groups/v2/people/{person_id}/groups",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getGroupsGroupIdPeoplePersonId_personId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdPeoplePersonIdPersonId": {
    "methodName": "searchGetGroupsGroupIdPeoplePersonIdPersonId",
    "sourcePath": "/groups/v2/groups/{group_id}/people",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdPeoplePersonId_groupId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetGroupsGroupIdResourcesGroupId": {
    "methodName": "searchGetGroupsGroupIdResourcesGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdResourcesResourceIdGroupId": {
    "methodName": "searchGetGroupsGroupIdResourcesResourceIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdResourcesResourceIdResourceId": {
    "methodName": "searchGetGroupsGroupIdResourcesResourceIdResourceId",
    "sourcePath": "/groups/v2/groups/{group_id}/resources",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdResourcesResourceId_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdTagsGroupId": {
    "methodName": "searchGetGroupsGroupIdTagsGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdTagsTagIdGroupId": {
    "methodName": "searchGetGroupsGroupIdTagsTagIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdTagsTagIdGroupsGroupId": {
    "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdTagsTagIdGroupsGroupIdGroupId": {
    "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdTagsTagIdGroupsGroupIdTagId": {
    "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsGroupIdTagId",
    "sourcePath": "/groups/v2/groups/{group_id}/tags",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdTagsTagIdGroupsTagId": {
    "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsTagId",
    "sourcePath": "/groups/v2/groups/{group_id}/tags",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdTagsTagIdGroups_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdTagsTagIdGroupsWheregroupTypeid": {
    "methodName": "searchGetGroupsGroupIdTagsTagIdGroupsWheregroupTypeid",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdTagsTagIdGroups_groupId"
      }
    ],
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
  "searchGetGroupsGroupIdTagsTagIdTagId": {
    "methodName": "searchGetGroupsGroupIdTagsTagIdTagId",
    "sourcePath": "/groups/v2/groups/{group_id}/tags",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdTagsTagId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsGroupIdTagsWhereid": {
    "methodName": "searchGetGroupsGroupIdTagsWhereid",
    "sourcePath": "/groups/v2/groups/{group_id}/tags",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupsGroupIdTags_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupsWheregroupTypeid": {
    "methodName": "searchGetGroupsWheregroupTypeid",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdEventsEventIdEventId": {
    "methodName": "searchGetGroupTypesGroupTypeIdEventsEventIdEventId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/events",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupTypesGroupTypeIdEventsEventId_groupTypeId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupTypesGroupTypeIdEventsEventIdGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdEventsEventIdGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdEventsGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdEventsGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupId": {
    "methodName": "searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/groups",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupTypesGroupTypeIdGroupsGroupId_groupTypeId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getGroupTypesGroupTypeIdGroupsGroupId_groupId"
      }
    ],
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
  "searchGetGroupTypesGroupTypeIdGroupsGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdGroupsGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdResourcesGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdResourceId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdResourceId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_groupTypeId"
      }
    ],
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadResourceId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadResourceId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdDownload_groupTypeId"
      }
    ],
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdResourceId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdResourceId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupTypesGroupTypeIdResourcesResourceId_groupTypeId"
      }
    ],
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitResourceId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitResourceId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdVisit_groupTypeId"
      }
    ],
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdGroupTypeId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdGroupTypeId",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdResourceId": {
    "methodName": "searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdResourceId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/resources",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_groupTypeId"
      }
    ],
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
  "searchGetGroupTypesWhereid": {
    "methodName": "searchGetGroupTypesWhereid",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetPeoplePersonIdEventsEventIdEventId": {
    "methodName": "searchGetPeoplePersonIdEventsEventIdEventId",
    "sourcePath": "/groups/v2/people/{person_id}/events",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getPeoplePersonIdEventsEventId_personId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetPeoplePersonIdEventsEventIdPersonId": {
    "methodName": "searchGetPeoplePersonIdEventsEventIdPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetPeoplePersonIdEventsPersonId": {
    "methodName": "searchGetPeoplePersonIdEventsPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetPeoplePersonIdGroupsGroupIdGroupId": {
    "methodName": "searchGetPeoplePersonIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/people/{person_id}/groups",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getPeoplePersonIdGroupsGroupId_personId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetPeoplePersonIdGroupsGroupIdPersonId": {
    "methodName": "searchGetPeoplePersonIdGroupsGroupIdPersonId",
    "sourcePath": "/groups/v2/groups/{group_id}/people",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "getPeoplePersonIdGroupsGroupId_groupId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetPeoplePersonIdGroupsPersonId": {
    "methodName": "searchGetPeoplePersonIdGroupsPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetPeoplePersonIdGroupsWheregroupTypeid": {
    "methodName": "searchGetPeoplePersonIdGroupsWheregroupTypeid",
    "sourcePath": "/groups/v2/group_types",
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
  "searchGetPeoplePersonIdMembershipsMembershipIdMembershipId": {
    "methodName": "searchGetPeoplePersonIdMembershipsMembershipIdMembershipId",
    "sourcePath": "/groups/v2/people/{person_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getPeoplePersonIdMembershipsMembershipId_personId"
      }
    ],
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
  "searchGetPeoplePersonIdMembershipsMembershipIdPersonId": {
    "methodName": "searchGetPeoplePersonIdMembershipsMembershipIdPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetPeoplePersonIdMembershipsPersonId": {
    "methodName": "searchGetPeoplePersonIdMembershipsPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetPeoplePersonIdPersonId": {
    "methodName": "searchGetPeoplePersonIdPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchGetTagGroupsTagGroupIdTagGroupId": {
    "methodName": "searchGetTagGroupsTagGroupIdTagGroupId",
    "sourcePath": "/groups/v2/tag_groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetTagGroupsTagGroupIdTagsTagGroupId": {
    "methodName": "searchGetTagGroupsTagGroupIdTagsTagGroupId",
    "sourcePath": "/groups/v2/tag_groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetTagGroupsTagGroupIdTagsTagIdTagGroupId": {
    "methodName": "searchGetTagGroupsTagGroupIdTagsTagIdTagGroupId",
    "sourcePath": "/groups/v2/tag_groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchGetTagGroupsTagGroupIdTagsTagIdTagId": {
    "methodName": "searchGetTagGroupsTagGroupIdTagsTagIdTagId",
    "sourcePath": "/groups/v2/tag_groups/{tag_group_id}/tags",
    "parentBindings": [
      {
        "sourceName": "tag_group_id",
        "fieldName": "getTagGroupsTagGroupIdTagsTagId_tagGroupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchGetTagGroupsTagGroupIdTagsWhereid": {
    "methodName": "searchGetTagGroupsTagGroupIdTagsWhereid",
    "sourcePath": "/groups/v2/tag_groups/{tag_group_id}/tags",
    "parentBindings": [
      {
        "sourceName": "tag_group_id",
        "fieldName": "getTagGroupsTagGroupIdTags_tagGroupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchCampusesCampusIdGroupsGroupIdCampusId": {
    "methodName": "searchPatchCampusesCampusIdGroupsGroupIdCampusId",
    "sourcePath": "/groups/v2/groups/{group_id}/campuses",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchCampusesCampusIdGroupsGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchCampusesCampusIdGroupsGroupIdGroupId": {
    "methodName": "searchPatchCampusesCampusIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/campuses/{campus_id}/groups",
    "parentBindings": [
      {
        "sourceName": "campus_id",
        "fieldName": "patchCampusesCampusIdGroupsGroupId_campusId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchCampusesCampusIdGroupsGroupIdGroupTypeId": {
    "methodName": "searchPatchCampusesCampusIdGroupsGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchCampusesCampusIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchCampusesCampusIdGroupsGroupIdGroupTypeIds": {
    "methodName": "searchPatchCampusesCampusIdGroupsGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchCampusesCampusIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchEventsEventIdGroupGroupIdEventId": {
    "methodName": "searchPatchEventsEventIdGroupGroupIdEventId",
    "sourcePath": "/groups/v2/groups/{group_id}/events",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchEventsEventIdGroupGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchEventsEventIdGroupGroupIdGroupId": {
    "methodName": "searchPatchEventsEventIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/events/{event_id}/group",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "patchEventsEventIdGroupGroupId_eventId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchEventsEventIdGroupGroupIdGroupTypeId": {
    "methodName": "searchPatchEventsEventIdGroupGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchEventsEventIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchEventsEventIdGroupGroupIdGroupTypeIds": {
    "methodName": "searchPatchEventsEventIdGroupGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchEventsEventIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchEventsEventIdLocationLocationIdGroupGroupIdEventId": {
    "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdEventId",
    "sourcePath": "/groups/v2/groups/{group_id}/events",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupId": {
    "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/events/{event_id}/location/{location_id}/group",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_eventId"
      },
      {
        "sourceName": "location_id",
        "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_locationId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeId": {
    "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeIds": {
    "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchEventsEventIdLocationLocationIdGroupGroupIdLocationId": {
    "methodName": "searchPatchEventsEventIdLocationLocationIdGroupGroupIdLocationId",
    "sourcePath": "/groups/v2/events/{event_id}/location",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "patchEventsEventIdLocationLocationIdGroupGroupId_eventId"
      }
    ],
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
  "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId": {
    "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId",
    "sourcePath": "/groups/v2/groups/{group_id}/applications",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupId": {
    "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/group_applications/{group_application_id}/group",
    "parentBindings": [
      {
        "sourceName": "group_application_id",
        "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeId": {
    "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeIds": {
    "methodName": "searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdGroupId": {
    "methodName": "searchPatchGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPatchGroupsGroupIdGroupTypeId": {
    "methodName": "searchPatchGroupsGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdGroupTypeIds": {
    "methodName": "searchPatchGroupsGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId": {
    "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeId": {
    "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeIds": {
    "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId": {
    "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdMembershipsMembershipIdGroupId": {
    "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPatchGroupsGroupIdMembershipsMembershipIdMembershipId": {
    "methodName": "searchPatchGroupsGroupIdMembershipsMembershipIdMembershipId",
    "sourcePath": "/groups/v2/groups/{group_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupIdMembershipsMembershipId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdMyMembershipMyMembershipIdGroupId": {
    "methodName": "searchPatchGroupsGroupIdMyMembershipMyMembershipIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupId": {
    "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeId": {
    "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeIds": {
    "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdTagId": {
    "methodName": "searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdTagId",
    "sourcePath": "/groups/v2/groups/{group_id}/tags",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupId": {
    "methodName": "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/group_types/{group_type_id}/groups",
    "parentBindings": [
      {
        "sourceName": "group_type_id",
        "fieldName": "patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId": {
    "methodName": "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupTypesGroupTypeIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeIds": {
    "methodName": "searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchGroupTypesGroupTypeIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchPeoplePersonIdGroupsGroupIdGroupId": {
    "methodName": "searchPatchPeoplePersonIdGroupsGroupIdGroupId",
    "sourcePath": "/groups/v2/people/{person_id}/groups",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "patchPeoplePersonIdGroupsGroupId_personId"
      }
    ],
    "searchFilter": "where[name]",
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
  "searchPatchPeoplePersonIdGroupsGroupIdGroupTypeId": {
    "methodName": "searchPatchPeoplePersonIdGroupsGroupIdGroupTypeId",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchPeoplePersonIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchPeoplePersonIdGroupsGroupIdGroupTypeIds": {
    "methodName": "searchPatchPeoplePersonIdGroupsGroupIdGroupTypeIds",
    "sourcePath": "/groups/v2/groups/{group_id}/group_type",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchPeoplePersonIdGroupsGroupId_groupId"
      }
    ],
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
  "searchPatchPeoplePersonIdGroupsGroupIdPersonId": {
    "methodName": "searchPatchPeoplePersonIdGroupsGroupIdPersonId",
    "sourcePath": "/groups/v2/groups/{group_id}/people",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "patchPeoplePersonIdGroupsGroupId_groupId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchPatchPeoplePersonIdMembershipsMembershipIdMembershipId": {
    "methodName": "searchPatchPeoplePersonIdMembershipsMembershipIdMembershipId",
    "sourcePath": "/groups/v2/people/{person_id}/memberships",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "patchPeoplePersonIdMembershipsMembershipId_personId"
      }
    ],
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
  "searchPatchPeoplePersonIdMembershipsMembershipIdPersonId": {
    "methodName": "searchPatchPeoplePersonIdMembershipsMembershipIdPersonId",
    "sourcePath": "/groups/v2/people",
    "parentBindings": [],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchPostGroupApplicationsGroupApplicationIdApproveGroupApplicationId": {
    "methodName": "searchPostGroupApplicationsGroupApplicationIdApproveGroupApplicationId",
    "sourcePath": "/groups/v2/group_applications",
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
  "searchPostGroupApplicationsGroupApplicationIdRejectGroupApplicationId": {
    "methodName": "searchPostGroupApplicationsGroupApplicationIdRejectGroupApplicationId",
    "sourcePath": "/groups/v2/group_applications",
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
  "searchPostGroupsGroupIdAssignCampusesGroupId": {
    "methodName": "searchPostGroupsGroupIdAssignCampusesGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPostGroupsGroupIdDisableChatGroupId": {
    "methodName": "searchPostGroupsGroupIdDisableChatGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPostGroupsGroupIdDuplicateGroupId": {
    "methodName": "searchPostGroupsGroupIdDuplicateGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPostGroupsGroupIdEnableChatGroupId": {
    "methodName": "searchPostGroupsGroupIdEnableChatGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPostGroupsGroupIdMembershipsGroupId": {
    "methodName": "searchPostGroupsGroupIdMembershipsGroupId",
    "sourcePath": "/groups/v2/groups",
    "parentBindings": [],
    "searchFilter": "where[name]",
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
  "searchPostGroupsGroupIdMembershipsPersonId": {
    "methodName": "searchPostGroupsGroupIdMembershipsPersonId",
    "sourcePath": "/groups/v2/groups/{group_id}/people",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "postGroupsGroupIdMemberships_groupId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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
  "searchPostGroupsGroupIdMembershipsPersonIds": {
    "methodName": "searchPostGroupsGroupIdMembershipsPersonIds",
    "sourcePath": "/groups/v2/groups/{group_id}/people",
    "parentBindings": [
      {
        "sourceName": "group_id",
        "fieldName": "postGroupsGroupIdMemberships_groupId"
      }
    ],
    "splitNameSearch": {
      "firstNameFilter": "where[first_name]",
      "lastNameFilter": "where[last_name]"
    },
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

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Campus\",\"value\":\"Campus\"},{\"name\":\"Event\",\"value\":\"Event\"},{\"name\":\"Group\",\"value\":\"Group\"},{\"name\":\"Group Application\",\"value\":\"Group Application\"},{\"name\":\"Group Type\",\"value\":\"Group Type\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Tag Group\",\"value\":\"Tag Group\"}],\n      default: \"Campus\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"]}},\n      options: [{\"name\":\"List Campuses\",\"value\":\"getCampuses\",\"description\":\"GET /campuses\",\"action\":\"List Campuses\"},{\"name\":\"List Groups (via Campus)\",\"value\":\"getCampusesCampusIdGroups\",\"description\":\"GET /campuses/{campus_id}/groups\",\"action\":\"List Groups (via Campus)\"},{\"name\":\"Get Campus\",\"value\":\"getCampusesCampusId\",\"description\":\"GET /campuses/{campus_id}\",\"action\":\"Get Campus\"},{\"name\":\"Get Group (via Campus)\",\"value\":\"getCampusesCampusIdGroupsGroupId\",\"description\":\"GET /campuses/{campus_id}/groups/{group_id}\",\"action\":\"Get Group (via Campus)\"},{\"name\":\"Update Group (via Campus)\",\"value\":\"patchCampusesCampusIdGroupsGroupId\",\"description\":\"PATCH /campuses/{campus_id}/groups/{group_id}\",\"action\":\"Update Group (via Campus)\"}],\n      default: \"getCampuses\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"]}},\n      options: [{\"name\":\"List Attendances (via Event)\",\"value\":\"getEventsEventIdAttendances\",\"description\":\"GET /events/{event_id}/attendances\",\"action\":\"List Attendances (via Event)\"},{\"name\":\"List Events\",\"value\":\"getEvents\",\"description\":\"GET /events\",\"action\":\"List Events\"},{\"name\":\"List Group (via Event)\",\"value\":\"getEventsEventIdGroup\",\"description\":\"GET /events/{event_id}/group\",\"action\":\"List Group (via Event)\"},{\"name\":\"List Group (via Location)\",\"value\":\"getEventsEventIdLocationLocationIdGroup\",\"description\":\"GET /events/{event_id}/location/{location_id}/group\",\"action\":\"List Group (via Location)\"},{\"name\":\"List Location (via Event)\",\"value\":\"getEventsEventIdLocation\",\"description\":\"GET /events/{event_id}/location\",\"action\":\"List Location (via Event)\"},{\"name\":\"List Notes (via Event)\",\"value\":\"getEventsEventIdNotes\",\"description\":\"GET /events/{event_id}/notes\",\"action\":\"List Notes (via Event)\"},{\"name\":\"List Owner (via Note)\",\"value\":\"getEventsEventIdNotesEventNoteIdOwner\",\"description\":\"GET /events/{event_id}/notes/{event_note_id}/owner\",\"action\":\"List Owner (via Note)\"},{\"name\":\"List Person (via Attendance)\",\"value\":\"getEventsEventIdAttendancesAttendanceIdPerson\",\"description\":\"GET /events/{event_id}/attendances/{attendance_id}/person\",\"action\":\"List Person (via Attendance)\"},{\"name\":\"List Rsvps (via Event)\",\"value\":\"getEventsEventIdRsvps\",\"description\":\"GET /events/{event_id}/rsvps\",\"action\":\"List Rsvps (via Event)\"},{\"name\":\"Get Event\",\"value\":\"getEventsEventId\",\"description\":\"GET /events/{event_id}\",\"action\":\"Get Event\"},{\"name\":\"Get Group (via Event)\",\"value\":\"getEventsEventIdGroupGroupId\",\"description\":\"GET /events/{event_id}/group/{group_id}\",\"action\":\"Get Group (via Event)\"},{\"name\":\"Get Group (via Location)\",\"value\":\"getEventsEventIdLocationLocationIdGroupGroupId\",\"description\":\"GET /events/{event_id}/location/{location_id}/group/{group_id}\",\"action\":\"Get Group (via Location)\"},{\"name\":\"Get Location (via Event)\",\"value\":\"getEventsEventIdLocationLocationId\",\"description\":\"GET /events/{event_id}/location/{location_id}\",\"action\":\"Get Location (via Event)\"},{\"name\":\"Get Note (via Event)\",\"value\":\"getEventsEventIdNotesNoteId\",\"description\":\"GET /events/{event_id}/notes/{note_id}\",\"action\":\"Get Note (via Event)\"},{\"name\":\"Get Owner (via Note)\",\"value\":\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\",\"description\":\"GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}\",\"action\":\"Get Owner (via Note)\"},{\"name\":\"Get Person (via Attendance)\",\"value\":\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\",\"description\":\"GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}\",\"action\":\"Get Person (via Attendance)\"},{\"name\":\"Update Group (via Event)\",\"value\":\"patchEventsEventIdGroupGroupId\",\"description\":\"PATCH /events/{event_id}/group/{group_id}\",\"action\":\"Update Group (via Event)\"},{\"name\":\"Update Group (via Location)\",\"value\":\"patchEventsEventIdLocationLocationIdGroupGroupId\",\"description\":\"PATCH /events/{event_id}/location/{location_id}/group/{group_id}\",\"action\":\"Update Group (via Location)\"}],\n      default: \"getEventsEventIdAttendances\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"]}},\n      options: [{\"name\":\"List Applications (via Group)\",\"value\":\"getGroupsGroupIdApplications\",\"description\":\"GET /groups/{group_id}/applications\",\"action\":\"List Applications (via Group)\"},{\"name\":\"List Campuses (via Group)\",\"value\":\"getGroupsGroupIdCampuses\",\"description\":\"GET /groups/{group_id}/campuses\",\"action\":\"List Campuses (via Group)\"},{\"name\":\"List Events (via Group)\",\"value\":\"getGroupsGroupIdEvents\",\"description\":\"GET /groups/{group_id}/events\",\"action\":\"List Events (via Group)\"},{\"name\":\"List Group (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdGroup\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/group\",\"action\":\"List Group (via Membership)\"},{\"name\":\"List Group Type (via Group)\",\"value\":\"getGroupsGroupIdGroupType\",\"description\":\"GET /groups/{group_id}/group_type\",\"action\":\"List Group Type (via Group)\"},{\"name\":\"List Groups (via Tag)\",\"value\":\"getGroupsGroupIdTagsTagIdGroups\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}/groups\",\"action\":\"List Groups (via Tag)\"},{\"name\":\"List Groups\",\"value\":\"getGroups\",\"description\":\"GET /groups\",\"action\":\"List Groups\"},{\"name\":\"List Location (via Group)\",\"value\":\"getGroupsGroupIdLocation\",\"description\":\"GET /groups/{group_id}/location\",\"action\":\"List Location (via Group)\"},{\"name\":\"List Memberships (via Group)\",\"value\":\"getGroupsGroupIdMemberships\",\"description\":\"GET /groups/{group_id}/memberships\",\"action\":\"List Memberships (via Group)\"},{\"name\":\"List My Membership (via Group)\",\"value\":\"getGroupsGroupIdMyMembership\",\"description\":\"GET /groups/{group_id}/my_membership\",\"action\":\"List My Membership (via Group)\"},{\"name\":\"List People (via Group)\",\"value\":\"getGroupsGroupIdPeople\",\"description\":\"GET /groups/{group_id}/people\",\"action\":\"List People (via Group)\"},{\"name\":\"List Person (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdPerson\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/person\",\"action\":\"List Person (via Membership)\"},{\"name\":\"List Resources (via Group)\",\"value\":\"getGroupsGroupIdResources\",\"description\":\"GET /groups/{group_id}/resources\",\"action\":\"List Resources (via Group)\"},{\"name\":\"List Tags (via Group)\",\"value\":\"getGroupsGroupIdTags\",\"description\":\"GET /groups/{group_id}/tags\",\"action\":\"List Tags (via Group)\"},{\"name\":\"Get Application (via Group)\",\"value\":\"getGroupsGroupIdApplicationsApplicationId\",\"description\":\"GET /groups/{group_id}/applications/{application_id}\",\"action\":\"Get Application (via Group)\"},{\"name\":\"Get Campus (via Group)\",\"value\":\"getGroupsGroupIdCampusesCampusId\",\"description\":\"GET /groups/{group_id}/campuses/{campus_id}\",\"action\":\"Get Campus (via Group)\"},{\"name\":\"Get Enrollment (via Group)\",\"value\":\"getGroupsGroupIdEnrollment\",\"description\":\"GET /groups/{group_id}/enrollment\",\"action\":\"Get Enrollment (via Group)\"},{\"name\":\"Get Event (via Group)\",\"value\":\"getGroupsGroupIdEventsEventId\",\"description\":\"GET /groups/{group_id}/events/{event_id}\",\"action\":\"Get Event (via Group)\"},{\"name\":\"Get Group (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"action\":\"Get Group (via Membership)\"},{\"name\":\"Get Group (via Tag)\",\"value\":\"getGroupsGroupIdTagsTagIdGroupsGroupId\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"action\":\"Get Group (via Tag)\"},{\"name\":\"Get Group Type (via Group)\",\"value\":\"getGroupsGroupIdGroupTypeGroupTypeId\",\"description\":\"GET /groups/{group_id}/group_type/{group_type_id}\",\"action\":\"Get Group Type (via Group)\"},{\"name\":\"Get Group\",\"value\":\"getGroupsGroupId\",\"description\":\"GET /groups/{group_id}\",\"action\":\"Get Group\"},{\"name\":\"Get Location (via Group)\",\"value\":\"getGroupsGroupIdLocationLocationId\",\"description\":\"GET /groups/{group_id}/location/{location_id}\",\"action\":\"Get Location (via Group)\"},{\"name\":\"Get Membership (via Group)\",\"value\":\"getGroupsGroupIdMembershipsMembershipId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}\",\"action\":\"Get Membership (via Group)\"},{\"name\":\"Get My Membership (via Group)\",\"value\":\"getGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"GET /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"Get My Membership (via Group)\"},{\"name\":\"Get Person (via Group)\",\"value\":\"getGroupsGroupIdPeoplePersonId\",\"description\":\"GET /groups/{group_id}/people/{person_id}\",\"action\":\"Get Person (via Group)\"},{\"name\":\"Get Person (via Membership)\",\"value\":\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\",\"description\":\"GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}\",\"action\":\"Get Person (via Membership)\"},{\"name\":\"Get Resource (via Group)\",\"value\":\"getGroupsGroupIdResourcesResourceId\",\"description\":\"GET /groups/{group_id}/resources/{resource_id}\",\"action\":\"Get Resource (via Group)\"},{\"name\":\"Get Tag (via Group)\",\"value\":\"getGroupsGroupIdTagsTagId\",\"description\":\"GET /groups/{group_id}/tags/{tag_id}\",\"action\":\"Get Tag (via Group)\"},{\"name\":\"Create Assign Campus (via Group)\",\"value\":\"postGroupsGroupIdAssignCampuses\",\"description\":\"POST /groups/{group_id}/assign_campuses\",\"action\":\"Create Assign Campus (via Group)\"},{\"name\":\"Create Disable Chat (via Group)\",\"value\":\"postGroupsGroupIdDisableChat\",\"description\":\"POST /groups/{group_id}/disable_chat\",\"action\":\"Create Disable Chat (via Group)\"},{\"name\":\"Create Duplicate (via Group)\",\"value\":\"postGroupsGroupIdDuplicate\",\"description\":\"POST /groups/{group_id}/duplicate\",\"action\":\"Create Duplicate (via Group)\"},{\"name\":\"Create Enable Chat (via Group)\",\"value\":\"postGroupsGroupIdEnableChat\",\"description\":\"POST /groups/{group_id}/enable_chat\",\"action\":\"Create Enable Chat (via Group)\"},{\"name\":\"Create Membership (via Group)\",\"value\":\"postGroupsGroupIdMemberships\",\"description\":\"POST /groups/{group_id}/memberships\",\"action\":\"Create Membership (via Group)\"},{\"name\":\"Update Group (via Membership)\",\"value\":\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\",\"description\":\"PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"action\":\"Update Group (via Membership)\"},{\"name\":\"Update Group (via Tag)\",\"value\":\"patchGroupsGroupIdTagsTagIdGroupsGroupId\",\"description\":\"PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"action\":\"Update Group (via Tag)\"},{\"name\":\"Update Group\",\"value\":\"patchGroupsGroupId\",\"description\":\"PATCH /groups/{group_id}\",\"action\":\"Update Group\"},{\"name\":\"Update Membership (via Group)\",\"value\":\"patchGroupsGroupIdMembershipsMembershipId\",\"description\":\"PATCH /groups/{group_id}/memberships/{membership_id}\",\"action\":\"Update Membership (via Group)\"},{\"name\":\"Update My Membership (via Group)\",\"value\":\"patchGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"PATCH /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"Update My Membership (via Group)\"},{\"name\":\"Delete Membership (via Group)\",\"value\":\"deleteGroupsGroupIdMembershipsMembershipId\",\"description\":\"DELETE /groups/{group_id}/memberships/{membership_id}\",\"action\":\"Delete Membership (via Group)\"},{\"name\":\"Delete My Membership (via Group)\",\"value\":\"deleteGroupsGroupIdMyMembershipMyMembershipId\",\"description\":\"DELETE /groups/{group_id}/my_membership/{my_membership_id}\",\"action\":\"Delete My Membership (via Group)\"}],\n      default: \"getGroupsGroupIdApplications\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"]}},\n      options: [{\"name\":\"List Group (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdGroup\",\"description\":\"GET /group_applications/{group_application_id}/group\",\"action\":\"List Group (via Group Application)\"},{\"name\":\"List Group Applications\",\"value\":\"getGroupApplications\",\"description\":\"GET /group_applications\",\"action\":\"List Group Applications\"},{\"name\":\"List Person (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdPerson\",\"description\":\"GET /group_applications/{group_application_id}/person\",\"action\":\"List Person (via Group Application)\"},{\"name\":\"Get Group (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdGroupGroupId\",\"description\":\"GET /group_applications/{group_application_id}/group/{group_id}\",\"action\":\"Get Group (via Group Application)\"},{\"name\":\"Get Group Application\",\"value\":\"getGroupApplicationsGroupApplicationId\",\"description\":\"GET /group_applications/{group_application_id}\",\"action\":\"Get Group Application\"},{\"name\":\"Get Person (via Group Application)\",\"value\":\"getGroupApplicationsGroupApplicationIdPersonPersonId\",\"description\":\"GET /group_applications/{group_application_id}/person/{person_id}\",\"action\":\"Get Person (via Group Application)\"},{\"name\":\"Create Approve (via Group Application)\",\"value\":\"postGroupApplicationsGroupApplicationIdApprove\",\"description\":\"POST /group_applications/{group_application_id}/approve\",\"action\":\"Create Approve (via Group Application)\"},{\"name\":\"Create Reject (via Group Application)\",\"value\":\"postGroupApplicationsGroupApplicationIdReject\",\"description\":\"POST /group_applications/{group_application_id}/reject\",\"action\":\"Create Reject (via Group Application)\"},{\"name\":\"Update Group (via Group Application)\",\"value\":\"patchGroupApplicationsGroupApplicationIdGroupGroupId\",\"description\":\"PATCH /group_applications/{group_application_id}/group/{group_id}\",\"action\":\"Update Group (via Group Application)\"}],\n      default: \"getGroupApplicationsGroupApplicationIdGroup\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"]}},\n      options: [{\"name\":\"List Download (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download\",\"action\":\"List Download (via Resource)\"},{\"name\":\"List Events (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdEvents\",\"description\":\"GET /group_types/{group_type_id}/events\",\"action\":\"List Events (via Group Type)\"},{\"name\":\"List Group Types\",\"value\":\"getGroupTypes\",\"description\":\"GET /group_types\",\"action\":\"List Group Types\"},{\"name\":\"List Groups (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdGroups\",\"description\":\"GET /group_types/{group_type_id}/groups\",\"action\":\"List Groups (via Group Type)\"},{\"name\":\"List Resources (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdResources\",\"description\":\"GET /group_types/{group_type_id}/resources\",\"action\":\"List Resources (via Group Type)\"},{\"name\":\"List Visit (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit\",\"action\":\"List Visit (via Resource)\"},{\"name\":\"Get Download (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}\",\"action\":\"Get Download (via Resource)\"},{\"name\":\"Get Event (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdEventsEventId\",\"description\":\"GET /group_types/{group_type_id}/events/{event_id}\",\"action\":\"Get Event (via Group Type)\"},{\"name\":\"Get Group (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdGroupsGroupId\",\"description\":\"GET /group_types/{group_type_id}/groups/{group_id}\",\"action\":\"Get Group (via Group Type)\"},{\"name\":\"Get Group Type\",\"value\":\"getGroupTypesGroupTypeId\",\"description\":\"GET /group_types/{group_type_id}\",\"action\":\"Get Group Type\"},{\"name\":\"Get Resource (via Group Type)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}\",\"action\":\"Get Resource (via Group Type)\"},{\"name\":\"Get Visit (via Resource)\",\"value\":\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\",\"description\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}\",\"action\":\"Get Visit (via Resource)\"},{\"name\":\"Update Group (via Group Type)\",\"value\":\"patchGroupTypesGroupTypeIdGroupsGroupId\",\"description\":\"PATCH /group_types/{group_type_id}/groups/{group_id}\",\"action\":\"Update Group (via Group Type)\"}],\n      default: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"List Events (via Person)\",\"value\":\"getPeoplePersonIdEvents\",\"description\":\"GET /people/{person_id}/events\",\"action\":\"List Events (via Person)\"},{\"name\":\"List Groups (via Person)\",\"value\":\"getPeoplePersonIdGroups\",\"description\":\"GET /people/{person_id}/groups\",\"action\":\"List Groups (via Person)\"},{\"name\":\"List Memberships (via Person)\",\"value\":\"getPeoplePersonIdMemberships\",\"description\":\"GET /people/{person_id}/memberships\",\"action\":\"List Memberships (via Person)\"},{\"name\":\"List People\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"List People\"},{\"name\":\"Get Event (via Person)\",\"value\":\"getPeoplePersonIdEventsEventId\",\"description\":\"GET /people/{person_id}/events/{event_id}\",\"action\":\"Get Event (via Person)\"},{\"name\":\"Get Group (via Person)\",\"value\":\"getPeoplePersonIdGroupsGroupId\",\"description\":\"GET /people/{person_id}/groups/{group_id}\",\"action\":\"Get Group (via Person)\"},{\"name\":\"Get Me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"Get Me\"},{\"name\":\"Get Membership (via Person)\",\"value\":\"getPeoplePersonIdMembershipsMembershipId\",\"description\":\"GET /people/{person_id}/memberships/{membership_id}\",\"action\":\"Get Membership (via Person)\"},{\"name\":\"Get Person\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"Get Person\"},{\"name\":\"Update Group (via Person)\",\"value\":\"patchPeoplePersonIdGroupsGroupId\",\"description\":\"PATCH /people/{person_id}/groups/{group_id}\",\"action\":\"Update Group (via Person)\"},{\"name\":\"Update Membership (via Person)\",\"value\":\"patchPeoplePersonIdMembershipsMembershipId\",\"description\":\"PATCH /people/{person_id}/memberships/{membership_id}\",\"action\":\"Update Membership (via Person)\"},{\"name\":\"Delete Membership (via Person)\",\"value\":\"deletePeoplePersonIdMembershipsMembershipId\",\"description\":\"DELETE /people/{person_id}/memberships/{membership_id}\",\"action\":\"Delete Membership (via Person)\"}],\n      default: \"getPeoplePersonIdEvents\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"]}},\n      options: [{\"name\":\"List Tag Groups\",\"value\":\"getTagGroups\",\"description\":\"GET /tag_groups\",\"action\":\"List Tag Groups\"},{\"name\":\"List Tags (via Tag Group)\",\"value\":\"getTagGroupsTagGroupIdTags\",\"description\":\"GET /tag_groups/{tag_group_id}/tags\",\"action\":\"List Tags (via Tag Group)\"},{\"name\":\"Get Tag (via Tag Group)\",\"value\":\"getTagGroupsTagGroupIdTagsTagId\",\"description\":\"GET /tag_groups/{tag_group_id}/tags/{tag_id}\",\"action\":\"Get Tag (via Tag Group)\"},{\"name\":\"Get Tag Group\",\"value\":\"getTagGroupsTagGroupId\",\"description\":\"GET /tag_groups/{tag_group_id}\",\"action\":\"Get Tag Group\"}],\n      default: \"getTagGroups\",\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCampuses_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCampusesWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCampuses_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"],\"getCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getCampusesCampusIdGroups_campusId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCampusesCampusIdGroupsCampusId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getCampusesCampusIdGroups_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCampusesCampusIdGroupsWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCampusesCampusIdGroups_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCampusesCampusIdGroups_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampusesCampusIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampusesCampusIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"],\"getCampusesCampusIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getCampusesCampusId_campusId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCampusesCampusIdCampusId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getCampusesCampusIdGroupsGroupId_campusId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCampusesCampusIdGroupsGroupIdCampusId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getCampusesCampusIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCampusesCampusIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCampusesCampusIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchCampusesCampusIdGroupsGroupId_campusId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchCampusesCampusIdGroupsGroupIdCampusId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchCampusesCampusIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchCampusesCampusIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchCampusesCampusIdGroupsGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchCampusesCampusIdGroupsGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchCampusesCampusIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchCampusesCampusIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchCampusesCampusIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchCampusesCampusIdGroupsGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchCampusesCampusIdGroupsGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendances_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdAttendancesEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdAttendances_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"},{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdAttendances_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendances_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendances_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"],\"getEventsEventIdAttendances_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendances\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEvents_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEvents_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEvents_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"],\"getEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdGroup_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdGroupEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdGroup_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdGroupWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdGroup_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdGroup_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"],\"getEventsEventIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdLocationLocationIdGroup_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdGroupEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getEventsEventIdLocationLocationIdGroup_locationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdGroupLocationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEventsEventIdLocationLocationIdGroup_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdGroupWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdLocationLocationIdGroup_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocationLocationIdGroup_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdLocationLocationIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdLocationLocationIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"],\"getEventsEventIdLocationLocationIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdLocation_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"],\"getEventsEventIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdNotes_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdNotesEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdNotes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdNotes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdNotes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"],\"getEventsEventIdNotes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdNotesEventNoteIdOwner_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdNotesEventNoteIdOwnerEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: \"Event Note ID\",\n      name: \"getEventsEventIdNotesEventNoteIdOwner_eventNoteId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdNotesEventNoteIdOwnerEventNoteId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdNotesEventNoteIdOwner_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdNotesEventNoteIdOwner_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"],\"getEventsEventIdNotesEventNoteIdOwner_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwner\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdAttendancesAttendanceIdPersonEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: \"Attendance ID\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_attendanceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdAttendancesAttendanceIdPersonAttendanceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdAttendancesAttendanceIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"],\"getEventsEventIdAttendancesAttendanceIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdRsvps_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdRsvpsEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEventsEventIdRsvps_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Response Ascending\",\"value\":\"response\"},{\"name\":\"Response Descending\",\"value\":\"-response\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEventsEventIdRsvps_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEventsEventIdRsvps_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"],\"getEventsEventIdRsvps_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdRsvps\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdGroupGroupId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdGroupGroupIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getEventsEventIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdGroupGroupIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_locationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdGroupGroupIdLocationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocationLocationIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdLocationLocationId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getEventsEventIdLocationLocationId_locationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdLocationLocationIdLocationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdLocationLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdNotesNoteId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdNotesNoteIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n    },\n    {\n      displayName: \"Note ID\",\n      name: \"getEventsEventIdNotesNoteId_noteId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEventsEventIdNotesNoteId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesNoteId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Event Note ID\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_eventNoteId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventNoteId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner ID\",\n      name: \"getEventsEventIdNotesEventNoteIdOwnerOwnerId_ownerId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdOwnerId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Attendance ID\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_attendanceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdAttendanceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getEventsEventIdAttendancesAttendanceIdPersonPersonId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"patchEventsEventIdGroupGroupId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdGroupGroupIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchEventsEventIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEventsEventIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchEventsEventIdGroupGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchEventsEventIdGroupGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdGroupGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchEventsEventIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchEventsEventIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchEventsEventIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchEventsEventIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchEventsEventIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchEventsEventIdGroupGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdGroupGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdLocationLocationIdGroupGroupIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_locationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdLocationLocationIdGroupGroupIdLocationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchEventsEventIdLocationLocationIdGroupGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Event\"],\"operation\":[\"patchEventsEventIdLocationLocationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdGroupGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdGroupWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplicationsGroupApplicationIdGroup_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplicationsGroupApplicationIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplicationsGroupApplicationIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"],\"getGroupApplicationsGroupApplicationIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupApplications_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n      options: [{\"displayName\":\"Applied At\",\"name\":\"whereappliedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupApplications_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Applied At Ascending\",\"value\":\"applied_at\"},{\"name\":\"Applied At Descending\",\"value\":\"-applied_at\"},{\"name\":\"Status Ascending\",\"value\":\"status\"},{\"name\":\"Status Descending\",\"value\":\"-status\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplications_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"],\"getGroupApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"getGroupApplicationsGroupApplicationIdPerson_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdPersonGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupApplicationsGroupApplicationIdPerson_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupApplicationsGroupApplicationIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupApplicationsGroupApplicationIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"],\"getGroupApplicationsGroupApplicationIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplicationsGroupApplicationIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"getGroupApplicationsGroupApplicationId_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupApplicationsGroupApplicationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"getGroupApplicationsGroupApplicationIdPersonPersonId_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdPersonPersonIdGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getGroupApplicationsGroupApplicationIdPersonPersonId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupApplicationsGroupApplicationIdPersonPersonIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"getGroupApplicationsGroupApplicationIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"postGroupApplicationsGroupApplicationIdApprove_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupApplicationsGroupApplicationIdApproveGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdApprove\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"postGroupApplicationsGroupApplicationIdReject_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupApplicationsGroupApplicationIdRejectGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"postGroupApplicationsGroupApplicationIdReject\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Application ID\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupApplicationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupApplicationsGroupApplicationIdGroupGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Application\"],\"operation\":[\"patchGroupApplicationsGroupApplicationIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: \"Resource ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_resourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownload_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"],\"getGroupTypesGroupTypeIdResourcesResourceIdDownload_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdEvents_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdEventsGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupTypesGroupTypeIdEvents_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdEvents_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdEvents_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"],\"getGroupTypesGroupTypeIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupTypes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"],\"getGroupTypes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdGroups_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdGroupsGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupTypesGroupTypeIdGroups_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdGroups_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdGroups_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"],\"getGroupTypesGroupTypeIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdResources_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdResources_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"],\"getGroupTypesGroupTypeIdResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: \"Resource ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_resourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisit_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"],\"getGroupTypesGroupTypeIdResourcesResourceIdVisit_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: \"Resource ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_resourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: \"Download ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId_downloadId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdEventsEventIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdEventsEventIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdEventsEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupTypesGroupTypeIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: \"Resource ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceId_resourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: \"Resource ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_resourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: \"Visit ID\",\n      name: \"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId_visitId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupTypesGroupTypeIdGroupsGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group Type\"],\"operation\":[\"patchGroupTypesGroupTypeIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdApplications_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdApplicationsGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdApplications_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n      options: [{\"displayName\":\"Applied At\",\"name\":\"whereappliedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdApplications_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Applied At Ascending\",\"value\":\"applied_at\"},{\"name\":\"Applied At Descending\",\"value\":\"-applied_at\"},{\"name\":\"Status Ascending\",\"value\":\"status\"},{\"name\":\"Status Descending\",\"value\":\"-status\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdApplications_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdApplications_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdApplications_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"],\"getGroupsGroupIdApplications_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplications\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdCampuses_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdCampusesGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdCampuses_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdCampusesWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdCampuses_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"],\"getGroupsGroupIdCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdEvents_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdEventsGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdEvents_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdEvents_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdEvents_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"],\"getGroupsGroupIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdGroupMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdGroupWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"],\"getGroupsGroupIdMembershipsMembershipIdGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdGroupType_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdGroupTypeGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdGroupType_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdGroupTypeWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdGroupType_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"},{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdGroupType_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdGroupType_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"],\"getGroupsGroupIdGroupType_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupType\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsTagIdGroupsGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Tag ID\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_tagId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsTagIdGroupsTagId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsTagIdGroupsWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdTagsTagIdGroups_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdTagsTagIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdTagsTagIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"],\"getGroupsGroupIdTagsTagIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroups_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroups_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroups_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"],\"getGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdLocation_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdLocationGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdLocation_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"],\"getGroupsGroupIdLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMemberships_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMemberships_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Joined At Ascending\",\"value\":\"joined_at\"},{\"name\":\"Joined At Descending\",\"value\":\"-joined_at\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMemberships_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMemberships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMemberships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"],\"getGroupsGroupIdMemberships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMyMembership_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMyMembershipGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMyMembership_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Joined At Ascending\",\"value\":\"joined_at\"},{\"name\":\"Joined At Descending\",\"value\":\"-joined_at\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMyMembership_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMyMembership_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMyMembership_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"],\"getGroupsGroupIdMyMembership_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembership\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdPeople_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdPeopleGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdPeople_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"],\"getGroupsGroupIdPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdPersonGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdPersonMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdMembershipsMembershipIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"],\"getGroupsGroupIdMembershipsMembershipIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdResources_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdResourcesGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdResources_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Last Updated Ascending\",\"value\":\"last_updated\"},{\"name\":\"Last Updated Descending\",\"value\":\"-last_updated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"],\"getGroupsGroupIdResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdTags_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getGroupsGroupIdTags_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getGroupsGroupIdTags_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getGroupsGroupIdTags_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getGroupsGroupIdTags_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"],\"getGroupsGroupIdTags_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTags\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdApplicationsApplicationIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n    },\n    {\n      displayName: \"Application ID\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_applicationId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdApplicationsApplicationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdApplicationsApplicationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdCampusesCampusId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdCampusesCampusIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getGroupsGroupIdCampusesCampusId_campusId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdCampusesCampusIdCampusId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdEnrollment_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdEnrollmentGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEnrollment\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdEventsEventId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdEventsEventIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getGroupsGroupIdEventsEventId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdEventsEventIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdEventsEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsTagIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Tag ID\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_tagId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsTagIdGroupsGroupIdTagId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdTagsTagIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdGroupTypeGroupTypeId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n    },\n    {\n      displayName: \"Group Type ID\",\n      name: \"getGroupsGroupIdGroupTypeGroupTypeId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdGroupTypeGroupTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdLocationLocationId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdLocationLocationIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Location ID\",\n      name: \"getGroupsGroupIdLocationLocationId_locationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdLocationLocationIdLocationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdLocationLocationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdLocationLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMembershipsMembershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMyMembershipMyMembershipIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership ID\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getGroupsGroupIdMyMembershipMyMembershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdPeoplePersonId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdPeoplePersonIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getGroupsGroupIdPeoplePersonId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdPeoplePersonIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getGroupsGroupIdMembershipsMembershipIdPersonPersonId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdResourcesResourceId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdResourcesResourceIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: \"Resource ID\",\n      name: \"getGroupsGroupIdResourcesResourceId_resourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdResourcesResourceIdResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdResourcesResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getGroupsGroupIdTagsTagId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsTagIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: \"Tag ID\",\n      name: \"getGroupsGroupIdTagsTagId_tagId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetGroupsGroupIdTagsTagIdTagId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"getGroupsGroupIdTagsTagId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"postGroupsGroupIdAssignCampuses_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupsGroupIdAssignCampusesGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdAssignCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"postGroupsGroupIdDisableChat_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupsGroupIdDisableChatGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDisableChat\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"postGroupsGroupIdDuplicate_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupsGroupIdDuplicateGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdDuplicate\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"postGroupsGroupIdEnableChat_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupsGroupIdEnableChatGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdEnableChat\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"postGroupsGroupIdMemberships_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupsGroupIdMembershipsGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postGroupsGroupIdMemberships_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"postGroupsGroupIdMemberships_joinedAt\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"postGroupsGroupIdMemberships_role\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Person ID\",\n      name: \"postGroupsGroupIdMemberships_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupsGroupIdMembershipsPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Person ID\",\n      name: \"postGroupsGroupIdMemberships_personIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostGroupsGroupIdMembershipsPersonIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"postGroupsGroupIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Tag ID\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_tagId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdTagId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupsGroupIdTagsTagIdGroupsGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdTagsTagIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchGroupsGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchGroupsGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchGroupsGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchGroupsGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdMembershipsMembershipIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdMembershipsMembershipIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_joinedAt\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"patchGroupsGroupIdMembershipsMembershipId_role\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchGroupsGroupIdMyMembershipMyMembershipIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership ID\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_joinedAt\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"patchGroupsGroupIdMyMembershipMyMembershipId_role\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"patchGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"deleteGroupsGroupIdMembershipsMembershipId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteGroupsGroupIdMembershipsMembershipIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"deleteGroupsGroupIdMembershipsMembershipId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteGroupsGroupIdMembershipsMembershipIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"deleteGroupsGroupIdMyMembershipMyMembershipId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteGroupsGroupIdMyMembershipMyMembershipIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: \"My Membership ID\",\n      name: \"deleteGroupsGroupIdMyMembershipMyMembershipId_myMembershipId\",\n      type: \"string\",\n      default: \"\",\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Group\"],\"operation\":[\"deleteGroupsGroupIdMyMembershipMyMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdEvents_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdEventsPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeoplePersonIdEvents_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdEvents_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdEvents_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"],\"getPeoplePersonIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdGroups_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdGroupsPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeoplePersonIdGroups_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Group Type ID\",\"name\":\"wheregroupTypeid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdGroupsWheregroupTypeid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdGroups_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Contact Email Ascending\",\"value\":\"contact_email\"},{\"name\":\"Contact Email Descending\",\"value\":\"-contact_email\"},{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Enrollment Limit Ascending\",\"value\":\"enrollment_limit\"},{\"name\":\"Enrollment Limit Descending\",\"value\":\"-enrollment_limit\"},{\"name\":\"Memberships Count Ascending\",\"value\":\"memberships_count\"},{\"name\":\"Memberships Count Descending\",\"value\":\"-memberships_count\"},{\"name\":\"Chat Enabled Ascending\",\"value\":\"chat_enabled\"},{\"name\":\"Chat Enabled Descending\",\"value\":\"-chat_enabled\"},{\"name\":\"Members Are Confidential Ascending\",\"value\":\"members_are_confidential\"},{\"name\":\"Members Are Confidential Descending\",\"value\":\"-members_are_confidential\"},{\"name\":\"Listed Ascending\",\"value\":\"listed\"},{\"name\":\"Listed Descending\",\"value\":\"-listed\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdGroups_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"],\"getPeoplePersonIdGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdMemberships_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdMembershipsPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdMemberships_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Joined At Ascending\",\"value\":\"joined_at\"},{\"name\":\"Joined At Descending\",\"value\":\"-joined_at\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"},{\"name\":\"Role Ascending\",\"value\":\"role\"},{\"name\":\"Role Descending\",\"value\":\"-role\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdMemberships_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdMemberships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdMemberships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"],\"getPeoplePersonIdMemberships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMemberships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeople_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"},{\"name\":\"Last Name Ascending\",\"value\":\"last_name\"},{\"name\":\"Last Name Descending\",\"value\":\"-last_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdEventsEventId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdEventsEventIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getPeoplePersonIdEventsEventId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdEventsEventIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdEventsEventId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Group\",\"value\":\"group\"},{\"name\":\"Group Enrollment\",\"value\":\"group.enrollment\"},{\"name\":\"Group Group Type\",\"value\":\"group.group_type\"},{\"name\":\"Group Location\",\"value\":\"group.location\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdGroupsGroupId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdGroupsGroupIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"getPeoplePersonIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdMembershipsMembershipIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdMembershipsMembershipIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdMembershipsMembershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPeoplePersonIdGroupsGroupId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchPeoplePersonIdGroupsGroupIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Group ID\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchPeoplePersonIdGroupsGroupIdGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdGroupsGroupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Enrollment\",\"value\":\"enrollment\"},{\"name\":\"Group Type\",\"value\":\"group_type\"},{\"name\":\"Location\",\"value\":\"location\"},{\"name\":\"Location Group\",\"value\":\"location.group\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchPeoplePersonIdGroupsGroupId_name\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Type ID\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchPeoplePersonIdGroupsGroupIdGroupTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Public Enrollment\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publicEnrollment\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Display Meeting Schedule\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publiclyDisplayMeetingSchedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Publicly Visible\",\n      name: \"patchPeoplePersonIdGroupsGroupId_publiclyVisible\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Schedule\",\n      name: \"patchPeoplePersonIdGroupsGroupId_schedule\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Tag IDs\",\n      name: \"patchPeoplePersonIdGroupsGroupId_tagIds\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Group Type ID\",\n      name: \"patchPeoplePersonIdGroupsGroupId_groupTypeIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchPeoplePersonIdGroupsGroupIdGroupTypeIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdGroupsGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchPeoplePersonIdMembershipsMembershipIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchPeoplePersonIdMembershipsMembershipIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Joined At\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_joinedAt\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Role\",\n      name: \"patchPeoplePersonIdMembershipsMembershipId_role\",\n      type: \"string\",\n      default: \"\",\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"deletePeoplePersonIdMembershipsMembershipId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeletePeoplePersonIdMembershipsMembershipIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: \"Membership ID\",\n      name: \"deletePeoplePersonIdMembershipsMembershipId_membershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeletePeoplePersonIdMembershipsMembershipIdMembershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdMembershipsMembershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getTagGroups_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getTagGroups_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getTagGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getTagGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"],\"getTagGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group ID\",\n      name: \"getTagGroupsTagGroupIdTags_tagGroupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetTagGroupsTagGroupIdTagsTagGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getTagGroupsTagGroupIdTags_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetTagGroupsTagGroupIdTagsWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getTagGroupsTagGroupIdTags_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getTagGroupsTagGroupIdTags_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getTagGroupsTagGroupIdTags_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"],\"getTagGroupsTagGroupIdTags_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTags\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group ID\",\n      name: \"getTagGroupsTagGroupIdTagsTagId_tagGroupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetTagGroupsTagGroupIdTagsTagIdTagGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: \"Tag ID\",\n      name: \"getTagGroupsTagGroupIdTagsTagId_tagId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetTagGroupsTagGroupIdTagsTagIdTagId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupIdTagsTagId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Tag Group ID\",\n      name: \"getTagGroupsTagGroupId_tagGroupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetTagGroupsTagGroupIdTagGroupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Tag Group\"],\"operation\":[\"getTagGroupsTagGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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

export class PlanningCenterGroups implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Groups",
    name: "planningCenterGroups",
    icon: 'file:groups.svg',
    group: ['transform'],
    version: 1,
    subtitle: "={{({\"getCampuses\":\"GET /campuses\",\"getCampusesCampusIdGroups\":\"GET /campuses/{campus_id}/groups\",\"getCampusesCampusId\":\"GET /campuses/{campus_id}\",\"getCampusesCampusIdGroupsGroupId\":\"GET /campuses/{campus_id}/groups/{group_id}\",\"patchCampusesCampusIdGroupsGroupId\":\"PATCH /campuses/{campus_id}/groups/{group_id}\",\"getEventsEventIdAttendances\":\"GET /events/{event_id}/attendances\",\"getEvents\":\"GET /events\",\"getEventsEventIdGroup\":\"GET /events/{event_id}/group\",\"getEventsEventIdLocationLocationIdGroup\":\"GET /events/{event_id}/location/{location_id}/group\",\"getEventsEventIdLocation\":\"GET /events/{event_id}/location\",\"getEventsEventIdNotes\":\"GET /events/{event_id}/notes\",\"getEventsEventIdNotesEventNoteIdOwner\":\"GET /events/{event_id}/notes/{event_note_id}/owner\",\"getEventsEventIdAttendancesAttendanceIdPerson\":\"GET /events/{event_id}/attendances/{attendance_id}/person\",\"getEventsEventIdRsvps\":\"GET /events/{event_id}/rsvps\",\"getEventsEventId\":\"GET /events/{event_id}\",\"getEventsEventIdGroupGroupId\":\"GET /events/{event_id}/group/{group_id}\",\"getEventsEventIdLocationLocationIdGroupGroupId\":\"GET /events/{event_id}/location/{location_id}/group/{group_id}\",\"getEventsEventIdLocationLocationId\":\"GET /events/{event_id}/location/{location_id}\",\"getEventsEventIdNotesNoteId\":\"GET /events/{event_id}/notes/{note_id}\",\"getEventsEventIdNotesEventNoteIdOwnerOwnerId\":\"GET /events/{event_id}/notes/{event_note_id}/owner/{owner_id}\",\"getEventsEventIdAttendancesAttendanceIdPersonPersonId\":\"GET /events/{event_id}/attendances/{attendance_id}/person/{person_id}\",\"patchEventsEventIdGroupGroupId\":\"PATCH /events/{event_id}/group/{group_id}\",\"patchEventsEventIdLocationLocationIdGroupGroupId\":\"PATCH /events/{event_id}/location/{location_id}/group/{group_id}\",\"getGroupApplicationsGroupApplicationIdGroup\":\"GET /group_applications/{group_application_id}/group\",\"getGroupApplications\":\"GET /group_applications\",\"getGroupApplicationsGroupApplicationIdPerson\":\"GET /group_applications/{group_application_id}/person\",\"getGroupApplicationsGroupApplicationIdGroupGroupId\":\"GET /group_applications/{group_application_id}/group/{group_id}\",\"getGroupApplicationsGroupApplicationId\":\"GET /group_applications/{group_application_id}\",\"getGroupApplicationsGroupApplicationIdPersonPersonId\":\"GET /group_applications/{group_application_id}/person/{person_id}\",\"postGroupApplicationsGroupApplicationIdApprove\":\"POST /group_applications/{group_application_id}/approve\",\"postGroupApplicationsGroupApplicationIdReject\":\"POST /group_applications/{group_application_id}/reject\",\"patchGroupApplicationsGroupApplicationIdGroupGroupId\":\"PATCH /group_applications/{group_application_id}/group/{group_id}\",\"getGroupTypesGroupTypeIdResourcesResourceIdDownload\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download\",\"getGroupTypesGroupTypeIdEvents\":\"GET /group_types/{group_type_id}/events\",\"getGroupTypes\":\"GET /group_types\",\"getGroupTypesGroupTypeIdGroups\":\"GET /group_types/{group_type_id}/groups\",\"getGroupTypesGroupTypeIdResources\":\"GET /group_types/{group_type_id}/resources\",\"getGroupTypesGroupTypeIdResourcesResourceIdVisit\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit\",\"getGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadId\":\"GET /group_types/{group_type_id}/resources/{resource_id}/download/{download_id}\",\"getGroupTypesGroupTypeIdEventsEventId\":\"GET /group_types/{group_type_id}/events/{event_id}\",\"getGroupTypesGroupTypeIdGroupsGroupId\":\"GET /group_types/{group_type_id}/groups/{group_id}\",\"getGroupTypesGroupTypeId\":\"GET /group_types/{group_type_id}\",\"getGroupTypesGroupTypeIdResourcesResourceId\":\"GET /group_types/{group_type_id}/resources/{resource_id}\",\"getGroupTypesGroupTypeIdResourcesResourceIdVisitVisitId\":\"GET /group_types/{group_type_id}/resources/{resource_id}/visit/{visit_id}\",\"patchGroupTypesGroupTypeIdGroupsGroupId\":\"PATCH /group_types/{group_type_id}/groups/{group_id}\",\"getGroupsGroupIdApplications\":\"GET /groups/{group_id}/applications\",\"getGroupsGroupIdCampuses\":\"GET /groups/{group_id}/campuses\",\"getGroupsGroupIdEvents\":\"GET /groups/{group_id}/events\",\"getGroupsGroupIdMembershipsMembershipIdGroup\":\"GET /groups/{group_id}/memberships/{membership_id}/group\",\"getGroupsGroupIdGroupType\":\"GET /groups/{group_id}/group_type\",\"getGroupsGroupIdTagsTagIdGroups\":\"GET /groups/{group_id}/tags/{tag_id}/groups\",\"getGroups\":\"GET /groups\",\"getGroupsGroupIdLocation\":\"GET /groups/{group_id}/location\",\"getGroupsGroupIdMemberships\":\"GET /groups/{group_id}/memberships\",\"getGroupsGroupIdMyMembership\":\"GET /groups/{group_id}/my_membership\",\"getGroupsGroupIdPeople\":\"GET /groups/{group_id}/people\",\"getGroupsGroupIdMembershipsMembershipIdPerson\":\"GET /groups/{group_id}/memberships/{membership_id}/person\",\"getGroupsGroupIdResources\":\"GET /groups/{group_id}/resources\",\"getGroupsGroupIdTags\":\"GET /groups/{group_id}/tags\",\"getGroupsGroupIdApplicationsApplicationId\":\"GET /groups/{group_id}/applications/{application_id}\",\"getGroupsGroupIdCampusesCampusId\":\"GET /groups/{group_id}/campuses/{campus_id}\",\"getGroupsGroupIdEnrollment\":\"GET /groups/{group_id}/enrollment\",\"getGroupsGroupIdEventsEventId\":\"GET /groups/{group_id}/events/{event_id}\",\"getGroupsGroupIdMembershipsMembershipIdGroupGroupId\":\"GET /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"getGroupsGroupIdTagsTagIdGroupsGroupId\":\"GET /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"getGroupsGroupIdGroupTypeGroupTypeId\":\"GET /groups/{group_id}/group_type/{group_type_id}\",\"getGroupsGroupId\":\"GET /groups/{group_id}\",\"getGroupsGroupIdLocationLocationId\":\"GET /groups/{group_id}/location/{location_id}\",\"getGroupsGroupIdMembershipsMembershipId\":\"GET /groups/{group_id}/memberships/{membership_id}\",\"getGroupsGroupIdMyMembershipMyMembershipId\":\"GET /groups/{group_id}/my_membership/{my_membership_id}\",\"getGroupsGroupIdPeoplePersonId\":\"GET /groups/{group_id}/people/{person_id}\",\"getGroupsGroupIdMembershipsMembershipIdPersonPersonId\":\"GET /groups/{group_id}/memberships/{membership_id}/person/{person_id}\",\"getGroupsGroupIdResourcesResourceId\":\"GET /groups/{group_id}/resources/{resource_id}\",\"getGroupsGroupIdTagsTagId\":\"GET /groups/{group_id}/tags/{tag_id}\",\"postGroupsGroupIdAssignCampuses\":\"POST /groups/{group_id}/assign_campuses\",\"postGroupsGroupIdDisableChat\":\"POST /groups/{group_id}/disable_chat\",\"postGroupsGroupIdDuplicate\":\"POST /groups/{group_id}/duplicate\",\"postGroupsGroupIdEnableChat\":\"POST /groups/{group_id}/enable_chat\",\"postGroupsGroupIdMemberships\":\"POST /groups/{group_id}/memberships\",\"patchGroupsGroupIdMembershipsMembershipIdGroupGroupId\":\"PATCH /groups/{group_id}/memberships/{membership_id}/group/{group_id}\",\"patchGroupsGroupIdTagsTagIdGroupsGroupId\":\"PATCH /groups/{group_id}/tags/{tag_id}/groups/{group_id}\",\"patchGroupsGroupId\":\"PATCH /groups/{group_id}\",\"patchGroupsGroupIdMembershipsMembershipId\":\"PATCH /groups/{group_id}/memberships/{membership_id}\",\"patchGroupsGroupIdMyMembershipMyMembershipId\":\"PATCH /groups/{group_id}/my_membership/{my_membership_id}\",\"deleteGroupsGroupIdMembershipsMembershipId\":\"DELETE /groups/{group_id}/memberships/{membership_id}\",\"deleteGroupsGroupIdMyMembershipMyMembershipId\":\"DELETE /groups/{group_id}/my_membership/{my_membership_id}\",\"getPeoplePersonIdEvents\":\"GET /people/{person_id}/events\",\"getPeoplePersonIdGroups\":\"GET /people/{person_id}/groups\",\"getPeoplePersonIdMemberships\":\"GET /people/{person_id}/memberships\",\"getPeople\":\"GET /people\",\"getPeoplePersonIdEventsEventId\":\"GET /people/{person_id}/events/{event_id}\",\"getPeoplePersonIdGroupsGroupId\":\"GET /people/{person_id}/groups/{group_id}\",\"getMe\":\"GET /me\",\"getPeoplePersonIdMembershipsMembershipId\":\"GET /people/{person_id}/memberships/{membership_id}\",\"getPeoplePersonId\":\"GET /people/{person_id}\",\"patchPeoplePersonIdGroupsGroupId\":\"PATCH /people/{person_id}/groups/{group_id}\",\"patchPeoplePersonIdMembershipsMembershipId\":\"PATCH /people/{person_id}/memberships/{membership_id}\",\"deletePeoplePersonIdMembershipsMembershipId\":\"DELETE /people/{person_id}/memberships/{membership_id}\",\"getTagGroups\":\"GET /tag_groups\",\"getTagGroupsTagGroupIdTags\":\"GET /tag_groups/{tag_group_id}/tags\",\"getTagGroupsTagGroupIdTagsTagId\":\"GET /tag_groups/{tag_group_id}/tags/{tag_id}\",\"getTagGroupsTagGroupId\":\"GET /tag_groups/{tag_group_id}\"})[$parameter[\"operation\"]] || $parameter[\"operation\"]}}",
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

  methods = {
    listSearch: {
      searchDeleteGroupsGroupIdMembershipsMembershipIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteGroupsGroupIdMembershipsMembershipIdGroupId"], filter);
      },
      searchDeleteGroupsGroupIdMembershipsMembershipIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteGroupsGroupIdMembershipsMembershipIdMembershipId"], filter);
      },
      searchDeleteGroupsGroupIdMyMembershipMyMembershipIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteGroupsGroupIdMyMembershipMyMembershipIdGroupId"], filter);
      },
      searchDeletePeoplePersonIdMembershipsMembershipIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeletePeoplePersonIdMembershipsMembershipIdMembershipId"], filter);
      },
      searchDeletePeoplePersonIdMembershipsMembershipIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeletePeoplePersonIdMembershipsMembershipIdPersonId"], filter);
      },
      searchGetCampusesCampusIdCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCampusesCampusIdCampusId"], filter);
      },
      searchGetCampusesCampusIdGroupsCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCampusesCampusIdGroupsCampusId"], filter);
      },
      searchGetCampusesCampusIdGroupsGroupIdCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCampusesCampusIdGroupsGroupIdCampusId"], filter);
      },
      searchGetCampusesCampusIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCampusesCampusIdGroupsGroupIdGroupId"], filter);
      },
      searchGetCampusesCampusIdGroupsWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCampusesCampusIdGroupsWheregroupTypeid"], filter);
      },
      searchGetCampusesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCampusesWhereid"], filter);
      },
      searchGetEventsEventIdAttendancesAttendanceIdPersonAttendanceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendancesAttendanceIdPersonAttendanceId"], filter);
      },
      searchGetEventsEventIdAttendancesAttendanceIdPersonEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendancesAttendanceIdPersonEventId"], filter);
      },
      searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdAttendanceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdAttendanceId"], filter);
      },
      searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdEventId"], filter);
      },
      searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendancesAttendanceIdPersonPersonIdPersonId"], filter);
      },
      searchGetEventsEventIdAttendancesEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendancesEventId"], filter);
      },
      searchGetEventsEventIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdEventId"], filter);
      },
      searchGetEventsEventIdGroupEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdGroupEventId"], filter);
      },
      searchGetEventsEventIdGroupGroupIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdGroupGroupIdEventId"], filter);
      },
      searchGetEventsEventIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdGroupGroupIdGroupId"], filter);
      },
      searchGetEventsEventIdGroupWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdGroupWheregroupTypeid"], filter);
      },
      searchGetEventsEventIdLocationEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationEventId"], filter);
      },
      searchGetEventsEventIdLocationLocationIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdEventId"], filter);
      },
      searchGetEventsEventIdLocationLocationIdGroupEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdGroupEventId"], filter);
      },
      searchGetEventsEventIdLocationLocationIdGroupGroupIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdGroupGroupIdEventId"], filter);
      },
      searchGetEventsEventIdLocationLocationIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdGroupGroupIdGroupId"], filter);
      },
      searchGetEventsEventIdLocationLocationIdGroupGroupIdLocationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdGroupGroupIdLocationId"], filter);
      },
      searchGetEventsEventIdLocationLocationIdGroupLocationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdGroupLocationId"], filter);
      },
      searchGetEventsEventIdLocationLocationIdGroupWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdGroupWheregroupTypeid"], filter);
      },
      searchGetEventsEventIdLocationLocationIdLocationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdLocationLocationIdLocationId"], filter);
      },
      searchGetEventsEventIdNotesEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdNotesEventId"], filter);
      },
      searchGetEventsEventIdNotesEventNoteIdOwnerEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdNotesEventNoteIdOwnerEventId"], filter);
      },
      searchGetEventsEventIdNotesEventNoteIdOwnerEventNoteId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdNotesEventNoteIdOwnerEventNoteId"], filter);
      },
      searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventId"], filter);
      },
      searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventNoteId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdEventNoteId"], filter);
      },
      searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdOwnerId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdNotesEventNoteIdOwnerOwnerIdOwnerId"], filter);
      },
      searchGetEventsEventIdNotesNoteIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdNotesNoteIdEventId"], filter);
      },
      searchGetEventsEventIdRsvpsEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdRsvpsEventId"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdGroupApplicationId"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdGroupGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdGroupGroupApplicationId"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdGroupGroupIdGroupId"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdGroupWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdGroupWheregroupTypeid"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdPersonGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdPersonGroupApplicationId"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdPersonPersonIdGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdPersonPersonIdGroupApplicationId"], filter);
      },
      searchGetGroupApplicationsGroupApplicationIdPersonPersonIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupApplicationsGroupApplicationIdPersonPersonIdPersonId"], filter);
      },
      searchGetGroupsGroupIdApplicationsApplicationIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdApplicationsApplicationIdGroupId"], filter);
      },
      searchGetGroupsGroupIdApplicationsGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdApplicationsGroupId"], filter);
      },
      searchGetGroupsGroupIdCampusesCampusIdCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdCampusesCampusIdCampusId"], filter);
      },
      searchGetGroupsGroupIdCampusesCampusIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdCampusesCampusIdGroupId"], filter);
      },
      searchGetGroupsGroupIdCampusesGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdCampusesGroupId"], filter);
      },
      searchGetGroupsGroupIdCampusesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdCampusesWhereid"], filter);
      },
      searchGetGroupsGroupIdEnrollmentGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdEnrollmentGroupId"], filter);
      },
      searchGetGroupsGroupIdEventsEventIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdEventsEventIdEventId"], filter);
      },
      searchGetGroupsGroupIdEventsEventIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdEventsEventIdGroupId"], filter);
      },
      searchGetGroupsGroupIdEventsGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdEventsGroupId"], filter);
      },
      searchGetGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdGroupId"], filter);
      },
      searchGetGroupsGroupIdGroupTypeGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdGroupTypeGroupId"], filter);
      },
      searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupId"], filter);
      },
      searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdGroupTypeGroupTypeIdGroupTypeId"], filter);
      },
      searchGetGroupsGroupIdGroupTypeWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdGroupTypeWhereid"], filter);
      },
      searchGetGroupsGroupIdLocationGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdLocationGroupId"], filter);
      },
      searchGetGroupsGroupIdLocationLocationIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdLocationLocationIdGroupId"], filter);
      },
      searchGetGroupsGroupIdLocationLocationIdLocationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdLocationLocationIdLocationId"], filter);
      },
      searchGetGroupsGroupIdMembershipsGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsGroupId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdGroupId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdGroupMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdGroupMembershipId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdGroupWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdGroupWheregroupTypeid"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdMembershipId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdPersonGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdPersonGroupId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdPersonMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdPersonMembershipId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdGroupId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdMembershipId"], filter);
      },
      searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMembershipsMembershipIdPersonPersonIdPersonId"], filter);
      },
      searchGetGroupsGroupIdMyMembershipGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMyMembershipGroupId"], filter);
      },
      searchGetGroupsGroupIdMyMembershipMyMembershipIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdMyMembershipMyMembershipIdGroupId"], filter);
      },
      searchGetGroupsGroupIdPeopleGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdPeopleGroupId"], filter);
      },
      searchGetGroupsGroupIdPeoplePersonIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdPeoplePersonIdGroupId"], filter);
      },
      searchGetGroupsGroupIdPeoplePersonIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdPeoplePersonIdPersonId"], filter);
      },
      searchGetGroupsGroupIdResourcesGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdResourcesGroupId"], filter);
      },
      searchGetGroupsGroupIdResourcesResourceIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdResourcesResourceIdGroupId"], filter);
      },
      searchGetGroupsGroupIdResourcesResourceIdResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdResourcesResourceIdResourceId"], filter);
      },
      searchGetGroupsGroupIdTagsGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsGroupId"], filter);
      },
      searchGetGroupsGroupIdTagsTagIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsTagIdGroupId"], filter);
      },
      searchGetGroupsGroupIdTagsTagIdGroupsGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsTagIdGroupsGroupId"], filter);
      },
      searchGetGroupsGroupIdTagsTagIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsTagIdGroupsGroupIdGroupId"], filter);
      },
      searchGetGroupsGroupIdTagsTagIdGroupsGroupIdTagId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsTagIdGroupsGroupIdTagId"], filter);
      },
      searchGetGroupsGroupIdTagsTagIdGroupsTagId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsTagIdGroupsTagId"], filter);
      },
      searchGetGroupsGroupIdTagsTagIdGroupsWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsTagIdGroupsWheregroupTypeid"], filter);
      },
      searchGetGroupsGroupIdTagsTagIdTagId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsTagIdTagId"], filter);
      },
      searchGetGroupsGroupIdTagsWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsGroupIdTagsWhereid"], filter);
      },
      searchGetGroupsWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupsWheregroupTypeid"], filter);
      },
      searchGetGroupTypesGroupTypeIdEventsEventIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdEventsEventIdEventId"], filter);
      },
      searchGetGroupTypesGroupTypeIdEventsEventIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdEventsEventIdGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdEventsGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdEventsGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupId"], filter);
      },
      searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdGroupsGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdGroupsGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadDownloadIdResourceId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdDownloadResourceId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdResourceId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitResourceId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdGroupTypeId"], filter);
      },
      searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesGroupTypeIdResourcesResourceIdVisitVisitIdResourceId"], filter);
      },
      searchGetGroupTypesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetGroupTypesWhereid"], filter);
      },
      searchGetPeoplePersonIdEventsEventIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdEventsEventIdEventId"], filter);
      },
      searchGetPeoplePersonIdEventsEventIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdEventsEventIdPersonId"], filter);
      },
      searchGetPeoplePersonIdEventsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdEventsPersonId"], filter);
      },
      searchGetPeoplePersonIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdGroupsGroupIdGroupId"], filter);
      },
      searchGetPeoplePersonIdGroupsGroupIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdGroupsGroupIdPersonId"], filter);
      },
      searchGetPeoplePersonIdGroupsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdGroupsPersonId"], filter);
      },
      searchGetPeoplePersonIdGroupsWheregroupTypeid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdGroupsWheregroupTypeid"], filter);
      },
      searchGetPeoplePersonIdMembershipsMembershipIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdMembershipsMembershipIdMembershipId"], filter);
      },
      searchGetPeoplePersonIdMembershipsMembershipIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdMembershipsMembershipIdPersonId"], filter);
      },
      searchGetPeoplePersonIdMembershipsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdMembershipsPersonId"], filter);
      },
      searchGetPeoplePersonIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPersonId"], filter);
      },
      searchGetTagGroupsTagGroupIdTagGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetTagGroupsTagGroupIdTagGroupId"], filter);
      },
      searchGetTagGroupsTagGroupIdTagsTagGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetTagGroupsTagGroupIdTagsTagGroupId"], filter);
      },
      searchGetTagGroupsTagGroupIdTagsTagIdTagGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetTagGroupsTagGroupIdTagsTagIdTagGroupId"], filter);
      },
      searchGetTagGroupsTagGroupIdTagsTagIdTagId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetTagGroupsTagGroupIdTagsTagIdTagId"], filter);
      },
      searchGetTagGroupsTagGroupIdTagsWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetTagGroupsTagGroupIdTagsWhereid"], filter);
      },
      searchPatchCampusesCampusIdGroupsGroupIdCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchCampusesCampusIdGroupsGroupIdCampusId"], filter);
      },
      searchPatchCampusesCampusIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchCampusesCampusIdGroupsGroupIdGroupId"], filter);
      },
      searchPatchCampusesCampusIdGroupsGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchCampusesCampusIdGroupsGroupIdGroupTypeId"], filter);
      },
      searchPatchCampusesCampusIdGroupsGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchCampusesCampusIdGroupsGroupIdGroupTypeIds"], filter);
      },
      searchPatchEventsEventIdGroupGroupIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdGroupGroupIdEventId"], filter);
      },
      searchPatchEventsEventIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdGroupGroupIdGroupId"], filter);
      },
      searchPatchEventsEventIdGroupGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdGroupGroupIdGroupTypeId"], filter);
      },
      searchPatchEventsEventIdGroupGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdGroupGroupIdGroupTypeIds"], filter);
      },
      searchPatchEventsEventIdLocationLocationIdGroupGroupIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdLocationLocationIdGroupGroupIdEventId"], filter);
      },
      searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupId"], filter);
      },
      searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeId"], filter);
      },
      searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdLocationLocationIdGroupGroupIdGroupTypeIds"], filter);
      },
      searchPatchEventsEventIdLocationLocationIdGroupGroupIdLocationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEventsEventIdLocationLocationIdGroupGroupIdLocationId"], filter);
      },
      searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupApplicationId"], filter);
      },
      searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupId"], filter);
      },
      searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeId"], filter);
      },
      searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupApplicationsGroupApplicationIdGroupGroupIdGroupTypeIds"], filter);
      },
      searchPatchGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdGroupId"], filter);
      },
      searchPatchGroupsGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdGroupTypeId"], filter);
      },
      searchPatchGroupsGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdGroupTypeIds"], filter);
      },
      searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupId"], filter);
      },
      searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeId"], filter);
      },
      searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdGroupTypeIds"], filter);
      },
      searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdMembershipsMembershipIdGroupGroupIdMembershipId"], filter);
      },
      searchPatchGroupsGroupIdMembershipsMembershipIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdMembershipsMembershipIdGroupId"], filter);
      },
      searchPatchGroupsGroupIdMembershipsMembershipIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdMembershipsMembershipIdMembershipId"], filter);
      },
      searchPatchGroupsGroupIdMyMembershipMyMembershipIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdMyMembershipMyMembershipIdGroupId"], filter);
      },
      searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupId"], filter);
      },
      searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeId"], filter);
      },
      searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdGroupTypeIds"], filter);
      },
      searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdTagId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupsGroupIdTagsTagIdGroupsGroupIdTagId"], filter);
      },
      searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupId"], filter);
      },
      searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeId"], filter);
      },
      searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchGroupTypesGroupTypeIdGroupsGroupIdGroupTypeIds"], filter);
      },
      searchPatchPeoplePersonIdGroupsGroupIdGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchPeoplePersonIdGroupsGroupIdGroupId"], filter);
      },
      searchPatchPeoplePersonIdGroupsGroupIdGroupTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchPeoplePersonIdGroupsGroupIdGroupTypeId"], filter);
      },
      searchPatchPeoplePersonIdGroupsGroupIdGroupTypeIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchPeoplePersonIdGroupsGroupIdGroupTypeIds"], filter);
      },
      searchPatchPeoplePersonIdGroupsGroupIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchPeoplePersonIdGroupsGroupIdPersonId"], filter);
      },
      searchPatchPeoplePersonIdMembershipsMembershipIdMembershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchPeoplePersonIdMembershipsMembershipIdMembershipId"], filter);
      },
      searchPatchPeoplePersonIdMembershipsMembershipIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchPeoplePersonIdMembershipsMembershipIdPersonId"], filter);
      },
      searchPostGroupApplicationsGroupApplicationIdApproveGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupApplicationsGroupApplicationIdApproveGroupApplicationId"], filter);
      },
      searchPostGroupApplicationsGroupApplicationIdRejectGroupApplicationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupApplicationsGroupApplicationIdRejectGroupApplicationId"], filter);
      },
      searchPostGroupsGroupIdAssignCampusesGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupsGroupIdAssignCampusesGroupId"], filter);
      },
      searchPostGroupsGroupIdDisableChatGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupsGroupIdDisableChatGroupId"], filter);
      },
      searchPostGroupsGroupIdDuplicateGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupsGroupIdDuplicateGroupId"], filter);
      },
      searchPostGroupsGroupIdEnableChatGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupsGroupIdEnableChatGroupId"], filter);
      },
      searchPostGroupsGroupIdMembershipsGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupsGroupIdMembershipsGroupId"], filter);
      },
      searchPostGroupsGroupIdMembershipsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupsGroupIdMembershipsPersonId"], filter);
      },
      searchPostGroupsGroupIdMembershipsPersonIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostGroupsGroupIdMembershipsPersonIds"], filter);
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
        throw new Error(`Unsupported Planning Center Groups operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
