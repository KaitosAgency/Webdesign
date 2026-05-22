import { motion } from "framer-motion"

import { Reveal } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { site } from "@/data/site"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function ProjectsSection() {
  const reduced = useReducedMotion()

  return (
    <section id="projets" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
      <Reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Sélection
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Projets récents
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Trois directions visuelles — packaging, audio et soin — en noir et blanc
          pour laisser parler la forme.
        </p>
      </Reveal>

      <ul className="grid gap-6 md:grid-cols-3">
        {site.projects.map((project, index) => (
          <li key={project.title}>
            <Reveal delay={index * 0.08}>
              <motion.article
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] border border-border/60",
                  "bg-card"
                )}
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.alt}
                    className="size-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                    whileHover={reduced ? undefined : { scale: 1.04 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-90"
                    aria-hidden
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-lg font-medium text-foreground">{project.title}</p>
                </div>
              </motion.article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
