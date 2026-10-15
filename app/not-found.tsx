'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Home,
  Leaf,
  Lightbulb,
  Map,
  Sparkles,
} from 'lucide-react';

type Language = 'es' | 'pt';

const translations = {
  es: {
    badge: 'Ups... ¡pequeño desvío!',
    title: '404',
    heading: '¡Esta página se fue de aventura!',
    description:
      'La página que buscas no existe, cambió de lugar o decidió tomar otro camino. No te preocupes: todavía hay mucho por descubrir.',
    home: 'Volver al inicio',
    explore: 'Explorar herramientas',
    guide: 'Leer la guía práctica',
    tipTitle: 'Una idea para llevar contigo',
    tip: 'A veces, los mejores descubrimientos empiezan tomando un camino diferente.',
    footer: 'Sigamos creciendo, paso a paso.',
    signOne: 'Grandes ideas',
    signTwo: 'Mejores decisiones',
    signThree: 'Tu próximo paso',
    mascot: 'Alpi, explorador de caminos',
  },
  pt: {
    badge: 'Ops... um pequeno desvio!',
    title: '404',
    heading: 'Esta página saiu em uma aventura!',
    description:
      'A página que você procura não existe, mudou de lugar ou resolveu seguir outro caminho. Não se preocupe: ainda há muito para descobrir.',
    home: 'Voltar ao início',
    explore: 'Explorar ferramentas',
    guide: 'Ler o guia prático',
    tipTitle: 'Uma ideia para levar com você',
    tip: 'Às vezes, as melhores descobertas começam quando seguimos um caminho diferente.',
    footer: 'Vamos continuar crescendo, um passo de cada vez.',
    signOne: 'Grandes ideias',
    signTwo: 'Melhores decisões',
    signThree: 'Seu próximo passo',
    mascot: 'Alpi, explorador de caminhos',
  },
} as const;

