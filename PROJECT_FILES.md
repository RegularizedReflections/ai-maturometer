# 📁 Structure complète du projet AI-Maturometer

## Arborescence des fichiers

```
ai-maturometer/
│
├── 📄 Configuration & Build
│   ├── package.json              # Dépendances et scripts npm
│   ├── package-lock.json         # Versions verrouillées
│   ├── vite.config.js            # Configuration Vite
│   ├── tailwind.config.js        # Configuration Tailwind CSS
│   ├── postcss.config.js         # Configuration PostCSS
│   ├── eslint.config.js          # Configuration ESLint
│   └── .gitignore                # Fichiers à ignorer par Git
│
├── 📄 Documentation (6 fichiers)
│   ├── README.md                 # Documentation principale
│   ├── QUICKSTART.md             # Démarrage rapide (3 min)
│   ├── PROJECT_SUMMARY.md        # Synthèse complète du MVP
│   ├── CUSTOMIZATION.md          # Guide de personnalisation
│   ├── DEPLOYMENT.md             # Guide de déploiement
│   ├── ROADMAP.md                # Évolutions v1.5 → v3.0
│   └── PROJECT_FILES.md          # Ce fichier
│
├── 📄 HTML
│   └── index.html                # Point d'entrée HTML
│
├── 📁 public/
│   └── vite.svg                  # Favicon personnalisé
│
└── 📁 src/
    ├── main.jsx                  # Point d'entrée React
    ├── App.jsx                   # Composant principal
    ├── index.css                 # Styles globaux + Tailwind
    │
    ├── 📁 components/ (6 composants)
    │   ├── QuizCard.jsx          # Carte de question avec options
    │   ├── ConfidenceSelector.jsx # Sélecteur de certitude (3 boutons)
    │   ├── ProgressBar.jsx        # Barre de progression visuelle
    │   ├── ResultsDashboard.jsx   # Dashboard complet de résultats
    │   ├── RadarChart.jsx         # Graphique radar 5 axes (Recharts)
    │   └── DangerZoneAlert.jsx    # Alerte profils Dunning-Kruger
    │
    ├── 📁 data/
    │   └── quiz-data.json         # ⭐ Questions du quiz (5 questions)
    │
    ├── 📁 hooks/
    │   └── useQuiz.js             # Hook de state management
    │
    └── 📁 utils/
        └── scoring.js             # ⭐ Logique de scoring Dunning-Kruger
```

---

## 📊 Statistiques du projet

### Fichiers par catégorie

| Catégorie | Nombre | Fichiers |
|-----------|--------|----------|
| **Documentation** | 7 | README, QUICKSTART, PROJECT_SUMMARY, CUSTOMIZATION, DEPLOYMENT, ROADMAP, PROJECT_FILES |
| **Configuration** | 7 | package.json, vite.config.js, tailwind.config.js, postcss.config.js, eslint.config.js, .gitignore, package-lock.json |
| **HTML** | 1 | index.html |
| **React (JSX)** | 8 | App.jsx, main.jsx, 6 composants |
| **JavaScript** | 2 | useQuiz.js, scoring.js |
| **CSS** | 1 | index.css |
| **JSON** | 1 | quiz-data.json |
| **Assets** | 1 | vite.svg |
| **TOTAL** | **28** | fichiers sources |

### Lignes de code (estimation)

| Type | Lignes | % |
|------|--------|---|
| JavaScript/JSX | ~1800 | 75% |
| CSS | ~200 | 8% |
| JSON | ~150 | 6% |
| Configuration | ~150 | 6% |
| HTML | ~20 | 1% |
| Documentation | ~1500 | (séparé) |

**Total code source : ~2320 lignes**
**Total documentation : ~1500 lignes**

---

## 📄 Détail des fichiers principaux

### Configuration (Root)

#### `package.json`
- **Rôle** : Définition du projet, dépendances, scripts
- **Dépendances clés** :
  - `react` + `react-dom` : Framework UI
  - `lucide-react` : Icônes
  - `recharts` : Graphiques
  - `tailwindcss` : Styling
  - `vite` : Bundler
- **Scripts** :
  - `dev` : Serveur de développement
  - `build` : Build de production
  - `preview` : Preview du build

#### `vite.config.js`
- Configuration Vite
- Plugin React
- Port 3000 par défaut

#### `tailwind.config.js`
- **Design system personnalisé** :
  - Couleurs (primary, secondary, neutral, success, warning, danger)
  - Typographie (Inter font)
  - Content paths pour purge CSS

