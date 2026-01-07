import React, { useState } from 'react';
import { Award, TrendingUp, AlertTriangle, RotateCcw, Download, CheckCircle, XCircle, Lightbulb, Trophy, Briefcase, BookOpen, Sprout, Sparkles, Clipboard } from 'lucide-react';
import RadarChart from './RadarChart';
import DangerZoneAlert from './DangerZoneAlert';
import { getMaturityLevel, generateRecommendations } from '../utils/scoring';

/**
 * Retourne le message personnalisé selon le niveau de maturité
 */
function getMaturityMessage(level) {
  const messages = {
    'Expert': {
      badgeClass: 'bg-green-100 text-green-800 border-2 border-green-200',
      icon: Trophy,
      iconColor: 'text-green-600',
      title: 'Expert en Gouvernance IA',
      message: 'Excellente maîtrise ! Vous comprenez les enjeux juridiques, éthiques et opérationnels de l\'IA. Vous êtes en mesure d\'accompagner vos clients avec confiance et de prendre des décisions éclairées sur ces sujets stratégiques.',
      action: '💡 Partagez votre expertise : formez vos collègues, contribuez aux réponses d\'appels d\'offres AI, et positionnez-vous comme référent interne.',
      actionBorder: 'border-green-500'
    },
    'Praticien': {
      badgeClass: 'bg-blue-100 text-blue-800 border-2 border-blue-200',
      icon: Briefcase,
      iconColor: 'text-blue-600',
      title: 'Praticien confirmé',
      message: 'Bon niveau de compréhension globale des enjeux IA. Vous êtes autonome sur les sujets courants, mais quelques zones méritent un approfondissement pour atteindre le niveau expert.',
      action: '🎯 Ciblez vos axes d\'amélioration (consultez le radar ci-dessous) et devenez référent sur 1-2 domaines spécifiques en priorité.',
      actionBorder: 'border-blue-500'
    },
    'Initié': {
      badgeClass: 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200',
      icon: BookOpen,
      iconColor: 'text-yellow-600',
      title: 'Initié en progression',
      message: 'Vous avez acquis les bases essentielles de la gouvernance IA. Avec un effort ciblé sur vos principales faiblesses, vous atteindrez rapidement le niveau praticien et pourrez intervenir en autonomie.',
      action: '📚 Priorisez les domaines en rouge/orange dans le radar. Suivez une formation structurée sur ces sujets dans les prochaines semaines.',
      actionBorder: 'border-yellow-500'
    },
    'Novice': {
      badgeClass: 'bg-slate-100 text-slate-800 border-2 border-slate-200',
      icon: Sprout,
      iconColor: 'text-slate-600',
      title: 'Novice - Début du parcours',
      message: 'Merci pour votre honnêteté dans l\'auto-évaluation. Tout le monde commence quelque part dans ce domaine en évolution rapide. L\'important est de structurer votre montée en compétence de manière progressive.',
      action: '🌱 Commencez par les fondamentaux (RGPD et AI Act) avant d\'aborder les aspects techniques. Demandez à suivre une formation d\'initiation.',
      actionBorder: 'border-slate-500'
    },
    'Risque critique': {
      badgeClass: 'bg-red-100 text-red-800 border-2 border-red-200',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      title: '⚠️ Formation urgente requise',
      message: 'Attention : plusieurs réponses incorrectes avec haute certitude ont été détectées (voir la Danger Zone ci-dessous). Cela représente un risque projet réel, car une confiance excessive sur des informations erronées peut conduire à des décisions inappropriées.',
      action: '🚨 PRIORITÉ ABSOLUE : Suivre une formation de mise à niveau avant d\'intervenir sur des projets IA clients. Parlez-en à votre manager.',
      actionBorder: 'border-red-500'
    }
  };

  return messages[level] || messages['Novice'];
}

/**
 * Génère le prompt structuré pour analyse par LLM externe
 */
