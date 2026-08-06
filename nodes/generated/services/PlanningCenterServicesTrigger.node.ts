import type { ILoadOptionsFunctions, INodeExecutionData, INodeListSearchResult, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';

import { searchPlanningCenterLookup, type GeneratedLookup } from '../../../src/runtime/lookup';
import { pollPlanningCenter, type PollingOperation } from '../../../src/runtime/polling';

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = {
  "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId": {
    "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId",
    "sourcePath": "/services/v2/people",
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
  "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId": {
    "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId",
    "sourcePath": "/services/v2/people/{person_id}/plan_people",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_personId"
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
  "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid": {
    "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid",
    "sourcePath": "/services/v2/people/{person_id}/plan_people/{plan_person_id}/plan",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_personId"
      },
      {
        "sourceName": "plan_person_id",
        "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_planPersonId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId": {
    "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId",
    "sourcePath": "/services/v2/series/{series_id}/plans",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_seriesId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId": {
    "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId",
    "sourcePath": "/services/v2/series",
    "parentBindings": [],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid": {
    "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid",
    "sourcePath": "/services/v2/series/{series_id}/plans/{plan_id}/live/{live_id}/watchable_plans",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_seriesId"
      },
      {
        "sourceName": "plan_id",
        "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_planId"
      },
      {
        "sourceName": "live_id",
        "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_liveId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetSeriesSeriesIdPlansSeriesId": {
    "methodName": "searchGetSeriesSeriesIdPlansSeriesId",
    "sourcePath": "/services/v2/series",
    "parentBindings": [],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetSeriesSeriesIdPlansWhereid": {
    "methodName": "searchGetSeriesSeriesIdPlansWhereid",
    "sourcePath": "/services/v2/series/{series_id}/plans",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "getSeriesSeriesIdPlans_seriesId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_serviceTypeId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId",
    "sourcePath": "/services/v2/service_types",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_serviceTypeId"
      },
      {
        "sourceName": "plan_id",
        "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_planId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNotes_serviceTypeId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId",
    "sourcePath": "/services/v2/service_types",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_serviceTypeId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId",
    "sourcePath": "/services/v2/service_types",
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
  "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_serviceTypeId"
      },
      {
        "sourceName": "plan_id",
        "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_planId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetServiceTypesServiceTypeIdPlansServiceTypeId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansServiceTypeId",
    "sourcePath": "/services/v2/service_types",
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
  "searchGetServiceTypesServiceTypeIdPlansWhereid": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlansWhereid",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdPlans_serviceTypeId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
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
  "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plan_templates",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_serviceTypeId"
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
  "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId": {
    "methodName": "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId",
    "sourcePath": "/services/v2/service_types",
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
  "searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId": {
    "methodName": "searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId",
    "sourcePath": "/services/v2/service_types",
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
  "searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid": {
    "methodName": "searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid",
    "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
    "parentBindings": [
      {
        "sourceName": "service_type_id",
        "fieldName": "getServiceTypesServiceTypeIdUnscopedPlans_serviceTypeId"
      }
    ],
    "searchFilter": "where[title]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
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
    "id": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt",
    "resource": "Plan (via Live)",
    "cursorField": "created_at",
    "path": "/services/v2/series/{series_id}/plans/{plan_id}/live/{live_id}/watchable_plans",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId",
          "sourcePath": "/services/v2/series",
          "parentBindings": [],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId",
          "sourcePath": "/services/v2/series/{series_id}/plans",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_seriesId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "liveId",
        "sourceName": "live_id",
        "required": true,
        "type": "string"
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid",
          "sourcePath": "/services/v2/series/{series_id}/plans/{plan_id}/live/{live_id}/watchable_plans",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_seriesId"
            },
            {
              "sourceName": "plan_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_planId"
            },
            {
              "sourceName": "live_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_liveId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt",
    "resource": "Plan (via Live)",
    "cursorField": "updated_at",
    "path": "/services/v2/series/{series_id}/plans/{plan_id}/live/{live_id}/watchable_plans",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId",
          "sourcePath": "/services/v2/series",
          "parentBindings": [],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId",
          "sourcePath": "/services/v2/series/{series_id}/plans",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_seriesId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "liveId",
        "sourceName": "live_id",
        "required": true,
        "type": "string"
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid",
          "sourcePath": "/services/v2/series/{series_id}/plans/{plan_id}/live/{live_id}/watchable_plans",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_seriesId"
            },
            {
              "sourceName": "plan_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_planId"
            },
            {
              "sourceName": "live_id",
              "fieldName": "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_liveId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt",
    "resource": "Plan (via Plan Person)",
    "cursorField": "created_at",
    "path": "/services/v2/people/{person_id}/plan_people/{plan_person_id}/plan",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId",
          "sourcePath": "/services/v2/people",
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
        "name": "planPersonId",
        "sourceName": "plan_person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId",
          "sourcePath": "/services/v2/people/{person_id}/plan_people",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_personId"
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid",
          "sourcePath": "/services/v2/people/{person_id}/plan_people/{plan_person_id}/plan",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_personId"
            },
            {
              "sourceName": "plan_person_id",
              "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_planPersonId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt",
    "resource": "Plan (via Plan Person)",
    "cursorField": "updated_at",
    "path": "/services/v2/people/{person_id}/plan_people/{plan_person_id}/plan",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId",
          "sourcePath": "/services/v2/people",
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
        "name": "planPersonId",
        "sourceName": "plan_person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId",
          "sourcePath": "/services/v2/people/{person_id}/plan_people",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_personId"
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid",
          "sourcePath": "/services/v2/people/{person_id}/plan_people/{plan_person_id}/plan",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_personId"
            },
            {
              "sourceName": "plan_person_id",
              "fieldName": "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_planPersonId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getSeriesSeriesIdPlans_createdAt",
    "resource": "Plan (via Series)",
    "cursorField": "created_at",
    "path": "/services/v2/series/{series_id}/plans",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansSeriesId",
          "sourcePath": "/services/v2/series",
          "parentBindings": [],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansWhereid",
          "sourcePath": "/services/v2/series/{series_id}/plans",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getSeriesSeriesIdPlans_seriesId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getSeriesSeriesIdPlans_updatedAt",
    "resource": "Plan (via Series)",
    "cursorField": "updated_at",
    "path": "/services/v2/series/{series_id}/plans",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansSeriesId",
          "sourcePath": "/services/v2/series",
          "parentBindings": [],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdPlansWhereid",
          "sourcePath": "/services/v2/series/{series_id}/plans",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getSeriesSeriesIdPlans_seriesId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt",
    "resource": "Plan (via Service Type Plan Next Plan)",
    "cursorField": "created_at",
    "path": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_serviceTypeId"
            },
            {
              "sourceName": "plan_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_planId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt",
    "resource": "Plan (via Service Type Plan Next Plan)",
    "cursorField": "updated_at",
    "path": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_serviceTypeId"
            },
            {
              "sourceName": "plan_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_planId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt",
    "resource": "Plan (via Service Type Plan Previous Plan)",
    "cursorField": "created_at",
    "path": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/previous_plan",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_serviceTypeId"
            },
            {
              "sourceName": "plan_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_planId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt",
    "resource": "Plan (via Service Type Plan Previous Plan)",
    "cursorField": "updated_at",
    "path": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/previous_plan",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/next_plan",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_serviceTypeId"
            },
            {
              "sourceName": "plan_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_planId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlans_createdAt",
    "resource": "Plan (via Service Type Plans)",
    "cursorField": "created_at",
    "path": "/services/v2/service_types/{service_type_id}/plans",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlans_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlans_updatedAt",
    "resource": "Plan (via Service Type Plans)",
    "cursorField": "updated_at",
    "path": "/services/v2/service_types/{service_type_id}/plans",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlans_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdUnscopedPlans_createdAt",
    "resource": "Plan (via Service Type Unscoped Plans)",
    "cursorField": "created_at",
    "path": "/services/v2/service_types/{service_type_id}/unscoped_plans",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdUnscopedPlans_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdUnscopedPlans_updatedAt",
    "resource": "Plan (via Service Type Unscoped Plans)",
    "cursorField": "updated_at",
    "path": "/services/v2/service_types/{service_type_id}/unscoped_plans",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "whereid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdUnscopedPlans_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "wheretitle",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[title]"
      },
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsPlan",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Plan]"
      },
      {
        "name": "fieldsContributor",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Contributor]"
      },
      {
        "name": "fieldsPlanTime",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanTime]"
      },
      {
        "name": "fieldsSchedule",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Schedule]"
      },
      {
        "name": "fieldsSeries",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Series]"
      },
      {
        "name": "fieldsSplitTeamRehearsalAssignment",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[SplitTeamRehearsalAssignment]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt",
    "resource": "Plan Note (via Plan Template)",
    "cursorField": "created_at",
    "path": "/services/v2/service_types/{service_type_id}/plan_templates/{plan_template_id}/notes",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planTemplateId",
        "sourceName": "plan_template_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plan_templates",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_serviceTypeId"
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
        "name": "fieldsPlanNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNote]"
      },
      {
        "name": "fieldsPlanNoteCategory",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNoteCategory]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt",
    "resource": "Plan Note (via Plan Template)",
    "cursorField": "updated_at",
    "path": "/services/v2/service_types/{service_type_id}/plan_templates/{plan_template_id}/notes",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planTemplateId",
        "sourceName": "plan_template_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plan_templates",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_serviceTypeId"
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
        "name": "fieldsPlanNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNote]"
      },
      {
        "name": "fieldsPlanNoteCategory",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNoteCategory]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt",
    "resource": "Plan Note (via Plan)",
    "cursorField": "created_at",
    "path": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/notes",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNotes_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "fieldsPlanNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNote]"
      },
      {
        "name": "fieldsPlanNoteCategory",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNoteCategory]"
      }
    ]
  },
  {
    "id": "getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt",
    "resource": "Plan Note (via Plan)",
    "cursorField": "updated_at",
    "path": "/services/v2/service_types/{service_type_id}/plans/{plan_id}/notes",
    "pathParameters": [
      {
        "name": "serviceTypeId",
        "sourceName": "service_type_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId",
          "sourcePath": "/services/v2/service_types",
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
        "name": "planId",
        "sourceName": "plan_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId",
          "sourcePath": "/services/v2/service_types/{service_type_id}/plans",
          "parentBindings": [
            {
              "sourceName": "service_type_id",
              "fieldName": "getServiceTypesServiceTypeIdPlansPlanIdNotes_serviceTypeId"
            }
          ],
          "searchFilter": "where[title]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
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
        "name": "fieldsPlanNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNote]"
      },
      {
        "name": "fieldsPlanNoteCategory",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PlanNoteCategory]"
      }
    ]
  }
];