#### `postcss.config.js`
- Plugins : Tailwind + Autoprefixer

#### `eslint.config.js`
- Règles de linting pour React
- ESLint 9+ (flat config)

---

### Documentation

#### `README.md` (Principal)
- Présentation générale du projet
- Instructions d'installation
- Fonctionnalités
- Stack technique
- Logique de scoring

#### `QUICKSTART.md`
- Guide de démarrage en 3 minutes
- Test du flow complet
- Personnalisation rapide
- Scénarios de test

#### `PROJECT_SUMMARY.md`
- Synthèse complète du MVP
- Objectifs business
- Questions détaillées
- Checklist de validation

#### `CUSTOMIZATION.md`
- Ajouter des questions
- Modifier le scoring
- Personnaliser les couleurs
- Ajouter des domaines
- Traduction (i18n)

#### `DEPLOYMENT.md`
- Déploiement Vercel/Netlify/GitHub Pages
- Configuration Docker
- CI/CD GitHub Actions
- Variables d'environnement

#### `ROADMAP.md`
- v1.5 : Améliorations UX (20 questions, PDF)
- v2.0 : Backend + collaboration
- v3.0 : IA adaptative
- Backlog fonctionnel

---

### Source Code

#### `src/main.jsx`
- Point d'entrée React
- Rendu du composant `<App />`
- StrictMode activé

#### `src/App.jsx` (500 lignes)
- **Composant principal**
- Gestion des 3 vues :
  1. WelcomePage (présentation)
  2. Quiz (questions)
  3. ResultsDashboard (résultats)
- Hook `useQuiz` pour le state
- Composant `WelcomePage` intégré

#### `src/index.css` (250 lignes)
- Import Tailwind directives
- Import Google Fonts (Inter)
- Classes utilitaires personnalisées :
  - `.btn-primary`, `.btn-secondary`, `.btn-outline`
  - `.card`
  - `.quiz-option`, `.quiz-option-selected`
  - `.confidence-btn`, `.confidence-low/medium/high`

---

### Composants

#### `src/components/QuizCard.jsx` (120 lignes)
- **Rôle** : Affichage d'une question avec ses 4 options
- **Props** :
  - `question` : Objet question
  - `onAnswer` : Callback de validation
  - `questionNumber` : Numéro actuel
  - `totalQuestions` : Total
- **Features** :
  - Sélection d'une réponse (A/B/C/D)
  - Intégration `ConfidenceSelector`
  - Validation des 2 inputs obligatoires
  - Bouton "Question suivante" / "Voir résultats"

#### `src/components/ConfidenceSelector.jsx` (80 lignes)
- **Rôle** : Sélecteur de niveau de certitude
- **3 boutons** :
  - Faible (AlertCircle, orange)
  - Moyen (MinusCircle, blue)
  - Élevé (CheckCircle, green)
- **Props** :
  - `selected` : Niveau actuel ('low'|'medium'|'high')
  - `onSelect` : Callback de sélection

#### `src/components/ProgressBar.jsx` (60 lignes)
- **Rôle** : Barre de progression + indicateurs
- **Affichage** :
  - Texte "Question X sur Y"
  - Pourcentage
  - Barre gradient (primary → secondary)
  - 5 indicateurs circulaires numérotés

#### `src/components/ResultsDashboard.jsx` (180 lignes)
- **Rôle** : Dashboard complet des résultats
- **Sections** :
  1. Score global avec niveau de maturité
  2. DangerZoneAlert
  3. RadarChart à 5 axes
  4. Top 3 domaines à renforcer
  5. Recommandations personnalisées
  6. Actions (Recommencer, Exporter)
- **Props** :
  - `results` : Résultats calculés
  - `domains` : Domaines du quiz
  - `onRestart` : Callback recommencer

#### `src/components/RadarChart.jsx` (90 lignes)
- **Rôle** : Graphique radar à 5 axes (Recharts)
- **Affichage** :
  - Radar interactif
  - Tooltip personnalisé
  - Légende des domaines avec scores
- **Props** :
  - `domainScores` : Scores par domaine
  - `domains` : Définitions des domaines

#### `src/components/DangerZoneAlert.jsx` (140 lignes)
- **Rôle** : Alerte pour réponses Dunning-Kruger
- **2 états** :
  - ✅ Aucune zone de danger détectée (message positif)
  - 🚨 Danger détecté (liste détaillée)
- **Détails affichés** :
  - Question complète
  - Réponse choisie (fausse)
  - Bonne réponse
  - Explication pédagogique

---

### Data

