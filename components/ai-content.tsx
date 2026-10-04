'use client'

import Link from 'next/link'
import { ArrowLeft, Clapperboard, Image, Lightbulb, Sparkles } from 'lucide-react'

const specialties = [
  { icon: Image, title: 'AI Image Creation', description: 'Fashion, lifestyle, product, and promotional visuals shaped for commercial-quality storytelling.' },
  { icon: Clapperboard, title: 'Video Concepts', description: 'Cinematic product showcases, fashion campaigns, lifestyle scenes, and social-first video directions.' },
  { icon: Lightbulb, title: 'Prompt Engineering', description: 'Prompts for consistent characters, styling, camera movement, lighting, composition, and visual direction.' },
]

const videos = [
  { file: 'dot and key commercial.mp4', thumbnail: 'dot-key-commercial.webp', title: 'Dot & Key Commercial', category: 'Beauty / Campaign' },
  { file: 'dotkeypromo.mp4', thumbnail: 'dot-key-promo.webp', title: 'Dot & Key Promo', category: 'Beauty / Social' },
  { file: 'serum.mp4', thumbnail: 'serum.webp', title: 'Serum Product Showcase', category: 'Beauty / Product' },
  { file: 'souled.mp4', thumbnail: 'souled.webp', title: 'Souled Lifestyle Concept', category: 'Lifestyle / Brand' },
  { file: 'jwelleey2.mp4', thumbnail: 'jewellery-campaign.webp', title: 'Jewellery Campaign', category: 'Fashion / Product' },
  { file: 'jwelley.mp4', thumbnail: 'jewellery-visual.webp', title: 'Jewellery Visual', category: 'Fashion / Product' },
  { file: 'magical.mp4', thumbnail: 'magical-product.webp', title: 'Magical Product Concept', category: 'Product / Concept' },
]

export default function AIContent() {
  return (
    <main className="min-h-screen bg-background text-foreground px-5 py-8 md:px-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground/50 hover:text-accent transition-colors mb-16">
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
        <section className="grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-end border-b border-foreground/15 pb-14 mb-14">
          <div>
            <div className="flex items-center gap-3 text-accent mb-7"><Sparkles size={20} /><span className="text-xs font-semibold uppercase tracking-[0.24em]">Creative AI Studio / 2026</span></div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.92]">AI Content<br /><span className="text-foreground/45">Creation</span></h1>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-foreground/65 max-w-sm lg:pb-2">Visual direction, product stories, and cinematic content shaped with generative AI and a human eye for detail.</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15 mb-20">
          {specialties.map((specialty) => { const Icon = specialty.icon; return (
            <article key={specialty.title} className="p-7 md:p-8 bg-background hover:bg-card/40 transition-colors">
              <Icon size={27} className="text-accent mb-8" /><h2 className="text-xl font-bold mb-3">{specialty.title}</h2><p className="text-foreground/60 leading-relaxed text-sm">{specialty.description}</p>
            </article>
          ) })}
        </section>
        <section className="mb-20">
          <div className="flex items-end justify-between gap-4 mb-8 border-b border-foreground/15 pb-5">
            <div><p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Portfolio / 01</p><h2 className="text-3xl md:text-4xl font-bold">Selected AI Work</h2></div>
            <p className="text-xs uppercase tracking-[0.16em] text-foreground/40">Portrait studies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {videos.map((video, index) => (
              <article key={video.file} className="group">
                <div className="relative overflow-hidden bg-black border border-foreground/15 group-hover:border-accent/70 transition-colors" style={{ aspectRatio: '9 / 16' }}>
                  <video className="w-full h-full object-cover" controls preload="metadata" poster={`/images/video-thumbnails/${video.thumbnail}`}>
                  <source src={`/videos/${encodeURIComponent(video.file)}`} type="video/mp4" />
                  Your browser does not support the video tag.
                  </video>
                  <span className="absolute top-3 left-3 pointer-events-none text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">0{index + 1}</span>
                </div>
                <div className="pt-4"><p className="text-[10px] uppercase tracking-[0.16em] text-accent mb-2">{video.category}</p><h3 className="text-base font-semibold">{video.title}</h3></div>
              </article>
            ))}
          </div>
        </section>
        <section className="border-t border-accent/30 pt-10 max-w-4xl">
          <h2 className="text-3xl font-bold mb-5">Visual &amp; Creative Production</h2>
          <p className="text-foreground/70 leading-relaxed text-lg">My process combines concept development, copywriting, image generation, image editing, video ideation, Photoshop refinement, and prompt design. The goal is always a consistent visual language that aligns with the brand and audience.</p>
        </section>
      </div>
    </main>
  )
}
