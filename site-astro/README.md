# armd-sites

Site `armd.com` pour **ARMD Group**.
Produit par **Mad Makers**.

## Architecture

Une seule URL de communication (`armd.com`), deux univers visuels distincts (Occident et Afrique), bascule par switcher en navbar.

| Zone | URL FR | URL EN |
|---|---|---|
| Occident (institutionnel sobre) | `armd.com` | `armd.com/en` |
| Afrique (panafricain mesuré) | `armd.com/africa` | `armd.com/africa/en` |

Documentation complète : `docs/architecture.md`.

## Stack

- **Astro 5** avec routing i18n natif et content collections
- **Tailwind v4** via `@tailwindcss/vite`
- **TypeScript strict**
- **Decap CMS** pour l'édition (config dans `public/admin/`)
- **Cloudflare Pages** pour l'hébergement (statique)

## Démarrer

```bash
nvm use            # Node 20
npm install
npm run dev        # http://localhost:4321
npm run build      # ./dist
npm run preview
```

## Structure

```
src/
├── pages/                      # Routes
│   ├── index.astro             # armd.com (Occident FR)
│   ├── en/index.astro          # armd.com/en (Occident EN)
│   └── africa/
│       ├── index.astro         # armd.com/africa (Afrique FR)
│       └── en/index.astro      # armd.com/africa/en (Afrique EN)
├── layouts/                    # BaseLayout + variantes par zone
├── components/                 # Nav, Footer, ZoneSwitcher, LangSwitcher
├── lib/                        # Helpers (zone detection, i18n)
├── i18n/                       # Traductions centralisées
├── styles/                     # global.css + tokens par zone
└── content/                    # Insights (collections par zone)
public/
├── admin/                      # Decap CMS shell
└── robots.txt
```

## Phases (rappel calendrier)

- DA itération 1 : avant 2 juin 2026
- Validation DA : avant 5 juin 2026
- Copy FR+EN : avant 16 juin 2026
- Intégration : avant 30 juin 2026
- Recettage : avant 7 juillet 2026
- Mise en ligne V1 : semaine du 7 juillet 2026

## Contact

Mad Makers - Maïck (lead) · Goudet Abalé (client, CEO ARMD)
