// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useMemo} from 'react';
import {
  CommandPalette,
  CommandPaletteInput,
} from '@blue-patterns/core/CommandPalette';
import {Kbd} from '@blue-patterns/core/Kbd';
import {createStaticSource} from '@blue-patterns/core/Typeahead';

export default function CommandPaletteInputBasic() {
  const source = useMemo(
    () =>
      createStaticSource([
        {id: 'home', label: 'Home'},
        {id: 'settings', label: 'Settings'},
        {id: 'profile', label: 'Profile'},
        {id: 'help', label: 'Help'},
      ]),
    [],
  );

  return (
    <CommandPalette
      isOpen
      isInline
      onOpenChange={() => {}}
      searchSource={source}
      input={
        <CommandPaletteInput
          placeholder="Search commands, files, or actions..."
          endContent={<Kbd keys="mod+k" />}
        />
      }
    />
  );
}
