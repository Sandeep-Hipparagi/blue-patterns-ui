// Copyright (c) Blue-Patterns-UI Contributors
// Licensed under the MIT License

/**
 * @file export-studio-repo.mjs
 * Generates the standalone `dist-repos/blue-patterns-studio` repository bundle
 * with pinned dependencies, vercel.json, CI/CD deployment workflows, and documentation.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const targetDir = path.resolve(root, 'dist-repos/blue-patterns-studio');

console.log('🚀 Exporting Blue-Patterns Studio to standalone repository...');
console.log('Target directory:', targetDir);

// 1. Clean & prepare target directory
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// Helper: copy directory recursively
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 2. Copy source, public assets, and pre-built dist from apps/studio
console.log('📁 Copying src/, public/, and pre-built dist/ assets...');
copyDirSync(path.join(root, 'apps/studio/src'), path.join(targetDir, 'src'));
copyDirSync(path.join(root, 'apps/studio/public'), path.join(targetDir, 'public'));
if (fs.existsSync(path.join(root, 'apps/studio/dist'))) {
  copyDirSync(path.join(root, 'apps/studio/dist'), path.join(targetDir, 'dist'));
}
fs.copyFileSync(path.join(root, 'apps/studio/index.html'), path.join(targetDir, 'index.html'));

// 3. Generate standalone package.json with pinned package versions
console.log('📦 Generating standalone package.json...');
const studioPackageJson = {
  name: 'blue-patterns-studio',
  version: '0.1.0',
  description: 'Interactive Token & Motion Customizer, Component Matrix, and Template Registry for Blue-Patterns-UI',
  private: true,
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview',
    typecheck: 'tsc --noEmit',
  },
  dependencies: {
    '@blue-patterns/core': '^0.7.18',
    '@blue-patterns/motion': '^0.7.18',
    '@blue-patterns/charts': '^0.7.18',
    '@blue-patterns/themes': '^0.7.18',
    '@blue-patterns/cli': '^0.7.19',
    '@blue-patterns/mcp': '^0.7.18',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
  },
  devDependencies: {
    '@types/react': '^19.0.0',
    '@types/react-dom': '^19.0.0',
    '@vitejs/plugin-react': '^4.3.4',
    typescript: '^5.7.0',
    vite: '^6.0.0',
  },
  keywords: [
    'blue-patterns',
    'studio',
    'design-system',
    'stylex',
    'zero-runtime-css',
    'react-19',
    'design-tokens',
  ],
  author: 'Blue-Patterns-UI Contributors',
  license: 'MIT',
  homepage: 'https://github.com/Sandeep-Hipparagi/blue-patterns-studio#readme',
  repository: {
    type: 'git',
    url: 'git+https://github.com/Sandeep-Hipparagi/blue-patterns-studio.git',
  },
  bugs: {
    url: 'https://github.com/Sandeep-Hipparagi/blue-patterns-studio/issues',
  },
};
fs.writeFileSync(
  path.join(targetDir, 'package.json'),
  JSON.stringify(studioPackageJson, null, 2) + '\n',
  'utf8',
);

// 4. Generate standalone tsconfig.json
console.log('⚙️ Writing standalone tsconfig.json...');
const studioTsconfig = {
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
    noEmit: true,
    jsx: 'react-jsx',
    strict: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: false,
  },
  include: ['src'],
};
fs.writeFileSync(
  path.join(targetDir, 'tsconfig.json'),
  JSON.stringify(studioTsconfig, null, 2) + '\n',
  'utf8',
);

// 5. Generate standalone vite.config.ts
console.log('⚡ Writing standalone vite.config.ts...');
const studioViteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
`;
fs.writeFileSync(path.join(targetDir, 'vite.config.ts'), studioViteConfig, 'utf8');

// 6. Write vercel.json for SPA deployment and caching
console.log('▲ Writing vercel.json...');
const vercelConfig = {
  buildCommand: 'pnpm build',
  outputDirectory: 'dist',
  framework: 'vite',
  rewrites: [
    {
      source: '/registry.json',
      destination: '/registry.json',
    },
    {
      source: '/(.*)',
      destination: '/index.html',
    },
  ],
  headers: [
    {
      source: '/registry.json',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=86400' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
    {
      source: '/assets/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};
fs.writeFileSync(
  path.join(targetDir, 'vercel.json'),
  JSON.stringify(vercelConfig, null, 2) + '\n',
  'utf8',
);

// 7. Write GitHub Actions deployment workflow
console.log('🤖 Writing .github/workflows/deploy.yml...');
fs.mkdirSync(path.join(targetDir, '.github/workflows'), { recursive: true });
const deployWorkflow = `name: Deploy Studio

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    name: Deploy to GitHub Pages
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Upload GitHub Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
fs.writeFileSync(
  path.join(targetDir, '.github/workflows/deploy.yml'),
  deployWorkflow,
  'utf8',
);

// 8. Write standalone README.md, LICENSE, and CONTRIBUTING.md
console.log('📝 Writing README.md, LICENSE, and CONTRIBUTING.md...');
const studioReadme = `# Blue-Patterns Studio 🎨

> **The Interactive Token & Motion Customizer, Live Component Matrix, and Template Registry for Blue-Patterns-UI**  
> 🌐 **Live App:** [sandeep-hipparagi.github.io/blue-patterns-studio](https://sandeep-hipparagi.github.io/blue-patterns-studio/)  
> 📦 **Registry Endpoint:** [sandeep-hipparagi.github.io/blue-patterns-studio/registry.json](https://sandeep-hipparagi.github.io/blue-patterns-studio/registry.json)  
> 🏛️ **Core Monorepo:** [github.com/Sandeep-Hipparagi/blue-patterns-ui](https://github.com/Sandeep-Hipparagi/blue-patterns-ui)

Blue-Patterns Studio is a 100% dogfooded React 19 application demonstrating the power of zero-runtime CSS, WAAPI spring physics, and CSS custom property tokenization.

---

## 🌟 Modules & Features

### 1. Token & Motion Studio
- **WCAG 2.1 AA Contrast Generator:** Interactive base hue pickers generating 4.5:1+ contrast palettes.
- **Spring Physics Workbench:** Real-time visual spring physics tuner generating WAAPI damped harmonic oscillator keyframes and CSS \`linear()\` curves.
- **Live Preview Canvas:** Card, Form, and Navigation widgets responding instantaneously to CSS token mutations without re-renders.

### 2. Component Matrix
- Comprehensive gallery of all 116+ Blue-Patterns-UI primitives and composite components across all variants, sizes, and tones.
- Density selector (\`compact\`, \`default\`, \`spacious\`).
- WCAG AA contrast score indicators and keyboard focus accessibility tests.

### 3. Agent & CLI Inspector
- Real-time token slot inspector and JSON contract exporter for AI coding agents.
- Interactive prompt generator for Gemini, Claude, and Codex agents adhering to \`AGENTS.md\` invariants.
- AST validator playground powered by \`ds_validate_jsx\`.

### 4. Template Registry
- Official community template catalog (\`ai-chat-workspace\`, \`saas-analytics-dashboard\`, \`enterprise-settings-billing\`, \`kanban-sprint-board\`).
- Machine-readable endpoint: \`/registry.json\`.
- Direct scaffolding via CLI: \`pnpm dlx @blue-patterns/cli template add <template-id>\`.

---

## 🚀 Quickstart

\`\`\`bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Build for production
pnpm build

# Preview build
pnpm preview
\`\`\`

---

## 📜 License

MIT License. Built with pride by the Blue-Patterns-UI Contributors, honoring the open-source architectural foundation of Meta's Astryx.
`;
fs.writeFileSync(path.join(targetDir, 'README.md'), studioReadme, 'utf8');

const licenseContent = `MIT License

Copyright (c) 2026 Blue-Patterns-UI Contributors
Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
fs.writeFileSync(path.join(targetDir, 'LICENSE'), licenseContent, 'utf8');

const contributingContent = `# Contributing to Blue-Patterns Studio

Thank you for contributing to Blue-Patterns Studio!

## Architectural Invariants (Must Follow):
1. **100% Dogfooding:** Use only \`@blue-patterns/*\` components and tokens. Never introduce external UI libraries (Tailwind, Radix, Shadcn, MUI, Framer Motion).
2. **Zero Runtime CSS:** Never use CSS-in-JS style injection. All adjustments must mutate CSS custom properties on the root container.
3. **Strict A11y:** All interactions must pass WCAG 2.1 AA audits with 0 axe-core violations.
4. **Reduced Motion:** Guard all transitions with \`prefers-reduced-motion\`.

## Submitting Pull Requests:
1. Run \`pnpm typecheck\` and \`pnpm build\` before committing.
2. Verify visual regression and axe-core tests.
`;
fs.writeFileSync(path.join(targetDir, 'CONTRIBUTING.md'), contributingContent, 'utf8');

console.log('✅ Blue-Patterns Studio repository successfully exported to:', targetDir);
