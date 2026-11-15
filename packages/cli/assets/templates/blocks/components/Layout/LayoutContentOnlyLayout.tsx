// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Layout, LayoutContent, VStack} from '@blue-patterns/core/Layout';
import {Card} from '@blue-patterns/core/Card';
import {Heading, Text} from '@blue-patterns/core/Text';

export default function LayoutContentOnlyLayout() {
  return (
    <Card width="100%" style={{maxWidth: 400}}>
      <Layout
        content={
          <LayoutContent>
            <VStack gap={3}>
              <Heading level={4}>Simple Content</Heading>
              <Text type="body">
                A layout can have just content without header or footer. This is
                useful for simple cards or content blocks that don&apos;t need
                structured sections.
              </Text>
            </VStack>
          </LayoutContent>
        }
      />
    </Card>
  );
}
