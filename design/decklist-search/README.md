# Decklist Finder

Recherche de decklists publiées sur [magic.gg/decklists](https://magic.gg/decklists).

## Fonctionnalités

- Recherche par nom de carte (correspondance partielle, insensible à la casse)
- Parcourt toutes les publications `decklistArticle` via l’API Contentful de magic.gg
- Affiche le format, l’événement et la zone (main / side / companion)

## Développement

```bash
cd design/decklist-search
npm install
npm run dev
```

L’API locale est servie par le plugin Vite (`/api/search`, `/api/collections`).

## Build

```bash
npm run build
npm run preview
```

Le mode preview sert aussi l’API de recherche.
