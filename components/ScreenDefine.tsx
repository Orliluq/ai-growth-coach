'use client';

import React, { useState } from 'react';
import { 
  GoalCategoryId, 
  TimelineOption, 
  ExperienceLevel, 
  GrowthFormData,
  Language
} from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaGuide } from './AlpacaGuide';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Compass, 
  Target,
  AlertCircle,
  Rocket,
  Users,
  BookOpen,
  Briefcase,
  PenTool,
  GraduationCap,
  Sprout,
  Leaf,
  TreePine
} from 'lucide-react';

interface ScreenDefineProps {
  t: TranslationSchema['screenDefine'];
  language: Language;
  initialData: GrowthFormData;
  onSubmit: (data: GrowthFormData) => void;
  onError?: (message: string) => void;
}

export function ScreenDefine({ t, language, initialData, onSubmit, onError }: ScreenDefineProps) {
  const [goalCategory, setGoalCategory] = useState<GoalCategoryId | null>(initialData.goalCategory);
  const [targetDescription, setTargetDescription] = useState<string>(initialData.targetDescription);
  const [timeline, setTimeline] = useState<TimelineOption | null>(initialData.timeline || '30d');
  const [experience, setExperience] = useState<ExperienceLevel | null>(initialData.experience || 'beginner');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Keep the form in sync when the parent injects data after mount
  // (localStorage restore on reload, or the "load guided example" shortcut).
  // Uses React's render-phase adjustment pattern to avoid a cascading render.
  const [syncedData, setSyncedData] = useState(initialData);
  if (initialData !== syncedData) {
    setSyncedData(initialData);
    setGoalCategory(initialData.goalCategory);
    setTargetDescription(initialData.targetDescription);
    setTimeline(initialData.timeline || '30d');
    setExperience(initialData.experience || 'beginner');
    setHasSubmitted(false);
  }

  const goalCards: Array<{
    id: GoalCategoryId;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    accentBorder: string;
    accentBg: string;
  }> = [
    { id: 'product', icon: Rocket, accentColor: 'text-blue-700', accentBorder: 'border-blue-200', accentBg: 'bg-blue-50/50' },
    { id: 'community', icon: Users, accentColor: 'text-emerald-700', accentBorder: 'border-emerald-200', accentBg: 'bg-emerald-50/50' },
    { id: 'course', icon: BookOpen, accentColor: 'text-purple-700', accentBorder: 'border-purple-200', accentBg: 'bg-purple-50/50' },
    { id: 'business', icon: Briefcase, accentColor: 'text-amber-800', accentBorder: 'border-amber-200', accentBg: 'bg-amber-50/50' },
    { id: 'brand', icon: PenTool, accentColor: 'text-rose-700', accentBorder: 'border-rose-200', accentBg: 'bg-rose-50/50' },
    { id: 'education', icon: GraduationCap, accentColor: 'text-teal-700', accentBorder: 'border-teal-200', accentBg: 'bg-teal-50/50' },
  ];

  const timelineCards: Array<{ id: TimelineOption; badge: string }> = [
    { id: '7d', badge: 'Sprint 7D' },
    { id: '30d', badge: 'Recomendado' },
    { id: '90d', badge: 'Trimestre' },
  ];

  const experienceCards: Array<{ id: ExperienceLevel; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'beginner', icon: Sprout },
    { id: 'basics', icon: Leaf },
    { id: 'experienced', icon: TreePine },
  ];

  const isCategoryMissing = hasSubmitted && !goalCategory;
  const isDescriptionMissing = hasSubmitted && !targetDescription.trim();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!goalCategory || !targetDescription.trim()) {
      onError?.(t.validationWarning);
      const firstError = document.getElementById(
        !goalCategory ? 'goal-category-section' : 'objective-text-section'
      );
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onSubmit({
      goalCategory,
      targetDescription: targetDescription.trim(),
      timeline: timeline || '30d',
      experience: experience || 'beginner',
    });
  };

  const handleQuickPromptClick = (promptText: string) => {
    setTargetDescription(promptText);
  };

  return (
    <form onSubmit={handleContinue} className="space-y-10 max-w-4xl mx-auto pb-16">
      
      {/* Screen Hero / Headline */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase bg-amber-100/70 px-3 py-1 rounded-lg">
          <Compass className="w-3.5 h-3.5" />
          <span>{t.kicker}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
          {t.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
          {t.reassurance}
        </p>
      </div>

      {/* Alpaca Coach Strategic Guidance Banner */}
      <AlpacaGuide
        quote={t.alpacaGuidance.quote}
        tip={t.alpacaGuidance.tip}
        whyTitle={t.alpacaGuidance.whyImportantTitle}
        whyBody={t.alpacaGuidance.whyImportantBody}
        language={language}
        coachName={t.alpacaGuidance.coachName}
      />

      {/* SECTION 1: Six Goal Cards */}
      <section id="goal-category-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-600" />
              <span>{t.goalsLabel}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              {t.goalsHelp}
            </p>
          </div>
        </div>

        {isCategoryMissing && (
          <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{language === 'pt' ? 'Selecione que tipo de projeto você quer fazer crescer.' : 'Selecciona qué tipo de proyecto quieres hacer crecer.'}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {goalCards.map((item) => {
            const data = t.goals[item.id];
            const isSelected = goalCategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setGoalCategory(item.id)}
                className={`group relative text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-stone-800 shadow-md ring-2 ring-stone-900/10 -translate-y-0.5'
                    : 'bg-white border-stone-200/90 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 group-hover:scale-105 transition-transform flex items-center justify-center">
                      <item.icon className={`w-6 h-6 ${item.accentColor}`} />
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-stone-900 leading-snug">
                    {data.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1.5">
                    {data.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-400 group-hover:text-stone-700 transition-colors">
                  <span>
                    {isSelected
                      ? (language === 'pt' ? 'Selecionado' : 'Seleccionado')
                      : (language === 'pt' ? 'Escolher esta opção' : 'Elegir esta opción')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Large Text Field "What do you want to achieve?" */}
      <section id="objective-text-section" className="space-y-4">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-2xs">
          <div className="mb-3">
            <label 
              htmlFor="growth-objective-input"
              className="text-lg sm:text-xl font-bold text-stone-900 block"
            >
              {t.objectiveLabel}
            </label>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t.objectiveHelp}
            </p>
          </div>

          {isDescriptionMissing && (
            <div className="flex items-center gap-2 p-3 mb-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{language === 'pt' ? 'Escreva seu objetivo principal para que a IA monte seu fluxo de trabalho.' : 'Escribe tu objetivo principal para que la IA arme tu flujo de trabajo.'}</span>
            </div>
          )}

          <div className="relative">
            <textarea
              id="growth-objective-input"
              rows={4}
              value={targetDescription}
              onChange={(e) => setTargetDescription(e.target.value)}
              placeholder={t.objectivePlaceholder}
              className={`w-full p-4 rounded-xl border text-stone-900 placeholder:text-stone-400 text-sm sm:text-base leading-relaxed focus:outline-none transition-all ${
                isDescriptionMissing
                  ? 'border-rose-300 ring-2 ring-rose-100'
                  : 'border-stone-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-100'
              }`}
            />
            <div className="absolute right-3 bottom-3 text-xs font-mono-data text-stone-400">
              {targetDescription.length > 0 ? `${targetDescription.length} caracteres` : ''}
            </div>
          </div>

          {/* Quick starter prompts for inspiration */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-500 block mb-2">
              {t.quickPromptsLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {t.quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPromptClick(prompt)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-amber-50 hover:text-amber-900 border border-stone-200 hover:border-amber-200 text-stone-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Timeline "When do you want to achieve it?" */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span>{t.timelineLabel}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t.timelineHelp}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {timelineCards.map((item) => {
            const data = t.timelineOptions[item.id];
            const isSelected = timeline === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTimeline(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-stone-800 shadow-sm ring-2 ring-stone-900/10'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-data text-sm font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                      {data.label}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-stone-900 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1">
                    {data.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: Experience Level "How experienced are you with Marketing?" */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>{t.experienceLabel}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t.experienceHelp}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {experienceCards.map((item) => {
            const data = t.experienceOptions[item.id];
            const isSelected = experience === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setExperience(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-stone-800 shadow-sm ring-2 ring-stone-900/10'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-emerald-700" />
                      </span>
                      <h3 className="font-bold text-sm text-stone-900">
                        {data.label}
                      </h3>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-stone-900 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {data.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Primary Action Button (Continue) */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-3">
        {hasSubmitted && (!goalCategory || !targetDescription.trim()) && (
          <p className="text-xs sm:text-sm text-rose-700 font-medium">
            {t.validationWarning}
          </p>
        )}

        <button
          type="submit"
          data-primary-cta="true"
          className="w-full sm:w-auto min-w-[260px] py-4 px-8 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer group"
        >
          <span>{t.cta}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-xs text-stone-500 text-center">
          {t.ctaHint}
        </p>
      </div>

    </form>
  );
}
