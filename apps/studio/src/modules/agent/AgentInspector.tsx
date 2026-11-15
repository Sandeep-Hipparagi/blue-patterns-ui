import React, { useState } from 'react';
import { COMPONENT_CATALOG } from '../matrix/componentData';
import { Button, Badge, Tabs } from '@blue-patterns/core';
import { TerminalIcon, CopyIcon, CheckIcon } from '../../components/Icons';

export function AgentInspector() {
  const [selectedComp, setSelectedComp] = useState<string>('Button');
  const [selectedMcpTool, setSelectedMcpTool] = useState<'ds_contract' | 'ds_search' | 'ds_validate_jsx' | 'ds_swizzle'>('ds_contract');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const comp = COMPONENT_CATALOG.find((c) => c.name === selectedComp) || COMPONENT_CATALOG[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Structured Antigravity AI Prompt
  const agentPrompt = `You are an Antigravity AI agent implementing the ${comp.name} component from @blue-patterns/core.
Strict Architectural Invariants:
1. Zero Runtime CSS: Only consume static pre-built CSS (@blue-patterns/core/astryx.css).
2. Zero Raw Hex: All styling must strictly reference CSS custom properties (${comp.tokenSlots.join(', ')}).
3. Contract Compliance: Ensure W3C role "${comp.ariaRole}" and required attributes: ${comp.requiredAria.join(', ')}.
4. Motion Guards: Default to 'spring' micro-interactions; all motion must respect prefers-reduced-motion.

Component Signature:
import { ${comp.name} } from '@blue-patterns/core';

Usage Example:
<${comp.name}
  variant="solid"
  tone="primary"
  size="md"
  motion="spring"
/>`;

  // CLI Command
  const cliCommand = `npx @blue-patterns/cli component ${comp.name} --dense`;
  const cliAudit = `npx @blue-patterns/cli audit --a11y --tokens`;
  const cliSwizzle = `npx @blue-patterns/cli swizzle ${comp.name} --dest ./src/components/${comp.name}`;

  // MCP Tool Schemas & Sample Responses
  const mcpToolDefinitions = {
    ds_contract: {
      description: 'Fetches authoritative .doc.mjs metadata, props, ARIA roles, and token slots for a component.',
      request: { tool: 'ds_contract', arguments: { component: comp.name, dense: true } },
      response: {
        component: comp.name,
        category: comp.category,
        ariaRole: comp.ariaRole,
        requiredAria: comp.requiredAria,
        tokenSlots: comp.tokenSlots,
        propsCount: comp.props.length,
        status: 'VERIFIED_A11Y_AA',
      },
    },
    ds_search: {
      description: 'Semantic vector/keyword search across all 116 design system components.',
      request: { tool: 'ds_search', arguments: { query: comp.name.toLowerCase(), limit: 3 } },
      response: {
        matches: [
          { name: comp.name, score: 0.98, package: '@blue-patterns/core' },
          { name: `${comp.name}Group`, score: 0.84, package: '@blue-patterns/core' },
        ],
      },
    },
    ds_validate_jsx: {
      description: 'AST verification engine asserting zero raw hex codes, zero hardcoded px, and valid token usage.',
      request: {
        tool: 'ds_validate_jsx',
        arguments: {
          code: `<${comp.name} variant="solid" tone="primary" />`,
        },
      },
      response: {
        valid: true,
        violationsCount: 0,
        astFindings: [],
        tokenCoverage: '100%',
      },
    },
    ds_swizzle: {
      description: 'Ejects a component from the core package into the local codebase for deep customization.',
      request: { tool: 'ds_swizzle', arguments: { component: comp.name, dest: `src/components/${comp.name}` } },
      response: {
        success: true,
        filesCreated: [
          `src/components/${comp.name}/${comp.name}.tsx`,
          `src/components/${comp.name}/${comp.name}.doc.mjs`,
          `src/components/${comp.name}/${comp.name}.test.tsx`,
          `src/components/${comp.name}/index.ts`,
        ],
      },
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--typography-size-2xl, 1.75rem)', fontWeight: 800 }}>
            Agent & CLI Developer Hub
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-sm)', color: 'var(--color-text-secondary)' }}>
            Model Context Protocol (MCP) server integration, dense token prompts, and scaffolding CLI tooling.
          </p>
        </div>

        {/* Component Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <label htmlFor="agent-comp-select" style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>
            Target Component:
          </label>
          <select
            id="agent-comp-select"
            value={selectedComp}
            onChange={(e) => setSelectedComp(e.target.value)}
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
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: CLI Commands + Agent Prompt */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
        {/* CLI Command Generator */}
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
              CLI Command Generator
            </h3>
            <Badge label="@blue-patterns/cli" variant="blue" />
          </div>

          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Use the official developer CLI to query machine-readable contracts or audit your codebase.
          </p>

          {/* Command 1: Dense Component Contract */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              1. Query Dense Contract ({comp.name})
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontFamily: 'monospace',
                fontSize: 'var(--typography-size-xs)',
                justifyContent: 'space-between',
              }}
            >
              <code>{cliCommand}</code>
              <Button
                label={copiedSection === 'cli-1' ? 'Copied!' : 'Copy'}
                variant="secondary"
                size="sm"
                onClick={() => handleCopy(cliCommand, 'cli-1')}
              />
            </div>
          </div>

          {/* Command 2: Full System Audit */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              2. Validate AST & Accessibility Tokens
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontFamily: 'monospace',
                fontSize: 'var(--typography-size-xs)',
                justifyContent: 'space-between',
              }}
            >
              <code>{cliAudit}</code>
              <Button
                label={copiedSection === 'cli-2' ? 'Copied!' : 'Copy'}
                variant="secondary"
                size="sm"
                onClick={() => handleCopy(cliAudit, 'cli-2')}
              />
            </div>
          </div>

          {/* Command 3: Swizzle Component */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              3. Swizzle / Eject Component
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontFamily: 'monospace',
                fontSize: 'var(--typography-size-xs)',
                justifyContent: 'space-between',
              }}
            >
              <code>{cliSwizzle}</code>
              <Button
                label={copiedSection === 'cli-3' ? 'Copied!' : 'Copy'}
                variant="secondary"
                size="sm"
                onClick={() => handleCopy(cliSwizzle, 'cli-3')}
              />
            </div>
          </div>
        </div>

        {/* Structured Antigravity AI Prompt */}
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
              Autonomous AI Prompt Generator
            </h3>
            <Button
              label={copiedSection === 'prompt' ? 'Copied Prompt!' : 'Copy Prompt'}
              variant="primary"
              size="sm"
              onClick={() => handleCopy(agentPrompt, 'prompt')}
            />
          </div>

          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Feed this pre-engineered directive directly into Antigravity or any LLM coding assistant for zero-hallucination execution.
          </p>

          <pre
            tabIndex={0}
            aria-label="Generated Agent Prompt"
            style={{
              margin: 0,
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-3)',
              fontSize: 'var(--typography-size-xs)',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              overflowY: 'auto',
              maxHeight: '260px',
            }}
          >
            {agentPrompt}
          </pre>
        </div>
      </div>

      {/* Bottom Section: MCP Server Inspector & Swizzle Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--spacing-6)' }}>
        {/* MCP Server Inspector */}
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
              Model Context Protocol (MCP) Server Inspector
            </h3>
            <Badge label="Tool Protocol 2024-11-05" variant="neutral" />
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            {(['ds_contract', 'ds_search', 'ds_validate_jsx', 'ds_swizzle'] as const).map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() => setSelectedMcpTool(tool)}
                style={{
                  padding: 'var(--spacing-1) var(--spacing-2)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-neutral-border)',
                  backgroundColor: selectedMcpTool === tool ? 'var(--color-primary-base)' : 'var(--color-surface-subtle)',
                  color: selectedMcpTool === tool ? 'var(--color-primary-contrast)' : 'var(--color-text-primary)',
                  fontSize: 'var(--typography-size-xs)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                }}
              >
                {tool}
              </button>
            ))}
          </div>

          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            {mcpToolDefinitions[selectedMcpTool].description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3)' }}>
            {/* Request Payload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
              <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>Client Tool Call</span>
              <pre
                tabIndex={0}
                aria-label="Client Tool Call Request"
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
                {JSON.stringify(mcpToolDefinitions[selectedMcpTool].request, null, 2)}
              </pre>
            </div>

            {/* Response Payload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
              <span style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600 }}>Server JSON Response</span>
              <pre
                tabIndex={0}
                aria-label="Server JSON Response"
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
                {JSON.stringify(mcpToolDefinitions[selectedMcpTool].response, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Swizzle File Tree Preview */}
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
              Swizzle Ejection Tree Preview
            </h3>
            <Badge label="Zero Invariant Breaks" variant="success" />
          </div>

          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Ejecting <code style={{ color: 'var(--color-primary-base)' }}>{comp.name}</code> creates an isolated, self-contained component module in your project:
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-3)',
              fontFamily: 'monospace',
              fontSize: 'var(--typography-size-xs)',
              lineHeight: 1.6,
            }}
          >
            <div>📁 src/components/{comp.name}/</div>
            <div style={{ paddingLeft: 'var(--spacing-4)' }}>📄 {comp.name}.tsx <span style={{ color: 'var(--color-text-muted)' }}>(React 19 source)</span></div>
            <div style={{ paddingLeft: 'var(--spacing-4)' }}>📄 {comp.name}.doc.mjs <span style={{ color: 'var(--color-text-muted)' }}>(Machine contract)</span></div>
            <div style={{ paddingLeft: 'var(--spacing-4)' }}>📄 {comp.name}.test.tsx <span style={{ color: 'var(--color-text-muted)' }}>(Vitest + a11y)</span></div>
            <div style={{ paddingLeft: 'var(--spacing-4)' }}>📄 index.ts <span style={{ color: 'var(--color-text-muted)' }}>(Public exports)</span></div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              label={`Eject ${comp.name} Component`}
              variant="secondary"
              size="sm"
              onClick={() => handleCopy(cliSwizzle, 'eject')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
