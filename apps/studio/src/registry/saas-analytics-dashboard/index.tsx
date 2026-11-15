import React, { useState } from 'react';
import { Button, Badge } from '@blue-patterns/core';
import { LineChart, BarChart, DonutChart, Sparkline } from '@blue-patterns/charts';

const REVENUE_DATA = [
  { label: 'Q1', value: 320000 },
  { label: 'Q2', value: 410000 },
  { label: 'Q3', value: 490000 },
  { label: 'Q4', value: 680000 },
];

const SIGNUPS_BY_PLAN = [
  { label: 'Starter', value: 520 },
  { label: 'Pro', value: 840 },
  { label: 'Enterprise', value: 310 },
];

const CUSTOMER_TIERS = [
  { label: 'Enterprise', value: 55 },
  { label: 'Mid-Market', value: 30 },
  { label: 'Self-Serve', value: 15 },
];

const TRANSACTIONS = [
  { id: 'INV-1092', customer: 'Acme Cloud Inc.', amount: '$12,400', date: 'Nov 14, 2026', status: 'paid' },
  { id: 'INV-1093', customer: 'Starlight AI', amount: '$8,200', date: 'Nov 13, 2026', status: 'paid' },
  { id: 'INV-1094', customer: 'Quantum Dynamics', amount: '$24,500', date: 'Nov 12, 2026', status: 'pending' },
  { id: 'INV-1095', customer: 'Helios Robotics', amount: '$6,800', date: 'Nov 11, 2026', status: 'paid' },
];

export default function SaasAnalyticsDashboardTemplate() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  const filteredTransactions = TRANSACTIONS.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-6)',
        backgroundColor: 'var(--color-surface-base)',
        border: '1px solid var(--color-neutral-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-6)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'var(--typography-size-xl, 1.25rem)', fontWeight: 800 }}>
            Executive SaaS Revenue & Cohort Analytics
          </h2>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Real-time financial telemetry powered by @blue-patterns/charts and tokenized layouts.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button label="Export PDF" variant="secondary" size="sm" />
          <Button label="Generate Report" variant="primary" size="sm" />
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--spacing-4)' }}>
        <div style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Net Monthly Recurring Revenue</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--typography-size-xl)', fontWeight: 800 }}>$158,240</span>
            <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-success-base)', fontWeight: 600 }}>+14.2%</span>
          </div>
          <Sparkline data={[24, 32, 38, 42, 51, 64, 72, 88]} width={180} height={26} />
        </div>

        <div style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Active Subscriptions</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--typography-size-xl)', fontWeight: 800 }}>1,670</span>
            <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-primary-base)', fontWeight: 600 }}>+9.8%</span>
          </div>
          <Sparkline data={[12, 16, 20, 24, 30, 36, 44, 52]} color="var(--color-chart-2)" width={180} height={26} />
        </div>

        <div style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Net Dollar Retention (NDR)</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--typography-size-xl)', fontWeight: 800 }}>128.4%</span>
            <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-success-base)', fontWeight: 600 }}>Top Decile</span>
          </div>
          <Sparkline data={[118, 120, 122, 121, 125, 126, 127, 128]} color="var(--color-chart-3)" width={180} height={26} />
        </div>
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-4)' }}>
        <div style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-5)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600 }}>Quarterly Revenue Trajectory</h4>
          <LineChart data={REVENUE_DATA} width={460} height={200} />
        </div>

        <div style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600, alignSelf: 'flex-start' }}>Customer Cohort Tiers</h4>
          <DonutChart data={CUSTOMER_TIERS} size={180} centerLabel="Customers" centerValue="100%" />
        </div>
      </div>

      {/* Invoices Table with Filter */}
      <div style={{ backgroundColor: 'var(--color-surface-elevated)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--color-neutral-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--spacing-4)', borderBottom: '1px solid var(--color-neutral-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-sm)', fontWeight: 600 }}>Recent Enterprise Transactions</h4>
          <div style={{ display: 'flex', gap: 'var(--spacing-1)' }}>
            {(['all', 'paid', 'pending'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                style={{
                  padding: 'var(--spacing-1) var(--spacing-2)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-neutral-border)',
                  backgroundColor: filter === f ? 'var(--color-primary-base)' : 'var(--color-surface-subtle)',
                  color: filter === f ? 'var(--color-primary-contrast)' : 'var(--color-text-secondary)',
                  fontSize: 'var(--typography-size-xs)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="matrix-table" style={{ border: 'none' }}>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td style={{ fontFamily: 'monospace', fontSize: 'var(--typography-size-xs)' }}>{tx.id}</td>
                <td style={{ fontWeight: 600 }}>{tx.customer}</td>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{tx.amount}</td>
                <td style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--typography-size-xs)' }}>{tx.date}</td>
                <td>
                  <Badge
                    label={tx.status.toUpperCase()}
                    variant={tx.status === 'paid' ? 'success' : 'warning'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
