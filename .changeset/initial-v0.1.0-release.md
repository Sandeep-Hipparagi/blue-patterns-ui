---
"@blue-patterns/core": patch
"@blue-patterns/motion": patch
"@blue-patterns/charts": patch
"@blue-patterns/themes": patch
"@blue-patterns/cli": patch
"@blue-patterns/mcp": patch
"@blue-patterns/build": patch
---

# Initial Release: Blue-Patterns-UI v0.1.0

Open-source, agent-ready React 19 design system built on Meta's Astryx foundation with zero-runtime CSS and strict token compliance.

### Key Highlights & Architecture:
- **@blue-patterns/core**: 116+ accessible primitives and composite components (Tabs, Accordion, Dialog, Button, Badge, etc.) with pre-compiled atomic static CSS sheets (`astryx.css`, `reset.css`). Zero runtime CSS-in-JS.
- **@blue-patterns/motion**: Pure WAAPI and CSS `linear()` spring physics engine (`--motion-spring-snappy`, `--motion-spring-gentle`, `--motion-spring-bouncy`), `<Presence>`, `<Collapse>`, `<SharedLayoutIndicator>`, and `<StaggerGroup>`. Strict `prefers-reduced-motion` guards.
- **@blue-patterns/charts**: High-performance SVG & Canvas data visualization primitives (`LineChart`, `BarChart`, `DonutChart`, `Sparkline`) automatically responsive to `--color-chart-1..8` theme tokens.
- **@blue-patterns/themes**: 8 multi-brand theme packs (Default Blue, Obsidian, Editorial, Enterprise, Glass, Forest, Cobalt, High-Contrast) using modern CSS `light-dark()` color switching.
- **@blue-patterns/cli**: Developer & AI Agent CLI supporting `template list` and `template add <id>` with live AST verification via `ds_validate_jsx`.
- **@blue-patterns/mcp**: Deterministic Model Context Protocol server exposing component contracts (`ds_contract`), token inspection (`ds_tokens`), and syntax validation (`ds_validate_jsx`).
- **@blue-patterns/build**: Zero-plugin compiler pipeline extracting pre-compiled static CSS stylesheets for instant consumer adoption.
