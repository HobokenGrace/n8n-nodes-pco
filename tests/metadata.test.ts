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

  it('tests credentials against a product-neutral Planning Center API endpoint', () => {
    const credential = new PlanningCenterPatApi();

    expect(credential.test.request).toMatchObject({
      baseURL: '={{$credentials.baseUrl}}',
      url: '/api/v2/personal_access_tokens',
      method: 'GET',
    });
  });

  it('sends PAT credentials with native Basic auth settings', () => {
    const credential = new PlanningCenterPatApi();

    expect(credential.authenticate.properties).toMatchObject({
      auth: {
        username: '={{$credentials.applicationId}}',
        password: '={{$credentials.secret}}',
        sendImmediately: true,
      },
    });
  });

  it('explains credential test failures by Planning Center response status', () => {
    const credential = new PlanningCenterPatApi();

    expect(credential.test.rules).toEqual([
      {
        type: 'responseCode',
        properties: {
          value: 401,
          message:
            'Planning Center returned 401 Unauthorized while testing /api/v2/personal_access_tokens. Check that Application ID and Secret were copied from the same Personal Access Token with no extra whitespace.',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 403,
          message:
            'Planning Center returned 403 Forbidden while testing /api/v2/personal_access_tokens. The PAT authenticated, but this user or token cannot access the API app personal access token endpoint.',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 404,
          message:
            'Planning Center returned 404 Not Found while testing /api/v2/personal_access_tokens. Check the Base URL; it should usually be https://api.planningcenteronline.com.',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 429,
          message:
            'Planning Center returned 429 Too Many Requests while testing credentials. Wait and retry after the rate-limit window resets.',
        },
      },
    ]);
  });
});
