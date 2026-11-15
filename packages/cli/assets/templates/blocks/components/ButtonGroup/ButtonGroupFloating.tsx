// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ButtonGroup} from '@blue-patterns/core/ButtonGroup';
import {Button} from '@blue-patterns/core/Button';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

export default function ButtonGroupFloating() {
  return (
    <Stack direction="vertical" gap={3} hAlign="start">
      <Text type="supporting" color="secondary">
        The whole group shares one raised surface — a floating action bar
      </Text>
      <ButtonGroup label="Zoom controls" elevation="med">
        <Button label="Zoom out" />
        <Button label="Reset" />
        <Button label="Zoom in" />
      </ButtonGroup>
    </Stack>
  );
}
