// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Code} from '@blue-patterns/core/CodeBlock';
import {Text} from '@blue-patterns/core/Text';
import {Heading} from '@blue-patterns/core/Text';
import {VStack} from '@blue-patterns/core/Stack';

export default function CodeAcrossTextSizes() {
  return (
    <VStack gap={3}>
      <Heading level={3}>
        Heading with <Code>inline code</Code>
      </Heading>
      <Text type="body">
        Body text with <Code>inline code</Code>
      </Text>
      <Text type="supporting">
        Supporting text with <Code>inline code</Code>
      </Text>
      <Text type="label">
        Label text with <Code>inline code</Code>
      </Text>
    </VStack>
  );
}
