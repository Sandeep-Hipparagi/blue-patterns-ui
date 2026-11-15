// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {EmptyState} from '@blue-patterns/core/EmptyState';
import {Button} from '@blue-patterns/core/Button';
import {HStack} from '@blue-patterns/core/Layout';
import {Icon} from '@blue-patterns/core/Icon';
import {InboxIcon} from '@heroicons/react/24/outline';

export default function EmptyStateCompact() {
  return (
    <EmptyState
      icon={<Icon icon={InboxIcon} size="lg" />}
      title="No notifications"
      description="You're all caught up. New notifications will appear here."
      actions={
        <HStack gap={2}>
          <Button label="Settings" variant="secondary" size="sm" />
          <Button label="Refresh" variant="primary" size="sm" />
        </HStack>
      }
      isCompact
    />
  );
}
