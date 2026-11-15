import React from 'react';
import { useStudioTheme } from '../../components/ThemeContext';
import { getContrastRatio, getWcagRating, DARK_CANVAS_HEX, WHITE_HEX } from './contrast';

export function ColorContrastGenerator() {
  const { customTokens, updateCustomTokens, colorMode } = useStudioTheme();

  // Compute contrast ratios against current canvas surface
  const surfaceColor = colorMode === 'dark' ? DARK_CANVAS_HEX : customTokens.surfaceBase;
  const primaryOnSurface = getContrastRatio(customTokens.primaryBase, surfaceColor);
  const primaryRating = getWcagRating(primaryOnSurface);

  const whiteOnPrimary = getContrastRatio(WHITE_HEX, customTokens.primaryBase);
  const whiteOnPrimaryRating = getWcagRating(whiteOnPrimary);

  const accentOnSurface = getContrastRatio(customTokens.accentBase, surfaceColor);
  const accentRating = getWcagRating(accentOnSurface);

  return (
    <div className="workbench-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
          Color & Contrast Generator
        </h3>
        <span
          className="contrast-chip"
          data-status={primaryRating.aaNormal ? 'pass' : 'fail'}
        >
          {primaryRating.label} ({primaryOnSurface}:1)
        </span>
      </div>

      <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
        Adjust semantic brand seeds to compute accessible surface pairs with real-time WCAG 2.1 compliance metrics.
      </p>

      {/* Color Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3)' }}>
        {/* Primary Base */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <label
            htmlFor="primary-color-input"
            style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}
          >
            Primary Brand
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <input
              id="primary-color-input"
              type="color"
              value={customTokens.primaryBase}
              onChange={(e) => updateCustomTokens({ primaryBase: e.target.value })}
              style={{
                width: 'var(--spacing-8)',
                height: 'var(--spacing-8)',
                padding: 0,
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            />
            <input
              type="text"
              value={customTokens.primaryBase}
              onChange={(e) => updateCustomTokens({ primaryBase: e.target.value })}
              aria-label="Primary Brand Hex Code"
              style={{
                flex: 1,
                padding: 'var(--spacing-1) var(--spacing-2)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--typography-size-xs)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-primary)',
                fontFamily: 'monospace',
              }}
            />
          </div>
        </div>

        {/* Accent Base */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <label
            htmlFor="accent-color-input"
            style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}
          >
            Accent Brand
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <input
              id="accent-color-input"
              type="color"
              value={customTokens.accentBase}
              onChange={(e) => updateCustomTokens({ accentBase: e.target.value })}
              style={{
                width: 'var(--spacing-8)',
                height: 'var(--spacing-8)',
                padding: 0,
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            />
            <input
              type="text"
              value={customTokens.accentBase}
              onChange={(e) => updateCustomTokens({ accentBase: e.target.value })}
              aria-label="Accent Brand Hex Code"
              style={{
                flex: 1,
                padding: 'var(--spacing-1) var(--spacing-2)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--typography-size-xs)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-primary)',
                fontFamily: 'monospace',
              }}
            />
          </div>
        </div>

        {/* Surface Base */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <label
            htmlFor="surface-color-input"
            style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}
          >
            Surface Canvas
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <input
              id="surface-color-input"
              type="color"
              value={customTokens.surfaceBase}
              onChange={(e) => updateCustomTokens({ surfaceBase: e.target.value })}
              style={{
                width: 'var(--spacing-8)',
                height: 'var(--spacing-8)',
                padding: 0,
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            />
            <input
              type="text"
              value={customTokens.surfaceBase}
              onChange={(e) => updateCustomTokens({ surfaceBase: e.target.value })}
              aria-label="Surface Canvas Hex Code"
              style={{
                flex: 1,
                padding: 'var(--spacing-1) var(--spacing-2)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--typography-size-xs)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-primary)',
                fontFamily: 'monospace',
              }}
            />
          </div>
        </div>

        {/* Neutral Base */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <label
            htmlFor="neutral-color-input"
            style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}
          >
            Neutral Text & Border
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <input
              id="neutral-color-input"
              type="color"
              value={customTokens.neutralBase}
              onChange={(e) => updateCustomTokens({ neutralBase: e.target.value })}
              style={{
                width: 'var(--spacing-8)',
                height: 'var(--spacing-8)',
                padding: 0,
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            />
            <input
              type="text"
              value={customTokens.neutralBase}
              onChange={(e) => updateCustomTokens({ neutralBase: e.target.value })}
              aria-label="Neutral Hex Code"
              style={{
                flex: 1,
                padding: 'var(--spacing-1) var(--spacing-2)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--typography-size-xs)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-primary)',
                fontFamily: 'monospace',
              }}
            />
          </div>
        </div>
      </div>

      {/* WCAG Audit Scores */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-2)',
          border: '1px solid var(--color-neutral-border)',
        }}
      >
        <div style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          WCAG 2.1 Contrast Telemetry
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <span>Primary on Canvas ({surfaceColor}):</span>
          <span style={{ fontWeight: 600 }}>
            {primaryOnSurface}:1 — {primaryRating.label}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <span>White Text on Primary:</span>
          <span style={{ fontWeight: 600 }}>
            {whiteOnPrimary}:1 — {whiteOnPrimaryRating.label}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <span>Accent on Canvas ({surfaceColor}):</span>
          <span style={{ fontWeight: 600 }}>
            {accentOnSurface}:1 — {accentRating.label}
          </span>
        </div>
      </div>
    </div>
  );
}
