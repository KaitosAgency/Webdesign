export const site = {
  brand: "Decklist Finder",
  title: "Recherche de decklists Magic",
  description:
    "Trouvez dans quels decks une carte apparaît parmi toutes les publications magic.gg.",
  searchPlaceholder: "Nom d'une carte (ex. Lightning Bolt, Kaito…)",
  searchButton: "Rechercher",
  emptyQuery: "Saisissez le nom d'une carte pour lancer la recherche.",
  noResults: "Aucun deck ne contient cette carte.",
  sourceLabel: "Source des données",
  sourceUrl: "https://magic.gg/decklists",
  sourceDescription:
    "Les decklists sont publiées sur magic.gg (mise à jour hebdomadaire pour le Standard classé).",
  zones: {
    main: "Main",
    side: "Side",
    companion: "Companion",
  } as const,
}

export type SearchMatch = {
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

export type SearchResponse = {
  query: string
  totalCollections: number
  totalDecks: number
  matchCount: number
  cachedAt: string
  results: SearchMatch[]
}
