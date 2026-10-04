'use client';

import React from 'react';
import { Language } from '@/types/growth';
import { AlpacaAvatar } from './AlpacaGuide';
import { Globe } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  brandName: string;
  tagline: string;
}

export function Navbar({ language, onLanguageChange, brandName, tagline }: NavbarProps) {
  return (
    <header className="w-full bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center p-0.5 overflow-hidden">
            <AlpacaAvatar className="w-full h-full" mood="friendly" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-stone-900">
                {brandName}
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-stone-500 font-medium tracking-normal">
              {tagline}
            </p>
          </div>
        </div>

        {/* Top-Right Language Switcher: ES | PT-BR */}
        <div className="flex items-center">
          <div 
            role="group" 
            aria-label="Language selector"
            className="flex items-center bg-white border border-stone-200/90 rounded-xl p-1 shadow-xs"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('es')}
              aria-pressed={language === 'es'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === 'es'
                  ? 'bg-amber-100/90 text-amber-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>ES</span>
            </button>

            <span className="text-stone-300 mx-0.5 select-none text-xs font-light">|</span>

            <button
              type="button"
              onClick={() => onLanguageChange('pt')}
              aria-pressed={language === 'pt'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === 'pt'
                  ? 'bg-emerald-100/90 text-emerald-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>PT-BR</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
