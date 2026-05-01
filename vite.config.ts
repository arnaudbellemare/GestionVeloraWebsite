import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    /** Smaller main-thread work on first paint: split heavy vendors for parallel cache + parse. */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('three')) return 'three'
          if (id.includes('react-dom') || id.includes('/react/')) return 'react-core'
          if (id.includes('react-router')) return 'router'
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n'
          if (id.includes('lenis')) return 'lenis'
        },
      },
    },
  },
  server: {
    /** Match Vite’s usual default so local URLs like http://127.0.0.1:5173/... work without extra flags */
    port: 5173,
    strictPort: false,
    hmr: { overlay: true },
    watch: {
      usePolling: 1000,
    },
  },
})
