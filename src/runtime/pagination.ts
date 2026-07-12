import type { IExecuteFunctions } from 'n8n-workflow';

import { normalizeJsonApiResponse, type JsonObject } from './jsonApi';
import { planningCenterApiRequest, type PlanningCenterRequestOptions } from './request';

interface JsonApiLinks {
  next?: string | null;
}

interface JsonApiPage {
  links?: JsonApiLinks;
}

export interface PaginationOptions {
  returnAll: boolean;
  limit: number;
}

function nextPathFromLink(next: string): string {
  try {
    const url = new URL(next);
    return `${url.pathname}${url.search}`;
  } catch {
    return next;
  }
}

export async function collectPaginatedPlanningCenterResults(
  this: IExecuteFunctions,
  request: PlanningCenterRequestOptions,
  options: PaginationOptions,
): Promise<JsonObject[]> {
  const collected: JsonObject[] = [];
  let nextRequest: PlanningCenterRequestOptions | undefined = request;

  while (nextRequest) {
    const response = (await planningCenterApiRequest.call(this, nextRequest)) as JsonApiPage;
    collected.push(...normalizeJsonApiResponse(response));

    if (!options.returnAll) {
      break;
    }

    const next = response.links?.next;
    nextRequest = next
      ? {
          ...request,
          path: nextPathFromLink(next),
          qs: undefined,
        }
      : undefined;
  }

  return options.returnAll ? collected : collected.slice(0, options.limit);
}
