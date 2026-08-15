# Architecture du système digital ARMD
## Décision : URL unique, splash de choix, deux univers visuels (Global et Africa)

**Date initiale** : 27 mai 2026
**Mise à jour** : 27 mai 2026, après deuxième arbitrage de Goudet sur l'expérience d'entrée
**Acté par** : Goudet Abalé (CEO ARMD) et Maïck (Mad Makers)
**Remplace** : l'arbitrage sous-domaines posé au §2.1 et §8.1 de la proposition du 25 mai 2026
**Impact contractuel** : aucun. Périmètre, prix, calendrier inchangés.

---

## 1. Pourquoi cette architecture

La proposition validée prévoyait deux sites en sous-domaines (`armd.com` et `africa.armd.com`). Goudet a soulevé en signature :

> *"On communique sur quelle URL si on a deux URLs ?"*

Le problème est concret : carte de visite, signature email, prises de parole, LinkedIn, partenaires institutionnels. Une seule adresse à pousser, autorité SEO concentrée, cohérence "maison mère" du brief respectée.

Décision : **un seul domaine de communication, deux univers visuels distincts, séparation propre via splash d'entrée et switcher en navbar**.

## 2. Architecture URL retenue

```
armd.com               →  splash de choix au premier visit (ARMD Global / ARMD Africa)
armd.com/global        →  zone Global, langue FR (par défaut)
armd.com/global/en     →  zone Global, langue EN
armd.com/africa        →  zone Africa, langue FR
armd.com/africa/en     →  zone Africa, langue EN
```

