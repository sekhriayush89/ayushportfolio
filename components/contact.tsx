'use client'

import { useRef } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Header Section */}
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Let's Work <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Together</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              I'm always excited about new opportunities, collaborations, and projects. Whether you have a specific idea or just want to explore possibilities, I'd love to hear from you.
            </p>
          </div>

          {/* Social Links Section - ENHANCED */}
          <div className="mb-20">
            <h3 className="text-lg font-semibold text-foreground/70 text-center mb-8">Connect With Me</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="mailto:sekhriayush89@gmail.com"
                className="group relative px-7 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                <div className="flex items-center gap-2">
                  <Mail size={20} />
                  <span>Email</span>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/ayush-sekhri"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-7 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                <div className="flex items-center gap-2">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </div>
              </a>
              <a
                href="https://github.com/sekhriayush89"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-7 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                <div className="flex items-center gap-2">
                  <Github size={20} />
                  <span>GitHub</span>
                </div>
              </a>
            </div>
          </div>

          {/* Get In Touch Footer Section */}
          <div className="border-t border-border/40 pt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 text-foreground">Get In Touch</h3>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Have a project in mind or want to discuss collaboration opportunities? I'm just a message away!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Email */}
              <div className="p-6 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail size={24} className="text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Email</h4>
                <a href="mailto:sekhriayush89@gmail.com" className="text-primary hover:text-primary/80 transition-colors text-sm break-all">
                  sekhriayush89@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="p-6 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone size={24} className="text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                <a href="tel:+918091245816" className="text-primary hover:text-primary/80 transition-colors text-sm">
                  +91 8091245816
                </a>
              </div>

              {/* Location */}
              <div className="p-6 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin size={24} className="text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Location</h4>
                <p className="text-primary text-sm">Mohali, Punjab, India</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-border/40 pt-8 text-center">
              <p className="text-foreground/40 text-xs">
                © 2025 Ayush Sekhri. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
