import { describe, expect, it, vi } from 'vitest';

import { PlanningCenterGiving } from '../nodes/generated/giving/PlanningCenterGiving.node';
import { PlanningCenterGroups } from '../nodes/generated/groups/PlanningCenterGroups.node';
import { PlanningCenterPeople } from '../nodes/generated/people/PlanningCenterPeople.node';
import { generatedProductConfigs } from '../src/generator/config';
import { buildProductGeneration } from '../src/generator/openapi';

describe('generated Planning Center nodes', () => {
  it('exposes required n8n descriptions for bootstrap products', () => {
    const nodes = [new PlanningCenterPeople(), new PlanningCenterGroups(), new PlanningCenterGiving()];

    expect(nodes.map((node) => node.description.displayName)).toEqual([
      'Planning Center People',
      'Planning Center Groups',
      'Planning Center Giving',
    ]);
    for (const node of nodes) {
      expect(node.description.credentials).toEqual([{ name: 'planningCenterPatApi', required: true }]);
      expect(node.description.icon).toBe('file:pco.svg');
      expect(node.description.properties.some((property) => property.name === 'resource')).toBe(true);
      expect(node.description.properties.some((property) => property.name === 'operation')).toBe(true);
    }
  });

  it('records metadata summaries for generated products', async () => {
    const summaries = await Promise.all(generatedProductConfigs.map(buildProductGeneration));

    expect(summaries.map((summary) => summary.product).sort()).toEqual(['giving', 'groups', 'people']);
    for (const summary of summaries) {
      expect(summary.operationCount).toBeGreaterThan(0);
      expect(summary.resourceCount).toBeGreaterThan(0);
      expect(summary.exclusions).toEqual([]);
      expect(summary.operations.some((operation) => operation.path.startsWith(`/${summary.product}/v2`))).toBe(true);
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
      displayName: 'Person Id',
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
    const node = new PlanningCenterPeople();
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

  it('executes form submission list when optional numeric query filters are unset', async () => {
    const node = new PlanningCenterPeople();
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
        qs: {},
      }),
    );
  });

  it('maps selected query options to Planning Center query parameters', async () => {
    const node = new PlanningCenterPeople();
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
          'where[created_at][gte]': '2026-01-01T00:00:00Z',
          'where[person][id]': '456',
          include: 'person',
          order: '-created_at',
        },
      }),
    );
  });
});
