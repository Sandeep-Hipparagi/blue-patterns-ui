import React from 'react';
import { useStudioTheme, ThemePreset } from './ThemeContext';
import { Button, Badge } from '@blue-patterns/core';
import {
  SunIcon,
  MoonIcon,
  PaletteIcon,
  GridIcon,
  TerminalIcon,
  LayoutIcon,
  MotionIcon,
} from './Icons';

interface AppShellProps {
  children: React.ReactNode;
}

const THEME_OPTIONS: { id: ThemePreset; label: string }[] = [
  { id: 'default', label: 'Default Blue' },
  { id: 'obsidian', label: 'Obsidian' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'glass', label: 'Glassmorphism' },
  { id: 'forest', label: 'Forest' },
  { id: 'cobalt', label: 'Cobalt' },
  { id: 'high-contrast', label: 'High Contrast' },
];

export function AppShell({ children }: AppShellProps) {
  const {
    theme,
    setTheme,
    colorMode,
    toggleColorMode,
    direction,
    toggleDirection,
    reducedMotion,
    setReducedMotion,
    activeModule,
    setActiveModule,
  } = useStudioTheme();

  return (
    <div className="studio-root" data-theme={theme} data-mode={colorMode}>
      {/* Top Navigation Bar */}
      <header className="studio-header" role="banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <div className="studio-brand">
            <span
              style={{
                width: 'var(--spacing-6)',
                height: 'var(--spacing-6)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary-base)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary-contrast)',
                fontWeight: 800,
                fontSize: 'var(--typography-size-xs)',
              }}
            >
              BP
            </span>
            <span>Blue-Patterns Studio</span>
          </div>
          <Badge label="v0.1.0-alpha" variant="blue" />
          <Badge label="React 19" variant="neutral" />
        </div>

        {/* Global Controls */}
        <div className="studio-header-actions">
          {/* Theme Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <label
              htmlFor="theme-selector"
              style={{
                fontSize: 'var(--typography-size-xs)',
                color: 'var(--color-text-secondary)',
                fontWeight: 600,
              }}
            >
              Theme:
            </label>
            <select
              id="theme-selector"
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemePreset)}
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-1) var(--spacing-2)',
                fontSize: 'var(--typography-size-sm)',
                cursor: 'pointer',
              }}
            >
              {THEME_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleColorMode}
            aria-label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
            title={`Toggle Light/Dark (${colorMode})`}
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              cursor: 'pointer',
              fontSize: 'var(--typography-size-xs)',
              fontWeight: 500,
            }}
          >
            {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            <span>{colorMode === 'light' ? 'Light' : 'Dark'}</span>
          </button>

          {/* LTR / RTL Switch */}
          <button
            type="button"
            onClick={toggleDirection}
            aria-label={`Direction: ${direction.toUpperCase()}`}
            title="Toggle LTR/RTL layout direction"
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              cursor: 'pointer',
              fontSize: 'var(--typography-size-xs)',
              fontWeight: 600,
            }}
          >
            {direction.toUpperCase()}
          </button>

          {/* Reduced Motion Simulator */}
          <button
            type="button"
            onClick={() => setReducedMotion(!reducedMotion)}
            aria-pressed={reducedMotion}
            aria-label="Simulate reduced motion"
            title="Toggle Reduced Motion Simulation"
            style={{
              backgroundColor: reducedMotion
                ? 'var(--color-warning-subtle)'
                : 'var(--color-surface-subtle)',
              color: reducedMotion
                ? 'var(--color-warning-base)'
                : 'var(--color-text-primary)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              cursor: 'pointer',
              fontSize: 'var(--typography-size-xs)',
              fontWeight: 500,
            }}
          >
            <MotionIcon />
            <span>{reducedMotion ? 'Reduced Motion: ON' : 'Motion: Full'}</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body: Sidebar + Viewport */}
      <div className="studio-body">
        <aside className="studio-sidebar" role="navigation" aria-label="Studio Modules">
          <div
            style={{
              paddingInline: 'var(--spacing-2)',
              paddingBlock: 'var(--spacing-1)',
              fontSize: 'var(--typography-size-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-muted)',
            }}
          >
            Studio Modules
          </div>

          <button
            type="button"
            className="studio-nav-button"
            data-active={activeModule === 'tokens'}
            onClick={() => setActiveModule('tokens')}
          >
            <PaletteIcon />
            <span>Token & Motion Studio</span>
          </button>

          <button
            type="button"
            className="studio-nav-button"
            data-active={activeModule === 'matrix'}
            onClick={() => setActiveModule('matrix')}
          >
            <GridIcon />
            <span>Component Matrix</span>
          </button>

          <button
            type="button"
            className="studio-nav-button"
            data-active={activeModule === 'agent'}
            onClick={() => setActiveModule('agent')}
          >
            <TerminalIcon />
            <span>Agent & CLI Inspector</span>
          </button>

          <button
            type="button"
            className="studio-nav-button"
            data-active={activeModule === 'registry'}
            onClick={() => setActiveModule('registry')}
          >
            <LayoutIcon />
            <span>Template Registry</span>
          </button>

          <div style={{ marginTop: 'auto', padding: 'var(--spacing-2)' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-2)',
              }}
            >
              <div style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>
                100% Dogfooding Proof
              </div>
              <p
                style={{
                  fontSize: 'var(--typography-size-xs)',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                No Tailwind, Radix, or runtime CSS. Pure React 19 + StyleX static bundles.
              </p>
            </div>
          </div>
        </aside>

        <main className="studio-main" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
