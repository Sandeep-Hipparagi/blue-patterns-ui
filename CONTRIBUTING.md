# Contributing to Blue-Patterns-UI

Thank you for your interest in contributing to **Blue-Patterns-UI**! This document provides guidelines for contributors and agents building, testing, and authoring components, themes, and tooling.

---

## 1. Environment & Prerequisites

Ensure your system meets these baseline requirements before running commands:

- **Node.js**: `>= 22.0.0` (LTS recommended)
- **pnpm**: `>= 11.0.0` (pinned via `packageManager`)
- **Playwright**: Chromium binaries installed for visual regression testing

```bash
# Verify versions
node -v
pnpm -v
npx playwright --version

# Install Playwright browser binaries
npx playwright install chromium
```

---

## 2. Architectural Invariants (Non-Negotiable)

1. **Zero Build Plugin & Zero Runtime CSS:**
   - Downstream consumers must only import pre-built `.css` files and typed React 19 components.
   - Never introduce Tailwind, Emotion, styled-components, or require consumer Babel/PostCSS plugins.
2. **Strict CSS Custom Property Tokenization:**
   - Component styles must never use hardcoded hex colors, arbitrary pixel spacings, or raw millisecond transition values. Everything must reference CSS custom properties (`--color-*`, `--spacing-*`, `--radius-*`, `--motion-*`).
3. **Co-located Machine-Readable Contracts:**
   - Every component in `packages/core/src/[ComponentName]` must include `{ComponentName}.doc.mjs` alongside its source code.
4. **Reduced-Motion Compliance:**
   - All animations must be enclosed in `@media (prefers-reduced-motion: no-preference)`.

---

## 3. Adding or Upgrading a Component

Follow the **4-Step Component Builder Skill** (`.antigravity/skills/component-builder/SKILL.md`):

### Step 1: Read Contract & Style Specifications
- Inspect `{ComponentName}.doc.mjs` or draft the initial contract defining prop types, default values, accessibility roles, and variants.
- Identify required CSS tokens from `packages/themes/src/tokens/`.

### Step 2: Implement Typed React 19 + StyleX Code
- Use React 19 conventions (standard `ref` prop, `useId`, `useTransition`).
- Standardize on the uniform prop API:
  - `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
  - `variant`: `'solid' | 'outline' | 'ghost' | 'soft'`
  - `tone`: `'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'`
  - `motion`: `'none' | 'subtle' | 'standard' | 'expressive'`
  - `asChild`: `boolean`
- Ensure strict focus management (`:focus-visible`), keyboard triggers (`Enter`, `Space`, Arrows), and ARIA markup.

### Step 3: Update `.doc.mjs` Documentation
- Document all props, descriptions, default values, and usage examples.
- Include a dense AI summary section for agent parsing.
- Export the component from its local barrel and the package root barrel.

### Step 4: Validate with Tests & Visual Artifacts
- Run unit and `axe-core` accessibility tests.
- Capture light and dark mode Playwright screenshots.

---

## 4. Authoring Themes

Themes are located in `packages/themes/`. To create or update a theme pack:
1. Define the semantic token mappings in `packages/themes/src/packs/[theme-name].ts`.
2. Generate or verify the CSS variables output in `dist/themes/[theme-name].css`.
3. Ensure high-contrast and dark-mode tokens meet WCAG 2.2 AA (minimum 4.5:1 contrast for normal text, 3:1 for large text and interactive components).

---

## 5. Verification Commands

Run these checks before submitting any pull request:

```bash
# Type check all packages
pnpm typecheck

# Run unit tests across all packages
pnpm test

# Run accessibility audits (axe-core)
pnpm test:a11y

# Run Playwright visual regression tests
pnpm test:visual

# Lint and formatting
pnpm lint
pnpm format:check
```

---

## 6. Upstream Attribution

Blue-Patterns-UI builds upon Meta's open-source `meta/astryx`. Whenever pulling changes or updating core primitives:
- Preserve the MIT License notice in `LICENSE`.
- Maintain credit in `NOTICE`.
- Ensure changes maintain backwards compatibility with the upstream Astryx contracts.
