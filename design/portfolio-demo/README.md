# FolioDémo — Portfolio one-page

Démo portfolio en français, inspirée d’une maquette type Folioblox : fond noir, accent orange, typographie bold, galerie monochrome.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- [shadcn/ui](https://ui.shadcn.com) (preset `base-nova`, Radix/Base UI)
- Framer Motion (animations, `prefers-reduced-motion` respecté)

## Commandes

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
src/
  components/
    layout/       # en-tête, pied de page
    sections/     # hero, trusted, about, projects
    motion/       # Reveal (entrées au scroll)
    ui/           # composants shadcn (ne pas modifier à la main sauf config)
  data/site.ts    # contenu FR centralisé
  hooks/          # reduced motion
```

## Règles de ce projet

- **Pas de classes CSS custom** : uniquement utilitaires Tailwind + tokens shadcn (`index.css`).
- **shadcn** : ajouter des composants via `npx shadcn@latest add <nom>`.
- **Contenu** : modifier `src/data/site.ts`, pas le JSX dispersé.
- **Animations** : composant `Reveal` + Framer Motion ; toujours passer par `useReducedMotion`.

## Ajouter un composant shadcn

```bash
npx shadcn@latest add card
```
