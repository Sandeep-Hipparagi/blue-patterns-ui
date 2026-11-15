# Blue-Patterns-UI Root Agent Constitution

> **Canonical Agent Directives & Architecture Specification**  
> Built upon Meta's open-source **Astryx** (`meta/astryx`) with **rea** reverse-engineering verification for high-efficiency, low-latency, zero-runtime-CSS design systems.

---

## 1. Prime Directives & Architectural Invariants

Every agent and subagent operating in this repository **must** uphold the following non-negotiable architectural invariants:

1. **Zero Build Plugin & Zero Runtime CSS:**
   - Consumers only import pre-compiled, static `.css` stylesheets and strictly typed React 19 ESM components.
   - **Never** introduce runtime CSS-in-JS libraries (Emotion, styled-components, styled-jsx).
   - **Never** introduce runtime utility class compilers (Tailwind runtime, UnoCSS).
   - **Never** require downstream consumers to install or configure Babel, PostCSS, or bundler plugins.
   - All StyleX / styling logic must compile down to atomic, zero-runtime CSS at package build time.

2. **Strict CSS Custom Property Tokenization:**
   - Component styles must **never** contain raw hex/RGB/HSL values, hardcoded pixel values for spacing/radii, or arbitrary transition durations.
   - All styling declarations must reference CSS custom properties from design tokens:
     - Color: `var(--color-[intent]-[step])` (e.g., `var(--color-primary-base)`, `var(--color-neutral-subtle)`)
     - Spacing: `var(--spacing-[scale])` (e.g., `var(--spacing-1)`, `var(--spacing-4)`)
     - Radii: `var(--radius-[scale])` (e.g., `var(--radius-sm)`, `var(--radius-full)`)
     - Motion: `var(--motion-duration-[preset])`, `var(--motion-easing-[preset])`
     - Typography: `var(--typography-font-[family])`, `var(--typography-size-[scale])`

3. **Co-located Machine-Readable Contracts (`.doc.mjs`):**
   - Every component directory **must** contain an authoritative `.doc.mjs` metadata contract alongside its `.tsx` source, unit tests (`.test.tsx`), and accessibility tests (`__tests__/`).
   - Downstream agents and tooling parse `.doc.mjs` to understand prop schemas, accessibility roles, visual variants, token slots, and usage examples.
   - Component props in `.tsx` and `.doc.mjs` must remain in strict 1:1 synchronization.

4. **Reduced-Motion Invariant:**
   - Every animation, transition, keyframe, or spring physics behavior must be guarded by `@media (prefers-reduced-motion: no-preference)` or provide an instantaneous/reduced state.

5. **Upstream Attribution & Integrity:**
   - Maintain full attribution to Meta's `astryx` under the MIT License in `LICENSE` and `NOTICE`.

---

## 2. Monorepo Topology

```
blue-patterns-ui/
├── packages/
│   ├── core/       # React 19 primitive & composite components with zero-runtime CSS
│   ├── motion/     # Spring Motion Engine, physics transitions, reduced-motion guards
│   ├── charts/     # High-performance, tokenized SVG & Canvas data visualization
│   ├── themes/     # Multi-brand theme packs, semantic CSS tokens, light/dark modes
│   ├── cli/        # Agent-driven developer CLI (scaffolding, dense doc queries, audits)
│   ├── mcp/        # Model Context Protocol server exposing contracts & tokens to AI agents
│   └── build/      # Static CSS extraction pipeline, DTS generation, packaging tooling
├── astryx/         # Upstream reference foundation (meta/astryx)
├── rea/            # Reverse-engineering analyzer & low-latency execution bridge
├── .antigravity/   # Workspace agent governance: rules, skills, and verification hooks
├── NOTICE          # Attribution and custom extensions documentation
├── CONTRIBUTING.md # Contribution guide and validation commands
└── AGENTS.md       # Root Agent Constitution (this document)
```

