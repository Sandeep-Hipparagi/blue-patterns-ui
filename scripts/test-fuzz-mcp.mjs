import { dsValidateJsx } from '../packages/mcp/dist/tools/validate.js';

const badJsx = `
  import { Button } from '@astryxdesign/core';
  export function BadWidget() {
    return (
      <div style={{ backgroundColor: '#ff0000', color: '#00ff00', padding: '16px' }}>
        <Button hallucinatedProp="forbidden" style={{ color: '#123456' }}>
          Click Me
        </Button>
      </div>
    );
  }
`;

const result = dsValidateJsx(badJsx);
console.log('Validation Result:');
console.log('Valid:', result.valid);
console.log('Summary:', result.summary);
console.log('Issues Count:', result.issues.length);
result.issues.forEach((issue, i) => {
  console.log(`[Issue ${i+1}] ${issue.type} (L${issue.line}:C${issue.column}): ${issue.message}`);
});
