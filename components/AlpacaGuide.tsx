'use client';

import React, { useState } from 'react';
import { Lightbulb, Sparkles, BookOpen } from 'lucide-react';

interface AlpacaGuideProps {
  quote: string;
  tip?: string;
  whyTitle?: string;
  whyBody?: string;
  coachName?: string;
  compact?: boolean;
}

export function AlpacaAvatar({ className = "w-16 h-16", mood = "friendly" }: { className?: string; mood?: 'friendly' | 'thinking' | 'cheering' }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Soft warm aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/60 via-purple-100/40 to-teal-100/50 rounded-full blur-[2px]" />
      
      {/* Custom Vector Alpaca Mascot */}
      <svg
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-sm select-none"
        aria-label="Alfi the Alpaca Mascot"
      >
        {/* Soft Shadow Base */}
        <ellipse cx="60" cy="122" rx="42" ry="7" fill="#E7E2DA" opacity="0.6" />

        {/* Neck / Body */}
        <path
          d="M40 76C40 68 44 48 44 48H76C76 48 80 68 80 76C80 92 88 108 92 124H28C32 108 40 92 40 76Z"
          fill="#FAF6F0"
          stroke="#E5DFD5"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Professional Soft Mint Scarf / Bandana */}
        <path
          d="M36 86C45 92 75 92 84 86C86 94 80 102 60 103C40 102 34 94 36 86Z"
          fill="#D1FAE5"
          stroke="#A7F3D0"
          strokeWidth="2"
        />
        <path
          d="M58 98L54 116L65 106L68 118L64 99"
          fill="#A7F3D0"
          stroke="#6EE7B7"
          strokeWidth="1.5"
        />

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M42 42C36 32 35 15 42 10C48 6 52 20 48 36"
          fill="#FAF6F0"
          stroke="#E5DFD5"
          strokeWidth="2"
        />
        <path
          d="M42 35C38 27 38 17 42 14C45 12 47 21 45 32"
          fill="#FDE8E8"
        />

        {/* Right Ear */}
        <path
          d="M78 42C84 32 85 15 78 10C72 6 68 20 72 36"
          fill="#FAF6F0"
          stroke="#E5DFD5"
          strokeWidth="2"
        />
        <path
          d="M78 35C82 27 82 17 78 14C75 12 73 21 75 32"
          fill="#FDE8E8"
        />

        {/* Head Fluff Base */}
        <ellipse cx="60" cy="52" rx="26" ry="24" fill="#FAF6F0" stroke="#E5DFD5" strokeWidth="2.5" />

        {/* Fluffy Crown / Tuft */}
        <path
          d="M44 32C42 27 46 23 52 25C54 21 62 20 66 23C70 21 77 24 76 29C80 32 78 38 74 40C68 42 52 42 46 39C43 37 43 34 44 32Z"
          fill="#FFFFFF"
          stroke="#E5DFD5"
          strokeWidth="2"
        />

        {/* Smart Modern Round Spectacles */}
        <g stroke="#3F3F46" strokeWidth="2.2" fill="none">
          {/* Bridge */}
          <path d="M54 53Q60 50 66 53" />
          {/* Left Frame */}
          <circle cx="47" cy="54" r="9.5" fill="#FFFFFF" fillOpacity="0.4" />
          {/* Right Frame */}
          <circle cx="73" cy="54" r="9.5" fill="#FFFFFF" fillOpacity="0.4" />
          {/* Frame Handles */}
          <path d="M37 53L33 50" strokeLinecap="round" />
          <path d="M83 53L87 50" strokeLinecap="round" />
        </g>

        {/* Expressive Warm Eyes */}
        <circle cx="47" cy="54" r="3.2" fill="#18181B" />
        <circle cx="46" cy="52.8" r="1.1" fill="#FFFFFF" />
        <circle cx="73" cy="54" r="3.2" fill="#18181B" />
        <circle cx="72" cy="52.8" r="1.1" fill="#FFFFFF" />

        {/* Cheerful Blush */}
        <ellipse cx="38" cy="62" rx="4.5" ry="2.5" fill="#FECDD3" opacity="0.75" />
        <ellipse cx="82" cy="62" rx="4.5" ry="2.5" fill="#FECDD3" opacity="0.75" />

        {/* Snout & Mouth */}
        <path
          d="M53 62C53 58 67 58 67 62C67 68 53 68 53 62Z"
          fill="#FFFFFF"
        />
        {/* Cute Nose & Smile */}
        <ellipse cx="60" cy="62" rx="2.5" ry="1.8" fill="#71717A" />
        <path
          d="M60 64V67M57 67Q60 70 63 67"
          stroke="#71717A"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Little spark of intelligence */}
        {mood === 'thinking' && (
          <path
            d="M93 30L95 24M99 33L105 31M91 38L96 41"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}

export function AlpacaGuide({
  quote,
  tip,
  whyTitle,
  whyBody,
  coachName = 'Alfi · Tu Coach de Crecimiento',
  compact = false,
}: AlpacaGuideProps) {
  const [activeTab, setActiveTab] = useState<'quote' | 'why'>('quote');

  if (compact) {
    return (
      <div className="flex items-start gap-3 p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl">
        <AlpacaAvatar className="w-10 h-10 shrink-0" />
        <div className="text-sm text-stone-700 leading-relaxed">
          <span className="font-semibold text-stone-900 block mb-0.5">{coachName}</span>
          <p className="italic">“{quote}”</p>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Alpaca Learning Guide" className="w-full">
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm shadow-stone-200/40 relative overflow-hidden transition-all duration-200 hover:border-amber-300/80">
        {/* Soft pastel background accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-teal-300 to-indigo-300" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Mascot illustration */}
          <div className="flex items-center gap-3">
            <AlpacaAvatar className="w-16 h-16 sm:w-18 sm:h-18" mood="thinking" />
            <div className="sm:hidden">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                {coachName}
              </span>
              <p className="text-xs text-stone-600 font-medium">Guía de aprendizaje paso a paso</p>
            </div>
          </div>

          {/* Guide dialogue content */}
          <div className="flex-1 min-w-0">
            <div className="hidden sm:flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-700 tracking-wide">
                  {coachName}
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">
                  {activeTab === 'quote' ? 'Consejo del paso actual' : 'Fundamento didáctico'}
                </span>
              </div>

              {whyTitle && whyBody && (
                <div className="flex items-center gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('quote')}
                    className={`px-2 py-0.5 rounded transition-colors text-xs font-medium cursor-pointer ${
                      activeTab === 'quote'
                        ? 'bg-amber-100/80 text-amber-900 font-semibold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Mensaje
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('why')}
                    className={`px-2 py-0.5 rounded transition-colors text-xs font-medium cursor-pointer ${
                      activeTab === 'why'
                        ? 'bg-amber-100/80 text-amber-900 font-semibold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    ¿Por qué?
                  </button>
                </div>
              )}
            </div>

            {/* Bubble message */}
            <div className="relative bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-3.5 sm:p-4 text-stone-800">
              {activeTab === 'quote' ? (
                <div>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-stone-800 font-medium">
                    “{quote}”
                  </p>
                  {tip && (
                    <div className="mt-2 pt-2 border-t border-stone-200/70 flex items-start gap-2 text-xs text-stone-600">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{whyTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {whyBody}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
