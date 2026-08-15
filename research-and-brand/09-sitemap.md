# Sitemap complet armd.com

**Émis par** : Mad Makers
**Date** : 28 mai 2026
**Version** : V1 livraison juillet 2026 + roadmap V2/V3
**Objet** : architecture complète du site (toutes les pages, toutes les sections, deux zones, deux langues)

---

## 1. Vue d'ensemble (arborescence)

```
armd.com
│
├── / (racine - splash de choix de zone)
│
├── /global (zone Occident - V1)
│   │
│   ├── / (home Global FR par défaut)
│   ├── /en (home Global EN)
│   │
│   ├── /a-propos (about)
│   │   ├── /fondateur (Goudet en pleine page)
│   │   ├── /equipe (cellule opérationnelle)
│   │   ├── /advisory-board (10 experts seniors) [V2]
│   │   └── /manifeste (5 valeurs détaillées)
│   │
│   ├── /expertises (hub des 6 expertises)
│   │   ├── /renseignement-affaires
│   │   ├── /lobbying-diplomatie
│   │   ├── /communication-influence
│   │   ├── /e-reputation
│   │   ├── /social-intelligence
│   │   └── /bases-donnees-proprietaires
│   │
│   ├── /implantations (hub carte + liste)
│   │   ├── /paris
│   │   ├── /abidjan
│   │   └── /antennes-en-ouverture [V2]
│   │
│   ├── /references (hub des cas)
│   │   ├── /reasy
│   │   ├── /manuel-ntumba
│   │   └── /huawei
│   │
│   ├── /partenaires (médias activables + cabinets)
│   │
│   ├── /insights (pilier éditorial)
│   │   ├── /articles (liste paginée)
│   │   ├── /articles/[slug] (un article)
│   │   ├── /notes (notes courtes)
│   │   ├── /notes/[slug] (une note)
│   │   ├── /osea (think tank en preview V1, full V2)
│   │   └── /newsletter (archives)
│   │
│   ├── /contact (formulaire + coordonnées)
│   │
│   └── /legal
│       ├── /mentions-legales
│       ├── /politique-confidentialite
│       ├── /politique-cookies
│       └── /cgu
│
├── /africa (zone Afrique - V1)
│   │
│   └── (structure identique au /global, DA différenciée)
│       ├── / (home Africa FR par défaut)
│       ├── /en (home Africa EN)
│       ├── /a-propos
│       ├── /expertises
│       ├── /implantations
│       ├── /references
│       ├── /partenaires
│       ├── /insights
│       ├── /contact
│       └── /legal
│
├── /welcome (alias permanent du splash de choix de zone)
│
├── /search (recherche site) [V2]
│
└── /404 (page d'erreur)
```

**Compte total V1** :
- 2 zones × ~16 pages = **32 pages cœur**
- Plus pages dynamiques : articles Insights (croissance continue), références (croissance continue)
- Plus pages techniques : splash, 404, légales (×2 zones)

---

## 2. Pages cœur - détail section par section

Pour chaque page : son URL, son objet stratégique, et les sections qui la composent (du haut vers le bas du scroll).

### 2.1 Splash de choix de zone

**URL** : `/` (et alias `/welcome`)
**Objet** : moment de marque ARMD au premier visit. Choix de zone. Cookie mémorise pour les visits suivants.
**Sections** :
1. Background atmosphérique (Vanta dots subtle + supertarget oversized)
2. Animation logo ARMD → ARMED → ARMD (séquence Apple-style ~7s)
3. Eyebrow positionnement *"Cabinet d'intelligence économique et d'influence stratégique"*
4. Choix de deux portes : `ARMD Global` (Paris · Washington · Bruxelles · Genève) ou `ARMD Africa` (Abidjan · Lagos · Nairobi · Dakar)
5. Switcher langue FR/EN en bas
6. Meta footer mono : *Paris · Abidjan · Washington*

---

### 2.2 Home (zone Global et zone Africa)

**URL** : `/global` (Global) et `/africa` (Africa) - et `/global/en`, `/africa/en`
**Objet** : page d'entrée principale, vitrine. Convertir visiteur en clic vers fondateur, expertise, ou contact.
**Sections (11 en V1)** :

