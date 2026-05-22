import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { site } from "@/data/site"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const reduced = useReducedMotion()

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/60",
        "bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50"
      )}
      initial={reduced ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <a
          href="#accueil"
          className="text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          {site.brand}
        </a>

        <nav
          className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"
          aria-label="Navigation principale"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          render={<a href="#contact" />}
          size="lg"
          className="rounded-full pr-1.5 pl-5"
        >
          {site.cta}
          <span className="ml-2 inline-flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </Button>
      </div>
    </motion.header>
  )
}
