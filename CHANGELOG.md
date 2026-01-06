# Changelog - AI-Maturometer

## [1.1.0] - Janvier 2026

### ✨ Nouvelles fonctionnalités

#### 📚 Extension massive du contenu : 15 questions couvrant tous les domaines

Le quiz a été étendu de 5 à **15 questions** pour offrir une évaluation complète et équilibrée de la maturité en gouvernance IA.

**Avant :**
- 5 questions totales (1 par domaine)
- Couverture superficielle des thématiques
- Distribution déséquilibrée

**Après :**
- **15 questions totales** (3 par domaine)
- Couverture exhaustive et approfondie
- **Distribution parfaitement équilibrée** : 3 questions × 5 domaines

**Nouvelles questions par domaine :**

**⚖️ Réglementation (Legal)** - 3 questions (IDs 1, 6, 7) :
1. **Q1 (Praticien)** : Analyse de CVs via API publique - RGPD/DPIA (existante)
2. **Q6 (Praticien)** : EU AI Act - Classification risque système RH (scoring candidatures)
3. **Q7 (Expert)** : AI Liability Directive - Responsabilité en cascade (diagnostic médical erroné)

**🛡️ Éthique & Trust** - 3 questions (IDs 2, 8, 9) :
1. **Q2 (Expert)** : Fairness washing - Chatbot RH avec règles de positivité forcée (existante)
2. **Q8 (Praticien)** : Biais algorithmiques - Scoring crédit sur données historiques discriminatoires
3. **Q9 (Expert)** : RGPD Article 22 - Droit à l'explication (refus assurance par IA)

**⚠️ Risques Opérationnels** - 3 questions (IDs 3, 10, 11) :
1. **Q3 (Praticien)** : Hallucination IA - Responsabilité juridique en cas de panne client (existante)
2. **Q10 (Initié)** : Data Quality - "Garbage In, Garbage Out" (chatbot entraîné sur tickets mal rédigés)
3. **Q11 (Praticien)** : Prompt Injection - Manipulation du comportement LLM (attaque via API publique)

**💰 FinOps & Coûts** - 3 questions (IDs 4, 12, 13) :
1. **Q4 (Praticien)** : Optimisation coûts - Cache sémantique pour 12K€/mois GPT-4 (existante)
2. **Q12 (Praticien)** : Calcul ROI - Automatisation comptes-rendus (2400% de ROI pour 200€/mois)
3. **Q13 (Expert)** : Build vs Buy - Décision stratégique modèle custom (200K€) vs API (5K€/mois)

**👥 Gouvernance** - 3 questions (IDs 5, 14, 15) :
1. **Q5 (Expert)** : Shadow AI - Plugin ChatGPT non validé sur GitHub (existante)
2. **Q14 (Initié)** : AI Governance Committee - Composition pluridisciplinaire (DSI, Legal, Métier, RSE)
3. **Q15 (Praticien)** : Change Management - Résistance collaborateurs face à automatisation (80% échecs = facteur humain)

**Caractéristiques des nouvelles questions :**
- **Scénarios réalistes** inspirés de cas réels en ESN/Consulting
- **Niveaux variés** : Initié (débutant), Praticien (intermédiaire), Expert (avancé)
- **Explications pédagogiques complètes** avec références réglementaires (AI Act, RGPD, NIST, McKinsey)
- **Vocabulaire professionnel** : TCO, ROI, DPIA, XAI, fairness washing, Not Invented Here, etc.
- **Piégeage intelligent** : options plausibles pour tester la vraie maîtrise

**Références réglementaires et académiques intégrées :**
- EU AI Act (2024) : Annexe III, classification des risques
- AI Liability Directive (proposition EU 2022)
- RGPD Article 22 (décisions automatisées)
- NIST AI Risk Management Framework (2023)
- OWASP Top 10 pour LLM (2023)
- McKinsey "Why AI projects fail" (2021)

