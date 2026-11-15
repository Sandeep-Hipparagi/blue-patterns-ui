/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'DonutChart',
  displayName: 'Donut Chart',
  props: [
    { name: 'data', type: 'DonutDatum[]', required: true, description: 'Proportional slices { label, value, color? }' },
    { name: 'size', type: 'number', default: '220', description: 'Diameter in pixels' },
    { name: 'innerRadiusRatio', type: 'number', default: '0.68', description: 'Inner cutout ratio (0-1)' },
    { name: 'centerLabel', type: 'string', description: 'Subtext in center cutout' },
    { name: 'centerValue', type: 'string | number', description: 'Prominent value in center cutout' }
  ],
  usage: {
    description: 'Radial donut chart with automatic percentage calculations, interactive segments, and center summary slot.'
  }
};
