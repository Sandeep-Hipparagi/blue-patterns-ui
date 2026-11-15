// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {MobileNav, MobileNavToggle} from '@blue-patterns/core/MobileNav';
import {AppShellMobileContext} from '@blue-patterns/core/AppShell';
import {SideNavItem, SideNavSection} from '@blue-patterns/core/SideNav';
import {HStack} from '@blue-patterns/core/Layout';
import {Text} from '@blue-patterns/core/Text';

export default function MobileNavToggleShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AppShellMobileContext.Provider
      value={{
        isMobile: true,
        isMobileNavOpen: isOpen,
        toggleMobileNav: () => setIsOpen(v => !v),
        openMobileNav: () => setIsOpen(true),
        closeMobileNav: () => setIsOpen(false),
        isMobileNavEnabled: true,
        hasAutoToggle: false,
      }}>
      <HStack gap={3} vAlign="center">
        <MobileNavToggle />
        <Text type="body" weight="bold">
          Page title
        </Text>
      </HStack>
      <MobileNav isOpen={isOpen} onOpenChange={setIsOpen} header="Navigation">
        <SideNavSection title="Pages">
          <SideNavItem label="Home" isSelected href="#" />
          <SideNavItem label="Settings" href="#" />
        </SideNavSection>
      </MobileNav>
    </AppShellMobileContext.Provider>
  );
}
