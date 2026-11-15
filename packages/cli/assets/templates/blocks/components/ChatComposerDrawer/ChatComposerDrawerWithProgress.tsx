// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ChatComposer, ChatComposerDrawer} from '@blue-patterns/core/Chat';
import {Token} from '@blue-patterns/core/Token';
import {ProgressBar} from '@blue-patterns/core/ProgressBar';
import {Stack} from '@blue-patterns/core/Layout';
import {Button} from '@blue-patterns/core/Button';
import {Icon} from '@blue-patterns/core/Icon';
import {PaperClipIcon, AtSymbolIcon} from '@heroicons/react/24/outline';

export default function ChatComposerDrawerWithProgress() {
  return (
    <Stack direction="vertical" gap={4} width={450} maxWidth="100%">
      <ChatComposer
        onSubmit={() => {}}
        drawer={
          <ChatComposerDrawer count={3} label="Attachments">
            <Token label="design-spec.pdf" onRemove={() => {}} />
            <Token label="api-schema.json" onRemove={() => {}} />
            <Token label="screenshot.png" onRemove={() => {}} />
          </ChatComposerDrawer>
        }
        headerActions={
          <>
            <Button
              label="Mention"
              variant="ghost"
              size="sm"
              icon={<Icon icon={AtSymbolIcon} size="sm" />}
              isIconOnly
              onClick={() => {}}
            />
            <Button
              label="Attach"
              variant="ghost"
              size="sm"
              icon={<Icon icon={PaperClipIcon} size="sm" />}
              isIconOnly
              onClick={() => {}}
            />
          </>
        }
        headerContext={
          <Stack direction="horizontal" gap={2} vAlign="center">
            <ProgressBar value={42} label="Context usage" isLabelHidden />
          </Stack>
        }
      />
    </Stack>
  );
}
