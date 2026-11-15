// Copyright (c) Meta Platforms, Inc. and affiliates.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {describe, expect, it} from 'vitest';
import {
  bareComponentPaths,
  planBuild,
} from './build-packages-and-storybook.mjs';

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

const script = [
  'pnpm -F @blue-patterns/build build',
  'pnpm -F @blue-patterns/core build',
  'pnpm -F @blue-patterns/charts build',
  'pnpm -F @blue-patterns/vega build',
  'pnpm -F @blue-patterns/theme-neutral build',
  'pnpm bundle:cli-themes',
  'pnpm -F @blue-patterns/theme-late build',
].join(' && ');
const deps = {
  '@blue-patterns/core': ['@blue-patterns/build'],
  '@blue-patterns/charts': ['@blue-patterns/core'],
  '@blue-patterns/theme-neutral': ['@blue-patterns/core'],
  '@blue-patterns/theme-late': ['@blue-patterns/core'],
};
const plan = planBuild(script, name => deps[name] ?? []);
const labels = plan.map(step => step.label);
const after = label => plan[labels.indexOf(label)].after.map(i => labels[i]);

describe('build-packages-and-storybook plan', () => {
  it('runs every step of the root build, each once, plus Storybook', () => {
    expect(plan.map(step => step.command)).toEqual([
      ...script.split(' && '),
      'pnpm -F @blue-patterns/storybook build',
    ]);
  });

  it('starts a package build after the workspace packages it depends on', () => {
    expect(after('@blue-patterns/build')).toEqual([]);
    expect(after('@blue-patterns/vega')).toEqual([]);
    expect(after('@blue-patterns/charts')).toEqual(['@blue-patterns/core']);
    expect(after('@blue-patterns/theme-neutral')).toEqual([
      '@blue-patterns/core',
    ]);
  });

  it('keeps any other step a barrier in chain order', () => {
    expect(after('pnpm bundle:cli-themes')).toEqual(labels.slice(0, 5));
    expect(after('@blue-patterns/theme-late')).toEqual([
      '@blue-patterns/core',
      'pnpm bundle:cli-themes',
    ]);
  });

  it('builds Storybook after the packages its index records', () => {
    expect(after('storybook')).toEqual([
      '@blue-patterns/build',
      '@blue-patterns/charts',
      '@blue-patterns/vega',
    ]);
  });

  it('refuses a root build that no longer builds one of those packages', () => {
    expect(() =>
      planBuild(
        'pnpm -F @blue-patterns/build build && pnpm -F @blue-patterns/vega build',
        () => [],
      ),
    ).toThrow(/@blue-patterns\/charts/);
  });

  it('plans the real root build', () => {
    const {scripts} = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'),
    );
    const real = planBuild(scripts.build, () => []);
    expect(real.length).toBe(scripts.build.split('&&').length + 1);
  });
});

describe('bare component paths', () => {
  it('names stories indexed before their package was built', () => {
    expect(
      bareComponentPaths({
        entries: {
          a: {id: 'a', componentPath: '@blue-patterns/charts'},
          b: {
            id: 'b',
            componentPath: './node_modules/@blue-patterns/charts/dist/index.js',
          },
          c: {
            id: 'c',
            componentPath: '../../packages/core/src/Button/index.ts',
          },
          d: {id: 'd'},
        },
      }),
    ).toEqual(['a: @blue-patterns/charts']);
  });
});
