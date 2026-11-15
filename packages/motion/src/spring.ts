/**
 * Spring physics calculation utilities using Web Animations API (WAAPI).
 * Zero-runtime external dependencies.
 */

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
}

export const SpringPresets = {
  snappy: { stiffness: 350, damping: 30, mass: 1 },
  gentle: { stiffness: 180, damping: 24, mass: 1 },
  bouncy: { stiffness: 240, damping: 16, mass: 1 },
} as const;

export type SpringPreset = keyof typeof SpringPresets;

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Solves damped harmonic oscillator for normalized time [0, 1]
 */
export function solveSpring(t: number, config: SpringConfig = SpringPresets.gentle): number {
  const { stiffness = 180, damping = 24, mass = 1 } = config;
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta < 1) {
    // Under-damped (oscillates)
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
  } else if (zeta === 1) {
    // Critically damped
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  } else {
    // Over-damped
    const s1 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1));
    const s2 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1));
    return 1 - (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1);
  }
}

/**
 * Generates keyframe objects for Element.animate()
 */
export function generateSpringKeyframes(
  from: Record<string, number | string>,
  to: Record<string, number | string>,
  config: SpringConfig = SpringPresets.gentle,
  steps = 30
): Keyframe[] {
  if (prefersReducedMotion()) {
    return [from as Keyframe, to as Keyframe];
  }

  const keyframes: Keyframe[] = [];
  const keys = Object.keys(from);

  for (let i = 0; i <= steps; i++) {
    const progress = solveSpring(i / steps, config);
    const frame: Record<string, number | string> = {};

    for (const key of keys) {
      const fromVal = from[key];
      const toVal = to[key];
      if (typeof fromVal === 'number' && typeof toVal === 'number') {
        frame[key] = fromVal + (toVal - fromVal) * progress;
      } else {
        frame[key] = i === steps ? toVal : fromVal;
      }
    }
    keyframes.push(frame as Keyframe);
  }

  return keyframes;
}
