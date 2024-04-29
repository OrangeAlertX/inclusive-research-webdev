import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Mode, plugin as mdReader } from 'vite-plugin-markdown';

const BASE = process.env.BASE;

console.log('BASE: ', BASE);

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE ?? '/',
  build: {
    rollupOptions: {
      external: [/^node:.*/],
    },
  },
  plugins: [react(), mdReader({ mode: [Mode.REACT] })],
});
