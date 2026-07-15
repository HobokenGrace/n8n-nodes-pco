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
    "id": "getChannelsChannelIdChannelDefaultEpisodeResources",
    "resource": "Channel",
    "operation": "List Channel Default Episode Resources (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_episode_resources",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_episode_resources",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "channel default episode resource",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "id": "getChannelsChannelIdChannelDefaultTimes",
    "resource": "Channel",
    "operation": "List Channel Default Times (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_times",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_times",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "channel default time",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdChannelDefaultTimesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "id": "getChannels",
    "resource": "Channel",
    "operation": "List Channels",
    "description": "GET /channels",
    "method": "GET",
    "path": "/publishing/v2/channels",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "channel",
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
    "id": "getChannelsChannelIdCurrentEpisode",
    "resource": "Channel",
    "operation": "List Current Episode (via Channel)",
    "description": "GET /channels/{channel_id}/current_episode",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/current_episode",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdCurrentEpisodeChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "whereseriesid",
        "sourceName": "where[series][id]",
        "displayName": "Where[series][id]",
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
        "name": "whereseriesid",
        "displayName": "Series ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[series][id]",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdCurrentEpisodeWhereseriesid",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getChannelsChannelIdCurrentEpisode_channelId"
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
    "id": "getChannelsChannelIdEpisodes",
    "resource": "Channel",
    "operation": "List Episodes (via Channel)",
    "description": "GET /channels/{channel_id}/episodes",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/episodes",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdEpisodesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "whereseriesid",
        "sourceName": "where[series][id]",
        "displayName": "Where[series][id]",
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
        "name": "whereseriesid",
        "displayName": "Series ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[series][id]",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdEpisodesWhereseriesid",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getChannelsChannelIdEpisodes_channelId"
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
    "id": "getChannelsChannelIdNextTimes",
    "resource": "Channel",
    "operation": "List Next Times (via Channel)",
    "description": "GET /channels/{channel_id}/next_times",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/next_times",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "channel next time",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdNextTimesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "id": "getChannelsChannelIdSeries",
    "resource": "Channel",
    "operation": "List Series (via Channel)",
    "description": "GET /channels/{channel_id}/series",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/series",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdSeriesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdSeriesWhereid",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getChannelsChannelIdSeries_channelId"
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
    "id": "getChannelsChannelIdStatistics",
    "resource": "Channel",
    "operation": "List Statistics (via Channel)",
    "description": "GET /channels/{channel_id}/statistics",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/statistics",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "episode statistic",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdStatisticsChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "id": "getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId",
    "resource": "Channel",
    "operation": "Get Channel Default Episode Resource (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_episode_resources/{channel_default_episode_resource_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_episode_resources/{channel_default_episode_resource_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel default episode resource",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "channelDefaultEpisodeResourceId",
        "sourceName": "channel_default_episode_resource_id",
        "displayName": "Channel Default Episode Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelDefaultEpisodeResourceId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_episode_resources",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId_channelId"
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
    "id": "getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId",
    "resource": "Channel",
    "operation": "Get Channel Default Time (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel default time",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "channelDefaultTimeId",
        "sourceName": "channel_default_time_id",
        "displayName": "Channel Default Time ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_times",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId"
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
    "id": "getChannelsChannelId",
    "resource": "Channel",
    "operation": "Get Channel",
    "description": "GET /channels/{channel_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "id": "getChannelsChannelIdCurrentEpisodeCurrentEpisodeId",
    "resource": "Channel",
    "operation": "Get Current Episode (via Channel)",
    "description": "GET /channels/{channel_id}/current_episode/{current_episode_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/current_episode/{current_episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "currentEpisodeId",
        "sourceName": "current_episode_id",
        "displayName": "Current Episode ID",
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
    "id": "getChannelsChannelIdEpisodesEpisodeId",
    "resource": "Channel",
    "operation": "Get Episode (via Channel)",
    "description": "GET /channels/{channel_id}/episodes/{episode_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdEpisodesEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getChannelsChannelIdEpisodesEpisodeId_episodeId"
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
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdEpisodesEpisodeIdEpisodeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getChannelsChannelIdEpisodesEpisodeId_channelId"
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
    "id": "getChannelsChannelIdNextTimesNextTimeId",
    "resource": "Channel",
    "operation": "Get Next Time (via Channel)",
    "description": "GET /channels/{channel_id}/next_times/{next_time_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/next_times/{next_time_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel next time",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdNextTimesNextTimeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "nextTimeId",
        "sourceName": "next_time_id",
        "displayName": "Next Time ID",
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
    "id": "getChannelsChannelIdSeriesSeriesId",
    "resource": "Channel",
    "operation": "Get Series (via Channel)",
    "description": "GET /channels/{channel_id}/series/{series_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdSeriesSeriesIdChannelId",
          "sourcePath": "/publishing/v2/series/{series_id}/channel",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getChannelsChannelIdSeriesSeriesId_seriesId"
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getChannelsChannelIdSeriesSeriesId_channelId"
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
    "id": "getChannelsChannelIdStatisticsStatisticId",
    "resource": "Channel",
    "operation": "Get Statistic (via Channel)",
    "description": "GET /channels/{channel_id}/statistics/{statistic_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/statistics/{statistic_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode statistic",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetChannelsChannelIdStatisticsStatisticIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "statisticId",
        "sourceName": "statistic_id",
        "displayName": "Statistic ID",
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
    "id": "postChannelsChannelIdChannelDefaultTimes",
    "resource": "Channel",
    "operation": "Create Channel Default Time (via Channel)",
    "description": "POST /channels/{channel_id}/channel_default_times",
    "method": "POST",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_times",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel default time",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdChannelDefaultTimesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "attributeFields": [
      {
        "name": "dayOfWeek",
        "sourceName": "day_of_week",
        "displayName": "Day Of Week",
        "required": false,
        "type": "number"
      },
      {
        "name": "hour",
        "sourceName": "hour",
        "displayName": "Hour",
        "required": false,
        "type": "number"
      },
      {
        "name": "minute",
        "sourceName": "minute",
        "displayName": "Minute",
        "required": false,
        "type": "number"
      },
      {
        "name": "frequency",
        "sourceName": "frequency",
        "displayName": "Frequency",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "destroy",
        "sourceName": "_destroy",
        "displayName": "Destroy",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postChannels",
    "resource": "Channel",
    "operation": "Create Channel",
    "description": "POST /channels",
    "method": "POST",
    "path": "/publishing/v2/channels",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
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
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastArt",
        "sourceName": "podcast_art",
        "displayName": "Podcast Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastSettings",
        "sourceName": "podcast_settings",
        "displayName": "Podcast Settings",
        "required": false,
        "type": "string"
      },
      {
        "name": "activateEpisodeMinutesBefore",
        "sourceName": "activate_episode_minutes_before",
        "displayName": "Activate Episode Minutes Before",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoEmbedCode",
        "sourceName": "default_video_embed_code",
        "displayName": "Default Video Embed Code",
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
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "defaultVideoDuration",
        "sourceName": "default_video_duration",
        "displayName": "Default Video Duration",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoUrl",
        "sourceName": "default_video_url",
        "displayName": "Default Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "enableAudio",
        "sourceName": "enable_audio",
        "displayName": "Enable Audio",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableOnDemandVideo",
        "sourceName": "enable_on_demand_video",
        "displayName": "Enable On Demand Video",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableWatchLive",
        "sourceName": "enable_watch_live",
        "displayName": "Enable Watch Live",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "generalChatEnabled",
        "sourceName": "general_chat_enabled",
        "displayName": "General Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "groupChatEnabled",
        "sourceName": "group_chat_enabled",
        "displayName": "Group Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "archived",
        "sourceName": "archived",
        "displayName": "Archived",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sermonNotesEnabled",
        "sourceName": "sermon_notes_enabled",
        "displayName": "Sermon Notes Enabled",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postChannelsChannelIdCurrentEpisode",
    "resource": "Channel",
    "operation": "Create Current Episode (via Channel)",
    "description": "POST /channels/{channel_id}/current_episode",
    "method": "POST",
    "path": "/publishing/v2/channels/{channel_id}/current_episode",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "current episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdCurrentEpisodeChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdCurrentEpisodeChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdCurrentEpisodeSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "postChannelsChannelIdCurrentEpisode_channelId"
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
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
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
        "name": "sermonAudio",
        "sourceName": "sermon_audio",
        "displayName": "Sermon Audio",
        "required": false,
        "type": "string"
      },
      {
        "name": "streamType",
        "sourceName": "stream_type",
        "displayName": "Stream Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "publishedToLibraryAt",
        "sourceName": "published_to_library_at",
        "displayName": "Published To Library At",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryAudioUrl",
        "sourceName": "library_audio_url",
        "displayName": "Library Audio Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryVideoUrl",
        "sourceName": "library_video_url",
        "displayName": "Library Video Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "seriesIds",
        "displayName": "Series ID",
        "relationshipName": "series",
        "relationshipType": "Series",
        "multiple": false,
        "lookup": {
          "methodName": "searchPostChannelsChannelIdCurrentEpisodeSeriesIds",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "postChannelsChannelIdCurrentEpisode_channelId"
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
    "id": "postChannelsChannelIdEpisodes",
    "resource": "Channel",
    "operation": "Create Episode (via Channel)",
    "description": "POST /channels/{channel_id}/episodes",
    "method": "POST",
    "path": "/publishing/v2/channels/{channel_id}/episodes",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdEpisodesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdEpisodesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdEpisodesSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "postChannelsChannelIdEpisodes_channelId"
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
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
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
        "name": "sermonAudio",
        "sourceName": "sermon_audio",
        "displayName": "Sermon Audio",
        "required": false,
        "type": "string"
      },
      {
        "name": "streamType",
        "sourceName": "stream_type",
        "displayName": "Stream Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "publishedToLibraryAt",
        "sourceName": "published_to_library_at",
        "displayName": "Published To Library At",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryAudioUrl",
        "sourceName": "library_audio_url",
        "displayName": "Library Audio Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryVideoUrl",
        "sourceName": "library_video_url",
        "displayName": "Library Video Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "seriesIds",
        "displayName": "Series ID",
        "relationshipName": "series",
        "relationshipType": "Series",
        "multiple": false,
        "lookup": {
          "methodName": "searchPostChannelsChannelIdEpisodesSeriesIds",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "postChannelsChannelIdEpisodes_channelId"
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
    "id": "postChannelsChannelIdSeries",
    "resource": "Channel",
    "operation": "Create Series (via Channel)",
    "description": "POST /channels/{channel_id}/series",
    "method": "POST",
    "path": "/publishing/v2/channels/{channel_id}/series",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostChannelsChannelIdSeriesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
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
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId",
    "resource": "Channel",
    "operation": "Update Channel Default Time (via Channel)",
    "description": "PATCH /channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "method": "PATCH",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel default time",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "channelDefaultTimeId",
        "sourceName": "channel_default_time_id",
        "displayName": "Channel Default Time ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_times",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId"
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
    "attributeFields": [
      {
        "name": "dayOfWeek",
        "sourceName": "day_of_week",
        "displayName": "Day Of Week",
        "required": false,
        "type": "number"
      },
      {
        "name": "hour",
        "sourceName": "hour",
        "displayName": "Hour",
        "required": false,
        "type": "number"
      },
      {
        "name": "minute",
        "sourceName": "minute",
        "displayName": "Minute",
        "required": false,
        "type": "number"
      },
      {
        "name": "frequency",
        "sourceName": "frequency",
        "displayName": "Frequency",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "destroy",
        "sourceName": "_destroy",
        "displayName": "Destroy",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchChannelsChannelId",
    "resource": "Channel",
    "operation": "Update Channel",
    "description": "PATCH /channels/{channel_id}",
    "method": "PATCH",
    "path": "/publishing/v2/channels/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastArt",
        "sourceName": "podcast_art",
        "displayName": "Podcast Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastSettings",
        "sourceName": "podcast_settings",
        "displayName": "Podcast Settings",
        "required": false,
        "type": "string"
      },
      {
        "name": "activateEpisodeMinutesBefore",
        "sourceName": "activate_episode_minutes_before",
        "displayName": "Activate Episode Minutes Before",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoEmbedCode",
        "sourceName": "default_video_embed_code",
        "displayName": "Default Video Embed Code",
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
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "defaultVideoDuration",
        "sourceName": "default_video_duration",
        "displayName": "Default Video Duration",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoUrl",
        "sourceName": "default_video_url",
        "displayName": "Default Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "enableAudio",
        "sourceName": "enable_audio",
        "displayName": "Enable Audio",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableOnDemandVideo",
        "sourceName": "enable_on_demand_video",
        "displayName": "Enable On Demand Video",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableWatchLive",
        "sourceName": "enable_watch_live",
        "displayName": "Enable Watch Live",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "generalChatEnabled",
        "sourceName": "general_chat_enabled",
        "displayName": "General Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "groupChatEnabled",
        "sourceName": "group_chat_enabled",
        "displayName": "Group Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "archived",
        "sourceName": "archived",
        "displayName": "Archived",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sermonNotesEnabled",
        "sourceName": "sermon_notes_enabled",
        "displayName": "Sermon Notes Enabled",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId",
    "resource": "Channel",
    "operation": "Update Current Episode (via Channel)",
    "description": "PATCH /channels/{channel_id}/current_episode/{current_episode_id}",
    "method": "PATCH",
    "path": "/publishing/v2/channels/{channel_id}/current_episode/{current_episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "currentEpisodeId",
        "sourceName": "current_episode_id",
        "displayName": "Current Episode ID",
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
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId"
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
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
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
        "name": "sermonAudio",
        "sourceName": "sermon_audio",
        "displayName": "Sermon Audio",
        "required": false,
        "type": "string"
      },
      {
        "name": "streamType",
        "sourceName": "stream_type",
        "displayName": "Stream Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "publishedToLibraryAt",
        "sourceName": "published_to_library_at",
        "displayName": "Published To Library At",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryAudioUrl",
        "sourceName": "library_audio_url",
        "displayName": "Library Audio Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryVideoUrl",
        "sourceName": "library_video_url",
        "displayName": "Library Video Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "seriesIds",
        "displayName": "Series ID",
        "relationshipName": "series",
        "relationshipType": "Series",
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesIds",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId"
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
    "id": "patchChannelsChannelIdEpisodesEpisodeId",
    "resource": "Channel",
    "operation": "Update Episode (via Channel)",
    "description": "PATCH /channels/{channel_id}/episodes/{episode_id}",
    "method": "PATCH",
    "path": "/publishing/v2/channels/{channel_id}/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_episodeId"
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
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdEpisodeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_channelId"
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
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_episodeId"
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_channelId"
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
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
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
        "name": "sermonAudio",
        "sourceName": "sermon_audio",
        "displayName": "Sermon Audio",
        "required": false,
        "type": "string"
      },
      {
        "name": "streamType",
        "sourceName": "stream_type",
        "displayName": "Stream Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "publishedToLibraryAt",
        "sourceName": "published_to_library_at",
        "displayName": "Published To Library At",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryAudioUrl",
        "sourceName": "library_audio_url",
        "displayName": "Library Audio Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryVideoUrl",
        "sourceName": "library_video_url",
        "displayName": "Library Video Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "seriesIds",
        "displayName": "Series ID",
        "relationshipName": "series",
        "relationshipType": "Series",
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesIds",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_channelId"
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
    "id": "patchChannelsChannelIdSeriesSeriesId",
    "resource": "Channel",
    "operation": "Update Series (via Channel)",
    "description": "PATCH /channels/{channel_id}/series/{series_id}",
    "method": "PATCH",
    "path": "/publishing/v2/channels/{channel_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdSeriesSeriesIdChannelId",
          "sourcePath": "/publishing/v2/series/{series_id}/channel",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "patchChannelsChannelIdSeriesSeriesId_seriesId"
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchChannelsChannelIdSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchChannelsChannelIdSeriesSeriesId_channelId"
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
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
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
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId",
    "resource": "Channel",
    "operation": "Delete Channel Default Time (via Channel)",
    "description": "DELETE /channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel default time",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "channelDefaultTimeId",
        "sourceName": "channel_default_time_id",
        "displayName": "Channel Default Time ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_times",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId"
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
    "id": "deleteChannelsChannelId",
    "resource": "Channel",
    "operation": "Delete Channel",
    "description": "DELETE /channels/{channel_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
    "id": "deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId",
    "resource": "Channel",
    "operation": "Delete Current Episode (via Channel)",
    "description": "DELETE /channels/{channel_id}/current_episode/{current_episode_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}/current_episode/{current_episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "current episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "currentEpisodeId",
        "sourceName": "current_episode_id",
        "displayName": "Current Episode ID",
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
    "id": "deleteChannelsChannelIdEpisodesEpisodeId",
    "resource": "Channel",
    "operation": "Delete Episode (via Channel)",
    "description": "DELETE /channels/{channel_id}/episodes/{episode_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdEpisodesEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "deleteChannelsChannelIdEpisodesEpisodeId_episodeId"
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
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdEpisodesEpisodeIdEpisodeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "deleteChannelsChannelIdEpisodesEpisodeId_channelId"
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
    "id": "deleteChannelsChannelIdSeriesSeriesId",
    "resource": "Channel",
    "operation": "Delete Series (via Channel)",
    "description": "DELETE /channels/{channel_id}/series/{series_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdSeriesSeriesIdChannelId",
          "sourcePath": "/publishing/v2/series/{series_id}/channel",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "deleteChannelsChannelIdSeriesSeriesId_seriesId"
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteChannelsChannelIdSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "deleteChannelsChannelIdSeriesSeriesId_channelId"
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
    "id": "getEpisodesEpisodeIdChannel",
    "resource": "Episode",
    "operation": "List Channel (via Episode)",
    "description": "GET /episodes/{episode_id}/channel",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/channel",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdChannelEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "getEpisodesEpisodeIdEpisodeResources",
    "resource": "Episode",
    "operation": "List Episode Resources (via Episode)",
    "description": "GET /episodes/{episode_id}/episode_resources",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "episode resource",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "getEpisodesEpisodeIdEpisodeTimes",
    "resource": "Episode",
    "operation": "List Episode Times (via Episode)",
    "description": "GET /episodes/{episode_id}/episode_times",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/episode_times",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "episode time",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "getEpisodes",
    "resource": "Episode",
    "operation": "List Episodes",
    "description": "GET /episodes",
    "method": "GET",
    "path": "/publishing/v2/episodes",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "episode",
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
        "name": "whereseriesid",
        "sourceName": "where[series][id]",
        "displayName": "Where[series][id]",
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
        "name": "whereseriesid",
        "displayName": "Series ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[series][id]",
        "lookup": {
          "methodName": "searchGetEpisodesWhereseriesid",
          "sourcePath": "/publishing/v2/series",
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
    "id": "getEpisodesEpisodeIdSeries",
    "resource": "Episode",
    "operation": "List Series (via Episode)",
    "description": "GET /episodes/{episode_id}/series",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/series",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSeriesEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSeriesWhereid",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdSeries_episodeId"
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
    "id": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker",
    "resource": "Episode",
    "operation": "List Speaker (via Speakership)",
    "description": "GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}/speaker",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "speaker",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakershipId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_episodeId"
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
    "id": "getEpisodesEpisodeIdSpeakerships",
    "resource": "Episode",
    "operation": "List Speakerships (via Episode)",
    "description": "GET /episodes/{episode_id}/speakerships",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "speakership",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "getEpisodesEpisodeIdChannelChannelId",
    "resource": "Episode",
    "operation": "Get Channel (via Episode)",
    "description": "GET /episodes/{episode_id}/channel/{channel_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdChannelChannelIdEpisodeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getEpisodesEpisodeIdChannelChannelId_channelId"
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
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdChannelChannelIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdChannelChannelId_episodeId"
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
    "id": "getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId",
    "resource": "Episode",
    "operation": "Get Episode Resource (via Episode)",
    "description": "GET /episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode resource",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "episodeResourceId",
        "sourceName": "episode_resource_id",
        "displayName": "Episode Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_resources",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId"
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
    "id": "getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId",
    "resource": "Episode",
    "operation": "Get Episode Time (via Episode)",
    "description": "GET /episodes/{episode_id}/episode_times/{episode_time_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/episode_times/{episode_time_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode time",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "episodeTimeId",
        "sourceName": "episode_time_id",
        "displayName": "Episode Time ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_times",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId"
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
    "id": "getEpisodesEpisodeId",
    "resource": "Episode",
    "operation": "Get Episode",
    "description": "GET /episodes/{episode_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "getEpisodesEpisodeIdNoteTemplate",
    "resource": "Episode",
    "operation": "Get Note Template (via Episode)",
    "description": "GET /episodes/{episode_id}/note_template",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/note_template",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "note template",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdNoteTemplateEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "getEpisodesEpisodeIdSeriesSeriesId",
    "resource": "Episode",
    "operation": "Get Series (via Episode)",
    "description": "GET /episodes/{episode_id}/series/{series_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSeriesSeriesIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdSeriesSeriesId_episodeId"
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
    "id": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId",
    "resource": "Episode",
    "operation": "Get Speaker (via Speakership)",
    "description": "GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker/{speaker_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}/speaker/{speaker_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "speaker",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakershipId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_episodeId"
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
        "name": "speakerId",
        "sourceName": "speaker_id",
        "displayName": "Speaker ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakerId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}/speaker",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_episodeId"
            },
            {
              "sourceName": "speakership_id",
              "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_speakershipId"
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
    "id": "getEpisodesEpisodeIdSpeakershipsSpeakershipId",
    "resource": "Episode",
    "operation": "Get Speakership (via Episode)",
    "description": "GET /episodes/{episode_id}/speakerships/{speakership_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "speakership",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId"
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
    "id": "postEpisodesEpisodeIdChannel",
    "resource": "Episode",
    "operation": "Create Channel (via Episode)",
    "description": "POST /episodes/{episode_id}/channel",
    "method": "POST",
    "path": "/publishing/v2/episodes/{episode_id}/channel",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostEpisodesEpisodeIdChannelEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastArt",
        "sourceName": "podcast_art",
        "displayName": "Podcast Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastSettings",
        "sourceName": "podcast_settings",
        "displayName": "Podcast Settings",
        "required": false,
        "type": "string"
      },
      {
        "name": "activateEpisodeMinutesBefore",
        "sourceName": "activate_episode_minutes_before",
        "displayName": "Activate Episode Minutes Before",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoEmbedCode",
        "sourceName": "default_video_embed_code",
        "displayName": "Default Video Embed Code",
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
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "defaultVideoDuration",
        "sourceName": "default_video_duration",
        "displayName": "Default Video Duration",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoUrl",
        "sourceName": "default_video_url",
        "displayName": "Default Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "enableAudio",
        "sourceName": "enable_audio",
        "displayName": "Enable Audio",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableOnDemandVideo",
        "sourceName": "enable_on_demand_video",
        "displayName": "Enable On Demand Video",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableWatchLive",
        "sourceName": "enable_watch_live",
        "displayName": "Enable Watch Live",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "generalChatEnabled",
        "sourceName": "general_chat_enabled",
        "displayName": "General Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "groupChatEnabled",
        "sourceName": "group_chat_enabled",
        "displayName": "Group Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "archived",
        "sourceName": "archived",
        "displayName": "Archived",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sermonNotesEnabled",
        "sourceName": "sermon_notes_enabled",
        "displayName": "Sermon Notes Enabled",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postEpisodesEpisodeIdEpisodeResources",
    "resource": "Episode",
    "operation": "Create Episode Resource (via Episode)",
    "description": "POST /episodes/{episode_id}/episode_resources",
    "method": "POST",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode resource",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostEpisodesEpisodeIdEpisodeResourcesEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "attributeFields": [
      {
        "name": "destroy",
        "sourceName": "_destroy",
        "displayName": "Destroy",
        "required": false,
        "type": "string"
      },
      {
        "name": "featured",
        "sourceName": "featured",
        "displayName": "Featured",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "icon",
        "sourceName": "icon",
        "displayName": "Icon",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      },
      {
        "name": "type",
        "sourceName": "type",
        "displayName": "Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postEpisodesEpisodeIdEpisodeTimes",
    "resource": "Episode",
    "operation": "Create Episode Time (via Episode)",
    "description": "POST /episodes/{episode_id}/episode_times",
    "method": "POST",
    "path": "/publishing/v2/episodes/{episode_id}/episode_times",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode time",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostEpisodesEpisodeIdEpisodeTimesEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "attributeFields": [
      {
        "name": "startsAt",
        "sourceName": "starts_at",
        "displayName": "Starts At",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoEmbedCode",
        "sourceName": "video_embed_code",
        "displayName": "Video Embed Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "destroy",
        "sourceName": "_destroy",
        "displayName": "Destroy",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postEpisodes",
    "resource": "Episode",
    "operation": "Create Episode",
    "description": "POST /episodes",
    "method": "POST",
    "path": "/publishing/v2/episodes",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
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
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPostEpisodesChannelId",
          "sourcePath": "/publishing/v2/channels",
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPostEpisodesSeriesId",
          "sourcePath": "/publishing/v2/series",
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
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
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
        "name": "sermonAudio",
        "sourceName": "sermon_audio",
        "displayName": "Sermon Audio",
        "required": false,
        "type": "string"
      },
      {
        "name": "streamType",
        "sourceName": "stream_type",
        "displayName": "Stream Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "publishedToLibraryAt",
        "sourceName": "published_to_library_at",
        "displayName": "Published To Library At",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryAudioUrl",
        "sourceName": "library_audio_url",
        "displayName": "Library Audio Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryVideoUrl",
        "sourceName": "library_video_url",
        "displayName": "Library Video Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "seriesIds",
        "displayName": "Series ID",
        "relationshipName": "series",
        "relationshipType": "Series",
        "multiple": false,
        "lookup": {
          "methodName": "searchPostEpisodesSeriesIds",
          "sourcePath": "/publishing/v2/series",
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
    ]
  },
  {
    "id": "postEpisodesEpisodeIdGenerateDownloadUrl",
    "resource": "Episode",
    "operation": "Create Generate Download Url (via Episode)",
    "description": "POST /episodes/{episode_id}/generate_download_url",
    "method": "POST",
    "path": "/publishing/v2/episodes/{episode_id}/generate_download_url",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "generate download url",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostEpisodesEpisodeIdGenerateDownloadUrlEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "postEpisodesEpisodeIdSeries",
    "resource": "Episode",
    "operation": "Create Series (via Episode)",
    "description": "POST /episodes/{episode_id}/series",
    "method": "POST",
    "path": "/publishing/v2/episodes/{episode_id}/series",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostEpisodesEpisodeIdSeriesEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
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
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchEpisodesEpisodeIdChannelChannelId",
    "resource": "Episode",
    "operation": "Update Channel (via Episode)",
    "description": "PATCH /episodes/{episode_id}/channel/{channel_id}",
    "method": "PATCH",
    "path": "/publishing/v2/episodes/{episode_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdChannelChannelIdEpisodeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchEpisodesEpisodeIdChannelChannelId_channelId"
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
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdChannelChannelIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeIdChannelChannelId_episodeId"
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
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastArt",
        "sourceName": "podcast_art",
        "displayName": "Podcast Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastSettings",
        "sourceName": "podcast_settings",
        "displayName": "Podcast Settings",
        "required": false,
        "type": "string"
      },
      {
        "name": "activateEpisodeMinutesBefore",
        "sourceName": "activate_episode_minutes_before",
        "displayName": "Activate Episode Minutes Before",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoEmbedCode",
        "sourceName": "default_video_embed_code",
        "displayName": "Default Video Embed Code",
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
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "defaultVideoDuration",
        "sourceName": "default_video_duration",
        "displayName": "Default Video Duration",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoUrl",
        "sourceName": "default_video_url",
        "displayName": "Default Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "enableAudio",
        "sourceName": "enable_audio",
        "displayName": "Enable Audio",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableOnDemandVideo",
        "sourceName": "enable_on_demand_video",
        "displayName": "Enable On Demand Video",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableWatchLive",
        "sourceName": "enable_watch_live",
        "displayName": "Enable Watch Live",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "generalChatEnabled",
        "sourceName": "general_chat_enabled",
        "displayName": "General Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "groupChatEnabled",
        "sourceName": "group_chat_enabled",
        "displayName": "Group Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "archived",
        "sourceName": "archived",
        "displayName": "Archived",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sermonNotesEnabled",
        "sourceName": "sermon_notes_enabled",
        "displayName": "Sermon Notes Enabled",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId",
    "resource": "Episode",
    "operation": "Update Episode Resource (via Episode)",
    "description": "PATCH /episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "method": "PATCH",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode resource",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "episodeResourceId",
        "sourceName": "episode_resource_id",
        "displayName": "Episode Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_resources",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId"
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
    "attributeFields": [
      {
        "name": "destroy",
        "sourceName": "_destroy",
        "displayName": "Destroy",
        "required": false,
        "type": "string"
      },
      {
        "name": "featured",
        "sourceName": "featured",
        "displayName": "Featured",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "icon",
        "sourceName": "icon",
        "displayName": "Icon",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      },
      {
        "name": "type",
        "sourceName": "type",
        "displayName": "Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId",
    "resource": "Episode",
    "operation": "Update Episode Time (via Episode)",
    "description": "PATCH /episodes/{episode_id}/episode_times/{episode_time_id}",
    "method": "PATCH",
    "path": "/publishing/v2/episodes/{episode_id}/episode_times/{episode_time_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode time",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "episodeTimeId",
        "sourceName": "episode_time_id",
        "displayName": "Episode Time ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_times",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId"
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
    "attributeFields": [
      {
        "name": "startsAt",
        "sourceName": "starts_at",
        "displayName": "Starts At",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoEmbedCode",
        "sourceName": "video_embed_code",
        "displayName": "Video Embed Code",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "destroy",
        "sourceName": "_destroy",
        "displayName": "Destroy",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchEpisodesEpisodeId",
    "resource": "Episode",
    "operation": "Update Episode",
    "description": "PATCH /episodes/{episode_id}",
    "method": "PATCH",
    "path": "/publishing/v2/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeId_episodeId"
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdSeriesId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeId_episodeId"
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
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
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
        "name": "sermonAudio",
        "sourceName": "sermon_audio",
        "displayName": "Sermon Audio",
        "required": false,
        "type": "string"
      },
      {
        "name": "streamType",
        "sourceName": "stream_type",
        "displayName": "Stream Type",
        "required": false,
        "type": "string"
      },
      {
        "name": "videoUrl",
        "sourceName": "video_url",
        "displayName": "Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "publishedToLibraryAt",
        "sourceName": "published_to_library_at",
        "displayName": "Published To Library At",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryAudioUrl",
        "sourceName": "library_audio_url",
        "displayName": "Library Audio Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "libraryVideoUrl",
        "sourceName": "library_video_url",
        "displayName": "Library Video Url",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": [
      {
        "name": "seriesIds",
        "displayName": "Series ID",
        "relationshipName": "series",
        "relationshipType": "Series",
        "multiple": false,
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdSeriesIds",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeId_episodeId"
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
    "id": "patchEpisodesEpisodeIdNoteTemplate",
    "resource": "Episode",
    "operation": "Update Note Template (via Episode)",
    "description": "PATCH /episodes/{episode_id}/note_template",
    "method": "PATCH",
    "path": "/publishing/v2/episodes/{episode_id}/note_template",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "note template",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdNoteTemplateEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "attributeFields": [
      {
        "name": "enabled",
        "sourceName": "enabled",
        "displayName": "Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "template",
        "sourceName": "template",
        "displayName": "Template",
        "required": false,
        "type": "string"
      },
      {
        "name": "autoCreateFreeFormNotes",
        "sourceName": "auto_create_free_form_notes",
        "displayName": "Auto Create Free Form Notes",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchEpisodesEpisodeIdSeriesSeriesId",
    "resource": "Episode",
    "operation": "Update Series (via Episode)",
    "description": "PATCH /episodes/{episode_id}/series/{series_id}",
    "method": "PATCH",
    "path": "/publishing/v2/episodes/{episode_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdSeriesSeriesIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeIdSeriesSeriesId_episodeId"
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
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
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
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchEpisodesEpisodeIdSpeakershipsSpeakershipId",
    "resource": "Episode",
    "operation": "Update Speakership (via Episode)",
    "description": "PATCH /episodes/{episode_id}/speakerships/{speakership_id}",
    "method": "PATCH",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "speakership",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "patchEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId"
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
        "name": "destroy",
        "sourceName": "_destroy",
        "displayName": "Destroy",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteEpisodesEpisodeIdChannelChannelId",
    "resource": "Episode",
    "operation": "Delete Channel (via Episode)",
    "description": "DELETE /episodes/{episode_id}/channel/{channel_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdChannelChannelIdEpisodeId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "deleteEpisodesEpisodeIdChannelChannelId_channelId"
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
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdChannelChannelIdChannelId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "deleteEpisodesEpisodeIdChannelChannelId_episodeId"
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
    "id": "deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId",
    "resource": "Episode",
    "operation": "Delete Episode Resource (via Episode)",
    "description": "DELETE /episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode resource",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "episodeResourceId",
        "sourceName": "episode_resource_id",
        "displayName": "Episode Resource ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_resources",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId"
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
    "id": "deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId",
    "resource": "Episode",
    "operation": "Delete Episode Time (via Episode)",
    "description": "DELETE /episodes/{episode_id}/episode_times/{episode_time_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/episode_times/{episode_time_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode time",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "episodeTimeId",
        "sourceName": "episode_time_id",
        "displayName": "Episode Time ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_times",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId"
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
    "id": "deleteEpisodesEpisodeId",
    "resource": "Episode",
    "operation": "Delete Episode",
    "description": "DELETE /episodes/{episode_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "episode",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
    "id": "deleteEpisodesEpisodeIdSeriesSeriesId",
    "resource": "Episode",
    "operation": "Delete Series (via Episode)",
    "description": "DELETE /episodes/{episode_id}/series/{series_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdSeriesSeriesIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "deleteEpisodesEpisodeIdSeriesSeriesId_episodeId"
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
    "id": "deleteEpisodesEpisodeIdSpeakershipsSpeakershipId",
    "resource": "Episode",
    "operation": "Delete Speakership (via Episode)",
    "description": "DELETE /episodes/{episode_id}/speakerships/{speakership_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "speakership",
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId",
          "sourcePath": "/publishing/v2/episodes",
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
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId",
          "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
          "parentBindings": [
            {
              "sourceName": "episode_id",
              "fieldName": "deleteEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId"
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
    "id": "getSeriesSeriesIdChannel",
    "resource": "Series",
    "operation": "List Channel (via Series)",
    "description": "GET /series/{series_id}/channel",
    "method": "GET",
    "path": "/publishing/v2/series/{series_id}/channel",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdChannelSeriesId",
          "sourcePath": "/publishing/v2/series",
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
    "id": "getSeries",
    "resource": "Series",
    "operation": "List Series",
    "description": "GET /series",
    "method": "GET",
    "path": "/publishing/v2/series",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "series",
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
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetSeriesWhereid",
          "sourcePath": "/publishing/v2/series",
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
    "id": "getSeriesSeriesIdChannelChannelId",
    "resource": "Series",
    "operation": "Get Channel (via Series)",
    "description": "GET /series/{series_id}/channel/{channel_id}",
    "method": "GET",
    "path": "/publishing/v2/series/{series_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdChannelChannelIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "getSeriesSeriesIdChannelChannelId_channelId"
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
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdChannelChannelIdChannelId",
          "sourcePath": "/publishing/v2/series/{series_id}/channel",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "getSeriesSeriesIdChannelChannelId_seriesId"
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
    "id": "getSeriesSeriesId",
    "resource": "Series",
    "operation": "Get Series",
    "description": "GET /series/{series_id}",
    "method": "GET",
    "path": "/publishing/v2/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/series",
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
    "id": "postSeriesSeriesIdChannel",
    "resource": "Series",
    "operation": "Create Channel (via Series)",
    "description": "POST /series/{series_id}/channel",
    "method": "POST",
    "path": "/publishing/v2/series/{series_id}/channel",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPostSeriesSeriesIdChannelSeriesId",
          "sourcePath": "/publishing/v2/series",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastArt",
        "sourceName": "podcast_art",
        "displayName": "Podcast Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastSettings",
        "sourceName": "podcast_settings",
        "displayName": "Podcast Settings",
        "required": false,
        "type": "string"
      },
      {
        "name": "activateEpisodeMinutesBefore",
        "sourceName": "activate_episode_minutes_before",
        "displayName": "Activate Episode Minutes Before",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoEmbedCode",
        "sourceName": "default_video_embed_code",
        "displayName": "Default Video Embed Code",
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
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "defaultVideoDuration",
        "sourceName": "default_video_duration",
        "displayName": "Default Video Duration",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoUrl",
        "sourceName": "default_video_url",
        "displayName": "Default Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "enableAudio",
        "sourceName": "enable_audio",
        "displayName": "Enable Audio",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableOnDemandVideo",
        "sourceName": "enable_on_demand_video",
        "displayName": "Enable On Demand Video",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableWatchLive",
        "sourceName": "enable_watch_live",
        "displayName": "Enable Watch Live",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "generalChatEnabled",
        "sourceName": "general_chat_enabled",
        "displayName": "General Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "groupChatEnabled",
        "sourceName": "group_chat_enabled",
        "displayName": "Group Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "archived",
        "sourceName": "archived",
        "displayName": "Archived",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sermonNotesEnabled",
        "sourceName": "sermon_notes_enabled",
        "displayName": "Sermon Notes Enabled",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "postSeries",
    "resource": "Series",
    "operation": "Create Series",
    "description": "POST /series",
    "method": "POST",
    "path": "/publishing/v2/series",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
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
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
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
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchSeriesSeriesIdChannelChannelId",
    "resource": "Series",
    "operation": "Update Channel (via Series)",
    "description": "PATCH /series/{series_id}/channel/{channel_id}",
    "method": "PATCH",
    "path": "/publishing/v2/series/{series_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchSeriesSeriesIdChannelChannelIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "patchSeriesSeriesIdChannelChannelId_channelId"
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
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchSeriesSeriesIdChannelChannelIdChannelId",
          "sourcePath": "/publishing/v2/series/{series_id}/channel",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "patchSeriesSeriesIdChannelChannelId_seriesId"
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
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastArt",
        "sourceName": "podcast_art",
        "displayName": "Podcast Art",
        "required": false,
        "type": "string"
      },
      {
        "name": "podcastSettings",
        "sourceName": "podcast_settings",
        "displayName": "Podcast Settings",
        "required": false,
        "type": "string"
      },
      {
        "name": "activateEpisodeMinutesBefore",
        "sourceName": "activate_episode_minutes_before",
        "displayName": "Activate Episode Minutes Before",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoEmbedCode",
        "sourceName": "default_video_embed_code",
        "displayName": "Default Video Embed Code",
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
        "name": "url",
        "sourceName": "url",
        "displayName": "Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "defaultVideoDuration",
        "sourceName": "default_video_duration",
        "displayName": "Default Video Duration",
        "required": false,
        "type": "number"
      },
      {
        "name": "defaultVideoUrl",
        "sourceName": "default_video_url",
        "displayName": "Default Video Url",
        "required": false,
        "type": "string"
      },
      {
        "name": "enableAudio",
        "sourceName": "enable_audio",
        "displayName": "Enable Audio",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableOnDemandVideo",
        "sourceName": "enable_on_demand_video",
        "displayName": "Enable On Demand Video",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "enableWatchLive",
        "sourceName": "enable_watch_live",
        "displayName": "Enable Watch Live",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "generalChatEnabled",
        "sourceName": "general_chat_enabled",
        "displayName": "General Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "groupChatEnabled",
        "sourceName": "group_chat_enabled",
        "displayName": "Group Chat Enabled",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "name",
        "sourceName": "name",
        "displayName": "Name",
        "required": false,
        "type": "string"
      },
      {
        "name": "position",
        "sourceName": "position",
        "displayName": "Position",
        "required": false,
        "type": "number"
      },
      {
        "name": "archived",
        "sourceName": "archived",
        "displayName": "Archived",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sermonNotesEnabled",
        "sourceName": "sermon_notes_enabled",
        "displayName": "Sermon Notes Enabled",
        "required": false,
        "type": "boolean"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "patchSeriesSeriesId",
    "resource": "Series",
    "operation": "Update Series",
    "description": "PATCH /series/{series_id}",
    "method": "PATCH",
    "path": "/publishing/v2/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchPatchSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/series",
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
    "attributeFields": [
      {
        "name": "art",
        "sourceName": "art",
        "displayName": "Art",
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
        "name": "published",
        "sourceName": "published",
        "displayName": "Published",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "title",
        "sourceName": "title",
        "displayName": "Title",
        "required": false,
        "type": "string"
      }
    ],
    "relationshipFields": []
  },
  {
    "id": "deleteSeriesSeriesIdChannelChannelId",
    "resource": "Series",
    "operation": "Delete Channel (via Series)",
    "description": "DELETE /series/{series_id}/channel/{channel_id}",
    "method": "DELETE",
    "path": "/publishing/v2/series/{series_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "channel",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteSeriesSeriesIdChannelChannelIdSeriesId",
          "sourcePath": "/publishing/v2/channels/{channel_id}/series",
          "parentBindings": [
            {
              "sourceName": "channel_id",
              "fieldName": "deleteSeriesSeriesIdChannelChannelId_channelId"
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
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteSeriesSeriesIdChannelChannelIdChannelId",
          "sourcePath": "/publishing/v2/series/{series_id}/channel",
          "parentBindings": [
            {
              "sourceName": "series_id",
              "fieldName": "deleteSeriesSeriesIdChannelChannelId_seriesId"
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
    "id": "deleteSeriesSeriesId",
    "resource": "Series",
    "operation": "Delete Series",
    "description": "DELETE /series/{series_id}",
    "method": "DELETE",
    "path": "/publishing/v2/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "series",
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchDeleteSeriesSeriesIdSeriesId",
          "sourcePath": "/publishing/v2/series",
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
    "id": "getSpeakers",
    "resource": "Speaker",
    "operation": "List Speakers",
    "description": "GET /speakers",
    "method": "GET",
    "path": "/publishing/v2/speakers",
    "deprecated": false,
    "isList": true,
    "lookupTarget": "speaker",
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
    "id": "getSpeakersSpeakerId",
    "resource": "Speaker",
    "operation": "Get Speaker",
    "description": "GET /speakers/{speaker_id}",
    "method": "GET",
    "path": "/publishing/v2/speakers/{speaker_id}",
    "deprecated": false,
    "isList": false,
    "lookupTarget": "speaker",
    "pathParameters": [
      {
        "name": "speakerId",
        "sourceName": "speaker_id",
        "displayName": "Speaker ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSpeakersSpeakerIdSpeakerId",
          "sourcePath": "/publishing/v2/speakers",
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
  }
];

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = {
  "searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId": {
    "methodName": "searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_times",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId"
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
  "searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId": {
    "methodName": "searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchDeleteChannelsChannelIdChannelId": {
    "methodName": "searchDeleteChannelsChannelIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchDeleteChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId": {
    "methodName": "searchDeleteChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchDeleteChannelsChannelIdEpisodesEpisodeIdChannelId": {
    "methodName": "searchDeleteChannelsChannelIdEpisodesEpisodeIdChannelId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "deleteChannelsChannelIdEpisodesEpisodeId_episodeId"
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
  "searchDeleteChannelsChannelIdEpisodesEpisodeIdEpisodeId": {
    "methodName": "searchDeleteChannelsChannelIdEpisodesEpisodeIdEpisodeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "deleteChannelsChannelIdEpisodesEpisodeId_channelId"
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
  "searchDeleteChannelsChannelIdSeriesSeriesIdChannelId": {
    "methodName": "searchDeleteChannelsChannelIdSeriesSeriesIdChannelId",
    "sourcePath": "/publishing/v2/series/{series_id}/channel",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "deleteChannelsChannelIdSeriesSeriesId_seriesId"
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
  "searchDeleteChannelsChannelIdSeriesSeriesIdSeriesId": {
    "methodName": "searchDeleteChannelsChannelIdSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "deleteChannelsChannelIdSeriesSeriesId_channelId"
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
  "searchDeleteEpisodesEpisodeIdChannelChannelIdChannelId": {
    "methodName": "searchDeleteEpisodesEpisodeIdChannelChannelIdChannelId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "deleteEpisodesEpisodeIdChannelChannelId_episodeId"
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
  "searchDeleteEpisodesEpisodeIdChannelChannelIdEpisodeId": {
    "methodName": "searchDeleteEpisodesEpisodeIdChannelChannelIdEpisodeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "deleteEpisodesEpisodeIdChannelChannelId_channelId"
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
  "searchDeleteEpisodesEpisodeIdEpisodeId": {
    "methodName": "searchDeleteEpisodesEpisodeIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId": {
    "methodName": "searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId": {
    "methodName": "searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_resources",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId"
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
  "searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId": {
    "methodName": "searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId": {
    "methodName": "searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_times",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId"
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
  "searchDeleteEpisodesEpisodeIdSeriesSeriesIdEpisodeId": {
    "methodName": "searchDeleteEpisodesEpisodeIdSeriesSeriesIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchDeleteEpisodesEpisodeIdSeriesSeriesIdSeriesId": {
    "methodName": "searchDeleteEpisodesEpisodeIdSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "deleteEpisodesEpisodeIdSeriesSeriesId_episodeId"
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
  "searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId": {
    "methodName": "searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId": {
    "methodName": "searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "deleteEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId"
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
  "searchDeleteSeriesSeriesIdChannelChannelIdChannelId": {
    "methodName": "searchDeleteSeriesSeriesIdChannelChannelIdChannelId",
    "sourcePath": "/publishing/v2/series/{series_id}/channel",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "deleteSeriesSeriesIdChannelChannelId_seriesId"
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
  "searchDeleteSeriesSeriesIdChannelChannelIdSeriesId": {
    "methodName": "searchDeleteSeriesSeriesIdChannelChannelIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "deleteSeriesSeriesIdChannelChannelId_channelId"
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
  "searchDeleteSeriesSeriesIdSeriesId": {
    "methodName": "searchDeleteSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/series",
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
  "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelDefaultEpisodeResourceId": {
    "methodName": "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelDefaultEpisodeResourceId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_episode_resources",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId_channelId"
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
  "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelId": {
    "methodName": "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelId": {
    "methodName": "searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId": {
    "methodName": "searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_times",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId"
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
  "searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId": {
    "methodName": "searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdChannelDefaultTimesChannelId": {
    "methodName": "searchGetChannelsChannelIdChannelDefaultTimesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdChannelId": {
    "methodName": "searchGetChannelsChannelIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdCurrentEpisodeChannelId": {
    "methodName": "searchGetChannelsChannelIdCurrentEpisodeChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId": {
    "methodName": "searchGetChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdCurrentEpisodeWhereseriesid": {
    "methodName": "searchGetChannelsChannelIdCurrentEpisodeWhereseriesid",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getChannelsChannelIdCurrentEpisode_channelId"
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
  "searchGetChannelsChannelIdEpisodesChannelId": {
    "methodName": "searchGetChannelsChannelIdEpisodesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdEpisodesEpisodeIdChannelId": {
    "methodName": "searchGetChannelsChannelIdEpisodesEpisodeIdChannelId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getChannelsChannelIdEpisodesEpisodeId_episodeId"
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
  "searchGetChannelsChannelIdEpisodesEpisodeIdEpisodeId": {
    "methodName": "searchGetChannelsChannelIdEpisodesEpisodeIdEpisodeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getChannelsChannelIdEpisodesEpisodeId_channelId"
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
  "searchGetChannelsChannelIdEpisodesWhereseriesid": {
    "methodName": "searchGetChannelsChannelIdEpisodesWhereseriesid",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getChannelsChannelIdEpisodes_channelId"
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
  "searchGetChannelsChannelIdNextTimesChannelId": {
    "methodName": "searchGetChannelsChannelIdNextTimesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdNextTimesNextTimeIdChannelId": {
    "methodName": "searchGetChannelsChannelIdNextTimesNextTimeIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdSeriesChannelId": {
    "methodName": "searchGetChannelsChannelIdSeriesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdSeriesSeriesIdChannelId": {
    "methodName": "searchGetChannelsChannelIdSeriesSeriesIdChannelId",
    "sourcePath": "/publishing/v2/series/{series_id}/channel",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "getChannelsChannelIdSeriesSeriesId_seriesId"
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
  "searchGetChannelsChannelIdSeriesSeriesIdSeriesId": {
    "methodName": "searchGetChannelsChannelIdSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getChannelsChannelIdSeriesSeriesId_channelId"
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
  "searchGetChannelsChannelIdSeriesWhereid": {
    "methodName": "searchGetChannelsChannelIdSeriesWhereid",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getChannelsChannelIdSeries_channelId"
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
  "searchGetChannelsChannelIdStatisticsChannelId": {
    "methodName": "searchGetChannelsChannelIdStatisticsChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetChannelsChannelIdStatisticsStatisticIdChannelId": {
    "methodName": "searchGetChannelsChannelIdStatisticsStatisticIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchGetEpisodesEpisodeIdChannelChannelIdChannelId": {
    "methodName": "searchGetEpisodesEpisodeIdChannelChannelIdChannelId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdChannelChannelId_episodeId"
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
  "searchGetEpisodesEpisodeIdChannelChannelIdEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdChannelChannelIdEpisodeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getEpisodesEpisodeIdChannelChannelId_channelId"
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
  "searchGetEpisodesEpisodeIdChannelEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdChannelEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId": {
    "methodName": "searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_resources",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId"
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
  "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId": {
    "methodName": "searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_times",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId"
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
  "searchGetEpisodesEpisodeIdNoteTemplateEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdNoteTemplateEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdSeriesEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdSeriesEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdSeriesSeriesIdEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdSeriesSeriesIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdSeriesSeriesIdSeriesId": {
    "methodName": "searchGetEpisodesEpisodeIdSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdSeriesSeriesId_episodeId"
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
  "searchGetEpisodesEpisodeIdSeriesWhereid": {
    "methodName": "searchGetEpisodesEpisodeIdSeriesWhereid",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdSeries_episodeId"
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
  "searchGetEpisodesEpisodeIdSpeakershipsEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId"
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
  "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdEpisodeId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakerId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakerId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}/speaker",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_episodeId"
      },
      {
        "sourceName": "speakership_id",
        "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_speakershipId"
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
  "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakershipId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakershipId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_episodeId"
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
  "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakershipId": {
    "methodName": "searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakershipId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_episodeId"
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
  "searchGetEpisodesWhereseriesid": {
    "methodName": "searchGetEpisodesWhereseriesid",
    "sourcePath": "/publishing/v2/series",
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
  "searchGetSeriesSeriesIdChannelChannelIdChannelId": {
    "methodName": "searchGetSeriesSeriesIdChannelChannelIdChannelId",
    "sourcePath": "/publishing/v2/series/{series_id}/channel",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "getSeriesSeriesIdChannelChannelId_seriesId"
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
  "searchGetSeriesSeriesIdChannelChannelIdSeriesId": {
    "methodName": "searchGetSeriesSeriesIdChannelChannelIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "getSeriesSeriesIdChannelChannelId_channelId"
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
  "searchGetSeriesSeriesIdChannelSeriesId": {
    "methodName": "searchGetSeriesSeriesIdChannelSeriesId",
    "sourcePath": "/publishing/v2/series",
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
  "searchGetSeriesSeriesIdSeriesId": {
    "methodName": "searchGetSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/series",
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
  "searchGetSeriesWhereid": {
    "methodName": "searchGetSeriesWhereid",
    "sourcePath": "/publishing/v2/series",
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
  "searchGetSpeakersSpeakerIdSpeakerId": {
    "methodName": "searchGetSpeakersSpeakerIdSpeakerId",
    "sourcePath": "/publishing/v2/speakers",
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
  "searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId": {
    "methodName": "searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/channel_default_times",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId"
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
  "searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId": {
    "methodName": "searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPatchChannelsChannelIdChannelId": {
    "methodName": "searchPatchChannelsChannelIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId": {
    "methodName": "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesId": {
    "methodName": "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId"
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
  "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesIds": {
    "methodName": "searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesIds",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId"
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
  "searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId": {
    "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_episodeId"
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
  "searchPatchChannelsChannelIdEpisodesEpisodeIdEpisodeId": {
    "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdEpisodeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_channelId"
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
  "searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesId": {
    "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_channelId"
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
  "searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesIds": {
    "methodName": "searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesIds",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchChannelsChannelIdEpisodesEpisodeId_channelId"
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
  "searchPatchChannelsChannelIdSeriesSeriesIdChannelId": {
    "methodName": "searchPatchChannelsChannelIdSeriesSeriesIdChannelId",
    "sourcePath": "/publishing/v2/series/{series_id}/channel",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "patchChannelsChannelIdSeriesSeriesId_seriesId"
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
  "searchPatchChannelsChannelIdSeriesSeriesIdSeriesId": {
    "methodName": "searchPatchChannelsChannelIdSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchChannelsChannelIdSeriesSeriesId_channelId"
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
  "searchPatchEpisodesEpisodeIdChannelChannelIdChannelId": {
    "methodName": "searchPatchEpisodesEpisodeIdChannelChannelIdChannelId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeIdChannelChannelId_episodeId"
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
  "searchPatchEpisodesEpisodeIdChannelChannelIdEpisodeId": {
    "methodName": "searchPatchEpisodesEpisodeIdChannelChannelIdEpisodeId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/current_episode",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchEpisodesEpisodeIdChannelChannelId_channelId"
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
  "searchPatchEpisodesEpisodeIdChannelId": {
    "methodName": "searchPatchEpisodesEpisodeIdChannelId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/channel",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeId_episodeId"
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
  "searchPatchEpisodesEpisodeIdEpisodeId": {
    "methodName": "searchPatchEpisodesEpisodeIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId": {
    "methodName": "searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId": {
    "methodName": "searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_resources",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId"
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
  "searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId": {
    "methodName": "searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId": {
    "methodName": "searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/episode_times",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId"
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
  "searchPatchEpisodesEpisodeIdNoteTemplateEpisodeId": {
    "methodName": "searchPatchEpisodesEpisodeIdNoteTemplateEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPatchEpisodesEpisodeIdSeriesId": {
    "methodName": "searchPatchEpisodesEpisodeIdSeriesId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeId_episodeId"
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
  "searchPatchEpisodesEpisodeIdSeriesIds": {
    "methodName": "searchPatchEpisodesEpisodeIdSeriesIds",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeId_episodeId"
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
  "searchPatchEpisodesEpisodeIdSeriesSeriesIdEpisodeId": {
    "methodName": "searchPatchEpisodesEpisodeIdSeriesSeriesIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPatchEpisodesEpisodeIdSeriesSeriesIdSeriesId": {
    "methodName": "searchPatchEpisodesEpisodeIdSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/series",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeIdSeriesSeriesId_episodeId"
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
  "searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId": {
    "methodName": "searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId": {
    "methodName": "searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId",
    "sourcePath": "/publishing/v2/episodes/{episode_id}/speakerships",
    "parentBindings": [
      {
        "sourceName": "episode_id",
        "fieldName": "patchEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId"
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
  "searchPatchSeriesSeriesIdChannelChannelIdChannelId": {
    "methodName": "searchPatchSeriesSeriesIdChannelChannelIdChannelId",
    "sourcePath": "/publishing/v2/series/{series_id}/channel",
    "parentBindings": [
      {
        "sourceName": "series_id",
        "fieldName": "patchSeriesSeriesIdChannelChannelId_seriesId"
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
  "searchPatchSeriesSeriesIdChannelChannelIdSeriesId": {
    "methodName": "searchPatchSeriesSeriesIdChannelChannelIdSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "patchSeriesSeriesIdChannelChannelId_channelId"
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
  "searchPatchSeriesSeriesIdSeriesId": {
    "methodName": "searchPatchSeriesSeriesIdSeriesId",
    "sourcePath": "/publishing/v2/series",
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
  "searchPostChannelsChannelIdChannelDefaultTimesChannelId": {
    "methodName": "searchPostChannelsChannelIdChannelDefaultTimesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPostChannelsChannelIdCurrentEpisodeChannelId": {
    "methodName": "searchPostChannelsChannelIdCurrentEpisodeChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPostChannelsChannelIdCurrentEpisodeSeriesId": {
    "methodName": "searchPostChannelsChannelIdCurrentEpisodeSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "postChannelsChannelIdCurrentEpisode_channelId"
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
  "searchPostChannelsChannelIdCurrentEpisodeSeriesIds": {
    "methodName": "searchPostChannelsChannelIdCurrentEpisodeSeriesIds",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "postChannelsChannelIdCurrentEpisode_channelId"
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
  "searchPostChannelsChannelIdEpisodesChannelId": {
    "methodName": "searchPostChannelsChannelIdEpisodesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPostChannelsChannelIdEpisodesSeriesId": {
    "methodName": "searchPostChannelsChannelIdEpisodesSeriesId",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "postChannelsChannelIdEpisodes_channelId"
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
  "searchPostChannelsChannelIdEpisodesSeriesIds": {
    "methodName": "searchPostChannelsChannelIdEpisodesSeriesIds",
    "sourcePath": "/publishing/v2/channels/{channel_id}/series",
    "parentBindings": [
      {
        "sourceName": "channel_id",
        "fieldName": "postChannelsChannelIdEpisodes_channelId"
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
  "searchPostChannelsChannelIdSeriesChannelId": {
    "methodName": "searchPostChannelsChannelIdSeriesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPostEpisodesChannelId": {
    "methodName": "searchPostEpisodesChannelId",
    "sourcePath": "/publishing/v2/channels",
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
  "searchPostEpisodesEpisodeIdChannelEpisodeId": {
    "methodName": "searchPostEpisodesEpisodeIdChannelEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPostEpisodesEpisodeIdEpisodeResourcesEpisodeId": {
    "methodName": "searchPostEpisodesEpisodeIdEpisodeResourcesEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPostEpisodesEpisodeIdEpisodeTimesEpisodeId": {
    "methodName": "searchPostEpisodesEpisodeIdEpisodeTimesEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPostEpisodesEpisodeIdGenerateDownloadUrlEpisodeId": {
    "methodName": "searchPostEpisodesEpisodeIdGenerateDownloadUrlEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPostEpisodesEpisodeIdSeriesEpisodeId": {
    "methodName": "searchPostEpisodesEpisodeIdSeriesEpisodeId",
    "sourcePath": "/publishing/v2/episodes",
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
  "searchPostEpisodesSeriesId": {
    "methodName": "searchPostEpisodesSeriesId",
    "sourcePath": "/publishing/v2/series",
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
  "searchPostEpisodesSeriesIds": {
    "methodName": "searchPostEpisodesSeriesIds",
    "sourcePath": "/publishing/v2/series",
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
  "searchPostSeriesSeriesIdChannelSeriesId": {
    "methodName": "searchPostSeriesSeriesIdChannelSeriesId",
    "sourcePath": "/publishing/v2/series",
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

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Channel\",\"value\":\"Channel\"},{\"name\":\"Episode\",\"value\":\"Episode\"},{\"name\":\"Series\",\"value\":\"Series\"},{\"name\":\"Speaker\",\"value\":\"Speaker\"}],\n      default: \"Channel\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"]}},\n      options: [{\"name\":\"List Channel Default Episode Resources (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultEpisodeResources\",\"description\":\"GET /channels/{channel_id}/channel_default_episode_resources\",\"action\":\"List Channel Default Episode Resources (via Channel)\"},{\"name\":\"List Channel Default Times (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultTimes\",\"description\":\"GET /channels/{channel_id}/channel_default_times\",\"action\":\"List Channel Default Times (via Channel)\"},{\"name\":\"List Channels\",\"value\":\"getChannels\",\"description\":\"GET /channels\",\"action\":\"List Channels\"},{\"name\":\"List Current Episode (via Channel)\",\"value\":\"getChannelsChannelIdCurrentEpisode\",\"description\":\"GET /channels/{channel_id}/current_episode\",\"action\":\"List Current Episode (via Channel)\"},{\"name\":\"List Episodes (via Channel)\",\"value\":\"getChannelsChannelIdEpisodes\",\"description\":\"GET /channels/{channel_id}/episodes\",\"action\":\"List Episodes (via Channel)\"},{\"name\":\"List Next Times (via Channel)\",\"value\":\"getChannelsChannelIdNextTimes\",\"description\":\"GET /channels/{channel_id}/next_times\",\"action\":\"List Next Times (via Channel)\"},{\"name\":\"List Series (via Channel)\",\"value\":\"getChannelsChannelIdSeries\",\"description\":\"GET /channels/{channel_id}/series\",\"action\":\"List Series (via Channel)\"},{\"name\":\"List Statistics (via Channel)\",\"value\":\"getChannelsChannelIdStatistics\",\"description\":\"GET /channels/{channel_id}/statistics\",\"action\":\"List Statistics (via Channel)\"},{\"name\":\"Get Channel Default Episode Resource (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\",\"description\":\"GET /channels/{channel_id}/channel_default_episode_resources/{channel_default_episode_resource_id}\",\"action\":\"Get Channel Default Episode Resource (via Channel)\"},{\"name\":\"Get Channel Default Time (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\",\"description\":\"GET /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"action\":\"Get Channel Default Time (via Channel)\"},{\"name\":\"Get Channel\",\"value\":\"getChannelsChannelId\",\"description\":\"GET /channels/{channel_id}\",\"action\":\"Get Channel\"},{\"name\":\"Get Current Episode (via Channel)\",\"value\":\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\",\"description\":\"GET /channels/{channel_id}/current_episode/{current_episode_id}\",\"action\":\"Get Current Episode (via Channel)\"},{\"name\":\"Get Episode (via Channel)\",\"value\":\"getChannelsChannelIdEpisodesEpisodeId\",\"description\":\"GET /channels/{channel_id}/episodes/{episode_id}\",\"action\":\"Get Episode (via Channel)\"},{\"name\":\"Get Next Time (via Channel)\",\"value\":\"getChannelsChannelIdNextTimesNextTimeId\",\"description\":\"GET /channels/{channel_id}/next_times/{next_time_id}\",\"action\":\"Get Next Time (via Channel)\"},{\"name\":\"Get Series (via Channel)\",\"value\":\"getChannelsChannelIdSeriesSeriesId\",\"description\":\"GET /channels/{channel_id}/series/{series_id}\",\"action\":\"Get Series (via Channel)\"},{\"name\":\"Get Statistic (via Channel)\",\"value\":\"getChannelsChannelIdStatisticsStatisticId\",\"description\":\"GET /channels/{channel_id}/statistics/{statistic_id}\",\"action\":\"Get Statistic (via Channel)\"},{\"name\":\"Create Channel Default Time (via Channel)\",\"value\":\"postChannelsChannelIdChannelDefaultTimes\",\"description\":\"POST /channels/{channel_id}/channel_default_times\",\"action\":\"Create Channel Default Time (via Channel)\"},{\"name\":\"Create Channel\",\"value\":\"postChannels\",\"description\":\"POST /channels\",\"action\":\"Create Channel\"},{\"name\":\"Create Current Episode (via Channel)\",\"value\":\"postChannelsChannelIdCurrentEpisode\",\"description\":\"POST /channels/{channel_id}/current_episode\",\"action\":\"Create Current Episode (via Channel)\"},{\"name\":\"Create Episode (via Channel)\",\"value\":\"postChannelsChannelIdEpisodes\",\"description\":\"POST /channels/{channel_id}/episodes\",\"action\":\"Create Episode (via Channel)\"},{\"name\":\"Create Series (via Channel)\",\"value\":\"postChannelsChannelIdSeries\",\"description\":\"POST /channels/{channel_id}/series\",\"action\":\"Create Series (via Channel)\"},{\"name\":\"Update Channel Default Time (via Channel)\",\"value\":\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\",\"description\":\"PATCH /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"action\":\"Update Channel Default Time (via Channel)\"},{\"name\":\"Update Channel\",\"value\":\"patchChannelsChannelId\",\"description\":\"PATCH /channels/{channel_id}\",\"action\":\"Update Channel\"},{\"name\":\"Update Current Episode (via Channel)\",\"value\":\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\",\"description\":\"PATCH /channels/{channel_id}/current_episode/{current_episode_id}\",\"action\":\"Update Current Episode (via Channel)\"},{\"name\":\"Update Episode (via Channel)\",\"value\":\"patchChannelsChannelIdEpisodesEpisodeId\",\"description\":\"PATCH /channels/{channel_id}/episodes/{episode_id}\",\"action\":\"Update Episode (via Channel)\"},{\"name\":\"Update Series (via Channel)\",\"value\":\"patchChannelsChannelIdSeriesSeriesId\",\"description\":\"PATCH /channels/{channel_id}/series/{series_id}\",\"action\":\"Update Series (via Channel)\"},{\"name\":\"Delete Channel Default Time (via Channel)\",\"value\":\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\",\"description\":\"DELETE /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"action\":\"Delete Channel Default Time (via Channel)\"},{\"name\":\"Delete Channel\",\"value\":\"deleteChannelsChannelId\",\"description\":\"DELETE /channels/{channel_id}\",\"action\":\"Delete Channel\"},{\"name\":\"Delete Current Episode (via Channel)\",\"value\":\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\",\"description\":\"DELETE /channels/{channel_id}/current_episode/{current_episode_id}\",\"action\":\"Delete Current Episode (via Channel)\"},{\"name\":\"Delete Episode (via Channel)\",\"value\":\"deleteChannelsChannelIdEpisodesEpisodeId\",\"description\":\"DELETE /channels/{channel_id}/episodes/{episode_id}\",\"action\":\"Delete Episode (via Channel)\"},{\"name\":\"Delete Series (via Channel)\",\"value\":\"deleteChannelsChannelIdSeriesSeriesId\",\"description\":\"DELETE /channels/{channel_id}/series/{series_id}\",\"action\":\"Delete Series (via Channel)\"}],\n      default: \"getChannelsChannelIdChannelDefaultEpisodeResources\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"]}},\n      options: [{\"name\":\"List Channel (via Episode)\",\"value\":\"getEpisodesEpisodeIdChannel\",\"description\":\"GET /episodes/{episode_id}/channel\",\"action\":\"List Channel (via Episode)\"},{\"name\":\"List Episode Resources (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeResources\",\"description\":\"GET /episodes/{episode_id}/episode_resources\",\"action\":\"List Episode Resources (via Episode)\"},{\"name\":\"List Episode Times (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeTimes\",\"description\":\"GET /episodes/{episode_id}/episode_times\",\"action\":\"List Episode Times (via Episode)\"},{\"name\":\"List Episodes\",\"value\":\"getEpisodes\",\"description\":\"GET /episodes\",\"action\":\"List Episodes\"},{\"name\":\"List Series (via Episode)\",\"value\":\"getEpisodesEpisodeIdSeries\",\"description\":\"GET /episodes/{episode_id}/series\",\"action\":\"List Series (via Episode)\"},{\"name\":\"List Speaker (via Speakership)\",\"value\":\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\",\"description\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker\",\"action\":\"List Speaker (via Speakership)\"},{\"name\":\"List Speakerships (via Episode)\",\"value\":\"getEpisodesEpisodeIdSpeakerships\",\"description\":\"GET /episodes/{episode_id}/speakerships\",\"action\":\"List Speakerships (via Episode)\"},{\"name\":\"Get Channel (via Episode)\",\"value\":\"getEpisodesEpisodeIdChannelChannelId\",\"description\":\"GET /episodes/{episode_id}/channel/{channel_id}\",\"action\":\"Get Channel (via Episode)\"},{\"name\":\"Get Episode Resource (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\",\"description\":\"GET /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"action\":\"Get Episode Resource (via Episode)\"},{\"name\":\"Get Episode Time (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\",\"description\":\"GET /episodes/{episode_id}/episode_times/{episode_time_id}\",\"action\":\"Get Episode Time (via Episode)\"},{\"name\":\"Get Episode\",\"value\":\"getEpisodesEpisodeId\",\"description\":\"GET /episodes/{episode_id}\",\"action\":\"Get Episode\"},{\"name\":\"Get Note Template (via Episode)\",\"value\":\"getEpisodesEpisodeIdNoteTemplate\",\"description\":\"GET /episodes/{episode_id}/note_template\",\"action\":\"Get Note Template (via Episode)\"},{\"name\":\"Get Series (via Episode)\",\"value\":\"getEpisodesEpisodeIdSeriesSeriesId\",\"description\":\"GET /episodes/{episode_id}/series/{series_id}\",\"action\":\"Get Series (via Episode)\"},{\"name\":\"Get Speaker (via Speakership)\",\"value\":\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\",\"description\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker/{speaker_id}\",\"action\":\"Get Speaker (via Speakership)\"},{\"name\":\"Get Speakership (via Episode)\",\"value\":\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\",\"description\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}\",\"action\":\"Get Speakership (via Episode)\"},{\"name\":\"Create Channel (via Episode)\",\"value\":\"postEpisodesEpisodeIdChannel\",\"description\":\"POST /episodes/{episode_id}/channel\",\"action\":\"Create Channel (via Episode)\"},{\"name\":\"Create Episode Resource (via Episode)\",\"value\":\"postEpisodesEpisodeIdEpisodeResources\",\"description\":\"POST /episodes/{episode_id}/episode_resources\",\"action\":\"Create Episode Resource (via Episode)\"},{\"name\":\"Create Episode Time (via Episode)\",\"value\":\"postEpisodesEpisodeIdEpisodeTimes\",\"description\":\"POST /episodes/{episode_id}/episode_times\",\"action\":\"Create Episode Time (via Episode)\"},{\"name\":\"Create Episode\",\"value\":\"postEpisodes\",\"description\":\"POST /episodes\",\"action\":\"Create Episode\"},{\"name\":\"Create Generate Download Url (via Episode)\",\"value\":\"postEpisodesEpisodeIdGenerateDownloadUrl\",\"description\":\"POST /episodes/{episode_id}/generate_download_url\",\"action\":\"Create Generate Download Url (via Episode)\"},{\"name\":\"Create Series (via Episode)\",\"value\":\"postEpisodesEpisodeIdSeries\",\"description\":\"POST /episodes/{episode_id}/series\",\"action\":\"Create Series (via Episode)\"},{\"name\":\"Update Channel (via Episode)\",\"value\":\"patchEpisodesEpisodeIdChannelChannelId\",\"description\":\"PATCH /episodes/{episode_id}/channel/{channel_id}\",\"action\":\"Update Channel (via Episode)\"},{\"name\":\"Update Episode Resource (via Episode)\",\"value\":\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\",\"description\":\"PATCH /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"action\":\"Update Episode Resource (via Episode)\"},{\"name\":\"Update Episode Time (via Episode)\",\"value\":\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\",\"description\":\"PATCH /episodes/{episode_id}/episode_times/{episode_time_id}\",\"action\":\"Update Episode Time (via Episode)\"},{\"name\":\"Update Episode\",\"value\":\"patchEpisodesEpisodeId\",\"description\":\"PATCH /episodes/{episode_id}\",\"action\":\"Update Episode\"},{\"name\":\"Update Note Template (via Episode)\",\"value\":\"patchEpisodesEpisodeIdNoteTemplate\",\"description\":\"PATCH /episodes/{episode_id}/note_template\",\"action\":\"Update Note Template (via Episode)\"},{\"name\":\"Update Series (via Episode)\",\"value\":\"patchEpisodesEpisodeIdSeriesSeriesId\",\"description\":\"PATCH /episodes/{episode_id}/series/{series_id}\",\"action\":\"Update Series (via Episode)\"},{\"name\":\"Update Speakership (via Episode)\",\"value\":\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\",\"description\":\"PATCH /episodes/{episode_id}/speakerships/{speakership_id}\",\"action\":\"Update Speakership (via Episode)\"},{\"name\":\"Delete Channel (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdChannelChannelId\",\"description\":\"DELETE /episodes/{episode_id}/channel/{channel_id}\",\"action\":\"Delete Channel (via Episode)\"},{\"name\":\"Delete Episode Resource (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\",\"description\":\"DELETE /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"action\":\"Delete Episode Resource (via Episode)\"},{\"name\":\"Delete Episode Time (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\",\"description\":\"DELETE /episodes/{episode_id}/episode_times/{episode_time_id}\",\"action\":\"Delete Episode Time (via Episode)\"},{\"name\":\"Delete Episode\",\"value\":\"deleteEpisodesEpisodeId\",\"description\":\"DELETE /episodes/{episode_id}\",\"action\":\"Delete Episode\"},{\"name\":\"Delete Series (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdSeriesSeriesId\",\"description\":\"DELETE /episodes/{episode_id}/series/{series_id}\",\"action\":\"Delete Series (via Episode)\"},{\"name\":\"Delete Speakership (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\",\"description\":\"DELETE /episodes/{episode_id}/speakerships/{speakership_id}\",\"action\":\"Delete Speakership (via Episode)\"}],\n      default: \"getEpisodesEpisodeIdChannel\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"]}},\n      options: [{\"name\":\"List Channel (via Series)\",\"value\":\"getSeriesSeriesIdChannel\",\"description\":\"GET /series/{series_id}/channel\",\"action\":\"List Channel (via Series)\"},{\"name\":\"List Series\",\"value\":\"getSeries\",\"description\":\"GET /series\",\"action\":\"List Series\"},{\"name\":\"Get Channel (via Series)\",\"value\":\"getSeriesSeriesIdChannelChannelId\",\"description\":\"GET /series/{series_id}/channel/{channel_id}\",\"action\":\"Get Channel (via Series)\"},{\"name\":\"Get Series\",\"value\":\"getSeriesSeriesId\",\"description\":\"GET /series/{series_id}\",\"action\":\"Get Series\"},{\"name\":\"Create Channel (via Series)\",\"value\":\"postSeriesSeriesIdChannel\",\"description\":\"POST /series/{series_id}/channel\",\"action\":\"Create Channel (via Series)\"},{\"name\":\"Create Series\",\"value\":\"postSeries\",\"description\":\"POST /series\",\"action\":\"Create Series\"},{\"name\":\"Update Channel (via Series)\",\"value\":\"patchSeriesSeriesIdChannelChannelId\",\"description\":\"PATCH /series/{series_id}/channel/{channel_id}\",\"action\":\"Update Channel (via Series)\"},{\"name\":\"Update Series\",\"value\":\"patchSeriesSeriesId\",\"description\":\"PATCH /series/{series_id}\",\"action\":\"Update Series\"},{\"name\":\"Delete Channel (via Series)\",\"value\":\"deleteSeriesSeriesIdChannelChannelId\",\"description\":\"DELETE /series/{series_id}/channel/{channel_id}\",\"action\":\"Delete Channel (via Series)\"},{\"name\":\"Delete Series\",\"value\":\"deleteSeriesSeriesId\",\"description\":\"DELETE /series/{series_id}\",\"action\":\"Delete Series\"}],\n      default: \"getSeriesSeriesIdChannel\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"]}},\n      options: [{\"name\":\"List Speakers\",\"value\":\"getSpeakers\",\"description\":\"GET /speakers\",\"action\":\"List Speakers\"},{\"name\":\"Get Speaker\",\"value\":\"getSpeakersSpeakerId\",\"description\":\"GET /speakers/{speaker_id}\",\"action\":\"Get Speaker\"}],\n      default: \"getSpeakers\",\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResources_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"],\"getChannelsChannelIdChannelDefaultEpisodeResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultTimes_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdChannelDefaultTimesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getChannelsChannelIdChannelDefaultTimes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdChannelDefaultTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdChannelDefaultTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"],\"getChannelsChannelIdChannelDefaultTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getChannels_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannels_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"],\"getChannels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdCurrentEpisode_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdCurrentEpisodeChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getChannelsChannelIdCurrentEpisode_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\"displayName\":\"Series ID\",\"name\":\"whereseriesid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdCurrentEpisodeWhereseriesid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getChannelsChannelIdCurrentEpisode_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Stream Type Ascending\",\"value\":\"stream_type\"},{\"name\":\"Stream Type Descending\",\"value\":\"-stream_type\"},{\"name\":\"Published Live At Ascending\",\"value\":\"published_live_at\"},{\"name\":\"Published Live At Descending\",\"value\":\"-published_live_at\"},{\"name\":\"Published To Library At Ascending\",\"value\":\"published_to_library_at\"},{\"name\":\"Published To Library At Descending\",\"value\":\"-published_to_library_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannelsChannelIdCurrentEpisode_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdCurrentEpisode_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdCurrentEpisode_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"],\"getChannelsChannelIdCurrentEpisode_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdEpisodes_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdEpisodesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getChannelsChannelIdEpisodes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n      options: [{\"displayName\":\"Series ID\",\"name\":\"whereseriesid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdEpisodesWhereseriesid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getChannelsChannelIdEpisodes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Stream Type Ascending\",\"value\":\"stream_type\"},{\"name\":\"Stream Type Descending\",\"value\":\"-stream_type\"},{\"name\":\"Published Live At Ascending\",\"value\":\"published_live_at\"},{\"name\":\"Published Live At Descending\",\"value\":\"-published_live_at\"},{\"name\":\"Published To Library At Ascending\",\"value\":\"published_to_library_at\"},{\"name\":\"Published To Library At Descending\",\"value\":\"-published_to_library_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannelsChannelIdEpisodes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdEpisodes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdEpisodes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"],\"getChannelsChannelIdEpisodes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdNextTimes_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdNextTimesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdNextTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdNextTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"],\"getChannelsChannelIdNextTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdSeries_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdSeriesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getChannelsChannelIdSeries_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdSeriesWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getChannelsChannelIdSeries_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Episodes Count Ascending\",\"value\":\"episodes_count\"},{\"name\":\"Episodes Count Descending\",\"value\":\"-episodes_count\"},{\"name\":\"Started At Ascending\",\"value\":\"started_at\"},{\"name\":\"Started At Descending\",\"value\":\"-started_at\"},{\"name\":\"Ended At Ascending\",\"value\":\"ended_at\"},{\"name\":\"Ended At Descending\",\"value\":\"-ended_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannelsChannelIdSeries_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdSeries_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdSeries_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"],\"getChannelsChannelIdSeries_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdStatistics_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdStatisticsChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdStatistics_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdStatistics_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"],\"getChannelsChannelIdStatistics_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Channel Default Episode Resource ID\",\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId_channelDefaultEpisodeResourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelDefaultEpisodeResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Channel Default Time ID\",\n      name: \"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelDefaultTimeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannelsChannelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Current Episode ID\",\n      name: \"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId_currentEpisodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdEpisodesEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getChannelsChannelIdEpisodesEpisodeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdEpisodesEpisodeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannelsChannelIdEpisodesEpisodeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdNextTimesNextTimeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdNextTimesNextTimeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimesNextTimeId\"]}},\n    },\n    {\n      displayName: \"Next Time ID\",\n      name: \"getChannelsChannelIdNextTimesNextTimeId_nextTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimesNextTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimesNextTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdSeriesSeriesId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdSeriesSeriesIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getChannelsChannelIdSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getChannelsChannelIdSeriesSeriesId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdStatisticsStatisticId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetChannelsChannelIdStatisticsStatisticIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatisticsStatisticId\"]}},\n    },\n    {\n      displayName: \"Statistic ID\",\n      name: \"getChannelsChannelIdStatisticsStatisticId_statisticId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatisticsStatisticId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatisticsStatisticId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdChannelDefaultTimesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: \"Attribute: Day Of Week\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_dayOfWeek\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Hour\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_hour\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Minute\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_minute\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Frequency\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_frequency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"postChannels_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannels_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"postChannels_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"postChannels_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"postChannels_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"postChannels_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannels_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postChannels_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"postChannels_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"postChannels_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"postChannels_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"postChannels_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"postChannels_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"postChannels_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"postChannels_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"postChannels_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postChannels_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"postChannels_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postChannels_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"postChannels_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdCurrentEpisodeChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postChannelsChannelIdCurrentEpisode_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannelsChannelIdCurrentEpisode_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdCurrentEpisodeChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdCurrentEpisodeSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postChannelsChannelIdCurrentEpisode_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannelsChannelIdCurrentEpisode_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"postChannelsChannelIdCurrentEpisode_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"postChannelsChannelIdCurrentEpisode_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postChannelsChannelIdCurrentEpisode_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"postChannelsChannelIdCurrentEpisode_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"postChannelsChannelIdCurrentEpisode_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"postChannelsChannelIdCurrentEpisode_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_seriesIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdCurrentEpisodeSeriesIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdEpisodes_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdEpisodesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postChannelsChannelIdEpisodes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannelsChannelIdEpisodes_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"postChannelsChannelIdEpisodes_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdEpisodesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"postChannelsChannelIdEpisodes_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdEpisodesSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postChannelsChannelIdEpisodes_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannelsChannelIdEpisodes_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"postChannelsChannelIdEpisodes_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"postChannelsChannelIdEpisodes_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postChannelsChannelIdEpisodes_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"postChannelsChannelIdEpisodes_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"postChannelsChannelIdEpisodes_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"postChannelsChannelIdEpisodes_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"postChannelsChannelIdEpisodes_seriesIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdEpisodesSeriesIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdSeries_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostChannelsChannelIdSeriesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postChannelsChannelIdSeries_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannelsChannelIdSeries_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannelsChannelIdSeries_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postChannelsChannelIdSeries_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postChannelsChannelIdSeries_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Channel Default Time ID\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelDefaultTimeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Day Of Week\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_dayOfWeek\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Hour\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_hour\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Minute\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_minute\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Frequency\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_frequency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchChannelsChannelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"patchChannelsChannelId_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"patchChannelsChannelId_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"patchChannelsChannelId_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"patchChannelsChannelId_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchChannelsChannelId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"patchChannelsChannelId_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"patchChannelsChannelId_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"patchChannelsChannelId_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"patchChannelsChannelId_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"patchChannelsChannelId_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"patchChannelsChannelId_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"patchChannelsChannelId_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchChannelsChannelId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchChannelsChannelId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"patchChannelsChannelId_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchChannelsChannelId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"patchChannelsChannelId_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Current Episode ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_currentEpisodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_seriesIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdEpisodesEpisodeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_seriesIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdSeriesSeriesIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchChannelsChannelIdSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Channel Default Time ID\",\n      name: \"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelDefaultTimeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Current Episode ID\",\n      name: \"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId_currentEpisodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdEpisodesEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteChannelsChannelIdEpisodesEpisodeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdEpisodesEpisodeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdSeriesSeriesId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdSeriesSeriesIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteChannelsChannelIdSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteChannelsChannelIdSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdChannel_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdChannelEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEpisodesEpisodeIdChannel_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodesEpisodeIdChannel_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdChannel_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdChannel_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"],\"getEpisodesEpisodeIdChannel_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeResources_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEpisodesEpisodeIdEpisodeResources_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdEpisodeResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdEpisodeResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"],\"getEpisodesEpisodeIdEpisodeResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeTimes_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdEpisodeTimesEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEpisodesEpisodeIdEpisodeTimes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdEpisodeTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdEpisodeTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"],\"getEpisodesEpisodeIdEpisodeTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEpisodes_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n      options: [{\"displayName\":\"Series ID\",\"name\":\"whereseriesid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesWhereseriesid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEpisodes_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Stream Type Ascending\",\"value\":\"stream_type\"},{\"name\":\"Stream Type Descending\",\"value\":\"-stream_type\"},{\"name\":\"Published Live At Ascending\",\"value\":\"published_live_at\"},{\"name\":\"Published Live At Descending\",\"value\":\"-published_live_at\"},{\"name\":\"Published To Library At Ascending\",\"value\":\"published_to_library_at\"},{\"name\":\"Published To Library At Descending\",\"value\":\"-published_to_library_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"],\"getEpisodes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSeries_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSeriesEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getEpisodesEpisodeIdSeries_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSeriesWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEpisodesEpisodeIdSeries_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Episodes Count Ascending\",\"value\":\"episodes_count\"},{\"name\":\"Episodes Count Descending\",\"value\":\"-episodes_count\"},{\"name\":\"Started At Ascending\",\"value\":\"started_at\"},{\"name\":\"Started At Descending\",\"value\":\"-started_at\"},{\"name\":\"Ended At Ascending\",\"value\":\"ended_at\"},{\"name\":\"Ended At Descending\",\"value\":\"-ended_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodesEpisodeIdSeries_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdSeries_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdSeries_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"],\"getEpisodesEpisodeIdSeries_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_speakershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"],\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakerships_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodesEpisodeIdSpeakerships_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Speaker\",\"value\":\"speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdSpeakerships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdSpeakerships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"],\"getEpisodesEpisodeIdSpeakerships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdChannelChannelId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdChannelChannelIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getEpisodesEpisodeIdChannelChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdChannelChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodesEpisodeIdChannelChannelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Episode Resource ID\",\n      name: \"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeResourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Episode Time ID\",\n      name: \"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeTimeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodesEpisodeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdNoteTemplate_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdNoteTemplateEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdNoteTemplate\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdNoteTemplate\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSeriesSeriesId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSeriesSeriesIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getEpisodesEpisodeIdSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodesEpisodeIdSeriesSeriesId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_speakershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n    },\n    {\n      displayName: \"Speaker ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_speakerId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakerId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipId_speakershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Speaker\",\"value\":\"speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdChannel_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesEpisodeIdChannelEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postEpisodesEpisodeIdChannel_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postEpisodesEpisodeIdChannel_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"postEpisodesEpisodeIdChannel_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"postEpisodesEpisodeIdChannel_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"postEpisodesEpisodeIdChannel_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"postEpisodesEpisodeIdChannel_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postEpisodesEpisodeIdChannel_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postEpisodesEpisodeIdChannel_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"postEpisodesEpisodeIdChannel_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"postEpisodesEpisodeIdChannel_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"postEpisodesEpisodeIdChannel_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"postEpisodesEpisodeIdChannel_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"postEpisodesEpisodeIdChannel_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"postEpisodesEpisodeIdChannel_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"postEpisodesEpisodeIdChannel_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"postEpisodesEpisodeIdChannel_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postEpisodesEpisodeIdChannel_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"postEpisodesEpisodeIdChannel_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postEpisodesEpisodeIdChannel_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"postEpisodesEpisodeIdChannel_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesEpisodeIdEpisodeResourcesEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Featured\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_featured\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Icon\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_icon\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Type\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_type\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesEpisodeIdEpisodeTimesEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: \"Attribute: Starts At\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_startsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Embed Code\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_videoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"postEpisodes_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postEpisodes_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"postEpisodes_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"postEpisodes_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postEpisodes_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postEpisodes_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"postEpisodes_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"postEpisodes_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postEpisodes_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"postEpisodes_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"postEpisodes_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"postEpisodes_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"postEpisodes_seriesIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesSeriesIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdGenerateDownloadUrl_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesEpisodeIdGenerateDownloadUrlEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdSeries_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostEpisodesEpisodeIdSeriesEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postEpisodesEpisodeIdSeries_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postEpisodesEpisodeIdSeries_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postEpisodesEpisodeIdSeries_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postEpisodesEpisodeIdSeries_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postEpisodesEpisodeIdSeries_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdChannelChannelIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdChannelChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Episode Resource ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeResourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Featured\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_featured\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Icon\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_icon\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Type\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_type\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Episode Time ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeTimeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Starts At\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_startsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Embed Code\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_videoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEpisodesEpisodeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchEpisodesEpisodeId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"patchEpisodesEpisodeId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"patchEpisodesEpisodeId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: false,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchEpisodesEpisodeId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchEpisodesEpisodeId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"patchEpisodesEpisodeId_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"patchEpisodesEpisodeId_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchEpisodesEpisodeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"patchEpisodesEpisodeId_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"patchEpisodesEpisodeId_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"patchEpisodesEpisodeId_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"patchEpisodesEpisodeId_seriesIds\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdSeriesIds\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdNoteTemplateEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"]}},\n    },\n    {\n      displayName: \"Attribute: Enabled\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_enabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Template\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_template\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Auto Create Free Form Notes\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_autoCreateFreeFormNotes\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdSeriesSeriesIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_speakershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Speaker\",\"value\":\"speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdChannelChannelId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdChannelChannelIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteEpisodesEpisodeIdChannelChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdChannelChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Episode Resource ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeResourceId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Episode Time ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeTimeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdSeriesSeriesId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdSeriesSeriesIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteEpisodesEpisodeIdSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId_speakershipId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getSeriesSeriesIdChannel_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSeriesSeriesIdChannelSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getSeriesSeriesIdChannel_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSeriesSeriesIdChannel_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSeriesSeriesIdChannel_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSeriesSeriesIdChannel_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"],\"getSeriesSeriesIdChannel_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getSeries_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSeriesWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getSeries_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Episodes Count Ascending\",\"value\":\"episodes_count\"},{\"name\":\"Episodes Count Descending\",\"value\":\"-episodes_count\"},{\"name\":\"Started At Ascending\",\"value\":\"started_at\"},{\"name\":\"Started At Descending\",\"value\":\"-started_at\"},{\"name\":\"Ended At Ascending\",\"value\":\"ended_at\"},{\"name\":\"Ended At Descending\",\"value\":\"-ended_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSeries_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSeries_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSeries_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"],\"getSeries_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getSeriesSeriesIdChannelChannelId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSeriesSeriesIdChannelChannelIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getSeriesSeriesIdChannelChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSeriesSeriesIdChannelChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSeriesSeriesIdChannelChannelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSeriesSeriesId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"postSeriesSeriesIdChannel_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPostSeriesSeriesIdChannelSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"postSeriesSeriesIdChannel_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postSeriesSeriesIdChannel_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"postSeriesSeriesIdChannel_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"postSeriesSeriesIdChannel_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"postSeriesSeriesIdChannel_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"postSeriesSeriesIdChannel_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postSeriesSeriesIdChannel_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postSeriesSeriesIdChannel_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"postSeriesSeriesIdChannel_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"postSeriesSeriesIdChannel_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"postSeriesSeriesIdChannel_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"postSeriesSeriesIdChannel_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"postSeriesSeriesIdChannel_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"postSeriesSeriesIdChannel_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"postSeriesSeriesIdChannel_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"postSeriesSeriesIdChannel_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postSeriesSeriesIdChannel_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"postSeriesSeriesIdChannel_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postSeriesSeriesIdChannel_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"postSeriesSeriesIdChannel_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Include\",\n      name: \"postSeries_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postSeries_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postSeries_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postSeries_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postSeries_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchSeriesSeriesIdChannelChannelId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchSeriesSeriesIdChannelChannelIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchSeriesSeriesIdChannelChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchSeriesSeriesIdChannelChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchSeriesSeriesIdChannelChannelId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchSeriesSeriesIdChannelChannelId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"patchSeriesSeriesIdChannelChannelId_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"patchSeriesSeriesIdChannelChannelId_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"patchSeriesSeriesIdChannelChannelId_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"patchSeriesSeriesIdChannelChannelId_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchSeriesSeriesIdChannelChannelId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchSeriesSeriesIdChannelChannelId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"patchSeriesSeriesIdChannelChannelId_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"patchSeriesSeriesIdChannelChannelId_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"patchSeriesSeriesIdChannelChannelId_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"patchSeriesSeriesIdChannelChannelId_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"patchSeriesSeriesIdChannelChannelId_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"patchSeriesSeriesIdChannelChannelId_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"patchSeriesSeriesIdChannelChannelId_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchSeriesSeriesIdChannelChannelId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchSeriesSeriesIdChannelChannelId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"patchSeriesSeriesIdChannelChannelId_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchSeriesSeriesIdChannelChannelId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"patchSeriesSeriesIdChannelChannelId_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchPatchSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"patchSeriesSeriesId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchSeriesSeriesId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchSeriesSeriesId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchSeriesSeriesId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchSeriesSeriesId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteSeriesSeriesIdChannelChannelId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteSeriesSeriesIdChannelChannelIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteSeriesSeriesIdChannelChannelId_channelId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteSeriesSeriesIdChannelChannelIdChannelId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteSeriesSeriesId_seriesId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchDeleteSeriesSeriesIdSeriesId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getSpeakers_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSpeakers_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSpeakers_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"],\"getSpeakers_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Speaker ID\",\n      name: \"getSpeakersSpeakerId_speakerId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSpeakersSpeakerIdSpeakerId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakersSpeakerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakersSpeakerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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

export class PlanningCenterPublishing implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Publishing",
    name: "planningCenterPublishing",
    icon: 'file:publishing.svg',
    group: ['transform'],
    version: 1,
    subtitle: "={{({\"getChannelsChannelIdChannelDefaultEpisodeResources\":\"GET /channels/{channel_id}/channel_default_episode_resources\",\"getChannelsChannelIdChannelDefaultTimes\":\"GET /channels/{channel_id}/channel_default_times\",\"getChannels\":\"GET /channels\",\"getChannelsChannelIdCurrentEpisode\":\"GET /channels/{channel_id}/current_episode\",\"getChannelsChannelIdEpisodes\":\"GET /channels/{channel_id}/episodes\",\"getChannelsChannelIdNextTimes\":\"GET /channels/{channel_id}/next_times\",\"getChannelsChannelIdSeries\":\"GET /channels/{channel_id}/series\",\"getChannelsChannelIdStatistics\":\"GET /channels/{channel_id}/statistics\",\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\":\"GET /channels/{channel_id}/channel_default_episode_resources/{channel_default_episode_resource_id}\",\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\":\"GET /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"getChannelsChannelId\":\"GET /channels/{channel_id}\",\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\":\"GET /channels/{channel_id}/current_episode/{current_episode_id}\",\"getChannelsChannelIdEpisodesEpisodeId\":\"GET /channels/{channel_id}/episodes/{episode_id}\",\"getChannelsChannelIdNextTimesNextTimeId\":\"GET /channels/{channel_id}/next_times/{next_time_id}\",\"getChannelsChannelIdSeriesSeriesId\":\"GET /channels/{channel_id}/series/{series_id}\",\"getChannelsChannelIdStatisticsStatisticId\":\"GET /channels/{channel_id}/statistics/{statistic_id}\",\"postChannelsChannelIdChannelDefaultTimes\":\"POST /channels/{channel_id}/channel_default_times\",\"postChannels\":\"POST /channels\",\"postChannelsChannelIdCurrentEpisode\":\"POST /channels/{channel_id}/current_episode\",\"postChannelsChannelIdEpisodes\":\"POST /channels/{channel_id}/episodes\",\"postChannelsChannelIdSeries\":\"POST /channels/{channel_id}/series\",\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\":\"PATCH /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"patchChannelsChannelId\":\"PATCH /channels/{channel_id}\",\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\":\"PATCH /channels/{channel_id}/current_episode/{current_episode_id}\",\"patchChannelsChannelIdEpisodesEpisodeId\":\"PATCH /channels/{channel_id}/episodes/{episode_id}\",\"patchChannelsChannelIdSeriesSeriesId\":\"PATCH /channels/{channel_id}/series/{series_id}\",\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\":\"DELETE /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"deleteChannelsChannelId\":\"DELETE /channels/{channel_id}\",\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\":\"DELETE /channels/{channel_id}/current_episode/{current_episode_id}\",\"deleteChannelsChannelIdEpisodesEpisodeId\":\"DELETE /channels/{channel_id}/episodes/{episode_id}\",\"deleteChannelsChannelIdSeriesSeriesId\":\"DELETE /channels/{channel_id}/series/{series_id}\",\"getEpisodesEpisodeIdChannel\":\"GET /episodes/{episode_id}/channel\",\"getEpisodesEpisodeIdEpisodeResources\":\"GET /episodes/{episode_id}/episode_resources\",\"getEpisodesEpisodeIdEpisodeTimes\":\"GET /episodes/{episode_id}/episode_times\",\"getEpisodes\":\"GET /episodes\",\"getEpisodesEpisodeIdSeries\":\"GET /episodes/{episode_id}/series\",\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker\",\"getEpisodesEpisodeIdSpeakerships\":\"GET /episodes/{episode_id}/speakerships\",\"getEpisodesEpisodeIdChannelChannelId\":\"GET /episodes/{episode_id}/channel/{channel_id}\",\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\":\"GET /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\":\"GET /episodes/{episode_id}/episode_times/{episode_time_id}\",\"getEpisodesEpisodeId\":\"GET /episodes/{episode_id}\",\"getEpisodesEpisodeIdNoteTemplate\":\"GET /episodes/{episode_id}/note_template\",\"getEpisodesEpisodeIdSeriesSeriesId\":\"GET /episodes/{episode_id}/series/{series_id}\",\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker/{speaker_id}\",\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}\",\"postEpisodesEpisodeIdChannel\":\"POST /episodes/{episode_id}/channel\",\"postEpisodesEpisodeIdEpisodeResources\":\"POST /episodes/{episode_id}/episode_resources\",\"postEpisodesEpisodeIdEpisodeTimes\":\"POST /episodes/{episode_id}/episode_times\",\"postEpisodes\":\"POST /episodes\",\"postEpisodesEpisodeIdGenerateDownloadUrl\":\"POST /episodes/{episode_id}/generate_download_url\",\"postEpisodesEpisodeIdSeries\":\"POST /episodes/{episode_id}/series\",\"patchEpisodesEpisodeIdChannelChannelId\":\"PATCH /episodes/{episode_id}/channel/{channel_id}\",\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\":\"PATCH /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\":\"PATCH /episodes/{episode_id}/episode_times/{episode_time_id}\",\"patchEpisodesEpisodeId\":\"PATCH /episodes/{episode_id}\",\"patchEpisodesEpisodeIdNoteTemplate\":\"PATCH /episodes/{episode_id}/note_template\",\"patchEpisodesEpisodeIdSeriesSeriesId\":\"PATCH /episodes/{episode_id}/series/{series_id}\",\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\":\"PATCH /episodes/{episode_id}/speakerships/{speakership_id}\",\"deleteEpisodesEpisodeIdChannelChannelId\":\"DELETE /episodes/{episode_id}/channel/{channel_id}\",\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\":\"DELETE /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\":\"DELETE /episodes/{episode_id}/episode_times/{episode_time_id}\",\"deleteEpisodesEpisodeId\":\"DELETE /episodes/{episode_id}\",\"deleteEpisodesEpisodeIdSeriesSeriesId\":\"DELETE /episodes/{episode_id}/series/{series_id}\",\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\":\"DELETE /episodes/{episode_id}/speakerships/{speakership_id}\",\"getSeriesSeriesIdChannel\":\"GET /series/{series_id}/channel\",\"getSeries\":\"GET /series\",\"getSeriesSeriesIdChannelChannelId\":\"GET /series/{series_id}/channel/{channel_id}\",\"getSeriesSeriesId\":\"GET /series/{series_id}\",\"postSeriesSeriesIdChannel\":\"POST /series/{series_id}/channel\",\"postSeries\":\"POST /series\",\"patchSeriesSeriesIdChannelChannelId\":\"PATCH /series/{series_id}/channel/{channel_id}\",\"patchSeriesSeriesId\":\"PATCH /series/{series_id}\",\"deleteSeriesSeriesIdChannelChannelId\":\"DELETE /series/{series_id}/channel/{channel_id}\",\"deleteSeriesSeriesId\":\"DELETE /series/{series_id}\",\"getSpeakers\":\"GET /speakers\",\"getSpeakersSpeakerId\":\"GET /speakers/{speaker_id}\"})[$parameter[\"operation\"]] || $parameter[\"operation\"]}}",
    description: "Planning Center Publishing generated from the Planning Center OpenAPI snapshot.",
    defaults: {
      name: "Planning Center Publishing",
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
      searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId"], filter);
      },
      searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId"], filter);
      },
      searchDeleteChannelsChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdChannelId"], filter);
      },
      searchDeleteChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId"], filter);
      },
      searchDeleteChannelsChannelIdEpisodesEpisodeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdEpisodesEpisodeIdChannelId"], filter);
      },
      searchDeleteChannelsChannelIdEpisodesEpisodeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdEpisodesEpisodeIdEpisodeId"], filter);
      },
      searchDeleteChannelsChannelIdSeriesSeriesIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdSeriesSeriesIdChannelId"], filter);
      },
      searchDeleteChannelsChannelIdSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteChannelsChannelIdSeriesSeriesIdSeriesId"], filter);
      },
      searchDeleteEpisodesEpisodeIdChannelChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdChannelChannelIdChannelId"], filter);
      },
      searchDeleteEpisodesEpisodeIdChannelChannelIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdChannelChannelIdEpisodeId"], filter);
      },
      searchDeleteEpisodesEpisodeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdEpisodeId"], filter);
      },
      searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId"], filter);
      },
      searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId"], filter);
      },
      searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId"], filter);
      },
      searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId"], filter);
      },
      searchDeleteEpisodesEpisodeIdSeriesSeriesIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdSeriesSeriesIdEpisodeId"], filter);
      },
      searchDeleteEpisodesEpisodeIdSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdSeriesSeriesIdSeriesId"], filter);
      },
      searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId"], filter);
      },
      searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId"], filter);
      },
      searchDeleteSeriesSeriesIdChannelChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteSeriesSeriesIdChannelChannelIdChannelId"], filter);
      },
      searchDeleteSeriesSeriesIdChannelChannelIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteSeriesSeriesIdChannelChannelIdSeriesId"], filter);
      },
      searchDeleteSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchDeleteSeriesSeriesIdSeriesId"], filter);
      },
      searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelDefaultEpisodeResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelDefaultEpisodeResourceId"], filter);
      },
      searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceIdChannelId"], filter);
      },
      searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdChannelDefaultEpisodeResourcesChannelId"], filter);
      },
      searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId"], filter);
      },
      searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId"], filter);
      },
      searchGetChannelsChannelIdChannelDefaultTimesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdChannelDefaultTimesChannelId"], filter);
      },
      searchGetChannelsChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdChannelId"], filter);
      },
      searchGetChannelsChannelIdCurrentEpisodeChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdCurrentEpisodeChannelId"], filter);
      },
      searchGetChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId"], filter);
      },
      searchGetChannelsChannelIdCurrentEpisodeWhereseriesid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdCurrentEpisodeWhereseriesid"], filter);
      },
      searchGetChannelsChannelIdEpisodesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdEpisodesChannelId"], filter);
      },
      searchGetChannelsChannelIdEpisodesEpisodeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdEpisodesEpisodeIdChannelId"], filter);
      },
      searchGetChannelsChannelIdEpisodesEpisodeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdEpisodesEpisodeIdEpisodeId"], filter);
      },
      searchGetChannelsChannelIdEpisodesWhereseriesid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdEpisodesWhereseriesid"], filter);
      },
      searchGetChannelsChannelIdNextTimesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdNextTimesChannelId"], filter);
      },
      searchGetChannelsChannelIdNextTimesNextTimeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdNextTimesNextTimeIdChannelId"], filter);
      },
      searchGetChannelsChannelIdSeriesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdSeriesChannelId"], filter);
      },
      searchGetChannelsChannelIdSeriesSeriesIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdSeriesSeriesIdChannelId"], filter);
      },
      searchGetChannelsChannelIdSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdSeriesSeriesIdSeriesId"], filter);
      },
      searchGetChannelsChannelIdSeriesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdSeriesWhereid"], filter);
      },
      searchGetChannelsChannelIdStatisticsChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdStatisticsChannelId"], filter);
      },
      searchGetChannelsChannelIdStatisticsStatisticIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetChannelsChannelIdStatisticsStatisticIdChannelId"], filter);
      },
      searchGetEpisodesEpisodeIdChannelChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdChannelChannelIdChannelId"], filter);
      },
      searchGetEpisodesEpisodeIdChannelChannelIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdChannelChannelIdEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdChannelEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdChannelEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId"], filter);
      },
      searchGetEpisodesEpisodeIdEpisodeTimesEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdEpisodeTimesEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId"], filter);
      },
      searchGetEpisodesEpisodeIdNoteTemplateEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdNoteTemplateEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdSeriesEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSeriesEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdSeriesSeriesIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSeriesSeriesIdEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSeriesSeriesIdSeriesId"], filter);
      },
      searchGetEpisodesEpisodeIdSeriesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSeriesWhereid"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdEpisodeId"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakerId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakerId"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerIdSpeakershipId"], filter);
      },
      searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakershipId"], filter);
      },
      searchGetEpisodesWhereseriesid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetEpisodesWhereseriesid"], filter);
      },
      searchGetSeriesSeriesIdChannelChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdChannelChannelIdChannelId"], filter);
      },
      searchGetSeriesSeriesIdChannelChannelIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdChannelChannelIdSeriesId"], filter);
      },
      searchGetSeriesSeriesIdChannelSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdChannelSeriesId"], filter);
      },
      searchGetSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSeriesSeriesIdSeriesId"], filter);
      },
      searchGetSeriesWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSeriesWhereid"], filter);
      },
      searchGetSpeakersSpeakerIdSpeakerId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSpeakersSpeakerIdSpeakerId"], filter);
      },
      searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelDefaultTimeId"], filter);
      },
      searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeIdChannelId"], filter);
      },
      searchPatchChannelsChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdChannelId"], filter);
      },
      searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdChannelId"], filter);
      },
      searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesId"], filter);
      },
      searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdCurrentEpisodeCurrentEpisodeIdSeriesIds"], filter);
      },
      searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdEpisodesEpisodeIdChannelId"], filter);
      },
      searchPatchChannelsChannelIdEpisodesEpisodeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdEpisodesEpisodeIdEpisodeId"], filter);
      },
      searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesId"], filter);
      },
      searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdEpisodesEpisodeIdSeriesIds"], filter);
      },
      searchPatchChannelsChannelIdSeriesSeriesIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdSeriesSeriesIdChannelId"], filter);
      },
      searchPatchChannelsChannelIdSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchChannelsChannelIdSeriesSeriesIdSeriesId"], filter);
      },
      searchPatchEpisodesEpisodeIdChannelChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdChannelChannelIdChannelId"], filter);
      },
      searchPatchEpisodesEpisodeIdChannelChannelIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdChannelChannelIdEpisodeId"], filter);
      },
      searchPatchEpisodesEpisodeIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdChannelId"], filter);
      },
      searchPatchEpisodesEpisodeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdEpisodeId"], filter);
      },
      searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeId"], filter);
      },
      searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceIdEpisodeResourceId"], filter);
      },
      searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeId"], filter);
      },
      searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdEpisodeTimesEpisodeTimeIdEpisodeTimeId"], filter);
      },
      searchPatchEpisodesEpisodeIdNoteTemplateEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdNoteTemplateEpisodeId"], filter);
      },
      searchPatchEpisodesEpisodeIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdSeriesId"], filter);
      },
      searchPatchEpisodesEpisodeIdSeriesIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdSeriesIds"], filter);
      },
      searchPatchEpisodesEpisodeIdSeriesSeriesIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdSeriesSeriesIdEpisodeId"], filter);
      },
      searchPatchEpisodesEpisodeIdSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdSeriesSeriesIdSeriesId"], filter);
      },
      searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdEpisodeId"], filter);
      },
      searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakershipId"], filter);
      },
      searchPatchSeriesSeriesIdChannelChannelIdChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchSeriesSeriesIdChannelChannelIdChannelId"], filter);
      },
      searchPatchSeriesSeriesIdChannelChannelIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchSeriesSeriesIdChannelChannelIdSeriesId"], filter);
      },
      searchPatchSeriesSeriesIdSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPatchSeriesSeriesIdSeriesId"], filter);
      },
      searchPostChannelsChannelIdChannelDefaultTimesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdChannelDefaultTimesChannelId"], filter);
      },
      searchPostChannelsChannelIdCurrentEpisodeChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdCurrentEpisodeChannelId"], filter);
      },
      searchPostChannelsChannelIdCurrentEpisodeSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdCurrentEpisodeSeriesId"], filter);
      },
      searchPostChannelsChannelIdCurrentEpisodeSeriesIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdCurrentEpisodeSeriesIds"], filter);
      },
      searchPostChannelsChannelIdEpisodesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdEpisodesChannelId"], filter);
      },
      searchPostChannelsChannelIdEpisodesSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdEpisodesSeriesId"], filter);
      },
      searchPostChannelsChannelIdEpisodesSeriesIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdEpisodesSeriesIds"], filter);
      },
      searchPostChannelsChannelIdSeriesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostChannelsChannelIdSeriesChannelId"], filter);
      },
      searchPostEpisodesChannelId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesChannelId"], filter);
      },
      searchPostEpisodesEpisodeIdChannelEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesEpisodeIdChannelEpisodeId"], filter);
      },
      searchPostEpisodesEpisodeIdEpisodeResourcesEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesEpisodeIdEpisodeResourcesEpisodeId"], filter);
      },
      searchPostEpisodesEpisodeIdEpisodeTimesEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesEpisodeIdEpisodeTimesEpisodeId"], filter);
      },
      searchPostEpisodesEpisodeIdGenerateDownloadUrlEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesEpisodeIdGenerateDownloadUrlEpisodeId"], filter);
      },
      searchPostEpisodesEpisodeIdSeriesEpisodeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesEpisodeIdSeriesEpisodeId"], filter);
      },
      searchPostEpisodesSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesSeriesId"], filter);
      },
      searchPostEpisodesSeriesIds: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostEpisodesSeriesIds"], filter);
      },
      searchPostSeriesSeriesIdChannelSeriesId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchPostSeriesSeriesIdChannelSeriesId"], filter);
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
        throw new Error(`Unsupported Planning Center Publishing operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
