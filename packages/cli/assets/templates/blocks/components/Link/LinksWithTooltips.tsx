// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Link} from '@blue-patterns/core/Link';
import {HStack} from '@blue-patterns/core/Layout';

export default function LinksWithTooltips() {
  return (
    <HStack gap={4} vAlign="center">
      <Link href="#" tooltip="Configure your account settings" isStandalone>
        Settings
      </Link>
      <Link href="#" tooltip="View and edit your profile" isStandalone>
        Profile
      </Link>
      <Link
        href="#"
        tooltip="Get help and support"
        color="secondary"
        isStandalone>
        Help
      </Link>
    </HStack>
  );
}
