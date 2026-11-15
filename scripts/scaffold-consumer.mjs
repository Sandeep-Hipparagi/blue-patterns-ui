import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';

const consumerDir = path.join(os.tmpdir(), 'bp-external-consumer');
const tarballsDir = path.join(os.tmpdir(), 'bp-tarballs');

if (fs.existsSync(consumerDir)) {
  fs.rmSync(consumerDir, { recursive: true, force: true });
}
fs.mkdirSync(consumerDir, { recursive: true });

const pkgJson = {
  name: 'bp-external-consumer',
  version: '1.0.0',
  private: true,
  type: 'module',
  scripts: {
    build: 'tsc --noEmit && vite build'
  },
  dependencies: {
    react: '^19.0.0',
    'react-dom': '^19.0.0'
  },
  devDependencies: {
    '@types/react': '^19.0.0',
    '@types/react-dom': '^19.0.0',
    '@vitejs/plugin-react': '^4.3.4',
    typescript: '^5.7.2',
    vite: '^6.0.0'
  }
};

fs.writeFileSync(path.join(consumerDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

const tsconfig = {
  compilerOptions: {
    target: 'ES2022',
    useDefineForClassFields: true,
    lib: ['ES2022', 'DOM', 'DOM.Iterable'],
    module: 'ESNext',
    skipLibCheck: true,
    moduleResolution: 'bundler',
    allowImportingTsExtensions: false,
    resolveJsonModule: true,
    isolatedModules: true,
    moduleDetection: 'force',
    noEmit: true,
    jsx: 'react-jsx',
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true
  },
  include: ['src']
};
fs.writeFileSync(path.join(consumerDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
fs.writeFileSync(path.join(consumerDir, 'vite.config.ts'), viteConfig);

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BP Consumer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(consumerDir, 'index.html'), indexHtml);

fs.mkdirSync(path.join(consumerDir, 'src'), { recursive: true });

console.log('Scaffolded consumer app at', consumerDir);

// Now install tarballs
const tarballs = fs.readdirSync(tarballsDir).filter(f => f.endsWith('.tgz')).map(f => path.join(tarballsDir, f));
console.log('Installing tarballs:', tarballs);

console.log('Running npm install in consumerDir...');
execSync('npm install --legacy-peer-deps', { cwd: consumerDir, stdio: 'inherit' });

console.log('Installing local tarballs...');
execSync(`npm install ${tarballs.map(t => `"${t}"`).join(' ')} --legacy-peer-deps`, { cwd: consumerDir, stdio: 'inherit' });

console.log('Consumer app installed successfully!');
