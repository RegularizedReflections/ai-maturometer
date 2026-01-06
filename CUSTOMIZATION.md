# 🎨 Guide de personnalisation - AI-Maturometer

## 📝 Ajouter des questions

### Étape 1 : Éditer quiz-data.json

Fichier : `src/data/quiz-data.json`

```json
{
  "id": 6,
  "text": "Votre question complète ici ?",
  "options": [
    "Option A - Première réponse possible",
    "Option B - Deuxième réponse possible",
    "Option C - Troisième réponse possible",
    "Option D - Quatrième réponse possible"
  ],
  "correctAnswer": 1,  // Index 0-3 (ici B est correct)
  "domain": "legal",   // legal | ethics | risks | finops | governance
  "level": "praticien", // novice | praticien | expert
  "explanation": "Explication détaillée de pourquoi la réponse B est correcte. Contexte juridique, cas d'usage, références."
}
```

### Bonnes pratiques pour rédiger des questions

#### Structure d'une question efficace
1. **Contexte réaliste** : Situation de consulting concrète
2. **4 options plausibles** : Éviter les réponses évidentes
3. **Une seule réponse correcte** : Pas d'ambiguïté
4. **Explication pédagogique** : Pourquoi les autres sont fausses

#### Exemple de question BIEN rédigée
```json
{
  "text": "Un client bancaire souhaite déployer un chatbot client sur GPT-4 via Azure OpenAI. Il demande si les conversations seront utilisées pour entraîner le modèle. Que répondez-vous ?",
  "options": [
    "Oui, toutes les conversations alimentent l'entraînement du modèle",
    "Non, Azure OpenAI garantit que les données client ne sont jamais utilisées pour l'entraînement",
    "Uniquement si le client active explicitement le partage de données",
    "Les métadonnées sont partagées, mais pas le contenu des messages"
  ],
  "correctAnswer": 1,
  "domain": "legal",
  "level": "praticien",
  "explanation": "Azure OpenAI garantit contractuellement que les données client ne sont JAMAIS utilisées pour entraîner les modèles de base (contrairement à l'API publique OpenAI standard). C'est un argument commercial clé pour les secteurs régulés (banque, santé)."
}
```

#### Exemple de question MAL rédigée (à éviter)
```json
{
  "text": "Le RGPD est-il important pour l'IA ?",
  "options": [
    "Oui",
    "Non",
    "Peut-être",
    "Je ne sais pas"
  ],
  "correctAnswer": 0,
  "explanation": "Oui car c'est important."
}
```

❌ Problèmes :
- Question trop vague
- Options pas réalistes
- Pas de contexte métier
- Explication insuffisante

---

## 🎯 Modifier le scoring

### Fichier : `src/utils/scoring.js`

#### Fonction principale : `calculateQuestionScore()`

```javascript
export function calculateQuestionScore(isCorrect, confidence) {
  if (isCorrect) {
    // Réponse CORRECTE
    switch (confidence) {
      case 'high':
        return 10;  // ⬅️ MODIFIER ICI
      case 'medium':
        return 5;   // ⬅️ MODIFIER ICI
      case 'low':
        return 2;   // ⬅️ MODIFIER ICI
      default:
        return 0;
    }
  } else {
    // Réponse FAUSSE
    switch (confidence) {
      case 'low':
        return 0;   // ⬅️ MODIFIER ICI
      case 'medium':
        return -5;  // ⬅️ MODIFIER ICI
      case 'high':
        return -20; // ⬅️ MODIFIER ICI (pénalité Dunning-Kruger)
      default:
        return 0;
    }
  }
}
```

### Exemples de matrices alternatives

#### Matrice "Douce" (encouragement)
```javascript
// Récompense plus, pénalise moins
case 'high': return 15;   // Correct + Élevé
case 'medium': return 8;
case 'low': return 3;

case 'low': return 0;     // Faux + Faible
case 'medium': return -3;
case 'high': return -10;  // Faux + Élevé (moins sévère)
```

#### Matrice "Stricte" (détection agressive)
```javascript
// Pénalité encore plus forte sur Dunning-Kruger
case 'high': return 10;
case 'medium': return 4;
case 'low': return 1;

case 'low': return 0;
case 'medium': return -8;
case 'high': return -30;  // ⚠️ Très sévère
```

#### Matrice "Binaire" (simplifié)
```javascript
// Seulement 2 niveaux
if (isCorrect) {
  return confidence === 'high' ? 10 : 5;
} else {
  return confidence === 'high' ? -20 : 0;
}
```

