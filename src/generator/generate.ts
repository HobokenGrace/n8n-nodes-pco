import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { generatedNodePath, generatedProductConfigs, generatedTriggerNodePath } from './config';
import { buildProductGeneration } from './openapi';
import { renderNode, renderTriggerNode } from './render';
import type { ProductGenerationResult } from './model';

async function writeGeneratedNode(
  configIndex: number,
  result: ProductGenerationResult,
): Promise<void> {
  const config = generatedProductConfigs[configIndex];
  const target = generatedNodePath(config);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderNode(config, result));
  const triggerTarget = generatedTriggerNodePath(config);
  const triggerSource = renderTriggerNode(config, result);
  if (triggerSource) await writeFile(triggerTarget, triggerSource);
  else await rm(triggerTarget, { force: true });
  await writeFile(
    `${dirname(target)}/${config.product}.svg`,
    await readFile(`nodes/assets/${config.product}.svg`, 'utf8'),
  );
  console.log(
    `${config.displayName}: ${result.operationCount} actions and ${result.pollingOperationCount} polling events`,
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
