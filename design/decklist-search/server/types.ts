export interface DeckCard {
  quantity: number
  name: string
}

export interface Deck {
  title: string
  subtitle: string
  eventDate: string
  eventName: string
  format: string
  mainDeck: DeckCard[]
  sideboard: DeckCard[]
  companion: DeckCard[]
}

export interface DecklistCollection {
  id: string
  slug: string
  title: string
  publishedDate: string
  decks: Deck[]
}

export interface SearchMatch {
  collection: {
    slug: string
    title: string
    publishedDate: string
    url: string
  }
  deck: {
    title: string
    subtitle: string
    format: string
    eventName: string
    eventDate: string
  }
  matches: Array<{
    zone: "main" | "side" | "companion"
    quantity: number
    cardName: string
  }>
}

export interface SearchResponse {
  query: string
  totalCollections: number
  totalDecks: number
  matchCount: number
  cachedAt: string
  results: SearchMatch[]
}
