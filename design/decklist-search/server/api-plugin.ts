import type { IncomingMessage, ServerResponse } from "node:http"
import type { Plugin } from "vite"

import { getCollectionsSummary, searchDecks } from "./search"

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(body))
}

async function handleApi(
  req: IncomingMessage,
  res: ServerResponse,
  next: (error?: Error) => void,
) {
  const url = new URL(req.url ?? "/", "http://localhost")

  if (!url.pathname.startsWith("/api/")) {
    next()
    return
  }

  try {
    if (url.pathname === "/api/search") {
      const query = url.searchParams.get("q") ?? ""
      const data = await searchDecks(query)
      sendJson(res, 200, data)
      return
    }

    if (url.pathname === "/api/collections") {
      const data = await getCollectionsSummary()
      sendJson(res, 200, data)
      return
    }

    sendJson(res, 404, { error: "Route introuvable" })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur serveur inconnue"
    sendJson(res, 500, { error: message })
  }
}

export function apiPlugin(): Plugin {
  return {
    name: "decklist-search-api",
    configureServer(server) {
      server.middlewares.use(handleApi)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApi)
    },
  }
}
