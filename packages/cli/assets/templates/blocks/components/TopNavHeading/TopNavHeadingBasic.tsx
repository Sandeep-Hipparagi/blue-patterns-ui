// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {TopNav, TopNavHeading} from '@blue-patterns/core/TopNav';
import {NavIcon} from '@blue-patterns/core/NavIcon';
import {Icon} from '@blue-patterns/core/Icon';

export default function TopNavHeadingBasic() {
  return (
    <TopNav
      label="Product navigation"
      heading={
        <TopNavHeading
          heading="Acme Platform"
          logo={<NavIcon icon={<Icon icon="viewColumns" />} />}
          headingHref="/"
        />
      }
    />
  );
}
