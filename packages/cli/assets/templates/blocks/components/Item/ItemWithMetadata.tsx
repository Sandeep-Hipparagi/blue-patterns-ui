// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Badge} from '@blue-patterns/core/Badge';
import {Icon} from '@blue-patterns/core/Icon';
import {Item} from '@blue-patterns/core/Item';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

export default function ItemWithMetadata() {
  return (
    <Stack gap={0}>
      <Item
        startContent={<Icon icon="check" size="sm" color="success" />}
        label="Build passed"
        description="Production deploy completed"
        endContent={<Text color="secondary">2m ago</Text>}
      />
      <Item
        startContent={<Icon icon="warning" size="sm" color="warning" />}
        label="High memory usage"
        description="Worker pool is above the warning threshold"
        endContent={<Badge label="Warning" variant="warning" />}
        isHighlighted
      />
      <Item
        startContent={<Icon icon="error" size="sm" color="error" />}
        label="Sync failed"
        description="Retry after checking service credentials"
        endContent={<Badge label="Action" variant="error" />}
        isSelected
      />
    </Stack>
  );
}
