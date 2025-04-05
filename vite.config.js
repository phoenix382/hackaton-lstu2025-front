import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // не забыть отключить
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['localhost', '127.0.0.1', 'front.root.sx'],
    proxy: {
      '/api': {
        target: 'https://back.root.sx',
        changeOrigin: true,
      },
      '/ml': {
        target: 'https://back.root.sx',
        changeOrigin: true,
      }
    }
  }
})
