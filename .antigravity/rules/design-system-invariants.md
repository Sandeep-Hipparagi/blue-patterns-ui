# Design System Architectural Invariants & Subagent Rules

> **Applicability:** All Antigravity subagents and automated processes operating within `Blue-Patterns-UI`.  
> **Enforcement Level:** Strict / Zero-Tolerance.

---

## Rule 1: Automated Verification Gate
Before declaring any task, feature, or bug fix complete:
1. You **MUST** execute `pnpm typecheck` across the affected workspace packages.
2. You **MUST** execute `pnpm test` to run Vitest unit and accessibility tests.
3. If test failures or type errors occur, resolve them immediately. Never bypass tests with `@ts-ignore`, `eslint-disable`, or dummy assertions.

## Rule 2: Contract-First Architecture & No Hallucinated Props
1. **Always read `.doc.mjs` first:** Before generating or editing code that imports, extends, or alters a component, inspect its co-located `{ComponentName}.doc.mjs` contract.
2. **Never invent props:** Do not invent non-existent props or arbitrary attributes. Adhere strictly to the defined schema:
   - `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
   - `variant`: `'solid' | 'outline' | 'ghost' | 'soft'`
   - `tone`: `'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'`
   - `motion`: `'none' | 'subtle' | 'standard' | 'expressive'`
3. **Synchronize `.doc.mjs`:** Whenever modifying a component's TypeScript props or API, you must immediately update `{ComponentName}.doc.mjs` with matching types, descriptions, and code examples.

## Rule 3: Zero-Runtime-CSS & Zero Build Plugin Guarantees
1. Downstream consumers must never be required to install Babel plugins, PostCSS configurations, or bundler transforms to use `Blue-Patterns-UI`.
2. All CSS must be pre-compiled into static `.css` files (`dist/index.css`) distributed with each package.
3. Never introduce runtime CSS-in-JS libraries (Emotion, styled-components) or runtime class compilers (Tailwind runtime).
4. Direct inline styles (`style={{ ... }}`) are prohibited except for purely dynamic coordinate-based measurements (such as virtualized list offsets or drag positions).

## Rule 4: Mandatory CSS Tokenization
1. Hardcoded color hexes (`#ffffff`, `#000000`), fixed pixel paddings (`padding: 16px`), or raw durations (`transition: 200ms`) are strictly forbidden.
2. Every value must reference standard CSS custom properties:
   - Colors: `var(--color-[intent]-[step])`
   - Spacing: `var(--spacing-[scale])`
   - Border Radius: `var(--radius-[scale])`
   - Motion: `var(--motion-duration-[preset])`, `var(--motion-easing-[preset])`
   - Typography: `var(--typography-font-[family])`, `var(--typography-size-[scale])`

## Rule 5: Reduced-Motion Protection
1. Any transition, animation, or keyframe MUST be enclosed in `@media (prefers-reduced-motion: no-preference)`.
2. When `prefers-reduced-motion: reduce` is detected or when `motion="none"` is passed, animations must instantly snap to the finished state without perceptible delay.

## Rule 6: Absolute Accessibility (a11y) Compliance
1. All interactive elements must pass `axe-core` accessibility checks with zero violations.
2. Icon-only buttons or controls must provide an accessible name via `aria-label` or `aria-labelledby`.
3. Support full keyboard navigation: `Enter` and `Space` for triggers, `ArrowUp`/`ArrowDown`/`Home`/`End` for lists and menus, and `Escape` for dismissal.
