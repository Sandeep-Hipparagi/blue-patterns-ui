import fs from 'node:fs';
import path from 'node:path';

let filesModified = 0;
let totalReplacements = 0;

const IGNORE_DIRS = new Set(['.git', 'node_modules', 'rea', 'dist', '.turbo']);
const VALID_EXTS = new Set([
  '.json', '.ts', '.tsx', '.js', '.mjs', '.cjs',
  '.yaml', '.yml', '.md', '.css', '.html'
]);

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTS.has(ext)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes('@blue-patterns')) {
            const updated = content.replaceAll('@blue-patterns', '@blue-patterns');
            fs.writeFileSync(fullPath, updated, 'utf8');
            filesModified++;
            totalReplacements += (content.match(/@blue-patterns/g) || []).length;
          }
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err.message);
        }
      }
    }
  }
}

console.log('Starting re-namespacing from @blue-patterns to @blue-patterns...');
processDir('.');

// Also update root package.json name if needed
const rootPkgPath = './package.json';
if (fs.existsSync(rootPkgPath)) {
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
  if (rootPkg.name === 'astryx') {
    rootPkg.name = 'blue-patterns-ui';
    fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n', 'utf8');
    console.log('Updated root package.json name to "blue-patterns-ui"');
  }
}

console.log(`Re-namespacing completed: ${filesModified} files modified, ${totalReplacements} replacements made.`);
