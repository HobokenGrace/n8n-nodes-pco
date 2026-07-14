import { describe, expect, it, vi } from 'vitest';

import * as entrypoint from '../index';
import { generatedProductConfigs, productConfigs } from '../src/generator/config';
import { buildProductGeneration } from '../src/generator/openapi';

type GeneratedNodeClass = new () => {
  description: { credentials?: unknown; displayName: string; icon?: string; name: string; properties: any[] };
};

const generatedNodeClasses = generatedProductConfigs.map(
  (config) => (entrypoint as unknown as Record<string, GeneratedNodeClass>)[config.className],
);

function collectDisplayNames(value: unknown, labels: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) collectDisplayNames(item, labels);
    return labels;
  }

  if (!value || typeof value !== 'object') return labels;

  const record = value as Record<string, unknown>;
  if (typeof record.displayName === 'string') labels.push(record.displayName);
  for (const nestedValue of Object.values(record)) collectDisplayNames(nestedValue, labels);
  return labels;
}

describe('generated Planning Center nodes', () => {
  it('exposes required n8n descriptions for generated products', () => {
    const nodes = generatedNodeClasses.map((NodeClass) => new NodeClass());

    expect(nodes.map((node) => node.description.displayName)).toEqual(
      generatedProductConfigs.map((config) => config.displayName),
    );
    for (const node of nodes) {
      expect(node.description.credentials).toEqual([{ name: 'planningCenterPatApi', required: true }]);
      expect(node.description.icon).toBe('file:pco.svg');
      expect(node.description.properties.some((property) => property.name === 'resource')).toBe(true);
      expect(node.description.properties.some((property) => property.name === 'operation')).toBe(true);
    }
  });

  it('records metadata summaries for generated products', async () => {
    const summaries = await Promise.all(generatedProductConfigs.map(buildProductGeneration));

    expect(summaries.map((summary) => summary.product).sort()).toEqual(
      generatedProductConfigs.map((config) => config.product).sort(),
    );
    for (const summary of summaries) {
      expect(summary.operationCount).toBeGreaterThan(0);
      expect(summary.resourceCount).toBeGreaterThan(0);
      expect(summary.exclusions).toEqual([]);
      expect(summary.operations.some((operation) => operation.path.startsWith(`/${summary.product}/v2`))).toBe(true);
    }
  });

  it('defaults each generated resource to a read operation when one exists', async () => {
    const summaries = await Promise.all(generatedProductConfigs.map(buildProductGeneration));

    for (const summary of summaries) {
      const operationsByResource = new Map<string, typeof summary.operations>();
      for (const operation of summary.operations) {
        operationsByResource.set(operation.resource, [...(operationsByResource.get(operation.resource) ?? []), operation]);
      }

      for (const [resource, operations] of operationsByResource) {
        if (operations.some((operation) => operation.method === 'GET')) {
          expect(operations[0].method, `${summary.product}:${resource}`).toBe('GET');
        }
      }
    }
  });

  it('does not treat singleton GET responses as paginated lists', async () => {
    const currentConfig = generatedProductConfigs.find((config) => config.product === 'current');
    expect(currentConfig).toBeDefined();

    const summary = await buildProductGeneration(currentConfig!);
    const getMeOperation = summary.operations.find((operation) => operation.id === 'getMe');
    const currentNode = new entrypoint.PlanningCenterCurrent();
    const propertyNames = currentNode.description.properties.map((property) => property.name);

    expect(getMeOperation).toMatchObject({
      isList: false,
      operation: 'Get Me',
      path: '/current/v2/me',
    });
    expect(propertyNames).not.toContain('getMe_returnAll');
    expect(propertyNames).not.toContain('getMe_limit');
  });

  it('derives friendly operation labels from HTTP method and path shape', async () => {
    const peopleConfig = generatedProductConfigs.find((config) => config.product === 'people');
    const givingConfig = generatedProductConfigs.find((config) => config.product === 'giving');
    const servicesConfig = generatedProductConfigs.find((config) => config.product === 'services');
    expect(peopleConfig).toBeDefined();
    expect(givingConfig).toBeDefined();
    expect(servicesConfig).toBeDefined();

    const [peopleSummary, givingSummary, servicesSummary] = await Promise.all([
      buildProductGeneration(peopleConfig!),
      buildProductGeneration(givingConfig!),
      buildProductGeneration(servicesConfig!),
    ]);
    const operations = Object.fromEntries(peopleSummary.operations.map((operation) => [operation.id, operation.operation]));
    const givingOperations = Object.fromEntries(givingSummary.operations.map((operation) => [operation.id, operation.operation]));
    const servicesOperations = Object.fromEntries(
      servicesSummary.operations.map((operation) => [operation.id, operation.operation]),
    );

    expect(operations.getFormsFormIdFormSubmissions).toBe('List Form Submissions (via Form)');
    expect(operations.getFormsFormIdFormSubmissionsFormSubmissionId).toBe('Get Form Submission (via Form)');
    expect(operations.postFormsFormIdFormSubmissions).toBe('Create Form Submission (via Form)');
    expect(operations.patchFormsFormIdFormSubmissionsFormSubmissionIdPersonPersonId).toBe(
      'Update Person (via Form Submission)',
    );
    expect(operations.deleteFormsFormIdFormSubmissionsFormSubmissionIdPersonPersonId).toBe(
      'Delete Person (via Form Submission)',
    );
    expect(operations.getFormsFormIdFormSubmissionsFormSubmissionIdFormSubmissionValues).toBe(
      'List Form Submission Values (via Form Submission)',
    );
    expect(operations.getFormsFormIdFormSubmissionsFormSubmissionIdFormSubmissionValuesFormSubmissionValueId).toBe(
      'Get Form Submission Value (via Form Submission)',
    );
    expect(operations.getPeople).toBe('List People');
    expect(operations.getHouseholdsHouseholdIdPeople).toBe('List People (via Household)');
    expect(operations.getListsListIdPeople).toBe('List People (via List)');
    expect(operations.getPeoplePersonId).toBe('Get Person');
    expect(operations.getPeoplePersonIdWorkflowCardsWorkflowCardIdPersonPersonId).toBe('Get Person (via Workflow Card)');
    expect(operations.getMaritalStatusesMaritalStatusId).toBe('Get Marital Status');
    expect(givingOperations.getCampusesCampusId).toBe('Get Campus');
    expect(servicesOperations.getFoldersFolderIdFoldersFolderId).toBe('Get Folder (via Folder)');
  });

  it('does not emit duplicate operation labels within a product', async () => {
    const summaries = await Promise.all(productConfigs.map(buildProductGeneration));

    for (const summary of summaries) {
      const operationsByLabel = new Map<string, string[]>();
      for (const operation of summary.operations) {
        operationsByLabel.set(operation.operation, [
          ...(operationsByLabel.get(operation.operation) ?? []),
          `${operation.method} ${operation.path}`,
        ]);
      }

      const duplicateLabels = [...operationsByLabel.entries()]
        .filter(([, paths]) => paths.length > 1)
        .map(([label, paths]) => `${label}: ${paths.join(', ')}`);

      expect(duplicateLabels, summary.product).toEqual([]);
    }
  });

  it('renders only useful query filters for form submission lists', async () => {
    const peopleConfig = generatedProductConfigs.find((config) => config.product === 'people');
    expect(peopleConfig).toBeDefined();

    const summary = await buildProductGeneration(peopleConfig!);
    const operation = summary.operations.find((candidate) => candidate.id === 'getFormsFormIdFormSubmissions');
    expect(operation).toBeDefined();

    const queryParameters = operation!.queryParameters.map((parameter) => parameter.sourceName);

    expect(queryParameters).toContain('where[created_at]');
    expect(queryParameters).toContain('where[created_at][gte]');
    expect(queryParameters).toContain('where[updated_at][lte]');
    expect(queryParameters).toContain('where[submitter_name]');
    expect(queryParameters).toContain('where[person][id]');
    expect(queryParameters).toContain('include');
    expect(queryParameters).toContain('order');

    expect(queryParameters).not.toContain('where[form][id]');
    expect(queryParameters).not.toContain('where[person][addresses][city]');
    expect(queryParameters).not.toContain('where[form][campus][updated_at]');
    expect(queryParameters).not.toContain('fields[FormSubmission]');
    expect(queryParameters).not.toContain('per_page');
    expect(queryParameters).not.toContain('offset');
    expect(queryParameters.length).toBeLessThan(20);

    const queryOptions = Object.fromEntries(operation!.queryOptions.map((option) => [option.name, option]));
    expect(queryOptions.wherecreatedAtFilter).toMatchObject({
      displayName: 'Created At',
      kind: 'operator',
    });
    expect(queryOptions.wherecreatedAtFilter.operators).toEqual([
      { name: 'Equals', value: 'eq', sourceName: 'where[created_at]' },
      { name: 'Greater Than', value: 'gt', sourceName: 'where[created_at][gt]' },
      { name: 'Greater Than Or Equal', value: 'gte', sourceName: 'where[created_at][gte]' },
      { name: 'Less Than', value: 'lt', sourceName: 'where[created_at][lt]' },
      { name: 'Less Than Or Equal', value: 'lte', sourceName: 'where[created_at][lte]' },
    ]);
    expect(queryOptions.wherepersonid).toMatchObject({
      displayName: 'Person ID',
      kind: 'single',
      sourceName: 'where[person][id]',
    });
    expect(queryOptions.order).toMatchObject({
      displayName: 'Order',
      kind: 'single',
      sourceName: 'order',
      valueOptions: expect.arrayContaining([
        { name: 'Created At Ascending', value: 'created_at' },
        { name: 'Created At Descending', value: '-created_at' },
      ]),
    });
  });

  it('renders query option enums as n8n dropdown fields', () => {
    const node = new entrypoint.PlanningCenterPeople();
    const optionsProperty: any = node.description.properties.find(
      (property) => property.name === 'getFormsFormIdFormSubmissions_options',
    );
    const orderOption = optionsProperty.options.find((option: any) => option.name === 'order');
    const orderValue = orderOption.values.find((value: any) => value.name === 'value');

    expect(orderValue).toMatchObject({
      displayName: 'Value',
      name: 'value',
      type: 'options',
      options: expect.arrayContaining([
        { name: 'Created At Ascending', value: 'created_at' },
        { name: 'Created At Descending', value: '-created_at' },
      ]),
      default: '',
    });
  });

  it('labels assignable attributes and relationships explicitly in body fields', () => {
    const node = new entrypoint.PlanningCenterPeople();
    const labelsByName = Object.fromEntries(
      node.description.properties
        .filter((property) => String(property.name).startsWith('patchFieldDataFieldDatumId_fieldDefinition'))
        .map((property) => [property.name, property.displayName]),
    );

    expect(labelsByName).toMatchObject({
      patchFieldDataFieldDatumId_fieldDefinitionId: 'Attribute: Field Definition ID',
      patchFieldDataFieldDatumId_fieldDefinitionIds: 'Relationship: Field Definition ID',
    });
  });

  it('normalizes identifier acronym capitalization across generated labels', async () => {
    const summaries = await Promise.all(generatedProductConfigs.map(buildProductGeneration));
    const mixedCaseIdentifierToken = /\bId(?:s)?\b/;
    const summaryLabels = summaries.flatMap((summary) => summary.operations.flatMap((operation) => [
      ...operation.pathParameters.map((field) => `${summary.product}:${operation.id}:path:${field.displayName}`),
      ...operation.queryParameters.map((field) => `${summary.product}:${operation.id}:query:${field.displayName}`),
      ...operation.attributeFields.map((field) => `${summary.product}:${operation.id}:attribute:${field.displayName}`),
      ...operation.relationshipFields.map((field) => `${summary.product}:${operation.id}:relationship:${field.displayName}`),
      ...operation.queryOptions.map((option) => `${summary.product}:${operation.id}:option:${option.displayName}`),
      ...operation.queryOptions.flatMap((option) =>
        (option.valueOptions ?? []).map((valueOption) => `${summary.product}:${operation.id}:value-option:${valueOption.name}`),
      ),
    ]));
    const nodeLabels = generatedNodeClasses
      .map((NodeClass) => new NodeClass())
      .flatMap((node) => collectDisplayNames(node.description.properties).map((label) => `${node.description.name}:${label}`));

    const mixedCaseLabels = [...summaryLabels, ...nodeLabels].filter((entry) => mixedCaseIdentifierToken.test(entry));

    expect(mixedCaseLabels).toEqual([]);
  });

  it('executes form submission list when optional numeric query filters are unset', async () => {
    const node = new entrypoint.PlanningCenterPeople();
    const httpRequest = vi.fn().mockResolvedValue({ data: [] });
    const missingNumberParameter = 'getFormsFormIdFormSubmissions_wherepersongrade';
    const context: any = {
      continueOnFail: () => false,
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getInputData: () => [{ json: {} }],
      getNode: () => ({ name: 'Planning Center People', type: 'planningCenterPeople' }),
      getNodeParameter: vi.fn((name: string, _itemIndex: number, fallback?: unknown) => {
        if (name === 'resource') return 'Form';
        if (name === 'operation') return 'getFormsFormIdFormSubmissions';
        if (name === 'getFormsFormIdFormSubmissions_formId') return '123';
        if (name === 'getFormsFormIdFormSubmissions_options') return fallback;
        if (name === 'additionalQueryParameters') return fallback;
        if (name === 'getFormsFormIdFormSubmissions_returnAll') return false;
        if (name === 'getFormsFormIdFormSubmissions_limit') return 1;
        if (name === missingNumberParameter && fallback === undefined) {
          throw new Error(`Could not get parameter "${missingNumberParameter}"`);
        }

        return fallback;
      }),
      helpers: { httpRequest },
    };

    await expect(node.execute.call(context)).resolves.toEqual([[]]);
    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.example.test/people/v2/forms/123/form_submissions',
        qs: { per_page: 1 },
      }),
    );
  });

  it('maps selected query options to Planning Center query parameters', async () => {
    const node = new entrypoint.PlanningCenterPeople();
    const httpRequest = vi.fn().mockResolvedValue({ data: [] });
    const context: any = {
      continueOnFail: () => false,
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getInputData: () => [{ json: {} }],
      getNode: () => ({ name: 'Planning Center People', type: 'planningCenterPeople' }),
      getNodeParameter: vi.fn((name: string, _itemIndex: number, fallback?: unknown) => {
        if (name === 'resource') return 'Form';
        if (name === 'operation') return 'getFormsFormIdFormSubmissions';
        if (name === 'getFormsFormIdFormSubmissions_formId') return '123';
        if (name === 'getFormsFormIdFormSubmissions_options') {
          return {
            wherecreatedAtFilter: { operator: 'gte', value: '2026-01-01T00:00:00Z' },
            wherepersonid: { value: '456' },
            include: { value: 'person' },
            order: { value: '-created_at' },
          };
        }
        if (name === 'additionalQueryParameters') return fallback;
        if (name === 'getFormsFormIdFormSubmissions_returnAll') return false;
        if (name === 'getFormsFormIdFormSubmissions_limit') return 1;

        return fallback;
      }),
      helpers: { httpRequest },
    };

    await expect(node.execute.call(context)).resolves.toEqual([[]]);
    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        qs: {
          per_page: 1,
          'where[created_at][gte]': '2026-01-01T00:00:00Z',
          'where[person][id]': '456',
          include: 'person',
          order: '-created_at',
        },
      }),
    );
  });
});
