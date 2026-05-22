import { site } from "@/data/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>
          © {site.footer.year} {site.brand}
        </p>
        <p>{site.footer.note}</p>
      </div>
    </footer>
  )
}
