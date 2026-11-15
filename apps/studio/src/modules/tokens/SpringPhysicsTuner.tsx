import React, { useState, useRef } from 'react';
import { useStudioTheme } from '../../components/ThemeContext';
import { Button, Dialog, AccordionItem, Tabs } from '@blue-patterns/core';
import { generateSpringKeyframes, SpringPresets } from '@blue-patterns/motion';

export function SpringPhysicsTuner() {
  const { customTokens, updateCustomTokens, reducedMotion } = useStudioTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleBounceTest = () => {
    if (!boxRef.current) return;
    if (reducedMotion) return;

    boxRef.current.animate(
      generateSpringKeyframes(
        { transform: 'scale(1) translateY(0px)' },
        { transform: 'scale(1.18) translateY(-14px)' },
        {
          stiffness: customTokens.springStiffness,
          damping: customTokens.springDamping,
          mass: customTokens.springMass,
        },
        30
      ),
      {
        duration: 360,
        fill: 'none',
      }
    );
  };

  const handleToastTrigger = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const applyPreset = (name: 'snappy' | 'gentle' | 'bouncy') => {
    const preset = SpringPresets[name];
    updateCustomTokens({
      springStiffness: preset.stiffness,
      springDamping: preset.damping,
      springMass: preset.mass,
    });
  };

  return (
    <div className="workbench-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
          Spring Physics Tuner
        </h3>
        <span
          style={{
            fontSize: 'var(--typography-size-xs)',
            color: 'var(--color-primary-base)',
            fontFamily: 'monospace',
            fontWeight: 600,
          }}
        >
          {customTokens.springStiffness}k / {customTokens.springDamping}d / {customTokens.springMass}m
        </span>
      </div>

      <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
        Tune physical damping ratios for tactile micro-interactions with immediate test pad validation.
      </p>

      {/* Preset Quick Selectors */}
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        <button
          type="button"
          onClick={() => applyPreset('snappy')}
          style={{
            flex: 1,
            padding: 'var(--spacing-1) var(--spacing-2)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-neutral-border)',
            backgroundColor: 'var(--color-surface-subtle)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--typography-size-xs)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Snappy (350/30)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('gentle')}
          style={{
            flex: 1,
            padding: 'var(--spacing-1) var(--spacing-2)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-neutral-border)',
            backgroundColor: 'var(--color-surface-subtle)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--typography-size-xs)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Gentle (180/24)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('bouncy')}
          style={{
            flex: 1,
            padding: 'var(--spacing-1) var(--spacing-2)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-neutral-border)',
            backgroundColor: 'var(--color-surface-subtle)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--typography-size-xs)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Bouncy (240/16)
        </button>
      </div>

      {/* Stiffness Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <label htmlFor="stiffness-slider" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Stiffness (tension)
          </label>
          <span style={{ fontFamily: 'monospace' }}>{customTokens.springStiffness}</span>
        </div>
        <input
          id="stiffness-slider"
          type="range"
          min="100"
          max="450"
          step="10"
          value={customTokens.springStiffness}
          onChange={(e) => updateCustomTokens({ springStiffness: Number(e.target.value) })}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      {/* Damping Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <label htmlFor="damping-slider" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Damping (friction)
          </label>
          <span style={{ fontFamily: 'monospace' }}>{customTokens.springDamping}</span>
        </div>
        <input
          id="damping-slider"
          type="range"
          min="8"
          max="45"
          step="1"
          value={customTokens.springDamping}
          onChange={(e) => updateCustomTokens({ springDamping: Number(e.target.value) })}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      {/* Mass Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <label htmlFor="mass-slider" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Mass (inertia)
          </label>
          <span style={{ fontFamily: 'monospace' }}>{customTokens.springMass}</span>
        </div>
        <input
          id="mass-slider"
          type="range"
          min="0.5"
          max="2.5"
          step="0.1"
          value={customTokens.springMass}
          onChange={(e) => updateCustomTokens({ springMass: Number(e.target.value) })}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      {/* Interactive Spring Test Pad */}
      <div
        style={{
          border: '1px dashed var(--color-neutral-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-3)',
          backgroundColor: 'var(--color-surface-subtle)',
        }}
      >
        <div style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          Spring Physics Live Test Pad
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-3)' }}>
          {/* Bounce Element */}
          <div
            ref={boxRef}
            style={{
              width: 'var(--spacing-16, 64px)',
              height: 'var(--spacing-12, 48px)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-base)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-contrast)',
              fontWeight: 700,
              fontSize: 'var(--typography-size-xs)',
              cursor: 'pointer',
              userSelect: 'none',
              transformOrigin: 'center bottom',
            }}
            onClick={handleBounceTest}
            title="Click to trigger spring bounce"
          >
            Bounce
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <button
              type="button"
              onClick={handleBounceTest}
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-neutral-border)',
                backgroundColor: 'var(--color-surface-elevated)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--typography-size-xs)',
                cursor: 'pointer',
              }}
            >
              Test Spring
            </button>
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-neutral-border)',
                backgroundColor: 'var(--color-surface-elevated)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--typography-size-xs)',
                cursor: 'pointer',
              }}
            >
              Test Modal
            </button>
            <button
              type="button"
              onClick={handleToastTrigger}
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-neutral-border)',
                backgroundColor: 'var(--color-surface-elevated)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--typography-size-xs)',
                cursor: 'pointer',
              }}
            >
              Test Toast
            </button>
          </div>
        </div>

        {/* Live Toast Feedback Pad */}
        {showToast && (
          <div
            style={{
              backgroundColor: 'var(--color-success-subtle)',
              border: '1px solid var(--color-success-base)',
              color: 'var(--color-success-base)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-2)',
              fontSize: 'var(--typography-size-xs)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Spring Animation Triggered Successfully!</span>
            <span style={{ fontSize: 'var(--typography-size-xs)' }}>360ms</span>
          </div>
        )}
      </div>

      {/* Dialog Preview */}
      <Dialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        width={380}
      >
        <div style={{ padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-md)' }}>Physics Verification Modal</h4>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-sm)', color: 'var(--color-text-secondary)' }}>
            This modal enters and settles using our zero-dependency Web Animations spring engine with stiffness{' '}
            {customTokens.springStiffness} and damping {customTokens.springDamping}.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--spacing-2)' }}>
            <Button
              label="Dismiss"
              variant="primary"
              size="sm"
              onClick={() => setIsDialogOpen(false)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
