# Blue-Patterns Studio 🎨

> **The Interactive Token & Motion Customizer, Live Component Matrix, and Template Registry for Blue-Patterns-UI**  
> 🌐 **Live App:** [sandeep-hipparagi.github.io/blue-patterns-studio](https://sandeep-hipparagi.github.io/blue-patterns-studio/)  
> 📦 **Registry Endpoint:** [sandeep-hipparagi.github.io/blue-patterns-studio/registry.json](https://sandeep-hipparagi.github.io/blue-patterns-studio/registry.json)  
> 🏛️ **Core Monorepo:** [github.com/Sandeep-Hipparagi/blue-patterns-ui](https://github.com/Sandeep-Hipparagi/blue-patterns-ui)

Blue-Patterns Studio is a 100% dogfooded React 19 application demonstrating the power of zero-runtime CSS, WAAPI spring physics, and CSS custom property tokenization.

---

## 🌟 Modules & Features

### 1. Token & Motion Studio
- **WCAG 2.1 AA Contrast Generator:** Interactive base hue pickers generating 4.5:1+ contrast palettes.
- **Spring Physics Workbench:** Real-time visual spring physics tuner generating WAAPI damped harmonic oscillator keyframes and CSS `linear()` curves.
- **Live Preview Canvas:** Card, Form, and Navigation widgets responding instantaneously to CSS token mutations without re-renders.

### 2. Component Matrix
- Comprehensive gallery of all 116+ Blue-Patterns-UI primitives and composite components across all variants, sizes, and tones.
- Density selector (`compact`, `default`, `spacious`).
- WCAG AA contrast score indicators and keyboard focus accessibility tests.

### 3. Agent & CLI Inspector
- Real-time token slot inspector and JSON contract exporter for AI coding agents.
- Interactive prompt generator for Gemini, Claude, and Codex agents adhering to `AGENTS.md` invariants.
- AST validator playground powered by `ds_validate_jsx`.

### 4. Template Registry
- Official community template catalog (`ai-chat-workspace`, `saas-analytics-dashboard`, `enterprise-settings-billing`, `kanban-sprint-board`).
- Machine-readable endpoint: `/registry.json`.
- Direct scaffolding via CLI: `pnpm dlx @blue-patterns/cli template add <template-id>`.

---

## 🚀 Quickstart

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Build for production
pnpm build

# Preview build
pnpm preview
```

---

## 📜 License

MIT License. Built with pride by the Blue-Patterns-UI Contributors, honoring the open-source architectural foundation of Meta's Astryx.
