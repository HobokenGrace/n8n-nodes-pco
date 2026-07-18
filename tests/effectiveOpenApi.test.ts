import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import type { ProductConfig } from '../src/generator/config';
import {
  applyMergePatch,
  canonicalSerialize,
  fingerprintOperation,
  loadEffectiveOpenApi,
} from '../src/generator/effectiveOpenApi';

const config: ProductConfig = {
  product: 'test',
  displayName: 'Test',
  className: 'Test',
  nodeName: 'test',
  sourceUrl: 'https://example.com/openapi.json',
  snapshotDate: '2026-01-01',
  generate: true,
};

const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { force: true, recursive: true })));
});

function document(paths: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths,
  };
}

function operation(
  operationId: string,
  extra: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    operationId,
    responses: { 200: { description: 'OK' } },
    ...extra,
  };
}

async function workspace(vendor = document()): Promise<{
  root: string;
  snapshotFile: string;
  supplementsDirectory: string;
}> {
  const root = await mkdtemp(join(tmpdir(), 'pco-effective-openapi-'));
  roots.push(root);
  const snapshotFile = join(root, 'snapshot.json');
  const supplementsDirectory = join(root, 'supplements');
  await writeFile(snapshotFile, JSON.stringify(vendor));
  await mkdir(supplementsDirectory);
  return { root, snapshotFile, supplementsDirectory };
}

function metadata(
  mode: 'add' | 'override',
  method: string,
  path: string,
  extra: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    mode,
    method,
    path,
    stability: 'unofficial',
    provenance: { source: 'observed', observedAt: '2026-07-17' },
    observedResponse: { status: 200, contentType: 'application/vnd.api+json', hasBody: true },
    ...extra,
  };
}

async function supplement(
  supplementsDirectory: string,
  name: string,
  sidecar: Record<string, unknown>,
  files: Record<string, string | Record<string, unknown>>,
): Promise<void> {
  const directory = join(supplementsDirectory, name);
  await mkdir(directory);
  await writeFile(join(directory, 'metadata.json'), JSON.stringify(sidecar));
  await writeFile(join(directory, 'request.http'), 'GET https://example.com\n');
  for (const [file, contents] of Object.entries(files)) {
    await writeFile(
      join(directory, file),
      typeof contents === 'string' ? contents : JSON.stringify(contents),
    );
  }
  if ((sidecar.observedResponse as { hasBody?: boolean } | undefined)?.hasBody) {
    await writeFile(join(directory, 'response.json'), JSON.stringify({ data: [] }));
  }
}

