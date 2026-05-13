'use client'

import { useInView } from '@/hooks/use-in-view'
import { useRef } from 'react'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const testimonials = [
    {
      name: 'Manav',
      company: 'RS Esports',
      role: 'Co-Founder',
      content:
        'Ayush delivered an outstanding website for RS Esports with incredible attention to detail. His dedication to creating a visually appealing and functional platform exceeded our expectations.',
      rating: 5,
    },
    {
      name: 'Shona',
      company: 'RS Esports',
      role: 'Lead',
      content:
        'Working with Ayush was a seamless experience. He understood our vision for the RS Esports brand and brought it to life with a responsive, modern, and engaging website.',
      rating: 5,
    },
    {
      name: 'Ghatak',
      company: 'RS Esports',
      role: 'Team Manager',
      content:
        'Excellent communication and technical expertise. Ayush made sure our gaming website stood out with smooth animations and intuitive user interface. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Avee',
      company: 'Keprates',
      role: 'Founder',
      content:
        'Ayush built a fantastic e-commerce platform for Keprates with seamless checkout experience and robust backend. His full-stack expertise was invaluable to our success.',
      rating: 5,
    },
    {
      name: 'Nikhil',
      company: 'Keprates',
      role: 'Product Manager',
      content:
        'The platform Ayush developed is scalable, secure, and user-friendly. His API design and database management showed exceptional technical skills and problem-solving ability.',
      rating: 5,
    },
    {
      name: 'Animesh',
      company: 'UI/UX Design Client',
      role: 'Designer',
      content:
        'Ayush has exceptional UI/UX design skills and creates beautifully responsive interfaces. His attention to detail and understanding of user experience is impressive. Highly professional and reliable.',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
            <span className="text-foreground/60">Client</span>{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-foreground/60 text-lg">What clients say about working with me</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-background transition-all duration-500 transform hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/20 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isInView ? `${idx * 100}ms` : '0ms',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-6 md:p-8 h-full flex flex-col justify-between">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-accent text-accent group-hover:scale-110 transition-transform"
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 mb-6">
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed group-hover:text-foreground/80 transition-colors italic">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Author */}
                <div className="pt-6 border-t border-foreground/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-foreground/60">
                        {testimonial.role} @ {testimonial.company}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border border-accent/40 flex items-center justify-center text-xs font-bold text-accent">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
