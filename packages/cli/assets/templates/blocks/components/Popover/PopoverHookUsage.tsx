// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {usePopover} from '@blue-patterns/core/Popover';
import {Button} from '@blue-patterns/core/Button';
import {Card} from '@blue-patterns/core/Card';
import {Center} from '@blue-patterns/core/Center';
import {VStack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

export default function PopoverHookUsage() {
  const popover = usePopover({dialogLabel: 'Quick actions'});

  return (
    <Center height={240}>
      <Button
        label="Open actions"
        ref={popover.triggerRef}
        onClick={popover.toggle}
        {...popover.triggerProps}
      />
      {popover.render(
        <Card width={220} padding={3} variant="transparent">
          <VStack gap={2}>
            <Text type="body" weight="bold">
              Quick actions
            </Text>
            <Button label="Create task" size="sm" />
            <Button label="Share report" variant="secondary" size="sm" />
          </VStack>
        </Card>,
        {placement: 'below', alignment: 'center'},
      )}
    </Center>
  );
}