1. **Hero** : phrase de positionnement courte + signature mono "Observer · Anticiper · Diriger" + sous-titre + 2 CTAs (Contact + Découvrir fondateur) + target SVG animée à droite
2. **Fondateur Goudet** : portrait + bio courte + 4 credentials (formation, trajectoire, ancienne maison, affiliations) + mandats phares en tags + CTA "Lire le parcours complet"
3. **Notre approche** : 3 leviers (Donnée · Récit · Humain) en grid sobre
4. **Nos expertises** : 6 expertises en grille 3x2 avec pointer-tracked lighting + lien vers chaque page expertise dédiée
5. **Nos implantations** : carte monde minimaliste avec dots Paris/Abidjan actifs + 11 antennes futures + liste latérale villes
6. **Nos références** : 3 cas anonymisés (REasy, Manuel Ntumba, Huawei) avec métriques mono géantes
7. **Cellule opérationnelle** : 5 collaborateurs (avatars initiales V1, photos V2) + CTA "Advisory Board +10"
8. **Nos partenaires** : marquee horizontal infini logos texte (Jeune Afrique, Forbes Afrique, CNBC Africa, etc.)
9. **Insights** : 1 article featured (OSEA preview) + 2 articles fondateurs
10. **Newsletter** : capture email simple avec note "Une analyse stratégique par mois, pas de spam"
11. **Contact (closing)** : block Deep Blue inset, slogan "Observer. Anticiper. Diriger." + 3 contacts (bureau, téléphone, email)

**Différence Global vs Africa** :
- Même architecture, même nombre de sections
- DA légèrement différenciée : Global plus sobre institutionnelle, Africa plus chaude avec accent sand-clear
- Copy adaptée par zone (ton plus continental pour Africa, plus multilatéral pour Global)
- Cases hero variables selon zone (un cas tier 1 africain mis en avant côté Africa)

---

### 2.3 À propos (hub)

**URL** : `/global/a-propos` et `/africa/a-propos`
**Objet** : profondeur sur qui est ARMD. Convertir le visiteur qui veut comprendre la maison.
**Sections** :

1. **Hero secondaire** : eyebrow + titre *"Qui nous sommes"* + intro courte
2. **Manifesto en plein** : déclaration multi-paragraphes typographique (la version longue du manifeste, comme la slide 03 du system board)
3. **5 valeurs détaillées** : Acuité · Analyse · Rigueur · Discrétion · Réactivité en cards (chacune avec son tagline brochure)
4. **Carte de Goudet** : photo + bio courte + lien vers `/fondateur`
5. **Carte de l'équipe** : grille 5 collaborateurs + lien vers `/equipe`
6. **Bandeau partenaires** : marquee logos
7. **CTA contact** : "Parlons stratégie"

---

### 2.4 Fondateur (Goudet)

**URL** : `/global/a-propos/fondateur` et `/africa/a-propos/fondateur`
**Objet** : porter le poids de la social proof V1. Page la plus lue probablement.
**Sections** :

1. **Hero pleine page** : portrait HD de Goudet à gauche + nom XXL + role à droite + bio courte
2. **Parcours académique** : Sciences Po Lille + Johns Hopkins SAIS Bologne (en timeline ou cards)
3. **Trajectoire professionnelle** : 35°Nord (Forward Global) → fondation ARMD 2025 (en timeline)
4. **Mandats accompagnés** : grille des 7 logos clients (NSIA, EDF, Endeavour Mining, Huawei, Présidence du Congo, UNICEF, Expertise France) + détail mission en hover
5. **Géographies vécues** : Kinshasa, Brazzaville, Bologne, Séoul, Paris (carte ou liste illustrée)
6. **Prises de parole publiques** : citations média + liens vers articles/podcasts/vidéos
7. **Affiliations** : FFPB, réseaux panafricains, etc.
8. **CTA contact direct** : "Échanger avec Goudet" (mail direct ou Calendly)

---

### 2.5 Équipe / Cellule opérationnelle

**URL** : `/global/a-propos/equipe` et `/africa/a-propos/equipe`
**Objet** : montrer la profondeur d'équipe ARMD au-delà de Goudet.
**Sections** :

1. **Hero** : titre *"Cellule opérationnelle"* + intro
2. **Grille équipe principale** : 5 collaborateurs (Eisa Gouredou, Lewis Pagoriwan, Micheline Sienga, Abraham Coulibaly, Noel Dixon) avec photo + nom + role + lieu + parcours résumé + LinkedIn
3. **CTA Advisory Board** : "+10 experts seniors mobilisables → voir l'Advisory Board"

---

### 2.6 Advisory Board [V2]