---

## 🏆 Modifier les niveaux de maturité

### Fichier : `src/utils/scoring.js`

#### Fonction : `getMaturityLevel(percentage)`

```javascript
export function getMaturityLevel(percentage) {
  if (percentage < 0) {
    return {
      level: 'Risque critique',           // ⬅️ Nom du niveau
      color: 'danger',                    // ⬅️ Couleur badge
      description: 'Votre description',   // ⬅️ Message affiché
      icon: 'alert-triangle'              // ⬅️ Icône Lucide
    };
  } else if (percentage <= 30) {
    // ...
  }
  // etc.
}
```

### Exemple : Ajout d'un niveau intermédiaire

```javascript
export function getMaturityLevel(percentage) {
  if (percentage < 0) {
    return { level: 'Risque critique', color: 'danger', ... };
  } else if (percentage <= 20) {
    return { level: 'Débutant', color: 'warning', ... };
  } else if (percentage <= 40) {
    return { level: 'Novice', color: 'warning', ... };     // ⬅️ NOUVEAU
  } else if (percentage <= 60) {
    return { level: 'Initié', color: 'primary', ... };
  } else if (percentage <= 75) {
    return { level: 'Praticien', color: 'secondary', ... }; // ⬅️ NOUVEAU
  } else if (percentage <= 90) {
    return { level: 'Expert', color: 'success', ... };
  } else {
    return { level: 'Master', color: 'success', ... };      // ⬅️ NOUVEAU
  }
}
```

---

## 🎨 Personnaliser les couleurs

### Fichier : `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#2563eb', // ⬅️ Votre couleur primaire
        hover: '#1d4ed8',
      },
      secondary: {
        DEFAULT: '#6366f1', // ⬅️ Votre couleur secondaire
        hover: '#4f46e5',
      },
      neutral: {
        DEFAULT: '#334155', // ⬅️ Couleur de texte
        light: '#64748b',
        dark: '#1e293b',
      },
      success: '#22c55e',   // ⬅️ Vert
      warning: '#f97316',   // ⬅️ Orange
      danger: '#dc2626',    // ⬅️ Rouge
    },
  },
}
```

### Exemples de palettes alternatives

#### Palette "Corporate Violet"
```javascript
primary: '#7c3aed',    // Violet
secondary: '#a855f7',  // Purple
neutral: '#1e293b',
success: '#10b981',
warning: '#f59e0b',
danger: '#ef4444',
```

#### Palette "Green Tech"
```javascript
primary: '#059669',    // Emerald
secondary: '#14b8a6',  // Teal
neutral: '#0f172a',
success: '#22c55e',
warning: '#f97316',
danger: '#dc2626',
```

---

## 📊 Ajouter un nouveau domaine

### 1. Mettre à jour `quiz-data.json`

```json
{
  "domains": [
    { "id": "legal", "name": "Réglementation", "icon": "scale" },
    { "id": "ethics", "name": "Éthique & Trust", "icon": "shield-check" },
    { "id": "risks", "name": "Risques Opérationnels", "icon": "alert-triangle" },
    { "id": "finops", "name": "FinOps & Coûts", "icon": "trending-up" },
    { "id": "governance", "name": "Gouvernance", "icon": "users" },
    // ⬇️ NOUVEAU DOMAINE
    { "id": "technical", "name": "Architecture Technique", "icon": "cpu" }
  ]
}
```

### 2. Ajouter des questions pour ce domaine

```json
{
  "id": 6,
  "text": "Question technique sur l'architecture IA...",
  "options": [...],
  "correctAnswer": 1,
  "domain": "technical",  // ⬅️ Utiliser le nouveau ID
  "level": "expert",
  "explanation": "..."
}
```

### 3. Mettre à jour les recommandations

Fichier : `src/utils/scoring.js`

```javascript
function getTrainingRecommendation(domainId) {
  const trainings = {
    legal: 'Formation RGPD + AI Act...',
    ethics: 'Formation Éthique IA...',
    risks: 'Formation Risk Management IA...',
    finops: 'Formation FinOps IA...',
    governance: 'Formation Gouvernance IA...',
    // ⬇️ NOUVEAU
    technical: 'Formation Architecture IA : Modèles, vectorisation, RAG, fine-tuning.'
  };
  return trainings[domainId] || 'Formation générale...';
}
```

---

## ⏱️ Modifier le timer

### Fichier : `src/App.jsx`

```javascript
// Ligne ~50 environ
<p className="text-sm text-neutral-light">
  Temps écoulé : {quiz.elapsedTime} min
  {quiz.elapsedTime > 15 && (  // ⬅️ MODIFIER ICI (en minutes)
    <span className="ml-2 text-warning font-medium">
      (Temps recommandé dépassé)
    </span>
  )}
