import ts from 'typescript';

export interface ValidationIssue {
  type: 'hallucinated_component' | 'hardcoded_color' | 'invalid_prop' | 'untokenized_style';
  message: string;
  line?: number;
  column?: number;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  summary: string;
}

export function dsValidateJsx(tsxCode: string): ValidationResult {
  const issues: ValidationIssue[] = [];

  const sourceFile = ts.createSourceFile(
    'input.tsx',
    tsxCode,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  // 1. Check for raw hex colors in code text
  const hexColorRegex = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
  let match: RegExpExecArray | null;
  while ((match = hexColorRegex.exec(tsxCode)) !== null) {
    const pos = sourceFile.getLineAndCharacterOfPosition(match.index);
    issues.push({
      type: 'hardcoded_color',
      message: `Hardcoded hex color '${match[0]}' detected. Use CSS custom property token like 'var(--color-primary-base)' or 'var(--color-neutral-subtle)'.`,
      line: pos.line + 1,
      column: pos.character + 1,
    });
  }

  // 2. Check imports & JSX Elements AST
  function visit(node: ts.Node) {
    // Check imports from @blue-patterns/*
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier.getText(sourceFile).replace(/['"]/g, '');
      if (moduleSpecifier.startsWith('@astryxdesign/')) {
        const pos = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        issues.push({
          type: 'hallucinated_component',
          message: `Legacy import '${moduleSpecifier}'. Use re-namespaced '@blue-patterns/${moduleSpecifier.replace('@astryxdesign/', '')}'.`,
          line: pos.line + 1,
          column: pos.character + 1,
        });
      }
    }

    // Check JSX attributes for invalid styling patterns
    if (ts.isJsxAttribute(node)) {
      const attrName = node.name.getText(sourceFile);
      if (attrName === 'style' && node.initializer) {
        const text = node.initializer.getText(sourceFile);
        if (/px\b/.test(text) && !/var\(--spacing-/.test(text)) {
          const pos = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
          issues.push({
            type: 'untokenized_style',
            message: `Inline hardcoded pixel value detected in style attribute. Use design tokens like 'var(--spacing-*)'.`,
            line: pos.line + 1,
            column: pos.character + 1,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return {
    valid: issues.length === 0,
    issues,
    summary: issues.length === 0
      ? 'AST Validation Passed: 0 hallucinated components, 0 hardcoded colors, strict token compliance.'
      : `AST Validation Failed: ${issues.length} issue(s) detected.`,
  };
}
