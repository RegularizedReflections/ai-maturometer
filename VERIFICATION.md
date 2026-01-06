# ✅ Checklist de vérification - AI-Maturometer MVP

## 🎯 Vérifications avant déploiement

### 1️⃣ Installation et Build

```bash
# Test 1: Installation des dépendances
npm install
# ✅ Attendu: 360 packages installés, 0 vulnérabilités
```

```bash
# Test 2: Build de production
npm run build
# ✅ Attendu: Build réussi, bundle ~550KB, dist/ créé
```

```bash
# Test 3: Serveur de développement
npm run dev
# ✅ Attendu: Serveur sur http://localhost:3000, hot reload actif
```

---

### 2️⃣ Structure des fichiers

#### Configuration (7 fichiers)
- [ ] `package.json` - Dépendances et scripts
- [ ] `vite.config.js` - Configuration Vite
- [ ] `tailwind.config.js` - Design system
- [ ] `postcss.config.js` - PostCSS + Autoprefixer
- [ ] `eslint.config.js` - Règles ESLint
- [ ] `.gitignore` - Fichiers ignorés
- [ ] `package-lock.json` - Versions verrouillées

#### Documentation (7 fichiers)
- [ ] `README.md` - Documentation principale
- [ ] `QUICKSTART.md` - Guide de démarrage rapide
- [ ] `PROJECT_SUMMARY.md` - Synthèse complète
- [ ] `CUSTOMIZATION.md` - Guide de personnalisation
- [ ] `DEPLOYMENT.md` - Guide de déploiement
- [ ] `ROADMAP.md` - Évolutions futures
- [ ] `PROJECT_FILES.md` - Structure détaillée

#### Source Code (11 fichiers)
- [ ] `index.html` - Point d'entrée HTML
- [ ] `src/main.jsx` - Point d'entrée React
- [ ] `src/App.jsx` - Composant principal
- [ ] `src/index.css` - Styles globaux
- [ ] `src/data/quiz-data.json` - Questions du quiz
- [ ] `src/hooks/useQuiz.js` - State management
- [ ] `src/utils/scoring.js` - Logique de scoring
- [ ] `src/components/QuizCard.jsx`
- [ ] `src/components/ConfidenceSelector.jsx`
- [ ] `src/components/ProgressBar.jsx`
- [ ] `src/components/ResultsDashboard.jsx`
- [ ] `src/components/RadarChart.jsx`
- [ ] `src/components/DangerZoneAlert.jsx`

#### Assets (1 fichier)
- [ ] `public/vite.svg` - Favicon

---

### 3️⃣ Test fonctionnel complet

#### Phase 1: Page d'accueil
1. [ ] Ouvrir http://localhost:3000
2. [ ] Vérifier affichage du titre "AI-Maturometer"
3. [ ] Vérifier présentation du concept "Double input"
4. [ ] Vérifier affichage de la matrice de scoring
5. [ ] Vérifier affichage des 5 domaines
6. [ ] Cliquer sur "Démarrer l'évaluation"

#### Phase 2: Quiz (Question 1)
7. [ ] Vérifier affichage "Question 1/5"
8. [ ] Vérifier barre de progression à 0%
9. [ ] Vérifier 5 indicateurs circulaires (1 actif)
10. [ ] Vérifier texte de la question
11. [ ] Vérifier 4 options (A/B/C/D)
12. [ ] Cliquer sur une option → vérifier surbrillance
13. [ ] Vérifier affichage "Quel est votre niveau de certitude ?"
14. [ ] Cliquer sur "Faible" → vérifier surbrillance orange
15. [ ] Cliquer sur "Moyen" → vérifier surbrillance bleue
16. [ ] Cliquer sur "Élevé" → vérifier surbrillance verte
17. [ ] Vérifier bouton "Question suivante" activé
18. [ ] Cliquer sur "Question suivante"

#### Phase 3: Questions 2-4
19. [ ] Répéter étapes 7-18 pour questions 2, 3, 4
20. [ ] Vérifier progression barre : 20%, 40%, 60%, 80%
21. [ ] Vérifier indicateurs circulaires s'activent
22. [ ] Vérifier timer augmente (1 min, 2 min...)

#### Phase 4: Question 5 (dernière)
23. [ ] Vérifier affichage "Question 5/5"
24. [ ] Vérifier barre de progression à 80%
25. [ ] Répondre + choisir certitude
26. [ ] Vérifier bouton "Voir les résultats" (au lieu de "Question suivante")
27. [ ] Cliquer sur "Voir les résultats"

