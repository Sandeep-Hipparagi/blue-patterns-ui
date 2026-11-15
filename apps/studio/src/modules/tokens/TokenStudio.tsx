import React, { useState } from 'react';
import { ColorContrastGenerator } from './ColorContrastGenerator';
import { ScaleDensitySliders } from './ScaleDensitySliders';
import { SpringPhysicsTuner } from './SpringPhysicsTuner';
import { LivePreviewCanvas } from './LivePreviewCanvas';
import { ExportDrawer } from './ExportDrawer';
import { Button } from '@blue-patterns/core';
import { useStudioTheme } from '../../components/ThemeContext';
import { DownloadIcon, RefreshIcon } from '../../components/Icons';

export function TokenStudio() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { resetTokens } = useStudioTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Module Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--typography-size-2xl, 1.75rem)', fontWeight: 800 }}>
            Live Token & Motion Studio
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--typography-size-sm)', color: 'var(--color-text-secondary)' }}>
            Interactive workbench mutating CSS custom properties in real-time with zero runtime CSS overhead.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
          <Button
            label="Reset Defaults"
            variant="secondary"
            size="md"
            onClick={resetTokens}
          />
          <Button
            label="Export Theme Pack"
            variant="primary"
            size="md"
            onClick={() => setIsExportOpen(true)}
          />
        </div>
      </div>

      {/* Grid Layout: Left Controls + Right Live Canvas */}
      <div className="token-studio-grid">
        {/* Left Workbench */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <ColorContrastGenerator />
          <ScaleDensitySliders />
          <SpringPhysicsTuner />
        </div>

        {/* Right Live Canvas */}
        <LivePreviewCanvas />
      </div>

      {/* Export Drawer */}
      <ExportDrawer isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
