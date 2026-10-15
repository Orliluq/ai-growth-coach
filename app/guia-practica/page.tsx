'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Language } from '@/types/growth';
import {
  Download,
  Globe,
  BookOpen,
  Compass,
  Ear,
  BarChart3,
  Brain,
  Microscope,
  Target,
  Rocket,
  Megaphone,
  Repeat,
  Shield,
  Sprout,
  Search,
  Laptop,
  Loader2,
} from 'lucide-react';

interface SectionItem {
  label: string;
  text: string;
  example: string;
  accent: string;
}

interface Section {
  number: string;
  icon: React.ReactNode;
  title: string;
  intro: string;
  content: React.ReactNode;
}

interface ChecklistItem {
  icon: React.ReactNode;
  label: string;
  question: string;
}

interface GuideContent {
  tagline: string;
  slogan: string;
  heroTitle: string;
  heroSubtitle: string;
  heroIntro: string;
  technology: { title: string; desc: string };
  data: { title: string; desc: string };
  people: { title: string; desc: string };
  sections: Section[];
  checklist: {
    intro: string;
    title: string;
    preRun: string;
    items: ChecklistItem[];
  };
  finalStatement: {
    badge: string;
    items: string[];
    quote1: string;
    quote2: string;
  };
  nav: { backToApp: string };
  footer: { brand: string; tagline: string };
  downloadBtn: string;
  generatingPdf: string;
}

