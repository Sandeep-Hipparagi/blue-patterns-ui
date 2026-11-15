// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, it, expect} from 'vitest';

async function applyTransform(source, path = 'test.tsx') {
  const {default: transform} = await import('../migrate-authoring-imports.mjs');
  const jscodeshift = (await import('jscodeshift')).default;
  const j = jscodeshift.withParser('tsx');
  const api = {jscodeshift: j, stats: () => {}, report: () => {}};
  const result = transform({source, path}, api);
  return result ?? source;
}

const OLD_SOURCES = [
  '@blue-patterns/cli/config',
  '@blue-patterns/cli/doc',
  '@blue-patterns/cli/integration',
  '@blue-patterns/cli/template',
  '@blue-patterns/cli/codemod',
  '@blue-patterns/core/authoring',
  '@blue-patterns/core/config',
];

describe('migrate-authoring-imports', () => {
  for (const src of OLD_SOURCES) {
    it(`repoints a type import from ${src}`, async () => {
      const input = `import type {AstryxConfig} from '${src}';\nconst c: AstryxConfig = {};\n`;
      const output = await applyTransform(input);
      expect(output).toContain("from '@blue-patterns/cli/authoring'");
      expect(output).not.toContain(src);
      // Bindings are untouched — only the specifier moved.
      expect(output).toContain('AstryxConfig');
    });
  }

  it('repoints a value import and preserves the bindings', async () => {
    const input = `import {parseConfig} from '@blue-patterns/cli/config';\n`;
    const output = await applyTransform(input);
    expect(output).toContain(
      "import {parseConfig} from '@blue-patterns/cli/authoring'",
    );
  });

  it('repoints a re-export', async () => {
    const input = `export {AstryxIntegration} from '@blue-patterns/cli/integration';\n`;
    const output = await applyTransform(input);
    expect(output).toContain("from '@blue-patterns/cli/authoring'");
    expect(output).not.toContain('@blue-patterns/cli/integration');
  });

  it('repoints a dynamic import', async () => {
    const input = `const m = await import('@blue-patterns/cli/codemod');\n`;
    const output = await applyTransform(input);
    expect(output).toContain("import('@blue-patterns/cli/authoring')");
  });

  it('repoints a TS import-type', async () => {
    const input = `type C = import('@blue-patterns/core/config').AstryxConfig;\n`;
    const output = await applyTransform(input);
    expect(output).toContain("import('@blue-patterns/cli/authoring').AstryxConfig");
  });

  it('leaves unrelated imports untouched', async () => {
    const input = `import {Button} from '@blue-patterns/core';\nimport {parseDoc} from '@blue-patterns/cli/doc';\n`;
    const output = await applyTransform(input);
    expect(output).toContain("from '@blue-patterns/core'");
    expect(output).toContain("from '@blue-patterns/cli/authoring'");
    expect(output).not.toContain('@blue-patterns/cli/doc');
  });

  it('is a no-op when there is no authoring import', async () => {
    const input = `import {Button} from '@blue-patterns/core';\n`;
    const {default: transform} = await import('../migrate-authoring-imports.mjs');
    const jscodeshift = (await import('jscodeshift')).default;
    const j = jscodeshift.withParser('tsx');
    const api = {jscodeshift: j, stats: () => {}, report: () => {}};
    const result = transform({source: input, path: 'test.tsx'}, api);
    expect(result).toBeUndefined();
  });
});
