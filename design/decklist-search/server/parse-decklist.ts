import type { Deck, DeckCard } from "./types"

const DECK_LIST_RE =
  /<deck-list([^>]*)>([\s\S]*?)<\/deck-list>/gi
const ATTR_RE = /(\w[\w-]*)="([^"]*)"/g
const ZONE_RE =
  /<(main-deck|side-board|companion-card)>([\s\S]*?)<\/\1>/gi

function parseAttributes(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  let match: RegExpExecArray | null

  while ((match = ATTR_RE.exec(raw)) !== null) {
    attrs[match[1]] = match[2]
  }

  ATTR_RE.lastIndex = 0
  return attrs
}

function parseCardLine(line: string): DeckCard | null {
  const trimmed = line.trim()
  if (!trimmed) return null

  const match = trimmed.match(/^(\d+)\s+(.+)$/)
  if (!match) return null

  return {
    quantity: Number.parseInt(match[1], 10),
    name: match[2].trim(),
  }
}

function parseZone(body: string): DeckCard[] {
  return body
    .split("\n")
    .map(parseCardLine)
    .filter((card): card is DeckCard => card !== null)
}

function parseZones(deckBody: string): Pick<Deck, "mainDeck" | "sideboard" | "companion"> {
  const zones = {
    mainDeck: [] as DeckCard[],
    sideboard: [] as DeckCard[],
    companion: [] as DeckCard[],
  }

  let zoneMatch: RegExpExecArray | null
  while ((zoneMatch = ZONE_RE.exec(deckBody)) !== null) {
    const zoneName = zoneMatch[1]
    const cards = parseZone(zoneMatch[2])

    if (zoneName === "main-deck") zones.mainDeck = cards
    if (zoneName === "side-board") zones.sideboard = cards
    if (zoneName === "companion-card") zones.companion = cards
  }

  ZONE_RE.lastIndex = 0
  return zones
}

export function parseDecklistBody(body: string): Deck[] {
  const decks: Deck[] = []
  let deckMatch: RegExpExecArray | null

  while ((deckMatch = DECK_LIST_RE.exec(body)) !== null) {
    const attrs = parseAttributes(deckMatch[1])
    const zones = parseZones(deckMatch[2])

    decks.push({
      title: attrs["deck-title"] ?? "Deck",
      subtitle: attrs.subtitle ?? "",
      eventDate: attrs["event-date"] ?? "",
      eventName: attrs["event-name"] ?? "",
      format: attrs.format ?? "",
      ...zones,
    })
  }

  DECK_LIST_RE.lastIndex = 0
  return decks
}

export function normalizeCardName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function cardMatchesQuery(cardName: string, query: string): boolean {
  const normalizedCard = normalizeCardName(cardName)
  const normalizedQuery = normalizeCardName(query)

  if (!normalizedQuery) return false
  return normalizedCard.includes(normalizedQuery)
}
