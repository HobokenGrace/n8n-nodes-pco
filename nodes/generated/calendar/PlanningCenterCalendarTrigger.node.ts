import type { ILoadOptionsFunctions, INodeExecutionData, INodeListSearchResult, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';

import { searchPlanningCenterLookup, type GeneratedLookup } from '../../../src/runtime/lookup';
import { pollPlanningCenter, type PollingOperation } from '../../../src/runtime/polling';

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = {
  "searchGetConflictsConflictIdResolvedByConflictId": {
    "methodName": "searchGetConflictsConflictIdResolvedByConflictId",
    "sourcePath": "/calendar/v2/conflicts",
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
  "searchGetConflictsConflictIdResourceConflictId": {
    "methodName": "searchGetConflictsConflictIdResourceConflictId",
    "sourcePath": "/calendar/v2/conflicts",
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
  "searchGetConflictsConflictIdResourceWhereid": {
    "methodName": "searchGetConflictsConflictIdResourceWhereid",
    "sourcePath": "/calendar/v2/conflicts/{conflict_id}/resource",
    "parentBindings": [
      {
        "sourceName": "conflict_id",
        "fieldName": "getConflictsConflictIdResource_conflictId"
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
  "searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId": {
    "methodName": "searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId",
    "sourcePath": "/calendar/v2/event_instances",
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
  "searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid": {
    "methodName": "searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId": {
    "methodName": "searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId",
    "sourcePath": "/calendar/v2/event_resource_requests",
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
  "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId": {
    "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId",
    "sourcePath": "/calendar/v2/event_resource_requests",
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
  "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid": {
    "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid",
    "sourcePath": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
    "parentBindings": [
      {
        "sourceName": "event_resource_request_id",
        "fieldName": "getEventResourceRequestsEventResourceRequestIdResourceBookings_eventResourceRequestId"
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
  "searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId": {
    "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId",
    "sourcePath": "/calendar/v2/event_resource_requests",
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
  "searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid": {
    "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid",
    "sourcePath": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
    "parentBindings": [
      {
        "sourceName": "event_resource_request_id",
        "fieldName": "getEventResourceRequestsEventResourceRequestIdResource_eventResourceRequestId"
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
  "searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId": {
    "methodName": "searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId",
    "sourcePath": "/calendar/v2/event_resource_requests",
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
  "searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId": {
    "methodName": "searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId",
    "sourcePath": "/calendar/v2/event_resource_requests",
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
  "searchGetEventsEventIdAttachmentsEventId": {
    "methodName": "searchGetEventsEventIdAttachmentsEventId",
    "sourcePath": "/calendar/v2/events",
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
  "searchGetEventsEventIdEventInstancesEventId": {
    "methodName": "searchGetEventsEventIdEventInstancesEventId",
    "sourcePath": "/calendar/v2/events",
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
  "searchGetEventsEventIdOwnerEventId": {
    "methodName": "searchGetEventsEventIdOwnerEventId",
    "sourcePath": "/calendar/v2/events",
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
  "searchGetEventsEventIdResourceBookingsEventId": {
    "methodName": "searchGetEventsEventIdResourceBookingsEventId",
    "sourcePath": "/calendar/v2/events",
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
  "searchGetEventsEventIdResourceBookingsWhereresourceid": {
    "methodName": "searchGetEventsEventIdResourceBookingsWhereresourceid",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId": {
    "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId",
    "sourcePath": "/calendar/v2/resource_approval_groups",
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
  "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId": {
    "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId",
    "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals",
    "parentBindings": [
      {
        "sourceName": "resource_approval_group_id",
        "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_resourceApprovalGroupId"
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
  "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId": {
    "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId",
    "sourcePath": "/calendar/v2/resource_approval_groups",
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
  "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid": {
    "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid",
    "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals/{required_approval_id}/resource",
    "parentBindings": [
      {
        "sourceName": "resource_approval_group_id",
        "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_resourceApprovalGroupId"
      },
      {
        "sourceName": "required_approval_id",
        "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_requiredApprovalId"
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
  "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId": {
    "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId",
    "sourcePath": "/calendar/v2/resource_approval_groups",
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
  "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid": {
    "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid",
    "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/resources",
    "parentBindings": [
      {
        "sourceName": "resource_approval_group_id",
        "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdResources_resourceApprovalGroupId"
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
  "searchGetResourceApprovalGroupsWhereid": {
    "methodName": "searchGetResourceApprovalGroupsWhereid",
    "sourcePath": "/calendar/v2/resource_approval_groups",
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
  "searchGetResourceBookingsResourceBookingIdResourceResourceBookingId": {
    "methodName": "searchGetResourceBookingsResourceBookingIdResourceResourceBookingId",
    "sourcePath": "/calendar/v2/resource_bookings",
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
  "searchGetResourceBookingsResourceBookingIdResourceWhereid": {
    "methodName": "searchGetResourceBookingsResourceBookingIdResourceWhereid",
    "sourcePath": "/calendar/v2/resource_bookings/{resource_booking_id}/resource",
    "parentBindings": [
      {
        "sourceName": "resource_booking_id",
        "fieldName": "getResourceBookingsResourceBookingIdResource_resourceBookingId"
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
  "searchGetResourceBookingsWhereresourceid": {
    "methodName": "searchGetResourceBookingsWhereresourceid",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId": {
    "methodName": "searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId",
    "sourcePath": "/calendar/v2/resource_folders",
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
  "searchGetResourceFoldersResourceFolderIdResourcesWhereid": {
    "methodName": "searchGetResourceFoldersResourceFolderIdResourcesWhereid",
    "sourcePath": "/calendar/v2/resource_folders/{resource_folder_id}/resources",
    "parentBindings": [
      {
        "sourceName": "resource_folder_id",
        "fieldName": "getResourceFoldersResourceFolderIdResources_resourceFolderId"
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
  "searchGetResourcesResourceIdResourceApprovalGroupsResourceId": {
    "methodName": "searchGetResourcesResourceIdResourceApprovalGroupsResourceId",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetResourcesResourceIdResourceApprovalGroupsWhereid": {
    "methodName": "searchGetResourcesResourceIdResourceApprovalGroupsWhereid",
    "sourcePath": "/calendar/v2/resources/{resource_id}/resource_approval_groups",
    "parentBindings": [
      {
        "sourceName": "resource_id",
        "fieldName": "getResourcesResourceIdResourceApprovalGroups_resourceId"
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
  "searchGetResourcesResourceIdResourceBookingsResourceId": {
    "methodName": "searchGetResourcesResourceIdResourceBookingsResourceId",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetResourcesResourceIdResourceFolderResourceId": {
    "methodName": "searchGetResourcesResourceIdResourceFolderResourceId",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetResourcesResourceIdRoomSetupsResourceId": {
    "methodName": "searchGetResourcesResourceIdRoomSetupsResourceId",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetResourcesWhereid": {
    "methodName": "searchGetResourcesWhereid",
    "sourcePath": "/calendar/v2/resources",
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
  "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId": {
    "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId",
    "sourcePath": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions",
    "parentBindings": [
      {
        "sourceName": "room_setup_id",
        "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_roomSetupId"
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
  "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId": {
    "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId",
    "sourcePath": "/calendar/v2/room_setups",
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
  "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid": {
    "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid",
    "sourcePath": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions/{resource_suggestion_id}/resource",
    "parentBindings": [
      {
        "sourceName": "room_setup_id",
        "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_roomSetupId"
      },
      {
        "sourceName": "resource_suggestion_id",
        "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_resourceSuggestionId"
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
  "searchGetTagsTagIdEventInstancesTagId": {
    "methodName": "searchGetTagsTagIdEventInstancesTagId",
    "sourcePath": "/calendar/v2/tags",
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
};

const OPERATIONS: PollingOperation[] = [
  {
    "id": "getAttachments_createdAt",
    "resource": "Attachment",
    "cursorField": "created_at",
    "path": "/calendar/v2/attachments",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      }
    ]
  },
  {
    "id": "getAttachments_updatedAt",
    "resource": "Attachment",
    "cursorField": "updated_at",
    "path": "/calendar/v2/attachments",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      }
    ]
  },
  {
    "id": "getConflictsConflictIdResolvedBy_createdAt",
    "resource": "Conflict",
    "cursorField": "created_at",
    "path": "/calendar/v2/conflicts/{conflict_id}/resolved_by",
    "pathParameters": [
      {
        "name": "conflictId",
        "sourceName": "conflict_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetConflictsConflictIdResolvedByConflictId",
          "sourcePath": "/calendar/v2/conflicts",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getConflictsConflictIdResolvedBy_updatedAt",
    "resource": "Conflict",
    "cursorField": "updated_at",
    "path": "/calendar/v2/conflicts/{conflict_id}/resolved_by",
    "pathParameters": [
      {
        "name": "conflictId",
        "sourceName": "conflict_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetConflictsConflictIdResolvedByConflictId",
          "sourcePath": "/calendar/v2/conflicts",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getConflictsConflictIdResource_createdAt",
    "resource": "Conflict",
    "cursorField": "created_at",
    "path": "/calendar/v2/conflicts/{conflict_id}/resource",
    "pathParameters": [
      {
        "name": "conflictId",
        "sourceName": "conflict_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetConflictsConflictIdResourceConflictId",
          "sourcePath": "/calendar/v2/conflicts",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetConflictsConflictIdResourceWhereid",
          "sourcePath": "/calendar/v2/conflicts/{conflict_id}/resource",
          "parentBindings": [
            {
              "sourceName": "conflict_id",
              "fieldName": "getConflictsConflictIdResource_conflictId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getConflictsConflictIdResource_updatedAt",
    "resource": "Conflict",
    "cursorField": "updated_at",
    "path": "/calendar/v2/conflicts/{conflict_id}/resource",
    "pathParameters": [
      {
        "name": "conflictId",
        "sourceName": "conflict_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetConflictsConflictIdResourceConflictId",
          "sourcePath": "/calendar/v2/conflicts",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetConflictsConflictIdResourceWhereid",
          "sourcePath": "/calendar/v2/conflicts/{conflict_id}/resource",
          "parentBindings": [
            {
              "sourceName": "conflict_id",
              "fieldName": "getConflictsConflictIdResource_conflictId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getEventInstances_createdAt",
    "resource": "Event Instance",
    "cursorField": "created_at",
    "path": "/calendar/v2/event_instances",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsEventInstance",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventInstance]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsTagGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[TagGroup]"
      }
    ]
  },
  {
    "id": "getEventInstances_updatedAt",
    "resource": "Event Instance",
    "cursorField": "updated_at",
    "path": "/calendar/v2/event_instances",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsEventInstance",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventInstance]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsTagGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[TagGroup]"
      }
    ]
  },
  {
    "id": "getEventInstancesEventInstanceIdResourceBookings_createdAt",
    "resource": "Event Instance",
    "cursorField": "created_at",
    "path": "/calendar/v2/event_instances/{event_instance_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "eventInstanceId",
        "sourceName": "event_instance_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId",
          "sourcePath": "/calendar/v2/event_instances",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getEventInstancesEventInstanceIdResourceBookings_updatedAt",
    "resource": "Event Instance",
    "cursorField": "updated_at",
    "path": "/calendar/v2/event_instances/{event_instance_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "eventInstanceId",
        "sourceName": "event_instance_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId",
          "sourcePath": "/calendar/v2/event_instances",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt",
    "resource": "Event Resource Request",
    "cursorField": "created_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/created_by",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt",
    "resource": "Event Resource Request",
    "cursorField": "updated_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/created_by",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdResource_createdAt",
    "resource": "Event Resource Request",
    "cursorField": "created_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid",
          "sourcePath": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
          "parentBindings": [
            {
              "sourceName": "event_resource_request_id",
              "fieldName": "getEventResourceRequestsEventResourceRequestIdResource_eventResourceRequestId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdResource_updatedAt",
    "resource": "Event Resource Request",
    "cursorField": "updated_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid",
          "sourcePath": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
          "parentBindings": [
            {
              "sourceName": "event_resource_request_id",
              "fieldName": "getEventResourceRequestsEventResourceRequestIdResource_eventResourceRequestId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt",
    "resource": "Event Resource Request",
    "cursorField": "created_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
          "parentBindings": [
            {
              "sourceName": "event_resource_request_id",
              "fieldName": "getEventResourceRequestsEventResourceRequestIdResourceBookings_eventResourceRequestId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt",
    "resource": "Event Resource Request",
    "cursorField": "updated_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/event_resource_requests/{event_resource_request_id}/resource",
          "parentBindings": [
            {
              "sourceName": "event_resource_request_id",
              "fieldName": "getEventResourceRequestsEventResourceRequestIdResourceBookings_eventResourceRequestId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt",
    "resource": "Event Resource Request",
    "cursorField": "created_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/room_setup",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt",
    "resource": "Event Resource Request",
    "cursorField": "updated_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/room_setup",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt",
    "resource": "Event Resource Request",
    "cursorField": "created_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/updated_by",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt",
    "resource": "Event Resource Request",
    "cursorField": "updated_at",
    "path": "/calendar/v2/event_resource_requests/{event_resource_request_id}/updated_by",
    "pathParameters": [
      {
        "name": "eventResourceRequestId",
        "sourceName": "event_resource_request_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId",
          "sourcePath": "/calendar/v2/event_resource_requests",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getEventsEventIdAttachments_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/calendar/v2/events/{event_id}/attachments",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttachmentsEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      }
    ]
  },
  {
    "id": "getEventsEventIdAttachments_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/calendar/v2/events/{event_id}/attachments",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttachmentsEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      }
    ]
  },
  {
    "id": "getEventsEventIdEventInstances_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/calendar/v2/events/{event_id}/event_instances",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdEventInstancesEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsEventInstance",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventInstance]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsTagGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[TagGroup]"
      }
    ]
  },
  {
    "id": "getEventsEventIdEventInstances_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/calendar/v2/events/{event_id}/event_instances",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdEventInstancesEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsEventInstance",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventInstance]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsTagGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[TagGroup]"
      }
    ]
  },
  {
    "id": "getEventsEventIdOwner_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/calendar/v2/events/{event_id}/owner",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdOwnerEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getEventsEventIdOwner_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/calendar/v2/events/{event_id}/owner",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdOwnerEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getEventsEventIdResourceBookings_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/calendar/v2/events/{event_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdResourceBookingsEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetEventsEventIdResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getEventsEventIdResourceBookings_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/calendar/v2/events/{event_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdResourceBookingsEventId",
          "sourcePath": "/calendar/v2/events",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetEventsEventIdResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getPeople_createdAt",
    "resource": "Person",
    "cursorField": "created_at",
    "path": "/calendar/v2/people",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getPeople_updatedAt",
    "resource": "Person",
    "cursorField": "updated_at",
    "path": "/calendar/v2/people",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroups_createdAt",
    "resource": "Resource Approval Group",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_approval_groups",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsWhereid",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroups_updatedAt",
    "resource": "Resource Approval Group",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_approval_groups",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsWhereid",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt",
    "resource": "Resource Approval Group",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/people",
    "pathParameters": [
      {
        "name": "resourceApprovalGroupId",
        "sourceName": "resource_approval_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt",
    "resource": "Resource Approval Group",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/people",
    "pathParameters": [
      {
        "name": "resourceApprovalGroupId",
        "sourceName": "resource_approval_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt",
    "resource": "Resource Approval Group",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals/{required_approval_id}/resource",
    "pathParameters": [
      {
        "name": "resourceApprovalGroupId",
        "sourceName": "resource_approval_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
        "name": "requiredApprovalId",
        "sourceName": "required_approval_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId",
          "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals",
          "parentBindings": [
            {
              "sourceName": "resource_approval_group_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_resourceApprovalGroupId"
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid",
          "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals/{required_approval_id}/resource",
          "parentBindings": [
            {
              "sourceName": "resource_approval_group_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_resourceApprovalGroupId"
            },
            {
              "sourceName": "required_approval_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_requiredApprovalId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt",
    "resource": "Resource Approval Group",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals/{required_approval_id}/resource",
    "pathParameters": [
      {
        "name": "resourceApprovalGroupId",
        "sourceName": "resource_approval_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
        "name": "requiredApprovalId",
        "sourceName": "required_approval_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId",
          "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals",
          "parentBindings": [
            {
              "sourceName": "resource_approval_group_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_resourceApprovalGroupId"
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid",
          "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/required_approvals/{required_approval_id}/resource",
          "parentBindings": [
            {
              "sourceName": "resource_approval_group_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_resourceApprovalGroupId"
            },
            {
              "sourceName": "required_approval_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_requiredApprovalId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt",
    "resource": "Resource Approval Group",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/resources",
    "pathParameters": [
      {
        "name": "resourceApprovalGroupId",
        "sourceName": "resource_approval_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid",
          "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/resources",
          "parentBindings": [
            {
              "sourceName": "resource_approval_group_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdResources_resourceApprovalGroupId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt",
    "resource": "Resource Approval Group",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/resources",
    "pathParameters": [
      {
        "name": "resourceApprovalGroupId",
        "sourceName": "resource_approval_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId",
          "sourcePath": "/calendar/v2/resource_approval_groups",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid",
          "sourcePath": "/calendar/v2/resource_approval_groups/{resource_approval_group_id}/resources",
          "parentBindings": [
            {
              "sourceName": "resource_approval_group_id",
              "fieldName": "getResourceApprovalGroupsResourceApprovalGroupIdResources_resourceApprovalGroupId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourceBookings_createdAt",
    "resource": "Resource Booking",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_bookings",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourceBookings_updatedAt",
    "resource": "Resource Booking",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_bookings",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereresourceid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[resource][id]",
        "lookup": {
          "methodName": "searchGetResourceBookingsWhereresourceid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourceBookingsResourceBookingIdResource_createdAt",
    "resource": "Resource Booking",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_bookings/{resource_booking_id}/resource",
    "pathParameters": [
      {
        "name": "resourceBookingId",
        "sourceName": "resource_booking_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceBookingsResourceBookingIdResourceResourceBookingId",
          "sourcePath": "/calendar/v2/resource_bookings",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceBookingsResourceBookingIdResourceWhereid",
          "sourcePath": "/calendar/v2/resource_bookings/{resource_booking_id}/resource",
          "parentBindings": [
            {
              "sourceName": "resource_booking_id",
              "fieldName": "getResourceBookingsResourceBookingIdResource_resourceBookingId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourceBookingsResourceBookingIdResource_updatedAt",
    "resource": "Resource Booking",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_bookings/{resource_booking_id}/resource",
    "pathParameters": [
      {
        "name": "resourceBookingId",
        "sourceName": "resource_booking_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceBookingsResourceBookingIdResourceResourceBookingId",
          "sourcePath": "/calendar/v2/resource_bookings",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceBookingsResourceBookingIdResourceWhereid",
          "sourcePath": "/calendar/v2/resource_bookings/{resource_booking_id}/resource",
          "parentBindings": [
            {
              "sourceName": "resource_booking_id",
              "fieldName": "getResourceBookingsResourceBookingIdResource_resourceBookingId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourceFolders_createdAt",
    "resource": "Resource Folder",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_folders",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourceFolders_updatedAt",
    "resource": "Resource Folder",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_folders",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourceFoldersResourceFolderIdResources_createdAt",
    "resource": "Resource Folder",
    "cursorField": "created_at",
    "path": "/calendar/v2/resource_folders/{resource_folder_id}/resources",
    "pathParameters": [
      {
        "name": "resourceFolderId",
        "sourceName": "resource_folder_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId",
          "sourcePath": "/calendar/v2/resource_folders",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceFoldersResourceFolderIdResourcesWhereid",
          "sourcePath": "/calendar/v2/resource_folders/{resource_folder_id}/resources",
          "parentBindings": [
            {
              "sourceName": "resource_folder_id",
              "fieldName": "getResourceFoldersResourceFolderIdResources_resourceFolderId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourceFoldersResourceFolderIdResources_updatedAt",
    "resource": "Resource Folder",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resource_folders/{resource_folder_id}/resources",
    "pathParameters": [
      {
        "name": "resourceFolderId",
        "sourceName": "resource_folder_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId",
          "sourcePath": "/calendar/v2/resource_folders",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourceFoldersResourceFolderIdResourcesWhereid",
          "sourcePath": "/calendar/v2/resource_folders/{resource_folder_id}/resources",
          "parentBindings": [
            {
              "sourceName": "resource_folder_id",
              "fieldName": "getResourceFoldersResourceFolderIdResources_resourceFolderId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResources_createdAt",
    "resource": "Resource",
    "cursorField": "created_at",
    "path": "/calendar/v2/resources",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourcesWhereid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResources_updatedAt",
    "resource": "Resource",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resources",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourcesWhereid",
          "sourcePath": "/calendar/v2/resources",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdResourceApprovalGroups_createdAt",
    "resource": "Resource",
    "cursorField": "created_at",
    "path": "/calendar/v2/resources/{resource_id}/resource_approval_groups",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceApprovalGroupsResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceApprovalGroupsWhereid",
          "sourcePath": "/calendar/v2/resources/{resource_id}/resource_approval_groups",
          "parentBindings": [
            {
              "sourceName": "resource_id",
              "fieldName": "getResourcesResourceIdResourceApprovalGroups_resourceId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdResourceApprovalGroups_updatedAt",
    "resource": "Resource",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resources/{resource_id}/resource_approval_groups",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceApprovalGroupsResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceApprovalGroupsWhereid",
          "sourcePath": "/calendar/v2/resources/{resource_id}/resource_approval_groups",
          "parentBindings": [
            {
              "sourceName": "resource_id",
              "fieldName": "getResourcesResourceIdResourceApprovalGroups_resourceId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdResourceBookings_createdAt",
    "resource": "Resource",
    "cursorField": "created_at",
    "path": "/calendar/v2/resources/{resource_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceBookingsResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdResourceBookings_updatedAt",
    "resource": "Resource",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resources/{resource_id}/resource_bookings",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceBookingsResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdResourceFolder_createdAt",
    "resource": "Resource",
    "cursorField": "created_at",
    "path": "/calendar/v2/resources/{resource_id}/resource_folder",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceFolderResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdResourceFolder_updatedAt",
    "resource": "Resource",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resources/{resource_id}/resource_folder",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdResourceFolderResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdRoomSetups_createdAt",
    "resource": "Resource",
    "cursorField": "created_at",
    "path": "/calendar/v2/resources/{resource_id}/room_setups",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdRoomSetupsResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      }
    ]
  },
  {
    "id": "getResourcesResourceIdRoomSetups_updatedAt",
    "resource": "Resource",
    "cursorField": "updated_at",
    "path": "/calendar/v2/resources/{resource_id}/room_setups",
    "pathParameters": [
      {
        "name": "resourceId",
        "sourceName": "resource_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetResourcesResourceIdRoomSetupsResourceId",
          "sourcePath": "/calendar/v2/resources",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      }
    ]
  },
  {
    "id": "getRoomSetups_createdAt",
    "resource": "Room Setup",
    "cursorField": "created_at",
    "path": "/calendar/v2/room_setups",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      }
    ]
  },
  {
    "id": "getRoomSetups_updatedAt",
    "resource": "Room Setup",
    "cursorField": "updated_at",
    "path": "/calendar/v2/room_setups",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      }
    ]
  },
  {
    "id": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt",
    "resource": "Room Setup",
    "cursorField": "created_at",
    "path": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions/{resource_suggestion_id}/resource",
    "pathParameters": [
      {
        "name": "roomSetupId",
        "sourceName": "room_setup_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId",
          "sourcePath": "/calendar/v2/room_setups",
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
        "name": "resourceSuggestionId",
        "sourceName": "resource_suggestion_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId",
          "sourcePath": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions",
          "parentBindings": [
            {
              "sourceName": "room_setup_id",
              "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_roomSetupId"
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid",
          "sourcePath": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions/{resource_suggestion_id}/resource",
          "parentBindings": [
            {
              "sourceName": "room_setup_id",
              "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_roomSetupId"
            },
            {
              "sourceName": "resource_suggestion_id",
              "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_resourceSuggestionId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt",
    "resource": "Room Setup",
    "cursorField": "updated_at",
    "path": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions/{resource_suggestion_id}/resource",
    "pathParameters": [
      {
        "name": "roomSetupId",
        "sourceName": "room_setup_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId",
          "sourcePath": "/calendar/v2/room_setups",
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
        "name": "resourceSuggestionId",
        "sourceName": "resource_suggestion_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId",
          "sourcePath": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions",
          "parentBindings": [
            {
              "sourceName": "room_setup_id",
              "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_roomSetupId"
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "wherename",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid",
          "sourcePath": "/calendar/v2/room_setups/{room_setup_id}/resource_suggestions/{resource_suggestion_id}/resource",
          "parentBindings": [
            {
              "sourceName": "room_setup_id",
              "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_roomSetupId"
            },
            {
              "sourceName": "resource_suggestion_id",
              "fieldName": "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_resourceSuggestionId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsResourceApprovalGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceApprovalGroup]"
      },
      {
        "name": "fieldsResourceFolder",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceFolder]"
      },
      {
        "name": "fieldsResourceQuestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceQuestion]"
      },
      {
        "name": "fieldsRoomSetup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[RoomSetup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResourceSuggestion",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceSuggestion]"
      }
    ]
  },
  {
    "id": "getTagsTagIdEventInstances_createdAt",
    "resource": "Tags",
    "cursorField": "created_at",
    "path": "/calendar/v2/tags/{tag_id}/event_instances",
    "pathParameters": [
      {
        "name": "tagId",
        "sourceName": "tag_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetTagsTagIdEventInstancesTagId",
          "sourcePath": "/calendar/v2/tags",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "whereupdatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[updated_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[updated_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[updated_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[updated_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[updated_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsEventInstance",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventInstance]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsTagGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[TagGroup]"
      }
    ]
  },
  {
    "id": "getTagsTagIdEventInstances_updatedAt",
    "resource": "Tags",
    "cursorField": "updated_at",
    "path": "/calendar/v2/tags/{tag_id}/event_instances",
    "pathParameters": [
      {
        "name": "tagId",
        "sourceName": "tag_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetTagsTagIdEventInstancesTagId",
          "sourcePath": "/calendar/v2/tags",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherecreatedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[created_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[created_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[created_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[created_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[created_at][lte]"
          }
        ]
      },
      {
        "name": "whereendsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[ends_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[ends_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[ends_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[ends_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[ends_at][lte]"
          }
        ]
      },
      {
        "name": "wherestartsAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[starts_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[starts_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[starts_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[starts_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[starts_at][lte]"
          }
        ]
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsEventInstance",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventInstance]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsResourceBooking",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[ResourceBooking]"
      },
      {
        "name": "fieldsTag",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Tag]"
      },
      {
        "name": "fieldsAttachment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Attachment]"
      },
      {
        "name": "fieldsCalendar",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Calendar]"
      },
      {
        "name": "fieldsEventResourceRequest",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventResourceRequest]"
      },
      {
        "name": "fieldsFeed",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Feed]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsResource",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Resource]"
      },
      {
        "name": "fieldsTagGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[TagGroup]"
      }
    ]
  }
];

const NODE_PROPERTIES = [
    {
      displayName: 'Delivery Limitations',
      name: 'deliveryLimitations',
      type: 'notice',
      default: '',
      description: 'Polling may deliver duplicates. A successfully returned batch is not replayed solely because a downstream node fails, and deleted resources are not detected. See the package polling documentation for idempotency, retry, and other limitations.',
    },
    {
      displayName: 'Resource',
      name: 'resource',
      type: 'options',
      noDataExpression: true,
      options: [{"name":"Attachment","value":"Attachment"},{"name":"Conflict","value":"Conflict"},{"name":"Event","value":"Event"},{"name":"Event Instance","value":"Event Instance"},{"name":"Event Resource Request","value":"Event Resource Request"},{"name":"Person","value":"Person"},{"name":"Resource","value":"Resource"},{"name":"Resource Approval Group","value":"Resource Approval Group"},{"name":"Resource Booking","value":"Resource Booking"},{"name":"Resource Folder","value":"Resource Folder"},{"name":"Room Setup","value":"Room Setup"},{"name":"Tags","value":"Tags"}],
      default: "Attachment",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Attachment"]}},
      options: [{"name":"Created","value":"getAttachments_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Attachment created"},{"name":"Created or Updated","value":"getAttachments_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Attachment created or updated"}],
      default: "getAttachments_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Conflict"]}},
      options: [{"name":"Created (via Conflict Resolved By)","value":"getConflictsConflictIdResolvedBy_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Conflict created (via Conflict Resolved By)"},{"name":"Created or Updated (via Conflict Resolved By)","value":"getConflictsConflictIdResolvedBy_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Conflict created or updated (via Conflict Resolved By)"},{"name":"Created (via Conflict Resource)","value":"getConflictsConflictIdResource_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Conflict created (via Conflict Resource)"},{"name":"Created or Updated (via Conflict Resource)","value":"getConflictsConflictIdResource_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Conflict created or updated (via Conflict Resource)"}],
      default: "getConflictsConflictIdResolvedBy_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Event"]}},
      options: [{"name":"Created (via Event Attachments)","value":"getEventsEventIdAttachments_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Event Attachments)"},{"name":"Created or Updated (via Event Attachments)","value":"getEventsEventIdAttachments_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Event Attachments)"},{"name":"Created (via Event Event Instances)","value":"getEventsEventIdEventInstances_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Event Event Instances)"},{"name":"Created or Updated (via Event Event Instances)","value":"getEventsEventIdEventInstances_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Event Event Instances)"},{"name":"Created (via Event Owner)","value":"getEventsEventIdOwner_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Event Owner)"},{"name":"Created or Updated (via Event Owner)","value":"getEventsEventIdOwner_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Event Owner)"},{"name":"Created (via Event Resource Bookings)","value":"getEventsEventIdResourceBookings_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Event Resource Bookings)"},{"name":"Created or Updated (via Event Resource Bookings)","value":"getEventsEventIdResourceBookings_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Event Resource Bookings)"}],
      default: "getEventsEventIdAttachments_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Event Instance"]}},
      options: [{"name":"Created","value":"getEventInstances_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Instance created"},{"name":"Created or Updated","value":"getEventInstances_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Instance created or updated"},{"name":"Created (via Event Instance)","value":"getEventInstancesEventInstanceIdResourceBookings_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Instance created (via Event Instance)"},{"name":"Created or Updated (via Event Instance)","value":"getEventInstancesEventInstanceIdResourceBookings_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Instance created or updated (via Event Instance)"}],
      default: "getEventInstances_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Event Resource Request"]}},
      options: [{"name":"Created (via Event Resource Request Created By)","value":"getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Resource Request created (via Event Resource Request Created By)"},{"name":"Created or Updated (via Event Resource Request Created By)","value":"getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Resource Request created or updated (via Event Resource Request Created By)"},{"name":"Created (via Event Resource Request Resource)","value":"getEventResourceRequestsEventResourceRequestIdResource_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Resource Request created (via Event Resource Request Resource)"},{"name":"Created or Updated (via Event Resource Request Resource)","value":"getEventResourceRequestsEventResourceRequestIdResource_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Resource Request created or updated (via Event Resource Request Resource)"},{"name":"Created (via Event Resource Request Resource Bookings)","value":"getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Resource Request created (via Event Resource Request Resource Bookings)"},{"name":"Created or Updated (via Event Resource Request Resource Bookings)","value":"getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Resource Request created or updated (via Event Resource Request Resource Bookings)"},{"name":"Created (via Event Resource Request Room Setup)","value":"getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Resource Request created (via Event Resource Request Room Setup)"},{"name":"Created or Updated (via Event Resource Request Room Setup)","value":"getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Resource Request created or updated (via Event Resource Request Room Setup)"},{"name":"Created (via Event Resource Request Updated By)","value":"getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Resource Request created (via Event Resource Request Updated By)"},{"name":"Created or Updated (via Event Resource Request Updated By)","value":"getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Resource Request created or updated (via Event Resource Request Updated By)"}],
      default: "getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Person"]}},
      options: [{"name":"Created","value":"getPeople_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Person created"},{"name":"Created or Updated","value":"getPeople_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Person created or updated"}],
      default: "getPeople_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Resource"]}},
      options: [{"name":"Created","value":"getResources_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource created"},{"name":"Created or Updated","value":"getResources_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource created or updated"},{"name":"Created (via Resource Resource Approval Groups)","value":"getResourcesResourceIdResourceApprovalGroups_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource created (via Resource Resource Approval Groups)"},{"name":"Created or Updated (via Resource Resource Approval Groups)","value":"getResourcesResourceIdResourceApprovalGroups_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource created or updated (via Resource Resource Approval Groups)"},{"name":"Created (via Resource Resource Bookings)","value":"getResourcesResourceIdResourceBookings_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource created (via Resource Resource Bookings)"},{"name":"Created or Updated (via Resource Resource Bookings)","value":"getResourcesResourceIdResourceBookings_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource created or updated (via Resource Resource Bookings)"},{"name":"Created (via Resource Resource Folder)","value":"getResourcesResourceIdResourceFolder_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource created (via Resource Resource Folder)"},{"name":"Created or Updated (via Resource Resource Folder)","value":"getResourcesResourceIdResourceFolder_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource created or updated (via Resource Resource Folder)"},{"name":"Created (via Resource Room Setups)","value":"getResourcesResourceIdRoomSetups_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource created (via Resource Room Setups)"},{"name":"Created or Updated (via Resource Room Setups)","value":"getResourcesResourceIdRoomSetups_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource created or updated (via Resource Room Setups)"}],
      default: "getResources_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Resource Approval Group"]}},
      options: [{"name":"Created","value":"getResourceApprovalGroups_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Approval Group created"},{"name":"Created or Updated","value":"getResourceApprovalGroups_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Approval Group created or updated"},{"name":"Created (via Resource Approval Group People)","value":"getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Approval Group created (via Resource Approval Group People)"},{"name":"Created or Updated (via Resource Approval Group People)","value":"getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Approval Group created or updated (via Resource Approval Group People)"},{"name":"Created (via Required Approval)","value":"getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Approval Group created (via Required Approval)"},{"name":"Created or Updated (via Required Approval)","value":"getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Approval Group created or updated (via Required Approval)"},{"name":"Created (via Resource Approval Group Resources)","value":"getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Approval Group created (via Resource Approval Group Resources)"},{"name":"Created or Updated (via Resource Approval Group Resources)","value":"getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Approval Group created or updated (via Resource Approval Group Resources)"}],
      default: "getResourceApprovalGroups_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Resource Booking"]}},
      options: [{"name":"Created","value":"getResourceBookings_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Booking created"},{"name":"Created or Updated","value":"getResourceBookings_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Booking created or updated"},{"name":"Created (via Resource Booking)","value":"getResourceBookingsResourceBookingIdResource_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Booking created (via Resource Booking)"},{"name":"Created or Updated (via Resource Booking)","value":"getResourceBookingsResourceBookingIdResource_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Booking created or updated (via Resource Booking)"}],
      default: "getResourceBookings_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Resource Folder"]}},
      options: [{"name":"Created","value":"getResourceFolders_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Folder created"},{"name":"Created or Updated","value":"getResourceFolders_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Folder created or updated"},{"name":"Created (via Resource Folder)","value":"getResourceFoldersResourceFolderIdResources_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Resource Folder created (via Resource Folder)"},{"name":"Created or Updated (via Resource Folder)","value":"getResourceFoldersResourceFolderIdResources_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Resource Folder created or updated (via Resource Folder)"}],
      default: "getResourceFolders_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Room Setup"]}},
      options: [{"name":"Created","value":"getRoomSetups_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Room Setup created"},{"name":"Created or Updated","value":"getRoomSetups_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Room Setup created or updated"},{"name":"Created (via Resource Suggestion)","value":"getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Room Setup created (via Resource Suggestion)"},{"name":"Created or Updated (via Resource Suggestion)","value":"getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Room Setup created or updated (via Resource Suggestion)"}],
      default: "getRoomSetups_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Tags"]}},
      options: [{"name":"Created (via Tag)","value":"getTagsTagIdEventInstances_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Tags created (via Tag)"},{"name":"Created or Updated (via Tag)","value":"getTagsTagIdEventInstances_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Tags created or updated (via Tag)"}],
      default: "getTagsTagIdEventInstances_createdAt",
    },
    {
      displayName: 'Start Time',
      name: 'startTime',
      type: 'dateTime',
      default: '',
      description: 'Leave empty for new changes only. A past or current value starts inclusive historical catch-up at the first configured Poll Time; a future value waits without resource output.',
    },
    {
      displayName: 'Max Records Per Poll',
      name: 'maxRecordsPerPoll',
      type: 'number',
      default: 100,
      typeOptions: { minValue: 1, maxValue: 1000, numberPrecision: 0 },
      description: 'Emits at most one capped batch per Poll Time. A larger backlog continues over later Poll Times.',
    },
    {
      displayName: "Filter",
      name: "getAttachments_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Attachment"],"operation":["getAttachments_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getAttachments_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Attachment"],"operation":["getAttachments_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getAttachments_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Attachment"],"operation":["getAttachments_createdAt"]}},
      options: [{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getAttachments_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Attachment"],"operation":["getAttachments_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getAttachments_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Attachment"],"operation":["getAttachments_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getAttachments_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Attachment"],"operation":["getAttachments_updatedAt"]}},
      options: [{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Conflict ID",
      name: "getConflictsConflictIdResolvedBy_createdAt_conflictId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetConflictsConflictIdResolvedByConflictId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getConflictsConflictIdResolvedBy_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getConflictsConflictIdResolvedBy_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getConflictsConflictIdResolvedBy_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_createdAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Conflict ID",
      name: "getConflictsConflictIdResolvedBy_updatedAt_conflictId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetConflictsConflictIdResolvedByConflictId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getConflictsConflictIdResolvedBy_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getConflictsConflictIdResolvedBy_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getConflictsConflictIdResolvedBy_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResolvedBy_updatedAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Conflict ID",
      name: "getConflictsConflictIdResource_createdAt_conflictId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetConflictsConflictIdResourceConflictId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getConflictsConflictIdResource_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetConflictsConflictIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getConflictsConflictIdResource_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getConflictsConflictIdResource_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Conflict ID",
      name: "getConflictsConflictIdResource_updatedAt_conflictId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetConflictsConflictIdResourceConflictId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getConflictsConflictIdResource_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetConflictsConflictIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getConflictsConflictIdResource_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getConflictsConflictIdResource_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Conflict"],"operation":["getConflictsConflictIdResource_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getEventInstances_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstances_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventInstances_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstances_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Resource Bookings","value":"resource_bookings"},{"name":"Resource Bookings Event Resource Request","value":"resource_bookings.event_resource_request"},{"name":"Resource Bookings Resource","value":"resource_bookings.resource"},{"name":"Tags","value":"tags"},{"name":"Tags Tag Group","value":"tags.tag_group"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventInstances_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstances_createdAt"]}},
      options: [{"displayName":"Fields[Event Instance]","name":"fieldsEventInstance","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag Group]","name":"fieldsTagGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getEventInstances_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstances_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventInstances_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstances_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Resource Bookings","value":"resource_bookings"},{"name":"Resource Bookings Event Resource Request","value":"resource_bookings.event_resource_request"},{"name":"Resource Bookings Resource","value":"resource_bookings.resource"},{"name":"Tags","value":"tags"},{"name":"Tags Tag Group","value":"tags.tag_group"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventInstances_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstances_updatedAt"]}},
      options: [{"displayName":"Fields[Event Instance]","name":"fieldsEventInstance","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag Group]","name":"fieldsTagGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Instance ID",
      name: "getEventInstancesEventInstanceIdResourceBookings_createdAt_eventInstanceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventInstancesEventInstanceIdResourceBookings_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventInstancesEventInstanceIdResourceBookings_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventInstancesEventInstanceIdResourceBookings_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Instance ID",
      name: "getEventInstancesEventInstanceIdResourceBookings_updatedAt_eventInstanceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventInstancesEventInstanceIdResourceBookings_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventInstancesEventInstanceIdResourceBookings_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventInstancesEventInstanceIdResourceBookings_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Instance"],"operation":["getEventInstancesEventInstanceIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_createdAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdCreatedBy_updatedAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdResource_createdAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdResource_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdResource_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdResource_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdResource_updatedAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdResource_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdResource_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdResource_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResource_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Containing Resource","value":"containing_resource"},{"name":"Resource Suggestions","value":"resource_suggestions"},{"name":"Resource Suggestions Resource","value":"resource_suggestions.resource"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_createdAt"]}},
      options: [{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Containing Resource","value":"containing_resource"},{"name":"Resource Suggestions","value":"resource_suggestions"},{"name":"Resource Suggestions Resource","value":"resource_suggestions.resource"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdRoomSetup_updatedAt"]}},
      options: [{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_createdAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Resource Request ID",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt_eventResourceRequestId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Resource Request"],"operation":["getEventResourceRequestsEventResourceRequestIdUpdatedBy_updatedAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdAttachments_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdAttachmentsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdAttachments_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdAttachments_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdAttachments_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_createdAt"]}},
      options: [{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdAttachments_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdAttachmentsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdAttachments_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdAttachments_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdAttachments_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttachments_updatedAt"]}},
      options: [{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdEventInstances_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdEventInstancesEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdEventInstances_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdEventInstances_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Resource Bookings","value":"resource_bookings"},{"name":"Resource Bookings Event Resource Request","value":"resource_bookings.event_resource_request"},{"name":"Resource Bookings Resource","value":"resource_bookings.resource"},{"name":"Tags","value":"tags"},{"name":"Tags Tag Group","value":"tags.tag_group"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdEventInstances_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_createdAt"]}},
      options: [{"displayName":"Fields[Event Instance]","name":"fieldsEventInstance","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag Group]","name":"fieldsTagGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdEventInstances_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdEventInstancesEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdEventInstances_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdEventInstances_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Resource Bookings","value":"resource_bookings"},{"name":"Resource Bookings Event Resource Request","value":"resource_bookings.event_resource_request"},{"name":"Resource Bookings Resource","value":"resource_bookings.resource"},{"name":"Tags","value":"tags"},{"name":"Tags Tag Group","value":"tags.tag_group"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdEventInstances_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdEventInstances_updatedAt"]}},
      options: [{"displayName":"Fields[Event Instance]","name":"fieldsEventInstance","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag Group]","name":"fieldsTagGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdOwner_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdOwnerEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdOwner_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdOwner_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdOwner_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_createdAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdOwner_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdOwnerEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdOwner_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdOwner_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdOwner_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdOwner_updatedAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdResourceBookings_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdResourceBookingsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdResourceBookings_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdResourceBookings_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdResourceBookings_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdResourceBookings_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdResourceBookingsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdResourceBookings_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdResourceBookings_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdResourceBookings_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getPeople_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeople_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeople_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeople_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeople_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeople_createdAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getPeople_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeople_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeople_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeople_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeople_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeople_updatedAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroups_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroups_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroups_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroups_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"People","value":"people"},{"name":"People Organization","value":"people.organization"},{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroups_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroups_createdAt"]}},
      options: [{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroups_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroups_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroups_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroups_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"People","value":"people"},{"name":"People Organization","value":"people.organization"},{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroups_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroups_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Approval Group ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt_resourceApprovalGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_createdAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Approval Group ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt_resourceApprovalGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Organization","value":"organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdPeople_updatedAt"]}},
      options: [{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Approval Group ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt_resourceApprovalGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt"]}},
    },
    {
      displayName: "Required Approval ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt_requiredApprovalId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Approval Group ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt_resourceApprovalGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt"]}},
    },
    {
      displayName: "Required Approval ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt_requiredApprovalId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResource_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Approval Group ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt_resourceApprovalGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Approval Group ID",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt_resourceApprovalGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Approval Group"],"operation":["getResourceApprovalGroupsResourceApprovalGroupIdResources_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResourceBookings_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookings_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceBookings_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookings_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceBookings_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookings_createdAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResourceBookings_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookings_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Resource ID","name":"whereresourceid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceBookingsWhereresourceid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceBookings_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookings_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceBookings_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookings_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Booking ID",
      name: "getResourceBookingsResourceBookingIdResource_createdAt_resourceBookingId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceBookingsResourceBookingIdResourceResourceBookingId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceBookingsResourceBookingIdResource_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceBookingsResourceBookingIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceBookingsResourceBookingIdResource_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceBookingsResourceBookingIdResource_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Booking ID",
      name: "getResourceBookingsResourceBookingIdResource_updatedAt_resourceBookingId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceBookingsResourceBookingIdResourceResourceBookingId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceBookingsResourceBookingIdResource_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceBookingsResourceBookingIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceBookingsResourceBookingIdResource_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceBookingsResourceBookingIdResource_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Booking"],"operation":["getResourceBookingsResourceBookingIdResource_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResourceFolders_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFolders_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourceFolders_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFolders_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceFolders_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFolders_createdAt"]}},
      options: [{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResourceFolders_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFolders_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourceFolders_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFolders_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceFolders_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFolders_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Folder ID",
      name: "getResourceFoldersResourceFolderIdResources_createdAt_resourceFolderId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceFoldersResourceFolderIdResources_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceFoldersResourceFolderIdResourcesWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceFoldersResourceFolderIdResources_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceFoldersResourceFolderIdResources_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource Folder ID",
      name: "getResourceFoldersResourceFolderIdResources_updatedAt_resourceFolderId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourceFoldersResourceFolderIdResources_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourceFoldersResourceFolderIdResourcesWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourceFoldersResourceFolderIdResources_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourceFoldersResourceFolderIdResources_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource Folder"],"operation":["getResourceFoldersResourceFolderIdResources_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResources_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResources_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResources_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResources_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResources_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResources_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getResources_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResources_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResources_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResources_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResources_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResources_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdResourceApprovalGroups_createdAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceApprovalGroupsResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdResourceApprovalGroups_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceApprovalGroupsWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdResourceApprovalGroups_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"People","value":"people"},{"name":"People Organization","value":"people.organization"},{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdResourceApprovalGroups_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_createdAt"]}},
      options: [{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdResourceApprovalGroups_updatedAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceApprovalGroupsResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdResourceApprovalGroups_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceApprovalGroupsWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdResourceApprovalGroups_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"People","value":"people"},{"name":"People Organization","value":"people.organization"},{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdResourceApprovalGroups_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceApprovalGroups_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdResourceBookings_createdAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceBookingsResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdResourceBookings_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdResourceBookings_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdResourceBookings_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_createdAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdResourceBookings_updatedAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceBookingsResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdResourceBookings_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdResourceBookings_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event Resource Request","value":"event_resource_request"},{"name":"Event Resource Request Created By","value":"event_resource_request.created_by"},{"name":"Event Resource Request Event","value":"event_resource_request.event"},{"name":"Event Resource Request Resource","value":"event_resource_request.resource"},{"name":"Event Resource Request Room Setup","value":"event_resource_request.room_setup"},{"name":"Event Resource Request Updated By","value":"event_resource_request.updated_by"},{"name":"Resource","value":"resource"},{"name":"Resource Resource Approval Groups","value":"resource.resource_approval_groups"},{"name":"Resource Resource Folder","value":"resource.resource_folder"},{"name":"Resource Resource Questions","value":"resource.resource_questions"},{"name":"Resource Room Setups","value":"resource.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdResourceBookings_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceBookings_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdResourceFolder_createdAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceFolderResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdResourceFolder_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdResourceFolder_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdResourceFolder_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_createdAt"]}},
      options: [{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdResourceFolder_updatedAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdResourceFolderResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdResourceFolder_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdResourceFolder_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resources","value":"resources"},{"name":"Resources Resource Approval Groups","value":"resources.resource_approval_groups"},{"name":"Resources Resource Folder","value":"resources.resource_folder"},{"name":"Resources Resource Questions","value":"resources.resource_questions"},{"name":"Resources Room Setups","value":"resources.room_setups"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdResourceFolder_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdResourceFolder_updatedAt"]}},
      options: [{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdRoomSetups_createdAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdRoomSetupsResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdRoomSetups_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdRoomSetups_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Containing Resource","value":"containing_resource"},{"name":"Resource Suggestions","value":"resource_suggestions"},{"name":"Resource Suggestions Resource","value":"resource_suggestions.resource"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdRoomSetups_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_createdAt"]}},
      options: [{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Resource ID",
      name: "getResourcesResourceIdRoomSetups_updatedAt_resourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetResourcesResourceIdRoomSetupsResourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getResourcesResourceIdRoomSetups_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getResourcesResourceIdRoomSetups_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Containing Resource","value":"containing_resource"},{"name":"Resource Suggestions","value":"resource_suggestions"},{"name":"Resource Suggestions Resource","value":"resource_suggestions.resource"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getResourcesResourceIdRoomSetups_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Resource"],"operation":["getResourcesResourceIdRoomSetups_updatedAt"]}},
      options: [{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getRoomSetups_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetups_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getRoomSetups_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetups_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Containing Resource","value":"containing_resource"},{"name":"Resource Suggestions","value":"resource_suggestions"},{"name":"Resource Suggestions Resource","value":"resource_suggestions.resource"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getRoomSetups_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetups_createdAt"]}},
      options: [{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getRoomSetups_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetups_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getRoomSetups_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetups_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Containing Resource","value":"containing_resource"},{"name":"Resource Suggestions","value":"resource_suggestions"},{"name":"Resource Suggestions Resource","value":"resource_suggestions.resource"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getRoomSetups_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetups_updatedAt"]}},
      options: [{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Room Setup ID",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt_roomSetupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt"]}},
    },
    {
      displayName: "Resource Suggestion ID",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt_resourceSuggestionId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_createdAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Room Setup ID",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt_roomSetupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt"]}},
    },
    {
      displayName: "Resource Suggestion ID",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt_resourceSuggestionId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Name","name":"wherename","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Resource Approval Groups","value":"resource_approval_groups"},{"name":"Resource Approval Groups People","value":"resource_approval_groups.people"},{"name":"Resource Approval Groups Resources","value":"resource_approval_groups.resources"},{"name":"Resource Folder","value":"resource_folder"},{"name":"Resource Folder Resources","value":"resource_folder.resources"},{"name":"Resource Questions","value":"resource_questions"},{"name":"Room Setups","value":"room_setups"},{"name":"Room Setups Containing Resource","value":"room_setups.containing_resource"},{"name":"Room Setups Resource Suggestions","value":"room_setups.resource_suggestions"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Room Setup"],"operation":["getRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResource_updatedAt"]}},
      options: [{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Approval Group]","name":"fieldsResourceApprovalGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Folder]","name":"fieldsResourceFolder","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Question]","name":"fieldsResourceQuestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Room Setup]","name":"fieldsRoomSetup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Suggestion]","name":"fieldsResourceSuggestion","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Tag ID",
      name: "getTagsTagIdEventInstances_createdAt_tagId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetTagsTagIdEventInstancesTagId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getTagsTagIdEventInstances_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_createdAt"]}},
      options: [{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getTagsTagIdEventInstances_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Resource Bookings","value":"resource_bookings"},{"name":"Resource Bookings Event Resource Request","value":"resource_bookings.event_resource_request"},{"name":"Resource Bookings Resource","value":"resource_bookings.resource"},{"name":"Tags","value":"tags"},{"name":"Tags Tag Group","value":"tags.tag_group"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getTagsTagIdEventInstances_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_createdAt"]}},
      options: [{"displayName":"Fields[Event Instance]","name":"fieldsEventInstance","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag Group]","name":"fieldsTagGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Tag ID",
      name: "getTagsTagIdEventInstances_updatedAt_tagId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetTagsTagIdEventInstancesTagId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getTagsTagIdEventInstances_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Ends At","name":"whereendsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Starts At","name":"wherestartsAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getTagsTagIdEventInstances_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Event","value":"event"},{"name":"Event Attachments","value":"event.attachments"},{"name":"Event Calendar","value":"event.calendar"},{"name":"Event Feed","value":"event.feed"},{"name":"Event Owner","value":"event.owner"},{"name":"Event Tags","value":"event.tags"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Resource Bookings","value":"resource_bookings"},{"name":"Resource Bookings Event Resource Request","value":"resource_bookings.event_resource_request"},{"name":"Resource Bookings Resource","value":"resource_bookings.resource"},{"name":"Tags","value":"tags"},{"name":"Tags Tag Group","value":"tags.tag_group"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getTagsTagIdEventInstances_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Tags"],"operation":["getTagsTagIdEventInstances_updatedAt"]}},
      options: [{"displayName":"Fields[Event Instance]","name":"fieldsEventInstance","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource Booking]","name":"fieldsResourceBooking","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag]","name":"fieldsTag","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attachment]","name":"fieldsAttachment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Calendar]","name":"fieldsCalendar","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Resource Request]","name":"fieldsEventResourceRequest","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Feed]","name":"fieldsFeed","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Resource]","name":"fieldsResource","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Tag Group]","name":"fieldsTagGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
  ] as any;

export class PlanningCenterCalendarTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Calendar Trigger",
    name: "planningCenterCalendarTrigger",
    icon: 'file:calendar.svg',
    group: ['trigger'],
    version: 1,
    description: "Poll Planning Center Calendar for created or updated resources.",
    defaults: { name: "Planning Center Calendar Trigger" },
    inputs: [],
    outputs: ['main'],
    polling: true,
    credentials: [{ name: 'planningCenterPatApi', required: true }],
    properties: NODE_PROPERTIES,
  };

  methods = {
    listSearch: {
      searchGetConflictsConflictIdResolvedByConflictId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetConflictsConflictIdResolvedByConflictId"], filter);
      },
      searchGetConflictsConflictIdResourceConflictId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetConflictsConflictIdResourceConflictId"], filter);
      },
      searchGetConflictsConflictIdResourceWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetConflictsConflictIdResourceWhereid"], filter);
      },
      searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventInstancesEventInstanceIdResourceBookingsEventInstanceId"], filter);
      },
      searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventInstancesEventInstanceIdResourceBookingsWhereresourceid"], filter);
      },
      searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventResourceRequestsEventResourceRequestIdCreatedByEventResourceRequestId"], filter);
      },
      searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsEventResourceRequestId"], filter);
      },
      searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventResourceRequestsEventResourceRequestIdResourceBookingsWhereresourceid"], filter);
      },
      searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventResourceRequestsEventResourceRequestIdResourceEventResourceRequestId"], filter);
      },
      searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventResourceRequestsEventResourceRequestIdResourceWhereid"], filter);
      },
      searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventResourceRequestsEventResourceRequestIdRoomSetupEventResourceRequestId"], filter);
      },
      searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventResourceRequestsEventResourceRequestIdUpdatedByEventResourceRequestId"], filter);
      },
      searchGetEventsEventIdAttachmentsEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttachmentsEventId"], filter);
      },
      searchGetEventsEventIdEventInstancesEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdEventInstancesEventId"], filter);
      },
      searchGetEventsEventIdOwnerEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdOwnerEventId"], filter);
      },
      searchGetEventsEventIdResourceBookingsEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdResourceBookingsEventId"], filter);
      },
      searchGetEventsEventIdResourceBookingsWhereresourceid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdResourceBookingsWhereresourceid"], filter);
      },
      searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceApprovalGroupsResourceApprovalGroupIdPeopleResourceApprovalGroupId"], filter);
      },
      searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceRequiredApprovalId"], filter);
      },
      searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceResourceApprovalGroupId"], filter);
      },
      searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceApprovalGroupsResourceApprovalGroupIdRequiredApprovalsRequiredApprovalIdResourceWhereid"], filter);
      },
      searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesResourceApprovalGroupId"], filter);
      },
      searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceApprovalGroupsResourceApprovalGroupIdResourcesWhereid"], filter);
      },
      searchGetResourceApprovalGroupsWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceApprovalGroupsWhereid"], filter);
      },
      searchGetResourceBookingsResourceBookingIdResourceResourceBookingId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceBookingsResourceBookingIdResourceResourceBookingId"], filter);
      },
      searchGetResourceBookingsResourceBookingIdResourceWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceBookingsResourceBookingIdResourceWhereid"], filter);
      },
      searchGetResourceBookingsWhereresourceid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceBookingsWhereresourceid"], filter);
      },
      searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceFoldersResourceFolderIdResourcesResourceFolderId"], filter);
      },
      searchGetResourceFoldersResourceFolderIdResourcesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourceFoldersResourceFolderIdResourcesWhereid"], filter);
      },
      searchGetResourcesResourceIdResourceApprovalGroupsResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourcesResourceIdResourceApprovalGroupsResourceId"], filter);
      },
      searchGetResourcesResourceIdResourceApprovalGroupsWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourcesResourceIdResourceApprovalGroupsWhereid"], filter);
      },
      searchGetResourcesResourceIdResourceBookingsResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourcesResourceIdResourceBookingsResourceId"], filter);
      },
      searchGetResourcesResourceIdResourceFolderResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourcesResourceIdResourceFolderResourceId"], filter);
      },
      searchGetResourcesResourceIdRoomSetupsResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourcesResourceIdRoomSetupsResourceId"], filter);
      },
      searchGetResourcesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetResourcesWhereid"], filter);
      },
      searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceResourceSuggestionId"], filter);
      },
      searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceRoomSetupId"], filter);
      },
      searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetRoomSetupsRoomSetupIdResourceSuggestionsResourceSuggestionIdResourceWhereid"], filter);
      },
      searchGetTagsTagIdEventInstancesTagId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetTagsTagIdEventInstancesTagId"], filter);
      },
    },
  };

  async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
    return pollPlanningCenter.call(this, OPERATIONS);
  }
}
