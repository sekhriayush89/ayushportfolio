import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import './styles.css'
import bannerVideo from './asset/banner.mp4'
import bannerImage from './asset/banner.png'
import cursorImage from './asset/cursor.png'
import graphicVideo from './asset/grpahic.mp4'
import image1 from './asset/image1.jpeg'
import image2 from './asset/image2.jpeg'
import image3 from './asset/image3.jpeg'
import introVideo from './asset/video.mp4'

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (event) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      }
    }

    window.addEventListener('pointermove', moveCursor)
    return () => window.removeEventListener('pointermove', moveCursor)
  }, [])

  return <img ref={cursorRef} className="custom-cursor" src={cursorImage} alt="" aria-hidden="true" />
}

function IntroVideo({ source = introVideo, label = 'Ayush Sekhri intro video', removeGreenBackground = false, canvasClassName = 'intro-video' }) {
  const [videoMissing, setVideoMissing] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return undefined

    const context = canvas.getContext('2d', { willReadFrequently: true })
    let frameId

    const drawTransparentFrame = () => {
      if (!visibleRef.current) {
        frameId = undefined
        return
      }

      if (video.readyState >= 2) {
        if (canvas.width !== video.videoWidth) canvas.width = video.videoWidth
        if (canvas.height !== video.videoHeight) canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const frame = context.getImageData(0, 0, canvas.width, canvas.height)

        for (let index = 0; index < frame.data.length; index += 4) {
          const red = frame.data[index]
          const green = frame.data[index + 1]
          const blue = frame.data[index + 2]
          const brightness = (red + green + blue) / 3
          const neutral = Math.max(red, green, blue) - Math.min(red, green, blue) < 24

          const greenScreen = green > red + 20 && green > blue + 20 && green > 70
          if (removeGreenBackground ? greenScreen : neutral && brightness > 145) {
            frame.data[index + 3] = 0
          }
        }

        context.putImageData(frame, 0, 0)
      }
      frameId = requestAnimationFrame(drawTransparentFrame)
    }

    const startVideo = () => {
      video.play().catch(() => undefined)
      if (visibleRef.current) drawTransparentFrame()
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      if (entry.isIntersecting && frameId === undefined) drawTransparentFrame()
    }, { rootMargin: '120px 0px', threshold: 0.01 })

    visibilityObserver.observe(canvas)
    video.addEventListener('loadeddata', startVideo)
    return () => {
      visibilityObserver.disconnect()
      video.removeEventListener('loadeddata', startVideo)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    videoMissing ? (
      <div className="video-fallback animate-[fallback-pulse_2.4s_ease-in-out_infinite]" aria-label="Ayush Sekhri animated placeholder">
        <span>AS</span>
      </div>
    ) : (
      <>
        <video
          ref={videoRef}
          className="source-video"
          autoPlay
          loop
          muted
          playsInline
          src={source}
          onError={() => setVideoMissing(true)}
          aria-label={label}
        />
        <canvas ref={canvasRef} className={canvasClassName} aria-label={`${label} with background removed`} />
      </>
    )
  )
}

function AnimatedName({ isVisible }) {
  const [name, setName] = useState('')
  const fullName = 'Ayush Sekhri'

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
  }, [isVisible])

  return <span className="name-tag transition-[opacity,transform] duration-500 ease-out">{name}</span>
}

