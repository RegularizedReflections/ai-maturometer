import React, { useState } from 'react';
import { Brain, Play, Shield, TrendingUp, Scale, Users, AlertTriangle } from 'lucide-react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import ProgressBar from './components/ProgressBar';
import ResultsDashboard from './components/ResultsDashboard';
import useQuiz from './hooks/useQuiz';
import quizData from './data/quiz-data.json';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const quiz = useQuiz(quizData);

  // Page d'accueil
  if (!hasStarted) {
    return (
      <>
        <Header />
        <WelcomePage onStart={() => setHasStarted(true)} />
      </>
    );
  }

  // Page de résultats
  if (quiz.isCompleted && quiz.results) {
    return (
      <>
        <Header />
        <ResultsDashboard
          results={quiz.results}
          domains={quiz.domains}
          questions={quizData.questions}
          answers={quiz.answers}
          onRestart={() => {
            quiz.restart();
            setHasStarted(false);
          }}
        />
      </>
    );
  }

  // Page de quiz
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 pt-4 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header avec timer */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-2">
              {quiz.theme}
            </h1>
            <p className="text-sm text-neutral-light">
              Temps écoulé : {quiz.elapsedTime} min
              {quiz.elapsedTime > 15 && (
                <span className="ml-2 text-warning font-medium">
                  (Temps recommandé dépassé)
                </span>
              )}
            </p>
          </div>

          {/* Barre de progression */}
          <ProgressBar
            current={quiz.currentQuestionIndex + 1}
            total={quiz.totalQuestions}
          />

          {/* Question actuelle */}
          {quiz.currentQuestion && (
            <QuizCard
              question={quiz.currentQuestion}
              onAnswer={quiz.submitAnswer}
              questionNumber={quiz.currentQuestionIndex + 1}
              totalQuestions={quiz.totalQuestions}
            />
          )}
        </div>
      </div>
    </>
  );
}

/**
 * Page d'accueil avec présentation du concept
 */
