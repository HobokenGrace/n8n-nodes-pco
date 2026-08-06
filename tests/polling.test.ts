import { describe, expect, it, vi } from 'vitest';

import {
  canonicalStringify,
  canonicalizeRfc3339,
  pollPlanningCenter,
  type PollingOperation,
} from '../src/runtime/polling';

const operation: PollingOperation = {
  id: 'listItems_createdAt',
  resource: 'Items',
  cursorField: 'created_at',
  cursorSparseFieldSourceName: 'fields[Item]',
  path: '/test/v2/forms/{form_id}/items',
  pathParameters: [{ name: 'formId', sourceName: 'form_id', required: true, type: 'string' }],
  ordinaryQueryFields: [],
  queryOptions: [
    {
      name: 'whereName',
      group: 'filter',
      kind: 'single',
      sourceName: 'where[name]',
    },
    { name: 'include', group: 'include', kind: 'single', sourceName: 'include' },
    {
      name: 'fieldsItem',
      group: 'fields',
      kind: 'single',
      sourceName: 'fields[Item]',
    },
    {
      name: 'fieldsForm',
      group: 'fields',
      kind: 'single',
      sourceName: 'fields[Form]',
    },
  ],
};

function resource(id: string, cursor: string, attributes: Record<string, unknown> = {}) {
  return {
    type: 'Item',
    id,
    attributes: { name: `Item ${id}`, created_at: cursor, ...attributes },
  };
}

function page(data: unknown[], next: string | null = null) {
  return { data, links: { next } };
}

function pollingContext(
  options: {
    mode?: string;
    parameters?: Record<string, unknown>;
    responses?: unknown[];
    staticData?: Record<string, any>;
    timezone?: string;
  } = {},
) {
  const parameters: Record<string, unknown> = {
    resource: 'Items',
    operation: operation.id,
    maxRecordsPerPoll: 100,
    startTime: '',
    [`${operation.id}_formId`]: 'form-1',
    [`${operation.id}_filter`]: {},
    [`${operation.id}_include`]: {},
    [`${operation.id}_fields`]: {},
    ...options.parameters,
  };
  const staticData = options.staticData ?? {};
  const httpRequest = vi.fn();
  for (const response of options.responses ?? []) {
    if (response instanceof Error) httpRequest.mockRejectedValueOnce(response);
    else httpRequest.mockResolvedValueOnce(response);
  }
  const getWorkflowStaticData = vi.fn(() => staticData);
  const getCredentials = vi.fn().mockResolvedValue({
    applicationId: 'app-id',
    secret: 'secret',
    baseUrl: 'https://api.example.test',
  });
  const context: any = {
    getActivationMode: () => 'activate',
    getCredentials,
    getMode: () => options.mode ?? 'trigger',
    getNode: () => ({
      name: 'Planning Center Test Trigger',
      type: 'planningCenterTestTrigger',
      credentials: { planningCenterPatApi: { id: 'credential-1', name: 'PCO' } },
    }),
    getNodeParameter: vi.fn((name: string, fallback?: unknown) =>
      Object.hasOwn(parameters, name) ? parameters[name] : fallback,
    ),
    getTimezone: () => options.timezone ?? 'America/New_York',
    getWorkflow: () => ({ id: 'workflow-1', name: 'Workflow' }),
    getWorkflowSettings: () => ({}),
    getWorkflowStaticData,
    helpers: { httpRequest },
  };
  return { context, getCredentials, getWorkflowStaticData, httpRequest, parameters, staticData };
}

function pollingState(staticData: Record<string, any>) {
  return staticData.planningCenterPollingState;
}

