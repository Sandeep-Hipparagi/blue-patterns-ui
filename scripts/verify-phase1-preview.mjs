#!/usr/bin/env node
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import fs from 'node:fs';

const rootDir = process.cwd();
const screenshotDir = path.join(rootDir, 'artifacts', 'screenshots');
fs.mkdirSync(screenshotDir, { recursive: true });

async function runVerification() {
  console.log('Starting Phase 1 Multi-Theme Visual & Accessibility Verification...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 960 },
  });
  const page = await context.newPage();

  const previewUrl = `file://${path.resolve(rootDir, 'preview', 'index.html').replace(/\\/g, '/')}`;
  await page.goto(previewUrl, { waitUntil: 'networkidle' });

  const testMatrix = [
    { theme: 'default', mode: 'light', name: 'theme-default-light' },
    { theme: 'default', mode: 'dark', name: 'theme-default-dark' },
    { theme: 'obsidian', mode: 'dark', name: 'theme-obsidian-dark' },
    { theme: 'enterprise', mode: 'light', name: 'theme-enterprise-light' },
    { theme: 'enterprise', mode: 'dark', name: 'theme-enterprise-dark' },
  ];

  const results = [];

  for (const { theme, mode, name } of testMatrix) {
    console.log(`\nVerifying [${theme.toUpperCase()}] in [${mode.toUpperCase()}] mode...`);

    // Switch theme and mode in DOM
    await page.evaluate(({ theme, mode }) => {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = mode;
      const link = document.getElementById('theme-link');
      if (link) {
        link.href = `../packages/themes/theme-${theme}.css`;
      }
    }, { theme, mode });

    // Wait for repaint
    await page.waitForTimeout(300);

    // Capture screenshot
    const screenshotPath = path.join(screenshotDir, `${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  ✓ Screenshot saved: ${screenshotPath}`);

    // Run Axe Accessibility Scan
    const axeResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const violationsCount = axeResults.violations.length;
    console.log(`  ✓ Axe-core WCAG AA violations: ${violationsCount}`);

    if (violationsCount > 0) {
      console.warn(`    Issues:`, axeResults.violations.map(v => v.id + ': ' + v.description));
      axeResults.violations.forEach(v => {
        v.nodes.forEach(n => console.log('      Target:', n.target, n.failureSummary));
      });
    }

    results.push({
      theme,
      mode,
      screenshot: screenshotPath,
      violations: violationsCount,
    });
  }

  await browser.close();

  console.log('\n=============================================');
  console.log('PHASE 1 VISUAL & A11Y VERIFICATION COMPLETED');
  console.log('=============================================');
  for (const r of results) {
    console.log(`- ${r.theme} (${r.mode}): ${r.violations === 0 ? 'PASSED (0 violations)' : 'FAILED (' + r.violations + ')'}`);
  }
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