</p>
```

### Ajouter un timer strict (bloquant)

Dans `src/hooks/useQuiz.js`, ajouter :

```javascript
const MAX_TIME_MINUTES = 15;

useEffect(() => {
  if (!startTime || isCompleted) return;

  const timer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 60000);
    if (elapsed >= MAX_TIME_MINUTES) {
      // Forcer la fin du quiz
      setIsCompleted(true);
      alert('Temps écoulé ! Le quiz est terminé automatiquement.');
    }
  }, 1000);

  return () => clearInterval(timer);
}, [startTime, isCompleted]);
```

---

## 🌐 Traduire l'interface (i18n)

### Approche simple avec fichiers JSON

Créez `src/i18n/fr.json` :

```json
{
  "welcome": {
    "title": "AI-Maturometer",
    "subtitle": "Évaluez votre maturité sur la Gouvernance IA",
    "startButton": "Démarrer l'évaluation"
  },
  "quiz": {
    "question": "Question",
    "of": "sur",
    "timeElapsed": "Temps écoulé"
  }
}
```

Créez `src/i18n/en.json` :

```json
{
  "welcome": {
    "title": "AI-Maturometer",
    "subtitle": "Assess your AI Governance maturity",
    "startButton": "Start assessment"
  },
  "quiz": {
    "question": "Question",
    "of": "of",
    "timeElapsed": "Time elapsed"
  }
}
```

### Utilisation dans les composants

```javascript
import translations from './i18n/fr.json';

function WelcomePage() {
  const t = translations;
  return (
    <h1>{t.welcome.title}</h1>
  );
}
```

---

## 📱 Personnaliser le nom et metadata

### Fichier : `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- ⬇️ MODIFIER ICI -->
  <title>Votre Titre | Évaluation IA</title>
  <meta name="description" content="Votre description personnalisée" />
  <meta name="keywords" content="IA, Gouvernance, RGPD, AI Act" />

  <!-- Open Graph (partage social) -->
  <meta property="og:title" content="AI-Maturometer" />
  <meta property="og:description" content="Évaluez votre maturité en Gouvernance IA" />
  <meta property="og:image" content="/og-image.png" />

  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
</head>
```

---

## 🔧 Configuration avancée

### Désactiver la persistence localStorage

Fichier : `src/hooks/useQuiz.js`

Commentez les fonctions de sauvegarde :

```javascript
// useEffect(() => {
//   const savedProgress = loadProgress();
//   ...
// }, []);

// useEffect(() => {
//   if (answers.length > 0 && !isCompleted) {
//     saveProgress(...);
//   }
// }, [currentQuestionIndex, answers, startTime, isCompleted]);
```

### Activer le mode anonyme (pas d'historique)

Fichier : `src/utils/scoring.js`

```javascript
export function saveResultsToHistory(results) {
  // return []; // ⬅️ Décommenter pour désactiver

  // ... code original
}
```

---

## 📊 Exporter en CSV au lieu de JSON

Fichier : `src/components/ResultsDashboard.jsx`

Remplacez la fonction d'export :

```javascript
onClick={() => {
  // Créer CSV
  const csv = [
    ['Domaine', 'Score', 'Questions correctes', 'Total'],
    ...Object.entries(results.domainScores).map(([domain, score]) => {
      const stats = results.domainStats[domain];
      return [domain, score, stats.correct, stats.total];
    })
  ].map(row => row.join(',')).join('\n');

  const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', `results-${new Date().toISOString()}.csv`);
  link.click();
}}
```

---

## 🎨 Changer la police

### Fichier : `src/index.css`

Remplacez l'import Google Fonts :

```css
/* Ancienne police */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* ⬇️ Nouvelle police (exemples) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
/* ou */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
```

Mettez à jour `tailwind.config.js` :

```javascript
fontFamily: {
  sans: ['Poppins', 'system-ui', 'sans-serif'], // ⬅️ MODIFIER ICI
},
```

---

## 📞 Support

Pour toute personnalisation avancée non documentée :
- Consultez la documentation React : https://react.dev
- Tailwind CSS : https://tailwindcss.com/docs
- Recharts : https://recharts.org/en-US

---

**Bonne personnalisation ! 🎨**
