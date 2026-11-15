import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@blue-patterns/core/reset.css';
import '@blue-patterns/core/astryx.css';
import '@blue-patterns/motion/motion.css';
import '@blue-patterns/themes/theme-default.css';
import '@blue-patterns/themes/theme-obsidian.css';
import '@blue-patterns/themes/theme-editorial.css';
import '@blue-patterns/themes/theme-enterprise.css';
import '@blue-patterns/themes/theme-glass.css';
import '@blue-patterns/themes/theme-forest.css';
import '@blue-patterns/themes/theme-cobalt.css';
import '@blue-patterns/themes/theme-high-contrast.css';
import './studio.css';
import { ThemeProvider } from './components/ThemeContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
