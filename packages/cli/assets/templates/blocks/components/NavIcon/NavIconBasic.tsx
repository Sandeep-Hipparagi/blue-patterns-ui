// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {NavIcon} from '@blue-patterns/core/NavIcon';
import {Icon} from '@blue-patterns/core/Icon';
import {HStack} from '@blue-patterns/core/Layout';

export default function NavIconBasic() {
  return (
    <HStack gap={4} vAlign="center">
      <NavIcon icon={<Icon icon="search" />} />
      <NavIcon icon={<Icon icon="calendar" />} />
    </HStack>
  );
}
