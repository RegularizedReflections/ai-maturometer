/**
 * LOGIQUE DE SCORING - MATRICE DE RISQUE DUNNING-KRUGER
 *
 * Calcule les points selon la réponse ET le niveau de certitude
 * pour détecter les profils dangereux (certains mais faux)
 */

/**
 * Calcule le score pour une question individuelle
 * @param {boolean} isCorrect - La réponse est-elle correcte ?
 * @param {string} confidence - 'low' | 'medium' | 'high'
 * @returns {number} Points attribués (-20 à +10)
 */
export function calculateQuestionScore(isCorrect, confidence) {
  if (isCorrect) {
    // Réponse CORRECTE : récompense proportionnelle à la certitude
    switch (confidence) {
      case 'high':
        return 10; // Expert fiable
      case 'medium':
        return 5;  // Bonne intuition
      case 'low':
        return 2;  // Chance/Prudence
      default:
        return 0;
    }
  } else {
    // Réponse FAUSSE : pénalité selon la certitude (effet Dunning-Kruger)
    switch (confidence) {
      case 'low':
        return 0;   // Ignorance saine (sait qu'il ne sait pas)
      case 'medium':
        return -5;  // Confusion
      case 'high':
        return -20; // ⚠️ DANGER CRITIQUE : Certain mais faux
      default:
        return 0;
    }
  }
}

/**
 * Détermine le diagnostic pédagogique pour une question
 * @param {boolean} isCorrect
 * @param {string} confidence
 * @returns {string} Diagnostic métier
 */
export function getDiagnostic(isCorrect, confidence) {
  if (isCorrect) {
    switch (confidence) {
      case 'high': return 'Expert fiable';
      case 'medium': return 'Bonne intuition';
      case 'low': return 'Chance/Prudence';
      default: return '';
    }
  } else {
    switch (confidence) {
      case 'low': return 'Ignorance saine';
      case 'medium': return 'Confusion';
      case 'high': return 'Danger Dunning-Kruger';
      default: return '';
    }
  }
}

/**
 * Calcule le score total et les statistiques par domaine
 * @param {Array} answers - Tableau des réponses [{questionId, selectedAnswer, confidence, isCorrect, domain}]
 * @param {Array} questions - Questions du quiz
 * @returns {Object} Résultats complets
 */
