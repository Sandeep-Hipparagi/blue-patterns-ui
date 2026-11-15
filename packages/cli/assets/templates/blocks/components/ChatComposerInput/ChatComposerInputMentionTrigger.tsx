// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {
  ChatComposer,
  ChatComposerInput,
  type ChatComposerTrigger,
} from '@blue-patterns/core/Chat';
import {createStaticSource} from '@blue-patterns/core/Typeahead';
import {TypeaheadItem} from '@blue-patterns/core/Typeahead';
import type {SearchableItem} from '@blue-patterns/core/Typeahead';
import {Stack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

const USERS: SearchableItem<{role: string}>[] = [
  {id: 'cindy', label: 'Cindy Zhang', auxiliaryData: {role: 'Design Systems'}},
  {id: 'alex', label: 'Alex Johnson', auxiliaryData: {role: 'Frontend'}},
  {id: 'sam', label: 'Sam Rivera', auxiliaryData: {role: 'Backend'}},
  {id: 'jordan', label: 'Jordan Lee', auxiliaryData: {role: 'Product'}},
];

const userSource = createStaticSource(USERS);

export default function ChatComposerInputMentionTrigger() {
  const [value, setValue] = useState('');

  const mentionTrigger: ChatComposerTrigger = {
    character: '@',
    searchSource: userSource,
    renderItem: item => (
      <TypeaheadItem
        item={item}
        description={(item.auxiliaryData as {role: string})?.role}
      />
    ),
    onSelect: item => ({
      value: `@${item.id}`,
      label: item.label,
      variant: 'blue' as const,
    }),
  };

  return (
    <Stack direction="vertical" gap={3} width={450} maxWidth="100%">
      <ChatComposer
        onSubmit={() => setValue('')}
        input={
          <ChatComposerInput
            value={value}
            onChange={setValue}
            triggers={[mentionTrigger]}
            placeholder="Type @ to mention someone..."
          />
        }
      />
      <Text type="supporting" color="secondary">
        Value: {JSON.stringify(value)}
      </Text>
    </Stack>
  );
}