- **Une seule URL à communiquer** : `armd.com`
- **Nomenclature retenue** : **Global** (au lieu d'Occident) et **Africa**. "Global" porte l'ambition mondiale ARMD (Paris, Washington, Bruxelles, Genève, Tokyo, Dubai, etc.), c'est plus moderne et moins clivant que "Occident".
- **Autorité SEO concentrée** sur un seul domaine.
- **Deux dimensions indépendantes** : zone et langue.
- **Extensible V2/V3** : `armd.com/africa/ar`, `armd.com/africa/pt`, etc.

## 3. Expérience d'entrée : splash de choix

À l'arrivée sur `armd.com`, le visiteur **premier visit** voit un splash plein écran à deux portes :

```
                       [  Logo ARMD animé  ]


            "Où souhaitez-vous entrer ?"


    ┌───────────────────────┐    ┌───────────────────────┐
    │                       │    │                       │
    │     ARMD Global       │    │     ARMD Africa       │
    │                       │    │                       │
    │  Paris · Washington   │    │   Abidjan · Lagos     │
    │  Bruxelles · Genève   │    │   Nairobi · Dakar     │
    │                       │    │                       │
    └───────────────────────┘    └───────────────────────┘


              FR  ·  EN  (switch discret en bas)
```

**Comportement** :
- **Premier visit** : splash affiché. Choix obligatoire. Animation courte de marque (logo qui se dévoile, motif graphique léger). Performance : moins de 1 seconde de blocage.
- **Visits suivants** : redirect automatique vers la dernière zone et langue choisies (mémorisées par cookie).
- **Returning users qui veulent changer** : lien "Choisir une autre région" visible en footer, et switcher zone en navbar à tout moment.
- **Accès direct par URL profonde** (`armd.com/africa/insights/article-x`) : pas de splash, on respecte l'intention de l'utilisateur.

**Pourquoi ce choix plutôt qu'une home par défaut** :
- Tranche clairement la dualité : le visiteur sait qu'ARMD opère sur deux zones distinctes.
- Crée un moment de marque dès l'entrée, premium et solennel.
- Évite le faux par défaut (un parisien tombe sur Global, un abidjanais tombe sur Africa, sans IP detection risquée).
- Ne pénalise pas les returning users (cookie skip).
- Ne pénalise pas l'accès direct par lien partagé (URL profondes vont droit au but).

**Pourquoi pas la détection IP** : déjà tranché côté Goudet le 27 mai (VPN, déplacement, IP partagée d'entreprise, faux positifs, bots SEO).

## 4. Navbar (deux switchers persistants)

Sur toutes les pages internes (hors splash) :

```
[ Logo ARMD ]   À propos · Expertises · Implantations · Références · Partenaires · Insights · Contact   [ Zone ▾ ]  [ FR ▾ ]
                                                                                                          Global        EN
                                                                                                          Africa
```

- Switcher zone toujours visible.
- Switcher langue toujours visible.
- En mobile : tout glisse dans un menu hamburger, sous une rubrique "Région et langue".

## 5. Deux directions artistiques toujours différenciées

| | **Zone Global** | **Zone Africa** |
|---|---|---|
| URL | `armd.com/global` | `armd.com/africa` |
| DA | Institutionnelle, palette restreinte, codes corporate sobres | Panafricaine mesurée, palette qui s'autorise un accent supplémentaire, traces graphiques discrètes |
| Typographie | Classique avec accents modernes | Compatible langues additionnelles V2/V3 (arabe, portugais en priorité) |
| Tonalité copy | Plus institutionnelle, registre multilatéral | Plus directe, ancrée terrain, registre continental |
| Cible | Paris, Washington, Bruxelles, Genève, Tokyo, Dubai | Abidjan, antennes régionales africaines (Lagos, Nairobi, Casablanca, Le Caire, Kigali, Dakar...) |
| Langues V1 | FR + EN | FR + EN (puis +ar, +pt en V2) |

Le splash et le switcher zone basculent l'utilisateur entre les deux univers : changement complet de thème (CSS tokens, typographie, illustrations, copy, mises en avant éditoriales).

## 6. Implications techniques

- **Un seul repo Astro** : `armd-sites`.
- **Splash component** : route racine `/` rend le splash (avec animation légère, pas de vidéo lourde, perf < 1s).
- **Cookie de préférence** : `armd_pref=zone:lang` (TTL 1 an, SameSite=Lax, consentement RGPD via banner).
- **Logique de redirect** : côté client (script léger) à l'arrivée sur `/`. Si cookie présent, redirect vers `/zone/lang`. Sinon, splash.
- **Routes V1** :
  - `/` : splash
  - `/global` : home zone Global FR
  - `/global/en` : home zone Global EN
  - `/africa` : home zone Africa FR
  - `/africa/en` : home zone Africa EN
  - `/welcome` (alias permanent du splash) : pour le lien "Choisir une autre région"
- **Hreflang correctement déclarés** : `fr-FR`, `en-US`, et plus tard `fr-CI`, `en-CI`, `ar-MA`, etc.
- **Sitemap unique** : `armd.com/sitemap.xml`, liste toutes les URLs des deux zones.
- **Hébergement** : Cloudflare Pages.

## 7. Risques résiduels et mitigation

| Risque | Mitigation |
|---|---|
| Friction du splash sur le premier visit | Animation courte, performance < 1s, choix très lisible, mémorisation immédiate via cookie |
| Visiteur qui veut changer de zone | Switcher zone en navbar persistant, lien "Choisir une autre région" en footer, alias `/welcome` partageable |
| URL profonde sans contexte de zone | Toutes les URLs sont auto-portantes (zone et langue lisibles dans le chemin), parfait pour le partage et le SEO |
| SEO : risque de contenu jugé dupliqué entre zones | Hreflang corrects, contenus distincts par zone (pas une simple traduction, angles éditoriaux différents) |
| Cookie banner RGPD lourd | Cookie strictement nécessaire à la fonction (préférence d'affichage), à argumenter dans la politique cookies pour éviter consentement bloquant |

## 8. Ce que ça change côté éléments à transmettre par Goudet

Pas de changement par rapport à la proposition du 25 mai. Liste inchangée (photo, bio, partenaires, sujets articles, statut domaines).

**Ajout léger** : le splash d'entrée demande un asset de marque mémorable. Soit on travaille à partir du logo ARMD existant (animation légère), soit du radar animé évoqué dans la brochure. À trancher en phase DA.

## 9. Validation et trace

Cette décision modifie l'arbitrage formel de la proposition du 25 mai 2026 (§2.1, §8.1, §8.2). Elle est consignée par écrit ici et reste la référence pour toute la phase de production. La proposition signée reste valable sur le périmètre, le prix et le calendrier : l'architecture URL et l'expérience d'entrée sont des choix de méthode laissés à Mad Makers.

---

*Mad Makers · Architecture système digital ARMD · Étape 05 / 12*
