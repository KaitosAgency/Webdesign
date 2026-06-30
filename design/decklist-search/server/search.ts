import { fetchAllCollections } from "./contentful"
import { cardMatchesQuery } from "./parse-decklist"
import type { DecklistCollection, SearchMatch, SearchResponse } from "./types"

const CACHE_TTL_MS = 60 * 60 * 1000

let cache: {
  collections: DecklistCollection[]
  cachedAt: number
} | null = null

async function getCollections(): Promise<{
  collections: DecklistCollection[]
  cachedAt: string
}> {
  const now = Date.now()

  if (cache && now - cache.cachedAt < CACHE_TTL_MS) {
    return {
      collections: cache.collections,
      cachedAt: new Date(cache.cachedAt).toISOString(),
    }
  }

  const collections = await fetchAllCollections()
  cache = { collections, cachedAt: now }

  return {
    collections,
    cachedAt: new Date(now).toISOString(),
  }
}

export async function searchDecks(query: string): Promise<SearchResponse> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return {
      query: trimmedQuery,
      totalCollections: 0,
      totalDecks: 0,
      matchCount: 0,
      cachedAt: new Date().toISOString(),
      results: [],
    }
  }

  const { collections, cachedAt } = await getCollections()
  const results: SearchMatch[] = []
  let totalDecks = 0

  for (const collection of collections) {
    totalDecks += collection.decks.length

    for (const deck of collection.decks) {
      const matches: SearchMatch["matches"] = []

      for (const card of deck.mainDeck) {
        if (cardMatchesQuery(card.name, trimmedQuery)) {
          matches.push({
            zone: "main",
            quantity: card.quantity,
            cardName: card.name,
          })
        }
      }

      for (const card of deck.sideboard) {
        if (cardMatchesQuery(card.name, trimmedQuery)) {
          matches.push({
            zone: "side",
            quantity: card.quantity,
            cardName: card.name,
          })
        }
      }

      for (const card of deck.companion) {
        if (cardMatchesQuery(card.name, trimmedQuery)) {
          matches.push({
            zone: "companion",
            quantity: card.quantity,
            cardName: card.name,
          })
        }
      }

      if (matches.length === 0) continue

      results.push({
        collection: {
          slug: collection.slug,
          title: collection.title,
          publishedDate: collection.publishedDate,
          url: `https://magic.gg/decklists/${collection.slug}`,
        },
        deck: {
          title: deck.title,
          subtitle: deck.subtitle,
          format: deck.format,
          eventName: deck.eventName,
          eventDate: deck.eventDate,
        },
        matches,
      })
    }
  }

  return {
    query: trimmedQuery,
    totalCollections: collections.length,
    totalDecks,
    matchCount: results.length,
    cachedAt,
    results,
  }
}

export async function getCollectionsSummary() {
  const { collections, cachedAt } = await getCollections()

  return {
    cachedAt,
    total: collections.length,
    collections: collections.map((collection) => ({
      slug: collection.slug,
      title: collection.title,
      publishedDate: collection.publishedDate,
      deckCount: collection.decks.length,
      url: `https://magic.gg/decklists/${collection.slug}`,
    })),
  }
}
