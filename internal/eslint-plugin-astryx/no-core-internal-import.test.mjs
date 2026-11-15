// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file no-core-internal-import.test.mjs
 */

import {RuleTester} from 'eslint';
import tseslint from 'typescript-eslint';
import rule from './no-core-internal-import.js';

// typescript-eslint's parser reads the JavaScript cases too, and gives the
// `typeof import('…')` case its TSImportType node.
const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

const message = source =>
  `'${source}' is one of Core's internal subpaths, reserved for Astryx's own packages (Core and Lab) and outside the compatibility promise. Use Core's public API instead.`;
const deep = source =>
  `'${source}' reaches into Core's internal, gesture, motion or touch-support source, which is for Core and Lab only (architecture:react-component-runtime INV13). Use Core's public API instead.`;

ruleTester.run('no-core-internal-import', rule, {
  valid: [
    // Core's public subpaths stay open.
    {code: `import {List} from '@blue-patterns/core/List';`},
    {code: `import {createReorderable} from '@blue-patterns/core/reorderable';`},
    // A path that only contains the word is not the internal subpath.
    {code: `import {x} from '@blue-patterns/core/internalization';`},
    {code: `import {x} from './internal/reorder';`},
    {code: `const core = require('@blue-patterns/core/List');`},
    // A computed specifier is not a literal subpath.
    {code: `const m = require(name);`},
    {code: `const r = load('@blue-patterns/core/internal/reorder');`},
    {code: `type T = typeof import('@blue-patterns/core/reorderable');`},
    // Names that only start like the deep paths.
    {code: `import {x} from '@blue-patterns/core/motionless';`},
    {code: `import {x} from '@blue-patterns/core/gesturesKit';`},
    {code: `import {x} from '../core/src/gesturesKit/x';`},
    {code: `import {x} from '../core/src/internals/x';`},
    // A code sample in a string is not an import.
    {
      code: "const sample = `import {duration} from '@blue-patterns/core/motion';`;",
    },
  ],
  invalid: [
    {
      code: `import {useReorderSession} from '@blue-patterns/core/internal/reorder';`,
      errors: [{message: message('@blue-patterns/core/internal/reorder')}],
    },
    {
      code: `export {useReorderSession} from '@blue-patterns/core/internal/reorder';`,
      errors: [{message: message('@blue-patterns/core/internal/reorder')}],
    },
    {
      code: `export * from '@blue-patterns/core/internal/touch';`,
      errors: [{message: message('@blue-patterns/core/internal/touch')}],
    },
    {
      code: `const m = import('@blue-patterns/core/internal/reorder');`,
      errors: [{message: message('@blue-patterns/core/internal/reorder')}],
    },
    {
      code: `import '@blue-patterns/core/internal';`,
      errors: [{message: message('@blue-patterns/core/internal')}],
    },
    {
      code: `const touch = require('@blue-patterns/core/internal/touch');`,
      errors: [{message: message('@blue-patterns/core/internal/touch')}],
    },
    {
      code: `type Touch = typeof import('@blue-patterns/core/internal/touch');`,
      errors: [{message: message('@blue-patterns/core/internal/touch')}],
    },
    // The gesture core, motion and touch support, by package path...
    {
      code: `import {GestureArena} from '@blue-patterns/core/gestures';`,
      errors: [{message: deep('@blue-patterns/core/gestures')}],
    },
    {
      code: `import {createAnimator} from '@blue-patterns/core/motion/animator';`,
      errors: [{message: deep('@blue-patterns/core/motion/animator')}],
    },
    {
      code: `export * from '@blue-patterns/core/gestures/PanGestureRecognizer';`,
      errors: [
        {message: deep('@blue-patterns/core/gestures/PanGestureRecognizer')},
      ],
    },
    {
      code: `const m = import('@blue-patterns/core/motion');`,
      errors: [{message: deep('@blue-patterns/core/motion')}],
    },
    {
      code: `const motion = require('@blue-patterns/core/motion');`,
      errors: [{message: deep('@blue-patterns/core/motion')}],
    },
    {
      code: `type G = typeof import('@blue-patterns/core/gestures');`,
      errors: [{message: deep('@blue-patterns/core/gestures')}],
    },
    // ...and by a path into Core's source.
    {
      code: `import {touchModule} from '../../packages/core/src/touch-support/touchModule';`,
      errors: [
        {message: deep('../../packages/core/src/touch-support/touchModule')},
      ],
    },
    {
      code: `import {GestureArena} from '../../../packages/core/src/internal/touch';`,
      errors: [{message: deep('../../../packages/core/src/internal/touch')}],
    },
    // A template literal with no expressions names the module as a string
    // does.
    {
      code: 'const t = import(`@blue-patterns/core/internal/touch`);',
      errors: [{message: message('@blue-patterns/core/internal/touch')}],
    },
    {
      code: 'const t = require(`@blue-patterns/core/internal/touch`);',
      errors: [{message: message('@blue-patterns/core/internal/touch')}],
    },
    {
      code: `const g = require('../core/src/gestures/GestureArena');`,
      errors: [{message: deep('../core/src/gestures/GestureArena')}],
    },
    {
      code: `type M = typeof import('../../core/src/motion/spring');`,
      errors: [{message: deep('../../core/src/motion/spring')}],
    },
  ],
});
