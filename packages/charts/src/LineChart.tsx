import React, { useState, useId } from 'react';

export interface LinePoint {
  label: string;
  value: number;
}

export interface LineChartProps {
  data: LinePoint[];
  color?: string;
  width?: number;
  height?: number;
  area?: boolean;
  'aria-label'?: string;
}

export function LineChart({
  data = [],
  color = 'var(--color-chart-1)',
  width = 500,
  height = 240,
  area = true,
  'aria-label': ariaLabel = 'Line chart trend visualization',
}: LineChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const gradientId = useId();

  if (!data || data.length === 0) {
    return <div role="img" aria-label={ariaLabel}>No data available</div>;
  }

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / Math.max(1, data.length - 1)) * chartWidth;
    const y = height - paddingBottom - ((d.value - minVal) / range) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: width }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            setHoveredIdx((prev) => (prev === null ? 0 : Math.min(data.length - 1, prev + 1)));
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setHoveredIdx((prev) => (prev === null ? data.length - 1 : Math.max(0, prev - 1)));
          } else if (e.key === 'Escape') {
            setHoveredIdx(null);
          }
        }}
        onBlur={() => setHoveredIdx(null)}
        style={{ width: '100%', height: 'auto', outline: 'none' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Baseline Axis */}
        <line
          x1={paddingLeft}
          y1={height - paddingBottom}
          x2={width - paddingRight}
          y2={height - paddingBottom}
          stroke="var(--color-neutral-border, #cbd5e1)"
          strokeWidth="1"
        />

        {area && <path d={areaPath} fill={`url(#${gradientId})`} />}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interactive Data Dots */}
        {points.map((pt, i) => {
          const isSelected = hoveredIdx === i;
          return (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isSelected ? 6 : 4}
                fill="var(--color-surface-base, #ffffff)"
                stroke={color}
                strokeWidth={isSelected ? 3 : 2}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${pt.label}: ${pt.value}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(i)}
                style={{ cursor: 'pointer', transition: 'r 150ms ease' }}
              />
              <text
                x={pt.x}
                y={height - paddingBottom + 18}
                textAnchor="middle"
                fontSize="11"
                fill="var(--color-text-secondary, #64748b)"
                fontFamily="var(--typography-font-sans, sans-serif)"
              >
                {pt.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Tooltip */}
      {hoveredIdx !== null && data[hoveredIdx] && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute',
            top: 10,
            left: Math.max(0, Math.min(width - 80, points[hoveredIdx].x - 40)),
            backgroundColor: 'var(--color-surface-elevated, #1e293b)',
            color: 'var(--color-text-primary, #ffffff)',
            fontSize: 'var(--typography-size-xs, 12px)',
            fontWeight: 500,
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm, 4px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {data[hoveredIdx].label}: {data[hoveredIdx].value}
        </div>
      )}
    </div>
  );
}
