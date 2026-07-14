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
    "id": "postBatchGroups",
    "resource": "Batch Group",
    "operation": "Create Batch Group",
    "description": "POST /batch_groups",
    "method": "POST",
    "path": "/giving/v2/batch_groups",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postBatchGroupsBatchGroupIdBatches",
    "resource": "Batch Group",
    "operation": "Create Batch",
    "description": "POST /batch_groups/{batch_group_id}/batches",
    "method": "POST",
    "path": "/giving/v2/batch_groups/{batch_group_id}/batches",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postBatchGroupsBatchGroupIdCommit",
    "resource": "Batch Group",
    "operation": "Create Commit",
    "description": "POST /batch_groups/{batch_group_id}/commit",
    "method": "POST",
    "path": "/giving/v2/batch_groups/{batch_group_id}/commit",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "deleteBatchGroupsBatchGroupId",
    "resource": "Batch Group",
    "operation": "Delete Batch Group",
    "description": "DELETE /batch_groups/{batch_group_id}",
    "method": "DELETE",
    "path": "/giving/v2/batch_groups/{batch_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "deleteBatchGroupsBatchGroupIdBatchesBatchId",
    "resource": "Batch Group",
    "operation": "Delete Batch",
    "description": "DELETE /batch_groups/{batch_group_id}/batches/{batch_id}",
    "method": "DELETE",
    "path": "/giving/v2/batch_groups/{batch_group_id}/batches/{batch_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "getBatchGroupsBatchGroupId",
    "resource": "Batch Group",
    "operation": "Get Batch Group",
    "description": "GET /batch_groups/{batch_group_id}",
    "method": "GET",
    "path": "/giving/v2/batch_groups/{batch_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "getBatchGroupsBatchGroupIdBatchesBatchId",
    "resource": "Batch Group",
    "operation": "Get Batch",
    "description": "GET /batch_groups/{batch_group_id}/batches/{batch_id}",
    "method": "GET",
    "path": "/giving/v2/batch_groups/{batch_group_id}/batches/{batch_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "getBatchGroupsBatchGroupIdOwnerOwnerId",
    "resource": "Batch Group",
    "operation": "Get Owner",
    "description": "GET /batch_groups/{batch_group_id}/owner/{owner_id}",
    "method": "GET",
    "path": "/giving/v2/batch_groups/{batch_group_id}/owner/{owner_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "getBatchGroups",
    "resource": "Batch Group",
    "operation": "List Batch Groups",
    "description": "GET /batch_groups",
    "method": "GET",
    "path": "/giving/v2/batch_groups",
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
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
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
    "id": "getBatchGroupsBatchGroupIdBatches",
    "resource": "Batch Group",
    "operation": "List Batches",
    "description": "GET /batch_groups/{batch_group_id}/batches",
    "method": "GET",
    "path": "/giving/v2/batch_groups/{batch_group_id}/batches",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
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
    "id": "getBatchGroupsBatchGroupIdOwner",
    "resource": "Batch Group",
    "operation": "List Owner",
    "description": "GET /batch_groups/{batch_group_id}/owner",
    "method": "GET",
    "path": "/giving/v2/batch_groups/{batch_group_id}/owner",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "patchBatchGroupsBatchGroupId",
    "resource": "Batch Group",
    "operation": "Update Batch Group",
    "description": "PATCH /batch_groups/{batch_group_id}",
    "method": "PATCH",
    "path": "/giving/v2/batch_groups/{batch_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchBatchGroupsBatchGroupIdBatchesBatchId",
    "resource": "Batch Group",
    "operation": "Update Batch",
    "description": "PATCH /batch_groups/{batch_group_id}/batches/{batch_id}",
    "method": "PATCH",
    "path": "/giving/v2/batch_groups/{batch_group_id}/batches/{batch_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchBatchGroupsBatchGroupIdOwnerOwnerId",
    "resource": "Batch Group",
    "operation": "Update Owner",
    "description": "PATCH /batch_groups/{batch_group_id}/owner/{owner_id}",
    "method": "PATCH",
    "path": "/giving/v2/batch_groups/{batch_group_id}/owner/{owner_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "attributeFields": [
      {
        "name": "donorNumber",
        "sourceName": "donor_number",
        "displayName": "Donor Number",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postBatches",
    "resource": "Batch",
    "operation": "Create Batch",
    "description": "POST /batches",
    "method": "POST",
    "path": "/giving/v2/batches",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postBatchesBatchIdCommit",
    "resource": "Batch",
    "operation": "Create Commit",
    "description": "POST /batches/{batch_id}/commit",
    "method": "POST",
    "path": "/giving/v2/batches/{batch_id}/commit",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "postBatchesBatchIdDonations",
    "resource": "Batch",
    "operation": "Create Donation",
    "description": "POST /batches/{batch_id}/donations",
    "method": "POST",
    "path": "/giving/v2/batches/{batch_id}/donations",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
        "name": "paymentMethodSub",
        "sourceName": "payment_method_sub",
        "displayName": "Payment Method Sub",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentLast4",
        "sourceName": "payment_last4",
        "displayName": "Payment Last4",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentBrand",
        "sourceName": "payment_brand",
        "displayName": "Payment Brand",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentCheckNumber",
        "sourceName": "payment_check_number",
        "displayName": "Payment Check Number",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentCheckDatedAt",
        "sourceName": "payment_check_dated_at",
        "displayName": "Payment Check Dated At",
        "required": false,
        "type": "string"
      },
      {
        "name": "feeCents",
        "sourceName": "fee_cents",
        "displayName": "Fee Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentMethod",
        "sourceName": "payment_method",
        "displayName": "Payment Method",
        "required": false,
        "type": "string"
      },
      {
        "name": "receivedAt",
        "sourceName": "received_at",
        "displayName": "Received At",
        "required": false,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "labelsIds",
        "sourceName": "labels_ids",
        "displayName": "Labels Ids",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "paymentSourceIds",
        "displayName": "Payment Source ID",
        "relationshipName": "payment_source",
        "relationshipType": "PaymentSource",
        "multiple": false
      }
    ]
  },
  {
    "id": "deleteBatchesBatchIdBatchGroupBatchGroupId",
    "resource": "Batch",
    "operation": "Delete Batch Group",
    "description": "DELETE /batches/{batch_id}/batch_group/{batch_group_id}",
    "method": "DELETE",
    "path": "/giving/v2/batches/{batch_id}/batch_group/{batch_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "deleteBatchesBatchId",
    "resource": "Batch",
    "operation": "Delete Batch",
    "description": "DELETE /batches/{batch_id}",
    "method": "DELETE",
    "path": "/giving/v2/batches/{batch_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "deleteBatchesBatchIdDonationsDonationId",
    "resource": "Batch",
    "operation": "Delete Donation",
    "description": "DELETE /batches/{batch_id}/donations/{donation_id}",
    "method": "DELETE",
    "path": "/giving/v2/batches/{batch_id}/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getBatchesBatchIdBatchGroupBatchGroupId",
    "resource": "Batch",
    "operation": "Get Batch Group",
    "description": "GET /batches/{batch_id}/batch_group/{batch_group_id}",
    "method": "GET",
    "path": "/giving/v2/batches/{batch_id}/batch_group/{batch_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "getBatchesBatchId",
    "resource": "Batch",
    "operation": "Get Batch",
    "description": "GET /batches/{batch_id}",
    "method": "GET",
    "path": "/giving/v2/batches/{batch_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "getBatchesBatchIdDonationsDonationId",
    "resource": "Batch",
    "operation": "Get Donation",
    "description": "GET /batches/{batch_id}/donations/{donation_id}",
    "method": "GET",
    "path": "/giving/v2/batches/{batch_id}/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getBatchesBatchIdOwnerOwnerId",
    "resource": "Batch",
    "operation": "Get Owner",
    "description": "GET /batches/{batch_id}/owner/{owner_id}",
    "method": "GET",
    "path": "/giving/v2/batches/{batch_id}/owner/{owner_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "getBatchesBatchIdBatchGroup",
    "resource": "Batch",
    "operation": "List Batch Group",
    "description": "GET /batches/{batch_id}/batch_group",
    "method": "GET",
    "path": "/giving/v2/batches/{batch_id}/batch_group",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
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
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
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
    "id": "getBatches",
    "resource": "Batch",
    "operation": "List Batches",
    "description": "GET /batches",
    "method": "GET",
    "path": "/giving/v2/batches",
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
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
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
    "id": "getBatchesBatchIdDonations",
    "resource": "Batch",
    "operation": "List Donations",
    "description": "GET /batches/{batch_id}/donations",
    "method": "GET",
    "path": "/giving/v2/batches/{batch_id}/donations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherereceivedAt",
        "sourceName": "where[received_at]",
        "displayName": "Where[received At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgt",
        "sourceName": "where[received_at][gt]",
        "displayName": "Where[received At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgte",
        "sourceName": "where[received_at][gte]",
        "displayName": "Where[received At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlt",
        "sourceName": "where[received_at][lt]",
        "displayName": "Where[received At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlte",
        "sourceName": "where[received_at][lte]",
        "displayName": "Where[received At][lte]",
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
        "name": "wherecompletedAt",
        "sourceName": "where[completed_at]",
        "displayName": "Where[completed At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgt",
        "sourceName": "where[completed_at][gt]",
        "displayName": "Where[completed At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgte",
        "sourceName": "where[completed_at][gte]",
        "displayName": "Where[completed At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlt",
        "sourceName": "where[completed_at][lt]",
        "displayName": "Where[completed At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlte",
        "sourceName": "where[completed_at][lte]",
        "displayName": "Where[completed At][lte]",
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
        "name": "wherereceivedAtFilter",
        "displayName": "Received At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
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
        "name": "wherecompletedAtFilter",
        "displayName": "Completed At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
    "id": "getBatchesBatchIdOwner",
    "resource": "Batch",
    "operation": "List Owner",
    "description": "GET /batches/{batch_id}/owner",
    "method": "GET",
    "path": "/giving/v2/batches/{batch_id}/owner",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "patchBatchesBatchIdBatchGroupBatchGroupId",
    "resource": "Batch",
    "operation": "Update Batch Group",
    "description": "PATCH /batches/{batch_id}/batch_group/{batch_group_id}",
    "method": "PATCH",
    "path": "/giving/v2/batches/{batch_id}/batch_group/{batch_group_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchBatchesBatchId",
    "resource": "Batch",
    "operation": "Update Batch",
    "description": "PATCH /batches/{batch_id}",
    "method": "PATCH",
    "path": "/giving/v2/batches/{batch_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchBatchesBatchIdDonationsDonationId",
    "resource": "Batch",
    "operation": "Update Donation",
    "description": "PATCH /batches/{batch_id}/donations/{donation_id}",
    "method": "PATCH",
    "path": "/giving/v2/batches/{batch_id}/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
        "name": "paymentMethodSub",
        "sourceName": "payment_method_sub",
        "displayName": "Payment Method Sub",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentLast4",
        "sourceName": "payment_last4",
        "displayName": "Payment Last4",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentBrand",
        "sourceName": "payment_brand",
        "displayName": "Payment Brand",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentCheckNumber",
        "sourceName": "payment_check_number",
        "displayName": "Payment Check Number",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentCheckDatedAt",
        "sourceName": "payment_check_dated_at",
        "displayName": "Payment Check Dated At",
        "required": false,
        "type": "string"
      },
      {
        "name": "feeCents",
        "sourceName": "fee_cents",
        "displayName": "Fee Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentMethod",
        "sourceName": "payment_method",
        "displayName": "Payment Method",
        "required": false,
        "type": "string"
      },
      {
        "name": "receivedAt",
        "sourceName": "received_at",
        "displayName": "Received At",
        "required": false,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "labelsIds",
        "sourceName": "labels_ids",
        "displayName": "Labels Ids",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "paymentSourceIds",
        "displayName": "Payment Source ID",
        "relationshipName": "payment_source",
        "relationshipType": "PaymentSource",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchBatchesBatchIdOwnerOwnerId",
    "resource": "Batch",
    "operation": "Update Owner",
    "description": "PATCH /batches/{batch_id}/owner/{owner_id}",
    "method": "PATCH",
    "path": "/giving/v2/batches/{batch_id}/owner/{owner_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "attributeFields": [
      {
        "name": "donorNumber",
        "sourceName": "donor_number",
        "displayName": "Donor Number",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteCampusesCampusIdDonationsDonationId",
    "resource": "Campus",
    "operation": "Delete Donation",
    "description": "DELETE /campuses/{campus_id}/donations/{donation_id}",
    "method": "DELETE",
    "path": "/giving/v2/campuses/{campus_id}/donations/{donation_id}",
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
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getCampusesCampusId",
    "resource": "Campus",
    "operation": "Get Campus",
    "description": "GET /campuses/{campus_id}",
    "method": "GET",
    "path": "/giving/v2/campuses/{campus_id}",
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
    "id": "getCampusesCampusIdDonationsDonationId",
    "resource": "Campus",
    "operation": "Get Donation",
    "description": "GET /campuses/{campus_id}/donations/{donation_id}",
    "method": "GET",
    "path": "/giving/v2/campuses/{campus_id}/donations/{donation_id}",
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
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "path": "/giving/v2/campuses",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusIdDonations",
    "resource": "Campus",
    "operation": "List Donations",
    "description": "GET /campuses/{campus_id}/donations",
    "method": "GET",
    "path": "/giving/v2/campuses/{campus_id}/donations",
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
        "name": "wherereceivedAt",
        "sourceName": "where[received_at]",
        "displayName": "Where[received At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgt",
        "sourceName": "where[received_at][gt]",
        "displayName": "Where[received At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgte",
        "sourceName": "where[received_at][gte]",
        "displayName": "Where[received At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlt",
        "sourceName": "where[received_at][lt]",
        "displayName": "Where[received At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlte",
        "sourceName": "where[received_at][lte]",
        "displayName": "Where[received At][lte]",
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
        "name": "wherecompletedAt",
        "sourceName": "where[completed_at]",
        "displayName": "Where[completed At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgt",
        "sourceName": "where[completed_at][gt]",
        "displayName": "Where[completed At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgte",
        "sourceName": "where[completed_at][gte]",
        "displayName": "Where[completed At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlt",
        "sourceName": "where[completed_at][lt]",
        "displayName": "Where[completed At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlte",
        "sourceName": "where[completed_at][lte]",
        "displayName": "Where[completed At][lte]",
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
        "name": "wherereceivedAtFilter",
        "displayName": "Received At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
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
        "name": "wherecompletedAtFilter",
        "displayName": "Completed At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
    "id": "patchCampusesCampusIdDonationsDonationId",
    "resource": "Campus",
    "operation": "Update Donation",
    "description": "PATCH /campuses/{campus_id}/donations/{donation_id}",
    "method": "PATCH",
    "path": "/giving/v2/campuses/{campus_id}/donations/{donation_id}",
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
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
        "name": "paymentMethodSub",
        "sourceName": "payment_method_sub",
        "displayName": "Payment Method Sub",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentLast4",
        "sourceName": "payment_last4",
        "displayName": "Payment Last4",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentBrand",
        "sourceName": "payment_brand",
        "displayName": "Payment Brand",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentCheckNumber",
        "sourceName": "payment_check_number",
        "displayName": "Payment Check Number",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentCheckDatedAt",
        "sourceName": "payment_check_dated_at",
        "displayName": "Payment Check Dated At",
        "required": false,
        "type": "string"
      },
      {
        "name": "feeCents",
        "sourceName": "fee_cents",
        "displayName": "Fee Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentMethod",
        "sourceName": "payment_method",
        "displayName": "Payment Method",
        "required": false,
        "type": "string"
      },
      {
        "name": "receivedAt",
        "sourceName": "received_at",
        "displayName": "Received At",
        "required": false,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "labelsIds",
        "sourceName": "labels_ids",
        "displayName": "Labels Ids",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "paymentSourceIds",
        "displayName": "Payment Source ID",
        "relationshipName": "payment_source",
        "relationshipType": "PaymentSource",
        "multiple": false
      }
    ]
  },
  {
    "id": "postDonationsDonationIdIssueRefund",
    "resource": "Donation",
    "operation": "Create Issue Refund",
    "description": "POST /donations/{donation_id}/issue_refund",
    "method": "POST",
    "path": "/giving/v2/donations/{donation_id}/issue_refund",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "deleteDonationsDonationId",
    "resource": "Donation",
    "operation": "Delete Donation",
    "description": "DELETE /donations/{donation_id}",
    "method": "DELETE",
    "path": "/giving/v2/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "deleteDonationsDonationIdDesignationsDesignationIdFundFundId",
    "resource": "Donation",
    "operation": "Delete Fund",
    "description": "DELETE /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
    "method": "DELETE",
    "path": "/giving/v2/donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationId",
        "sourceName": "designation_id",
        "displayName": "Designation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "deleteDonationsDonationIdLabelsLabelId",
    "resource": "Donation",
    "operation": "Delete Label",
    "description": "DELETE /donations/{donation_id}/labels/{label_id}",
    "method": "DELETE",
    "path": "/giving/v2/donations/{donation_id}/labels/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label Id",
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
    "id": "getDonationsDonationIdCampusCampusId",
    "resource": "Donation",
    "operation": "Get Campus",
    "description": "GET /donations/{donation_id}/campus/{campus_id}",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/campus/{campus_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getDonationsDonationIdRefundDesignationRefundsDesignationRefundId",
    "resource": "Donation",
    "operation": "Get Designation Refund",
    "description": "GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/refund/designation_refunds/{designation_refund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationRefundId",
        "sourceName": "designation_refund_id",
        "displayName": "Designation Refund Id",
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
    "id": "getDonationsDonationIdDesignationsDesignationId",
    "resource": "Donation",
    "operation": "Get Designation",
    "description": "GET /donations/{donation_id}/designations/{designation_id}",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/designations/{designation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationId",
        "sourceName": "designation_id",
        "displayName": "Designation Id",
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
    "id": "getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId",
    "resource": "Donation",
    "operation": "Get Designation",
    "description": "GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation/{designation_id}",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation/{designation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationRefundId",
        "sourceName": "designation_refund_id",
        "displayName": "Designation Refund Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationId",
        "sourceName": "designation_id",
        "displayName": "Designation Id",
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
    "id": "getDonationsDonationId",
    "resource": "Donation",
    "operation": "Get Donation",
    "description": "GET /donations/{donation_id}",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getDonationsDonationIdDesignationsDesignationIdFundFundId",
    "resource": "Donation",
    "operation": "Get Fund",
    "description": "GET /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationId",
        "sourceName": "designation_id",
        "displayName": "Designation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "getDonationsDonationIdLabelsLabelId",
    "resource": "Donation",
    "operation": "Get Label",
    "description": "GET /donations/{donation_id}/labels/{label_id}",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/labels/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label Id",
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
    "id": "getDonationsDonationIdCampus",
    "resource": "Donation",
    "operation": "List Campus",
    "description": "GET /donations/{donation_id}/campus",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/campus",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getDonationsDonationIdRefundDesignationRefunds",
    "resource": "Donation",
    "operation": "List Designation Refunds",
    "description": "GET /donations/{donation_id}/refund/designation_refunds",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/refund/designation_refunds",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation",
    "resource": "Donation",
    "operation": "List Designation",
    "description": "GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationRefundId",
        "sourceName": "designation_refund_id",
        "displayName": "Designation Refund Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherefundid",
        "sourceName": "where[fund][id]",
        "displayName": "Where[fund][id]",
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
        "name": "wherefundid",
        "displayName": "Fund Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[fund][id]"
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
    "id": "getDonationsDonationIdDesignations",
    "resource": "Donation",
    "operation": "List Designations",
    "description": "GET /donations/{donation_id}/designations",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/designations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherefundid",
        "sourceName": "where[fund][id]",
        "displayName": "Where[fund][id]",
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
        "name": "wherefundid",
        "displayName": "Fund Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[fund][id]"
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
    "id": "getDonations",
    "resource": "Donation",
    "operation": "List Donations",
    "description": "GET /donations",
    "method": "GET",
    "path": "/giving/v2/donations",
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
        "name": "wherereceivedAt",
        "sourceName": "where[received_at]",
        "displayName": "Where[received At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgt",
        "sourceName": "where[received_at][gt]",
        "displayName": "Where[received At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgte",
        "sourceName": "where[received_at][gte]",
        "displayName": "Where[received At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlt",
        "sourceName": "where[received_at][lt]",
        "displayName": "Where[received At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlte",
        "sourceName": "where[received_at][lte]",
        "displayName": "Where[received At][lte]",
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
        "name": "wherecompletedAt",
        "sourceName": "where[completed_at]",
        "displayName": "Where[completed At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgt",
        "sourceName": "where[completed_at][gt]",
        "displayName": "Where[completed At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgte",
        "sourceName": "where[completed_at][gte]",
        "displayName": "Where[completed At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlt",
        "sourceName": "where[completed_at][lt]",
        "displayName": "Where[completed At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlte",
        "sourceName": "where[completed_at][lte]",
        "displayName": "Where[completed At][lte]",
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
        "name": "wherereceivedAtFilter",
        "displayName": "Received At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
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
        "name": "wherecompletedAtFilter",
        "displayName": "Completed At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
    "id": "getDonationsDonationIdDesignationsDesignationIdFund",
    "resource": "Donation",
    "operation": "List Fund",
    "description": "GET /donations/{donation_id}/designations/{designation_id}/fund",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/designations/{designation_id}/fund",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationId",
        "sourceName": "designation_id",
        "displayName": "Designation Id",
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
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
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
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdLabels",
    "resource": "Donation",
    "operation": "List Labels",
    "description": "GET /donations/{donation_id}/labels",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getDonationsDonationIdNote",
    "resource": "Donation",
    "operation": "List Note",
    "description": "GET /donations/{donation_id}/note",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/note",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getDonationsDonationIdRefund",
    "resource": "Donation",
    "operation": "List Refund",
    "description": "GET /donations/{donation_id}/refund",
    "method": "GET",
    "path": "/giving/v2/donations/{donation_id}/refund",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "patchDonationsDonationId",
    "resource": "Donation",
    "operation": "Update Donation",
    "description": "PATCH /donations/{donation_id}",
    "method": "PATCH",
    "path": "/giving/v2/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
        "name": "paymentMethodSub",
        "sourceName": "payment_method_sub",
        "displayName": "Payment Method Sub",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentLast4",
        "sourceName": "payment_last4",
        "displayName": "Payment Last4",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentBrand",
        "sourceName": "payment_brand",
        "displayName": "Payment Brand",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentCheckNumber",
        "sourceName": "payment_check_number",
        "displayName": "Payment Check Number",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentCheckDatedAt",
        "sourceName": "payment_check_dated_at",
        "displayName": "Payment Check Dated At",
        "required": false,
        "type": "string"
      },
      {
        "name": "feeCents",
        "sourceName": "fee_cents",
        "displayName": "Fee Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentMethod",
        "sourceName": "payment_method",
        "displayName": "Payment Method",
        "required": false,
        "type": "string"
      },
      {
        "name": "receivedAt",
        "sourceName": "received_at",
        "displayName": "Received At",
        "required": false,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "labelsIds",
        "sourceName": "labels_ids",
        "displayName": "Labels Ids",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "paymentSourceIds",
        "displayName": "Payment Source ID",
        "relationshipName": "payment_source",
        "relationshipType": "PaymentSource",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchDonationsDonationIdDesignationsDesignationIdFundFundId",
    "resource": "Donation",
    "operation": "Update Fund",
    "description": "PATCH /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
    "method": "PATCH",
    "path": "/giving/v2/donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationId",
        "sourceName": "designation_id",
        "displayName": "Designation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "ledgerCode",
        "sourceName": "ledger_code",
        "displayName": "Ledger Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "visibility",
        "sourceName": "visibility",
        "displayName": "Visibility",
        "required": false,
        "type": "string"
      },
      {
        "name": "colorIdentifier",
        "sourceName": "color_identifier",
        "displayName": "Color Identifier",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchDonationsDonationIdLabelsLabelId",
    "resource": "Donation",
    "operation": "Update Label",
    "description": "PATCH /donations/{donation_id}/labels/{label_id}",
    "method": "PATCH",
    "path": "/giving/v2/donations/{donation_id}/labels/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "slug",
        "sourceName": "slug",
        "displayName": "Slug",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postFunds",
    "resource": "Fund",
    "operation": "Create Fund",
    "description": "POST /funds",
    "method": "POST",
    "path": "/giving/v2/funds",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "ledgerCode",
        "sourceName": "ledger_code",
        "displayName": "Ledger Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "visibility",
        "sourceName": "visibility",
        "displayName": "Visibility",
        "required": false,
        "type": "string"
      },
      {
        "name": "colorIdentifier",
        "sourceName": "color_identifier",
        "displayName": "Color Identifier",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteFundsFundId",
    "resource": "Fund",
    "operation": "Delete Fund",
    "description": "DELETE /funds/{fund_id}",
    "method": "DELETE",
    "path": "/giving/v2/funds/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "getFundsFundId",
    "resource": "Fund",
    "operation": "Get Fund",
    "description": "GET /funds/{fund_id}",
    "method": "GET",
    "path": "/giving/v2/funds/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "getFunds",
    "resource": "Fund",
    "operation": "List Funds",
    "description": "GET /funds",
    "method": "GET",
    "path": "/giving/v2/funds",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
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
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchFundsFundId",
    "resource": "Fund",
    "operation": "Update Fund",
    "description": "PATCH /funds/{fund_id}",
    "method": "PATCH",
    "path": "/giving/v2/funds/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "ledgerCode",
        "sourceName": "ledger_code",
        "displayName": "Ledger Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "visibility",
        "sourceName": "visibility",
        "displayName": "Visibility",
        "required": false,
        "type": "string"
      },
      {
        "name": "colorIdentifier",
        "sourceName": "color_identifier",
        "displayName": "Color Identifier",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postInKindDonations",
    "resource": "In Kind Donation",
    "operation": "Create In Kind Donation",
    "description": "POST /in_kind_donations",
    "method": "POST",
    "path": "/giving/v2/in_kind_donations",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "exchangeDetails",
        "sourceName": "exchange_details",
        "displayName": "Exchange Details",
        "required": false,
        "type": "string"
      },
      {
        "name": "fairMarketValueCents",
        "sourceName": "fair_market_value_cents",
        "displayName": "Fair Market Value Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "receivedOn",
        "sourceName": "received_on",
        "displayName": "Received On",
        "required": false,
        "type": "string"
      },
      {
        "name": "valuationDetails",
        "sourceName": "valuation_details",
        "displayName": "Valuation Details",
        "required": false,
        "type": "string"
      },
      {
        "name": "internalNotes",
        "sourceName": "internal_notes",
        "displayName": "Internal Notes",
        "required": false,
        "type": "string"
      },
      {
        "name": "fairMarketValueCurrency",
        "sourceName": "fair_market_value_currency",
        "displayName": "Fair Market Value Currency",
        "required": false,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
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
        "name": "fundIds",
        "displayName": "Fund ID",
        "relationshipName": "fund",
        "relationshipType": "Fund",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      }
    ]
  },
  {
    "id": "deleteInKindDonationsInKindDonationIdFundFundId",
    "resource": "In Kind Donation",
    "operation": "Delete Fund",
    "description": "DELETE /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
    "method": "DELETE",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "deleteInKindDonationsInKindDonationId",
    "resource": "In Kind Donation",
    "operation": "Delete In Kind Donation",
    "description": "DELETE /in_kind_donations/{in_kind_donation_id}",
    "method": "DELETE",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "getInKindDonationsInKindDonationIdCampusCampusId",
    "resource": "In Kind Donation",
    "operation": "Get Campus",
    "description": "GET /in_kind_donations/{in_kind_donation_id}/campus/{campus_id}",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/campus/{campus_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "getInKindDonationsInKindDonationIdFundFundId",
    "resource": "In Kind Donation",
    "operation": "Get Fund",
    "description": "GET /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "getInKindDonationsInKindDonationId",
    "resource": "In Kind Donation",
    "operation": "Get In Kind Donation",
    "description": "GET /in_kind_donations/{in_kind_donation_id}",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "getInKindDonationsInKindDonationIdPersonPersonId",
    "resource": "In Kind Donation",
    "operation": "Get Person",
    "description": "GET /in_kind_donations/{in_kind_donation_id}/person/{person_id}",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "getInKindDonationsInKindDonationIdCampus",
    "resource": "In Kind Donation",
    "operation": "List Campus",
    "description": "GET /in_kind_donations/{in_kind_donation_id}/campus",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/campus",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "getInKindDonationsInKindDonationIdFund",
    "resource": "In Kind Donation",
    "operation": "List Fund",
    "description": "GET /in_kind_donations/{in_kind_donation_id}/fund",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/fund",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
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
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonations",
    "resource": "In Kind Donation",
    "operation": "List In Kind Donations",
    "description": "GET /in_kind_donations",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations",
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
        "name": "wherereceivedOn",
        "sourceName": "where[received_on]",
        "displayName": "Where[received On]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOngt",
        "sourceName": "where[received_on][gt]",
        "displayName": "Where[received On][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOngte",
        "sourceName": "where[received_on][gte]",
        "displayName": "Where[received On][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOnlt",
        "sourceName": "where[received_on][lt]",
        "displayName": "Where[received On][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOnlte",
        "sourceName": "where[received_on][lte]",
        "displayName": "Where[received On][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherefundid",
        "sourceName": "where[fund][id]",
        "displayName": "Where[fund][id]",
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
        "name": "wherereceivedOnFilter",
        "displayName": "Received On",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[received_on]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[received_on][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[received_on][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[received_on][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[received_on][lte]"
          }
        ]
      },
      {
        "name": "wherefundid",
        "displayName": "Fund Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[fund][id]"
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
    "id": "getInKindDonationsInKindDonationIdPerson",
    "resource": "In Kind Donation",
    "operation": "List Person",
    "description": "GET /in_kind_donations/{in_kind_donation_id}/person",
    "method": "GET",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "patchInKindDonationsInKindDonationIdFundFundId",
    "resource": "In Kind Donation",
    "operation": "Update Fund",
    "description": "PATCH /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
    "method": "PATCH",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "ledgerCode",
        "sourceName": "ledger_code",
        "displayName": "Ledger Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "visibility",
        "sourceName": "visibility",
        "displayName": "Visibility",
        "required": false,
        "type": "string"
      },
      {
        "name": "colorIdentifier",
        "sourceName": "color_identifier",
        "displayName": "Color Identifier",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchInKindDonationsInKindDonationId",
    "resource": "In Kind Donation",
    "operation": "Update In Kind Donation",
    "description": "PATCH /in_kind_donations/{in_kind_donation_id}",
    "method": "PATCH",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "exchangeDetails",
        "sourceName": "exchange_details",
        "displayName": "Exchange Details",
        "required": false,
        "type": "string"
      },
      {
        "name": "fairMarketValueCents",
        "sourceName": "fair_market_value_cents",
        "displayName": "Fair Market Value Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "receivedOn",
        "sourceName": "received_on",
        "displayName": "Received On",
        "required": false,
        "type": "string"
      },
      {
        "name": "valuationDetails",
        "sourceName": "valuation_details",
        "displayName": "Valuation Details",
        "required": false,
        "type": "string"
      },
      {
        "name": "internalNotes",
        "sourceName": "internal_notes",
        "displayName": "Internal Notes",
        "required": false,
        "type": "string"
      },
      {
        "name": "fairMarketValueCurrency",
        "sourceName": "fair_market_value_currency",
        "displayName": "Fair Market Value Currency",
        "required": false,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
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
        "name": "fundIds",
        "displayName": "Fund ID",
        "relationshipName": "fund",
        "relationshipType": "Fund",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchInKindDonationsInKindDonationIdPersonPersonId",
    "resource": "In Kind Donation",
    "operation": "Update Person",
    "description": "PATCH /in_kind_donations/{in_kind_donation_id}/person/{person_id}",
    "method": "PATCH",
    "path": "/giving/v2/in_kind_donations/{in_kind_donation_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "attributeFields": [
      {
        "name": "donorNumber",
        "sourceName": "donor_number",
        "displayName": "Donor Number",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postLabels",
    "resource": "Label",
    "operation": "Create Label",
    "description": "POST /labels",
    "method": "POST",
    "path": "/giving/v2/labels",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "slug",
        "sourceName": "slug",
        "displayName": "Slug",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteLabelsLabelId",
    "resource": "Label",
    "operation": "Delete Label",
    "description": "DELETE /labels/{label_id}",
    "method": "DELETE",
    "path": "/giving/v2/labels/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label Id",
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
    "path": "/giving/v2/labels/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label Id",
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
    "path": "/giving/v2/labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchLabelsLabelId",
    "resource": "Label",
    "operation": "Update Label",
    "description": "PATCH /labels/{label_id}",
    "method": "PATCH",
    "path": "/giving/v2/labels/{label_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "labelId",
        "sourceName": "label_id",
        "displayName": "Label Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "slug",
        "sourceName": "slug",
        "displayName": "Slug",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postPaymentSources",
    "resource": "Payment Source",
    "operation": "Create Payment Source",
    "description": "POST /payment_sources",
    "method": "POST",
    "path": "/giving/v2/payment_sources",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "status",
        "sourceName": "status",
        "displayName": "Status",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceType",
        "sourceName": "payment_source_type",
        "displayName": "Payment Source Type",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deletePaymentSourcesPaymentSourceIdDonationsDonationId",
    "resource": "Payment Source",
    "operation": "Delete Donation",
    "description": "DELETE /payment_sources/{payment_source_id}/donations/{donation_id}",
    "method": "DELETE",
    "path": "/giving/v2/payment_sources/{payment_source_id}/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "deletePaymentSourcesPaymentSourceId",
    "resource": "Payment Source",
    "operation": "Delete Payment Source",
    "description": "DELETE /payment_sources/{payment_source_id}",
    "method": "DELETE",
    "path": "/giving/v2/payment_sources/{payment_source_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
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
    "id": "getPaymentSourcesPaymentSourceIdDonationsDonationId",
    "resource": "Payment Source",
    "operation": "Get Donation",
    "description": "GET /payment_sources/{payment_source_id}/donations/{donation_id}",
    "method": "GET",
    "path": "/giving/v2/payment_sources/{payment_source_id}/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getPaymentSourcesPaymentSourceId",
    "resource": "Payment Source",
    "operation": "Get Payment Source",
    "description": "GET /payment_sources/{payment_source_id}",
    "method": "GET",
    "path": "/giving/v2/payment_sources/{payment_source_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
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
    "id": "getPaymentSourcesPaymentSourceIdDonations",
    "resource": "Payment Source",
    "operation": "List Donations",
    "description": "GET /payment_sources/{payment_source_id}/donations",
    "method": "GET",
    "path": "/giving/v2/payment_sources/{payment_source_id}/donations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "wherereceivedAt",
        "sourceName": "where[received_at]",
        "displayName": "Where[received At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgt",
        "sourceName": "where[received_at][gt]",
        "displayName": "Where[received At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgte",
        "sourceName": "where[received_at][gte]",
        "displayName": "Where[received At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlt",
        "sourceName": "where[received_at][lt]",
        "displayName": "Where[received At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlte",
        "sourceName": "where[received_at][lte]",
        "displayName": "Where[received At][lte]",
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
        "name": "wherecompletedAt",
        "sourceName": "where[completed_at]",
        "displayName": "Where[completed At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgt",
        "sourceName": "where[completed_at][gt]",
        "displayName": "Where[completed At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgte",
        "sourceName": "where[completed_at][gte]",
        "displayName": "Where[completed At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlt",
        "sourceName": "where[completed_at][lt]",
        "displayName": "Where[completed At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlte",
        "sourceName": "where[completed_at][lte]",
        "displayName": "Where[completed At][lte]",
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
        "name": "wherereceivedAtFilter",
        "displayName": "Received At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
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
        "name": "wherecompletedAtFilter",
        "displayName": "Completed At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
    "id": "getPaymentSources",
    "resource": "Payment Source",
    "operation": "List Payment Sources",
    "description": "GET /payment_sources",
    "method": "GET",
    "path": "/giving/v2/payment_sources",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchPaymentSourcesPaymentSourceIdDonationsDonationId",
    "resource": "Payment Source",
    "operation": "Update Donation",
    "description": "PATCH /payment_sources/{payment_source_id}/donations/{donation_id}",
    "method": "PATCH",
    "path": "/giving/v2/payment_sources/{payment_source_id}/donations/{donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
        "name": "paymentMethodSub",
        "sourceName": "payment_method_sub",
        "displayName": "Payment Method Sub",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentLast4",
        "sourceName": "payment_last4",
        "displayName": "Payment Last4",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentBrand",
        "sourceName": "payment_brand",
        "displayName": "Payment Brand",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentCheckNumber",
        "sourceName": "payment_check_number",
        "displayName": "Payment Check Number",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentCheckDatedAt",
        "sourceName": "payment_check_dated_at",
        "displayName": "Payment Check Dated At",
        "required": false,
        "type": "string"
      },
      {
        "name": "feeCents",
        "sourceName": "fee_cents",
        "displayName": "Fee Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentMethod",
        "sourceName": "payment_method",
        "displayName": "Payment Method",
        "required": false,
        "type": "string"
      },
      {
        "name": "receivedAt",
        "sourceName": "received_at",
        "displayName": "Received At",
        "required": false,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "labelsIds",
        "sourceName": "labels_ids",
        "displayName": "Labels Ids",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "paymentSourceIds",
        "displayName": "Payment Source ID",
        "relationshipName": "payment_source",
        "relationshipType": "PaymentSource",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchPaymentSourcesPaymentSourceId",
    "resource": "Payment Source",
    "operation": "Update Payment Source",
    "description": "PATCH /payment_sources/{payment_source_id}",
    "method": "PATCH",
    "path": "/giving/v2/payment_sources/{payment_source_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "status",
        "sourceName": "status",
        "displayName": "Status",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceType",
        "sourceName": "payment_source_type",
        "displayName": "Payment Source Type",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postPeoplePersonIdPledges",
    "resource": "Person",
    "operation": "Create Pledge",
    "description": "POST /people/{person_id}/pledges",
    "method": "POST",
    "path": "/giving/v2/people/{person_id}/pledges",
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
        "name": "amountCents",
        "sourceName": "amount_cents",
        "displayName": "Amount Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
      },
      {
        "name": "pledgeCampaignIds",
        "displayName": "Pledge Campaign ID",
        "relationshipName": "pledge_campaign",
        "relationshipType": "PledgeCampaign",
        "multiple": false
      }
    ]
  },
  {
    "id": "deletePeoplePersonIdBatchGroupsBatchGroupId",
    "resource": "Person",
    "operation": "Delete Batch Group",
    "description": "DELETE /people/{person_id}/batch_groups/{batch_group_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/batch_groups/{batch_group_id}",
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
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "deletePeoplePersonIdBatchesBatchId",
    "resource": "Person",
    "operation": "Delete Batch",
    "description": "DELETE /people/{person_id}/batches/{batch_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/batches/{batch_id}",
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
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "deletePeoplePersonIdDonationsDonationId",
    "resource": "Person",
    "operation": "Delete Donation",
    "description": "DELETE /people/{person_id}/donations/{donation_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/donations/{donation_id}",
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
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId",
    "resource": "Person",
    "operation": "Delete Fund",
    "description": "DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "deletePeoplePersonIdInKindDonationsInKindDonationId",
    "resource": "Person",
    "operation": "Delete In Kind Donation",
    "description": "DELETE /people/{person_id}/in_kind_donations/{in_kind_donation_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/in_kind_donations/{in_kind_donation_id}",
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
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
    "resource": "Person",
    "operation": "Delete Pledge (via Pledge Campaign)",
    "description": "DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
    "id": "deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId",
    "resource": "Person",
    "operation": "Delete Pledge Campaign",
    "description": "DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
    "id": "deletePeoplePersonIdPledgesPledgeId",
    "resource": "Person",
    "operation": "Delete Pledge",
    "description": "DELETE /people/{person_id}/pledges/{pledge_id}",
    "method": "DELETE",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
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
    "id": "getPeoplePersonIdBatchGroupsBatchGroupId",
    "resource": "Person",
    "operation": "Get Batch Group",
    "description": "GET /people/{person_id}/batch_groups/{batch_group_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/batch_groups/{batch_group_id}",
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
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
    "id": "getPeoplePersonIdBatchesBatchId",
    "resource": "Person",
    "operation": "Get Batch",
    "description": "GET /people/{person_id}/batches/{batch_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/batches/{batch_id}",
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
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
    "id": "getPeoplePersonIdDonationsDonationId",
    "resource": "Person",
    "operation": "Get Donation",
    "description": "GET /people/{person_id}/donations/{donation_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/donations/{donation_id}",
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
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId",
    "resource": "Person",
    "operation": "Get Fund",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "getPeoplePersonIdInKindDonationsInKindDonationId",
    "resource": "Person",
    "operation": "Get In Kind Donation",
    "description": "GET /people/{person_id}/in_kind_donations/{in_kind_donation_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/in_kind_donations/{in_kind_donation_id}",
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
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
    "id": "getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId",
    "resource": "Person",
    "operation": "Get Joint Giver",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "jointGiverId",
        "sourceName": "joint_giver_id",
        "displayName": "Joint Giver Id",
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
    "id": "getPeoplePersonIdPaymentMethodsPaymentMethodId",
    "resource": "Person",
    "operation": "Get Payment Method",
    "description": "GET /people/{person_id}/payment_methods/{payment_method_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/payment_methods/{payment_method_id}",
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
        "name": "paymentMethodId",
        "sourceName": "payment_method_id",
        "displayName": "Payment Method Id",
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
    "id": "getPeoplePersonId",
    "resource": "Person",
    "operation": "Get Person",
    "description": "GET /people/{person_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}",
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
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
    "resource": "Person",
    "operation": "Get Pledge (via Pledge Campaign)",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId",
    "resource": "Person",
    "operation": "Get Pledge Campaign",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
    "id": "getPeoplePersonIdPledgesPledgeId",
    "resource": "Person",
    "operation": "Get Pledge",
    "description": "GET /people/{person_id}/pledges/{pledge_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
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
    "id": "getPeoplePersonIdPrimaryCampusPrimaryCampusId",
    "resource": "Person",
    "operation": "Get Primary Campus",
    "description": "GET /people/{person_id}/primary_campus/{primary_campus_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/primary_campus/{primary_campus_id}",
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
        "name": "primaryCampusId",
        "sourceName": "primary_campus_id",
        "displayName": "Primary Campus Id",
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
    "id": "getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId",
    "resource": "Person",
    "operation": "Get Recurring Donation",
    "description": "GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations/{recurring_donation_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/payment_methods/{payment_method_id}/recurring_donations/{recurring_donation_id}",
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
        "name": "paymentMethodId",
        "sourceName": "payment_method_id",
        "displayName": "Payment Method Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
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
    "id": "getPeoplePersonIdRecurringDonationsRecurringDonationId",
    "resource": "Person",
    "operation": "Get Recurring Donation",
    "description": "GET /people/{person_id}/recurring_donations/{recurring_donation_id}",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/recurring_donations/{recurring_donation_id}",
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
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
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
    "id": "getPeoplePersonIdBatchGroups",
    "resource": "Person",
    "operation": "List Batch Groups",
    "description": "GET /people/{person_id}/batch_groups",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/batch_groups",
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
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
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
    "id": "getPeoplePersonIdBatches",
    "resource": "Person",
    "operation": "List Batches",
    "description": "GET /people/{person_id}/batches",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/batches",
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
        "name": "whereupdatedAtFilter",
        "displayName": "Updated At",
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
    "id": "getPeoplePersonIdDonations",
    "resource": "Person",
    "operation": "List Donations",
    "description": "GET /people/{person_id}/donations",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/donations",
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
        "name": "wherereceivedAt",
        "sourceName": "where[received_at]",
        "displayName": "Where[received At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgt",
        "sourceName": "where[received_at][gt]",
        "displayName": "Where[received At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtgte",
        "sourceName": "where[received_at][gte]",
        "displayName": "Where[received At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlt",
        "sourceName": "where[received_at][lt]",
        "displayName": "Where[received At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedAtlte",
        "sourceName": "where[received_at][lte]",
        "displayName": "Where[received At][lte]",
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
        "name": "wherecompletedAt",
        "sourceName": "where[completed_at]",
        "displayName": "Where[completed At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgt",
        "sourceName": "where[completed_at][gt]",
        "displayName": "Where[completed At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtgte",
        "sourceName": "where[completed_at][gte]",
        "displayName": "Where[completed At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlt",
        "sourceName": "where[completed_at][lt]",
        "displayName": "Where[completed At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecompletedAtlte",
        "sourceName": "where[completed_at][lte]",
        "displayName": "Where[completed At][lte]",
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
        "name": "wherereceivedAtFilter",
        "displayName": "Received At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[received_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[received_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[received_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[received_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[received_at][lte]"
          }
        ]
      },
      {
        "name": "wherecreatedAtFilter",
        "displayName": "Created At",
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
        "name": "wherecompletedAtFilter",
        "displayName": "Completed At",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[completed_at]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[completed_at][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[completed_at][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[completed_at][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[completed_at][lte]"
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
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund",
    "resource": "Person",
    "operation": "List Fund",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
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
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdInKindDonations",
    "resource": "Person",
    "operation": "List In Kind Donations",
    "description": "GET /people/{person_id}/in_kind_donations",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/in_kind_donations",
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
        "name": "wherereceivedOn",
        "sourceName": "where[received_on]",
        "displayName": "Where[received On]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOngt",
        "sourceName": "where[received_on][gt]",
        "displayName": "Where[received On][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOngte",
        "sourceName": "where[received_on][gte]",
        "displayName": "Where[received On][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOnlt",
        "sourceName": "where[received_on][lt]",
        "displayName": "Where[received On][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherereceivedOnlte",
        "sourceName": "where[received_on][lte]",
        "displayName": "Where[received On][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherefundid",
        "sourceName": "where[fund][id]",
        "displayName": "Where[fund][id]",
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
        "name": "wherereceivedOnFilter",
        "displayName": "Received On",
        "type": "string",
        "kind": "operator",
        "operators": [
          {
            "name": "Equals",
            "value": "eq",
            "sourceName": "where[received_on]"
          },
          {
            "name": "Greater Than",
            "value": "gt",
            "sourceName": "where[received_on][gt]"
          },
          {
            "name": "Greater Than Or Equal",
            "value": "gte",
            "sourceName": "where[received_on][gte]"
          },
          {
            "name": "Less Than",
            "value": "lt",
            "sourceName": "where[received_on][lt]"
          },
          {
            "name": "Less Than Or Equal",
            "value": "lte",
            "sourceName": "where[received_on][lte]"
          }
        ]
      },
      {
        "name": "wherefundid",
        "displayName": "Fund Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[fund][id]"
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
    "id": "getPeoplePersonIdPledgesPledgeIdJointGiver",
    "resource": "Person",
    "operation": "List Joint Giver",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/joint_giver",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/joint_giver",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
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
    "id": "getMe",
    "resource": "Person",
    "operation": "List Me",
    "description": "GET /me",
    "method": "GET",
    "path": "/giving/v2/me",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPaymentMethods",
    "resource": "Person",
    "operation": "List Payment Methods",
    "description": "GET /people/{person_id}/payment_methods",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/payment_methods",
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
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeople",
    "resource": "Person",
    "operation": "List People",
    "description": "GET /people",
    "method": "GET",
    "path": "/giving/v2/people",
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
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaign",
    "resource": "Person",
    "operation": "List Pledge Campaign",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
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
        "name": "wherefundid",
        "sourceName": "where[fund][id]",
        "displayName": "Where[fund][id]",
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
        "name": "wherefundid",
        "displayName": "Fund Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[fund][id]"
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
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges",
    "resource": "Person",
    "operation": "List Pledges (via Pledge Campaign)",
    "description": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
    "id": "getPeoplePersonIdPledges",
    "resource": "Person",
    "operation": "List Pledges",
    "description": "GET /people/{person_id}/pledges",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/pledges",
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
    "id": "getPeoplePersonIdPrimaryCampus",
    "resource": "Person",
    "operation": "List Primary Campus",
    "description": "GET /people/{person_id}/primary_campus",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/primary_campus",
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
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations",
    "resource": "Person",
    "operation": "List Recurring Donations",
    "description": "GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/payment_methods/{payment_method_id}/recurring_donations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "paymentMethodId",
        "sourceName": "payment_method_id",
        "displayName": "Payment Method Id",
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
    "id": "getPeoplePersonIdRecurringDonations",
    "resource": "Person",
    "operation": "List Recurring Donations",
    "description": "GET /people/{person_id}/recurring_donations",
    "method": "GET",
    "path": "/giving/v2/people/{person_id}/recurring_donations",
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
    "id": "patchPeoplePersonIdBatchGroupsBatchGroupId",
    "resource": "Person",
    "operation": "Update Batch Group",
    "description": "PATCH /people/{person_id}/batch_groups/{batch_group_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/batch_groups/{batch_group_id}",
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
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonIdBatchesBatchId",
    "resource": "Person",
    "operation": "Update Batch",
    "description": "PATCH /people/{person_id}/batches/{batch_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/batches/{batch_id}",
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
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchGroupId",
        "sourceName": "batch_group_id",
        "displayName": "Batch Group Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonIdDonationsDonationId",
    "resource": "Person",
    "operation": "Update Donation",
    "description": "PATCH /people/{person_id}/donations/{donation_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/donations/{donation_id}",
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
        "name": "donationId",
        "sourceName": "donation_id",
        "displayName": "Donation Id",
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
        "name": "paymentMethodSub",
        "sourceName": "payment_method_sub",
        "displayName": "Payment Method Sub",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentLast4",
        "sourceName": "payment_last4",
        "displayName": "Payment Last4",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentBrand",
        "sourceName": "payment_brand",
        "displayName": "Payment Brand",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentCheckNumber",
        "sourceName": "payment_check_number",
        "displayName": "Payment Check Number",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentCheckDatedAt",
        "sourceName": "payment_check_dated_at",
        "displayName": "Payment Check Dated At",
        "required": false,
        "type": "string"
      },
      {
        "name": "feeCents",
        "sourceName": "fee_cents",
        "displayName": "Fee Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "paymentMethod",
        "sourceName": "payment_method",
        "displayName": "Payment Method",
        "required": false,
        "type": "string"
      },
      {
        "name": "receivedAt",
        "sourceName": "received_at",
        "displayName": "Received At",
        "required": false,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "paymentSourceId",
        "sourceName": "payment_source_id",
        "displayName": "Payment Source Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "labelsIds",
        "sourceName": "labels_ids",
        "displayName": "Labels Ids",
        "required": false,
        "type": "string"
      },
      {
        "name": "batchId",
        "sourceName": "batch_id",
        "displayName": "Batch Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "paymentSourceIds",
        "displayName": "Payment Source ID",
        "relationshipName": "payment_source",
        "relationshipType": "PaymentSource",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId",
    "resource": "Person",
    "operation": "Update Fund",
    "description": "PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "ledgerCode",
        "sourceName": "ledger_code",
        "displayName": "Ledger Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "visibility",
        "sourceName": "visibility",
        "displayName": "Visibility",
        "required": false,
        "type": "string"
      },
      {
        "name": "colorIdentifier",
        "sourceName": "color_identifier",
        "displayName": "Color Identifier",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonIdInKindDonationsInKindDonationId",
    "resource": "Person",
    "operation": "Update In Kind Donation",
    "description": "PATCH /people/{person_id}/in_kind_donations/{in_kind_donation_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/in_kind_donations/{in_kind_donation_id}",
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
        "name": "inKindDonationId",
        "sourceName": "in_kind_donation_id",
        "displayName": "In Kind Donation Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "exchangeDetails",
        "sourceName": "exchange_details",
        "displayName": "Exchange Details",
        "required": false,
        "type": "string"
      },
      {
        "name": "fairMarketValueCents",
        "sourceName": "fair_market_value_cents",
        "displayName": "Fair Market Value Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "receivedOn",
        "sourceName": "received_on",
        "displayName": "Received On",
        "required": false,
        "type": "string"
      },
      {
        "name": "valuationDetails",
        "sourceName": "valuation_details",
        "displayName": "Valuation Details",
        "required": false,
        "type": "string"
      },
      {
        "name": "internalNotes",
        "sourceName": "internal_notes",
        "displayName": "Internal Notes",
        "required": false,
        "type": "string"
      },
      {
        "name": "fairMarketValueCurrency",
        "sourceName": "fair_market_value_currency",
        "displayName": "Fair Market Value Currency",
        "required": false,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": false,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus Id",
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
        "name": "fundIds",
        "displayName": "Fund ID",
        "relationshipName": "fund",
        "relationshipType": "Fund",
        "multiple": false
      },
      {
        "name": "personIds",
        "displayName": "Person ID",
        "relationshipName": "person",
        "relationshipType": "Person",
        "multiple": false
      },
      {
        "name": "campusIds",
        "displayName": "Campus ID",
        "relationshipName": "campus",
        "relationshipType": "Campus",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId",
    "resource": "Person",
    "operation": "Update Joint Giver",
    "description": "PATCH /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "jointGiverId",
        "sourceName": "joint_giver_id",
        "displayName": "Joint Giver Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "donorNumber",
        "sourceName": "donor_number",
        "displayName": "Donor Number",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonId",
    "resource": "Person",
    "operation": "Update Person",
    "description": "PATCH /people/{person_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}",
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
    "attributeFields": [
      {
        "name": "donorNumber",
        "sourceName": "donor_number",
        "displayName": "Donor Number",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
    "resource": "Person",
    "operation": "Update Pledge (via Pledge Campaign)",
    "description": "PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
        "name": "amountCents",
        "sourceName": "amount_cents",
        "displayName": "Amount Cents",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId",
    "resource": "Person",
    "operation": "Update Pledge Campaign",
    "description": "PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "pledgeCampaignId",
        "sourceName": "pledge_campaign_id",
        "displayName": "Pledge Campaign Id",
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
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "startsAt",
        "sourceName": "starts_at",
        "displayName": "Starts At",
        "required": false,
        "type": "string"
      },
      {
        "name": "endsAt",
        "sourceName": "ends_at",
        "displayName": "Ends At",
        "required": false,
        "type": "string"
      },
      {
        "name": "goalCents",
        "sourceName": "goal_cents",
        "displayName": "Goal Cents",
        "required": false,
        "type": "number"
      },
      {
        "name": "showGoalInChurchCenter",
        "sourceName": "show_goal_in_church_center",
        "displayName": "Show Goal In Church Center",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "fundIds",
        "displayName": "Fund ID",
        "relationshipName": "fund",
        "relationshipType": "Fund",
        "multiple": false
      }
    ]
  },
  {
    "id": "patchPeoplePersonIdPledgesPledgeId",
    "resource": "Person",
    "operation": "Update Pledge",
    "description": "PATCH /people/{person_id}/pledges/{pledge_id}",
    "method": "PATCH",
    "path": "/giving/v2/people/{person_id}/pledges/{pledge_id}",
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
        "name": "pledgeId",
        "sourceName": "pledge_id",
        "displayName": "Pledge Id",
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
        "name": "amountCents",
        "sourceName": "amount_cents",
        "displayName": "Amount Cents",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId",
    "resource": "Recurring Donation",
    "operation": "Delete Fund",
    "description": "DELETE /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
    "method": "DELETE",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "recurringDonationDesignationId",
        "sourceName": "recurring_donation_designation_id",
        "displayName": "Recurring Donation Designation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "getRecurringDonationsRecurringDonationIdDesignationsDesignationId",
    "resource": "Recurring Donation",
    "operation": "Get Designation",
    "description": "GET /recurring_donations/{recurring_donation_id}/designations/{designation_id}",
    "method": "GET",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/designations/{designation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "designationId",
        "sourceName": "designation_id",
        "displayName": "Designation Id",
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
    "id": "getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId",
    "resource": "Recurring Donation",
    "operation": "Get Fund",
    "description": "GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
    "method": "GET",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "recurringDonationDesignationId",
        "sourceName": "recurring_donation_designation_id",
        "displayName": "Recurring Donation Designation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
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
    "id": "getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId",
    "resource": "Recurring Donation",
    "operation": "Get Payment Method",
    "description": "GET /recurring_donations/{recurring_donation_id}/payment_method/{payment_method_id}",
    "method": "GET",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/payment_method/{payment_method_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "paymentMethodId",
        "sourceName": "payment_method_id",
        "displayName": "Payment Method Id",
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
    "id": "getRecurringDonationsRecurringDonationId",
    "resource": "Recurring Donation",
    "operation": "Get Recurring Donation",
    "description": "GET /recurring_donations/{recurring_donation_id}",
    "method": "GET",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
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
    "id": "getRecurringDonationsRecurringDonationIdDesignations",
    "resource": "Recurring Donation",
    "operation": "List Designations",
    "description": "GET /recurring_donations/{recurring_donation_id}/designations",
    "method": "GET",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/designations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
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
    "id": "getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund",
    "resource": "Recurring Donation",
    "operation": "List Fund",
    "description": "GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund",
    "method": "GET",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "recurringDonationDesignationId",
        "sourceName": "recurring_donation_designation_id",
        "displayName": "Recurring Donation Designation Id",
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
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
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
        "name": "whereid",
        "displayName": "Id",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationIdPaymentMethod",
    "resource": "Recurring Donation",
    "operation": "List Payment Method",
    "description": "GET /recurring_donations/{recurring_donation_id}/payment_method",
    "method": "GET",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/payment_method",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
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
    "id": "getRecurringDonations",
    "resource": "Recurring Donation",
    "operation": "List Recurring Donations",
    "description": "GET /recurring_donations",
    "method": "GET",
    "path": "/giving/v2/recurring_donations",
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
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId",
    "resource": "Recurring Donation",
    "operation": "Update Fund",
    "description": "PATCH /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
    "method": "PATCH",
    "path": "/giving/v2/recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "recurringDonationId",
        "sourceName": "recurring_donation_id",
        "displayName": "Recurring Donation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "recurringDonationDesignationId",
        "sourceName": "recurring_donation_designation_id",
        "displayName": "Recurring Donation Designation Id",
        "required": true,
        "type": "string"
      },
      {
        "name": "fundId",
        "sourceName": "fund_id",
        "displayName": "Fund Id",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "ledgerCode",
        "sourceName": "ledger_code",
        "displayName": "Ledger Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "description",
        "sourceName": "description",
        "displayName": "Description",
        "required": false,
        "type": "string"
      },
      {
        "name": "visibility",
        "sourceName": "visibility",
        "displayName": "Visibility",
        "required": false,
        "type": "string"
      },
      {
        "name": "colorIdentifier",
        "sourceName": "color_identifier",
        "displayName": "Color Identifier",
        "required": false,
        "type": "number"
      }
    ],
    "relationshipFields": []
  }
];

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Batch\",\"value\":\"Batch\"},{\"name\":\"Batch Group\",\"value\":\"Batch Group\"},{\"name\":\"Campus\",\"value\":\"Campus\"},{\"name\":\"Donation\",\"value\":\"Donation\"},{\"name\":\"Fund\",\"value\":\"Fund\"},{\"name\":\"In Kind Donation\",\"value\":\"In Kind Donation\"},{\"name\":\"Label\",\"value\":\"Label\"},{\"name\":\"Payment Source\",\"value\":\"Payment Source\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Recurring Donation\",\"value\":\"Recurring Donation\"}],\n      default: \"Batch\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"]}},\n      options: [{\"name\":\"Create Batch\",\"value\":\"postBatches\",\"description\":\"POST /batches\",\"action\":\"Create Batch\"},{\"name\":\"Create Commit\",\"value\":\"postBatchesBatchIdCommit\",\"description\":\"POST /batches/{batch_id}/commit\",\"action\":\"Create Commit\"},{\"name\":\"Create Donation\",\"value\":\"postBatchesBatchIdDonations\",\"description\":\"POST /batches/{batch_id}/donations\",\"action\":\"Create Donation\"},{\"name\":\"Delete Batch Group\",\"value\":\"deleteBatchesBatchIdBatchGroupBatchGroupId\",\"description\":\"DELETE /batches/{batch_id}/batch_group/{batch_group_id}\",\"action\":\"Delete Batch Group\"},{\"name\":\"Delete Batch\",\"value\":\"deleteBatchesBatchId\",\"description\":\"DELETE /batches/{batch_id}\",\"action\":\"Delete Batch\"},{\"name\":\"Delete Donation\",\"value\":\"deleteBatchesBatchIdDonationsDonationId\",\"description\":\"DELETE /batches/{batch_id}/donations/{donation_id}\",\"action\":\"Delete Donation\"},{\"name\":\"Get Batch Group\",\"value\":\"getBatchesBatchIdBatchGroupBatchGroupId\",\"description\":\"GET /batches/{batch_id}/batch_group/{batch_group_id}\",\"action\":\"Get Batch Group\"},{\"name\":\"Get Batch\",\"value\":\"getBatchesBatchId\",\"description\":\"GET /batches/{batch_id}\",\"action\":\"Get Batch\"},{\"name\":\"Get Donation\",\"value\":\"getBatchesBatchIdDonationsDonationId\",\"description\":\"GET /batches/{batch_id}/donations/{donation_id}\",\"action\":\"Get Donation\"},{\"name\":\"Get Owner\",\"value\":\"getBatchesBatchIdOwnerOwnerId\",\"description\":\"GET /batches/{batch_id}/owner/{owner_id}\",\"action\":\"Get Owner\"},{\"name\":\"List Batch Group\",\"value\":\"getBatchesBatchIdBatchGroup\",\"description\":\"GET /batches/{batch_id}/batch_group\",\"action\":\"List Batch Group\"},{\"name\":\"List Batches\",\"value\":\"getBatches\",\"description\":\"GET /batches\",\"action\":\"List Batches\"},{\"name\":\"List Donations\",\"value\":\"getBatchesBatchIdDonations\",\"description\":\"GET /batches/{batch_id}/donations\",\"action\":\"List Donations\"},{\"name\":\"List Owner\",\"value\":\"getBatchesBatchIdOwner\",\"description\":\"GET /batches/{batch_id}/owner\",\"action\":\"List Owner\"},{\"name\":\"Update Batch Group\",\"value\":\"patchBatchesBatchIdBatchGroupBatchGroupId\",\"description\":\"PATCH /batches/{batch_id}/batch_group/{batch_group_id}\",\"action\":\"Update Batch Group\"},{\"name\":\"Update Batch\",\"value\":\"patchBatchesBatchId\",\"description\":\"PATCH /batches/{batch_id}\",\"action\":\"Update Batch\"},{\"name\":\"Update Donation\",\"value\":\"patchBatchesBatchIdDonationsDonationId\",\"description\":\"PATCH /batches/{batch_id}/donations/{donation_id}\",\"action\":\"Update Donation\"},{\"name\":\"Update Owner\",\"value\":\"patchBatchesBatchIdOwnerOwnerId\",\"description\":\"PATCH /batches/{batch_id}/owner/{owner_id}\",\"action\":\"Update Owner\"}],\n      default: \"postBatches\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"]}},\n      options: [{\"name\":\"Create Batch Group\",\"value\":\"postBatchGroups\",\"description\":\"POST /batch_groups\",\"action\":\"Create Batch Group\"},{\"name\":\"Create Batch\",\"value\":\"postBatchGroupsBatchGroupIdBatches\",\"description\":\"POST /batch_groups/{batch_group_id}/batches\",\"action\":\"Create Batch\"},{\"name\":\"Create Commit\",\"value\":\"postBatchGroupsBatchGroupIdCommit\",\"description\":\"POST /batch_groups/{batch_group_id}/commit\",\"action\":\"Create Commit\"},{\"name\":\"Delete Batch Group\",\"value\":\"deleteBatchGroupsBatchGroupId\",\"description\":\"DELETE /batch_groups/{batch_group_id}\",\"action\":\"Delete Batch Group\"},{\"name\":\"Delete Batch\",\"value\":\"deleteBatchGroupsBatchGroupIdBatchesBatchId\",\"description\":\"DELETE /batch_groups/{batch_group_id}/batches/{batch_id}\",\"action\":\"Delete Batch\"},{\"name\":\"Get Batch Group\",\"value\":\"getBatchGroupsBatchGroupId\",\"description\":\"GET /batch_groups/{batch_group_id}\",\"action\":\"Get Batch Group\"},{\"name\":\"Get Batch\",\"value\":\"getBatchGroupsBatchGroupIdBatchesBatchId\",\"description\":\"GET /batch_groups/{batch_group_id}/batches/{batch_id}\",\"action\":\"Get Batch\"},{\"name\":\"Get Owner\",\"value\":\"getBatchGroupsBatchGroupIdOwnerOwnerId\",\"description\":\"GET /batch_groups/{batch_group_id}/owner/{owner_id}\",\"action\":\"Get Owner\"},{\"name\":\"List Batch Groups\",\"value\":\"getBatchGroups\",\"description\":\"GET /batch_groups\",\"action\":\"List Batch Groups\"},{\"name\":\"List Batches\",\"value\":\"getBatchGroupsBatchGroupIdBatches\",\"description\":\"GET /batch_groups/{batch_group_id}/batches\",\"action\":\"List Batches\"},{\"name\":\"List Owner\",\"value\":\"getBatchGroupsBatchGroupIdOwner\",\"description\":\"GET /batch_groups/{batch_group_id}/owner\",\"action\":\"List Owner\"},{\"name\":\"Update Batch Group\",\"value\":\"patchBatchGroupsBatchGroupId\",\"description\":\"PATCH /batch_groups/{batch_group_id}\",\"action\":\"Update Batch Group\"},{\"name\":\"Update Batch\",\"value\":\"patchBatchGroupsBatchGroupIdBatchesBatchId\",\"description\":\"PATCH /batch_groups/{batch_group_id}/batches/{batch_id}\",\"action\":\"Update Batch\"},{\"name\":\"Update Owner\",\"value\":\"patchBatchGroupsBatchGroupIdOwnerOwnerId\",\"description\":\"PATCH /batch_groups/{batch_group_id}/owner/{owner_id}\",\"action\":\"Update Owner\"}],\n      default: \"postBatchGroups\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"]}},\n      options: [{\"name\":\"Delete Donation\",\"value\":\"deleteCampusesCampusIdDonationsDonationId\",\"description\":\"DELETE /campuses/{campus_id}/donations/{donation_id}\",\"action\":\"Delete Donation\"},{\"name\":\"Get Campus\",\"value\":\"getCampusesCampusId\",\"description\":\"GET /campuses/{campus_id}\",\"action\":\"Get Campus\"},{\"name\":\"Get Donation\",\"value\":\"getCampusesCampusIdDonationsDonationId\",\"description\":\"GET /campuses/{campus_id}/donations/{donation_id}\",\"action\":\"Get Donation\"},{\"name\":\"List Campuses\",\"value\":\"getCampuses\",\"description\":\"GET /campuses\",\"action\":\"List Campuses\"},{\"name\":\"List Donations\",\"value\":\"getCampusesCampusIdDonations\",\"description\":\"GET /campuses/{campus_id}/donations\",\"action\":\"List Donations\"},{\"name\":\"Update Donation\",\"value\":\"patchCampusesCampusIdDonationsDonationId\",\"description\":\"PATCH /campuses/{campus_id}/donations/{donation_id}\",\"action\":\"Update Donation\"}],\n      default: \"deleteCampusesCampusIdDonationsDonationId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"]}},\n      options: [{\"name\":\"Create Issue Refund\",\"value\":\"postDonationsDonationIdIssueRefund\",\"description\":\"POST /donations/{donation_id}/issue_refund\",\"action\":\"Create Issue Refund\"},{\"name\":\"Delete Donation\",\"value\":\"deleteDonationsDonationId\",\"description\":\"DELETE /donations/{donation_id}\",\"action\":\"Delete Donation\"},{\"name\":\"Delete Fund\",\"value\":\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\",\"description\":\"DELETE /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"action\":\"Delete Fund\"},{\"name\":\"Delete Label\",\"value\":\"deleteDonationsDonationIdLabelsLabelId\",\"description\":\"DELETE /donations/{donation_id}/labels/{label_id}\",\"action\":\"Delete Label\"},{\"name\":\"Get Campus\",\"value\":\"getDonationsDonationIdCampusCampusId\",\"description\":\"GET /donations/{donation_id}/campus/{campus_id}\",\"action\":\"Get Campus\"},{\"name\":\"Get Designation Refund\",\"value\":\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}\",\"action\":\"Get Designation Refund\"},{\"name\":\"Get Designation\",\"value\":\"getDonationsDonationIdDesignationsDesignationId\",\"description\":\"GET /donations/{donation_id}/designations/{designation_id}\",\"action\":\"Get Designation\"},{\"name\":\"Get Designation\",\"value\":\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation/{designation_id}\",\"action\":\"Get Designation\"},{\"name\":\"Get Donation\",\"value\":\"getDonationsDonationId\",\"description\":\"GET /donations/{donation_id}\",\"action\":\"Get Donation\"},{\"name\":\"Get Fund\",\"value\":\"getDonationsDonationIdDesignationsDesignationIdFundFundId\",\"description\":\"GET /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"action\":\"Get Fund\"},{\"name\":\"Get Label\",\"value\":\"getDonationsDonationIdLabelsLabelId\",\"description\":\"GET /donations/{donation_id}/labels/{label_id}\",\"action\":\"Get Label\"},{\"name\":\"List Campus\",\"value\":\"getDonationsDonationIdCampus\",\"description\":\"GET /donations/{donation_id}/campus\",\"action\":\"List Campus\"},{\"name\":\"List Designation Refunds\",\"value\":\"getDonationsDonationIdRefundDesignationRefunds\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds\",\"action\":\"List Designation Refunds\"},{\"name\":\"List Designation\",\"value\":\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation\",\"action\":\"List Designation\"},{\"name\":\"List Designations\",\"value\":\"getDonationsDonationIdDesignations\",\"description\":\"GET /donations/{donation_id}/designations\",\"action\":\"List Designations\"},{\"name\":\"List Donations\",\"value\":\"getDonations\",\"description\":\"GET /donations\",\"action\":\"List Donations\"},{\"name\":\"List Fund\",\"value\":\"getDonationsDonationIdDesignationsDesignationIdFund\",\"description\":\"GET /donations/{donation_id}/designations/{designation_id}/fund\",\"action\":\"List Fund\"},{\"name\":\"List Labels\",\"value\":\"getDonationsDonationIdLabels\",\"description\":\"GET /donations/{donation_id}/labels\",\"action\":\"List Labels\"},{\"name\":\"List Note\",\"value\":\"getDonationsDonationIdNote\",\"description\":\"GET /donations/{donation_id}/note\",\"action\":\"List Note\"},{\"name\":\"List Refund\",\"value\":\"getDonationsDonationIdRefund\",\"description\":\"GET /donations/{donation_id}/refund\",\"action\":\"List Refund\"},{\"name\":\"Update Donation\",\"value\":\"patchDonationsDonationId\",\"description\":\"PATCH /donations/{donation_id}\",\"action\":\"Update Donation\"},{\"name\":\"Update Fund\",\"value\":\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\",\"description\":\"PATCH /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"action\":\"Update Fund\"},{\"name\":\"Update Label\",\"value\":\"patchDonationsDonationIdLabelsLabelId\",\"description\":\"PATCH /donations/{donation_id}/labels/{label_id}\",\"action\":\"Update Label\"}],\n      default: \"postDonationsDonationIdIssueRefund\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"]}},\n      options: [{\"name\":\"Create Fund\",\"value\":\"postFunds\",\"description\":\"POST /funds\",\"action\":\"Create Fund\"},{\"name\":\"Delete Fund\",\"value\":\"deleteFundsFundId\",\"description\":\"DELETE /funds/{fund_id}\",\"action\":\"Delete Fund\"},{\"name\":\"Get Fund\",\"value\":\"getFundsFundId\",\"description\":\"GET /funds/{fund_id}\",\"action\":\"Get Fund\"},{\"name\":\"List Funds\",\"value\":\"getFunds\",\"description\":\"GET /funds\",\"action\":\"List Funds\"},{\"name\":\"Update Fund\",\"value\":\"patchFundsFundId\",\"description\":\"PATCH /funds/{fund_id}\",\"action\":\"Update Fund\"}],\n      default: \"postFunds\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"]}},\n      options: [{\"name\":\"Create In Kind Donation\",\"value\":\"postInKindDonations\",\"description\":\"POST /in_kind_donations\",\"action\":\"Create In Kind Donation\"},{\"name\":\"Delete Fund\",\"value\":\"deleteInKindDonationsInKindDonationIdFundFundId\",\"description\":\"DELETE /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"action\":\"Delete Fund\"},{\"name\":\"Delete In Kind Donation\",\"value\":\"deleteInKindDonationsInKindDonationId\",\"description\":\"DELETE /in_kind_donations/{in_kind_donation_id}\",\"action\":\"Delete In Kind Donation\"},{\"name\":\"Get Campus\",\"value\":\"getInKindDonationsInKindDonationIdCampusCampusId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/campus/{campus_id}\",\"action\":\"Get Campus\"},{\"name\":\"Get Fund\",\"value\":\"getInKindDonationsInKindDonationIdFundFundId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"action\":\"Get Fund\"},{\"name\":\"Get In Kind Donation\",\"value\":\"getInKindDonationsInKindDonationId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}\",\"action\":\"Get In Kind Donation\"},{\"name\":\"Get Person\",\"value\":\"getInKindDonationsInKindDonationIdPersonPersonId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/person/{person_id}\",\"action\":\"Get Person\"},{\"name\":\"List Campus\",\"value\":\"getInKindDonationsInKindDonationIdCampus\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/campus\",\"action\":\"List Campus\"},{\"name\":\"List Fund\",\"value\":\"getInKindDonationsInKindDonationIdFund\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/fund\",\"action\":\"List Fund\"},{\"name\":\"List In Kind Donations\",\"value\":\"getInKindDonations\",\"description\":\"GET /in_kind_donations\",\"action\":\"List In Kind Donations\"},{\"name\":\"List Person\",\"value\":\"getInKindDonationsInKindDonationIdPerson\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/person\",\"action\":\"List Person\"},{\"name\":\"Update Fund\",\"value\":\"patchInKindDonationsInKindDonationIdFundFundId\",\"description\":\"PATCH /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"action\":\"Update Fund\"},{\"name\":\"Update In Kind Donation\",\"value\":\"patchInKindDonationsInKindDonationId\",\"description\":\"PATCH /in_kind_donations/{in_kind_donation_id}\",\"action\":\"Update In Kind Donation\"},{\"name\":\"Update Person\",\"value\":\"patchInKindDonationsInKindDonationIdPersonPersonId\",\"description\":\"PATCH /in_kind_donations/{in_kind_donation_id}/person/{person_id}\",\"action\":\"Update Person\"}],\n      default: \"postInKindDonations\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"]}},\n      options: [{\"name\":\"Create Label\",\"value\":\"postLabels\",\"description\":\"POST /labels\",\"action\":\"Create Label\"},{\"name\":\"Delete Label\",\"value\":\"deleteLabelsLabelId\",\"description\":\"DELETE /labels/{label_id}\",\"action\":\"Delete Label\"},{\"name\":\"Get Label\",\"value\":\"getLabelsLabelId\",\"description\":\"GET /labels/{label_id}\",\"action\":\"Get Label\"},{\"name\":\"List Labels\",\"value\":\"getLabels\",\"description\":\"GET /labels\",\"action\":\"List Labels\"},{\"name\":\"Update Label\",\"value\":\"patchLabelsLabelId\",\"description\":\"PATCH /labels/{label_id}\",\"action\":\"Update Label\"}],\n      default: \"postLabels\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"]}},\n      options: [{\"name\":\"Create Payment Source\",\"value\":\"postPaymentSources\",\"description\":\"POST /payment_sources\",\"action\":\"Create Payment Source\"},{\"name\":\"Delete Donation\",\"value\":\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\",\"description\":\"DELETE /payment_sources/{payment_source_id}/donations/{donation_id}\",\"action\":\"Delete Donation\"},{\"name\":\"Delete Payment Source\",\"value\":\"deletePaymentSourcesPaymentSourceId\",\"description\":\"DELETE /payment_sources/{payment_source_id}\",\"action\":\"Delete Payment Source\"},{\"name\":\"Get Donation\",\"value\":\"getPaymentSourcesPaymentSourceIdDonationsDonationId\",\"description\":\"GET /payment_sources/{payment_source_id}/donations/{donation_id}\",\"action\":\"Get Donation\"},{\"name\":\"Get Payment Source\",\"value\":\"getPaymentSourcesPaymentSourceId\",\"description\":\"GET /payment_sources/{payment_source_id}\",\"action\":\"Get Payment Source\"},{\"name\":\"List Donations\",\"value\":\"getPaymentSourcesPaymentSourceIdDonations\",\"description\":\"GET /payment_sources/{payment_source_id}/donations\",\"action\":\"List Donations\"},{\"name\":\"List Payment Sources\",\"value\":\"getPaymentSources\",\"description\":\"GET /payment_sources\",\"action\":\"List Payment Sources\"},{\"name\":\"Update Donation\",\"value\":\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\",\"description\":\"PATCH /payment_sources/{payment_source_id}/donations/{donation_id}\",\"action\":\"Update Donation\"},{\"name\":\"Update Payment Source\",\"value\":\"patchPaymentSourcesPaymentSourceId\",\"description\":\"PATCH /payment_sources/{payment_source_id}\",\"action\":\"Update Payment Source\"}],\n      default: \"postPaymentSources\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"Create Pledge\",\"value\":\"postPeoplePersonIdPledges\",\"description\":\"POST /people/{person_id}/pledges\",\"action\":\"Create Pledge\"},{\"name\":\"Delete Batch Group\",\"value\":\"deletePeoplePersonIdBatchGroupsBatchGroupId\",\"description\":\"DELETE /people/{person_id}/batch_groups/{batch_group_id}\",\"action\":\"Delete Batch Group\"},{\"name\":\"Delete Batch\",\"value\":\"deletePeoplePersonIdBatchesBatchId\",\"description\":\"DELETE /people/{person_id}/batches/{batch_id}\",\"action\":\"Delete Batch\"},{\"name\":\"Delete Donation\",\"value\":\"deletePeoplePersonIdDonationsDonationId\",\"description\":\"DELETE /people/{person_id}/donations/{donation_id}\",\"action\":\"Delete Donation\"},{\"name\":\"Delete Fund\",\"value\":\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"action\":\"Delete Fund\"},{\"name\":\"Delete In Kind Donation\",\"value\":\"deletePeoplePersonIdInKindDonationsInKindDonationId\",\"description\":\"DELETE /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"action\":\"Delete In Kind Donation\"},{\"name\":\"Delete Pledge (via Pledge Campaign)\",\"value\":\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"action\":\"Delete Pledge (via Pledge Campaign)\"},{\"name\":\"Delete Pledge Campaign\",\"value\":\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"action\":\"Delete Pledge Campaign\"},{\"name\":\"Delete Pledge\",\"value\":\"deletePeoplePersonIdPledgesPledgeId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}\",\"action\":\"Delete Pledge\"},{\"name\":\"Get Batch Group\",\"value\":\"getPeoplePersonIdBatchGroupsBatchGroupId\",\"description\":\"GET /people/{person_id}/batch_groups/{batch_group_id}\",\"action\":\"Get Batch Group\"},{\"name\":\"Get Batch\",\"value\":\"getPeoplePersonIdBatchesBatchId\",\"description\":\"GET /people/{person_id}/batches/{batch_id}\",\"action\":\"Get Batch\"},{\"name\":\"Get Donation\",\"value\":\"getPeoplePersonIdDonationsDonationId\",\"description\":\"GET /people/{person_id}/donations/{donation_id}\",\"action\":\"Get Donation\"},{\"name\":\"Get Fund\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"action\":\"Get Fund\"},{\"name\":\"Get In Kind Donation\",\"value\":\"getPeoplePersonIdInKindDonationsInKindDonationId\",\"description\":\"GET /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"action\":\"Get In Kind Donation\"},{\"name\":\"Get Joint Giver\",\"value\":\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\",\"action\":\"Get Joint Giver\"},{\"name\":\"Get Payment Method\",\"value\":\"getPeoplePersonIdPaymentMethodsPaymentMethodId\",\"description\":\"GET /people/{person_id}/payment_methods/{payment_method_id}\",\"action\":\"Get Payment Method\"},{\"name\":\"Get Person\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"Get Person\"},{\"name\":\"Get Pledge (via Pledge Campaign)\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"action\":\"Get Pledge (via Pledge Campaign)\"},{\"name\":\"Get Pledge Campaign\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"action\":\"Get Pledge Campaign\"},{\"name\":\"Get Pledge\",\"value\":\"getPeoplePersonIdPledgesPledgeId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}\",\"action\":\"Get Pledge\"},{\"name\":\"Get Primary Campus\",\"value\":\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\",\"description\":\"GET /people/{person_id}/primary_campus/{primary_campus_id}\",\"action\":\"Get Primary Campus\"},{\"name\":\"Get Recurring Donation\",\"value\":\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\",\"description\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations/{recurring_donation_id}\",\"action\":\"Get Recurring Donation\"},{\"name\":\"Get Recurring Donation\",\"value\":\"getPeoplePersonIdRecurringDonationsRecurringDonationId\",\"description\":\"GET /people/{person_id}/recurring_donations/{recurring_donation_id}\",\"action\":\"Get Recurring Donation\"},{\"name\":\"List Batch Groups\",\"value\":\"getPeoplePersonIdBatchGroups\",\"description\":\"GET /people/{person_id}/batch_groups\",\"action\":\"List Batch Groups\"},{\"name\":\"List Batches\",\"value\":\"getPeoplePersonIdBatches\",\"description\":\"GET /people/{person_id}/batches\",\"action\":\"List Batches\"},{\"name\":\"List Donations\",\"value\":\"getPeoplePersonIdDonations\",\"description\":\"GET /people/{person_id}/donations\",\"action\":\"List Donations\"},{\"name\":\"List Fund\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund\",\"action\":\"List Fund\"},{\"name\":\"List In Kind Donations\",\"value\":\"getPeoplePersonIdInKindDonations\",\"description\":\"GET /people/{person_id}/in_kind_donations\",\"action\":\"List In Kind Donations\"},{\"name\":\"List Joint Giver\",\"value\":\"getPeoplePersonIdPledgesPledgeIdJointGiver\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver\",\"action\":\"List Joint Giver\"},{\"name\":\"List Me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"List Me\"},{\"name\":\"List Payment Methods\",\"value\":\"getPeoplePersonIdPaymentMethods\",\"description\":\"GET /people/{person_id}/payment_methods\",\"action\":\"List Payment Methods\"},{\"name\":\"List People\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"List People\"},{\"name\":\"List Pledge Campaign\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign\",\"action\":\"List Pledge Campaign\"},{\"name\":\"List Pledges (via Pledge Campaign)\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges\",\"action\":\"List Pledges (via Pledge Campaign)\"},{\"name\":\"List Pledges\",\"value\":\"getPeoplePersonIdPledges\",\"description\":\"GET /people/{person_id}/pledges\",\"action\":\"List Pledges\"},{\"name\":\"List Primary Campus\",\"value\":\"getPeoplePersonIdPrimaryCampus\",\"description\":\"GET /people/{person_id}/primary_campus\",\"action\":\"List Primary Campus\"},{\"name\":\"List Recurring Donations\",\"value\":\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\",\"description\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations\",\"action\":\"List Recurring Donations\"},{\"name\":\"List Recurring Donations\",\"value\":\"getPeoplePersonIdRecurringDonations\",\"description\":\"GET /people/{person_id}/recurring_donations\",\"action\":\"List Recurring Donations\"},{\"name\":\"Update Batch Group\",\"value\":\"patchPeoplePersonIdBatchGroupsBatchGroupId\",\"description\":\"PATCH /people/{person_id}/batch_groups/{batch_group_id}\",\"action\":\"Update Batch Group\"},{\"name\":\"Update Batch\",\"value\":\"patchPeoplePersonIdBatchesBatchId\",\"description\":\"PATCH /people/{person_id}/batches/{batch_id}\",\"action\":\"Update Batch\"},{\"name\":\"Update Donation\",\"value\":\"patchPeoplePersonIdDonationsDonationId\",\"description\":\"PATCH /people/{person_id}/donations/{donation_id}\",\"action\":\"Update Donation\"},{\"name\":\"Update Fund\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"action\":\"Update Fund\"},{\"name\":\"Update In Kind Donation\",\"value\":\"patchPeoplePersonIdInKindDonationsInKindDonationId\",\"description\":\"PATCH /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"action\":\"Update In Kind Donation\"},{\"name\":\"Update Joint Giver\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\",\"action\":\"Update Joint Giver\"},{\"name\":\"Update Person\",\"value\":\"patchPeoplePersonId\",\"description\":\"PATCH /people/{person_id}\",\"action\":\"Update Person\"},{\"name\":\"Update Pledge (via Pledge Campaign)\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"action\":\"Update Pledge (via Pledge Campaign)\"},{\"name\":\"Update Pledge Campaign\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"action\":\"Update Pledge Campaign\"},{\"name\":\"Update Pledge\",\"value\":\"patchPeoplePersonIdPledgesPledgeId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}\",\"action\":\"Update Pledge\"}],\n      default: \"postPeoplePersonIdPledges\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"]}},\n      options: [{\"name\":\"Delete Fund\",\"value\":\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\"description\":\"DELETE /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"action\":\"Delete Fund\"},{\"name\":\"Get Designation\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations/{designation_id}\",\"action\":\"Get Designation\"},{\"name\":\"Get Fund\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"action\":\"Get Fund\"},{\"name\":\"Get Payment Method\",\"value\":\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/payment_method/{payment_method_id}\",\"action\":\"Get Payment Method\"},{\"name\":\"Get Recurring Donation\",\"value\":\"getRecurringDonationsRecurringDonationId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}\",\"action\":\"Get Recurring Donation\"},{\"name\":\"List Designations\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignations\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations\",\"action\":\"List Designations\"},{\"name\":\"List Fund\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund\",\"action\":\"List Fund\"},{\"name\":\"List Payment Method\",\"value\":\"getRecurringDonationsRecurringDonationIdPaymentMethod\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/payment_method\",\"action\":\"List Payment Method\"},{\"name\":\"List Recurring Donations\",\"value\":\"getRecurringDonations\",\"description\":\"GET /recurring_donations\",\"action\":\"List Recurring Donations\"},{\"name\":\"Update Fund\",\"value\":\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\"description\":\"PATCH /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"action\":\"Update Fund\"}],\n      default: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\n    },\n    {\n      displayName: 'Options',\n      name: \"postBatchGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postBatchGroups_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatchGroupsBatchGroupIdBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postBatchGroupsBatchGroupIdBatches_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postBatchGroupsBatchGroupIdBatches_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatchGroupsBatchGroupIdBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatchGroupsBatchGroupIdCommit_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deleteBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deleteBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchGroupsBatchGroupIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchGroupsBatchGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdOwnerOwnerId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"getBatchGroupsBatchGroupIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n      options: [{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Committed\",\"value\":\"committed\"},{\"name\":\"In Progress\",\"value\":\"in_progress\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"],\"getBatchGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchGroupsBatchGroupIdBatches_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n      options: [{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Committed\",\"value\":\"committed\"},{\"name\":\"In Progress\",\"value\":\"in_progress\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchGroupsBatchGroupIdBatches_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchGroupsBatchGroupIdBatches_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"],\"getBatchGroupsBatchGroupIdBatches_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdOwner_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchGroupsBatchGroupIdOwner_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchGroupsBatchGroupIdOwner_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"],\"getBatchGroupsBatchGroupIdOwner_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchBatchGroupsBatchGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchGroupsBatchGroupId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupIdOwnerOwnerId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"patchBatchGroupsBatchGroupIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchBatchGroupsBatchGroupIdOwnerOwnerId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"postBatches_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postBatches_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"postBatchesBatchIdCommit_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"postBatchesBatchIdDonations_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postBatchesBatchIdDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"postBatchesBatchIdDonations_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"postBatchesBatchIdDonations_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"postBatchesBatchIdDonations_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"postBatchesBatchIdDonations_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"postBatchesBatchIdDonations_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"postBatchesBatchIdDonations_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"postBatchesBatchIdDonations_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"postBatchesBatchIdDonations_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postBatchesBatchIdDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"postBatchesBatchIdDonations_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"postBatchesBatchIdDonations_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"postBatchesBatchIdDonations_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"postBatchesBatchIdDonations_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"postBatchesBatchIdDonations_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"postBatchesBatchIdDonations_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"postBatchesBatchIdDonations_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchesBatchIdBatchGroupBatchGroupId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deleteBatchesBatchIdBatchGroupBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteBatchesBatchIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchesBatchId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getBatchesBatchIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchesBatchIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdOwnerOwnerId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"getBatchesBatchIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdBatchGroup_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchesBatchIdBatchGroup_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n      options: [{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchesBatchIdBatchGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchesBatchIdBatchGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"],\"getBatchesBatchIdBatchGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatches_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n      options: [{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Committed\",\"value\":\"committed\"},{\"name\":\"In Progress\",\"value\":\"in_progress\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatches_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatches_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"],\"getBatches_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdDonations_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getBatchesBatchIdDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n      options: [{\"displayName\":\"Received At\",\"name\":\"wherereceivedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Completed At\",\"name\":\"wherecompletedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Received At Ascending\",\"value\":\"received_at\"},{\"name\":\"Received At Descending\",\"value\":\"-received_at\"},{\"name\":\"Completed At Ascending\",\"value\":\"completed_at\"},{\"name\":\"Completed At Descending\",\"value\":\"-completed_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchesBatchIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchesBatchIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"],\"getBatchesBatchIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdOwner_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchesBatchIdOwner_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchesBatchIdOwner_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"],\"getBatchesBatchIdOwner_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchBatchesBatchId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchesBatchId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchBatchesBatchIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchBatchesBatchIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchBatchesBatchIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchBatchesBatchIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchBatchesBatchIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchBatchesBatchIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdOwnerOwnerId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"patchBatchesBatchIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchBatchesBatchIdOwnerOwnerId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"deleteCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"deleteCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteCampusesCampusIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"deleteCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"deleteCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getCampusesCampusIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getCampusesCampusIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"],\"getCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdDonations_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getCampusesCampusIdDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n      options: [{\"displayName\":\"Received At\",\"name\":\"wherereceivedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Completed At\",\"name\":\"wherecompletedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Received At Ascending\",\"value\":\"received_at\"},{\"name\":\"Received At Descending\",\"value\":\"-received_at\"},{\"name\":\"Completed At Ascending\",\"value\":\"completed_at\"},{\"name\":\"Completed At Descending\",\"value\":\"-completed_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampusesCampusIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampusesCampusIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"],\"getCampusesCampusIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchCampusesCampusIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchCampusesCampusIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchCampusesCampusIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchCampusesCampusIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchCampusesCampusIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchCampusesCampusIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"postDonationsDonationIdIssueRefund_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteDonationsDonationIdDesignationsDesignationIdFundFundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"deleteDonationsDonationIdDesignationsDesignationIdFundFundId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteDonationsDonationIdDesignationsDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteDonationsDonationIdLabelsLabelId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"deleteDonationsDonationIdLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdCampusCampusId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getDonationsDonationIdCampusCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampusCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: \"Designation Refund Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_designationRefundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designation\",\"value\":\"designation\"},{\"name\":\"Designation Fund\",\"value\":\"designation.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdDesignationsDesignationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Refund Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_designationRefundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFundFundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFundFundId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdLabelsLabelId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"getDonationsDonationIdLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdCampus_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdCampus_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdCampus_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"],\"getDonationsDonationIdCampus_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdRefundDesignationRefunds_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designation\",\"value\":\"designation\"},{\"name\":\"Designation Fund\",\"value\":\"designation.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdRefundDesignationRefunds_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdRefundDesignationRefunds_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"],\"getDonationsDonationIdRefundDesignationRefunds_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Designation Refund Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_designationRefundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n      options: [{\"displayName\":\"Fund Id\",\"name\":\"wherefundid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"],\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignations_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdDesignations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n      options: [{\"displayName\":\"Fund Id\",\"name\":\"wherefundid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdDesignations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdDesignations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"],\"getDonationsDonationIdDesignations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n      options: [{\"displayName\":\"Received At\",\"name\":\"wherereceivedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Completed At\",\"name\":\"wherecompletedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Succeeded\",\"value\":\"succeeded\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Received At Ascending\",\"value\":\"received_at\"},{\"name\":\"Received At Descending\",\"value\":\"-received_at\"},{\"name\":\"Completed At Ascending\",\"value\":\"completed_at\"},{\"name\":\"Completed At Descending\",\"value\":\"-completed_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"],\"getDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"],\"getDonationsDonationIdDesignationsDesignationIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdLabels_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"],\"getDonationsDonationIdLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdNote_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdNote_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdNote_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"],\"getDonationsDonationIdNote_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefund_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getDonationsDonationIdRefund_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designation Refunds\",\"value\":\"designation_refunds\"},{\"name\":\"Designation Refunds Designation\",\"value\":\"designation_refunds.designation\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdRefund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdRefund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"],\"getDonationsDonationIdRefund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchDonationsDonationIdLabelsLabelId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"patchDonationsDonationIdLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Slug\",\n      name: \"patchDonationsDonationIdLabelsLabelId_slug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"postFunds_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"postFunds_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postFunds_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"postFunds_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"postFunds_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteFundsFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"deleteFundsFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"deleteFundsFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getFundsFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFundsFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFundsFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getFunds_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getFunds_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getFunds_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"],\"getFunds_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchFundsFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchFundsFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchFundsFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchFundsFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchFundsFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchFundsFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"postInKindDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Fund\",\"value\":\"fund\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postInKindDonations_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Exchange Details\",\n      name: \"postInKindDonations_exchangeDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Cents\",\n      name: \"postInKindDonations_fairMarketValueCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received On\",\n      name: \"postInKindDonations_receivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Valuation Details\",\n      name: \"postInKindDonations_valuationDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Internal Notes\",\n      name: \"postInKindDonations_internalNotes\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Currency\",\n      name: \"postInKindDonations_fairMarketValueCurrency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"postInKindDonations_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"postInKindDonations_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postInKindDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"postInKindDonations_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"postInKindDonations_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"postInKindDonations_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"deleteInKindDonationsInKindDonationIdFundFundId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteInKindDonationsInKindDonationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"deleteInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdCampusCampusId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getInKindDonationsInKindDonationIdCampusCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampusCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdFundFundId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getInKindDonationsInKindDonationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getInKindDonationsInKindDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Fund\",\"value\":\"fund\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdPersonPersonId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getInKindDonationsInKindDonationIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdCampus_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonationsInKindDonationIdCampus_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonationsInKindDonationIdCampus_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"],\"getInKindDonationsInKindDonationIdCampus_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdFund_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getInKindDonationsInKindDonationIdFund_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonationsInKindDonationIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonationsInKindDonationIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"],\"getInKindDonationsInKindDonationIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getInKindDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Received On\",\"name\":\"wherereceivedOnFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Fund Id\",\"name\":\"wherefundid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Received On Ascending\",\"value\":\"received_on\"},{\"name\":\"Received On Descending\",\"value\":\"-received_on\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Fund\",\"value\":\"fund\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"],\"getInKindDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdPerson_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonationsInKindDonationIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonationsInKindDonationIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"],\"getInKindDonationsInKindDonationIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchInKindDonationsInKindDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Fund\",\"value\":\"fund\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchInKindDonationsInKindDonationId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Exchange Details\",\n      name: \"patchInKindDonationsInKindDonationId_exchangeDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Cents\",\n      name: \"patchInKindDonationsInKindDonationId_fairMarketValueCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received On\",\n      name: \"patchInKindDonationsInKindDonationId_receivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Valuation Details\",\n      name: \"patchInKindDonationsInKindDonationId_valuationDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Internal Notes\",\n      name: \"patchInKindDonationsInKindDonationId_internalNotes\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Currency\",\n      name: \"patchInKindDonationsInKindDonationId_fairMarketValueCurrency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchInKindDonationsInKindDonationId_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchInKindDonationsInKindDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"patchInKindDonationsInKindDonationId_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchInKindDonationsInKindDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchInKindDonationsInKindDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchInKindDonationsInKindDonationIdPersonPersonId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchInKindDonationsInKindDonationIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchInKindDonationsInKindDonationIdPersonPersonId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"]}},\n    },\n    {\n      displayName: \"Slug\",\n      name: \"postLabels_slug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"deleteLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"deleteLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"deleteLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"getLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"],\"getLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"patchLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Slug\",\n      name: \"patchLabelsLabelId_slug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"postPaymentSources_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Status\",\n      name: \"postPaymentSources_status\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Type\",\n      name: \"postPaymentSources_paymentSourceType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"deletePaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deletePaymentSourcesPaymentSourceIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"deletePaymentSourcesPaymentSourceId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"getPaymentSourcesPaymentSourceId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPaymentSourcesPaymentSourceIdDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n      options: [{\"displayName\":\"Received At\",\"name\":\"wherereceivedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Completed At\",\"name\":\"wherecompletedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Received At Ascending\",\"value\":\"received_at\"},{\"name\":\"Received At Descending\",\"value\":\"-received_at\"},{\"name\":\"Completed At Ascending\",\"value\":\"completed_at\"},{\"name\":\"Completed At Descending\",\"value\":\"-completed_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPaymentSourcesPaymentSourceIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPaymentSourcesPaymentSourceIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"],\"getPaymentSourcesPaymentSourceIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPaymentSources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPaymentSources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"],\"getPaymentSources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPaymentSourcesPaymentSourceId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchPaymentSourcesPaymentSourceId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Status\",\n      name: \"patchPaymentSourcesPaymentSourceId_status\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Type\",\n      name: \"patchPaymentSourcesPaymentSourceId_paymentSourceType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postPeoplePersonIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postPeoplePersonIdPledges_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Joint Giver\",\"value\":\"joint_giver\"},{\"name\":\"Pledge Campaign\",\"value\":\"pledge_campaign\"},{\"name\":\"Pledge Campaign Fund\",\"value\":\"pledge_campaign.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Amount Cents\",\n      name: \"postPeoplePersonIdPledges_amountCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postPeoplePersonIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"postPeoplePersonIdPledges_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"postPeoplePersonIdPledges_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign ID\",\n      name: \"postPeoplePersonIdPledges_pledgeCampaignIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdBatchGroupsBatchGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deletePeoplePersonIdBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdBatchesBatchId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deletePeoplePersonIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deletePeoplePersonIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"deletePeoplePersonIdInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatchesBatchId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getPeoplePersonIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdBatchesBatchId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getPeoplePersonIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Fund\",\"value\":\"fund\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Joint Giver Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_jointGiverId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodId\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodId_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Joint Giver\",\"value\":\"joint_giver\"},{\"name\":\"Pledge Campaign\",\"value\":\"pledge_campaign\"},{\"name\":\"Pledge Campaign Fund\",\"value\":\"pledge_campaign.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPledgesPledgeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Joint Giver\",\"value\":\"joint_giver\"},{\"name\":\"Pledge Campaign\",\"value\":\"pledge_campaign\"},{\"name\":\"Pledge Campaign Fund\",\"value\":\"pledge_campaign.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPrimaryCampusPrimaryCampusId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\"]}},\n    },\n    {\n      displayName: \"Primary Campus Id\",\n      name: \"getPeoplePersonIdPrimaryCampusPrimaryCampusId_primaryCampusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatchGroups_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdBatchGroups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n      options: [{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Committed\",\"value\":\"committed\"},{\"name\":\"In Progress\",\"value\":\"in_progress\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdBatchGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdBatchGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"],\"getPeoplePersonIdBatchGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatches_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdBatches_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n      options: [{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Committed\",\"value\":\"committed\"},{\"name\":\"In Progress\",\"value\":\"in_progress\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdBatches_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdBatches_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"],\"getPeoplePersonIdBatches_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n      options: [{\"displayName\":\"Received At\",\"name\":\"wherereceivedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Completed At\",\"name\":\"wherecompletedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Received At Ascending\",\"value\":\"received_at\"},{\"name\":\"Received At Descending\",\"value\":\"-received_at\"},{\"name\":\"Completed At Ascending\",\"value\":\"completed_at\"},{\"name\":\"Completed At Descending\",\"value\":\"-completed_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"],\"getPeoplePersonIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"],\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdInKindDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdInKindDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Received On\",\"name\":\"wherereceivedOnFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Fund Id\",\"name\":\"wherefundid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"},{\"name\":\"Received On Ascending\",\"value\":\"received_on\"},{\"name\":\"Received On Descending\",\"value\":\"-received_on\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Fund\",\"value\":\"fund\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdInKindDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdInKindDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"],\"getPeoplePersonIdInKindDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"],\"getPeoplePersonIdPledgesPledgeIdJointGiver_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getMe_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getMe_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"],\"getMe_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethods_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPaymentMethods_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPaymentMethods_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"],\"getPeoplePersonIdPaymentMethods_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeople_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Has Donated\",\"value\":\"has_donated\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n      options: [{\"displayName\":\"Starts At\",\"name\":\"wherestartsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Ends At\",\"name\":\"whereendsAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Fund Id\",\"name\":\"wherefundid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"},{\"name\":\"Ends At Ascending\",\"value\":\"ends_at\"},{\"name\":\"Ends At Descending\",\"value\":\"-ends_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"],\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Joint Giver\",\"value\":\"joint_giver\"},{\"name\":\"Pledge Campaign\",\"value\":\"pledge_campaign\"},{\"name\":\"Pledge Campaign Fund\",\"value\":\"pledge_campaign.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"],\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPledges_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n      options: [{\"displayName\":\"Created At\",\"name\":\"wherecreatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Updated At\",\"name\":\"whereupdatedAtFilter\",\"values\":[{\"displayName\":\"Operator\",\"name\":\"operator\",\"type\":\"options\",\"options\":[{\"name\":\"Equals\",\"value\":\"eq\"},{\"name\":\"Greater Than\",\"value\":\"gt\"},{\"name\":\"Greater Than Or Equal\",\"value\":\"gte\"},{\"name\":\"Less Than\",\"value\":\"lt\"},{\"name\":\"Less Than Or Equal\",\"value\":\"lte\"}],\"default\":\"eq\"},{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Joint Giver\",\"value\":\"joint_giver\"},{\"name\":\"Pledge Campaign\",\"value\":\"pledge_campaign\"},{\"name\":\"Pledge Campaign Fund\",\"value\":\"pledge_campaign.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledges_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledges_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"],\"getPeoplePersonIdPledges_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPrimaryCampus_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPrimaryCampus_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPrimaryCampus_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"],\"getPeoplePersonIdPrimaryCampus_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"],\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdRecurringDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getPeoplePersonIdRecurringDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdRecurringDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdRecurringDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"],\"getPeoplePersonIdRecurringDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdBatchesBatchId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchPeoplePersonIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdBatchesBatchId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Batch Group\",\"value\":\"batch_group\"},{\"name\":\"Batch Group Owner\",\"value\":\"batch_group.owner\"},{\"name\":\"Owner\",\"value\":\"owner\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdBatchesBatchId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchPeoplePersonIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdDonationsDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"},{\"name\":\"Labels\",\"value\":\"labels\"},{\"name\":\"Note\",\"value\":\"note\"},{\"name\":\"Refund\",\"value\":\"refund\"},{\"name\":\"Refund Designation Refunds\",\"value\":\"refund.designation_refunds\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchPeoplePersonIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchPeoplePersonIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchPeoplePersonIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchPeoplePersonIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPeoplePersonIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campus\",\"value\":\"campus\"},{\"name\":\"Fund\",\"value\":\"fund\"},{\"name\":\"Person\",\"value\":\"person\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Exchange Details\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_exchangeDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Cents\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fairMarketValueCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received On\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_receivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Valuation Details\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_valuationDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Internal Notes\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_internalNotes\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Currency\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fairMarketValueCurrency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Joint Giver Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_jointGiverId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchPeoplePersonId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Joint Giver\",\"value\":\"joint_giver\"},{\"name\":\"Pledge Campaign\",\"value\":\"pledge_campaign\"},{\"name\":\"Pledge Campaign Fund\",\"value\":\"pledge_campaign.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Amount Cents\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_amountCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Starts At\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_startsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ends At\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_endsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Goal Cents\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_goalCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Show Goal In Church Center\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_showGoalInChurchCenter\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchPeoplePersonIdPledgesPledgeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Joint Giver\",\"value\":\"joint_giver\"},{\"name\":\"Pledge Campaign\",\"value\":\"pledge_campaign\"},{\"name\":\"Pledge Campaign Fund\",\"value\":\"pledge_campaign.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Amount Cents\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_amountCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getRecurringDonationsRecurringDonationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Fund\",\"value\":\"fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"],\"getRecurringDonationsRecurringDonationIdDesignations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n      options: [{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Id\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"],\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"],\"getRecurringDonationsRecurringDonationIdPaymentMethod_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getRecurringDonations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Designations\",\"value\":\"designations\"},{\"name\":\"Designations Fund\",\"value\":\"designations.fund\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"],\"getRecurringDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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

export class PlanningCenterGiving implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Giving",
    name: "planningCenterGiving",
    icon: 'file:pco.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Planning Center Giving generated from the Planning Center OpenAPI snapshot.",
    defaults: {
      name: "Planning Center Giving",
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
        throw new Error(`Unsupported Planning Center Giving operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