#### Phase 5: Dashboard de résultats
28. [ ] Vérifier affichage du score global (%)
29. [ ] Vérifier affichage du niveau de maturité (badge coloré)
30. [ ] Vérifier affichage "X/50 points"
31. [ ] Vérifier description du niveau

**Test A : Profil sans danger**
32. [ ] Si 0 danger zone → Vérifier message vert "Aucune zone de danger"

**Test B : Profil avec danger**
33. [ ] Si danger zone → Vérifier alerte rouge avec compteur
34. [ ] Cliquer sur "Voir les détails" → Vérifier liste des questions
35. [ ] Vérifier affichage : Question, Votre réponse, Bonne réponse, Explication

**Radar Chart**
36. [ ] Vérifier affichage du graphique à 5 axes
37. [ ] Vérifier noms des domaines sur les axes
38. [ ] Survoler un point → Vérifier tooltip (score normalisé + brut)

**Top 3 domaines à renforcer**
39. [ ] Vérifier affichage de 3 cartes
40. [ ] Vérifier numérotation 1, 2, 3
41. [ ] Vérifier nom du domaine, score, réussite X/Y

**Recommandations**
42. [ ] Vérifier affichage de 2-3 recommandations
43. [ ] Vérifier couleurs selon priorité (critical=rouge, high=orange, medium=bleu)
44. [ ] Vérifier titres, descriptions, actions

**Actions**
45. [ ] Cliquer sur "Recommencer l'évaluation" → Vérifier retour page d'accueil
46. [ ] Refaire le quiz jusqu'aux résultats
47. [ ] Cliquer sur "Exporter les résultats" → Vérifier téléchargement JSON

---

### 4️⃣ Test de persistence

#### Sauvegarde automatique
48. [ ] Démarrer un nouveau quiz
49. [ ] Répondre à 2 questions sur 5
50. [ ] Fermer l'onglet (ou rafraîchir la page)
51. [ ] Rouvrir http://localhost:3000
52. [ ] Vérifier reprise à la question 3/5
53. [ ] Terminer le quiz

#### Historique
54. [ ] Ouvrir DevTools (F12) → Console
55. [ ] Taper : `localStorage.getItem('ai-maturometer-history')`
56. [ ] Vérifier affichage de l'historique JSON
57. [ ] Vérifier timestamp, scorePercentage, maturityLevel, dangerZoneCount

---

### 5️⃣ Test de responsive

#### Desktop (1920x1080)
58. [ ] Vérifier layout sur 3 colonnes pour recommandations
59. [ ] Vérifier radar chart grande taille
60. [ ] Vérifier boutons côte à côte

#### Tablet (768x1024)
61. [ ] Vérifier layout 2 colonnes
62. [ ] Vérifier radar chart taille moyenne
63. [ ] Vérifier navigation tactile

#### Mobile (375x667)
64. [ ] Vérifier layout 1 colonne
65. [ ] Vérifier boutons empilés verticalement
66. [ ] Vérifier texte lisible
67. [ ] Vérifier quiz utilisable au pouce

---

### 6️⃣ Test d'accessibilité

#### Navigation clavier
68. [ ] Utiliser Tab pour naviguer entre éléments
69. [ ] Vérifier focus visible sur options de réponse
70. [ ] Vérifier focus visible sur boutons de certitude
71. [ ] Appuyer sur Entrée pour sélectionner une option
72. [ ] Appuyer sur Entrée pour valider

#### Lecteur d'écran (optionnel)
73. [ ] Activer NVDA/JAWS (Windows) ou VoiceOver (Mac)
74. [ ] Vérifier lecture des questions
75. [ ] Vérifier lecture des options avec lettres A/B/C/D
76. [ ] Vérifier lecture des labels ARIA

---

### 7️⃣ Test de la logique de scoring

#### Scénario 1: Expert parfait
- Q1: Correcte + Élevé = +10
- Q2: Correcte + Élevé = +10
- Q3: Correcte + Élevé = +10
- Q4: Correcte + Élevé = +10
- Q5: Correcte + Élevé = +10
- **Total attendu: 50/50 = 100% → Expert**

77. [ ] Réaliser ce scénario
78. [ ] Vérifier score : 100%
79. [ ] Vérifier niveau : "Expert"
80. [ ] Vérifier badge vert
81. [ ] Vérifier 0 danger zone

#### Scénario 2: Profil Dunning-Kruger
- Q1: Fausse + Élevé = -20
- Q2: Fausse + Élevé = -20
- Q3: Correcte + Faible = +2
- Q4: Fausse + Moyen = -5
- Q5: Correcte + Moyen = +5
- **Total attendu: -38/50 = -76% → Risque critique**

