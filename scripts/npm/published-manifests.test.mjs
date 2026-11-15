// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Published packages name their @blue-patterns packages at this
 * release's version (scripts/npm/published-manifests.mjs).
 */

import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, it} from 'vitest';

import {
  alignmentProblems,
  canaryOnlyNames,
  isPublished,
  PENDING_ALIGNMENT,
  publishedPackages,
  releaseVersions,
} from './published-manifests.mjs';

const ROOT = path.resolve(import.meta.dirname, '../..');
const versions = new Map([
  ['@blue-patterns/core', '0.7.9'],
  ['@blue-patterns/theme-neutral', '0.7.9'],
]);
const roots = [];
afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, {recursive: true, force: true});
  }
});

describe('alignmentProblems', () => {
  it("accepts this release's exact version", () => {
    for (const spec of ['0.7.9']) {
      expect(
        alignmentProblems(
          {
            name: '@blue-patterns/cli',
            peerDependencies: {'@blue-patterns/core': spec},
          },
          versions,
        ),
      ).toEqual([]);
    }
  });

  it('refuses "*", another release and any other range', () => {
    for (const spec of [
      '*',
      '0.7.0',
      '>=0.7.0',
      '^0.7.0',
      '^0.7.9',
      'workspace:*',
    ]) {
      expect(
        alignmentProblems(
          {
            name: '@blue-patterns/theme-neutral',
            peerDependencies: {'@blue-patterns/core': spec},
          },
          versions,
        ),
      ).toEqual([
        `@blue-patterns/theme-neutral: peerDependencies @blue-patterns/core is "${spec}"; name this release's version, "0.7.9"`,
      ]);
    }
  });

  it('checks dependencies and optional dependencies too, but not devDependencies', () => {
    const problems = alignmentProblems(
      {
        name: '@blue-patterns/x',
        dependencies: {'@blue-patterns/core': '*'},
        optionalDependencies: {'@blue-patterns/theme-neutral': '*'},
        devDependencies: {'@blue-patterns/core': '*'},
      },
      versions,
    );
    expect(problems).toHaveLength(2);
    expect(problems[0]).toContain('dependencies @blue-patterns/core');
    expect(problems[1]).toContain(
      'optionalDependencies @blue-patterns/theme-neutral',
    );
  });

  it('refuses an @blue-patterns package that is not in this release, and ignores other scopes', () => {
    expect(
      alignmentProblems(
        {
          name: '@blue-patterns/cli',
          peerDependencies: {'@blue-patterns/gone': '1.0.0', react: '*'},
        },
        versions,
      ),
    ).toEqual([
      '@blue-patterns/cli: peerDependencies names @blue-patterns/gone, which npm does not receive in this release',
    ]);
  });
});

describe('the pending exception', () => {
  it('lets only the CLI\'s optional Core peer stay "*"', () => {
    expect(PENDING_ALIGNMENT).toHaveLength(1);
    expect(
      alignmentProblems(
        {
          name: '@blue-patterns/cli',
          peerDependencies: {'@blue-patterns/core': '*'},
        },
        versions,
      ),
    ).toEqual([]);
  });

  it('does not cover another spec, field, dependency or package', () => {
    const cases = [
      {
        name: '@blue-patterns/cli',
        peerDependencies: {'@blue-patterns/core': '>=0.6.0'},
      },
      {name: '@blue-patterns/cli', dependencies: {'@blue-patterns/core': '*'}},
      {
        name: '@blue-patterns/cli',
        peerDependencies: {'@blue-patterns/theme-neutral': '*'},
      },
      {
        name: '@blue-patterns/theme-neutral',
        peerDependencies: {'@blue-patterns/core': '*'},
      },
    ];
    for (const manifest of cases) {
      expect(alignmentProblems(manifest, versions)).toHaveLength(1);
    }
  });
});