function WelcomePage({ onStart }) {
  const features = [
    {
      icon: Brain,
      title: 'Double input unique',
      description: 'Réponse + Niveau de certitude pour chaque question',
      color: 'text-primary'
    },
    {
      icon: AlertTriangle,
      title: 'Détection Dunning-Kruger',
      description: 'Identification des profils "certains mais faux" (-20 points)',
      color: 'text-danger'
    },
    {
      icon: TrendingUp,
      title: 'Analyse par domaine',
      description: '5 axes : Réglementation, Éthique, Risques, FinOps, Gouvernance',
      color: 'text-secondary'
    }
  ];

  const domains = [
    { icon: Scale, name: 'Réglementation', desc: 'RGPD, AI Act' },
    { icon: Shield, name: 'Éthique & Trust', desc: 'Biais, Transparence' },
    { icon: AlertTriangle, name: 'Risques', desc: 'Hallucinations, Sécurité' },
    { icon: TrendingUp, name: 'FinOps', desc: 'Optimisation coûts' },
    { icon: Users, name: 'Gouvernance', desc: 'Shadow AI, Politiques' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-6">
            <Brain size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            AI-Maturometer
          </h1>
          <p className="text-xl text-neutral-light max-w-2xl mx-auto">
            Évaluez votre maturité sur la Gouvernance IA pour consultants ESN
          </p>
        </div>

        {/* Concept unique */}
        <div className="card mb-8 bg-white">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">
            🎯 Concept unique : Le double input
          </h2>
          <p className="text-neutral-light mb-6">
            Pour chaque question, vous devez indiquer <span className="font-semibold text-neutral-dark">votre réponse ET votre niveau de certitude</span>.
            Cette méthode permet de détecter les profils dangereux : ceux qui sont certains... mais se trompent.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <feature.icon className={`${feature.color} mb-2`} size={28} />
                <h3 className="font-semibold text-neutral-dark mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Domaines évalués */}
        <div className="card mb-8 bg-white">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">
            📊 5 domaines évalués
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {domains.map((domain, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                  <domain.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-sm text-neutral-dark mb-1">{domain.name}</h3>
                <p className="text-xs text-neutral-light">{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logique de scoring */}
        <div className="card mb-8 bg-gradient-to-r from-red-50 to-green-50 border-2 border-primary">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">
            ⚠️ Logique de scoring - Matrice de risque
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-2 px-3 font-semibold">Réponse</th>
                  <th className="text-left py-2 px-3 font-semibold">Certitude</th>
                  <th className="text-center py-2 px-3 font-semibold">Points</th>
                  <th className="text-left py-2 px-3 font-semibold">Diagnostic</th>
                </tr>
              </thead>
              <tbody className="text-neutral-dark">
                <tr className="border-b border-slate-200 bg-green-100">
                  <td className="py-2 px-3">✅ Correcte</td>
                  <td className="py-2 px-3">Élevée</td>
                  <td className="py-2 px-3 text-center font-bold text-success">+10</td>
                  <td className="py-2 px-3">Expert fiable</td>
                </tr>
                <tr className="border-b border-slate-200 bg-green-50">
                  <td className="py-2 px-3">✅ Correcte</td>
                  <td className="py-2 px-3">Moyenne</td>
                  <td className="py-2 px-3 text-center font-bold text-success">+5</td>
                  <td className="py-2 px-3">Bonne intuition</td>
                </tr>
                <tr className="border-b border-slate-200 bg-green-50">
                  <td className="py-2 px-3">✅ Correcte</td>
                  <td className="py-2 px-3">Faible</td>
                  <td className="py-2 px-3 text-center font-bold">+2</td>
                  <td className="py-2 px-3">Chance/Prudence</td>
                </tr>
                <tr className="border-b border-slate-200 bg-yellow-50">
                  <td className="py-2 px-3">❌ Fausse</td>
                  <td className="py-2 px-3">Faible</td>
                  <td className="py-2 px-3 text-center font-bold">0</td>
                  <td className="py-2 px-3">Ignorance saine</td>
                </tr>
                <tr className="border-b border-slate-200 bg-orange-100">
                  <td className="py-2 px-3">❌ Fausse</td>
                  <td className="py-2 px-3">Moyenne</td>
                  <td className="py-2 px-3 text-center font-bold text-warning">-5</td>
                  <td className="py-2 px-3">Confusion</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="py-2 px-3">❌ Fausse</td>
                  <td className="py-2 px-3">Élevée</td>
                  <td className="py-2 px-3 text-center font-bold text-danger">-20</td>
                  <td className="py-2 px-3 font-bold">🚨 Danger Dunning-Kruger</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-neutral-dark font-medium">
            ⚠️ La pénalité -20 est le cœur pédagogique : être certain ET se tromper est plus dangereux que d'ignorer.
          </p>
        </div>

        {/* Informations pratiques */}
        <div className="card mb-8 bg-white">
          <h2 className="text-xl font-bold text-neutral-dark mb-3">
            📝 Modalités pratiques
          </h2>
          <ul className="space-y-2 text-sm text-neutral-light">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><span className="font-semibold text-neutral-dark">5 questions</span> issues de cas réels de consulting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><span className="font-semibold text-neutral-dark">15 minutes recommandées</span> (non bloquant)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><span className="font-semibold text-neutral-dark">Navigation séquentielle</span> : impossible de revenir en arrière</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><span className="font-semibold text-neutral-dark">Sauvegarde automatique</span> : reprenez où vous en étiez</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><span className="font-semibold text-neutral-dark">Résultats détaillés</span> : Radar chart, zones de danger, recommandations</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Play size={24} />
            Démarrer l'évaluation
          </button>
          <p className="mt-4 text-xs text-neutral-light">
            En commençant, vous acceptez que vos réponses soient stockées localement dans votre navigateur
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
