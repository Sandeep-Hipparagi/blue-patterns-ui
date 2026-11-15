// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {HoverCard} from '@blue-patterns/core/HoverCard';
import {Avatar} from '@blue-patterns/core/Avatar';
import {Button} from '@blue-patterns/core/Button';
import {Icon} from '@blue-patterns/core/Icon';
import {VStack, HStack} from '@blue-patterns/core/Layout';
import {Text, Heading} from '@blue-patterns/core/Text';
import {CalendarIcon} from '@heroicons/react/24/outline';

export default function HoverCardProfileHoverCard() {
  return (
    <HoverCard
      placement="below"
      content={
        <HStack gap={3} vAlign="start" style={{maxWidth: 280}}>
          <Avatar name="Jane Doe" size={48} style={{flexShrink: 0}} />
          <VStack gap={1}>
            <Heading level={3}>@janedoe</Heading>
            <Text type="body" color="secondary">
              Crafting accessible, scalable design systems for modern teams.
            </Text>
            <HStack gap={1} vAlign="center">
              <Icon icon={CalendarIcon} size="xsm" color="secondary" />
              <Text type="supporting" color="secondary">
                March 2024
              </Text>
            </HStack>
          </VStack>
        </HStack>
      }>
      <Button label="@janedoe" variant="ghost" />
    </HoverCard>
  );
}
