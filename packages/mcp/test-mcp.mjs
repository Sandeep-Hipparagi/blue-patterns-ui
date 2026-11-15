import { dsValidateJsx, dsSearch, dsContract } from './dist/index.js';

console.log('=== Test 1: ds_search ===');
const searchResults = dsSearch('dialog');
console.log(`Found ${searchResults.length} results for 'dialog':`, searchResults[0]);

console.log('\n=== Test 2: ds_contract ===');
const contracts = dsContract(['Dialog', 'BarChart', 'Presence']);
console.log('Contracts loaded:', Object.keys(contracts));
console.log('Dialog contract:', contracts['Dialog']?.package, contracts['Dialog']?.found);

console.log('\n=== Test 3: ds_validate_jsx (Bad JSX) ===');
const badJsx = `export function BadComponent() {
  return <div style={{ color: "#ff0000", padding: "16px" }}>Bad</div>;
}`;
const badResult = dsValidateJsx(badJsx);
console.log('Bad JSX Valid?', badResult.valid);
console.log('Issues found:', badResult.issues.map(i => i.message));

console.log('\n=== Test 4: ds_validate_jsx (Good JSX) ===');
const goodJsx = `import { Button } from '@blue-patterns/core';
export function GoodComponent() {
  return <Button variant="solid" tone="primary" style={{ padding: "var(--spacing-4)" }}>Accessible Button</Button>;
}`;
const goodResult = dsValidateJsx(goodJsx);
console.log('Good JSX Valid?', goodResult.valid);
console.log('Summary:', goodResult.summary);
