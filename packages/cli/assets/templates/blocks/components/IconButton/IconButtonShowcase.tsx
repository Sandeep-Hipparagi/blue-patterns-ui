// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {IconButton} from '@blue-patterns/core/IconButton';
import {Icon} from '@blue-patterns/core/Icon';

export default function IconButtonShowcase() {
  return (
    <IconButton
      label="Settings"
      icon={<Icon icon="wrench" color="inherit" />}
    />
  );
}
