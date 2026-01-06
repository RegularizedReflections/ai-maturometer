import React from 'react';
import { Brain } from 'lucide-react';

/**
 * Header fixe de l'application avec badge initiales
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Badge avec initiales AM */}
          <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">AM</span>
          </div>

          {/* Séparateur vertical (desktop uniquement) */}
          <div className="hidden sm:block h-8 w-px bg-slate-300" />

          {/* Titre de l'application */}
          <div className="flex items-center gap-2 min-w-0">
            <Brain className="text-primary flex-shrink-0 hidden sm:block" size={24} />
            <h1 className="text-lg sm:text-xl font-semibold text-neutral-dark truncate">
              AI-Maturometer
            </h1>
          </div>

          {/* Badge "Beta" (optionnel) */}
          <span className="hidden md:inline-flex ml-auto px-2.5 py-1 text-xs font-medium bg-blue-100 text-primary rounded-full">
            v1.1
          </span>
        </div>
      </div>
    </header>
  );
}
