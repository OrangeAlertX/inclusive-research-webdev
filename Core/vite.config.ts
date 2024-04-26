import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Mode, plugin as mdReader } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdReader({ mode: [Mode.REACT] })],
});
