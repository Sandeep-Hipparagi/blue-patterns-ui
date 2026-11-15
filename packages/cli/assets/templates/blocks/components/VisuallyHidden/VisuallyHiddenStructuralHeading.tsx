// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {VisuallyHidden} from '@blue-patterns/core/VisuallyHidden';
import {Card} from '@blue-patterns/core/Card';
import {HStack, VStack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';
import {Badge} from '@blue-patterns/core/Badge';

const items = [
  {name: 'astryx-core', status: 'Passing', variant: 'success'},
  {name: 'astryx-charts', status: 'Failing', variant: 'error'},
  {name: 'astryx-cli', status: 'Passing', variant: 'success'},
] as const;

export default function VisuallyHiddenStructuralHeading() {
  return (
    <VStack gap={3} hAlign="start">
      <Text type="supporting" color="secondary">
        The layout makes this group obvious to sighted users. A hidden heading
        gives screen-reader users the same landmark to jump to.
      </Text>
      {/* No visible heading is needed here, but AT users navigate by heading. */}
      <VisuallyHidden as="h2">Build status</VisuallyHidden>
      <VStack gap={2}>
        {items.map(({name, status, variant}) => (
          <Card key={name} variant="muted" padding={3}>
            <HStack gap={3} vAlign="center">
              <Text type="body">{name}</Text>
              <Badge label={status} variant={variant} />
            </HStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
}
