import fs from 'node:fs';
import path from 'node:path';

export interface SearchResult {
  name: string;
  package: string;
  category: string;
  description: string;
  score: number;
}

export function dsSearch(query: string, category?: string, rootDir: string = process.cwd()): SearchResult[] {
  const results: SearchResult[] = [];
  const normalizedQuery = query.toLowerCase().trim();

  const packagesToScan = [
    { pkgName: '@blue-patterns/core', relDir: 'packages/core/src', defaultCategory: 'Component' },
    { pkgName: '@blue-patterns/charts', relDir: 'packages/charts/src', defaultCategory: 'DataViz' },
    { pkgName: '@blue-patterns/motion', relDir: 'packages/motion/src', defaultCategory: 'Motion' },
  ];

  for (const { pkgName, relDir, defaultCategory } of packagesToScan) {
    const fullDir = path.resolve(rootDir, relDir);
    if (!fs.existsSync(fullDir)) continue;

    const entries = fs.readdirSync(fullDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const docFile = path.join(fullDir, entry.name, `${entry.name}.doc.mjs`);
        if (fs.existsSync(docFile)) {
          const content = fs.readFileSync(docFile, 'utf8');
          const nameMatch = entry.name;
          const descMatch = content.match(/description:\s*['"`](.*?)['"`]/);
          const description = descMatch ? descMatch[1] : `Component ${nameMatch}`;

          let score = 0;
          if (nameMatch.toLowerCase() === normalizedQuery) score += 100;
          else if (nameMatch.toLowerCase().includes(normalizedQuery)) score += 50;
          if (description.toLowerCase().includes(normalizedQuery)) score += 20;

          if (score > 0 || !query) {
            results.push({
              name: nameMatch,
              package: pkgName,
              category: defaultCategory,
              description,
              score,
            });
          }
        }
      }
    }
  }

  // Also include 8 Themes
  const themes = [
    { name: 'theme-default.css', desc: 'Balanced neutral baseline' },
    { name: 'theme-obsidian.css', desc: 'High-contrast developer dark-first palette' },
    { name: 'theme-editorial.css', desc: 'Warm paper surfaces + serif display typography' },
    { name: 'theme-enterprise.css', desc: 'High-density spacing and compact scale for data-heavy SaaS' },
    { name: 'theme-glass.css', desc: 'Translucent elevated surfaces with backdrop-filter tokens' },
    { name: 'theme-forest.css', desc: 'Organic deep-green & warm sand tokens' },
    { name: 'theme-cobalt.css', desc: 'Crisp fintech blue & slate hierarchy' },
    { name: 'theme-high-contrast.css', desc: 'WCAG AAA 7:1+ contrast enforcement' },
  ];

  for (const th of themes) {
    let score = 0;
    if (th.name.toLowerCase().includes(normalizedQuery)) score += 60;
    if (th.desc.toLowerCase().includes(normalizedQuery)) score += 25;
    if (score > 0 || !query) {
      results.push({
        name: th.name,
        package: '@blue-patterns/themes',
        category: 'Theme',
        description: th.desc,
        score,
      });
    }
  }

  return results
    .filter((r) => !category || r.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => b.score - a.score);
}
