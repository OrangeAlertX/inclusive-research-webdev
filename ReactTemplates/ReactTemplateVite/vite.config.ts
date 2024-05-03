import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

if (process.env.BASE === '/') {
  console.log(`Error: process.env.BASE cannot end on '/'`);
  process.exit(1);
}
const BASE = process.env.BASE ?? '/';

console.log('BASE: ', BASE);

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react()],
});
