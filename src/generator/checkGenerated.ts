import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { generatedNodePath, generatedProductConfigs } from './config';
import { buildProductGeneration } from './openapi';
import { renderNode } from './render';

async function main(): Promise<void> {
  const mismatches: string[] = [];
  const tempDir = await mkdtemp(join(tmpdir(), 'pco-generated-'));

  try {
    for (const config of generatedProductConfigs) {
      const current = await readFile(generatedNodePath(config), 'utf8');
      const expected = renderNode(config, await buildProductGeneration(config));
      if (current !== expected) {
        mismatches.push(generatedNodePath(config));
      }
    }
  } finally {
    await rm(tempDir, { force: true, recursive: true });
  }

  if (mismatches.length) {
    console.error(`Generated node drift detected:\n${mismatches.join('\n')}`);
    process.exit(1);
  }

  console.log('Generated node source is current.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
