import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STUDIO_ROOT = path.resolve(__dirname, '..');
const REGISTRY_SRC = path.resolve(STUDIO_ROOT, 'src/registry');
const PUBLIC_DIR = path.resolve(STUDIO_ROOT, 'public');
const THEMES_DIR = path.resolve(STUDIO_ROOT, '../../packages/themes');

const TEMPLATE_META = [
  {
    name: 'ai-chat-workspace',
    title: 'AI Chat Workspace',
    category: 'Conversational AI',
    description: 'Complete AI chat interface with message stream, token telemetry counter, model selector, and collapsible memory rail.',
    dependencies: ['@blue-patterns/core', '@blue-patterns/motion'],
    tokens: ['--color-primary-*', '--color-surface-*', '--spacing-*', '--radius-md'],
  },
  {
    name: 'saas-analytics-dashboard',
    title: 'SaaS Analytics Dashboard',
    category: 'Data & Dashboards',
    description: 'Executive revenue & cohort analytics view featuring KPI cards, quarterly LineChart, channel BarChart, and transaction tables.',
    dependencies: ['@blue-patterns/core', '@blue-patterns/charts'],
    tokens: ['--color-chart-1..8', '--color-surface-elevated', '--spacing-*'],
  },
  {
    name: 'enterprise-settings-billing',
    title: 'Enterprise Settings & Billing',
    category: 'Administrative & Security',
    description: 'Multi-tabbed organization settings page with team role permissions, resource usage meters, and billing management.',
    dependencies: ['@blue-patterns/core', '@blue-patterns/motion'],
    tokens: ['--color-neutral-border', '--color-primary-base', '--radius-lg'],
  },
  {
    name: 'kanban-sprint-board',
    title: 'Kanban Sprint Board',
    category: 'Productivity & Workflows',
    description: 'Agile sprint management board with drag/status columns, priority badges, avatar groups, task count indicators, and detail modal.',
    dependencies: ['@blue-patterns/core', '@blue-patterns/motion'],
    tokens: ['--color-primary-*', '--radius-sm', '--spacing-3'],
  },
];

const THEME_PRESETS = [
  { id: 'default', name: 'Default Blue', file: 'theme-default.css', description: 'Balanced neutral baseline with WCAG AA compliant blue' },
  { id: 'obsidian', name: 'Obsidian', file: 'theme-obsidian.css', description: 'Deep OLED true-black dark palette' },
  { id: 'editorial', name: 'Editorial', file: 'theme-editorial.css', description: 'Warm serif typography and sepia accents' },
  { id: 'enterprise', name: 'Enterprise', file: 'theme-enterprise.css', description: 'Steel blue and corporate slate density' },
  { id: 'glass', name: 'Glassmorphism', file: 'theme-glass.css', description: 'Translucent backdrop blurs with refractive borders' },
  { id: 'forest', name: 'Forest', file: 'theme-forest.css', description: 'Organic botanical sage and moss greens' },
  { id: 'cobalt', name: 'Cobalt', file: 'theme-cobalt.css', description: 'Electric neon indigo and deep violet vibrancy' },
  { id: 'high-contrast', name: 'High Contrast', file: 'theme-high-contrast.css', description: 'Maximum readability 7:1+ WCAG AAA contrast ratio' },
];

async function buildRegistry() {
  console.log('Building Blue-Patterns Registry (registry.json)...');
  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  const templates = [];

  for (const meta of TEMPLATE_META) {
    const templateDir = path.resolve(REGISTRY_SRC, meta.name);
    const indexPath = path.resolve(templateDir, 'index.tsx');

    let content = '';
    try {
      content = await fs.readFile(indexPath, 'utf-8');
    } catch {
      console.warn(`Warning: Could not read ${indexPath}`);
    }

    templates.push({
      ...meta,
      files: [
        {
          path: `src/components/${meta.name}/index.tsx`,
          content,
        },
      ],
    });
  }

  const themes = [];
  for (const preset of THEME_PRESETS) {
    const cssPath = path.resolve(THEMES_DIR, preset.file);
    let cssContent = '';
    try {
      cssContent = await fs.readFile(cssPath, 'utf-8');
    } catch {
      console.warn(`Warning: Could not read ${cssPath}`);
    }
    themes.push({
      ...preset,
      css: cssContent,
    });
  }

  const registry = {
    $schema: 'https://blue-patterns.dev/schema/registry.json',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    templates,
    themes,
  };

  const outputPath = path.resolve(PUBLIC_DIR, 'registry.json');
  await fs.writeFile(outputPath, JSON.stringify(registry, null, 2), 'utf-8');
  console.log(`[ok] Compiled registry endpoint -> ${outputPath} (${templates.length} templates, ${themes.length} themes)`);
}

buildRegistry().catch((err) => {
  console.error(err);
  process.exit(1);
});
