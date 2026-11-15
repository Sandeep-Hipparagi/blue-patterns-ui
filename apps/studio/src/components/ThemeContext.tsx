import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePreset = 
  | 'default'
  | 'obsidian'
  | 'editorial'
  | 'enterprise'
  | 'glass'
  | 'forest'
  | 'cobalt'
  | 'high-contrast';

export type ColorMode = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';
export type Density = 'compact' | 'comfortable' | 'spacious';

export interface CustomTokens {
  primaryBase: string;
  accentBase: string;
  surfaceBase: string;
  neutralBase: string;
  borderRadius: number; // 0 to 24
  density: Density;
  springStiffness: number; // 100 - 400
  springDamping: number; // 10 - 40
  springMass: number; // 0.5 - 2.0
}

interface ThemeContextType {
  theme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  direction: Direction;
  setDirection: (dir: Direction) => void;
  toggleDirection: () => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  customTokens: CustomTokens;
  updateCustomTokens: (updates: Partial<CustomTokens>) => void;
  resetTokens: () => void;
  activeModule: 'tokens' | 'matrix' | 'agent' | 'registry';
  setActiveModule: (mod: 'tokens' | 'matrix' | 'agent' | 'registry') => void;
}

const defaultCustomTokens: CustomTokens = {
  primaryBase: '#0369a1',
  accentBase: '#8b5cf6',
  surfaceBase: '#ffffff',
  neutralBase: '#64748b',
  borderRadius: 8,
  density: 'comfortable',
  springStiffness: 240,
  springDamping: 20,
  springMass: 1.0,
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemePreset>('default');
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [direction, setDirection] = useState<Direction>('ltr');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [customTokens, setCustomTokens] = useState<CustomTokens>(defaultCustomTokens);
  const [activeModule, setActiveModule] = useState<'tokens' | 'matrix' | 'agent' | 'registry'>('tokens');

  // Sync to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', colorMode);
    document.documentElement.style.colorScheme = colorMode;
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('data-simulated-reduced-motion', String(reducedMotion));
  }, [theme, colorMode, direction, reducedMotion]);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  };

  const updateCustomTokens = (updates: Partial<CustomTokens>) => {
    setCustomTokens((prev) => ({ ...prev, ...updates }));
  };

  const resetTokens = () => {
    setCustomTokens(defaultCustomTokens);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colorMode,
        setColorMode,
        toggleColorMode,
        direction,
        setDirection,
        toggleDirection,
        reducedMotion,
        setReducedMotion,
        customTokens,
        updateCustomTokens,
        resetTokens,
        activeModule,
        setActiveModule,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useStudioTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useStudioTheme must be used within a ThemeProvider');
  }
  return context;
}
