# Stack du dépôt

## Projets React (référence : `design/portfolio-demo`)

| Outil | Version (au setup) | Notes |
|-------|-------------------|--------|
| Node | 20+ recommandé | — |
| Vite | 8.x | `@vitejs/plugin-react` |
| React | 19.x | — |
| TypeScript | 6.x | alias `@/*` → `src/*` |
| Tailwind CSS | 4.x | plugin `@tailwindcss/vite`, pas de `tailwind.config.js` |
| shadcn/ui | CLI 4.x | `components.json`, style `base-nova` |
| Framer Motion | 12.x | animations sectionnées |
| Lucide | via shadcn | icônes |

## Initialiser un nouveau projet React + shadcn

```bash
npm create vite@latest design/<nom> -- --template react-ts
cd design/<nom>
npm install
npm install tailwindcss @tailwindcss/vite
# Configurer alias + vite (voir ui.shadcn.com/docs/installation/vite)
npx shadcn@latest init -t vite -d -y
```

## Projets statiques

HTML/CSS purs possibles dans `design/<nom>/` sans tooling (voir futurs dossiers).
