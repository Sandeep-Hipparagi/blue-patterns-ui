// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {AspectRatio} from '@blue-patterns/core/AspectRatio';
import {Skeleton} from '@blue-patterns/core/Skeleton';
import {Center} from '@blue-patterns/core/Center';

export default function AspectRatioWithSkeleton() {
  return (
    <Center width={600}>
      <AspectRatio ratio={16 / 9}>
        <Skeleton width="100%" height="100%" />
      </AspectRatio>
    </Center>
  );
}
