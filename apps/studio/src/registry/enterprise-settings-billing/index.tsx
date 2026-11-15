import { useState } from 'react';
import { Button, Badge, Tabs, Dialog } from '@blue-patterns/core';

const MEMBERS = [
  { id: '1', name: 'Alex Rivera', email: 'alex@enterprise.corp', role: 'Owner', status: 'active' },
  { id: '2', name: 'Sophia Chen', email: 'sophia@enterprise.corp', role: 'Admin', status: 'active' },
  { id: '3', name: 'Marcus Vance', email: 'marcus@enterprise.corp', role: 'Developer', status: 'active' },
  { id: '4', name: 'Elena Rostova', email: 'elena@enterprise.corp', role: 'Viewer', status: 'invited' },
];

export default function EnterpriseSettingsBillingTemplate() {
  const [activeTab, setActiveTab] = useState('team');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const teamTabContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
            Team Members & Access Control
          </h4>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Manage organization members, role-based security grants, and session revocation.
          </p>
        </div>
        <Button
          label="Invite Member"
          variant="primary"
          size="sm"
          onClick={() => setIsInviteOpen(true)}
        />
      </div>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {MEMBERS.map((m) => (
            <tr key={m.id}>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600 }}>{m.name}</span>
                  <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>{m.email}</span>
                </div>
              </td>
              <td>
                <Badge label={m.role} variant={m.role === 'Owner' ? 'blue' : 'neutral'} />
              </td>
              <td>
                <Badge label={m.status.toUpperCase()} variant={m.status === 'active' ? 'success' : 'warning'} />
              </td>
              <td>
                <Button label="Manage" variant="ghost" size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const usageTabContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <h4 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
        Enterprise Plan Resource Limits
      </h4>

      {/* Meter 1: Inference Tokens */}
      <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-border)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <span style={{ fontWeight: 600 }}>Monthly LLM Inference Tokens</span>
          <span>8.4M / 10.0M (84%)</span>
        </div>
        <div style={{ width: '100%', height: 'var(--spacing-2)', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ width: '84%', height: '100%', backgroundColor: 'var(--color-primary-base)' }} />
        </div>
      </div>

      {/* Meter 2: Vector Storage */}
      <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-border)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <span style={{ fontWeight: 600 }}>Vector Index Storage</span>
          <span>45 GB / 100 GB (45%)</span>
        </div>
        <div style={{ width: '100%', height: 'var(--spacing-2)', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ width: '45%', height: '100%', backgroundColor: 'var(--color-success-base)' }} />
        </div>
      </div>

      {/* Meter 3: Seat Allocation */}
      <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-border)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--typography-size-xs)' }}>
          <span style={{ fontWeight: 600 }}>Enterprise Seats</span>
          <span>4 / 10 Allocated</span>
        </div>
        <div style={{ width: '100%', height: 'var(--spacing-2)', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', backgroundColor: 'var(--color-primary-base)' }} />
        </div>
      </div>
    </div>
  );

  const billingTabContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-md)', fontWeight: 600 }}>
            Enterprise Growth Tier
          </h4>
          <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            $2,400.00 / billed annually • Renews Dec 31, 2026
          </span>
        </div>
        <Button label="Change Plan" variant="secondary" size="sm" />
      </div>

      <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, fontSize: 'var(--typography-size-sm)' }}>Mastercard ending in 4242</span>
          <span style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>Expires 09/28 • Default Payment Method</span>
        </div>
        <Button label="Update Card" variant="ghost" size="sm" />
      </div>
    </div>
  );

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
      <div>
        <h2 style={{ margin: 0, fontSize: 'var(--typography-size-xl, 1.25rem)', fontWeight: 800 }}>
          Organization Settings & Governance
        </h2>
        <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
          Manage company-wide security policies, team roles, and billing telemetry.
        </p>
      </div>

      <Tabs
        items={[
          { id: 'team', label: 'Team & Security', content: teamTabContent },
          { id: 'usage', label: 'Resource Usage', content: usageTabContent },
          { id: 'billing', label: 'Subscription & Invoices', content: billingTabContent },
        ]}
        defaultTab="team"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <Dialog isOpen={isInviteOpen} onOpenChange={setIsInviteOpen} width={420}>
        <div style={{ padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-size-md)' }}>Send Member Invitation</h4>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-xs)', color: 'var(--color-text-secondary)' }}>
            Enter the corporate email address of the team member to grant access.
          </p>
          <input
            type="email"
            placeholder="colleague@enterprise.corp"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            aria-label="Member Corporate Email"
            style={{
              padding: 'var(--spacing-2) var(--spacing-3)',
              backgroundColor: 'var(--color-surface-subtle)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--typography-size-sm)',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
            <Button label="Cancel" variant="secondary" size="sm" onClick={() => setIsInviteOpen(false)} />
            <Button label="Send Invite" variant="primary" size="sm" onClick={() => setIsInviteOpen(false)} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
