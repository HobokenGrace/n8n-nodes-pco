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
    "id": "getChannelsChannelIdChannelDefaultEpisodeResources",
    "resource": "Channel",
    "operation": "List Channel Default Episode Resources (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_episode_resources",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_episode_resources",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "getChannelsChannelIdChannelDefaultTimes",
    "resource": "Channel",
    "operation": "List Channel Default Times (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_times",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
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
    "id": "getChannelsChannelIdCurrentEpisode",
    "resource": "Channel",
    "operation": "List Current Episode (via Channel)",
    "description": "GET /channels/{channel_id}/current_episode",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/current_episode",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
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
        "type": "string",
        "kind": "single",
        "sourceName": "where[series][id]"
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
    "id": "getChannelsChannelIdEpisodes",
    "resource": "Channel",
    "operation": "List Episodes (via Channel)",
    "description": "GET /channels/{channel_id}/episodes",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/episodes",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "whereseriesid",
        "displayName": "Series ID",
        "type": "string",
        "kind": "single",
        "sourceName": "where[series][id]"
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
    "id": "getChannelsChannelIdNextTimes",
    "resource": "Channel",
    "operation": "List Next Times (via Channel)",
    "description": "GET /channels/{channel_id}/next_times",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/next_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "getChannelsChannelIdSeries",
    "resource": "Channel",
    "operation": "List Series (via Channel)",
    "description": "GET /channels/{channel_id}/series",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/series",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
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
    "id": "getChannelsChannelIdStatistics",
    "resource": "Channel",
    "operation": "List Statistics (via Channel)",
    "description": "GET /channels/{channel_id}/statistics",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/statistics",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId",
    "resource": "Channel",
    "operation": "Get Channel Default Episode Resource (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_episode_resources/{channel_default_episode_resource_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_episode_resources/{channel_default_episode_resource_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelDefaultEpisodeResourceId",
        "sourceName": "channel_default_episode_resource_id",
        "displayName": "Channel Default Episode Resource ID",
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
    "id": "getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId",
    "resource": "Channel",
    "operation": "Get Channel Default Time (via Channel)",
    "description": "GET /channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/channel_default_times/{channel_default_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelDefaultTimeId",
        "sourceName": "channel_default_time_id",
        "displayName": "Channel Default Time ID",
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
    "id": "getChannelsChannelId",
    "resource": "Channel",
    "operation": "Get Channel",
    "description": "GET /channels/{channel_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "getChannelsChannelIdCurrentEpisodeCurrentEpisodeId",
    "resource": "Channel",
    "operation": "Get Current Episode (via Channel)",
    "description": "GET /channels/{channel_id}/current_episode/{current_episode_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/current_episode/{current_episode_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "id": "getChannelsChannelIdNextTimesNextTimeId",
    "resource": "Channel",
    "operation": "Get Next Time (via Channel)",
    "description": "GET /channels/{channel_id}/next_times/{next_time_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/next_times/{next_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "id": "getChannelsChannelIdStatisticsStatisticId",
    "resource": "Channel",
    "operation": "Get Statistic (via Channel)",
    "description": "GET /channels/{channel_id}/statistics/{statistic_id}",
    "method": "GET",
    "path": "/publishing/v2/channels/{channel_id}/statistics/{statistic_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string"
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
        "multiple": false
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string"
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
        "multiple": false
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelDefaultTimeId",
        "sourceName": "channel_default_time_id",
        "displayName": "Channel Default Time ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
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
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string"
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
        "multiple": false
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string"
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
        "multiple": false
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelDefaultTimeId",
        "sourceName": "channel_default_time_id",
        "displayName": "Channel Default Time ID",
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
    "id": "deleteChannelsChannelId",
    "resource": "Channel",
    "operation": "Delete Channel",
    "description": "DELETE /channels/{channel_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId",
    "resource": "Channel",
    "operation": "Delete Current Episode (via Channel)",
    "description": "DELETE /channels/{channel_id}/current_episode/{current_episode_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}/current_episode/{current_episode_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "id": "deleteChannelsChannelIdSeriesSeriesId",
    "resource": "Channel",
    "operation": "Delete Series (via Channel)",
    "description": "DELETE /channels/{channel_id}/series/{series_id}",
    "method": "DELETE",
    "path": "/publishing/v2/channels/{channel_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "id": "getEpisodesEpisodeIdChannel",
    "resource": "Episode",
    "operation": "List Channel (via Episode)",
    "description": "GET /episodes/{episode_id}/channel",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/channel",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "queryOptions": [
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
    "id": "getEpisodesEpisodeIdEpisodeResources",
    "resource": "Episode",
    "operation": "List Episode Resources (via Episode)",
    "description": "GET /episodes/{episode_id}/episode_resources",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "whereseriesid",
        "displayName": "Series ID",
        "type": "string",
        "kind": "single",
        "sourceName": "where[series][id]"
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
    "id": "getEpisodesEpisodeIdSeries",
    "resource": "Episode",
    "operation": "List Series (via Episode)",
    "description": "GET /episodes/{episode_id}/series",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/series",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
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
    "id": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker",
    "resource": "Episode",
    "operation": "List Speaker (via Speakership)",
    "description": "GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}/speaker",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
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
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "id": "getEpisodesEpisodeIdChannelChannelId",
    "resource": "Episode",
    "operation": "Get Channel (via Episode)",
    "description": "GET /episodes/{episode_id}/channel/{channel_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId",
    "resource": "Episode",
    "operation": "Get Episode Resource (via Episode)",
    "description": "GET /episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeResourceId",
        "sourceName": "episode_resource_id",
        "displayName": "Episode Resource ID",
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
    "id": "getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId",
    "resource": "Episode",
    "operation": "Get Episode Time (via Episode)",
    "description": "GET /episodes/{episode_id}/episode_times/{episode_time_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/episode_times/{episode_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeTimeId",
        "sourceName": "episode_time_id",
        "displayName": "Episode Time ID",
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
    "id": "getEpisodesEpisodeId",
    "resource": "Episode",
    "operation": "Get Episode",
    "description": "GET /episodes/{episode_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "id": "getEpisodesEpisodeIdNoteTemplate",
    "resource": "Episode",
    "operation": "Get Note Template (via Episode)",
    "description": "GET /episodes/{episode_id}/note_template",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/note_template",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "id": "getEpisodesEpisodeIdSeriesSeriesId",
    "resource": "Episode",
    "operation": "Get Series (via Episode)",
    "description": "GET /episodes/{episode_id}/series/{series_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "id": "getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId",
    "resource": "Episode",
    "operation": "Get Speaker (via Speakership)",
    "description": "GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker/{speaker_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}/speaker/{speaker_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "speakerId",
        "sourceName": "speaker_id",
        "displayName": "Speaker ID",
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
    "id": "getEpisodesEpisodeIdSpeakershipsSpeakershipId",
    "resource": "Episode",
    "operation": "Get Speakership (via Episode)",
    "description": "GET /episodes/{episode_id}/speakerships/{speakership_id}",
    "method": "GET",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
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
    "id": "postEpisodesEpisodeIdChannel",
    "resource": "Episode",
    "operation": "Create Channel (via Episode)",
    "description": "POST /episodes/{episode_id}/channel",
    "method": "POST",
    "path": "/publishing/v2/episodes/{episode_id}/channel",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
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
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string"
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
        "multiple": false
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "id": "postEpisodesEpisodeIdSeries",
    "resource": "Episode",
    "operation": "Create Series (via Episode)",
    "description": "POST /episodes/{episode_id}/series",
    "method": "POST",
    "path": "/publishing/v2/episodes/{episode_id}/series",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeResourceId",
        "sourceName": "episode_resource_id",
        "displayName": "Episode Resource ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeTimeId",
        "sourceName": "episode_time_id",
        "displayName": "Episode Time ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": false,
        "type": "string"
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
        "multiple": false
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
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
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId",
    "resource": "Episode",
    "operation": "Delete Episode Resource (via Episode)",
    "description": "DELETE /episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/episode_resources/{episode_resource_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeResourceId",
        "sourceName": "episode_resource_id",
        "displayName": "Episode Resource ID",
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
    "id": "deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId",
    "resource": "Episode",
    "operation": "Delete Episode Time (via Episode)",
    "description": "DELETE /episodes/{episode_id}/episode_times/{episode_time_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/episode_times/{episode_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "episodeTimeId",
        "sourceName": "episode_time_id",
        "displayName": "Episode Time ID",
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
    "id": "deleteEpisodesEpisodeId",
    "resource": "Episode",
    "operation": "Delete Episode",
    "description": "DELETE /episodes/{episode_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
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
    "id": "deleteEpisodesEpisodeIdSeriesSeriesId",
    "resource": "Episode",
    "operation": "Delete Series (via Episode)",
    "description": "DELETE /episodes/{episode_id}/series/{series_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "id": "deleteEpisodesEpisodeIdSpeakershipsSpeakershipId",
    "resource": "Episode",
    "operation": "Delete Speakership (via Episode)",
    "description": "DELETE /episodes/{episode_id}/speakerships/{speakership_id}",
    "method": "DELETE",
    "path": "/publishing/v2/episodes/{episode_id}/speakerships/{speakership_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "episodeId",
        "sourceName": "episode_id",
        "displayName": "Episode ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "speakershipId",
        "sourceName": "speakership_id",
        "displayName": "Speakership ID",
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
    "id": "getSeriesSeriesIdChannel",
    "resource": "Series",
    "operation": "List Channel (via Series)",
    "description": "GET /series/{series_id}/channel",
    "method": "GET",
    "path": "/publishing/v2/series/{series_id}/channel",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "queryOptions": [
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
    "id": "getSeries",
    "resource": "Series",
    "operation": "List Series",
    "description": "GET /series",
    "method": "GET",
    "path": "/publishing/v2/series",
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
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "whereid",
        "displayName": "ID",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
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
    "id": "getSeriesSeriesIdChannelChannelId",
    "resource": "Series",
    "operation": "Get Channel (via Series)",
    "description": "GET /series/{series_id}/channel/{channel_id}",
    "method": "GET",
    "path": "/publishing/v2/series/{series_id}/channel/{channel_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "getSeriesSeriesId",
    "resource": "Series",
    "operation": "Get Series",
    "description": "GET /series/{series_id}",
    "method": "GET",
    "path": "/publishing/v2/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "id": "postSeriesSeriesIdChannel",
    "resource": "Series",
    "operation": "Create Channel (via Series)",
    "description": "POST /series/{series_id}/channel",
    "method": "POST",
    "path": "/publishing/v2/series/{series_id}/channel",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "channelId",
        "sourceName": "channel_id",
        "displayName": "Channel ID",
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
    "id": "deleteSeriesSeriesId",
    "resource": "Series",
    "operation": "Delete Series",
    "description": "DELETE /series/{series_id}",
    "method": "DELETE",
    "path": "/publishing/v2/series/{series_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "seriesId",
        "sourceName": "series_id",
        "displayName": "Series ID",
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
    "id": "getSpeakers",
    "resource": "Speaker",
    "operation": "List Speakers",
    "description": "GET /speakers",
    "method": "GET",
    "path": "/publishing/v2/speakers",
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
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
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
    "pathParameters": [
      {
        "name": "speakerId",
        "sourceName": "speaker_id",
        "displayName": "Speaker ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  }
];

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Channel\",\"value\":\"Channel\"},{\"name\":\"Episode\",\"value\":\"Episode\"},{\"name\":\"Series\",\"value\":\"Series\"},{\"name\":\"Speaker\",\"value\":\"Speaker\"}],\n      default: \"Channel\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"]}},\n      options: [{\"name\":\"List Channel Default Episode Resources (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultEpisodeResources\",\"description\":\"GET /channels/{channel_id}/channel_default_episode_resources\",\"action\":\"List Channel Default Episode Resources (via Channel)\"},{\"name\":\"List Channel Default Times (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultTimes\",\"description\":\"GET /channels/{channel_id}/channel_default_times\",\"action\":\"List Channel Default Times (via Channel)\"},{\"name\":\"List Channels\",\"value\":\"getChannels\",\"description\":\"GET /channels\",\"action\":\"List Channels\"},{\"name\":\"List Current Episode (via Channel)\",\"value\":\"getChannelsChannelIdCurrentEpisode\",\"description\":\"GET /channels/{channel_id}/current_episode\",\"action\":\"List Current Episode (via Channel)\"},{\"name\":\"List Episodes (via Channel)\",\"value\":\"getChannelsChannelIdEpisodes\",\"description\":\"GET /channels/{channel_id}/episodes\",\"action\":\"List Episodes (via Channel)\"},{\"name\":\"List Next Times (via Channel)\",\"value\":\"getChannelsChannelIdNextTimes\",\"description\":\"GET /channels/{channel_id}/next_times\",\"action\":\"List Next Times (via Channel)\"},{\"name\":\"List Series (via Channel)\",\"value\":\"getChannelsChannelIdSeries\",\"description\":\"GET /channels/{channel_id}/series\",\"action\":\"List Series (via Channel)\"},{\"name\":\"List Statistics (via Channel)\",\"value\":\"getChannelsChannelIdStatistics\",\"description\":\"GET /channels/{channel_id}/statistics\",\"action\":\"List Statistics (via Channel)\"},{\"name\":\"Get Channel Default Episode Resource (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\",\"description\":\"GET /channels/{channel_id}/channel_default_episode_resources/{channel_default_episode_resource_id}\",\"action\":\"Get Channel Default Episode Resource (via Channel)\"},{\"name\":\"Get Channel Default Time (via Channel)\",\"value\":\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\",\"description\":\"GET /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"action\":\"Get Channel Default Time (via Channel)\"},{\"name\":\"Get Channel\",\"value\":\"getChannelsChannelId\",\"description\":\"GET /channels/{channel_id}\",\"action\":\"Get Channel\"},{\"name\":\"Get Current Episode (via Channel)\",\"value\":\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\",\"description\":\"GET /channels/{channel_id}/current_episode/{current_episode_id}\",\"action\":\"Get Current Episode (via Channel)\"},{\"name\":\"Get Episode (via Channel)\",\"value\":\"getChannelsChannelIdEpisodesEpisodeId\",\"description\":\"GET /channels/{channel_id}/episodes/{episode_id}\",\"action\":\"Get Episode (via Channel)\"},{\"name\":\"Get Next Time (via Channel)\",\"value\":\"getChannelsChannelIdNextTimesNextTimeId\",\"description\":\"GET /channels/{channel_id}/next_times/{next_time_id}\",\"action\":\"Get Next Time (via Channel)\"},{\"name\":\"Get Series (via Channel)\",\"value\":\"getChannelsChannelIdSeriesSeriesId\",\"description\":\"GET /channels/{channel_id}/series/{series_id}\",\"action\":\"Get Series (via Channel)\"},{\"name\":\"Get Statistic (via Channel)\",\"value\":\"getChannelsChannelIdStatisticsStatisticId\",\"description\":\"GET /channels/{channel_id}/statistics/{statistic_id}\",\"action\":\"Get Statistic (via Channel)\"},{\"name\":\"Create Channel Default Time (via Channel)\",\"value\":\"postChannelsChannelIdChannelDefaultTimes\",\"description\":\"POST /channels/{channel_id}/channel_default_times\",\"action\":\"Create Channel Default Time (via Channel)\"},{\"name\":\"Create Channel\",\"value\":\"postChannels\",\"description\":\"POST /channels\",\"action\":\"Create Channel\"},{\"name\":\"Create Current Episode (via Channel)\",\"value\":\"postChannelsChannelIdCurrentEpisode\",\"description\":\"POST /channels/{channel_id}/current_episode\",\"action\":\"Create Current Episode (via Channel)\"},{\"name\":\"Create Episode (via Channel)\",\"value\":\"postChannelsChannelIdEpisodes\",\"description\":\"POST /channels/{channel_id}/episodes\",\"action\":\"Create Episode (via Channel)\"},{\"name\":\"Create Series (via Channel)\",\"value\":\"postChannelsChannelIdSeries\",\"description\":\"POST /channels/{channel_id}/series\",\"action\":\"Create Series (via Channel)\"},{\"name\":\"Update Channel Default Time (via Channel)\",\"value\":\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\",\"description\":\"PATCH /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"action\":\"Update Channel Default Time (via Channel)\"},{\"name\":\"Update Channel\",\"value\":\"patchChannelsChannelId\",\"description\":\"PATCH /channels/{channel_id}\",\"action\":\"Update Channel\"},{\"name\":\"Update Current Episode (via Channel)\",\"value\":\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\",\"description\":\"PATCH /channels/{channel_id}/current_episode/{current_episode_id}\",\"action\":\"Update Current Episode (via Channel)\"},{\"name\":\"Update Episode (via Channel)\",\"value\":\"patchChannelsChannelIdEpisodesEpisodeId\",\"description\":\"PATCH /channels/{channel_id}/episodes/{episode_id}\",\"action\":\"Update Episode (via Channel)\"},{\"name\":\"Update Series (via Channel)\",\"value\":\"patchChannelsChannelIdSeriesSeriesId\",\"description\":\"PATCH /channels/{channel_id}/series/{series_id}\",\"action\":\"Update Series (via Channel)\"},{\"name\":\"Delete Channel Default Time (via Channel)\",\"value\":\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\",\"description\":\"DELETE /channels/{channel_id}/channel_default_times/{channel_default_time_id}\",\"action\":\"Delete Channel Default Time (via Channel)\"},{\"name\":\"Delete Channel\",\"value\":\"deleteChannelsChannelId\",\"description\":\"DELETE /channels/{channel_id}\",\"action\":\"Delete Channel\"},{\"name\":\"Delete Current Episode (via Channel)\",\"value\":\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\",\"description\":\"DELETE /channels/{channel_id}/current_episode/{current_episode_id}\",\"action\":\"Delete Current Episode (via Channel)\"},{\"name\":\"Delete Episode (via Channel)\",\"value\":\"deleteChannelsChannelIdEpisodesEpisodeId\",\"description\":\"DELETE /channels/{channel_id}/episodes/{episode_id}\",\"action\":\"Delete Episode (via Channel)\"},{\"name\":\"Delete Series (via Channel)\",\"value\":\"deleteChannelsChannelIdSeriesSeriesId\",\"description\":\"DELETE /channels/{channel_id}/series/{series_id}\",\"action\":\"Delete Series (via Channel)\"}],\n      default: \"getChannelsChannelIdChannelDefaultEpisodeResources\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"]}},\n      options: [{\"name\":\"List Channel (via Episode)\",\"value\":\"getEpisodesEpisodeIdChannel\",\"description\":\"GET /episodes/{episode_id}/channel\",\"action\":\"List Channel (via Episode)\"},{\"name\":\"List Episode Resources (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeResources\",\"description\":\"GET /episodes/{episode_id}/episode_resources\",\"action\":\"List Episode Resources (via Episode)\"},{\"name\":\"List Episode Times (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeTimes\",\"description\":\"GET /episodes/{episode_id}/episode_times\",\"action\":\"List Episode Times (via Episode)\"},{\"name\":\"List Episodes\",\"value\":\"getEpisodes\",\"description\":\"GET /episodes\",\"action\":\"List Episodes\"},{\"name\":\"List Series (via Episode)\",\"value\":\"getEpisodesEpisodeIdSeries\",\"description\":\"GET /episodes/{episode_id}/series\",\"action\":\"List Series (via Episode)\"},{\"name\":\"List Speaker (via Speakership)\",\"value\":\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\",\"description\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker\",\"action\":\"List Speaker (via Speakership)\"},{\"name\":\"List Speakerships (via Episode)\",\"value\":\"getEpisodesEpisodeIdSpeakerships\",\"description\":\"GET /episodes/{episode_id}/speakerships\",\"action\":\"List Speakerships (via Episode)\"},{\"name\":\"Get Channel (via Episode)\",\"value\":\"getEpisodesEpisodeIdChannelChannelId\",\"description\":\"GET /episodes/{episode_id}/channel/{channel_id}\",\"action\":\"Get Channel (via Episode)\"},{\"name\":\"Get Episode Resource (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\",\"description\":\"GET /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"action\":\"Get Episode Resource (via Episode)\"},{\"name\":\"Get Episode Time (via Episode)\",\"value\":\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\",\"description\":\"GET /episodes/{episode_id}/episode_times/{episode_time_id}\",\"action\":\"Get Episode Time (via Episode)\"},{\"name\":\"Get Episode\",\"value\":\"getEpisodesEpisodeId\",\"description\":\"GET /episodes/{episode_id}\",\"action\":\"Get Episode\"},{\"name\":\"Get Note Template (via Episode)\",\"value\":\"getEpisodesEpisodeIdNoteTemplate\",\"description\":\"GET /episodes/{episode_id}/note_template\",\"action\":\"Get Note Template (via Episode)\"},{\"name\":\"Get Series (via Episode)\",\"value\":\"getEpisodesEpisodeIdSeriesSeriesId\",\"description\":\"GET /episodes/{episode_id}/series/{series_id}\",\"action\":\"Get Series (via Episode)\"},{\"name\":\"Get Speaker (via Speakership)\",\"value\":\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\",\"description\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}/speaker/{speaker_id}\",\"action\":\"Get Speaker (via Speakership)\"},{\"name\":\"Get Speakership (via Episode)\",\"value\":\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\",\"description\":\"GET /episodes/{episode_id}/speakerships/{speakership_id}\",\"action\":\"Get Speakership (via Episode)\"},{\"name\":\"Create Channel (via Episode)\",\"value\":\"postEpisodesEpisodeIdChannel\",\"description\":\"POST /episodes/{episode_id}/channel\",\"action\":\"Create Channel (via Episode)\"},{\"name\":\"Create Episode Resource (via Episode)\",\"value\":\"postEpisodesEpisodeIdEpisodeResources\",\"description\":\"POST /episodes/{episode_id}/episode_resources\",\"action\":\"Create Episode Resource (via Episode)\"},{\"name\":\"Create Episode Time (via Episode)\",\"value\":\"postEpisodesEpisodeIdEpisodeTimes\",\"description\":\"POST /episodes/{episode_id}/episode_times\",\"action\":\"Create Episode Time (via Episode)\"},{\"name\":\"Create Episode\",\"value\":\"postEpisodes\",\"description\":\"POST /episodes\",\"action\":\"Create Episode\"},{\"name\":\"Create Generate Download Url (via Episode)\",\"value\":\"postEpisodesEpisodeIdGenerateDownloadUrl\",\"description\":\"POST /episodes/{episode_id}/generate_download_url\",\"action\":\"Create Generate Download Url (via Episode)\"},{\"name\":\"Create Series (via Episode)\",\"value\":\"postEpisodesEpisodeIdSeries\",\"description\":\"POST /episodes/{episode_id}/series\",\"action\":\"Create Series (via Episode)\"},{\"name\":\"Update Channel (via Episode)\",\"value\":\"patchEpisodesEpisodeIdChannelChannelId\",\"description\":\"PATCH /episodes/{episode_id}/channel/{channel_id}\",\"action\":\"Update Channel (via Episode)\"},{\"name\":\"Update Episode Resource (via Episode)\",\"value\":\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\",\"description\":\"PATCH /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"action\":\"Update Episode Resource (via Episode)\"},{\"name\":\"Update Episode Time (via Episode)\",\"value\":\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\",\"description\":\"PATCH /episodes/{episode_id}/episode_times/{episode_time_id}\",\"action\":\"Update Episode Time (via Episode)\"},{\"name\":\"Update Episode\",\"value\":\"patchEpisodesEpisodeId\",\"description\":\"PATCH /episodes/{episode_id}\",\"action\":\"Update Episode\"},{\"name\":\"Update Note Template (via Episode)\",\"value\":\"patchEpisodesEpisodeIdNoteTemplate\",\"description\":\"PATCH /episodes/{episode_id}/note_template\",\"action\":\"Update Note Template (via Episode)\"},{\"name\":\"Update Series (via Episode)\",\"value\":\"patchEpisodesEpisodeIdSeriesSeriesId\",\"description\":\"PATCH /episodes/{episode_id}/series/{series_id}\",\"action\":\"Update Series (via Episode)\"},{\"name\":\"Update Speakership (via Episode)\",\"value\":\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\",\"description\":\"PATCH /episodes/{episode_id}/speakerships/{speakership_id}\",\"action\":\"Update Speakership (via Episode)\"},{\"name\":\"Delete Channel (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdChannelChannelId\",\"description\":\"DELETE /episodes/{episode_id}/channel/{channel_id}\",\"action\":\"Delete Channel (via Episode)\"},{\"name\":\"Delete Episode Resource (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\",\"description\":\"DELETE /episodes/{episode_id}/episode_resources/{episode_resource_id}\",\"action\":\"Delete Episode Resource (via Episode)\"},{\"name\":\"Delete Episode Time (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\",\"description\":\"DELETE /episodes/{episode_id}/episode_times/{episode_time_id}\",\"action\":\"Delete Episode Time (via Episode)\"},{\"name\":\"Delete Episode\",\"value\":\"deleteEpisodesEpisodeId\",\"description\":\"DELETE /episodes/{episode_id}\",\"action\":\"Delete Episode\"},{\"name\":\"Delete Series (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdSeriesSeriesId\",\"description\":\"DELETE /episodes/{episode_id}/series/{series_id}\",\"action\":\"Delete Series (via Episode)\"},{\"name\":\"Delete Speakership (via Episode)\",\"value\":\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\",\"description\":\"DELETE /episodes/{episode_id}/speakerships/{speakership_id}\",\"action\":\"Delete Speakership (via Episode)\"}],\n      default: \"getEpisodesEpisodeIdChannel\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"]}},\n      options: [{\"name\":\"List Channel (via Series)\",\"value\":\"getSeriesSeriesIdChannel\",\"description\":\"GET /series/{series_id}/channel\",\"action\":\"List Channel (via Series)\"},{\"name\":\"List Series\",\"value\":\"getSeries\",\"description\":\"GET /series\",\"action\":\"List Series\"},{\"name\":\"Get Channel (via Series)\",\"value\":\"getSeriesSeriesIdChannelChannelId\",\"description\":\"GET /series/{series_id}/channel/{channel_id}\",\"action\":\"Get Channel (via Series)\"},{\"name\":\"Get Series\",\"value\":\"getSeriesSeriesId\",\"description\":\"GET /series/{series_id}\",\"action\":\"Get Series\"},{\"name\":\"Create Channel (via Series)\",\"value\":\"postSeriesSeriesIdChannel\",\"description\":\"POST /series/{series_id}/channel\",\"action\":\"Create Channel (via Series)\"},{\"name\":\"Create Series\",\"value\":\"postSeries\",\"description\":\"POST /series\",\"action\":\"Create Series\"},{\"name\":\"Update Channel (via Series)\",\"value\":\"patchSeriesSeriesIdChannelChannelId\",\"description\":\"PATCH /series/{series_id}/channel/{channel_id}\",\"action\":\"Update Channel (via Series)\"},{\"name\":\"Update Series\",\"value\":\"patchSeriesSeriesId\",\"description\":\"PATCH /series/{series_id}\",\"action\":\"Update Series\"},{\"name\":\"Delete Channel (via Series)\",\"value\":\"deleteSeriesSeriesIdChannelChannelId\",\"description\":\"DELETE /series/{series_id}/channel/{channel_id}\",\"action\":\"Delete Channel (via Series)\"},{\"name\":\"Delete Series\",\"value\":\"deleteSeriesSeriesId\",\"description\":\"DELETE /series/{series_id}\",\"action\":\"Delete Series\"}],\n      default: \"getSeriesSeriesIdChannel\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"]}},\n      options: [{\"name\":\"List Speakers\",\"value\":\"getSpeakers\",\"description\":\"GET /speakers\",\"action\":\"List Speakers\"},{\"name\":\"Get Speaker\",\"value\":\"getSpeakersSpeakerId\",\"description\":\"GET /speakers/{speaker_id}\",\"action\":\"Get Speaker\"}],\n      default: \"getSpeakers\",\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResources_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"],\"getChannelsChannelIdChannelDefaultEpisodeResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultTimes_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelIdChannelDefaultTimes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdChannelDefaultTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdChannelDefaultTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"],\"getChannelsChannelIdChannelDefaultTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannels_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Archived\",\"value\":\"archived\"},{\"name\":\"Not Archived\",\"value\":\"not_archived\"},{\"name\":\"Published\",\"value\":\"published\"},{\"name\":\"Podcast Enabled\",\"value\":\"podcast_enabled\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannels_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannels_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"],\"getChannels_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdCurrentEpisode_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelIdCurrentEpisode_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\"displayName\":\"Series ID\",\"name\":\"whereseriesid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Stream Type Ascending\",\"value\":\"stream_type\"},{\"name\":\"Stream Type Descending\",\"value\":\"-stream_type\"},{\"name\":\"Published Live At Ascending\",\"value\":\"published_live_at\"},{\"name\":\"Published Live At Descending\",\"value\":\"-published_live_at\"},{\"name\":\"Published To Library At Ascending\",\"value\":\"published_to_library_at\"},{\"name\":\"Published To Library At Descending\",\"value\":\"-published_to_library_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdCurrentEpisode_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdCurrentEpisode_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"],\"getChannelsChannelIdCurrentEpisode_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdEpisodes_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelIdEpisodes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Published\",\"value\":\"published\"},{\"name\":\"Not Published\",\"value\":\"not_published\"},{\"name\":\"Published To Library\",\"value\":\"published_to_library\"},{\"name\":\"Connected To Services\",\"value\":\"connected_to_services\"},{\"name\":\"Not Connected To Services\",\"value\":\"not_connected_to_services\"}],\"default\":\"\"}]},{\"displayName\":\"Series ID\",\"name\":\"whereseriesid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Stream Type Ascending\",\"value\":\"stream_type\"},{\"name\":\"Stream Type Descending\",\"value\":\"-stream_type\"},{\"name\":\"Published Live At Ascending\",\"value\":\"published_live_at\"},{\"name\":\"Published Live At Descending\",\"value\":\"-published_live_at\"},{\"name\":\"Published To Library At Ascending\",\"value\":\"published_to_library_at\"},{\"name\":\"Published To Library At Descending\",\"value\":\"-published_to_library_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdEpisodes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdEpisodes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"],\"getChannelsChannelIdEpisodes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdNextTimes_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdNextTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdNextTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"],\"getChannelsChannelIdNextTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdSeries_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelIdSeries_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Episodes Count Ascending\",\"value\":\"episodes_count\"},{\"name\":\"Episodes Count Descending\",\"value\":\"-episodes_count\"},{\"name\":\"Started At Ascending\",\"value\":\"started_at\"},{\"name\":\"Started At Descending\",\"value\":\"-started_at\"},{\"name\":\"Ended At Ascending\",\"value\":\"ended_at\"},{\"name\":\"Ended At Descending\",\"value\":\"-ended_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdSeries_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdSeries_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"],\"getChannelsChannelIdSeries_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdStatistics_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getChannelsChannelIdStatistics_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getChannelsChannelIdStatistics_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"],\"getChannelsChannelIdStatistics_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatistics\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Channel Default Episode Resource ID\",\n      name: \"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId_channelDefaultEpisodeResourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultEpisodeResourcesChannelDefaultEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Channel Default Time ID\",\n      name: \"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelDefaultTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Current Episode ID\",\n      name: \"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId_currentEpisodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getChannelsChannelIdEpisodesEpisodeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelIdEpisodesEpisodeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdNextTimesNextTimeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimesNextTimeId\"]}},\n    },\n    {\n      displayName: \"Next Time ID\",\n      name: \"getChannelsChannelIdNextTimesNextTimeId_nextTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimesNextTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdNextTimesNextTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdSeriesSeriesId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getChannelsChannelIdSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getChannelsChannelIdSeriesSeriesId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getChannelsChannelIdStatisticsStatisticId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatisticsStatisticId\"]}},\n    },\n    {\n      displayName: \"Statistic ID\",\n      name: \"getChannelsChannelIdStatisticsStatisticId_statisticId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatisticsStatisticId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"getChannelsChannelIdStatisticsStatisticId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"]}},\n    },\n    {\n      displayName: \"Attribute: Day Of Week\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_dayOfWeek\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Hour\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_hour\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Minute\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_minute\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Frequency\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_frequency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"postChannelsChannelIdChannelDefaultTimes_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdChannelDefaultTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"postChannels_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannels_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"postChannels_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"postChannels_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"postChannels_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"postChannels_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannels_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postChannels_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"postChannels_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"postChannels_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"postChannels_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"postChannels_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"postChannels_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"postChannels_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"postChannels_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"postChannels_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postChannels_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"postChannels_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postChannels_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"postChannels_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannels\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postChannelsChannelIdCurrentEpisode_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannelsChannelIdCurrentEpisode_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_channelId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_seriesId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postChannelsChannelIdCurrentEpisode_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannelsChannelIdCurrentEpisode_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"postChannelsChannelIdCurrentEpisode_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"postChannelsChannelIdCurrentEpisode_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postChannelsChannelIdCurrentEpisode_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"postChannelsChannelIdCurrentEpisode_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"postChannelsChannelIdCurrentEpisode_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"postChannelsChannelIdCurrentEpisode_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"postChannelsChannelIdCurrentEpisode_seriesIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdCurrentEpisode\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdEpisodes_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postChannelsChannelIdEpisodes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannelsChannelIdEpisodes_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"postChannelsChannelIdEpisodes_channelId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"postChannelsChannelIdEpisodes_seriesId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postChannelsChannelIdEpisodes_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannelsChannelIdEpisodes_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"postChannelsChannelIdEpisodes_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"postChannelsChannelIdEpisodes_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postChannelsChannelIdEpisodes_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"postChannelsChannelIdEpisodes_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"postChannelsChannelIdEpisodes_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"postChannelsChannelIdEpisodes_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"postChannelsChannelIdEpisodes_seriesIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"postChannelsChannelIdSeries_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postChannelsChannelIdSeries_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postChannelsChannelIdSeries_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postChannelsChannelIdSeries_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postChannelsChannelIdSeries_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postChannelsChannelIdSeries_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"postChannelsChannelIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Channel Default Time ID\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelDefaultTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Day Of Week\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_dayOfWeek\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Hour\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_hour\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Minute\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_minute\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Frequency\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_frequency\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchChannelsChannelId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"patchChannelsChannelId_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"patchChannelsChannelId_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"patchChannelsChannelId_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"patchChannelsChannelId_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchChannelsChannelId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"patchChannelsChannelId_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"patchChannelsChannelId_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"patchChannelsChannelId_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"patchChannelsChannelId_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"patchChannelsChannelId_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"patchChannelsChannelId_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"patchChannelsChannelId_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchChannelsChannelId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchChannelsChannelId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"patchChannelsChannelId_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchChannelsChannelId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"patchChannelsChannelId_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Current Episode ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_currentEpisodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId_seriesIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"patchChannelsChannelIdEpisodesEpisodeId_seriesIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchChannelsChannelIdSeriesSeriesId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchChannelsChannelIdSeriesSeriesId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"patchChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: \"Channel Default Time ID\",\n      name: \"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId_channelDefaultTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdChannelDefaultTimesChannelDefaultTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: \"Current Episode ID\",\n      name: \"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId_currentEpisodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdCurrentEpisodeCurrentEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdEpisodesEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteChannelsChannelIdEpisodesEpisodeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteChannelsChannelIdSeriesSeriesId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteChannelsChannelIdSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Channel\"],\"operation\":[\"deleteChannelsChannelIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdChannel_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdChannel_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdChannel_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdChannel_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"],\"getEpisodesEpisodeIdChannel_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeResources_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdEpisodeResources_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdEpisodeResources_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdEpisodeResources_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"],\"getEpisodesEpisodeIdEpisodeResources_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeTimes_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdEpisodeTimes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Starts At Ascending\",\"value\":\"starts_at\"},{\"name\":\"Starts At Descending\",\"value\":\"-starts_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdEpisodeTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdEpisodeTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"],\"getEpisodesEpisodeIdEpisodeTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Published Live\",\"value\":\"published_live\"},{\"name\":\"Not Published Live\",\"value\":\"not_published_live\"},{\"name\":\"Connected To Services\",\"value\":\"connected_to_services\"},{\"name\":\"Not Connected To Services\",\"value\":\"not_connected_to_services\"},{\"name\":\"Published On Church Center\",\"value\":\"published_on_church_center\"}],\"default\":\"\"}]},{\"displayName\":\"Series ID\",\"name\":\"whereseriesid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Stream Type Ascending\",\"value\":\"stream_type\"},{\"name\":\"Stream Type Descending\",\"value\":\"-stream_type\"},{\"name\":\"Published Live At Ascending\",\"value\":\"published_live_at\"},{\"name\":\"Published Live At Descending\",\"value\":\"-published_live_at\"},{\"name\":\"Published To Library At Ascending\",\"value\":\"published_to_library_at\"},{\"name\":\"Published To Library At Descending\",\"value\":\"-published_to_library_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"],\"getEpisodes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSeries_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdSeries_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Episodes Count Ascending\",\"value\":\"episodes_count\"},{\"name\":\"Episodes Count Descending\",\"value\":\"-episodes_count\"},{\"name\":\"Started At Ascending\",\"value\":\"started_at\"},{\"name\":\"Started At Descending\",\"value\":\"-started_at\"},{\"name\":\"Ended At Ascending\",\"value\":\"ended_at\"},{\"name\":\"Ended At Descending\",\"value\":\"-ended_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdSeries_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdSeries_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"],\"getEpisodesEpisodeIdSeries_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_speakershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"],\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeaker\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakerships_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdSpeakerships_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Speaker\",\"value\":\"speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getEpisodesEpisodeIdSpeakerships_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getEpisodesEpisodeIdSpeakerships_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"],\"getEpisodesEpisodeIdSpeakerships_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakerships\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdChannelChannelId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getEpisodesEpisodeIdChannelChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdChannelChannelId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Episode Resource ID\",\n      name: \"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeResourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Episode Time ID\",\n      name: \"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdNoteTemplate_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdNoteTemplate\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdNoteTemplate\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSeriesSeriesId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getEpisodesEpisodeIdSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdSeriesSeriesId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_speakershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n    },\n    {\n      displayName: \"Speaker ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId_speakerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipIdSpeakerSpeakerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipId_speakershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getEpisodesEpisodeIdSpeakershipsSpeakershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Speaker\",\"value\":\"speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"getEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdChannel_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postEpisodesEpisodeIdChannel_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postEpisodesEpisodeIdChannel_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"postEpisodesEpisodeIdChannel_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"postEpisodesEpisodeIdChannel_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"postEpisodesEpisodeIdChannel_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"postEpisodesEpisodeIdChannel_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postEpisodesEpisodeIdChannel_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postEpisodesEpisodeIdChannel_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"postEpisodesEpisodeIdChannel_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"postEpisodesEpisodeIdChannel_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"postEpisodesEpisodeIdChannel_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"postEpisodesEpisodeIdChannel_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"postEpisodesEpisodeIdChannel_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"postEpisodesEpisodeIdChannel_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"postEpisodesEpisodeIdChannel_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"postEpisodesEpisodeIdChannel_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postEpisodesEpisodeIdChannel_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"postEpisodesEpisodeIdChannel_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postEpisodesEpisodeIdChannel_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"postEpisodesEpisodeIdChannel_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Featured\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_featured\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Icon\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_icon\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Type\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_type\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postEpisodesEpisodeIdEpisodeResources_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeResources\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"]}},\n    },\n    {\n      displayName: \"Attribute: Starts At\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_startsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Embed Code\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_videoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"postEpisodesEpisodeIdEpisodeTimes_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdEpisodeTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"postEpisodes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postEpisodes_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"postEpisodes_channelId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"postEpisodes_seriesId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postEpisodes_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postEpisodes_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"postEpisodes_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"postEpisodes_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"postEpisodes_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"postEpisodes_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"postEpisodes_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"postEpisodes_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"postEpisodes_seriesIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdGenerateDownloadUrl_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdGenerateDownloadUrl\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"postEpisodesEpisodeIdSeries_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postEpisodesEpisodeIdSeries_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postEpisodesEpisodeIdSeries_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postEpisodesEpisodeIdSeries_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postEpisodesEpisodeIdSeries_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postEpisodesEpisodeIdSeries_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"postEpisodesEpisodeIdSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchEpisodesEpisodeIdChannelChannelId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"patchEpisodesEpisodeIdChannelChannelId_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Episode Resource ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeResourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Featured\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_featured\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Icon\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_icon\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Type\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_type\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Episode Time ID\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Starts At\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_startsAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Embed Code\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_videoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchEpisodesEpisodeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"},{\"name\":\"Episode Resources\",\"value\":\"episode_resources\"},{\"name\":\"Episode Times\",\"value\":\"episode_times\"},{\"name\":\"Series\",\"value\":\"series\"},{\"name\":\"Series Channel\",\"value\":\"series.channel\"},{\"name\":\"Speakerships\",\"value\":\"speakerships\"},{\"name\":\"Speakerships Speaker\",\"value\":\"speakerships.speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchEpisodesEpisodeId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Channel ID\",\n      name: \"patchEpisodesEpisodeId_channelId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Series ID\",\n      name: \"patchEpisodesEpisodeId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchEpisodesEpisodeId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchEpisodesEpisodeId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Audio\",\n      name: \"patchEpisodesEpisodeId_sermonAudio\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Stream Type\",\n      name: \"patchEpisodesEpisodeId_streamType\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Video Url\",\n      name: \"patchEpisodesEpisodeId_videoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published To Library At\",\n      name: \"patchEpisodesEpisodeId_publishedToLibraryAt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Audio Url\",\n      name: \"patchEpisodesEpisodeId_libraryAudioUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Library Video Url\",\n      name: \"patchEpisodesEpisodeId_libraryVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Relationship: Series ID\",\n      name: \"patchEpisodesEpisodeId_seriesIds\",\n      type: 'string',\n      default: '',\n      description: \"Relationship ID.\",\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"]}},\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"]}},\n    },\n    {\n      displayName: \"Attribute: Enabled\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_enabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Template\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_template\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Auto Create Free Form Notes\",\n      name: \"patchEpisodesEpisodeIdNoteTemplate_autoCreateFreeFormNotes\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdNoteTemplate\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchEpisodesEpisodeIdSeriesSeriesId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_speakershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Speaker\",\"value\":\"speaker\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Attribute: Destroy\",\n      name: \"patchEpisodesEpisodeIdSpeakershipsSpeakershipId_destroy\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"patchEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdChannelChannelId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteEpisodesEpisodeIdChannelChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: \"Episode Resource ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId_episodeResourceId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeResourcesEpisodeResourceId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: \"Episode Time ID\",\n      name: \"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId_episodeTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdEpisodeTimesEpisodeTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdSeriesSeriesId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteEpisodesEpisodeIdSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Episode ID\",\n      name: \"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId_episodeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: \"Speakership ID\",\n      name: \"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId_speakershipId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Episode\"],\"operation\":[\"deleteEpisodesEpisodeIdSpeakershipsSpeakershipId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getSeriesSeriesIdChannel_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSeriesSeriesIdChannel_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Name Ascending\",\"value\":\"name\"},{\"name\":\"Name Descending\",\"value\":\"-name\"},{\"name\":\"Position Ascending\",\"value\":\"position\"},{\"name\":\"Position Descending\",\"value\":\"-position\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSeriesSeriesIdChannel_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSeriesSeriesIdChannel_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"],\"getSeriesSeriesIdChannel_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getSeries_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Published\",\"value\":\"published\"},{\"name\":\"Not Published\",\"value\":\"not_published\"},{\"name\":\"Published On Church Center\",\"value\":\"published_on_church_center\"}],\"default\":\"\"}]},{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Title Ascending\",\"value\":\"title\"},{\"name\":\"Title Descending\",\"value\":\"-title\"},{\"name\":\"Episodes Count Ascending\",\"value\":\"episodes_count\"},{\"name\":\"Episodes Count Descending\",\"value\":\"-episodes_count\"},{\"name\":\"Started At Ascending\",\"value\":\"started_at\"},{\"name\":\"Started At Descending\",\"value\":\"-started_at\"},{\"name\":\"Ended At Ascending\",\"value\":\"ended_at\"},{\"name\":\"Ended At Descending\",\"value\":\"-ended_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSeries_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSeries_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"],\"getSeries_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getSeriesSeriesIdChannelChannelId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"getSeriesSeriesIdChannelChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSeriesSeriesIdChannelChannelId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"getSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSeriesSeriesId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"getSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"postSeriesSeriesIdChannel_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"postSeriesSeriesIdChannel_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postSeriesSeriesIdChannel_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"postSeriesSeriesIdChannel_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"postSeriesSeriesIdChannel_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"postSeriesSeriesIdChannel_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"postSeriesSeriesIdChannel_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postSeriesSeriesIdChannel_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"postSeriesSeriesIdChannel_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"postSeriesSeriesIdChannel_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"postSeriesSeriesIdChannel_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"postSeriesSeriesIdChannel_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"postSeriesSeriesIdChannel_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"postSeriesSeriesIdChannel_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"postSeriesSeriesIdChannel_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"postSeriesSeriesIdChannel_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"postSeriesSeriesIdChannel_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"postSeriesSeriesIdChannel_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"postSeriesSeriesIdChannel_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postSeriesSeriesIdChannel_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"postSeriesSeriesIdChannel_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeriesSeriesIdChannel\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"postSeries_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"postSeries_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"postSeries_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"postSeries_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"postSeries_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"postSeries\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchSeriesSeriesIdChannelChannelId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"patchSeriesSeriesIdChannelChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchSeriesSeriesIdChannelChannelId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel Default Episode Resources\",\"value\":\"channel_default_episode_resources\"},{\"name\":\"Channel Default Times\",\"value\":\"channel_default_times\"},{\"name\":\"Current Episode\",\"value\":\"current_episode\"},{\"name\":\"Current Episode Channel\",\"value\":\"current_episode.channel\"},{\"name\":\"Current Episode Episode Resources\",\"value\":\"current_episode.episode_resources\"},{\"name\":\"Current Episode Episode Times\",\"value\":\"current_episode.episode_times\"},{\"name\":\"Current Episode Series\",\"value\":\"current_episode.series\"},{\"name\":\"Current Episode Speakerships\",\"value\":\"current_episode.speakerships\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchSeriesSeriesIdChannelChannelId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Art\",\n      name: \"patchSeriesSeriesIdChannelChannelId_podcastArt\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Podcast Settings\",\n      name: \"patchSeriesSeriesIdChannelChannelId_podcastSettings\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Activate Episode Minutes Before\",\n      name: \"patchSeriesSeriesIdChannelChannelId_activateEpisodeMinutesBefore\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Embed Code\",\n      name: \"patchSeriesSeriesIdChannelChannelId_defaultVideoEmbedCode\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchSeriesSeriesIdChannelChannelId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Url\",\n      name: \"patchSeriesSeriesIdChannelChannelId_url\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Duration\",\n      name: \"patchSeriesSeriesIdChannelChannelId_defaultVideoDuration\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Default Video Url\",\n      name: \"patchSeriesSeriesIdChannelChannelId_defaultVideoUrl\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Audio\",\n      name: \"patchSeriesSeriesIdChannelChannelId_enableAudio\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable On Demand Video\",\n      name: \"patchSeriesSeriesIdChannelChannelId_enableOnDemandVideo\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Enable Watch Live\",\n      name: \"patchSeriesSeriesIdChannelChannelId_enableWatchLive\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: General Chat Enabled\",\n      name: \"patchSeriesSeriesIdChannelChannelId_generalChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Group Chat Enabled\",\n      name: \"patchSeriesSeriesIdChannelChannelId_groupChatEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Name\",\n      name: \"patchSeriesSeriesIdChannelChannelId_name\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Position\",\n      name: \"patchSeriesSeriesIdChannelChannelId_position\",\n      type: \"number\",\n      default: undefined,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Archived\",\n      name: \"patchSeriesSeriesIdChannelChannelId_archived\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchSeriesSeriesIdChannelChannelId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Sermon Notes Enabled\",\n      name: \"patchSeriesSeriesIdChannelChannelId_sermonNotesEnabled\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"patchSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"patchSeriesSeriesId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Channel\",\"value\":\"channel\"},{\"name\":\"Channel Channel Default Episode Resources\",\"value\":\"channel.channel_default_episode_resources\"},{\"name\":\"Channel Channel Default Times\",\"value\":\"channel.channel_default_times\"},{\"name\":\"Channel Current Episode\",\"value\":\"channel.current_episode\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Body Mode',\n      name: 'bodyMode',\n      type: 'options',\n      options: [{\"name\":\"Fields\",\"value\":\"fields\"},{\"name\":\"Raw JSON\",\"value\":\"rawJson\"}],\n      default: 'fields',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n    },\n    {\n      displayName: \"Attribute: Art\",\n      name: \"patchSeriesSeriesId_art\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Description\",\n      name: \"patchSeriesSeriesId_description\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Published\",\n      name: \"patchSeriesSeriesId_published\",\n      type: \"boolean\",\n      default: false,\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: \"Attribute: Title\",\n      name: \"patchSeriesSeriesId_title\",\n      type: \"string\",\n      default: '',\n      required: false,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"fields\"]}},\n    },\n    {\n      displayName: 'Raw JSON Body',\n      name: 'rawJsonBody',\n      type: 'json',\n      default: '{}',\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"],\"bodyMode\":[\"rawJson\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"patchSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteSeriesSeriesIdChannelChannelId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: \"Channel ID\",\n      name: \"deleteSeriesSeriesIdChannelChannelId_channelId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesIdChannelChannelId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesIdChannelChannelId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Series ID\",\n      name: \"deleteSeriesSeriesId_seriesId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Series\"],\"operation\":[\"deleteSeriesSeriesId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getSpeakers_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"First Name Ascending\",\"value\":\"first_name\"},{\"name\":\"First Name Descending\",\"value\":\"-first_name\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSpeakers_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSpeakers_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"],\"getSpeakers_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakers\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Speaker ID\",\n      name: \"getSpeakersSpeakerId_speakerId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakersSpeakerId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Speaker\"],\"operation\":[\"getSpeakersSpeakerId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

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

export class PlanningCenterPublishing implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Publishing",
    name: "planningCenterPublishing",
    icon: 'file:publishing.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
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
