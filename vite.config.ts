import { defineConfig } from 'vite';

export default defineConfig({
  root: './client',
  build: {
    outDir: '../dist/client'
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
