// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Icon} from '@blue-patterns/core/Icon';
import {HStack, VStack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

const colors = [
  'blue',
  'red',
  'green',
  'gray',
  'cyan',
  'teal',
  'yellow',
  'orange',
  'pink',
  'purple',
] as const;

export default function IconNonSemanticColors() {
  return (
    <HStack gap={4} wrap="wrap">
      {colors.map(color => (
        <VStack key={color} gap={1} hAlign="center">
          <Icon icon="search" color={color} />
          <Text type="supporting">{color}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
