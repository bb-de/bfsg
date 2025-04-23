import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'client/index.ts', // Pfad zu Ihrer Haupt-TypeScript-Datei
      name: 'AccessibilityWidget',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        format: 'es'
      }
    }
  },
  base: '/bfsg/' // Ihr Repository-Name
});
