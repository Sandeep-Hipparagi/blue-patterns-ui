# Studio Invariants Rule

Rule: Enforce 100% Dogfooding, Zero External UI Libraries, and Zero Token Violations in Blue-Patterns Studio.

## Directives
1. **Dogfooding:** Every layout, control, modal, drawer, form, chart, and animation in `apps/studio` MUST use `@blue-patterns/core`, `@blue-patterns/motion`, `@blue-patterns/charts`, and `@blue-patterns/themes`.
2. **CSS Custom Properties:** Component styles and inline styles must NEVER contain raw hex codes, hardcoded pixel values for margin/padding, or hardcoded transition durations. Always use `var(--color-*)`, `var(--spacing-*)`, `var(--radius-*)`, `var(--motion-*)`.
3. **Registry Standards:** All templates authored in `/registry` must be self-contained, typed React 19 ESM components importing exclusively from `@blue-patterns/*`.
4. **Verification:** All components, pages, and templates must pass `ds_validate_jsx` with zero AST violations.
