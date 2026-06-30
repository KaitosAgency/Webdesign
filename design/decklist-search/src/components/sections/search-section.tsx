import { useState } from "react"
import { ExternalLink, Loader2, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { site, type SearchResponse } from "@/data/site"
import { cn } from "@/lib/utils"

function formatDate(value: string) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

function formatDeckLabel(deck: SearchResponse["results"][number]["deck"]) {
  const parts = [deck.title, deck.subtitle].filter(Boolean)
  return parts.join(" — ")
}

export function SearchSection() {
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<SearchResponse | null>(null)

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = query.trim()
    if (!trimmed) return

    setSubmittedQuery(trimmed)
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`)

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string }
        throw new Error(payload.error ?? "La recherche a échoué.")
      }

      const payload = (await response.json()) as SearchResponse
      setData(payload)
    } catch (searchError) {
      setData(null)
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Une erreur est survenue.",
      )
    } finally {
      setLoading(false)
    }
  }

  const hasSubmitted = submittedQuery.length > 0

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {site.title}
        </h1>
        <p className="max-w-2xl text-muted-foreground">{site.description}</p>
        <p className="text-sm text-muted-foreground">{site.sourceDescription}</p>
      </div>

      <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={site.searchPlaceholder}
            className="pl-10"
            aria-label="Nom de la carte à rechercher"
          />
        </div>
        <Button type="submit" size="lg" disabled={loading || !query.trim()}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Recherche…
            </>
          ) : (
            site.searchButton
          )}
        </Button>
      </form>

      <div className="mt-10 space-y-6">
        {!hasSubmitted && (
          <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-muted-foreground">
            {site.emptyQuery}
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {data && !loading && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>
                <strong className="text-foreground">{data.matchCount}</strong> deck
                {data.matchCount > 1 ? "s" : ""} trouvé
                {data.matchCount > 1 ? "s" : ""}
              </span>
              <span aria-hidden>·</span>
              <span>
                {data.totalCollections} publications indexées ({data.totalDecks} decks)
              </span>
            </div>

            {data.matchCount === 0 ? (
              <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-muted-foreground">
                {site.noResults}
              </p>
            ) : (
              <ul className="space-y-4">
                {data.results.map((result, index) => (
                  <li
                    key={`${result.collection.slug}-${index}-${result.deck.title}`}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <a
                          href={result.collection.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-lg font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {result.collection.title}
                          <ExternalLink className="size-4" aria-hidden />
                        </a>
                        <p className="text-sm text-muted-foreground">
                          Publié le {formatDate(result.collection.publishedDate)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {result.deck.format && (
                          <Badge variant="secondary">{result.deck.format}</Badge>
                        )}
                        {result.deck.eventName && (
                          <Badge variant="outline">{result.deck.eventName}</Badge>
                        )}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <p className="font-medium">{formatDeckLabel(result.deck)}</p>
                      {result.deck.eventDate && (
                        <p className="text-sm text-muted-foreground">
                          {result.deck.eventDate}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 pt-1">
                        {result.matches.map((match) => (
                          <Badge
                            key={`${match.zone}-${match.cardName}`}
                            className={cn(
                              match.zone === "main" && "bg-primary/15 text-primary",
                              match.zone === "side" && "bg-secondary text-secondary-foreground",
                              match.zone === "companion" && "bg-accent text-accent-foreground",
                            )}
                          >
                            {match.quantity}× {match.cardName} ({site.zones[match.zone]})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
