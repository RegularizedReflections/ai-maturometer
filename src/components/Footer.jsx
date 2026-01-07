import React from 'react';

/**
 * Footer de l'application avec informations légales
 */
export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-3 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          {/* Informations principales */}
          <div className="text-center sm:text-left">
            <span className="font-semibold">AI-Maturometer v1.1</span>
            <span className="mx-2">•</span>
            <span>Outil de diagnostic pédagogique</span>
            <span className="mx-2">•</span>
            <span>Non certifiant</span>
            <span className="mx-2">•</span>
            <span>Usage strictement personnel</span>
          </div>

          {/* Liens */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/votre-organisation/ai-maturometer/blob/main/LEGAL.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Mentions légales
            </a>
            <a
              href="mailto:contact@votre-esn.com"
              className="hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
