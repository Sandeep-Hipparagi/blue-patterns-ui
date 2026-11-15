import React, { useRef, useEffect, useState } from 'react';
import { prefersReducedMotion } from './spring.js';

export interface CollapseProps {
  open: boolean;
  children: React.ReactNode;
  duration?: number;
}

export function Collapse({ open, children }: CollapseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(open ? 'auto' : 0);
  const [opacity, setOpacity] = useState(open ? 1 : 0);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (prefersReducedMotion()) {
      setHeight(open ? 'auto' : 0);
      setOpacity(open ? 1 : 0);
      return;
    }

    const node = contentRef.current;
    if (!node) return;

    if (open) {
      const scrollHeight = node.scrollHeight;
      setHeight(scrollHeight);
      setOpacity(1);
      const timer = setTimeout(() => {
        setHeight('auto');
      }, 260);
      return () => clearTimeout(timer);
    } else {
      const scrollHeight = node.scrollHeight;
      setHeight(scrollHeight);
      requestAnimationFrame(() => {
        setHeight(0);
        setOpacity(0);
      });
    }
  }, [open]);

  return (
    <div
      ref={contentRef}
      className="bp-collapse-container"
      style={{
        height: height === 'auto' ? undefined : `${height}px`,
        opacity,
        visibility: !open && height === 0 ? 'hidden' : 'visible',
      }}
    >
      {children}
    </div>
  );
}
