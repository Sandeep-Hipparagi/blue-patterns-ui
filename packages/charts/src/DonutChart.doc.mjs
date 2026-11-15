/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'DonutChart',
  package: '@blue-patterns/charts',
  description: 'Radial donut chart with automatic percentage calculations, interactive segments, and center summary slot.',
  props: [
    { name: 'data', type: 'DonutDatum[]', required: true, description: 'Proportional slices { label, value, color? }' },
    { name: 'size', type: 'number', default: '220', description: 'Diameter in pixels' },
    { name: 'innerRadiusRatio', type: 'number', default: '0.68', description: 'Inner cutout ratio (0-1)' },
    { name: 'centerLabel', type: 'string', description: 'Subtext in center cutout' },
    { name: 'centerValue', type: 'string | number', description: 'Prominent value in center cutout' }
  ],
  tokens: [
    '--color-chart-1',
    '--color-chart-2',
    '--color-chart-3',
    '--color-chart-4',
    '--color-text-primary',
    '--color-text-secondary'
  ],
  accessibility: {
    role: 'region',
    keyboard: 'Arrow keys cycle active segments, updating center metric.'
  }
};
