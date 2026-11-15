// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useMemo} from 'react';
import {CommandPalette} from '@blue-patterns/core/CommandPalette';
import {Text} from '@blue-patterns/core/Text';
import {createStaticSource} from '@blue-patterns/core/Typeahead';

export default function CommandPaletteEmptyShowcase() {
  const emptySource = useMemo(() => createStaticSource([]), []);

  return (
    <CommandPalette
      isOpen
      isInline
      onOpenChange={() => {}}
      searchSource={emptySource}
      emptyBootstrapText={
        <Text type="supporting" color="secondary">
          No commands available yet
        </Text>
      }
    />
  );
}
