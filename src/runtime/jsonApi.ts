export type JsonObject = Record<string, any>;

const RESERVED_OUTPUT_KEYS = new Set(['id', 'type', 'relationships', 'links', 'meta']);

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function normalizeJsonApiResource(resource: unknown): JsonObject {
  if (!isObject(resource)) {
    return { value: resource };
  }

  const output: JsonObject = {};

  if ('id' in resource) output.id = resource.id;
  if ('type' in resource) output.type = resource.type;

  const attributes = isObject(resource.attributes) ? resource.attributes : {};
  for (const [key, value] of Object.entries(attributes)) {
    output[RESERVED_OUTPUT_KEYS.has(key) ? `attribute_${key}` : key] = value;
  }

  if ('relationships' in resource) output.relationships = resource.relationships;
  if ('links' in resource) output.links = resource.links;
  if ('meta' in resource) output.meta = resource.meta;

  return output;
}

export function normalizeJsonApiResponse(response: unknown): JsonObject[] {
  if (!isObject(response) || !('data' in response)) {
    return [isObject(response) ? response : { value: response }];
  }

  const { data } = response;
  if (Array.isArray(data)) {
    return data.map(normalizeJsonApiResource);
  }

  if (data === null) {
    return [];
  }

  return [normalizeJsonApiResource(data)];
}
