import React, { useState } from 'react';
import { useStudioTheme } from '../../components/ThemeContext';
import { Button, Badge, Switch } from '@blue-patterns/core';
import { Sparkline, LineChart, BarChart, DonutChart } from '@blue-patterns/charts';

const SAMPLE_REVENUE_DATA = [
  { label: 'Jan', value: 42000 },
  { label: 'Feb', value: 48000 },
  { label: 'Mar', value: 55000 },
  { label: 'Apr', value: 68000 },
  { label: 'May', value: 82000 },
  { label: 'Jun', value: 98000 },
  { label: 'Jul', value: 124000 },
];

const SAMPLE_CONVERSIONS = [
  { label: 'Gemini 2.5', value: 480 },
  { label: 'Claude 3.7', value: 390 },
  { label: 'GPT-4.5', value: 310 },
  { label: 'DeepSeek R1', value: 440 },
  { label: 'Llama 3.3', value: 260 },
];

const SAMPLE_DISTRIBUTION = [
  { label: 'Code Refactor', value: 42 },
  { label: 'Test Gen', value: 28 },
  { label: 'A11y Audit', value: 18 },
  { label: 'Doc Sync', value: 12 },
];

const RECENT_RUNS = [
  { id: 'run-9812', agent: 'Design Architect', model: 'Gemini 2.5 Pro', latency: '240ms', status: 'success' },
  { id: 'run-9813', agent: 'A11y Auditor', model: 'Claude 3.7 Sonnet', latency: '180ms', status: 'success' },
  { id: 'run-9814', agent: 'Contract Verifier', model: 'DeepSeek R1', latency: '520ms', status: 'warning' },
  { id: 'run-9815', agent: 'StyleX Compiler', model: 'Local Rust Engine', latency: '42ms', status: 'success' },
];

export function LivePreviewCanvas() {
  const { customTokens, colorMode } = useStudioTheme();
  const [streamActive, setStreamActive] = useState(true);

  // Injected CSS variables on the preview canvas
  const canvasStyle: React.CSSProperties = {
    '--color-primary-base': customTokens.primaryBase,
    '--radius-md': `${customTokens.borderRadius}px`,
    '--radius-lg': `${Math.min(customTokens.borderRadius * 1.5, 32)}px`,
    '--radius-sm': `${Math.max(customTokens.borderRadius * 0.5, 2)}px`,
  } as React.CSSProperties;

  return (
    <div className="preview-canvas-container" style={canvasStyle} id="studio-preview-canvas">
      {/* Canvas Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'var(--typography-size-lg)', fontWeight: 700 }}>
            Live Preview Canvas: SaaS & AI Orchestration
          </h2>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Real-time CSS variable injection stress-testing design tokens across charts, data grids, and components.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Badge label="Zero-Plugin Active" variant="success" />
          <Badge label={`Radius: ${customTokens.borderRadius}px`} variant="neutral" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-4)',
        }}
      >
        {/* KPI 1 */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
          }}
        >
          <div style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Annual Run Rate (ARR)
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--typography-size-xl, 1.5rem)', fontWeight: 700 }}>$1,248,500</span>
            <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-success-base)', fontWeight: 600 }}>
              +18.4%
            </span>
          </div>
          <Sparkline data={[28, 35, 42, 38, 54, 62, 78, 92]} width={180} height={28} />
        </div>

        {/* KPI 2 */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
          }}
        >
          <div style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Active AI Agent Tasks
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--typography-size-xl, 1.5rem)', fontWeight: 700 }}>4,820</span>
            <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-primary-base)', fontWeight: 600 }}>
              +34.2%
            </span>
          </div>
          <Sparkline data={[14, 18, 22, 29, 31, 40, 52, 68]} color="var(--color-chart-2)" width={180} height={28} />
        </div>

        {/* KPI 3 */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
          }}
        >
          <div style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Inference Latency (p95)
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--typography-size-xl, 1.5rem)', fontWeight: 700 }}>14.2ms</span>
            <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-success-base)', fontWeight: 600 }}>
              -8.1%
            </span>
          </div>
          <Sparkline data={[38, 32, 28, 24, 21, 18, 16, 14]} color="var(--color-chart-3)" width={180} height={28} />
        </div>
      </div>

      {/* Main Charts Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 'var(--spacing-4)',
        }}
      >
        {/* Line Chart */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600 }}>
              Revenue & Token Growth (YTD)
            </h4>
            <Badge label="Auto-Scaled SVG" variant="neutral" />
          </div>
          <LineChart data={SAMPLE_REVENUE_DATA} width={480} height={200} />
        </div>

        {/* Donut Chart */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-2)',
          }}
        >
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600, alignSelf: 'flex-start' }}>
            Agent Task Distribution
          </h4>
          <DonutChart
            data={SAMPLE_DISTRIBUTION}
            size={180}
            centerLabel="Workflows"
            centerValue="100%"
          />
        </div>
      </div>

      {/* Bar Chart & Interactive Form */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 'var(--spacing-4)',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-3)',
          }}
        >
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600 }}>
            Model Invocations by Provider
          </h4>
          <BarChart data={SAMPLE_CONVERSIONS} width={380} height={180} />
        </div>

        {/* Quick Agent Dispatch Form */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-neutral-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-3)',
          }}
        >
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600 }}>
            Quick Agent Orchestration
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            <label htmlFor="agent-prompt-input" style={{ fontSize: 'var(--typography-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              Agent Prompt Directive
            </label>
            <input
              id="agent-prompt-input"
              type="text"
              defaultValue="Refactor Table component to React 19"
              style={{
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-neutral-border)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--typography-size-sm)',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
              Enable Real-time WAAPI Streaming:
            </span>
            <input
              type="checkbox"
              checked={streamActive}
              onChange={(e) => setStreamActive(e.target.checked)}
              aria-label="Enable Real-time WAAPI Streaming"
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'auto' }}>
            <Button label="Dispatch Agent" variant="primary" size="md" />
            <Button label="Clear" variant="secondary" size="md" />
          </div>
        </div>
      </div>

      {/* Recent Agent Workflow Executions Table */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-elevated)',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'var(--color-neutral-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: 'var(--spacing-4)',
            borderBottom: '1px solid var(--color-neutral-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600 }}>
            Recent Autonomous Agent Executions
          </h4>
          <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-muted)' }}>
            4 tasks logged
          </span>
        </div>

        <table className="matrix-table" style={{ border: 'none' }}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Run ID</th>
              <th>Agent Role</th>
              <th>Foundation Model</th>
              <th>Latency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_RUNS.map((run) => (
              <tr key={run.id}>
                <td>
                  <Badge
                    label={run.status.toUpperCase()}
                    variant={run.status === 'success' ? 'success' : 'warning'}
                  />
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: 'var(--typography-size-xs)' }}>
                  {run.id}
                </td>
                <td style={{ fontWeight: 500 }}>{run.agent}</td>
                <td style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--typography-size-xs)' }}>
                  {run.model}
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: 'var(--typography-size-xs)' }}>
                  {run.latency}
                </td>
                <td>
                  <Button label="Inspect" variant="ghost" size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