### Package Responsibilities:
- **`packages/core`**: Accessible, unstyled and styled primitive components (`Button`, `Dialog`, `Select`, `Input`, `Table`, etc.). Emits standard HTML semantics and strict ARIA.
- **`packages/motion`**: CSS-first spring and physical motion primitives. Coordinates animations without heavy runtime dependencies like Framer Motion.
- **`packages/charts`**: Accessible, canvas- and SVG-based charts consuming `--color-chart-*` tokens with automatic high-contrast and dark-mode adaptation.
- **`packages/themes`**: CSS custom property token definitions (`tokens.css`), multi-brand packs (Default Blue, Slate, Indigo, High-Contrast), and theme switcher hooks.
- **`packages/cli`**: Node.js CLI tool supporting commands like `blue-patterns docs`, `blue-patterns component <Name> --dense`, and code validation.
- **`packages/mcp`**: Official MCP server tools for IDE agents: querying component APIs, inspecting tokens, and verifying AST contracts.
- **`packages/build`**: Esbuild / StyleX compiler integration that extracts static CSS sheets (`index.css`) for consumer zero-plugin usage.

---

## 3. Uniform Component API Standards

All components in `packages/core` and `packages/charts` must conform to the standard design system API convention:

### 3.1 Directory & File Conventions
```
packages/core/src/[ComponentName]/
├── [ComponentName].tsx              # React 19 component source
├── [ComponentName].doc.mjs          # Machine-readable metadata contract
├── [ComponentName].test.tsx         # Vitest unit & accessibility tests
├── index.ts                         # Public export barrel
└── __tests__/
    └── [ComponentName].visual.spec.ts # Playwright visual regression test
```

### 3.2 Uniform Prop Nomenclature
Components that support sizing, styling, tone, or motion must use exact standardized prop names:

| Prop | Type | Description |
|---|---|---|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Uniform dimensional scale (default: `'md'`) |
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'soft'` | Visual container styling (default: `'solid'`) |
| `tone` | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info'` | Semantic color meaning (default: `'primary'`) |
| `motion` | `'none' \| 'subtle' \| 'standard' \| 'expressive'` | Animation level, honoring reduced-motion |
| `asChild` | `boolean` | Slot-based composition pattern to merge props onto a custom child |
| `disabled` | `boolean` | Accessible disabled state (sets `aria-disabled` and DOM disabled) |

### 3.3 Error Handling & Invariant Assertions
- In development (`process.env.NODE_ENV !== 'production'`), assert valid prop combinations with descriptive error messages.
- Compound components (e.g., `Select.Option` outside `Select.Root`) must throw clear runtime context errors:  
  `throw new Error('[BluePatterns UI]: Select.Option must be rendered within a Select.Root provider.');`
- Warn in development when required accessibility attributes (like `aria-label` on icon-only buttons) are omitted.

---

## 4. Forbidden Patterns Checklist

Before committing or completing any task, agents must audit against this checklist:

- [ ] **NO `any` types:** Strict TypeScript mode is enforced. Use `unknown` with narrowing or typed generics.
- [ ] **NO Missing Accessibility (`a11y`):**
  - Interactive elements must be keyboard focusable (`Tab`, `Enter`, `Space`, Arrows).
  - ARIA attributes (`aria-expanded`, `aria-controls`, `aria-describedby`, `aria-label`) must be complete and valid.
- [ ] **NO Raw Hex / Non-Tokenized CSS:**
  - Forbidden: `color: '#0052cc'`, `margin: '16px'`, `transition: 'all 0.3s'`.
  - Required: `color: 'var(--color-primary-base)'`, `margin: 'var(--spacing-4)'`, `transitionDuration: 'var(--motion-duration-normal)'`.
- [ ] **NO Runtime CSS Libraries:** No `framer-motion`, `styled-components`, `emotion`, or runtime `@vanilla-extract/css`.
- [ ] **NO Missing `.doc.mjs` Contracts:** A component without `.doc.mjs` is considered incomplete and will fail build gates.
- [ ] **NO Unguarded Animations:** All CSS `@keyframes` and transitions must check `prefers-reduced-motion`.
- [ ] **NO Internal Barrel Imports:** Never import from internal folder root (`import { Button } from '..'`); always import direct source module (`import { Button } from '../Button/Button'`).

---

## 5. Verification Commands for Agents

Every agent must run and verify these steps before marking any implementation complete:

```bash
# 1. Type validation across all packages
pnpm typecheck

# 2. Unit and accessibility test suite
pnpm test

# 3. Accessibility audits
pnpm test:a11y

# 4. Visual regression and screenshot artifacts
pnpm test:visual
```
