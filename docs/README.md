# Documentation Webdesign

Ce dossier structure la connaissance du dépôt pour les humains et les agents Cursor.

## Fichiers

| Fichier | Rôle |
|---------|------|
| [STACK.md](./STACK.md) | Versions, outils, choix techniques |
| [CONVENTIONS.md](./CONVENTIONS.md) | Standards React + shadcn + Tailwind |
| [MEMORY.md](./MEMORY.md) | Mémoire évolutive (leçons, décisions, pièges) |

## Système de mémoire

1. **Lire** `MEMORY.md` avant de coder un nouveau design React.
2. **Appliquer** `CONVENTIONS.md` pendant l’implémentation.
3. **Enrichir** `MEMORY.md` après chaque livraison significative (nouveau projet, bug résolu, convention adoptée).
4. Les règles dans [`.cursor/rules/`](../.cursor/rules/) reprennent l’essentiel pour l’auto-éducation des agents.

Format d’une entrée mémoire :

```markdown
### [AAAA-MM-JJ] Titre court
- **Contexte** : …
- **Décision** : …
- **À réutiliser** : …
```