82. [ ] Réaliser ce scénario
83. [ ] Vérifier score : <0%
84. [ ] Vérifier niveau : "Risque critique"
85. [ ] Vérifier badge rouge
86. [ ] Vérifier 2 danger zones détectées
87. [ ] Vérifier message d'alerte critique

#### Scénario 3: Novice prudent
- Q1: Fausse + Faible = 0
- Q2: Fausse + Faible = 0
- Q3: Correcte + Faible = +2
- Q4: Fausse + Faible = 0
- Q5: Correcte + Moyen = +5
- **Total attendu: 7/50 = 14% → Novice**

88. [ ] Réaliser ce scénario
89. [ ] Vérifier score : ~14%
90. [ ] Vérifier niveau : "Novice"
91. [ ] Vérifier 0 danger zone (important !)
92. [ ] Vérifier message positif sur calibrage

---

### 8️⃣ Test des questions (contenu)

#### Question 1 - Legal (CVs + API publique)
93. [ ] Vérifier texte complet
94. [ ] Vérifier 4 options cohérentes
95. [ ] Vérifier réponse correcte : B (index 1)
96. [ ] Vérifier explication RGPD/DPIA

#### Question 2 - Ethics (Chatbot "toujours positif")
97. [ ] Vérifier contexte RH clair
98. [ ] Vérifier réponse correcte : B (fairness washing)
99. [ ] Vérifier explication AI Act

#### Question 3 - Risks (Hallucination LLM)
100. [ ] Vérifier scénario panne client
101. [ ] Vérifier réponse correcte : B (responsabilité consultant)
102. [ ] Vérifier explication human oversight

#### Question 4 - FinOps (12K€/mois GPT-4)
103. [ ] Vérifier montants réalistes
104. [ ] Vérifier réponse correcte : B (cache sémantique)
105. [ ] Vérifier explication ROI -80%

#### Question 5 - Governance (Plugin non validé GitHub)
106. [ ] Vérifier contexte Shadow AI
107. [ ] Vérifier réponse correcte : B (fuite IP)
108. [ ] Vérifier explication data breach

---

### 9️⃣ Performance

#### Lighthouse (à faire sur build de production)
```bash
npm run build
npm run preview
# Ouvrir DevTools → Lighthouse → Generate report
```

109. [ ] Performance > 85
110. [ ] Accessibility > 90
111. [ ] Best Practices > 90
112. [ ] SEO > 85

#### Bundle size
113. [ ] Vérifier dist/index.html < 1 KB
114. [ ] Vérifier dist/assets/*.css < 30 KB
115. [ ] Vérifier dist/assets/*.js < 600 KB

---

### 🔟 Qualité du code

#### ESLint
```bash
npm run lint
```

116. [ ] 0 erreurs
117. [ ] < 5 warnings acceptables

#### Console navigateur
118. [ ] Ouvrir DevTools → Console
119. [ ] Vérifier 0 erreurs en mode développement
120. [ ] Vérifier 0 warnings critiques

---

## ✅ Résumé de validation

### Critique (bloquant si échoué)
- [ ] Build sans erreur
- [ ] Serveur de développement fonctionne
- [ ] Quiz complet jouable (5 questions)
- [ ] Résultats affichés correctement
- [ ] Scoring Dunning-Kruger fonctionne (-20 pour Faux+Élevé)

### Important (à corriger rapidement)
- [ ] Responsive mobile OK
- [ ] Persistence localStorage OK
- [ ] Export JSON fonctionne
- [ ] 5 questions avec explications
- [ ] Radar chart s'affiche

### Nice-to-have (optimisations futures)
- [ ] Performance Lighthouse > 90
- [ ] Accessibilité complète (WCAG AA)
- [ ] 0 warnings ESLint
- [ ] Bundle size < 500 KB

---

## 🎉 Validation finale

Si **toutes les cases critiques + importantes sont cochées**, le projet est :

✅ **PRÊT POUR LA PRODUCTION**

Vous pouvez déployer sur Vercel/Netlify en toute confiance.

---

## 🐛 Problèmes connus (v1.0)

### Limitations acceptées pour le MVP
1. **Bundle size ~550 KB** : Recharts est volumineux, optimisable en v2 avec code splitting
2. **Pas de retour arrière** : Choix UX intentionnel pour éviter la triche
3. **Timer non bloquant** : Recommandé 15 min mais pas forcé
4. **LocalStorage uniquement** : Pas de backend dans v1.0

### À corriger en v1.1 si observé
- Problème d'affichage sur Safari < 15
- Recharts ne s'affiche pas sur certains mobiles anciens
- Export JSON échoue sur IE11 (non supporté officiellement)

---

**Dernière vérification : Janvier 2026**
**Version testée : v1.0.0**
