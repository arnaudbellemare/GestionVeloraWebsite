import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
