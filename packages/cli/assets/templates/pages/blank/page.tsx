// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Layout, LayoutContent} from '@blue-patterns/core';
import {Text} from '@blue-patterns/core';

export default function Page() {
  return (
    <Layout
      content={
        <LayoutContent>
          <Text type="large">New Page</Text>
        </LayoutContent>
      }
    />
  );
}
