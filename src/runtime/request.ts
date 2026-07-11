import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, IHttpRequestOptions } from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

export interface PlanningCenterCredentials {
  applicationId: string;
  secret: string;
  baseUrl: string;
}

export interface PlanningCenterRequestOptions {
  method: IHttpRequestMethods;
  path: string;
  qs?: IDataObject;
  body?: any;
  headers?: Record<string, string>;
}

export const MAX_ATTEMPTS = 5;

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}

export function buildBasicAuthHeader(applicationId: string, secret: string): string {
  return `Basic ${Buffer.from(`${applicationId}:${secret}`).toString('base64')}`;
}

export function sanitizePlanningCenterError(error: unknown, credentials?: Partial<PlanningCenterCredentials>): string {
  const raw = error instanceof Error ? error.message : String(error);
  let message = raw || 'Planning Center API request failed';

  for (const secretValue of [credentials?.applicationId, credentials?.secret].filter(Boolean)) {
    message = message.split(String(secretValue)).join('[redacted]');
  }

  return message;
}

export function shouldRetry(statusCode: number | undefined): boolean {
  return statusCode === 429 || (statusCode !== undefined && statusCode >= 500 && statusCode <= 599);
}

export function retryDelayMs(statusCode: number | undefined, retryAfter: string | undefined, attempt: number): number {
  if (statusCode === 429 && retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) {
      return Math.max(0, seconds * 1000);
    }

    const retryDate = Date.parse(retryAfter);
    if (!Number.isNaN(retryDate)) {
      return Math.max(0, retryDate - Date.now());
    }
  }

  return Math.min(1000 * 2 ** attempt, 8000);
}

async function sleep(ms: number): Promise<void> {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function errorStatus(error: any): number | undefined {
  return error?.httpCode ?? error?.statusCode ?? error?.response?.statusCode ?? error?.response?.status;
}

function retryAfterHeader(error: any): string | undefined {
  const headers = error?.response?.headers ?? error?.headers;
  return headers?.['retry-after'] ?? headers?.['Retry-After'];
}

export async function planningCenterApiRequest(
  this: IExecuteFunctions,
  options: PlanningCenterRequestOptions,
): Promise<unknown> {
  const credentials = (await this.getCredentials('planningCenterPatApi')) as PlanningCenterCredentials;
  const requestOptions: IHttpRequestOptions = {
    method: options.method,
    url: `${normalizeBaseUrl(credentials.baseUrl)}${options.path}`,
    qs: options.qs,
    body: options.body,
    json: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: buildBasicAuthHeader(credentials.applicationId, credentials.secret),
      ...options.headers,
    },
  };

  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    try {
      return await this.helpers.httpRequest(requestOptions);
    } catch (error) {
      lastError = error;
      const statusCode = errorStatus(error);
      if (attempt === MAX_ATTEMPTS - 1 || !shouldRetry(statusCode)) {
        break;
      }

      await sleep(retryDelayMs(statusCode, retryAfterHeader(error), attempt));
    }
  }

  const message = sanitizePlanningCenterError(lastError, credentials);
  throw new NodeApiError(this.getNode(), lastError as any, { message });
}

export function toNodeOperationError(
  context: IExecuteFunctions,
  error: unknown,
  itemIndex: number,
): NodeOperationError {
  if (error instanceof NodeOperationError) {
    return error;
  }

  return new NodeOperationError(context.getNode(), sanitizePlanningCenterError(error), { itemIndex });
}
