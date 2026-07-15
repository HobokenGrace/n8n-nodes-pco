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

interface GeneratedLookup {
  methodName: string;
  sourcePath: string;
  parentBindings: GeneratedLookupParentBinding[];
  searchFilter?: string;
  labelFields: string[];
  resultLimit: number;
}

interface GeneratedField {
  name: string;
  sourceName: string;
  displayName: string;
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
  operation: string;
  description: string;
  method: IHttpRequestMethods;
  path: string;
  deprecated: boolean;
  isList: boolean;
  lookupTarget: string;
  pathParameters: GeneratedField[];
  queryParameters: GeneratedField[];
  queryOptions: GeneratedQueryOption[];
  attributeFields: GeneratedField[];
  relationshipFields: GeneratedRelationshipField[];
}

const OPERATIONS: Operation[] = [
  {
    "id": "getAvailableEvents",
    "resource": "Available Event",
    "operation": "List Available Events",
    "description": "GET /available_events",
    "method": "GET",
    "path": "/webhooks/v2/available_events",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "available event",
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries",
    "resource": "Webhook Subscription",
    "operation": "List Deliveries (via Event)",
    "description": "GET /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries",
    "method": "GET",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "delivery",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesEventId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
          "parentBindings": [
            {
              "sourceName": "webhook_subscription_id",
              "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_webhookSubscriptionId"
            }
          ],
          "labelFields": [
            "name",
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
    "id": "getWebhookSubscriptionsWebhookSubscriptionIdEvents",
    "resource": "Webhook Subscription",
    "operation": "List Events (via Webhook Subscription)",
    "description": "GET /webhook_subscriptions/{webhook_subscription_id}/events",
    "method": "GET",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
    "id": "getWebhookSubscriptions",
    "resource": "Webhook Subscription",
    "operation": "List Webhook Subscriptions",
    "description": "GET /webhook_subscriptions",
    "method": "GET",
    "path": "/webhooks/v2/webhook_subscriptions",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "webhook subscription",
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId",
    "resource": "Webhook Subscription",
    "operation": "Get Delivery (via Event)",
    "description": "GET /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries/{delivery_id}",
    "method": "GET",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries/{delivery_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "delivery",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdEventId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
          "parentBindings": [
            {
              "sourceName": "webhook_subscription_id",
              "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_webhookSubscriptionId"
            }
          ],
          "labelFields": [
            "name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "deliveryId",
        "sourceName": "delivery_id",
        "displayName": "Delivery ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdDeliveryId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries",
          "parentBindings": [
            {
              "sourceName": "webhook_subscription_id",
              "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_webhookSubscriptionId"
            },
            {
              "sourceName": "event_id",
              "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_eventId"
            }
          ],
          "labelFields": [
            "name",
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
    "id": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId",
    "resource": "Webhook Subscription",
    "operation": "Get Event (via Webhook Subscription)",
    "description": "GET /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}",
    "method": "GET",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events/{event_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "event",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdEventId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
          "parentBindings": [
            {
              "sourceName": "webhook_subscription_id",
              "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId_webhookSubscriptionId"
            }
          ],
          "labelFields": [
            "name",
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
    "id": "getWebhookSubscriptionsWebhookSubscriptionId",
    "resource": "Webhook Subscription",
    "operation": "Get Webhook Subscription",
    "description": "GET /webhook_subscriptions/{webhook_subscription_id}",
    "method": "GET",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "webhook subscription",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
    "id": "postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore",
    "resource": "Webhook Subscription",
    "operation": "Create Ignore (via Event)",
    "description": "POST /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/ignore",
    "method": "POST",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/ignore",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "ignore",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
          "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreEventId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
          "parentBindings": [
            {
              "sourceName": "webhook_subscription_id",
              "fieldName": "postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore_webhookSubscriptionId"
            }
          ],
          "labelFields": [
            "name",
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
    "id": "postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver",
    "resource": "Webhook Subscription",
    "operation": "Create Redeliver (via Event)",
    "description": "POST /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/redeliver",
    "method": "POST",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/redeliver",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "redeliver",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
          "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverEventId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
          "parentBindings": [
            {
              "sourceName": "webhook_subscription_id",
              "fieldName": "postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver_webhookSubscriptionId"
            }
          ],
          "labelFields": [
            "name",
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
    "id": "postWebhookSubscriptionsWebhookSubscriptionIdRotateSecret",
    "resource": "Webhook Subscription",
    "operation": "Create Rotate Secret (via Webhook Subscription)",
    "description": "POST /webhook_subscriptions/{webhook_subscription_id}/rotate_secret",
    "method": "POST",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/rotate_secret",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "rotate secret",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdRotateSecretWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
    "id": "postWebhookSubscriptions",
    "resource": "Webhook Subscription",
    "operation": "Create Webhook Subscription",
    "description": "POST /webhook_subscriptions",
    "method": "POST",
    "path": "/webhooks/v2/webhook_subscriptions",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "webhook subscription",
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
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "active",
        "sourceName": "active",
        "displayName": "Active",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchWebhookSubscriptionsWebhookSubscriptionId",
    "resource": "Webhook Subscription",
    "operation": "Update Webhook Subscription",
    "description": "PATCH /webhook_subscriptions/{webhook_subscription_id}",
    "method": "PATCH",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "webhook subscription",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
    "attributeFields": [
      {
        "name": "active",
        "sourceName": "active",
        "displayName": "Active",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteWebhookSubscriptionsWebhookSubscriptionId",
    "resource": "Webhook Subscription",
    "operation": "Delete Webhook Subscription",
    "description": "DELETE /webhook_subscriptions/{webhook_subscription_id}",
    "method": "DELETE",
    "path": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "webhook subscription",
    "pathParameters": [
      {
        "name": "webhookSubscriptionId",
        "sourceName": "webhook_subscription_id",
        "displayName": "Webhook Subscription ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId",
          "sourcePath": "/webhooks/v2/webhook_subscriptions",
          "parentBindings": [],
          "labelFields": [
            "name",
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
  "searchDeleteWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId": {
    "methodName": "searchDeleteWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdDeliveryId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdDeliveryId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries",
    "parentBindings": [
      {
        "sourceName": "webhook_subscription_id",
        "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_webhookSubscriptionId"
      },
      {
        "sourceName": "event_id",
        "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_eventId"
      }
    ],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdEventId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdEventId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
    "parentBindings": [
      {
        "sourceName": "webhook_subscription_id",
        "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_webhookSubscriptionId"
      }
    ],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdWebhookSubscriptionId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesEventId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesEventId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
    "parentBindings": [
      {
        "sourceName": "webhook_subscription_id",
        "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_webhookSubscriptionId"
      }
    ],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesWebhookSubscriptionId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdEventId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdEventId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
    "parentBindings": [
      {
        "sourceName": "webhook_subscription_id",
        "fieldName": "getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId_webhookSubscriptionId"
      }
    ],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdWebhookSubscriptionId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsWebhookSubscriptionId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId": {
    "methodName": "searchGetWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchPatchWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId": {
    "methodName": "searchPatchWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreEventId": {
    "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreEventId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
    "parentBindings": [
      {
        "sourceName": "webhook_subscription_id",
        "fieldName": "postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore_webhookSubscriptionId"
      }
    ],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreWebhookSubscriptionId": {
    "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverEventId": {
    "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverEventId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions/{webhook_subscription_id}/events",
    "parentBindings": [
      {
        "sourceName": "webhook_subscription_id",
        "fieldName": "postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver_webhookSubscriptionId"
      }
    ],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverWebhookSubscriptionId": {
    "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchPostWebhookSubscriptionsWebhookSubscriptionIdRotateSecretWebhookSubscriptionId": {
    "methodName": "searchPostWebhookSubscriptionsWebhookSubscriptionIdRotateSecretWebhookSubscriptionId",
    "sourcePath": "/webhooks/v2/webhook_subscriptions",
    "parentBindings": [],
    "labelFields": [
      "name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  }
};

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Available Event\",\"value\":\"Available Event\"},{\"name\":\"Webhook Subscription\",\"value\":\"Webhook Subscription\"}],\n      default: \"Available Event\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Available Event\"]}},\n      options: [{\"name\":\"List Available Events\",\"value\":\"getAvailableEvents\",\"description\":\"GET /available_events\",\"action\":\"List Available Events\"}],\n      default: \"getAvailableEvents\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"]}},\n      options: [{\"name\":\"List Deliveries (via Event)\",\"value\":\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\",\"description\":\"GET /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries\",\"action\":\"List Deliveries (via Event)\"},{\"name\":\"List Events (via Webhook Subscription)\",\"value\":\"getWebhookSubscriptionsWebhookSubscriptionIdEvents\",\"description\":\"GET /webhook_subscriptions/{webhook_subscription_id}/events\",\"action\":\"List Events (via Webhook Subscription)\"},{\"name\":\"List Webhook Subscriptions\",\"value\":\"getWebhookSubscriptions\",\"description\":\"GET /webhook_subscriptions\",\"action\":\"List Webhook Subscriptions\"},{\"name\":\"Get Delivery (via Event)\",\"value\":\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId\",\"description\":\"GET /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/deliveries/{delivery_id}\",\"action\":\"Get Delivery (via Event)\"},{\"name\":\"Get Event (via Webhook Subscription)\",\"value\":\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId\",\"description\":\"GET /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}\",\"action\":\"Get Event (via Webhook Subscription)\"},{\"name\":\"Get Webhook Subscription\",\"value\":\"getWebhookSubscriptionsWebhookSubscriptionId\",\"description\":\"GET /webhook_subscriptions/{webhook_subscription_id}\",\"action\":\"Get Webhook Subscription\"},{\"name\":\"Create Ignore (via Event)\",\"value\":\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore\",\"description\":\"POST /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/ignore\",\"action\":\"Create Ignore (via Event)\"},{\"name\":\"Create Redeliver (via Event)\",\"value\":\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver\",\"description\":\"POST /webhook_subscriptions/{webhook_subscription_id}/events/{event_id}/redeliver\",\"action\":\"Create Redeliver (via Event)\"},{\"name\":\"Create Rotate Secret (via Webhook Subscription)\",\"value\":\"postWebhookSubscriptionsWebhookSubscriptionIdRotateSecret\",\"description\":\"POST /webhook_subscriptions/{webhook_subscription_id}/rotate_secret\",\"action\":\"Create Rotate Secret (via Webhook Subscription)\"},{\"name\":\"Create Webhook Subscription\",\"value\":\"postWebhookSubscriptions\",\"description\":\"POST /webhook_subscriptions\",\"action\":\"Create Webhook Subscription\"},{\"name\":\"Update Webhook Subscription\",\"value\":\"patchWebhookSubscriptionsWebhookSubscriptionId\",\"description\":\"PATCH /webhook_subscriptions/{webhook_subscription_id}\",\"action\":\"Update Webhook Subscription\"},{\"name\":\"Delete Webhook Subscription\",\"value\":\"deleteWebhookSubscriptionsWebhookSubscriptionId\",\"description\":\"DELETE /webhook_subscriptions/{webhook_subscription_id}\",\"action\":\"Delete Webhook Subscription\"}],\n      default: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\",\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAvailableEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Available Event\"],\"operation\":[\"getAvailableEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAvailableEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Available Event\"],\"operation\":[\"getAvailableEvents\"],\"getAvailableEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Available Event\"],\"operation\":[\"getAvailableEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\"],\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEvents_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEvents\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEvents_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEvents\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEvents_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEvents\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEvents_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEvents\"],\"getWebhookSubscriptionsWebhookSubscriptionIdEvents_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEvents\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getWebhookSubscriptions_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptions\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getWebhookSubscriptions_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptions\"],\"getWebhookSubscriptions_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptions\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId\"]}},\n    },\n    {\n      displayName: \"Delivery ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId_deliveryId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdDeliveryId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionIdEventsEventId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"getWebhookSubscriptionsWebhookSubscriptionId_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"getWebhookSubscriptionsWebhookSubscriptionId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnore\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver\"]}},\n    },\n    {\n      displayName: \"Event ID\",\n      name: \"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver_eventId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverEventId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliver\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"postWebhookSubscriptionsWebhookSubscriptionIdRotateSecret_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostWebhookSubscriptionsWebhookSubscriptionIdRotateSecretWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdRotateSecret\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdRotateSecret\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdRotateSecret\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptionsWebhookSubscriptionIdRotateSecret\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptions\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"postWebhookSubscriptions_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptions\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postWebhookSubscriptions_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptions\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Active\",\n      name: \"postWebhookSubscriptions_active\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptions\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptions\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"postWebhookSubscriptions\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"patchWebhookSubscriptionsWebhookSubscriptionId_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"patchWebhookSubscriptionsWebhookSubscriptionId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"patchWebhookSubscriptionsWebhookSubscriptionId\"]}},\n    },\n    {\n      displayName: \"Attribute: Active\",\n      name: \"patchWebhookSubscriptionsWebhookSubscriptionId_active\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"patchWebhookSubscriptionsWebhookSubscriptionId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"patchWebhookSubscriptionsWebhookSubscriptionId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"patchWebhookSubscriptionsWebhookSubscriptionId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Webhook Subscription ID\",\n      name: \"deleteWebhookSubscriptionsWebhookSubscriptionId_webhookSubscriptionId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"deleteWebhookSubscriptionsWebhookSubscriptionId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Webhook Subscription\"],\"operation\":[\"deleteWebhookSubscriptionsWebhookSubscriptionId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

function lookupResultName(item: any, lookup: GeneratedLookup): string {
  const id = item?.id === undefined || item?.id === null ? '' : String(item.id);
  const attributes = item?.attributes && typeof item.attributes === 'object' ? item.attributes as Record<string, unknown> : {};
  const display = lookup.labelFields
    .map((field) => attributes[field])
    .find((value) => typeof value === 'string' && value.trim());

  return display ? String(display) + ' (' + id + ')' : id;
}

async function searchLookup(context: ILoadOptionsFunctions, lookup: GeneratedLookup, filter?: string): Promise<INodeListSearchResult> {
  const qs: IDataObject = { per_page: lookup.resultLimit };
  if (filter && lookup.searchFilter) qs[lookup.searchFilter] = filter;

  let path = lookup.sourcePath;
  for (const binding of lookup.parentBindings) {
    const id = extractResourceLocatorId(context.getNodeParameter(binding.fieldName, ''));
    if (!id) return { results: [] };
    path = path.replace('{' + binding.sourceName + '}', encodeURIComponent(id));
  }

  const response = await planningCenterApiRequest.call(context as unknown as IExecuteFunctions, { method: 'GET', path, qs });
  const data: any[] = Array.isArray((response as any)?.data) ? (response as any).data : [];

  return {
    results: data
      .map((item: any) => ({ name: lookupResultName(item, lookup), value: item?.id === undefined || item?.id === null ? '' : String(item.id) }))
      .filter((item: { value: string }) => item.value),
  };
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
    const attributeValue = field.lookup ? extractResourceLocatorId(value) : value;
    if (attributeValue !== undefined && attributeValue !== '') {
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
      type: operation.resource,
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

export class PlanningCenterWebhooks implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Webhooks",
    name: "planningCenterWebhooks",
    icon: 'file:webhooks.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Planning Center Webhooks generated from the Planning Center OpenAPI snapshot.",
    defaults: {
      name: "Planning Center Webhooks",
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
      searchDeleteWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdDeliveryId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdDeliveryId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdEventId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesDeliveryIdWebhookSubscriptionId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesEventId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdDeliveriesWebhookSubscriptionId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdEventId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdWebhookSubscriptionId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdEventsWebhookSubscriptionId"], filter);
      },
      searchGetWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId"], filter);
      },
      searchPatchWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchWebhookSubscriptionsWebhookSubscriptionIdWebhookSubscriptionId"], filter);
      },
      searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreEventId"], filter);
      },
      searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdIgnoreWebhookSubscriptionId"], filter);
      },
      searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverEventId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverEventId"], filter);
      },
      searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostWebhookSubscriptionsWebhookSubscriptionIdEventsEventIdRedeliverWebhookSubscriptionId"], filter);
      },
      searchPostWebhookSubscriptionsWebhookSubscriptionIdRotateSecretWebhookSubscriptionId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostWebhookSubscriptionsWebhookSubscriptionIdRotateSecretWebhookSubscriptionId"], filter);
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
        throw new Error(`Unsupported Planning Center Webhooks operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
