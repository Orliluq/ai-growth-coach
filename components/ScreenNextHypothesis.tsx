'use client';

import React, { useState } from 'react';
import { Language, BuildFormData, ExperimentFormData, ImproveFormData } from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaAvatar } from './AlpacaGuide';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Copy, 
  Sliders, 
  Target, 
  // TrendingUp, 
  // BarChart2, 
  // CheckCircle2, 
  AlertCircle, 
  // ShieldCheck, 
  // Layers, 
  Lightbulb, 
  // Zap, 
  // Calendar, 
  // Users, 
  // MousePointerClick, 
  // FileText, 
  // RotateCcw,
  // ExternalLink
} from 'lucide-react';

interface ScreenNextHypothesisProps {
  t: TranslationSchema['screenNextHypothesis'];
  language: Language;
  buildData?: BuildFormData;
  previousExperimentData?: Partial<ExperimentFormData>;
  previousImproveData?: Partial<ImproveFormData>;
  onBack: () => void;
  onApplyHypothesis: (hypothesisText: string) => void;
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export function ScreenNextHypothesis({
  t,
  language,
  buildData,
  previousImproveData,
  onBack,
  onApplyHypothesis,
  onToast,
}: ScreenNextHypothesisProps) {
  // Traffic simulator state (estimated visitors for Iteration 02)
  const [estimatedClicks, setEstimatedClicks] = useState<number>(100);
  
  // Selected copy angle tab
  const [activeCopyTab, setActiveCopyTab] = useState<number>(0);
  
  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    step_1: true,
    step_2: true,
    step_3: false,
    step_4: false,
  });

  const toggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecklistItems = t.checklist.items.length;
  const progressPercent = Math.round((completedCount / totalChecklistItems) * 100);

  // Calculations for interactive simulator
  // Baseline conversion rate from Step 07 metrics: 7 signups / 48 clicks ≈ 14.58%
  const baselineRate = 0.1458;
  const variantRate = 0.28; // 28% expected with hyper-specific value proposition

  const baselineSignups = Math.round(estimatedClicks * baselineRate);
  const projectedSignups = Math.round(estimatedClicks * variantRate);
  const extraLeads = projectedSignups - baselineSignups;
  const liftPercentage = Math.round(((projectedSignups - baselineSignups) / (baselineSignups || 1)) * 100);

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      onToast(`${label}: ${language === 'pt' ? 'Copiado para a área de transferência!' : '¡Copiado al portapapeles!'}`, 'success');
    }
  };

  const handleCopyFullPlan = () => {
    const fullPlan = `
${t.title}
==================================================
${t.subtitle}

${t.hypothesisCard.label}:
"${t.hypothesisCard.quote}"

PARAMETROS DEL TEST:
- Canal: ${t.hypothesisCard.tags.channelVal}
- Métrica KPI: ${t.hypothesisCard.tags.kpiVal}
- Línea Base: ${t.hypothesisCard.tags.baselineVal}
- Meta Proyectada: ${t.hypothesisCard.tags.targetVal}
- Muestra sugerida: ${t.hypothesisCard.tags.sampleSizeVal}
- Duración: ${t.hypothesisCard.tags.durationVal}

DIAGNOSTICO DEL COACH ALFIE:
${t.coachSection.diagnostic}

A/B TESTING MATRIX:
[Control - V1]: ${t.comparisonMatrix.control.headline}
${t.comparisonMatrix.control.valueProp}
Resultado V1: ${t.comparisonMatrix.control.conversion}

[Variante - V2]: ${t.comparisonMatrix.variant.headline}
${t.comparisonMatrix.variant.valueProp}
Meta V2: ${t.comparisonMatrix.variant.conversion}

COPY SELECCIONADO (Ángulo: ${t.copySection.copies[activeCopyTab].angle}):
Hook: ${t.copySection.copies[activeCopyTab].hook}
Body: ${t.copySection.copies[activeCopyTab].body}
CTA: ${t.copySection.copies[activeCopyTab].cta}
`.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullPlan);
      onToast(t.footer.copiedToast, 'success');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. TOP BREADCRUMB & CONTEXT BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 px-3.5 py-2 rounded-xl transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>{t.backToImprove}</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono-data text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-3 py-1 rounded-lg border border-amber-200/60">
            {t.badge}
          </span>
          <span className="font-mono-data text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/70 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t.statusBadge}
          </span>
        </div>
      </div>

      {/* 2. HERO SECTION / HYPOTHESIS TITLE */}
      <section className="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-purple-500/10 border border-amber-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900 text-amber-100 font-mono-data text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.iterationLabel}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>

          {/* Golden Highlight Hypothesis Card */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white/95 border-2 border-amber-400/80 shadow-md space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-700" />
                {t.hypothesisCard.label}
              </span>
              <span className="text-[11px] font-mono-data text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-md">
                {language === 'pt' ? 'Fórmula Se ... Esperamos ...' : 'Fórmula Si ... Esperamos ...'}
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-stone-900 leading-snug italic">
              “{t.hypothesisCard.quote}”
            </p>
          </div>

          {/* 6 Metric Context Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-stone-500 block">
                {t.hypothesisCard.tags.channel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 truncate block mt-0.5">
                {t.hypothesisCard.tags.channelVal}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-stone-500 block">
                {t.hypothesisCard.tags.kpi}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 truncate block mt-0.5">
                {t.hypothesisCard.tags.kpiVal}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-stone-500 block">
                {t.hypothesisCard.tags.baseline}
              </span>
              <span className="text-xs sm:text-sm font-bold text-amber-900 truncate block mt-0.5">
                {t.hypothesisCard.tags.baselineVal}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-200/80">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-emerald-700 block">
                {t.hypothesisCard.tags.target}
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-900 truncate block mt-0.5">
                {t.hypothesisCard.tags.targetVal}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-stone-500 block">
                {t.hypothesisCard.tags.sampleSize}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 truncate block mt-0.5">
                {t.hypothesisCard.tags.sampleSizeVal}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-stone-500 block">
                {t.hypothesisCard.tags.duration}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 truncate block mt-0.5">
                {t.hypothesisCard.tags.durationVal}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COACH ALFIE FORENSIC BREAKDOWN */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex items-center gap-3">
          <AlpacaAvatar mood="friendly" className="w-14 h-14" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm sm:text-base">{t.coachSection.coachName}</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono-data bg-amber-100 text-amber-900 font-bold uppercase">
                {language === 'pt' ? 'Diagnóstico Forense' : 'Diagnóstico Forense'}
              </span>
            </div>
            <p className="text-xs text-stone-500">{t.coachSection.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
            <span className="font-mono-data text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              {language === 'pt' ? 'O Que Revelam os Dados Anteriores' : 'Qué Revelan los Datos Anteriores'}
            </span>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {t.coachSection.diagnostic}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <span className="font-mono-data text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
              {t.coachSection.keyInsight}
            </span>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
              “{t.coachSection.quote}”
            </p>
          </div>
        </div>
      </section>

      {/* 4. A/B TEST MATRIX (CONTROL VS VARIANT) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono-data font-bold uppercase tracking-widest text-stone-500">
            {language === 'pt' ? 'Matriz Comparativa A/B' : 'Matriz Comparativa A/B'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            {t.comparisonMatrix.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {t.comparisonMatrix.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* CONTROL CARD (V1) */}
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-mono-data text-xs font-bold uppercase tracking-wider">
                  {t.comparisonMatrix.control.badge}
                </span>
                <span className="text-xs font-mono-data text-stone-400 font-medium">
                  {language === 'pt' ? 'Ciclo 01 Executado' : 'Ciclo 01 Ejecutado'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {t.comparisonMatrix.control.title}
              </h3>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/90 space-y-1">
                <span className="text-[10px] font-mono-data uppercase text-stone-400 font-semibold block">
                  {language === 'pt' ? 'Mensagem / Chamada Anterior' : 'Mensaje / Llamada Anterior'}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-800 italic">
                  “{t.comparisonMatrix.control.headline}”
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600">
                <p><strong className="text-stone-800">{language === 'pt' ? 'Abordagem:' : 'Enfoque:'}</strong> {t.comparisonMatrix.control.valueProp}</p>
                <p><strong className="text-stone-800">{language === 'pt' ? 'Fricção observada:' : 'Fricción observada:'}</strong> {t.comparisonMatrix.control.friction}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
              <span className="text-xs font-mono-data text-stone-500 font-semibold">{language === 'pt' ? 'Conversão real obtida:' : 'Conversión real obtenida:'}</span>
              <span className="text-sm font-mono-data font-black text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
                {t.comparisonMatrix.control.conversion}
              </span>
            </div>
          </div>

          {/* VARIANT CARD (V2 - HYPOTHESIS TEST) */}
          <div className="bg-gradient-to-b from-amber-50/60 to-white border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-200/90 text-amber-950 font-mono-data text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  {t.comparisonMatrix.variant.badge}
                </span>
                <span className="text-xs font-mono-data text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {language === 'pt' ? '+93% esperado' : '+93% esperado'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {t.comparisonMatrix.variant.title}
              </h3>

              <div className="p-3.5 rounded-xl bg-amber-100/60 border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-mono-data uppercase text-amber-900 font-bold block">
                  {language === 'pt' ? 'Nova Mensagem Calibrada com Especificidade' : 'Nuevo Mensaje Calibrado con Especificidad'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-stone-950 italic">
                  “{t.comparisonMatrix.variant.headline}”
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-stone-700">
                <p><strong className="text-stone-900">{language === 'pt' ? 'Abordagem:' : 'Enfoque:'}</strong> {t.comparisonMatrix.variant.valueProp}</p>
                <p><strong className="text-stone-900">{language === 'pt' ? 'Fricção resolvida:' : 'Fricción resuelta:'}</strong> {t.comparisonMatrix.variant.frictionResolved}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-xs font-mono-data text-amber-900 font-bold">{language === 'pt' ? 'Conversão projetada:' : 'Conversión proyectada:'}</span>
              <span className="text-sm font-mono-data font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md shadow-2xs">
                {t.comparisonMatrix.variant.conversion}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ROI & CONVERSION SIMULATOR */}
      <section className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-stone-600">
                {t.simulator.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {t.simulator.subtitle}
            </p>
          </div>

          <span className="text-xs font-mono-data text-stone-500 bg-white border border-stone-200 px-2.5 py-1 rounded-lg">
            {language === 'pt' ? 'Modelo Preditivo' : 'Modelo Predictivo'}
          </span>
        </div>

        {/* Interactive Slider */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
            <span>{t.simulator.sliderLabel}</span>
            <span className="font-mono-data font-black text-amber-900 text-sm bg-amber-100/90 px-2.5 py-0.5 rounded-md">
              {estimatedClicks} {language === 'pt' ? 'cliques' : 'clics'}
            </span>
          </div>
          <input
            type="range"
            min={40}
            max={500}
            step={10}
            value={estimatedClicks}
            onChange={(e) => setEstimatedClicks(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-800"
          />
          <div className="flex justify-between text-[11px] font-mono-data text-stone-400">
            <span>40</span>
            <span>100 (Recomendado)</span>
            <span>250</span>
            <span>500</span>
          </div>
        </div>

        {/* Real-time calculated outcomes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="bg-white p-4 rounded-xl border border-stone-200/90 space-y-1 shadow-2xs">
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-stone-500 block">
              {t.simulator.controlResult} (14.5%)
            </span>
            <span className="text-xl sm:text-2xl font-black text-stone-700 font-mono-data block">
              {baselineSignups}
            </span>
            <span className="text-[11px] text-stone-500 block">
              {language === 'pt' ? 'cadastros estimados' : 'registros estimados'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-emerald-300 space-y-1 shadow-2xs">
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-emerald-800 font-bold block">
              {t.simulator.variantResult} (28.0%)
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-800 font-mono-data block">
              {projectedSignups}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block">
              {language === 'pt' ? 'cadastros com especificidade' : 'registros con especificidad'}
            </span>
          </div>

          <div className="bg-amber-900 text-white p-4 rounded-xl space-y-1 shadow-2xs">
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-amber-200 font-bold block">
              {t.simulator.liftLabel}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black font-mono-data text-white">
                +{extraLeads}
              </span>
              <span className="text-xs font-mono-data text-amber-300 font-bold">
                (+{liftPercentage}%)
              </span>
            </div>
            <span className="text-[11px] text-amber-100/90 block">
              {language === 'pt' ? 'novos usuários sem custo extra' : 'nuevos usuarios sin costo extra'}
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-500 italic text-center sm:text-left">
          {t.simulator.summaryNote}
        </p>
      </section>

      {/* 6. TESTED HIGH-CONVERTING COPIES (3 ANGLES WITH 1-CLICK COPY) */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono-data font-bold uppercase tracking-widest text-stone-500">
              {language === 'pt' ? 'Materiais Prontos com IA' : 'Materiales Listos con IA'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              {t.copySection.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {t.copySection.subtitle}
            </p>
          </div>
        </div>

        {/* Copy Angle Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
          {t.copySection.copies.map((copyItem, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveCopyTab(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCopyTab === idx
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              <span>{copyItem.angle}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono-data ${
                activeCopyTab === idx ? 'bg-amber-800 text-amber-200' : 'bg-stone-200 text-stone-600'
              }`}>
                {copyItem.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Active Copy Details */}
        {t.copySection.copies[activeCopyTab] && (
          <div className="bg-stone-50/70 border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-amber-900">
                  {language === 'pt' ? '1. Gancho de Atenção (Hook):' : '1. Gancho de Atención (Hook):'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyText(t.copySection.copies[activeCopyTab].hook, 'Hook')}
                  className="text-xs text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{language === 'pt' ? 'Copiar' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-sm sm:text-base font-bold text-stone-900 bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                {t.copySection.copies[activeCopyTab].hook}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-amber-900">
                  {language === 'pt' ? '2. Corpo com Propuesta Específica:' : '2. Cuerpo con Propuesta Específica:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyText(t.copySection.copies[activeCopyTab].body, 'Body')}
                  className="text-xs text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{language === 'pt' ? 'Copiar' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs whitespace-pre-line">
                {t.copySection.copies[activeCopyTab].body}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-amber-900">
                  {language === 'pt' ? '3. Chamada para Ação (CTA Irresistível):' : '3. Llamada a la Acción (CTA Irresistible):'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyText(t.copySection.copies[activeCopyTab].cta, 'CTA')}
                  className="text-xs text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{language === 'pt' ? 'Copiar' : 'Copiar'}</span>
                </button>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                <span className="text-xs sm:text-sm font-black text-amber-900 font-mono-data">
                  {t.copySection.copies[activeCopyTab].cta}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {language === 'pt' ? 'Ação sem atrito' : 'Acción sin fricción'}
                </span>
              </div>
            </div>

            {/* Quick action to copy full post */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const fullCopy = `${t.copySection.copies[activeCopyTab].hook}\n\n${t.copySection.copies[activeCopyTab].body}\n\n${t.copySection.copies[activeCopyTab].cta}`;
                  handleCopyText(fullCopy, t.copySection.copies[activeCopyTab].angle);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copySection.copyButtonText}</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 7. STEP-BY-STEP EXECUTION CHECKLIST */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono-data font-bold uppercase tracking-widest text-stone-500">
              {language === 'pt' ? 'Protocolo de Execução' : 'Protocolo de Ejecución'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              {t.checklist.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {t.checklist.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-50 border border-stone-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-700">
            <span>{completedCount}/{totalChecklistItems} {language === 'pt' ? 'concluídos' : 'completados'}</span>
            <span className="font-mono-data font-bold text-amber-900">({progressPercent}%)</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Checklist items */}
        <div className="space-y-3 pt-1">
          {t.checklist.items.map((item) => {
            const isDone = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDone 
                    ? 'bg-emerald-50/40 border-emerald-200/90' 
                    : 'bg-white border-stone-200/80 hover:bg-stone-50/60'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isDone 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'border-stone-300 bg-white'
                }`}>
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-data text-[10px] uppercase font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                      {item.phase}
                    </span>
                    <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'text-stone-900 line-through opacity-80' : 'text-stone-900'}`}>
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. DECISION RULES (TRAFFIC LIGHT FRAMEWORK) */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
        <div>
          <span className="text-xs font-mono-data font-bold uppercase tracking-widest text-stone-500">
            {language === 'pt' ? 'Critérios de Sucesso' : 'Criterios de Éxito'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            {t.decisionRules.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.decisionRules.rules.map((rule, idx) => {
            const isSuccess = rule.status === 'success';
            const isWarning = rule.status === 'warning';
            
            return (
              <div 
                key={idx}
                className={`p-5 rounded-xl border space-y-2 flex flex-col justify-between ${
                  isSuccess 
                    ? 'bg-emerald-50/60 border-emerald-200' 
                    : isWarning 
                    ? 'bg-amber-50/60 border-amber-200' 
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="space-y-1.5">
                  <span className={`text-[10px] font-mono-data font-bold uppercase px-2 py-0.5 rounded inline-block ${
                    isSuccess 
                      ? 'bg-emerald-200/80 text-emerald-950' 
                      : isWarning 
                      ? 'bg-amber-200/80 text-amber-950' 
                      : 'bg-rose-200/80 text-rose-950'
                  }`}>
                    {rule.threshold}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                    {rule.title}
                  </h4>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed pt-2 border-t border-stone-200/60">
                  {rule.action}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. BOTTOM ACTIONS BAR */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 font-semibold text-stone-700 text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.footer.backBtn}</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopyFullPlan}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 font-semibold text-stone-800 text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4 text-stone-500" />
            <span>{t.footer.copyPlanBtn}</span>
          </button>

          <button
            type="button"
            data-primary-cta="true"
            onClick={() => onApplyHypothesis(t.hypothesisCard.quote)}
            className="w-full sm:w-auto min-w-[240px] py-4 px-8 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            <span>{t.footer.applyHypothesisBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
