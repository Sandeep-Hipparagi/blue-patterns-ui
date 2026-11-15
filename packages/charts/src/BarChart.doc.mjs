/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'BarChart',
  displayName: 'Bar Chart',
  props: [
    { name: 'data', type: 'BarDatum[]', required: true, description: 'Array of { label, value, color? } data items' },
    { name: 'width', type: 'number', default: '400', description: 'Base viewBox width' },
    { name: 'height', type: 'number', default: '200', description: 'Base viewBox height' },
    { name: 'showValues', type: 'boolean', default: 'true', description: 'Whether to show value tooltips on interaction' }
  ],
  usage: {
    description: 'Production-ready responsive bar chart with keyboard navigation and strict theme color tokens.'
  }
};
