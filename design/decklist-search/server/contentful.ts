import { parseDecklistBody } from "./parse-decklist"
import type { DecklistCollection } from "./types"

const CONTENTFUL_SPACE = "ryplwhabvmmk"
const CONTENTFUL_TOKEN =
  "55006dd7d868409c694628081e43f6ce5d1cee174943d8fcb03ca66507390427"
const CONTENTFUL_BASE = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE}/entries`
const PAGE_SIZE = 100

interface ContentfulEntry {
  sys: { id: string }
  fields: {
    articleTitle?: string
    slug?: string
    publishedDate?: string
    decklistBodyNew?: { body?: string }
    decklistBody?: string[] | string
  }
}

interface ContentfulResponse {
  total: number
  items: ContentfulEntry[]
}

function getDecklistBody(entry: ContentfulEntry): string {
  const body = entry.fields.decklistBodyNew?.body
  if (body) return body

  const legacyBody = entry.fields.decklistBody
  if (Array.isArray(legacyBody)) return legacyBody.join("\n")
  if (typeof legacyBody === "string") return legacyBody

  return ""
}

async function fetchPage(skip: number): Promise<ContentfulResponse> {
  const params = new URLSearchParams({
    content_type: "decklistArticle",
    order: "-fields.publishedDate",
    limit: String(PAGE_SIZE),
    skip: String(skip),
    access_token: CONTENTFUL_TOKEN,
    select: "sys.id,fields.articleTitle,fields.slug,fields.publishedDate,fields.decklistBodyNew,fields.decklistBody",
  })

  const response = await fetch(`${CONTENTFUL_BASE}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status}`)
  }

  return response.json() as Promise<ContentfulResponse>
}

export async function fetchAllCollections(): Promise<DecklistCollection[]> {
  const firstPage = await fetchPage(0)
  const collections: DecklistCollection[] = firstPage.items.map((entry) => ({
    id: entry.sys.id,
    slug: entry.fields.slug ?? "",
    title: entry.fields.articleTitle ?? "Sans titre",
    publishedDate: entry.fields.publishedDate ?? "",
    decks: parseDecklistBody(getDecklistBody(entry)),
  }))

  const totalPages = Math.ceil(firstPage.total / PAGE_SIZE)

  for (let page = 1; page < totalPages; page += 1) {
    const data = await fetchPage(page * PAGE_SIZE)

    for (const entry of data.items) {
      collections.push({
        id: entry.sys.id,
        slug: entry.fields.slug ?? "",
        title: entry.fields.articleTitle ?? "Sans titre",
        publishedDate: entry.fields.publishedDate ?? "",
        decks: parseDecklistBody(getDecklistBody(entry)),
      })
    }
  }

  return collections
}
