// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Tooltip} from '@blue-patterns/core/Tooltip';
import {Button} from '@blue-patterns/core/Button';

export default function TooltipShowcase() {
  return (
    <Tooltip content="This is a helpful tooltip" placement="above">
      <Button label="Hover me" />
    </Tooltip>
  );
}
