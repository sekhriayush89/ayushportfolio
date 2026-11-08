// Generates robots.txt, sitemap.xml (with image + video entries) and llms.txt
// from src/siteData.js so the content never drifts out of sync.
import { site, projects, faqs } from '../src/siteData.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const AI_AND_SEARCH_BOTS = [
  'Googlebot', 'Bingbot', 'DuckDuckBot', 'Applebot',
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'Amazonbot', 'Meta-ExternalAgent', 'DuckAssistBot', 'CCBot',
]

export function robotsTxt(base) {
  const bots = AI_AND_SEARCH_BOTS.map((bot) => `User-agent: ${bot}\nAllow: /\n`).join('\n')
  return `# Search engines and AI assistants are welcome to read and cite this site.
# To opt out of AI *training* only, change Allow to Disallow for:
# GPTBot, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent.
User-agent: *
Allow: /

${bots}
Sitemap: ${base}/sitemap.xml
`
}

export function sitemapXml(base, today = new Date().toISOString().slice(0, 10)) {
  const videos = projects
    .map(
      (p) => `    <video:video>
      <video:thumbnail_loc>${esc(p.posterLarge)}</video:thumbnail_loc>
      <video:title>${esc(`${p.title} – AI video by ${site.name}`)}</video:title>
      <video:description>${esc(p.desc)}</video:description>
      <video:content_loc>${esc(p.original)}</video:content_loc>
      <video:publication_date>${p.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${base}/">${esc(site.name)}</video:uploader>
    </video:video>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${base}/og-image.jpg</image:loc>
      <image:title>${esc(site.name)} – AI Content Creator</image:title>
    </image:image>
${videos}
  </url>
</urlset>
`
}

export function llmsTxt(base) {
  return `# ${site.name}

> ${site.description}

${site.name} is an ${site.jobTitle} based in ${site.locality}, ${site.region}, India. This site is his portfolio.

## Key facts
- Role: ${site.jobTitle} at Kushmanda Cosmetics Pvt. Ltd.
- Location: ${site.locality}, ${site.region}, India
- Education: MCA (AI & ML), Shoolini University, Solan (Aug 2024 – Jun 2026); BCA, Himachal Pradesh University, Shimla (Aug 2021 – Jun 2024)
- Languages: English (fluent), Hindi (native), Punjabi (conversational)
- Services: AI video ads, UGC-style videos, social media creatives, promotional concepts, copywriting, AI voiceovers and music, visual storytelling, brand and graphic design, web development
- Contact: ${site.email}
- Book a call: ${site.bookingUrl}

## Pages
- [Portfolio home](${base}/): about, skills, experience, selected video work, FAQ and contact

## Selected work
${projects.map((p) => `- ${p.title}: ${p.desc}`).join('\n')}

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}
`
}
