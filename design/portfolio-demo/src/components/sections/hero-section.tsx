import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { Reveal } from "@/components/motion/reveal"
import { site } from "@/data/site"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.15])

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,oklch(0.55_0.22_35_/_0.45),transparent_55%)]"
        )}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-6 lg:px-10">
        <div className="relative z-10 flex flex-col gap-8 lg:pb-10">
          <Reveal>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              {site.hero.title}
              <br />
              <span className="text-balance">{site.hero.role}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12} className="lg:hidden">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {site.hero.description}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="grid gap-6 border-t border-border/80 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {site.hero.services.map((service, index) => (
                <li key={service.id} className="group space-y-2">
                  <p className="text-xs font-medium tracking-widest text-primary">
                    #{service.id}
                  </p>
                  <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {service.label}
                  </p>
                  <motion.span
                    className="block h-px w-0 bg-primary"
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      delay: reduced ? 0 : 0.3 + index * 0.08,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative flex flex-col gap-8 lg:items-end">
          <Reveal
            delay={0.1}
            direction="left"
            className="hidden max-w-sm lg:block lg:text-right"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              {site.hero.description}
            </p>
          </Reveal>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:mx-0 lg:max-w-lg">
            <motion.div
              style={{ scale: glowScale }}
              className={cn(
                "absolute inset-0 rounded-[2.5rem]",
                "bg-[radial-gradient(circle_at_50%_40%,oklch(0.62_0.24_40),oklch(0.42_0.18_25)_45%,transparent_72%)]",
                "blur-2xl"
              )}
              aria-hidden
            />
            <motion.div
              style={{ y: portraitY }}
              className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card shadow-2xl shadow-primary/10"
            >
              <img
                src={site.hero.portrait}
                alt="Portrait créatif en studio"
                className="size-full object-cover object-top grayscale contrast-125"
                loading="eager"
                fetchPriority="high"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
                aria-hidden
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
