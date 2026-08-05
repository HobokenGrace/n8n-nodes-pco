import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  generatedNodePath,
  generatedProductConfigs,
  generatedTriggerNodePath,
} from './config';
import { buildProductGeneration } from './openapi';
import { renderNode, renderTriggerNode } from './render';

async function existingSource(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, 'utf8');
  } catch (error: any) {
    if (error?.code === 'ENOENT') return undefined;
    throw error;
  }
}

async function main(): Promise<void> {
  const mismatches: string[] = [];
  const tempDir = await mkdtemp(join(tmpdir(), 'pco-generated-'));

  try {
    for (const config of generatedProductConfigs) {
      const result = await buildProductGeneration(config);
      const current = await existingSource(generatedNodePath(config));
      const expected = renderNode(config, result);
      if (current !== expected) {
        mismatches.push(generatedNodePath(config));
      }
      const triggerPath = generatedTriggerNodePath(config);
      if ((await existingSource(triggerPath)) !== renderTriggerNode(config, result)) {
        mismatches.push(triggerPath);
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
