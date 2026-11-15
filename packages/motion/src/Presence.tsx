import React, { useState, useEffect, useRef, useTransition } from 'react';
import { prefersReducedMotion } from './spring';

export interface PresenceProps {
  present: boolean;
  children: React.ReactNode;
  onExitComplete?: () => void;
  unmountOnExit?: boolean;
}

export function Presence({
  present,
  children,
  onExitComplete,
  unmountOnExit = true,
}: PresenceProps) {
  const [mounted, setMounted] = useState(present);
  const [stage, setStage] = useState<'enter' | 'active' | 'exit'>(present ? 'active' : 'exit');
  const [, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (present) {
      setMounted(true);
      if (prefersReducedMotion()) {
        setStage('active');
        return;
      }
      setStage('enter');
      const raf = requestAnimationFrame(() => {
        setStage('active');
      });
      return () => cancelAnimationFrame(raf);
    } else {
      if (prefersReducedMotion()) {
        setStage('exit');
        if (unmountOnExit) setMounted(false);
        onExitComplete?.();
        return;
      }
      setStage('exit');
      const timer = setTimeout(() => {
        startTransition(() => {
          if (unmountOnExit) {
            setMounted(false);
          }
          onExitComplete?.();
        });
      }, 160); // fast exit duration
      return () => clearTimeout(timer);
    }
  }, [present, unmountOnExit, onExitComplete]);

  if (!mounted && unmountOnExit) {
    return null;
  }

  const className = `bp-presence-${stage}`;

  return (
    <div ref={containerRef} className={className} style={{ display: mounted ? undefined : 'none' }}>
      {children}
    </div>
  );
}
