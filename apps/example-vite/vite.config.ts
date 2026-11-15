// Copyright (c) Meta Platforms, Inc. and affiliates.

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {astryxStylex} from '@blue-patterns/build/vite';

export default defineConfig({
  plugins: [...astryxStylex(), react()],
});
