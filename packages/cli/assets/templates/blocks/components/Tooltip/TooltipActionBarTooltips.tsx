// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Tooltip} from '@blue-patterns/core/Tooltip';
import {Button} from '@blue-patterns/core/Button';
import {HStack} from '@blue-patterns/core/Layout';
import {Center} from '@blue-patterns/core/Center';

export default function TooltipActionBarTooltips() {
  return (
    <Center>
      <HStack gap={4}>
        <Tooltip content="Save your changes" placement="above">
          <Button label="Save" />
        </Tooltip>
        <Tooltip content="Discard changes" placement="above">
          <Button label="Cancel" />
        </Tooltip>
        <Tooltip content="Delete permanently" placement="above">
          <Button label="Delete" variant="destructive" />
        </Tooltip>
      </HStack>
    </Center>
  );
}
