import { describe, it, expect } from 'vitest';
import { solveSpring, SpringPresets, prefersReducedMotion, generateSpringKeyframes } from '../src/spring';

describe('@blue-patterns/motion', () => {
  it('solves harmonic oscillation correctly at t=0 and t=1', () => {
    const atZero = solveSpring(0, SpringPresets.gentle);
    const atOne = solveSpring(1, SpringPresets.gentle);

    expect(atZero).toBeCloseTo(0, 1);
    expect(atOne).toBeCloseTo(1, 1);
  });

  it('provides the standard presets', () => {
    expect(SpringPresets.snappy.stiffness).toBe(350);
    expect(SpringPresets.gentle.stiffness).toBe(180);
    expect(SpringPresets.bouncy.stiffness).toBe(240);
  });

  it('generates keyframes for WAAPI', () => {
    const keyframes = generateSpringKeyframes({ opacity: 0 }, { opacity: 1 }, SpringPresets.snappy, 10);
    expect(keyframes.length).toBeGreaterThan(0);
  });
});
