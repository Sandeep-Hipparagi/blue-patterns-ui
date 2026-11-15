---
name: component-builder
description: Standardized 4-step protocol for designing, implementing, upgrading, and testing React 19 + StyleX components in Blue-Patterns-UI.
license: Apache-2.0
metadata:
  version: v1
  author: Blue-Patterns-UI Team
---

# Component Builder Skill Protocol

This skill guides agents through authoring, refactoring, or extending components in `Blue-Patterns-UI` while strictly maintaining zero-runtime-CSS, token compliance, and accessibility guarantees.

---

## 4-Step Standard Execution Flow

### Step 1: Read Contract & Style Specifications
Before writing or changing code:
1. Locate the component directory: `packages/core/src/[ComponentName]/`.
2. Inspect `{ComponentName}.doc.mjs`:
   - Identify existing prop definitions, variants, tone support, and slot structure.
   - Review JSDoc comments and dense machine-readable summaries.
3. Review associated design tokens in `packages/themes/src/tokens/` to identify the required CSS custom properties (`--color-*`, `--spacing-*`, `--radius-*`, `--motion-*`).

### Step 2: Implement Typed React 19 + StyleX Component
1. Implement or modify `{ComponentName}.tsx`:
   - Use standard React 19 patterns (e.g., ref as a prop, `useId`, `useTransition`, clean JSX).
   - Ensure the uniform prop signature:
     ```tsx
     export interface ComponentProps extends React.ComponentPropsWithRef<'div'> {
       size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
       variant?: 'solid' | 'outline' | 'ghost' | 'soft';
       tone?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
       motion?: 'none' | 'subtle' | 'standard' | 'expressive';
       asChild?: boolean;
     }
     ```
   - Declare static styles with StyleX or pre-compiled CSS mapping referencing **only** CSS custom properties:
     ```ts
     const styles = stylex.create({
       base: {
         paddingBlock: 'var(--spacing-2)',
         paddingInline: 'var(--spacing-4)',
         borderRadius: 'var(--radius-md)',
         backgroundColor: 'var(--color-primary-base)',
         color: 'var(--color-primary-contrast)',
         transitionProperty: 'background-color, border-color, box-shadow, transform',
         transitionDuration: 'var(--motion-duration-normal)',
         transitionTimingFunction: 'var(--motion-easing-standard)',
         '@media (prefers-reduced-motion: reduce)': {
           transitionDuration: '0s',
         },
       },
     });
     ```
2. Verify all keyboard interactions, focus rings (`:focus-visible`), and ARIA roles are present.

### Step 3: Update `.doc.mjs` Contract & Dense Documentation
1. Update `{ComponentName}.doc.mjs` with:
   - Updated prop descriptions and typescript types.
   - Live code examples demonstrating every `variant`, `tone`, and `size`.
   - Accessibility notes (e.g., expected keyboard bindings, aria roles).
   - Dense AI summary block for LLM prompt ingestion.
2. Ensure public exports in `packages/core/src/[ComponentName]/index.ts` and `packages/core/src/index.ts`.

### Step 4: Execute Vitest, Axe-Core & Playwright Verification
1. Run unit and accessibility tests:
   ```bash
   pnpm --filter @blue-patterns/core test src/[ComponentName]/[ComponentName].test.tsx
   ```
2. Ensure automated `axe-core` accessibility scan passes with 0 violations:
   ```tsx
   import { axe } from 'vitest-axe';
   
   it('should have zero accessibility violations', async () => {
     const { container } = render(<Component>Accessible Content</Component>);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```
3. Run Playwright visual test to capture both Light Mode and Dark Mode screenshot artifacts:
   ```bash
   pnpm test:visual --grep "[ComponentName]"
   ```
4. Verify the screenshot artifacts are saved in the component's `__screenshots__/` directory.
