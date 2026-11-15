// Copyright (c) Meta Platforms, Inc. and affiliates.

// @vitest-environment jsdom

import type {ReactNode} from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/templates',
  useRouter: () => ({replace: vi.fn()}),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock('@stylexjs/stylex', () => ({
  create: <T,>(styles: T) => styles,
  props: () => ({}),
}));
vi.mock('@blue-patterns/core/AppShell', () => ({
  useAppShellMobile: () => ({isMobile: true}),
}));
vi.mock('@blue-patterns/core/Text', () => ({
  Heading: ({children}: {children: ReactNode}) => <h2>{children}</h2>,
  Text: ({children}: {children: ReactNode}) => <span>{children}</span>,
}));
vi.mock('@blue-patterns/core/Layout', () => ({
  VStack: ({children}: {children: ReactNode}) => <div>{children}</div>,
  HStack: ({children}: {children: ReactNode}) => <div>{children}</div>,
}));
vi.mock('@blue-patterns/core/Section', () => ({
  Section: ({children}: {children: ReactNode}) => <section>{children}</section>,
}));
vi.mock('@blue-patterns/core/Grid', () => ({
  Grid: ({children}: {children: ReactNode}) => <div>{children}</div>,
}));
vi.mock('@blue-patterns/core/ClickableCard', () => ({
  ClickableCard: ({label, children}: {label: string; children: ReactNode}) => (
    <button aria-label={label}>{children}</button>
  ),
}));
vi.mock('@blue-patterns/core/Button', () => ({
  Button: ({label}: {label: string}) => <span>{label}</span>,
}));
vi.mock('@blue-patterns/core/Overlay', () => ({
  Overlay: ({children}: {children: ReactNode}) => <>{children}</>,
}));
vi.mock('@blue-patterns/core/ToggleButton', () => ({
  ToggleButtonGroup: ({children}: {children: ReactNode}) => (
    <div>{children}</div>
  ),
  ToggleButton: ({label}: {label: string}) => <span>{label}</span>,
}));
vi.mock('../generated/templateMetadataRegistry', () => ({
  templateMetadata: [
    {
      name: 'Metrics dashboard',
      slug: 'metrics',
      category: 'Dashboard',
      description: '',
      isReady: true,
      isHiddenFromOverview: false,
    },
    {
      name: 'AI chat',
      slug: 'ai-chat',
      category: 'AI Chat',
      description: '',
      isReady: true,
      isHiddenFromOverview: false,
    },
    {
      name: 'Settings',
      slug: 'settings',
      category: 'Settings',
      description: '',
      isReady: true,
      isHiddenFromOverview: false,
    },
  ],
}));
vi.mock('../components/TemplateThumbnail', () => ({
  TemplateThumbnail: ({slug}: {slug: string}) => <span>{slug}</span>,
}));
vi.mock('../lib/analytics', () => ({
  trackOpenPlayground: vi.fn(),
  trackView: vi.fn(),
}));
vi.mock('../layout.stylex', () => ({layout: {contentMaxWidth: '1200px'}}));

import TemplatesPage from '../app/(site)/templates/page';

describe('TemplatesGallery order', () => {
  it('renders the All view alphabetically by title', () => {
    render(<TemplatesPage />);

    expect(
      screen
        .getAllByRole('button', {name: /^Preview /})
        .map(button => button.getAttribute('aria-label')),
    ).toEqual([
      'Preview AI chat',
      'Preview Metrics dashboard',
      'Preview Settings',
    ]);
  });
});
