// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Popover} from '@blue-patterns/core/Popover';
import {Button} from '@blue-patterns/core/Button';
import {VStack, HStack} from '@blue-patterns/core/Layout';
import {Heading, Text} from '@blue-patterns/core/Text';
import {Divider} from '@blue-patterns/core/Divider';
const shortcuts = [
  {key: '⌘K', action: 'Command palette'},
  {key: '⌘/', action: 'Toggle sidebar'},
  {key: '⌘.', action: 'Quick actions'},
];

export default function PopoverKeyboardShortcuts() {
  return (
    <Popover
      placement="below"
      label="Keyboard shortcuts"
      width={260}
      content={
        <VStack gap={2}>
          <Heading level={4}>Keyboard shortcuts</Heading>
          <Divider />
          {shortcuts.map(s => (
            <HStack key={s.key} gap={3}>
              <Text type="body" weight="bold">
                {s.key}
              </Text>
              <Text type="body">{s.action}</Text>
            </HStack>
          ))}
        </VStack>
      }>
      <Button label="Shortcuts">Shortcuts</Button>
    </Popover>
  );
}
