import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** GEO / scanner-friendly HTML: explicit defer on the entry module. */
function geoHtmlOptimizations(): Plugin {
  return {
    name: 'geo-html-optimizations',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        let out = html
        // Entry chunk: surface the hashed module as a high-priority preload before execution.
        out = out.replace(
          /<script type="module" crossorigin src="([^"]+)"><\/script>/,
          '<link rel="modulepreload" crossorigin href="$1" fetchpriority="high">\n    <script type="module" crossorigin defer fetchpriority="high" src="$1"></script>'
        )

        // Inline the main CSS so it is not a render-blocking request on the LCP critical
        // path. An inline <style> still applies synchronously (no first-paint style swap /
        // CLS) but removes the extra network hop. Build-only: ctx.bundle is undefined in dev.
        const cssLinkRe = /<link rel="stylesheet"[^>]*href="\/(assets\/index-[^"]+\.css)"[^>]*>/
        const cssMatch = out.match(cssLinkRe)
        if (cssMatch && ctx.bundle) {
          const asset = ctx.bundle[cssMatch[1]]
          if (asset && asset.type === 'asset' && typeof asset.source === 'string') {
            const css = asset.source
            out = out.replace(cssLinkRe, () => `<style>${css}</style>`)
          }
        }

        const assetHintPattern =
          /\n\s*(?:<script type="module" crossorigin defer fetchpriority="high" src="\/assets\/index-[^"]+\.js"><\/script>|<link rel="modulepreload" crossorigin href="\/assets\/[^"]+\.js"(?: fetchpriority="high")?>)/g
        const assetHints = out.match(assetHintPattern)
        if (assetHints?.length) {
          out = out.replace(assetHintPattern, '')
          out = out.replace(
            /(<meta charset="UTF-8" \/>\n)/,
            `$1${assetHints.map((tag) => `${tag.trimStart()}\n`).join('')}`
          )
        }
        return out
      },
    },
  }
}

/**
 * Dev-only stand-in for /api/plex-radar. The Vercel function needs a Blob
 * store, so `vite dev` serves the archived releases in claudedocs instead and
 * builds the benchmark tables from them with the same library the API uses.
 */
function plexRadarDevFeed(): Plugin {
  const dir = resolve(__dirname, 'claudedocs/plex-radar-backup')
  const releaseFiles = () => (existsSync(dir) ? readdirSync(dir) : [])
    .filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name))
    .map((name) => name.replace(/\.json$/, ''))
    .sort((a, b) => b.localeCompare(a))
  return {
    name: 'plex-radar-dev-feed',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        if (url.pathname !== '/api/plex-radar') return next()
        const json = (status: number, payload: unknown) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(payload))
        }
        const releases = releaseFiles()
        if (releases.length === 0) return json(404, { error: 'no archived releases in claudedocs/plex-radar-backup' })
        if (url.searchParams.has('history')) return json(200, { releases })
        if (url.searchParams.has('benchmarks')) {
          const lib = await server.ssrLoadModule('/src/lib/plex/radar-benchmarks.ts')
          const feeds = releases.map((release) => JSON.parse(readFileSync(resolve(dir, `${release}.json`), 'utf8')))
          return json(200, lib.buildBenchmarks(feeds))
        }
        const requested = url.searchParams.get('release')
        const release = requested && releases.includes(requested) ? requested : releases[0]
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')
        res.end(readFileSync(resolve(dir, `${release}.json`)))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), geoHtmlOptimizations(), plexRadarDevFeed()],
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
