import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { productConfigs, snapshotPath } from './config';

async function main(): Promise<void> {
  for (const config of productConfigs) {
    const response = await fetch(config.sourceUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': '@hobokengrace/n8n-nodes-pco snapshot refresh',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${config.sourceUrl}: ${response.status} ${response.statusText}`);
    }

    const target = snapshotPath(config);
    await mkdir(dirname(target), { recursive: true });
    const json = await response.json();
    await writeFile(target, `${JSON.stringify(json, null, 2)}\n`);
    console.log(`Wrote ${target}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
