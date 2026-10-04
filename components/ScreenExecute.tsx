'use client';

import React, { useState } from 'react';
import { 
  ExperimentFormData, 
  BuildFormData, 
  ExecuteChecklist,
  Language 
} from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaAvatar, AlpacaGuide } from './AlpacaGuide';
import { 
  Rocket, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  CheckSquare, 
  Square, 
  Eye, 
  Layout, 
  Share2, 
  Compass,
  ArrowDown
} from 'lucide-react';

interface ScreenExecuteProps {
  t: TranslationSchema['screenExecute'];
  language: Language;
  buildData: BuildFormData;
  experimentData: Partial<ExperimentFormData>;
  initialChecklist?: Partial<ExecuteChecklist>;
  onSubmit: (checklist: ExecuteChecklist) => void;
  onBack: () => void;
  onError?: (message: string) => void;
}

export function ScreenExecute({
  t,
  language,
  buildData,
  experimentData,
  initialChecklist,
  onSubmit,
  onBack,
  onError,
}: ScreenExecuteProps) {
  const [checklist, setChecklist] = useState<ExecuteChecklist>({
    messageDefined: initialChecklist?.messageDefined ?? true,
    formatChosen: initialChecklist?.formatChosen ?? true,
    ctaDefined: initialChecklist?.ctaDefined ?? true,
    kpiDefined: initialChecklist?.kpiDefined ?? true,
    publishDateSet: initialChecklist?.publishDateSet ?? false,
  });

  const [canvaSimulated, setCanvaSimulated] = useState(false);

  const toggleCheck = (key: keyof ExecuteChecklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCanvaClick = () => {
    setCanvaSimulated(true);
    setTimeout(() => setCanvaSimulated(false), 4000);
  };

  const checklistKeys: Array<keyof ExecuteChecklist> = [
    'messageDefined',
    'formatChosen',
    'ctaDefined',
    'kpiDefined',
    'publishDateSet',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkedCount = Object.values(checklist).filter(Boolean).length;
    if (checkedCount === 0) {
      onError?.(
        language === 'pt'
          ? 'Marque ao menos um passo de execução realizado antes de medir resultados.'
          : 'Marca al menos un paso de ejecución realizado antes de medir resultados.'
      );
      return;
    }
    onSubmit(checklist);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-16">
      
      {/* 1. Header with Alpaca Mascot */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-800 uppercase bg-rose-100/70 px-3 py-1 rounded-lg">
          <Rocket className="w-3.5 h-3.5" />
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
          ? 'Publique sem medo. A aprendizagem só começa quando a mensagem encontra pessoas reais.' 
          : 'Publica sin miedo. El aprendizaje solo comienza cuando el mensaje encuentra personas reales.'}
      />

      {/* 2. Visual flow: OBJETIVO -> MENSAJE -> FORMATO -> CONTENIDO -> PUBLICACION */}
      <section aria-labelledby="flow-title">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 id="flow-title" className="text-xs font-mono-data font-bold uppercase tracking-wider text-stone-700">
              {t.flowTitle}
            </h2>
            <span className="text-[11px] font-mono-data text-stone-400 bg-stone-50 px-2 py-0.5 rounded border border-stone-200/60">
              06
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-1">
            {t.flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 w-full md:w-auto p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-center space-y-1">
                  <span className="font-mono-data text-[10px] font-bold text-stone-400 block">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    {step}
                  </span>
                </div>
                {idx < t.flowSteps.length - 1 && (
                  <div className="text-stone-300 md:rotate-[-90deg] shrink-0 my-1 md:my-0">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Content Asset Preview Card: “Tu pieza” */}
      <section aria-labelledby="asset-preview-title">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              <h2 id="asset-preview-title" className="text-lg font-bold text-stone-900">
                {t.assetPreview.title}
              </h2>
            </div>
            <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
              {t.assetPreview.fictionalBadge}
            </span>
          </div>

          {/* Social-style card preview mockup */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-amber-50/30 border border-stone-200/90 space-y-4 max-w-2xl mx-auto shadow-xs">
            {/* Format pill */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono-data font-semibold text-stone-600 uppercase">
                {t.assetPreview.formatLabel}: {t.assetPreview.formatText}
              </span>
              <span className="text-stone-400">Canal: {experimentData.channel || 'LinkedIn'}</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-data uppercase font-bold text-stone-400">
                {t.assetPreview.headlineLabel}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                “{experimentData.message || t.assetPreview.headlineText}”
              </h3>
            </div>

            {/* Body */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-data uppercase font-bold text-stone-400">
                {t.assetPreview.bodyLabel}
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {buildData.valueProposition || t.assetPreview.bodyText}
              </p>
            </div>

            {/* CTA button inside preview */}
            <div className="pt-2">
              <span className="text-[10px] font-mono-data uppercase font-bold text-stone-400 block mb-1">
                {t.assetPreview.ctaLabel}
              </span>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs">
                <span>{experimentData.cta || t.assetPreview.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tool Handoff Section: “Crear en Canva” */}
      <section aria-labelledby="canva-handoff-title">
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 border border-indigo-200/70 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-indigo-600" />
                <h3 id="canva-handoff-title" className="text-base font-bold text-stone-900">
                  {t.canvaHandoff.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                {t.canvaHandoff.desc}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCanvaClick}
              className="px-5 py-3 rounded-xl bg-[#00C4CC] hover:bg-[#00B0B8] text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>{t.canvaHandoff.buttonText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {canvaSimulated && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.canvaHandoff.prototypeNotice}</span>
            </div>
          )}
        </div>
      </section>

      {/* 5. Pre-Publication Checklist */}
      <section aria-labelledby="checklist-title">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 id="checklist-title" className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>{t.checklist.title}</span>
            </h3>
            <span className="text-xs font-mono-data text-stone-400">
              {Object.values(checklist).filter(Boolean).length} / 5
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {checklistKeys.map((key, idx) => {
              const label = t.checklist.items[idx];
              const isChecked = checklist[key];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleCheck(key)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : 'bg-stone-50/50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-300 shrink-0" />
                    )}
                    <span>{label}</span>
                  </div>

                  {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Primary CTA & Secondary Action */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-3">
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
            type="submit"
            data-primary-cta="true"
            className="w-full sm:w-auto min-w-[260px] py-4 px-8 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>{t.primaryCta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </form>
  );
}
