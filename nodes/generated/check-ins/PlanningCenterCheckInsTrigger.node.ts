import type { ILoadOptionsFunctions, INodeExecutionData, INodeListSearchResult, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';

import { searchPlanningCenterLookup, type GeneratedLookup } from '../../../src/runtime/lookup';
import { pollPlanningCenter, type PollingOperation } from '../../../src/runtime/polling';

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = {
  "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId": {
    "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId",
    "sourcePath": "/check-ins/v2/check_ins",
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
  "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId": {
    "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId",
    "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period",
    "parentBindings": [
      {
        "sourceName": "check_in_id",
        "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_checkInId"
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
  "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId": {
    "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId",
    "sourcePath": "/check-ins/v2/check_ins",
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
  "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId": {
    "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId",
    "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period",
    "parentBindings": [
      {
        "sourceName": "check_in_id",
        "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_checkInId"
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
  "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId": {
    "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId",
    "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods",
    "parentBindings": [
      {
        "sourceName": "check_in_id",
        "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_checkInId"
      },
      {
        "sourceName": "event_period_id",
        "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_eventPeriodId"
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
  "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId": {
    "methodName": "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId",
    "sourcePath": "/check-ins/v2/check_ins",
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
  "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId": {
    "methodName": "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId",
    "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/locations",
    "parentBindings": [
      {
        "sourceName": "check_in_id",
        "fieldName": "getCheckInsCheckInIdLocationsLocationIdCheckIns_checkInId"
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
  "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId": {
    "methodName": "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId",
    "sourcePath": "/check-ins/v2/events/{event_id}/attendance_types",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_eventId"
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
  "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId": {
    "methodName": "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId",
    "sourcePath": "/check-ins/v2/events",
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
  "searchGetEventsEventIdCheckInsEventId": {
    "methodName": "searchGetEventsEventIdCheckInsEventId",
    "sourcePath": "/check-ins/v2/events",
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
  "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId": {
    "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId",
    "sourcePath": "/check-ins/v2/events",
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
  "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId": {
    "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId",
    "sourcePath": "/check-ins/v2/events/{event_id}/person_events",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_eventId"
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
  "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId": {
    "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId",
    "sourcePath": "/check-ins/v2/events",
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
  "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId": {
    "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId",
    "sourcePath": "/check-ins/v2/events/{event_id}/person_events",
    "parentBindings": [
      {
        "sourceName": "event_id",
        "fieldName": "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_eventId"
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
  "searchGetEventTimesEventTimeIdCheckInsEventTimeId": {
    "methodName": "searchGetEventTimesEventTimeIdCheckInsEventTimeId",
    "sourcePath": "/check-ins/v2/event_times",
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
  "searchGetEventTimesEventTimeIdHeadcountsEventTimeId": {
    "methodName": "searchGetEventTimesEventTimeIdHeadcountsEventTimeId",
    "sourcePath": "/check-ins/v2/event_times",
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
  "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId": {
    "methodName": "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId",
    "sourcePath": "/check-ins/v2/event_times",
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
  "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId": {
    "methodName": "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId",
    "sourcePath": "/check-ins/v2/event_times/{event_time_id}/location_event_times",
    "parentBindings": [
      {
        "sourceName": "event_time_id",
        "fieldName": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_eventTimeId"
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
  "searchGetOptionsOptionIdCheckInsOptionId": {
    "methodName": "searchGetOptionsOptionIdCheckInsOptionId",
    "sourcePath": "/check-ins/v2/options",
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
  "searchGetPeoplePersonIdCheckInsPersonId": {
    "methodName": "searchGetPeoplePersonIdCheckInsPersonId",
    "sourcePath": "/check-ins/v2/people",
    "parentBindings": [],
    "searchFilter": "where[search_name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetStationsStationIdCheckedInAtCheckInsStationId": {
    "methodName": "searchGetStationsStationIdCheckedInAtCheckInsStationId",
    "sourcePath": "/check-ins/v2/stations",
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
  "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId": {
    "methodName": "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId",
    "sourcePath": "/check-ins/v2/stations/{station_id}/check_in_groups",
    "parentBindings": [
      {
        "sourceName": "station_id",
        "fieldName": "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_stationId"
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
  "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId": {
    "methodName": "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId",
    "sourcePath": "/check-ins/v2/stations",
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

const OPERATIONS: PollingOperation[] = [
  {
    "id": "getCheckIns_createdAt",
    "resource": "Check In",
    "cursorField": "created_at",
    "path": "/check-ins/v2/check_ins",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getCheckIns_updatedAt",
    "resource": "Check In",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/check_ins",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt",
    "resource": "Check In",
    "cursorField": "created_at",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/check_ins",
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId",
          "sourcePath": "/check-ins/v2/check_ins",
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
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_checkInId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt",
    "resource": "Check In",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/check_ins",
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId",
          "sourcePath": "/check-ins/v2/check_ins",
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
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_checkInId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt",
    "resource": "Check In",
    "cursorField": "created_at",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins",
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId",
          "sourcePath": "/check-ins/v2/check_ins",
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
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_checkInId"
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
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_checkInId"
            },
            {
              "sourceName": "event_period_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_eventPeriodId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt",
    "resource": "Check In",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods/{location_event_period_id}/check_ins",
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId",
          "sourcePath": "/check-ins/v2/check_ins",
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
        "name": "eventPeriodId",
        "sourceName": "event_period_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_checkInId"
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
        "name": "locationEventPeriodId",
        "sourceName": "location_event_period_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/event_period/{event_period_id}/location_event_periods",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_checkInId"
            },
            {
              "sourceName": "event_period_id",
              "fieldName": "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_eventPeriodId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt",
    "resource": "Check In",
    "cursorField": "created_at",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/check_ins",
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId",
          "sourcePath": "/check-ins/v2/check_ins",
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
        "name": "locationId",
        "sourceName": "location_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/locations",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdLocationsLocationIdCheckIns_checkInId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt",
    "resource": "Check In",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/check_ins/{check_in_id}/locations/{location_id}/check_ins",
    "pathParameters": [
      {
        "name": "checkInId",
        "sourceName": "check_in_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId",
          "sourcePath": "/check-ins/v2/check_ins",
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
        "name": "locationId",
        "sourceName": "location_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId",
          "sourcePath": "/check-ins/v2/check_ins/{check_in_id}/locations",
          "parentBindings": [
            {
              "sourceName": "check_in_id",
              "fieldName": "getCheckInsCheckInIdLocationsLocationIdCheckIns_checkInId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventTimesEventTimeIdCheckIns_createdAt",
    "resource": "Event Time",
    "cursorField": "created_at",
    "path": "/check-ins/v2/event_times/{event_time_id}/check_ins",
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdCheckInsEventTimeId",
          "sourcePath": "/check-ins/v2/event_times",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventTimesEventTimeIdCheckIns_updatedAt",
    "resource": "Event Time",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/event_times/{event_time_id}/check_ins",
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdCheckInsEventTimeId",
          "sourcePath": "/check-ins/v2/event_times",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventTimesEventTimeIdHeadcounts_createdAt",
    "resource": "Event Time",
    "cursorField": "created_at",
    "path": "/check-ins/v2/event_times/{event_time_id}/headcounts",
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdHeadcountsEventTimeId",
          "sourcePath": "/check-ins/v2/event_times",
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
        "name": "whereattendanceTypeid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[attendance_type][id]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      }
    ]
  },
  {
    "id": "getEventTimesEventTimeIdHeadcounts_updatedAt",
    "resource": "Event Time",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/event_times/{event_time_id}/headcounts",
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdHeadcountsEventTimeId",
          "sourcePath": "/check-ins/v2/event_times",
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
        "name": "whereattendanceTypeid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[attendance_type][id]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      }
    ]
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt",
    "resource": "Event Time",
    "cursorField": "created_at",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins",
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId",
          "sourcePath": "/check-ins/v2/event_times",
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
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId",
          "sourcePath": "/check-ins/v2/event_times/{event_time_id}/location_event_times",
          "parentBindings": [
            {
              "sourceName": "event_time_id",
              "fieldName": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_eventTimeId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt",
    "resource": "Event Time",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/event_times/{event_time_id}/location_event_times/{location_event_time_id}/check_ins",
    "pathParameters": [
      {
        "name": "eventTimeId",
        "sourceName": "event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId",
          "sourcePath": "/check-ins/v2/event_times",
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
        "name": "locationEventTimeId",
        "sourceName": "location_event_time_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId",
          "sourcePath": "/check-ins/v2/event_times/{event_time_id}/location_event_times",
          "parentBindings": [
            {
              "sourceName": "event_time_id",
              "fieldName": "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_eventTimeId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/check-ins/v2/events/{event_id}/attendance_types/{attendance_type_id}/headcounts",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId",
          "sourcePath": "/check-ins/v2/events/{event_id}/attendance_types",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_eventId"
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
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      }
    ]
  },
  {
    "id": "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/events/{event_id}/attendance_types/{attendance_type_id}/headcounts",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "attendanceTypeId",
        "sourceName": "attendance_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId",
          "sourcePath": "/check-ins/v2/events/{event_id}/attendance_types",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_eventId"
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
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      }
    ]
  },
  {
    "id": "getEventsEventIdCheckIns_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/check-ins/v2/events/{event_id}/check_ins",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdCheckInsEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventsEventIdCheckIns_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/events/{event_id}/check_ins",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdCheckInsEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/first_check_in",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "personEventId",
        "sourceName": "person_event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId",
          "sourcePath": "/check-ins/v2/events/{event_id}/person_events",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_eventId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/first_check_in",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "personEventId",
        "sourceName": "person_event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId",
          "sourcePath": "/check-ins/v2/events/{event_id}/person_events",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_eventId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt",
    "resource": "Event",
    "cursorField": "created_at",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/last_check_in",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "personEventId",
        "sourceName": "person_event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId",
          "sourcePath": "/check-ins/v2/events/{event_id}/person_events",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_eventId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt",
    "resource": "Event",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/events/{event_id}/person_events/{person_event_id}/last_check_in",
    "pathParameters": [
      {
        "name": "eventId",
        "sourceName": "event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId",
          "sourcePath": "/check-ins/v2/events",
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
        "name": "personEventId",
        "sourceName": "person_event_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId",
          "sourcePath": "/check-ins/v2/events/{event_id}/person_events",
          "parentBindings": [
            {
              "sourceName": "event_id",
              "fieldName": "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_eventId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getHeadcounts_createdAt",
    "resource": "Headcount",
    "cursorField": "created_at",
    "path": "/check-ins/v2/headcounts",
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
        "name": "whereattendanceTypeid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[attendance_type][id]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      }
    ]
  },
  {
    "id": "getHeadcounts_updatedAt",
    "resource": "Headcount",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/headcounts",
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
        "name": "whereattendanceTypeid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[attendance_type][id]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      }
    ]
  },
  {
    "id": "getOptionsOptionIdCheckIns_createdAt",
    "resource": "Option",
    "cursorField": "created_at",
    "path": "/check-ins/v2/options/{option_id}/check_ins",
    "pathParameters": [
      {
        "name": "optionId",
        "sourceName": "option_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetOptionsOptionIdCheckInsOptionId",
          "sourcePath": "/check-ins/v2/options",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getOptionsOptionIdCheckIns_updatedAt",
    "resource": "Option",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/options/{option_id}/check_ins",
    "pathParameters": [
      {
        "name": "optionId",
        "sourceName": "option_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetOptionsOptionIdCheckInsOptionId",
          "sourcePath": "/check-ins/v2/options",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdCheckIns_createdAt",
    "resource": "Person",
    "cursorField": "created_at",
    "path": "/check-ins/v2/people/{person_id}/check_ins",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdCheckInsPersonId",
          "sourcePath": "/check-ins/v2/people",
          "parentBindings": [],
          "searchFilter": "where[search_name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdCheckIns_updatedAt",
    "resource": "Person",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/people/{person_id}/check_ins",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdCheckInsPersonId",
          "sourcePath": "/check-ins/v2/people",
          "parentBindings": [],
          "searchFilter": "where[search_name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getStationsStationIdCheckedInAtCheckIns_createdAt",
    "resource": "Stations",
    "cursorField": "created_at",
    "path": "/check-ins/v2/stations/{station_id}/checked_in_at_check_ins",
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetStationsStationIdCheckedInAtCheckInsStationId",
          "sourcePath": "/check-ins/v2/stations",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getStationsStationIdCheckedInAtCheckIns_updatedAt",
    "resource": "Stations",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/stations/{station_id}/checked_in_at_check_ins",
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetStationsStationIdCheckedInAtCheckInsStationId",
          "sourcePath": "/check-ins/v2/stations",
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
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt",
    "resource": "Stations",
    "cursorField": "created_at",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins",
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId",
          "sourcePath": "/check-ins/v2/stations",
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
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId",
          "sourcePath": "/check-ins/v2/stations/{station_id}/check_in_groups",
          "parentBindings": [
            {
              "sourceName": "station_id",
              "fieldName": "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_stationId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
      }
    ]
  },
  {
    "id": "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt",
    "resource": "Stations",
    "cursorField": "updated_at",
    "path": "/check-ins/v2/stations/{station_id}/check_in_groups/{check_in_group_id}/check_ins",
    "pathParameters": [
      {
        "name": "stationId",
        "sourceName": "station_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId",
          "sourcePath": "/check-ins/v2/stations",
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
        "name": "checkInGroupId",
        "sourceName": "check_in_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId",
          "sourcePath": "/check-ins/v2/stations/{station_id}/check_in_groups",
          "parentBindings": [
            {
              "sourceName": "station_id",
              "fieldName": "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_stationId"
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsCheckIn",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckIn]"
      },
      {
        "name": "fieldsCheckInTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[CheckInTime]"
      },
      {
        "name": "fieldsEvent",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Event]"
      },
      {
        "name": "fieldsEventPeriod",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventPeriod]"
      },
      {
        "name": "fieldsEventTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[EventTime]"
      },
      {
        "name": "fieldsLocation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Location]"
      },
      {
        "name": "fieldsOption",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Option]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsStation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Station]"
      },
      {
        "name": "fieldsAttendanceType",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[AttendanceType]"
      },
      {
        "name": "fieldsHeadcount",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Headcount]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsOrganization",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Organization]"
      },
      {
        "name": "fieldsTheme",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Theme]"
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
      options: [{"name":"Check In","value":"Check In"},{"name":"Event","value":"Event"},{"name":"Event Time","value":"Event Time"},{"name":"Headcount","value":"Headcount"},{"name":"Option","value":"Option"},{"name":"Person","value":"Person"},{"name":"Stations","value":"Stations"}],
      default: "Check In",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Check In"]}},
      options: [{"name":"Created","value":"getCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Check In created"},{"name":"Created or Updated","value":"getCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Check In created or updated"},{"name":"Created (via Event Period)","value":"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Check In created (via Event Period)"},{"name":"Created or Updated (via Event Period)","value":"getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Check In created or updated (via Event Period)"},{"name":"Created (via Location Event Period)","value":"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Check In created (via Location Event Period)"},{"name":"Created or Updated (via Location Event Period)","value":"getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Check In created or updated (via Location Event Period)"},{"name":"Created (via Location)","value":"getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Check In created (via Location)"},{"name":"Created or Updated (via Location)","value":"getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Check In created or updated (via Location)"}],
      default: "getCheckIns_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Event"]}},
      options: [{"name":"Created (via Attendance Type)","value":"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Attendance Type)"},{"name":"Created or Updated (via Attendance Type)","value":"getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Attendance Type)"},{"name":"Created (via Event)","value":"getEventsEventIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Event)"},{"name":"Created or Updated (via Event)","value":"getEventsEventIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Event)"},{"name":"Created (via Event Person Event First Check In)","value":"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Event Person Event First Check In)"},{"name":"Created or Updated (via Event Person Event First Check In)","value":"getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Event Person Event First Check In)"},{"name":"Created (via Event Person Event Last Check In)","value":"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event created (via Event Person Event Last Check In)"},{"name":"Created or Updated (via Event Person Event Last Check In)","value":"getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event created or updated (via Event Person Event Last Check In)"}],
      default: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Event Time"]}},
      options: [{"name":"Created (via Event Time Check Ins)","value":"getEventTimesEventTimeIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Time created (via Event Time Check Ins)"},{"name":"Created or Updated (via Event Time Check Ins)","value":"getEventTimesEventTimeIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Time created or updated (via Event Time Check Ins)"},{"name":"Created (via Event Time Headcounts)","value":"getEventTimesEventTimeIdHeadcounts_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Time created (via Event Time Headcounts)"},{"name":"Created or Updated (via Event Time Headcounts)","value":"getEventTimesEventTimeIdHeadcounts_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Time created or updated (via Event Time Headcounts)"},{"name":"Created (via Location Event Time)","value":"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Event Time created (via Location Event Time)"},{"name":"Created or Updated (via Location Event Time)","value":"getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Event Time created or updated (via Location Event Time)"}],
      default: "getEventTimesEventTimeIdCheckIns_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Headcount"]}},
      options: [{"name":"Created","value":"getHeadcounts_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Headcount created"},{"name":"Created or Updated","value":"getHeadcounts_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Headcount created or updated"}],
      default: "getHeadcounts_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Option"]}},
      options: [{"name":"Created (via Option)","value":"getOptionsOptionIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Option created (via Option)"},{"name":"Created or Updated (via Option)","value":"getOptionsOptionIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Option created or updated (via Option)"}],
      default: "getOptionsOptionIdCheckIns_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Person"]}},
      options: [{"name":"Created (via Person)","value":"getPeoplePersonIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Person created (via Person)"},{"name":"Created or Updated (via Person)","value":"getPeoplePersonIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Person created or updated (via Person)"}],
      default: "getPeoplePersonIdCheckIns_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Stations"]}},
      options: [{"name":"Created (via Station)","value":"getStationsStationIdCheckedInAtCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Stations created (via Station)"},{"name":"Created or Updated (via Station)","value":"getStationsStationIdCheckedInAtCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Stations created or updated (via Station)"},{"name":"Created (via Check In Group)","value":"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Stations created (via Check In Group)"},{"name":"Created or Updated (via Check In Group)","value":"getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Stations created or updated (via Check In Group)"}],
      default: "getStationsStationIdCheckedInAtCheckIns_createdAt",
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
      name: "getCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Check In ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt_checkInId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Event Period ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt_eventPeriodId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Check In ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt_checkInId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Event Period ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt_eventPeriodId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Check In ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt_checkInId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Event Period ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt_eventPeriodId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Location Event Period ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt_locationEventPeriodId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Check In ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt_checkInId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Event Period ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt_eventPeriodId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Location Event Period ID",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt_locationEventPeriodId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Check In ID",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt_checkInId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Location ID",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt_locationId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Check In ID",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt_checkInId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Location ID",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt_locationId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Check In"],"operation":["getCheckInsCheckInIdLocationsLocationIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Time ID",
      name: "getEventTimesEventTimeIdCheckIns_createdAt_eventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdCheckInsEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventTimesEventTimeIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventTimesEventTimeIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventTimesEventTimeIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Time ID",
      name: "getEventTimesEventTimeIdCheckIns_updatedAt_eventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdCheckInsEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventTimesEventTimeIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventTimesEventTimeIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventTimesEventTimeIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Time ID",
      name: "getEventTimesEventTimeIdHeadcounts_createdAt_eventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdHeadcountsEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventTimesEventTimeIdHeadcounts_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Attendance Type ID","name":"whereattendanceTypeid","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventTimesEventTimeIdHeadcounts_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Attendance Type","value":"attendance_type"},{"name":"Attendance Type Event","value":"attendance_type.event"},{"name":"Event Time","value":"event_time"},{"name":"Event Time Event","value":"event_time.event"},{"name":"Event Time Event Period","value":"event_time.event_period"},{"name":"Event Time Headcounts","value":"event_time.headcounts"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventTimesEventTimeIdHeadcounts_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_createdAt"]}},
      options: [{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Time ID",
      name: "getEventTimesEventTimeIdHeadcounts_updatedAt_eventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdHeadcountsEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventTimesEventTimeIdHeadcounts_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Attendance Type ID","name":"whereattendanceTypeid","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventTimesEventTimeIdHeadcounts_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Attendance Type","value":"attendance_type"},{"name":"Attendance Type Event","value":"attendance_type.event"},{"name":"Event Time","value":"event_time"},{"name":"Event Time Event","value":"event_time.event"},{"name":"Event Time Event Period","value":"event_time.event_period"},{"name":"Event Time Headcounts","value":"event_time.headcounts"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventTimesEventTimeIdHeadcounts_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdHeadcounts_updatedAt"]}},
      options: [{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Time ID",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt_eventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Location Event Time ID",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt_locationEventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event Time ID",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt_eventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Location Event Time ID",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt_locationEventTimeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event Time"],"operation":["getEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt"]}},
    },
    {
      displayName: "Attendance Type ID",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt_attendanceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Attendance Type","value":"attendance_type"},{"name":"Attendance Type Event","value":"attendance_type.event"},{"name":"Event Time","value":"event_time"},{"name":"Event Time Event","value":"event_time.event"},{"name":"Event Time Event Period","value":"event_time.event_period"},{"name":"Event Time Headcounts","value":"event_time.headcounts"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_createdAt"]}},
      options: [{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt"]}},
    },
    {
      displayName: "Attendance Type ID",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt_attendanceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Attendance Type","value":"attendance_type"},{"name":"Attendance Type Event","value":"attendance_type.event"},{"name":"Event Time","value":"event_time"},{"name":"Event Time Event","value":"event_time.event"},{"name":"Event Time Event Period","value":"event_time.event_period"},{"name":"Event Time Headcounts","value":"event_time.headcounts"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdAttendanceTypesAttendanceTypeIdHeadcounts_updatedAt"]}},
      options: [{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdCheckIns_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdCheckInsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdCheckIns_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdCheckInsEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt"]}},
    },
    {
      displayName: "Person Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt_personEventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt"]}},
    },
    {
      displayName: "Person Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt_personEventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdFirstCheckIn_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt"]}},
    },
    {
      displayName: "Person Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt_personEventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt_eventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt"]}},
    },
    {
      displayName: "Person Event ID",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt_personEventId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Event"],"operation":["getEventsEventIdPersonEventsPersonEventIdLastCheckIn_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getHeadcounts_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Headcount"],"operation":["getHeadcounts_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Attendance Type ID","name":"whereattendanceTypeid","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getHeadcounts_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Headcount"],"operation":["getHeadcounts_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Attendance Type","value":"attendance_type"},{"name":"Attendance Type Event","value":"attendance_type.event"},{"name":"Event Time","value":"event_time"},{"name":"Event Time Event","value":"event_time.event"},{"name":"Event Time Event Period","value":"event_time.event_period"},{"name":"Event Time Headcounts","value":"event_time.headcounts"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getHeadcounts_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Headcount"],"operation":["getHeadcounts_createdAt"]}},
      options: [{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getHeadcounts_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Headcount"],"operation":["getHeadcounts_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Attendance Type ID","name":"whereattendanceTypeid","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getHeadcounts_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Headcount"],"operation":["getHeadcounts_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Attendance Type","value":"attendance_type"},{"name":"Attendance Type Event","value":"attendance_type.event"},{"name":"Event Time","value":"event_time"},{"name":"Event Time Event","value":"event_time.event"},{"name":"Event Time Event Period","value":"event_time.event_period"},{"name":"Event Time Headcounts","value":"event_time.headcounts"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getHeadcounts_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Headcount"],"operation":["getHeadcounts_updatedAt"]}},
      options: [{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Option ID",
      name: "getOptionsOptionIdCheckIns_createdAt_optionId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetOptionsOptionIdCheckInsOptionId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getOptionsOptionIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getOptionsOptionIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getOptionsOptionIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Option ID",
      name: "getOptionsOptionIdCheckIns_updatedAt_optionId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetOptionsOptionIdCheckInsOptionId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getOptionsOptionIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getOptionsOptionIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getOptionsOptionIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Option"],"operation":["getOptionsOptionIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdCheckIns_createdAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdCheckInsPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdCheckIns_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdCheckInsPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Person"],"operation":["getPeoplePersonIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Station ID",
      name: "getStationsStationIdCheckedInAtCheckIns_createdAt_stationId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetStationsStationIdCheckedInAtCheckInsStationId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getStationsStationIdCheckedInAtCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getStationsStationIdCheckedInAtCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getStationsStationIdCheckedInAtCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Station ID",
      name: "getStationsStationIdCheckedInAtCheckIns_updatedAt_stationId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetStationsStationIdCheckedInAtCheckInsStationId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getStationsStationIdCheckedInAtCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getStationsStationIdCheckedInAtCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getStationsStationIdCheckedInAtCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckedInAtCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Station ID",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt_stationId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Check In Group ID",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt_checkInGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_createdAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Station ID",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt_stationId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Check In Group ID",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt_checkInGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Check In Times","value":"check_in_times"},{"name":"Checked In At","value":"checked_in_at"},{"name":"Checked In At Event","value":"checked_in_at.event"},{"name":"Checked In At Location","value":"checked_in_at.location"},{"name":"Checked In At Print Station","value":"checked_in_at.print_station"},{"name":"Checked In At Theme","value":"checked_in_at.theme"},{"name":"Checked In By","value":"checked_in_by"},{"name":"Checked In By Organization","value":"checked_in_by.organization"},{"name":"Checked Out By","value":"checked_out_by"},{"name":"Checked Out By Organization","value":"checked_out_by.organization"},{"name":"Event","value":"event"},{"name":"Event Attendance Types","value":"event.attendance_types"},{"name":"Event Period","value":"event_period"},{"name":"Event Period Event","value":"event_period.event"},{"name":"Event Period Event Times","value":"event_period.event_times"},{"name":"Event Times","value":"event_times"},{"name":"Event Times Event","value":"event_times.event"},{"name":"Event Times Event Period","value":"event_times.event_period"},{"name":"Event Times Headcounts","value":"event_times.headcounts"},{"name":"Locations","value":"locations"},{"name":"Locations Event","value":"locations.event"},{"name":"Locations Locations","value":"locations.locations"},{"name":"Locations Options","value":"locations.options"},{"name":"Locations Parent","value":"locations.parent"},{"name":"Options","value":"options"},{"name":"Options Label","value":"options.label"},{"name":"Person","value":"person"},{"name":"Person Organization","value":"person.organization"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Stations"],"operation":["getStationsStationIdCheckInGroupsCheckInGroupIdCheckIns_updatedAt"]}},
      options: [{"displayName":"Fields[Check In]","name":"fieldsCheckIn","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Check In Time]","name":"fieldsCheckInTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event]","name":"fieldsEvent","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Period]","name":"fieldsEventPeriod","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Event Time]","name":"fieldsEventTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Location]","name":"fieldsLocation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Option]","name":"fieldsOption","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Station]","name":"fieldsStation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Attendance Type]","name":"fieldsAttendanceType","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Headcount]","name":"fieldsHeadcount","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Organization]","name":"fieldsOrganization","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Theme]","name":"fieldsTheme","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
  ] as any;

export class PlanningCenterCheckInsTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Check-Ins Trigger",
    name: "planningCenterCheckInsTrigger",
    icon: 'file:check-ins.svg',
    group: ['trigger'],
    version: 1,
    description: "Poll Planning Center Check-Ins for created or updated resources.",
    defaults: { name: "Planning Center Check-Ins Trigger" },
    inputs: [],
    outputs: ['main'],
    polling: true,
    credentials: [{ name: 'planningCenterPatApi', required: true }],
    properties: NODE_PROPERTIES,
  };

  methods = {
    listSearch: {
      searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsCheckInId"], filter);
      },
      searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCheckInsCheckInIdEventPeriodEventPeriodIdCheckInsEventPeriodId"], filter);
      },
      searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsCheckInId"], filter);
      },
      searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsEventPeriodId"], filter);
      },
      searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCheckInsCheckInIdEventPeriodEventPeriodIdLocationEventPeriodsLocationEventPeriodIdCheckInsLocationEventPeriodId"], filter);
      },
      searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCheckInsCheckInIdLocationsLocationIdCheckInsCheckInId"], filter);
      },
      searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCheckInsCheckInIdLocationsLocationIdCheckInsLocationId"], filter);
      },
      searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsAttendanceTypeId"], filter);
      },
      searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdAttendanceTypesAttendanceTypeIdHeadcountsEventId"], filter);
      },
      searchGetEventsEventIdCheckInsEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdCheckInsEventId"], filter);
      },
      searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInEventId"], filter);
      },
      searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdPersonEventsPersonEventIdFirstCheckInPersonEventId"], filter);
      },
      searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInEventId"], filter);
      },
      searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventsEventIdPersonEventsPersonEventIdLastCheckInPersonEventId"], filter);
      },
      searchGetEventTimesEventTimeIdCheckInsEventTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventTimesEventTimeIdCheckInsEventTimeId"], filter);
      },
      searchGetEventTimesEventTimeIdHeadcountsEventTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventTimesEventTimeIdHeadcountsEventTimeId"], filter);
      },
      searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsEventTimeId"], filter);
      },
      searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetEventTimesEventTimeIdLocationEventTimesLocationEventTimeIdCheckInsLocationEventTimeId"], filter);
      },
      searchGetOptionsOptionIdCheckInsOptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetOptionsOptionIdCheckInsOptionId"], filter);
      },
      searchGetPeoplePersonIdCheckInsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdCheckInsPersonId"], filter);
      },
      searchGetStationsStationIdCheckedInAtCheckInsStationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetStationsStationIdCheckedInAtCheckInsStationId"], filter);
      },
      searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsCheckInGroupId"], filter);
      },
      searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetStationsStationIdCheckInGroupsCheckInGroupIdCheckInsStationId"], filter);
      },
    },
  };

  async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
    return pollPlanningCenter.call(this, OPERATIONS);
  }
}
