'use client';

import React, { useState } from 'react';
import { ImproveFormData, Language } from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaAvatar, AlpacaGuide } from './AlpacaGuide';
import { DataCapture } from './DataCapture';
import {
  TrendingUp,
  Sparkles,
  RotateCcw,
  Bookmark,
  // CheckCircle2,
  // AlertCircle,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Check,
  RefreshCw,
  // Compass,
  // Award,
  Zap
} from 'lucide-react';

interface ScreenImproveProps {
  t: TranslationSchema['screenImprove'];
  language: Language;
  initialData?: Partial<ImproveFormData>;
  onRestartLoop: () => void;
  onBack: () => void;
  onOpenNextHypothesis?: () => void;
}

export function ScreenImprove({
  t,
  language,
  initialData,
  onRestartLoop,
  onBack,
  onOpenNextHypothesis,
}: ScreenImproveProps) {
  const [impressions, setImpressions] = useState(initialData?.impressions || '480');
  const [clicks, setClicks] = useState(initialData?.clicks || '48');
  const [signups, setSignups] = useState(initialData?.signups || '7');
  const [engagement, setEngagement] = useState(initialData?.engagement || '18');
  const [conversions, setConversions] = useState(initialData?.conversions || '2');
  const [notes, setNotes] = useState(initialData?.notes || (language === 'pt' ? 'Muitas pessoas perguntaram se havia versão gratuita antes de se cadastrar.' : 'Varias personas preguntaron si había versión gratuita antes de registrarse.'));

  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 700);
  };

  const handleSaveLearning = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const loopSteps = t.loopVisual.steps;

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-20">
      
      {/* 1. Header with Cheering Alpaca Mascot */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{t.kicker}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0">
            <AlpacaAvatar className="w-full h-full" mood="cheering" />
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
          ? 'Não existem experimentos fracassados, apenas dados que indicam como ajustar o próximo tiro.' 
          : 'No existen experimentos fallidos, solo datos que indican cómo calibrar el siguiente disparo.'}
      />

      {/* 2. “Resultados del experimento” Form */}
      <section aria-labelledby="results-form-title">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <h2 id="results-form-title" className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>{t.form.title}</span>
            </h2>
            <span className="text-xs text-stone-500 bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200/70">
              {t.form.realDataNote}
            </span>
          </div>

          {/* Data Capture Component - Replaces manual input */}
          <DataCapture
            language={language}
            formData={{ impressions, clicks, signups, engagement, conversions, notes }}
            onDataChange={(data) => {
              setImpressions(data.impressions);
              setClicks(data.clicks);
              setSignups(data.signups);
              setEngagement(data.engagement);
              setConversions(data.conversions);
              setNotes(data.notes);
            }}
            experimentData={{
              message: '',
              cta: '',
              channel: '',
              objective: '',
              hypothesis: '',
            }}
          />

          <div className="pt-1 flex items-center justify-center">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAnalyzing ? t.form.analyzingText : t.form.analyzeButton}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. AI Insights Panel: “Lo que aprendimos” */}
      {hasAnalyzed && (
        <section aria-labelledby="insights-title">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h2 id="insights-title" className="text-lg sm:text-xl font-bold text-stone-900">
                  {t.aiInsights.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-data font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                  {t.aiInsights.demoBadge}
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">
                  {t.aiInsights.confidenceIndicator}
                </span>
              </div>
            </div>

            {/* 4 Structured Learning Quadrants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. FUNCIONÓ */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {t.aiInsights.sections.worked.label}
                  </span>
                  <span className="text-xs font-bold text-emerald-950">
                    {t.aiInsights.sections.worked.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed pt-1">
                  “{t.aiInsights.sections.worked.text}”
                </p>
              </div>

              {/* 2. NO FUNCIONÓ */}
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-xs font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                    {t.aiInsights.sections.didNotWork.label}
                  </span>
                  <span className="text-xs font-bold text-rose-950">
                    {t.aiInsights.sections.didNotWork.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed pt-1">
                  “{t.aiInsights.sections.didNotWork.text}”
                </p>
              </div>

              {/* 3. EVIDENCIA */}
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-xs font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                    {t.aiInsights.sections.evidence.label}
                  </span>
                  <span className="text-xs font-bold text-indigo-950">
                    {t.aiInsights.sections.evidence.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed pt-1 font-mono-data">
                  {t.aiInsights.sections.evidence.text}
                </p>
              </div>

              {/* 4. SIGUIENTE ACCIÓN */}
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {t.aiInsights.sections.nextAction.label}
                  </span>
                  <span className="text-xs font-bold text-amber-950">
                    {t.aiInsights.sections.nextAction.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed pt-1">
                  “{t.aiInsights.sections.nextAction.text}”
                </p>
              </div>
            </div>

            {/* Next Experiment Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50/90 via-amber-50/60 to-purple-50/50 border border-amber-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-amber-900 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {t.nextExperimentCard.title}
                </span>
                <span className="text-[11px] font-mono-data font-bold uppercase tracking-wide bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                  {language === 'pt' ? 'Iteração 02' : 'Iteración 02'}
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-stone-900 leading-relaxed italic bg-white/75 p-4 rounded-xl border border-amber-100">
                “{t.nextExperimentCard.text}”
              </p>

              {/* Botón abajo de Tu próxima hipótesis */}
              <div className="pt-2 border-t border-amber-200/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <p className="text-xs text-amber-950/80 font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t.nextExperimentCard.buttonHint}</span>
                </p>
                <button
                  type="button"
                  data-action="open-next-hypothesis"
                  onClick={onOpenNextHypothesis}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer group shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>{t.nextExperimentCard.buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. Final Loop Visual: DEFINE -> DIAGNOSE -> LEARN -> BUILD -> EXPERIMENT -> EXECUTE -> IMPROVE */}
      <section aria-labelledby="loop-title">
        <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6 text-center">
          <div className="space-y-1">
            <h3 id="loop-title" className="text-xs font-mono-data uppercase tracking-widest text-stone-500 font-bold">
              {t.loopVisual.title}
            </h3>
            <p className="text-lg sm:text-xl font-extrabold text-stone-900">
              {t.loopVisual.centerText}
            </p>
          </div>

          {/* Stepper loop badge row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {loopSteps.map((stepName, idx) => (
              <React.Fragment key={idx}>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-stone-200/90 font-mono-data text-xs font-semibold text-stone-800 shadow-2xs">
                  {stepName}
                </span>
                {idx < loopSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-stone-400 select-none inline-block shrink-0" />
                )}
              </React.Fragment>
            ))}
            <span className="px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs select-none inline-flex items-center justify-center">
              <RotateCcw className="w-3.5 h-3.5 text-amber-900" />
            </span>
          </div>

          {/* Product Philosophy Message */}
          <div className="pt-4 border-t border-stone-200/60 max-w-lg mx-auto space-y-1">
            <p className="text-sm sm:text-base font-bold text-stone-900 whitespace-pre-line leading-snug">
              “{t.finalProductMessage.quote}”
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTAs and Actions */}
      <div className="pt-2 flex flex-col items-center justify-center space-y-4">
        {savedToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{t.savedToast}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-stone-700 text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'pt' ? 'Voltar' : 'Volver'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveLearning}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 font-semibold text-stone-800 text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-stone-500" />
            <span>{t.secondaryCta}</span>
          </button>

          <button
            type="button"
            data-primary-cta="true"
            onClick={onRestartLoop}
            className="w-full sm:w-auto min-w-[240px] py-4 px-8 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            <span>{t.primaryCta}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
