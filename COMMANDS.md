# 🎮 Commandes essentielles - AI-Maturometer

## 📦 Installation & Setup

```bash
# Installation initiale (première fois)
npm install

# Vérifier les versions installées
npm list --depth=0

# Mettre à jour les dépendances (optionnel)
npm update

# Auditer les vulnérabilités
npm audit

# Corriger les vulnérabilités automatiquement
npm audit fix
```

---

## 🚀 Développement

```bash
# Démarrer le serveur de développement (http://localhost:3000)
npm run dev

# Le serveur redémarre automatiquement à chaque modification
# Ctrl+C pour arrêter
```

**Options avancées :**

```bash
# Démarrer sur un port spécifique
npm run dev -- --port 4000

# Ouvrir automatiquement le navigateur
npm run dev -- --open

# Mode host (accessible sur réseau local)
npm run dev -- --host

# Tout combiné
npm run dev -- --port 4000 --open --host
```

---

## 🏗️ Build de production

```bash
# Build optimisé pour production
npm run build

# Les fichiers générés sont dans ./dist/
# Vérifier le contenu :
ls -lh dist/

# Preview du build (http://localhost:4173)
npm run preview
```

**Analyse du bundle :**

```bash
# Installer rollup-plugin-visualizer
npm install -D rollup-plugin-visualizer

# Ajouter au vite.config.js :
# import { visualizer } from 'rollup-plugin-visualizer';
# plugins: [react(), visualizer()]

# Build avec analyse
npm run build

# Ouvrir stats.html dans le navigateur
```

---

## 🧹 Linting & Formatting

```bash
# Vérifier le code avec ESLint
npm run lint

# Corriger automatiquement les erreurs (si possible)
npx eslint . --ext js,jsx --fix

# Vérifier Tailwind CSS (classes inutilisées)
npx tailwindcss -i ./src/index.css -o ./dist/output.css --minify
```

---

## 🧪 Tests (à ajouter en v2)

```bash
# Installer Vitest + React Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Lancer les tests
npm run test

# Tests en mode watch
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

---

## 📊 Gestion des données

### LocalStorage (navigateur)

```javascript
// Ouvrir DevTools (F12) → Console

// Voir la progression en cours
localStorage.getItem('ai-maturometer-progress')

// Voir l'historique des résultats
localStorage.getItem('ai-maturometer-history')

// Supprimer la progression
localStorage.removeItem('ai-maturometer-progress')

// Supprimer l'historique
localStorage.removeItem('ai-maturometer-history')

// Tout réinitialiser
localStorage.clear()

// Taille du localStorage (en caractères)
JSON.stringify(localStorage).length
```

### Manipulation du quiz-data.json

```bash
# Vérifier la syntaxe JSON
npx jsonlint src/data/quiz-data.json

# Formater joliment le JSON
npx prettier --write src/data/quiz-data.json

# Compter les questions
cat src/data/quiz-data.json | grep '"id":' | wc -l
```

---

## 🎨 Personnalisation rapide

### Changer les couleurs Tailwind

```bash
# Éditer tailwind.config.js
code tailwind.config.js

# Relancer le serveur pour voir les changements
npm run dev
```

### Ajouter une question

```bash
# Éditer quiz-data.json
code src/data/quiz-data.json

# Vérifier la syntaxe
npx jsonlint src/data/quiz-data.json

# Relancer le serveur
npm run dev
```

---

## 🚢 Déploiement

### Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer (première fois)
vercel

# Redéployer en production
vercel --prod
```

### Netlify

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod
```

### GitHub Pages

```bash
# Installer gh-pages
npm install -D gh-pages

# Ajouter au package.json :
# "homepage": "https://USERNAME.github.io/REPO_NAME",
# "scripts": {
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d dist"
# }

# Mettre à jour vite.config.js :
# base: '/REPO_NAME/'

# Déployer
npm run deploy
```

### Docker

```bash
# Build de l'image Docker
docker build -t ai-maturometer .

# Lancer le container
docker run -p 80:80 ai-maturometer

# Accéder à http://localhost
```

---

## 🔧 Maintenance

### Mettre à jour les dépendances

```bash
# Vérifier les dépendances obsolètes
npm outdated

# Mettre à jour toutes les dépendances mineures
npm update

# Mettre à jour une dépendance spécifique
npm install react@latest react-dom@latest

# Mettre à jour Vite
npm install vite@latest

# Mettre à jour Tailwind CSS
npm install tailwindcss@latest autoprefixer@latest postcss@latest
```

### Nettoyer le projet

```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstaller proprement
npm install

# Supprimer le cache npm
npm cache clean --force

# Supprimer dist/
rm -rf dist

# Rebuild
npm run build
```

---

## 📈 Performance & Optimisation

### Analyser les performances

```bash
# Build de production
npm run build

# Lancer le preview
npm run preview

# Ouvrir DevTools → Lighthouse
# Générer le rapport
```

### Optimiser les images (si vous en ajoutez)

```bash
# Installer imagemin
npm install -D vite-plugin-imagemin

# Ajouter au vite.config.js
```

### Lazy loading des composants (v2)

```javascript
// Dans App.jsx
const ResultsDashboard = lazy(() => import('./components/ResultsDashboard'));

<Suspense fallback={<div>Chargement...</div>}>
  <ResultsDashboard />
