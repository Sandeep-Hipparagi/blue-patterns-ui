import React, { useState } from 'react';

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarDatum[];
  width?: number;
  height?: number;
  showValues?: boolean;
  'aria-label'?: string;
}

export function BarChart({
  data = [],
  width = 400,
  height = 200,
  showValues = true,
  'aria-label': ariaLabel = 'Bar chart visualization',
}: BarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div role="img" aria-label={ariaLabel}>No data available</div>;
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const paddingBottom = 28;
  const paddingTop = 20;
  const paddingLeft = 32;
  const paddingRight = 16;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const barWidth = Math.max(8, (chartWidth / data.length) * 0.65);
  const gap = (chartWidth - barWidth * data.length) / Math.max(1, data.length - 1);

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
        {/* Baseline axis */}
        <line
          x1={paddingLeft}
          y1={height - paddingBottom}
          x2={width - paddingRight}
          y2={height - paddingBottom}
          stroke="var(--color-neutral-border, #cbd5e1)"
          strokeWidth="1"
        />

        {data.map((d, i) => {
          const x = paddingLeft + i * (barWidth + gap);
          const barHeight = (d.value / maxValue) * chartHeight;
          const y = height - paddingBottom - barHeight;
          const isSelected = hoveredIdx === i;
          const tokenColor = d.color || `var(--color-chart-${(i % 8) + 1})`;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="var(--radius-xs, 2px)"
                fill={tokenColor}
                opacity={hoveredIdx !== null && !isSelected ? 0.45 : 1}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${d.label}: ${d.value}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(i)}
                style={{
                  cursor: 'pointer',
                  transition: 'opacity 150ms ease, transform 150ms ease',
                  transformOrigin: `${x + barWidth / 2}px ${height - paddingBottom}px`,
                }}
              />
              <text
                x={x + barWidth / 2}
                y={height - paddingBottom + 16}
                textAnchor="middle"
                fontSize="11"
                fill="var(--color-text-secondary, #64748b)"
                fontFamily="var(--typography-font-sans, sans-serif)"
              >
                {d.label}
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
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-surface-elevated, #1e293b)',
            color: 'var(--color-text-primary, #ffffff)',
            fontSize: 'var(--typography-size-xs, 12px)',
            fontWeight: 500,
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm, 4px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
          }}
        >
          {data[hoveredIdx].label}: {data[hoveredIdx].value}
        </div>
      )}
    </div>
  );
}