const content: Record<Language, GuideContent> = {
  es: {
    tagline: 'Guía práctica de Community Pulse',
    slogan: 'Escuchar · Analizar · Priorizar · Actuar · Medir · Aprender',
    heroTitle: 'Guía práctica para escuchar, analizar y hacer crecer una comunidad',
    heroSubtitle: 'De los datos a las decisiones.',
    heroIntro:
      'Community Pulse propone una forma sencilla de trabajar con comunidades:',
    technology: {
      title: 'La tecnología',
      desc: 'ayuda a encontrar señales y patrones.',
    },
    data: {
      title: 'Los datos',
      desc: 'orientan las decisiones.',
    },
    people: {
      title: 'Las personas',
      desc: 'mantienen el criterio y deciden.',
    },
    sections: [
      {
        number: '01',
        icon: <Ear className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-emerald-600" />,
        title: 'ESCUCHA A TU COMUNIDAD',
        intro:
          'Antes de crear contenido o lanzar una actividad, identifica qué está ocurriendo realmente.',
        content: (
          <>
            <p className="mb-4 text-base sm:text-lg">Puedes utilizar:</p>

            <ul className="grid gap-2 sm:gap-3 sm:grid-cols-2">
              {[
                'encuestas',
                'formularios',
                'reacciones',
                'comentarios',
                'participación en eventos',
                'conversaciones',
                'feedback directo',
                'comportamiento de los miembros',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 sm:gap-3 rounded-xl border border-black/5 bg-gradient-to-br from-emerald-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30"></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 sm:mt-8 rounded-2xl border border-black/5 bg-gradient-to-br from-neutral-50 to-white p-5 sm:p-6 shadow-sm">
              <h3 className="mb-4 sm:mb-5 font-semibold text-base sm:text-lg">Preguntas útiles</h3>

              <div className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>¿Qué preocupa a la comunidad?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>¿Qué necesita aprender?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>¿Qué actividades generan interés?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>¿Qué hace que las personas participen?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>¿Dónde abandonan el proceso?</span>
                </p>
              </div>
            </div>

            <blockquote className="mt-6 sm:mt-8 border-l-4 border-emerald-400 pl-5 sm:pl-6 text-base sm:text-lg font-medium italic bg-gradient-to-r from-emerald-50/30 to-transparent py-3 sm:py-4 rounded-r-xl">
              No busques solamente lo que funciona.
              <br />
              Busca también las fricciones.
            </blockquote>
          </>
        ),
      },
      {
        number: '02',
        icon: <BarChart3 className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-blue-600" />,
        title: 'CONVIERTE DATOS EN SEÑALES',
        intro:
          'Una señal es algo que aparece en la información y merece atención.',
        content: (
          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-sky-50/50 to-white p-5 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.18em] text-neutral-500">
                Ejemplo
              </p>

              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium leading-relaxed">
                "Las publicaciones reciben muchas visualizaciones, pero pocos
                comentarios."
              </p>
            </div>

            <p className="text-base sm:text-lg">
              Eso es un <strong>dato observado</strong>.
            </p>

            <p className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 sm:p-6 text-amber-950 border border-amber-200/30 shadow-sm">
              Todavía no sabemos por qué ocurre.
            </p>
          </div>
        ),
      },
      {
        number: '03',
        icon: <Brain className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-indigo-600" />,
        title: 'ENCUENTRA EL INSIGHT',
        intro:
          'El insight es una interpretación razonable de una señal.',
        content: (
          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-violet-50/50 to-white p-5 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.18em] text-neutral-500">
                Ejemplo
              </p>

              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium leading-relaxed">
                "El contenido consigue atención, pero existe una posible barrera
                entre consumir información y participar activamente."
              </p>
            </div>

            <p className="text-base sm:text-lg">
              El insight ayuda a formular mejores preguntas.
            </p>

            <p className="font-medium text-base sm:text-lg rounded-xl bg-violet-50/50 p-4 sm:p-5 border border-violet-200/30">
              No debe confundirse con una certeza.
            </p>
          </div>
        ),
      },
      {
        number: '04',
        icon: <Microscope className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-purple-600" />,
        title: 'DIFERENCIA DATOS, INSIGHTS E HIPÓTESIS',
        intro:
          'Una buena decisión comienza por separar lo que sabemos de lo que creemos.',
        content: (
          <div className="grid gap-4 sm:gap-5">
            {[
              {
                label: 'DATO',
                text: 'Información observada directamente.',
                example:
                  'El 31% de las respuestas de la encuesta corresponde a Desarrollo.',
                accent: 'border-sky-400/40',
                bg: 'from-sky-50/50 to-white',
              },
              {
                label: 'INSIGHT',
                text: 'Interpretación basada en los datos.',
                example:
                  'Desarrollo es actualmente uno de los principales intereses de la comunidad.',
                accent: 'border-violet-400/40',
                bg: 'from-violet-50/50 to-white',
              },
              {
                label: 'HIPÓTESIS',
                text: 'Explicación que todavía necesita validación.',
                example:
                  'Los miembros podrían participar más en actividades prácticas relacionadas con Desarrollo.',
                accent: 'border-amber-400/40',
                bg: 'from-amber-50/50 to-white',
              },
              {
                label: 'RECOMENDACIÓN',
                text: 'Acción propuesta para comprobar o responder a la situación.',
                example:
                  'Probar durante cuatro semanas un formato de micro-retos de Desarrollo.',
                accent: 'border-emerald-400/40',
                bg: 'from-emerald-50/50 to-white',
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border-l-4 ${item.accent} border border-black/5 bg-gradient-to-br ${item.bg} p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <p className="text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.18em] text-neutral-500">
                  {item.label}
                </p>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-600">
                  {item.text}
                </p>

                <p className="mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
                  <span className="font-medium">Ejemplo:</span> "{item.example}"
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        number: '05',
        icon: <Target className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-amber-600" />,
        title: 'PRIORIZA',
        intro:
          'No todo problema debe resolverse al mismo tiempo.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Una buena prioridad combina:
            </p>

            <div className="rounded-2xl bg-gradient-to-r from-violet-500/10 via-sky-500/10 to-emerald-500/10 p-5 sm:p-6 text-center border border-black/5 shadow-sm">
              <p className="text-base sm:text-xl font-bold">
                Impacto potencial + evidencia + esfuerzo + urgencia
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-amber-50/50 to-white p-5 sm:p-6 shadow-sm">
              <p className="font-semibold text-base sm:text-lg">
                Pregunta:
              </p>

              <p className="mt-2 sm:mt-3 text-base sm:text-lg leading-relaxed">
                "¿Qué problema, si lo resolvemos primero, puede producir el mayor
                aprendizaje o impacto?"
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 sm:p-6 border border-black/5">
              <p className="font-semibold text-base sm:text-lg">Regla práctica</p>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg">
                Empieza con <strong>1 a 3 prioridades</strong>.
              </p>
              <p className="mt-2 text-sm sm:text-base text-neutral-600">
                Evita convertir cada insight en una iniciativa gigantesca.
              </p>
            </div>
          </div>
        ),
      },
      {
        number: '06',
        icon: <Rocket className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-orange-600" />,
        title: 'ACTÚA CON EXPERIMENTOS',
        intro:
          'Cuando no tengas certeza, experimenta.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 sm:px-5 py-3 sm:py-4 text-center border-b border-black/5">
                <p className="font-mono text-xs sm:text-sm font-bold tracking-wide text-neutral-700">
                  HIPÓTESIS → ACCIÓN → DURACIÓN → MÉTRICA → CRITERIO DE ÉXITO →
                  APRENDIZAJE
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 p-4 sm:p-5">
                <p className="text-sm sm:text-base">
                  <strong>Hipótesis:</strong> Las actividades prácticas generan
                  mayor participación.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Acción:</strong> Publicar dos micro-retos semanales.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Duración:</strong> 4 semanas.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Métrica:</strong> Miembros únicos participantes.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Criterio de éxito:</strong> Superar el promedio histórico
                  definido como referencia.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Aprendizaje:</strong> Determinar si el formato práctico
                  merece mantenerse, modificarse o descartarse.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        number: '07',
        icon: <Megaphone className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-pink-600" />,
        title: 'CREA CONTENIDO A PARTIR DE NECESIDADES',
        intro:
          'El contenido no debe ser el punto de partida.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Primero identifica una necesidad. Después decide qué formato puede
              responder mejor.
            </p>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                ['Necesidad', 'aprender una habilidad', 'tutorial práctico'],
                ['Necesidad', 'tomar una decisión', 'encuesta'],
                ['Necesidad', 'practicar', 'reto'],
                ['Necesidad', 'conectar con otras personas', 'dinámica comunitaria'],
                ['Necesidad', 'resolver una duda', 'sesión en vivo'],
              ].map(([label, need, response]) => (
                <div
                  key={need}
                  className="rounded-2xl border border-black/5 bg-gradient-to-br from-pink-50/50 to-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-neutral-500">
                    {label}
                  </p>
                  <p className="mt-2 font-semibold text-sm sm:text-base">{need}</p>
                  <p className="mt-2 text-sm sm:text-base text-neutral-600">
                    → {response}
                  </p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-violet-400 pl-5 sm:pl-6 text-base sm:text-lg font-medium italic bg-gradient-to-r from-violet-50/30 to-transparent py-3 sm:py-4 rounded-r-xl">
              La pregunta no es:
              <br />
              "¿Qué podemos publicar?"
              <br />
              <br />
              Sino:
              <br />
              "¿Qué necesita la comunidad y qué interacción puede ayudarla?"
            </blockquote>
          </div>
        ),
      },
      {
        number: '08',
        icon: <BarChart3 className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-blue-600" />,
        title: 'MIDE LO QUE IMPORTA',
        intro:
          'No utilices únicamente métricas de vanidad.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Visualizaciones y seguidores pueden ser útiles, pero no explican por
              sí solos la salud de una comunidad.
            </p>

            <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
              {[
                'participantes únicos',
                'frecuencia de participación',
                'recurrencia',
                'comentarios significativos',
                'respuestas a encuestas',
                'asistencia efectiva',
                'conversión de inscripción a asistencia',
                'retención',
                'participación de miembros nuevos',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/5 bg-gradient-to-br from-blue-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 sm:p-6 border border-emerald-200/30 shadow-sm">
              <p className="font-semibold text-base sm:text-lg">Consejo</p>
              <p className="mt-2 text-sm sm:text-base">
                Define una referencia antes de comenzar un experimento.
              </p>

              <p className="mt-4 text-center text-base sm:text-lg font-bold">
                ANTES → DURANTE → DESPUÉS
              </p>
            </div>
          </div>
        ),
      },
      {
        number: '09',
        icon: <Repeat className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-cyan-600" />,
        title: 'APRENDE Y REPITE',
        intro:
          'Un experimento no sirve solamente para conseguir un resultado.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Sirve para aprender.
            </p>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                '¿Qué esperábamos?',
                '¿Qué ocurrió?',
                '¿Qué cambió?',
                '¿Qué aprendimos?',
                '¿Qué deberíamos hacer ahora?',
              ].map((question) => (
                <div
                  key={question}
                  className="rounded-2xl border border-black/5 bg-gradient-to-br from-cyan-50/50 to-white p-4 sm:p-5 font-medium text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {question}
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-violet-500/10 to-sky-500/10 p-5 sm:p-6 text-center border border-black/5 shadow-sm">
              <p className="text-sm sm:text-lg font-bold leading-loose">
                DATOS → INSIGHTS → DECISIONES → ACCIONES → APRENDIZAJE → NUEVOS
                DATOS
              </p>
            </div>
          </div>
        ),
      },
      {
        number: '10',
        icon: <Brain className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-indigo-600" />,
        title: 'USA IA COMO COACH, NO COMO ORÁCULO',
        intro:
          'La inteligencia artificial puede ayudarte a pensar mejor, pero no conoce toda la realidad de una comunidad.',
        content: (
          <div className="space-y-5 sm:space-y-6">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                'interpretar señales',
                'comparar alternativas',
                'encontrar patrones',
                'formular hipótesis',
                'diseñar experimentos',
                'proponer métricas',
                'convertir insights en acciones',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/5 bg-gradient-to-br from-indigo-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 sm:p-6 shadow-sm">
              <p className="font-semibold text-base sm:text-lg">Por eso:</p>

              <ul className="mt-3 space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>No presentes hipótesis como hechos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>No inventes datos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Valida las recomendaciones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Mantén el criterio humano en la decisión final.</span>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        number: '11',
        icon: <Shield className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-red-600" />,
        title: 'COMUNIDAD + DATOS + ÉTICA',
        intro:
          'Trabajar con datos de comunidad implica responsabilidad.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                'privacidad',
                'consentimiento',
                'transparencia',
                'sesgos',
                'inclusión',
                'autonomía',
                'uso responsable de la automatización',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/5 bg-gradient-to-br from-red-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <blockquote className="rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-50 to-violet-100/50 p-5 sm:p-6 text-base sm:text-lg font-medium italic leading-relaxed shadow-sm">
              "¿Estamos utilizando estos datos para ayudar a las personas o
              simplemente para optimizar una métrica?"
            </blockquote>

            <p className="font-semibold text-base sm:text-lg rounded-xl bg-violet-50/50 p-4 sm:p-5 border border-violet-200/30">La respuesta importa.</p>
          </div>
        ),
      },
    ],
    checklist: {
      intro: 'Antes de ejecutar una iniciativa, comprueba:',
      title: 'Checklist final',
      preRun: 'Antes de ejecutar',
      items: [
        { icon: <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, label: 'SIGNAL', question: '¿Tenemos una señal real?' },
        { icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />, label: 'INSIGHT', question: '¿Entendemos qué podría significar?' },
        { icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />, label: 'PRIORITY', question: '¿Sabemos qué debemos atender primero?' },
        { icon: <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />, label: 'ACTION', question: '¿Existe una acción concreta?' },
        { icon: <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />, label: 'CONTENT', question: '¿El contenido responde a una necesidad real?' },
        { icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />, label: 'METRIC', question: '¿Sabemos cómo medir el resultado?' },
        { icon: <Repeat className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />, label: 'LEARNING', question: '¿Sabemos qué aprenderemos?' },
        { icon: <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />, label: 'HUMAN REVIEW', question: '¿Una persona validará la decisión?' },
      ],
    },
    finalStatement: {
      badge: 'Community Pulse en una idea',
      items: [
        'Escucha antes de hablar.',
        'Comprende antes de actuar.',
        'Experimenta antes de escalar.',
        'Mide antes de asumir.',
        'Aprende antes de repetir.',
      ],
      quote1:
        'Community Pulse no busca crear comunidades más ruidosas.',
      quote2:
        'Busca ayudar a construir comunidades más útiles, más participativas, más sostenibles y más humanas.',
    },
    nav: { backToApp: 'Volver al inicio' },
    footer: {
      brand: 'Community Pulse',
      tagline: 'Los datos orientan. La IA acompaña. Las personas deciden.',
    },
    downloadBtn: 'Descargar PDF',
    generatingPdf: 'Generando PDF...',
  },
  pt: {
    tagline: 'Guia prática de Community Pulse',
    slogan: 'Escutar · Analisar · Priorizar · Agir · Medir · Aprender',
    heroTitle:
      'Guia prática para escutar, analisar e fazer crescer uma comunidade',
    heroSubtitle: 'Dos dados a decisões.',
    heroIntro:
      'Community Pulse propõe uma forma simples de trabalhar com comunidades:',
    technology: {
      title: 'A tecnologia',
      desc: 'ajuda a encontrar sinais e padrões.',
    },
    data: {
      title: 'Os dados',
      desc: 'orientam as decisões.',
    },
    people: {
      title: 'As pessoas',
      desc: 'mantêm o critério e decidem.',
    },
    sections: [
      {
        number: '01',
        icon: <Ear className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-emerald-600" />,
        title: 'ESCUTE SUA COMUNIDADE',
        intro:
          'Antes de criar conteúdo ou lançar uma atividade, identifique o que está realmente acontecendo.',
        content: (
          <>
            <p className="mb-4 text-base sm:text-lg">Você pode utilizar:</p>

            <ul className="grid gap-2 sm:gap-3 sm:grid-cols-2">
              {[
                'pesquisas',
                'formulários',
                'reações',
                'comentários',
                'participação em eventos',
                'conversas',
                'feedback direto',
                'comportamento dos membros',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 sm:gap-3 rounded-xl border border-black/5 bg-gradient-to-br from-emerald-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30"></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 sm:mt-8 rounded-2xl border border-black/5 bg-gradient-to-br from-neutral-50 to-white p-5 sm:p-6 shadow-sm">
              <h3 className="mb-4 sm:mb-5 font-semibold text-base sm:text-lg">Perguntas úteis</h3>

              <div className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>O que preocupa a comunidade?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>O que precisa aprender?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Que atividades geram interesse?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>O que faz as pessoas participarem?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Onde as pessoas abandonam o processo?</span>
                </p>
              </div>
            </div>

            <blockquote className="mt-6 sm:mt-8 border-l-4 border-emerald-400 pl-5 sm:pl-6 text-base sm:text-lg font-medium italic bg-gradient-to-r from-emerald-50/30 to-transparent py-3 sm:py-4 rounded-r-xl">
              Não busque apenas o que funciona.
              <br />
              Busque também as fricções.
            </blockquote>
          </>
        ),
      },
      {
        number: '02',
        icon: <BarChart3 className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-blue-600" />,
        title: 'CONVERTA DADOS EM SINAIS',
        intro:
          'Um sinal é algo que aparece na informação e merece atenção.',
        content: (
          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-sky-50/50 to-white p-5 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.18em] text-neutral-500">
                Exemplo
              </p>

              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium leading-relaxed">
                "As publicações recebem muitas visualizações, mas poucos
                comentários."
              </p>
            </div>

            <p className="text-base sm:text-lg">
              Isso é um <strong>dado observado</strong>.
            </p>

            <p className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 sm:p-6 text-amber-950 border border-amber-200/30 shadow-sm">
              Ainda não sabemos por quê.
            </p>
          </div>
        ),
      },
      {
        number: '03',
        icon: <Brain className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-indigo-600" />,
        title: 'ENCONTRE O INSIGHT',
        intro:
          'O insight é uma interpretação razoável de um sinal.',
        content: (
          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-violet-50/50 to-white p-5 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.18em] text-neutral-500">
                Exemplo
              </p>

              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium leading-relaxed">
                "O conteúdo chama atenção, mas pode existir uma possível
                barreira entre consumir informação e participar ativamente."
              </p>
            </div>

            <p className="text-base sm:text-lg">
              O insight ajuda a formular melhores perguntas.
            </p>

            <p className="font-medium text-base sm:text-lg rounded-xl bg-violet-50/50 p-4 sm:p-5 border border-violet-200/30">
              Não deve ser confundido com uma certeza.
            </p>
          </div>
        ),
      },
      {
        number: '04',
        icon: <Microscope className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-purple-600" />,
        title: 'DIFERENCIE DADOS, INSIGHTS E HIPÓTESES',
        intro:
          'Uma boa decisão começa separando o que sabemos do que acreditamos.',
        content: (
          <div className="grid gap-4 sm:gap-5">
            {[
              {
                label: 'DADO',
                text: 'Informação observada diretamente.',
                example:
                  '31% das respostas da pesquisa correspondem a Desenvolvimento.',
                accent: 'border-sky-400/40',
                bg: 'from-sky-50/50 to-white',
              },
              {
                label: 'INSIGHT',
                text: 'Interpretação baseada nos dados.',
                example:
                  'Desenvolvimento é atualmente um dos principais interesses da comunidade.',
                accent: 'border-violet-400/40',
                bg: 'from-violet-50/50 to-white',
              },
              {
                label: 'HIPÓTESE',
                text: 'Explicação que ainda precisa de validação.',
                example:
                  'Os membros podem participar mais em atividades práticas relacionadas ao Desenvolvimento.',
                accent: 'border-amber-400/40',
                bg: 'from-amber-50/50 to-white',
              },
              {
                label: 'RECOMENDAÇÃO',
                text: 'Ação proposta para verificar ou responder à situação.',
                example:
                  'Testar durante quatro semanas um formato de micro-desafios de Desenvolvimento.',
                accent: 'border-emerald-400/40',
                bg: 'from-emerald-50/50 to-white',
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border-l-4 ${item.accent} border border-black/5 bg-gradient-to-br ${item.bg} p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <p className="text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.18em] text-neutral-500">
                  {item.label}
                </p>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-600">
                  {item.text}
                </p>

                <p className="mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
                  <span className="font-medium">Exemplo:</span> "{item.example}"
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        number: '05',
        icon: <Target className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-amber-600" />,
        title: 'PRIORIZE',
        intro:
          'Não todos os problemas precisam ser resolvidos ao mesmo tempo.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Uma boa prioridade combina:
            </p>

            <div className="rounded-2xl bg-gradient-to-r from-violet-500/10 via-sky-500/10 to-emerald-500/10 p-5 sm:p-6 text-center border border-black/5 shadow-sm">
              <p className="text-base sm:text-xl font-bold">
                Impacto potencial + evidência + esforço + urgência
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-amber-50/50 to-white p-5 sm:p-6 shadow-sm">
              <p className="font-semibold text-base sm:text-lg">
                Pergunta:
              </p>

              <p className="mt-2 sm:mt-3 text-base sm:text-lg leading-relaxed">
                "Que problema, se resolvemos primeiro, pode produzir o maior
                aprendizado ou impacto?"
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-white p-5 sm:p-6 border border-black/5">
              <p className="font-semibold text-base sm:text-lg">Regra prática</p>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg">
                Comece com <strong>1 a 3 prioridades</strong>.
              </p>
              <p className="mt-2 text-sm sm:text-base text-neutral-600">
                Evite transformar cada insight em uma iniciativa gigante.
              </p>
            </div>
          </div>
        ),
      },
      {
        number: '06',
        icon: <Rocket className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-orange-600" />,
        title: 'AGIR COM EXPERIMENTOS',
        intro:
          'Quando você não tem certeza, experimente.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 sm:px-5 py-3 sm:py-4 text-center border-b border-black/5">
                <p className="font-mono text-xs sm:text-sm font-bold tracking-wide text-neutral-700">
                  HIPÓTESE → AÇÃO → DURAÇÃO → MÉTRICA → CRITÉRIO DE SUCESSO →
                  APRENDIZADO
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 p-4 sm:p-5">
                <p className="text-sm sm:text-base">
                  <strong>Hipótese:</strong> Atividades práticas geram maior
                  participação.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Ação:</strong> Publicar dois micro-desafios semanais.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Duração:</strong> 4 semanas.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Métrica:</strong> Membros únicos participantes.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Critério de sucesso:</strong> Superar a média histórica
                  definida como referência.
                </p>

                <p className="text-sm sm:text-base">
                  <strong>Aprendizado:</strong> Determinar se o formato prático
                  merece ser mantido, modificado ou descartado.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        number: '07',
        icon: <Megaphone className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-pink-600" />,
        title: 'CRIE CONTEÚDO A PARTIR DE NECESSIDADES',
        intro:
          'O conteúdo não deve ser o ponto de partida.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Primeiro identifique uma necessidade. Depois decida qual formato
              pode responder melhor.
            </p>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                ['Necessidade', 'aprender uma habilidade', 'tutorial prático'],
                ['Necessidade', 'tirar uma decisão', 'pesquisa'],
                ['Necessidade', 'praticar', 'desafio'],
                [
                  'Necessidade',
                  'conectar com outras pessoas',
                  'dinâmica comunitária',
                ],
                ['Necessidade', 'resolver uma dúvida', 'sessão ao vivo'],
              ].map(([label, need, response]) => (
                <div
                  key={need}
                  className="rounded-2xl border border-black/5 bg-gradient-to-br from-pink-50/50 to-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-neutral-500">
                    {label}
                  </p>
                  <p className="mt-2 font-semibold text-sm sm:text-base">{need}</p>
                  <p className="mt-2 text-sm sm:text-base text-neutral-600">
                    → {response}
                  </p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-violet-400 pl-5 sm:pl-6 text-base sm:text-lg font-medium italic bg-gradient-to-r from-violet-50/30 to-transparent py-3 sm:py-4 rounded-r-xl">
              A pergunta não é:
              <br />
              "O que podemos publicar?"
              <br />
              <br />
              Mas:
              <br />
              "O que a comunidade precisa e que interação pode ajudar?"
            </blockquote>
          </div>
        ),
      },
      {
        number: '08',
        icon: <BarChart3 className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-blue-600" />,
        title: 'MEÇA O QUE IMPORTA',
        intro:
          'Não use apenas métricas de vaidade.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Visualizações e seguidores podem ser úteis, mas não explicam por
              si só a saúde de uma comunidade.
            </p>

            <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
              {[
                'participantes únicos',
                'frequência de participação',
                'recorrência',
                'comentários significativos',
                'respostas a pesquisas',
                'assistência efetiva',
                'converção de inscrição para assistência',
                'retenção',
                'participação de novos membros',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/5 bg-gradient-to-br from-blue-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 sm:p-6 border border-emerald-200/30 shadow-sm">
              <p className="font-semibold text-base sm:text-lg">Dica</p>
              <p className="mt-2 text-sm sm:text-base">
                Defina uma referência antes de começar um experimento.
              </p>

              <p className="mt-4 text-center text-base sm:text-lg font-bold">
                ANTES → DURANTE → DEPOIS
              </p>
            </div>
          </div>
        ),
      },
      {
        number: '09',
        icon: <Repeat className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-cyan-600" />,
        title: 'APRENDAS E REPITA',
        intro:
          'Um experimento não serve apenas para obter um resultado.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg">
              Serve para aprender.
            </p>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                'O que esperávamos?',
                'O que aconteceu?',
                'O que mudou?',
                'O que aprendemos?',
                'O que devemos fazer agora?',
              ].map((question) => (
                <div
                  key={question}
                  className="rounded-2xl border border-black/5 bg-gradient-to-br from-cyan-50/50 to-white p-4 sm:p-5 font-medium text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {question}
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-violet-500/10 to-sky-500/10 p-5 sm:p-6 text-center border border-black/5 shadow-sm">
              <p className="text-sm sm:text-lg font-bold leading-loose">
                DADOS → INSIGHTS → DECISÕES → AÇÕES → APRENDIZADO → NOVOS DADOS
              </p>
            </div>
          </div>
        ),
      },
      {
        number: '10',
        icon: <Brain className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-indigo-600" />,
        title: 'USE IA COMO COACH, NÃO COMO ORÁCULO',
        intro:
          'A inteligência artificial pode te ajudar a pensar melhor, mas não conhece toda a realidade de uma comunidade.',
        content: (
          <div className="space-y-5 sm:space-y-6">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                'interpretar sinais',
                'comparar alternativas',
                'encontrar padrões',
                'formular hipóteses',
                'desenhar experimentos',
                'propor métricas',
                'converter insights em ações',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/5 bg-gradient-to-br from-indigo-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 sm:p-6 shadow-sm">
              <p className="font-semibold text-base sm:text-lg">Por isso:</p>

              <ul className="mt-3 space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Não apresente hipóteses como fatos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Não invente dados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Valide as recomendações.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Mantenha o critério humano na decisão final.</span>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        number: '11',
        icon: <Shield className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 text-red-600" />,
        title: 'COMUNIDADE + DADOS + ÉTICA',
        intro:
          'Trabalhar com dados de comunidade implica responsabilidade.',
        content: (
          <div className="space-y-6 sm:space-y-8">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                'privacidade',
                'consentimento',
                'transparência',
                'vieses',
                'inclusão',
                'autonomia',
                'uso responsável da automação',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/5 bg-gradient-to-br from-red-50/50 to-white px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-md transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <blockquote className="rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-50 to-violet-100/50 p-5 sm:p-6 text-base sm:text-lg font-medium italic leading-relaxed shadow-sm">
              "Estamos usando estes dados para ajudar as pessoas ou apenas para
              otimizar uma métrica?"
            </blockquote>

            <p className="font-semibold text-base sm:text-lg rounded-xl bg-violet-50/50 p-4 sm:p-5 border border-violet-200/30">A resposta importa.</p>
          </div>
        ),
      },
    ],
    checklist: {
      intro: 'Antes de executar uma iniciativa, verifique:',
      title: 'Checklist final',
      preRun: 'Antes de executar',
      items: [
        { icon: <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />, label: 'SINAL', question: 'Temos um sinal real?' },
        { icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />, label: 'INSIGHT', question: 'Entendemos o que pode significar?' },
        { icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />, label: 'PRIORIDADE', question: 'Sabemos o que devemos atender primeiro?' },
        { icon: <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />, label: 'AÇÃO', question: 'Existe uma ação concreta?' },
        { icon: <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />, label: 'CONTEÚDO', question: 'O conteúdo responde a uma necessidade real?' },
        { icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />, label: 'MÉTRICA', question: 'Sabemos como medir o resultado?' },
        { icon: <Repeat className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />, label: 'APRENDIZADO', question: 'Sabemos o que aprenderemos?' },
        { icon: <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />, label: 'REVISÃO HUMANA', question: 'Uma pessoa validará a decisão?' },
      ],
    },
    finalStatement: {
      badge: 'Community Pulse em uma ideia',
      items: [
        'Escuta antes de falar.',
        'Entende antes de agir.',
        'Experimente antes de escalar.',
        'Meça antes de assumir.',
        'Aprenda antes de repetir.',
      ],
      quote1:
        'Community Pulse não busca criar comunidades mais barulhentas.',
      quote2:
        'Busca ajudar a construir comunidades mais úteis, mais participativas, mais sustentáveis e mais humanas.',
    },
    nav: { backToApp: 'Voltar ao início' },
    footer: {
      brand: 'Community Pulse',
      tagline:
        'Os dados orientam. A IA acompanha. As pessoas decidem.',
    },
    downloadBtn: 'Baixar PDF',
    generatingPdf: 'Gerando PDF...',
  },
};
export default function GuiaPracticaPage() {
  const [language, setLanguage] = useState<Language>('es');
  const [languageReady, setLanguageReady] = useState(false);
  const [year] = useState(() => new Date().getFullYear());
  const [isGenerating, setIsGenerating] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const urlLang = new URLSearchParams(
      window.location.search
    ).get('lang');

    const saved = localStorage.getItem(
      'growth_coach_lang'
    ) as Language | null;

    const initialLanguage: Language =
      urlLang === 'es' || urlLang === 'pt'
        ? urlLang
        : saved === 'es' || saved === 'pt'
          ? saved
          : 'es';

    setLanguage(initialLanguage);
    setLanguageReady(true);
  }, []);

  useEffect(() => {
    if (!languageReady) return;

    localStorage.setItem('growth_coach_lang', language);
  }, [language, languageReady]);

  const t = content[language];

  const handleDownload = useCallback(() => {
    setIsGenerating(true);

    try {
      const pdfFileName =
        language === 'es'
          ? '/Community_Pulse_Guia_Practica_es.pdf'
          : '/Community_Pulse_Guia_Pratico_pt.pdf';

      const link = document.createElement('a');
      link.href = pdfFileName;
      link.download = pdfFileName.split('/').pop() ||
        'guia-practica.pdf';

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [language]);

  const principles = [
  {
    ...t.technology,
    tone: 'amber',
    icon: Search,
  },
  {
    ...t.data,
    tone: 'emerald',
    icon: BarChart3,
  },
  {
    ...t.people,
    tone: 'violet',
    icon: Brain,
  },
] as const;

const principleStyles = {
  amber: {
    card: 'border-amber-200/80 bg-amber-50/70',
    icon: 'bg-amber-100 text-amber-700',
  },
  emerald: {
    card: 'border-emerald-200/80 bg-emerald-50/70',
    icon: 'bg-emerald-100 text-emerald-700',
  },
  violet: {
    card: 'border-violet-200/80 bg-violet-50/70',
    icon: 'bg-violet-100 text-violet-700',
  },
} as const;


  return (
    <main className="min-h-screen overflow-x-clip bg-[#F8FAF7] text-neutral-900">

      {/* Navegación */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Compass className="h-5 w-5" />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-neutral-900 sm:text-base">
                {t.footer.brand}
              </span>
              <span className="block truncate text-xs text-neutral-500">
                {t.tagline}
              </span>
            </span>
          </Link>

          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">

            <div
              role="group"
              aria-label="Language selector"
              className="flex shrink-0 items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-1"
            >
              {(['es', 'pt'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-pressed={language === lang}
                  className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-colors ${
                    language === lang
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-neutral-600 hover:bg-white'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              aria-label={t.downloadBtn}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}

              <span className="hidden sm:inline">
                {isGenerating
                  ? t.generatingPdf
                  : t.downloadBtn}
              </span>
              <span className="sm:hidden">PDF</span>
            </button>

          </div>
        </div>
      </header>

      <div
        ref={contentRef}
        className="bg-gradient-to-b from-white via-[#F8FAF7] to-white print:bg-white"
      >

        {/* Hero */}
        <section className="border-b border-neutral-200/70">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">

            <div className="mx-auto max-w-4xl text-center">

              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 sm:px-4 sm:text-sm">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>{t.tagline}</span>
              </div>

              <p className="mt-6 text-xs font-bold uppercase leading-relaxed tracking-[0.15em] text-emerald-700 sm:text-sm sm:tracking-[0.2em]">
                {t.slogan}
              </p>

              <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-neutral-600 sm:text-xl lg:text-2xl">
                {t.heroSubtitle}
              </p>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                {t.heroIntro}
              </p>
            </div>

            {/* Tres principios */}
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
               {principles.map((item) => {
                const Icon = item.icon;
                const styles = principleStyles[item.tone];

                return (
                  <article
                    key={item.title}
                    className={`rounded-2xl border p-4 sm:p-5 ${styles.card}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <h2 className="mt-4 text-base font-bold text-neutral-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {item.desc}
                    </p>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* Guía: once pasos, sin columnas laterales vacías */}
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
          <div className="space-y-5 sm:space-y-7">

            {t.sections.map((section) => (
              <article
                key={section.number}
                className="min-w-0 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md sm:rounded-3xl"
              >
                <div className="min-w-0 p-5 sm:p-7 lg:p-8">

                  {/* Cabecera compacta */}
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 sm:h-14 sm:w-14">
                      {section.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-bold tracking-[0.16em] text-emerald-700">
                        PASO {section.number}
                      </p>

                      <h2 className="mt-1 break-words text-xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-2xl lg:text-3xl">
                        {section.title}
                      </h2>

                      <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                        {section.intro}
                      </p>
                    </div>

                  </div>

                  {/* Contenido de cada paso */}
                  <div className="mt-5 min-w-0 border-t border-neutral-100 pt-5 sm:mt-6 sm:pt-6">
                    <div className="min-w-0 break-words text-neutral-700 [&_blockquote]:my-4 [&_li]:leading-relaxed [&_p]:leading-relaxed">
                      {section.content}
                    </div>
                  </div>

                </div>
              </article>
            ))}

          </div>
        </section>

        {/* Checklist */}
        <section className="border-y border-neutral-200/80 bg-gradient-to-br from-violet-50/60 via-white to-emerald-50/60">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">

            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 sm:text-sm">
                {t.checklist.preRun}
              </p>

              <h2 className="mt-3 flex items-start gap-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                <Compass className="mt-1 h-7 w-7 shrink-0 text-violet-700 sm:h-8 sm:w-8" />
                <span>{t.checklist.title}</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                {t.checklist.intro}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10">
              {t.checklist.items.map((item) => (
                <article
                  key={item.label}
                  className="flex min-w-0 items-start gap-3 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 ring-1 ring-neutral-100">
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-bold tracking-wide text-neutral-900 sm:text-base">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                      {item.question}
                    </p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* Cierre */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          <div className="overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-5 shadow-sm sm:p-8 lg:p-10">

            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-emerald-700 px-3 py-2 text-xs font-bold text-white sm:px-4 sm:text-sm">
              <Sprout className="h-4 w-4 shrink-0" />
              <span>{t.finalStatement.badge}</span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {t.finalStatement.items.map((item, index) => (
                <p
                  key={item}
                  className="flex min-w-0 items-start gap-3 rounded-xl border border-neutral-200/70 bg-white/80 p-4 text-sm font-semibold leading-6 text-neutral-800 sm:text-base"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </p>
              ))}
            </div>

            <div className="my-7 h-px bg-gradient-to-r from-emerald-300 via-amber-300 to-transparent sm:my-9" />

            <p className="max-w-3xl text-base italic leading-7 text-neutral-600 sm:text-lg">
              {t.finalStatement.quote1}
            </p>

            <p className="mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl">
              {t.finalStatement.quote2}
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 sm:text-base"
            >
              <span aria-hidden="true">←</span>
              {t.nav.backToApp}
            </Link>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7 sm:text-sm">
            <p>© {year} {t.footer.brand}</p>
            <p className="leading-relaxed sm:text-right">
              {t.footer.tagline}
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
