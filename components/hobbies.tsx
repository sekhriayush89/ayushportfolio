'use client'

import { useRef } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { Music, Gamepad2, Mountain, Compass } from 'lucide-react'

export default function Hobbies() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const hobbies = [
    {
      icon: Music,
      title: 'Classical Music',
      description: 'Passionate about classical music, appreciating the intricacy and beauty of instrumental compositions and performances.',
      color: 'from-accent to-primary',
    },
    {
      icon: Gamepad2,
      title: 'Gaming',
      description: 'Enjoy exploring various gaming genres, from strategic games to adventure titles, as a way to unwind and stay entertained.',
      color: 'from-primary to-accent',
    },
    {
      icon: Mountain,
      title: 'Trekking',
      description: 'Love the outdoors and hiking trails through mountains and nature, experiencing the serenity and adventure of the wilderness.',
      color: 'from-accent via-primary to-accent',
    },
    {
      icon: Compass,
      title: 'Exploring',
      description: 'Enthusiast of travel and exploration, discovering new places, cultures, and experiences to broaden my horizons.',
      color: 'from-primary to-accent',
    },
  ]

  return (
    <section id="hobbies" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            <span className="text-foreground/60">My</span> Hobbies
          </h2>
          <p className="text-lg text-foreground/60 mb-16 max-w-2xl">
            Beyond coding, I'm passionate about exploring diverse interests that keep me inspired and grounded.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, idx) => {
              const Icon = hobby.icon
              return (
                <div
                  key={idx}
                  className={`group relative p-6 rounded-2xl border border-border/40 hover:border-accent/40 transition-all duration-500 transform hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${idx * 100}ms` : '0ms',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${hobby.color} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-md bg-background flex items-center justify-center">
                        <Icon size={24} className="text-accent group-hover:text-primary transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {hobby.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">
                      {hobby.description}
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
