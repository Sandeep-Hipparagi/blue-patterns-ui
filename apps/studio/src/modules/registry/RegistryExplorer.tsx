import React, { useState } from 'react';
import { Button, Badge } from '@blue-patterns/core';
import AiChatWorkspaceTemplate from '../../registry/ai-chat-workspace';
import SaasAnalyticsDashboardTemplate from '../../registry/saas-analytics-dashboard';
import EnterpriseSettingsBillingTemplate from '../../registry/enterprise-settings-billing';
import KanbanSprintBoardTemplate from '../../registry/kanban-sprint-board';
import { CopyIcon, CheckIcon } from '../../components/Icons';

export interface TemplateItem {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  tokensUsed: string[];
  packages: string[];
  component: React.ComponentType;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'ai-chat-workspace',
    name: 'ai-chat-workspace',
    title: 'AI Chat Workspace',
    category: 'Conversational AI',
    description: 'Complete AI chat interface with message stream, token telemetry counter, model selector, and collapsible memory rail.',
    tokensUsed: ['--color-primary-*', '--color-surface-*', '--spacing-*', '--radius-md'],
    packages: ['@blue-patterns/core', '@blue-patterns/motion'],
    component: AiChatWorkspaceTemplate,
  },
  {
    id: 'saas-analytics-dashboard',
    name: 'saas-analytics-dashboard',
    title: 'SaaS Analytics Dashboard',
    category: 'Data & Dashboards',
    description: 'Executive revenue & cohort analytics view featuring KPI cards, quarterly LineChart, channel BarChart, and transaction tables.',
    tokensUsed: ['--color-chart-1..8', '--color-surface-elevated', '--spacing-*'],
    packages: ['@blue-patterns/core', '@blue-patterns/charts'],
    component: SaasAnalyticsDashboardTemplate,
  },
  {
    id: 'enterprise-settings-billing',
    name: 'enterprise-settings-billing',
    title: 'Enterprise Settings & Billing',
    category: 'Administrative & Security',
    description: 'Multi-tabbed organization settings page with team role permissions, resource usage meters, and billing management.',
    tokensUsed: ['--color-neutral-border', '--color-primary-base', '--radius-lg'],
    packages: ['@blue-patterns/core', '@blue-patterns/motion'],
    component: EnterpriseSettingsBillingTemplate,
  },
  {
    id: 'kanban-sprint-board',
    name: 'kanban-sprint-board',
    title: 'Kanban Sprint Board',
    category: 'Productivity & Workflows',
    description: 'Agile sprint management board with drag/status columns, priority badges, avatar groups, task count indicators, and detail modal.',
    tokensUsed: ['--color-primary-*', '--radius-sm', '--spacing-3'],
    packages: ['@blue-patterns/core', '@blue-patterns/motion'],
    component: KanbanSprintBoardTemplate,
  },
];

export function RegistryExplorer() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCommand = (templateId: string) => {
    const cmd = `npx @blue-patterns/cli template add ${templateId}`;
    navigator.clipboard.writeText(cmd);
    setCopiedId(templateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--typography-size-2xl, 1.75rem)', fontWeight: 800 }}>
            Community Template Registry
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-sm)', color: 'var(--color-text-secondary)' }}>
            Production-grade templates scaffoldable via CLI or consumable through registry.json endpoint.
          </p>
        </div>

        {selectedTemplate && (
          <Button
            label="← Back to All Templates"
            variant="secondary"
            size="md"
            onClick={() => setSelectedTemplate(null)}
          />
        )}
      </div>

      {/* Selected Template Live Preview */}
      {selectedTemplate ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div
            style={{
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                <h3 style={{ margin: 0, fontSize: 'var(--typography-size-lg)', fontWeight: 700 }}>
                  {selectedTemplate.title}
                </h3>
                <Badge label={selectedTemplate.category} variant="blue" />
              </div>
              <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
                {selectedTemplate.description}
              </p>
            </div>

            <Button
              label={copiedId === selectedTemplate.id ? 'Command Copied!' : `Scaffold: npx @blue-patterns/cli template add ${selectedTemplate.id}`}
              variant="primary"
              size="sm"
              onClick={() => handleCopyCommand(selectedTemplate.id)}
            />
          </div>

          <selectedTemplate.component />
        </div>
      ) : (
        /* Templates Grid */
        <div className="registry-grid">
          {TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} className="registry-card">
              <div className="registry-thumbnail">
                <span
                  style={{
                    fontSize: 'var(--typography-size-lg)',
                    fontWeight: 700,
                    color: 'var(--color-primary-base)',
                  }}
                >
                  {tmpl.title}
                </span>
              </div>

              <div className="registry-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 700 }}>
                    {tmpl.title}
                  </h3>
                  <Badge label={tmpl.category} variant="neutral" />
                </div>

                <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', flex: 1 }}>
                  {tmpl.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-1)' }}>
                  {tmpl.packages.map((pkg) => (
                    <Badge key={pkg} label={pkg} variant="cyan" />
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
                  <Button
                    label="Live Preview"
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedTemplate(tmpl)}
                  />
                  <Button
                    label={copiedId === tmpl.id ? 'Copied!' : 'Scaffold CLI'}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCopyCommand(tmpl.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
