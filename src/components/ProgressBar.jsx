import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Barre de progression du quiz
 * @param {number} current - Question actuelle (1-indexed)
 * @param {number} total - Nombre total de questions
 */
export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-light">
          Question {current} sur {total}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin="0"
          aria-valuemax={total}
        />
      </div>

      {/* Indicateurs visuels */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
              i < current
                ? 'bg-primary text-white'
                : i === current
                ? 'bg-secondary text-white ring-2 ring-secondary ring-offset-2'
                : 'bg-slate-200 text-neutral-light'
            }`}
            aria-label={`Question ${i + 1} ${i < current ? 'complétée' : i === current ? 'en cours' : 'à venir'}`}
          >
            {i < current ? <CheckCircle2 size={16} /> : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