export function calculateResults(answers, questions) {
  // Score global
  let totalScore = 0;
  const maxPossibleScore = questions.length * 10; // Max = toutes correctes avec high confidence

  // Scores par domaine
  const domainScores = {};
  const domainStats = {};

  // Identifier les réponses dangereuses (Dunning-Kruger)
  const dangerZoneAnswers = [];

  answers.forEach((answer, index) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const score = calculateQuestionScore(answer.isCorrect, answer.confidence);
    totalScore += score;

    // Agrégation par domaine
    const domain = question.domain;
    if (!domainScores[domain]) {
      domainScores[domain] = 0;
      domainStats[domain] = {
        correct: 0,
        total: 0,
        dangerousAnswers: 0
      };
    }

    domainScores[domain] += score;
    domainStats[domain].total += 1;

    if (answer.isCorrect) {
      domainStats[domain].correct += 1;
    }

    // Détection des réponses DANGER
    if (!answer.isCorrect && answer.confidence === 'high') {
      domainStats[domain].dangerousAnswers += 1;
      dangerZoneAnswers.push({
        questionId: answer.questionId,
        questionText: question.text,
        domain: question.domain,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    }
  });

  // Calcul du pourcentage global
  const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Niveau de maturité
  const maturityLevel = getMaturityLevel(scorePercentage);

  // Top 3 des domaines à renforcer (score le plus bas)
  const weakDomains = Object.entries(domainScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([domain]) => domain);

  return {
    totalScore,
    maxPossibleScore,
    scorePercentage,
    maturityLevel,
    domainScores,
    domainStats,
    dangerZoneAnswers,
    weakDomains,
    totalQuestions: questions.length,
    answeredQuestions: answers.length
  };
}

/**
 * Détermine le niveau de maturité selon le score
 * @param {number} percentage - Score en pourcentage
 * @returns {Object} Niveau et description
 */
export function getMaturityLevel(percentage) {
  if (percentage < 0) {
    return {
      level: 'Risque critique',
      color: 'danger',
      description: 'Attention : Vos certitudes erronées représentent un risque majeur. Formation urgente recommandée.',
      icon: 'alert-triangle'
    };
  } else if (percentage <= 30) {
    return {
      level: 'Novice',
      color: 'warning',
      description: 'Vous découvrez le domaine. Restez prudent dans vos décisions et formez-vous.',
      icon: 'book-open'
    };
  } else if (percentage <= 60) {
    return {
      level: 'Initié',
      color: 'primary',
      description: 'Bonne base de connaissances. Continuez à vous former sur les sujets identifiés.',
      icon: 'trending-up'
    };
  } else if (percentage <= 80) {
    return {
      level: 'Praticien',
      color: 'secondary',
      description: 'Solide maîtrise opérationnelle. Vous pouvez accompagner des projets IA en autonomie.',
      icon: 'briefcase'
    };
  } else {
    return {
      level: 'Expert',
      color: 'success',
      description: 'Excellence avérée. Vous êtes référent sur la gouvernance IA responsable.',
      icon: 'award'
    };
  }
}

/**
 * Génère des recommandations personnalisées selon le profil
 * @param {Object} results - Résultats calculés
 * @param {Array} domains - Domaines du quiz
 * @returns {Array} Recommandations prioritaires
 */
export function generateRecommendations(results, domains) {
  const recommendations = [];

  // Recommandation 1 : Si danger zone
  if (results.dangerZoneAnswers.length > 0) {
    recommendations.push({
      priority: 'critical',
      title: '🚨 Danger Dunning-Kruger détecté',
      description: `Vous avez ${results.dangerZoneAnswers.length} certitude(s) erronée(s). Ces fausses confiances sont plus dangereuses que l'ignorance assumée.`,
      action: 'Revoyez en priorité les explications des questions identifiées.'
    });
  }

  // Recommandation 2 : Top domaine faible
  if (results.weakDomains.length > 0) {
    const weakestDomain = domains.find(d => d.id === results.weakDomains[0]);
    const domainScore = results.domainScores[results.weakDomains[0]];

    recommendations.push({
      priority: 'high',
      title: `📚 Renforcement : ${weakestDomain?.name || 'Domaine prioritaire'}`,
      description: `Score le plus faible identifié (${domainScore} points). Formation recommandée.`,
      action: getTrainingRecommendation(results.weakDomains[0])
    });
  }

  // Recommandation 3 : Maturité globale
  if (results.scorePercentage < 60) {
    recommendations.push({
      priority: 'medium',
      title: '🎯 Plan de formation globale',
      description: 'Votre niveau nécessite une montée en compétence structurée.',
      action: 'Suivez un parcours certifiant (ex: AI Governance Professional, CDPO IA, ou formation interne ESN).'
    });
  } else if (results.scorePercentage >= 80) {
    recommendations.push({
      priority: 'low',
      title: '🏆 Partage d\'expertise',
      description: 'Votre maîtrise vous permet de devenir référent.',
      action: 'Envisagez d\'animer des formations internes ou de contribuer à la veille réglementaire.'
    });
  }

  return recommendations;
}

/**
 * Recommandations de formation spécifiques par domaine
 */
function getTrainingRecommendation(domainId) {
  const trainings = {
    legal: 'Formation RGPD + AI Act : Comprendre les obligations légales (DPIA, clauses contractuelles, transferts de données).',
    ethics: 'Formation Éthique IA : Biais algorithmiques, fairness, transparence des modèles.',
    risks: 'Formation Risk Management IA : Hallucinations, sécurité des modèles, human-in-the-loop.',
    finops: 'Formation FinOps IA : Optimisation des coûts LLM, caching, monitoring de consommation.',
    governance: 'Formation Gouvernance IA : Politiques d\'usage, Shadow AI, conformité organisationnelle.'
  };

  return trainings[domainId] || 'Formation générale sur la gouvernance IA responsable.';
}

/**
 * Sauvegarde les résultats dans localStorage avec historique
 */
export function saveResultsToHistory(results) {
  const historyKey = 'ai-maturometer-history';
  const maxHistorySize = 5;

  try {
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');

    const newEntry = {
      timestamp: new Date().toISOString(),
      scorePercentage: results.scorePercentage,
      maturityLevel: results.maturityLevel.level,
      dangerZoneCount: results.dangerZoneAnswers.length,
      totalQuestions: results.totalQuestions
    };

    history.unshift(newEntry); // Ajoute au début

    // Garde seulement les 5 derniers
    const trimmedHistory = history.slice(0, maxHistorySize);

    localStorage.setItem(historyKey, JSON.stringify(trimmedHistory));

    return trimmedHistory;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'historique:', error);
    return [];
  }
}

/**
 * Récupère l'historique des passages
 */
export function getResultsHistory() {
  try {
    return JSON.parse(localStorage.getItem('ai-maturometer-history') || '[]');
  } catch (error) {
    console.error('Erreur lors de la lecture de l\'historique:', error);
    return [];
  }
}