**URL** : `/global/a-propos/advisory-board` et `/africa/a-propos/advisory-board`
**Objet** : démontrer la profondeur du réseau d'experts seniors mobilisables.
**Sections** :

1. **Hero** : titre *"Advisory Board"* + intro *"10 expertises seniors mobilisables à la demande"*
2. **Grille 10 experts** : Éric Kacou (CIV), Fodé Dramé (MLI), Kate Kallot (KEN), Mamadou Doumbia (CIV), Fabrizio Pagani (ITA), Mathilde Lafarge (FRA), Jean-Michel Mis (FRA), Nicola Paparusso (ITA), François-Charles Timmerman (FRA), Clément Domingo (FRA) - chacun avec photo, pays, spécialité, parcours
3. **Filtres par spécialité** : Lobbying UE/OCDE, IA et souveraineté tech, Finance durable, Guerre informationnelle, Cybersécurité éthique, etc.
4. **CTA mobilisation** : "Discuter d'un mandat qui mobiliserait ces expertises"

---

### 2.7 Manifeste

**URL** : `/global/a-propos/manifeste` et `/africa/a-propos/manifeste`
**Objet** : déposer publiquement le credo ARMD pour les lecteurs qui veulent comprendre la philosophie.
**Sections** :

1. **Hero typographique** : manifeste en plein écran (style brand manifesto)
2. **3 leviers détaillés** : Donnée · Récit · Humain - chacun avec définition longue, exemples, slogan dérivé
3. **5 valeurs détaillées** : Acuité · Analyse · Rigueur · Discrétion · Réactivité - chacune avec sa promesse et un exemple terrain
4. **Vision long terme** : *"Bâtir le premier géant panafricain"* avec horizon 24 mois et endgame (think tank OSEA, antennes régionales, etc.)

---

### 2.8 Expertises (hub)

**URL** : `/global/expertises` et `/africa/expertises`
**Objet** : présenter les 6 expertises et router vers leur page dédiée.
**Sections** :

