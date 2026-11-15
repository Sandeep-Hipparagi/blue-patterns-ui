// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {
  TopNav,
  TopNavHeading,
  TopNavItem,
  TopNavMegaMenu,
  TopNavMegaMenuItem,
  TopNavMegaMenuFeaturedCard,
} from '@blue-patterns/core/TopNav';
import {NavIcon} from '@blue-patterns/core/NavIcon';
import {Button} from '@blue-patterns/core/Button';
import {Icon} from '@blue-patterns/core/Icon';
import {
  CubeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  CodeBracketIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function TopNavMegaMenuBlock() {
  return (
    <TopNav
      label="Marketing navigation"
      heading={
        <TopNavHeading
          heading="My App"
          logo={<NavIcon icon={<Icon icon={CubeIcon} size="sm" />} />}
          headingHref="#"
        />
      }
      startContent={
        <>
          <TopNavMegaMenu
            label="Products"
            items={
              <>
                <TopNavMegaMenuItem
                  title="Analytics"
                  description="Track and analyze user behavior across your apps"
                  icon={<ChartBarIcon />}
                  href="#analytics"
                />
                <TopNavMegaMenuItem
                  title="Security"
                  description="Enterprise-grade protection for your data"
                  icon={<ShieldCheckIcon />}
                  href="#security"
                />
                <TopNavMegaMenuItem
                  title="Automation"
                  description="Streamline workflows with intelligent tools"
                  icon={<BoltIcon />}
                  href="#automation"
                />
                <TopNavMegaMenuItem
                  title="Developer Tools"
                  description="APIs, SDKs, and CLI for integration"
                  icon={<CodeBracketIcon />}
                  href="#dev-tools"
                />
                <TopNavMegaMenuItem
                  title="Global Network"
                  description="Low-latency edge infra in 40+ regions"
                  icon={<GlobeAltIcon />}
                  href="#network"
                />
              </>
            }
            featured={
              <TopNavMegaMenuFeaturedCard
                title="What's new in v4.0"
                description="AI-powered analytics and real-time collaboration."
                image="/template-assets/light-working-horizontal-1.png"
                imageAlt="Team collaboration"
                linkLabel="Read the announcement"
                linkHref="#announcement"
              />
            }
          />
          <TopNavItem label="Pricing" href="#" />
          <TopNavItem label="Docs" href="#" />
        </>
      }
      endContent={
        <>
          <Button label="Sign in" variant="ghost" />
          <Button label="Get started" variant="primary" />
        </>
      }
    />
  );
}
