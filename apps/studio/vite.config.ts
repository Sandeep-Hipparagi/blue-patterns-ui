import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@blue-patterns/core/reset.css': path.resolve(root, 'packages/core/src/reset.css'),
      '@blue-patterns/core/astryx.css': path.resolve(root, 'packages/core/dist/astryx.css'),
      '@blue-patterns/core': path.resolve(root, 'packages/core/dist'),
      '@blue-patterns/motion/motion.css': path.resolve(root, 'packages/motion/motion.css'),
      '@blue-patterns/motion': path.resolve(root, 'packages/motion/src'),
      '@blue-patterns/charts': path.resolve(root, 'packages/charts/src'),
      '@blue-patterns/themes': path.resolve(root, 'packages/themes'),
      '@blue-patterns/mcp': path.resolve(root, 'packages/mcp/src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: [root],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
