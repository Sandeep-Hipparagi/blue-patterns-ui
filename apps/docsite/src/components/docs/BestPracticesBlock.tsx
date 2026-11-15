// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Badge} from '@blue-patterns/core/Badge';
import {Card} from '@blue-patterns/core/Card';
import {Table, pixel} from '@blue-patterns/core/Table';
import {MarkdownText} from '../MarkdownText';

interface BestPracticesItem {
  guidance: boolean;
  description: string;
}

export function BestPracticesBlock({items}: {items: BestPracticesItem[]}) {
  const data = items.map(item => ({
    guidance: item.guidance as unknown,
    description: item.description as unknown,
  })) as Record<string, unknown>[];

  return (
    <Card variant="default">
      <Table
        data={data}
        columns={[
          {
            key: 'guidance',
            header: 'Guidance',
            width: pixel(100),
            renderCell: (item: Record<string, unknown>) => (
              <Badge
                label={item.guidance ? 'Do' : "Don't"}
                variant={item.guidance ? 'success' : 'error'}
              />
            ),
          },
          {
            key: 'description',
            header: 'Practices',
            renderCell: (item: Record<string, unknown>) => (
              <MarkdownText type="body">
                {item.description as string}
              </MarkdownText>
            ),
          },
        ]}
        density="spacious"
        dividers="rows"
      />
    </Card>
  );
}
