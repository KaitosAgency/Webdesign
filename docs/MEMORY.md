# Mémoire du dépôt Webdesign

> Document vivant : à mettre à jour après chaque projet ou apprentissage important.

## État actuel

- **Dépôt** : essais web design pour KaitosAgency.
- **Premier projet React** : `design/portfolio-demo` (one-page portfolio FR, style Folioblox).
- **Stack retenue** : Vite + React + Tailwind v4 + shadcn (`base-nova`) + Framer Motion.

## Entrées

### [2026-05-22] Setup portfolio-demo (FolioDémo)

- **Contexte** : besoin d'une démo portfolio « wahou » mais disciplinée, 100 % Tailwind + shadcn, en français.
- **Décision** :
  - Contenu centralisé dans `src/data/site.ts`.
  - Thème sombre + primaire orange via variables `:root` dans `index.css`.
  - Animations via `Reveal` + parallax léger hero ; couper si `prefers-reduced-motion`.
  - shadcn init non interactif : `npx shadcn@latest init -t vite -d -y` après config Tailwind + alias `@/`.
- **À réutiliser** :
  - Toujours configurer `@/*` dans `tsconfig.json`, `tsconfig.app.json` et `vite.config.ts` avant `shadcn init`.
  - TypeScript 6 : ajouter `"ignoreDeprecations": "6.0"` si warning sur `baseUrl`.
  - Bouton pill « Me contacter » : `rounded-full` + pastille icône `ArrowUpRight` en `span` interne.

### [2026-05-22] Identité Git

- **Contexte** : commits parfois attribués à un autre compte GitHub (ex. seoaffaires-CF).
- **Décision** : `git config --local user.name` / `user.email` pour KaitosAgency dans ce repo.
- **À réutiliser** : l'attribution GitHub dépend de l'e-mail du commit, pas du remote.

## Comment enrichir

1. Ajouter une section `### [date] Titre` en haut de la liste « Entrées ».
2. Résumer en 3 puces : Contexte, Décision, À réutiliser.
3. Si une règle devient permanente, la recopier dans `docs/CONVENTIONS.md` ou `.cursor/rules/`.
