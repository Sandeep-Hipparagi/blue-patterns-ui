import fs from 'node:fs';
import path from 'node:path';

function fixDeps(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist-repos') {
        fixDeps(full);
      }
    } else if (entry.name === 'package.json') {
      let content = fs.readFileSync(full, 'utf8');
      if (content.includes('0.7.17')) {
        content = content.replaceAll('"@blue-patterns/core": "0.7.17"', '"@blue-patterns/core": "0.7.18"');
        content = content.replaceAll('"@blue-patterns/cli": "0.7.17"', '"@blue-patterns/cli": "0.7.18"');
        content = content.replaceAll('"@blue-patterns/charts": "0.7.17"', '"@blue-patterns/charts": "0.7.18"');
        content = content.replaceAll('"@blue-patterns/build": "0.7.17"', '"@blue-patterns/build": "0.7.18"');
        content = content.replaceAll('"@blue-patterns/richtext": "0.7.17"', '"@blue-patterns/richtext": "0.7.18"');
        fs.writeFileSync(full, content, 'utf8');
        console.log('Fixed', full);
      }
    }
  }
}

fixDeps('.');
