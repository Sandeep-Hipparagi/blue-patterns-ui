# @blue-patterns/build

Build plugins for Astryx source builds. In the webpack and Vite setups, its babel, PostCSS, and Vite integrations compile Astryx library and product code with separate class name prefixes, which enables independent CSS layers:

```
reset < astryx-base (library, astryx prefix) < astryx-theme < product (app, x prefix)
```

Under Turbopack, `withAstryx()` and `@blue-patterns/build/next/postcss` compile Astryx the way its prebuilt stylesheets are compiled: the same class names, in `@layer astryx-base`.

## Why?

StyleX generates atomic CSS: same declaration = same class name. Without separate prefixes, library and product classes collide and can't be placed in independent CSS layers, which breaks theme overrides.

In the webpack and Vite setups, `@blue-patterns/build` solves this by:

1. Compiling Astryx library code with `astryx` prefix (`.astryx78zum5`)
2. Compiling product code with default `x` prefix (`.x78zum5`)
3. Placing each group in its own CSS `@layer`
4. Rejecting unsupported StyleX declarations instead of silently omitting them

## Packages

| Export                             | Purpose                                      | Platform                     |
| ---------------------------------- | -------------------------------------------- | ---------------------------- |
| `@blue-patterns/build/babel`        | Babel plugin: splits class prefixes per file | Next.js, any babel pipeline  |
| `@blue-patterns/build/postcss`      | PostCSS plugin: compiles + splits CSS layers | Next.js (webpack)            |
| `@blue-patterns/build/next`         | `withAstryx()`: the Next.js config helper    | Next.js (webpack, Turbopack) |
| `@blue-patterns/build/next/postcss` | PostCSS plugin: `@astryx;`                   | Next.js (Turbopack)          |
| `@blue-patterns/build/vite`         | Vite plugin: wraps unplugin + splits layers  | Vite, Storybook              |

## Install

```bash
npm install -D @blue-patterns/build @stylexjs/babel-plugin @babel/core
```

For Vite, also install:

```bash
npm install -D @stylexjs/unplugin
```

---

## Next.js Setup (Turbopack)

Under Turbopack, the default bundler since Next.js 16, `withAstryx()` compiles the
Astryx modules your app imports from source as the prebuilt stylesheets are compiled,
and `@blue-patterns/build/next/postcss` emits each source-built package's prebuilt
stylesheet from that source: the same rules and selectors, in the same order, inside
`@layer astryx-base`. Installed and workspace-linked packages both work; Astryx needs
no Babel config.

1. `next.config.mjs`, around your config and its own `turbopack.rules`:

   ```js
   import {withAstryx} from '@blue-patterns/build/next';
   export default withAstryx({/* your Next.js config */});
   ```

2. `postcss.config.js`, beside any plugin your app already uses:

   ```js
   module.exports = {plugins: {'@blue-patterns/build/next/postcss': {}}};
   ```

3. Your global stylesheet, with `@astryx;` in place of `astryx.css`, `lab.css`, `charts.css` and `richtext.css` (every installed package with a prebuilt stylesheet builds from source, so import none of them: the build fails on one):

   ```css
   @import '@blue-patterns/core/reset.css';
   @import '@blue-patterns/theme-neutral/theme.css';

   @astryx;
   ```

   Each package's rules start with the `reset, astryx-base, astryx-theme` layer
   order, as `reset.css` and the theme do, so the order holds in any chunk order
   without a line of your own.

Your own Turbopack rules are kept off Astryx source. Your Babel config file is not,
and Babel's `ignore` cannot exclude Astryx: to keep it off, set
`experimental.turbopackUseBuiltinBabel: false` and run `babel-loader` from a
`turbopack.rules` entry, which `withAstryx()` keeps off Astryx source like any rule.

## Next.js Setup (webpack)

These steps run under `next dev --webpack` and `next build --webpack`.

### 1. babel.config.js

```js
const path = require('path');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@blue-patterns/build/babel',
      {
        dev: process.env.NODE_ENV !== 'production',
        runtimeInjection: false,
        propertyValidationMode: 'throw',
        treeshakeCompensation: true,
        enableInlinedConditionalMerge: true,
        aliases: {
          '@blue-patterns/core/*': [
            path.join(__dirname, 'node_modules/@blue-patterns/core/*'),
          ],
          '@blue-patterns/core': [
            path.join(__dirname, 'node_modules/@blue-patterns/core'),
          ],
        },
        unstable_moduleResolution: {type: 'commonJS'},
      },
    ],
  ],
};
```

A custom Babel config turns off Next.js's SWC compiler, and `next/font` needs SWC. Remove `next/font` from your layout (a fresh `create-next-app` layout imports `next/font/google`), or the build fails with `"next/font" requires SWC although Babel is being used`.

### 2. postcss.config.js

```js
const path = require('path');

module.exports = {
  plugins: {
    '@blue-patterns/build/postcss': {
      appDir: 'src',
      babelPlugins: [
        [
          '@stylexjs/babel-plugin',
          {
            dev: process.env.NODE_ENV !== 'production',
            runtimeInjection: false,
            treeshakeCompensation: true,
            enableInlinedConditionalMerge: true,
            aliases: {
              '@blue-patterns/core/*': [
                path.join(__dirname, 'node_modules/@blue-patterns/core/*'),
              ],
              '@blue-patterns/core': [
                path.join(__dirname, 'node_modules/@blue-patterns/core'),
              ],
            },
            unstable_moduleResolution: {type: 'commonJS'},
          },
        ],
      ],
    },
  },
};
```

