import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

export function AboutSection() {
  return (
    <section
      id="apropos"
      className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-wide text-primary">
              {site.about.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {site.about.title}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="left">
          <div className="flex flex-col items-start gap-8 lg:pt-6">
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
              {site.about.body}
            </p>
            <Button
              id="contact"
              render={<a href="mailto:contact@foliodemo.dev" />}
              size="lg"
              className="rounded-full pr-1.5 pl-5"
            >
              {site.cta}
              <span className="ml-2 inline-flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-16 lg:mt-24">
        <div
          className={cn(
            "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
          )}
          aria-hidden
        />
      </Reveal>
    </section>
  )
}
