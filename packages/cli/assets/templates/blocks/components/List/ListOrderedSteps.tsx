// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {List, ListItem} from '@blue-patterns/core/List';

export default function ListOrderedSteps() {
  return (
    <List listStyle="decimal">
      <ListItem
        label="Install the package"
        description="npm install @blue-patterns/core"
      />
      <ListItem
        label="Import components"
        description="import { List } from '@blue-patterns/core'"
      />
      <ListItem
        label="Start building"
        description="Use components in your app"
      />
    </List>
  );
}
