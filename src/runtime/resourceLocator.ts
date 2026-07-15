import type { INodeParameterResourceLocator } from 'n8n-workflow';

function isResourceLocatorValue(value: unknown): value is INodeParameterResourceLocator {
  return Boolean(value && typeof value === 'object' && (value as { __rl?: unknown }).__rl === true);
}

export function extractResourceLocatorId(value: unknown): string {
  const resolved = isResourceLocatorValue(value) ? value.value : value;

  if (resolved === undefined || resolved === null) return '';
  if (typeof resolved === 'string' || typeof resolved === 'number' || typeof resolved === 'boolean') return String(resolved);

  return '';
}
