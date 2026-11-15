/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'Sparkline',
  package: '@blue-patterns/charts',
  description: 'Lightweight inline trend chart with keyboard exploration and tokenized strokes.',
  props: [
    { name: 'data', type: 'number[]', required: true, description: 'Sequential numerical data points' },
    { name: 'color', type: 'string', default: "'var(--color-chart-1)'", description: 'Stroke color token' },
    { name: 'width', type: 'number', default: '120', description: 'Pixel width' },
    { name: 'height', type: 'number', default: '32', description: 'Pixel height' },
    { name: 'showSpot', type: 'boolean', default: 'true', description: 'Whether to highlight current/final data point' }
  ],
  tokens: [
    '--color-chart-1',
    '--color-surface-base',
    '--color-surface-elevated'
  ],
  accessibility: {
    role: 'img',
    keyboard: 'ArrowLeft/ArrowRight to inspect data points, Escape to dismiss tooltip.'
  }
};
