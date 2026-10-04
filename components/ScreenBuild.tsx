'use client';

import React, { useState } from 'react';
import { BuildFormData, Language } from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaAvatar, AlpacaGuide } from './AlpacaGuide';
import { 
  Hammer, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Edit3, 
  Target, 
  Users, 
  HeartHandshake, 
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ScreenBuildProps {
  t: TranslationSchema['screenBuild'];
  language: Language;
  initialData: BuildFormData;
  onSubmit: (data: BuildFormData) => void;
  onBack: () => void;
  onError?: (message: string) => void;
}

export function ScreenBuild({
  t,
  language,
  initialData,
  onSubmit,
  onBack,
  onError,
}: ScreenBuildProps) {
  const [problem, setProblem] = useState(initialData.problem || '');
  const [persona, setPersona] = useState(initialData.persona || '');
  const [value, setValue] = useState(initialData.value || '');
  const [valueProposition, setValueProposition] = useState(initialData.valueProposition || '');
  const [proposalIndex, setProposalIndex] = useState(0);
  const [isEditingProposal, setIsEditingProposal] = useState(false);

  const allProposals = [
    t.aiCoachPanel.proposalText,
    ...t.aiCoachPanel.alternateProposals,
  ];

  const currentCoachProposal = allProposals[proposalIndex % allProposals.length];

  const handleUseProposal = () => {
    setValueProposition(currentCoachProposal);
    // If fields are empty, prefill them with contextual defaults from the proposal
    if (!problem.trim()) {
      setProblem(language === 'pt' ? 'Pessoas querem aplicar IA mas não sabem por onde começar' : 'Las personas quieren aplicar IA pero no saben por dónde empezar');
    }
    if (!persona.trim()) {
      setPersona(language === 'pt' ? 'Profissionais que querem aplicar IA no seu trabalho' : 'Profesionales que quieren aplicar IA en su trabajo');
    }
    if (!value.trim()) {
      setValue(language === 'pt' ? 'Transformar uma ideia em uma ação concreta com métricas claras' : 'Convertir una idea en una acción concreta con métricas claras');
    }
  };

  const handleCycleProposal = () => {
    setProposalIndex((prev) => prev + 1);
  };

  const handleEditProposalClick = () => {
    if (!valueProposition) {
      setValueProposition(currentCoachProposal);
    }
    setIsEditingProposal(true);
  };

  // Auto-compose a draft proposition if user is typing custom parts and hasn't locked one
  const computedDraftProp = valueProposition.trim() 
    ? valueProposition 
    : (persona.trim() && problem.trim() && value.trim())
    ? (language === 'pt'
        ? `Para ${persona.trim()} que enfrentam ${problem.trim()}, oferecemos uma solução que permite ${value.trim()}.`
        : `Para ${persona.trim()} que enfrentan ${problem.trim()}, ofrecemos una solución que permite ${value.trim()}.`)
    : '';

  const isComplete = (problem.trim().length > 0 && persona.trim().length > 0 && value.trim().length > 0) || valueProposition.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) {
      onError?.(t.fillFieldsHint);
      if (!problem.trim()) {
        document.getElementById('build-problem-input')?.focus();
      } else if (!persona.trim()) {
        document.getElementById('build-persona-input')?.focus();
      } else if (!value.trim()) {
        document.getElementById('build-value-input')?.focus();
      }
      return;
    }

    const finalProp = valueProposition.trim() || computedDraftProp || currentCoachProposal;

    onSubmit({
      problem: problem.trim() || (language === 'pt' ? 'Problema identificado' : 'Problema identificado'),
      persona: persona.trim() || (language === 'pt' ? 'Público-alvo definido' : 'Público objetivo definido'),
      value: value.trim() || (language === 'pt' ? 'Valor entregue' : 'Valor entregado'),
      valueProposition: finalProp,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-16">
      
      {/* 1. Header with Alpaca Mascot */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase bg-amber-100/70 px-3 py-1 rounded-lg">
          <Hammer className="w-3.5 h-3.5" />
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

      {/* Alpaca Mascot Learning Guide Banner */}
      <AlpacaGuide
        quote={t.alpacaMessage}
        coachName={t.coachName}
        tip={language === 'pt' 
          ? 'Não busque a frase perfeita agora. O importante é expressar com clareza a dor, o público e o alívio entregue.' 
          : 'No busques la frase perfecta ahora. Lo importante es expresar con claridad el dolor, el público y el alivio que entregas.'}
      />

      {/* 2. Main 3-Step Builder Card */}
      <section aria-labelledby="builder-title" className="space-y-6">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h2 id="builder-title" className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{t.mainTitle}</span>
            </h2>
          </div>

          <div className="space-y-5">
            {/* Step 1: PROBLEMA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="build-problem-input" className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 text-xs flex items-center justify-center font-mono-data">
                    1
                  </span>
                  <span>{t.step1.title}</span>
                </label>
              </div>
              <p className="text-xs text-stone-500">
                {t.step1.helper}
              </p>
              <textarea
                id="build-problem-input"
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder={t.step1.placeholder}
                className="w-full p-3.5 rounded-xl border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
              />
            </div>

            {/* Step 2: PERSONA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="build-persona-input" className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-mono-data">
                    2
                  </span>
                  <span>{t.step2.title}</span>
                </label>
              </div>
              <p className="text-xs text-stone-500">
                {t.step2.helper}
              </p>
              <input
                id="build-persona-input"
                type="text"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder={t.step2.placeholder}
                className="w-full p-3.5 rounded-xl border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
              />
            </div>

            {/* Step 3: VALOR */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="build-value-input" className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-mono-data">
                    3
                  </span>
                  <span>{t.step3.title}</span>
                </label>
              </div>
              <p className="text-xs text-stone-500">
                {t.step3.helper}
              </p>
              <textarea
                id="build-value-input"
                rows={2}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t.step3.placeholder}
                className="w-full p-3.5 rounded-xl border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI Coach Panel */}
      <section aria-labelledby="ai-panel-title">
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-purple-50/40 border border-stone-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 id="ai-panel-title" className="text-sm font-bold text-stone-900">
                {t.aiCoachPanel.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-data font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                {t.aiCoachPanel.draftBadge}
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-500 font-medium">
                {t.aiCoachPanel.transparencyNote}
              </span>
            </div>
          </div>

          {/* Proposal preview or editor */}
          {isEditingProposal ? (
            <div className="space-y-2">
              <textarea
                rows={3}
                value={valueProposition}
                onChange={(e) => setValueProposition(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-amber-300 bg-white text-stone-900 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
              <button
                type="button"
                onClick={() => setIsEditingProposal(false)}
                className="text-xs font-bold text-amber-900 hover:underline cursor-pointer"
              >
                {language === 'pt' ? 'Salvar edição' : 'Guardar edición'}
              </button>
            </div>
          ) : (
            <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed italic bg-white/70 p-4 rounded-xl border border-stone-200/70">
              “{valueProposition || currentCoachProposal}”
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleUseProposal}
              className="px-3.5 py-1.5 rounded-lg bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.aiCoachPanel.useProposalBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleEditProposalClick}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.aiCoachPanel.editBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleCycleProposal}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.aiCoachPanel.createAnotherBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Compact “Resultado de este paso” Card */}
      <section aria-labelledby="result-title">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 id="result-title" className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.resultCard.title}</span>
            </h3>
            <span className="text-[11px] font-mono-data text-stone-400 bg-stone-50 px-2 py-0.5 rounded border border-stone-200/60">
              04
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70">
              <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block mb-1">
                {t.resultCard.problemLabel}
              </span>
              <p className="text-xs text-stone-800 line-clamp-2">
                {problem || t.resultCard.emptyPlaceholder}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70">
              <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider block mb-1">
                {t.resultCard.personaLabel}
              </span>
              <p className="text-xs text-stone-800 line-clamp-2">
                {persona || t.resultCard.emptyPlaceholder}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70">
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                {t.resultCard.valueLabel}
              </span>
              <p className="text-xs text-stone-800 line-clamp-2">
                {value || t.resultCard.emptyPlaceholder}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-1">
            <span className="text-[11px] font-semibold text-amber-900/80 uppercase tracking-wider block">
              {t.resultCard.valuePropLabel}
            </span>
            <p className="text-sm font-semibold text-stone-900 italic leading-relaxed">
              “{valueProposition || computedDraftProp || currentCoachProposal}”
            </p>
          </div>
        </div>
      </section>

      {/* 5. Primary CTA & Secondary Action */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-3">
        {!isComplete && (
          <p className="text-xs text-stone-500 text-center flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.fillFieldsHint}</span>
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
