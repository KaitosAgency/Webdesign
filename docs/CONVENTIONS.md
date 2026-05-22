# Conventions — React, Tailwind, shadcn

## Principes

1. **Tailwind uniquement** dans le JSX : pas de fichiers `.module.css`, pas de classes nommées maison (`.hero-title`).
2. **Thème** : variables CSS dans `src/index.css` (pattern shadcn) ; pas de couleurs hex en dur dans les composants si un token existe (`bg-primary`, `text-muted-foreground`).
3. **shadcn/ui** : boutons, badges, séparateurs, etc. via `src/components/ui/` ; extension via `npx shadcn@latest add`.
4. **Données** : textes et listes dans `src/data/*.ts`, composants présentationnels.
5. **Structure** : `components/sections/`, `components/layout/`, `components/motion/`, `hooks/`.
6. **Accessibilité** : `aria-label` sur nav, `alt` sur images, respect `prefers-reduced-motion`.
7. **Français** : UI et meta en `fr` pour les démos portfolio.

## shadcn — bonnes pratiques

- Utiliser `cn()` de `@/lib/utils` pour fusionner les classes Tailwind.
- Préférer les variants CVA des composants (`Button`, `Badge`) plutôt que dupliquer des styles.
- `Button` avec lien : prop `render={<a href="..." />}` (Base UI).
- Ne pas éditer `components/ui/*` pour du style ponctuel : passer par `className` à l’appel.

## Animations

- Entrées au scroll : `Reveal` (`components/motion/reveal.tsx`).
- Parallax / hover : Framer Motion + hook `useReducedMotion`.
- Durées cohérentes : ~0.6–0.7s, easing `[0.22, 1, 0.36, 1]`.

## Git

- Un dossier = un projet autonome avec son `package.json`.
- Ne pas committer `node_modules/` ni `dist/`.
