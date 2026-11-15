// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {OverflowList} from '@blue-patterns/core/OverflowList';
import {Button} from '@blue-patterns/core/Button';
import {DropdownMenu} from '@blue-patterns/core/DropdownMenu';
import {Card} from '@blue-patterns/core/Card';
import {Center} from '@blue-patterns/core/Center';

const actions = ['Save', 'Edit', 'Duplicate', 'Share', 'Archive', 'Delete'];

export default function OverflowListCappedToolbar() {
  return (
    <Center width={420}>
      <Card padding={2}>
        <OverflowList
          gap={2}
          maxVisibleItems={3}
          overflowRenderer={overflowItems => (
            <DropdownMenu
              button={{
                label: `+${overflowItems.length}`,
                variant: 'ghost',
                size: 'sm',
              }}
              items={overflowItems.map(({index}) => ({
                label: actions[index],
              }))}
            />
          )}>
          {actions.map(action => (
            <Button key={action} label={action} size="sm" />
          ))}
        </OverflowList>
      </Card>
    </Center>
  );
}
