# ARMD Studio - Espace administrateur Sanity

Interface d'admin pour permettre a Goudet (ou un employe) d'ajouter, modifier,
supprimer des articles, references clients et membres d'equipe sans toucher au code.

## Setup initial (une seule fois - par toi Maick, pas Goudet)

### 1. Creer un compte Sanity (gratuit)

- Aller sur https://www.sanity.io/manage
- Sign up (Google / GitHub / email)
- Une fois connecte, tu es sur le dashboard

### 2. Installer les dependances du Studio

```bash
cd "c:/Users/MAÏCK/Desktop/Mad Makers Pro/armd-site-v2/studio"
npm install
```

Ca installe Sanity + React + les schemas. 2-3 min.

### 3. Login CLI Sanity

```bash
npx sanity login
```

Choisir la meme methode que sur le web (Google/GitHub/email).
Ca ouvre le browser, tu autorises, ca revient dans le terminal.

### 4. Initialiser le projet ARMD sur Sanity

```bash
npx sanity init --env
```

Prompts :
- "Would you like to add configuration files for a Sanity project?" -> **N** (deja fait)
- "Select project" -> **Create new project**
- "Project name" -> `armd-group`
- "Use the default dataset configuration?" -> **Y** (production)

A la fin, Sanity affiche un **Project ID** (ex: `abc12def`). Le copier.

### 5. Remplacer le Project ID dans les 3 fichiers

Chercher `REPLACE_WITH_YOUR_PROJECT_ID` et remplacer par le vrai Project ID dans :

- `studio/sanity.config.js`
- `studio/sanity.cli.js`
- `../assets/js/sanity-config.js`

### 6. Configurer CORS (pour que le site puisse fetcher les donnees)

```bash
npx sanity cors add http://localhost:8765 --credentials
npx sanity cors add https://armd-group.com --credentials
```

(Remplacer par le vrai domaine de prod quand deploye.)

### 7. Lancer le Studio en local pour tester

```bash
npx sanity dev
```

Ouvre http://localhost:3333 - tu vois l'interface admin.
Creer un premier article de test pour valider.

## Migration du contenu existant

Les 3 articles + 3 cas + membre equipe existants sont pour l'instant en HTML statique
(`article-*.html`, `case-*.html`). Il faut les recreer dans le Studio :

1. Dans le Studio, cliquer sur "Articles & Insights" -> "+ Nouveau article"
2. Copier titre, chapeau, contenu depuis les fichiers HTML actuels
3. Uploader l'image principale
4. Publier
5. Repeter pour les 3 articles + 3 cas + Goudet en team member

Compte 20-30 min pour tout migrer.

Une fois migre, supprimer les vieux fichiers :
```bash
rm article-*.html case-*.html
```

## Deploiement du Studio (pour Goudet)

```bash
npx sanity deploy
```

Prompt "Studio hostname" -> `armd-group` (donne l'URL `armd-group.sanity.studio`).

Partager l'URL a Goudet + lui creer un compte :
1. Sanity manage -> Members -> Invite -> email de Goudet -> role "Editor"
2. Goudet recoit un mail, cree son mot de passe
3. Il va sur `https://armd-group.sanity.studio`, login, tape ses articles

## Utilisation quotidienne (Goudet)

1. Aller sur `https://armd-group.sanity.studio`
2. Login avec son email/password
3. Cliquer sur "Articles" ou "Références" ou "Équipe"
4. "+ Créer nouveau" ou cliquer sur un existant pour modifier
5. Bouton "Publier" (vert, en haut a droite)
6. 2 secondes apres, la modif est en ligne sur le site public

## Support technique (toi Maick)

Si un article ne s'affiche pas :
- Verifier que "publishedAt" est dans le passe
- Verifier CORS dans le dashboard Sanity
- Voir la console navigateur (F12) pour les erreurs

Documentation Sanity : https://www.sanity.io/docs
