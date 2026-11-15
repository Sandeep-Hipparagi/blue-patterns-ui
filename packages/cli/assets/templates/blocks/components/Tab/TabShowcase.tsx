// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {TabList, Tab} from '@blue-patterns/core/TabList';
import {Badge} from '@blue-patterns/core/Badge';

export default function TabShowcase() {
  const [value, setValue] = useState('inbox');
  return (
    <TabList value={value} onChange={setValue}>
      <Tab
        value="inbox"
        label="Inbox"
        endContent={<Badge label="3" variant="info" />}
      />
    </TabList>
  );
}