const NODE_PROPERTIES = [
    {
      displayName: 'Resource',
      name: 'resource',
      type: 'options',
      noDataExpression: true,
      options: [{"name":"Plan (via Live)","value":"Plan (via Live)"},{"name":"Plan (via Plan Person)","value":"Plan (via Plan Person)"},{"name":"Plan (via Series)","value":"Plan (via Series)"},{"name":"Plan (via Service Type Plan Next Plan)","value":"Plan (via Service Type Plan Next Plan)"},{"name":"Plan (via Service Type Plan Previous Plan)","value":"Plan (via Service Type Plan Previous Plan)"},{"name":"Plan (via Service Type Plans)","value":"Plan (via Service Type Plans)"},{"name":"Plan (via Service Type Unscoped Plans)","value":"Plan (via Service Type Unscoped Plans)"},{"name":"Plan Note (via Plan Template)","value":"Plan Note (via Plan Template)"},{"name":"Plan Note (via Plan)","value":"Plan Note (via Plan)"}],
      default: "Plan (via Live)",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan (via Live)"]}},
      options: [{"name":"Created","value":"getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan created (via Live)"},{"name":"Created or Updated","value":"getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan created or updated (via Live)"}],
      default: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"]}},
      options: [{"name":"Created","value":"getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan created (via Plan Person)"},{"name":"Created or Updated","value":"getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan created or updated (via Plan Person)"}],
      default: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan (via Series)"]}},
      options: [{"name":"Created","value":"getSeriesSeriesIdPlans_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan created (via Series)"},{"name":"Created or Updated","value":"getSeriesSeriesIdPlans_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan created or updated (via Series)"}],
      default: "getSeriesSeriesIdPlans_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"]}},
      options: [{"name":"Created","value":"getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan created (via Service Type Plan Next Plan)"},{"name":"Created or Updated","value":"getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan created or updated (via Service Type Plan Next Plan)"}],
      default: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"]}},
      options: [{"name":"Created","value":"getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan created (via Service Type Plan Previous Plan)"},{"name":"Created or Updated","value":"getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan created or updated (via Service Type Plan Previous Plan)"}],
      default: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"]}},
      options: [{"name":"Created","value":"getServiceTypesServiceTypeIdPlans_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan created (via Service Type Plans)"},{"name":"Created or Updated","value":"getServiceTypesServiceTypeIdPlans_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan created or updated (via Service Type Plans)"}],
      default: "getServiceTypesServiceTypeIdPlans_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"]}},
      options: [{"name":"Created","value":"getServiceTypesServiceTypeIdUnscopedPlans_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan created (via Service Type Unscoped Plans)"},{"name":"Created or Updated","value":"getServiceTypesServiceTypeIdUnscopedPlans_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan created or updated (via Service Type Unscoped Plans)"}],
      default: "getServiceTypesServiceTypeIdUnscopedPlans_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"]}},
      options: [{"name":"Created","value":"getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan Note created (via Plan Template)"},{"name":"Created or Updated","value":"getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan Note created or updated (via Plan Template)"}],
      default: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"]}},
      options: [{"name":"Created","value":"getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Plan Note created (via Plan)"},{"name":"Created or Updated","value":"getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Plan Note created or updated (via Plan)"}],
      default: "getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt",
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
      displayName: "Series ID",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt_seriesId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt"]}},
    },
    {
      displayName: "Live ID",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt_liveId",
      type: "string",
      default: "",
      required: true,
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Series ID",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt_seriesId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt"]}},
    },
    {
      displayName: "Live ID",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt_liveId",
      type: "string",
      default: "",
      required: true,
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Live)"],"operation":["getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt"]}},
    },
    {
      displayName: "Plan Person ID",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt_planPersonId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt"]}},
    },
    {
      displayName: "Plan Person ID",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt_planPersonId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Plan Person)"],"operation":["getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Series ID",
      name: "getSeriesSeriesIdPlans_createdAt_seriesId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansSeriesId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getSeriesSeriesIdPlans_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getSeriesSeriesIdPlans_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getSeriesSeriesIdPlans_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_createdAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Series ID",
      name: "getSeriesSeriesIdPlans_updatedAt_seriesId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansSeriesId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getSeriesSeriesIdPlans_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetSeriesSeriesIdPlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getSeriesSeriesIdPlans_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getSeriesSeriesIdPlans_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Series)"],"operation":["getSeriesSeriesIdPlans_updatedAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Next Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plan Previous Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlans_createdAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlans_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlans_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlans_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_createdAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlans_updatedAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlans_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlans_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlans_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Plans)"],"operation":["getServiceTypesServiceTypeIdPlans_updatedAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_createdAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_createdAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_updatedAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"ID","name":"whereid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]},{"displayName":"Title","name":"wheretitle","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Contributors","value":"contributors"},{"name":"My Schedules","value":"my_schedules"},{"name":"My Schedules Plan Times","value":"my_schedules.plan_times"},{"name":"Plan Times","value":"plan_times"},{"name":"Plan Times Split Team Rehearsal Assignments","value":"plan_times.split_team_rehearsal_assignments"},{"name":"Series","value":"series"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdUnscopedPlans_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan (via Service Type Unscoped Plans)"],"operation":["getServiceTypesServiceTypeIdUnscopedPlans_updatedAt"]}},
      options: [{"displayName":"Fields[Plan]","name":"fieldsPlan","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Contributor]","name":"fieldsContributor","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Time]","name":"fieldsPlanTime","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Schedule]","name":"fieldsSchedule","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Series]","name":"fieldsSeries","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Split Team Rehearsal Assignment]","name":"fieldsSplitTeamRehearsalAssignment","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt"]}},
    },
    {
      displayName: "Plan Template ID",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt_planTemplateId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Plan Note Category","value":"plan_note_category"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt"]}},
      options: [{"displayName":"Fields[Plan Note]","name":"fieldsPlanNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Note Category]","name":"fieldsPlanNoteCategory","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt"]}},
    },
    {
      displayName: "Plan Template ID",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt_planTemplateId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Plan Note Category","value":"plan_note_category"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan Template)"],"operation":["getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt"]}},
      options: [{"displayName":"Fields[Plan Note]","name":"fieldsPlanNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Note Category]","name":"fieldsPlanNoteCategory","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Plan Note Category","value":"plan_note_category"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt"]}},
      options: [{"displayName":"Fields[Plan Note]","name":"fieldsPlanNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Note Category]","name":"fieldsPlanNoteCategory","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Service Type ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt_serviceTypeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt"]}},
    },
    {
      displayName: "Plan ID",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt_planId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Plan Note Category","value":"plan_note_category"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Plan Note (via Plan)"],"operation":["getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt"]}},
      options: [{"displayName":"Fields[Plan Note]","name":"fieldsPlanNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Plan Note Category]","name":"fieldsPlanNoteCategory","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: '<strong>Limitations:</strong> This trigger may occasionally send the same record more than once, and it won’t report when a record is deleted. If a later workflow step fails after records are sent, this trigger won’t automatically send those records again.',
      name: 'deliveryLimitations',
      type: 'notice',
      default: '',
    },
  ] as any;

