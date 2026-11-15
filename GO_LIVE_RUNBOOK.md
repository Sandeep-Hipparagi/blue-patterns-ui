# Blue-Patterns-UI & Studio Go-Live Runbook

> **Authoritative Production Operations & Community Launch Runbook**  
> Architected for **Blue-Patterns-UI** (`@blue-patterns/*`) and **blue-patterns-studio**.

---

## 1. Live Repositories & Release Matrix

| Repository            | GitHub Target URL                                                                                              | Branch | Status            |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | ------ | ----------------- |
| **Core Monorepo**     | [github.com/Sandeep-Hipparagi/blue-patterns-ui](https://github.com/Sandeep-Hipparagi/blue-patterns-ui)         | `main` | **Live & Public** |
| **Standalone Studio** | [github.com/Sandeep-Hipparagi/blue-patterns-studio](https://github.com/Sandeep-Hipparagi/blue-patterns-studio) | `main` | **Live & Public** |

---

## 2. Remote Registry Endpoint & CLI Verification

The standalone Studio hosts the authoritative community template and theme registry consumed dynamically by `@blue-patterns/cli`.

- **Live Raw Endpoint:**  
  `https://raw.githubusercontent.com/Sandeep-Hipparagi/blue-patterns-studio/main/public/registry.json`

### Verification Commands

```bash
# 1. Fetch remote template catalog via CLI
node packages/cli/bin/cli.js template list --registry https://raw.githubusercontent.com/Sandeep-Hipparagi/blue-patterns-studio/main/public/registry.json

# 2. Or using npx / pnpm dlx once published:
npx @blue-patterns/cli template list
npx @blue-patterns/cli template add ai-chat-workspace --dir src/templates
```

### Verified Templates in Registry

1. `ai-chat-workspace` — Multi-turn AI chat canvas with streaming markdown, citations, prompt input, and model selector.
2. `analytics-kpi-dashboard` — Executive KPI metric tiles, real-time telemetry line charts, revenue bar charts, and data tables.
3. `saas-settings-panel` — User settings, API key manager, profile editor, notification switches, and billing summary.
4. `auth-security-modal` — Multi-factor authentication dialog with animated SMS OTP inputs and biometric passkey fallback.

---

## 3. Seeded Starter Issues (`good first issue`)

Six community contribution issues have been seeded and labeled on [Sandeep-Hipparagi/blue-patterns-ui/issues](https://github.com/Sandeep-Hipparagi/blue-patterns-ui/issues):

| Issue  | Title                                                              | Labels                                    | Link                                                                 |
| ------ | ------------------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------------- |
| **#2** | Add 'Cyberpunk Neon 2077' high-energy theme pack                   | `good first issue`, `theme-pack`          | [#2](https://github.com/Sandeep-Hipparagi/blue-patterns-ui/issues/2) |
| **#3** | Implement DateRangePicker with Physics Spring Motion Disclosure    | `good first issue`, `component`, `motion` | [#3](https://github.com/Sandeep-Hipparagi/blue-patterns-ui/issues/3) |
| **#4** | Author Svelte 5 & Vue 3 zero-runtime CSS integration guides        | `good first issue`, `documentation`       | [#4](https://github.com/Sandeep-Hipparagi/blue-patterns-ui/issues/4) |
| **#5** | Add 'calendar-timeline-view' template to community registry        | `good first issue`, `studio`              | [#5](https://github.com/Sandeep-Hipparagi/blue-patterns-ui/issues/5) |
| **#6** | Build Design Tokens Community Group (DTCG) exporter CLI plugin     | `good first issue`, `cli`                 | [#6](https://github.com/Sandeep-Hipparagi/blue-patterns-ui/issues/6) |
| **#7** | Add E2E Playwright visual regression tests for RTL & mobile Drawer | `good first issue`, `component`           | [#7](https://github.com/Sandeep-Hipparagi/blue-patterns-ui/issues/7) |

---

## 4. npm Publication & Tarball Cleanliness Audit

All 7 `@blue-patterns/*` packages have been audited via `npm pack --dry-run --ignore-scripts` to guarantee zero test files, build caches, or stray artifacts in consumer bundles.

### Package Tarball Specifications

| Package Name            | Tarball File                     | Compressed Size | Unpacked Size | Total Entries | Stray / Test Files |
| ----------------------- | -------------------------------- | --------------- | ------------- | ------------- | ------------------ |
| `@blue-patterns/core`   | `blue-patterns-core-0.7.17.tgz`  | 7.78 MB         | 31.12 MB      | 5,174         | **0**              |
| `@blue-patterns/motion` | `blue-patterns-motion-0.1.0.tgz` | 4.70 KB         | 24.60 KB      | 26            | **0**              |
| `@blue-patterns/charts` | `blue-patterns-charts-0.1.9.tgz` | 136.80 KB       | 507.70 KB     | 159           | **0**              |
| `@blue-patterns/themes` | `blue-patterns-themes-0.1.0.tgz` | 5.40 KB         | 25.90 KB      | 10            | **0**              |
| `@blue-patterns/cli`    | `blue-patterns-cli-0.7.17.tgz`   | 6.14 MB         | 22.60 MB      | 3,339         | **0**              |
| `@blue-patterns/mcp`    | `blue-patterns-mcp-0.1.0.tgz`    | 6.10 KB         | 36.80 KB      | 27            | **0**              |
| `@blue-patterns/build`  | `blue-patterns-build-0.7.17.tgz` | 34.50 KB        | 124.30 KB     | 17            | **0**              |

### Automated npm Publishing Instructions

#### Step 1: Configure npm Automation Token in GitHub

```bash
# Provide a granular or classic npm automation token with publish permissions
gh secret set NPM_TOKEN --repo Sandeep-Hipparagi/blue-patterns-ui
```

#### Step 2: Trigger GitHub Actions Release Pipeline

Once `NPM_TOKEN` is set, push to `main` triggers `.github/workflows/release.yml`, which:

1. Runs full validation (`pnpm typecheck`, `pnpm test`, `pnpm test:a11y`, `pnpm test:visual`).
2. Creates the Version PR or publishes to npm via `changesets/action`.
3. Creates corresponding GitHub Releases with release notes.

#### Step 3: Manual Fallback Publication (Local)

If publishing from local terminal with 2FA/auth:

```bash
npm login
pnpm changeset version
pnpm install
pnpm build
pnpm changeset publish
```

---

## 5. Hosting & Deployment for `blue-patterns-studio`

`dist-repos/blue-patterns-studio` is ready for instant deployment across static edge providers:

### Option A: Vercel (One-Click)

1. Import `Sandeep-Hipparagi/blue-patterns-studio` on [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Vite**.
3. Build Command: `pnpm build`.
4. Output Directory: `dist`.
5. Deploy. (Automatic SPA route handling configured via `vercel.json`).

### Option B: GitHub Pages Deployment

Run the automated deployment action in `Sandeep-Hipparagi/blue-patterns-studio`:

```bash
cd dist-repos/blue-patterns-studio
pnpm build
# Or push to main to trigger .github/workflows/deploy.yml
```

Enable GitHub Pages in the repository settings:
`Settings -> Pages -> Build and deployment -> Source: GitHub Actions`.

---

## 6. Verification Checklist Summary

- [x] Repository `Sandeep-Hipparagi/blue-patterns-ui` public on GitHub.
- [x] Repository `Sandeep-Hipparagi/blue-patterns-studio` public on GitHub.
- [x] Remote registry endpoint accessible over HTTPS and serving valid JSON.
- [x] `@blue-patterns/cli template list` successfully queries the remote endpoint.
- [x] 6 Curated `good first issue` tickets live on GitHub with appropriate labels.
- [x] All 7 packages audited with 0 stray test or internal artifacts in npm tarballs.
- [x] Root `CHANGELOG.md` and initial release changeset verified.
