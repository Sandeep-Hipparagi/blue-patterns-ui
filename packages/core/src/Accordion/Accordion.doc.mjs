/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'Accordion',
  package: '@blue-patterns/core',
  description: 'Accessible disclosure group powered by zero-dependency spring height transitions.',
  props: [
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Accordion.Item elements' },
    { name: 'motion', type: "'none' | 'subtle' | 'spring'", default: "'spring'", description: 'Motion dynamics preset' }
  ],
  tokens: [
    '--color-neutral-border',
    '--color-text-primary',
    '--motion-duration-fast',
    '--motion-spring-snappy'
  ],
  accessibility: {
    role: 'region',
    keyboard: 'Enter/Space to toggle items, Arrow keys for header traversal.'
  }
};