describe('Planning Center polling state and lifecycle', () => {
  it('canonicalizes timestamps and recursively sorted fingerprints while preserving array order', () => {
    expect(canonicalizeRfc3339('2026-01-01T02:00:00+02:00')).toBe('2026-01-01T00:00:00.000Z');
    expect(() => canonicalizeRfc3339('2026-01-01')).toThrow(/RFC 3339.*explicit offset/);
    expect(canonicalStringify({ z: 1, nested: { b: 2, a: 1 }, values: ['b', 'a'] })).toBe(
      '{"nested":{"a":1,"b":2},"values":["b","a"],"z":1}',
    );
  });

  it.each([
    { version: 99 },
    {
      version: 1,
      initialized: true,
      fingerprint: 'fingerprint',
      cursorField: 'created_at',
      watermark: 'not-a-date',
      boundaryIdentities: [],
    },
    {
      version: 1,
      initialized: true,
      fingerprint: 'fingerprint',
      cursorField: 'created_at',
      watermark: '2026-01-01T00:00:00.000Z',
      boundaryIdentities: ['["Item","1"]', '["Item","1"]'],
    },
  ])(
    'fails closed for malformed or unsupported state without requests or mutation',
    async (state) => {
      const staticData = { planningCenterPollingState: structuredClone(state) };
      const { context, getCredentials, httpRequest } = pollingContext({ staticData });

      await expect(pollPlanningCenter.call(context, [operation])).rejects.toThrow(
        /Replace this trigger node.*Start Time/i,
      );
      expect(httpRequest).not.toHaveBeenCalled();
      expect(getCredentials).not.toHaveBeenCalled();
      expect(staticData.planningCenterPollingState).toEqual(state);
    },
  );

  it('baselines newest records on activation and resumes beyond equal-timestamp identities', async () => {
    const boundary = '2026-01-01T00:00:00Z';
    const later = '2026-01-01T00:01:00Z';
    const { context, httpRequest, staticData } = pollingContext({
      responses: [
        page([resource('2', boundary), resource('1', boundary)]),
        page([resource('1', boundary), resource('2', boundary), resource('3', later)]),
      ],
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    expect(pollingState(staticData)).toMatchObject({
      version: 1,
      initialized: true,
      cursorField: 'created_at',
      watermark: '2026-01-01T00:00:00.000Z',
      boundaryIdentities: ['["Item","1"]', '["Item","2"]'],
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '3', created_at: later }) }],
    ]);
    expect(pollingState(staticData).watermark).toBe('2026-01-01T00:01:00.000Z');
    expect(httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        qs: expect.objectContaining({
          order: 'created_at',
          'where[created_at][gte]': '2026-01-01T00:00:00.000Z',
        }),
      }),
    );
  });

  it('continues from persisted state when a scheduled poll uses a fresh context', async () => {
    const boundary = '2026-01-01T00:00:00Z';
    const later = '2026-01-01T00:01:00Z';
    const staticData = {};
    const activation = pollingContext({
      staticData,
      responses: [page([resource('1', boundary)])],
    });

    await expect(pollPlanningCenter.call(activation.context, [operation])).resolves.toBeNull();

    const scheduled = pollingContext({
      staticData,
      responses: [page([resource('1', boundary), resource('2', later)])],
    });
    await expect(pollPlanningCenter.call(scheduled.context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '2' }) }],
    ]);
  });

  it('uses the epoch for an empty baseline so a later-visible earlier resource can emit', async () => {
    const { context, staticData } = pollingContext({
      responses: [page([]), page([resource('1', '2020-01-01T00:00:00Z')])],
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    expect(pollingState(staticData).watermark).toBe('1970-01-01T00:00:00.000Z');
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '1' }) }],
    ]);
  });

  it('collects every equal-timestamp identity when the activation baseline spans pages', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const { context, staticData } = pollingContext({
      responses: [page([resource('1', timestamp)], 'next-page'), page([resource('2', timestamp)])],
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    expect(pollingState(staticData).boundaryIdentities).toEqual(['["Item","1"]', '["Item","2"]']);
  });

  it('accepts an empty inclusive boundary page when the descending page only has older results', async () => {
    const latest = '2026-01-02T00:00:00Z';
    const { context, staticData } = pollingContext({
      responses: [
        page([resource('2', latest), resource('1', '2026-01-01T00:00:00Z')], 'older-page'),
        page([]),
      ],
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    expect(pollingState(staticData)).toMatchObject({
      watermark: '2026-01-02T00:00:00.000Z',
      boundaryIdentities: ['["Item","2"]'],
    });
  });

  it('persists an explicit inclusive Start Time on activation and catches up on scheduled polls', async () => {
    const start = '2026-01-01T02:00:00+02:00';
    const { context, httpRequest, staticData } = pollingContext({
      parameters: { startTime: start, maxRecordsPerPoll: 1 },
      responses: [
        page([resource('1', '2026-01-01T00:00:00Z'), resource('2', '2026-01-01T00:01:00Z')]),
        page([resource('2', '2026-01-01T00:01:00Z')]),
      ],
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    expect(httpRequest).not.toHaveBeenCalled();
    expect(pollingState(staticData).watermark).toBe('2026-01-01T00:00:00.000Z');

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '1' }) }],
    ]);
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '2' }) }],
    ]);
  });

  it('interprets the n8n date-time selector value in the workflow timezone', async () => {
    const { context, httpRequest, staticData } = pollingContext({
      parameters: { startTime: '2026-04-01 00:00:00' },
      timezone: 'America/New_York',
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    expect(httpRequest).not.toHaveBeenCalled();
    expect(pollingState(staticData).watermark).toBe('2026-04-01T04:00:00.000Z');
  });

  it.each(['2026-02-30 00:00:00', '2026-03-08 02:30:00'])(
    'rejects invalid n8n date-time selector value %s before requesting',
    async (startTime) => {
      const { context, httpRequest } = pollingContext({
        parameters: { startTime },
      });

      await expect(pollPlanningCenter.call(context, [operation])).rejects.toThrow(
        /Start Time must be a valid date-time/,
      );
      expect(httpRequest).not.toHaveBeenCalled();
    },
  );

  it('accepts a future Start Time and waits without requesting or emitting', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    const { context, httpRequest } = pollingContext({
      parameters: { startTime: '2026-01-02T00:00:00Z' },
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();
    expect(httpRequest).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('treats manual execution as a non-stateful newest-record sample preview', async () => {
    const { context, getWorkflowStaticData, httpRequest } = pollingContext({
      mode: 'manual',
      parameters: { startTime: '2099-01-01T00:00:00Z' },
      responses: [page([resource('9', '2026-01-01T00:00:00Z')])],
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '9', type: 'Item' }) }],
    ]);
    expect(getWorkflowStaticData).not.toHaveBeenCalled();
    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        qs: expect.objectContaining({ order: '-created_at', per_page: 1 }),
      }),
    );
  });

  it('re-baselines changed result sets with an empty execution and preserves output-only changes', async () => {
    const { context, parameters, staticData } = pollingContext({
      responses: [page([]), page([]), page([])],
    });
    await pollPlanningCenter.call(context, [operation]);

    parameters.maxRecordsPerPoll = 250;
    parameters[`${operation.id}_include`] = { include: [{ value: 'form' }] };
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toBeNull();

    parameters[`${operation.id}_filter`] = { whereName: [{ value: 'Ada' }] };
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([[]]);
    expect(pollingState(staticData).fingerprint).toContain('where[name]');
  });

  it('replays from configured Start Time when a result filter changes', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const { context, parameters } = pollingContext({
      parameters: { startTime: timestamp },
      responses: [page([resource('1', timestamp)]), page([resource('1', timestamp)])],
    });
    await pollPlanningCenter.call(context, [operation]);
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '1' }) }],
    ]);

    parameters[`${operation.id}_filter`] = { whereName: [{ value: 'Ada' }] };
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([[]]);
    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([
      [{ json: expect.objectContaining({ id: '1' }) }],
    ]);
  });

  it('re-baselines when credential identity changes', async () => {
    const { context, getCredentials } = pollingContext({ responses: [page([]), page([])] });
    await pollPlanningCenter.call(context, [operation]);
    getCredentials.mockResolvedValue({
      applicationId: 'different-app',
      secret: 'different-secret',
      baseUrl: 'https://api.example.test',
    });

    await expect(pollPlanningCenter.call(context, [operation])).resolves.toEqual([[]]);
  });

  it('preserves state and polls immediately after reactivation', async () => {
    const sharedStaticData: Record<string, any> = {};
    const first = pollingContext({ staticData: sharedStaticData, responses: [page([]), page([])] });
    await pollPlanningCenter.call(first.context, [operation]);
    await expect(pollPlanningCenter.call(first.context, [operation])).resolves.toBeNull();

    const reactivated = pollingContext({ staticData: sharedStaticData, responses: [page([])] });
    await expect(pollPlanningCenter.call(reactivated.context, [operation])).resolves.toBeNull();
    expect(reactivated.httpRequest).toHaveBeenCalledOnce();
  });
});

