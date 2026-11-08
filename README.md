# Ayush Sekhri – Portfolio (SEO / GEO / AEO + performance build)

## Run it
```bash
npm install
npm run dev        # local dev
npm run build      # build + prerender + sitemap/robots/llms.txt  -> dist/
```
Deploy to Vercel as before (`vercel.json` is already set up).

## 1. Set your real domain (important)
The default domain is `https://ayushsekhri.in`. If yours is different, set an
environment variable in Vercel (Project → Settings → Environment Variables):

    SITE_URL = https://your-real-domain.com

The build rewrites canonical, Open Graph, JSON-LD, sitemap, robots and llms.txt.
Also change the domain in `index.html` (canonical / og:url / og:image) if you want
the source file to match.

## 2. Upload the 3 videos to Cloudinary
The optimized files are in `public/videos/` (intro, portrait, banner = 1.8 MB total,
down from 24 MB). To put them on your Cloudinary account (`dw8y3wzsg`):

1. Cloudinary dashboard → *Settings → API Keys* → copy key and secret
2. `cp .env.example .env` and put them in `CLOUDINARY_URL=cloudinary://KEY:SECRET@dw8y3wzsg`
3. `npm run upload:videos`

They land at `ayush-portfolio/intro|portrait|banner`. The site loads them from
Cloudinary first and automatically falls back to `/videos/*.mp4`, so nothing breaks
if an upload is missing. After you confirm they play from Cloudinary you can delete
`public/videos/` to shrink the deploy (keep the fallback if you prefer safety).

## 3. Add your social profiles (biggest remaining SEO win)
Open `src/siteData.js` and fill `profiles: []` with your LinkedIn / Instagram /
Behance / GitHub URLs. They become `sameAs` in the Person schema, which is how
Google and AI assistants connect "Ayush Sekhri" to one identity.

## What was done
- **SEO**: unique title/description, canonical, Open Graph + Twitter cards, geo tags,
  favicon set + manifest, robots.txt, sitemap.xml with image + video entries,
  semantic HTML (real `h1`, header/main/footer, landmarks, skip link).
- **GEO / AEO**: build-time prerendering (crawlers and AI bots that do not run
  JavaScript now see the full page), JSON-LD graph (Person, ProfilePage, WebSite,
  ProfessionalService, 8× VideoObject, ItemList, FAQPage), visible FAQ section
  with direct answers, `llms.txt`, explicit AI-crawler rules in robots.txt.
- **Performance**: videos 24 MB → 1.8 MB (no audio track, right-sized), images →
  responsive WebP (cursor 554 KB → 4 KB), lazy loading, width/height (no layout
  shift), non-blocking fonts, video poster images + `preload="none"` for the
  8 project videos, keyed videos only render while on screen, canvas processing
  at display size, long-term caching + security headers in `vercel.json`.
- **Responsive**: pixel hacks (`translateY(-350px)`, `margin-top:-600px`) replaced by
  viewport-relative values, tablet breakpoint, 2-column work grid on large phones,
  fixed portrait overlapping text and clipped "2026" label, custom cursor only on
  mouse devices, reduced-motion support, notch/safe-area padding.

## Things to double-check in your content
- Two different emails were used (`sekhriayush89@gmail.com`, `hello@ayushsekhri.in`).
  The site now uses the Gmail address everywhere – change it in `src/siteData.js`.
- Experience reads "6 October - Present" (no year) and the skills list says
  "Sedance 2.5" / "Premier Pro" – fix the wording in `src/App.jsx` if needed.
- Project `uploadDate` is set to 2026-11-08 in `src/siteData.js`.

## After deploying
1. Add the site in **Google Search Console** and **Bing Webmaster Tools**, submit `/sitemap.xml`.
2. Test with Google's Rich Results Test and the Schema.org validator.
3. Link to the portfolio from your LinkedIn / Instagram / Behance profiles.
