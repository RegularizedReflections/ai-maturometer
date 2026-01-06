import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

/**
 * Header fixe de l'application avec logo ESN
 */
export default function Header() {
  const [logoSrc, setLogoSrc] = useState('/logosmartpoint.png');
  const [logoExists, setLogoExists] = useState(true);

  // Vérifier si le logo existe (PNG puis SVG en fallback)
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLogoExists(true);
      setLogoSrc('/logosmartpoint.png');
    };
    img.onerror = () => {
      // Essayer le SVG en fallback
      const svg = new Image();
      svg.onload = () => {
        setLogoExists(true);
        setLogoSrc('/logosmartpoint.svg');
      };
      svg.onerror = () => setLogoExists(false);
      svg.src = '/logosmartpoint.svg';
    };
    img.src = '/logosmartpoint.png';
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Logo */}
          {logoExists ? (
            <img
              src={logoSrc}
              alt="Logo Smartpoint"
              className="h-9 sm:h-12 w-auto object-contain"
              onError={() => setLogoExists(false)}
            />
          ) : (
            // Placeholder si ni PNG ni SVG n'existent
            <div className="h-9 sm:h-12 w-12 sm:w-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-2xl">SP</span>
            </div>
          )}

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