export default function NotFound() {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('growth_coach_lang');

      if (savedLanguage === 'pt' || savedLanguage === 'pt-BR') {
        setLanguage('pt');
      } else {
        setLanguage('es');
      }
    } catch {
      setLanguage('es');
    }
  }, []);

  const t = translations[language];

  return (
    <main
      lang={language === 'pt' ? 'pt-BR' : 'es'}
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#FCFAF5] text-[#183B36]"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-64 -z-10 h-72 w-72 rounded-full bg-[#E5F1E4] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 -z-10 h-80 w-80 rounded-full bg-[#EEE9FC] blur-3xl"
      />

      {/* Header */}
      <header className="border-b border-stone-200/70 bg-white/70">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="AI Growth Coach — inicio"
            className="group flex min-w-0 items-center gap-2.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 transition-transform group-hover:-rotate-6">
              <Leaf className="h-6 w-6" />
            </span>
            <span className="truncate text-lg font-extrabold tracking-tight sm:text-xl">
              AI Growth Coach
            </span>
          </Link>

          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-600 sm:text-sm">
            <span aria-hidden="true">🌎</span>
            {language === 'pt' ? 'PT-BR' : 'ES'}
          </span>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-20">
        {/* Text */}
        <div className="mx-auto w-full max-w-2xl lg:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            <Sparkles className="h-4 w-4" />
            {t.badge}
          </div>

          <p className="text-[clamp(6rem,20vw,10rem)] font-black leading-[0.85] tracking-[-0.09em] text-[#183B36]">
            {t.title}
          </p>

          <h1 className="mt-7 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t.heading}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
            {t.description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
              <Home className="h-4 w-4" />
              {t.home}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/#herramientas"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-700/30 bg-white/80 px-5 py-3 text-sm font-bold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <Compass className="h-4 w-4" />
              {t.explore}
            </Link>

            <Link
              href="/guia-practica"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-stone-600 transition hover:bg-white hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <Map className="h-4 w-4" />
              {t.guide}
            </Link>
          </div>
        </div>

        {/* Playful explorer illustration */}
        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 bottom-4 top-8 rounded-[45%] bg-gradient-to-br from-violet-100/80 via-white/40 to-emerald-100/80"
          />

          <div className="relative flex min-h-[350px] flex-col items-center justify-center px-3 py-8 sm:min-h-[430px]">
            {/* Floating details */}
            <Sparkles
              aria-hidden="true"
              className="absolute right-[12%] top-[12%] h-8 w-8 animate-pulse text-amber-500"
            />
            <Leaf
              aria-hidden="true"
              className="absolute left-[10%] top-[26%] h-8 w-8 -rotate-12 text-emerald-600"
            />

            {/* Direction sign */}
            <div className="absolute right-0 top-[14%] z-10 flex w-[47%] flex-col gap-2 sm:right-1 sm:w-[43%]">
              {[
                { label: t.signOne, color: 'bg-amber-200 text-amber-950', rotate: 'rotate-2' },
                { label: t.signTwo, color: 'bg-emerald-200 text-emerald-950', rotate: '-rotate-2' },
                { label: t.signThree, color: 'bg-violet-200 text-violet-950', rotate: 'rotate-1' },
              ].map((sign) => (
                <div
                  key={sign.label}
                  className={`flex min-h-12 items-center justify-center gap-1 rounded-xl border border-white/70 px-2 py-2 text-center text-xs font-extrabold shadow-md transition-transform hover:rotate-0 sm:min-h-14 sm:text-sm ${sign.color} ${sign.rotate}`}
                >
                  {sign.label}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </div>
              ))}
              <div className="mx-auto h-9 w-2 rounded-full bg-amber-800/60" />
            </div>

            {/* Friendly mascot */}
            <div className="relative z-20 mt-16 flex flex-col items-center sm:mt-12">
              <div className="mb-[-10px] flex h-7 w-12 items-center justify-center rounded-t-full bg-emerald-700">
                <span className="h-2 w-2 rounded-full bg-amber-300" />
              </div>

              <div className="relative flex h-36 w-44 items-center justify-center rounded-[2.7rem] border-[7px] border-[#E6E0D4] bg-white shadow-xl sm:h-44 sm:w-52">
                <div className="absolute inset-2 rounded-[2rem] bg-[#19332F]" />

                <div className="relative flex items-center gap-5">
                  <span className="h-5 w-4 rounded-full border-[3px] border-white border-b-0" />
                  <span className="h-5 w-4 rounded-full border-[3px] border-white border-b-0" />
                </div>

                <span className="absolute bottom-7 h-3 w-6 rounded-b-full border-b-[3px] border-emerald-300" />

                <span className="absolute -left-4 top-14 h-9 w-4 rounded-l-full bg-emerald-600" />
                <span className="absolute -right-4 top-14 h-9 w-4 rounded-r-full bg-emerald-600" />
              </div>

              <div className="relative -mt-1 flex h-10 w-28 items-center justify-center rounded-b-2xl border-x-4 border-b-4 border-[#DAD5C9] bg-emerald-800">
                <Leaf className="h-5 w-5 text-emerald-100" />
              </div>

              <div className="mt-[-2px] flex gap-7">
                <div className="h-9 w-12 rounded-b-2xl border-4 border-[#DAD5C9] bg-emerald-700 sm:h-11 sm:w-14" />
                <div className="h-9 w-12 rounded-b-2xl border-4 border-[#DAD5C9] bg-emerald-700 sm:h-11 sm:w-14" />
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2 text-xs font-semibold text-stone-600 shadow-sm">
                <Compass className="h-4 w-4 text-emerald-700" />
                {t.mascot}
              </div>
            </div>

            {/* Ground */}
            <div
              aria-hidden="true"
              className="absolute bottom-7 left-[8%] right-[8%] h-8 rounded-[50%] bg-emerald-200/70 blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Encouraging footer tip */}
      <footer className="mx-auto w-full max-w-7xl px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10">
        <div className="flex flex-col gap-4 rounded-3xl border border-white bg-white/75 p-5 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-6 lg:px-8">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-2xl bg-amber-50 text-amber-700 sm:self-center">
            <Lightbulb className="h-6 w-6" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-bold text-emerald-900">{t.tipTitle}</p>
            <p className="mt-1 text-sm leading-6 text-stone-600">
              {t.tip}
            </p>
          </div>

          <p className="shrink-0 text-sm font-bold text-emerald-800">
            {t.footer} ♥
          </p>
        </div>
      </footer>
    </main>
  );
}
