import React, { useState, useId } from 'react';
import { Collapse } from '@blue-patterns/motion';

export interface AccordionItemProps {
  id?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  motion?: 'none' | 'subtle' | 'spring';
}

export function AccordionItem({
  id: customId,
  title,
  children,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
  motion = 'spring',
}: AccordionItemProps) {
  const generatedId = useId();
  const id = customId || generatedId;
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleToggle = () => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
  };

  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-neutral-border, #e2e8f0)',
        paddingBlock: 'var(--spacing-2, 8px)',
      }}
    >
      <button
        type="button"
        id={`header-${id}`}
        aria-controls={`panel-${id}`}
        aria-expanded={open}
        onClick={handleToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          padding: 'var(--spacing-2, 8px) 0',
          cursor: 'pointer',
          color: 'var(--color-text-primary, #0f172a)',
          fontWeight: 600,
          fontSize: 'var(--typography-size-md, 1rem)',
          textAlign: 'left',
          outline: 'none',
        }}
      >
        <span>{title}</span>
        <span
          aria-hidden="true"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: motion === 'none' ? 'none' : 'transform var(--motion-duration-fast, 150ms) var(--motion-spring-snappy)',
          }}
        >
          ▾
        </span>
      </button>
      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`header-${id}`}
        hidden={!open && motion === 'none'}
      >
        {motion === 'none' ? (
          open && <div style={{ paddingBlock: 'var(--spacing-2, 8px)' }}>{children}</div>
        ) : (
          <Collapse open={open}>
            <div style={{ paddingBlock: 'var(--spacing-2, 8px)' }}>{children}</div>
          </Collapse>
        )}
      </div>
    </div>
  );
}

export interface AccordionProps {
  children: React.ReactNode;
  motion?: 'none' | 'subtle' | 'spring';
}

export function Accordion({ children, motion = 'spring' }: AccordionProps) {
  return (
    <div style={{ width: '100%' }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<AccordionItemProps>(child)) {
          return React.cloneElement(child, {
            motion: child.props.motion || motion,
          });
        }
        return child;
      })}
    </div>
  );
}

Accordion.Item = AccordionItem;
