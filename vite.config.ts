import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/', replacement: '/src' },
      { find: '@/Assets', replacement: '/src/assets' },
      { find: '@/components', replacement: '/src/components' },
      { find: '@/application', replacement: '/src/application' },
      { find: '@/domain', replacement: '/src/domain' },
    ],
  }
})