**Thématiques nouvellement couvertes :**
- Classification des risques IA (EU AI Act)
- Responsabilité juridique en cascade
- Biais algorithmiques dans les données historiques
- Techniques XAI (SHAP, LIME) pour explicabilité
- Principe "Garbage In, Garbage Out"
- Prompt Injection (sécurité LLM)
- Méthodologie de calcul ROI pour projets IA
- Analyse Build vs Buy (TCO, time-to-market, différenciation)
- Structure d'un AI Governance Committee
- Change Management et facteur humain (70% échecs organisationnels)

**Fichiers modifiés :**
- `src/data/quiz-data.json` - Ajout de 10 nouvelles questions (IDs 6-15)

**Impact UX et pédagogique :**
- Évaluation 3× plus complète qu'avant
- Détection fine des forces et faiblesses par domaine
- Couverture exhaustive des enjeux consultants ESN
- Questions challengeantes même pour profils seniors
- Parcours d'apprentissage identifiable (initié → praticien → expert)

**Impact bundle :**
- Bundle size : 582.21 KB (augmentation de ~27 KB pour 10 questions)
- Performance : Aucun impact sur le temps de chargement

**Valeur métier :**
- Quiz utilisable en certification interne ESN
- Benchmark fiable entre consultants
- Identification précise des besoins de formation
- Questions directement réutilisables en formations/workshops
- Profils détaillés pour staffing projet IA

---

#### 🤖 Analyse IA - Recommandations personnalisées via LLM externes

Une nouvelle section "💡 Aller plus loin avec l'IA" permet aux utilisateurs d'obtenir une analyse approfondie de leurs résultats via des LLM externes (Claude, ChatGPT, Gemini).

**Problème résolu :**
- Les recommandations génériques de l'application ne tiennent pas compte du contexte individuel de chaque utilisateur
- Pas de parcours de formation détaillé et progressif
- Besoin d'un accompagnement personnalisé pour la montée en compétence

**Solution - Export intelligent vers LLM :**

**1. Prompt structuré pré-formaté**
- Template optimisé pour obtenir le meilleur des LLM
- Inclusion automatique de tous les résultats (score global, domaines, réponses détaillées)
- JSON complet des réponses avec explications
- 4 demandes structurées :
  - Diagnostic synthétique (forces + 3 faiblesses critiques)
  - Plan d'action prioritaire (3 axes de formation justifiés)
  - Ressources concrètes (articles, formations, certifications, livres)
  - Roadmap 3 mois (parcours progressif et réaliste)

**2. Copie en un clic**
- Bouton "📋 Copier le prompt + résultats"
- Copie automatique dans le presse-papier
- Feedback visuel immédiat : "✅ Copié !"
- Animation du bouton (scale + changement de couleur)
- Fallback pour navigateurs anciens (document.execCommand)

**3. Format du prompt généré**
```
Je viens de réaliser une évaluation de maturité en Gouvernance IA pour consultants.

📊 Mes résultats :
Score global : 68% - Niveau : Praticien
Temps écoulé : 12 min

Scores par domaine :
⚖️ Réglementation : 8/10 (93%)
🛡️ Éthique & Trust : 5/10 (67%)
⚠️ Risques Opérationnels : 2/10 (40%)
💰 FinOps & Coûts : 7/10 (87%)
👥 Gouvernance : 10/10 (100%)

Danger Zones détectées : 1 question(s) avec erreur haute certitude

Détail de mes réponses (JSON) :
[JSON complet avec toutes les questions, réponses, explications]

Ma demande :
[4 demandes structurées pour analyse approfondie]
```

**4. Interface utilisateur**
- Card bleue distincte (bg-blue-50, border-blue-200)
- Badge "Beta" pour indiquer le caractère expérimental
- Icône Sparkles pour attirer l'attention
- Texte pédagogique expliquant le processus
- Note d'assistance recommandant Claude Sonnet 4, ChatGPT o1, ou Gemini 2.0 Flash

