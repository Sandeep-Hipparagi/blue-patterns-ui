/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'BarChart',
  package: '@blue-patterns/charts',
  description: 'Production-ready responsive bar chart with keyboard navigation and strict theme color tokens.',
  props: [
    { name: 'data', type: 'BarDatum[]', required: true, description: 'Array of { label, value, color? } data items' },
    { name: 'width', type: 'number', default: '400', description: 'Base viewBox width' },
    { name: 'height', type: 'number', default: '200', description: 'Base viewBox height' },
    { name: 'showValues', type: 'boolean', default: 'true', description: 'Whether to show value tooltips on interaction' }
  ],
  tokens: [
    '--color-chart-1',
    '--color-chart-2',
    '--color-chart-3',
    '--color-neutral-border',
    '--color-surface-elevated',
    '--color-text-secondary'
  ],
  accessibility: {
    role: 'region',
    keyboard: 'ArrowLeft and ArrowRight to focus bars, Enter/Escape to interact and dismiss.'
  }
};
