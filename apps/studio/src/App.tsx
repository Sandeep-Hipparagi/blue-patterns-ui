import React from 'react';
import { useStudioTheme } from './components/ThemeContext';
import { AppShell } from './components/AppShell';
import { TokenStudio } from './modules/tokens/TokenStudio';
import { ComponentMatrix } from './modules/matrix/ComponentMatrix';
import { AgentInspector } from './modules/agent/AgentInspector';
import { RegistryExplorer } from './modules/registry/RegistryExplorer';

export default function App() {
  const { activeModule } = useStudioTheme();

  return (
    <AppShell>
      {activeModule === 'tokens' && <TokenStudio />}
      {activeModule === 'matrix' && <ComponentMatrix />}
      {activeModule === 'agent' && <AgentInspector />}
      {activeModule === 'registry' && <RegistryExplorer />}
    </AppShell>
  );
}
