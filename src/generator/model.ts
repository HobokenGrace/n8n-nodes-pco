export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
export type OperationStability = 'official' | 'unofficial';

export interface GeneratedField {
  name: string;
  sourceName: string;
  displayName: string;
  description?: string;
  defaultValue?: string | number | boolean;
  format?: 'date-time';
  valueKind?: 'scalar' | 'stringCollection';
  required: boolean;
  type: 'boolean' | 'number' | 'string';
  valueOptions?: GeneratedValueOption[];
  lookup?: GeneratedLookup;
}

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

export interface GeneratedValueOption {
  name: string;
  value: string | number | boolean;
}

export interface GeneratedQueryOptionOperator {
  name: string;
  value: string;
  sourceName: string;
}

export interface GeneratedQueryOption {
  name: string;
  displayName: string;
  group: 'filter' | 'order' | 'include';
  type: GeneratedField['type'];
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: GeneratedQueryOptionOperator[];
  valueOptions?: GeneratedValueOption[];
  lookup?: GeneratedLookup;
}

export interface GeneratedRelationshipField {
  name: string;
  displayName: string;
  relationshipName: string;
  relationshipType: string;
  multiple: boolean;
  lookup?: GeneratedLookup;
}

export interface GeneratedOperation {
  id: string;
  resource: string;
  jsonApiType?: string;
  operation: string;
  description: string;
  stability: OperationStability;
  method: HttpMethod;
  path: string;
  deprecated: boolean;
  isList: boolean;
  lookupTarget: string;
  lookupQueryParameterNames: string[];
  pathParameters: GeneratedField[];
  queryParameters: GeneratedField[];
  ordinaryQueryFields: GeneratedField[];
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