describe('effective OpenAPI supplements', () => {
  it('discovers complete add packages in deterministic lexical order', async () => {
    const paths = await workspace();
    await supplement(paths.supplementsDirectory, 'z-last', metadata('add', 'GET', '/z-last'), {
      'openapi.json': document({ '/z-last': { get: operation('getZLast') } }),
    });
    await supplement(paths.supplementsDirectory, 'a-first', metadata('add', 'GET', '/a-first'), {
      'openapi.json': document({
        '/a-first': {
          parameters: [{ in: 'query', name: 'inherited', schema: { type: 'string' } }],
          get: operation('getAFirst'),
        },
      }),
    });

    const result = await loadEffectiveOpenApi(config, paths);

    expect(Object.keys(result.paths)).toEqual(['/a-first', '/z-last']);
    expect(result.paths['/a-first'].get.parameters).toEqual([
      { in: 'query', name: 'inherited', schema: { type: 'string' } },
    ]);
    expect(result.paths['/a-first'].get.description).toContain('does not document this endpoint');
  });

  it.each([
    [
      'missing metadata',
      false,
      { 'openapi.json': document({ '/items': { get: operation('getItems') } }) },
    ],
    [
      'multiple operations',
      true,
      {
        'openapi.json': document({
          '/items': { get: operation('getItems'), post: operation('postItems') },
        }),
      },
    ],
    [
      'route mismatch',
      true,
      { 'openapi.json': document({ '/other': { get: operation('getOther') } }) },
    ],
  ])('rejects a malformed add package with %s', async (_label, includeMetadata, files) => {
    const paths = await workspace();
    const directory = join(paths.supplementsDirectory, 'items');
    await mkdir(directory);
    await writeFile(join(directory, 'request.http'), 'GET https://example.com\n');
    await writeFile(join(directory, 'response.json'), '{}');
    if (includeMetadata) {
      await writeFile(
        join(directory, 'metadata.json'),
        JSON.stringify(metadata('add', 'GET', '/items')),
      );
    }
    for (const [file, contents] of Object.entries(files)) {
      await writeFile(join(directory, file), JSON.stringify(contents));
    }

    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(/items/i);
  });

  it('rejects duplicate supplement routes and operation IDs', async () => {
    const paths = await workspace(document({ '/existing': { get: operation('sharedId') } }));
    await supplement(paths.supplementsDirectory, 'first', metadata('add', 'GET', '/items'), {
      'openapi.json': document({ '/items': { get: operation('getItems') } }),
    });
    await supplement(paths.supplementsDirectory, 'second', metadata('add', 'GET', '/items'), {
      'openapi.json': document({ '/items': { get: operation('otherItems') } }),
    });

    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(/duplicate.*GET.*\/items/i);

    await rm(join(paths.supplementsDirectory, 'second'), { recursive: true });
    await supplement(paths.supplementsDirectory, 'duplicate-id', metadata('add', 'GET', '/other'), {
      'openapi.json': document({ '/other': { get: operation('sharedId') } }),
    });
    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(/operationId.*sharedId/i);
  });

  it('merges an addition only while the method and path are absent upstream', async () => {
    const paths = await workspace();
    await supplement(paths.supplementsDirectory, 'items', metadata('add', 'POST', '/items'), {
      'openapi.json': document({ '/items': { post: operation('postItems') } }),
    });

    const result = await loadEffectiveOpenApi(config, paths);
    expect(result.paths['/items'].post.operationId).toBe('postItems');

    await writeFile(
      paths.snapshotFile,
      JSON.stringify(document({ '/items': { post: operation('officialPostItems') } })),
    );
    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(
      /POST \/items.*already exists upstream/i,
    );
  });

  it('serializes and fingerprints normalized operations canonically', () => {
    const left = {
      responses: { 200: { description: 'OK' } },
      parameters: [{ name: 'id', in: 'path' }],
    };
    const right = {
      parameters: [{ in: 'path', name: 'id' }],
      responses: { 200: { description: 'OK' } },
    };

    expect(canonicalSerialize(left)).toBe(canonicalSerialize(right));
    expect(fingerprintOperation(left)).toMatch(/^[a-f0-9]{64}$/);
    expect(fingerprintOperation(left)).toBe(fingerprintOperation(right));
  });

  it('applies RFC 7396 merge patches without merging arrays', () => {
    expect(
      applyMergePatch(
        { keep: true, remove: 'value', nested: { first: 1, second: 2 }, values: [1, 2] },
        { remove: null, nested: { second: 3 }, values: [4] },
      ),
    ).toEqual({ keep: true, nested: { first: 1, second: 3 }, values: [4] });
  });

  it('applies an override only when the expected upstream fingerprint matches', async () => {
    const upstream = operation('getItems', {
      parameters: [{ in: 'query', name: 'page', schema: { type: 'integer' } }],
      summary: 'Original',
    });
    const paths = await workspace(document({ '/items': { get: upstream } }));
    await supplement(
      paths.supplementsDirectory,
      'items',
      metadata('override', 'GET', '/items', {
        expectedUpstreamFingerprint: fingerprintOperation(upstream),
      }),
      { 'patch.json': { summary: 'Corrected' } },
    );

    const result = await loadEffectiveOpenApi(config, paths);
    expect(result.paths['/items'].get.summary).toBe('Corrected');

    await writeFile(
      paths.snapshotFile,
      JSON.stringify(document({ '/items': { get: { ...upstream, deprecated: true } } })),
    );
    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(/fingerprint.*GET \/items/i);
  });

  it('rejects incompatible package files and malformed response evidence', async () => {
    const paths = await workspace();
    await supplement(paths.supplementsDirectory, 'items', metadata('add', 'GET', '/items'), {
      'openapi.json': document({ '/items': { get: operation('getItems') } }),
      'patch.json': { summary: 'Invalid in add mode' },
    });
    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(/patch\.json.*add/i);

    await rm(join(paths.supplementsDirectory, 'items', 'patch.json'));
    await writeFile(join(paths.supplementsDirectory, 'items', 'response.json'), 'not json');
    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(
      /response\.json.*valid JSON/i,
    );

    const noBodyMetadata = metadata('add', 'GET', '/empty', {
      observedResponse: { status: 204, contentType: null, hasBody: false },
    });
    await supplement(paths.supplementsDirectory, 'empty', noBodyMetadata, {
      'openapi.json': document({ '/empty': { get: operation('getEmpty') } }),
      'response.json': '{}',
    });
    await expect(loadEffectiveOpenApi(config, paths)).rejects.toThrow(/response\.json.*bodyless/i);
  });
});
