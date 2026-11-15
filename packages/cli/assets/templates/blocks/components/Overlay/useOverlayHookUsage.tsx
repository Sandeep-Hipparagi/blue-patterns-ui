// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import type {RefObject} from 'react';
import {AspectRatio} from '@blue-patterns/core/AspectRatio';
import {Button} from '@blue-patterns/core/Button';
import {Card} from '@blue-patterns/core/Card';
import {VStack} from '@blue-patterns/core/Layout';
import {useOverlay} from '@blue-patterns/core/Overlay';
import {Text} from '@blue-patterns/core/Text';

export default function UseOverlayHookUsage() {
  const overlay = useOverlay({
    showOn: 'hover',
    position: 'bottom',
    align: 'center',
    content: <Button label="Quick view" variant="secondary" size="sm" />,
  });

  return (
    <Card
      width={280}
      padding={0}
      ref={overlay.containerRef as RefObject<HTMLDivElement | null>}
      {...overlay.containerProps}>
      <div style={{position: 'relative'}}>
        <a href="#ceramic-mug">
          <AspectRatio ratio={1}>
            <img
              src="/template-assets/light-product-1.png"
              alt="Ceramic mug"
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </AspectRatio>
        </a>
        {overlay.element}
      </div>
      <VStack gap={1} padding={3}>
        <Text type="body" weight="bold">
          Ceramic mug
        </Text>
        <Text type="supporting" color="secondary">
          $24
        </Text>
      </VStack>
    </Card>
  );
}
