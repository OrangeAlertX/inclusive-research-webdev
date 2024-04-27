import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Mode, plugin as mdReader } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [/^node:.*/],
    },
  },
  plugins: [react(), mdReader({ mode: [Mode.REACT] })],
});
