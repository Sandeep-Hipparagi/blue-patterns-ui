// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @input Controlled popover state and the text the picks build
 * @output An emoji button opening the picker in a Popover; the Popover's own
 *   autofocus lands in the picker's search field
 * @position Copyable Lab EmojiPicker example
 */

import {useState} from 'react';
import {HStack} from '@blue-patterns/core/Layout';
import {IconButton} from '@blue-patterns/core/IconButton';
import {Popover} from '@blue-patterns/core/Popover';
import {Text} from '@blue-patterns/core/Text';
import {EmojiPicker} from '@blue-patterns/lab';

export default function EmojiPickerInPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  return (
    <HStack gap={2} align="center">
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        label="Add emoji"
        padding={0}
        width={352}
        content={
          <EmojiPicker
            onSelect={emoji => {
              setText(current => current + emoji);
              setIsOpen(false);
            }}
          />
        }>
        <IconButton
          label="Add emoji"
          variant="secondary"
          icon={<span aria-hidden="true">🙂</span>}
        />
      </Popover>
      <Text type="large">{text === '' ? 'Pick some emoji' : text}</Text>
    </HStack>
  );
}
