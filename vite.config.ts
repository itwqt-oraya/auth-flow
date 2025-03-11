import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@context': '/src/context',
      '@modules': '/src/modules',
      '@api': '/src/api',
      '@routes': '/src/routes',
    },
  },
  server: {
    port: 3000,
  },
});
