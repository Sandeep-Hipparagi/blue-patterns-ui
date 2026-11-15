/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'Tabs',
  package: '@blue-patterns/core',
  description: 'Keyboard-accessible tab interface with animated FLIP sliding indicators powered by @blue-patterns/motion.',
  props: [
    { name: 'items', type: 'TabItem[]', required: true, description: 'Tabs configuration array with id, label, and content' },
    { name: 'defaultTab', type: 'string', description: 'Initial active tab id' },
    { name: 'activeTab', type: 'string', description: 'Controlled active tab id' },
    { name: 'onTabChange', type: '(id: string) => void', description: 'Callback on tab change' },
    { name: 'motion', type: "'none' | 'subtle' | 'spring'", default: "'spring'", description: 'Sliding indicator motion style' }
  ],
  tokens: [
    '--color-surface-sunken',
    '--color-surface-base',
    '--color-primary-base',
    '--color-text-secondary',
    '--spacing-2',
    '--radius-md'
  ],
  accessibility: {
    role: 'tablist',
    keyboard: 'Arrow navigation across tabs with automatic indicator tracking.'
  }
};
