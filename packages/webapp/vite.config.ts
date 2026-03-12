import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@haggler/core': new URL('../core/src', import.meta.url).pathname,
    },
  },
  server: {
    proxy: {
      // Proxy exchange APIs to avoid CORS issues in development
      '/api/1inch': {
        target: 'https://api.1inch.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/1inch/, ''),
      },
      '/api/binance': {
        target: 'https://api.binance.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/binance/, ''),
      },
      '/api/okx': {
        target: 'https://www.okx.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/okx/, ''),
      },
    },
  },
})
