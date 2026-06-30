import { ExternalLink } from "lucide-react"

import { site } from "@/data/site"

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <div>
          <p className="text-lg font-semibold tracking-tight">{site.brand}</p>
          <p className="text-sm text-muted-foreground">{site.title}</p>
        </div>

        <a
          href={site.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          magic.gg
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
    </header>
  )
}
