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
});
