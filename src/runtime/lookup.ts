import type {
  IDataObject,
  IExecuteFunctions,
  ILoadOptionsFunctions,
  INodeListSearchResult,
} from 'n8n-workflow';

import { planningCenterApiRequest } from './request';
import { extractResourceLocatorId } from './resourceLocator';

export interface GeneratedLookupParentBinding {
  sourceName: string;
  fieldName: string;
}

export interface GeneratedLookupSplitNameSearch {
  firstNameFilter: string;
  lastNameFilter: string;
}

export interface GeneratedLookup {
  methodName: string;
  sourcePath: string;
  parentBindings: GeneratedLookupParentBinding[];
  searchFilter?: string;
  splitNameSearch?: GeneratedLookupSplitNameSearch;
  labelFields: string[];
  resultLimit: number;
}

function resultName(item: any, lookup: GeneratedLookup): string {
  const id = item?.id === undefined || item?.id === null ? '' : String(item.id);
  const attributes =
    item?.attributes && typeof item.attributes === 'object'
      ? (item.attributes as Record<string, unknown>)
      : {};
  const display = lookup.labelFields
    .map((field) => {
      const values = field.split(' ').map((part) => attributes[part]);
      if (values.some((value) => typeof value !== 'string' || !value.trim())) return '';
      return values.map((value) => String(value).trim()).join(' ');
    })
    .find((value) => value.trim());

  return display ? `${display} (${id})` : id;
}

function lookupPath(context: ILoadOptionsFunctions, lookup: GeneratedLookup): string | undefined {
  let path = lookup.sourcePath;
  for (const binding of lookup.parentBindings) {
    const id = extractResourceLocatorId(context.getNodeParameter(binding.fieldName, ''));
    if (!id) return undefined;
    path = path.replace(`{${binding.sourceName}}`, encodeURIComponent(id));
  }
  return path;
}

async function requestLookup(
  context: ILoadOptionsFunctions,
  path: string,
  qs: IDataObject,
  apiVersion: string,
): Promise<any[]> {
  const response = await planningCenterApiRequest.call(context as unknown as IExecuteFunctions, {
    method: 'GET',
    path,
    qs,
    apiVersion,
  });
  return Array.isArray((response as any)?.data) ? (response as any).data : [];
}

function splitNameRequests(lookup: GeneratedLookup, filter: string): IDataObject[] {
  const terms = filter.trim().split(/\s+/).filter(Boolean);
  const split = lookup.splitNameSearch;
  if (!terms.length || !split) return [];
  return [
    { per_page: lookup.resultLimit, [split.firstNameFilter]: terms[0] },
    { per_page: lookup.resultLimit, [split.lastNameFilter]: terms.at(-1) },
  ];
}

export async function searchPlanningCenterLookup(
  context: ILoadOptionsFunctions,
  lookup: GeneratedLookup,
  apiVersion: string,
  filter?: string,
): Promise<INodeListSearchResult> {
  const path = lookupPath(context, lookup);
  if (!path) return { results: [] };

  const trimmedFilter = filter?.trim() ?? '';
  let requests: IDataObject[] = [{ per_page: lookup.resultLimit }];
  if (trimmedFilter && lookup.searchFilter) {
    requests = [{ per_page: lookup.resultLimit, [lookup.searchFilter]: trimmedFilter }];
  } else if (trimmedFilter && lookup.splitNameSearch) {
    requests = splitNameRequests(lookup, trimmedFilter);
  }

  const dataSets = await Promise.all(
    requests.map((qs) => requestLookup(context, path, qs, apiVersion)),
  );
  const seen = new Set<string>();
  const results: INodeListSearchResult['results'] = [];
  for (const data of dataSets) {
    for (const item of data) {
      const value = item?.id === undefined || item?.id === null ? '' : String(item.id);
      if (!value || seen.has(value)) continue;
      seen.add(value);
      results.push({ name: resultName(item, lookup), value });
      if (results.length >= lookup.resultLimit) return { results };
    }
  }
  return { results };
}
