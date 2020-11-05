# Elistes <!-- omit in toc -->

La communauté de partage de listes intéressantes !

_Elistes_ est une application web et mobile qui permet de **créer, partager ou exporter** des **listes de données**, peu importe le sujet

- [Développement](#développement)
  - [Installation des dépendances](#installation-des-dépendances)
  - [Lancer l'application web](#lancer-lapplication-web)
  - [Versionnng avec Git](#versionnng-avec-git)
  - [Kit de démarrage : Ionic 5 Full App PRO](#kit-de-démarrage--ionic-5-full-app-pro)
  - [Particularités PWA](#particularités-pwa)
    - [Modifier l'icône/le splashscreen de l'app mobile](#modifier-licônele-splashscreen-de-lapp-mobile)
  - [Dépannage](#dépannage)
- [Déploiement](#déploiement)
  - [Préparer le build](#préparer-le-build)
  - [Envoyer le build à Firebase](#envoyer-le-build-à-firebase)
- [Image de marque](#image-de-marque)
  - [Couleurs](#couleurs)

# Développement

## Installation des dépendances

Exécuter `npm ci`.

## Lancer l'application web

Exécuter `npm start` puis naviguer sur http://localhost:4200/.

## Versionnng avec Git

Nous utilisons le système de versioning [Git](https://git-scm.com/).

### Respect des conventions d'écriture de commits <!-- omit in toc -->

Nous utilisons 3 utilitaires nodejs : Husky + Commitlint + Conventional Commits

- [Husky](https://github.com/typicode/husky) est un utilitaire permettant de simplifier l'utilisation de hook git.
- [CommitLint](https://commitlint.js.org/) est un linter d'analyse de message de commits
- [Conventional Commits](https://www.conventionalcommits.org/fr) est une spécification de message de commits favorisant la génération de CHANGELOG.md

To ensure code quality, we follow and enforce the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
These guidelines define a Commit Message Format and certain rules that will help teams achieve consistency with version control and source code management practices.

#### Commit Message Format <!-- omit in toc -->

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### Revert <!-- omit in toc -->

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type <!-- omit in toc -->

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

#### Scope <!-- omit in toc -->

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.

The following is the list of supported scopes:

- **walkthrough-page**
- **login-page**
- **preload-image-component**

There are currently a few exceptions:

- **packaging**: used for changes that change the npm package layout in all of our packages, e.g.
  public path changes, package.json changes done to all packages, d.ts file/format changes, changes
  to bundles, etc.
- **changelog**: used for updating the release notes in CHANGELOG.md
- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

#### Subject <!-- omit in toc -->

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Body <!-- omit in toc -->

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer <!-- omit in toc -->

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Kit de démarrage : Ionic 5 Full App PRO

Le projet part du kit de démarrage [Ionic 5 Full App PRO Version](https://ionic-5-full-starter-app-docs.ionicthemes.com).

### Flaticon <!-- omit in toc -->

This template uses some icons inspired in [Flaticon](https://www.flaticon.com/). If you want to use the original icons in your app, please make sure you grab a new license that fit your use case when modifying this template. We currently use the `Free for commercial use WITH ATTRIBUTION` license in this template as a way to showcase and promote the awesome work and [designs by **catkuro** from Flaticon](https://www.flaticon.com/packs/home-decor).

## Particularités PWA

Le site web se veut de type **PWA** (Progressive Web Application) et possède donc certaines particularités d'intégration sur mobile.

Une partie de ces dernières est décrite par le [Manifeste](https://developer.mozilla.org/fr/docs/Web/Manifest).

### Modifier l'icône/le splashscreen de l'app mobile

Nous utilisons un outil nodejs [Pwa-Asset-Generator](https://github.com/onderceylan/pwa-asset-generator) qui :

- génère les tailles d'images nécessaires
- met à jour le manifeste
- met à jour l'index.html

Nous exécutons le kata suivant :

- Se placer dans le dossier cible `cd [root]/src/assets/icon`

- Si pas déjà le cas, installer pwa-asset-generator globalement : `npm install -g pwa-asset-generator`

- Lancer la commande `pwa-asset-generator ../sample-images/mon-app-icone.png -i ../../index.html -m ../../manifest.webmanifest --path "assets/icon" --single-quotes -t png`

L'outil cloud : [Maskable](https://maskable.app/) peut également s'avérer utile lors de la création de l'image de base.

## Dépannage

### See what dependencies and versions you have installed in your project <!-- omit in toc -->

This is useful to track compilation ERRORS

- Run `npm ls` to list all installed packages
- To find the installed version of a specific package run `npm list package_name` (ex: `npm list @ionic/core`)
- To find out which packages need to be updated, you can use `npm outdated -g --depth=0`
- In particular, run `ng version` to output Angular CLI version and all Angular related installed packages and versions

# Déploiement

## Préparer le build

Exécuter `npm build`.

## Envoyer le build à Firebase

Exécuter `firebase deploy`.

# Image de marque

## Couleurs

https://coolors.co/002642-840032-e59500-e5dada-02040f-b3c2f2

- #002642
- #840032
- #E59500
- #E5DADA
