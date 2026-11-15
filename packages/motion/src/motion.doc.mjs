/**
 * @type {import('@blue-patterns/cli/authoring').ComponentDoc}
 */
export default {
  name: 'Motion',
  package: '@blue-patterns/motion',
  description: 'Zero-runtime dependency spring physics, WAAPI micro-interactions, and View Transitions for Blue-Patterns-UI.',
  primitives: [
    {
      name: 'Presence',
      description: 'Mount and unmount transition coordinator supporting smooth exit animations.',
      props: [
        { name: 'present', type: 'boolean', required: true, description: 'Controls visibility and transition stage' },
        { name: 'children', type: 'React.ReactNode', required: true, description: 'Child node to animate' },
        { name: 'unmountOnExit', type: 'boolean', default: 'true', description: 'Whether to unmount DOM node on complete exit' },
        { name: 'onExitComplete', type: '() => void', required: false, description: 'Callback executed after exit animation finishes' }
      ]
    },
    {
      name: 'Collapse',
      description: 'GPU-accelerated height and opacity disclosure container for accordions and panels.',
      props: [
        { name: 'open', type: 'boolean', required: true, description: 'Whether the container is expanded' },
        { name: 'children', type: 'React.ReactNode', required: true, description: 'Content to reveal or hide' }
      ]
    },
    {
      name: 'SharedLayoutIndicator',
      description: 'FLIP-based sliding pill or indicator for tabs and segmented controls.',
      props: [
        { name: 'targetRect', type: 'DOMRect | null', required: true, description: 'Bounding rectangle of the active target' },
        { name: 'parentRect', type: 'DOMRect | null', required: true, description: 'Bounding rectangle of the parent container' }
      ]
    },
    {
      name: 'StaggerGroup',
      description: 'Staggered cascade delay coordinator for list items and grids.',
      props: [
        { name: 'children', type: 'React.ReactNode', required: true, description: 'Children elements to stagger' },
        { name: 'staggerDelay', type: 'number', default: '35', description: 'Milliseconds between consecutive items' }
      ]
    }
  ],
  tokens: [
    '--motion-spring-snappy',
    '--motion-spring-gentle',
    '--motion-spring-bouncy',
    '--motion-duration-instant',
    '--motion-duration-fast',
    '--motion-duration-normal',
    '--motion-duration-slow'
  ],
  reducedMotion: 'All tokens default to 0ms/none under prefers-reduced-motion: reduce.'
};
