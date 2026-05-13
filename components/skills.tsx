"use client"

import { useInView } from "@/hooks/use-in-view"
import { useRef, useState, useEffect } from "react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([])

  const allSkills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT Authentication",
    "Clerk Authentication",
    "REST APIs",
    "Git",
    "GitHub",
    "Postman",
    "VS Code",
    "Cloudinary",
    "Vercel",
    "CRUD Operations",
    "Responsive Web Design",
    "UI/UX Design",
    "API Integration",
    "Figma",
    "Adobe Photoshop",
    "Problem-Solving",
    "Team Collaboration",
    "Communication",
    "Adaptability",
  ]

  useEffect(() => {
    if (isInView) {
      allSkills.forEach((skill, idx) => {
        const timer = setTimeout(() => {
          setAnimatedSkills((prev) => [...prev, skill])
        }, idx * 50)
        return () => clearTimeout(timer)
      })
    }
  }, [isInView])

  return (
    <section id="skills" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
          <span className="text-foreground/60">My</span> Skills
        </h2>
        <p className="text-foreground/60 text-lg mb-16">Technologies and tools I work with</p>

        <div className="flex flex-wrap gap-3">
          {allSkills.map((skill) => (
            <div
              key={skill}
              className={`px-4 py-2 rounded-lg border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent text-sm font-medium text-foreground transition-all duration-300 ${
                animatedSkills.includes(skill) ? "opacity-100 scale-100" : "opacity-0 scale-75"
              } hover:border-accent hover:bg-gradient-to-br hover:from-accent/20 hover:to-transparent hover:scale-105 cursor-default`}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
