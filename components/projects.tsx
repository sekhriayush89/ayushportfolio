"use client"

import { useInView } from "@/hooks/use-in-view"
import { useRef } from "react"
import { ExternalLink } from "lucide-react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const projects = [
    {
      title: "Dreamo – AI Interviewer",
      description:
        "AI-powered interview practice platform with intelligent candidate evaluation and instant feedback to help users ace their interviews.",
      tech: ["Node.js", "React.js", "MongoDB", "Clerk", "ML"],
      status: "In Production",
    },
    {
      title: "Keprates.in",
      description:
        "Full-stack e-commerce platform featuring secure authentication, payment integration, and optimized image handling for seamless user interactions.",
      tech: ["React.js", "Node.js", "Tailwind CSS", "Clerk", "Vercel", "JWT"],
      status: "Live",
      link: "https://www.keprates.in/",
    },
    {
      title: "RSesports.in",
      description:
        "Gaming organization website with modern UI, responsive design, and smooth animations for an immersive gaming experience.",
      tech: ["React.js", "Figma", "Adobe Photoshop", "Tailwind CSS", "Clerk", "Vercel"],
      status: "Live",
      link: "https://www.rsesports.in/",
    },
    {
      title: "Compliance Analysis",
      description:
        "Platform enabling companies to verify product descriptions against government regulations with high accuracy and secure data handling.",
      tech: ["React.js", "Node.js", "MongoDB", "CSS", "Postman", "Cloudinary", "JWT"],
      status: "Completed",
    },
  ]

  const uiDesigns = [
    {
      title: "Pharma Care Website",
      description: "Healthcare platform UI design with intuitive navigation and modern medical aesthetics.",
      link: "https://www.figma.com/design/htIfFJxqPnZPAz9lUeuVzv/medico?node-id=0-1&t=V0Vb8DdQhjmsNyNZ-1",
    },
    {
      title: "Croc Cream",
      description: "Modern ice cream shop UI design with vibrant colors and smooth interactions.",
      link: "https://www.figma.com/design/uHx6GC76zWjhyR3dfOkp95/Untitled?node-id=9-92&t=OB5LMW8VbhxZ5nXR-1",
    },
    {
      title: "Pringles Website",
      description: "Interactive Pringles brand website design with dynamic prototypes and animations.",
      link: "https://www.figma.com/proto/wwXaR3FWpbs2zM9dT5NE9D/pringles?page-id=0%3A1&team_id=1420795491558082912&node-id=1-8&t=FnK8dF5BrZ2jI2oD-1",
    },
    {
      title: "Valorant Website",
      description: "Esports-focused gaming website design with immersive user interface elements.",
      link: "https://www.figma.com/design/Wgn1begVcaMp7Ih22GPioi/valorant?node-id=0-1&t=m534Ajw5lJvRxmXk-1",
    },
  ]

  return (
    <section id="projects" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
            <span className="text-foreground/60">Featured</span>{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-foreground/60 text-lg">Innovative solutions built with modern technologies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, idx) => {
            const ProjectWrapper = project.link ? 'a' : 'div';
            const wrapperProps = project.link ? {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer",
            } : {};
            
            return (
              <ProjectWrapper
                key={idx}
                {...wrapperProps}
                className={`group relative overflow-hidden rounded-xl border border-foreground/10 transition-all duration-500 transform hover:shadow-2xl hover:shadow-accent/20 cursor-pointer ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: isInView ? `${idx * 100}ms` : "0ms",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-background to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>

                <div className="relative p-6 md:p-8 h-full flex flex-col justify-between min-h-72">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/20 text-accent backdrop-blur-sm border border-accent/40 group-hover:bg-accent/30 transition-all">
                      {project.status}
                    </span>
                    <span className="text-xs text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </div>

                  <div className="flex-1 mb-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed group-hover:text-foreground/80 transition-colors line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-foreground/10">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-foreground/5 text-xs font-semibold text-foreground/70 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-200 border border-foreground/10 group-hover:border-accent/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ProjectWrapper>
            )
          })}
        </div>

        <div className="mt-24">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
              <span className="text-foreground/60">UI/UX</span>{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Designs</span>
            </h2>
            <p className="text-foreground/60 text-lg">Beautiful and user-centric design solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {uiDesigns.map((design, idx) => {
              return (
                <a
                  key={idx}
                  href={design.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-xl border border-foreground/10 transition-all duration-500 transform hover:shadow-2xl hover:shadow-primary/20 ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: isInView ? `${(idx + 4) * 100}ms` : "0ms",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </div>

                  <div className="relative p-6 md:p-8 h-full flex flex-col justify-between min-h-64">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/20 text-primary backdrop-blur-sm border border-primary/40 group-hover:bg-primary/30 transition-all">
                        Figma Design
                      </span>
                      <ExternalLink className="w-4 h-4 text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-primary" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {design.title}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed group-hover:text-foreground/80 transition-colors">
                        {design.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-auto">
                      <span className="inline-block text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                        View on Figma →
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
