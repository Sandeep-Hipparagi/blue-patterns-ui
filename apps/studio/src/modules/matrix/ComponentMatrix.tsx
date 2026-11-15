import React, { useState } from 'react';
import { COMPONENT_CATALOG } from './componentData';
import { Button, Badge, Switch, Tabs, AccordionItem } from '@blue-patterns/core';

export function ComponentMatrix() {
  const [selectedCompName, setSelectedCompName] = useState<string>('Button');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost' | 'destructive'>('primary');
  const [copiedJsx, setCopiedJsx] = useState(false);

  const selectedMeta = COMPONENT_CATALOG.find((c) => c.name === selectedCompName) || COMPONENT_CATALOG[0];

  const generatedJsx = `<${selectedMeta.name}
  variant="${variant}"
  size="${size}"
${selectedMeta.name === 'Button' ? '  label="Execute Action"\n  onClick={() => {}}' : ''}${selectedMeta.name === 'Badge' ? '  label="Operational"' : ''}${selectedMeta.name === 'Switch' ? '  value={true}\n  onChange={() => {}}' : ''}
/>`;

  const handleCopyJsx = () => {
    navigator.clipboard.writeText(generatedJsx);
    setCopiedJsx(true);
    setTimeout(() => setCopiedJsx(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--typography-size-2xl, 1.75rem)', fontWeight: 800 }}>
            Interactive Component Matrix
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-sm)', color: 'var(--color-text-secondary)' }}>
            Stress-test states, live prop schemas, accessibility contracts, and token bindings.
          </p>
        </div>

        {/* Component Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <label htmlFor="comp-select" style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>
            Component:
          </label>
          <select
            id="comp-select"
            value={selectedCompName}
            onChange={(e) => setSelectedCompName(e.target.value)}
            style={{
              padding: 'var(--spacing-2) var(--spacing-3)',
              backgroundColor: 'var(--color-surface-elevated)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--typography-size-sm)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {COMPONENT_CATALOG.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Section: Multi-State Inspection Grid */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-elevated)',
          border: '1px solid var(--color-neutral-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
            Multi-State Inspection Matrix ({selectedMeta.name})
          </h3>
          <Badge label={selectedMeta.category} variant="neutral" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--spacing-4)',
          }}
        >
          {/* State 1: Default */}
          <div
            style={{
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              backgroundColor: 'var(--color-surface-subtle)',
            }}
          >
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              1. DEFAULT
            </span>
            {selectedMeta.name === 'Button' && <Button label="Primary Action" variant={variant} size={size} />}
            {selectedMeta.name === 'Badge' && <Badge label="Default Badge" variant="blue" />}
            {selectedMeta.name === 'Card' && (
              <div style={{ padding: 'var(--spacing-3)', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-border)' }}>
                Card Surface
              </div>
            )}
            {selectedMeta.name === 'Switch' && <Switch value={false} onChange={() => {}} label="Toggle State" />}
            {selectedMeta.name === 'Tabs' && (
              <Tabs
                items={[
                  { id: '1', label: 'Tab 1', content: <div /> },
                  { id: '2', label: 'Tab 2', content: <div /> },
                ]}
                defaultTab="1"
              />
            )}
            {selectedMeta.name === 'Accordion' && (
              <AccordionItem title="Header Title" defaultOpen={false}>
                Panel Content
              </AccordionItem>
            )}
            {selectedMeta.name === 'Dialog' && <Button label="Open Modal" variant="primary" size="sm" />}
          </div>

          {/* State 2: Hover (Interactive simulated) */}
          <div
            style={{
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              backgroundColor: 'var(--color-surface-subtle)',
            }}
          >
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              2. HOVER (Cursor)
            </span>
            {selectedMeta.name === 'Button' && <Button label="Hover State" variant={variant} size={size} />}
            {selectedMeta.name === 'Badge' && <Badge label="Hovered Pill" variant="cyan" />}
            {selectedMeta.name === 'Card' && (
              <div style={{ padding: 'var(--spacing-3)', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary-base)' }}>
                Hover Highlight
              </div>
            )}
            {selectedMeta.name === 'Switch' && <Switch value={true} onChange={() => {}} label="Hovered" />}
            {selectedMeta.name === 'Tabs' && (
              <Tabs
                items={[
                  { id: '1', label: 'Active', content: <div /> },
                  { id: '2', label: 'Hover', content: <div /> },
                ]}
                defaultTab="2"
              />
            )}
            {selectedMeta.name === 'Accordion' && (
              <AccordionItem title="Hovered Section" defaultOpen={true}>
                Expanded Content
              </AccordionItem>
            )}
            {selectedMeta.name === 'Dialog' && <Button label="Hover Trigger" variant="primary" size="sm" />}
          </div>

          {/* State 3: Focus-Visible */}
          <div
            style={{
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              backgroundColor: 'var(--color-surface-subtle)',
            }}
          >
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              3. FOCUS-VISIBLE (Ring)
            </span>
            <div style={{ outline: 'var(--border-width-focus, 2px) solid var(--color-primary-base)', outlineOffset: 'var(--spacing-1)', borderRadius: 'var(--radius-sm)' }}>
              {selectedMeta.name === 'Button' && <Button label="Focused Action" variant={variant} size={size} />}
              {selectedMeta.name === 'Badge' && <Badge label="Focused" variant="purple" />}
              {selectedMeta.name === 'Card' && <div style={{ padding: 'var(--spacing-2)' }}>Focused Region</div>}
              {selectedMeta.name === 'Switch' && <Switch value={true} onChange={() => {}} label="Focused" />}
              {selectedMeta.name === 'Tabs' && (
                <Tabs items={[{ id: '1', label: 'Focused', content: <div /> }]} defaultTab="1" />
              )}
              {selectedMeta.name === 'Accordion' && (
                <AccordionItem title="Focused Accordion" defaultOpen={false}>
                  Content
                </AccordionItem>
              )}
              {selectedMeta.name === 'Dialog' && <Button label="Focused" variant="primary" size="sm" />}
            </div>
          </div>

          {/* State 4: Disabled */}
          <div
            style={{
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              backgroundColor: 'var(--color-surface-subtle)',
            }}
          >
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              4. DISABLED (Aria-Disabled)
            </span>
            {selectedMeta.name === 'Button' && <Button label="Disabled" variant={variant} size={size} isDisabled />}
            {selectedMeta.name === 'Badge' && <Badge label="Inactive" variant="neutral" />}
            {selectedMeta.name === 'Card' && <div style={{ opacity: 0.5, padding: 'var(--spacing-2)' }}>Disabled Card</div>}
            {selectedMeta.name === 'Switch' && <Switch value={false} onChange={() => {}} label="Disabled" isDisabled />}
            {selectedMeta.name === 'Tabs' && (
              <Tabs items={[{ id: '1', label: 'Disabled Tab', content: <div />, disabled: true }]} defaultTab="1" />
            )}
            {selectedMeta.name === 'Accordion' && (
              <AccordionItem title="Disabled Accordion" defaultOpen={false}>
                Content
              </AccordionItem>
            )}
            {selectedMeta.name === 'Dialog' && <Button label="Disabled Trigger" variant="primary" size="sm" isDisabled />}
          </div>

          {/* State 5: Loading */}
          <div
            style={{
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              backgroundColor: 'var(--color-surface-subtle)',
            }}
          >
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              5. LOADING (Aria-Busy)
            </span>
            {selectedMeta.name === 'Button' && <Button label="Loading..." variant={variant} size={size} isLoading />}
            {selectedMeta.name === 'Badge' && <Badge label="Syncing..." variant="warning" />}
            {selectedMeta.name === 'Card' && <div style={{ padding: 'var(--spacing-2)' }}>Loading Skeletal...</div>}
            {selectedMeta.name === 'Switch' && <Switch value={true} onChange={() => {}} label="Updating..." isLoading />}
            {selectedMeta.name === 'Tabs' && (
              <Tabs items={[{ id: '1', label: 'Loading...', content: <div /> }]} defaultTab="1" />
            )}
            {selectedMeta.name === 'Accordion' && (
              <AccordionItem title="Loading..." defaultOpen={false}>
                Content
              </AccordionItem>
            )}
            {selectedMeta.name === 'Dialog' && <Button label="Loading..." variant="primary" size="sm" isLoading />}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Prop Playground + Contract Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
        {/* Left: Prop Playground */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
          }}
        >
          <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
            Prop Customization Playground
          </h3>

          {/* Variant Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>Variant</span>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              {(['primary', 'secondary', 'ghost', 'destructive'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-1)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-neutral-border)',
                    backgroundColor: variant === v ? 'var(--color-primary-base)' : 'var(--color-surface-subtle)',
                    color: variant === v ? 'var(--color-primary-contrast)' : 'var(--color-text-primary)',
                    fontSize: 'var(--typography-size-xs)',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>Size</span>
            <div style={{ display: 'flex', gap: 'var(--spacing-1)' }}>
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-1)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-neutral-border)',
                    backgroundColor: size === s ? 'var(--color-primary-base)' : 'var(--color-surface-subtle)',
                    color: size === s ? 'var(--color-primary-contrast)' : 'var(--color-text-primary)',
                    fontSize: 'var(--typography-size-xs)',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Live JSX Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                Live Generated JSX
              </span>
              <Button
                label={copiedJsx ? 'Copied!' : 'Copy JSX'}
                variant="secondary"
                size="sm"
                onClick={handleCopyJsx}
              />
            </div>
            <pre
              tabIndex={0}
              aria-label="Live Generated JSX"
              style={{
                margin: 0,
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--typography-size-xs)',
                fontFamily: 'monospace',
                overflowX: 'auto',
              }}
            >
              {generatedJsx}
            </pre>
          </div>
        </div>

        {/* Right: Machine-Readable Contract Inspector */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
          }}
        >
          <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
            Authoritative Contract ({selectedMeta.name}.doc.mjs)
          </h3>

          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            {selectedMeta.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <div style={{ fontSize: 'var(--typography-size-xs)' }}>
              <strong>ARIA Role:</strong> <code style={{ color: 'var(--color-primary-base)' }}>{selectedMeta.ariaRole}</code>
            </div>

            <div style={{ fontSize: 'var(--typography-size-xs)' }}>
              <strong>Required ARIA Attributes:</strong>
              <ul style={{ margin: 'var(--spacing-1) 0 0 0', paddingLeft: 'var(--spacing-4)' }}>
                {selectedMeta.requiredAria.map((aria) => (
                  <li key={aria} style={{ color: 'var(--color-text-secondary)' }}>{aria}</li>
                ))}
              </ul>
            </div>

            <div style={{ fontSize: 'var(--typography-size-xs)' }}>
              <strong>Bound Token Slots:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-1)', marginTop: 'var(--spacing-1)' }}>
                {selectedMeta.tokenSlots.map((slot) => (
                  <Badge key={slot} label={slot} variant="neutral" />
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, marginTop: 'var(--spacing-2)' }}>
            Component Props Schema
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="matrix-table" style={{ fontSize: 'var(--typography-size-xs)' }}>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {selectedMeta.props.map((p) => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 600, fontFamily: 'monospace' }}>{p.name}</td>
                    <td style={{ fontFamily: 'monospace', color: 'var(--color-primary-base)' }}>{p.type}</td>
                    <td style={{ fontFamily: 'monospace' }}>{p.default}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