describe('Planning Center cursor polling and atomic batches', () => {
  it.each([0, 1001, 1.5, 'invalid'])(
    'rejects invalid batch size %s before requests',
    async (value) => {
      const { context, httpRequest } = pollingContext({
        parameters: { maxRecordsPerPoll: value, startTime: '2026-01-01T00:00:00Z' },
      });
      await expect(pollPlanningCenter.call(context, [operation])).rejects.toThrow(
        /integer.*1.*1000/i,
      );
      expect(httpRequest).not.toHaveBeenCalled();
    },
  );

  it('orders tied resources by type and id, deduplicates overlap, and retains boundary identities', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const { context, staticData } = pollingContext({
      parameters: { startTime: timestamp, maxRecordsPerPoll: 2 },
      responses: [
        page([
          resource('2', timestamp),
          resource('1', timestamp),
          resource('2', timestamp),
          resource('3', timestamp),
        ]),
        page([resource('1', timestamp), resource('2', timestamp), resource('3', timestamp)]),
      ],
    });
    await pollPlanningCenter.call(context, [operation]);

    const first = await pollPlanningCenter.call(context, [operation]);
    expect(first?.[0].map((item) => item.json.id)).toEqual(['1', '2']);
    expect(pollingState(staticData).boundaryIdentities).toEqual(['["Item","1"]', '["Item","2"]']);

    const second = await pollPlanningCenter.call(context, [operation]);
    expect(second?.[0].map((item) => item.json.id)).toEqual(['3']);
    expect(pollingState(staticData).boundaryIdentities).toHaveLength(3);
  });

  it('caps the default batch at 100 and leaves the backlog for the next Poll Time', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const records = Array.from({ length: 101 }, (_, index) =>
      resource(String(index + 1).padStart(3, '0'), timestamp),
    );
    const { context, httpRequest } = pollingContext({
      parameters: { startTime: timestamp },
      responses: [page(records), page(records)],
    });
    await pollPlanningCenter.call(context, [operation]);

    const first = await pollPlanningCenter.call(context, [operation]);
    expect(first?.[0]).toHaveLength(100);
    expect(httpRequest).toHaveBeenCalledTimes(1);

    const second = await pollPlanningCenter.call(context, [operation]);
    expect(second?.[0]).toHaveLength(1);
    expect(httpRequest).toHaveBeenCalledTimes(2);
  });

  it('restarts pages at the greatest cursor boundary and uses offset only for ties', async () => {
    const start = '2026-01-01T00:00:00Z';
    const next = '2026-01-01T00:01:00Z';
    const { context, httpRequest } = pollingContext({
      parameters: { startTime: start, maxRecordsPerPoll: 3 },
      responses: [
        page([resource('1', start), resource('2', next)], 'next-page'),
        page([resource('3', next)]),
      ],
    });
    await pollPlanningCenter.call(context, [operation]);
    const output = await pollPlanningCenter.call(context, [operation]);

    expect(output?.[0].map((item) => item.json.id)).toEqual(['1', '2', '3']);
    expect(httpRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        qs: expect.objectContaining({
          'where[created_at][gte]': '2026-01-01T00:01:00.000Z',
          offset: 1,
        }),
      }),
    );
  });

  it('forces sparse cursor data for validation without widening output and preserves includes', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const { context, httpRequest } = pollingContext({
      parameters: {
        startTime: timestamp,
        [`${operation.id}_include`]: { include: [{ value: 'form' }] },
        [`${operation.id}_fields`]: { fieldsItem: [{ value: 'name' }] },
      },
      responses: [page([resource('1', timestamp)])],
    });
    await pollPlanningCenter.call(context, [operation]);
    const output = await pollPlanningCenter.call(context, [operation]);

    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        qs: expect.objectContaining({
          include: 'form',
          'fields[Item]': 'name,created_at',
        }),
      }),
    );
    expect(output).toEqual([[{ json: { id: '1', type: 'Item', name: 'Item 1' } }]]);
  });

  it('does not force the primary cursor into included-resource sparse fields', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const { context, httpRequest } = pollingContext({
      parameters: {
        startTime: timestamp,
        [`${operation.id}_fields`]: {
          fieldsItem: [{ value: 'name' }],
          fieldsForm: [{ value: 'title' }],
        },
      },
      responses: [page([resource('1', timestamp)])],
    });
    await pollPlanningCenter.call(context, [operation]);
    await pollPlanningCenter.call(context, [operation]);

    expect(httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        qs: expect.objectContaining({
          'fields[Item]': 'name,created_at',
          'fields[Form]': 'title',
        }),
      }),
    );
  });

  it('preserves prior state and emits no partial output when a later page fails', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const { context, staticData } = pollingContext({
      parameters: { startTime: timestamp, maxRecordsPerPoll: 2 },
      responses: [
        page([resource('1', timestamp)], 'next-page'),
        Object.assign(new Error('later page failed'), { statusCode: 400 }),
      ],
    });
    await pollPlanningCenter.call(context, [operation]);
    const before = structuredClone(pollingState(staticData));

    await expect(pollPlanningCenter.call(context, [operation])).rejects.toThrow(
      /later page failed/,
    );
    expect(pollingState(staticData)).toEqual(before);
  });

  it.each([
    Object.assign(new Error('first page failed'), { statusCode: 400 }),
    { links: { next: null } },
  ])('preserves prior state when the first page request or response fails', async (failure) => {
    const timestamp = '2026-01-01T00:00:00Z';
    const { context, staticData } = pollingContext({
      parameters: { startTime: timestamp },
      responses: [failure],
    });
    await pollPlanningCenter.call(context, [operation]);
    const before = structuredClone(pollingState(staticData));

    await expect(pollPlanningCenter.call(context, [operation])).rejects.toThrow();
    expect(pollingState(staticData)).toEqual(before);
  });

  it('preserves prior state when normalization fails after the complete batch is fetched', async () => {
    const timestamp = '2026-01-01T00:00:00Z';
    const attributes: Record<string, unknown> = { created_at: timestamp };
    Object.defineProperty(attributes, 'broken', {
      enumerable: true,
      get: () => {
        throw new Error('normalization failed');
      },
    });
    const { context, staticData } = pollingContext({
      parameters: { startTime: timestamp },
      responses: [page([{ type: 'Item', id: '1', attributes }])],
    });
    await pollPlanningCenter.call(context, [operation]);
    const before = structuredClone(pollingState(staticData));

    await expect(pollPlanningCenter.call(context, [operation])).rejects.toThrow(
      /normalization failed/,
    );
    expect(pollingState(staticData)).toEqual(before);
  });

  it.each([
    { type: '', id: '1', attributes: { created_at: '2026-01-01T00:00:00Z' } },
    { type: 'Item', id: '', attributes: { created_at: '2026-01-01T00:00:00Z' } },
    { type: 'Item', id: '1', attributes: { created_at: 'invalid' } },
  ])('rejects invalid resource identity or cursor without advancing state', async (invalid) => {
    const { context, staticData } = pollingContext({
      parameters: { startTime: '2026-01-01T00:00:00Z' },
      responses: [page([invalid])],
    });
    await pollPlanningCenter.call(context, [operation]);
    const before = structuredClone(pollingState(staticData));

    await expect(pollPlanningCenter.call(context, [operation])).rejects.toThrow();
    expect(pollingState(staticData)).toEqual(before);
  });
});
