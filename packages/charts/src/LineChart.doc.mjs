/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'LineChart',
  package: '@blue-patterns/charts',
  description: 'Smooth responsive time-series and categorical trend line chart with optional gradient area fill.',
  props: [
    { name: 'data', type: 'LinePoint[]', required: true, description: 'Sequential data points with { label, value }' },
    { name: 'color', type: 'string', default: "'var(--color-chart-1)'", description: 'Theme token for stroke and gradient' },
    { name: 'width', type: 'number', default: '500', description: 'Base viewBox width' },
    { name: 'height', type: 'number', default: '240', description: 'Base viewBox height' },
    { name: 'area', type: 'boolean', default: 'true', description: 'Render subtle area fill gradient beneath line' }
  ],
  tokens: [
    '--color-chart-1',
    '--color-neutral-border',
    '--color-surface-base',
    '--color-surface-elevated',
    '--color-text-secondary'
  ],
  accessibility: {
    role: 'region',
    keyboard: 'ArrowLeft/ArrowRight to inspect data coordinates with live tooltips.'
  }
};
