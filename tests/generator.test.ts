import { describe, expect, it } from 'vitest';

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
});
