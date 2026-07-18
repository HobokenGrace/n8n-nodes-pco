import { describe, expect, it, vi } from 'vitest';

import { executeItemWithContinueOnFail } from '../src/runtime/execute';
import { normalizeJsonApiResponse } from '../src/runtime/jsonApi';
import { collectPaginatedPlanningCenterResults } from '../src/runtime/pagination';
import { extractResourceLocatorId } from '../src/runtime/resourceLocator';
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
    const message = sanitizePlanningCenterError(new Error('failed for app-id using super-secret'), {
      applicationId: 'app-id',
      secret: 'super-secret',
    });

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

  it.each([undefined, '', null])('normalizes a bodyless response to one empty item', (response) => {
    expect(normalizeJsonApiResponse(response)).toEqual([{}]);
  });
});

describe('Planning Center pagination helper', () => {
  it('follows next links when Return All is enabled', async () => {
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

  it('does not cap Return All results by Limit', async () => {
    const context = fakeContext({
      helpers: {
        httpRequest: vi
          .fn()
          .mockResolvedValueOnce({
            data: [
              { id: '1', type: 'Person', attributes: { name: 'One' } },
              { id: '2', type: 'Person', attributes: { name: 'Two' } },
            ],
            links: { next: 'https://api.example.test/people/v2/people?page=2' },
          })
          .mockResolvedValueOnce({
            data: [{ id: '3', type: 'Person', attributes: { name: 'Three' } }],
            links: { next: null },
          }),
      },
    });

    const results = await collectPaginatedPlanningCenterResults.call(
      context,
      { method: 'GET', path: '/people/v2/people' },
      { returnAll: true, limit: 2 },
    );

    expect(results.map((item) => item.id)).toEqual(['1', '2', '3']);
    expect(context.helpers.httpRequest).toHaveBeenCalledTimes(2);
  });

  it('splits limited requests into Planning Center page sizes of 100 or less', async () => {
    const firstPage = Array.from({ length: 100 }, (_, index) => ({
      id: String(index + 1),
      type: 'Person',
      attributes: { name: `Person ${index + 1}` },
    }));
    const secondPage = Array.from({ length: 80 }, (_, index) => ({
      id: String(index + 101),
      type: 'Person',
      attributes: { name: `Person ${index + 101}` },
    }));
    const context = fakeContext({
      helpers: {
        httpRequest: vi
          .fn()
          .mockResolvedValueOnce({
            data: firstPage,
            links: { next: 'https://api.example.test/people/v2/people?offset=100&per_page=100' },
          })
          .mockResolvedValueOnce({
            data: secondPage,
            links: { next: null },
          }),
      },
    });

    const results = await collectPaginatedPlanningCenterResults.call(
      context,
      { method: 'GET', path: '/people/v2/people' },
      { returnAll: false, limit: 180 },
    );

    expect(results).toHaveLength(180);
    expect(context.helpers.httpRequest).toHaveBeenCalledTimes(2);
    expect(context.helpers.httpRequest).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        qs: { per_page: 100 },
      }),
    );
    expect(context.helpers.httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        url: 'https://api.example.test/people/v2/people?offset=100&per_page=80',
        qs: undefined,
      }),
    );
  });
});

describe('Planning Center resource locator helper', () => {
  it('extracts IDs from locator selections and primitive values', () => {
    expect(extractResourceLocatorId({ __rl: true, mode: 'list', value: '123' })).toBe('123');
    expect(extractResourceLocatorId({ __rl: true, mode: 'id', value: 456 })).toBe('456');
    expect(extractResourceLocatorId('789')).toBe('789');
    expect(extractResourceLocatorId(101)).toBe('101');
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
