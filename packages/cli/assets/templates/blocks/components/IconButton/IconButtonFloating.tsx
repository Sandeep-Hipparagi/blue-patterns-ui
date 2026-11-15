// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {IconButton} from '@blue-patterns/core/IconButton';
import {Icon} from '@blue-patterns/core/Icon';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';
import {PlusIcon} from '@heroicons/react/24/outline';

const VARIANTS = [
  {variant: 'primary' as const, label: 'Primary'},
  {variant: 'secondary' as const, label: 'Secondary'},
  {variant: 'ghost' as const, label: 'Ghost'},
  {variant: 'destructive' as const, label: 'Destructive'},
];

export default function IconButtonFloating() {
  return (
    <Stack direction="vertical" gap={4}>
      <Text type="supporting" color="secondary">
        FABs are usually icon-only — raise one with `elevation="high"`
      </Text>
      <Stack direction="horizontal" gap={3} vAlign="center">
        {VARIANTS.map(({variant, label}) => (
          <IconButton
            key={variant}
            label={label}
            variant={variant}
            icon={<Icon icon={PlusIcon} />}
            elevation="high"
          />
        ))}
      </Stack>
    </Stack>
  );
}
