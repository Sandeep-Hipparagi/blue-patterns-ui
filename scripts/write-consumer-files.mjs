import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const consumerDir = path.join(os.tmpdir(), 'bp-external-consumer');

const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
fs.writeFileSync(path.join(consumerDir, 'src/main.tsx'), mainTsx);

const appTsx = `import { useState } from 'react';
import '@blue-patterns/core/astryx.css';
import '@blue-patterns/core/reset.css';
import '@blue-patterns/motion/motion.css';
import '@blue-patterns/themes/theme-obsidian.css';

import { Button, Dialog, Tabs, Accordion } from '@blue-patterns/core';
import { LineChart, DonutChart } from '@blue-patterns/charts';
import { Presence } from '@blue-patterns/motion';

export default function App() {
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(true);

  const lineData = [
    { label: 'Q1', value: 100 },
    { label: 'Q2', value: 180 },
    { label: 'Q3', value: 150 },
    { label: 'Q4', value: 240 }
  ];

  const donutData = [
    { label: 'Organic', value: 65 },
    { label: 'Referral', value: 25 },
    { label: 'Direct', value: 10 }
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Blue-Patterns External Consumer Test</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button label="Open Dialog" variant="primary" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Button label="Toggle Presence" variant="secondary" onClick={() => setPresent(!present)}>
          Toggle Presence ({present ? 'Mounted' : 'Unmounted'})
        </Button>
      </div>

      <Presence present={present}>
        <div style={{ padding: '1rem', background: '#f0f4f8', borderRadius: '8px', marginBottom: '2rem' }}>
          Smooth animated presence child!
        </div>
      </Presence>

      <Accordion motion="spring">
        <Accordion.Item id="test-accordion-1" title="Accordion Title" defaultOpen>
          <p>Accordion interior test content rendered with zero-runtime CSS.</p>
        </Accordion.Item>
      </Accordion>

      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Tabs
          items={[
            { id: 'tab-1', label: 'Overview', content: <p>Overview tab content</p> },
            { id: 'tab-2', label: 'Metrics', content: <p>Metrics tab content</p> }
          ]}
          defaultTab="tab-1"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div>
          <h3>Line Chart</h3>
          <LineChart data={lineData} width={400} height={200} />
        </div>
        <div>
          <h3>Donut Chart</h3>
          <DonutChart data={donutData} size={200} centerLabel="Total" centerValue="100%" />
        </div>
      </div>

      <Dialog isOpen={open} onOpenChange={setOpen}>
        <div style={{ padding: '2rem' }}>
          <h2>Test Modal Dialog</h2>
          <p>Dialog body rendered cleanly outside the monorepo.</p>
          <Button label="Close" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Dialog>
    </div>
  );
}
`;
fs.writeFileSync(path.join(consumerDir, 'src/App.tsx'), appTsx);
console.log('Successfully written typed main.tsx and App.tsx in consumerDir');
