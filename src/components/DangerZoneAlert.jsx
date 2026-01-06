import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, XCircle, CheckCircle } from 'lucide-react';

/**
 * Alerte pour les réponses dangereuses (Faux + Certitude Élevée = Dunning-Kruger)
 * @param {Array} dangerZoneAnswers - Liste des réponses problématiques
 */
export default function DangerZoneAlert({ dangerZoneAnswers }) {
  const [expanded, setExpanded] = useState(false);

  if (!dangerZoneAnswers || dangerZoneAnswers.length === 0) {
    return (
      <div className="card border-2 border-success bg-green-50">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-success flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-success text-lg">
              Aucune zone de danger détectée
            </h3>
            <p className="text-sm text-neutral-light mt-1">
              Vous n'avez pas manifesté de certitude erronée. Excellent calibrage de votre confiance !
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-2 border-danger bg-red-50">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-danger flex-shrink-0" size={24} />
        <div className="flex-1">
          <h3 className="font-bold text-danger text-lg">
            ⚠️ Zone de danger : Effet Dunning-Kruger détecté
          </h3>
          <p className="text-sm text-neutral-dark mt-2">
            Vous avez manifesté <span className="font-bold">{dangerZoneAnswers.length} certitude(s) erronée(s)</span>.
            Ces fausses confiances sont plus dangereuses que l'ignorance assumée.
          </p>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-medium text-danger hover:underline flex items-center gap-1"
          >
            {expanded ? (
              <>
                Masquer les détails <ChevronUp size={16} />
              </>
            ) : (
              <>
                Voir les détails ({dangerZoneAnswers.length}) <ChevronDown size={16} />
              </>
            )}
          </button>

          {/* Liste détaillée des réponses dangereuses */}
          {expanded && (
            <div className="mt-4 space-y-4">
              {dangerZoneAnswers.map((answer, index) => (
                <div
                  key={answer.questionId}
                  className="bg-white rounded-lg p-4 border border-red-200"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <XCircle className="text-danger flex-shrink-0 mt-1" size={18} />
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-dark text-sm">
                        Question {index + 1} - {answer.domain}
                      </p>
                      <p className="text-sm text-neutral-light mt-1 italic">
                        "{answer.questionText}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pl-6 space-y-2">
                    <p className="text-xs text-neutral-light">
                      <span className="font-medium text-danger">Votre réponse (certitude élevée) :</span>{' '}
                      {String.fromCharCode(65 + answer.selectedAnswer)}
                    </p>
                    <p className="text-xs text-neutral-light">
                      <span className="font-medium text-success">Bonne réponse :</span>{' '}
                      {String.fromCharCode(65 + answer.correctAnswer)}
                    </p>

                    {/* Explication */}
                    <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-neutral-dark">
                        <span className="font-semibold">💡 Explication :</span><br />
                        {answer.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommandation */}
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-neutral-dark">
              <span className="font-semibold">🎯 Recommandation :</span><br />
              Revoyez en priorité ces sujets. L'excès de confiance sur des concepts mal maîtrisés
              peut conduire à des décisions à risque en production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
