export interface PropDefinition {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  ariaRole: string;
  requiredAria: string[];
  tokenSlots: string[];
  props: PropDefinition[];
}

export const COMPONENT_CATALOG: ComponentMetadata[] = [
  {
    name: 'Button',
    category: 'Inputs & Actions',
    description: 'Interactive button primitive with tactile micro-interactions, accessible loading states, and full tone customization.',
    ariaRole: 'button',
    requiredAria: ['aria-label (when icon-only)', 'aria-busy (during loading)', 'aria-disabled'],
    tokenSlots: ['--color-primary-*', '--spacing-*', '--radius-*', '--motion-spring-snappy'],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'destructive'", default: "'secondary'", description: 'Visual container styling' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Uniform dimensional scale' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Displays spinner and manages aria-busy' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Accessible disabled state' },
    ],
  },
  {
    name: 'Badge',
    category: 'Feedback & Status',
    description: 'Compact visual indicator for status, counts, tags, and category labels.',
    ariaRole: 'status',
    requiredAria: ['aria-label (when carrying vital status)'],
    tokenSlots: ['--color-[variant]-*', '--radius-full', '--typography-size-xs'],
    props: [
      { name: 'variant', type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'blue' | 'purple'", default: "'neutral'", description: 'Visual appearance' },
      { name: 'label', type: 'ReactNode', default: "''", description: 'Text label rendered within badge' },
    ],
  },
  {
    name: 'Card',
    category: 'Surfaces & Containers',
    description: 'Structured elevated content container with border tokens, corner radius scales, and responsive padding.',
    ariaRole: 'region / article',
    requiredAria: ['aria-labelledby (when titled)'],
    tokenSlots: ['--color-surface-elevated', '--color-neutral-border', '--radius-lg'],
    props: [
      { name: 'variant', type: "'flat' | 'elevated' | 'bordered'", default: "'elevated'", description: 'Depth presentation' },
      { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Internal padding step' },
    ],
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Composite navigation tabs with zero-dependency FLIP SharedLayoutIndicator sliding pill indicator.',
    ariaRole: 'tablist / tab / tabpanel',
    requiredAria: ['aria-selected', 'aria-controls', 'role="tablist"', 'role="tab"'],
    tokenSlots: ['--color-primary-base', '--color-neutral-border', '--motion-spring-snappy'],
    props: [
      { name: 'variant', type: "'soft' | 'solid' | 'outline'", default: "'soft'", description: 'Tab bar background style' },
      { name: 'motion', type: "'none' | 'subtle' | 'spring'", default: "'spring'", description: 'Sliding indicator transition mode' },
    ],
  },
  {
    name: 'Accordion',
    category: 'Disclosure',
    description: 'Smooth GPU-composited height disclosure primitive utilizing pure CSS Collapse transitions.',
    ariaRole: 'region / button',
    requiredAria: ['aria-expanded', 'aria-controls', 'id linkage'],
    tokenSlots: ['--motion-spring-gentle', '--color-neutral-border'],
    props: [
      { name: 'motion', type: "'none' | 'subtle' | 'spring'", default: "'spring'", description: 'Accordion expansion physics curve' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial disclosure state' },
    ],
  },
  {
    name: 'Switch',
    category: 'Inputs & Actions',
    description: 'Accessible binary toggle switch with keyboard navigation and spring track micro-interactions.',
    ariaRole: 'switch',
    requiredAria: ['aria-checked', 'aria-label / aria-labelledby'],
    tokenSlots: ['--color-primary-base', '--color-neutral-base', '--radius-full'],
    props: [
      { name: 'value', type: 'boolean', default: 'false', description: 'Checked toggle state' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Whether the switch is interactive' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Physical scale of switch handle' },
    ],
  },
  {
    name: 'Dialog',
    category: 'Overlays & Modals',
    description: 'Native HTML <dialog> implementation with top-layer focus trapping, spring entrances, and backdrop click dismissals.',
    ariaRole: 'dialog',
    requiredAria: ['aria-modal="true"', 'aria-labelledby', 'aria-describedby'],
    tokenSlots: ['--color-surface-elevated', '--radius-container', '--motion-spring-gentle'],
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', description: 'Visibility state' },
      { name: 'purpose', type: "'info' | 'form' | 'required'", default: "'info'", description: 'Dismissal and escape rules' },
      { name: 'width', type: 'number | string', default: '400', description: 'Modal surface width' },
    ],
  },
];
