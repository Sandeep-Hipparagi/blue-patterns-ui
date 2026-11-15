import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@blue-patterns/core/reset.css';
import '@blue-patterns/core/astryx.css';
import './index.css';
import {Theme} from '@blue-patterns/core/theme';
import {themes, defaultThemeSlug} from './astryx-themes';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme theme={themes[defaultThemeSlug]}>
      <App />
    </Theme>
  </StrictMode>,
);
