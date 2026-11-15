// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useTooltip} from '@blue-patterns/core/Tooltip';
import {Button} from '@blue-patterns/core/Button';
import {Center} from '@blue-patterns/core/Center';

export default function TooltipHookUsage() {
  const tooltip = useTooltip({
    placement: 'above',
    delay: 100,
  });

  return (
    <Center>
      <Button
        label="Using hook directly"
        ref={tooltip.ref}
        aria-describedby={tooltip.describedBy}
      />
      {tooltip.renderTooltip('Tooltip via hook')}
    </Center>
  );
}
