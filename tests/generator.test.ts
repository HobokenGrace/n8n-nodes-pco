import { describe, expect, it, vi } from 'vitest';
import { readFile } from 'node:fs/promises';

import * as entrypoint from '../index';
import { generatedProductConfigs, productConfigs } from '../src/generator/config';
import {
  buildProductGeneration,
  buildProductGenerationFromDocument,
} from '../src/generator/openapi';
import { renderNode } from '../src/generator/render';
import { normalizeJsonApiResponse } from '../src/runtime/jsonApi';

type GeneratedNodeClass = new () => {
  description: {
    credentials?: unknown;
    displayName: string;
    icon?: string;
    name: string;
    properties: any[];
    subtitle?: string;
  };
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
    nodes.forEach((node, index) => {
      const config = generatedProductConfigs[index];

      expect(node.description.credentials).toEqual([
        { name: 'planningCenterPatApi', required: true },
      ]);
      expect(node.description.icon).toBe(`file:${config.product}.svg`);
      expect(node.description.properties.some((property) => property.name === 'resource')).toBe(
        true,
      );
      expect(node.description.properties.some((property) => property.name === 'operation')).toBe(
        true,
      );
    });
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
      expect(
        summary.operations.some((operation) => operation.path.startsWith(`/${summary.product}/v2`)),
      ).toBe(true);
    }
  });

  it('defaults each generated resource to a read operation when one exists', async () => {
    const summaries = await Promise.all(generatedProductConfigs.map(buildProductGeneration));

    for (const summary of summaries) {
      const operationsByResource = new Map<string, typeof summary.operations>();
      for (const operation of summary.operations) {
        operationsByResource.set(operation.resource, [
          ...(operationsByResource.get(operation.resource) ?? []),
          operation,
        ]);
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
    const operations = Object.fromEntries(
      peopleSummary.operations.map((operation) => [operation.id, operation.operation]),
    );
    const givingOperations = Object.fromEntries(
      givingSummary.operations.map((operation) => [operation.id, operation.operation]),
    );
    const servicesOperations = Object.fromEntries(
      servicesSummary.operations.map((operation) => [operation.id, operation.operation]),
    );

    expect(operations.getFormsFormIdFormSubmissions).toBe('List Form Submissions (via Form)');
    expect(operations.getFormsFormIdFormSubmissionsFormSubmissionId).toBe(
      'Get Form Submission (via Form)',
    );
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
    expect(
      operations.getFormsFormIdFormSubmissionsFormSubmissionIdFormSubmissionValuesFormSubmissionValueId,
    ).toBe('Get Form Submission Value (via Form Submission)');
    expect(operations.getPeople).toBe('List People');
    expect(operations.getHouseholdsHouseholdIdPeople).toBe('List People (via Household)');
    expect(operations.getListsListIdPeople).toBe('List People (via List)');
    expect(operations.getPeoplePersonId).toBe('Get Person');
    expect(operations.getPeoplePersonIdWorkflowCardsWorkflowCardIdPersonPersonId).toBe(
      'Get Person (via Workflow Card)',
    );
    expect(operations.getMaritalStatusesMaritalStatusId).toBe('Get Marital Status');
    expect(givingOperations.getCampusesCampusId).toBe('Get Campus');
    expect(servicesOperations.getFoldersFolderIdFoldersFolderId).toBe('Get Folder (via Folder)');
  });

  it('renders selected operation subtitles from endpoint descriptions while preserving operation IDs', () => {
    const node = new entrypoint.PlanningCenterPeople();
    const operationProperty = node.description.properties.find(
      (property) =>
        property.name === 'operation' &&
        property.options?.some((option: any) => option.value === 'getPeople'),
    );

    expect(node.description.subtitle).not.toBe('={{$parameter["operation"]}}');
    expect(node.description.subtitle).toContain('$parameter["operation"]');
    expect(node.description.subtitle).toContain('"getPeople":"GET /people"');
    expect(operationProperty?.options).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'List People',
          value: 'getPeople',
          description: 'GET /people',
        }),
      ]),
    );
  });

  it('renders unofficial operation subtitles and dropdown descriptions without warning copy', () => {
    const peopleNode = new entrypoint.PlanningCenterPeople();
    const operationProperty = peopleNode.description.properties.find(
      (property) =>
        property.name === 'operation' &&
        property.options?.some((option: any) => option.value === 'listPersonActivities'),
    );

    expect(peopleNode.description.subtitle).toContain(
      '"listPersonActivities":"GET /people/{person_id}/activities"',
    );
    expect(peopleNode.description.subtitle).not.toContain('does not document this endpoint');
    expect(operationProperty?.options).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'List Person Activities',
          value: 'listPersonActivities',
          description: 'GET /people/{person_id}/activities',
        }),
      ]),
    );
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
    const operation = summary.operations.find(
      (candidate) => candidate.id === 'getFormsFormIdFormSubmissions',
    );
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

    const queryOptions = Object.fromEntries(
      operation!.queryOptions.map((option) => [option.name, option]),
    );
    expect(queryOptions.wherecreatedAtFilter).toMatchObject({
      displayName: 'Created At',
      group: 'filter',
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
      group: 'filter',
      kind: 'single',
      sourceName: 'where[person][id]',
    });
    expect(queryOptions.include).toMatchObject({
      displayName: 'Include',
      group: 'include',
      kind: 'single',
      sourceName: 'include',
    });
    expect(queryOptions.order).toMatchObject({
      displayName: 'Order',
      group: 'order',
      kind: 'single',
      sourceName: 'order',
      valueOptions: expect.arrayContaining([
        { name: 'Created At Ascending', value: 'created_at' },
        { name: 'Created At Descending', value: '-created_at' },
      ]),
    });
  });

  it('models and renders supported ordinary primitive query parameters', () => {
    const config = {
      product: 'test',
      displayName: 'Test',
      className: 'TestNode',
      nodeName: 'testNode',
      sourceUrl: 'https://example.com/openapi.json',
      snapshotDate: '2026-01-01',
      generate: true,
    };
    const result = buildProductGenerationFromDocument(config, {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            tags: ['Items'],
            parameters: [
              {
                in: 'query',
                name: 'text-value',
                description: 'Text value.',
                schema: { type: 'string', default: 'hello' },
              },
              { in: 'query', name: 'count', required: true, schema: { type: 'integer' } },
              { in: 'query', name: 'ratio', schema: { type: 'number' } },
              { in: 'query', name: 'enabled', schema: { type: 'boolean' } },
              {
                in: 'query',
                name: 'status',
                schema: { type: 'string', enum: ['active', 'paused'] },
              },
              { in: 'query', name: 'at', schema: { type: 'string', format: 'date-time' } },
              {
                in: 'query',
                name: 'unsupported',
                schema: { type: 'array', items: { type: 'string' } },
              },
            ],
            responses: {
              200: {
                description: 'OK',
                content: {
                  'application/vnd.api+json': {
                    schema: {
                      type: 'object',
                      properties: { data: { type: 'array', items: { type: 'object' } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    const operation = result.operations[0];

    expect(operation.stability).toBe('official');
    expect(operation.ordinaryQueryFields).toEqual([
      expect.objectContaining({
        name: 'textValue',
        sourceName: 'text-value',
        description: 'Text value.',
        defaultValue: 'hello',
        required: false,
        type: 'string',
      }),
      expect.objectContaining({ sourceName: 'count', required: true, type: 'number' }),
      expect.objectContaining({ sourceName: 'ratio', required: false, type: 'number' }),
      expect.objectContaining({ sourceName: 'enabled', required: false, type: 'boolean' }),
      expect.objectContaining({
        sourceName: 'status',
        valueOptions: [
          { name: 'Active', value: 'active' },
          { name: 'Paused', value: 'paused' },
        ],
      }),
      expect.objectContaining({ sourceName: 'at', format: 'date-time' }),
    ]);
    expect(operation.ordinaryQueryFields.map((field) => field.sourceName)).not.toContain(
      'unsupported',
    );

    const source = renderNode(config, result);
    expect(source).toContain('"stability": "official"');
    expect(source).toContain('displayName: \\"At\\"');
    expect(source).toContain('type: \\"dateTime\\"');
    expect(source).toContain('function addOrdinaryQuery');
    expect(source).toContain('addOrdinaryQuery(context, itemIndex, operation, qs);');
    expect(source.indexOf('addOrdinaryQuery(context, itemIndex, operation, qs);')).toBeLessThan(
      source.indexOf('addAdditionalQuery(context, itemIndex, operation, qs);'),
    );
  });

  it('rejects operation IDs that collide after generated identifier normalization', () => {
    const config = {
      product: 'test',
      displayName: 'Test',
      className: 'TestNode',
      nodeName: 'testNode',
      sourceUrl: 'https://example.com/openapi.json',
      snapshotDate: '2026-01-01',
      generate: true,
    };

    expect(() =>
      buildProductGenerationFromDocument(config, {
        paths: {
          '/first': {
            get: { operationId: 'get-items', responses: { 200: { description: 'OK' } } },
          },
          '/second': {
            get: { operationId: 'get items', responses: { 200: { description: 'OK' } } },
          },
        },
      }),
    ).toThrow(/generated operation ID.*getItems/i);
  });

  it('renders grouped query options as multi-value fixed collections', () => {
    const node = new entrypoint.PlanningCenterPeople();
    const filterProperty: any = node.description.properties.find(
      (property) => property.name === 'getFormsFormIdFormSubmissions_filter',
    );
    const orderProperty: any = node.description.properties.find(
      (property) => property.name === 'getFormsFormIdFormSubmissions_order',
    );
    const includeProperty: any = node.description.properties.find(
      (property) => property.name === 'getFormsFormIdFormSubmissions_include',
    );

    expect(filterProperty).toMatchObject({
      displayName: 'Filter',
      placeholder: 'Filter by',
      typeOptions: { multipleValues: true },
    });
    expect(orderProperty).toMatchObject({
      displayName: 'Order',
      placeholder: 'Order by',
      typeOptions: { multipleValues: true },
    });
    expect(includeProperty).toMatchObject({
      displayName: 'Include',
      placeholder: 'Include data',
      typeOptions: { multipleValues: true },
    });

    const orderOption = orderProperty.options.find((option: any) => option.name === 'order');
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

  it('renders lookup-enabled fields as searchable resource locators with manual ID mode', () => {
    const node = new entrypoint.PlanningCenterGroups();
    const groupTypeProperty: any = node.description.properties.find(
      (property) => property.name === 'getGroupTypesGroupTypeIdGroups_groupTypeId',
    );

    expect(groupTypeProperty).toMatchObject({
      displayName: 'Group Type ID',
      type: 'resourceLocator',
      default: { mode: 'list', value: '' },
      modes: [
        expect.objectContaining({
          displayName: 'List',
          name: 'list',
          type: 'list',
          typeOptions: expect.objectContaining({
            searchable: true,
            searchListMethod: expect.any(String),
          }),
        }),
        expect.objectContaining({ displayName: 'ID', name: 'id', type: 'string' }),
      ],
    });
  });

  it('infers lookup metadata for supported single-ID fields and defers multi-ID fields', async () => {
    const groupsConfig = generatedProductConfigs.find((config) => config.product === 'groups');
    expect(groupsConfig).toBeDefined();

    const summary = await buildProductGeneration(groupsConfig!);
    const operations = Object.fromEntries(
      summary.operations.map((operation) => [operation.id, operation]),
    );
    const groupTypeGroups = operations.getGroupTypesGroupTypeIdGroups;
    const campusGroups = operations.getCampusesCampusIdGroups;
    const campusGroupPatch = operations.patchCampusesCampusIdGroupsGroupId;

    expect(
      groupTypeGroups.pathParameters.find((field) => field.sourceName === 'group_type_id')?.lookup,
    ).toMatchObject({
      sourcePath: '/groups/v2/group_types',
      parentBindings: [],
      resultLimit: 25,
    });
    expect(
      operations.getCampuses.queryOptions.find((option) => option.sourceName === 'where[id]')
        ?.lookup,
    ).toMatchObject({
      sourcePath: '/groups/v2/campuses',
      searchFilter: 'where[name]',
    });
    expect(
      campusGroups.queryOptions.find((option) => option.sourceName === 'where[group_type][id]')
        ?.lookup,
    ).toMatchObject({
      sourcePath: '/groups/v2/group_types',
    });
    expect(
      campusGroupPatch.attributeFields.find((field) => field.sourceName === 'group_type_id')
        ?.lookup,
    ).toBeDefined();
    expect(
      campusGroupPatch.relationshipFields.find((field) => field.relationshipName === 'group_type')
        ?.lookup,
    ).toBeDefined();
    expect(
      campusGroupPatch.attributeFields.find((field) => field.sourceName === 'tag_ids')?.lookup,
    ).toBeUndefined();
    expect(
      summary.operations
        .flatMap((operation) => operation.relationshipFields)
        .filter((field) => field.multiple && field.lookup),
    ).toEqual([]);
  });

  it('does not make path parameter lookups depend on their own selected value', async () => {
    const servicesConfig = generatedProductConfigs.find((config) => config.product === 'services');
    expect(servicesConfig).toBeDefined();

    const summary = await buildProductGeneration(servicesConfig!);
    const folderServiceTypes = summary.operations.find(
      (operation) => operation.id === 'getFoldersFolderIdServiceTypes',
    );
    const folderId = folderServiceTypes?.pathParameters.find(
      (field) => field.sourceName === 'folder_id',
    );

    expect(folderId?.lookup).toMatchObject({
      sourcePath: '/services/v2/folders',
      parentBindings: [],
    });
  });

  it('infers split-name lookup metadata for Giving people without a combined search filter', async () => {
    const givingConfig = generatedProductConfigs.find((config) => config.product === 'giving');
    expect(givingConfig).toBeDefined();

    const summary = await buildProductGeneration(givingConfig!);
    const operation = summary.operations.find(
      (candidate) => candidate.id === 'getPeoplePersonIdDonations',
    );
    const lookup = operation?.pathParameters.find(
      (field) => field.sourceName === 'person_id',
    )?.lookup;

    expect(operation?.operation).toBe('List Donations (via Person)');
    expect(lookup).toMatchObject({
      sourcePath: '/giving/v2/people',
      searchFilter: undefined,
      splitNameSearch: {
        firstNameFilter: 'where[first_name]',
        lastNameFilter: 'where[last_name]',
      },
    });
    expect(lookup?.labelFields).toEqual([
      'name',
      'full_name',
      'display_name',
      'search_name',
      'path_name',
      'first_name last_name',
      'given_name last_name',
      'nickname last_name',
      'title',
      'subject',
      'label',
    ]);
  });

  it('uses generated list-search methods with limits, search filters, labels, and parent bindings', async () => {
    const node: any = new entrypoint.PlanningCenterGroups();
    const httpRequest = vi.fn().mockResolvedValue({
      data: [
        { id: '1', type: 'Campus', attributes: { name: 'North' } },
        { id: '2', type: 'Campus', attributes: { title: 'Fallback Title' } },
      ],
    });
    const context: any = {
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getNode: () => ({ name: 'Planning Center Groups', type: 'planningCenterGroups' }),
      getNodeParameter: vi.fn((name: string, fallback?: unknown) => {
        if (name === 'getCampusesCampusIdGroupsGroupId_campusId')
          return { __rl: true, mode: 'list', value: '12' };
        return fallback;
      }),
      helpers: { httpRequest },
    };

    await expect(
      node.methods.listSearch.searchGetCampusesCampusIdGroupsGroupIdGroupId.call(context, 'small'),
    ).resolves.toEqual({
      results: [
        { name: 'North (1)', value: '1' },
        { name: 'Fallback Title (2)', value: '2' },
      ],
    });
    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.example.test/groups/v2/campuses/12/groups',
        qs: { per_page: 25, 'where[name]': 'small' },
      }),
    );

    context.getNodeParameter = vi.fn((_name: string, fallback?: unknown) => fallback);
    httpRequest.mockClear();

    await expect(
      node.methods.listSearch.searchGetCampusesCampusIdGroupsGroupIdGroupId.call(context, 'small'),
    ).resolves.toEqual({
      results: [],
    });
    expect(httpRequest).not.toHaveBeenCalled();
  });

  it('preserves canonical JSON:API request types separately from display resource labels', async () => {
    const webhooksConfig = generatedProductConfigs.find((config) => config.product === 'webhooks');
    expect(webhooksConfig).toBeDefined();

    const summary = await buildProductGeneration(webhooksConfig!);
    const operation = summary.operations.find(
      (candidate) => candidate.id === 'postWebhookSubscriptions',
    );

    expect(operation).toMatchObject({
      resource: 'Webhook Subscription',
      jsonApiType: 'WebhookSubscription',
    });
  });

  it('uses canonical JSON:API request types in standard bodies and preserves raw JSON bodies', async () => {
    const node = new entrypoint.PlanningCenterWebhooks();
    const httpRequest = vi
      .fn()
      .mockResolvedValue({ data: { id: '1', type: 'WebhookSubscription' } });
    const context: any = {
      continueOnFail: () => false,
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getInputData: () => [{ json: {} }, { json: {} }],
      getNode: () => ({ name: 'Planning Center Webhooks', type: 'planningCenterWebhooks' }),
      getNodeParameter: vi.fn((name: string, itemIndex: number, fallback?: unknown) => {
        if (name === 'resource') return 'Webhook Subscription';
        if (name === 'operation') return 'postWebhookSubscriptions';
        if (name === 'bodyMode') return itemIndex === 0 ? 'fields' : 'rawJson';
        if (name === 'postWebhookSubscriptions_name') return 'Member Updates';
        if (name === 'postWebhookSubscriptions_url') return 'https://example.test/webhook';
        if (name === 'postWebhookSubscriptions_active') return true;
        if (name === 'rawJsonBody') {
          return JSON.stringify({ data: { type: 'CustomRawType', attributes: { name: 'Raw' } } });
        }
        if (name === 'additionalQueryParameters') return fallback;

        return fallback;
      }),
      helpers: { httpRequest },
    };

    await expect(node.execute.call(context)).resolves.toEqual([
      [
        expect.objectContaining({ json: expect.any(Object) }),
        expect.objectContaining({ json: expect.any(Object) }),
      ],
    ]);
    expect(httpRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        method: 'POST',
        url: 'https://api.example.test/webhooks/v2/webhook_subscriptions',
        body: {
          data: {
            type: 'WebhookSubscription',
            attributes: {
              name: 'Member Updates',
              url: 'https://example.test/webhook',
              active: true,
            },
          },
        },
      }),
    );
    expect(httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        body: { data: { type: 'CustomRawType', attributes: { name: 'Raw' } } },
      }),
    );
  });

  it('uses bounded split-name lookup search for Giving person locators', async () => {
    const node: any = new entrypoint.PlanningCenterGiving();
    const firstNamePeople = Array.from({ length: 24 }, (_, index) => ({
      id: String(index + 1),
      type: 'Person',
      attributes: { first_name: `First${index + 1}`, last_name: 'Match' },
    }));
    const httpRequest = vi.fn((request: any) => {
      if (request.qs?.['where[first_name]']) {
        return Promise.resolve({ data: firstNamePeople });
      }
      if (request.qs?.['where[last_name]']) {
        return Promise.resolve({
          data: [
            {
              id: '2',
              type: 'Person',
              attributes: { first_name: 'Duplicate', last_name: 'Match' },
            },
            { id: '25', type: 'Person', attributes: { first_name: 'Last25', last_name: 'Match' } },
            { id: '26', type: 'Person', attributes: { first_name: 'Last26', last_name: 'Match' } },
          ],
        });
      }
      return Promise.resolve({ data: [] });
    });
    const context: any = {
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getNode: () => ({ name: 'Planning Center Giving', type: 'planningCenterGiving' }),
      getNodeParameter: vi.fn((_name: string, fallback?: unknown) => fallback),
      helpers: { httpRequest },
    };

    await expect(
      node.methods.listSearch.searchGetPeoplePersonIdDonationsPersonId.call(
        context,
        'Ada Lovelace',
      ),
    ).resolves.toEqual({
      results: [
        ...firstNamePeople.map((person) => ({
          name: `${person.attributes.first_name} ${person.attributes.last_name} (${person.id})`,
          value: person.id,
        })),
        { name: 'Last25 Match (25)', value: '25' },
      ],
    });

    expect(httpRequest).toHaveBeenCalledTimes(2);
    expect(httpRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        url: 'https://api.example.test/giving/v2/people',
        qs: { per_page: 25, 'where[first_name]': 'Ada' },
      }),
    );
    expect(httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        url: 'https://api.example.test/giving/v2/people',
        qs: { per_page: 25, 'where[last_name]': 'Lovelace' },
      }),
    );

    httpRequest.mockClear();
    await node.methods.listSearch.searchGetPeoplePersonIdDonationsPersonId.call(context, 'Ada');
    expect(httpRequest).toHaveBeenCalledTimes(2);
    expect(httpRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ qs: { per_page: 25, 'where[first_name]': 'Ada' } }),
    );
    expect(httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ qs: { per_page: 25, 'where[last_name]': 'Ada' } }),
    );
  });

  it('uses one unfiltered request for initial Giving person locator results', async () => {
    const node: any = new entrypoint.PlanningCenterGiving();
    const httpRequest = vi.fn().mockResolvedValue({
      data: [{ id: '1', type: 'Person', attributes: { first_name: 'Ada', last_name: 'Lovelace' } }],
    });
    const context: any = {
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getNode: () => ({ name: 'Planning Center Giving', type: 'planningCenterGiving' }),
      getNodeParameter: vi.fn((_name: string, fallback?: unknown) => fallback),
      helpers: { httpRequest },
    };

    await expect(
      node.methods.listSearch.searchGetPeoplePersonIdDonationsPersonId.call(context, ''),
    ).resolves.toEqual({
      results: [{ name: 'Ada Lovelace (1)', value: '1' }],
    });
    expect(httpRequest).toHaveBeenCalledTimes(1);
    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.example.test/giving/v2/people',
        qs: { per_page: 25 },
      }),
    );
  });

  it('executes lookup-enabled path, query, attribute, and relationship fields as IDs', async () => {
    const node = new entrypoint.PlanningCenterGroups();
    const httpRequest = vi.fn().mockResolvedValue({ data: { id: '34', type: 'Group' } });
    const context: any = {
      continueOnFail: () => false,
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getInputData: () => [{ json: {} }],
      getNode: () => ({ name: 'Planning Center Groups', type: 'planningCenterGroups' }),
      getNodeParameter: vi.fn((name: string, _itemIndex: number, fallback?: unknown) => {
        if (name === 'resource') return 'Campus';
        if (name === 'operation') return 'patchCampusesCampusIdGroupsGroupId';
        if (name === 'patchCampusesCampusIdGroupsGroupId_campusId')
          return { __rl: true, mode: 'list', value: '12' };
        if (name === 'patchCampusesCampusIdGroupsGroupId_groupId')
          return { __rl: true, mode: 'id', value: '34' };
        if (name === 'patchCampusesCampusIdGroupsGroupId_include')
          return { include: [{ value: 'group_type' }] };
        if (name === 'bodyMode') return 'fields';
        if (name === 'patchCampusesCampusIdGroupsGroupId_groupTypeId')
          return { __rl: true, mode: 'list', value: '56' };
        if (name === 'patchCampusesCampusIdGroupsGroupId_groupTypeIds')
          return { __rl: true, mode: 'list', value: '78' };
        if (name === 'additionalQueryParameters') return fallback;
        return fallback;
      }),
      helpers: { httpRequest },
    };

    await expect(node.execute.call(context)).resolves.toEqual([
      [expect.objectContaining({ json: expect.any(Object) })],
    ]);
    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PATCH',
        url: 'https://api.example.test/groups/v2/campuses/12/groups/34',
        qs: { include: 'group_type' },
        body: {
          data: {
            type: 'Group',
            attributes: { group_type_id: '56' },
            relationships: { group_type: { data: { type: 'GroupType', id: '78' } } },
          },
        },
      }),
    );
  });

  it('labels assignable attributes and relationships explicitly in body fields', () => {
    const node = new entrypoint.PlanningCenterPeople();
    const labelsByName = Object.fromEntries(
      node.description.properties
        .filter((property) =>
          String(property.name).startsWith('patchFieldDataFieldDatumId_fieldDefinition'),
        )
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
    const summaryLabels = summaries.flatMap((summary) =>
      summary.operations.flatMap((operation) => [
        ...operation.pathParameters.map(
          (field) => `${summary.product}:${operation.id}:path:${field.displayName}`,
        ),
        ...operation.queryParameters.map(
          (field) => `${summary.product}:${operation.id}:query:${field.displayName}`,
        ),
        ...operation.attributeFields.map(
          (field) => `${summary.product}:${operation.id}:attribute:${field.displayName}`,
        ),
        ...operation.relationshipFields.map(
          (field) => `${summary.product}:${operation.id}:relationship:${field.displayName}`,
        ),
        ...operation.queryOptions.map(
          (option) => `${summary.product}:${operation.id}:option:${option.displayName}`,
        ),
        ...operation.queryOptions.flatMap((option) =>
          (option.valueOptions ?? []).map(
            (valueOption) => `${summary.product}:${operation.id}:value-option:${valueOption.name}`,
          ),
        ),
      ]),
    );
    const nodeLabels = generatedNodeClasses
      .map((NodeClass) => new NodeClass())
      .flatMap((node) =>
        collectDisplayNames(node.description.properties).map(
          (label) => `${node.description.name}:${label}`,
        ),
      );

    const mixedCaseLabels = [...summaryLabels, ...nodeLabels].filter((entry) =>
      mixedCaseIdentifierToken.test(entry),
    );

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
        if (name === 'getFormsFormIdFormSubmissions_filter') return fallback;
        if (name === 'getFormsFormIdFormSubmissions_order') return fallback;
        if (name === 'getFormsFormIdFormSubmissions_include') return fallback;
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
        if (name === 'getFormsFormIdFormSubmissions_filter') {
          return {
            wherecreatedAtFilter: [
              { operator: 'gte', value: '2026-01-01T00:00:00Z' },
              { operator: 'lte', value: '2026-01-31T23:59:59Z' },
            ],
            wherepersonid: [{ value: '456' }],
          };
        }
        if (name === 'getFormsFormIdFormSubmissions_order')
          return { order: [{ value: '-created_at' }] };
        if (name === 'getFormsFormIdFormSubmissions_include')
          return { include: [{ value: 'person' }] };
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
          'where[created_at][lte]': '2026-01-31T23:59:59Z',
          'where[person][id]': '456',
          include: 'person',
          order: '-created_at',
        },
      }),
    );
  });

  it('generates the unofficial People activity operation without ineffective app controls or lookup sources', async () => {
    const peopleConfig = generatedProductConfigs.find((config) => config.product === 'people');
    expect(peopleConfig).toBeDefined();

    const summary = await buildProductGeneration(peopleConfig!);
    const operation = summary.operations.find(
      (candidate) => candidate.id === 'listPersonActivities',
    );

    expect(operation).toMatchObject({
      method: 'GET',
      path: '/people/v2/people/{person_id}/activities',
      isList: true,
      stability: 'unofficial',
      description: 'GET /people/{person_id}/activities',
    });
    expect(operation?.description).not.toContain('does not document this endpoint');
    expect(operation?.ordinaryQueryFields).toEqual([
      expect.objectContaining({ sourceName: 'before', format: 'date-time', required: false }),
      expect.objectContaining({ sourceName: 'after', format: 'date-time', required: false }),
    ]);
    expect(operation?.queryParameters.map((field) => field.sourceName)).not.toContain('app');
    expect(
      summary.operations.flatMap((candidate) => [
        ...candidate.pathParameters.map((field) => field.lookup?.sourcePath),
        ...candidate.queryOptions.map((field) => field.lookup?.sourcePath),
        ...candidate.attributeFields.map((field) => field.lookup?.sourcePath),
        ...candidate.relationshipFields.map((field) => field.lookup?.sourcePath),
      ]),
    ).not.toContain('/people/v2/people/{person_id}/activities');
  });

  it('exposes ordinary query controls only for the observed People activity supplement', async () => {
    const summaries = await Promise.all(generatedProductConfigs.map(buildProductGeneration));
    const controls = summaries.flatMap((summary) =>
      summary.operations.flatMap((operation) =>
        operation.ordinaryQueryFields.length
          ? [
              {
                product: summary.product,
                operation: operation.id,
                fields: operation.ordinaryQueryFields.map((field) => field.sourceName),
              },
            ]
          : [],
      ),
    );

    expect(controls).toEqual([
      { product: 'people', operation: 'listPersonActivities', fields: ['before', 'after'] },
    ]);
  });

  it('normalizes the sanitized People activity fixture through shared JSON:API behavior', async () => {
    const fixture = JSON.parse(
      await readFile('openapi/people/supplements/get-person-activities/response.json', 'utf8'),
    );

    expect(normalizeJsonApiResponse(fixture)).toEqual([
      expect.objectContaining({
        id: 'activity-example-1',
        type: 'PersonProfileChange',
        sections: expect.objectContaining({ Involvement: expect.any(Array) }),
        relationships: expect.objectContaining({ editor_person: expect.any(Object) }),
      }),
      expect.objectContaining({
        id: 'activity-example-2',
        type: 'PersonProfileChange',
        sections: expect.objectContaining({ Assimilation: expect.any(Array) }),
      }),
    ]);
  });

  it('serializes optional People activity dates unchanged and lets additional query values override them', async () => {
    const node = new entrypoint.PlanningCenterPeople();
    const httpRequest = vi.fn().mockResolvedValue({ data: [] });
    const context: any = {
      continueOnFail: () => false,
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getInputData: () => [{ json: {} }, { json: {} }],
      getNode: () => ({ name: 'Planning Center People', type: 'planningCenterPeople' }),
      getNodeParameter: vi.fn((name: string, itemIndex: number, fallback?: unknown) => {
        if (name === 'resource') return 'Activity';
        if (name === 'operation') return 'listPersonActivities';
        if (name === 'listPersonActivities_personId') return '123';
        if (name === 'listPersonActivities_before') return '2026-01-15T09:30:00-05:00';
        if (name === 'listPersonActivities_after')
          return itemIndex === 0 ? fallback : '2026-01-01T00:00:00Z';
        if (name === 'listPersonActivities_returnAll') return false;
        if (name === 'listPersonActivities_limit') return 1;
        if (name === 'additionalQueryParameters') {
          return itemIndex === 0
            ? fallback
            : { parameters: [{ name: 'before', value: 'advanced-override' }] };
        }
        return fallback;
      }),
      helpers: { httpRequest },
    };

    await expect(node.execute.call(context)).resolves.toEqual([[]]);
    expect(httpRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        url: 'https://api.example.test/people/v2/people/123/activities',
        qs: { before: '2026-01-15T09:30:00-05:00', per_page: 1 },
      }),
    );
    expect(httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        qs: { after: '2026-01-01T00:00:00Z', before: 'advanced-override', per_page: 1 },
      }),
    );
  });

  it('generates and executes both Webhooks batch-update body variants and raw JSON mode', async () => {
    const webhooksConfig = generatedProductConfigs.find((config) => config.product === 'webhooks');
    expect(webhooksConfig).toBeDefined();
    const summary = await buildProductGeneration(webhooksConfig!);
    const operation = summary.operations.find(
      (candidate) => candidate.id === 'batchUpdateWebhookSubscriptions',
    );

    expect(operation).toMatchObject({
      method: 'POST',
      path: '/webhooks/v2/batch_update',
      jsonApiType: undefined,
      stability: 'unofficial',
      description: 'POST /batch_update',
    });
    expect(operation?.description).not.toContain('does not document this endpoint');
    expect(operation?.attributeFields).toEqual([
      expect.objectContaining({ sourceName: 'url', required: true }),
      expect.objectContaining({ sourceName: 'old_url', required: false }),
      expect.objectContaining({
        sourceName: 'names',
        required: true,
        valueKind: 'stringCollection',
      }),
    ]);

    const node = new entrypoint.PlanningCenterWebhooks();
    const httpRequest = vi.fn().mockResolvedValue(undefined);
    const context: any = {
      continueOnFail: () => false,
      getCredentials: vi.fn().mockResolvedValue({
        applicationId: 'app-id',
        secret: 'secret',
        baseUrl: 'https://api.example.test',
      }),
      getInputData: () => [{ json: {} }, { json: {} }, { json: {} }],
      getNode: () => ({ name: 'Planning Center Webhooks', type: 'planningCenterWebhooks' }),
      getNodeParameter: vi.fn((name: string, itemIndex: number, fallback?: unknown) => {
        if (name === 'resource') return 'Webhook Subscription';
        if (name === 'operation') return 'batchUpdateWebhookSubscriptions';
        if (name === 'bodyMode') return itemIndex === 2 ? 'rawJson' : 'fields';
        if (name === 'batchUpdateWebhookSubscriptions_url') return 'https://example.test/webhook';
        if (name === 'batchUpdateWebhookSubscriptions_oldUrl')
          return itemIndex === 0 ? 'https://example.test/old' : fallback;
        if (name === 'batchUpdateWebhookSubscriptions_names')
          return itemIndex === 0 ? 'event.created, event.updated' : '';
        if (name === 'rawJsonBody')
          return JSON.stringify({ data: { attributes: { url: 'raw', names: [] } } });
        if (name === 'additionalQueryParameters') return fallback;
        return fallback;
      }),
      helpers: { httpRequest },
    };

    await expect(node.execute.call(context)).resolves.toEqual([
      [
        { json: {}, pairedItem: { item: 0 } },
        { json: {}, pairedItem: { item: 1 } },
        { json: {}, pairedItem: { item: 2 } },
      ],
    ]);
    expect(httpRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        method: 'POST',
        url: 'https://api.example.test/webhooks/v2/batch_update',
        body: {
          data: {
            attributes: {
              url: 'https://example.test/webhook',
              old_url: 'https://example.test/old',
              names: ['event.created', 'event.updated'],
            },
          },
        },
      }),
    );
    expect(httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        body: { data: { attributes: { url: 'https://example.test/webhook', names: [] } } },
      }),
    );
    expect(httpRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        body: { data: { attributes: { url: 'raw', names: [] } } },
      }),
    );
  });
});
