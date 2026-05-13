"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Ayush Sekhri"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left content */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm">
            <p className="text-accent font-semibold text-xs tracking-widest uppercase">Welcome to my portfolio</p>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-balance">
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-pulse">
                {displayedText}
              </span>
              {displayedText.length < fullText.length && <span className="animate-pulse">|</span>}
            </span>
          </h1>

          <p className="text-xl text-foreground/70 mb-8 leading-relaxed max-w-lg">
            <span className="text-accent font-semibold">MERN Stack Developer</span> building scalable{" "}
            <span className="text-accent font-semibold">full-stack web applications</span> with{" "}
            <span className="text-accent font-semibold">React.js</span>,{" "}
            <span className="text-accent font-semibold">Node.js</span>, and{" "}
            <span className="text-accent font-semibold">MongoDB</span>. Passionate about creating{" "}
            <span className="text-accent font-semibold">user-focused solutions</span> and solving real-world problems.
          </p>

          <div className="flex gap-4 flex-wrap mb-12">
            <a
              href="#projects"
              className="group relative px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
            >
              <div className="absolute inset-0 bg-accent translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              View My Work
            </a>
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="px-8 py-3.5 rounded-lg border-2 border-accent/40 text-foreground font-semibold hover:border-accent hover:bg-accent/5 transition-all duration-300 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-12 border-t border-border/40 flex-wrap">
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary group-hover:from-primary group-hover:to-accent transition-all duration-300">
                4+
              </div>
              <p className="text-sm text-foreground/50 mt-1">Projects Built</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent group-hover:from-accent group-hover:to-primary transition-all duration-300">
                9+
              </div>
              <p className="text-sm text-foreground/50 mt-1">APIs Designed</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary group-hover:from-primary group-hover:to-accent transition-all duration-300">
                24+
              </div>
              <p className="text-sm text-foreground/50 mt-1">Technical Skills</p>
            </div>
          </div>
        </div>

        {/* Right visual element */}
        <div
          className={`relative h-96 md:h-full min-h-96 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
        >
          <div className="absolute -inset-12 bg-gradient-to-br from-accent/40 via-primary/30 to-transparent rounded-3xl blur-3xl animate-pulse" />
          <div className="absolute -inset-8 bg-gradient-to-t from-primary/25 via-accent/20 to-transparent rounded-3xl blur-2xl opacity-80" />
          <div className="absolute -inset-6 bg-gradient-to-r from-accent/20 via-transparent to-primary/20 rounded-3xl blur-xl animate-pulse opacity-60" />

          <div className="relative w-full h-full rounded-3xl border-2 border-accent/40 backdrop-blur-sm overflow-hidden group hover:border-accent/80 transition-all duration-300 shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:shadow-accent/30">
            <div className="absolute inset-0 bg-gradient-radial from-primary/40 via-accent/20 to-transparent rounded-3xl z-10 pointer-events-none" />

            {/* Animated overlay effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-pulse" />
            </div>

            <img
              src="/ayush-profile.jpg"
              alt="Ayush Sekhri"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
