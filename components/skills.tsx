"use client"

import { useInView } from "@/hooks/use-in-view"
import { useRef, useState, useEffect } from "react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([])

  const skillGroups = [
    { title: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "React Native (Expo)", "NativeWind CSS"] },
    { title: "Backend & Data", skills: ["Node.js", "Express.js", "MongoDB", "MySQL", "Redis", "BullMQ"] },
    { title: "Authentication & APIs", skills: ["JWT Authentication", "Clerk Authentication", "REST APIs", "Swagger", "Zod"] },
    { title: "Tools & Platforms", skills: ["Git", "GitHub", "Postman", "Cloudinary", "Vercel", "MinIO", "Docker", "GitHub Actions"] },
    { title: "AI & Generative AI", skills: ["ChatGPT", "Gemini", "Claude", "Google Flow", "Kling", "Sedance 2.0", "Cursor", "v0", "Codex", "GitHub Copilot"] },
    { title: "Creative AI & Prompt Engineering", skills: ["Text-to-Image Prompts", "Image Editing Prompts", "Video Generation Prompts", "AI Image Generation", "AI Image Editing", "AI Video Concepts", "Visual Storytelling", "Product Visualization"] },
    { title: "Design & Content", skills: ["Figma", "Canva", "Adobe Photoshop", "Social Media Content", "Marketing Copy", "Brand Content", "Responsive UI"] },
    { title: "Core & Soft Skills", skills: ["CRUD Operations", "API Integration", "Asynchronous Programming", "Database Management", "Problem-Solving", "Team Collaboration", "Communication", "Adaptability"] },
  ]

  const allSkills = skillGroups.flatMap((group) => group.skills)

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-border/50 bg-card/30 p-6">
              <h3 className="text-lg font-bold text-accent mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className={`px-4 py-2 rounded-lg border border-accent/30 bg-linear-to-br from-accent/10 to-transparent text-sm font-medium text-foreground transition-all duration-300 ${
                      animatedSkills.includes(skill) ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    } hover:border-accent hover:bg-linear-to-br hover:from-accent/20 hover:to-transparent hover:scale-105 cursor-default`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
