// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Codemod: migrate `declare module "@xds/..."` augmentations to
 * `@blue-patterns/...`
 *
 * The v0.1.0 release moved the public package scope from @xds to
 * @blue-patterns. TypeScript module augmentations (`declare module "@xds/core"
 * { ... }`) reference the package by its string specifier, so they are dead
 * after the scope rename: TypeScript resolves the augmentation against a
 * module that no longer exists.
 *
 * This transform rewrites the augmented module string on `TSModuleDeclaration`
 * nodes whose `id` is a StringLiteral matching a renamed @xds package (or one
 * of its subpaths). It only touches the module path — identifiers *inside* the
 * augmentation (e.g. an augmented interface name) are a separate concern
 * handled by drop-xds-prefix-imports.
 *
 * Ordered AFTER migrate-xds-module-specifiers in the v0.1.0 manifest: it uses
 * the same PACKAGE_RENAMES mapping and cleans up the module-augmentation
 * surface alongside the import/export/require specifier rename.
 */

export const meta = {
  title: 'Migrate declare-module augmentations from @xds/* to @blue-patterns/*',
  description:
    'Rewrites the module specifier on TypeScript `declare module "@xds/..."` ' +
    'augmentations to the @blue-patterns/* packages used by Astryx v0.1.0. ' +
    'Only the augmented module path is changed; identifiers inside the ' +
    'augmentation are left untouched.',
  pr: '#3092',
  fileExtensions: ['.ts', '.d.ts', '.tsx'],
};

const PACKAGE_RENAMES = new Map([
  ['@xds/build', '@blue-patterns/build'],
  ['@xds/cli', '@blue-patterns/cli'],
  ['@xds/core', '@blue-patterns/core'],
  ['@xds/lab', '@blue-patterns/lab'],
  ['@xds/theme-butter', '@blue-patterns/theme-butter'],
  ['@xds/theme-chocolate', '@blue-patterns/theme-chocolate'],
  ['@xds/theme-daily', '@blue-patterns/theme-neutral'],
  ['@xds/theme-gothic', '@blue-patterns/theme-gothic'],
  ['@xds/theme-matcha', '@blue-patterns/theme-matcha'],
  ['@xds/theme-neutral', '@blue-patterns/theme-neutral'],
  ['@xds/theme-stone', '@blue-patterns/theme-stone'],
  ['@xds/theme-y2k', '@blue-patterns/theme-y2k'],
]);

function renamePackageSpecifier(/** @type {any} */ value) {
  if (typeof value !== 'string') return value;
  for (const [from, to] of PACKAGE_RENAMES) {
    if (value === from) return to;
    if (value.startsWith(from + '/')) return to + value.slice(from.length);
  }
  return value;
}

/**
 * @param {import('../../../../authoring/codemod/type').AstryxCodemodFile} file
 * @param {import('../../../../authoring/codemod/type').CodemodTransformApi} api
 * @returns {string | null | undefined}
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  root.find(j.TSModuleDeclaration).forEach((/** @type {any} */ path) => {
    const id = path.node.id;
    // Module augmentations name the module with a string literal id; a
    // `namespace Foo {}` uses an Identifier id, which we ignore.
    if (!id || (id.type !== 'StringLiteral' && id.type !== 'Literal')) return;
    if (typeof id.value !== 'string') return;
    const next = renamePackageSpecifier(id.value);
    if (next === id.value) return;
    id.value = next;
    hasChanges = true;
  });

  return hasChanges ? root.toSource() : undefined;
}
