// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import Link from 'next/link';
import {Theme} from '@blue-patterns/core/theme';
import {LinkProvider} from '@blue-patterns/core/Link';
import {neutralTheme} from '@blue-patterns/theme-neutral/built';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={neutralTheme}>
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}
