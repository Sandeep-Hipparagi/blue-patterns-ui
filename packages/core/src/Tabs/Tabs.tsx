import React, { useState, useRef, useEffect } from 'react';
import { SharedLayoutIndicator } from '@blue-patterns/motion';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  motion?: 'none' | 'subtle' | 'spring';
  variant?: 'solid' | 'outline' | 'ghost' | 'soft';
}

export function Tabs({
  items = [],
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  motion = 'spring',
  variant = 'soft',
}: TabsProps) {
  const isControlled = controlledTab !== undefined;
  const [uncontrolledTab, setUncontrolledTab] = useState(defaultTab || items[0]?.id || '');
  const currentTab = isControlled ? controlledTab : uncontrolledTab;

  const tabListRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [parentRect, setParentRect] = useState<DOMRect | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const updateIndicator = () => {
    if (tabListRef.current) {
      setParentRect(tabListRef.current.getBoundingClientRect());
      const activeBtn = tabButtonRefs.current.get(currentTab);
      if (activeBtn) {
        setTargetRect(activeBtn.getBoundingClientRect());
      }
    }
  };

  useEffect(() => {
    updateIndicator();
  }, [currentTab, items]);

  const handleSelect = (id: string) => {
    if (!isControlled) setUncontrolledTab(id);
    onTabChange?.(id);
  };

  const activeContent = items.find((it) => it.id === currentTab)?.content;

  return (
    <div style={{ width: '100%' }}>
      <div
        ref={tabListRef}
        role="tablist"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--spacing-1, 4px)',
          padding: 'var(--spacing-1, 4px)',
          backgroundColor: 'var(--color-surface-sunken, #f1f5f9)',
          borderRadius: 'var(--radius-md, 8px)',
        }}
      >
        {motion !== 'none' && (
          <SharedLayoutIndicator
            targetRect={targetRect}
            parentRect={parentRect}
            style={{
              backgroundColor: 'var(--color-surface-base, #ffffff)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          />
        )}
        {items.map((tab) => {
          const isSelected = tab.id === currentTab;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabButtonRefs.current.set(tab.id, el);
                else tabButtonRefs.current.delete(tab.id);
              }}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={isSelected}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id)}
              style={{
                position: 'relative',
                zIndex: 2,
                border: 'none',
                background: 'none',
                padding: 'var(--spacing-2, 8px) var(--spacing-4, 16px)',
                borderRadius: 'var(--radius-sm, 4px)',
                cursor: tab.disabled ? 'not-allowed' : 'pointer',
                color: isSelected
                  ? 'var(--color-primary-base, #0284c7)'
                  : 'var(--color-text-secondary, #64748b)',
                fontWeight: isSelected ? 600 : 500,
                fontSize: 'var(--typography-size-sm, 0.875rem)',
                outline: 'none',
                transition: 'color 150ms ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${currentTab}`}
        aria-labelledby={`tab-${currentTab}`}
        style={{
          paddingBlock: 'var(--spacing-4, 16px)',
          color: 'var(--color-text-primary, #0f172a)',
        }}
      >
        {activeContent}
      </div>
    </div>
  );
}