**5. UX soignée**
- Responsive (bouton pleine largeur sur mobile)
- Animation du bouton au survol (hover:shadow-lg)
- Effet scale quand copié
- Message de confirmation avec animate-pulse
- Reset automatique après 3 secondes

**Fichiers modifiés :**
- `src/components/ResultsDashboard.jsx` - Ajout de la section AI Analysis + fonction `generateLLMPrompt()` + fonction `copyToClipboard()`

**Impact UX :**
- Les utilisateurs obtiennent un accompagnement personnalisé ultra-détaillé
- Parcours de formation adapté à leur profil exact (forces/faiblesses)
- Ressources concrètes et actionnables (pas de conseils génériques)
- Roadmap 3 mois pour structurer l'apprentissage
- Meilleure rétention : les utilisateurs savent exactement quoi faire après le quiz

**Valeur métier :**
- Différenciation forte par rapport aux quiz classiques
- Encourage l'usage de LLM pour le développement professionnel
- Positionne l'outil comme un vrai "assistant de montée en compétence"
- Viralité : les utilisateurs peuvent partager leurs analyses IA sur LinkedIn
- ROI formation : parcours optimisés = moins de temps perdu sur des sujets non prioritaires

**Exemple de recommandations obtenues :**
Les LLM externes peuvent générer :
- Suggestions de formations Udemy/Coursera spécifiques
- Articles académiques pertinents (AI Act, RGPD, etc.)
- Certifications à viser (CDAO, AI Ethics, etc.)
- Roadmap jour par jour pour les 3 prochains mois
- Exercices pratiques adaptés au niveau

