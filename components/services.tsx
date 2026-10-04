'use client'

import { useRef } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { Code2, Database, Zap, Shield, Smartphone, BarChart3 } from 'lucide-react'

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const services = [
    {
      icon: Code2,
      title: 'Full Stack Development',
      description: 'End-to-end web application development using MERN stack with clean, scalable architecture and best practices.',
      color: 'from-accent to-primary',
    },
    {
      icon: Database,
      title: 'Database Design & Optimization',
      description: 'Robust MongoDB database design, schema optimization, and data management solutions for high-performance applications.',
      color: 'from-primary to-accent',
    },
    {
      icon: Zap,
      title: 'API Development & Integration',
      description: 'RESTful API design, implementation, and integration with third-party services using Express.js and Node.js.',
      color: 'from-accent via-primary to-accent',
    },
    {
      icon: Smartphone,
      title: 'Responsive UI/UX Design',
      description: 'Beautiful, responsive web interfaces using React.js and Tailwind CSS with smooth animations and optimal performance.',
      color: 'from-primary to-accent',
    },
    {
      icon: Shield,
      title: 'Authentication & Security',
      description: 'Secure user authentication using JWT, Clerk, and best security practices to protect your application and data.',
      color: 'from-accent to-primary',
    },
    {
      icon: BarChart3,
      title: 'Performance & Scalability',
      description: 'Optimized applications for speed and scalability, ensuring excellent performance across all devices and load conditions.',
      color: 'from-primary to-accent',
    },
  ]

  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            <span className="text-foreground/60">Services I</span> Offer
          </h2>
          <p className="text-lg text-foreground/60 mb-16 max-w-2xl">
            Comprehensive web development services tailored to bring your ideas to life with modern technology and best practices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div
                  key={idx}
                  className={`group relative p-8 rounded-2xl border border-border/40 hover:border-accent/40 transition-all duration-500 transform hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${idx * 100}ms` : '0ms',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-md bg-background flex items-center justify-center">
                        <Icon size={28} className="text-accent group-hover:text-primary transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
