# Roadmap AI-Maturometer

## ✅ v1.0 - MVP (ACTUEL)

### Fonctionnalités core
- [x] Quiz avec double input (réponse + certitude)
- [x] 5 questions réalistes couvrant les 5 domaines
- [x] Logique de scoring Dunning-Kruger (-20 pour Faux + Élevé)
- [x] Dashboard de résultats avec Radar Chart
- [x] Détection zone de danger
- [x] Recommandations personnalisées
- [x] Persistence localStorage
- [x] Design responsive Tailwind CSS

### Technologie
- [x] React 18 + Vite
- [x] Recharts pour visualisations
- [x] Lucide React pour icônes
- [x] Tailwind CSS

---

## 🚀 v1.5 - Améliorations UX (Q2 2026)

### Quiz enrichi
- [ ] **20 questions au lieu de 5** (4 par domaine)
- [ ] Niveaux de difficulté : Débutant / Intermédiaire / Expert
- [ ] Mode "Quiz rapide" (5 questions) vs "Évaluation complète" (20 questions)
- [ ] Questions aléatoires tirées d'une banque de 50+ questions
- [ ] Timer visuel avec alertes (5 min restantes)

### Résultats améliorés
- [ ] Graphique d'évolution (historique des 10 derniers passages)
- [ ] Comparaison avec la moyenne des utilisateurs (anonymisée)
- [ ] Certificat PDF téléchargeable avec QR code de vérification
- [ ] Badges de réussite (Expert Legal, Master FinOps, etc.)
- [ ] Partage sur LinkedIn (score + badge)

### Accessibilité
- [ ] Mode sombre / clair
- [ ] Support multilingue (FR/EN)
- [ ] Navigation clavier optimisée
- [ ] Lecteurs d'écran (ARIA complet)
- [ ] Taille de police ajustable

---

## 🔥 v2.0 - Plateforme collaborative (Q3 2026)

### Backend & Authentication
- [ ] Backend Node.js + Express ou Supabase
- [ ] Authentification SSO (Google, Microsoft, LinkedIn)
- [ ] Profils utilisateurs persistants
- [ ] API REST pour intégrations

### Fonctionnalités sociales
- [ ] Classement par ESN / entreprise (opt-in)
- [ ] Challenges inter-équipes
- [ ] Forum de discussion par domaine
- [ ] Système de mentorat (Experts aident Novices)

### Analytics avancés
- [ ] Dashboard admin pour RH/Managers
- [ ] Export Excel des résultats d'équipe
- [ ] Identification automatique des besoins de formation
- [ ] Graphiques de maturité globale de l'entreprise

### Contenu étendu
- [ ] 100+ questions validées par experts
- [ ] Questions basées sur l'actualité (AI Act updates, jurisprudence)
- [ ] Cas pratiques interactifs (scenario-based)
- [ ] Ressources de formation liées à chaque domaine

---

## 💎 v3.0 - IA Adaptative (Q4 2026)

### Quiz intelligent
- [ ] Génération dynamique de questions via LLM
- [ ] Adaptation de la difficulté selon les réponses
- [ ] Questions contextualisées au secteur (Finance, Santé, Retail, etc.)
- [ ] Explication interactive avec chatbot tutoriel

### Recommandations personnalisées
- [ ] Parcours de formation sur-mesure
- [ ] Suggestions de ressources (articles, vidéos, podcasts)
- [ ] Planification de révisions espacées (Spaced Repetition)
- [ ] Micro-learning quotidien par email/Slack

### Intégrations
- [ ] Plugin Slack pour quiz hebdomadaires
- [ ] Integration LMS (Moodle, Cornerstone, etc.)
- [ ] API Webhook pour systèmes RH
- [ ] Widget embeddable pour sites corporate

---

## 🌟 Vision Long-Terme : Plateforme d'Évaluation Modulaire