function ProjectVideo({ src, label }) {
  const videoRef = useRef(null)
  const userPausedRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!userPausedRef.current) video.play().catch(() => undefined)
      } else {
        video.pause()
      }
    }, { rootMargin: '120px 0px', threshold: 0.15 })

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      userPausedRef.current = false
      video.play().catch(() => undefined)
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }

  return (
    <video
      ref={videoRef}
      preload="metadata"
      loop
      muted
      playsInline
      src={src}
      onClick={togglePlayback}
      aria-label={`${label}. Click to play or pause`}
    />
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [annotationVisible, setAnnotationVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const revealTimer = setTimeout(() => setAnnotationVisible(true), 1000)
    return () => clearTimeout(revealTimer)
  }, [])

  return (
    <main className="site-shell">
      <CustomCursor />
      <nav className={`topbar ${scrolled ? 'topbar-scrolled' : ''}`}>
        <a className="monogram" href="#top" aria-label="Back to top">AS<span>.</span></a>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <ArrowUpRight size={14} /></a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy animate-[rise-in_.9s_cubic-bezier(.2,.8,.2,1)_both]">
          <p className="eyebrow">Welcome to my</p>
          <div className="title-line">
            <h1>Portf</h1>
            <div className="video-wrap animate-[video-in_1.1s_.25s_cubic-bezier(.2,.8,.2,1)_both]">
              <IntroVideo />
            </div>
            <h1>lio</h1>
          </div>
          <div className="year">2026</div>
        </div>

        <div className={`annotation animate-[name-in_1s_.65s_cubic-bezier(.2,.8,.2,1)_both] ${annotationVisible ? 'annotation-scrolled' : ''}`} aria-label="Portfolio owner">
          <svg className="scroll-pointer transition-[opacity,transform] duration-700 ease-out" viewBox="0 0 120 90" aria-hidden="true">
            <path d="M10 80C8 49 25 29 69 18M69 18l-13-3M69 18l-6 12" />
          </svg>
          <AnimatedName isVisible={annotationVisible} />
        </div>

        <div className="hero-footer">
          <div className="ornament" aria-hidden="true"><span>♥</span><span>♦</span><span>♣</span><span>♠</span></div>
          <span className="location">Based in Mohali, Punjab</span>
        </div>
      </section>

      <section className="about-board" id="about">
        <div className="about-photo">
          <IntroVideo source={graphicVideo} label="Ayush Sekhri portrait video" removeGreenBackground />
        </div>

        <div className="about-main">
          <p className="about-kicker">About me</p>
          <h2>HELLO</h2>
          <p className="about-lead">Hi, I'm Ayush Sekhri.</p>
          <p>Creative AI Content Creator skilled in generative AI tools, visual content, social media creatives, promotional concepts, copywriting, and visual storytelling.</p>
          <p>I combine creativity with technical knowledge to transform ideas into high-quality content that aligns with brand identity and audience expectations.</p>

          <div className="education-block">
            <h3>EDUCATION</h3>
            <strong>MCA (AI & ML) | Shoolini University, Solan</strong>
            <span>Aug 2024 - Jun 2026</span>
            <strong>BCA | Himachal Pradesh University, Shimla</strong>
            <span>Aug 2021 - Jun 2024</span>
          </div>
        </div>

        <aside className="about-side">
          <div>
            <h3>SKILLS</h3>
            <div className="skills-list" aria-label="Skills">
              <p><b>AI & Generative AI:</b> ChatGPT, Gemini, Claude, Google Flow, Higgsfield Gengutsu, Gen-4, Sedance 2.5, Kling 4.0, Veo, Wan, Omni Flash</p>
              <p><b>Audio & Music:</b> ElevenLabs, Suno AI, AI voiceovers, Sound design</p>
              <p><b>Prompt Engineering:</b> Text-to-image, Image editing, Text-to-video, Creative prompt design</p>
              <p><b>Content Creation:</b> UGC video, social media, promotional content, marketing copy, visual storytelling</p>
              <p><b>Design Tools:</b> Figma, Canva, Picsart, Photoshop, Premier Pro , CapCut, Motion graphics</p>
            </div>
          </div>
          <div className="experience-block">
            <h3>EXPERIENCE</h3>
            <div><strong>Kushmanda Cosmetics Pvt. Ltd. | 6 October - Present</strong><b>AI Content Creator</b></div>
          </div>
          <div className="credentials"><h3>CERTIFICATION</h3><span>Full Stack Web Development - AI Integrated | Udemy</span><span>UI/UX Design Certification | Udemy</span></div>
          <div className="languages"><h3>LANGUAGES</h3><span>English (Fluent), Hindi (Native), Punjabi (Conversational)</span></div>
          <a className="about-contact" href="mailto:hello@ayushsekhri.com">Let's work together <ArrowUpRight size={16} /></a>
        </aside>
      </section>

      <section className="banner-video-section" aria-label="Ayush Sekhri banner video">
        <IntroVideo source={bannerVideo} label="Ayush Sekhri banner video" removeGreenBackground canvasClassName="full-banner-video" />
      </section>

      <section className="mindset-section" aria-labelledby="mindset-title">
        <p className="mindset-kicker">A little more about how I work</p>
        <h2 id="mindset-title">Creative Mindset</h2>
        <p className="mindset-copy"><span>I turn curious ideas into clear visual stories.</span><span>I experiment with design, AI, and motion until the idea feels alive.</span><span>Every detail has a purpose, and every project has a point of view.</span></p>
        <div className="polaroid-grid">
          <figure className="polaroid polaroid-left">
            <img src={image1} alt="Ayush's creative workspace" />
          </figure>
          <figure className="polaroid polaroid-center">
            <img src={image2} alt="Creative portrait of Ayush" />
          </figure>
          <figure className="polaroid polaroid-right">
            <img src={image3} alt="Ayush working on a creative project" />
          </figure>
        </div>
      </section>

      <section className="workfolio-strip" aria-label="Workfolio">
        <div className="workfolio-track">
          <span>WORKFOLIO</span><b>♥</b><span>WORKFOLIO</span><b>♠</b><span>WORKFOLIO</span><b>♦</b><span>WORKFOLIO</span><b>♣</b>
          <span>WORKFOLIO</span><b>♥</b><span>WORKFOLIO</span><b>♠</b><span>WORKFOLIO</span><b>♦</b><span>WORKFOLIO</span><b>♣</b>
        </div>
      </section>

      <section className="workfolio-image" aria-label="Ayush Sekhri banner image">
        <img src={bannerImage} alt="Ayush Sekhri banner artwork" />
      </section>

      <section className="workfolio-strip" aria-label="Workfolio repeat">
        <div className="workfolio-track">
          <span>WORKFOLIO</span><b>♥</b><span>WORKFOLIO</span><b>♠</b><span>WORKFOLIO</span><b>♦</b><span>WORKFOLIO</span><b>♣</b>
          <span>WORKFOLIO</span><b>♥</b><span>WORKFOLIO</span><b>♠</b><span>WORKFOLIO</span><b>♦</b><span>WORKFOLIO</span><b>♣</b>
        </div>
      </section>

      <section className="workfolio-work" aria-label="Workfolio projects">
        <div className="workfolio-grid">
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141134/souled_store.mp4" label="Souled Store project video" />
            <div><span>01</span><h3>Souled Store</h3></div>
          </article>
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141117/born_16_kajal.mp4" label="Born16 Kajal project video" />
            <div><span>02</span><h3>Born16 Kajal</h3></div>
          </article>
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141121/serum.mp4" label="Serum project video" />
            <div><span>03</span><h3>Serum Ad</h3></div>
          </article>
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141149/born16.mp4" label="Born16 Ad project video" />
            <div><span>04</span><h3>Born16 Ad</h3></div>
          </article>
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141126/jewellery.mp4" label="Jewellery Ad project video" />
            <div><span>05</span><h3>Jewellery Ad</h3></div>
          </article>
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141140/jewellery2.mp4" label="Jewellery UGC project video" />
            <div><span>06</span><h3 className="single-line-title">Jewellery UGC</h3></div>
          </article>
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141151/dotkeypromo.mp4" label="Dot and Key UGC project video" />
            <div><span>07</span><h3 className="single-line-title">Dot & Key UGC</h3></div>
          </article>
          <article className="workfolio-card">
            <ProjectVideo src="https://res.cloudinary.com/dw8y3wzsg/video/upload/v1794141137/dot_and_key.mp4" label="Dot and Key Ad project video" />
            <div><span>08</span><h3>Dot & Key Ad</h3></div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
