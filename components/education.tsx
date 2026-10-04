'use client'

import { useInView } from '@/hooks/use-in-view'
import { useRef } from 'react'
import { Award, BookOpen } from 'lucide-react'

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const educationData = [
    {
      degree: 'MCA (AI & ML)',
      institution: 'Shoolini University, Solan',
      period: 'Aug 2024 – Jun 2026',
      description: 'Master of Computer Applications specializing in Artificial Intelligence and Machine Learning',
      icon: BookOpen,
      color: 'accent',
    },
    {
      degree: 'BCA',
      institution: 'Himachal Pradesh University, Shimla',
      period: 'Aug 2021 – Jun 2024',
      description: 'Bachelor of Computer Applications with strong foundation in software development and algorithms',
      icon: BookOpen,
      color: 'primary',
    },
  ]

  const certifications = [
    {
      title: 'Full Stack Web Dev Bootcamp – AI Integrated',
      issuer: 'Professional Development Course',
    },
    {
      title: 'JavaScript Development Bootcamp',
      issuer: 'Professional Development Course',
    },
    {
      title: 'UI/UX Design Certification Course',
      issuer: 'Professional Development Course',
    },
  ]

  return (
    <section id="education" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
            <span className="text-foreground/60">Education &</span>{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-foreground/60 text-lg">Continuous learning and professional development</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <BookOpen size={28} className="text-accent" />
              <h3 className="text-3xl font-bold text-foreground">Education</h3>
            </div>

            <div className="space-y-6">
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-xl border border-border/40 p-6 md:p-8 transition-all duration-500 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${idx * 150}ms` : '0ms',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Degree */}
                  <h4 className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-accent to-primary bg-clip-text mb-2 group-hover:text-accent transition-colors">
                    {edu.degree}
                  </h4>

                  {/* Institution */}
                  <p className="text-foreground font-semibold mb-1">{edu.institution}</p>

                  {/* Period */}
                  <p className="text-sm text-foreground/50 mb-4">{edu.period}</p>

                  {/* Description */}
                  <p className="text-foreground/70 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Award size={28} className="text-primary" />
              <h3 className="text-3xl font-bold text-foreground">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-xl border border-border/40 p-6 transition-all duration-500 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${(idx + 2) * 150}ms` : '0ms',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Checkmark Icon */}
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary group-hover:bg-primary/30 transition-all">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-foreground/60 mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
