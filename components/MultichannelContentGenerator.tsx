'use client';

import React, { useState } from 'react';
import { Language, MultichannelContent, ContentChannel, BuildFormData } from '@/types/growth';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Share2, 
  MessageSquare, 
  Mail, 
  Send,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { TOOL_LINKS } from '@/lib/tool-links';

interface MultichannelContentGeneratorProps {
  language: Language;
  buildData: BuildFormData;
  onError?: (message: string) => void;
}

export function MultichannelContentGenerator({
  language,
  buildData,
  onError,
}: MultichannelContentGeneratorProps) {
  const [selectedChannel, setSelectedChannel] = useState<ContentChannel>('linkedin');
  const [generatedContent, setGeneratedContent] = useState<Record<ContentChannel, MultichannelContent>>({
    linkedin: {
      channel: 'linkedin',
      content: '',
      tone: 'professional',
      cta: '',
      format: 'post',
    },
    discord: {
      channel: 'discord',
      content: '',
      tone: 'casual',
      cta: '',
      format: 'message',
    },
    newsletter: {
      channel: 'newsletter',
      content: '',
      tone: 'informative',
      cta: '',
      format: 'email',
    },
    instagram: {
      channel: 'instagram',
      content: '',
      tone: 'visual',
      cta: '',
      format: 'post',
    },
    email: {
      channel: 'email',
      content: '',
      tone: 'direct',
      cta: '',
      format: 'email',
    },
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedChannel, setCopiedChannel] = useState<ContentChannel | null>(null);

  const channels: Array<{ key: ContentChannel; label: string; icon: any; color: string }> = [
    { key: 'linkedin', label: 'LinkedIn', icon: Share2, color: 'blue' },
    { key: 'discord', label: 'Discord', icon: MessageSquare, color: 'indigo' },
    { key: 'newsletter', label: 'Newsletter', icon: Mail, color: 'emerald' },
  ];

  const generateContentForChannel = async (channel: ContentChannel) => {
    setIsGenerating(true);
    
    // Simular generación con IA (en producción, esto usaría la API de Gemini)
    setTimeout(() => {
      const baseContent = buildData.valueProposition || '';
      
      const contentMap: Record<ContentChannel, MultichannelContent> = {
        linkedin: {
          channel: 'linkedin',
          content: language === 'pt'
            ? `🚀 ${baseContent}\n\nMuitos profissionais hoje enfrentam o desafio de transformar ideias em ações concretas. A solução? Um processo guiado que vai do diagnóstico à medição.\n\nVocê já sentiu que tem todas as ferramentas, mas falta a direção?\n\nComente "Sim" se você se identifica! 👇`
            : `🚀 ${baseContent}\n\nMuchos profesionales hoy enfrentan el desafío de transformar ideas en acciones concretas. La solución? Un proceso guiado que va del diagnóstico a la medición.\n\n¿Ya has sentido que tienes todas las herramientas, pero te falta la dirección?\n\nComenta "Sí" si te identificas! 👇`,
          tone: 'professional',
          cta: language === 'pt' ? 'Comente abaixo' : 'Comenta abajo',
          format: 'post',
        },
        discord: {
          channel: 'discord',
          content: language === 'pt'
            ? `👋 Olá a todos!\n\n${baseContent}\n\nAlguém aqui já passou por isso? Estou organizando um mini desafio prático de 30 minutos para aplicar IA no trabalho.\n\nQuem topa participar? 🙋‍♂️`
            : `👋 Hola a todos!\n\n${baseContent}\n\n¿Alguien aquí ya ha pasado por esto? Estoy organizando un mini desafío práctico de 30 minutos para aplicar IA en el trabajo.\n\n¿Quién se anima a participar? 🙋‍♂️`,
          tone: 'casual',
          cta: language === 'pt' ? 'Reaja com 👍 para participar' : 'Reacciona con 👍 para participar',
          format: 'message',
        },
        newsletter: {
          channel: 'newsletter',
          content: language === 'pt'
            ? `Assunto: ${baseContent}\n\nOlá [Nome],\n\nEsta semana, compartilho algo que aprendi: transformar uma ideia em ação não precisa ser complicado.\n\nO segredo? Um processo claro com 7 etapas.\n\nVou te mostrar como neste mini desafio gratuito.\n\n[Link para participar]\n\nAté breve!`
            : `Asunto: ${baseContent}\n\nHola [Nombre],\n\nEsta semana, comparto algo que aprendí: transformar una idea en acción no tiene por qué ser complicado.\n\n¿El secreto? Un proceso claro con 7 etapas.\n\nTe mostraré cómo en este mini desafío gratuito.\n\n[Link para participar]\n\n¡Hasta pronto!`,
          tone: 'informative',
          cta: language === 'pt' ? 'Clique para participar' : 'Haz clic para participar',
          format: 'email',
        },
        instagram: {
          channel: 'instagram',
          content: language === 'pt'
            ? `${baseContent}\n\n\nTransforme ideias em ações concretas com nosso processo guiado de 7 etapas.\n\nLink na bio 👆`
            : `${baseContent}\n\n\nTransforma ideas en acciones concretas con nuestro proceso guiado de 7 etapas.\n\nLink en la bio 👆`,
          tone: 'visual',
          cta: language === 'pt' ? 'Link na bio' : 'Link en la bio',
          format: 'post',
        },
        email: {
          channel: 'email',
          content: language === 'pt'
            ? `Assunto: ${baseContent}\n\nOlá,\n\n${baseContent}\n\nEstou convidando você para participar de um mini desafio prático.\n\n[Link]\n\nAbraços!`
            : `Asunto: ${baseContent}\n\nHola,\n\n${baseContent}\n\nTe invito a participar de un mini desafío práctico.\n\n[Link]\n\n¡Saludos!`,
          tone: 'direct',
          cta: language === 'pt' ? 'Participar agora' : 'Participar ahora',
          format: 'email',
        },
      };

      setGeneratedContent(prev => ({
        ...prev,
        [channel]: contentMap[channel],
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    for (const channel of ['linkedin', 'discord', 'newsletter'] as ContentChannel[]) {
      await generateContentForChannel(channel);
    }
    setIsGenerating(false);
  };

  const handleCopyContent = (channel: ContentChannel) => {
    const content = generatedContent[channel].content;
    navigator.clipboard.writeText(content);
    setCopiedChannel(channel);
    setTimeout(() => setCopiedChannel(null), 2000);
  };

  const handleOpenGrowthCoach = () => {
    const context = language === 'pt'
      ? `AI GROWTH COACH — CONTEXTO\n\nGeração de conteúdo multicanal\n\nProposta de valor: ${buildData.valueProposition}\n\nPreciso que você gere versões adaptadas para:\n- LinkedIn (profissional, educativo)\n- Discord (casual, participativo)\n- Newsletter (informativo, convidativo)\n\nMantenha a mensagem central mas adapte o tom, formato e CTA para cada canal.`
      : `AI GROWTH COACH — CONTEXTO\n\nGeneración de contenido multicanal\n\nPropuesta de valor: ${buildData.valueProposition}\n\nNecesito que generes versiones adaptadas para:\n- LinkedIn (profesional, educativo)\n- Discord (casual, participativo)\n- Newsletter (informativo, invitacional)\n\nMantén el mensaje central pero adapta el tono, formato y CTA para cada canal.`;

    navigator.clipboard.writeText(context);
    window.open(TOOL_LINKS.growthCoachGem, '_blank', 'noopener,noreferrer');
  };

  const selectedContent = generatedContent[selectedChannel];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'pt' ? 'Conteúdo Multicanal' : 'Contenido Multicanal'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerateAll}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{language === 'pt' ? 'Gerar todos' : 'Generar todos'}</span>
          </button>
          <button
            type="button"
            onClick={handleOpenGrowthCoach}
            className="px-4 py-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{language === 'pt' ? 'Abrir Gem ↗' : 'Abrir Gem ↗'}</span>
          </button>
        </div>
      </div>

      {/* Channel selector tabs */}
      <div className="flex gap-2 border-b border-stone-200 pb-2">
        {channels.map(({ key, label, icon: Icon, color }) => {
          const isSelected = selectedChannel === key;
          const colorClasses = {
            blue: isSelected ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50',
            indigo: isSelected ? 'bg-indigo-100 text-indigo-900 border-indigo-300' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50',
            emerald: isSelected ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50',
          };
          
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedChannel(key)}
              className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${colorClasses[color as keyof typeof colorClasses]}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Content display */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
        {/* Metadata badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono-data font-semibold text-stone-500 bg-stone-100 px-2 py-1 rounded">
            {language === 'pt' ? 'Formato:' : 'Formato:'} {selectedContent.format}
          </span>
          <span className="text-[11px] font-mono-data font-semibold text-stone-500 bg-stone-100 px-2 py-1 rounded">
            {language === 'pt' ? 'Tom:' : 'Tono:'} {selectedContent.tone}
          </span>
          <span className="text-[11px] font-mono-data font-semibold text-stone-500 bg-stone-100 px-2 py-1 rounded">
            CTA: {selectedContent.cta}
          </span>
        </div>

        {/* Content textarea */}
        <textarea
          value={selectedContent.content}
          onChange={(e) => setGeneratedContent(prev => ({
            ...prev,
            [selectedChannel]: { ...prev[selectedChannel], content: e.target.value }
          }))}
          rows={8}
          className="w-full p-4 rounded-lg border border-stone-200 text-stone-900 text-sm leading-relaxed focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
          placeholder={language === 'pt' 
            ? 'O conteúdo gerado aparecerá aqui...' 
            : 'El contenido generado aparecerá aquí...'}
        />

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-stone-500">
            {language === 'pt' 
              ? 'Este conteúdo está adaptado para o formato e audiência do canal selecionado.' 
              : 'Este contenido está adaptado para el formato y audiencia del canal seleccionado.'}
          </p>
          <button
            type="button"
            onClick={() => handleCopyContent(selectedChannel)}
            className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            {copiedChannel === selectedChannel ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'pt' ? 'Copiado!' : '¡Copiado!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Copiar' : 'Copiar'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info note */}
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            {language === 'pt'
              ? 'Cada versión mantiene el mensaje central pero adapta el tono, formato y llamada a la acción para su audiencia específica. Puedes editar cada versión antes de copiarla.'
              : 'Cada versión mantiene el mensaje central pero adapta el tono, formato y llamada a la acción para su audiencia específica. Puedes editar cada versión antes de copiarla.'}
          </p>
        </div>
      </div>
    </div>
  );
}
