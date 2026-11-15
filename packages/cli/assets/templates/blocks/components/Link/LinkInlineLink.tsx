// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Link} from '@blue-patterns/core/Link';
import {Text} from '@blue-patterns/core/Text';

export default function LinkInlineLink() {
  return (
    <Text type="body">
      Read the <Link href="#">documentation</Link> for more information about
      using Astryx components.
    </Text>
  );
}
