# AI-Maturometer 🧠

## Évaluation de maturité IA pour consultants ESN

Un outil d'évaluation innovant qui mesure la maturité des consultants sur la **Gouvernance & Déploiement Responsable de l'IA** (RGPD, AI Act, Éthique, Risques, FinOps).

### 🎯 Concept unique : Double input

Pour chaque question, l'utilisateur doit renseigner :
1. **Sa réponse** (A/B/C/D)
2. **Son niveau de certitude** (Faible/Moyen/Élevé)

Cette approche permet de détecter les **profils "Dunning-Kruger"** : ceux qui sont certains mais se trompent.

### ⚠️ Logique de scoring - Matrice de risque

| Réponse   | Certitude | Points | Diagnostic             |
|-----------|-----------|--------|------------------------|
| Correcte  | Élevée    | **+10**| Expert fiable          |
| Correcte  | Moyenne   | +5     | Bonne intuition        |
| Correcte  | Faible    | +2     | Chance/Prudence        |
| Fausse    | Faible    | 0      | Ignorance saine        |
| Fausse    | Moyenne   | -5     | Confusion              |
| Fausse    | Élevée    | **-20**| 🚨 Danger Dunning-Kruger|

**La pénalité -20 est critique** : être certain ET se tromper est plus dangereux que d'ignorer.

### 📊 5 Domaines évalués

1. **Réglementation** - RGPD, AI Act, transferts de données
2. **Éthique & Trust** - Biais algorithmiques, fairness, transparence
3. **Risques Opérationnels** - Hallucinations, sécurité, human-in-the-loop
4. **FinOps & Coûts** - Optimisation tokens, caching, monitoring
5. **Gouvernance** - Shadow AI, politiques d'usage, conformité

### 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build
```

### 🛠️ Stack technique

- **React 18** + **Vite** (Setup moderne et rapide)
- **Tailwind CSS** (Design system professionnel)
- **Recharts** (Visualisation Radar Chart)
- **Lucide React** (Icônes)
- **LocalStorage** (Persistence des données)

### 📁 Structure du projet

```
/src
├── /components
│   ├── QuizCard.jsx          # Affichage question + options
│   ├── ConfidenceSelector.jsx # Sélecteur de certitude
│   ├── ProgressBar.jsx        # Barre de progression
│   ├── ResultsDashboard.jsx   # Dashboard de résultats
│   ├── RadarChart.jsx         # Visualisation 5 axes
│   └── DangerZoneAlert.jsx    # Alerte profils dangereux
├── /data
│   └── quiz-data.json         # Questions structurées
├── /utils
│   └── scoring.js             # Logique de calcul
├── /hooks
│   └── useQuiz.js             # State management
├── App.jsx
└── main.jsx
```

### 📝 Fonctionnalités

#### Quiz Flow
- Page d'accueil avec présentation du concept
- Navigation séquentielle (impossible de revenir en arrière)
- Validation obligatoire des 2 inputs avant de continuer
- Barre de progression visuelle
- Timer optionnel (15 min recommandé)

#### Dashboard Résultats
- **Score global** avec niveau de maturité :
  - < 0% : Risque critique
  - 0-30% : Novice
  - 31-60% : Initié
  - 61-80% : Praticien
  - 81-100% : Expert
- **Radar chart** à 5 axes (un par domaine)
- **Danger Zone Alert** : Liste des questions Faux + Certitude Élevée
- **Top 3 des domaines** à renforcer
- **Recommandations personnalisées** par profil

#### Persistence
- Sauvegarde automatique dans localStorage
- Reprise d'un quiz interrompu
- Historique des 5 derniers passages

### 🎨 Design System

**Palette de couleurs :**
- Primary : `#2563eb` (Blue 600)
- Secondary : `#6366f1` (Indigo 500)
- Neutral : `#334155` (Slate 700)
- Success : `#22c55e` (Green 500)
- Warning : `#f97316` (Orange 500)
- Danger : `#dc2626` (Red 600)

**Typographie :**
- Headings : `font-bold`, `text-2xl/3xl`
- Body : `font-normal`, `text-base`
- Captions : `font-medium`, `text-sm`

### 🎓 Cas d'usage

**Objectif business :**
Détecter les consultants qui présentent un risque dans leurs missions IA :
- Ceux qui croient maîtriser mais se trompent (Dunning-Kruger)
- Identifier les axes de formation prioritaires
- Éviter les incidents en production liés à des décisions mal informées

**Public cible :**
- Consultants en ESN travaillant sur des projets IA
- Managers souhaitant évaluer leurs équipes
- Responsables formation pour cibler les besoins

### 📄 Licence

MIT - Projet MVP pour démonstration

### 👨‍💻 Auteur

Développé avec Claude Sonnet 4.5 pour un consultant ESN spécialisé en Gouvernance IA.