export class PlanningCenterServicesTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Services Trigger",
    name: "planningCenterServicesTrigger",
    icon: 'file:services.svg',
    group: ['trigger'],
    version: 1,
    subtitle: "={{({\"getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_createdAt\":\"GET /series/{series_id}/plans/{plan_id}/live/{live_id}/watchable_plans created_at\",\"getSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlans_updatedAt\":\"GET /series/{series_id}/plans/{plan_id}/live/{live_id}/watchable_plans updated_at\",\"getPeoplePersonIdPlanPeoplePlanPersonIdPlan_createdAt\":\"GET /people/{person_id}/plan_people/{plan_person_id}/plan created_at\",\"getPeoplePersonIdPlanPeoplePlanPersonIdPlan_updatedAt\":\"GET /people/{person_id}/plan_people/{plan_person_id}/plan updated_at\",\"getSeriesSeriesIdPlans_createdAt\":\"GET /series/{series_id}/plans created_at\",\"getSeriesSeriesIdPlans_updatedAt\":\"GET /series/{series_id}/plans updated_at\",\"getServiceTypesServiceTypeIdPlansPlanIdNextPlan_createdAt\":\"GET /service_types/{service_type_id}/plans/{plan_id}/next_plan created_at\",\"getServiceTypesServiceTypeIdPlansPlanIdNextPlan_updatedAt\":\"GET /service_types/{service_type_id}/plans/{plan_id}/next_plan updated_at\",\"getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_createdAt\":\"GET /service_types/{service_type_id}/plans/{plan_id}/previous_plan created_at\",\"getServiceTypesServiceTypeIdPlansPlanIdPreviousPlan_updatedAt\":\"GET /service_types/{service_type_id}/plans/{plan_id}/previous_plan updated_at\",\"getServiceTypesServiceTypeIdPlans_createdAt\":\"GET /service_types/{service_type_id}/plans created_at\",\"getServiceTypesServiceTypeIdPlans_updatedAt\":\"GET /service_types/{service_type_id}/plans updated_at\",\"getServiceTypesServiceTypeIdUnscopedPlans_createdAt\":\"GET /service_types/{service_type_id}/unscoped_plans created_at\",\"getServiceTypesServiceTypeIdUnscopedPlans_updatedAt\":\"GET /service_types/{service_type_id}/unscoped_plans updated_at\",\"getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_createdAt\":\"GET /service_types/{service_type_id}/plan_templates/{plan_template_id}/notes created_at\",\"getServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotes_updatedAt\":\"GET /service_types/{service_type_id}/plan_templates/{plan_template_id}/notes updated_at\",\"getServiceTypesServiceTypeIdPlansPlanIdNotes_createdAt\":\"GET /service_types/{service_type_id}/plans/{plan_id}/notes created_at\",\"getServiceTypesServiceTypeIdPlansPlanIdNotes_updatedAt\":\"GET /service_types/{service_type_id}/plans/{plan_id}/notes updated_at\"})[$parameter[\"operation\"]] || $parameter[\"operation\"]}}",
    description: "Poll Planning Center Services for created or updated resources.",
    defaults: { name: "Planning Center Services Trigger" },
    inputs: [],
    outputs: ['main'],
    polling: true,
    credentials: [{ name: 'planningCenterPatApi', required: true }],
    properties: NODE_PROPERTIES,
  };

  methods = {
    listSearch: {
      searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPersonId"], filter);
      },
      searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanPlanPersonId"], filter);
      },
      searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPlanPeoplePlanPersonIdPlanWhereid"], filter);
      },
      searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansPlanId"], filter);
      },
      searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansSeriesId"], filter);
      },
      searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdPlansPlanIdLiveLiveIdWatchablePlansWhereid"], filter);
      },
      searchGetSeriesSeriesIdPlansSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdPlansSeriesId"], filter);
      },
      searchGetSeriesSeriesIdPlansWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdPlansWhereid"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanPlanId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanServiceTypeId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdNextPlanWhereid"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdNotesPlanId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdNotesServiceTypeId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanPlanId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanServiceTypeId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansPlanIdPreviousPlanWhereid"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansServiceTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansServiceTypeId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlansWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlansWhereid"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesPlanTemplateId"], filter);
      },
      searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdPlanTemplatesPlanTemplateIdNotesServiceTypeId"], filter);
      },
      searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdUnscopedPlansServiceTypeId"], filter);
      },
      searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetServiceTypesServiceTypeIdUnscopedPlansWhereid"], filter);
      },
    },
  };

  async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
    return pollPlanningCenter.call(this, OPERATIONS);
  }
}
