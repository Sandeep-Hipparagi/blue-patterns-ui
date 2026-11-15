// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @input The picked emoji, kept in local state
 * @output An inline emoji picker in a Card, naming the last pick
 * @position Lab EmojiPicker's docsite showcase and copyable CLI block
 */

import {useState} from 'react';
import {Card} from '@blue-patterns/core/Card';
import {HStack, VStack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';
import {EmojiPicker, type EmojiOption} from '@blue-patterns/lab';

export default function EmojiPickerShowcase() {
  const [picked, setPicked] = useState<EmojiOption | null>(null);

  return (
    <VStack gap={3} width={352}>
      <HStack gap={2} align="center">
        <Text type="label">Picked:</Text>
        <Text type="body" color="secondary">
          {picked == null ? 'Nothing yet' : `${picked.emoji} ${picked.name}`}
        </Text>
      </HStack>
      <Card padding={0} width="100%">
        <EmojiPicker onSelect={(_, option) => setPicked(option)} />
      </Card>
    </VStack>
  );
}
