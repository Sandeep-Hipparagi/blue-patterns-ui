// Copyright (c) Meta Platforms, Inc. and affiliates.

import {createRoot} from 'react-dom/client';
import './index.css';
import {Theme} from '@blue-patterns/core/theme';
import {App} from './App';
import {fixtureTheme} from './theme';

createRoot(document.getElementById('root')!).render(
  <Theme theme={fixtureTheme} mode="light">
    <App />
  </Theme>,
);
