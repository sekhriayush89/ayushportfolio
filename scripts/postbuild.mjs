// Runs after `vite build`:
//  1. writes robots.txt / sitemap.xml / llms.txt into dist/
//  2. prerenders the React app to static HTML and injects JSON-LD so crawlers,
//     link previews and AI assistants that do not run JavaScript still get the
//     full content. If prerendering fails, the build still succeeds (client-only).
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { site, buildJsonLd } from '../src/siteData.js'
import { robotsTxt, sitemapXml, llmsTxt } from './seo-files.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const DEFAULT_URL = site.url
const base = (process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_URL).replace(/\/+$/, '')

// 1) SEO text files ---------------------------------------------------------
await writeFile(path.join(dist, 'robots.txt'), robotsTxt(base))
await writeFile(path.join(dist, 'sitemap.xml'), sitemapXml(base))
await writeFile(path.join(dist, 'llms.txt'), llmsTxt(base))
console.log(`[seo] robots.txt, sitemap.xml, llms.txt written for ${base}`)

// 2) Prerender --------------------------------------------------------------
const indexPath = path.join(dist, 'index.html')
let template = await readFile(indexPath, 'utf8')
template = template.split(DEFAULT_URL).join(base)

const jsonLd = JSON.stringify(buildJsonLd(base)).replace(/</g, '\\u003c')
template = template.replace('<!--jsonld-->', `<script type="application/ld+json">${jsonLd}</script>`)

try {
  const { createServer } = await import('vite')
  const server = await createServer({
    root,
    appType: 'custom',
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  })
  try {
    const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
    const appHtml = render()
    if (!appHtml || appHtml.length < 500) throw new Error('prerender returned almost no HTML')
    template = template.replace('<!--app-html-->', appHtml)
    console.log(`[prerender] injected ${Math.round(appHtml.length / 1024)} KB of static HTML`)
  } finally {
    await server.close()
  }
} catch (error) {
  console.warn('[prerender] skipped – site will render client-side only:', error?.message || error)
}

await writeFile(indexPath, template)
console.log('[postbuild] dist/index.html updated')
process.exit(0)
