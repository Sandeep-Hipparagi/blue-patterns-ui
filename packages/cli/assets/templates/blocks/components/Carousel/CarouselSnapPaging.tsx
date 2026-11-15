// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {Card} from '@blue-patterns/core/Card';
import {Carousel} from '@blue-patterns/core/Carousel';
import {Stack} from '@blue-patterns/core/Layout';
import {useSnapPaging} from '@blue-patterns/core/SnapPaging';
import {Switch} from '@blue-patterns/core/Switch';
import {Text} from '@blue-patterns/core/Text';

const SCREENS = [
  {title: 'Welcome', body: 'Swipe to see what is new.'},
  {title: 'Shared albums', body: 'Invite friends to add their photos.'},
  {title: 'Memories', body: 'See a day from years ago.'},
  {title: 'Search', body: 'Find a photo by what is in it.'},
  {title: 'All set', body: 'Your library is ready.'},
];

export default function CarouselSnapPaging() {
  const [isOneCard, setIsOneCard] = useState(false);
  // A flick moves one view, or one card with {pages: 'item'}.
  const paging = useSnapPaging({pages: isOneCard ? 'item' : 'view'});

  return (
    <Stack direction="vertical" gap={3} style={{maxWidth: 520, padding: 8}}>
      <Switch
        label="One card per flick"
        value={isOneCard}
        onChange={setIsOneCard}
      />
      <Carousel gap={2} hasSnap={paging} aria-label="Onboarding">
        {SCREENS.map(screen => (
          <Card key={screen.title} width={220} minHeight={160}>
            <Stack direction="vertical" gap={1}>
              <Text type="body" weight="bold">
                {screen.title}
              </Text>
              <Text type="body" color="secondary">
                {screen.body}
              </Text>
            </Stack>
          </Card>
        ))}
      </Carousel>
    </Stack>
  );
}
