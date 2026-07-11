import { rm } from 'node:fs/promises';

await rm('dist', { force: true, recursive: true });
await rm('coverage', { force: true, recursive: true });
