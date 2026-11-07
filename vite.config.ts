import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { siteConfig } from './src/data/siteConfig.ts'

/**
 * SEO plugin
 *  - injects LocalBusiness (Bakery) structured data built from siteConfig
 *  - when SITE_URL is set (e.g. SITE_URL=https://your-domain.com in .env),
 *    adds canonical + absolute Open Graph URLs and emits sitemap.xml
 *  - always emits robots.txt
 */
function seo(siteUrl: string | undefined): Plugin {
  const base = siteUrl?.replace(/\/$/, '')
  const abs = (path: string) => (base ? `${base}${path}` : path)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone.tel,
    image: abs('/og-image.jpg'),
    ...(base ? { url: `${base}/` } : {}),
    founder: { '@type': 'Person', name: siteConfig.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    areaServed: { '@type': 'City', name: siteConfig.address.locality },
    sameAs: [siteConfig.instagram.url],
  }

  return {
    name: 'cake-vibe-seo',
    transformIndexHtml() {
      const tags: { tag: string; attrs?: Record<string, string>; children?: string; injectTo: 'head' }[] = [
        { tag: 'meta', attrs: { property: 'og:image', content: abs('/og-image.jpg') }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: abs('/og-image.jpg') }, injectTo: 'head' },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd),
          injectTo: 'head',
        },
      ]
      if (base) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${base}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${base}/` }, injectTo: 'head' },
        )
      }
      return tags
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`,
      })
      if (base) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seo(env.SITE_URL)],
  }
})
