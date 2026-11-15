// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useRef, useState} from 'react';
import {Button} from '@blue-patterns/core/Button';
import {Card} from '@blue-patterns/core/Card';
import {Dialog, DialogHeader} from '@blue-patterns/core/Dialog';
import {useHotkeys} from '@blue-patterns/core/hooks';
import {Kbd} from '@blue-patterns/core/Kbd';
import {
  HStack,
  Layout,
  LayoutContent,
  StackItem,
  VStack,
} from '@blue-patterns/core/Layout';
import {Switch} from '@blue-patterns/core/Switch';
import {Text} from '@blue-patterns/core/Text';
import {TextInput} from '@blue-patterns/core/TextInput';

export default function UseHotkeysHookUsage() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  // Single-character shortcuts need an off switch (WCAG 2.1.4).
  const [hasShortcuts, setHasShortcuts] = useState(true);

  useHotkeys([
    {
      keys: '/',
      onPress: () => searchRef.current?.focus(),
      isDisabled: !hasShortcuts,
    },
    {
      keys: '?',
      onPress: () => setIsHelpOpen(true),
      isDisabled: !hasShortcuts,
    },
  ]);

  return (
    <Card width={480} padding={4}>
      <VStack gap={3}>
        <HStack gap={2} vAlign="center">
          <StackItem size="fill">
            <TextInput
              ref={searchRef}
              label="Search"
              isLabelHidden
              placeholder="Search projects"
              value={query}
              onChange={setQuery}
            />
          </StackItem>
          <Button label="Shortcuts" onClick={() => setIsHelpOpen(true)} />
        </HStack>
        <Switch
          label="Single-key shortcuts"
          value={hasShortcuts}
          onChange={setHasShortcuts}
        />
      </VStack>
      <Dialog isOpen={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <Layout
          header={
            <DialogHeader
              title="Keyboard shortcuts"
              onOpenChange={setIsHelpOpen}
            />
          }
          content={
            <LayoutContent>
              <VStack gap={2}>
                <HStack gap={2} vAlign="center">
                  <Kbd keys="/" />
                  <Text type="body">Focus search</Text>
                </HStack>
                <HStack gap={2} vAlign="center">
                  <Kbd keys="?" />
                  <Text type="body">Show this help</Text>
                </HStack>
              </VStack>
            </LayoutContent>
          }
        />
      </Dialog>
    </Card>
  );
}
