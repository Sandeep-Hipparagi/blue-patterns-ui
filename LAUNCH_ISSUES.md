# Blue-Patterns-UI Launch Community Issues 🚀

> **Curated `good first issue` tickets for open-source contributors to kickstart Phase 4 and community growth.**

---

### Issue 1: Cyberpunk Neon 2077 Theme Pack (`@blue-patterns/themes/theme-cyberpunk.css`)
- **Package:** `@blue-patterns/themes`
- **Labels:** `good first issue`, `theme-pack`, `help wanted`
- **Difficulty:** Beginner
- **Objective:**
  Author a new electric cyberpunk theme featuring neon yellow (`#fcee0a`), electric cyan (`#00f0ff`), deep dark surfaces (`#05050a`), and high-saturation chart tokens.
- **Requirements:**
  1. Define `:root, [data-theme="cyberpunk"]` in `packages/themes/theme-cyberpunk.css`.
  2. Implement dual light/dark modes using CSS `light-dark()`.
  3. Ensure all text and primary actions pass WCAG 2.1 AA (4.5:1+ contrast ratio).
  4. Include chart tokens `--color-chart-1` through `--color-chart-8`.
  5. Add theme entry to `apps/studio/public/registry.json` and export from `packages/themes/package.json`.

---

### Issue 2: DateRangePicker with Physics Spring Motion Disclosure
- **Package:** `@blue-patterns/core`, `@blue-patterns/motion`
- **Labels:** `good first issue`, `component`, `motion`
- **Difficulty:** Intermediate
- **Objective:**
  Implement an accessible `DateRangePicker` composite component utilizing `@blue-patterns/motion`'s `<Collapse>` and `--motion-spring-gentle` physics for the calendar popup disclosure.
- **Requirements:**
  1. Keyboard navigable calendar grid (Arrow keys for day selection, PageUp/PageDown for month jumps).
  2. Zero-runtime CSS styling via `@layer astryx-base`.
  3. Support `prefers-reduced-motion` with instantaneous opacity fallback.
  4. Machine-readable contract in `DateRangePicker.doc.mjs`.
  5. Vitest unit tests and axe-core accessibility tests with 0 violations.

---

### Issue 3: Svelte 5 & Vue 3 Zero-Plugin Static CSS Consumer Integration Guides
- **Package:** `@blue-patterns/core`, `docs`
- **Labels:** `good first issue`, `documentation`, `ecosystem`
- **Difficulty:** Beginner
- **Objective:**
  Author end-to-end integration walkthroughs demonstrating how non-React frameworks (Svelte 5, Vue 3, Astro) consume `@blue-patterns/core/astryx.css` and `@blue-patterns/themes/theme-default.css` with zero build plugins and zero runtime overhead.
- **Requirements:**
  1. Step-by-step Vite + Svelte 5 and Vite + Vue 3 setup guide in `docs/framework-guides/`.
  2. Minimal runnable code snippet using standard HTML elements with Blue-Patterns CSS classes (`ds-button`, `ds-badge`, `ds-dialog`).
  3. Explanation of CSS cascade layers (`@layer astryx-reset, astryx-tokens, astryx-base`).

---

### Issue 4: Add 'calendar-timeline-view' Template to Template Registry
- **Package:** `apps/studio`, `@blue-patterns/cli`
- **Labels:** `good first issue`, `template-submission`, `studio`
- **Difficulty:** Intermediate
- **Objective:**
  Create a production-grade project timeline and sprint calendar template (`calendar-timeline-view`) for the Studio registry.
- **Requirements:**
  1. 100% dogfooding of `@blue-patterns/core`, `@blue-patterns/charts`, and `@blue-patterns/themes`.
  2. Monthly calendar grid with milestone chips and Gantt-style horizontal progress bars.
  3. Zero AST violations verified via `node scripts/validate-studio-ast.mjs`.
  4. Add template to `apps/studio/public/registry.json`.
  5. Verify CLI scaffolding: `node packages/cli/bin/cli.js template add calendar-timeline-view`.

---

### Issue 5: Design Tokens Community Group (DTCG) Exporter CLI Plugin
- **Package:** `@blue-patterns/cli`
- **Labels:** `good first issue`, `cli`, `tooling`
- **Difficulty:** Intermediate
- **Objective:**
  Add a `blue-patterns theme export --format dtcg` command that converts Blue-Patterns CSS custom properties into W3C Design Tokens Community Group (DTCG) compliant JSON for Figma Token Studio and Style Dictionary.
- **Requirements:**
  1. Parse CSS custom properties from any `@blue-patterns/themes` file.
  2. Generate structured DTCG JSON with `$type`, `$value`, and `$description`.
  3. Support color, spacing, radius, and motion duration/easing tokens.
  4. Unit tests in `packages/cli/test/dtcg-export.test.mjs`.

---

### Issue 6: E2E Playwright Visual Regression for RTL Direction & Mobile Sheet Drawer
- **Package:** `apps/studio`
- **Labels:** `good first issue`, `playwright`, `a11y`
- **Difficulty:** Intermediate
- **Objective:**
  Extend the Studio verification suite (`scripts/verify-phase2-studio.mjs`) to test Right-to-Left (`dir="rtl"`) text direction and mobile sheet drawer gestures across 3 additional mobile viewports (iPhone 15 Pro, Pixel 8, iPad Mini).
- **Requirements:**
  1. Add RTL state verification for `ExportDrawer` and `AgentInspector`.
  2. Verify that CSS logical properties (`margin-inline-start`, `inset-inline-end`) mirror correctly in RTL.
  3. Ensure 0 axe-core WCAG AA violations under RTL mode.
  4. Output screenshots to `artifacts/screenshots/studio/rtl/`.
