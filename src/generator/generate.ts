import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { generatedNodePath, generatedProductConfigs } from './config';
import { buildProductGeneration } from './openapi';
import { renderNode } from './render';

async function writeGeneratedNode(configIndex: number): Promise<void> {
  const config = generatedProductConfigs[configIndex];
  const result = await buildProductGeneration(config);
  const target = generatedNodePath(config);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderNode(config, result));
  await writeFile(`${dirname(target)}/${config.product}.svg`, await readFile(`nodes/assets/${config.product}.svg`, 'utf8'));
  console.log(`${config.displayName}: ${result.operationCount} operations across ${result.resourceCount} resources`);
}

async function main(): Promise<void> {
  for (let index = 0; index < generatedProductConfigs.length; index += 1) {
    await writeGeneratedNode(index);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
