import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import packageJson from '../package.json' with { type: 'json' };

function packagePath(filePath) {
  return filePath.replace(/^package\//, '');
}

function getPackFiles() {
  const output = execFileSync('npm', ['pack', '--json', '--dry-run'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  const [pack] = JSON.parse(output);
  return new Set(pack.files.map((file) => packagePath(file.path)));
}

function walkFiles(root) {
  const files = [];

  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const filePath = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(filePath);
      } else {
        files.push(filePath.split(posix.sep).join('/'));
      }
    }
  }

  walk(root);
  return files;
}

const packFiles = getPackFiles();
const n8nFiles = [...packageJson.n8n.credentials, ...packageJson.n8n.nodes];
const declarationFiles = [packageJson.types, ...n8nFiles.map((file) => file.replace(/\.js$/, '.d.ts'))];
const runtimeFiles = [
  'dist/src/runtime/execute.js',
  'dist/src/runtime/jsonApi.js',
  'dist/src/runtime/pagination.js',
  'dist/src/runtime/request.js',
  'dist/src/runtime/resourceLocator.js',
];
const runtimeDeclarationFiles = runtimeFiles.map((file) => file.replace(/\.js$/, '.d.ts'));
const generatedAssets = walkFiles('nodes/generated')
  .filter((file) => file.endsWith('.svg'))
  .map((file) => `dist/${file}`);

const requiredFiles = [
  'package.json',
  packageJson.main,
  packageJson.types,
  ...n8nFiles,
  ...declarationFiles,
  ...runtimeFiles,
  ...runtimeDeclarationFiles,
  ...generatedAssets,
];

const missingFiles = [...new Set(requiredFiles)].filter((file) => !packFiles.has(file));
const forbiddenFiles = [...packFiles].filter(
  (file) =>
    file.startsWith('src/') ||
    file.startsWith('openapi/') ||
    file.startsWith('tests/') ||
    file.startsWith('nodes/generated/') ||
    file.startsWith('credentials/') ||
    (/\.ts$/.test(file) && !file.endsWith('.d.ts')),
);

if (missingFiles.length > 0 || forbiddenFiles.length > 0) {
  if (missingFiles.length > 0) {
    console.error('npm package is missing required files:');
    for (const file of missingFiles) console.error(`- ${file}`);
  }

  if (forbiddenFiles.length > 0) {
    console.error('npm package includes source or generator inputs that should not be published:');
    for (const file of forbiddenFiles) console.error(`- ${file}`);
  }

  process.exit(1);
}

console.log(`Package inspection passed (${packFiles.size} files).`);
