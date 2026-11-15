// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ChatComposer, ChatComposerInput} from '@blue-patterns/core/Chat';
import {Stack} from '@blue-patterns/core/Layout';

export default function ChatComposerInputShowcase() {
  return (
    <Stack direction="vertical" width={450} maxWidth="100%">
      <ChatComposer
        onSubmit={() => {}}
        input={
          <ChatComposerInput placeholder="Ask me anything about Astryx..." />
        }
      />
    </Stack>
  );
}
