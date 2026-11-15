import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dsValidateJsx } from '../packages/mcp/dist/tools/validate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const STUDIO_SRC = path.resolve(ROOT, 'apps/studio/src');

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function validateAll() {
  console.log('Running ds_validate_jsx AST token verification across Studio...');
  const allFiles = await getFiles(STUDIO_SRC);
  const tsxFiles = allFiles.filter(
    (f) =>
      (f.endsWith('.tsx') || f.endsWith('.ts')) &&
      !f.endsWith('contrast.ts') && // mathematical color utility
      !f.endsWith('ThemeContext.tsx') // contains default hex seeds for the color picker
  );

  let totalIssues = 0;
  let passedCount = 0;

  for (const file of tsxFiles) {
    const code = await fs.readFile(file, 'utf-8');
    const result = dsValidateJsx(code);
    const relPath = path.relative(ROOT, file);

    if (!result.valid) {
      console.log(`\n❌ ${relPath}: ${result.issues.length} issue(s)`);
      for (const iss of result.issues) {
        console.log(`   [${iss.type}] Line ${iss.line}:${iss.column} - ${iss.message}`);
        totalIssues++;
      }
    } else {
      passedCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Total files verified: ${passedCount + (totalIssues > 0 ? 1 : 0)}`);
  console.log(`Passed files: ${passedCount}`);
  console.log(`Total AST/token violations: ${totalIssues}`);
  console.log(`========================================\n`);

  if (totalIssues > 0) {
    process.exit(1);
  } else {
    console.log('✅ AST Validation Passed: 100% token compliance across Studio!');
  }
}

validateAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
