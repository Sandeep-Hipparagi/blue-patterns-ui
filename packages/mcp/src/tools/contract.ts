import fs from 'node:fs';
import path from 'node:path';

export interface ComponentContract {
  name: string;
  found: boolean;
  package?: string;
  props?: Array<{ name: string; type: string; default?: string; description?: string }>;
  tokens?: string[];
  variants?: string[];
  tones?: string[];
  sizes?: string[];
  denseUsage?: string;
}

export function dsContract(componentNames: string[], rootDir: string = process.cwd()): Record<string, ComponentContract> {
  const result: Record<string, ComponentContract> = {};

  const searchDirs = [
    { pkg: '@blue-patterns/core', base: 'packages/core/src' },
    { pkg: '@blue-patterns/charts', base: 'packages/charts/src' },
    { pkg: '@blue-patterns/motion', base: 'packages/motion/src' },
  ];

  for (const name of componentNames) {
    let found = false;

    for (const { pkg, base } of searchDirs) {
      const candidateDoc = path.resolve(rootDir, base, name, `${name}.doc.mjs`);
      const directDoc = path.resolve(rootDir, base, `${name}.doc.mjs`);

      const targetDoc = fs.existsSync(candidateDoc) ? candidateDoc : fs.existsSync(directDoc) ? directDoc : null;

      if (targetDoc) {
        found = true;
        const content = fs.readFileSync(targetDoc, 'utf8');

        // Extract description
        const descMatch = content.match(/description:\s*['"`](.*?)['"`]/);
        const description = descMatch ? descMatch[1] : '';

        // Extract props roughly from JSDoc or object declaration
        const propMatches = [...content.matchAll(/name:\s*['"`](.*?)['"`],\s*type:\s*['"`](.*?)['"`]/g)];
        const props = propMatches.map((m) => ({
          name: m[1],
          type: m[2],
        }));

        // Default design tokens
        const tokens: string[] = [];
        const tokenMatches = [...content.matchAll(/--[a-z0-9-]+/g)];
        for (const tm of tokenMatches) {
          if (!tokens.includes(tm[0])) tokens.push(tm[0]);
        }

        result[name] = {
          name,
          found: true,
          package: pkg,
          props: props.length > 0 ? props : [
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
            { name: 'variant', type: "'solid' | 'outline' | 'ghost' | 'soft'" },
            { name: 'tone', type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'" },
            { name: 'motion', type: "'none' | 'subtle' | 'spring'" },
          ],
          tokens: tokens.length > 0 ? tokens : ['--color-primary-base', '--spacing-2', '--radius-md'],
          variants: ['solid', 'outline', 'ghost', 'soft'],
          tones: ['primary', 'neutral', 'success', 'warning', 'danger', 'info'],
          sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
          denseUsage: `import { ${name} } from '${pkg}';\n<${name} variant="solid" tone="primary" size="md">Content</${name}>`,
        };
        break;
      }
    }

    if (!found) {
      result[name] = {
        name,
        found: false,
      };
    }
  }

  return result;
}
