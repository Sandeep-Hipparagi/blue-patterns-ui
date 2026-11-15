import React from 'react';
import { useStudioTheme, Density } from '../../components/ThemeContext';

export function ScaleDensitySliders() {
  const { customTokens, updateCustomTokens } = useStudioTheme();

  return (
    <div className="workbench-card">
      <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
        Scale & Density Tuner
      </h3>

      {/* Border Radius Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <label htmlFor="radius-slider" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Corner Radius Scale
          </label>
          <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
            {customTokens.borderRadius}px
          </span>
        </div>
        <input
          id="radius-slider"
          type="range"
          min="0"
          max="24"
          step="2"
          value={customTokens.borderRadius}
          onChange={(e) => updateCustomTokens({ borderRadius: Number(e.target.value) })}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-muted)' }}>
          <span>0px (Sharp)</span>
          <span>8px (Balanced)</span>
          <span>24px (Pill)</span>
        </div>
      </div>

      {/* Spacing Density */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          Layout Density
        </span>
        <div
          role="radiogroup"
          aria-label="Density Selection"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--spacing-1)',
            backgroundColor: 'var(--color-surface-subtle)',
            padding: 'var(--spacing-1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-neutral-border)',
          }}
        >
          {(['compact', 'comfortable', 'spacious'] as Density[]).map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={customTokens.density === d}
              onClick={() => updateCustomTokens({ density: d })}
              style={{
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--spacing-1) var(--spacing-2)',
                backgroundColor:
                  customTokens.density === d
                    ? 'var(--color-surface-elevated)'
                    : 'transparent',
                color:
                  customTokens.density === d
                    ? 'var(--color-primary-base)'
                    : 'var(--color-text-secondary)',
                fontWeight: customTokens.density === d ? 600 : 400,
                fontSize: 'var(--typography-size-xs)',
                cursor: 'pointer',
                boxShadow:
                  customTokens.density === d
                    ? '0 1px 3px rgba(0,0,0,0.1)'
                    : 'none',
                textTransform: 'capitalize',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
