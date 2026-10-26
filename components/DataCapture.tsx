'use client';

import React, { useState } from 'react';
import { Language, ImproveFormData } from '@/types/growth';
import { 
  FileText, 
  Sheet, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { TOOL_LINKS } from '@/lib/tool-links';

interface DataCaptureProps {
  language: Language;
  formData: ImproveFormData;
  onDataChange: (data: ImproveFormData) => void;
  experimentData?: {
    message?: string;
    cta?: string;
    channel?: string;
    objective?: string;
    hypothesis?: string;
  };
}

export function DataCapture({
  language,
  formData,
  onDataChange,
  experimentData,
}: DataCaptureProps) {
  const [isLoadingFromForm, setIsLoadingFromForm] = useState(false);
  const [isLoadingFromSheet, setIsLoadingFromSheet] = useState(false);
  const [dataSource, setDataSource] = useState<'manual' | 'form' | 'sheet'>('manual');

  const handleOpenForm = () => {
    const params = new URLSearchParams({
      message: experimentData?.message || '',
      cta: experimentData?.cta || '',
      channel: experimentData?.channel || '',
      objective: experimentData?.objective || '',
      hypothesis: experimentData?.hypothesis || '',
      language,
    });

    const url = `${TOOL_LINKS.improveForm}?${params.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenSheet = () => {
    const params = new URLSearchParams({
      message: experimentData?.message || '',
      cta: experimentData?.cta || '',
      channel: experimentData?.channel || '',
      objective: experimentData?.objective || '',
      hypothesis: experimentData?.hypothesis || '',
      language,
    });

    const url = `${TOOL_LINKS.resultsSheet}?${params.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLoadFromForm = () => {
    setIsLoadingFromForm(true);
    // Simular carga de datos del formulario
    setTimeout(() => {
      onDataChange({
        ...formData,
        impressions: '520',
        clicks: '62',
        signups: '12',
        engagement: '24',
        conversions: '4',
        notes: language === 'pt'
          ? 'Feedback do formulário: 45% dos participantes pediram mais exemplos práticos.'
          : 'Feedback del formulario: 45% de los participantes pidieron más ejemplos prácticos.',
      });
      setDataSource('form');
      setIsLoadingFromForm(false);
    }, 1500);
  };

  const handleLoadFromSheet = () => {
    setIsLoadingFromSheet(true);
    // Simular carga de datos de la hoja de cálculo
    setTimeout(() => {
      onDataChange({
        ...formData,
        impressions: '480',
        clicks: '48',
        signups: '7',
        engagement: '18',
        conversions: '2',
        notes: language === 'pt'
          ? 'Dados da planilha: CTR de 10%, taxa de conversão de 4.2%.'
          : 'Datos de la hoja de cálculo: CTR del 10%, tasa de conversión del 4.2%.',
      });
      setDataSource('sheet');
      setIsLoadingFromSheet(false);
    }, 1500);
  };

  const calculateMetrics = () => {
    const impressions = parseInt(formData.impressions) || 0;
    const clicks = parseInt(formData.clicks) || 0;
    const signups = parseInt(formData.signups) || 0;
    const conversions = parseInt(formData.conversions) || 0;

    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : '0';
    const conversionRate = clicks > 0 ? ((signups / clicks) * 100).toFixed(1) : '0';
    const finalConversion = impressions > 0 ? ((conversions / impressions) * 100).toFixed(1) : '0';

    return { ctr, conversionRate, finalConversion };
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Header with tool links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-stone-900">
              {language === 'pt' ? 'Captura de Dados' : 'Captura de Datos'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">
              {dataSource === 'manual'
                ? (language === 'pt' ? 'Entrada manual' : 'Entrada manual')
                : dataSource === 'form'
                ? (language === 'pt' ? 'Carregado do Formulário' : 'Cargado del Formulario')
                : (language === 'pt' ? 'Carregado da Planilha' : 'Cargado de la Hoja de Cálculo')}
            </span>
          </div>
        </div>

        {/* Tool integration buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleOpenForm}
            className="p-4 rounded-xl bg-white border-2 border-emerald-200 hover:bg-emerald-50 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                <FileText className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-stone-900">
                  {language === 'pt' ? 'Google Forms' : 'Google Forms'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {language === 'pt'
                    ? 'Capturar feedback estruturado do público'
                    : 'Capturar feedback estructurado del público'}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
            </div>
          </button>

          <button
            type="button"
            onClick={handleOpenSheet}
            className="p-4 rounded-xl bg-white border-2 border-sky-200 hover:bg-sky-50 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sky-100 group-hover:bg-sky-200 transition-colors">
                <Sheet className="w-5 h-5 text-sky-700" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-stone-900">
                  {language === 'pt' ? 'Google Sheets' : 'Google Sheets'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {language === 'pt'
                    ? 'Registrar métricas e resultados do experimento'
                    : 'Registrar métricas y resultados del experimento'}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
            </div>
          </button>
        </div>

        {/* Load data buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleLoadFromForm}
            disabled={isLoadingFromForm}
            className="flex-1 px-4 py-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoadingFromForm ? (
              <Clock className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileText className="w-3.5 h-3.5" />
            )}
            <span>
              {isLoadingFromForm
                ? (language === 'pt' ? 'Carregando...' : 'Cargando...')
                : (language === 'pt' ? 'Carregar do Formulário' : 'Cargar del Formulario')}
            </span>
          </button>
          <button
            type="button"
            onClick={handleLoadFromSheet}
            disabled={isLoadingFromSheet}
            className="flex-1 px-4 py-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoadingFromSheet ? (
              <Clock className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sheet className="w-3.5 h-3.5" />
            )}
            <span>
              {isLoadingFromSheet
                ? (language === 'pt' ? 'Carregando...' : 'Cargando...')
                : (language === 'pt' ? 'Carregar da Planilha' : 'Cargar de la Hoja')}
            </span>
          </button>
        </div>
      </div>

      {/* Metrics input form */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h4 className="text-sm font-bold text-stone-900">
            {language === 'pt' ? 'Métricas do Experimento' : 'Métricas del Experimento'}
          </h4>
          <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-1 rounded">
            {language === 'pt' ? 'Edição manual' : 'Edición manual'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-mono-data font-semibold text-stone-600 block">
              {language === 'pt' ? 'Impressões' : 'Impresiones'}
            </label>
            <input
              type="number"
              value={formData.impressions}
              onChange={(e) => onDataChange({ ...formData, impressions: e.target.value })}
              className="w-full p-2 rounded-lg border border-stone-200 font-mono-data font-bold text-stone-900 text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono-data font-semibold text-stone-600 block">
              {language === 'pt' ? 'Cliques' : 'Clics'}
            </label>
            <input
              type="number"
              value={formData.clicks}
              onChange={(e) => onDataChange({ ...formData, clicks: e.target.value })}
              className="w-full p-2 rounded-lg border border-stone-200 font-mono-data font-bold text-stone-900 text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono-data font-semibold text-stone-600 block">
              {language === 'pt' ? 'Cadastros' : 'Registros'}
            </label>
            <input
              type="number"
              value={formData.signups}
              onChange={(e) => onDataChange({ ...formData, signups: e.target.value })}
              className="w-full p-2 rounded-lg border border-stone-200 font-mono-data font-bold text-stone-900 text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono-data font-semibold text-stone-600 block">
              {language === 'pt' ? 'Engajamento' : 'Engagement'}
            </label>
            <input
              type="number"
              value={formData.engagement}
              onChange={(e) => onDataChange({ ...formData, engagement: e.target.value })}
              className="w-full p-2 rounded-lg border border-stone-200 font-mono-data font-bold text-stone-900 text-sm focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono-data font-semibold text-stone-600 block">
              {language === 'pt' ? 'Conversões' : 'Conversiones'}
            </label>
            <input
              type="number"
              value={formData.conversions}
              onChange={(e) => onDataChange({ ...formData, conversions: e.target.value })}
              className="w-full p-2 rounded-lg border border-stone-200 font-mono-data font-bold text-stone-900 text-sm focus:outline-none focus:border-stone-400"
            />
          </div>
        </div>

        {/* Calculated metrics */}
        <div className="pt-3 border-t border-stone-100">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-mono-data uppercase text-stone-400 block">
                CTR
              </span>
              <span className="text-sm font-bold text-stone-900">{metrics.ctr}%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-mono-data uppercase text-stone-400 block">
                {language === 'pt' ? 'Conv. Rate' : 'Tasa Conv.'}
              </span>
              <span className="text-sm font-bold text-stone-900">{metrics.conversionRate}%</span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] font-mono-data uppercase text-emerald-600 block">
                {language === 'pt' ? 'Final' : 'Final'}
              </span>
              <span className="text-sm font-bold text-emerald-900">{metrics.finalConversion}%</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-stone-700 block">
            {language === 'pt' ? 'Notas e Observações' : 'Notas y Observaciones'}
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => onDataChange({ ...formData, notes: e.target.value })}
            rows={2}
            className="w-full p-3 rounded-lg border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-stone-400"
            placeholder={language === 'pt'
              ? 'Adicione notas qualitativas sobre os resultados...'
              : 'Agrega notas cualitativas sobre los resultados...'}
          />
        </div>
      </div>

      {/* Info note */}
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            {language === 'pt'
              ? 'Los datos capturados desde Google Forms y Sheets te permiten un análisis más completo. Puedes cargar datos automáticamente o editar manualmente.'
              : 'Los datos capturados desde Google Forms y Sheets te permiten un análisis más completo. Puedes cargar datos automáticamente o editar manualmente.'}
          </p>
        </div>
      </div>
    </div>
  );
}
