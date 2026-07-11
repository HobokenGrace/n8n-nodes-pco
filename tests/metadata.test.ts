import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { PlanningCenterPatApi } from '../credentials/PlanningCenterPatApi.credentials';

describe('package metadata', () => {
  it('declares n8n community node metadata and flexible n8n workflow compatibility', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

    expect(pkg.name).toBe('@hobokengrace/n8n-nodes-pco');
    expect(pkg.engines.node).toBe('>=20.0.0');
    expect(pkg.packageManager).toMatch(/^pnpm@/);
    expect(pkg.peerDependencies['n8n-workflow']).toBe('*');
    expect(pkg.devDependencies['n8n-workflow']).toBe('*');
    expect(pkg.n8n.credentials).toContain('dist/credentials/PlanningCenterPatApi.credentials.js');
    expect(pkg.n8n.nodes).toEqual([
      'dist/nodes/generated/people/PlanningCenterPeople.node.js',
      'dist/nodes/generated/groups/PlanningCenterGroups.node.js',
      'dist/nodes/generated/giving/PlanningCenterGiving.node.js',
    ]);
  });
});

describe('PlanningCenterPatApi', () => {
  it('collects application id, secret, and overrideable base URL', () => {
    const credential = new PlanningCenterPatApi();
    const fields = Object.fromEntries(credential.properties.map((property) => [property.name, property]));

    expect(fields.applicationId.required).toBe(true);
    expect(fields.secret.typeOptions).toMatchObject({ password: true });
    expect(fields.baseUrl.default).toBe('https://api.planningcenteronline.com');
  });

  it('tests credentials against the Planning Center me endpoint', () => {
    const credential = new PlanningCenterPatApi();

    expect(credential.test.request).toMatchObject({
      baseURL: '={{$credentials.baseUrl}}',
      url: '/people/v2/me',
      method: 'GET',
    });
  });
});
