'use client'

import { useInView } from '@/hooks/use-in-view'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const experiences = [
    {
      role: 'MERN Stack Intern',
      company: 'Sensation Software Limited',
      period: 'Jan 2026 – June 2026',
      description: 'Mohali, Punjab',
      highlights: [
        'Engineered responsive web application using React.js, Node.js, and MongoDB, improving page load speeds by 20%',
        'Designed and tested 9+ APIs using Postman, reducing data retrieval time and ensuring smooth database communication'
      ]
    },
    {
      role: 'MERN Stack Developer Intern',
      company: 'IndraQ Innovations Pvt. Ltd.',
      period: 'July 2026 – September 2026',
      description: 'Mohali, Punjab',
      highlights: [
        'Built scalable applications and RESTful APIs with React.js, Node.js, Express.js, MongoDB, and MySQL',
        'Implemented JWT, Clerk, Zod, Redis, and BullMQ for secure, reliable application workflows',
        'Contributed to Docker, GitHub Actions, and cloud deployment workflows'
      ]
    },
  ]

  return (
    <section id="about" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
          <span className="text-foreground/60">About</span>{' '}
          <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">Me</span>
        </h2>
        <p className="text-foreground/60 text-lg mb-16">MERN &amp; Full Stack Developer + AI Content Creator with a passion for innovation</p>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                I'm a MERN and Full Stack Developer and AI Content Creator with experience building scalable web applications and integrating AI-powered features. Proficient in MongoDB, Express.js, React.js, and Node.js, with expertise in REST API development, responsive UI design, secure authentication systems, and generative AI content production.
              </p>
            </div>
            <div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Passionate about creating user-focused applications and solving real-world problems through clean, efficient, and performance-optimized code. Currently pursuing MCA in AI & ML, combining academic knowledge with practical experience in building innovative web solutions. Worked with UI/UX clients like <span className="text-accent font-semibold">Animesh</span> to deliver beautifully designed, fully responsive interfaces.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-border/40">
              <h3 className="text-xl font-bold mb-6 text-accent">Internship</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="group relative overflow-hidden p-6 rounded-2xl border border-accent/40 bg-card/30 hover:border-accent hover:bg-accent/5 transition-all duration-300">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-accent to-primary" />
                    <div className="mb-3">
                      <div>
                        <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">{exp.role}</h4>
                        <p className="text-sm text-foreground/60">{exp.company} | {exp.description}</p>
                      </div>
                      <span className="block text-xs text-accent font-semibold mt-2">{exp.period}</span>
                    </div>
                    <ul className="text-sm text-foreground/70 mt-3 space-y-2">
                      {exp.highlights && exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-border/40" />
            </div>
          </div>

          {/* Quick facts card */}
          <div className="bg-linear-to-br from-primary/10 to-accent/10 border border-accent/30 rounded-2xl p-6 h-fit hover:border-accent/60 transition-all duration-300">
            <h3 className="font-bold text-lg mb-6 text-accent">Quick Facts</h3>
            <ul className="space-y-4 text-sm text-foreground/70">
              <li className="flex gap-3 items-start group">
                <span className="text-accent mt-1 group-hover:scale-125 transition-transform">▸</span>
                <span className="group-hover:text-foreground transition-colors">MCA (AI & ML) at Shoolini University</span>
              </li>
              <li className="flex gap-3 items-start group">
                <span className="text-accent mt-1 group-hover:scale-125 transition-transform">▸</span>
                <span className="group-hover:text-foreground transition-colors">Based in Mohali, Punjab</span>
              </li>
              <li className="flex gap-3 items-start group">
                <span className="text-accent mt-1 group-hover:scale-125 transition-transform">▸</span>
                <span className="group-hover:text-foreground transition-colors">MERN &amp; Full Stack Developer + AI Content Creator</span>
              </li>
              <li className="flex gap-3 items-start group">
                <span className="text-accent mt-1 group-hover:scale-125 transition-transform">▸</span>
                <span className="group-hover:text-foreground transition-colors">Open to collaborations & opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
