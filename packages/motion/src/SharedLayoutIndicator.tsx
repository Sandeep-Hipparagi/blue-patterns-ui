import React, { useRef, useLayoutEffect, useState } from 'react';
import { prefersReducedMotion } from './spring';

export interface SharedLayoutIndicatorProps {
  targetRect: DOMRect | null;
  parentRect: DOMRect | null;
  className?: string;
  style?: React.CSSProperties;
}

export function SharedLayoutIndicator({
  targetRect,
  parentRect,
  className = '',
  style = {},
}: SharedLayoutIndicatorProps) {
  const [coords, setCoords] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
  }>({ left: 0, top: 0, width: 0, height: 0, visible: false });

  useLayoutEffect(() => {
    if (!targetRect || !parentRect) {
      setCoords((prev) => ({ ...prev, visible: false }));
      return;
    }

    const left = targetRect.left - parentRect.left;
    const top = targetRect.top - parentRect.top;
    const width = targetRect.width;
    const height = targetRect.height;

    setCoords({
      left,
      top,
      width,
      height,
      visible: true,
    });
  }, [targetRect, parentRect]);

  if (!coords.visible) {
    return null;
  }

  const isReduced = prefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`bp-shared-indicator ${className}`}
      style={{
        ...style,
        transform: `translate3d(${coords.left}px, ${coords.top}px, 0)`,
        width: `${coords.width}px`,
        height: `${coords.height}px`,
        transitionDuration: isReduced ? '0ms' : undefined,
      }}
    />
  );
}