</Suspense>
```

---

## 🐛 Debugging

### Mode debug React

```bash
# Installer React DevTools extension (navigateur)
# Chrome: https://chrome.google.com/webstore
# Firefox: https://addons.mozilla.org/firefox

# Lancer en mode développement
npm run dev

# Ouvrir DevTools → Components / Profiler
```

### Logs détaillés Vite

```bash
# Démarrer avec logs debug
DEBUG=vite:* npm run dev

# Voir les transformations de modules
npm run dev -- --debug
```

### Analyser les erreurs de build

```bash
# Build avec stack trace complète
npm run build -- --debug

# Build sans minification (pour débugger)
npm run build -- --minify false
```

---

## 📦 Gestion de versions

### Initialiser Git (si pas déjà fait)

```bash
# Initialiser le repo
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - AI-Maturometer v1.0"

# Créer un tag de version
git tag -a v1.0.0 -m "Version 1.0.0 - MVP"
```

### Workflow Git recommandé

```bash
# Créer une branche pour une nouvelle feature
git checkout -b feature/add-questions

# Modifier les fichiers
code src/data/quiz-data.json

# Commit
git add .
git commit -m "feat: Add 10 new questions for legal domain"

# Merger dans main
git checkout main
git merge feature/add-questions

# Push vers GitHub
git push origin main
git push --tags
```

---

## 🔍 Recherche dans le code

```bash
# Rechercher dans tous les fichiers
grep -r "calculateQuestionScore" src/

# Rechercher uniquement dans les .jsx
find src -name "*.jsx" -exec grep -H "useState" {} \;

# Compter les occurrences d'un mot
grep -r "danger" src/ | wc -l

# Trouver les TODO
grep -rn "TODO" src/
```

---

## 📊 Statistiques du projet

```bash
# Nombre de lignes de code (sans node_modules)
find src -name "*.jsx" -o -name "*.js" | xargs wc -l

# Nombre de lignes CSS
wc -l src/index.css

# Nombre total de fichiers
find . -type f -not -path "*/node_modules/*" | wc -l

# Taille du projet (sans node_modules)
du -sh . --exclude=node_modules

# Taille du build
du -sh dist/
```

---

## 🔐 Sécurité

```bash
# Audit de sécurité npm
npm audit

# Audit avec détails
npm audit --json

# Installer snyk pour audit avancé
npm install -g snyk
snyk test

# Vérifier les licences
npm install -g license-checker
license-checker --summary
```

---

## 🌐 Variables d'environnement

```bash
# Créer .env.local (ignoré par Git)
echo "VITE_APP_NAME=AI-Maturometer" > .env.local
echo "VITE_VERSION=1.0.0" >> .env.local

# Utiliser dans le code
console.log(import.meta.env.VITE_APP_NAME)

# Build avec variables d'environnement
VITE_API_URL=https://api.example.com npm run build
```

---

## 📱 Test sur différents navigateurs

```bash
# Installer Playwright pour tests cross-browser
npm install -D @playwright/test

# Initialiser Playwright
npx playwright install

# Lancer le serveur et tester
npm run dev &
npx playwright test
```

---

## 🎯 Commandes one-liner utiles

```bash
# Installation + Build + Preview en une commande
npm install && npm run build && npm run preview

# Nettoyer et réinstaller tout
rm -rf node_modules package-lock.json dist && npm install && npm run build

# Compter le nombre de composants
find src/components -name "*.jsx" | wc -l

# Trouver les fichiers les plus gros
find src -type f -exec du -h {} + | sort -rh | head -n 10

# Vérifier si le port 3000 est déjà utilisé (Linux/Mac)
lsof -i :3000

# Vérifier si le port 3000 est déjà utilisé (Windows)
netstat -ano | findstr :3000
```

---

## 💡 Tips & astuces

### Hot reload ne fonctionne pas

```bash
# Redémarrer le serveur
# Ctrl+C puis npm run dev

# Vider le cache du navigateur
# Ctrl+Shift+R (hard reload)

# Vérifier vite.config.js
code vite.config.js
```

### Build échoue

```bash
# Vérifier la syntaxe ESLint
npm run lint

# Supprimer dist/ et rebuilder
rm -rf dist && npm run build

# Vérifier les imports manquants
grep -r "import.*from" src/ | grep -v "node_modules"
```

### LocalStorage ne se sauvegarde pas

```javascript
// Vérifier dans DevTools → Application → Local Storage
// Vérifier que le domaine est correct (localhost:3000)

// Tester manuellement
localStorage.setItem('test', 'ok')
localStorage.getItem('test')
```

---

## 📚 Ressources utiles

```bash
# Documentation officielle
open https://react.dev
open https://vitejs.dev
open https://tailwindcss.com

# Stack Overflow
open https://stackoverflow.com/questions/tagged/react

# GitHub du projet (si vous en créez un)
git remote -v
```

---

**Commandes les plus utilisées (Top 5) :**

1. `npm install` - Installation initiale
2. `npm run dev` - Développement
3. `npm run build` - Build production
4. `npm run lint` - Vérification code
5. `npm run preview` - Preview du build

---

**Raccourcis clavier utiles en développement :**

- `Ctrl+C` - Arrêter le serveur
- `Ctrl+Shift+R` - Hard reload navigateur
- `F12` - Ouvrir DevTools
- `Ctrl+Shift+I` - Ouvrir DevTools (alt)
- `Ctrl+Shift+M` - Mode responsive (DevTools)

---

*Dernière mise à jour : Janvier 2026*
