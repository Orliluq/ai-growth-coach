'use client';

import React, { useState } from 'react';
import { Language } from '@/types/growth';
import { 
  Image as ImageIcon, 
  Sparkles, 
  ExternalLink, 
  RefreshCw, 
  Download,
  Palette,
  Copy
} from 'lucide-react';
import { TOOL_LINKS } from '@/lib/tool-links';

interface ImageGeneratorProps {
  language: Language;
  message?: string;
  cta?: string;
  channel?: string;
  onError?: (message: string) => void;
}

export function ImageGenerator({
  language,
  message,
  cta,
  channel,
  onError,
}: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  const generatePrompt = () => {
    const basePrompt = language === 'pt'
      ? `Crie uma imagem para ${channel || 'LinkedIn'} com o tema: "${message || 'IA e crescimento'}". Estilo: minimalista, profissional, cores suaves. Inclua texto: "${cta || 'Participar'}".`
      : `Crea una imagen para ${channel || 'LinkedIn'} con el tema: "${message || 'IA y crecimiento'}". Estilo: minimalista, profesional, colores suaves. Incluye texto: "${cta || 'Participar'}".`;
    
    setPrompt(basePrompt);
    return basePrompt;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      const autoPrompt = generatePrompt();
      setPrompt(autoPrompt);
    }

    setIsGenerating(true);
    
    // Simular generación (en producción, esto llamaría a la API de NanoBanana)
    setTimeout(() => {
      // Placeholder de imagen generada
      setGeneratedImage('https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Imagen+Generada+con+NanoBanana+2');
      setPromptHistory(prev => [prompt, ...prev].slice(0, 5));
      setIsGenerating(false);
    }, 2000);
  };

  const handleOpenNanoBanana = () => {
    const finalPrompt = prompt || generatePrompt();
    window.open(`${TOOL_LINKS.nanoBanana}?prompt=${encodeURIComponent(finalPrompt)}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenCanvaWithImage = () => {
    if (!generatedImage) {
      onError?.(language === 'pt' ? 'Gere uma imagem primeiro' : 'Genera una imagen primero');
      return;
    }

    const params = new URLSearchParams({
      image: generatedImage,
      prompt: prompt,
      message: message || '',
      cta: cta || '',
      channel: channel || '',
    });

    window.open(`${TOOL_LINKS.canva}?${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-growth-coach-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'pt' ? 'Gerador de Imagens (NanoBanana 2)' : 'Generador de Imágenes (NanoBanana 2)'}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleOpenNanoBanana}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{language === 'pt' ? 'Abrir NanoBanana ↗' : 'Abrir NanoBanana ↗'}</span>
        </button>
      </div>

      {/* Prompt input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-stone-700 block">
          {language === 'pt' ? 'Prompt visual' : 'Prompt visual'}
        </label>
        <div className="flex gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={language === 'pt'
              ? 'Descreva a imagem que você quer criar...'
              : 'Describe la imagen que quieres crear...'}
            rows={3}
            className="flex-1 p-3 rounded-lg border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
          />
          <button
            type="button"
            onClick={generatePrompt}
            className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-all cursor-pointer"
            title={language === 'pt' ? 'Gerar prompt automático' : 'Generar prompt automático'}
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex-1 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating 
            ? (language === 'pt' ? 'Gerando...' : 'Generando...') 
            : (language === 'pt' ? 'Gerar imagem' : 'Generar imagen')}
          </span>
        </button>
        <button
          type="button"
          onClick={handleCopyPrompt}
          className="px-4 py-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{language === 'pt' ? 'Copiar prompt' : 'Copiar prompt'}</span>
        </button>
      </div>

      {/* Generated image preview */}
      {generatedImage && (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-stone-200">
            <img
              src={generatedImage}
              alt={language === 'pt' ? 'Imagem gerada' : 'Imagen generada'}
              className="w-full h-auto"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={handleDownloadImage}
                className="p-2 rounded-lg bg-white/90 hover:bg-white border border-stone-200 transition-all cursor-pointer"
                title={language === 'pt' ? 'Baixar imagem' : 'Descargar imagen'}
              >
                <Download className="w-4 h-4 text-stone-700" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-stone-500">
              {language === 'pt'
                ? 'Imagem gerada com NanoBanana 2. Você pode baixar ou abrir no Canva para personalizar.'
                : 'Imagen generada con NanoBanana 2. Puedes descargar o abrir en Canva para personalizar.'}
            </p>
            <button
              type="button"
              onClick={handleOpenCanvaWithImage}
              className="px-4 py-2 rounded-lg bg-[#00C4CC] hover:bg-[#00B0B8] text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Abrir no Canva ↗' : 'Abrir en Canva ↗'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Prompt history */}
      {promptHistory.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-700">
            {language === 'pt' ? 'Prompts anteriores' : 'Prompts anteriores'}
          </p>
          <div className="space-y-1">
            {promptHistory.map((historyPrompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPrompt(historyPrompt)}
                className="w-full text-left p-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs text-stone-600 transition-all cursor-pointer truncate"
              >
                {historyPrompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info note */}
      <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-900">
        <div className="flex items-start gap-2">
          <Palette className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <p>
            {language === 'pt'
              ? 'NanoBanana 2 genera imágenes con IA. Puedes crear prompts detallados para obtener resultados específicos que coincidan con tu marca.'
              : 'NanoBanana 2 genera imágenes con IA. Puedes crear prompts detallados para obtener resultados específicos que coincidan con tu marca.'}
          </p>
        </div>
      </div>
    </div>
  );
}