**Limitations actuelles (Beta) :**
- Nécessite un compte LLM externe (Claude.ai, ChatGPT, Gemini)
- L'utilisateur doit copier/coller manuellement (pas d'API intégrée)
- Contexte additionnel à compléter manuellement (domaines d'expertise)

**Évolutions futures :**
- Intégration API Claude/OpenAI directe (v1.2)
- Pré-remplissage du contexte utilisateur (profil, objectifs)
- Sauvegarde des analyses IA dans le localStorage
- Export PDF de l'analyse complète

---

#### 📊 RadarChart enrichi et optimisé pour la décision

Le graphique radar a été complètement repensé pour maximiser la clarté, la lisibilité et l'aide à la décision.

**Avant :**
- Labels courts et génériques sur les axes
- Légende simple avec points de couleur
- Tooltip basique avec score normalisé
- Taille fixe non responsive

**Après - RadarChart décisionnel :**

**1. Labels d'axes enrichis avec emojis**
- ⚖️ Réglementation (au lieu de "Réglementation")
- 🛡️ Éthique & Trust
- ⚠️ Risques Opérationnels
- 💰 FinOps & Coûts
- 👥 Gouvernance
- Meilleure lisibilité immédiate grâce aux icônes visuelles

**2. Tooltip enrichi et contextuel**
- Emoji du domaine + nom complet en header
- Score normalisé (%) en évidence
- Score brut (points) pour référence
- **Statut de maîtrise** : "Maîtrisé" / "À renforcer" / "Critique"
- Design amélioré avec séparateurs et hiérarchie visuelle

**3. Légende transformée en tableau de bord décisionnel**
- Cards colorées par domaine avec border et background selon performance
- **3 niveaux de performance** :
  - ✅ **Maîtrisé** (vert) : ≥70% - Compétence solide
  - ⚠️ **À renforcer** (orange) : 40-69% - Besoin de formation ciblée
  - ❌ **Critique** (rouge) : <40% - Formation urgente requise
- Affichage du score normalisé (%) ET score brut (points)
- Icône de statut (CheckCircle, AlertTriangle, XCircle)
- Hover effect pour meilleure interaction

**4. Responsive design adaptatif**
- **Mobile** (<640px) : 280px de hauteur, labels réduits (10px)
- **Tablet** (640-768px) : 320px de hauteur, labels moyens (11px)
- **Desktop** (≥768px) : 400px de hauteur, labels optimaux (12px)
- Grid adaptatif pour la légende (1/2/3 colonnes selon taille écran)

**5. Section title explicite**
- Titre : "📊 Performance par domaine"
- Sous-titre pédagogique : "Visualisation radar de votre maîtrise sur les 5 piliers"

**6. Légende des seuils de performance**
- Footer explicatif avec icônes et seuils
- Aide à l'interprétation des couleurs
- Référence rapide pour les utilisateurs

**Fichiers modifiés :**
- `src/components/RadarChart.jsx` - Refonte complète du composant

**Impact UX :**
- Les utilisateurs comprennent **immédiatement** leur niveau par domaine
- Les emojis facilitent la reconnaissance visuelle rapide
- Le statut "Maîtrisé/À renforcer/Critique" est actionnable
- La légende enrichie évite de survoler le graphique pour avoir l'info
- Design cohérent avec le reste de l'application (maturity cards, review section)

**Valeur métier :**
- Les RH peuvent identifier en un coup d'œil les lacunes de formation
- Les consultants savent exactement quels domaines prioriser
- La couleur rouge alerte sur les risques projet (domaines critiques)

---

#### 💬 Messages de maturité personnalisés et actionnables

L'affichage du niveau de maturité a été complètement repensé pour être plus pédagogique et actionnable.

**Avant :**
- Badge simple avec une description générique
- Pas de conseil d'action concret

**Après - Maturity Card enrichie :**
- Badge coloré avec icône spécifique (Trophy, Briefcase, BookOpen, Sprout, AlertTriangle)
- Message personnalisé contextualisant le score (2-3 phrases)
- Ton adapté au niveau (encourageant pour Expert, neutre pour Praticien, alerte pour Risque critique)
- Call-to-action concret dans un encadré distinct
- Design avec border et background adaptés au niveau

**Messages par niveau :**

1. **Expert (81-100%)** - Icône Trophy, badge vert
   - Message : Félicitations, vous maîtrisez les enjeux
   - Action : Partagez votre expertise en interne

2. **Praticien (61-80%)** - Icône Briefcase, badge bleu
   - Message : Bon niveau, quelques zones à approfondir
   - Action : Ciblez 1-2 domaines pour devenir référent

3. **Initié (31-60%)** - Icône BookOpen, badge jaune
   - Message : Bases essentielles acquises
   - Action : Formation structurée sur les faiblesses

4. **Novice (0-30%)** - Icône Sprout, badge gris
   - Message : Merci pour votre honnêteté, début du parcours
   - Action : Commencez par les fondamentaux (RGPD, AI Act)

5. **Risque critique (<0%)** - Icône AlertTriangle, badge rouge
   - Message : Attention, certitudes erronées détectées
   - Action : Formation urgente avant intervention client

**Fichiers modifiés :**
- `src/components/ResultsDashboard.jsx` - Fonction `getMaturityMessage()` + nouvelle Maturity Card

**Impact UX :**
- Les utilisateurs comprennent mieux leur niveau
- Les actions recommandées sont concrètes et réalisables
- Ton encourageant (sauf si risque critique)
- Meilleure lisibilité avec icônes et couleurs

---

#### 🎨 Header avec logo ESN

Un header fixe a été ajouté en haut de toutes les pages de l'application.

**Fonctionnalités :**
- Header sticky (reste visible au scroll)
- Logo ESN (Smartpoint) à gauche
- Titre "AI-Maturometer" au centre
- Badge de version "v1.1" à droite (desktop uniquement)
- Séparateur vertical entre logo et titre
- Détection automatique du logo (PNG → SVG → Placeholder)
- Responsive (adapté mobile/desktop)

**Fichiers créés :**
- `src/components/Header.jsx` - Composant Header
- `public/logosmartpoint.svg` - Logo SVG temporaire
- `LOGO_INSTRUCTIONS.md` - Guide d'installation du logo

**Fichiers modifiés :**
- `src/App.jsx` - Intégration du Header sur toutes les pages

**Design :**
- Fond blanc avec border grise subtile
- Logo : 36px (mobile) / 48px (desktop)
- Z-index élevé pour rester au-dessus du contenu
- Padding compensé sur le contenu principal

**Instructions :**
Placez votre logo `logosmartpoint.png` dans le dossier `public/` pour remplacer le placeholder. Consultez `LOGO_INSTRUCTIONS.md` pour tous les détails.

---

#### 📋 Révision détaillée des réponses

Une nouvelle section a été ajoutée au dashboard de résultats permettant aux utilisateurs de revoir toutes leurs réponses en détail.

**Emplacement :** Après la section "Recommandations personnalisées"

**Fonctionnalités :**
- Affichage des 5 questions sous forme de cards élégantes
- Pour chaque question :
  - ✅ Numéro de la question + badge du domaine
  - ✅ Texte complet de la question
  - ✅ Les 4 options avec indicateurs visuels :
    - Option choisie par l'utilisateur (surbrillance bleue si correct, rouge si incorrect)
    - Bonne réponse (border verte épaisse + icône ✅)
    - Autres options grisées
  - ✅ Badge de certitude (Faible/Moyen/Élevé) avec code couleur
  - ✅ Indicateur de résultat (Badge vert "Correct ✅" ou rouge "Incorrect ❌")
  - ✅ Zone d'explication pédagogique :
    - Fond gris clair
    - Icône 💡 Lightbulb
    - Texte de l'explication en italique

**Design :**
- Cards avec border colorée selon le résultat (verte si correct, rouge si incorrect)
- Background légèrement teinté (vert clair ou rouge clair)
- Espacement généreux pour confort de lecture
- Responsive (optimisé pour mobile et desktop)

**Valeur ajoutée :**
- Permet aux utilisateurs de comprendre leurs erreurs
- Facilite l'apprentissage avec les explications détaillées
- Améliore la pédagogie de l'outil
- Répond au feedback utilisateurs demandant plus de détails

**Fichiers modifiés :**
- `src/App.jsx` - Passage des questions et answers au ResultsDashboard
- `src/components/ResultsDashboard.jsx` - Ajout de la section complète

**Bundle size :** ~554 KB (légère augmentation de +3 KB due aux nouveaux composants)

---

## [1.0.0] - Janvier 2026

### 🎉 Version initiale - MVP

**Fonctionnalités principales :**
- Quiz interactif avec double input (réponse + certitude)
- 5 questions réalistes sur la Gouvernance IA
- Logique de scoring Dunning-Kruger (-20 points pour Faux + Élevé)
- Dashboard de résultats avec Radar Chart
- Détection des profils à risque
- Recommandations personnalisées
- Persistence localStorage
- Export JSON des résultats
- Design responsive et accessible

**Stack technique :**
- React 18.3.1
- Vite 6.0.3
- Tailwind CSS 3.4.17
- Recharts 2.15.0
- Lucide React 0.460.0

**Documentation :**
- 13 fichiers de documentation complets
- Guide de démarrage rapide
- Guide de personnalisation
- Guide de déploiement
- Roadmap v1.5 → v3.0

---

## Prochaines versions

### [1.2.0] - Planifié Q2 2026
- Mode sombre / clair
- Certificat PDF téléchargeable
- Partage LinkedIn
- 10 questions supplémentaires

### [2.0.0] - Planifié Q3 2026
- Backend + Authentication
- Dashboard admin pour RH
- 50+ questions validées
- Classements inter-équipes

Voir [ROADMAP.md](ROADMAP.md) pour plus de détails.
