import React, { useState } from 'react';

export interface DonutDatum {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: DonutDatum[];
  size?: number;
  innerRadiusRatio?: number; // 0.65 default
  centerLabel?: string;
  centerValue?: string | number;
  'aria-label'?: string;
}

export function DonutChart({
  data = [],
  size = 220,
  innerRadiusRatio = 0.68,
  centerLabel,
  centerValue,
  'aria-label': ariaLabel = 'Proportional donut chart',
}: DonutChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  const radius = size / 2;
  const innerRadius = radius * innerRadiusRatio;
  const strokeWidth = radius - innerRadius;

  let cumulativeAngle = 0;
  const arcs = data.map((d, i) => {
    const fraction = d.value / total;
    const angle = fraction * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;
    const color = d.color || `var(--color-chart-${(i % 8) + 1})`;

    return {
      ...d,
      index: i,
      fraction,
      startAngle,
      endAngle,
      color,
    };
  });

  // Convert polar to cartesian coordinates
  function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  }

  function describeArc(x: number, y: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  }

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            setHoveredIdx((prev) => (prev === null ? 0 : (prev + 1) % data.length));
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setHoveredIdx((prev) => (prev === null ? data.length - 1 : (prev - 1 + data.length) % data.length));
          } else if (e.key === 'Escape') {
            setHoveredIdx(null);
          }
        }}
        onBlur={() => setHoveredIdx(null)}
        style={{ outline: 'none' }}
      >
        <g transform={`translate(${radius}, ${radius})`}>
          {arcs.map((arc, i) => {
            const isSelected = hoveredIdx === i;
            const midRadius = (radius + innerRadius) / 2;
            const arcPath = describeArc(0, 0, midRadius, arc.startAngle, arc.endAngle - 0.5);

            return (
              <path
                key={i}
                d={arcPath}
                fill="none"
                stroke={arc.color}
                strokeWidth={isSelected ? strokeWidth + 4 : strokeWidth}
                opacity={hoveredIdx !== null && !isSelected ? 0.4 : 1}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${arc.label}: ${arc.value} (${(arc.fraction * 100).toFixed(1)}%)`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(i)}
                style={{
                  cursor: 'pointer',
                  transition: 'stroke-width 180ms ease, opacity 180ms ease',
                }}
              />
            );
          })}
        </g>

        {/* Center label & value */}
        <text
          x={radius}
          y={centerLabel ? radius - 4 : radius + 6}
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="var(--color-text-primary, #0f172a)"
          fontFamily="var(--typography-font-sans, sans-serif)"
        >
          {hoveredIdx !== null ? data[hoveredIdx].value : centerValue ?? total}
        </text>
        {centerLabel && (
          <text
            x={radius}
            y={radius + 16}
            textAnchor="middle"
            fontSize="11"
            fill="var(--color-text-secondary, #64748b)"
            fontFamily="var(--typography-font-sans, sans-serif)"
          >
            {hoveredIdx !== null ? data[hoveredIdx].label : centerLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
