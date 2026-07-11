import { describe, expect, it, vi } from 'vitest';

import { executeItemWithContinueOnFail } from '../src/runtime/execute';
import { normalizeJsonApiResponse } from '../src/runtime/jsonApi';
import { collectPaginatedPlanningCenterResults } from '../src/runtime/pagination';
import {
  buildBasicAuthHeader,
  planningCenterApiRequest,
  retryDelayMs,
  sanitizePlanningCenterError,
  shouldRetry,
} from '../src/runtime/request';

function fakeContext(overrides: Record<string, unknown> = {}): any {
  return {
    continueOnFail: () => false,
    getCredentials: vi.fn().mockResolvedValue({
      applicationId: 'app-id',
      secret: 'super-secret',
      baseUrl: 'https://api.example.test/',
    }),
    getNode: () => ({ name: 'Planning Center Test', type: 'planningCenterTest' }),
    helpers: {
      httpRequest: vi.fn().mockResolvedValue({ data: [] }),
    },
    ...overrides,
  };
}

describe('Planning Center request helper', () => {
  it('builds Basic auth from PAT credentials', async () => {
    const context = fakeContext();

    await planningCenterApiRequest.call(context, { method: 'GET', path: '/people/v2/me' });

    expect(context.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.example.test/people/v2/me',
        headers: expect.objectContaining({
          Authorization: buildBasicAuthHeader('app-id', 'super-secret'),
        }),
      }),
    );
  });

  it('retries 429 responses and respects retry-after parsing', async () => {
    const error = Object.assign(new Error('rate limited'), {
      httpCode: 429,
      response: { headers: { 'retry-after': '0' } },
    });
    const context = fakeContext({
      helpers: {
        httpRequest: vi.fn().mockRejectedValueOnce(error).mockResolvedValueOnce({ data: [] }),
      },
    });

    await planningCenterApiRequest.call(context, { method: 'GET', path: '/people/v2/me' });

    expect(context.helpers.httpRequest).toHaveBeenCalledTimes(2);
    expect(shouldRetry(429)).toBe(true);
    expect(shouldRetry(503)).toBe(true);
    expect(retryDelayMs(429, '0', 0)).toBe(0);
  });

  it('redacts credential values from package-created error text', () => {
    const message = sanitizePlanningCenterError(
      new Error('failed for app-id using super-secret'),
      { applicationId: 'app-id', secret: 'super-secret' },
    );

    expect(message).toBe('failed for [redacted] using [redacted]');
  });
});

describe('Planning Center JSON:API normalization', () => {
  it('flattens attributes and preserves reserved JSON:API keys', () => {
    const [item] = normalizeJsonApiResponse({
      data: {
        id: '1',
        type: 'Person',
        attributes: { first_name: 'Ada', id: 'attribute-id' },
        relationships: { household: { data: { type: 'Household', id: '2' } } },
        links: { self: '/people/v2/people/1' },
        meta: { can_order_by: true },
      },
    });

    expect(item).toMatchObject({
      id: '1',
      type: 'Person',
      first_name: 'Ada',
      attribute_id: 'attribute-id',
      relationships: expect.any(Object),
      links: expect.any(Object),
      meta: expect.any(Object),
    });
  });
});

describe('Planning Center pagination helper', () => {
  it('follows next links when Return All is enabled and caps by Limit', async () => {
    const context = fakeContext({
      helpers: {
        httpRequest: vi
          .fn()
          .mockResolvedValueOnce({
            data: [{ id: '1', type: 'Person', attributes: { name: 'One' } }],
            links: { next: 'https://api.example.test/people/v2/people?page=2' },
          })
          .mockResolvedValueOnce({
            data: [{ id: '2', type: 'Person', attributes: { name: 'Two' } }],
            links: { next: null },
          }),
      },
    });

    const results = await collectPaginatedPlanningCenterResults.call(
      context,
      { method: 'GET', path: '/people/v2/people' },
      { returnAll: true, limit: 2 },
    );

    expect(results.map((item) => item.id)).toEqual(['1', '2']);
    expect(context.helpers.httpRequest).toHaveBeenCalledTimes(2);
  });
});

describe('Continue On Fail execution wrapper', () => {
  it('returns item-level errors when Continue On Fail is enabled', async () => {
    const context = fakeContext({ continueOnFail: () => true });

    const result = await executeItemWithContinueOnFail(context, 3, async () => {
      throw new Error('broken item');
    });

    expect(result).toEqual([{ json: { error: 'broken item' }, pairedItem: { item: 3 } }]);
  });

  it('throws when Continue On Fail is disabled', async () => {
    const context = fakeContext({ continueOnFail: () => false });

    await expect(
      executeItemWithContinueOnFail(context, 0, async () => {
        throw new Error('stop execution');
      }),
    ).rejects.toThrow('stop execution');
  });
});
