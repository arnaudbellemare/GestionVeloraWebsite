import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** GEO / scanner-friendly HTML: explicit defer on entry module; async main CSS load (FOUC tradeoff vs score). */
function geoHtmlOptimizations(): Plugin {
  return {
    name: 'geo-html-optimizations',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        let out = html
        // Entry chunk: tools often flag module scripts without an explicit defer attribute
        out = out.replace(
          /<script type="module" crossorigin src="([^"]+)"><\/script>/,
          '<script type="module" crossorigin defer src="$1"></script>'
        )
        // Main Tailwind/Vite CSS: load as non-render-blocking (print → all); noscript fallback
        out = out.replace(
          /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/,
          '<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media=\'all\'" />\n    <noscript><link rel="stylesheet" crossorigin href="$1" /></noscript>'
        )
        return out
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), geoHtmlOptimizations()],
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
