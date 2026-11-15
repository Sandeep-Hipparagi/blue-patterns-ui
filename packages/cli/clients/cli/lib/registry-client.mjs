// Copyright (c) Blue-Patterns-UI Contributors
// Licensed under the MIT License

/**
 * @file registry-client.mjs — Client for fetching and scaffolding templates
 * from the Blue-Patterns-UI Template Registry.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import ts from 'typescript';

export const DEFAULT_REMOTE_REGISTRY =
  'https://raw.githubusercontent.com/Sandeep-Hipparagi/blue-patterns-studio/main/public/registry.json';

/**
 * AST Validation for JSX/TSX conforming to Blue-Patterns-UI design system invariants.
 * Checks for hardcoded hex colors, legacy namespaces, and untokenized inline pixel styling.
 *
 * @param {string} tsxCode
 * @returns {{ valid: boolean, issues: Array<{ type: string, message: string, line?: number, column?: number }>, summary: string }}
 */
export function dsValidateJsx(tsxCode) {
  const issues = [];
  const sourceFile = ts.createSourceFile(
    'input.tsx',
    tsxCode,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  // 1. Check for raw hex colors in code text
  const hexColorRegex = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
  let match;
  while ((match = hexColorRegex.exec(tsxCode)) !== null) {
    const pos = sourceFile.getLineAndCharacterOfPosition(match.index);
    issues.push({
      type: 'hardcoded_color',
      message: `Hardcoded hex color '${match[0]}' detected. Use CSS custom property token like 'var(--color-primary-base)'.`,
      line: pos.line + 1,
      column: pos.character + 1,
    });
  }

  // 2. Check imports & JSX Elements AST
  function visit(node) {
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier.getText(sourceFile).replace(/['"]/g, '');
      if (moduleSpecifier.startsWith('@astryxdesign/')) {
        const pos = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        issues.push({
          type: 'hallucinated_component',
          message: `Legacy import '${moduleSpecifier}'. Use re-namespaced '@blue-patterns/${moduleSpecifier.replace('@astryxdesign/', '')}'.`,
          line: pos.line + 1,
          column: pos.character + 1,
        });
      }
    }

    if (ts.isJsxAttribute(node)) {
      const attrName = node.name.getText(sourceFile);
      if (attrName === 'style' && node.initializer) {
        const text = node.initializer.getText(sourceFile);
        if (/px\b/.test(text) && !/var\(--spacing-/.test(text)) {
          const pos = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
          issues.push({
            type: 'untokenized_style',
            message: `Inline hardcoded pixel value detected in style attribute. Use design tokens like 'var(--spacing-*)'.`,
            line: pos.line + 1,
            column: pos.character + 1,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return {
    valid: issues.length === 0,
    issues,
    summary:
      issues.length === 0
        ? 'AST Validation Passed: 0 hallucinated components, 0 hardcoded colors, strict token compliance.'
        : `AST Validation Failed: ${issues.length} issue(s) detected.`,
  };
}

/**
 * Load registry data from a file path or URL.
 * @param {string} source
 * @returns {Promise<any>}
 */
async function loadRegistryFromSource(source) {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    try {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      throw new Error(`Failed to fetch registry from remote URL '${source}': ${err.message}`);
    }
  }

  const resolved = path.isAbsolute(source) ? source : path.resolve(process.cwd(), source);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Registry file not found at path: ${resolved}`);
  }
  const content = fs.readFileSync(resolved, 'utf8');
  return JSON.parse(content);
}

/**
 * Resolve the registry JSON using fallback priority:
 * 1. Explicit option passed via CLI (--registry)
 * 2. BLUEPATTERNS_REGISTRY_URL environment variable
 * 3. Local monorepo apps/studio/public/registry.json
 * 4. Remote GitHub raw URL
 *
 * @param {string} [customSource]
 * @returns {Promise<{ version: string, templates: Array<any>, themes?: Array<any> }>}
 */
export async function resolveRegistry(customSource) {
  // 1. Explicit option passed via CLI --registry
  if (customSource) {
    return loadRegistryFromSource(customSource);
  }

  // 2. BLUEPATTERNS_REGISTRY_URL environment variable
  if (process.env.BLUEPATTERNS_REGISTRY_URL) {
    try {
      return await loadRegistryFromSource(process.env.BLUEPATTERNS_REGISTRY_URL);
    } catch (err) {
      // If env var fails, fall through to local/remote
    }
  }

  // 3. Monorepo local fallback
  const localCandidates = [
    path.resolve(process.cwd(), 'apps/studio/public/registry.json'),
    path.resolve(process.cwd(), '../../apps/studio/public/registry.json'),
    path.resolve(process.cwd(), '../../../apps/studio/public/registry.json'),
    new URL('../../../../../apps/studio/public/registry.json', import.meta.url),
  ];

  for (const candidate of localCandidates) {
    try {
      const filePath = candidate instanceof URL ? candidate.pathname.replace(/^\/([A-Z]:)/, '$1') : candidate;
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
      }
    } catch {
      // continue
    }
  }

  // 4. Remote GitHub fallback
  try {
    return await loadRegistryFromSource(DEFAULT_REMOTE_REGISTRY);
  } catch (err) {
    throw new Error(
      `Unable to locate Blue-Patterns registry. Ensure network access to ${DEFAULT_REMOTE_REGISTRY} or pass --registry <file-or-url>.`,
    );
  }
}

/**
 * Look up nearest package.json starting from targetDir up to filesystem root.
 * @param {string} targetDir
 * @returns {{ path: string, content: any } | null}
 */
export function findNearestPackageJson(targetDir) {
  let current = path.resolve(targetDir);
  while (current && current !== path.dirname(current)) {
    const candidate = path.join(current, 'package.json');
    if (fs.existsSync(candidate)) {
      try {
        const raw = fs.readFileSync(candidate, 'utf8');
        return { path: candidate, content: JSON.parse(raw) };
      } catch {
        return null;
      }
    }
    current = path.dirname(current);
  }
  return null;
}

/**
 * Verify required @blue-patterns/* dependencies in target project.
 * @param {string[]} requiredDeps
 * @param {string} targetDir
 * @returns {{ verified: boolean, missing: string[] }}
 */
export function verifyDependencies(requiredDeps, targetDir) {
  const pkg = findNearestPackageJson(targetDir);
  if (!pkg) {
    return { verified: true, missing: [] }; // No package.json found; skip check
  }

  const allInstalled = {
    ...(pkg.content.dependencies || {}),
    ...(pkg.content.devDependencies || {}),
    ...(pkg.content.peerDependencies || {}),
  };

  const missing = requiredDeps.filter(dep => !allInstalled[dep]);
  return {
    verified: missing.length === 0,
    missing,
  };
}

/**
 * Add a template from the registry into the target directory.
 * @param {string} templateId
 * @param {{
 *   dir?: string,
 *   registry?: string,
 *   overwrite?: boolean,
 *   cwd?: string,
 * }} options
 */
export async function addTemplateFromRegistry(templateId, options = {}) {
  const cwd = options.cwd || process.cwd();
  const registry = await resolveRegistry(options.registry);
  const template = (registry.templates || []).find(
    t => t.name === templateId || t.id === templateId,
  );

  if (!template) {
    const available = (registry.templates || []).map(t => t.name || t.id).join(', ');
    throw new Error(
      `Template "${templateId}" not found in registry. Available templates: ${available}`,
    );
  }

  // Check dependencies
  const targetDir = options.dir ? path.resolve(cwd, options.dir) : path.resolve(cwd, 'src/components', template.name);
  const depCheck = verifyDependencies(template.dependencies || [], targetDir);

  const writtenFiles = [];
  const validationResults = [];

  for (const file of template.files || []) {
    let destPath;
    if (options.dir) {
      const explicitDir = path.resolve(cwd, options.dir);
      if (explicitDir.endsWith('.tsx') || explicitDir.endsWith('.ts')) {
        destPath = explicitDir;
      } else if (explicitDir.endsWith(template.name)) {
        destPath = path.join(explicitDir, path.basename(file.path));
      } else {
        destPath = path.join(explicitDir, template.name, path.basename(file.path));
      }
    } else {
      destPath = path.resolve(cwd, file.path);
    }

    if (fs.existsSync(destPath) && !options.overwrite) {
      throw new Error(
        `Target file already exists: ${destPath}. Use --overwrite to overwrite.`,
      );
    }

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, file.content, 'utf8');
    writtenFiles.push(destPath);

    // Validate with dsValidateJsx
    const validation = dsValidateJsx(file.content);
    validationResults.push({ file: destPath, ...validation });
  }

  return {
    template,
    writtenFiles,
    depCheck,
    validationResults,
  };
}
