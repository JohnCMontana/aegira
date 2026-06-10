import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/security': {
        target: 'https://localhost:55000',
        changeOrigin: true,
        secure: false,
      },
      '/agents': {
        target: 'https://localhost:55000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
