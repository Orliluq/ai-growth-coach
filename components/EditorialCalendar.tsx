'use client';

import React, { useState } from 'react';
import { Language, EditorialCalendarItem, ContentChannel } from '@/types/growth';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Target,
  Share2,
  MessageSquare,
  Mail,
  CheckCircle2
} from 'lucide-react';

interface EditorialCalendarProps {
  language: Language;
  existingContent?: string;
  objective?: string;
}

export function EditorialCalendar({
  language,
  existingContent,
  objective,
}: EditorialCalendarProps) {
  const [calendar, setCalendar] = useState<EditorialCalendarItem[]>(() => {
    const today = new Date();
    const items: EditorialCalendarItem[] = [];
    
    // Generar 7 días de calendario
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayOfWeek = date.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'es-ES', { weekday: 'long' });
      const formattedDate = date.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'es-ES', { day: 'numeric', month: 'short' });
      
      // Asignar canales rotativos
      const channels: ContentChannel[] = ['linkedin', 'discord', 'newsletter', 'instagram', 'email'];
      const channel = channels[i % channels.length];
      
      // Generar tema basado en el contenido existente
      const topic = existingContent 
        ? `${existingContent.substring(0, 50)}...`
        : (language === 'pt' 
          ? `Aplicação prática de IA - Dia ${i + 1}` 
          : `Aplicación práctica de IA - Día ${i + 1}`);
      
      items.push({
        date: `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${formattedDate}`,
        channel,
        topic,
        objective: objective || (language === 'pt' ? 'Engajamento' : 'Engagement'),
        format: channel === 'linkedin' ? 'post' : channel === 'discord' ? 'message' : 'email',
        cta: language === 'pt' ? 'Participar' : 'Participar',
        status: i === 0 ? 'scheduled' : 'planned',
      });
    }
    
    return items;
  });

  const [editingItem, setEditingItem] = useState<number | null>(null);

  const handleEditItem = (index: number) => {
    setEditingItem(index);
  };

  const handleSaveItem = (index: number, field: keyof EditorialCalendarItem, value: string) => {
    setCalendar(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleToggleStatus = (index: number) => {
    setCalendar(prev => {
      const updated = [...prev];
      const currentStatus = updated[index].status;
      updated[index].status = currentStatus === 'planned' ? 'scheduled' : currentStatus === 'scheduled' ? 'published' : 'planned';
      return updated;
    });
  };

  const getChannelIcon = (channel: ContentChannel) => {
    switch (channel) {
      case 'linkedin':
        return <Share2 className="w-4 h-4" />;
      case 'discord':
        return <MessageSquare className="w-4 h-4" />;
      case 'newsletter':
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'instagram':
        return <Share2 className="w-4 h-4" />;
      default:
        return <Share2 className="w-4 h-4" />;
    }
  };

  const getChannelColor = (channel: ContentChannel) => {
    switch (channel) {
      case 'linkedin':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'discord':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'newsletter':
      case 'email':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'instagram':
        return 'bg-pink-100 text-pink-900 border-pink-300';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300';
    }
  };

  const getStatusColor = (status: EditorialCalendarItem['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-stone-100 text-stone-600';
      case 'scheduled':
        return 'bg-amber-100 text-amber-900';
      case 'published':
        return 'bg-emerald-100 text-emerald-900';
    }
  };

  const getStatusLabel = (status: EditorialCalendarItem['status']) => {
    if (language === 'pt') {
      switch (status) {
        case 'planned': return 'Planejado';
        case 'scheduled': return 'Agendado';
        case 'published': return 'Publicado';
      }
    } else {
      switch (status) {
        case 'planned': return 'Planificado';
        case 'scheduled': return 'Programado';
        case 'published': return 'Publicado';
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'pt' ? 'Calendário Editorial (7 dias)' : 'Calendario Editorial (7 días)'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500">
            {language === 'pt' ? 'Clique para editar cada item' : 'Haz clic para editar cada ítem'}
          </span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="space-y-3">
        {calendar.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 hover:border-stone-300 transition-all"
          >
            {/* Date and status row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400" />
                <span className="text-sm font-semibold text-stone-900">{item.date}</span>
              </div>
              <button
                type="button"
                onClick={() => handleToggleStatus(index)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${getStatusColor(item.status)}`}
              >
                {getStatusLabel(item.status)}
              </button>
            </div>

            {/* Content row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Channel */}
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${getChannelColor(item.channel)}`}>
                  {getChannelIcon(item.channel)}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-mono-data uppercase text-stone-400 block">
                    {language === 'pt' ? 'Canal' : 'Canal'}
                  </span>
                  <span className="text-xs font-semibold text-stone-900 capitalize">
                    {item.channel}
                  </span>
                </div>
              </div>

              {/* Topic */}
              <div className="sm:col-span-2 lg:col-span-2">
                <span className="text-[10px] font-mono-data uppercase text-stone-400 block">
                  {language === 'pt' ? 'Tema' : 'Tema'}
                </span>
                {editingItem === index ? (
                  <input
                    type="text"
                    value={item.topic}
                    onChange={(e) => handleSaveItem(index, 'topic', e.target.value)}
                    onBlur={() => setEditingItem(null)}
                    className="w-full text-xs font-medium text-stone-900 border border-stone-200 rounded px-2 py-1 focus:outline-none focus:border-stone-400"
                    autoFocus
                  />
                ) : (
                  <p
                    className="text-xs font-medium text-stone-900 truncate cursor-pointer hover:text-stone-700"
                    onClick={() => handleEditItem(index)}
                  >
                    {item.topic}
                  </p>
                )}
              </div>
            </div>

            {/* Details row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
              {/* Objective */}
              <div>
                <span className="text-[10px] font-mono-data uppercase text-stone-400 block">
                  {language === 'pt' ? 'Objetivo' : 'Objetivo'}
                </span>
                <p className="text-xs text-stone-700">{item.objective}</p>
              </div>

              {/* Format */}
              <div>
                <span className="text-[10px] font-mono-data uppercase text-stone-400 block">
                  {language === 'pt' ? 'Formato' : 'Formato'}
                </span>
                <p className="text-xs text-stone-700">{item.format}</p>
              </div>

              {/* CTA */}
              <div>
                <span className="text-[10px] font-mono-data uppercase text-stone-400 block">
                  CTA
                </span>
                <p className="text-xs text-stone-700">{item.cta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info note */}
      <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-900">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            {language === 'pt'
              ? 'Este calendario te ayuda a planificar publicaciones de manera consistente. Puedes ajustar cada tema, objetivo y CTA según tu estrategia. El estado (Planejado/Agendado/Publicado) te ayuda a seguir el progreso.'
              : 'Este calendario te ayuda a planificar publicaciones de manera consistente. Puedes ajustar cada tema, objetivo y CTA según tu estrategia. El estado (Planificado/Programado/Publicado) te ayuda a seguir el progreso.'}
          </p>
        </div>
      </div>
    </div>
  );
}
