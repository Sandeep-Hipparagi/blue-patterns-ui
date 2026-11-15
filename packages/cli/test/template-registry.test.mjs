// Copyright (c) Blue-Patterns-UI Contributors
// Licensed under the MIT License

import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { execSync } from 'node:child_process';
import {
  resolveRegistry,
  addTemplateFromRegistry,
  verifyDependencies,
  dsValidateJsx,
} from '../clients/cli/lib/registry-client.mjs';

let tmpDir;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bp-template-test-'));
});

afterEach(() => {
  if (tmpDir && fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

describe('Template Registry Client & AST Validation', () => {
  it('resolves the registry from local monorepo fallback', async () => {
    const registry = await resolveRegistry();
    assert.ok(registry);
    assert.ok(Array.isArray(registry.templates));
    assert.ok(registry.templates.length >= 4);

    const ids = registry.templates.map(t => t.name || t.id);
    assert.ok(ids.includes('ai-chat-workspace'));
    assert.ok(ids.includes('saas-analytics-dashboard'));
    assert.ok(ids.includes('enterprise-settings-billing'));
    assert.ok(ids.includes('kanban-sprint-board'));
  });

  it('validates JSX conforming to zero-runtime and strict token invariants', () => {
    const cleanJsx = `
      import React from 'react';
      import { Button } from '@blue-patterns/core';
      export default function Clean() {
        return <div style={{ color: 'var(--color-primary-base)', padding: 'var(--spacing-4)' }}><Button label="Test" /></div>;
      }
    `;
    const cleanResult = dsValidateJsx(cleanJsx);
    assert.strictEqual(cleanResult.valid, true);
    assert.strictEqual(cleanResult.issues.length, 0);

    const dirtyJsx = `
      import { Button } from '@astryxdesign/core';
      export default function Dirty() {
        return <div style={{ color: '#ff0000', margin: '16px' }}><Button /></div>;
      }
    `;
    const dirtyResult = dsValidateJsx(dirtyJsx);
    assert.strictEqual(dirtyResult.valid, false);
    assert.ok(dirtyResult.issues.length >= 2);
  });

  it('scaffolds ai-chat-workspace into a directory and verifies clean AST', async () => {
    // Create a mock package.json in tmpDir with dependencies
    fs.writeFileSync(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({
        name: 'test-app',
        dependencies: {
          '@blue-patterns/core': '^0.1.0',
          '@blue-patterns/motion': '^0.1.0',
        },
      }),
      'utf8',
    );

    const result = await addTemplateFromRegistry('ai-chat-workspace', {
      dir: tmpDir,
      cwd: tmpDir,
    });

    assert.strictEqual(result.template.name, 'ai-chat-workspace');
    assert.ok(result.writtenFiles.length > 0);
    assert.strictEqual(result.depCheck.verified, true);
    assert.deepStrictEqual(result.depCheck.missing, []);

    const writtenFile = result.writtenFiles[0];
    assert.ok(fs.existsSync(writtenFile));
    const content = fs.readFileSync(writtenFile, 'utf8');
    assert.ok(content.includes('AiChatWorkspaceTemplate'));

    // All validation results must be valid
    assert.ok(result.validationResults.every(v => v.valid));
  });

  it('detects missing dependencies in target project', async () => {
    // Create package.json missing @blue-patterns/motion
    fs.writeFileSync(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({
        name: 'test-app',
        dependencies: {
          '@blue-patterns/core': '^0.1.0',
        },
      }),
      'utf8',
    );

    const check = verifyDependencies(
      ['@blue-patterns/core', '@blue-patterns/motion'],
      tmpDir,
    );
    assert.strictEqual(check.verified, false);
    assert.deepStrictEqual(check.missing, ['@blue-patterns/motion']);
  });
});

describe('CLI Integration: template list and template add', () => {
  it('executes template list and returns registry templates', () => {
    const cliPath = path.resolve('packages/cli/bin/cli.js');
    const output = execSync(`node "${cliPath}" template list`, {
      encoding: 'utf8',
      cwd: process.cwd(),
    });

    assert.ok(output.includes('ai-chat-workspace'));
    assert.ok(output.includes('saas-analytics-dashboard'));
    assert.ok(output.includes('enterprise-settings-billing'));
    assert.ok(output.includes('kanban-sprint-board'));
  });

  it('executes template add via CLI into target directory', () => {
    const cliPath = path.resolve('packages/cli/bin/cli.js');
    const targetFolder = path.join(tmpDir, 'components');

    const output = execSync(
      `node "${cliPath}" template add ai-chat-workspace --dir "${targetFolder}"`,
      {
        encoding: 'utf8',
        cwd: process.cwd(),
      },
    );

    assert.ok(output.includes('Successfully added template "AI Chat Workspace"'));
    assert.ok(output.includes('AST Validation: 0 hardcoded colors'));

    const expectedFile = path.join(targetFolder, 'ai-chat-workspace', 'index.tsx');
    assert.ok(fs.existsSync(expectedFile));
    assert.ok(fs.readFileSync(expectedFile, 'utf8').includes('AiChatWorkspaceTemplate'));
  });

  it('executes template add with --json flag and returns valid machine payload', () => {
    const cliPath = path.resolve('packages/cli/bin/cli.js');
    const targetFolder = path.join(tmpDir, 'json-components');

    const output = execSync(
      `node "${cliPath}" --json template add saas-analytics-dashboard --dir "${targetFolder}"`,
      {
        encoding: 'utf8',
        cwd: process.cwd(),
      },
    );

    const json = JSON.parse(output);
    assert.strictEqual(json.type, 'template.registry.add');
    assert.strictEqual(json.data.template, 'saas-analytics-dashboard');
    assert.strictEqual(json.data.valid, true);
    assert.ok(json.data.files.length > 0);
  });
});