describe('canary-only packages', () => {
  const release = new Map([...versions, ['@blue-patterns/lab', '0.1.9']]);
  const canaryOnly = new Set(['@blue-patterns/lab']);

  it('refuses a stable package that names one', () => {
    expect(
      alignmentProblems(
        {
          name: '@blue-patterns/cli',
          peerDependencies: {'@blue-patterns/lab': '0.1.9'},
        },
        release,
        canaryOnly,
      ),
    ).toEqual([
      '@blue-patterns/cli: peerDependencies names @blue-patterns/lab, which only the canary channel publishes',
    ]);
  });

  it('lets a canary-only package name another at its version', () => {
    expect(
      alignmentProblems(
        {
          name: '@blue-patterns/charts',
          private: true,
          astryx: {canaryOnly: true},
          peerDependencies: {'@blue-patterns/lab': '0.1.9'},
        },
        release,
        canaryOnly,
      ),
    ).toEqual([]);
  });

  it("lists this repository's canary-only packages", () => {
    const names = canaryOnlyNames(ROOT);
    expect(names.has('@blue-patterns/lab')).toBe(true);
    expect(names.has('@blue-patterns/core')).toBe(false);
  });
});

describe('releaseVersions', () => {
  it('counts only packages npm receives, so naming a private one fails', () => {
    const versions = releaseVersions(ROOT);
    expect(versions.get('@blue-patterns/core')).toBeDefined();
    expect(versions.has('@blue-patterns/theme-probe')).toBe(false);
    expect(
      alignmentProblems(
        {
          name: '@blue-patterns/x',
          peerDependencies: {'@blue-patterns/theme-probe': '0.5.0'},
        },
        versions,
      ),
    ).toEqual([
      '@blue-patterns/x: peerDependencies names @blue-patterns/theme-probe, which npm does not receive in this release',
    ]);
  });
});

describe('publishedPackages', () => {
  it("lists the canary loops' packages: public ones and private canary-only ones", () => {
    const byName = new Map(
      publishedPackages(ROOT).map(pkg => [pkg.manifest.name, pkg.dir]),
    );
    expect(byName.get('@blue-patterns/core')).toBe('packages/core');
    expect(byName.get('@blue-patterns/theme-neutral')).toBe(
      'packages/themes/neutral',
    );
    expect(byName.has('@blue-patterns/vega')).toBe(true);
    expect(byName.has('@blue-patterns/theme-probe')).toBe(false);
  });
});

describe('isPublished', () => {
  it('counts public packages and private canary-only ones', () => {
    expect(isPublished({name: '@blue-patterns/core'})).toBe(true);
    expect(
      isPublished({
        name: '@blue-patterns/lab',
        private: true,
        astryx: {canaryOnly: true},
      }),
    ).toBe(true);
    expect(
      isPublished({name: '@blue-patterns/theme-probe', private: true}),
    ).toBe(false);
    expect(isPublished({name: 'astryx-docsite'})).toBe(false);
  });
});

describe('this repository', () => {
  it('publishes every package with aligned @blue-patterns versions', () => {
    const result = spawnSync(
      process.execPath,
      ['scripts/npm/published-manifests.mjs'],
      {cwd: ROOT, encoding: 'utf8'},
    );
    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
  });

  it('gives the CLI one optional peer, Core, kept at "*" until the next minor', () => {
    const cli = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'packages/cli/package.json'), 'utf8'),
    );
    expect(cli.peerDependencies).toEqual({'@blue-patterns/core': '*'});
    expect(cli.peerDependenciesMeta).toEqual({
      '@blue-patterns/core': {optional: true},
    });
  });

  it('fails the check, naming the package, when a manifest drifts', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astryx-manifests-'));
    roots.push(root);
    const write = (dir, manifest) => {
      fs.mkdirSync(path.join(root, dir), {recursive: true});
      fs.writeFileSync(
        path.join(root, dir, 'package.json'),
        JSON.stringify(manifest),
      );
    };
    write('packages/core', {name: '@blue-patterns/core', version: '0.7.9'});
    write('packages/cli', {
      name: '@blue-patterns/cli',
      version: '0.7.9',
      peerDependencies: {'@blue-patterns/theme-neutral': '*'},
    });
    write('packages/themes/neutral', {
      name: '@blue-patterns/theme-neutral',
      version: '0.7.9',
    });
    write('packages/themes/probe', {
      name: '@blue-patterns/theme-probe',
      version: '0.5.0',
      private: true,
    });
    expect(releaseVersions(root).has('@blue-patterns/theme-probe')).toBe(false);
    expect(releaseVersions(root).get('@blue-patterns/theme-neutral')).toBe(
      '0.7.9',
    );
    const result = spawnSync(
      process.execPath,
      [path.join(ROOT, 'scripts/npm/published-manifests.mjs')],
      {cwd: root, encoding: 'utf8'},
    );
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      '@blue-patterns/cli: peerDependencies @blue-patterns/theme-neutral is "*"',
    );
  });
});
