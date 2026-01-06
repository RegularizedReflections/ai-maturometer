# 🚀 Quick Start - AI-Maturometer

## Installation en 3 commandes

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir http://localhost:3000 dans votre navigateur
```

Le serveur démarre automatiquement sur `http://localhost:3000`

---

## 🎮 Test du flow complet

### Étape 1 : Page d'accueil
- Lire la présentation du concept "Double input"
- Comprendre la matrice de scoring
- Cliquer sur "Démarrer l'évaluation"

### Étape 2 : Quiz (5 questions)
Pour chaque question :
1. **Lire l'énoncé** attentivement
2. **Sélectionner une réponse** (A/B/C/D)
3. **Choisir votre certitude** (Faible/Moyen/Élevé)
4. **Valider** pour passer à la suivante

⚠️ Vous ne pouvez pas continuer sans renseigner les 2 inputs

### Étape 3 : Résultats
Après la dernière question, vous accédez au dashboard :
- **Score global** avec niveau de maturité
- **Radar Chart** visualisant les 5 domaines
- **Danger Zone Alert** si certitudes erronées
- **Top 3 domaines** à renforcer
- **Recommandations** personnalisées

---

## 📁 Structure des fichiers principaux

```
src/
├── App.jsx                    # Point d'entrée, gestion des vues
├── data/
│   └── quiz-data.json         # ⭐ Questions du quiz (à personnaliser)
├── utils/
│   └── scoring.js             # ⭐ Logique de calcul (matrice Dunning-Kruger)
├── components/
│   ├── QuizCard.jsx           # Affichage question
│   ├── ConfidenceSelector.jsx # Sélecteur de certitude
│   ├── ResultsDashboard.jsx   # Page de résultats
│   └── RadarChart.jsx         # Graphique 5 axes
└── hooks/
    └── useQuiz.js             # State management
```

---

## 🎨 Personnalisation rapide

### Changer les couleurs (Tailwind)

Éditez `tailwind.config.js` :

```javascript
colors: {
  primary: '#2563eb',  // Votre couleur primaire
  secondary: '#6366f1', // Votre couleur secondaire
  // ...
}
```

### Ajouter des questions

Éditez `src/data/quiz-data.json` :

```json
{
  "id": 6,
  "text": "Votre question ici ?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 1,  // Index de la bonne réponse (0-3)
  "domain": "legal",   // legal | ethics | risks | finops | governance
  "level": "praticien", // novice | praticien | expert
  "explanation": "Explication détaillée de la bonne réponse"
}
```

### Modifier le scoring

Éditez `src/utils/scoring.js` - Fonction `calculateQuestionScore()` :

```javascript
if (isCorrect) {
  switch (confidence) {
    case 'high': return 10;  // Modifiez ces valeurs
    case 'medium': return 5;
    case 'low': return 2;
  }
} else {
  switch (confidence) {
    case 'low': return 0;
    case 'medium': return -5;
    case 'high': return -20;  // Pénalité Dunning-Kruger
  }
}
```

---

## 🐛 Debugging

### Vérifier les données sauvegardées

Ouvrez la console du navigateur (F12) :

```javascript
// Voir la progression en cours
localStorage.getItem('ai-maturometer-progress')

// Voir l'historique des résultats
localStorage.getItem('ai-maturometer-history')

// Réinitialiser
localStorage.clear()
```

### Erreurs communes

**Erreur : "Cannot find module 'quiz-data.json'"**
→ Vérifiez que le fichier existe dans `src/data/`

**Erreur : "Unexpected token in JSON"**
→ Validez votre JSON sur jsonlint.com

**Warning : "Chunk size > 500kB"**
→ Normal pour le MVP, optimisable en v2 avec code splitting

---

## 📦 Build de production

```bash
# Build optimisé
npm run build

# Preview du build local
npm run preview

# Les fichiers sont dans ./dist/
```

---

## 🔧 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (hot reload) |
| `npm run build` | Build de production |
| `npm run preview` | Preview du build de production |
| `npm run lint` | Vérification ESLint |

---

## 🎯 Test de la logique de scoring

### Scénario 1 : Profil Expert
- Question 1 : Bonne réponse + Certitude Élevée → **+10**
- Question 2 : Bonne réponse + Certitude Élevée → **+10**
- Question 3 : Bonne réponse + Certitude Moyenne → **+5**
- Question 4 : Bonne réponse + Certitude Élevée → **+10**
- Question 5 : Bonne réponse + Certitude Élevée → **+10**
- **Total : 45/50 = 90% → Expert**

### Scénario 2 : Profil Danger
- Question 1 : Fausse réponse + Certitude Élevée → **-20** 🚨
- Question 2 : Fausse réponse + Certitude Élevée → **-20** 🚨
- Question 3 : Bonne réponse + Certitude Faible → **+2**
- Question 4 : Fausse réponse + Certitude Moyenne → **-5**
- Question 5 : Bonne réponse + Certitude Moyenne → **+5**
- **Total : -38/50 = -76% → Risque critique**

### Scénario 3 : Profil Novice prudent
- Question 1 : Fausse réponse + Certitude Faible → **0**
- Question 2 : Fausse réponse + Certitude Faible → **0**
- Question 3 : Bonne réponse + Certitude Faible → **+2**
- Question 4 : Fausse réponse + Certitude Faible → **0**
- Question 5 : Bonne réponse + Certitude Moyenne → **+5**
- **Total : 7/50 = 14% → Novice** (pas de danger)

---

## 📞 Support

- **Issues** : Ouvrez une issue GitHub
- **Documentation** : Consultez README.md
- **Roadmap** : Voir ROADMAP.md pour les évolutions

---

**Temps estimé de setup : 2 minutes**
**Temps de test complet : 5 minutes**

Bon quiz ! 🧠
