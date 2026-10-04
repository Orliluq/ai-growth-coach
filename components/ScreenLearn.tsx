'use client';

import React, { useState } from 'react';
import { 
  GrowthFormData, 
  DiagnoseFormData, 
  ExerciseOption, 
  Language 
} from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaAvatar, AlpacaGuide } from './AlpacaGuide';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  HelpCircle, 
  AlertCircle, 
  Target, 
  Check, 
  Layers,
  Flame,
  Zap,
  Star,
  Lock,
  Rocket,
  Users,
  Briefcase,
  PenTool,
  GraduationCap
} from 'lucide-react';

interface ScreenLearnProps {
  t: TranslationSchema['screenLearn'];
  tDefine: TranslationSchema['screenDefine'];
  tDiagnose: TranslationSchema['screenDiagnose'];
  language: Language;
  defineData: GrowthFormData;
  diagnoseData: DiagnoseFormData;
  onContinue: () => void;
  onBack: () => void;
  onError?: (message: string) => void;
}

export function ScreenLearn({
  t,
  tDefine,
  tDiagnose,
  language,
  defineData,
  diagnoseData,
  onContinue,
  onBack,
  onError,
}: ScreenLearnProps) {
  const [selectedExerciseOption, setSelectedExerciseOption] = useState<ExerciseOption | null>(null);

  const isAnswered = selectedExerciseOption !== null;
  const isCorrect = selectedExerciseOption === 'B';

  const handleCtaClick = () => {
    if (!isAnswered) {
      onError?.(t.ctaDisabledHint);
      return;
    }
    onContinue();
  };

  // Format contextual summary from prior steps
  const goalItem = defineData.goalCategory ? tDefine.goals[defineData.goalCategory] : null;
  const experienceItem = defineData.experience 
    ? tDefine.experienceOptions[defineData.experience] 
    : diagnoseData.marketingExperience 
    ? tDiagnose.q4.options[diagnoseData.marketingExperience] 
    : null;
  const difficultyLabel = diagnoseData.mainChallenge 
    ? tDiagnose.q3.options[diagnoseData.mainChallenge] 
    : null;

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      
      {/* 1. Header with Alpaca Mascot */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase bg-amber-100/70 px-3 py-1 rounded-lg">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.kicker}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0">
            <AlpacaAvatar className="w-full h-full" mood="friendly" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            {t.headline}
          </h1>
        </div>

        <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
          {t.supportingText}
        </p>
      </div>

      {/* Alpaca Mascot Learning Guide Banner */}
      <AlpacaGuide
        quote={t.alpacaMessage}
        coachName={t.coachName}
        tip={language === 'pt' 
          ? 'Nossa meta é que você saiba exatamente o que colocar na sua mensagem antes de gerar os copys com IA.' 
          : 'Nuestra meta es que sepas exactamente qué poner en tu mensaje antes de generar los copys con IA.'}
      />

      {/* 2. Contextual “Tu punto de partida” Summary Card */}
      <section aria-labelledby="starting-point-heading">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              <h2 id="starting-point-heading" className="text-sm font-bold uppercase tracking-wider text-stone-700">
                {t.startingPoint.title}
              </h2>
            </div>
            <span className="text-[11px] font-mono-data text-stone-400 bg-stone-50 px-2 py-0.5 rounded border border-stone-200/60">
              01 + 02
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {/* Project Type */}
            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1">
              <span className="text-[11px] font-semibold text-stone-400 block uppercase tracking-wider">
                {t.startingPoint.projectType}
              </span>
              <p className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-1.5">
                {defineData.goalCategory === 'community' ? (
                  <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : defineData.goalCategory === 'course' ? (
                  <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                ) : defineData.goalCategory === 'business' ? (
                  <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                ) : defineData.goalCategory === 'brand' ? (
                  <PenTool className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                ) : defineData.goalCategory === 'education' ? (
                  <GraduationCap className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                ) : (
                  <Rocket className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                )}
                <span>{goalItem?.title || t.startingPoint.unspecified}</span>
              </p>
            </div>

            {/* Objective */}
            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1">
              <span className="text-[11px] font-semibold text-stone-400 block uppercase tracking-wider">
                {t.startingPoint.objective}
              </span>
              <p className="text-xs sm:text-sm font-medium text-stone-800 line-clamp-2 italic">
                “{defineData.targetDescription || t.startingPoint.unspecified}”
              </p>
            </div>

            {/* Audience */}
            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1">
              <span className="text-[11px] font-semibold text-stone-400 block uppercase tracking-wider">
                {t.startingPoint.audience}
              </span>
              <p className="text-xs sm:text-sm font-medium text-stone-800 line-clamp-2">
                {diagnoseData.audience || t.startingPoint.unspecified}
              </p>
            </div>

            {/* Main Difficulty */}
            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1 sm:col-span-2">
              <span className="text-[11px] font-semibold text-stone-400 block uppercase tracking-wider">
                {t.startingPoint.mainDifficulty}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/70 inline-block">
                {difficultyLabel || t.startingPoint.unspecified}
              </p>
            </div>

            {/* Marketing Experience */}
            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1">
              <span className="text-[11px] font-semibold text-stone-400 block uppercase tracking-wider">
                {t.startingPoint.marketingExperience}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-stone-800">
                {experienceItem?.label || t.startingPoint.unspecified}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Large Educational Card: CONCEPTO CLAVE - Propuesta de valor */}
      <section aria-labelledby="concept-card-heading">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-data font-bold tracking-wider text-indigo-800 uppercase bg-indigo-50 px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.conceptCard.sectionLabel}</span>
            </div>

            <h2 id="concept-card-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              {t.conceptCard.conceptName}
            </h2>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-3xl">
              {t.conceptCard.conceptDesc}
            </p>
          </div>

          {/* Three small visual blocks: Problema · Valor · Diferenciación */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            {/* Problema */}
            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/70 space-y-1.5 transition-all hover:bg-rose-50">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">
                  1
                </span>
                <span>{t.conceptCard.blocks.problem.title}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.conceptCard.blocks.problem.desc}
              </p>
            </div>

            {/* Valor */}
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/70 space-y-1.5 transition-all hover:bg-indigo-50">
              <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">
                  2
                </span>
                <span>{t.conceptCard.blocks.value.title}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.conceptCard.blocks.value.desc}
              </p>
            </div>

            {/* Diferenciación */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 space-y-1.5 transition-all hover:bg-emerald-50">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                  3
                </span>
                <span>{t.conceptCard.blocks.differentiation.title}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.conceptCard.blocks.differentiation.desc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. “Ejemplo realista” Card */}
      <section aria-labelledby="example-card-heading">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <h3 id="example-card-heading" className="text-sm font-bold text-stone-900">
                {t.exampleCard.title}
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
              {t.exampleCard.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-[11px] font-mono-data font-semibold text-rose-700 block uppercase tracking-wider mb-1">
                {t.exampleCard.problemLabel}
              </span>
              <p className="text-xs sm:text-[13px] text-stone-800 font-medium leading-relaxed">
                “{t.exampleCard.problemText}”
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-[11px] font-mono-data font-semibold text-indigo-700 block uppercase tracking-wider mb-1">
                {t.exampleCard.valueLabel}
              </span>
              <p className="text-xs sm:text-[13px] text-stone-800 font-medium leading-relaxed">
                “{t.exampleCard.valueText}”
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-[11px] font-mono-data font-semibold text-emerald-700 block uppercase tracking-wider mb-1">
                {t.exampleCard.differentiationLabel}
              </span>
              <p className="text-xs sm:text-[13px] text-stone-800 font-medium leading-relaxed">
                “{t.exampleCard.differentiationText}”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tiny “Pruébalo tú” Exercise with 3 options and Feedback Card */}
      <section aria-labelledby="exercise-heading" className="space-y-4">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5">
          
          <div className="space-y-1">
            <span className="text-xs font-mono-data font-bold tracking-wider text-amber-800 uppercase bg-amber-100/70 px-2.5 py-0.5 rounded-md inline-block">
              {t.exercise.badge}
            </span>
            <h3 id="exercise-heading" className="text-lg sm:text-xl font-bold text-stone-900 pt-1">
              {t.exercise.title}
            </h3>
            <p className="text-sm sm:text-base font-medium text-stone-700">
              {t.exercise.question}
            </p>
          </div>

          {/* 3 Selectable Options (A, B, C) */}
          <div className="space-y-3">
            {(['A', 'B', 'C'] as ExerciseOption[]).map((optionKey) => {
              const text = t.exercise.options[optionKey];
              const isSelected = selectedExerciseOption === optionKey;
              const isOptionCorrect = optionKey === 'B';

              let stateBorder = 'border-stone-200/90 hover:border-stone-300';
              let stateBg = 'bg-white';
              let indicatorColor = 'border-stone-300 bg-white text-stone-700';

              if (isSelected) {
                if (isOptionCorrect) {
                  stateBorder = 'border-emerald-600 ring-2 ring-emerald-500/20';
                  stateBg = 'bg-emerald-50/40';
                  indicatorColor = 'bg-emerald-600 border-emerald-600 text-white';
                } else {
                  stateBorder = 'border-amber-500 ring-2 ring-amber-400/20';
                  stateBg = 'bg-amber-50/40';
                  indicatorColor = 'bg-amber-500 border-amber-500 text-white';
                }
              }

              return (
                <button
                  key={optionKey}
                  type="button"
                  onClick={() => setSelectedExerciseOption(optionKey)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${stateBorder} ${stateBg}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg border font-mono-data text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${indicatorColor}`}>
                      {optionKey}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-stone-900 leading-snug">
                      “{text}”
                    </span>
                  </div>

                  <div className="shrink-0">
                    {isSelected && (
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isOptionCorrect ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {isOptionCorrect ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 6. Feedback card after selection */}
          {isAnswered && (
            <div className={`p-4 sm:p-5 rounded-xl border transition-all animate-fadeIn ${
              isCorrect 
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                : 'bg-amber-50/70 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-start gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  {isCorrect ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                </span>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                    {isCorrect ? t.exercise.feedbackCorrect : t.exercise.feedbackIncorrect}
                  </p>
                  <p className="text-[11px] text-stone-600">
                    {isCorrect ? t.exercise.continueHint : t.exercise.retryHint}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 7. Primary CTA & Secondary Action */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-3">
        {!isAnswered && (
          <p className="text-xs text-stone-500 text-center flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.ctaDisabledHint}</span>
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-stone-700 text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.secondaryAction}</span>
          </button>

          <button
            type="button"
            data-primary-cta="true"
            onClick={handleCtaClick}
            className="w-full sm:w-auto min-w-[260px] py-4 px-8 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>{t.primaryCta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