function generateLLMPrompt(results, domains, questions, answers) {
  // Calcul des statistiques par domaine
  const domainStats = domains.map(domain => {
    const domainData = results.domainScores[domain.id] || 0;
    // Normalisation correcte : maxScore par domaine = 30 (3 questions × 10 pts max)
    const maxScorePerDomain = 30;
    const normalizedScore = Math.max(0, Math.min(100, (domainData / maxScorePerDomain) * 100));

    // Mapping des emojis
    const domainEmojis = {
      legal: '⚖️',
      ethics: '🛡️',
      risks: '⚠️',
      finops: '💰',
      governance: '👥'
    };

    return {
      name: domain.name,
      emoji: domainEmojis[domain.id] || '📊',
      rawScore: domainData,
      percentage: Math.round(normalizedScore)
    };
  });

  // Construction du JSON détaillé des réponses
  const detailedAnswers = questions.map((question, index) => {
    const userAnswer = answers[index];
    return {
      question_id: question.id,
      domain: question.domain,
      question_text: question.text,
      user_answer: question.options[userAnswer.selectedAnswer],
      correct_answer: question.options[question.correctAnswer],
      is_correct: userAnswer.isCorrect,
      confidence: userAnswer.confidence,
      score: userAnswer.score,
      explanation: question.explanation
    };
  });

  const prompt = `Je viens de réaliser une évaluation de maturité en Gouvernance IA.

**Mes résultats :**
Score global : ${results.scorePercentage}% - Niveau : ${results.maturityLevel.level}
Temps écoulé : ${results.elapsedTime || 'N/A'} min

**Scores par domaine :**
${domainStats.map(d => `- ${d.emoji} ${d.name} : ${d.rawScore}/30 (${d.percentage}%)`).join('\n')}

**Danger Zones détectées :** ${results.dangerZoneAnswers.length} question(s) avec erreur haute certitude

**Détail de mes réponses (JSON) :**

\`\`\`json
${JSON.stringify(detailedAnswers, null, 2)}
\`\`\`

---

**Contexte important pour personnaliser ton analyse :**

Avant de me donner ton diagnostic, j'ai besoin que tu me poses 3-4 questions pour contextualiser tes recommandations :

1. **Mon profil actuel** : Consultant / Manager / Expert technique / Autre ?
2. **Ma disponibilité** : Combien d'heures par semaine puis-je consacrer à la formation sur les 3 prochains mois ?
3. **Mon objectif** : Monter en compétence pour mes missions actuelles / Évoluer vers un rôle différent / Préparer une certification ?
4. **Mon contexte** : En mission client / En intercontrat / Autre ?

Une fois que tu auras mes réponses, donne-moi :

1. **Diagnostic ciblé** : Mes 2-3 faiblesses prioritaires POUR MON PROFIL
2. **Plan réaliste** : Un parcours adapté à ma disponibilité (pas un plan de formation à temps plein)
3. **Ressources concrètes** : 2-3 ressources accessibles PAR axe (articles de référence gratuits, MOOCs courts, podcasts)
4. **Quick wins** : 2-3 actions immédiates (< 2h chacune) pour démarrer dès cette semaine

Évite les plans trop ambitieux ou irréalistes. Je cherche du pragmatique et de l'actionnable.`;

  return prompt;
}

/**
 * Dashboard complet des résultats
 * @param {Object} results - Résultats calculés
 * @param {Array} domains - Domaines du quiz
 * @param {Array} questions - Questions du quiz
 * @param {Array} answers - Réponses de l'utilisateur
 * @param {function} onRestart - Callback pour recommencer
 */
