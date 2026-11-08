// Single source of truth for content that is used by the React app AND by the
// SEO generators (JSON-LD, sitemap, llms.txt). Edit here, rebuild, done.

export const CLOUD_NAME = 'dw8y3wzsg'
export const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`

export const site = {
  // Overridden at build time with the SITE_URL environment variable.
  url: 'https://ayushsekhri.in',
  name: 'Ayush Sekhri',
  title: 'Ayush Sekhri | AI Content Creator & Generative AI Video Portfolio',
  description:
    'Ayush Sekhri is an AI Content Creator in Mohali, Punjab, India. Portfolio of AI video ads, UGC videos, social media creatives and generative AI visual storytelling for beauty, jewellery and lifestyle brands.',
  jobTitle: 'AI Content Creator',
  email: 'sekhriayush89@gmail.com',
  bookingUrl: 'https://cal.com/ayush-sekhri/30min',
  locality: 'Mohali',
  region: 'Punjab',
  country: 'IN',
  // Add your real profile links (LinkedIn, Instagram, Behance, GitHub...).
  // They are added to the Person schema as `sameAs`, which is the single most
  // useful signal for search engines and AI assistants to recognise you as an entity.
  profiles: [],
  keywords: [
    'Ayush Sekhri',
    'AI content creator',
    'AI video creator',
    'generative AI portfolio',
    'UGC video creator',
    'AI ad creative',
    'AI content creator Mohali',
    'AI content creator India',
  ],
  knowsAbout: [
    'Generative AI',
    'AI video generation',
    'Prompt engineering',
    'UGC video',
    'Social media creatives',
    'Promotional content',
    'Copywriting',
    'Visual storytelling',
    'Motion graphics',
    'AI voiceovers and music',
    'Web development',
    'Brand and graphic design',
  ],
}

// Cloudinary delivery helpers -------------------------------------------------
// Local videos live in Cloudinary under the "ayush-portfolio" folder
// (run `npm run upload:videos`). The same files are shipped in /public/videos as
// an automatic fallback, so the site never breaks if an upload is missing.
export const cloudVideo = (publicId, width) =>
  `${CLOUD_BASE}/q_auto,ac_none,w_${width}/${publicId}.mp4`

export const cloudPoster = (versionAndId, width = 720) =>
  `${CLOUD_BASE}/so_0,f_jpg,q_auto,w_${width}/${versionAndId}.jpg`

export const localVideos = {
  intro: {
    cloud: cloudVideo('ayush-portfolio/intro', 640),
    fallback: '/videos/intro.mp4',
  },
  portrait: {
    cloud: cloudVideo('ayush-portfolio/portrait', 720),
    fallback: '/videos/portrait.mp4',
  },
  banner: {
    cloud: cloudVideo('ayush-portfolio/banner', 1280),
    fallback: '/videos/banner.mp4',
  },
}

// The eight project videos that were already uploaded to Cloudinary.
export const projects = [
  { n: '01', id: 'v1794141134/souled_store', title: 'Souled Store', single: false, desc: 'Promotional video for Souled Store, created by Ayush Sekhri.' },
  { n: '02', id: 'v1794141117/born_16_kajal', title: 'Born16 Kajal', single: false, desc: 'Product video for Born16 Kajal, created by Ayush Sekhri.' },
  { n: '03', id: 'v1794141121/serum', title: 'Serum Ad', single: false, desc: 'Serum advertisement video created by Ayush Sekhri.' },
  { n: '04', id: 'v1794141149/born16', title: 'Born16 Ad', single: false, desc: 'Born16 advertisement video created by Ayush Sekhri.' },
  { n: '05', id: 'v1794141126/jewellery', title: 'Jewellery Ad', single: false, desc: 'Jewellery advertisement video created by Ayush Sekhri.' },
  { n: '06', id: 'v1794141140/jewellery2', title: 'Jewellery UGC', single: true, desc: 'Jewellery UGC-style video created by Ayush Sekhri.' },
  { n: '07', id: 'v1794141151/dotkeypromo', title: 'Dot & Key UGC', single: true, desc: 'Dot & Key UGC-style promotional video created by Ayush Sekhri.' },
  { n: '08', id: 'v1794141137/dot_and_key', title: 'Dot & Key Ad', single: false, desc: 'Dot & Key advertisement video created by Ayush Sekhri.' },
].map((p) => ({
  ...p,
  src: `${CLOUD_BASE}/q_auto,w_720/${p.id}.mp4`,
  poster: cloudPoster(p.id, 720),
  posterLarge: cloudPoster(p.id, 1280),
  original: `${CLOUD_BASE}/${p.id}.mp4`,
  uploadDate: '2026-11-08',
}))

// Visible FAQ (also emitted as FAQPage schema, so keep answers factual and
// identical to what is shown on the page).
export const faqs = [
  {
    q: 'Who is Ayush Sekhri?',
    a: 'Ayush Sekhri is a Creative AI Content Creator based in Mohali, Punjab, India. He works with generative AI tools to produce visual content, video ads, UGC videos, social media creatives, promotional concepts and copywriting.',
  },
  {
    q: 'What services does Ayush Sekhri offer?',
    a: 'AI video ads and visuals, UGC-style videos, social media creatives, promotional concepts, copywriting, AI voiceovers and music, content creation, brand and graphic design, web development and creative AI solutions.',
  },
  {
    q: 'Which AI tools does Ayush Sekhri use?',
    a: 'ChatGPT, Gemini, Claude, Google Flow, Veo, Kling, Wan and other text-to-image and text-to-video models, plus ElevenLabs and Suno AI for audio, and Figma, Canva, Photoshop, Premiere Pro and CapCut for design and editing.',
  },
  {
    q: 'What is Ayush Sekhri’s background?',
    a: 'He is completing an MCA in AI & ML at Shoolini University, Solan (Aug 2024 – Jun 2026), holds a BCA from Himachal Pradesh University, Shimla, and works as an AI Content Creator at Kushmanda Cosmetics Pvt. Ltd.',
  },
  {
    q: 'Which brands has Ayush Sekhri created content for?',
    a: 'The portfolio includes video work for Souled Store, Born16, Dot & Key, and jewellery and serum campaigns.',
  },
  {
    q: 'How can I hire or contact Ayush Sekhri?',
    a: 'Email sekhriayush89@gmail.com or book a free 30-minute meeting at cal.com/ayush-sekhri/30min.',
  },
]

export const abs = (path, base = site.url) => (path.startsWith('http') ? path : `${base}${path}`)

// JSON-LD graph ---------------------------------------------------------------
export function buildJsonLd(base = site.url) {
  const personId = `${base}/#person`
  const siteId = `${base}/#website`
  const pageId = `${base}/#webpage`
  const ogImage = `${base}/og-image.jpg`

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    url: `${base}/`,
    image: ogImage,
    jobTitle: site.jobTitle,
    description: site.description,
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    worksFor: { '@type': 'Organization', name: 'Kushmanda Cosmetics Pvt. Ltd.' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Shoolini University' },
      { '@type': 'CollegeOrUniversity', name: 'Himachal Pradesh University' },
    ],
    knowsAbout: site.knowsAbout,
    knowsLanguage: ['English', 'Hindi', 'Punjabi'],
    ...(site.profiles.length ? { sameAs: site.profiles } : {}),
  }

  const website = {
    '@type': 'WebSite',
    '@id': siteId,
    url: `${base}/`,
    name: `${site.name} Portfolio`,
    inLanguage: 'en',
    publisher: { '@id': personId },
  }

  const webpage = {
    '@type': 'ProfilePage',
    '@id': pageId,
    url: `${base}/`,
    name: site.title,
    description: site.description,
    inLanguage: 'en',
    isPartOf: { '@id': siteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImage, width: 1200, height: 630 },
    breadcrumb: { '@id': `${base}/#breadcrumb` },
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${base}/#breadcrumb`,
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` }],
  }

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${base}/#service`,
    name: `${site.name} – AI Content Creation`,
    url: `${base}/`,
    image: ogImage,
    email: site.email,
    provider: { '@id': personId },
    areaServed: 'Worldwide',
    address: person.address,
    serviceType: [
      'AI video ads',
      'UGC video',
      'Social media creatives',
      'Promotional content',
      'Copywriting',
      'Brand and graphic design',
      'Web development',
    ],
  }

  const videos = projects.map((p) => ({
    '@type': 'VideoObject',
    '@id': `${base}/#video-${p.n}`,
    name: `${p.title} – AI video by ${site.name}`,
    description: p.desc,
    thumbnailUrl: [p.posterLarge],
    contentUrl: p.original,
    uploadDate: p.uploadDate,
    creator: { '@id': personId },
    inLanguage: 'en',
  }))

  const itemList = {
    '@type': 'ItemList',
    '@id': `${base}/#work`,
    name: `${site.name} – selected video work`,
    itemListElement: videos.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@id': v['@id'] },
    })),
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': `${base}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [person, website, webpage, breadcrumb, service, itemList, ...videos, faq],
  }
}
