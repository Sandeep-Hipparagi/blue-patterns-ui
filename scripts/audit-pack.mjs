import { execSync } from 'node:child_process';
import path from 'node:path';

const packages = [
  'packages/core',
  'packages/motion',
  'packages/charts',
  'packages/themes',
  'packages/cli',
  'packages/mcp',
  'packages/build',
];

const results = [];

for (const pkg of packages) {
  try {
    const raw = execSync('npm pack --dry-run --json --ignore-scripts', {
      cwd: path.resolve(pkg),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    const json = JSON.parse(raw);
    const item = json[0];

    // Check for stray forbidden files
    const strayFiles = (item.files || []).filter(f => {
      const p = f.path.toLowerCase();
      return (
        p.includes('__tests__') ||
        p.endsWith('.test.ts') ||
        p.endsWith('.test.tsx') ||
        p.endsWith('.test.js') ||
        p.endsWith('.spec.ts') ||
        p.endsWith('.spec.tsx') ||
        p.endsWith('.spec.js') ||
        p.includes('.git') ||
        p.includes('node_modules') ||
        p.endsWith('.tsbuildinfo')
      );
    });

    results.push({
      package: item.name,
      directory: pkg,
      version: item.version,
      filename: item.filename,
      sizeKb: (item.size / 1024).toFixed(1),
      unpackedKb: (item.unpackedSize / 1024).toFixed(1),
      entryCount: item.entryCount,
      strayFilesCount: strayFiles.length,
      strayFiles: strayFiles.map(f => f.path),
    });
  } catch (err) {
    results.push({
      package: pkg,
      directory: pkg,
      error: err.message,
    });
  }
}

console.log(JSON.stringify(results, null, 2));
