/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'Tabs',
  displayName: 'Tabs',
  props: [
    { name: 'items', type: 'TabItem[]', required: true, description: 'Tabs configuration array with id, label, and content' },
    { name: 'defaultTab', type: 'string', description: 'Initial active tab id' },
    { name: 'activeTab', type: 'string', description: 'Controlled active tab id' },
    { name: 'onTabChange', type: '(id: string) => void', description: 'Callback on tab change' },
    { name: 'motion', type: "'none' | 'subtle' | 'spring'", default: "'spring'", description: 'Sliding indicator motion style' }
  ],
  usage: {
    description: 'Keyboard-accessible tab interface with animated FLIP sliding indicators powered by @blue-patterns/motion.'
  }
};
