import React, { useState } from 'react';
import { ChevronRight, Lightbulb } from 'lucide-react';
import ConfidenceSelector from './ConfidenceSelector';

/**
 * Carte de question du quiz avec options et sélecteur de certitude
 * @param {Object} question - Question courante
 * @param {function} onAnswer - Callback de validation (answer, confidence)
 * @param {number} questionNumber - Numéro de la question (pour affichage)
 * @param {number} totalQuestions - Total de questions
 */
export default function QuizCard({ question, onAnswer, questionNumber, totalQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleSubmit = () => {
    if (selectedAnswer === null || confidence === null) {
      // Validation : les 2 champs sont obligatoires
      return;
    }

    onAnswer({
      questionId: question.id,
      selectedAnswer,
      confidence,
      isCorrect: selectedAnswer === question.correctAnswer,
      domain: question.domain
    });

    // Reset pour la prochaine question
    setSelectedAnswer(null);
    setConfidence(null);
  };

  const canSubmit = selectedAnswer !== null && confidence !== null;

  return (
    <div className="card max-w-4xl mx-auto">
      {/* Header avec numéro de question */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-primary bg-blue-50 px-3 py-1 rounded-full">
          Question {questionNumber}/{totalQuestions}
        </span>
        <span className="text-xs font-medium text-neutral-light uppercase tracking-wide">
          {question.domain}
        </span>
      </div>

      {/* Énoncé de la question */}
      <h2 className="text-xl md:text-2xl font-bold text-neutral-dark mb-6 leading-relaxed">
        {question.text}
      </h2>

      {/* Options de réponse */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedAnswer(index)}
              className={`quiz-option w-full text-left ${isSelected ? 'quiz-option-selected' : ''}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-neutral-light'
                }`}>
                  {optionLetter}
                </span>
                <span className="flex-1 pt-1">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sélecteur de certitude */}
      <ConfidenceSelector selected={confidence} onSelect={setConfidence} />

      {/* Bouton de validation */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-neutral-light">
          <Lightbulb size={16} />
          <span>Niveau : {question.level}</span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-primary flex items-center gap-2"
          aria-label={canSubmit ? 'Valider et passer à la question suivante' : 'Veuillez sélectionner une réponse et un niveau de certitude'}
        >
          <span>{questionNumber === totalQuestions ? 'Voir les résultats' : 'Question suivante'}</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Indicateur de validation */}
      {!canSubmit && (selectedAnswer !== null || confidence !== null) && (
        <p className="text-xs text-warning mt-3 flex items-center gap-1">
          <span className="font-medium">⚠️</span>
          Vous devez sélectionner une réponse ET un niveau de certitude pour continuer
        </p>
      )}
    </div>
  );
}
