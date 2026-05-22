import { Reveal } from "@/components/motion/reveal"
import { Separator } from "@/components/ui/separator"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

export function TrustedSection() {
  return (
    <section className="px-4 pb-8 sm:px-6 lg:px-10" aria-label="Marques partenaires">
      <Reveal>
        <div
          className={cn(
            "mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-border/60",
            "bg-card px-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-12"
          )}
        >
          <p className="max-w-xs text-lg font-medium leading-snug text-foreground">
            {site.trusted.title}
          </p>

          <Separator className="lg:hidden" />

          <ul className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 lg:gap-12">
            {site.trusted.logos.map((logo) => (
              <li
                key={logo}
                className="text-center text-sm font-semibold tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground lg:text-base"
              >
                {logo}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
