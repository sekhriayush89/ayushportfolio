'use client'

import { useEffect, useRef, useState } from 'react'
import Hero from '@/components/hero'
import Navigation from '@/components/navigation'
import About from '@/components/about'
import Skills from '@/components/skills'
import Services from '@/components/services'
import Projects from '@/components/projects'
import Testimonials from '@/components/testimonials'
import Hobbies from '@/components/hobbies'
import Roadmap from '@/components/roadmap'
import Education from '@/components/education'
import Contact from '@/components/contact'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative bg-background text-foreground overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Testimonials />
      <Hobbies />
      <Roadmap />
      <Education />
      <Contact />
    </div>
  )
}
