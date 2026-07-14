import type { IExecuteFunctions } from 'n8n-workflow';

import { normalizeJsonApiResponse, type JsonObject } from './jsonApi';
import { planningCenterApiRequest, type PlanningCenterRequestOptions } from './request';

interface JsonApiLinks {
  next?: string | null;
}

interface JsonApiPage {
  links?: JsonApiLinks;
}

const MAX_PAGE_SIZE = 100;

export interface PaginationOptions {
  returnAll: boolean;
  limit: number;
}

function nextPathFromLink(next: string): string {
  try {
    const url = new URL(next, 'https://api.planningcenter.invalid');
    return `${url.pathname}${url.search}`;
  } catch {
    return next;
  }
}

function pathWithPageSize(path: string, pageSize: number): string {
  try {
    const url = new URL(path, 'https://api.planningcenter.invalid');
    url.searchParams.set('per_page', String(pageSize));
    return `${url.pathname}${url.search}`;
  } catch {
    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}per_page=${pageSize}`;
  }
}

function requestWithPageSize(
  request: PlanningCenterRequestOptions,
  pageSize: number,
): PlanningCenterRequestOptions {
  return {
    ...request,
    qs: {
      ...request.qs,
      per_page: pageSize,
    },
  };
}

export async function collectPaginatedPlanningCenterResults(
  this: IExecuteFunctions,
  request: PlanningCenterRequestOptions,
  options: PaginationOptions,
): Promise<JsonObject[]> {
  const collected: JsonObject[] = [];
  const requestedLimit = Number(options.limit);
  const limit = Number.isFinite(requestedLimit) ? Math.max(0, Math.floor(requestedLimit)) : 0;

  if (!options.returnAll && limit === 0) {
    return [];
  }

  let nextRequest: PlanningCenterRequestOptions | undefined = options.returnAll
    ? request
    : requestWithPageSize(request, Math.min(limit, MAX_PAGE_SIZE));

  while (nextRequest) {
    const response = (await planningCenterApiRequest.call(this, nextRequest)) as JsonApiPage;
    collected.push(...normalizeJsonApiResponse(response));

    if (!options.returnAll && collected.length >= limit) {
      break;
    }

    const next = response.links?.next;
    if (!next) {
      nextRequest = undefined;
      continue;
    }

    const path = nextPathFromLink(next);
    nextRequest = {
      ...request,
      path: options.returnAll
        ? path
        : pathWithPageSize(path, Math.min(limit - collected.length, MAX_PAGE_SIZE)),
      qs: undefined,
    };
  }

  return options.returnAll ? collected : collected.slice(0, limit);
}
