import { spawnSync } from 'node:child_process';
import packageJson from '../package.json' with { type: 'json' };

const tag = `v${packageJson.version}`;
const args = ['release', 'create', tag, '--draft', '--verify-tag', '--generate-notes'];

const result = spawnSync('gh', args, { stdio: 'inherit' });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
