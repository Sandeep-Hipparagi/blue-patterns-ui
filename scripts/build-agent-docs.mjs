#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

console.log('Building agent documentation & llms.txt...');

const rootDir = process.cwd();
const packages = [
  { name: '@blue-patterns/core', dir: 'packages/core/src' },
  { name: '@blue-patterns/charts', dir: 'packages/charts/src' },
  { name: '@blue-patterns/motion', dir: 'packages/motion/src' },
];

const components = [];

for (const { name: pkg, dir } of packages) {
  const fullDir = path.resolve(rootDir, dir);
  if (!fs.existsSync(fullDir)) continue;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const docFile = path.join(fullDir, entry.name, `${entry.name}.doc.mjs`);
      if (fs.existsSync(docFile)) {
        const content = fs.readFileSync(docFile, 'utf8');
        const descMatch = content.match(/description:\s*['"`](.*?)['"`]/);
        components.push({
          name: entry.name,
          pkg,
          description: descMatch ? descMatch[1] : 'Component',
          docPath: path.relative(rootDir, docFile).replace(/\\/g, '/'),
        });
      }
    } else if (entry.name.endsWith('.doc.mjs')) {
      const compName = entry.name.replace('.doc.mjs', '');
      const content = fs.readFileSync(path.join(fullDir, entry.name), 'utf8');
      const descMatch = content.match(/description:\s*['"`](.*?)['"`]/);
      components.push({
        name: compName,
        pkg,
        description: descMatch ? descMatch[1] : 'Component',
        docPath: path.relative(rootDir, path.join(fullDir, entry.name)).replace(/\\/g, '/'),
      });
    }
  }
}

// Sort components alphabetically
components.sort((a, b) => a.name.localeCompare(b.name));

const llmsTxtContent = `# Blue-Patterns-UI (Agent LLM Specification)
> Low-latency, zero-runtime-CSS, tokenized React 19 design system.
> Built on Meta's Astryx foundation with rea reverse-engineering validation.

## Architectural Invariants
1. Zero Runtime CSS: Only import pre-built static CSS stylesheets and typed React 19 ESM components.
2. Strict CSS Tokenization: NEVER use hardcoded hex/RGB or raw pixel spacings. Use var(--color-*), var(--spacing-*), var(--radius-*), var(--motion-*).
3. Reduced Motion: Every animation is guarded by @media (prefers-reduced-motion: no-preference) and defaults to 0ms/none.
4. Co-located Contracts: Every component directory contains an authoritative .doc.mjs contract.

## Monorepo Packages
- @blue-patterns/core: Core React 19 primitive & composite UI components
- @blue-patterns/motion: Zero-runtime WAAPI spring physics & micro-interactions (Presence, Collapse, SharedLayoutIndicator, StaggerGroup)
- @blue-patterns/charts: Production SVG/Canvas data visualization (Sparkline, BarChart, LineChart, DonutChart)
- @blue-patterns/themes: 8 ready-to-import theme packs with modern CSS light-dark() variables
- @blue-patterns/mcp: Deterministic Model Context Protocol server exposing ds_search, ds_contract, ds_validate_jsx, ds_swizzle
- @blue-patterns/cli: Developer and AI CLI for scaffolding, inspection, and swizzling
- @blue-patterns/build: Esbuild/StyleX zero-plugin static CSS distribution toolchain

## Standard Uniform Props API
- size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- variant: 'solid' | 'outline' | 'ghost' | 'soft' (default: 'solid')
- tone: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info' (default: 'primary')
- motion: 'none' | 'subtle' | 'spring' (default: 'spring')
- asChild: boolean (slot-based prop composition onto custom child)

## 8 Ready-to-Import Theme CSS Packs
1. @blue-patterns/themes/theme-default.css: Balanced neutral baseline
2. @blue-patterns/themes/theme-obsidian.css: High-contrast developer dark-first palette
3. @blue-patterns/themes/theme-editorial.css: Warm paper surfaces + serif typography
4. @blue-patterns/themes/theme-enterprise.css: High-density compact spacing for SaaS
5. @blue-patterns/themes/theme-glass.css: Translucent elevated surfaces with backdrop blur
6. @blue-patterns/themes/theme-forest.css: Organic deep-green & warm sand tokens
7. @blue-patterns/themes/theme-cobalt.css: Crisp fintech blue & slate hierarchy
8. @blue-patterns/themes/theme-high-contrast.css: WCAG AAA 7:1+ contrast enforcement

## Component Index (${components.length} components)
${components.map((c) => `- **${c.name}** (\`${c.pkg}\`): ${c.description} [${c.docPath}]`).join('\n')}
`;

fs.writeFileSync(path.join(rootDir, 'llms.txt'), llmsTxtContent, 'utf8');
console.log(`Generated root llms.txt with ${components.length} indexed components.`);

// Generate docs/COMPONENT_INDEX.md
const compIndexContent = `# Component Reference Index

Total Components: ${components.length}

| Component | Package | Description | Contract |
|---|---|---|---|
${components.map((c) => `| **${c.name}** | \`${c.pkg}\` | ${c.description} | [\`.doc.mjs\`](../${c.docPath}) |`).join('\n')}
`;

fs.mkdirSync(path.join(rootDir, 'docs'), { recursive: true });
fs.writeFileSync(path.join(rootDir, 'docs/COMPONENT_INDEX.md'), compIndexContent, 'utf8');
console.log('Generated docs/COMPONENT_INDEX.md.');