export default function ResultsDashboard({ results, domains, questions, answers, onRestart }) {
  const maturityLevel = results.maturityLevel;
  const recommendations = generateRecommendations(results, domains);
  const maturityMessage = getMaturityMessage(maturityLevel.level);

  // State pour le feedback de copie
  const [copied, setCopied] = useState(false);

  // Mapping des couleurs pour les badges
  const colorMap = {
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white'
  };

  // Fonction de copie dans le presse-papier
  const copyToClipboard = async () => {
    try {
      const prompt = generateLLMPrompt(results, domains, questions, answers);
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback pour navigateurs anciens
      const textArea = document.createElement('textarea');
      textArea.value = generateLLMPrompt(results, domains, questions, answers);
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        return true;
      } catch (err2) {
        console.error('Fallback copy failed:', err2);
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-2">
          Résultats de l'évaluation
        </h1>
        <p className="text-neutral-light">
          Gouvernance & Déploiement Responsable de l'IA
        </p>
      </div>

      {/* Score global - Affichage simple */}
      <div className="card mb-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Award size={48} className="flex-shrink-0" />
            <div>
              <p className="text-sm opacity-90 mb-1">Score global</p>
              <h2 className="text-3xl md:text-4xl font-bold">{results.scorePercentage}%</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold">{results.totalScore}/{results.maxPossibleScore}</p>
            <p className="text-sm opacity-90">points obtenus</p>
          </div>
        </div>
      </div>

      {/* Maturity Card - Niveau de maturité enrichi */}
      <div className={`rounded-xl p-6 mb-6 ${maturityMessage.badgeClass}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 ${maturityMessage.iconColor}`}>
            <maturityMessage.icon size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{maturityMessage.title}</h2>
            <p className="text-base leading-relaxed opacity-90">
              {maturityMessage.message}
            </p>
          </div>
        </div>

        {/* Action recommandée */}
        <div className={`mt-4 p-4 bg-white/80 rounded-lg border-l-4 ${maturityMessage.actionBorder}`}>
          <p className="text-sm font-semibold text-neutral-dark mb-1">
            🎯 Action recommandée
          </p>
          <p className="text-sm text-neutral-dark leading-relaxed">
            {maturityMessage.action}
          </p>
        </div>
      </div>

      {/* Alerte zone de danger */}
      <div className="mb-6">
        <DangerZoneAlert dangerZoneAnswers={results.dangerZoneAnswers} />
      </div>

      {/* Graphique radar */}
      <div className="mb-6">
        <RadarChart domainScores={results.domainScores} domains={domains} />
      </div>

      {/* Top 3 domaines à renforcer */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-primary" size={24} />
          <h3 className="text-lg font-bold text-neutral-dark">
            Domaines prioritaires à renforcer
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {results.weakDomains.slice(0, 3).map((domainId, index) => {
            const domain = domains.find(d => d.id === domainId);
            const score = results.domainScores[domainId];
            const stats = results.domainStats[domainId];

            return (
              <div
                key={domainId}
                className="border-2 border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-neutral-dark">{domain?.name}</span>
                </div>
                <p className="text-sm text-neutral-light">
                  Score : <span className="font-semibold text-neutral-dark">{score} points</span>
                </p>
                <p className="text-xs text-neutral-light mt-1">
                  Réussite : {stats.correct}/{stats.total} questions
                </p>
                {stats.dangerousAnswers > 0 && (
                  <p className="text-xs text-danger mt-1 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    {stats.dangerousAnswers} certitude(s) erronée(s)
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommandations personnalisées */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-neutral-dark mb-4">
          📋 Recommandations personnalisées
        </h3>

        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const priorityColors = {
              critical: 'border-danger bg-red-50',
              high: 'border-warning bg-orange-50',
              medium: 'border-primary bg-blue-50',
              low: 'border-success bg-green-50'
            };

            return (
              <div
                key={index}
                className={`border-l-4 rounded-lg p-4 ${priorityColors[rec.priority]}`}
              >
                <h4 className="font-semibold text-neutral-dark mb-1">{rec.title}</h4>
                <p className="text-sm text-neutral-light mb-2">{rec.description}</p>
                <p className="text-xs text-neutral-dark italic">
                  <span className="font-medium">Action recommandée :</span> {rec.action}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Révision détaillée des réponses */}
      <div className="card mb-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-neutral-dark mb-2">
            📋 Révision détaillée
          </h3>
          <p className="text-sm text-neutral-light">
            Revoyez vos réponses et approfondissez votre compréhension
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer.isCorrect;
            const domain = domains.find(d => d.id === question.domain);

            // Mapping des couleurs de certitude
            const confidenceColors = {
              low: 'bg-orange-100 text-orange-700 border-orange-300',
              medium: 'bg-blue-100 text-blue-700 border-blue-300',
              high: 'bg-green-100 text-green-700 border-green-300'
            };

            const confidenceLabels = {
              low: 'Faible',
              medium: 'Moyen',
              high: 'Élevé'
            };

            return (
              <div
                key={question.id}
                className={`border-2 rounded-lg p-6 ${
                  isCorrect ? 'border-success bg-green-50/30' : 'border-danger bg-red-50/30'
                }`}
              >
                {/* Header de la question */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium uppercase tracking-wide">
                    {domain?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full border text-xs font-medium ${confidenceColors[userAnswer.confidence]}`}>
                    Certitude : {confidenceLabels[userAnswer.confidence]}
                  </span>
                  <span className={`ml-auto px-4 py-1.5 rounded-full font-semibold text-sm flex items-center gap-2 ${
                    isCorrect
                      ? 'bg-success text-white'
                      : 'bg-danger text-white'
                  }`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle size={16} />
                        Correct
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        Incorrect
                      </>
                    )}
                  </span>
                </div>

                {/* Texte de la question */}
                <h4 className="text-lg font-semibold text-neutral-dark mb-4 leading-relaxed">
                  {question.text}
                </h4>

                {/* Options */}
                <div className="space-y-3 mb-5">
                  {question.options.map((option, optionIndex) => {
                    const isUserChoice = userAnswer.selectedAnswer === optionIndex;
                    const isCorrectAnswer = question.correctAnswer === optionIndex;
                    const optionLetter = String.fromCharCode(65 + optionIndex);

                    let optionClasses = 'border-2 rounded-lg p-4 transition-all';

                    if (isCorrectAnswer) {
                      // Bonne réponse : border verte épaisse
                      optionClasses += ' border-success bg-green-50 ring-2 ring-success/20';
                    } else if (isUserChoice && !isCorrect) {
                      // Réponse choisie mais incorrecte : border rouge
                      optionClasses += ' border-danger bg-red-50';
                    } else if (isUserChoice && isCorrect) {
                      // Réponse choisie et correcte : surbrillance bleue
                      optionClasses += ' border-primary bg-blue-50 ring-2 ring-primary/20';
                    } else {
                      // Autres options : grisées
                      optionClasses += ' border-slate-200 bg-slate-50 opacity-60';
                    }

                    return (
                      <div key={optionIndex} className={optionClasses}>
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${
                            isCorrectAnswer
                              ? 'bg-success text-white'
                              : isUserChoice && !isCorrect
                              ? 'bg-danger text-white'
                              : isUserChoice && isCorrect
                              ? 'bg-primary text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {optionLetter}
                          </span>
                          <span className="flex-1 pt-0.5 text-neutral-dark">
                            {option}
                          </span>
                          {isCorrectAnswer && (
                            <CheckCircle className="flex-shrink-0 text-success" size={20} />
                          )}
                          {isUserChoice && !isCorrect && (
                            <XCircle className="flex-shrink-0 text-danger" size={20} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explication */}
                <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="flex-shrink-0 text-primary mt-0.5" size={20} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-dark mb-1">
                        💡 Explication
                      </p>
                      <p className="text-sm text-neutral-dark italic leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section AI Analysis - Astuce Pro */}
      <div className="card mb-6 bg-blue-50 border-2 border-blue-200">
        {/* Header avec icône et badge Beta */}
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-blue-600" size={28} />
          <h3 className="text-2xl font-bold text-neutral-dark">
            💡 Aller plus loin avec l'IA
          </h3>
          <span className="ml-auto px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
            Beta
          </span>
        </div>

        {/* Texte explicatif */}
        <div className="mb-5 space-y-3">
          <p className="text-base text-neutral-dark leading-relaxed">
            Vous pouvez demander à une IA générative (<strong>Claude</strong>, <strong>ChatGPT</strong>, <strong>Gemini</strong>) d'analyser vos résultats en profondeur et de vous suggérer un parcours de formation <strong>100% personnalisé</strong>.
          </p>
          <p className="text-base text-neutral-dark leading-relaxed">
            Cliquez sur le bouton ci-dessous pour copier vos résultats au format JSON + un prompt optimisé. Collez ensuite le tout dans l'IA de votre choix.
          </p>
        </div>

        {/* Bouton de copie */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={copyToClipboard}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              copied
                ? 'bg-green-600 hover:bg-green-700 scale-105'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle size={20} />
                ✅ Copié !
              </>
            ) : (
              <>
                <Clipboard size={20} />
                📋 Copier le prompt + résultats
              </>
            )}
          </button>

          {/* Feedback après copie */}
          {copied && (
            <p className="text-sm text-green-700 font-medium animate-pulse">
              Collez maintenant dans Claude, ChatGPT ou Gemini !
            </p>
          )}
        </div>

        {/* Note d'assistance */}
        <div className="mt-5 pt-4 border-t border-blue-300">
          <p className="text-sm text-slate-600 leading-relaxed">
            💡 <strong>Conseil :</strong> Claude excelle dans l'analyse de profils et la recommandation de parcours de formation structurés. Vous pouvez également utiliser ChatGPT ou Gemini selon vos préférences.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Recommencer l'évaluation
        </button>

        <button
          type="button"
          onClick={() => {
            // Export simple en JSON (à améliorer avec PDF plus tard)
            const dataStr = JSON.stringify(results, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const exportFileDefaultName = `ai-maturometer-results-${new Date().toISOString().slice(0, 10)}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
          }}
          className="btn-outline flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Exporter les résultats
        </button>
      </div>

      {/* Footer informationnel */}
      <div className="mt-8 p-4 bg-slate-100 rounded-lg text-center">
        <p className="text-xs text-neutral-light">
          Cette évaluation utilise la méthodologie Dunning-Kruger pour identifier les profils à risque.
          Les certitudes erronées sont pénalisées à -20 points.
        </p>
      </div>
    </div>
  );
}
