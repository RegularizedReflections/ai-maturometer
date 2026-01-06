import React from 'react';
import { AlertCircle, MinusCircle, CheckCircle } from 'lucide-react';

/**
 * Sélecteur de niveau de certitude (OBLIGATOIRE avec la réponse)
 * @param {string} selected - 'low' | 'medium' | 'high' | null
 * @param {function} onSelect - Callback de sélection
 */
export default function ConfidenceSelector({ selected, onSelect }) {
  const confidenceLevels = [
    {
      id: 'low',
      label: 'Faible',
      description: 'Je ne suis pas sûr',
      icon: AlertCircle,
      baseClass: 'confidence-low',
      selectedClass: 'confidence-low-selected'
    },
    {
      id: 'medium',
      label: 'Moyen',
      description: 'Je pense savoir',
      icon: MinusCircle,
      baseClass: 'confidence-medium',
      selectedClass: 'confidence-medium-selected'
    },
    {
      id: 'high',
      label: 'Élevé',
      description: 'J\'en suis certain',
      icon: CheckCircle,
      baseClass: 'confidence-high',
      selectedClass: 'confidence-high-selected'
    }
  ];

  return (
    <div className="mt-6 pt-6 border-t-2 border-slate-200">
      <label className="block text-sm font-semibold text-neutral-dark mb-3">
        Quel est votre niveau de certitude pour cette réponse ?
        <span className="text-danger ml-1">*</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {confidenceLevels.map((level) => {
          const Icon = level.icon;
          const isSelected = selected === level.id;

          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelect(level.id)}
              className={`confidence-btn ${level.baseClass} ${isSelected ? level.selectedClass : ''}`}
              aria-pressed={isSelected}
              aria-label={`${level.label} : ${level.description}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Icon size={18} />
                <div className="text-left">
                  <div className="font-semibold">{level.label}</div>
                  <div className="text-xs opacity-90">{level.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Aide contextuelle */}
      <p className="text-xs text-neutral-light mt-3 italic">
        💡 Votre certitude est évaluée pour détecter les profils à risque (effet Dunning-Kruger)
      </p>
    </div>
  );
}
