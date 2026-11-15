// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file TemplatePreviewSurface.tsx
 * @input Uses the template slug, shared component registry, and current theme mode.
 * @output Renders one live page template in a viewport that fills its host.
 * @position Shared preview surface used by TemplatePreviewDialog.
 *
 * The viewport wrapper gives percentage-height templates a definite containing
 * block and normalizes viewport-sized template roots to the dialog preview.
 */

import {Suspense} from 'react';
import * as stylex from '@stylexjs/stylex';
import {Text} from '@blue-patterns/core/Text';
import {Skeleton} from '@blue-patterns/core/Skeleton';
import {Theme} from '@blue-patterns/core/theme';
import {neutralTheme} from '@blue-patterns/theme-neutral/built';
import {useThemeMode} from '../app/providers';
import {getTemplateComponent} from './templateComponents';
import css from './TemplatePreviewSurface.module.css';

const styles = stylex.create({
  emptyState: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-8)',
  },
  skeleton: {
    width: '100%',
    height: '100%',
  },
});

export function TemplatePreviewSurface({slug}: {slug: string}) {
  const {mode} = useThemeMode();
  const Component = getTemplateComponent(slug);

  return (
    <div className={css.frame}>
      {Component ? (
        <Suspense
          fallback={
            <div {...stylex.props(styles.skeleton)}>
              <Skeleton width="100%" height="100%" />
            </div>
          }>
          <Theme theme={neutralTheme} mode={mode}>
            <div className={css.viewport}>
              <Component />
            </div>
          </Theme>
        </Suspense>
      ) : (
        <div {...stylex.props(styles.emptyState)}>
          <Text type="body" color="secondary">
            A live preview isn&rsquo;t available for this template yet.
          </Text>
        </div>
      )}
    </div>
  );
}
