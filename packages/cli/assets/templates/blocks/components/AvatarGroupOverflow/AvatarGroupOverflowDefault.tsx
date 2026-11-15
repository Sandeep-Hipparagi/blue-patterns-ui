// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';

import {Avatar} from '@blue-patterns/core/Avatar';
import {AvatarGroup, AvatarGroupOverflow} from '@blue-patterns/core/AvatarGroup';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

const REVIEWERS = [
  {
    name: 'Alex Daniels',
  },
  {
    name: 'Ann Smith',
  },
  {
    name: 'Carol Davis',
  },
];

export default function AvatarGroupOverflowDefault() {
  return (
    <Stack direction="vertical" gap={3}>
      <Text type="supporting" color="secondary">
        Reviewers
      </Text>
      <AvatarGroup size="lg">
        {REVIEWERS.map(reviewer => (
          <Avatar key={reviewer.name} name={reviewer.name} />
        ))}
        <AvatarGroupOverflow count={2} />
      </AvatarGroup>
    </Stack>
  );
}
