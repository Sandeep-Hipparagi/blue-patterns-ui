// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@blue-patterns/core/Avatar';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

const NAMES = [
  {name: 'John Doe', note: 'First + last'},
  {name: 'Alice', note: 'Single name'},
  {name: 'Bob Smith Johnson', note: 'Multi-word'},
  {name: 'Dr. Sarah Connor', note: 'Prefixed'},
];

export default function AvatarInitialsFallback() {
  return (
    <Stack direction="horizontal" gap={6} vAlign="center">
      {NAMES.map(({name, note}) => (
        <Stack key={name} direction="vertical" gap={2} hAlign="center">
          <Avatar name={name} size="lg" />
          <Text type="supporting" color="secondary">
            {note}
          </Text>
        </Stack>
      ))}
    </Stack>
  );
}