1. **Hero** : titre *"Nos expertises"* + intro *"Du renseignement opérationnel à la maîtrise du récit. Six expertises mobilisables, articulées autour de trois leviers."*
2. **Bannière des 3 leviers** : Donnée · Récit · Humain
3. **Grille 6 expertises** : cards avec eyebrow catégorie + titre + desc courte + arrow → page dédiée
4. **Section "Comment on mobilise"** : explication méthodologique (combinaison d'expertises selon le mandat)
5. **3 cas anonymisés** : avec mention de l'expertise mobilisée
6. **CTA** : "Discuter de votre mandat"

---

### 2.9 Page d'une expertise (×6)

**URLs** :
- `/global/expertises/renseignement-affaires`
- `/global/expertises/lobbying-diplomatie`
- `/global/expertises/communication-influence`
- `/global/expertises/e-reputation`
- `/global/expertises/social-intelligence`
- `/global/expertises/bases-donnees-proprietaires`

(idem zone Africa)

**Objet** : profondeur sur une expertise précise, alimenter le SEO d'autorité, convertir le visiteur en demande qualifiée.
**Sections (template commun, à décliner pour chaque expertise)** :

1. **Hero** : numéro `0X / 06` + nom expertise XXL + tagline courte + intro
2. **Définition longue** : *"Ce que nous entendons par X"* en prose éditoriale
3. **Méthodologie** : étapes-clés en numérotation (Veille → Investigation → Étude → Due diligence par exemple)
4. **Cas mobilisant cette expertise** : 1 à 3 cas anonymisés en cards
5. **Outils et signature** : ce qui distingue ARMD sur cette expertise
6. **Equipe rattachée** : 1-3 experts ARMD qui portent cette expertise (avec liens vers leur profil)
7. **Articles Insights liés** : 2-3 articles éditoriaux sur le sujet
8. **CTA** : "Demander un brief sur [expertise]"

---

### 2.10 Implantations (hub)

**URL** : `/global/implantations` et `/africa/implantations`
**Objet** : démontrer l'envergure géographique ARMD, présent et projeté.
**Sections** :

1. **Hero** : titre *"Présents là où ça compte"* + intro
2. **Carte monde interactive** : dots actifs Paris/Abidjan, dots futurs (Washington, Bruxelles, Genève, Lagos, Nairobi, Kigali, Casablanca, Le Caire, Johannesburg, Tokyo, Dubai) - hover sur dot = info ville
3. **Bureaux actifs** : 2 cards détaillées Paris + Abidjan avec adresse, équipe locale, contact local
4. **Antennes en ouverture** : grille des futures villes avec mention "en projection" et horizon temporel approximatif
5. **CTA** : "Échanger avec votre bureau le plus proche"

---

### 2.11 Page d'un bureau (Paris / Abidjan)

**URLs** :
- `/global/implantations/paris`
- `/global/implantations/abidjan`
- (etc. au fur et à mesure des ouvertures)

**Objet** : ancrage local, contact direct par bureau.
**Sections** :

1. **Hero** : nom du bureau + photo immersive + adresse
2. **Équipe locale** : qui est sur place
3. **Spécialisations sectorielles ou géographiques** : ce que ce bureau couvre spécifiquement
4. **Coordonnées complètes** : adresse, téléphone, email, horaires
5. **Carte intégrée** : Google Maps ou similaire
6. **CTA** : "Prendre RDV au bureau"

---

### 2.12 Références (hub)

**URL** : `/global/references` et `/africa/references`
**Objet** : porter la preuve par les cas anonymisés ou autorisés.
**Sections** :

1. **Hero** : titre *"Nos références"* + sous-titre *"Mesurées. Documentées. Strictement confidentielles."*
2. **Filtre par expertise** : filtres cliquables (renseignement, lobbying, influence, e-réputation, social, bases données)
3. **Filtre par typologie client** : filtres cliquables (champions africains, multinationales, investisseurs, États, institutions)
4. **Grille des cas** : toutes les références en cards (3 cas en V1, croissance continue) avec eyebrow + nom + métrique + desc + lien vers page dédiée
5. **CTA confidentialité** : "Vous voulez discuter d'un mandat sous NDA ? Contactez-nous."

---

### 2.13 Page d'une référence (×N)

**URLs** :
- `/global/references/reasy`
- `/global/references/manuel-ntumba`
- `/global/references/huawei`
- (etc. au fur et à mesure)

**Objet** : profondeur sur un cas précis, validation par les pairs.
**Sections** :

1. **Hero** : nom du cas + eyebrow contexte + métrique XXL
2. **Le problème** : description du défi initial
3. **L'action ARMD** : ce qui a été fait (méthodologie, étapes-clés)
4. **Le résultat** : métriques mesurées, publications obtenues, impacts
5. **Témoignage client** (si autorisé) : citation + nom/fonction
6. **Expertises mobilisées** : liens vers les pages expertises correspondantes
7. **Articles ou prises de parole liés** : si le cas a généré du contenu éditorial
8. **CTA** : "Échanger sur un mandat similaire"

---

### 2.14 Partenaires

**URL** : `/global/partenaires` et `/africa/partenaires`
**Objet** : démontrer l'écosystème activable.
**Sections** :

1. **Hero** : titre *"Notre écosystème"* + intro
2. **Médias activables panafricains** : grille logos (Jeune Afrique, Financial Afrik, Agence Ecofin, Forbes Afrique, La Tribune Afrique, African Business)
3. **Médias internationaux** : grille logos (CNBC Africa, Bloomberg, BBC Africa, Reuters, TechCabal, Semafor Africa, TechCrunch)
4. **Médias spécialisés** : grille logos (Compliance Week, InCyber News, CIO Mag, Sika Finance, Africa Intelligence)
5. **Cabinets partenaires** : grille logos (ESP Abidjan, Dama Advisory, Forward Global, Sweven Corp, IDC Media, AE Side Studio)
6. **Créateurs de contenu activables** [V2] : édith Brou Bleu, Tech Safari, Brut. Afrique, etc.
7. **Lieux événementiels partenaires** [V2] : La Résidence (CIV), La Maison by Genesis, Le West
8. **CTA partenariat** : "Devenir partenaire ARMD"

---

### 2.15 Insights (hub)

**URL** : `/global/insights` et `/africa/insights`
**Objet** : pilier éditorial, SEO d'autorité.
**Sections** :

1. **Hero** : titre *"Insights"* + intro *"Notes d'analyse, prises de parole, observatoires sectoriels."*
2. **Article featured du moment** : 1 article en grand (le plus récent ou le plus stratégique)
3. **Filtres** : par expertise, par zone géographique, par format (article long, note courte, podcast, vidéo)
4. **Grille articles** : pagination (10 par page)
5. **Encart OSEA** : bannière dédiée à l'Observatoire Stratégique Économique Afrique (preview V1, full V2)
6. **Encart newsletter** : "Recevez nos notes directement"
7. **CTA** : "Recevoir nos insights"

---

### 2.16 Page d'un article Insights

**URL** : `/global/insights/articles/[slug]` (et zone Africa)
**Objet** : porter un contenu éditorial.
**Sections** :

1. **Hero article** : eyebrow catégorie + titre + sous-titre + auteur + date + temps de lecture
2. **Cover image** (optionnel)
3. **Sommaire** (auto-généré si article long)
4. **Corps de l'article** : prose éditoriale, blocs typographiques sobres, citations en pull-quotes, données en cards
5. **Encart auteur** : photo + bio courte + autres articles
6. **Articles connexes** : 3 suggestions
7. **CTA** : "Recevoir nos prochaines analyses" (capture newsletter) + "Discuter avec un expert ARMD sur ce sujet"
8. **Section commentaires** : non. Pas de commentaires publics (cohérent avec posture confidentialité ARMD).

---

### 2.17 OSEA - Observatoire Stratégique Économique Afrique

**URL** : `/global/insights/osea` et `/africa/insights/osea`
**Objet** : preview du think tank ARMD en V1, page complète en V2.
**Sections V1 (preview)** :

1. **Hero** : nom OSEA + tagline *"L'observatoire stratégique économique Afrique - en préparation"*
2. **Mission** : ce que sera OSEA (think tank + base de données propriétaire + plateforme éditoriale)
3. **Ambition** : référence à Geopolitique.eu (1900 contributeurs, 300k visiteurs/mois)
4. **Premiers travaux** : 1-2 notes de cadrage publiées
5. **CTA** : "Être notifié du lancement" (capture email)

**Sections V2 (full)** :
+ Index des contributeurs
+ Base de données acteurs africains
+ Baromètres sectoriels
+ Notes mensuelles d'analyse
+ Newsletter OSEA dédiée

---

### 2.18 Newsletter

**URL** : `/global/insights/newsletter` et `/africa/insights/newsletter`
**Objet** : capture audience + archive des éditions passées.
**Sections** :

1. **Hero** : titre *"La newsletter ARMD"* + intro *"Une analyse stratégique par mois. Pas de spam."*
2. **Formulaire capture** : email + zone d'intérêt (Global/Africa) + langue + GDPR consent
3. **Archives** : grille des éditions passées avec date + titre + lien vers version web
4. **Témoignages** [V2] : citations de lecteurs institutionnels (avec accord)

---

### 2.19 Contact

**URL** : `/global/contact` et `/africa/contact`
**Objet** : convertir en demande qualifiée. Page la plus stratégique en bout de tunnel.
**Sections** :

1. **Hero** : titre *"Parlons stratégie"* + intro *"Décidez du prochain mouvement stratégique d'ARMD pour votre marché, votre image, vos intérêts."*
2. **Formulaire qualifié** : nom, fonction, organisation, email pro, téléphone, typologie client (champion africain / multinationale / investisseur / État / institution multilatérale), nature du besoin (en quelques lignes), urgence
3. **Coordonnées par bureau** : Abidjan + Paris (+ futurs bureaux), chacun avec adresse, téléphone, email
4. **Engagement ARMD** : *"Réponse sous 48h ouvrées. Échange initial confidentiel sans engagement."*
5. **CTA alternatif** : "Pour un échange direct avec Goudet : ga@armdgroup.com"

---

### 2.20 Pages légales

**URLs** :
- `/global/legal/mentions-legales` (et zone Africa)
- `/global/legal/politique-confidentialite`
- `/global/legal/politique-cookies`
- `/global/legal/cgu`

**Objet** : conformité légale FR + RGPD + cookies.
**Sections (template standard pour chaque page)** :
1. Titre + date de dernière mise à jour
2. Sections obligatoires selon le sujet (mentions = éditeur/hébergeur/directeur publication ; confidentialité = données collectées/finalités/durées/droits RGPD ; cookies = liste des cookies + consentements ; CGU = usage du site, propriété intellectuelle, responsabilités)
3. Coordonnées contact DPO ou équivalent

---

## 3. Pages techniques

### 3.1 404

**URL** : `/404` (et accès par URL invalide)
**Objet** : récupérer le visiteur perdu.
**Sections** :
1. Message court *"Cette page n'existe pas ou plus."*
2. Suggestion : retour à la home de la zone actuelle (Global ou Africa selon contexte)
3. Lien vers le splash de choix de zone si non détecté
4. Lien vers une recherche [V2]

### 3.2 Search [V2]

**URL** : `/search`
**Objet** : recherche fulltext sur le site (articles Insights, expertises, références).
**Sections** :
1. Barre de recherche + filtres
2. Résultats paginés
3. Suggestion de contenus connexes

---

## 4. Roadmap V1 → V3

### V1 (livraison juillet 2026)

**Pages publiées** :
- Splash (`/`)
- Home Global FR + EN, Home Africa FR + EN
- À propos (hub + Fondateur + Équipe + Manifeste)
- Expertises (hub + les 6 pages dédiées)
- Implantations (hub + Paris + Abidjan)
- Références (hub + les 3 cas REasy/Manuel Ntumba/Huawei)
- Partenaires
- Insights (hub + 1-2 articles fondateurs + OSEA preview + Newsletter)
- Contact
- Légales (4 pages)
- 404

**Total V1** : ~32 pages cœur (× 2 zones × 2 langues = beaucoup d'instances, mais une seule source de contenu via CMS Decap)

### V2 (V1 + 3 à 6 mois)

**Ajouts** :
- Advisory Board (page dédiée)
- Pages bureaux Washington, Bruxelles, Genève, Casablanca, Lagos, Nairobi (ouverture progressive)
- Nouvelles références (au fur et à mesure des mandats signés)
- Nouveaux articles Insights (rythme 1-2 par mois)
- Recherche fulltext (`/search`)
- Créateurs de contenu activables (sur page Partenaires)
- Lieux événementiels (sur page Partenaires)
- Pages langues additionnelles : arabe (`/africa/ar`), portugais (`/africa/pt`) en priorité

### V3 (V2 + 6 à 12 mois)

**Ajouts** :
- OSEA en plateforme complète (index contributeurs, base de données, baromètres, notes mensuelles)
- Newsletter OSEA dédiée
- Pages swahili (`/africa/sw`), lingala (`/africa/ln`) selon antennes ouvertes
- Pages langues additionnelles selon antennes non africaines (chinois, russe, espagnol, japonais)
- Association de protection des consommateurs africains (section dédiée potentielle)
- Vidéos / podcasts intégrés dans Insights

---

## 5. Notes techniques

### Routing (Astro)

- File-based routing avec sous-dossiers `/global/` et `/africa/`
- Content collections pour Insights, Références, Expertises, Équipe
- i18n natif Astro pour les sous-dossiers `/en`
- Génération statique de toutes les pages (SSG) pour performance maximale

### SEO

- Hreflang correctement déclarés sur chaque page (fr-FR, en-US, fr-CI selon contexte)
- Sitemap XML auto-généré (`/sitemap.xml`)
- Robots.txt avec sitemap référencé
- Meta description + Open Graph propres sur chaque page
- Schema.org : `Organization` sur home, `Person` sur fondateur et équipe, `Article` sur Insights, `Place` sur implantations
- Canonical URLs propres
- URLs en kebab-case, sans accents, sans paramètres inutiles

### CMS (Decap)

- Collections par type : `articles-insights`, `references-cases`, `team-members`, `partners`, `offices`
- Collections par zone : duplication `articles-global` / `articles-africa` ou champ "zone" dans la même collection
- Édition possible depuis `/admin/` par l'équipe ARMD sans intervention Mad Makers

### Performance

- Pages statiques pré-rendues
- Images optimisées via `astro:assets` (WebP, lazy load, dimensions)
- Pas de framework client lourd (vanilla JS minimal pour interactions)
- Objectif Lighthouse Performance > 90 sur toutes les pages
- Chargement page d'accueil < 1,5s sur 3G (cohérent contrainte wifi lent ARMD)

---

## 6. Synthèse rapide pour Claude Design et ChatGPT

Quand tu produis maquettes ou system board, tu sais maintenant que le site ARMD a :

- **20 templates de pages distincts** (hors duplication zone/langue)
- **2 zones × 2 langues V1 = 4 instances de chaque template** = ~80 pages livrées en V1
- **Une hiérarchie claire** : Home → Hub de section → Page détail
- **Un CMS** pour faire grandir les contenus dynamiques (Insights, Références) sans toucher au code

Le mockup one-page V3 actuel ne représente que la **HOME** d'une zone. Les 19 autres templates restent à designer en V1.

---

*Mad Makers · Sitemap complet ARMD · Étape 09 / 12*