### Concept
Transformer AI-Maturometer d'un outil ponctuel (Gouvernance IA) en une **plateforme d'évaluation multi-domaines et multi-cibles**, permettant à l'ESN de déployer rapidement de nouveaux quiz selon les besoins métier.

---

### Phase 1.5 : Multi-Quiz (Q1 2026)
**Objectif** : Proposer 3 quiz complémentaires

**Nouveaux quiz** :
1. **MLOps 2026** (Data Engineers/ML Engineers)
   - Thèmes : CI/CD ML, monitoring modèles, drift detection, infra cloud
   - 20 questions / 4 domaines
   - Niveau : Praticien à Expert

2. **Client Readiness Assessment** (Version simplifiée pour avant-vente)
   - Thèmes : Maturité data, culture IA, infrastructure, use cases
   - 10 questions / 4 domaines
   - Niveau : Initié à Praticien
   - Output : Score de "readiness" pour démarrer un projet IA

3. **DevOps Basics** (Développeurs en transition)
   - Thèmes : CI/CD, conteneurisation, observabilité, IaC
   - 12 questions / 3 domaines
   - Niveau : Initié à Praticien

**Architecture** :
- Nouveau dossier : `src/data/quizzes/`
- Fichier catalogue : `quiz-metadata.json`
- Page de sélection au démarrage (cards par quiz)
- Router React : `/quiz/:quizId`

---

### Phase 2.0 : Profils & Personnalisation (Q2 2026)
**Objectif** : Adapter l'expérience selon le profil utilisateur

**Features** :
1. **Profil utilisateur au démarrage** :
   - "Je suis : Consultant / Manager / Data Scientist / Développeur / Client"
   - Stocké en localStorage
   - Influence messages, recommandations, ressources

2. **Comparaison avec cible métier** :
   - Avant le quiz : "Quel est votre objectif ? Junior → Senior / IC → Manager / Généraliste → Spécialiste"
   - Après résultats : Gap analysis entre score actuel et score cible
   - Visualisation : Radar double (toi vs cible)

3. **Recommandations intelligentes** :
   - Selon profil + score + danger zones
   - Ressources filtrées (formations techniques pour devs, stratégiques pour managers)
   - Parcours d'apprentissage suggéré (3-6-12 mois)

4. **Analytics ESN** (dashboard admin) :
   - Scores moyens par profil
   - Domaines les plus faibles (priorités de formation)
   - Taux de complétion, durée moyenne
   - Heatmap des danger zones (risques à adresser en priorité)

---

### Phase 3.0 : Intelligence & Scale (Q3 2026)
**Objectif** : Intégrer l'IA générative et passer à l'échelle

**Features** :
1. **Génération de parcours via API Claude** :
   - Remplace le prompt "copier-coller" par une génération directe
   - Input : Résultats JSON + profil + objectifs
   - Output : Roadmap 3 mois avec ressources, exercices, milestones
   - Export PDF enrichi

2. **Multi-langues** :
   - FR (existant), EN, DE (priorité clients DACH)
   - i18n avec détection automatique du navigateur
   - Questions traduites + adaptées culturellement

3. **Mode Assessment Collectif** :
   - URL partageable pour une équipe (5-50 personnes)
   - Chacun fait le quiz individuellement
   - Dashboard agrégé : score moyen, dispersion, danger zones communes
   - Export : Rapport d'équipe avec axes de formation prioritaires
   - Use case : Audit de maturité IA d'une direction client

4. **Intégration LMS** :
   - Export SCORM 1.2 / 2004 (compatible LMS entreprise)
   - Reporting automatique vers plateforme de formation ESN
   - Certification : Badge digital si score > 80%

5. **Quiz Builder (No-Code)** :
   - Interface admin pour créer de nouveaux quiz sans coder
   - Upload JSON ou formulaire guidé
   - Preview en temps réel
   - Gestion des versions (v1, v2, deprecated)

---

### Opportunités Business

