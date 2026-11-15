import React, { useId, useState } from 'react';

export interface SparklineProps extends React.SVGProps<SVGSVGElement> {
  data: number[];
  color?: string; // Token fallback e.g. 'var(--color-chart-1)'
  width?: number;
  height?: number;
  showSpot?: boolean;
  'aria-label'?: string;
}

export function Sparkline({
  data = [],
  color = 'var(--color-chart-1)',
  width = 120,
  height = 32,
  showSpot = true,
  'aria-label': ariaLabel = 'Trend sparkline chart',
  ...props
}: SparklineProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const id = useId();

  if (!data || data.length < 2) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        {...props}
      />
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * usableWidth;
    const y = height - padding - ((val - min) / range) * usableHeight;
    return { x, y, val, idx };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const lastPoint = points[points.length - 1];
  const activePoint = focusedIndex !== null ? points[focusedIndex] : lastPoint;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', position: 'relative' }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${ariaLabel}. Values ranging from ${min} to ${max}.`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            setFocusedIndex((prev) => (prev === null ? 0 : Math.min(data.length - 1, prev + 1)));
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setFocusedIndex((prev) => (prev === null ? data.length - 1 : Math.max(0, prev - 1)));
          } else if (e.key === 'Escape') {
            setFocusedIndex(null);
          }
        }}
        onBlur={() => setFocusedIndex(null)}
        style={{ overflow: 'visible', outline: 'none' }}
        {...props}
      >
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {showSpot && activePoint && (
          <circle
            cx={activePoint.x}
            cy={activePoint.y}
            r="3.5"
            fill="var(--color-surface-base, #ffffff)"
            stroke={color}
            strokeWidth="2"
          />
        )}
      </svg>
      {focusedIndex !== null && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute',
            top: -24,
            left: Math.max(0, Math.min(width - 50, activePoint.x - 25)),
            backgroundColor: 'var(--color-surface-elevated, #1e293b)',
            color: 'var(--color-text-primary, #ffffff)',
            fontSize: 'var(--typography-size-xs, 11px)',
            padding: '2px 6px',
            borderRadius: 'var(--radius-sm, 4px)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {data[focusedIndex]}
        </div>
      )}
    </div>
  );
}
