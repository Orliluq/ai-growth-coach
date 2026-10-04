'use client';

import React, { useState } from 'react';
import { 
  ExperimentFormData, 
  ExperimentChannel, 
  ExperimentKpi, 
  ExperimentDuration, 
  BuildFormData,
  Language 
} from '@/types/growth';
import { TranslationSchema } from '@/lib/i18n';
import { AlpacaAvatar, AlpacaGuide } from './AlpacaGuide';
import { 
  FlaskConical, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Target, 
  TrendingUp, 
  Radio, 
  MessageSquare, 
  HelpCircle,
  Lock,
  Check
} from 'lucide-react';

interface ScreenExperimentProps {
  t: TranslationSchema['screenExperiment'];
  language: Language;
  buildData: BuildFormData;
  initialData: Partial<ExperimentFormData>;
  onSubmit: (data: ExperimentFormData) => void;
  onBack: () => void;
  onError?: (message: string) => void;
}

export function ScreenExperiment({
  t,
  language,
  buildData,
  initialData,
  onSubmit,
  onBack,
  onError,
}: ScreenExperimentProps) {
  const [objective, setObjective] = useState(
    initialData.objective || (language === 'pt' 
      ? 'Validar o interesse de 20 pessoas no nosso nicho' 
      : 'Validar el interés de 20 personas en nuestro nicho')
  );

  const defaultHypothesis = language === 'pt'
    ? `Se compartilharmos nossa proposta ("${buildData.valueProposition || 'nossa solução'}") no canal selecionado, esperamos obter cadastros qualificados porque resolve uma dor urgente.`
    : `Si compartimos nuestra propuesta ("${buildData.valueProposition || 'nuestra solución'}") en el canal seleccionado, esperamos obtener registros cualificados porque resuelve un dolor urgente.`;

  const [hypothesis, setHypothesis] = useState(initialData.hypothesis || defaultHypothesis);
  const [channel, setChannel] = useState<ExperimentChannel>(initialData.channel || 'linkedin');
  const [message, setMessage] = useState(
    initialData.message || (buildData.valueProposition 
      ? buildData.valueProposition 
      : (language === 'pt' ? 'Como resolver seu maior obstáculo com passos práticos guiados por IA' : 'Cómo resolver tu mayor obstáculo con pasos prácticos guiados por IA'))
  );
  const [cta, setCta] = useState(
    initialData.cta || (language === 'pt' 
      ? 'Baixar guia prático gratuito' 
      : 'Descargar guía práctica gratuita')
  );
  const [kpi, setKpi] = useState<ExperimentKpi>(initialData.kpi || 'clicks');
  const [baseline, setBaseline] = useState(initialData.baseline || '0');
  const [duration, setDuration] = useState<ExperimentDuration>(initialData.duration || '7d');

  const channelKeys: ExperimentChannel[] = ['linkedin', 'instagram', 'email', 'community', 'website', 'other'];
  const kpiKeys: ExperimentKpi[] = ['reach', 'clicks', 'signups', 'engagement', 'conversions'];
  const durationKeys: ExperimentDuration[] = ['7d', '14d', '30d'];

  const isComplete = objective.trim().length > 0 && hypothesis.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) {
      onError?.(t.validationHint);
      if (!objective.trim()) {
        document.getElementById('exp-objective-input')?.focus();
      } else if (!hypothesis.trim()) {
        document.getElementById('exp-hypothesis-input')?.focus();
      }
      return;
    }

    onSubmit({
      objective: objective.trim(),
      hypothesis: hypothesis.trim(),
      channel,
      message: message.trim(),
      cta: cta.trim(),
      kpi,
      baseline: baseline.trim() || '0',
      duration,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-16">
      
      {/* 1. Header with Alpaca Mascot */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-purple-800 uppercase bg-purple-100/70 px-3 py-1 rounded-lg">
          <FlaskConical className="w-3.5 h-3.5" />
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
          ? 'Definir uma métrica antes de publicar evita a frustração de não saber se deu certo ou errado.' 
          : 'Definir una métrica antes de publicar evita la frustración de no saber si funcionó o no.'}
      />

      {/* 2. Experimento Card */}
      <section aria-labelledby="experiment-card-title">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 id="experiment-card-title" className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>{t.cardTitle}</span>
            </h2>
            <span className="text-[11px] font-mono-data text-stone-400 bg-stone-50 px-2 py-0.5 rounded border border-stone-200/60">
              05
            </span>
          </div>

          <div className="space-y-6">
            {/* Field 1: OBJETIVO */}
            <div className="space-y-1.5">
              <label htmlFor="exp-objective-input" className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                {t.fields.objective.label}
              </label>
              <input
                id="exp-objective-input"
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder={t.fields.objective.placeholder}
                className="w-full p-3 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
              />
            </div>

            {/* Field 2: HIPÓTESIS */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="exp-hypothesis-input" className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                  {t.fields.hypothesis.label}
                </label>
                <span className="text-[11px] text-stone-400">
                  {t.fields.hypothesis.helper}
                </span>
              </div>
              <textarea
                id="exp-hypothesis-input"
                rows={3}
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                placeholder={t.fields.hypothesis.placeholder}
                className="w-full p-3 rounded-xl border border-stone-200 text-stone-900 text-sm leading-relaxed focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
              />
            </div>

            {/* Field 3: CHANNEL / CANAL */}
            <div className="space-y-2">
              <label className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                {t.fields.channel.label}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {channelKeys.map((key) => {
                  const label = t.fields.channel.options[key];
                  const isSelected = channel === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setChannel(key)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-stone-900 border-stone-900 text-white shadow-2xs' 
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{label}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 4: MENSAJE & CTA (2-col grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="exp-message-input" className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                  {t.fields.message.label}
                </label>
                <input
                  id="exp-message-input"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.fields.message.placeholder}
                  className="w-full p-3 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-stone-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="exp-cta-input" className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                  {t.fields.cta.label}
                </label>
                <input
                  id="exp-cta-input"
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  placeholder={t.fields.cta.placeholder}
                  className="w-full p-3 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>

            {/* Field 5: KPI PRINCIPAL, BASELINE & DURATION */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100">
              {/* KPI */}
              <div className="space-y-2">
                <label className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                  {t.fields.kpi.label}
                </label>
                <div className="space-y-1.5">
                  {kpiKeys.map((key) => {
                    const label = t.fields.kpi.options[key];
                    const isSelected = kpi === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setKpi(key)}
                        className={`w-full p-2 rounded-lg border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'bg-amber-100/90 border-amber-300 text-amber-950 font-bold' 
                            : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>{label}</span>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Baseline */}
              <div className="space-y-2">
                <label htmlFor="exp-baseline-input" className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                  {t.fields.baseline.label}
                </label>
                <input
                  id="exp-baseline-input"
                  type="number"
                  value={baseline}
                  onChange={(e) => setBaseline(e.target.value)}
                  placeholder={t.fields.baseline.placeholder}
                  className="w-full p-3 rounded-xl border border-stone-200 text-stone-900 font-mono-data text-sm focus:outline-none focus:border-stone-400"
                />
                <p className="text-[11px] text-stone-400 leading-tight">
                  {language === 'pt' ? 'Valor medido antes de iniciar este teste.' : 'Valor medido antes de iniciar esta prueba.'}
                </p>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="text-xs font-mono-data font-bold text-stone-700 block uppercase tracking-wider">
                  {t.fields.duration.label}
                </label>
                <div className="space-y-1.5">
                  {durationKeys.map((key) => {
                    const label = t.fields.duration.options[key];
                    const isSelected = duration === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setDuration(key)}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'bg-stone-900 border-stone-900 text-white' 
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>{label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. AI Validation Card */}
      <section aria-labelledby="ai-val-title">
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 border border-emerald-200/80 rounded-2xl p-6 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 id="ai-val-title" className="text-sm font-bold text-stone-900">
                {t.aiValidation.title}
              </h3>
            </div>
            <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md self-start sm:self-auto inline-flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-700" />
              <span>{t.aiValidation.badge}</span>
            </span>
          </div>

          <p className="text-sm font-medium text-stone-800 leading-relaxed">
            {t.aiValidation.reviewText}
          </p>

          <p className="text-xs text-stone-500 pt-1 border-t border-emerald-100/60">
            {t.aiValidation.transparency}
          </p>
        </div>
      </section>

      {/* 4. Primary CTA & Secondary Action */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-3">
        {!isComplete && (
          <p className="text-xs text-stone-500 text-center flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.validationHint}</span>
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
