import fs from 'node:fs';

const content = fs.readFileSync('vitest.config.ts', 'utf8');
const target = `'packages/core/src/**/*.test.{ts,tsx,mjs}',`;
if (content.includes(target) && !content.includes(`'packages/motion/src/**/*.test.{ts,tsx,mjs}',`)) {
  const updated = content.replace(target, `${target}\n              'packages/motion/src/**/*.test.{ts,tsx,mjs}',`);
  fs.writeFileSync('vitest.config.ts', updated, 'utf8');
  console.log('Successfully updated vitest.config.ts');
} else {
  console.log('Already updated or target not found');
}
