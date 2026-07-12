export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export interface GeneratedField {
  name: string;
  sourceName: string;
  displayName: string;
  required: boolean;
  type: 'boolean' | 'number' | 'string';
}

export interface GeneratedQueryOptionOperator {
  name: string;
  value: string;
  sourceName: string;
}

export interface GeneratedQueryOption {
  name: string;
  displayName: string;
  type: GeneratedField['type'];
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: GeneratedQueryOptionOperator[];
}

export interface GeneratedRelationshipField {
  name: string;
  displayName: string;
  relationshipName: string;
  relationshipType: string;
  multiple: boolean;
}

export interface GeneratedOperation {
  id: string;
  resource: string;
  operation: string;
  description: string;
  method: HttpMethod;
  path: string;
  deprecated: boolean;
  isList: boolean;
  pathParameters: GeneratedField[];
  queryParameters: GeneratedField[];
  queryOptions: GeneratedQueryOption[];
  attributeFields: GeneratedField[];
  relationshipFields: GeneratedRelationshipField[];
}

export interface ProductGenerationResult {
  product: string;
  displayName: string;
  className: string;
  operationCount: number;
  resourceCount: number;
  operations: GeneratedOperation[];
  exclusions: string[];
}
