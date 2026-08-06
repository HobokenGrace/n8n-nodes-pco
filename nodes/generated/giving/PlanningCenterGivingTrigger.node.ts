import type { ILoadOptionsFunctions, INodeExecutionData, INodeListSearchResult, INodeType, INodeTypeDescription, IPollFunctions } from 'n8n-workflow';

import { searchPlanningCenterLookup, type GeneratedLookup } from '../../../src/runtime/lookup';
import { pollPlanningCenter, type PollingOperation } from '../../../src/runtime/polling';

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = {
  "searchGetBatchesBatchIdBatchGroupBatchId": {
    "methodName": "searchGetBatchesBatchIdBatchGroupBatchId",
    "sourcePath": "/giving/v2/batches",
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
  "searchGetBatchesBatchIdDonationsBatchId": {
    "methodName": "searchGetBatchesBatchIdDonationsBatchId",
    "sourcePath": "/giving/v2/batches",
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
  "searchGetBatchGroupsBatchGroupIdBatchesBatchGroupId": {
    "methodName": "searchGetBatchGroupsBatchGroupIdBatchesBatchGroupId",
    "sourcePath": "/giving/v2/batch_groups",
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
  "searchGetCampusesCampusIdDonationsCampusId": {
    "methodName": "searchGetCampusesCampusIdDonationsCampusId",
    "sourcePath": "/giving/v2/campuses",
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
  "searchGetInKindDonationsWherefundid": {
    "methodName": "searchGetInKindDonationsWherefundid",
    "sourcePath": "/giving/v2/funds",
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
  "searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId": {
    "methodName": "searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId",
    "sourcePath": "/giving/v2/payment_sources",
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
  "searchGetPeoplePersonIdBatchesPersonId": {
    "methodName": "searchGetPeoplePersonIdBatchesPersonId",
    "sourcePath": "/giving/v2/people",
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
  "searchGetPeoplePersonIdBatchGroupsPersonId": {
    "methodName": "searchGetPeoplePersonIdBatchGroupsPersonId",
    "sourcePath": "/giving/v2/people",
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
  "searchGetPeoplePersonIdDonationsPersonId": {
    "methodName": "searchGetPeoplePersonIdDonationsPersonId",
    "sourcePath": "/giving/v2/people",
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
  "searchGetPeoplePersonIdInKindDonationsPersonId": {
    "methodName": "searchGetPeoplePersonIdInKindDonationsPersonId",
    "sourcePath": "/giving/v2/people",
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
  "searchGetPeoplePersonIdInKindDonationsWherefundid": {
    "methodName": "searchGetPeoplePersonIdInKindDonationsWherefundid",
    "sourcePath": "/giving/v2/funds",
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
  "searchGetPeoplePersonIdPledgesPersonId": {
    "methodName": "searchGetPeoplePersonIdPledgesPersonId",
    "sourcePath": "/giving/v2/people",
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
  "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId": {
    "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId",
    "sourcePath": "/giving/v2/people",
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
  "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId": {
    "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId",
    "sourcePath": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId"
      },
      {
        "sourceName": "pledge_id",
        "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_pledgeId"
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
  "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId": {
    "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
    "sourcePath": "/giving/v2/people/{person_id}/pledges",
    "parentBindings": [
      {
        "sourceName": "person_id",
        "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId"
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
};

const OPERATIONS: PollingOperation[] = [
  {
    "id": "getBatchGroupsBatchGroupIdBatches_updatedAt",
    "resource": "Batch (via Batch Group)",
    "cursorField": "updated_at",
    "path": "/giving/v2/batch_groups/{batch_group_id}/batches",
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetBatchGroupsBatchGroupIdBatchesBatchGroupId",
          "sourcePath": "/giving/v2/batch_groups",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsBatch",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Batch]"
      },
      {
        "name": "fieldsBatchGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[BatchGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdBatches_updatedAt",
    "resource": "Batch (via Person)",
    "cursorField": "updated_at",
    "path": "/giving/v2/people/{person_id}/batches",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdBatchesPersonId",
          "sourcePath": "/giving/v2/people",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsBatch",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Batch]"
      },
      {
        "name": "fieldsBatchGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[BatchGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getBatchesBatchIdBatchGroup_updatedAt",
    "resource": "Batch Group (via Batch)",
    "cursorField": "updated_at",
    "path": "/giving/v2/batches/{batch_id}/batch_group",
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetBatchesBatchIdBatchGroupBatchId",
          "sourcePath": "/giving/v2/batches",
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
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsBatchGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[BatchGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdBatchGroups_updatedAt",
    "resource": "Batch Group (via Person)",
    "cursorField": "updated_at",
    "path": "/giving/v2/people/{person_id}/batch_groups",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdBatchGroupsPersonId",
          "sourcePath": "/giving/v2/people",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsBatchGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[BatchGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getBatchGroups_updatedAt",
    "resource": "Batch Group",
    "cursorField": "updated_at",
    "path": "/giving/v2/batch_groups",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsBatchGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[BatchGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getBatches_updatedAt",
    "resource": "Batch",
    "cursorField": "updated_at",
    "path": "/giving/v2/batches",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "include",
        "group": "include",
        "kind": "single",
        "sourceName": "include"
      },
      {
        "name": "fieldsBatch",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Batch]"
      },
      {
        "name": "fieldsBatchGroup",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[BatchGroup]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getBatchesBatchIdDonations_createdAt",
    "resource": "Donation (via Batch)",
    "cursorField": "created_at",
    "path": "/giving/v2/batches/{batch_id}/donations",
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetBatchesBatchIdDonationsBatchId",
          "sourcePath": "/giving/v2/batches",
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
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getBatchesBatchIdDonations_updatedAt",
    "resource": "Donation (via Batch)",
    "cursorField": "updated_at",
    "path": "/giving/v2/batches/{batch_id}/donations",
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetBatchesBatchIdDonationsBatchId",
          "sourcePath": "/giving/v2/batches",
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
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getCampusesCampusIdDonations_createdAt",
    "resource": "Donation (via Campus)",
    "cursorField": "created_at",
    "path": "/giving/v2/campuses/{campus_id}/donations",
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdDonationsCampusId",
          "sourcePath": "/giving/v2/campuses",
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
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getCampusesCampusIdDonations_updatedAt",
    "resource": "Donation (via Campus)",
    "cursorField": "updated_at",
    "path": "/giving/v2/campuses/{campus_id}/donations",
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdDonationsCampusId",
          "sourcePath": "/giving/v2/campuses",
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
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPaymentSourcesPaymentSourceIdDonations_createdAt",
    "resource": "Donation (via Payment Source)",
    "cursorField": "created_at",
    "path": "/giving/v2/payment_sources/{payment_source_id}/donations",
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId",
          "sourcePath": "/giving/v2/payment_sources",
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
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPaymentSourcesPaymentSourceIdDonations_updatedAt",
    "resource": "Donation (via Payment Source)",
    "cursorField": "updated_at",
    "path": "/giving/v2/payment_sources/{payment_source_id}/donations",
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId",
          "sourcePath": "/giving/v2/payment_sources",
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
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdDonations_createdAt",
    "resource": "Donation (via Person)",
    "cursorField": "created_at",
    "path": "/giving/v2/people/{person_id}/donations",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdDonationsPersonId",
          "sourcePath": "/giving/v2/people",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdDonations_updatedAt",
    "resource": "Donation (via Person)",
    "cursorField": "updated_at",
    "path": "/giving/v2/people/{person_id}/donations",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdDonationsPersonId",
          "sourcePath": "/giving/v2/people",
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
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getDonations_createdAt",
    "resource": "Donation",
    "cursorField": "created_at",
    "path": "/giving/v2/donations",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getDonations_updatedAt",
    "resource": "Donation",
    "cursorField": "updated_at",
    "path": "/giving/v2/donations",
    "pathParameters": [],
    "ordinaryQueryFields": [],
    "queryOptions": [
      {
        "name": "wherereceivedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
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
        "name": "wherecompletedAtFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
        "name": "fieldsDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Donation]"
      },
      {
        "name": "fieldsDesignation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Designation]"
      },
      {
        "name": "fieldsLabel",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Label]"
      },
      {
        "name": "fieldsNote",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Note]"
      },
      {
        "name": "fieldsRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Refund]"
      },
      {
        "name": "fieldsDesignationRefund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[DesignationRefund]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdInKindDonations_createdAt",
    "resource": "In Kind Donation (via Person)",
    "cursorField": "created_at",
    "path": "/giving/v2/people/{person_id}/in_kind_donations",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdInKindDonationsPersonId",
          "sourcePath": "/giving/v2/people",
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
        "name": "wherereceivedOnFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_on]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_on][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_on][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_on][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_on][lte]"
          }
        ]
      },
      {
        "name": "wherefundid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[fund][id]",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdInKindDonationsWherefundid",
          "sourcePath": "/giving/v2/funds",
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
        "name": "fieldsInKindDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[InKindDonation]"
      },
      {
        "name": "fieldsCampus",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Campus]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdInKindDonations_updatedAt",
    "resource": "In Kind Donation (via Person)",
    "cursorField": "updated_at",
    "path": "/giving/v2/people/{person_id}/in_kind_donations",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdInKindDonationsPersonId",
          "sourcePath": "/giving/v2/people",
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
        "name": "wherereceivedOnFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_on]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_on][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_on][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_on][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_on][lte]"
          }
        ]
      },
      {
        "name": "wherefundid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[fund][id]",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdInKindDonationsWherefundid",
          "sourcePath": "/giving/v2/funds",
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
        "name": "fieldsInKindDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[InKindDonation]"
      },
      {
        "name": "fieldsCampus",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Campus]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getInKindDonations_createdAt",
    "resource": "In Kind Donation",
    "cursorField": "created_at",
    "path": "/giving/v2/in_kind_donations",
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
        "name": "wherereceivedOnFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_on]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_on][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_on][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_on][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_on][lte]"
          }
        ]
      },
      {
        "name": "wherefundid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[fund][id]",
        "lookup": {
          "methodName": "searchGetInKindDonationsWherefundid",
          "sourcePath": "/giving/v2/funds",
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
        "name": "fieldsInKindDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[InKindDonation]"
      },
      {
        "name": "fieldsCampus",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Campus]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getInKindDonations_updatedAt",
    "resource": "In Kind Donation",
    "cursorField": "updated_at",
    "path": "/giving/v2/in_kind_donations",
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
        "name": "wherereceivedOnFilter",
        "group": "filter",
        "kind": "operator",
        "operators": [
          {
            "value": "eq",
            "sourceName": "where[received_on]"
          },
          {
            "value": "gt",
            "sourceName": "where[received_on][gt]"
          },
          {
            "value": "gte",
            "sourceName": "where[received_on][gte]"
          },
          {
            "value": "lt",
            "sourceName": "where[received_on][lt]"
          },
          {
            "value": "lte",
            "sourceName": "where[received_on][lte]"
          }
        ]
      },
      {
        "name": "wherefundid",
        "group": "filter",
        "kind": "single",
        "sourceName": "where[fund][id]",
        "lookup": {
          "methodName": "searchGetInKindDonationsWherefundid",
          "sourcePath": "/giving/v2/funds",
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
        "name": "fieldsInKindDonation",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[InKindDonation]"
      },
      {
        "name": "fieldsCampus",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Campus]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdPledges_createdAt",
    "resource": "Pledge (via Person)",
    "cursorField": "created_at",
    "path": "/giving/v2/people/{person_id}/pledges",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPersonId",
          "sourcePath": "/giving/v2/people",
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
        "name": "fieldsPledge",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Pledge]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsPledgeCampaign",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PledgeCampaign]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdPledges_updatedAt",
    "resource": "Pledge (via Person)",
    "cursorField": "updated_at",
    "path": "/giving/v2/people/{person_id}/pledges",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPersonId",
          "sourcePath": "/giving/v2/people",
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
        "name": "fieldsPledge",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Pledge]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsPledgeCampaign",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PledgeCampaign]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt",
    "resource": "Pledge (via Pledge Campaign)",
    "cursorField": "created_at",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId",
          "sourcePath": "/giving/v2/people",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
          "sourcePath": "/giving/v2/people/{person_id}/pledges",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId"
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
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId",
          "sourcePath": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId"
            },
            {
              "sourceName": "pledge_id",
              "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_pledgeId"
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
        "name": "fieldsPledge",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Pledge]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsPledgeCampaign",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PledgeCampaign]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
      }
    ]
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt",
    "resource": "Pledge (via Pledge Campaign)",
    "cursorField": "updated_at",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId",
          "sourcePath": "/giving/v2/people",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
          "sourcePath": "/giving/v2/people/{person_id}/pledges",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId"
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
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId",
          "sourcePath": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign",
          "parentBindings": [
            {
              "sourceName": "person_id",
              "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId"
            },
            {
              "sourceName": "pledge_id",
              "fieldName": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_pledgeId"
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
        "name": "fieldsPledge",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Pledge]"
      },
      {
        "name": "fieldsPerson",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Person]"
      },
      {
        "name": "fieldsPledgeCampaign",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[PledgeCampaign]"
      },
      {
        "name": "fieldsFund",
        "group": "fields",
        "kind": "single",
        "sourceName": "fields[Fund]"
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
      options: [{"name":"Batch","value":"Batch"},{"name":"Batch (via Batch Group)","value":"Batch (via Batch Group)"},{"name":"Batch (via Person)","value":"Batch (via Person)"},{"name":"Batch Group","value":"Batch Group"},{"name":"Batch Group (via Batch)","value":"Batch Group (via Batch)"},{"name":"Batch Group (via Person)","value":"Batch Group (via Person)"},{"name":"Donation","value":"Donation"},{"name":"Donation (via Batch)","value":"Donation (via Batch)"},{"name":"Donation (via Campus)","value":"Donation (via Campus)"},{"name":"Donation (via Payment Source)","value":"Donation (via Payment Source)"},{"name":"Donation (via Person)","value":"Donation (via Person)"},{"name":"In Kind Donation","value":"In Kind Donation"},{"name":"In Kind Donation (via Person)","value":"In Kind Donation (via Person)"},{"name":"Pledge (via Person)","value":"Pledge (via Person)"},{"name":"Pledge (via Pledge Campaign)","value":"Pledge (via Pledge Campaign)"}],
      default: "Batch",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Batch"]}},
      options: [{"name":"Created or Updated","value":"getBatches_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Batch created or updated"}],
      default: "getBatches_updatedAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Batch (via Batch Group)"]}},
      options: [{"name":"Created or Updated","value":"getBatchGroupsBatchGroupIdBatches_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Batch created or updated (via Batch Group)"}],
      default: "getBatchGroupsBatchGroupIdBatches_updatedAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Batch (via Person)"]}},
      options: [{"name":"Created or Updated","value":"getPeoplePersonIdBatches_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Batch created or updated (via Person)"}],
      default: "getPeoplePersonIdBatches_updatedAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Batch Group"]}},
      options: [{"name":"Created or Updated","value":"getBatchGroups_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Batch Group created or updated"}],
      default: "getBatchGroups_updatedAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Batch Group (via Batch)"]}},
      options: [{"name":"Created or Updated","value":"getBatchesBatchIdBatchGroup_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Batch Group created or updated (via Batch)"}],
      default: "getBatchesBatchIdBatchGroup_updatedAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Batch Group (via Person)"]}},
      options: [{"name":"Created or Updated","value":"getPeoplePersonIdBatchGroups_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Batch Group created or updated (via Person)"}],
      default: "getPeoplePersonIdBatchGroups_updatedAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Donation"]}},
      options: [{"name":"Created","value":"getDonations_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Donation created"},{"name":"Created or Updated","value":"getDonations_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Donation created or updated"}],
      default: "getDonations_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Donation (via Batch)"]}},
      options: [{"name":"Created","value":"getBatchesBatchIdDonations_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Donation created (via Batch)"},{"name":"Created or Updated","value":"getBatchesBatchIdDonations_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Donation created or updated (via Batch)"}],
      default: "getBatchesBatchIdDonations_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Donation (via Campus)"]}},
      options: [{"name":"Created","value":"getCampusesCampusIdDonations_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Donation created (via Campus)"},{"name":"Created or Updated","value":"getCampusesCampusIdDonations_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Donation created or updated (via Campus)"}],
      default: "getCampusesCampusIdDonations_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"]}},
      options: [{"name":"Created","value":"getPaymentSourcesPaymentSourceIdDonations_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Donation created (via Payment Source)"},{"name":"Created or Updated","value":"getPaymentSourcesPaymentSourceIdDonations_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Donation created or updated (via Payment Source)"}],
      default: "getPaymentSourcesPaymentSourceIdDonations_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Donation (via Person)"]}},
      options: [{"name":"Created","value":"getPeoplePersonIdDonations_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Donation created (via Person)"},{"name":"Created or Updated","value":"getPeoplePersonIdDonations_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Donation created or updated (via Person)"}],
      default: "getPeoplePersonIdDonations_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["In Kind Donation"]}},
      options: [{"name":"Created","value":"getInKindDonations_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On In Kind Donation created"},{"name":"Created or Updated","value":"getInKindDonations_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On In Kind Donation created or updated"}],
      default: "getInKindDonations_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"]}},
      options: [{"name":"Created","value":"getPeoplePersonIdInKindDonations_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On In Kind Donation created (via Person)"},{"name":"Created or Updated","value":"getPeoplePersonIdInKindDonations_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On In Kind Donation created or updated (via Person)"}],
      default: "getPeoplePersonIdInKindDonations_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Pledge (via Person)"]}},
      options: [{"name":"Created","value":"getPeoplePersonIdPledges_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Pledge created (via Person)"},{"name":"Created or Updated","value":"getPeoplePersonIdPledges_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Pledge created or updated (via Person)"}],
      default: "getPeoplePersonIdPledges_createdAt",
    },
    {
      displayName: 'Event',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"]}},
      options: [{"name":"Created","value":"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt","description":"Follows creation time. An older resource that only starts matching later is not detected.","action":"On Pledge created (via Pledge Campaign)"},{"name":"Created or Updated","value":"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt","description":"Includes initial creation and later changes when the update timestamp advances.","action":"On Pledge created or updated (via Pledge Campaign)"}],
      default: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt",
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
      displayName: "Batch Group ID",
      name: "getBatchGroupsBatchGroupIdBatches_updatedAt_batchGroupId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetBatchGroupsBatchGroupIdBatchesBatchGroupId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Batch (via Batch Group)"],"operation":["getBatchGroupsBatchGroupIdBatches_updatedAt"]}},
    },
    {
      displayName: "Include",
      name: "getBatchGroupsBatchGroupIdBatches_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch (via Batch Group)"],"operation":["getBatchGroupsBatchGroupIdBatches_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Batch Group","value":"batch_group"},{"name":"Batch Group Owner","value":"batch_group.owner"},{"name":"Owner","value":"owner"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getBatchGroupsBatchGroupIdBatches_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch (via Batch Group)"],"operation":["getBatchGroupsBatchGroupIdBatches_updatedAt"]}},
      options: [{"displayName":"Fields[Batch]","name":"fieldsBatch","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Batch Group]","name":"fieldsBatchGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdBatches_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdBatchesPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Batch (via Person)"],"operation":["getPeoplePersonIdBatches_updatedAt"]}},
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdBatches_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch (via Person)"],"operation":["getPeoplePersonIdBatches_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Batch Group","value":"batch_group"},{"name":"Batch Group Owner","value":"batch_group.owner"},{"name":"Owner","value":"owner"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdBatches_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch (via Person)"],"operation":["getPeoplePersonIdBatches_updatedAt"]}},
      options: [{"displayName":"Fields[Batch]","name":"fieldsBatch","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Batch Group]","name":"fieldsBatchGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Batch ID",
      name: "getBatchesBatchIdBatchGroup_updatedAt_batchId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetBatchesBatchIdBatchGroupBatchId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Batch Group (via Batch)"],"operation":["getBatchesBatchIdBatchGroup_updatedAt"]}},
    },
    {
      displayName: "Include",
      name: "getBatchesBatchIdBatchGroup_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch Group (via Batch)"],"operation":["getBatchesBatchIdBatchGroup_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Owner","value":"owner"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getBatchesBatchIdBatchGroup_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch Group (via Batch)"],"operation":["getBatchesBatchIdBatchGroup_updatedAt"]}},
      options: [{"displayName":"Fields[Batch Group]","name":"fieldsBatchGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdBatchGroups_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdBatchGroupsPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Batch Group (via Person)"],"operation":["getPeoplePersonIdBatchGroups_updatedAt"]}},
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdBatchGroups_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch Group (via Person)"],"operation":["getPeoplePersonIdBatchGroups_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Owner","value":"owner"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdBatchGroups_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch Group (via Person)"],"operation":["getPeoplePersonIdBatchGroups_updatedAt"]}},
      options: [{"displayName":"Fields[Batch Group]","name":"fieldsBatchGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getBatchGroups_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch Group"],"operation":["getBatchGroups_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Owner","value":"owner"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getBatchGroups_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch Group"],"operation":["getBatchGroups_updatedAt"]}},
      options: [{"displayName":"Fields[Batch Group]","name":"fieldsBatchGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getBatches_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch"],"operation":["getBatches_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Batch Group","value":"batch_group"},{"name":"Batch Group Owner","value":"batch_group.owner"},{"name":"Owner","value":"owner"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getBatches_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Batch"],"operation":["getBatches_updatedAt"]}},
      options: [{"displayName":"Fields[Batch]","name":"fieldsBatch","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Batch Group]","name":"fieldsBatchGroup","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Batch ID",
      name: "getBatchesBatchIdDonations_createdAt_batchId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetBatchesBatchIdDonationsBatchId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getBatchesBatchIdDonations_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_createdAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getBatchesBatchIdDonations_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getBatchesBatchIdDonations_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_createdAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Batch ID",
      name: "getBatchesBatchIdDonations_updatedAt_batchId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetBatchesBatchIdDonationsBatchId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getBatchesBatchIdDonations_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_updatedAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getBatchesBatchIdDonations_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getBatchesBatchIdDonations_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Batch)"],"operation":["getBatchesBatchIdDonations_updatedAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Campus ID",
      name: "getCampusesCampusIdDonations_createdAt_campusId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCampusesCampusIdDonationsCampusId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCampusesCampusIdDonations_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_createdAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCampusesCampusIdDonations_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCampusesCampusIdDonations_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_createdAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Campus ID",
      name: "getCampusesCampusIdDonations_updatedAt_campusId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetCampusesCampusIdDonationsCampusId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getCampusesCampusIdDonations_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_updatedAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getCampusesCampusIdDonations_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getCampusesCampusIdDonations_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Campus)"],"operation":["getCampusesCampusIdDonations_updatedAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Payment Source ID",
      name: "getPaymentSourcesPaymentSourceIdDonations_createdAt_paymentSourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPaymentSourcesPaymentSourceIdDonations_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_createdAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPaymentSourcesPaymentSourceIdDonations_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPaymentSourcesPaymentSourceIdDonations_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_createdAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Payment Source ID",
      name: "getPaymentSourcesPaymentSourceIdDonations_updatedAt_paymentSourceId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPaymentSourcesPaymentSourceIdDonations_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_updatedAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPaymentSourcesPaymentSourceIdDonations_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPaymentSourcesPaymentSourceIdDonations_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Payment Source)"],"operation":["getPaymentSourcesPaymentSourceIdDonations_updatedAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdDonations_createdAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdDonationsPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdDonations_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_createdAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdDonations_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdDonations_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_createdAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdDonations_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdDonationsPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdDonations_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_updatedAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdDonations_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdDonations_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation (via Person)"],"operation":["getPeoplePersonIdDonations_updatedAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getDonations_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation"],"operation":["getDonations_createdAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getDonations_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation"],"operation":["getDonations_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getDonations_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation"],"operation":["getDonations_createdAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getDonations_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation"],"operation":["getDonations_updatedAt"]}},
      options: [{"displayName":"Received At","name":"wherereceivedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Completed At","name":"wherecompletedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getDonations_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation"],"operation":["getDonations_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Designations","value":"designations"},{"name":"Designations Fund","value":"designations.fund"},{"name":"Labels","value":"labels"},{"name":"Note","value":"note"},{"name":"Refund","value":"refund"},{"name":"Refund Designation Refunds","value":"refund.designation_refunds"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getDonations_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Donation"],"operation":["getDonations_updatedAt"]}},
      options: [{"displayName":"Fields[Donation]","name":"fieldsDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation]","name":"fieldsDesignation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Label]","name":"fieldsLabel","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Note]","name":"fieldsNote","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Refund]","name":"fieldsRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Designation Refund]","name":"fieldsDesignationRefund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdInKindDonations_createdAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdInKindDonationsPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdInKindDonations_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Received On","name":"wherereceivedOnFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fund ID","name":"wherefundid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdInKindDonationsWherefundid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdInKindDonations_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Campus","value":"campus"},{"name":"Fund","value":"fund"},{"name":"Person","value":"person"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdInKindDonations_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_createdAt"]}},
      options: [{"displayName":"Fields[In Kind Donation]","name":"fieldsInKindDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Campus]","name":"fieldsCampus","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdInKindDonations_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdInKindDonationsPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdInKindDonations_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Received On","name":"wherereceivedOnFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fund ID","name":"wherefundid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdInKindDonationsWherefundid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdInKindDonations_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Campus","value":"campus"},{"name":"Fund","value":"fund"},{"name":"Person","value":"person"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdInKindDonations_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation (via Person)"],"operation":["getPeoplePersonIdInKindDonations_updatedAt"]}},
      options: [{"displayName":"Fields[In Kind Donation]","name":"fieldsInKindDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Campus]","name":"fieldsCampus","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getInKindDonations_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation"],"operation":["getInKindDonations_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Received On","name":"wherereceivedOnFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fund ID","name":"wherefundid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetInKindDonationsWherefundid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getInKindDonations_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation"],"operation":["getInKindDonations_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Campus","value":"campus"},{"name":"Fund","value":"fund"},{"name":"Person","value":"person"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getInKindDonations_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation"],"operation":["getInKindDonations_createdAt"]}},
      options: [{"displayName":"Fields[In Kind Donation]","name":"fieldsInKindDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Campus]","name":"fieldsCampus","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Filter",
      name: "getInKindDonations_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation"],"operation":["getInKindDonations_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Received On","name":"wherereceivedOnFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fund ID","name":"wherefundid","values":[{"displayName":"Value","name":"value","type":"resourceLocator","modes":[{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetInKindDonationsWherefundid","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],"default":{"mode":"list","value":""}}]}],
    },
    {
      displayName: "Include",
      name: "getInKindDonations_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation"],"operation":["getInKindDonations_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Campus","value":"campus"},{"name":"Fund","value":"fund"},{"name":"Person","value":"person"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getInKindDonations_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["In Kind Donation"],"operation":["getInKindDonations_updatedAt"]}},
      options: [{"displayName":"Fields[In Kind Donation]","name":"fieldsInKindDonation","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Campus]","name":"fieldsCampus","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdPledges_createdAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdPledges_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdPledges_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Joint Giver","value":"joint_giver"},{"name":"Pledge Campaign","value":"pledge_campaign"},{"name":"Pledge Campaign Fund","value":"pledge_campaign.fund"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdPledges_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_createdAt"]}},
      options: [{"displayName":"Fields[Pledge]","name":"fieldsPledge","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Pledge Campaign]","name":"fieldsPledgeCampaign","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdPledges_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdPledges_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdPledges_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Joint Giver","value":"joint_giver"},{"name":"Pledge Campaign","value":"pledge_campaign"},{"name":"Pledge Campaign Fund","value":"pledge_campaign.fund"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdPledges_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Person)"],"operation":["getPeoplePersonIdPledges_updatedAt"]}},
      options: [{"displayName":"Fields[Pledge]","name":"fieldsPledge","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Pledge Campaign]","name":"fieldsPledgeCampaign","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt"]}},
    },
    {
      displayName: "Pledge ID",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt_pledgeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt"]}},
    },
    {
      displayName: "Pledge Campaign ID",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt_pledgeCampaignId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt"]}},
      options: [{"displayName":"Updated At","name":"whereupdatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Joint Giver","value":"joint_giver"},{"name":"Pledge Campaign","value":"pledge_campaign"},{"name":"Pledge Campaign Fund","value":"pledge_campaign.fund"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt"]}},
      options: [{"displayName":"Fields[Pledge]","name":"fieldsPledge","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Pledge Campaign]","name":"fieldsPledgeCampaign","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Person ID",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt_personId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt"]}},
    },
    {
      displayName: "Pledge ID",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt_pledgeId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt"]}},
    },
    {
      displayName: "Pledge Campaign ID",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt_pledgeCampaignId",
      type: "resourceLocator",
      default: {"mode":"list","value":""},
      required: true,
      modes: [{"displayName":"List","name":"list","type":"list","typeOptions":{"searchListMethod":"searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId","searchable":true}},{"displayName":"ID","name":"id","type":"string","placeholder":"e.g. 12345"}],
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt"]}},
    },
    {
      displayName: "Filter",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt_filter",
      type: 'fixedCollection',
      default: {},
      placeholder: "Filter by",
      hint: "Only emit records that match the selected Planning Center API filters.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt"]}},
      options: [{"displayName":"Created At","name":"wherecreatedAtFilter","values":[{"displayName":"Operator","name":"operator","type":"options","options":[{"name":"Equals","value":"eq"},{"name":"Greater Than","value":"gt"},{"name":"Greater Than Or Equal","value":"gte"},{"name":"Less Than","value":"lt"},{"name":"Less Than Or Equal","value":"lte"}],"default":"eq"},{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: "Include",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt_include",
      type: 'fixedCollection',
      default: {},
      placeholder: "Include data",
      hint: "Request related resources from Planning Center in the same API response.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt"]}},
      options: [{"displayName":"Include","name":"include","values":[{"displayName":"Value","name":"value","type":"options","options":[{"name":"Joint Giver","value":"joint_giver"},{"name":"Pledge Campaign","value":"pledge_campaign"},{"name":"Pledge Campaign Fund","value":"pledge_campaign.fund"}],"default":""}]}],
    },
    {
      displayName: "Sparse Fields",
      name: "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt_fields",
      type: 'fixedCollection',
      default: {},
      placeholder: "Select fields",
      hint: "Request only the selected attributes from Planning Center to reduce the data transferred to n8n.",
      typeOptions: { multipleValues: true },
      displayOptions: {"show":{"resource":["Pledge (via Pledge Campaign)"],"operation":["getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt"]}},
      options: [{"displayName":"Fields[Pledge]","name":"fieldsPledge","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Person]","name":"fieldsPerson","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Pledge Campaign]","name":"fieldsPledgeCampaign","values":[{"displayName":"Value","name":"value","type":"string","default":""}]},{"displayName":"Fields[Fund]","name":"fieldsFund","values":[{"displayName":"Value","name":"value","type":"string","default":""}]}],
    },
    {
      displayName: '<strong>Limitations:</strong> This trigger may occasionally send the same record more than once, and it won’t report when a record is deleted. If a later workflow step fails after records are sent, this trigger won’t automatically send those records again.',
      name: 'deliveryLimitations',
      type: 'notice',
      default: '',
    },
  ] as any;

export class PlanningCenterGivingTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Giving Trigger",
    name: "planningCenterGivingTrigger",
    icon: 'file:giving.svg',
    group: ['trigger'],
    version: 1,
    subtitle: "={{({\"getBatchGroupsBatchGroupIdBatches_updatedAt\":\"GET /batch_groups/{batch_group_id}/batches updated_at\",\"getPeoplePersonIdBatches_updatedAt\":\"GET /people/{person_id}/batches updated_at\",\"getBatchesBatchIdBatchGroup_updatedAt\":\"GET /batches/{batch_id}/batch_group updated_at\",\"getPeoplePersonIdBatchGroups_updatedAt\":\"GET /people/{person_id}/batch_groups updated_at\",\"getBatchGroups_updatedAt\":\"GET /batch_groups updated_at\",\"getBatches_updatedAt\":\"GET /batches updated_at\",\"getBatchesBatchIdDonations_createdAt\":\"GET /batches/{batch_id}/donations created_at\",\"getBatchesBatchIdDonations_updatedAt\":\"GET /batches/{batch_id}/donations updated_at\",\"getCampusesCampusIdDonations_createdAt\":\"GET /campuses/{campus_id}/donations created_at\",\"getCampusesCampusIdDonations_updatedAt\":\"GET /campuses/{campus_id}/donations updated_at\",\"getPaymentSourcesPaymentSourceIdDonations_createdAt\":\"GET /payment_sources/{payment_source_id}/donations created_at\",\"getPaymentSourcesPaymentSourceIdDonations_updatedAt\":\"GET /payment_sources/{payment_source_id}/donations updated_at\",\"getPeoplePersonIdDonations_createdAt\":\"GET /people/{person_id}/donations created_at\",\"getPeoplePersonIdDonations_updatedAt\":\"GET /people/{person_id}/donations updated_at\",\"getDonations_createdAt\":\"GET /donations created_at\",\"getDonations_updatedAt\":\"GET /donations updated_at\",\"getPeoplePersonIdInKindDonations_createdAt\":\"GET /people/{person_id}/in_kind_donations created_at\",\"getPeoplePersonIdInKindDonations_updatedAt\":\"GET /people/{person_id}/in_kind_donations updated_at\",\"getInKindDonations_createdAt\":\"GET /in_kind_donations created_at\",\"getInKindDonations_updatedAt\":\"GET /in_kind_donations updated_at\",\"getPeoplePersonIdPledges_createdAt\":\"GET /people/{person_id}/pledges created_at\",\"getPeoplePersonIdPledges_updatedAt\":\"GET /people/{person_id}/pledges updated_at\",\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_createdAt\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges created_at\",\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_updatedAt\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges updated_at\"})[$parameter[\"operation\"]] || $parameter[\"operation\"]}}",
    description: "Poll Planning Center Giving for created or updated resources.",
    defaults: { name: "Planning Center Giving Trigger" },
    inputs: [],
    outputs: ['main'],
    polling: true,
    credentials: [{ name: 'planningCenterPatApi', required: true }],
    properties: NODE_PROPERTIES,
  };

  methods = {
    listSearch: {
      searchGetBatchesBatchIdBatchGroupBatchId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetBatchesBatchIdBatchGroupBatchId"], filter);
      },
      searchGetBatchesBatchIdDonationsBatchId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetBatchesBatchIdDonationsBatchId"], filter);
      },
      searchGetBatchGroupsBatchGroupIdBatchesBatchGroupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetBatchGroupsBatchGroupIdBatchesBatchGroupId"], filter);
      },
      searchGetCampusesCampusIdDonationsCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetCampusesCampusIdDonationsCampusId"], filter);
      },
      searchGetInKindDonationsWherefundid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetInKindDonationsWherefundid"], filter);
      },
      searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPaymentSourcesPaymentSourceIdDonationsPaymentSourceId"], filter);
      },
      searchGetPeoplePersonIdBatchesPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdBatchesPersonId"], filter);
      },
      searchGetPeoplePersonIdBatchGroupsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdBatchGroupsPersonId"], filter);
      },
      searchGetPeoplePersonIdDonationsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdDonationsPersonId"], filter);
      },
      searchGetPeoplePersonIdInKindDonationsPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdInKindDonationsPersonId"], filter);
      },
      searchGetPeoplePersonIdInKindDonationsWherefundid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdInKindDonationsWherefundid"], filter);
      },
      searchGetPeoplePersonIdPledgesPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPledgesPersonId"], filter);
      },
      searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPersonId"], filter);
      },
      searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeCampaignId"], filter);
      },
      searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchPlanningCenterLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId"], filter);
      },
    },
  };

  async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
    return pollPlanningCenter.call(this, OPERATIONS);
  }
}
