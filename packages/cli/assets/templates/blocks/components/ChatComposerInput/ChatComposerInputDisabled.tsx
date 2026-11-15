// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ChatComposer, ChatComposerInput} from '@blue-patterns/core/Chat';
import {Stack} from '@blue-patterns/core/Layout';

export default function ChatComposerInputDisabled() {
  return (
    <Stack direction="vertical" width={450} maxWidth="100%">
      <ChatComposer
        onSubmit={() => {}}
        isDisabled
        input={<ChatComposerInput isDisabled placeholder="Input is disabled" />}
      />
    </Stack>
  );
}
