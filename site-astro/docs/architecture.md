# Architecture armd-sites

Document principal : `Mad Makers Pro/ARMD/05-architecture.md` (acte la décision du 27 mai 2026).

## Résumé exécutif

- **Un seul domaine** : `armd.com`
- **Deux zones** : Occident (par défaut) et Afrique (`/africa`)
- **Deux langues V1** : FR (par défaut) et EN (`/en`, `/africa/en`)
- **Pas de splash, pas de détection IP forcée**
- **Cookie de préférence** pour mémoriser le dernier choix zone et langue

## Routes V1

| URL | Zone | Langue |
|---|---|---|
| `/` | occident | fr |
| `/en` | occident | en |
| `/africa` | africa | fr |
| `/africa/en` | africa | en |

Chacune des 8 sections (À propos, Expertises, Implantations, Références, Partenaires, Insights, Contact, Newsletter) sera déclinée sur ces 4 URLs.

## Routes V2 et au-delà (anticipation)

- `/africa/ar` (arabe, Afrique du Nord et bailleurs Golfe)
- `/africa/pt` (portugais, Angola Mozambique Brésil)
- `/africa/sw` (swahili, ouverture Nairobi)
- `/africa/ln` (lingala, ouverture Kinshasa Brazzaville)

La structure de routing actuelle absorbe ces ajouts sans refonte.

## Stack technique

- Astro 5 (statique, content collections, i18n natif)
- Tailwind v4 via `@tailwindcss/vite`
- TypeScript strict
- Decap CMS (édition équipe ARMD via `/admin/`)
- Cloudflare Pages (hébergement, edge global)

## Conventions

- Tous les composants partagés vivent dans `src/components/`.
- Toute traduction passe par `src/i18n/translations.ts`. Pas de texte en dur dans les pages.
- Les pages localisées dupliquent la structure mais consomment le helper `resolveZoneLang` pour obtenir leur contexte.
- Le helper `buildUrl(zone, lang, rest)` est la seule source de vérité pour construire une URL inter-zones ou inter-langues.
- Tokens design par zone via `[data-zone="occident"]` et `[data-zone="africa"]` dans `src/styles/global.css`.

## SEO

- `<html lang>` correct par page (`fr-FR` ou `en-US`).
- Balises `<link rel="alternate" hreflang>` à poser dans le BaseLayout dès la phase intégration.
- Sitemap unique généré via `@astrojs/sitemap` (à ajouter en phase intégration).
- Pas de noindex, pas de robots.txt restrictif.
