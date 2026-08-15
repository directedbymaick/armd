# ARMD - Site v2

Site institutionnel pour ARMD Group - version sobre, editoriale, sans framework.

## Stack
- HTML5 + CSS3 + JavaScript vanilla
- Pas de build, pas de dependances NPM
- Police : Apfel Grotezk (locale, dans `assets/fonts/`)
- Animations minimales (interactions seulement, pas d'effets wow)

## Structure
```
armd-site-v2/
├── index.html              Home (hero video full screen)
├── a-propos.html
├── expertises.html
├── implantations.html
├── references.html
├── partenaires.html
├── insights.html
├── contact.html
├── 404.html
└── assets/
    ├── css/
    │   ├── design-system.css   Tokens, typo, layout
    │   ├── components.css      Header, menu hamburger, footer
    │   └── pages/              CSS specifique a chaque page
    ├── js/
    │   └── menu.js             Menu hamburger
    ├── fonts/                  Apfel Grotezk 400 + 700
    ├── images/
    │   ├── logos/              armd-globe.png, armd-text.png
    │   └── team/               photos equipe
    └── videos/
        └── hero.mp4            (A FOURNIR - voir section ci-dessous)
```

## Lancer en local

Pas besoin de serveur, double-cliquer `index.html` suffit.

Pour serveur HTTP local (recommande si la video ne joue pas en `file://`) :
```bash
cd armd-site-v2
python -m http.server 8000
# Puis : http://localhost:8000
```

## Video hero - A FOURNIR

La vidéo `assets/videos/hero.mp4` doit être ajoutée manuellement. Specs :
- Format : MP4 (H.264)
- Resolution : 1920x1080 minimum, idealement 4K
- Duree : 10-30 secondes en boucle parfaite
- Poids : < 10 MB ideal (compresse pour le web)
- Contenu : drone aerial sur villes africaines, savane, dirigeants en action, time-lapse skylines

### Sources gratuites recommandees (libres de droits commercial) :

**Pexels** (les meilleures options ARMD - aller sur ces pages et telecharger HD/4K) :
1. https://www.pexels.com/video/aerial-view-of-lagos-city-toll-gate-and-skyline-29104256/ - Lagos drone skyline
2. https://www.pexels.com/search/videos/lagos%20drone/ - drone Lagos
3. https://www.pexels.com/search/videos/africa%20drone%20footage/ - drone Afrique
4. https://www.pexels.com/search/videos/african%20city/ - villes africaines

**Coverr / Mixkit** alternatives :
- https://coverr.co/search/videos/africa
- https://mixkit.co/free-stock-video/discover/africa/

### Workflow :
1. Choisir une video sur Pexels (compte gratuit, pas obligatoire mais recommande)
2. Click "Free download" puis choisir HD 1920x1080 ou 4K
3. Renommer le fichier `hero.mp4` et le mettre dans `assets/videos/`
4. Refresh la home, la video devrait jouer en loop muet

### Poster (optionnel)
`assets/images/hero-poster.jpg` = premiere frame de la video pour afficher pendant le chargement. Optionnel, extrait via ffmpeg :
```bash
ffmpeg -i assets/videos/hero.mp4 -ss 00:00:01 -vframes 1 assets/images/hero-poster.jpg
```

## Direction artistique

- Palette : hex officiels Brand Guidelines v1 2025 - ARMD Off-white (#E5E1E0), ARMD Black (#282828), accent ARMD Deep blue (#002D50), hover ARMD Dark blue (#073763), labels ARMD Sand (#797066). Sections sombres pour contraste.
- Typo : Apfel Grotezk en 2 graisses (400 + 700). Tailles tres aerees.
- Layout : one-column + grilles simples. Beaucoup de white space.
- Animations : aucune scroll-triggered, juste hover sur liens/CTA.
- Inspiration : publicaffairsafrica.com, NYT editorial, Le Monde corporate.

## Deploiement

Drag-and-drop le dossier `armd-site-v2` entier sur https://app.netlify.com/drop pour un preview client.
