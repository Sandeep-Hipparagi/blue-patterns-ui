# Blue-Patterns-UI 🔷

> **The Agent-Ready, Zero-Runtime-CSS Design System & Motion Engine for React 19**  
> *Built on the architectural foundation of Meta's open-source [Astryx](https://github.com/meta/astryx) with zero bundler plugin requirements, strict design token guarantees, and a native Model Context Protocol (MCP) server for autonomous AI coding agents.*

---

[![npm version](https://img.shields.io/npm/v/@blue-patterns/core?color=0284c7&label=npm%20core)](https://www.npmjs.com/package/@blue-patterns/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Zero Runtime CSS](https://img.shields.io/badge/CSS-Zero--Runtime-10b981)](https://stylexjs.com)
[![WCAG 2.1 AA](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-success)](https://www.w3.org/WAI/WCAG21/quickref/)
[![MCP Server](https://img.shields.io/badge/MCP-Ready-8b5cf6)](packages/mcp)

---

## ⚡ 60-Second Quickstart

Install the core components, theme pack, and spring motion engine:

```bash
pnpm add @blue-patterns/core @blue-patterns/themes @blue-patterns/motion
```

Import pre-compiled static stylesheets and consume strictly typed React 19 components with **zero bundler plugins** (no Babel, no PostCSS, no Tailwind):

```tsx
import React from 'react';
// 1. Static Zero-Runtime CSS Sheets
import '@blue-patterns/core/reset.css';
import '@blue-patterns/core/astryx.css';
import '@blue-patterns/themes/theme-default.css';
import '@blue-patterns/motion/motion.css';

// 2. Typed React 19 Primitive & Composite Components
import { Button, Badge, Dialog } from '@blue-patterns/core';

export default function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ padding: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
        <Button
          label="Open Dialog"
          variant="primary"
          size="md"
          onClick={() => setOpen(true)}
        />
        <Badge label="Zero Runtime CSS" variant="success" />
      </div>

      <Dialog isOpen={open} onOpenChange={setOpen} width={400}>
        <div style={{ padding: 'var(--spacing-4)' }}>
          <h3>Blue-Patterns-UI In Action</h3>
          <p>Accessible, hardware-accelerated, and strictly tokenized.</p>
          <Button label="Close" variant="secondary" size="sm" onClick={() => setOpen(false)} />
        </div>
      </Dialog>
    </div>
  );
}
```

---

## 🏛️ Architectural Invariants

Blue-Patterns-UI is engineered around four non-negotiable principles:

| Invariant | Description |
|---|---|
| **Zero Build Plugin & Zero Runtime CSS** | Consumers only import pre-compiled, static `.css` stylesheets and strictly typed React 19 ESM components. No Emotion, Styled-Components, Tailwind runtime, or bundler plugins required. |
| **Strict CSS Custom Property Tokenization** | Raw hex values, hardcoded pixel spacings, or arbitrary transition durations are strictly forbidden. All styling references CSS custom properties (`--color-*`, `--spacing-*`, `--radius-*`, `--motion-*`). |
| **Zero-Dependency Spring Physics** | Physics-based spring animations (`--motion-spring-snappy`, `--motion-spring-gentle`, `--motion-spring-bouncy`) compiled down to CSS `linear()` curves and WAAPI. Strict `prefers-reduced-motion` compliance. |
| **Co-located Machine Contracts** | Every component directory includes an authoritative `.doc.mjs` contract defining props, token slots, accessibility roles, and machine guidance for AI agents. |

---

## 📦 Package Ecosystem

| Package | Version | Description |
|---|---|---|
| [`@blue-patterns/core`](packages/core) | `v0.7.17` | 116+ accessible primitives and composite components (Button, Dialog, Tabs, Accordion, Select, Table, etc.). |
| [`@blue-patterns/motion`](packages/motion) | `v0.1.0` | Zero-dependency spring physics engine, WAAPI micro-interactions, `<Presence>`, `<Collapse>`, and `<SharedLayoutIndicator>`. |
| [`@blue-patterns/charts`](packages/charts) | `v0.1.9` | High-performance SVG & Canvas data visualizations (`LineChart`, `BarChart`, `DonutChart`, `Sparkline`) consuming `--color-chart-1..8`. |
| [`@blue-patterns/themes`](packages/themes) | `v0.1.0` | 8 brand theme packs (Default Blue, Obsidian, Editorial, Enterprise, Glass, Forest, Cobalt, High-Contrast) using CSS `light-dark()`. |
| [`@blue-patterns/cli`](packages/cli) | `v0.7.17` | Developer CLI for scaffolding, AST auditing, and template registry operations (`template list`, `template add`). |
| [`@blue-patterns/mcp`](packages/mcp) | `v0.1.0` | Model Context Protocol server exposing contracts (`ds_contract`) and AST syntax validation (`ds_validate_jsx`) to AI coding agents. |
| [`@blue-patterns/build`](packages/build) | `v0.7.17` | Zero-plugin compiler pipeline extracting pre-compiled static CSS stylesheets for instant consumer adoption. |

---

## 🎨 Blue-Patterns Studio (`apps/studio`)

**Blue-Patterns Studio** is our interactive, 100% dogfooded workbench showcasing all capabilities without any 3rd-party UI libraries:

1. **Token & Motion Customizer:** Real-time color contrast tuning (WCAG 2.1 AA 4.5:1+), spring physics tuning (stiffness, damping, mass), and instant CSS custom property injection.
2. **Component Matrix:** Live visual test matrix of all 116+ primitives across density modes (`compact`, `default`, `spacious`) and color schemes.
3. **Agent & CLI Inspector:** Real-time token inspector, JSON contract explorer, and AST syntax validator for AI agent integration.
4. **Template Registry:** Official community templates (`ai-chat-workspace`, `saas-analytics-dashboard`, `enterprise-settings-billing`, `kanban-sprint-board`) ready to preview and scaffold.

```bash
# Launch Studio locally
pnpm --filter @blue-patterns/studio dev
```

---

## 🛠️ CLI & Template Registry Scaffolding

Browse and scaffold production templates directly from your terminal:

```bash
# List available registry templates
pnpm dlx @blue-patterns/cli template list

# Scaffold AI Chat Workspace into your project
pnpm dlx @blue-patterns/cli template add ai-chat-workspace --dir src/components

# Scaffold SaaS Analytics Dashboard
pnpm dlx @blue-patterns/cli template add saas-analytics-dashboard --dir src/components
```

The CLI checks your `package.json` for required dependencies, writes clean TSX source, and executes `ds_validate_jsx` to guarantee zero token violations.

---

## 🤖 AI Agent Integration & MCP Server

Blue-Patterns-UI is designed from the ground up for autonomous AI coding agents (Google Gemini, Claude Code, Cursor, Codex).

### Machine-Readable Manifest (`llms.txt`)
Agents can consume [llms.txt](llms.txt) at the root of the repository for dense, deterministic system instructions.

### MCP Server (`@blue-patterns/mcp`)
Add the native Model Context Protocol server to your IDE:

```json
{
  "mcpServers": {
    "blue-patterns": {
      "command": "node",
      "args": ["packages/mcp/bin/mcp-server.js"]
    }
  }
}
```

**Exposed MCP Tools:**
- `ds_contract`: Query component props, variants, sizes, and accessibility semantics.
- `ds_tokens`: Inspect color, spacing, radius, and motion tokens.
- `ds_validate_jsx`: Run deterministic AST validation on TSX code to verify zero hardcoded colors and strict token compliance.

---

## 🤝 Contributing & Community

We welcome contributions! Please review our [Root Agent Constitution (AGENTS.md)](AGENTS.md) and check out our curated [LAUNCH_ISSUES.md](LAUNCH_ISSUES.md) for beginner-friendly `good first issue` tickets.

```bash
# Typecheck entire monorepo
pnpm typecheck

# Run unit and integration tests
pnpm test

# Run AST invariant audits
node scripts/validate-studio-ast.mjs

# Run Playwright visual & axe-core audits
node scripts/verify-phase2-studio.mjs
```

---

## 📜 Attribution & License

Blue-Patterns-UI is released under the **[MIT License](LICENSE)**.

This project is built upon the architectural foundation of **Astryx** (`meta/astryx`), originally developed and open-sourced by Meta Platforms, Inc. under the MIT License. Full attribution is maintained in [NOTICE](NOTICE) and [LICENSE](LICENSE).
