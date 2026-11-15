import React from 'react';
import { prefersReducedMotion } from './spring';

export interface StaggerGroupProps {
  children: React.ReactNode;
  staggerDelay?: number; // ms per child
  initialDelay?: number;
  className?: string;
}

export function StaggerGroup({
  children,
  staggerDelay = 35,
  initialDelay = 0,
  className = '',
}: StaggerGroupProps) {
  const isReduced = prefersReducedMotion();

  const items = React.Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => {
        const delay = isReduced ? 0 : initialDelay + index * staggerDelay;
        return (
          <div
            key={index}
            style={{
              animationDelay: `${delay}ms`,
              transitionDelay: `${delay}ms`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
