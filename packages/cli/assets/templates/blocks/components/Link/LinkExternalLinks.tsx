// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Link} from '@blue-patterns/core/Link';
import {VStack} from '@blue-patterns/core/Layout';

export default function LinkExternalLinks() {
  return (
    <VStack gap={2}>
      <Link href="https://github.com" isExternalLink isStandalone>
        GitHub
      </Link>
      <Link href="https://developer.mozilla.org" isExternalLink isStandalone>
        MDN Web Docs
      </Link>
      <Link href="https://react.dev" isExternalLink hasUnderline isStandalone>
        React Documentation
      </Link>
    </VStack>
  );
}
