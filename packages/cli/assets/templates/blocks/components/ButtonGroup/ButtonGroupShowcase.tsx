// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ButtonGroup} from '@blue-patterns/core/ButtonGroup';
import {Button} from '@blue-patterns/core/Button';
import {IconButton} from '@blue-patterns/core/IconButton';
import {Stack} from '@blue-patterns/core/Layout';
import {Icon} from '@blue-patterns/core/Icon';
import {
  ClipboardDocumentIcon,
  ScissorsIcon,
  ClipboardIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

export default function ButtonGroupShowcase() {
  return (
    <Stack direction="horizontal" gap={6} vAlign="center">
      <ButtonGroup label="Clipboard actions">
        <Button label="Copy" icon={<Icon icon={ClipboardDocumentIcon} />} />
        <Button label="Cut" icon={<Icon icon={ScissorsIcon} />} />
        <Button label="Paste" icon={<Icon icon={ClipboardIcon} />} />
      </ButtonGroup>
      <ButtonGroup label="Save options">
        <Button label="Save" variant="primary" />
        <IconButton
          label="Save options"
          variant="primary"
          icon={<Icon icon={ChevronDownIcon} />}
        />
      </ButtonGroup>
    </Stack>
  );
}
