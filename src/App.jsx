import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { faqs, localVideos, projects, site } from './siteData.js'

// ---------------------------------------------------------------------------
// Custom cursor: only for mouse / trackpad users. Touch devices get nothing
// (no wasted request, no hidden native cursor).
// ---------------------------------------------------------------------------
function CustomCursor() {
  const cursorRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('has-custom-cursor', enabled)
    if (!enabled) return undefined
    const moveCursor = (event) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      }
    }
    window.addEventListener('pointermove', moveCursor, { passive: true })
    return () => {
      window.removeEventListener('pointermove', moveCursor)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return <img ref={cursorRef} className="custom-cursor" src="/images/cursor.webp" width="96" height="64" alt="" aria-hidden="true" />
}

// ---------------------------------------------------------------------------
// Background-removed video (white or green screen) drawn on a canvas.
// - Loads from Cloudinary first, falls back to the copy in /public/videos.
// - Canvas is sized to what is actually displayed (not the full video size).
// - Only processes frames while on screen, and only when a new frame exists.
// - Respects prefers-reduced-motion (shows a single still frame).
// ---------------------------------------------------------------------------
function KeyedVideo({
  source,
  label,
  width,
  height,
  removeGreenBackground = false,
  canvasClassName = 'intro-video',
  decorative = false,
  eager = false,
}) {
  const [src, setSrc] = useState(source.cloud)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const srcRef = useRef(source.cloud)

  // Cloudinary first; if it fails (missing upload, CORS, offline) use the local copy.
  // `failedSrc` guards against stale/duplicate error events for a source we already left.
  const switchToFallback = (failedSrc) => {
    if (failedSrc !== srcRef.current) return
    if (srcRef.current !== source.fallback) {
      srcRef.current = source.fallback
      setSrc(source.fallback)
    } else {
      setFailed(true)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return undefined

    // The error event can fire before React attaches handlers on a prerendered page.
    if (video.error || video.networkState === 3) switchToFallback(srcRef.current)

    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visible = false
    let handle = null
    let usingVideoCallback = false
    let disposed = false

    const paint = () => {
      if (video.readyState < 2 || !video.videoWidth) return
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const displayWidth = canvas.clientWidth || video.videoWidth
      const targetWidth = Math.max(2, Math.min(video.videoWidth, Math.round(displayWidth * ratio)))
      const targetHeight = Math.max(2, Math.round((targetWidth * video.videoHeight) / video.videoWidth))
      if (canvas.width !== targetWidth) canvas.width = targetWidth
      if (canvas.height !== targetHeight) canvas.height = targetHeight

      context.drawImage(video, 0, 0, targetWidth, targetHeight)
      let frame
      try {
        frame = context.getImageData(0, 0, targetWidth, targetHeight)
      } catch (error) {
        // Cross-origin pixels are blocked (CORS). Use the same-origin copy instead.
        switchToFallback(srcRef.current)
        return
      }

      const data = frame.data
      for (let index = 0; index < data.length; index += 4) {
        const red = data[index]
        const green = data[index + 1]
        const blue = data[index + 2]
        if (removeGreenBackground) {
          if (green > red + 20 && green > blue + 20 && green > 70) data[index + 3] = 0
        } else {
          const max = Math.max(red, green, blue)
          const min = Math.min(red, green, blue)
          if (max - min < 24 && (red + green + blue) / 3 > 145) data[index + 3] = 0
        }
      }
      context.putImageData(frame, 0, 0)
    }

    const tick = () => {
      handle = null
      paint()
      if (!reduceMotion) schedule()
    }

    const schedule = () => {
      if (handle !== null || !visible || disposed) return
      if (typeof video.requestVideoFrameCallback === 'function') {
        usingVideoCallback = true
        handle = video.requestVideoFrameCallback(tick)
      } else {
        usingVideoCallback = false
        handle = requestAnimationFrame(tick)
      }
    }

    const cancel = () => {
      if (handle === null) return
      if (usingVideoCallback && typeof video.cancelVideoFrameCallback === 'function') video.cancelVideoFrameCallback(handle)
      else cancelAnimationFrame(handle)
      handle = null
    }

    const onLoaded = () => {
      if (reduceMotion) {
        paint()
        video.pause()
        return
      }
      if (visible) {
        video.play().catch(() => undefined)
        schedule()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          if (reduceMotion && video.readyState >= 2) paint()
          else {
            video.play().catch(() => undefined)
            schedule()
          }
        } else {
          cancel()
          video.pause()
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 },
    )

    observer.observe(canvas)
    video.addEventListener('loadeddata', onLoaded)
    return () => {
      disposed = true
      observer.disconnect()
      video.removeEventListener('loadeddata', onLoaded)
      cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeGreenBackground])

  if (failed) {
    return (
      <div className="video-fallback animate-[fallback-pulse_2.4s_ease-in-out_infinite]" aria-hidden="true">
        <span>AS</span>
      </div>
    )
  }

  return (
    <>
      <video
        ref={videoRef}
        className="source-video"
        autoPlay={eager}
        loop
        muted
        playsInline
        preload={eager ? 'auto' : 'none'}
        crossOrigin="anonymous"
        src={src}
        onError={(event) => switchToFallback(event.currentTarget.getAttribute('src'))}
        aria-hidden="true"
        tabIndex={-1}
      />
      <canvas
        ref={canvasRef}
        className={canvasClassName}
        width={width}
        height={height}
        {...(decorative ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': label })}
      />
    </>
  )
}

function AnimatedName({ isVisible }) {
  const [name, setName] = useState('')
  const fullName = site.name

  useEffect(() => {
    if (!isVisible) {
      setName('')
      return undefined
    }

    let characterIndex = 0
    let typingTimer
    const startTimer = setTimeout(() => {
      typingTimer = setInterval(() => {
        characterIndex += 1
        setName(fullName.slice(0, characterIndex))
        if (characterIndex === fullName.length) clearInterval(typingTimer)
      }, 105)
    }, 850)

    return () => {
      clearTimeout(startTimer)
      clearInterval(typingTimer)
    }
  }, [isVisible, fullName])

  return (
    <span className="name-tag transition-[opacity,transform] duration-500 ease-out" aria-hidden="true">
      {name}
    </span>
  )
}

function ProjectVideo({ project }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => undefined)
    else video.pause()
  }

  return (
    <div className="project-video-frame">
      <video
        ref={videoRef}
        preload="none"
        poster={project.poster}
        loop
        muted
        playsInline
        src={project.src}
        onClick={togglePlayback}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={`${project.title} project video. Click to play or pause`}
      />
      {!isPlaying && (
        <button type="button" className="project-play-button" onClick={togglePlayback} aria-label={`Play ${project.title} video`}>
          <span />
        </button>
      )}
    </div>
  )
}

const SYMBOLS = ['♥', '♠', '♦', '♣']
// Text is rendered with CSS (data-text) so the repeated decorative words never
// end up as duplicated copy in the HTML that search engines read.
const marquee = (text, repeat) =>
  Array.from({ length: repeat }).flatMap((_, i) => [
    <span key={`t${i}`} data-text={text} />,
    <b key={`s${i}`} data-sym={SYMBOLS[i % (repeat / 2)]} />,
  ])

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [annotationVisible, setAnnotationVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const revealTimer = setTimeout(() => setAnnotationVisible(true), 1000)
    return () => clearTimeout(revealTimer)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <CustomCursor />

      <header className={`topbar ${scrolled ? 'topbar-scrolled' : ''}`}>
        <a className="monogram" href="#top" aria-label="Ayush Sekhri – back to top">AS<span>.</span></a>
        <nav id="primary-nav" aria-label="Primary" className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a href={`mailto:${site.email}`} onClick={closeMenu}>Contact <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </header>

      <main id="main">
        <section id="top" className="hero-section" aria-labelledby="page-title">
          <div className="hero-copy animate-[rise-in_.9s_cubic-bezier(.2,.8,.2,1)_both]">
            <h1 id="page-title" className="sr-only">
              Ayush Sekhri – AI Content Creator and Generative AI Video Portfolio, Mohali, India
            </h1>
            <p className="eyebrow" aria-hidden="true">Welcome to my</p>
            <div className="title-line" aria-hidden="true">
              <span className="hero-word hero-word-start">Portf</span>
              <div className="video-wrap animate-[video-in_1.1s_.25s_cubic-bezier(.2,.8,.2,1)_both]">
                <KeyedVideo source={localVideos.intro} label="Ayush Sekhri intro animation" width={640} height={640} decorative eager />
              </div>
              <span className="hero-word hero-word-end">lio</span>
            </div>
            <div className="year">2026</div>
          </div>

          <div
            className={`annotation animate-[name-in_1s_.65s_cubic-bezier(.2,.8,.2,1)_both] ${annotationVisible ? 'annotation-scrolled' : ''}`}
          >
            <svg className="scroll-pointer transition-[opacity,transform] duration-700 ease-out" viewBox="0 0 120 90" aria-hidden="true">
              <path d="M10 80C8 49 25 29 69 18M69 18l-13-3M69 18l-6 12" />
            </svg>
            <AnimatedName isVisible={annotationVisible} />
          </div>

          <div className="hero-footer">
            <div className="ornament" aria-hidden="true"><span>♥</span><span>♦</span><span>♣</span><span>♠</span></div>
            <span className="location">Based in {site.locality}, {site.region}</span>
          </div>
        </section>

        <section className="about-board" id="about" aria-labelledby="about-title">
          <div className="about-photo">
            <KeyedVideo
              source={localVideos.portrait}
              label="Ayush Sekhri portrait animation"
              width={720}
              height={1512}
              removeGreenBackground
            />
          </div>

          <div className="about-main">
            <p className="about-kicker">About me</p>
            <h2 id="about-title">
              <span aria-hidden="true">HELLO</span>
              <span className="sr-only">About Ayush Sekhri</span>
            </h2>
            <p className="about-lead">Hi, I'm Ayush Sekhri.</p>
            <p>Creative AI Content Creator skilled in generative AI tools, visual content, social media creatives, promotional concepts, copywriting, and visual storytelling.</p>
            <p>I combine creativity with technical knowledge to transform ideas into high-quality content that aligns with brand identity and audience expectations.</p>

            <div className="education-block">
              <h3>EDUCATION</h3>
              <strong>MCA (AI &amp; ML) | Shoolini University, Solan</strong>
              <span>Aug 2024 - Jun 2026</span>
              <strong>BCA | Himachal Pradesh University, Shimla</strong>
              <span>Aug 2021 - Jun 2024</span>
            </div>
          </div>

          <aside className="about-side" aria-label="Skills, experience and credentials">
            <div>
              <h3>SKILLS</h3>
              <div className="skills-list">
                <p><b>AI &amp; Generative AI:</b> ChatGPT, Gemini, Claude, Google Flow, Higgsfield Gengutsu, Gen-4, Sedance 2.5, Kling 4.0, Veo, Wan, Omni Flash</p>
                <p><b>Audio &amp; Music:</b> ElevenLabs, Suno AI, AI voiceovers, Sound design</p>
                <p><b>Prompt Engineering:</b> Text-to-image, Image editing, Text-to-video, Creative prompt design</p>
                <p><b>Content Creation:</b> UGC video, social media, promotional content, marketing copy, visual storytelling</p>
                <p><b>Design Tools:</b> Figma, Canva, Picsart, Photoshop, Premier Pro, CapCut, Motion graphics</p>
              </div>
            </div>
            <div className="experience-block">
              <h3>EXPERIENCE</h3>
              <div><strong>Kushmanda Cosmetics Pvt. Ltd. | 6 October - Present</strong><b>AI Content Creator</b></div>
            </div>
            <div className="credentials"><h3>CERTIFICATION</h3><span>Full Stack Web Development - AI Integrated | Udemy</span><span>UI/UX Design Certification | Udemy</span></div>
            <div className="languages"><h3>LANGUAGES</h3><span>English (Fluent), Hindi (Native), Punjabi (Conversational)</span></div>
            <a className="about-contact" href={`mailto:${site.email}`}>Let's work together <ArrowUpRight size={16} aria-hidden="true" /></a>
          </aside>
        </section>

        <section className="banner-video-section" aria-hidden="true">
          <KeyedVideo
            source={localVideos.banner}
            label="Ayush Sekhri banner animation"
            width={1280}
            height={720}
            removeGreenBackground
            canvasClassName="full-banner-video"
            decorative
          />
        </section>

        <section className="mindset-section" aria-labelledby="mindset-title">
          <p className="mindset-kicker">A little more about how I work</p>
          <h2 id="mindset-title">Creative Mindset</h2>
          <p className="mindset-copy"><span>I turn curious ideas into clear visual stories.</span><span>I experiment with design, AI, and motion until the idea feels alive.</span><span>Every detail has a purpose, and every project has a point of view.</span></p>
          <div className="polaroid-grid">
            <figure className="polaroid polaroid-left">
              <img
                src="/images/mindset-1-1020.webp"
                srcSet="/images/mindset-1-480.webp 480w, /images/mindset-1-1020.webp 1020w"
                sizes="(max-width: 700px) 80vw, 30vw"
                width="1020" height="1392"
                alt="Illustration of a developer with a backpack and laptop watching the sunset over mountains, with a quote about discipline"
                loading="lazy" decoding="async"
              />
            </figure>
            <figure className="polaroid polaroid-center">
              <img
                src="/images/mindset-2-1028.webp"
                srcSet="/images/mindset-2-480.webp 480w, /images/mindset-2-1028.webp 1028w"
                sizes="(max-width: 700px) 80vw, 30vw"
                width="1028" height="1392"
                alt="Laptop on a desk showing a mountain sunset, with a quote about bold ideas"
                loading="lazy" decoding="async"
              />
            </figure>
            <figure className="polaroid polaroid-right">
              <img
                src="/images/mindset-3-1032.webp"
                srcSet="/images/mindset-3-480.webp 480w, /images/mindset-3-1032.webp 1032w"
                sizes="(max-width: 700px) 80vw, 30vw"
                width="1032" height="1372"
                alt="Portrait of Ayush Sekhri wearing glasses and resting his chin on his hand while looking at a laptop, with a quote about loving your work"
                loading="lazy" decoding="async"
              />
            </figure>
          </div>
        </section>

        <div className="workfolio-strip" aria-hidden="true">
          <div className="workfolio-track">{marquee('WORKFOLIO', 16)}</div>
        </div>

        <section className="workfolio-image" aria-label="My AI content creation banner">
          <img
            src="/images/banner-1632.webp"
            srcSet="/images/banner-800.webp 800w, /images/banner-1632.webp 1632w"
            sizes="100vw"
            width="1632" height="963"
            alt="My AI Content Creation – Ayush Sekhri portfolio 2026 banner, Mohali"
            loading="lazy" decoding="async"
          />
        </section>

        <div className="workfolio-strip" aria-hidden="true">
          <div className="workfolio-track">{marquee('WORKFOLIO', 16)}</div>
        </div>

        <section className="workfolio-work" id="work" aria-labelledby="work-title">
          <h2 id="work-title" className="sr-only">Selected AI video work and ad creatives by Ayush Sekhri</h2>
          <div className="workfolio-grid">
            {projects.map((project) => (
              <article className="workfolio-card" key={project.n}>
                <ProjectVideo project={project} />
                <div>
                  <span>{project.n}</span>
                  <h3 className={project.single ? 'single-line-title' : undefined}>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="thanks-strip" aria-hidden="true">
          <div className="workfolio-track">{marquee('THANKS FOR VISITING', 16)}</div>
        </div>


        <section className="concepts-section" id="contact" aria-labelledby="concepts-title">
          <h2 id="concepts-title">MY CONCEPTS</h2>
          <div className="concepts-grid">
            <div className="concepts-poster">
              <img
                src="/images/concepts-1199.webp"
                srcSet="/images/concepts-600.webp 600w, /images/concepts-1199.webp 1199w"
                sizes="(max-width: 700px) 90vw, 55vw"
                width="1199" height="1312"
                alt="Hand-drawn poster of Ayush Sekhri listing what he does: web development, AI video and visuals, brand and graphic design, content creation and creative AI solutions"
                loading="lazy" decoding="async"
              />
            </div>
            <div className="concepts-contact">
              <a href={`mailto:${site.email}`}>Mail me at {site.email} <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">Let's have a meeting <ArrowUpRight size={18} aria-hidden="true" /></a>
              <p>Have a bold idea or a project in mind?</p>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-title">
          <p className="mindset-kicker">Quick answers</p>
          <h2 id="faq-title">FAQ</h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer-final">
        <div className="thanks-watching-strip" aria-hidden="true">
          <div className="workfolio-track">{marquee('THANKS FOR VISITING', 16)}</div>
        </div>
        <p>© 2026 Ayush Sekhri · {site.locality}, {site.region}, India · All rights reserved.</p>
      </footer>
    </div>
  )
}
