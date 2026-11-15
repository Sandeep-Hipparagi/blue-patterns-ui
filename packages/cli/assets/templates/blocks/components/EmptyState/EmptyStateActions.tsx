// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {EmptyState} from '@blue-patterns/core/EmptyState';
import {Button} from '@blue-patterns/core/Button';
import {Icon} from '@blue-patterns/core/Icon';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

export default function EmptyStateActions() {
  return (
    <EmptyState
      icon={<Icon icon={MagnifyingGlassIcon} size="lg" />}
      title="No results found"
      description="Try adjusting your search terms or clearing filters to see more results."
      actions={
        <>
          <Button label="Go back" variant="secondary" />
          <Button label="Clear filters" variant="primary" />
        </>
      }
    />
  );
}
