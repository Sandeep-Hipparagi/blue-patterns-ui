// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@blue-patterns/core/Avatar';
import {Badge} from '@blue-patterns/core/Badge';
import {Icon} from '@blue-patterns/core/Icon';
import {Item} from '@blue-patterns/core/Item';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

export default function ItemWithMedia() {
  return (
    <Stack gap={0}>
      <Item
        startContent={<Avatar name="Ada Lovelace" size="sm" />}
        label="Ada Lovelace"
        description="Design systems engineer"
        endContent={<Badge label="Owner" variant="purple" />}
        onClick={() => {}}
      />
      <Item
        startContent={<Avatar name="Grace Hopper" size="sm" />}
        label="Grace Hopper"
        description="Compiler platform"
        endContent={<Text color="secondary">Online</Text>}
        onClick={() => {}}
      />
      <Item
        startContent={<Icon icon="info" size="sm" color="secondary" />}
        label="Review handoff notes"
        description="Updated guidance is ready for the team"
        endContent={<Badge label="New" variant="blue" />}
        onClick={() => {}}
      />
    </Stack>
  );
}
