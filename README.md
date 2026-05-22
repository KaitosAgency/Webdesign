# Webdesign

Dépôt d’essais pour prototypes et maquettes web.

## Structure

- `design/` — dossier de travail pour coder et itérer sur les designs (HTML, CSS, JS, assets).

## Démarrage

Ouvrez un fichier dans `design/` (par ex. `design/exemple-01/index.html`) dans le navigateur ou via un serveur local :

```bash
cd design/exemple-01 && python3 -m http.server 8080
```

## Identité Git (auteur des commits)

Pour que les commits soient attribués au compte **KaitosAgency** sur GitHub, configurez ce dépôt localement :

```bash
git config --local user.name "KaitosAgency"
git config --local user.email "KaitosAgency@users.noreply.github.com"
```

Vérifiez avec `git config --list --show-origin | grep user.` — une config **globale** (`~/.gitconfig`) avec un autre nom ou e-mail (ex. seoaffaires-CF) prend le dessus si vous n’avez pas de config **locale** dans ce repo.
