import fs from 'node:fs';
import path from 'node:path';

export interface SwizzleResult {
  success: boolean;
  component: string;
  destination: string;
  filesCopied: string[];
  error?: string;
}

export function dsSwizzle(
  componentName: string,
  destinationPath: string,
  rootDir: string = process.cwd()
): SwizzleResult {
  const componentDir = path.resolve(rootDir, 'packages/core/src', componentName);

  if (!fs.existsSync(componentDir)) {
    return {
      success: false,
      component: componentName,
      destination: destinationPath,
      filesCopied: [],
      error: `Component directory not found at '${componentDir}'.`,
    };
  }

  const destDir = path.resolve(rootDir, destinationPath, componentName);
  fs.mkdirSync(destDir, { recursive: true });

  const filesCopied: string[] = [];
  const entries = fs.readdirSync(componentDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile()) {
      const srcFile = path.join(componentDir, entry.name);
      const dstFile = path.join(destDir, entry.name);
      fs.copyFileSync(srcFile, dstFile);
      filesCopied.push(entry.name);
    }
  }

  return {
    success: true,
    component: componentName,
    destination: destDir,
    filesCopied,
  };
}
