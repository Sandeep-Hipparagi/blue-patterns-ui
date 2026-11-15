/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'Accordion',
  displayName: 'Accordion',
  props: [
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Accordion.Item elements' },
    { name: 'motion', type: "'none' | 'subtle' | 'spring'", default: "'spring'", description: 'Motion dynamics preset' }
  ],
  usage: {
    description: 'Accessible disclosure group powered by zero-dependency spring height transitions.'
  }
};
