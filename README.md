# ARMD

Site du cabinet ARMD - intelligence économique et influence stratégique panafricaine.
Paris, Abidjan, Douala, Washington.

## Démarrer sur une nouvelle machine

```bash
git clone https://github.com/directedbymaick/armd.git
cd armd/site-v2
python -m http.server 8080
```

Le site est en HTML statique : aucune installation, aucun build. Ouvre
http://localhost:8080 et c'est parti.

Un raccourci existe aussi à la racine de `site-v2/` : double-clic sur
`serve.cmd` lance le serveur et ouvre le navigateur.

## Structure

| Dossier | Rôle |
|---|---|
| `site-v2/` | Le site actuel. 12 pages HTML, CSS modulaire, JS vanilla. |
| `site-v2/studio/` | Studio Sanity pour le contenu éditorial (articles, cas, équipe). |
| `research-and-brand/` | Brief client, analyse de marché, étude concurrence, sitemap, brand manual, brochure corporate. |
| `site-astro/` | Amorce de migration Astro, non aboutie. |

### Le studio Sanity

```bash
cd site-v2/studio
npm install
npm run dev
```

## Ce qui n'est pas dans le repo

Ces fichiers restent en local sur la machine d'origine, ils ne sont pas
nécessaires pour développer :

- **Les rushes vidéo** - 22 variantes de montage du hero, environ 122 Mo.
  Le site ne référence que `hero-v16-hd.mp4` et `showreel.mp4`, qui sont
  bien versionnés.
- **Les screen recordings** de référence navbar, environ 34 Mo.
- **`site-v1-vite/`** - ancienne version Vite, remplacée par `site-v2`.
- **`node_modules/` et `dist/`** - régénérables avec `npm install`.

Si tu as besoin des rushes sur une autre machine, il faut les transférer
à la main : ils ne descendront pas avec le clone.

## Documents de référence

Dans `research-and-brand/`, numérotés dans l'ordre de lecture :

- `01-brief.md` - le brief client de départ
- `02-analyse-marche.md` - le marché et son positionnement
- `06-concurrence.md` - l'étude des cabinets concurrents
- `09-sitemap.md` - l'arborescence complète des pages
- `ARMD - Brand Manual.pdf` - la charte officielle, source de vérité pour
  la typo, les couleurs et le logo
