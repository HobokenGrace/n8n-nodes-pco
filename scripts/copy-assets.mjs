import { cp, mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

async function copyGeneratedSvgs(sourceDir) {
  let entries = [];
  try {
    entries = await readdir(sourceDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry.name);
    if (entry.isDirectory()) {
      await copyGeneratedSvgs(sourcePath);
    } else if (entry.name.endsWith('.svg')) {
      const targetPath = join('dist', sourcePath);
      await mkdir(dirname(targetPath), { recursive: true });
      await cp(sourcePath, targetPath);
    }
  }
}

await copyGeneratedSvgs('nodes');
