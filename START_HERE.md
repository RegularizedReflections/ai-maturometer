# 🚀 START HERE - AI-Maturometer v1.0

## Bienvenue sur AI-Maturometer !

Vous êtes sur le point de découvrir un outil innovant d'évaluation de maturité en **Gouvernance IA**.

---

## ⚡ Quick Start (2 minutes)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer l'application
npm run dev

# 3. Ouvrir http://localhost:3000 dans votre navigateur
```

**C'est tout ! L'application est prête.**

---

## 🎯 Que fait cette application ?

AI-Maturometer évalue la maturité des consultants ESN sur 5 domaines de la gouvernance IA :

1. **Réglementation** (RGPD, AI Act)
2. **Éthique & Trust** (Biais, Transparence)
3. **Risques Opérationnels** (Hallucinations, Sécurité)
4. **FinOps & Coûts** (Optimisation tokens)
5. **Gouvernance** (Shadow AI, Politiques)

### Innovation unique : Le double input

Pour **chaque question**, vous devez renseigner :
- ✅ **Votre réponse** (A/B/C/D)
- ✅ **Votre niveau de certitude** (Faible/Moyen/Élevé)

Cette méthode permet de détecter les **profils Dunning-Kruger** : ceux qui sont certains mais se trompent (pénalité **-20 points** !).

---

## 📚 Documentation complète

### Pour bien démarrer
1. **[README.md](README.md)** - Vue d'ensemble du projet
2. **[QUICKSTART.md](QUICKSTART.md)** - Guide de démarrage détaillé
3. **[INDEX.md](INDEX.md)** - Table des matières complète

### Pour comprendre le projet
4. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Synthèse complète (MVP)
5. **[PROJECT_FILES.md](PROJECT_FILES.md)** - Architecture du code

### Pour personnaliser
6. **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Ajouter des questions, modifier les couleurs, etc.
7. **[COMMANDS.md](COMMANDS.md)** - Toutes les commandes utiles

### Pour déployer
8. **[VERIFICATION.md](VERIFICATION.md)** - Checklist de validation (120 points)
9. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guide de déploiement (Vercel/Netlify/Docker)

### Pour les évolutions
10. **[ROADMAP.md](ROADMAP.md)** - v1.5, v2.0, v3.0

### Autres
11. **[CREDITS.md](CREDITS.md)** - Remerciements & technologies
12. **[LICENSE](LICENSE)** - Licence MIT

---

## 🎮 Test rapide

### Scénario 1 : Expert parfait (5 min)
Répondez correctement aux 5 questions avec une certitude élevée.
**Résultat attendu : 100% → Expert**

### Scénario 2 : Profil Dunning-Kruger (5 min)
Répondez faux à 2 questions avec une certitude élevée.
**Résultat attendu : Score négatif → Alerte danger**

### Scénario 3 : Novice prudent (5 min)
Répondez avec une certitude faible sur toutes les questions.
**Résultat attendu : ~14% → Novice (pas de danger)**

---

## 📊 Fonctionnalités principales

✅ **Quiz interactif** - 5 questions avec double input obligatoire
✅ **Scoring Dunning-Kruger** - Matrice de risque (-20 à +10 points)
✅ **Dashboard de résultats** - Score global + niveau de maturité
✅ **Radar Chart** - Visualisation 5 axes par domaine
✅ **Danger Zone Alert** - Détection des certitudes erronées
✅ **Recommandations** - Personnalisées selon le profil
✅ **Persistence** - Sauvegarde localStorage (reprise possible)
✅ **Export** - Résultats en JSON
✅ **Responsive** - Desktop + Mobile
✅ **Accessible** - Navigation clavier, ARIA

---

## 🛠️ Stack technique

- **React 18** + **Vite** - Framework moderne ultra-rapide
- **Tailwind CSS** - Design system professionnel
- **Recharts** - Graphiques interactifs
- **Lucide React** - Icônes élégantes
- **LocalStorage** - Persistence côté client

**Taille du bundle : ~550 KB (optimisable en v2)**

---

## 📁 Structure du projet (simplifié)

```
ai-maturometer/
├── src/
│   ├── App.jsx                    # Composant principal
│   ├── components/                # 6 composants React
│   ├── data/quiz-data.json        # ⭐ 5 questions réalistes
│   ├── hooks/useQuiz.js           # State management
│   └── utils/scoring.js           # ⭐ Logique Dunning-Kruger
├── package.json                   # Dépendances
├── tailwind.config.js             # Design system
└── [11 fichiers .md]              # Documentation complète
```

---

## ✅ Checklist de démarrage

### Première utilisation
- [ ] Cloner ou télécharger le projet
- [ ] Lire ce fichier (START_HERE.md)
- [ ] Lancer `npm install`
- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000
- [ ] Tester le quiz complet
- [ ] Consulter README.md pour plus de détails

### Pour personnaliser
- [ ] Lire CUSTOMIZATION.md
- [ ] Modifier src/data/quiz-data.json (ajouter des questions)
- [ ] Modifier tailwind.config.js (changer les couleurs)
- [ ] Tester les modifications

### Avant le déploiement
- [ ] Lire VERIFICATION.md
- [ ] Lancer `npm run build` (vérifier 0 erreurs)
- [ ] Tester le build (`npm run preview`)
- [ ] Suivre DEPLOYMENT.md pour Vercel/Netlify

---

## 🎯 Prochaines étapes suggérées

### Débutant (10 min)
1. Lancer l'app avec `npm run dev`
2. Tester le quiz complet (5 questions)
3. Explorer les résultats (radar chart, recommandations)

### Utilisateur (30 min)
1. Lire README.md
2. Comprendre la logique de scoring
3. Tester les 3 scénarios (Expert, Danger, Novice)
4. Consulter PROJECT_SUMMARY.md

### Développeur (1h)
1. Lire PROJECT_FILES.md (architecture)
2. Parcourir le code dans src/
3. Ajouter une question dans quiz-data.json
4. Modifier les couleurs dans tailwind.config.js
5. Consulter CUSTOMIZATION.md

### DevOps (2h)
1. Lire VERIFICATION.md (checklist de 120 points)
2. Lancer `npm run build`
3. Tester le build localement
4. Déployer sur Vercel (suivre DEPLOYMENT.md)

---

## 💡 FAQ Rapide

### Q: Combien de temps prend l'installation ?
**R:** 2 minutes (npm install + npm run dev)

### Q: Puis-je modifier les questions ?
**R:** Oui ! Éditez `src/data/quiz-data.json` et consultez CUSTOMIZATION.md

### Q: Comment fonctionne le scoring ?
**R:** Matrice Dunning-Kruger : -20 points si Faux + Certitude Élevée. Voir PROJECT_SUMMARY.md

### Q: Est-ce que mes données sont sauvegardées ?
**R:** Oui, dans le localStorage du navigateur (local uniquement, pas de serveur)

### Q: Comment déployer en production ?
**R:** Suivez DEPLOYMENT.md (Vercel en 5 min)

### Q: Peut-on ajouter un backend ?
**R:** Oui, c'est prévu en v2.0. Voir ROADMAP.md

### Q: Quelle licence ?
**R:** MIT License (open source, utilisation libre)

---

## 🚨 Problèmes courants

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 déjà utilisé
```bash
npm run dev -- --port 4000
```

### Build échoue
```bash
npm run lint  # Vérifier les erreurs
rm -rf dist && npm run build
```

### LocalStorage ne fonctionne pas
- Vérifiez que vous êtes sur http://localhost (pas file://)
- Ouvrez DevTools → Application → Local Storage

---

## 📞 Besoin d'aide ?

1. **Consultez INDEX.md** pour trouver le bon document
2. **Recherchez dans COMMANDS.md** pour les commandes
3. **Consultez VERIFICATION.md** si problème de fonctionnement
4. **Ouvrez une issue GitHub** si le problème persiste

---

## 🎉 Félicitations !

Vous avez maintenant tout ce qu'il faut pour :
- ✅ Utiliser AI-Maturometer
- ✅ Comprendre son fonctionnement
- ✅ Le personnaliser selon vos besoins
- ✅ Le déployer en production

**Bon quiz et bonne calibration de votre confiance ! 🧠**

---

## 🔗 Liens rapides

| Document | Description | Audience |
|----------|-------------|----------|
| **[README.md](README.md)** | Vue d'ensemble | Tous |
| **[QUICKSTART.md](QUICKSTART.md)** | Démarrage rapide | Débutants |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Synthèse MVP | PM/Clients |
| **[CUSTOMIZATION.md](CUSTOMIZATION.md)** | Personnalisation | Développeurs |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Déploiement | DevOps |
| **[INDEX.md](INDEX.md)** | Table des matières | Tous |

---

**AI-Maturometer v1.0**
*Mesurez votre maturité, calibrez votre confiance.*

Développé avec Claude Sonnet 4.5 - Janvier 2026
