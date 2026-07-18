import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { generatedNodePath, generatedProductConfigs } from './config';
import { buildProductGeneration } from './openapi';
import { renderNode } from './render';
import type { ProductGenerationResult } from './model';

async function writeGeneratedNode(
  configIndex: number,
  result: ProductGenerationResult,
): Promise<void> {
  const config = generatedProductConfigs[configIndex];
  const target = generatedNodePath(config);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderNode(config, result));
  await writeFile(
    `${dirname(target)}/${config.product}.svg`,
    await readFile(`nodes/assets/${config.product}.svg`, 'utf8'),
  );
  console.log(
    `${config.displayName}: ${result.operationCount} operations across ${result.resourceCount} resources`,
  );
}

async function main(): Promise<void> {
  const results: ProductGenerationResult[] = [];
  for (const config of generatedProductConfigs) results.push(await buildProductGeneration(config));

  for (let index = 0; index < generatedProductConfigs.length; index += 1) {
    await writeGeneratedNode(index, results[index]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
