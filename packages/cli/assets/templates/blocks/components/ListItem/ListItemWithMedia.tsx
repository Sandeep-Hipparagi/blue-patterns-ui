// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@blue-patterns/core/Avatar';
import {Badge} from '@blue-patterns/core/Badge';
import {Icon} from '@blue-patterns/core/Icon';
import {List, ListItem} from '@blue-patterns/core/List';

export default function ListItemWithMedia() {
  return (
    <List header="Team" hasDividers>
      <ListItem
        label="Ada Lovelace"
        description="Design systems engineer"
        startContent={<Avatar name="Ada Lovelace" size="sm" />}
        endContent={<Badge label="Owner" variant="purple" />}
        onClick={() => {}}
      />
      <ListItem
        label="Grace Hopper"
        description="Platform infrastructure"
        startContent={<Avatar name="Grace Hopper" size="sm" />}
        endContent={<Badge label="On call" variant="blue" />}
        onClick={() => {}}
      />
      <ListItem
        label="Invite teammate"
        description="Send an invitation to collaborate"
        startContent={<Icon icon="info" size="sm" color="secondary" />}
        onClick={() => {}}
      />
    </List>
  );
}
