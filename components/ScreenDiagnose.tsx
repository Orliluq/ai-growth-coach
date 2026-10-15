'use client';

import React, { useState } from 'react';
import { 
  CurrentAssetId, 
  MainChallengeId, 
  ExperienceLevel, 
  DiagnoseFormData,
  GrowthFormData,
  GrowthAIContext,
  Language 
} from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaAvatar, AlpacaGuide } from './AlpacaGuide';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  // HelpCircle,
  Users,
  Boxes,
  AlertTriangle,
  GraduationCap,
  // Layers,
  Lock,
  Sprout,
  Smartphone,
  Mail,
  Briefcase,
  Package,
  Brain,
  Download,
  // Eye,
  Loader2
} from 'lucide-react';
import { TOOL_LINKS } from '@/lib/tool-links';

interface ScreenDiagnoseProps {
  t: TranslationSchema['screenDiagnose'];
  language: Language;
  defineData: GrowthFormData;
  initialData?: Partial<DiagnoseFormData>;
  onSubmit: (diagnoseData: DiagnoseFormData, aiContext: GrowthAIContext) => void;
  onBack: () => void;
  onError?: (message: string) => void;
}

export function ScreenDiagnose({
  t,
  language,
  defineData,
  initialData,
  onSubmit,
  onBack,
  onError,
}: ScreenDiagnoseProps) {
  const [audience, setAudience] = useState<string>(initialData?.audience || '');
  const [currentAssets, setCurrentAssets] = useState<CurrentAssetId[]>(initialData?.currentAssets || []);
  const [otherAsset, setOtherAsset] = useState<string>(initialData?.otherAsset || '');
  const [mainChallenge, setMainChallenge] = useState<MainChallengeId | null>(initialData?.mainChallenge || null);
  const [otherChallenge, setOtherChallenge] = useState<string>(initialData?.otherChallenge || '');
  const [marketingExperience, setMarketingExperience] = useState<ExperienceLevel | null>(
    initialData?.marketingExperience || defineData.experience || 'beginner'
  );

  // Re-sync when persisted data arrives from the parent after mount.
  // Render-phase adjustment avoids a cascading render.
  const [syncedData, setSyncedData] = useState(initialData);
  if (initialData !== syncedData) {
    setSyncedData(initialData);
    setAudience(initialData?.audience || '');
    setCurrentAssets(initialData?.currentAssets || []);
    setOtherAsset(initialData?.otherAsset || '');
    setMainChallenge(initialData?.mainChallenge || null);
    setOtherChallenge(initialData?.otherChallenge || '');
    setMarketingExperience(initialData?.marketingExperience || defineData.experience || 'beginner');
  }

  // Asset list configurations with icons for visual clarity
  const assetOptions: Array<{ 
    id: CurrentAssetId; 
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
  }> = [
    { id: 'no_audience', icon: Sprout, iconColor: 'text-emerald-600' },
    { id: 'social_media', icon: Smartphone, iconColor: 'text-blue-600' },
    { id: 'community', icon: Users, iconColor: 'text-indigo-600' },
    { id: 'newsletter', icon: Mail, iconColor: 'text-amber-600' },
    { id: 'clients', icon: Briefcase, iconColor: 'text-stone-700' },
    { id: 'course_product', icon: Package, iconColor: 'text-purple-600' },
    { id: 'other', icon: Sparkles, iconColor: 'text-amber-500' },
  ];

  // Challenge list configurations
  const challengeOptions: Array<{ id: MainChallengeId; tag: string }> = [
    { id: 'target_audience', tag: '01' },
    { id: 'differentiation', tag: '02' },
    { id: 'attract', tag: '03' },
    { id: 'engagement', tag: '04' },
    { id: 'content_creation', tag: '05' },
    { id: 'metrics', tag: '06' },
    { id: 'what_to_change', tag: '07' },
    { id: 'other', tag: '08' },
  ];

  const experienceOptions: ExperienceLevel[] = ['beginner', 'basics', 'experienced'];

  // Multi-select toggle for assets
  const handleToggleAsset = (assetId: CurrentAssetId) => {
    if (assetId === 'no_audience') {
      // If choosing "no audience yet", toggle it exclusively or cleanly
      if (currentAssets.includes('no_audience')) {
        setCurrentAssets([]);
      } else {
        setCurrentAssets(['no_audience']);
      }
      return;
    }

    // If selecting another asset, remove "no_audience" if it was present
    const withoutNoAudience = currentAssets.filter((id) => id !== 'no_audience');
    if (withoutNoAudience.includes(assetId)) {
      setCurrentAssets(withoutNoAudience.filter((id) => id !== assetId));
    } else {
      setCurrentAssets([...withoutNoAudience, assetId]);
    }
  };

  // Check validation requirements for CTA
  const isAudienceValid = audience.trim().length > 0;
  const isAssetsValid = currentAssets.length > 0 && (!currentAssets.includes('other') || otherAsset.trim().length > 0);
  const isChallengeValid = mainChallenge !== null && (mainChallenge !== 'other' || otherChallenge.trim().length > 0);
  const isExperienceValid = marketingExperience !== null;
  const [isGenerating, setIsGenerating] = useState(false);
  const isFormComplete = isAudienceValid && isAssetsValid && isChallengeValid && isExperienceValid;

  const buildCoachContext = () => {
    const isPt = language === 'pt';

    if (isPt) {
      return `AI GROWTH COACH — CONTEXTO

              Idioma: Português do Brasil

              Público-alvo:
              ${audience || 'A definir'}

              O que você tem atualmente:
              ${currentAssets.map(id => t.q2.options[id]).join(', ')}

              Principal desafio:
              ${mainChallenge ? t.q3.options[mainChallenge] : 'A definir'}

              Experiência com Marketing:
              ${marketingExperience ? t.q4.options[marketingExperience].label : 'A definir'}

              Preciso que você me ajude a:
              - Interpretar meu cenário atual
              - Identificar pontos de melhoria
              - Sugerir próximos passos

              Não invente dados.
              Diferencie fatos, hipóteses, inferências e recomendações.
              A decisão final pertence à pessoa.`;
    }

    return `AI GROWTH COACH — CONTEXTO

            Idioma: Español

            Audiencia:
            ${audience || 'A definir'}

            Qué tienes actualmente:
            ${currentAssets.map(id => t.q2.options[id]).join(', ')}

            Principal desafío:
            ${mainChallenge ? t.q3.options[mainChallenge] : 'A definir'}

            Experiencia en Marketing:
            ${marketingExperience ? t.q4.options[marketingExperience].label : 'A definir'}

            Necesito que me ayudes a:
            - Interpretar mi escenario actual
            - Identificar puntos de mejora
            - Sugerir próximos pasos

            No inventes datos.
            Diferencia hechos, hipótesis, inferencias y recomendaciones.
            La decisión final corresponde a la persona.`;
      };

  const handleOpenGrowthCoach = async () => {
    const context = buildCoachContext();

    try {
      await navigator.clipboard.writeText(context);
    } catch {
      // El usuario todavía podrá abrir el Gem aunque el clipboard falle.
    }

    window.open(
      TOOL_LINKS.growthCoachGem,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleDownloadGuide = () => {
  setIsGenerating(true);

  const url = new URL(
    TOOL_LINKS.practicalGuide,
    window.location.origin
  );

  url.searchParams.set('download', '1');
  url.searchParams.set('lang', language);

  window.open(
    url.toString(),
    '_blank',
    'noopener,noreferrer'
  );

  // El PDF se genera en la nueva pestaña.
  // Liberamos el estado del botón después de abrirla.
  window.setTimeout(() => {
    setIsGenerating(false);
  }, 1000);
};

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete) {
      if (!isAudienceValid) {
        onError?.(language === 'pt' ? 'Por favor descreva o público que você quer alcançar.' : 'Por favor describe a quién quieres llegar.');
        const el = document.getElementById('target-audience-input');
        el?.focus();
      } else if (!isAssetsValid) {
        onError?.(language === 'pt' ? 'Selecione o que você tem atualmente para continuar.' : 'Selecciona qué tienes actualmente para continuar.');
      } else if (!isChallengeValid) {
        onError?.(language === 'pt' ? 'Escolha sua principal dificuldade para continuar.' : 'Elige tu principal dificultad para continuar.');
      } else {
        onError?.(t.requiredHint);
      }
      return;
    }

    const diagnoseData: DiagnoseFormData = {
      audience: audience.trim(),
      currentAssets,
      otherAsset: currentAssets.includes('other') ? otherAsset.trim() : undefined,
      mainChallenge,
      otherChallenge: mainChallenge === 'other' ? otherChallenge.trim() : undefined,
      marketingExperience,
    };

    // Format conceptual AI context structure
    const aiContext: GrowthAIContext = {
      audience: audience.trim(),
      current_assets: currentAssets.map((id) => {
        if (id === 'other' && otherAsset.trim()) {
          return `Otro: ${otherAsset.trim()}`;
        }
        return t.q2.options[id];
      }),
      main_challenge: mainChallenge === 'other' && otherChallenge.trim()
        ? `Otro: ${otherChallenge.trim()}`
        : mainChallenge ? t.q3.options[mainChallenge] : '',
      marketing_experience: marketingExperience ? t.q4.options[marketingExperience].label : '',
      language: language === 'pt' ? 'pt-BR' : 'es',
      project_type: defineData.goalCategory || 'product',
      objective: defineData.targetDescription,
      timeframe: defineData.timeline || '30d',
    };

    onSubmit(diagnoseData, aiContext);
  };

  return (
    <form onSubmit={handleContinue} className="space-y-10 max-w-4xl mx-auto pb-16">
      
      {/* Screen Hero / Headline with Small Alpaca Mascot on Top / Side */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-800 uppercase bg-indigo-100/70 px-3 py-1 rounded-lg">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>{t.kicker}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0">
            <AlpacaAvatar className="w-full h-full" mood="thinking" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            {t.headline}
          </h1>
        </div>

        <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
          {t.supportingText}
        </p>
      </div>

      {/* Alpaca Coach Strategic Guidance Banner */}
      <AlpacaGuide
        quote={t.alpacaMessage}
        language={language}
        coachName={t.coachName}
        tip={language === 'pt' 
          ? 'Não se preocupe em acertar jargões técnicos. Seja sincero com a sua realidade atual.' 
          : 'No te preocupes por acertar términos técnicos. Sé transparente con tu realidad actual.'}
      />

      {/* QUESTION 1: “¿A quién quieres llegar?” */}
      <section className="space-y-4">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-2xs">
          <div className="mb-3">
            <label 
              htmlFor="target-audience-input"
              className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2"
            >
              <Users className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{t.q1.title}</span>
            </label>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t.q1.helper}
            </p>
          </div>

          <div className="relative">
            <textarea
              id="target-audience-input"
              rows={3}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder={t.q1.placeholder}
              className="w-full p-4 rounded-xl border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm sm:text-base leading-relaxed focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
            />
            {audience.length > 0 && (
              <div className="absolute right-3 bottom-3 text-xs font-mono-data text-stone-400">
                {audience.length} caracteres
              </div>
            )}
          </div>

          {/* Prompt chips for inspiration */}
          <div className="mt-3.5 pt-3 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-500 block mb-2">
              {t.q1.chipsLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {t.q1.chips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAudience(chip)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-amber-50 hover:text-amber-900 border border-stone-200 hover:border-amber-200 text-stone-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{chip}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUESTION 2: “¿Qué tienes actualmente?” (Multi-select cards) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>{t.q2.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t.q2.helper}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {assetOptions.map((opt) => {
            const label = t.q2.options[opt.id];
            const isSelected = currentAssets.includes(opt.id);

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleToggleAsset(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-white border-stone-800 shadow-sm ring-2 ring-stone-900/10'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-stone-50 border border-stone-100 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <opt.icon className={`w-4 h-4 ${opt.iconColor}`} />
                  </span>
                  <span className="font-semibold text-sm text-stone-800 leading-snug">
                    {label}
                  </span>
                </div>

                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'border-stone-300 bg-stone-50'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Inline input if "Otro" is selected */}
        {currentAssets.includes('other') && (
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5">
            <label htmlFor="other-asset-input" className="text-xs font-semibold text-stone-700 block">
              {t.otherFieldLabel}
            </label>
            <input
              id="other-asset-input"
              type="text"
              value={otherAsset}
              onChange={(e) => setOtherAsset(e.target.value)}
              placeholder={t.otherPlaceholder}
              className="w-full p-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
            />
          </div>
        )}
      </section>

      {/* QUESTION 3: “¿Cuál es tu principal dificultad?” (Single-select cards) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{t.q3.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t.q3.helper}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {challengeOptions.map((opt) => {
            const label = t.q3.options[opt.id];
            const isSelected = mainChallenge === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMainChallenge(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-white border-stone-800 shadow-sm ring-2 ring-stone-900/10'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono-data text-xs font-semibold text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                    {opt.tag}
                  </span>
                  <span className="font-medium text-sm text-stone-800 leading-snug">
                    {label}
                  </span>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'border-stone-300 bg-white'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Inline input if "Otro" difficulty is selected */}
        {mainChallenge === 'other' && (
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5">
            <label htmlFor="other-challenge-input" className="text-xs font-semibold text-stone-700 block">
              {t.otherFieldLabel}
            </label>
            <input
              id="other-challenge-input"
              type="text"
              value={otherChallenge}
              onChange={(e) => setOtherChallenge(e.target.value)}
              placeholder={t.otherPlaceholder}
              className="w-full p-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
            />
          </div>
        )}
      </section>

      {/* QUESTION 4: “¿Qué tan familiarizado estás con Marketing?” */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{t.q4.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t.q4.helper}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {experienceOptions.map((level) => {
            const data = t.q4.options[level];
            const isSelected = marketingExperience === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => setMarketingExperience(level)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-stone-800 shadow-sm ring-2 ring-stone-900/10'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm text-stone-900">
                      {data.label}
                    </h3>
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

      {/* AI PREVIEW CARD (Strictly a preview of what will happen next, no fake diagnosis results) */}
      <section aria-label="AI Coach Preview" className="pt-2">
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-indigo-50/40 border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
              {t.aiPreview.badge}
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs font-semibold text-stone-700">
              {t.aiPreview.title}
            </span>
          </div>

          <p className="text-sm sm:text-[15px] text-stone-800 font-medium leading-relaxed">
            {t.aiPreview.text}
          </p>

          <p className="text-xs text-stone-400 pt-1">
            {t.aiPreview.notice}
          </p>
        </div>
      </section>

      {/* AI Growth Coach Integration Block */}
      <section aria-labelledby="ai-coach-integration-heading">
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/60 border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-indigo-600" />
            </div>

            <div className="space-y-1 flex-1">
              <h2
                id="ai-coach-integration-heading"
                className="text-lg font-bold text-stone-900"
              >
                AI Growth Coach
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {language === 'pt'
                  ? 'Precisa de ajuda para interpretar os resultados ou decidir o que fazer a seguir?'
                  : '¿Necesitas ayuda para interpretar los resultados o decidir qué hacer a continuación?'}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              type="button"
              onClick={handleOpenGrowthCoach}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                {language === 'pt'
                  ? 'Consultar AI Growth Coach ↗'
                  : 'Consultar AI Growth Coach ↗'}
              </span>
            </button>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-white/70 border border-stone-200/70">
            <p className="text-[11px] leading-relaxed text-stone-500">
              {language === 'pt'
                ? 'Seu contexto será copiado automaticamente para facilitar a consulta.'
                : 'Tu contexto será copiado automáticamente para facilitar la consulta.'}
            </p>
          </div>
        </div>
      </section>

      {/* Practical Guide Download Block */}
      <section aria-labelledby="guide-download-heading">
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="space-y-1 flex-1">
              <h2
                id="guide-download-heading"
                className="text-lg font-bold text-stone-900"
              >
                Guía práctica
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {language === 'pt'
                  ? 'Obtenha um guia prático para aplicar o que aprendeu sobre community growth.'
                  : 'Obtén una guía práctica para aplicar lo que aprendiste sobre community growth.'}
              </p>
            </div>
          </div>

          <div className="mt-4 w-full sm:w-auto flex items-center justify-center flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleDownloadGuide}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-900 px-8 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isGenerating ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {language === 'pt' ? 'Gerando PDF...' : 'Generando PDF...'}
            </span>
            ) : (
            <span className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5" />
              {language === 'pt' ? 'Ver guía ↗' : 'Ver guía ↗'}
            </span>
            )}
          </button>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-white/70 border border-stone-200/70">
            <p className="text-[11px] leading-relaxed text-stone-500">
              {language === 'pt'
                ? 'Este guia complementa o aprendizado do NotebookLM com exemplos práticos.'
                : 'Esta guía complementa el aprendizaje de NotebookLM con ejemplos prácticos.'}
            </p>
          </div>
        </div>
      </section>

      {/* Actions: Primary CTA and Secondary "Volver" */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-3">
        {!isFormComplete && (
          <p className="text-xs text-stone-500 text-center flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.requiredHint}</span>
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
