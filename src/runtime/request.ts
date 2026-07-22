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

function sanitizePlanningCenterDetails(
  value: unknown,
  credentials: Partial<PlanningCenterCredentials>,
  ancestors = new WeakSet<object>(),
): unknown {
  if (typeof value === 'string') return sanitizePlanningCenterError(value, credentials);
  if (!value || typeof value !== 'object') return value;
  if (ancestors.has(value)) return '[circular]';

  ancestors.add(value);
  const sanitized = Array.isArray(value)
    ? value.map((entry) => sanitizePlanningCenterDetails(entry, credentials, ancestors))
    : Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [
          key,
          sanitizePlanningCenterDetails(entry, credentials, ancestors),
        ]),
      );
  ancestors.delete(value);
  return sanitized;
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

function planningCenterErrorDescription(error: any): string | undefined {
  const errors = error?.response?.data?.errors;
  if (!Array.isArray(errors)) return undefined;

  const descriptions = errors.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return [];

    const title = typeof entry.title === 'string' ? entry.title : undefined;
    const detail = typeof entry.detail === 'string' ? entry.detail : undefined;
    if (title && detail) return [`${title}: ${detail}`];
    return title || detail ? [title ?? detail] : [];
  });

  return descriptions.length > 0 ? descriptions.join(' | ') : undefined;
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
  const description = planningCenterErrorDescription(lastError);
  const apiError = new NodeApiError(this.getNode(), lastError as any, {
    message,
    description: description
      ? sanitizePlanningCenterError(description, credentials)
      : undefined,
  });
  const responseData = apiError.context.data;
  apiError.context.data = sanitizePlanningCenterDetails(
    {
      ...(responseData && typeof responseData === 'object' && !Array.isArray(responseData)
        ? responseData
        : {}),
      request: {
        method: options.method,
        path: options.path,
        ...(options.qs !== undefined ? { query: options.qs } : {}),
        ...(options.body !== undefined ? { body: options.body } : {}),
      },
    },
    credentials,
  ) as IDataObject;
  apiError.messages = apiError.messages.map((rawMessage) =>
    sanitizePlanningCenterError(rawMessage, credentials),
  );
  throw apiError;
}

export function toNodeOperationError(
  context: IExecuteFunctions,
  error: unknown,
  itemIndex: number,
): NodeOperationError & Partial<Pick<NodeApiError, 'httpCode'>> {
  if (error instanceof NodeOperationError) {
    return error;
  }

  const operationError = new NodeOperationError(
    context.getNode(),
    error instanceof Error ? error : sanitizePlanningCenterError(error),
    { itemIndex, message: sanitizePlanningCenterError(error) },
  ) as NodeOperationError & Partial<Pick<NodeApiError, 'httpCode'>>;

  if (error instanceof NodeApiError) {
    operationError.httpCode = error.httpCode;
    operationError.context.data = error.context.data;
  }

  return operationError;
}
