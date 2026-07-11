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
    "id": "deleteBatchGroupsBatchGroupId",
    "resource": "Batch Group",
    "operation": "DELETE /batch_groups/{batch_group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteBatchGroupsBatchGroupIdBatchesBatchId",
    "resource": "Batch Group",
    "operation": "DELETE /batch_groups/{batch_group_id}/batches/{batch_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchGroups",
    "resource": "Batch Group",
    "operation": "GET /batch_groups",
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
        "name": "whereownerfirstName",
        "sourceName": "where[owner][first_name]",
        "displayName": "Where[owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerlastName",
        "sourceName": "where[owner][last_name]",
        "displayName": "Where[owner][last Name]",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchGroupsBatchGroupId",
    "resource": "Batch Group",
    "operation": "GET /batch_groups/{batch_group_id}",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchGroupsBatchGroupIdBatches",
    "resource": "Batch Group",
    "operation": "GET /batch_groups/{batch_group_id}/batches",
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
        "name": "wherebatchGroupupdatedAt",
        "sourceName": "where[batch_group][updated_at]",
        "displayName": "Where[batch Group][updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtgt",
        "sourceName": "where[batch_group][updated_at][gt]",
        "displayName": "Where[batch Group][updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtgte",
        "sourceName": "where[batch_group][updated_at][gte]",
        "displayName": "Where[batch Group][updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtlt",
        "sourceName": "where[batch_group][updated_at][lt]",
        "displayName": "Where[batch Group][updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtlte",
        "sourceName": "where[batch_group][updated_at][lte]",
        "displayName": "Where[batch Group][updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerfirstName",
        "sourceName": "where[owner][first_name]",
        "displayName": "Where[owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerlastName",
        "sourceName": "where[owner][last_name]",
        "displayName": "Where[owner][last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupownerfirstName",
        "sourceName": "where[batch_group][owner][first_name]",
        "displayName": "Where[batch Group][owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupownerlastName",
        "sourceName": "where[batch_group][owner][last_name]",
        "displayName": "Where[batch Group][owner][last Name]",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchGroupsBatchGroupIdBatchesBatchId",
    "resource": "Batch Group",
    "operation": "GET /batch_groups/{batch_group_id}/batches/{batch_id}",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchGroupsBatchGroupIdOwner",
    "resource": "Batch Group",
    "operation": "GET /batch_groups/{batch_group_id}/owner",
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
    "queryParameters": [
      {
        "name": "wherefirstName",
        "sourceName": "where[first_name]",
        "displayName": "Where[first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelastName",
        "sourceName": "where[last_name]",
        "displayName": "Where[last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchGroupsBatchGroupIdOwnerOwnerId",
    "resource": "Batch Group",
    "operation": "GET /batch_groups/{batch_group_id}/owner/{owner_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchBatchGroupsBatchGroupId",
    "resource": "Batch Group",
    "operation": "PATCH /batch_groups/{batch_group_id}",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "operation": "PATCH /batch_groups/{batch_group_id}/batches/{batch_id}",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "operation": "PATCH /batch_groups/{batch_group_id}/owner/{owner_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
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
    "id": "postBatchGroups",
    "resource": "Batch Group",
    "operation": "POST /batch_groups",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "operation": "POST /batch_groups/{batch_group_id}/batches",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "operation": "POST /batch_groups/{batch_group_id}/commit",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteBatchesBatchId",
    "resource": "Batch",
    "operation": "DELETE /batches/{batch_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteBatchesBatchIdBatchGroupBatchGroupId",
    "resource": "Batch",
    "operation": "DELETE /batches/{batch_id}/batch_group/{batch_group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteBatchesBatchIdDonationsDonationId",
    "resource": "Batch",
    "operation": "DELETE /batches/{batch_id}/donations/{donation_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatches",
    "resource": "Batch",
    "operation": "GET /batches",
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
        "name": "wherebatchGroupupdatedAt",
        "sourceName": "where[batch_group][updated_at]",
        "displayName": "Where[batch Group][updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtgt",
        "sourceName": "where[batch_group][updated_at][gt]",
        "displayName": "Where[batch Group][updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtgte",
        "sourceName": "where[batch_group][updated_at][gte]",
        "displayName": "Where[batch Group][updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtlt",
        "sourceName": "where[batch_group][updated_at][lt]",
        "displayName": "Where[batch Group][updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtlte",
        "sourceName": "where[batch_group][updated_at][lte]",
        "displayName": "Where[batch Group][updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerfirstName",
        "sourceName": "where[owner][first_name]",
        "displayName": "Where[owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerlastName",
        "sourceName": "where[owner][last_name]",
        "displayName": "Where[owner][last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupownerfirstName",
        "sourceName": "where[batch_group][owner][first_name]",
        "displayName": "Where[batch Group][owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupownerlastName",
        "sourceName": "where[batch_group][owner][last_name]",
        "displayName": "Where[batch Group][owner][last Name]",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchesBatchId",
    "resource": "Batch",
    "operation": "GET /batches/{batch_id}",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchesBatchIdBatchGroup",
    "resource": "Batch",
    "operation": "GET /batches/{batch_id}/batch_group",
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
        "name": "whereownerfirstName",
        "sourceName": "where[owner][first_name]",
        "displayName": "Where[owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerlastName",
        "sourceName": "where[owner][last_name]",
        "displayName": "Where[owner][last Name]",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchesBatchIdBatchGroupBatchGroupId",
    "resource": "Batch",
    "operation": "GET /batches/{batch_id}/batch_group/{batch_group_id}",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchesBatchIdDonations",
    "resource": "Batch",
    "operation": "GET /batches/{batch_id}/donations",
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
        "name": "wherepaymentMethod",
        "sourceName": "where[payment_method]",
        "displayName": "Where[payment Method]",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelabelsslug",
        "sourceName": "where[labels][slug]",
        "displayName": "Where[labels][slug]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchesBatchIdDonationsDonationId",
    "resource": "Batch",
    "operation": "GET /batches/{batch_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchesBatchIdOwner",
    "resource": "Batch",
    "operation": "GET /batches/{batch_id}/owner",
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
    "queryParameters": [
      {
        "name": "wherefirstName",
        "sourceName": "where[first_name]",
        "displayName": "Where[first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelastName",
        "sourceName": "where[last_name]",
        "displayName": "Where[last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getBatchesBatchIdOwnerOwnerId",
    "resource": "Batch",
    "operation": "GET /batches/{batch_id}/owner/{owner_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchBatchesBatchId",
    "resource": "Batch",
    "operation": "PATCH /batches/{batch_id}",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "id": "patchBatchesBatchIdBatchGroupBatchGroupId",
    "resource": "Batch",
    "operation": "PATCH /batches/{batch_id}/batch_group/{batch_group_id}",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "id": "patchBatchesBatchIdDonationsDonationId",
    "resource": "Batch",
    "operation": "PATCH /batches/{batch_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "operation": "PATCH /batches/{batch_id}/owner/{owner_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
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
    "operation": "POST /batches",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "operation": "POST /batches/{batch_id}/commit",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "postBatchesBatchIdDonations",
    "resource": "Batch",
    "operation": "POST /batches/{batch_id}/donations",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "id": "deleteCampusesCampusIdDonationsDonationId",
    "resource": "Campus",
    "operation": "DELETE /campuses/{campus_id}/donations/{donation_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampuses",
    "resource": "Campus",
    "operation": "GET /campuses",
    "description": "GET /campuses",
    "method": "GET",
    "path": "/giving/v2/campuses",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
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
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusIdDonations",
    "resource": "Campus",
    "operation": "GET /campuses/{campus_id}/donations",
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
        "name": "wherepaymentMethod",
        "sourceName": "where[payment_method]",
        "displayName": "Where[payment Method]",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelabelsslug",
        "sourceName": "where[labels][slug]",
        "displayName": "Where[labels][slug]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusIdDonationsDonationId",
    "resource": "Campus",
    "operation": "GET /campuses/{campus_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchCampusesCampusIdDonationsDonationId",
    "resource": "Campus",
    "operation": "PATCH /campuses/{campus_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "id": "deleteDonationsDonationId",
    "resource": "Donation",
    "operation": "DELETE /donations/{donation_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteDonationsDonationIdDesignationsDesignationIdFundFundId",
    "resource": "Donation",
    "operation": "DELETE /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteDonationsDonationIdLabelsLabelId",
    "resource": "Donation",
    "operation": "DELETE /donations/{donation_id}/labels/{label_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonations",
    "resource": "Donation",
    "operation": "GET /donations",
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
        "name": "wherepaymentMethod",
        "sourceName": "where[payment_method]",
        "displayName": "Where[payment Method]",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelabelsslug",
        "sourceName": "where[labels][slug]",
        "displayName": "Where[labels][slug]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationId",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdCampus",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/campus",
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
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdCampusCampusId",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/campus/{campus_id}",
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
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdDesignations",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/designations",
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
        "name": "wherefunddefault",
        "sourceName": "where[fund][default]",
        "displayName": "Where[fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherefundname",
        "sourceName": "where[fund][name]",
        "displayName": "Where[fund][name]",
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
        "name": "wherefundvisibility",
        "sourceName": "where[fund][visibility]",
        "displayName": "Where[fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdDesignationsDesignationId",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/designations/{designation_id}",
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
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdDesignationsDesignationIdFund",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/designations/{designation_id}/fund",
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
        "name": "wheredefault",
        "sourceName": "where[default]",
        "displayName": "Where[default]",
        "required": false,
        "type": "boolean"
      },
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
      },
      {
        "name": "wherevisibility",
        "sourceName": "where[visibility]",
        "displayName": "Where[visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdDesignationsDesignationIdFundFundId",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdLabels",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/labels",
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
    "queryParameters": [
      {
        "name": "whereslug",
        "sourceName": "where[slug]",
        "displayName": "Where[slug]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdLabelsLabelId",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/labels/{label_id}",
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
    "queryParameters": [
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdNote",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/note",
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
    "queryParameters": [
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdRefund",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/refund",
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
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdRefundDesignationRefunds",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/refund/designation_refunds",
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
        "name": "wheredesignationfunddefault",
        "sourceName": "where[designation][fund][default]",
        "displayName": "Where[designation][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationfundname",
        "sourceName": "where[designation][fund][name]",
        "displayName": "Where[designation][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationfundid",
        "sourceName": "where[designation][fund][id]",
        "displayName": "Where[designation][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationfundvisibility",
        "sourceName": "where[designation][fund][visibility]",
        "displayName": "Where[designation][fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdRefundDesignationRefundsDesignationRefundId",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}",
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
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation",
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
        "name": "wherefunddefault",
        "sourceName": "where[fund][default]",
        "displayName": "Where[fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherefundname",
        "sourceName": "where[fund][name]",
        "displayName": "Where[fund][name]",
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
        "name": "wherefundvisibility",
        "sourceName": "where[fund][visibility]",
        "displayName": "Where[fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId",
    "resource": "Donation",
    "operation": "GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation/{designation_id}",
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
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchDonationsDonationId",
    "resource": "Donation",
    "operation": "PATCH /donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "operation": "PATCH /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
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
    "operation": "PATCH /donations/{donation_id}/labels/{label_id}",
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
    "queryParameters": [
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      }
    ],
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
    "id": "postDonationsDonationIdIssueRefund",
    "resource": "Donation",
    "operation": "POST /donations/{donation_id}/issue_refund",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteFundsFundId",
    "resource": "Fund",
    "operation": "DELETE /funds/{fund_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getFunds",
    "resource": "Fund",
    "operation": "GET /funds",
    "description": "GET /funds",
    "method": "GET",
    "path": "/giving/v2/funds",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "wheredefault",
        "sourceName": "where[default]",
        "displayName": "Where[default]",
        "required": false,
        "type": "boolean"
      },
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
      },
      {
        "name": "wherevisibility",
        "sourceName": "where[visibility]",
        "displayName": "Where[visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getFundsFundId",
    "resource": "Fund",
    "operation": "GET /funds/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchFundsFundId",
    "resource": "Fund",
    "operation": "PATCH /funds/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
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
    "id": "postFunds",
    "resource": "Fund",
    "operation": "POST /funds",
    "description": "POST /funds",
    "method": "POST",
    "path": "/giving/v2/funds",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
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
    "id": "deleteInKindDonationsInKindDonationId",
    "resource": "In Kind Donation",
    "operation": "DELETE /in_kind_donations/{in_kind_donation_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deleteInKindDonationsInKindDonationIdFundFundId",
    "resource": "In Kind Donation",
    "operation": "DELETE /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonations",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecampusId",
        "sourceName": "where[campus_id]",
        "displayName": "Where[campus Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherefunddefault",
        "sourceName": "where[fund][default]",
        "displayName": "Where[fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherefundname",
        "sourceName": "where[fund][name]",
        "displayName": "Where[fund][name]",
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
        "name": "wherefundvisibility",
        "sourceName": "where[fund][visibility]",
        "displayName": "Where[fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepersonfirstName",
        "sourceName": "where[person][first_name]",
        "displayName": "Where[person][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepersonlastName",
        "sourceName": "where[person][last_name]",
        "displayName": "Where[person][last Name]",
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
      },
      {
        "name": "fieldsInKindDonation",
        "sourceName": "fields[InKindDonation]",
        "displayName": "Fields[In Kind Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonationsInKindDonationId",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations/{in_kind_donation_id}",
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
      },
      {
        "name": "fieldsInKindDonation",
        "sourceName": "fields[InKindDonation]",
        "displayName": "Fields[In Kind Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonationsInKindDonationIdCampus",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations/{in_kind_donation_id}/campus",
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
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonationsInKindDonationIdCampusCampusId",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations/{in_kind_donation_id}/campus/{campus_id}",
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
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonationsInKindDonationIdFund",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations/{in_kind_donation_id}/fund",
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
        "name": "wheredefault",
        "sourceName": "where[default]",
        "displayName": "Where[default]",
        "required": false,
        "type": "boolean"
      },
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
      },
      {
        "name": "wherevisibility",
        "sourceName": "where[visibility]",
        "displayName": "Where[visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonationsInKindDonationIdFundFundId",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonationsInKindDonationIdPerson",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations/{in_kind_donation_id}/person",
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
    "queryParameters": [
      {
        "name": "wherefirstName",
        "sourceName": "where[first_name]",
        "displayName": "Where[first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelastName",
        "sourceName": "where[last_name]",
        "displayName": "Where[last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getInKindDonationsInKindDonationIdPersonPersonId",
    "resource": "In Kind Donation",
    "operation": "GET /in_kind_donations/{in_kind_donation_id}/person/{person_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchInKindDonationsInKindDonationId",
    "resource": "In Kind Donation",
    "operation": "PATCH /in_kind_donations/{in_kind_donation_id}",
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
      },
      {
        "name": "fieldsInKindDonation",
        "sourceName": "fields[InKindDonation]",
        "displayName": "Fields[In Kind Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "id": "patchInKindDonationsInKindDonationIdFundFundId",
    "resource": "In Kind Donation",
    "operation": "PATCH /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
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
    "id": "patchInKindDonationsInKindDonationIdPersonPersonId",
    "resource": "In Kind Donation",
    "operation": "PATCH /in_kind_donations/{in_kind_donation_id}/person/{person_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
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
    "id": "postInKindDonations",
    "resource": "In Kind Donation",
    "operation": "POST /in_kind_donations",
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
      },
      {
        "name": "fieldsInKindDonation",
        "sourceName": "fields[InKindDonation]",
        "displayName": "Fields[In Kind Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "id": "deleteLabelsLabelId",
    "resource": "Label",
    "operation": "DELETE /labels/{label_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabels",
    "resource": "Label",
    "operation": "GET /labels",
    "description": "GET /labels",
    "method": "GET",
    "path": "/giving/v2/labels",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "whereslug",
        "sourceName": "where[slug]",
        "displayName": "Where[slug]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getLabelsLabelId",
    "resource": "Label",
    "operation": "GET /labels/{label_id}",
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
    "queryParameters": [
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchLabelsLabelId",
    "resource": "Label",
    "operation": "PATCH /labels/{label_id}",
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
    "queryParameters": [
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      }
    ],
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
    "id": "postLabels",
    "resource": "Label",
    "operation": "POST /labels",
    "description": "POST /labels",
    "method": "POST",
    "path": "/giving/v2/labels",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      }
    ],
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
    "id": "deletePaymentSourcesPaymentSourceId",
    "resource": "Payment Source",
    "operation": "DELETE /payment_sources/{payment_source_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePaymentSourcesPaymentSourceIdDonationsDonationId",
    "resource": "Payment Source",
    "operation": "DELETE /payment_sources/{payment_source_id}/donations/{donation_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPaymentSources",
    "resource": "Payment Source",
    "operation": "GET /payment_sources",
    "description": "GET /payment_sources",
    "method": "GET",
    "path": "/giving/v2/payment_sources",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "fieldsPaymentSource",
        "sourceName": "fields[PaymentSource]",
        "displayName": "Fields[Payment Source]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPaymentSourcesPaymentSourceId",
    "resource": "Payment Source",
    "operation": "GET /payment_sources/{payment_source_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPaymentSource",
        "sourceName": "fields[PaymentSource]",
        "displayName": "Fields[Payment Source]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPaymentSourcesPaymentSourceIdDonations",
    "resource": "Payment Source",
    "operation": "GET /payment_sources/{payment_source_id}/donations",
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
        "name": "wherepaymentMethod",
        "sourceName": "where[payment_method]",
        "displayName": "Where[payment Method]",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelabelsslug",
        "sourceName": "where[labels][slug]",
        "displayName": "Where[labels][slug]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPaymentSourcesPaymentSourceIdDonationsDonationId",
    "resource": "Payment Source",
    "operation": "GET /payment_sources/{payment_source_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchPaymentSourcesPaymentSourceId",
    "resource": "Payment Source",
    "operation": "PATCH /payment_sources/{payment_source_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPaymentSource",
        "sourceName": "fields[PaymentSource]",
        "displayName": "Fields[Payment Source]",
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
    "id": "patchPaymentSourcesPaymentSourceIdDonationsDonationId",
    "resource": "Payment Source",
    "operation": "PATCH /payment_sources/{payment_source_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "id": "postPaymentSources",
    "resource": "Payment Source",
    "operation": "POST /payment_sources",
    "description": "POST /payment_sources",
    "method": "POST",
    "path": "/giving/v2/payment_sources",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "fieldsPaymentSource",
        "sourceName": "fields[PaymentSource]",
        "displayName": "Fields[Payment Source]",
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
    "id": "deletePeoplePersonIdBatchGroupsBatchGroupId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/batch_groups/{batch_group_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdBatchesBatchId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/batches/{batch_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdDonationsDonationId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/donations/{donation_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdInKindDonationsInKindDonationId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/in_kind_donations/{in_kind_donation_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdPledgesPledgeId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/pledges/{pledge_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
    "resource": "Person",
    "operation": "DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getMe",
    "resource": "Person",
    "operation": "GET /me",
    "description": "GET /me",
    "method": "GET",
    "path": "/giving/v2/me",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeople",
    "resource": "Person",
    "operation": "GET /people",
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
      },
      {
        "name": "wherefirstName",
        "sourceName": "where[first_name]",
        "displayName": "Where[first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelastName",
        "sourceName": "where[last_name]",
        "displayName": "Where[last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdBatchGroups",
    "resource": "Person",
    "operation": "GET /people/{person_id}/batch_groups",
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
        "name": "whereownerfirstName",
        "sourceName": "where[owner][first_name]",
        "displayName": "Where[owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerlastName",
        "sourceName": "where[owner][last_name]",
        "displayName": "Where[owner][last Name]",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdBatchGroupsBatchGroupId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/batch_groups/{batch_group_id}",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdBatches",
    "resource": "Person",
    "operation": "GET /people/{person_id}/batches",
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
        "name": "wherebatchGroupupdatedAt",
        "sourceName": "where[batch_group][updated_at]",
        "displayName": "Where[batch Group][updated At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtgt",
        "sourceName": "where[batch_group][updated_at][gt]",
        "displayName": "Where[batch Group][updated At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtgte",
        "sourceName": "where[batch_group][updated_at][gte]",
        "displayName": "Where[batch Group][updated At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtlt",
        "sourceName": "where[batch_group][updated_at][lt]",
        "displayName": "Where[batch Group][updated At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupupdatedAtlte",
        "sourceName": "where[batch_group][updated_at][lte]",
        "displayName": "Where[batch Group][updated At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerfirstName",
        "sourceName": "where[owner][first_name]",
        "displayName": "Where[owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereownerlastName",
        "sourceName": "where[owner][last_name]",
        "displayName": "Where[owner][last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupownerfirstName",
        "sourceName": "where[batch_group][owner][first_name]",
        "displayName": "Where[batch Group][owner][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherebatchGroupownerlastName",
        "sourceName": "where[batch_group][owner][last_name]",
        "displayName": "Where[batch Group][owner][last Name]",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdBatchesBatchId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/batches/{batch_id}",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdDonations",
    "resource": "Person",
    "operation": "GET /people/{person_id}/donations",
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
        "name": "wherepaymentMethod",
        "sourceName": "where[payment_method]",
        "displayName": "Where[payment Method]",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelabelsslug",
        "sourceName": "where[labels][slug]",
        "displayName": "Where[labels][slug]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdDonationsDonationId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdInKindDonations",
    "resource": "Person",
    "operation": "GET /people/{person_id}/in_kind_donations",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherecampusId",
        "sourceName": "where[campus_id]",
        "displayName": "Where[campus Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherefunddefault",
        "sourceName": "where[fund][default]",
        "displayName": "Where[fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherefundname",
        "sourceName": "where[fund][name]",
        "displayName": "Where[fund][name]",
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
        "name": "wherefundvisibility",
        "sourceName": "where[fund][visibility]",
        "displayName": "Where[fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepersonfirstName",
        "sourceName": "where[person][first_name]",
        "displayName": "Where[person][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepersonlastName",
        "sourceName": "where[person][last_name]",
        "displayName": "Where[person][last Name]",
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
      },
      {
        "name": "fieldsInKindDonation",
        "sourceName": "fields[InKindDonation]",
        "displayName": "Fields[In Kind Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdInKindDonationsInKindDonationId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/in_kind_donations/{in_kind_donation_id}",
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
      },
      {
        "name": "fieldsInKindDonation",
        "sourceName": "fields[InKindDonation]",
        "displayName": "Fields[In Kind Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPaymentMethods",
    "resource": "Person",
    "operation": "GET /people/{person_id}/payment_methods",
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
    "queryParameters": [
      {
        "name": "fieldsPaymentMethod",
        "sourceName": "fields[PaymentMethod]",
        "displayName": "Fields[Payment Method]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPaymentMethodsPaymentMethodId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/payment_methods/{payment_method_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPaymentMethod",
        "sourceName": "fields[PaymentMethod]",
        "displayName": "Fields[Payment Method]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations",
    "resource": "Person",
    "operation": "GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations",
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
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonation",
        "sourceName": "fields[RecurringDonation]",
        "displayName": "Fields[Recurring Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations/{recurring_donation_id}",
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
      },
      {
        "name": "fieldsRecurringDonation",
        "sourceName": "fields[RecurringDonation]",
        "displayName": "Fields[Recurring Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledges",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges",
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
        "name": "wherejointGiverfirstName",
        "sourceName": "where[joint_giver][first_name]",
        "displayName": "Where[joint Giver][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherejointGiverlastName",
        "sourceName": "where[joint_giver][last_name]",
        "displayName": "Where[joint Giver][last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAt",
        "sourceName": "where[pledge_campaign][starts_at]",
        "displayName": "Where[pledge Campaign][starts At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtgt",
        "sourceName": "where[pledge_campaign][starts_at][gt]",
        "displayName": "Where[pledge Campaign][starts At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtgte",
        "sourceName": "where[pledge_campaign][starts_at][gte]",
        "displayName": "Where[pledge Campaign][starts At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtlt",
        "sourceName": "where[pledge_campaign][starts_at][lt]",
        "displayName": "Where[pledge Campaign][starts At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtlte",
        "sourceName": "where[pledge_campaign][starts_at][lte]",
        "displayName": "Where[pledge Campaign][starts At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAt",
        "sourceName": "where[pledge_campaign][ends_at]",
        "displayName": "Where[pledge Campaign][ends At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtgt",
        "sourceName": "where[pledge_campaign][ends_at][gt]",
        "displayName": "Where[pledge Campaign][ends At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtgte",
        "sourceName": "where[pledge_campaign][ends_at][gte]",
        "displayName": "Where[pledge Campaign][ends At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtlt",
        "sourceName": "where[pledge_campaign][ends_at][lt]",
        "displayName": "Where[pledge Campaign][ends At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtlte",
        "sourceName": "where[pledge_campaign][ends_at][lte]",
        "displayName": "Where[pledge Campaign][ends At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfundId",
        "sourceName": "where[pledge_campaign][fund_id]",
        "displayName": "Where[pledge Campaign][fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfunddefault",
        "sourceName": "where[pledge_campaign][fund][default]",
        "displayName": "Where[pledge Campaign][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherepledgeCampaignfundname",
        "sourceName": "where[pledge_campaign][fund][name]",
        "displayName": "Where[pledge Campaign][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfundid",
        "sourceName": "where[pledge_campaign][fund][id]",
        "displayName": "Where[pledge Campaign][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfundvisibility",
        "sourceName": "where[pledge_campaign][fund][visibility]",
        "displayName": "Where[pledge Campaign][fund][visibility]",
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
      },
      {
        "name": "fieldsPledge",
        "sourceName": "fields[Pledge]",
        "displayName": "Fields[Pledge]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}",
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
      },
      {
        "name": "fieldsPledge",
        "sourceName": "fields[Pledge]",
        "displayName": "Fields[Pledge]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdJointGiver",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/joint_giver",
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
    "queryParameters": [
      {
        "name": "wherefirstName",
        "sourceName": "where[first_name]",
        "displayName": "Where[first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherelastName",
        "sourceName": "where[last_name]",
        "displayName": "Where[last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaign",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign",
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
        "name": "wherefundId",
        "sourceName": "where[fund_id]",
        "displayName": "Where[fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherefunddefault",
        "sourceName": "where[fund][default]",
        "displayName": "Where[fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherefundname",
        "sourceName": "where[fund][name]",
        "displayName": "Where[fund][name]",
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
        "name": "wherefundvisibility",
        "sourceName": "where[fund][visibility]",
        "displayName": "Where[fund][visibility]",
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
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
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
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund",
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
        "name": "wheredefault",
        "sourceName": "where[default]",
        "displayName": "Where[default]",
        "required": false,
        "type": "boolean"
      },
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
      },
      {
        "name": "wherevisibility",
        "sourceName": "where[visibility]",
        "displayName": "Where[visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges",
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
        "name": "wherejointGiverfirstName",
        "sourceName": "where[joint_giver][first_name]",
        "displayName": "Where[joint Giver][first Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherejointGiverlastName",
        "sourceName": "where[joint_giver][last_name]",
        "displayName": "Where[joint Giver][last Name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAt",
        "sourceName": "where[pledge_campaign][starts_at]",
        "displayName": "Where[pledge Campaign][starts At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtgt",
        "sourceName": "where[pledge_campaign][starts_at][gt]",
        "displayName": "Where[pledge Campaign][starts At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtgte",
        "sourceName": "where[pledge_campaign][starts_at][gte]",
        "displayName": "Where[pledge Campaign][starts At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtlt",
        "sourceName": "where[pledge_campaign][starts_at][lt]",
        "displayName": "Where[pledge Campaign][starts At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignstartsAtlte",
        "sourceName": "where[pledge_campaign][starts_at][lte]",
        "displayName": "Where[pledge Campaign][starts At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAt",
        "sourceName": "where[pledge_campaign][ends_at]",
        "displayName": "Where[pledge Campaign][ends At]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtgt",
        "sourceName": "where[pledge_campaign][ends_at][gt]",
        "displayName": "Where[pledge Campaign][ends At][gt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtgte",
        "sourceName": "where[pledge_campaign][ends_at][gte]",
        "displayName": "Where[pledge Campaign][ends At][gte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtlt",
        "sourceName": "where[pledge_campaign][ends_at][lt]",
        "displayName": "Where[pledge Campaign][ends At][lt]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignendsAtlte",
        "sourceName": "where[pledge_campaign][ends_at][lte]",
        "displayName": "Where[pledge Campaign][ends At][lte]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfundId",
        "sourceName": "where[pledge_campaign][fund_id]",
        "displayName": "Where[pledge Campaign][fund Id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfunddefault",
        "sourceName": "where[pledge_campaign][fund][default]",
        "displayName": "Where[pledge Campaign][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherepledgeCampaignfundname",
        "sourceName": "where[pledge_campaign][fund][name]",
        "displayName": "Where[pledge Campaign][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfundid",
        "sourceName": "where[pledge_campaign][fund][id]",
        "displayName": "Where[pledge Campaign][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherepledgeCampaignfundvisibility",
        "sourceName": "where[pledge_campaign][fund][visibility]",
        "displayName": "Where[pledge Campaign][fund][visibility]",
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
      },
      {
        "name": "fieldsPledge",
        "sourceName": "fields[Pledge]",
        "displayName": "Fields[Pledge]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
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
      },
      {
        "name": "fieldsPledge",
        "sourceName": "fields[Pledge]",
        "displayName": "Fields[Pledge]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPrimaryCampus",
    "resource": "Person",
    "operation": "GET /people/{person_id}/primary_campus",
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
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdPrimaryCampusPrimaryCampusId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/primary_campus/{primary_campus_id}",
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
    "queryParameters": [
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdRecurringDonations",
    "resource": "Person",
    "operation": "GET /people/{person_id}/recurring_donations",
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
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonation",
        "sourceName": "fields[RecurringDonation]",
        "displayName": "Fields[Recurring Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonIdRecurringDonationsRecurringDonationId",
    "resource": "Person",
    "operation": "GET /people/{person_id}/recurring_donations/{recurring_donation_id}",
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
      },
      {
        "name": "fieldsRecurringDonation",
        "sourceName": "fields[RecurringDonation]",
        "displayName": "Fields[Recurring Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchPeoplePersonId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
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
    "id": "patchPeoplePersonIdBatchGroupsBatchGroupId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/batch_groups/{batch_group_id}",
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
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "operation": "PATCH /people/{person_id}/batches/{batch_id}",
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
      },
      {
        "name": "fieldsBatch",
        "sourceName": "fields[Batch]",
        "displayName": "Fields[Batch]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsBatchGroup",
        "sourceName": "fields[BatchGroup]",
        "displayName": "Fields[Batch Group]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "operation": "PATCH /people/{person_id}/donations/{donation_id}",
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
      },
      {
        "name": "fieldsDonation",
        "sourceName": "fields[Donation]",
        "displayName": "Fields[Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignation",
        "sourceName": "fields[Designation]",
        "displayName": "Fields[Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsLabel",
        "sourceName": "fields[Label]",
        "displayName": "Fields[Label]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsNote",
        "sourceName": "fields[Note]",
        "displayName": "Fields[Note]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRefund",
        "sourceName": "fields[Refund]",
        "displayName": "Fields[Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsDesignationRefund",
        "sourceName": "fields[DesignationRefund]",
        "displayName": "Fields[Designation Refund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "id": "patchPeoplePersonIdInKindDonationsInKindDonationId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/in_kind_donations/{in_kind_donation_id}",
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
      },
      {
        "name": "fieldsInKindDonation",
        "sourceName": "fields[InKindDonation]",
        "displayName": "Fields[In Kind Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsCampus",
        "sourceName": "fields[Campus]",
        "displayName": "Fields[Campus]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
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
    "id": "patchPeoplePersonIdPledgesPledgeId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/pledges/{pledge_id}",
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
      },
      {
        "name": "fieldsPledge",
        "sourceName": "fields[Pledge]",
        "displayName": "Fields[Pledge]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "id": "patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      }
    ],
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
    "id": "patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}",
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
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
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
    "id": "patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
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
    "id": "patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId",
    "resource": "Person",
    "operation": "PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}",
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
      },
      {
        "name": "fieldsPledge",
        "sourceName": "fields[Pledge]",
        "displayName": "Fields[Pledge]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "id": "postPeoplePersonIdPledges",
    "resource": "Person",
    "operation": "POST /people/{person_id}/pledges",
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
      },
      {
        "name": "fieldsPledge",
        "sourceName": "fields[Pledge]",
        "displayName": "Fields[Pledge]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPerson",
        "sourceName": "fields[Person]",
        "displayName": "Fields[Person]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsPledgeCampaign",
        "sourceName": "fields[PledgeCampaign]",
        "displayName": "Fields[Pledge Campaign]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
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
    "id": "deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId",
    "resource": "Recurring Donation",
    "operation": "DELETE /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
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
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonations",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations",
    "description": "GET /recurring_donations",
    "method": "GET",
    "path": "/giving/v2/recurring_donations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "wheredesignationsfunddefault",
        "sourceName": "where[designations][fund][default]",
        "displayName": "Where[designations][fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wheredesignationsfundname",
        "sourceName": "where[designations][fund][name]",
        "displayName": "Where[designations][fund][name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundid",
        "sourceName": "where[designations][fund][id]",
        "displayName": "Where[designations][fund][id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wheredesignationsfundvisibility",
        "sourceName": "where[designations][fund][visibility]",
        "displayName": "Where[designations][fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonation",
        "sourceName": "fields[RecurringDonation]",
        "displayName": "Fields[Recurring Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationId",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations/{recurring_donation_id}",
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
      },
      {
        "name": "fieldsRecurringDonation",
        "sourceName": "fields[RecurringDonation]",
        "displayName": "Fields[Recurring Donation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationIdDesignations",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations/{recurring_donation_id}/designations",
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
        "name": "wherefunddefault",
        "sourceName": "where[fund][default]",
        "displayName": "Where[fund][default]",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "wherefundname",
        "sourceName": "where[fund][name]",
        "displayName": "Where[fund][name]",
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
        "name": "wherefundvisibility",
        "sourceName": "where[fund][visibility]",
        "displayName": "Where[fund][visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationIdDesignationsDesignationId",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations/{recurring_donation_id}/designations/{designation_id}",
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
      },
      {
        "name": "fieldsRecurringDonationDesignation",
        "sourceName": "fields[RecurringDonationDesignation]",
        "displayName": "Fields[Recurring Donation Designation]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund",
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
        "name": "wheredefault",
        "sourceName": "where[default]",
        "displayName": "Where[default]",
        "required": false,
        "type": "boolean"
      },
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
      },
      {
        "name": "wherevisibility",
        "sourceName": "where[visibility]",
        "displayName": "Where[visibility]",
        "required": false,
        "type": "string"
      },
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationIdPaymentMethod",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations/{recurring_donation_id}/payment_method",
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
    "queryParameters": [
      {
        "name": "fieldsPaymentMethod",
        "sourceName": "fields[PaymentMethod]",
        "displayName": "Fields[Payment Method]",
        "required": false,
        "type": "string"
      },
      {
        "name": "perPage",
        "sourceName": "per_page",
        "displayName": "Per Page",
        "required": false,
        "type": "number"
      },
      {
        "name": "offset",
        "sourceName": "offset",
        "displayName": "Offset",
        "required": false,
        "type": "number"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId",
    "resource": "Recurring Donation",
    "operation": "GET /recurring_donations/{recurring_donation_id}/payment_method/{payment_method_id}",
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
    "queryParameters": [
      {
        "name": "fieldsPaymentMethod",
        "sourceName": "fields[PaymentMethod]",
        "displayName": "Fields[Payment Method]",
        "required": false,
        "type": "string"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId",
    "resource": "Recurring Donation",
    "operation": "PATCH /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}",
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
    "queryParameters": [
      {
        "name": "fieldsFund",
        "sourceName": "fields[Fund]",
        "displayName": "Fields[Fund]",
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

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Batch\",\"value\":\"Batch\"},{\"name\":\"Batch Group\",\"value\":\"Batch Group\"},{\"name\":\"Campus\",\"value\":\"Campus\"},{\"name\":\"Donation\",\"value\":\"Donation\"},{\"name\":\"Fund\",\"value\":\"Fund\"},{\"name\":\"In Kind Donation\",\"value\":\"In Kind Donation\"},{\"name\":\"Label\",\"value\":\"Label\"},{\"name\":\"Payment Source\",\"value\":\"Payment Source\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Recurring Donation\",\"value\":\"Recurring Donation\"}],\n      default: \"Batch\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"]}},\n      options: [{\"name\":\"DELETE /batches/{batch_id}\",\"value\":\"deleteBatchesBatchId\",\"description\":\"DELETE /batches/{batch_id}\",\"action\":\"DELETE /batches/{batch_id}\"},{\"name\":\"DELETE /batches/{batch_id}/batch_group/{batch_group_id}\",\"value\":\"deleteBatchesBatchIdBatchGroupBatchGroupId\",\"description\":\"DELETE /batches/{batch_id}/batch_group/{batch_group_id}\",\"action\":\"DELETE /batches/{batch_id}/batch_group/{batch_group_id}\"},{\"name\":\"DELETE /batches/{batch_id}/donations/{donation_id}\",\"value\":\"deleteBatchesBatchIdDonationsDonationId\",\"description\":\"DELETE /batches/{batch_id}/donations/{donation_id}\",\"action\":\"DELETE /batches/{batch_id}/donations/{donation_id}\"},{\"name\":\"GET /batches\",\"value\":\"getBatches\",\"description\":\"GET /batches\",\"action\":\"GET /batches\"},{\"name\":\"GET /batches/{batch_id}\",\"value\":\"getBatchesBatchId\",\"description\":\"GET /batches/{batch_id}\",\"action\":\"GET /batches/{batch_id}\"},{\"name\":\"GET /batches/{batch_id}/batch_group\",\"value\":\"getBatchesBatchIdBatchGroup\",\"description\":\"GET /batches/{batch_id}/batch_group\",\"action\":\"GET /batches/{batch_id}/batch_group\"},{\"name\":\"GET /batches/{batch_id}/batch_group/{batch_group_id}\",\"value\":\"getBatchesBatchIdBatchGroupBatchGroupId\",\"description\":\"GET /batches/{batch_id}/batch_group/{batch_group_id}\",\"action\":\"GET /batches/{batch_id}/batch_group/{batch_group_id}\"},{\"name\":\"GET /batches/{batch_id}/donations\",\"value\":\"getBatchesBatchIdDonations\",\"description\":\"GET /batches/{batch_id}/donations\",\"action\":\"GET /batches/{batch_id}/donations\"},{\"name\":\"GET /batches/{batch_id}/donations/{donation_id}\",\"value\":\"getBatchesBatchIdDonationsDonationId\",\"description\":\"GET /batches/{batch_id}/donations/{donation_id}\",\"action\":\"GET /batches/{batch_id}/donations/{donation_id}\"},{\"name\":\"GET /batches/{batch_id}/owner\",\"value\":\"getBatchesBatchIdOwner\",\"description\":\"GET /batches/{batch_id}/owner\",\"action\":\"GET /batches/{batch_id}/owner\"},{\"name\":\"GET /batches/{batch_id}/owner/{owner_id}\",\"value\":\"getBatchesBatchIdOwnerOwnerId\",\"description\":\"GET /batches/{batch_id}/owner/{owner_id}\",\"action\":\"GET /batches/{batch_id}/owner/{owner_id}\"},{\"name\":\"PATCH /batches/{batch_id}\",\"value\":\"patchBatchesBatchId\",\"description\":\"PATCH /batches/{batch_id}\",\"action\":\"PATCH /batches/{batch_id}\"},{\"name\":\"PATCH /batches/{batch_id}/batch_group/{batch_group_id}\",\"value\":\"patchBatchesBatchIdBatchGroupBatchGroupId\",\"description\":\"PATCH /batches/{batch_id}/batch_group/{batch_group_id}\",\"action\":\"PATCH /batches/{batch_id}/batch_group/{batch_group_id}\"},{\"name\":\"PATCH /batches/{batch_id}/donations/{donation_id}\",\"value\":\"patchBatchesBatchIdDonationsDonationId\",\"description\":\"PATCH /batches/{batch_id}/donations/{donation_id}\",\"action\":\"PATCH /batches/{batch_id}/donations/{donation_id}\"},{\"name\":\"PATCH /batches/{batch_id}/owner/{owner_id}\",\"value\":\"patchBatchesBatchIdOwnerOwnerId\",\"description\":\"PATCH /batches/{batch_id}/owner/{owner_id}\",\"action\":\"PATCH /batches/{batch_id}/owner/{owner_id}\"},{\"name\":\"POST /batches\",\"value\":\"postBatches\",\"description\":\"POST /batches\",\"action\":\"POST /batches\"},{\"name\":\"POST /batches/{batch_id}/commit\",\"value\":\"postBatchesBatchIdCommit\",\"description\":\"POST /batches/{batch_id}/commit\",\"action\":\"POST /batches/{batch_id}/commit\"},{\"name\":\"POST /batches/{batch_id}/donations\",\"value\":\"postBatchesBatchIdDonations\",\"description\":\"POST /batches/{batch_id}/donations\",\"action\":\"POST /batches/{batch_id}/donations\"}],\n      default: \"deleteBatchesBatchId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"]}},\n      options: [{\"name\":\"DELETE /batch_groups/{batch_group_id}\",\"value\":\"deleteBatchGroupsBatchGroupId\",\"description\":\"DELETE /batch_groups/{batch_group_id}\",\"action\":\"DELETE /batch_groups/{batch_group_id}\"},{\"name\":\"DELETE /batch_groups/{batch_group_id}/batches/{batch_id}\",\"value\":\"deleteBatchGroupsBatchGroupIdBatchesBatchId\",\"description\":\"DELETE /batch_groups/{batch_group_id}/batches/{batch_id}\",\"action\":\"DELETE /batch_groups/{batch_group_id}/batches/{batch_id}\"},{\"name\":\"GET /batch_groups\",\"value\":\"getBatchGroups\",\"description\":\"GET /batch_groups\",\"action\":\"GET /batch_groups\"},{\"name\":\"GET /batch_groups/{batch_group_id}\",\"value\":\"getBatchGroupsBatchGroupId\",\"description\":\"GET /batch_groups/{batch_group_id}\",\"action\":\"GET /batch_groups/{batch_group_id}\"},{\"name\":\"GET /batch_groups/{batch_group_id}/batches\",\"value\":\"getBatchGroupsBatchGroupIdBatches\",\"description\":\"GET /batch_groups/{batch_group_id}/batches\",\"action\":\"GET /batch_groups/{batch_group_id}/batches\"},{\"name\":\"GET /batch_groups/{batch_group_id}/batches/{batch_id}\",\"value\":\"getBatchGroupsBatchGroupIdBatchesBatchId\",\"description\":\"GET /batch_groups/{batch_group_id}/batches/{batch_id}\",\"action\":\"GET /batch_groups/{batch_group_id}/batches/{batch_id}\"},{\"name\":\"GET /batch_groups/{batch_group_id}/owner\",\"value\":\"getBatchGroupsBatchGroupIdOwner\",\"description\":\"GET /batch_groups/{batch_group_id}/owner\",\"action\":\"GET /batch_groups/{batch_group_id}/owner\"},{\"name\":\"GET /batch_groups/{batch_group_id}/owner/{owner_id}\",\"value\":\"getBatchGroupsBatchGroupIdOwnerOwnerId\",\"description\":\"GET /batch_groups/{batch_group_id}/owner/{owner_id}\",\"action\":\"GET /batch_groups/{batch_group_id}/owner/{owner_id}\"},{\"name\":\"PATCH /batch_groups/{batch_group_id}\",\"value\":\"patchBatchGroupsBatchGroupId\",\"description\":\"PATCH /batch_groups/{batch_group_id}\",\"action\":\"PATCH /batch_groups/{batch_group_id}\"},{\"name\":\"PATCH /batch_groups/{batch_group_id}/batches/{batch_id}\",\"value\":\"patchBatchGroupsBatchGroupIdBatchesBatchId\",\"description\":\"PATCH /batch_groups/{batch_group_id}/batches/{batch_id}\",\"action\":\"PATCH /batch_groups/{batch_group_id}/batches/{batch_id}\"},{\"name\":\"PATCH /batch_groups/{batch_group_id}/owner/{owner_id}\",\"value\":\"patchBatchGroupsBatchGroupIdOwnerOwnerId\",\"description\":\"PATCH /batch_groups/{batch_group_id}/owner/{owner_id}\",\"action\":\"PATCH /batch_groups/{batch_group_id}/owner/{owner_id}\"},{\"name\":\"POST /batch_groups\",\"value\":\"postBatchGroups\",\"description\":\"POST /batch_groups\",\"action\":\"POST /batch_groups\"},{\"name\":\"POST /batch_groups/{batch_group_id}/batches\",\"value\":\"postBatchGroupsBatchGroupIdBatches\",\"description\":\"POST /batch_groups/{batch_group_id}/batches\",\"action\":\"POST /batch_groups/{batch_group_id}/batches\"},{\"name\":\"POST /batch_groups/{batch_group_id}/commit\",\"value\":\"postBatchGroupsBatchGroupIdCommit\",\"description\":\"POST /batch_groups/{batch_group_id}/commit\",\"action\":\"POST /batch_groups/{batch_group_id}/commit\"}],\n      default: \"deleteBatchGroupsBatchGroupId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"]}},\n      options: [{\"name\":\"DELETE /campuses/{campus_id}/donations/{donation_id}\",\"value\":\"deleteCampusesCampusIdDonationsDonationId\",\"description\":\"DELETE /campuses/{campus_id}/donations/{donation_id}\",\"action\":\"DELETE /campuses/{campus_id}/donations/{donation_id}\"},{\"name\":\"GET /campuses\",\"value\":\"getCampuses\",\"description\":\"GET /campuses\",\"action\":\"GET /campuses\"},{\"name\":\"GET /campuses/{campus_id}\",\"value\":\"getCampusesCampusId\",\"description\":\"GET /campuses/{campus_id}\",\"action\":\"GET /campuses/{campus_id}\"},{\"name\":\"GET /campuses/{campus_id}/donations\",\"value\":\"getCampusesCampusIdDonations\",\"description\":\"GET /campuses/{campus_id}/donations\",\"action\":\"GET /campuses/{campus_id}/donations\"},{\"name\":\"GET /campuses/{campus_id}/donations/{donation_id}\",\"value\":\"getCampusesCampusIdDonationsDonationId\",\"description\":\"GET /campuses/{campus_id}/donations/{donation_id}\",\"action\":\"GET /campuses/{campus_id}/donations/{donation_id}\"},{\"name\":\"PATCH /campuses/{campus_id}/donations/{donation_id}\",\"value\":\"patchCampusesCampusIdDonationsDonationId\",\"description\":\"PATCH /campuses/{campus_id}/donations/{donation_id}\",\"action\":\"PATCH /campuses/{campus_id}/donations/{donation_id}\"}],\n      default: \"deleteCampusesCampusIdDonationsDonationId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"]}},\n      options: [{\"name\":\"DELETE /donations/{donation_id}\",\"value\":\"deleteDonationsDonationId\",\"description\":\"DELETE /donations/{donation_id}\",\"action\":\"DELETE /donations/{donation_id}\"},{\"name\":\"DELETE /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"value\":\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\",\"description\":\"DELETE /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"action\":\"DELETE /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\"},{\"name\":\"DELETE /donations/{donation_id}/labels/{label_id}\",\"value\":\"deleteDonationsDonationIdLabelsLabelId\",\"description\":\"DELETE /donations/{donation_id}/labels/{label_id}\",\"action\":\"DELETE /donations/{donation_id}/labels/{label_id}\"},{\"name\":\"GET /donations\",\"value\":\"getDonations\",\"description\":\"GET /donations\",\"action\":\"GET /donations\"},{\"name\":\"GET /donations/{donation_id}\",\"value\":\"getDonationsDonationId\",\"description\":\"GET /donations/{donation_id}\",\"action\":\"GET /donations/{donation_id}\"},{\"name\":\"GET /donations/{donation_id}/campus\",\"value\":\"getDonationsDonationIdCampus\",\"description\":\"GET /donations/{donation_id}/campus\",\"action\":\"GET /donations/{donation_id}/campus\"},{\"name\":\"GET /donations/{donation_id}/campus/{campus_id}\",\"value\":\"getDonationsDonationIdCampusCampusId\",\"description\":\"GET /donations/{donation_id}/campus/{campus_id}\",\"action\":\"GET /donations/{donation_id}/campus/{campus_id}\"},{\"name\":\"GET /donations/{donation_id}/designations\",\"value\":\"getDonationsDonationIdDesignations\",\"description\":\"GET /donations/{donation_id}/designations\",\"action\":\"GET /donations/{donation_id}/designations\"},{\"name\":\"GET /donations/{donation_id}/designations/{designation_id}\",\"value\":\"getDonationsDonationIdDesignationsDesignationId\",\"description\":\"GET /donations/{donation_id}/designations/{designation_id}\",\"action\":\"GET /donations/{donation_id}/designations/{designation_id}\"},{\"name\":\"GET /donations/{donation_id}/designations/{designation_id}/fund\",\"value\":\"getDonationsDonationIdDesignationsDesignationIdFund\",\"description\":\"GET /donations/{donation_id}/designations/{designation_id}/fund\",\"action\":\"GET /donations/{donation_id}/designations/{designation_id}/fund\"},{\"name\":\"GET /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"value\":\"getDonationsDonationIdDesignationsDesignationIdFundFundId\",\"description\":\"GET /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"action\":\"GET /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\"},{\"name\":\"GET /donations/{donation_id}/labels\",\"value\":\"getDonationsDonationIdLabels\",\"description\":\"GET /donations/{donation_id}/labels\",\"action\":\"GET /donations/{donation_id}/labels\"},{\"name\":\"GET /donations/{donation_id}/labels/{label_id}\",\"value\":\"getDonationsDonationIdLabelsLabelId\",\"description\":\"GET /donations/{donation_id}/labels/{label_id}\",\"action\":\"GET /donations/{donation_id}/labels/{label_id}\"},{\"name\":\"GET /donations/{donation_id}/note\",\"value\":\"getDonationsDonationIdNote\",\"description\":\"GET /donations/{donation_id}/note\",\"action\":\"GET /donations/{donation_id}/note\"},{\"name\":\"GET /donations/{donation_id}/refund\",\"value\":\"getDonationsDonationIdRefund\",\"description\":\"GET /donations/{donation_id}/refund\",\"action\":\"GET /donations/{donation_id}/refund\"},{\"name\":\"GET /donations/{donation_id}/refund/designation_refunds\",\"value\":\"getDonationsDonationIdRefundDesignationRefunds\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds\",\"action\":\"GET /donations/{donation_id}/refund/designation_refunds\"},{\"name\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}\",\"value\":\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}\",\"action\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}\"},{\"name\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation\",\"value\":\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation\",\"action\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation\"},{\"name\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation/{designation_id}\",\"value\":\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\",\"description\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation/{designation_id}\",\"action\":\"GET /donations/{donation_id}/refund/designation_refunds/{designation_refund_id}/designation/{designation_id}\"},{\"name\":\"PATCH /donations/{donation_id}\",\"value\":\"patchDonationsDonationId\",\"description\":\"PATCH /donations/{donation_id}\",\"action\":\"PATCH /donations/{donation_id}\"},{\"name\":\"PATCH /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"value\":\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\",\"description\":\"PATCH /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\",\"action\":\"PATCH /donations/{donation_id}/designations/{designation_id}/fund/{fund_id}\"},{\"name\":\"PATCH /donations/{donation_id}/labels/{label_id}\",\"value\":\"patchDonationsDonationIdLabelsLabelId\",\"description\":\"PATCH /donations/{donation_id}/labels/{label_id}\",\"action\":\"PATCH /donations/{donation_id}/labels/{label_id}\"},{\"name\":\"POST /donations/{donation_id}/issue_refund\",\"value\":\"postDonationsDonationIdIssueRefund\",\"description\":\"POST /donations/{donation_id}/issue_refund\",\"action\":\"POST /donations/{donation_id}/issue_refund\"}],\n      default: \"deleteDonationsDonationId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"]}},\n      options: [{\"name\":\"DELETE /funds/{fund_id}\",\"value\":\"deleteFundsFundId\",\"description\":\"DELETE /funds/{fund_id}\",\"action\":\"DELETE /funds/{fund_id}\"},{\"name\":\"GET /funds\",\"value\":\"getFunds\",\"description\":\"GET /funds\",\"action\":\"GET /funds\"},{\"name\":\"GET /funds/{fund_id}\",\"value\":\"getFundsFundId\",\"description\":\"GET /funds/{fund_id}\",\"action\":\"GET /funds/{fund_id}\"},{\"name\":\"PATCH /funds/{fund_id}\",\"value\":\"patchFundsFundId\",\"description\":\"PATCH /funds/{fund_id}\",\"action\":\"PATCH /funds/{fund_id}\"},{\"name\":\"POST /funds\",\"value\":\"postFunds\",\"description\":\"POST /funds\",\"action\":\"POST /funds\"}],\n      default: \"deleteFundsFundId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"]}},\n      options: [{\"name\":\"DELETE /in_kind_donations/{in_kind_donation_id}\",\"value\":\"deleteInKindDonationsInKindDonationId\",\"description\":\"DELETE /in_kind_donations/{in_kind_donation_id}\",\"action\":\"DELETE /in_kind_donations/{in_kind_donation_id}\"},{\"name\":\"DELETE /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"value\":\"deleteInKindDonationsInKindDonationIdFundFundId\",\"description\":\"DELETE /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"action\":\"DELETE /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\"},{\"name\":\"GET /in_kind_donations\",\"value\":\"getInKindDonations\",\"description\":\"GET /in_kind_donations\",\"action\":\"GET /in_kind_donations\"},{\"name\":\"GET /in_kind_donations/{in_kind_donation_id}\",\"value\":\"getInKindDonationsInKindDonationId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}\",\"action\":\"GET /in_kind_donations/{in_kind_donation_id}\"},{\"name\":\"GET /in_kind_donations/{in_kind_donation_id}/campus\",\"value\":\"getInKindDonationsInKindDonationIdCampus\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/campus\",\"action\":\"GET /in_kind_donations/{in_kind_donation_id}/campus\"},{\"name\":\"GET /in_kind_donations/{in_kind_donation_id}/campus/{campus_id}\",\"value\":\"getInKindDonationsInKindDonationIdCampusCampusId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/campus/{campus_id}\",\"action\":\"GET /in_kind_donations/{in_kind_donation_id}/campus/{campus_id}\"},{\"name\":\"GET /in_kind_donations/{in_kind_donation_id}/fund\",\"value\":\"getInKindDonationsInKindDonationIdFund\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/fund\",\"action\":\"GET /in_kind_donations/{in_kind_donation_id}/fund\"},{\"name\":\"GET /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"value\":\"getInKindDonationsInKindDonationIdFundFundId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"action\":\"GET /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\"},{\"name\":\"GET /in_kind_donations/{in_kind_donation_id}/person\",\"value\":\"getInKindDonationsInKindDonationIdPerson\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/person\",\"action\":\"GET /in_kind_donations/{in_kind_donation_id}/person\"},{\"name\":\"GET /in_kind_donations/{in_kind_donation_id}/person/{person_id}\",\"value\":\"getInKindDonationsInKindDonationIdPersonPersonId\",\"description\":\"GET /in_kind_donations/{in_kind_donation_id}/person/{person_id}\",\"action\":\"GET /in_kind_donations/{in_kind_donation_id}/person/{person_id}\"},{\"name\":\"PATCH /in_kind_donations/{in_kind_donation_id}\",\"value\":\"patchInKindDonationsInKindDonationId\",\"description\":\"PATCH /in_kind_donations/{in_kind_donation_id}\",\"action\":\"PATCH /in_kind_donations/{in_kind_donation_id}\"},{\"name\":\"PATCH /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"value\":\"patchInKindDonationsInKindDonationIdFundFundId\",\"description\":\"PATCH /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\",\"action\":\"PATCH /in_kind_donations/{in_kind_donation_id}/fund/{fund_id}\"},{\"name\":\"PATCH /in_kind_donations/{in_kind_donation_id}/person/{person_id}\",\"value\":\"patchInKindDonationsInKindDonationIdPersonPersonId\",\"description\":\"PATCH /in_kind_donations/{in_kind_donation_id}/person/{person_id}\",\"action\":\"PATCH /in_kind_donations/{in_kind_donation_id}/person/{person_id}\"},{\"name\":\"POST /in_kind_donations\",\"value\":\"postInKindDonations\",\"description\":\"POST /in_kind_donations\",\"action\":\"POST /in_kind_donations\"}],\n      default: \"deleteInKindDonationsInKindDonationId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"]}},\n      options: [{\"name\":\"DELETE /labels/{label_id}\",\"value\":\"deleteLabelsLabelId\",\"description\":\"DELETE /labels/{label_id}\",\"action\":\"DELETE /labels/{label_id}\"},{\"name\":\"GET /labels\",\"value\":\"getLabels\",\"description\":\"GET /labels\",\"action\":\"GET /labels\"},{\"name\":\"GET /labels/{label_id}\",\"value\":\"getLabelsLabelId\",\"description\":\"GET /labels/{label_id}\",\"action\":\"GET /labels/{label_id}\"},{\"name\":\"PATCH /labels/{label_id}\",\"value\":\"patchLabelsLabelId\",\"description\":\"PATCH /labels/{label_id}\",\"action\":\"PATCH /labels/{label_id}\"},{\"name\":\"POST /labels\",\"value\":\"postLabels\",\"description\":\"POST /labels\",\"action\":\"POST /labels\"}],\n      default: \"deleteLabelsLabelId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"]}},\n      options: [{\"name\":\"DELETE /payment_sources/{payment_source_id}\",\"value\":\"deletePaymentSourcesPaymentSourceId\",\"description\":\"DELETE /payment_sources/{payment_source_id}\",\"action\":\"DELETE /payment_sources/{payment_source_id}\"},{\"name\":\"DELETE /payment_sources/{payment_source_id}/donations/{donation_id}\",\"value\":\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\",\"description\":\"DELETE /payment_sources/{payment_source_id}/donations/{donation_id}\",\"action\":\"DELETE /payment_sources/{payment_source_id}/donations/{donation_id}\"},{\"name\":\"GET /payment_sources\",\"value\":\"getPaymentSources\",\"description\":\"GET /payment_sources\",\"action\":\"GET /payment_sources\"},{\"name\":\"GET /payment_sources/{payment_source_id}\",\"value\":\"getPaymentSourcesPaymentSourceId\",\"description\":\"GET /payment_sources/{payment_source_id}\",\"action\":\"GET /payment_sources/{payment_source_id}\"},{\"name\":\"GET /payment_sources/{payment_source_id}/donations\",\"value\":\"getPaymentSourcesPaymentSourceIdDonations\",\"description\":\"GET /payment_sources/{payment_source_id}/donations\",\"action\":\"GET /payment_sources/{payment_source_id}/donations\"},{\"name\":\"GET /payment_sources/{payment_source_id}/donations/{donation_id}\",\"value\":\"getPaymentSourcesPaymentSourceIdDonationsDonationId\",\"description\":\"GET /payment_sources/{payment_source_id}/donations/{donation_id}\",\"action\":\"GET /payment_sources/{payment_source_id}/donations/{donation_id}\"},{\"name\":\"PATCH /payment_sources/{payment_source_id}\",\"value\":\"patchPaymentSourcesPaymentSourceId\",\"description\":\"PATCH /payment_sources/{payment_source_id}\",\"action\":\"PATCH /payment_sources/{payment_source_id}\"},{\"name\":\"PATCH /payment_sources/{payment_source_id}/donations/{donation_id}\",\"value\":\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\",\"description\":\"PATCH /payment_sources/{payment_source_id}/donations/{donation_id}\",\"action\":\"PATCH /payment_sources/{payment_source_id}/donations/{donation_id}\"},{\"name\":\"POST /payment_sources\",\"value\":\"postPaymentSources\",\"description\":\"POST /payment_sources\",\"action\":\"POST /payment_sources\"}],\n      default: \"deletePaymentSourcesPaymentSourceId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"DELETE /people/{person_id}/batch_groups/{batch_group_id}\",\"value\":\"deletePeoplePersonIdBatchGroupsBatchGroupId\",\"description\":\"DELETE /people/{person_id}/batch_groups/{batch_group_id}\",\"action\":\"DELETE /people/{person_id}/batch_groups/{batch_group_id}\"},{\"name\":\"DELETE /people/{person_id}/batches/{batch_id}\",\"value\":\"deletePeoplePersonIdBatchesBatchId\",\"description\":\"DELETE /people/{person_id}/batches/{batch_id}\",\"action\":\"DELETE /people/{person_id}/batches/{batch_id}\"},{\"name\":\"DELETE /people/{person_id}/donations/{donation_id}\",\"value\":\"deletePeoplePersonIdDonationsDonationId\",\"description\":\"DELETE /people/{person_id}/donations/{donation_id}\",\"action\":\"DELETE /people/{person_id}/donations/{donation_id}\"},{\"name\":\"DELETE /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"value\":\"deletePeoplePersonIdInKindDonationsInKindDonationId\",\"description\":\"DELETE /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"action\":\"DELETE /people/{person_id}/in_kind_donations/{in_kind_donation_id}\"},{\"name\":\"DELETE /people/{person_id}/pledges/{pledge_id}\",\"value\":\"deletePeoplePersonIdPledgesPledgeId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}\",\"action\":\"DELETE /people/{person_id}/pledges/{pledge_id}\"},{\"name\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"value\":\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"action\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\"},{\"name\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"value\":\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"action\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\"},{\"name\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"value\":\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\",\"description\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"action\":\"DELETE /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\"},{\"name\":\"GET /me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"GET /me\"},{\"name\":\"GET /people\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"GET /people\"},{\"name\":\"GET /people/{person_id}\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"GET /people/{person_id}\"},{\"name\":\"GET /people/{person_id}/batch_groups\",\"value\":\"getPeoplePersonIdBatchGroups\",\"description\":\"GET /people/{person_id}/batch_groups\",\"action\":\"GET /people/{person_id}/batch_groups\"},{\"name\":\"GET /people/{person_id}/batch_groups/{batch_group_id}\",\"value\":\"getPeoplePersonIdBatchGroupsBatchGroupId\",\"description\":\"GET /people/{person_id}/batch_groups/{batch_group_id}\",\"action\":\"GET /people/{person_id}/batch_groups/{batch_group_id}\"},{\"name\":\"GET /people/{person_id}/batches\",\"value\":\"getPeoplePersonIdBatches\",\"description\":\"GET /people/{person_id}/batches\",\"action\":\"GET /people/{person_id}/batches\"},{\"name\":\"GET /people/{person_id}/batches/{batch_id}\",\"value\":\"getPeoplePersonIdBatchesBatchId\",\"description\":\"GET /people/{person_id}/batches/{batch_id}\",\"action\":\"GET /people/{person_id}/batches/{batch_id}\"},{\"name\":\"GET /people/{person_id}/donations\",\"value\":\"getPeoplePersonIdDonations\",\"description\":\"GET /people/{person_id}/donations\",\"action\":\"GET /people/{person_id}/donations\"},{\"name\":\"GET /people/{person_id}/donations/{donation_id}\",\"value\":\"getPeoplePersonIdDonationsDonationId\",\"description\":\"GET /people/{person_id}/donations/{donation_id}\",\"action\":\"GET /people/{person_id}/donations/{donation_id}\"},{\"name\":\"GET /people/{person_id}/in_kind_donations\",\"value\":\"getPeoplePersonIdInKindDonations\",\"description\":\"GET /people/{person_id}/in_kind_donations\",\"action\":\"GET /people/{person_id}/in_kind_donations\"},{\"name\":\"GET /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"value\":\"getPeoplePersonIdInKindDonationsInKindDonationId\",\"description\":\"GET /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"action\":\"GET /people/{person_id}/in_kind_donations/{in_kind_donation_id}\"},{\"name\":\"GET /people/{person_id}/payment_methods\",\"value\":\"getPeoplePersonIdPaymentMethods\",\"description\":\"GET /people/{person_id}/payment_methods\",\"action\":\"GET /people/{person_id}/payment_methods\"},{\"name\":\"GET /people/{person_id}/payment_methods/{payment_method_id}\",\"value\":\"getPeoplePersonIdPaymentMethodsPaymentMethodId\",\"description\":\"GET /people/{person_id}/payment_methods/{payment_method_id}\",\"action\":\"GET /people/{person_id}/payment_methods/{payment_method_id}\"},{\"name\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations\",\"value\":\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\",\"description\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations\",\"action\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations\"},{\"name\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations/{recurring_donation_id}\",\"value\":\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\",\"description\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations/{recurring_donation_id}\",\"action\":\"GET /people/{person_id}/payment_methods/{payment_method_id}/recurring_donations/{recurring_donation_id}\"},{\"name\":\"GET /people/{person_id}/pledges\",\"value\":\"getPeoplePersonIdPledges\",\"description\":\"GET /people/{person_id}/pledges\",\"action\":\"GET /people/{person_id}/pledges\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}\",\"value\":\"getPeoplePersonIdPledgesPledgeId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver\",\"value\":\"getPeoplePersonIdPledgesPledgeIdJointGiver\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\",\"value\":\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges\"},{\"name\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"value\":\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\",\"description\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"action\":\"GET /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\"},{\"name\":\"GET /people/{person_id}/primary_campus\",\"value\":\"getPeoplePersonIdPrimaryCampus\",\"description\":\"GET /people/{person_id}/primary_campus\",\"action\":\"GET /people/{person_id}/primary_campus\"},{\"name\":\"GET /people/{person_id}/primary_campus/{primary_campus_id}\",\"value\":\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\",\"description\":\"GET /people/{person_id}/primary_campus/{primary_campus_id}\",\"action\":\"GET /people/{person_id}/primary_campus/{primary_campus_id}\"},{\"name\":\"GET /people/{person_id}/recurring_donations\",\"value\":\"getPeoplePersonIdRecurringDonations\",\"description\":\"GET /people/{person_id}/recurring_donations\",\"action\":\"GET /people/{person_id}/recurring_donations\"},{\"name\":\"GET /people/{person_id}/recurring_donations/{recurring_donation_id}\",\"value\":\"getPeoplePersonIdRecurringDonationsRecurringDonationId\",\"description\":\"GET /people/{person_id}/recurring_donations/{recurring_donation_id}\",\"action\":\"GET /people/{person_id}/recurring_donations/{recurring_donation_id}\"},{\"name\":\"PATCH /people/{person_id}\",\"value\":\"patchPeoplePersonId\",\"description\":\"PATCH /people/{person_id}\",\"action\":\"PATCH /people/{person_id}\"},{\"name\":\"PATCH /people/{person_id}/batch_groups/{batch_group_id}\",\"value\":\"patchPeoplePersonIdBatchGroupsBatchGroupId\",\"description\":\"PATCH /people/{person_id}/batch_groups/{batch_group_id}\",\"action\":\"PATCH /people/{person_id}/batch_groups/{batch_group_id}\"},{\"name\":\"PATCH /people/{person_id}/batches/{batch_id}\",\"value\":\"patchPeoplePersonIdBatchesBatchId\",\"description\":\"PATCH /people/{person_id}/batches/{batch_id}\",\"action\":\"PATCH /people/{person_id}/batches/{batch_id}\"},{\"name\":\"PATCH /people/{person_id}/donations/{donation_id}\",\"value\":\"patchPeoplePersonIdDonationsDonationId\",\"description\":\"PATCH /people/{person_id}/donations/{donation_id}\",\"action\":\"PATCH /people/{person_id}/donations/{donation_id}\"},{\"name\":\"PATCH /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"value\":\"patchPeoplePersonIdInKindDonationsInKindDonationId\",\"description\":\"PATCH /people/{person_id}/in_kind_donations/{in_kind_donation_id}\",\"action\":\"PATCH /people/{person_id}/in_kind_donations/{in_kind_donation_id}\"},{\"name\":\"PATCH /people/{person_id}/pledges/{pledge_id}\",\"value\":\"patchPeoplePersonIdPledgesPledgeId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}\",\"action\":\"PATCH /people/{person_id}/pledges/{pledge_id}\"},{\"name\":\"PATCH /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\",\"action\":\"PATCH /people/{person_id}/pledges/{pledge_id}/joint_giver/{joint_giver_id}\"},{\"name\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\",\"action\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}\"},{\"name\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\",\"action\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/fund/{fund_id}\"},{\"name\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"value\":\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\",\"description\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\",\"action\":\"PATCH /people/{person_id}/pledges/{pledge_id}/pledge_campaign/{pledge_campaign_id}/pledges/{pledge_id}\"},{\"name\":\"POST /people/{person_id}/pledges\",\"value\":\"postPeoplePersonIdPledges\",\"description\":\"POST /people/{person_id}/pledges\",\"action\":\"POST /people/{person_id}/pledges\"}],\n      default: \"deletePeoplePersonIdBatchGroupsBatchGroupId\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"]}},\n      options: [{\"name\":\"DELETE /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"value\":\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\"description\":\"DELETE /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"action\":\"DELETE /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\"},{\"name\":\"GET /recurring_donations\",\"value\":\"getRecurringDonations\",\"description\":\"GET /recurring_donations\",\"action\":\"GET /recurring_donations\"},{\"name\":\"GET /recurring_donations/{recurring_donation_id}\",\"value\":\"getRecurringDonationsRecurringDonationId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}\",\"action\":\"GET /recurring_donations/{recurring_donation_id}\"},{\"name\":\"GET /recurring_donations/{recurring_donation_id}/designations\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignations\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations\",\"action\":\"GET /recurring_donations/{recurring_donation_id}/designations\"},{\"name\":\"GET /recurring_donations/{recurring_donation_id}/designations/{designation_id}\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations/{designation_id}\",\"action\":\"GET /recurring_donations/{recurring_donation_id}/designations/{designation_id}\"},{\"name\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund\",\"action\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund\"},{\"name\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"value\":\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"action\":\"GET /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\"},{\"name\":\"GET /recurring_donations/{recurring_donation_id}/payment_method\",\"value\":\"getRecurringDonationsRecurringDonationIdPaymentMethod\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/payment_method\",\"action\":\"GET /recurring_donations/{recurring_donation_id}/payment_method\"},{\"name\":\"GET /recurring_donations/{recurring_donation_id}/payment_method/{payment_method_id}\",\"value\":\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\",\"description\":\"GET /recurring_donations/{recurring_donation_id}/payment_method/{payment_method_id}\",\"action\":\"GET /recurring_donations/{recurring_donation_id}/payment_method/{payment_method_id}\"},{\"name\":\"PATCH /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"value\":\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\"description\":\"PATCH /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\",\"action\":\"PATCH /recurring_donations/{recurring_donation_id}/designations/{recurring_donation_designation_id}/fund/{fund_id}\"}],\n      default: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\",\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deleteBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deleteBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchGroupsBatchGroupIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"deleteBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getBatchGroups_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getBatchGroups_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getBatchGroups_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getBatchGroups_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getBatchGroups_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getBatchGroups_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[owner][first Name]\",\n      name: \"getBatchGroups_whereownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[owner][last Name]\",\n      name: \"getBatchGroups_whereownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getBatchGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatchGroups_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchGroups_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getBatchGroups_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getBatchGroups_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"],\"getBatchGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchGroupsBatchGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatchGroupsBatchGroupId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchGroupsBatchGroupId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getBatchGroupsBatchGroupIdBatches_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_wherebatchGroupupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][gt]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_wherebatchGroupupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][gte]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_wherebatchGroupupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][lt]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_wherebatchGroupupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][lte]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_wherebatchGroupupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[owner][first Name]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_whereownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[owner][last Name]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_whereownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][owner][first Name]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_wherebatchGroupownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][owner][last Name]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_wherebatchGroupownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getBatchGroupsBatchGroupIdBatches_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchGroupsBatchGroupIdBatches_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchGroupsBatchGroupIdBatches_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getBatchGroupsBatchGroupIdBatches_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getBatchGroupsBatchGroupIdBatches_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchGroupsBatchGroupIdBatches_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchGroupsBatchGroupIdBatches_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"],\"getBatchGroupsBatchGroupIdBatches_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchGroupsBatchGroupIdBatchesBatchId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdOwner_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: \"Where[first Name]\",\n      name: \"getBatchGroupsBatchGroupIdOwner_wherefirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: \"Where[last Name]\",\n      name: \"getBatchGroupsBatchGroupIdOwner_wherelastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchGroupsBatchGroupIdOwner_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getBatchGroupsBatchGroupIdOwner_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getBatchGroupsBatchGroupIdOwner_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchGroupsBatchGroupIdOwner_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchGroupsBatchGroupIdOwner_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"],\"getBatchGroupsBatchGroupIdOwner_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwner\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchGroupsBatchGroupIdOwnerOwnerId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"getBatchGroupsBatchGroupIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchGroupsBatchGroupIdOwnerOwnerId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"getBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchBatchGroupsBatchGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"patchBatchGroupsBatchGroupId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchBatchGroupsBatchGroupId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchGroupsBatchGroupId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchGroupsBatchGroupIdOwnerOwnerId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"patchBatchGroupsBatchGroupIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchBatchGroupsBatchGroupIdOwnerOwnerId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchBatchGroupsBatchGroupIdOwnerOwnerId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"patchBatchGroupsBatchGroupIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"postBatchGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"postBatchGroups_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"postBatchGroups_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postBatchGroups_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatchGroupsBatchGroupIdBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postBatchGroupsBatchGroupIdBatches_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"postBatchGroupsBatchGroupIdBatches_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"postBatchGroupsBatchGroupIdBatches_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"postBatchGroupsBatchGroupIdBatches_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postBatchGroupsBatchGroupIdBatches_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatchGroupsBatchGroupIdBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatchGroupsBatchGroupIdCommit_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch Group\"],\"operation\":[\"postBatchGroupsBatchGroupIdCommit\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchesBatchIdBatchGroupBatchGroupId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deleteBatchesBatchIdBatchGroupBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deleteBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteBatchesBatchIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"deleteBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getBatches_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getBatches_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getBatches_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getBatches_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getBatches_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getBatches_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At]\",\n      name: \"getBatches_wherebatchGroupupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][gt]\",\n      name: \"getBatches_wherebatchGroupupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][gte]\",\n      name: \"getBatches_wherebatchGroupupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][lt]\",\n      name: \"getBatches_wherebatchGroupupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][lte]\",\n      name: \"getBatches_wherebatchGroupupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[owner][first Name]\",\n      name: \"getBatches_whereownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[owner][last Name]\",\n      name: \"getBatches_whereownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][owner][first Name]\",\n      name: \"getBatches_wherebatchGroupownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][owner][last Name]\",\n      name: \"getBatches_wherebatchGroupownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getBatches_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatches_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"getBatches_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatches_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatches_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getBatches_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getBatches_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatches_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatches_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"],\"getBatches_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchesBatchId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"getBatchesBatchId_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatchesBatchId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchesBatchId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdBatchGroup_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getBatchesBatchIdBatchGroup_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getBatchesBatchIdBatchGroup_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getBatchesBatchIdBatchGroup_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getBatchesBatchIdBatchGroup_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getBatchesBatchIdBatchGroup_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Where[owner][first Name]\",\n      name: \"getBatchesBatchIdBatchGroup_whereownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Where[owner][last Name]\",\n      name: \"getBatchesBatchIdBatchGroup_whereownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getBatchesBatchIdBatchGroup_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchesBatchIdBatchGroup_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatchesBatchIdBatchGroup_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchesBatchIdBatchGroup_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getBatchesBatchIdBatchGroup_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getBatchesBatchIdBatchGroup_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchesBatchIdBatchGroup_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchesBatchIdBatchGroup_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"],\"getBatchesBatchIdBatchGroup_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroup\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchesBatchIdBatchGroupBatchGroupId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdDonations_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[payment Method]\",\n      name: \"getBatchesBatchIdDonations_wherepaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At]\",\n      name: \"getBatchesBatchIdDonations_wherereceivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gt]\",\n      name: \"getBatchesBatchIdDonations_wherereceivedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gte]\",\n      name: \"getBatchesBatchIdDonations_wherereceivedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lt]\",\n      name: \"getBatchesBatchIdDonations_wherereceivedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lte]\",\n      name: \"getBatchesBatchIdDonations_wherereceivedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getBatchesBatchIdDonations_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getBatchesBatchIdDonations_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getBatchesBatchIdDonations_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getBatchesBatchIdDonations_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getBatchesBatchIdDonations_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getBatchesBatchIdDonations_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getBatchesBatchIdDonations_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getBatchesBatchIdDonations_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getBatchesBatchIdDonations_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getBatchesBatchIdDonations_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At]\",\n      name: \"getBatchesBatchIdDonations_wherecompletedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gt]\",\n      name: \"getBatchesBatchIdDonations_wherecompletedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gte]\",\n      name: \"getBatchesBatchIdDonations_wherecompletedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lt]\",\n      name: \"getBatchesBatchIdDonations_wherecompletedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lte]\",\n      name: \"getBatchesBatchIdDonations_wherecompletedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getBatchesBatchIdDonations_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[labels][slug]\",\n      name: \"getBatchesBatchIdDonations_wherelabelsslug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getBatchesBatchIdDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getBatchesBatchIdDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getBatchesBatchIdDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getBatchesBatchIdDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getBatchesBatchIdDonations_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchesBatchIdDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getBatchesBatchIdDonations_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getBatchesBatchIdDonations_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getBatchesBatchIdDonations_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getBatchesBatchIdDonations_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getBatchesBatchIdDonations_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getBatchesBatchIdDonations_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getBatchesBatchIdDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getBatchesBatchIdDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getBatchesBatchIdDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchesBatchIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchesBatchIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"],\"getBatchesBatchIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getBatchesBatchIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getBatchesBatchIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getBatchesBatchIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getBatchesBatchIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getBatchesBatchIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getBatchesBatchIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getBatchesBatchIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getBatchesBatchIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getBatchesBatchIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdOwner_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: \"Where[first Name]\",\n      name: \"getBatchesBatchIdOwner_wherefirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: \"Where[last Name]\",\n      name: \"getBatchesBatchIdOwner_wherelastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchesBatchIdOwner_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getBatchesBatchIdOwner_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getBatchesBatchIdOwner_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getBatchesBatchIdOwner_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getBatchesBatchIdOwner_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"],\"getBatchesBatchIdOwner_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwner\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getBatchesBatchIdOwnerOwnerId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"getBatchesBatchIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getBatchesBatchIdOwnerOwnerId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"getBatchesBatchIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchBatchesBatchId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"patchBatchesBatchId_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"patchBatchesBatchId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchBatchesBatchId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchesBatchId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchBatchesBatchIdBatchGroupBatchGroupId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdBatchGroupBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchBatchesBatchIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"patchBatchesBatchIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"patchBatchesBatchIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"patchBatchesBatchIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"patchBatchesBatchIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"patchBatchesBatchIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"patchBatchesBatchIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchBatchesBatchIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchBatchesBatchIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchBatchesBatchIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchBatchesBatchIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchBatchesBatchIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchBatchesBatchIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchBatchesBatchIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchBatchesBatchIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchBatchesBatchIdOwnerOwnerId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Owner Id\",\n      name: \"patchBatchesBatchIdOwnerOwnerId_ownerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchBatchesBatchIdOwnerOwnerId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchBatchesBatchIdOwnerOwnerId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"patchBatchesBatchIdOwnerOwnerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"postBatches_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"postBatches_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"postBatches_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"postBatches_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postBatches_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"postBatches_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"postBatchesBatchIdCommit_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdCommit\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"postBatchesBatchIdDonations_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postBatchesBatchIdDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"postBatchesBatchIdDonations_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"postBatchesBatchIdDonations_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"postBatchesBatchIdDonations_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"postBatchesBatchIdDonations_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"postBatchesBatchIdDonations_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"postBatchesBatchIdDonations_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"postBatchesBatchIdDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"postBatchesBatchIdDonations_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"postBatchesBatchIdDonations_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"postBatchesBatchIdDonations_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"postBatchesBatchIdDonations_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"postBatchesBatchIdDonations_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"postBatchesBatchIdDonations_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"postBatchesBatchIdDonations_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"postBatchesBatchIdDonations_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postBatchesBatchIdDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"postBatchesBatchIdDonations_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"postBatchesBatchIdDonations_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"postBatchesBatchIdDonations_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"postBatchesBatchIdDonations_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"postBatchesBatchIdDonations_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"postBatchesBatchIdDonations_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"postBatchesBatchIdDonations_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Batch\"],\"operation\":[\"postBatchesBatchIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"deleteCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"deleteCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteCampusesCampusIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"deleteCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"deleteCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getCampuses_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getCampuses_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getCampuses_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"],\"getCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getCampusesCampusId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdDonations_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[payment Method]\",\n      name: \"getCampusesCampusIdDonations_wherepaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At]\",\n      name: \"getCampusesCampusIdDonations_wherereceivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gt]\",\n      name: \"getCampusesCampusIdDonations_wherereceivedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gte]\",\n      name: \"getCampusesCampusIdDonations_wherereceivedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lt]\",\n      name: \"getCampusesCampusIdDonations_wherereceivedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lte]\",\n      name: \"getCampusesCampusIdDonations_wherereceivedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getCampusesCampusIdDonations_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getCampusesCampusIdDonations_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getCampusesCampusIdDonations_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getCampusesCampusIdDonations_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getCampusesCampusIdDonations_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getCampusesCampusIdDonations_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getCampusesCampusIdDonations_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getCampusesCampusIdDonations_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getCampusesCampusIdDonations_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getCampusesCampusIdDonations_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At]\",\n      name: \"getCampusesCampusIdDonations_wherecompletedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gt]\",\n      name: \"getCampusesCampusIdDonations_wherecompletedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gte]\",\n      name: \"getCampusesCampusIdDonations_wherecompletedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lt]\",\n      name: \"getCampusesCampusIdDonations_wherecompletedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lte]\",\n      name: \"getCampusesCampusIdDonations_wherecompletedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getCampusesCampusIdDonations_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[labels][slug]\",\n      name: \"getCampusesCampusIdDonations_wherelabelsslug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getCampusesCampusIdDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getCampusesCampusIdDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getCampusesCampusIdDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getCampusesCampusIdDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getCampusesCampusIdDonations_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCampusesCampusIdDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getCampusesCampusIdDonations_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getCampusesCampusIdDonations_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getCampusesCampusIdDonations_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getCampusesCampusIdDonations_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getCampusesCampusIdDonations_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getCampusesCampusIdDonations_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getCampusesCampusIdDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getCampusesCampusIdDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getCampusesCampusIdDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampusesCampusIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampusesCampusIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"],\"getCampusesCampusIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getCampusesCampusIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getCampusesCampusIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getCampusesCampusIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getCampusesCampusIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getCampusesCampusIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getCampusesCampusIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getCampusesCampusIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getCampusesCampusIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getCampusesCampusIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchCampusesCampusIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"patchCampusesCampusIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"patchCampusesCampusIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"patchCampusesCampusIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"patchCampusesCampusIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"patchCampusesCampusIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"patchCampusesCampusIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchCampusesCampusIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchCampusesCampusIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchCampusesCampusIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchCampusesCampusIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchCampusesCampusIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchCampusesCampusIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchCampusesCampusIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchCampusesCampusIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"patchCampusesCampusIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteDonationsDonationIdDesignationsDesignationIdFundFundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"deleteDonationsDonationIdDesignationsDesignationIdFundFundId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteDonationsDonationIdDesignationsDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deleteDonationsDonationIdLabelsLabelId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"deleteDonationsDonationIdLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"deleteDonationsDonationIdLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getDonations_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[payment Method]\",\n      name: \"getDonations_wherepaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At]\",\n      name: \"getDonations_wherereceivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gt]\",\n      name: \"getDonations_wherereceivedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gte]\",\n      name: \"getDonations_wherereceivedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lt]\",\n      name: \"getDonations_wherereceivedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lte]\",\n      name: \"getDonations_wherereceivedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getDonations_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getDonations_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getDonations_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getDonations_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getDonations_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getDonations_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getDonations_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getDonations_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getDonations_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getDonations_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At]\",\n      name: \"getDonations_wherecompletedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gt]\",\n      name: \"getDonations_wherecompletedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gte]\",\n      name: \"getDonations_wherecompletedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lt]\",\n      name: \"getDonations_wherecompletedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lte]\",\n      name: \"getDonations_wherecompletedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getDonations_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[labels][slug]\",\n      name: \"getDonations_wherelabelsslug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getDonations_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getDonations_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonations_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getDonations_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getDonations_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getDonations_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getDonations_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"],\"getDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdCampus_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getDonationsDonationIdCampus_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getDonationsDonationIdCampus_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getDonationsDonationIdCampus_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdCampus_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdCampus_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"],\"getDonationsDonationIdCampus_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampus\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdCampusCampusId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getDonationsDonationIdCampusCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getDonationsDonationIdCampusCampusId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdCampusCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignations_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][default]\",\n      name: \"getDonationsDonationIdDesignations_wherefunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][name]\",\n      name: \"getDonationsDonationIdDesignations_wherefundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][id]\",\n      name: \"getDonationsDonationIdDesignations_wherefundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][visibility]\",\n      name: \"getDonationsDonationIdDesignations_wherefundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationIdDesignations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationIdDesignations_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdDesignations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getDonationsDonationIdDesignations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getDonationsDonationIdDesignations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdDesignations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdDesignations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"],\"getDonationsDonationIdDesignations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationIdDesignationsDesignationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationIdDesignationsDesignationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdDesignationsDesignationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[default]\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_wheredefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[visibility]\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_wherevisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdDesignationsDesignationIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"],\"getDonationsDonationIdDesignationsDesignationIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFundFundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFundFundId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdDesignationsDesignationIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdLabels_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: \"Where[slug]\",\n      name: \"getDonationsDonationIdLabels_whereslug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getDonationsDonationIdLabels_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getDonationsDonationIdLabels_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getDonationsDonationIdLabels_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"],\"getDonationsDonationIdLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdLabelsLabelId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"getDonationsDonationIdLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getDonationsDonationIdLabelsLabelId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdNote_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getDonationsDonationIdNote_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdNote_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdNote_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"],\"getDonationsDonationIdNote_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdNote\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefund_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationIdRefund_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getDonationsDonationIdRefund_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getDonationsDonationIdRefund_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationIdRefund_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdRefund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdRefund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"],\"getDonationsDonationIdRefund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Where[designation][fund][default]\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_wheredesignationfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Where[designation][fund][name]\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_wheredesignationfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Where[designation][fund][id]\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_wheredesignationfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Where[designation][fund][visibility]\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_wheredesignationfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getDonationsDonationIdRefundDesignationRefunds_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdRefundDesignationRefunds_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdRefundDesignationRefunds_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"],\"getDonationsDonationIdRefundDesignationRefunds_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefunds\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: \"Designation Refund Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_designationRefundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Designation Refund Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_designationRefundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Where[fund][default]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_wherefunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Where[fund][name]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_wherefundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Where[fund][id]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_wherefundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Where[fund][visibility]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_wherefundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"],\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Refund Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_designationRefundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"getDonationsDonationIdRefundDesignationRefundsDesignationRefundIdDesignationDesignationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"patchDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"patchDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"patchDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"patchDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"patchDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"patchDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchDonationsDonationIdDesignationsDesignationIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdDesignationsDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchDonationsDonationIdLabelsLabelId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"patchDonationsDonationIdLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"patchDonationsDonationIdLabelsLabelId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Slug\",\n      name: \"patchDonationsDonationIdLabelsLabelId_slug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"patchDonationsDonationIdLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"postDonationsDonationIdIssueRefund_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Donation\"],\"operation\":[\"postDonationsDonationIdIssueRefund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteFundsFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"deleteFundsFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"deleteFundsFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Where[default]\",\n      name: \"getFunds_wheredefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getFunds_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getFunds_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: \"Where[visibility]\",\n      name: \"getFunds_wherevisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getFunds_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getFunds_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getFunds_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getFunds_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getFunds_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"],\"getFunds_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFunds\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getFundsFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFundsFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getFundsFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFundsFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"getFundsFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchFundsFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchFundsFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchFundsFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchFundsFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchFundsFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchFundsFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchFundsFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"patchFundsFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"postFunds_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"postFunds_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"postFunds_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postFunds_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"postFunds_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"postFunds_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Fund\"],\"operation\":[\"postFunds\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"deleteInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"deleteInKindDonationsInKindDonationIdFundFundId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteInKindDonationsInKindDonationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"deleteInKindDonationsInKindDonationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getInKindDonations_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getInKindDonations_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getInKindDonations_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getInKindDonations_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getInKindDonations_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getInKindDonations_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getInKindDonations_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getInKindDonations_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getInKindDonations_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getInKindDonations_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On]\",\n      name: \"getInKindDonations_wherereceivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][gt]\",\n      name: \"getInKindDonations_wherereceivedOngt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][gte]\",\n      name: \"getInKindDonations_wherereceivedOngte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][lt]\",\n      name: \"getInKindDonations_wherereceivedOnlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][lte]\",\n      name: \"getInKindDonations_wherereceivedOnlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getInKindDonations_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[campus Id]\",\n      name: \"getInKindDonations_wherecampusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][default]\",\n      name: \"getInKindDonations_wherefunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][name]\",\n      name: \"getInKindDonations_wherefundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][id]\",\n      name: \"getInKindDonations_wherefundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][visibility]\",\n      name: \"getInKindDonations_wherefundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[person][first Name]\",\n      name: \"getInKindDonations_wherepersonfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[person][last Name]\",\n      name: \"getInKindDonations_wherepersonlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getInKindDonations_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getInKindDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[In Kind Donation]\",\n      name: \"getInKindDonations_fieldsInKindDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getInKindDonations_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getInKindDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getInKindDonations_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getInKindDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getInKindDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"],\"getInKindDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getInKindDonationsInKindDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[In Kind Donation]\",\n      name: \"getInKindDonationsInKindDonationId_fieldsInKindDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getInKindDonationsInKindDonationId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getInKindDonationsInKindDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getInKindDonationsInKindDonationId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdCampus_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getInKindDonationsInKindDonationIdCampus_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getInKindDonationsInKindDonationIdCampus_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getInKindDonationsInKindDonationIdCampus_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonationsInKindDonationIdCampus_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonationsInKindDonationIdCampus_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"],\"getInKindDonationsInKindDonationIdCampus_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampus\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdCampusCampusId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"getInKindDonationsInKindDonationIdCampusCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getInKindDonationsInKindDonationIdCampusCampusId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampusCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdCampusCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdFund_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[default]\",\n      name: \"getInKindDonationsInKindDonationIdFund_wheredefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getInKindDonationsInKindDonationIdFund_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getInKindDonationsInKindDonationIdFund_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[visibility]\",\n      name: \"getInKindDonationsInKindDonationIdFund_wherevisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getInKindDonationsInKindDonationIdFund_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getInKindDonationsInKindDonationIdFund_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getInKindDonationsInKindDonationIdFund_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonationsInKindDonationIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonationsInKindDonationIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"],\"getInKindDonationsInKindDonationIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdFundFundId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getInKindDonationsInKindDonationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getInKindDonationsInKindDonationIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdPerson_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: \"Where[first Name]\",\n      name: \"getInKindDonationsInKindDonationIdPerson_wherefirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: \"Where[last Name]\",\n      name: \"getInKindDonationsInKindDonationIdPerson_wherelastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getInKindDonationsInKindDonationIdPerson_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getInKindDonationsInKindDonationIdPerson_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getInKindDonationsInKindDonationIdPerson_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getInKindDonationsInKindDonationIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getInKindDonationsInKindDonationIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"],\"getInKindDonationsInKindDonationIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getInKindDonationsInKindDonationIdPersonPersonId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getInKindDonationsInKindDonationIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getInKindDonationsInKindDonationIdPersonPersonId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"getInKindDonationsInKindDonationIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchInKindDonationsInKindDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[In Kind Donation]\",\n      name: \"patchInKindDonationsInKindDonationId_fieldsInKindDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"patchInKindDonationsInKindDonationId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchInKindDonationsInKindDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchInKindDonationsInKindDonationId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchInKindDonationsInKindDonationId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Exchange Details\",\n      name: \"patchInKindDonationsInKindDonationId_exchangeDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Cents\",\n      name: \"patchInKindDonationsInKindDonationId_fairMarketValueCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received On\",\n      name: \"patchInKindDonationsInKindDonationId_receivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Valuation Details\",\n      name: \"patchInKindDonationsInKindDonationId_valuationDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Internal Notes\",\n      name: \"patchInKindDonationsInKindDonationId_internalNotes\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Currency\",\n      name: \"patchInKindDonationsInKindDonationId_fairMarketValueCurrency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchInKindDonationsInKindDonationId_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchInKindDonationsInKindDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"patchInKindDonationsInKindDonationId_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchInKindDonationsInKindDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchInKindDonationsInKindDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchInKindDonationsInKindDonationIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchInKindDonationsInKindDonationIdPersonPersonId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchInKindDonationsInKindDonationIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchInKindDonationsInKindDonationIdPersonPersonId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchInKindDonationsInKindDonationIdPersonPersonId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"patchInKindDonationsInKindDonationIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"postInKindDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[In Kind Donation]\",\n      name: \"postInKindDonations_fieldsInKindDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"postInKindDonations_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"postInKindDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"postInKindDonations_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"postInKindDonations_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Exchange Details\",\n      name: \"postInKindDonations_exchangeDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Cents\",\n      name: \"postInKindDonations_fairMarketValueCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received On\",\n      name: \"postInKindDonations_receivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Valuation Details\",\n      name: \"postInKindDonations_valuationDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Internal Notes\",\n      name: \"postInKindDonations_internalNotes\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Currency\",\n      name: \"postInKindDonations_fairMarketValueCurrency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"postInKindDonations_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"postInKindDonations_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postInKindDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"postInKindDonations_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"postInKindDonations_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"postInKindDonations_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"In Kind Donation\"],\"operation\":[\"postInKindDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"deleteLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"deleteLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"deleteLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Where[slug]\",\n      name: \"getLabels_whereslug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getLabels_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getLabels_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getLabels_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getLabels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getLabels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"],\"getLabels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"getLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getLabelsLabelId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"getLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Label Id\",\n      name: \"patchLabelsLabelId_labelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"patchLabelsLabelId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"]}},\n    },\n    {\n      displayName: \"Slug\",\n      name: \"patchLabelsLabelId_slug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"patchLabelsLabelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"postLabels_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"]}},\n    },\n    {\n      displayName: \"Slug\",\n      name: \"postLabels_slug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Label\"],\"operation\":[\"postLabels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"deletePaymentSourcesPaymentSourceId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"deletePaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deletePaymentSourcesPaymentSourceIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"deletePaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fields[Payment Source]\",\n      name: \"getPaymentSources_fieldsPaymentSource\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPaymentSources_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPaymentSources_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPaymentSources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPaymentSources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"],\"getPaymentSources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"getPaymentSourcesPaymentSourceId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: \"Fields[Payment Source]\",\n      name: \"getPaymentSourcesPaymentSourceId_fieldsPaymentSource\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[payment Method]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherepaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherereceivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherereceivedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherereceivedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherereceivedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherereceivedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecompletedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecompletedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecompletedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lt]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecompletedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lte]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherecompletedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[labels][slug]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wherelabelsslug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPaymentSourcesPaymentSourceIdDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPaymentSourcesPaymentSourceIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPaymentSourcesPaymentSourceIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"],\"getPaymentSourcesPaymentSourceIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"getPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPaymentSourcesPaymentSourceId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: \"Fields[Payment Source]\",\n      name: \"patchPaymentSourcesPaymentSourceId_fieldsPaymentSource\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchPaymentSourcesPaymentSourceId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Status\",\n      name: \"patchPaymentSourcesPaymentSourceId_status\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Type\",\n      name: \"patchPaymentSourcesPaymentSourceId_paymentSourceType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchPaymentSourcesPaymentSourceIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"patchPaymentSourcesPaymentSourceIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fields[Payment Source]\",\n      name: \"postPaymentSources_fieldsPaymentSource\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"postPaymentSources_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Status\",\n      name: \"postPaymentSources_status\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Type\",\n      name: \"postPaymentSources_paymentSourceType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Payment Source\"],\"operation\":[\"postPaymentSources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdBatchGroupsBatchGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"deletePeoplePersonIdBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdBatchesBatchId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"deletePeoplePersonIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"deletePeoplePersonIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"deletePeoplePersonIdInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"deletePeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getMe_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getMe_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getMe_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"],\"getMe_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeople_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: \"Where[first Name]\",\n      name: \"getPeople_wherefirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: \"Where[last Name]\",\n      name: \"getPeople_wherelastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeople_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeople_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeople_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatchGroups_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeoplePersonIdBatchGroups_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getPeoplePersonIdBatchGroups_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getPeoplePersonIdBatchGroups_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getPeoplePersonIdBatchGroups_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getPeoplePersonIdBatchGroups_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getPeoplePersonIdBatchGroups_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[owner][first Name]\",\n      name: \"getPeoplePersonIdBatchGroups_whereownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Where[owner][last Name]\",\n      name: \"getPeoplePersonIdBatchGroups_whereownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdBatchGroups_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdBatchGroups_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getPeoplePersonIdBatchGroups_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdBatchGroups_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdBatchGroups_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdBatchGroups_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdBatchGroups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdBatchGroups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"],\"getPeoplePersonIdBatchGroups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdBatchGroupsBatchGroupId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatches_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getPeoplePersonIdBatches_filter\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getPeoplePersonIdBatches_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getPeoplePersonIdBatches_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getPeoplePersonIdBatches_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getPeoplePersonIdBatches_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getPeoplePersonIdBatches_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At]\",\n      name: \"getPeoplePersonIdBatches_wherebatchGroupupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][gt]\",\n      name: \"getPeoplePersonIdBatches_wherebatchGroupupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][gte]\",\n      name: \"getPeoplePersonIdBatches_wherebatchGroupupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][lt]\",\n      name: \"getPeoplePersonIdBatches_wherebatchGroupupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][updated At][lte]\",\n      name: \"getPeoplePersonIdBatches_wherebatchGroupupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[owner][first Name]\",\n      name: \"getPeoplePersonIdBatches_whereownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[owner][last Name]\",\n      name: \"getPeoplePersonIdBatches_whereownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][owner][first Name]\",\n      name: \"getPeoplePersonIdBatches_wherebatchGroupownerfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Where[batch Group][owner][last Name]\",\n      name: \"getPeoplePersonIdBatches_wherebatchGroupownerlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdBatches_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdBatches_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"getPeoplePersonIdBatches_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getPeoplePersonIdBatches_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdBatches_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdBatches_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdBatches_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdBatches_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdBatches_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"],\"getPeoplePersonIdBatches_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatches\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdBatchesBatchId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"getPeoplePersonIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdBatchesBatchId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"getPeoplePersonIdBatchesBatchId_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"getPeoplePersonIdBatchesBatchId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdBatchesBatchId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[payment Method]\",\n      name: \"getPeoplePersonIdDonations_wherepaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At]\",\n      name: \"getPeoplePersonIdDonations_wherereceivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gt]\",\n      name: \"getPeoplePersonIdDonations_wherereceivedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][gte]\",\n      name: \"getPeoplePersonIdDonations_wherereceivedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lt]\",\n      name: \"getPeoplePersonIdDonations_wherereceivedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[received At][lte]\",\n      name: \"getPeoplePersonIdDonations_wherereceivedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getPeoplePersonIdDonations_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getPeoplePersonIdDonations_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getPeoplePersonIdDonations_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getPeoplePersonIdDonations_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getPeoplePersonIdDonations_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getPeoplePersonIdDonations_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getPeoplePersonIdDonations_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getPeoplePersonIdDonations_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getPeoplePersonIdDonations_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getPeoplePersonIdDonations_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At]\",\n      name: \"getPeoplePersonIdDonations_wherecompletedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gt]\",\n      name: \"getPeoplePersonIdDonations_wherecompletedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][gte]\",\n      name: \"getPeoplePersonIdDonations_wherecompletedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lt]\",\n      name: \"getPeoplePersonIdDonations_wherecompletedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[completed At][lte]\",\n      name: \"getPeoplePersonIdDonations_wherecompletedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getPeoplePersonIdDonations_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[labels][slug]\",\n      name: \"getPeoplePersonIdDonations_wherelabelsslug\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getPeoplePersonIdDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getPeoplePersonIdDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getPeoplePersonIdDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getPeoplePersonIdDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdDonations_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getPeoplePersonIdDonations_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getPeoplePersonIdDonations_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getPeoplePersonIdDonations_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getPeoplePersonIdDonations_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getPeoplePersonIdDonations_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getPeoplePersonIdDonations_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"],\"getPeoplePersonIdDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"getPeoplePersonIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"getPeoplePersonIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"getPeoplePersonIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"getPeoplePersonIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"getPeoplePersonIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"getPeoplePersonIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"getPeoplePersonIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdInKindDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getPeoplePersonIdInKindDonations_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getPeoplePersonIdInKindDonations_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getPeoplePersonIdInKindDonations_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getPeoplePersonIdInKindDonations_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getPeoplePersonIdInKindDonations_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getPeoplePersonIdInKindDonations_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getPeoplePersonIdInKindDonations_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getPeoplePersonIdInKindDonations_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getPeoplePersonIdInKindDonations_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getPeoplePersonIdInKindDonations_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On]\",\n      name: \"getPeoplePersonIdInKindDonations_wherereceivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][gt]\",\n      name: \"getPeoplePersonIdInKindDonations_wherereceivedOngt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][gte]\",\n      name: \"getPeoplePersonIdInKindDonations_wherereceivedOngte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][lt]\",\n      name: \"getPeoplePersonIdInKindDonations_wherereceivedOnlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[received On][lte]\",\n      name: \"getPeoplePersonIdInKindDonations_wherereceivedOnlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getPeoplePersonIdInKindDonations_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[campus Id]\",\n      name: \"getPeoplePersonIdInKindDonations_wherecampusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][default]\",\n      name: \"getPeoplePersonIdInKindDonations_wherefunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][name]\",\n      name: \"getPeoplePersonIdInKindDonations_wherefundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][id]\",\n      name: \"getPeoplePersonIdInKindDonations_wherefundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[fund][visibility]\",\n      name: \"getPeoplePersonIdInKindDonations_wherefundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[person][first Name]\",\n      name: \"getPeoplePersonIdInKindDonations_wherepersonfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Where[person][last Name]\",\n      name: \"getPeoplePersonIdInKindDonations_wherepersonlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdInKindDonations_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdInKindDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[In Kind Donation]\",\n      name: \"getPeoplePersonIdInKindDonations_fieldsInKindDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getPeoplePersonIdInKindDonations_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdInKindDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdInKindDonations_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdInKindDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdInKindDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdInKindDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdInKindDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"],\"getPeoplePersonIdInKindDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[In Kind Donation]\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_fieldsInKindDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdInKindDonationsInKindDonationId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethods_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n    },\n    {\n      displayName: \"Fields[Payment Method]\",\n      name: \"getPeoplePersonIdPaymentMethods_fieldsPaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPaymentMethods_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPaymentMethods_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPaymentMethods_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPaymentMethods_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"],\"getPeoplePersonIdPaymentMethods_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethods\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodId\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodId_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodId\"]}},\n    },\n    {\n      displayName: \"Fields[Payment Method]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodId_fieldsPaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_fieldsRecurringDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"],\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_fieldsRecurringDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPaymentMethodsPaymentMethodIdRecurringDonationsRecurringDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getPeoplePersonIdPledges_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getPeoplePersonIdPledges_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getPeoplePersonIdPledges_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getPeoplePersonIdPledges_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getPeoplePersonIdPledges_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getPeoplePersonIdPledges_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getPeoplePersonIdPledges_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getPeoplePersonIdPledges_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getPeoplePersonIdPledges_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getPeoplePersonIdPledges_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[joint Giver][first Name]\",\n      name: \"getPeoplePersonIdPledges_wherejointGiverfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[joint Giver][last Name]\",\n      name: \"getPeoplePersonIdPledges_wherejointGiverlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignstartsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][gt]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignstartsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][gte]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignstartsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][lt]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignstartsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][lte]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignstartsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignendsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][gt]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignendsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][gte]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignendsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][lt]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignendsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][lte]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignendsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund Id]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignfundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][default]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][name]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][id]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][visibility]\",\n      name: \"getPeoplePersonIdPledges_wherepledgeCampaignfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdPledges_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPledges_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge]\",\n      name: \"getPeoplePersonIdPledges_fieldsPledge\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdPledges_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"getPeoplePersonIdPledges_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledges_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPledges_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPledges_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledges_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledges_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"],\"getPeoplePersonIdPledges_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledges\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPledgesPledgeId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge]\",\n      name: \"getPeoplePersonIdPledgesPledgeId_fieldsPledge\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdPledgesPledgeId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"getPeoplePersonIdPledgesPledgeId_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledgesPledgeId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: \"Where[first Name]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_wherefirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: \"Where[last Name]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_wherelastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiver_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"],\"getPeoplePersonIdPledgesPledgeIdJointGiver_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiver\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Joint Giver Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_jointGiverId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[starts At]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherestartsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherestartsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[starts At][gte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherestartsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherestartsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[starts At][lte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherestartsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[ends At]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_whereendsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_whereendsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[ends At][gte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_whereendsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_whereendsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[ends At][lte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_whereendsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[fund Id]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherefundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[fund][default]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherefunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[fund][name]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherefundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[fund][id]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherefundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Where[fund][visibility]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_wherefundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"],\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaign\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Where[default]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_wheredefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Where[visibility]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_wherevisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"],\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherecreatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][gt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherecreatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][gte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherecreatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][lt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherecreatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[created At][lte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherecreatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_whereupdatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_whereupdatedAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][gte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_whereupdatedAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_whereupdatedAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[updated At][lte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_whereupdatedAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[joint Giver][first Name]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherejointGiverfirstName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[joint Giver][last Name]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherejointGiverlastName\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignstartsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][gt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignstartsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][gte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignstartsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][lt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignstartsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][starts At][lte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignstartsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignendsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][gt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignendsAtgt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][gte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignendsAtgte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][lt]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignendsAtlt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][ends At][lte]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignendsAtlte\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund Id]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignfundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][default]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][name]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][id]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Where[pledge Campaign][fund][visibility]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_wherepledgeCampaignfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_order\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_fieldsPledge\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"],\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledges\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsPledge\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPrimaryCampus_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getPeoplePersonIdPrimaryCampus_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdPrimaryCampus_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdPrimaryCampus_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdPrimaryCampus_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdPrimaryCampus_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"],\"getPeoplePersonIdPrimaryCampus_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampus\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdPrimaryCampusPrimaryCampusId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\"]}},\n    },\n    {\n      displayName: \"Primary Campus Id\",\n      name: \"getPeoplePersonIdPrimaryCampusPrimaryCampusId_primaryCampusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"getPeoplePersonIdPrimaryCampusPrimaryCampusId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdPrimaryCampusPrimaryCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdRecurringDonations_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getPeoplePersonIdRecurringDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getPeoplePersonIdRecurringDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getPeoplePersonIdRecurringDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getPeoplePersonIdRecurringDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdRecurringDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation]\",\n      name: \"getPeoplePersonIdRecurringDonations_fieldsRecurringDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getPeoplePersonIdRecurringDonations_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdRecurringDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getPeoplePersonIdRecurringDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getPeoplePersonIdRecurringDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeoplePersonIdRecurringDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeoplePersonIdRecurringDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"],\"getPeoplePersonIdRecurringDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation]\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_fieldsRecurringDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getPeoplePersonIdRecurringDonationsRecurringDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonIdRecurringDonationsRecurringDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchPeoplePersonId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchPeoplePersonId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdBatchGroupsBatchGroupId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchGroupsBatchGroupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdBatchesBatchId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchPeoplePersonIdBatchesBatchId_batchId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdBatchesBatchId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch]\",\n      name: \"patchPeoplePersonIdBatchesBatchId_fieldsBatch\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Batch Group]\",\n      name: \"patchPeoplePersonIdBatchesBatchId_fieldsBatchGroup\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchPeoplePersonIdBatchesBatchId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdBatchesBatchId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Group Id\",\n      name: \"patchPeoplePersonIdBatchesBatchId_batchGroupId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdBatchesBatchId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Donation Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_donationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdDonationsDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Donation]\",\n      name: \"patchPeoplePersonIdDonationsDonationId_fieldsDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation]\",\n      name: \"patchPeoplePersonIdDonationsDonationId_fieldsDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Label]\",\n      name: \"patchPeoplePersonIdDonationsDonationId_fieldsLabel\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Note]\",\n      name: \"patchPeoplePersonIdDonationsDonationId_fieldsNote\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Refund]\",\n      name: \"patchPeoplePersonIdDonationsDonationId_fieldsRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Designation Refund]\",\n      name: \"patchPeoplePersonIdDonationsDonationId_fieldsDesignationRefund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchPeoplePersonIdDonationsDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n    },\n    {\n      displayName: \"Payment Method Sub\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentMethodSub\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Last4\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentLast4\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Brand\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentBrand\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Number\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentCheckNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Check Dated At\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentCheckDatedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fee Cents\",\n      name: \"patchPeoplePersonIdDonationsDonationId_feeCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Method\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received At\",\n      name: \"patchPeoplePersonIdDonationsDonationId_receivedAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentSourceId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Labels Ids\",\n      name: \"patchPeoplePersonIdDonationsDonationId_labelsIds\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Batch Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_batchId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchPeoplePersonIdDonationsDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchPeoplePersonIdDonationsDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPeoplePersonIdDonationsDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Payment Source ID\",\n      name: \"patchPeoplePersonIdDonationsDonationId_paymentSourceIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdDonationsDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"In Kind Donation Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_inKindDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[In Kind Donation]\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fieldsInKindDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Campus]\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fieldsCampus\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Exchange Details\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_exchangeDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Cents\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fairMarketValueCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Received On\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_receivedOn\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Valuation Details\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_valuationDetails\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Internal Notes\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_internalNotes\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fair Market Value Currency\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fairMarketValueCurrency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_campusId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"patchPeoplePersonIdInKindDonationsInKindDonationId_campusIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdInKindDonationsInKindDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge]\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_fieldsPledge\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Amount Cents\",\n      name: \"patchPeoplePersonIdPledgesPledgeId_amountCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Joint Giver Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_jointGiverId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n    },\n    {\n      displayName: \"Donor Number\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId_donorNumber\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdJointGiverJointGiverId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Starts At\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_startsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ends At\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_endsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Goal Cents\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_goalCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Show Goal In Church Center\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_showGoalInChurchCenter\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fundId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Fund ID\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId_fundIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsPledge\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n    },\n    {\n      displayName: \"Amount Cents\",\n      name: \"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId_amountCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"patchPeoplePersonIdPledgesPledgeIdPledgeCampaignPledgeCampaignIdPledgesPledgeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postPeoplePersonIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postPeoplePersonIdPledges_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge]\",\n      name: \"postPeoplePersonIdPledges_fieldsPledge\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Person]\",\n      name: \"postPeoplePersonIdPledges_fieldsPerson\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Pledge Campaign]\",\n      name: \"postPeoplePersonIdPledges_fieldsPledgeCampaign\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"postPeoplePersonIdPledges_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n    },\n    {\n      displayName: \"Amount Cents\",\n      name: \"postPeoplePersonIdPledges_amountCents\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person Id\",\n      name: \"postPeoplePersonIdPledges_personId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign Id\",\n      name: \"postPeoplePersonIdPledges_pledgeCampaignId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"postPeoplePersonIdPledges_personIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Pledge Campaign ID\",\n      name: \"postPeoplePersonIdPledges_pledgeCampaignIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"postPeoplePersonIdPledges\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"deleteRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Where[designations][fund][default]\",\n      name: \"getRecurringDonations_wheredesignationsfunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][name]\",\n      name: \"getRecurringDonations_wheredesignationsfundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][id]\",\n      name: \"getRecurringDonations_wheredesignationsfundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Where[designations][fund][visibility]\",\n      name: \"getRecurringDonations_wheredesignationsfundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getRecurringDonations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation]\",\n      name: \"getRecurringDonations_fieldsRecurringDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getRecurringDonations_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getRecurringDonations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getRecurringDonations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getRecurringDonations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"],\"getRecurringDonations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getRecurringDonationsRecurringDonationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation]\",\n      name: \"getRecurringDonationsRecurringDonationId_fieldsRecurringDonation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getRecurringDonationsRecurringDonationId_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getRecurringDonationsRecurringDonationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][default]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_wherefunddefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][name]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_wherefundname\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][id]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_wherefundid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Where[fund][visibility]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_wherefundvisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonationsRecurringDonationIdDesignations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"],\"getRecurringDonationsRecurringDonationIdDesignations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Designation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_designationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_include\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Fields[Recurring Donation Designation]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_fieldsRecurringDonationDesignation\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsDesignationId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsDesignationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[default]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_wheredefault\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[name]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_wherename\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[id]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_whereid\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Where[visibility]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_wherevisibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"],\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFund\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n    },\n    {\n      displayName: \"Fields[Payment Method]\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_fieldsPaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n    },\n    {\n      displayName: \"Per Page\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_perPage\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n    },\n    {\n      displayName: \"Offset\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_offset\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethod_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"],\"getRecurringDonationsRecurringDonationIdPaymentMethod_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethod\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\"]}},\n    },\n    {\n      displayName: \"Payment Method Id\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId_paymentMethodId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\"]}},\n    },\n    {\n      displayName: \"Fields[Payment Method]\",\n      name: \"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId_fieldsPaymentMethod\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"getRecurringDonationsRecurringDonationIdPaymentMethodPaymentMethodId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Recurring Donation Id\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Recurring Donation Designation Id\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_recurringDonationDesignationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fund Id\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fundId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Fields[Fund]\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_fieldsFund\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n    },\n    {\n      displayName: \"Name\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Ledger Code\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_ledgerCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Description\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Visibility\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_visibility\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Color Identifier\",\n      name: \"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId_colorIdentifier\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Recurring Donation\"],\"operation\":[\"patchRecurringDonationsRecurringDonationIdDesignationsRecurringDonationDesignationIdFundFundId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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
    const value = context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, undefined) as unknown;
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
    const value = context.getNodeParameter(`${operation.id}_${parameter.name}`, itemIndex, undefined) as unknown;
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