#### `src/data/quiz-data.json` (150 lignes)
- **Structure** :
  - `theme` : Titre du quiz
  - `version` : Version
  - `domains` : Array de 5 domaines
  - `questions` : Array de 5 questions
- **Format d'une question** :
  ```json
  {
    "id": 1,
    "text": "Énoncé de la question",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 1,
    "domain": "legal",
    "level": "praticien",
    "explanation": "Explication détaillée"
  }
  ```

---

### Hooks

#### `src/hooks/useQuiz.js` (180 lignes)
- **Rôle** : State management complet du quiz
- **État géré** :
  - `currentQuestionIndex` : Index de la question actuelle
  - `answers` : Tableau des réponses
  - `isCompleted` : Quiz terminé ?
  - `results` : Résultats calculés
  - `startTime` : Timestamp de démarrage
- **Fonctions exposées** :
  - `submitAnswer()` : Enregistrer une réponse
  - `restart()` : Recommencer le quiz
  - `getElapsedTime()` : Temps écoulé
- **Features** :
  - Sauvegarde auto localStorage
  - Chargement progression au démarrage
  - Calcul automatique des résultats

---

### Utils

#### `src/utils/scoring.js` (350 lignes)
- **⭐ CŒUR DU SYSTÈME**
- **Fonctions principales** :

##### `calculateQuestionScore(isCorrect, confidence)`
- Matrice Dunning-Kruger
- Retourne : -20 à +10 points

##### `getDiagnostic(isCorrect, confidence)`
- Retourne le label pédagogique
- Ex : "Expert fiable", "Danger Dunning-Kruger"

##### `calculateResults(answers, questions)`
- **Calcul complet** :
  - Score global (total, %, niveau)
  - Scores par domaine
  - Stats par domaine (correct/total)
  - Identification danger zone
  - Top 3 domaines faibles

##### `getMaturityLevel(percentage)`
- Retourne niveau selon score :
  - < 0% : Risque critique
  - 0-30% : Novice
  - 31-60% : Initié
  - 61-80% : Praticien
  - 81-100% : Expert

##### `generateRecommendations(results, domains)`
- Recommandations personnalisées
- 3 priorités : critical, high, medium, low

##### `saveResultsToHistory(results)`
- Sauvegarde dans localStorage
- Max 5 derniers passages

##### `getResultsHistory()`
- Récupération de l'historique

---

## 🎯 Fichiers critiques à ne jamais supprimer

| Fichier | Criticité | Raison |
|---------|-----------|--------|
| `src/data/quiz-data.json` | ⭐⭐⭐ | Contenu du quiz |
| `src/utils/scoring.js` | ⭐⭐⭐ | Logique métier |
| `src/App.jsx` | ⭐⭐⭐ | Composant racine |
| `src/hooks/useQuiz.js` | ⭐⭐⭐ | State management |
| `package.json` | ⭐⭐⭐ | Dépendances |
| `tailwind.config.js` | ⭐⭐ | Design system |
| `vite.config.js` | ⭐⭐ | Build configuration |

---

## 🔄 Flux de données

```
quiz-data.json
    ↓
useQuiz.js (hook)
    ↓
App.jsx
    ↓
QuizCard.jsx → ConfidenceSelector.jsx
    ↓
answers[] collectées
    ↓
scoring.js (calculateResults)
    ↓
ResultsDashboard.jsx
    ↓
RadarChart.jsx + DangerZoneAlert.jsx
```

---

## 📦 Dépendances npm (12 packages)

### Production
1. `react` ^18.3.1
2. `react-dom` ^18.3.1
3. `lucide-react` ^0.460.0
4. `recharts` ^2.15.0

### Développement
5. `vite` ^6.0.3
6. `@vitejs/plugin-react` ^4.3.4
7. `tailwindcss` ^3.4.17
8. `autoprefixer` ^10.4.20
9. `postcss` ^8.4.49
10. `eslint` ^9.16.0
11. `@eslint/js` (peer dep)
12. `globals` (peer dep)

**Bundle size total : ~550 KB (minified + gzipped : ~160 KB)**

---

## ✅ Checklist fichiers essentiels

- [x] Configuration build (6 fichiers)
- [x] Documentation complète (7 fichiers)
- [x] Composants React (8 fichiers)
- [x] Logique métier (2 fichiers)
- [x] Data (1 fichier)
- [x] Styles (1 fichier)
- [x] Assets (1 fichier)

**Total : 28 fichiers sources + node_modules**

---

**Projet complet et prêt pour la production ! 🚀**