### 3. next.config.mjs

Or `withAstryx()` from `@blue-patterns/build/next`, which sets both of these for you. Use `withAstryx()` when the app has a swizzled copy with an `astryx-swizzle.json` marker: this manual config does not rebuild the copy when its marker appears or goes.
Either way the work happens in the `webpack` hook, so the build has to run with
`--webpack` — see the note at the top of this section.

```js
const nextConfig = {
  transpilePackages: ['@blue-patterns/core', '@blue-patterns/theme-neutral'],
  webpack: config => {
    // Resolve to source TypeScript instead of dist
    config.resolve.conditionNames = ['source', 'import', 'require', 'default'];
    return config;
  },
};

export default nextConfig;
```

### 4. CSS files

`src/app/layers.css`:

```css
@layer reset, astryx-base, astryx-theme, product;
```

`src/app/globals.css`:

```css
@import './layers.css';
@import '@blue-patterns/core/reset.css';
@import '@blue-patterns/theme-neutral/theme.css';

@stylex;
```

> `layers.css` must be a separate file because webpack hoists `@import` content above inline CSS.

### 5. Browserslist

```json
{
  "browserslist": ["last 1 Chrome version"]
}
```

---

## Vite Setup

```ts
import {astryxStylex} from '@blue-patterns/build/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    ...astryxStylex({
      stylexOptions: {
        dev: process.env.NODE_ENV === 'development',
        runtimeInjection: false,
        propertyValidationMode: 'throw',
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@blue-patterns/core': path.resolve(
        __dirname,
        'node_modules/@blue-patterns/core/src',
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@blue-patterns/core', '@blue-patterns/theme-neutral'],
  },
});
```

---

## How it works

### Babel plugin (`@blue-patterns/build/babel`)

Wraps `@stylexjs/babel-plugin` with two internal instances: one with `classNamePrefix: 'astryx'` for library files, one with default `'x'` for product files. Routes each file to the correct instance based on its path.

Library patterns (configurable):

- `packages/core/`
- `packages/themes/`
- `node_modules/@blue-patterns/`

A swizzled copy is library code too. The Babel, PostCSS, and Vite integrations compile every module under a folder that holds an `astryx-swizzle.json` marker with the library prefix into `@layer astryx-base`, so a theme's component overrides reach the copy as they reach the package component. `astryx swizzle` writes the marker into an output folder it owns (one the copy creates, an empty one, or one it marked before), naming each package the folder's copies came from and its version, such as `{"packages": {"@blue-patterns/core": "0.7.10"}}`. To mark a folder that holds only swizzled copies by hand, add that file to it; the build reads only whether the file is there. Keep the product's own components out of a marked folder. Under webpack, use `withAstryx()` with a marked copy: it makes each app module depend on the marker paths above it, so a dev session or a cached build recompiles a copy when its marker appears or disappears. In another setup that caches transforms, restart the dev server and delete that cache after adding or removing a marker. Turbopack builds do not read the marker yet.

### PostCSS plugin (`@blue-patterns/build/postcss`)

Compiles StyleX from both library and product source files in two separate passes with different prefixes. Wraps the results in named `@layer` blocks:

- Library rules → `@layer astryx-base`
- Product rules → `@layer product`

### Vite plugin (`@blue-patterns/build/vite`)

Wraps `@stylexjs/unplugin` and intercepts the dev CSS endpoint (`/virtual:stylex.css`). Partitions the collected rules by file path and serves split-layer CSS. Production builds write those rules to one cache-safe shared stylesheet and link it from every emitted HTML entry, without cross-loading entry-owned CSS.

Unsupported declarations fail the build by default with StyleX's replacement guidance. Set `propertyValidationMode` explicitly in `stylexOverrides` (modern API) or `stylexOptions` (legacy API) only when a migration needs the upstream `warn` or `silent` behavior.

A production build also checks the StyleX stylesheet for generated custom properties (`--<prefix><hash>`) that it reads but no stylesheet in the build declares, which browsers drop: a `.stylex.ts` export read in a style that is not a `defineVars`/`defineConsts` value, or one whose module never reached the build. It warns, naming the variable and the rule that reads it. Only stylesheets count as declarations, so a property the app sets at runtime (an inline style) is reported too: give it a name outside the StyleX class-name prefixes.

---

## Advanced Options

### Babel plugin

```js
[
  '@blue-patterns/build/babel',
  {
    // Patterns to identify library files (default shown)
    libraryPatterns: [
      'packages/core/',
      'packages/themes/',
      'node_modules/@blue-patterns/',
    ],

    // Class name prefix for library styles (default: 'astryx')
    libraryPrefix: 'astryx',

    // Class name prefix for product styles (default: 'x')
    classNamePrefix: 'x',

    // ... all @stylexjs/babel-plugin options
  },
];
```

### PostCSS plugin

```js
'@blue-patterns/build/postcss': {
  appDir: 'src',           // Your app source directory
  babelPlugins: [...],     // StyleX babel plugin config
  libraryPrefix: 'astryx',   // Prefix for library CSS (default: 'astryx')
  extraInclude: [...],     // Additional glob patterns
  layers: {                // Layer names (defaults shown)
    library: 'astryx-base',
    product: 'product',
  },
}
```

## Related

- [example-nextjs-source](../../apps/example-nextjs-source/): full Next.js source build example
- [`@stylexjs/babel-plugin`](https://github.com/facebook/stylex): the underlying StyleX compiler