**En interne ESN** :
- Outil de montée en compétence (RH)
- Positionnement consultants sur missions (matching compétences)
- Benchmark entre agences/équipes

**En externe (commercialisation)** :
- Version "Client" brandée (white-label)
- Audit de maturité IA en avant-vente (lead magnet)
- Formation packagée : Quiz + Formation + Re-quiz (mesure progrès)

**Récurrence** :
- Re-passage tous les 6 mois (tracking de progression)
- Nouveaux domaines émergents (Agentic AI 2027, Quantum ML 2028...)

---

### Principes d'Architecture (à respecter)

1. **Séparation contenu/code** : Questions en JSON, logique en React
2. **Modulaire** : Chaque quiz = module indépendant
3. **Backward compatible** : Toujours supporter les anciennes versions de quiz
4. **API-First** : Penser dès v2 à une API pour alimenter d'autres outils
5. **Privacy by design** : Données anonymisées, RGPD-compliant

---

### Next Steps immédiats (post-v1.0)
1. Valider l'intérêt pour MLOps 2026 quiz avec 3-5 collègues data
2. Créer la structure multi-quiz (refactor léger)
3. Déployer v1.5 avec 2 quiz actifs

---

## 🎯 Backlog fonctionnel

### Priorité Haute
- [ ] Mode révision (revoir uniquement les questions échouées)
- [ ] Explications vidéo pour chaque question
- [ ] Quiz par domaine (focus sur Legal uniquement, etc.)
- [ ] Version mobile native (React Native ou PWA)

### Priorité Moyenne
- [ ] Gamification (XP, niveaux, streaks)
- [ ] Système de parrainage
- [ ] Certifications officielles reconnues
- [ ] Marketplace de formations tierces

### Priorité Basse
- [ ] Mode examen chronométré (certification)
- [ ] Intégration calendrier (rappels de révision)
- [ ] Extension VS Code (quiz pendant les pauses)
- [ ] Alexa/Google Home skill

---

## 🛠️ Dette technique

### Performance
- [ ] Code splitting (React.lazy pour routes)
- [ ] Service Worker pour mode offline
- [ ] Lazy loading des images
- [ ] Compression Brotli

### Tests
- [ ] Tests unitaires Vitest (coverage > 80%)
- [ ] Tests E2E avec Playwright
- [ ] Tests d'accessibilité (axe-core)
- [ ] Tests de performance Lighthouse CI

### Code quality
- [ ] Migration vers TypeScript
- [ ] Storybook pour composants
- [ ] Documentation JSDoc complète
- [ ] Pre-commit hooks (Husky + lint-staged)

---

## 📊 Métriques de succès

### v1.0 (MVP)
- ✅ Application fonctionnelle
- ✅ Build sans erreurs
- ✅ Design professionnel
- ✅ Logique de scoring validée

### v1.5
- 500+ utilisateurs actifs
- Net Promoter Score > 40
- Taux de complétion > 70%
- Temps moyen : 12-15 min

### v2.0
- 5000+ utilisateurs actifs
- 50+ entreprises clientes
- Intégration dans 10+ parcours de formation
- ROI prouvé sur réduction incidents IA

### v3.0
- 20 000+ utilisateurs actifs
- Reconnaissance comme standard ESN
- Partenariats avec organismes de certification
- Revenus récurrents (SaaS B2B)

---

## 💡 Idées exploratoires

- Mode "Battle" : 2 joueurs s'affrontent en temps réel
- Génération de CVs "AI-safe" selon le score
- Chatbot assistant pour préparer entretiens clients
- Simulation de comité d'éthique IA (cas pratique)
- Certification blockchain (NFT de compétences)

---

## 🤝 Contributions

Pour proposer des améliorations :
1. Ouvrez une issue GitHub avec le tag [FEATURE]
2. Décrivez le cas d'usage et la valeur ajoutée
3. Proposez une maquette/prototype si possible

---

**Dernière mise à jour : Janvier 2026**
