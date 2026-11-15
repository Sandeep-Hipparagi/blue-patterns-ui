# Astryx + Tailwind CSS

This project uses Astryx components with Tailwind CSS. Use the CLI to look up component props and usage before writing code:

```bash
npx astryx component --list              # list all available components
npx astryx component Button              # look up props, variants, and usage
npx astryx component IconButton          # each component has its own entry
```

Components use:

- Tailwind CSS utility classes for layout and custom styling
- Astryx Tailwind bridge tokens (`bg-surface`, `text-primary`) for design tokens
- React 19

## Import Pattern

Each component is imported from its own subpath:

```tsx
import {Button} from '@blue-patterns/core/Button';
import {IconButton} from '@blue-patterns/core/IconButton';
import {Card} from '@blue-patterns/core/Card';
import {Text, Heading} from '@blue-patterns/core/Text';
import {ToggleButton, ToggleButtonGroup} from '@blue-patterns/core/ToggleButton';
import {Theme} from '@blue-patterns/core/theme';
```

## Event Handlers

Astryx is a React DOM library. Use standard React DOM event handler props such as
`onClick`, `onChange`, and `onKeyDown`. For button activation, use `onClick`:

```tsx
<Button label="Save" onClick={() => handleSave()} />
```

Do NOT use cross-platform activation props like `onPress` unless a component
explicitly documents them.
