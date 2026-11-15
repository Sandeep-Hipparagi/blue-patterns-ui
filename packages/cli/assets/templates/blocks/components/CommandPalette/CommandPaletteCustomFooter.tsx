// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useMemo} from 'react';
import {
  CommandPalette,
  CommandPaletteFooter,
} from '@blue-patterns/core/CommandPalette';
import {Text} from '@blue-patterns/core/Text';
import {createStaticSource} from '@blue-patterns/core/Typeahead';

export default function CommandPaletteCustomFooter() {
  const source = useMemo(
    () =>
      createStaticSource([
        {id: 'home', label: 'Home'},
        {id: 'settings', label: 'Settings'},
      ]),
    [],
  );

  return (
    <CommandPalette
      isOpen
      isInline
      onOpenChange={() => {}}
      searchSource={source}
      footer={
        <CommandPaletteFooter>
          <Text type="supporting">Pro tip: use ⌘K to open anywhere</Text>
        </CommandPaletteFooter>
      }
    />
  );
}
