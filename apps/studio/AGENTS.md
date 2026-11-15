# Blue-Patterns Studio Agent Constitution

> **Canonical Agent Directives & Architecture Specification for `apps/studio`**  
> Interactive Token & Motion Customizer, Component Matrix, Agent Tooling Hub, and Community Template Registry.

---

## 1. Prime Directive: 100% Dogfooding Invariant

Every agent and developer working in `apps/studio` must strictly adhere to the following non-negotiable rules:

1. **Zero External UI Libraries:**
   - **Never** install or import Tailwind CSS, Shadcn, Radix UI, Material UI, Mantine, Ant Design, or Chakra UI.
   - **Never** import runtime animation libraries like `framer-motion` or `@react-spring/web`.
   - The entire Studio UI—including sidebars, modals, tooltips, buttons, inputs, tabs, sliders, charts, tables, and spring interactions—must be built **100% exclusively** with:
     - `@blue-patterns/core`
     - `@blue-patterns/motion`
     - `@blue-patterns/charts`
     - `@blue-patterns/themes`

2. **Zero Build Plugin Proof:**
   - Consumers and Studio run pure React 19 + TypeScript + Vite (`@vitejs/plugin-react`).
   - Style sheets are pre-compiled and imported statically:
     - `@blue-patterns/core/reset.css`
     - `@blue-patterns/core/astryx.css`
     - `@blue-patterns/motion/motion.css`
     - `@blue-patterns/themes/theme-[name].css`

3. **Strict Dynamic CSS Custom Property Injection:**
   - Theme and motion adjustments (color hues, scale, border radius, spring physics parameters) must directly mutate CSS custom properties on the target preview DOM root element (e.g. `element.style.setProperty('--color-primary-base', value)`).
   - Never inject `<style>` tags with runtime CSS-in-JS compilers.

4. **Co-located Machine-Readable Contracts (`.doc.mjs`):**
   - All component metadata shown in the Matrix and Agent Inspector must be derived from the authoritative `.doc.mjs` files and `llms.txt`.

5. **Reduced-Motion Invariant:**
   - Honor `prefers-reduced-motion` and testable reduced-motion simulation mode in the Studio App Shell.
