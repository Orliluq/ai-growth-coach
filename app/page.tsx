'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Language, 
  StepNumber, 
  GrowthFormData, 
  DiagnoseFormData, 
  GrowthAIContext,
  BuildFormData,
  ExperimentFormData,
  ExecuteChecklist,
  ImproveFormData
} from '@/types/growth';
import { translations } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { ProgressSteps } from '@/components/ProgressSteps';
import { ScreenDefine } from '@/components/ScreenDefine';
import { ScreenDiagnose } from '@/components/ScreenDiagnose';
import { ScreenLearn } from '@/components/ScreenLearn';
import { ScreenBuild } from '@/components/ScreenBuild';
import { ScreenExperiment } from '@/components/ScreenExperiment';
import { ScreenExecute } from '@/components/ScreenExecute';
import { ScreenImprove } from '@/components/ScreenImprove';
import { ScreenNextHypothesis } from '@/components/ScreenNextHypothesis';
import { ToastContainer, ToastMessage, ToastType } from '@/components/Toast';
import { Sparkles, Command, ArrowLeft, ArrowRight } from 'lucide-react';

const INITIAL_FORM_DATA: GrowthFormData = {
  goalCategory: null,
  targetDescription: '',
  timeline: '30d',
  experience: 'beginner',
};

const INITIAL_DIAGNOSE_DATA: DiagnoseFormData = {
  audience: '',
  currentAssets: [],
  mainChallenge: null,
  marketingExperience: null,
};

const INITIAL_AI_CONTEXT: GrowthAIContext = {
  audience: '',
  current_assets: [],
  main_challenge: '',
  marketing_experience: '',
  language: 'es',
  project_type: '',
  objective: '',
  timeframe: '30d',
};

const INITIAL_BUILD_DATA: BuildFormData = {
  problem: '',
  persona: '',
  value: '',
  valueProposition: '',
};

const INITIAL_EXPERIMENT_DATA: ExperimentFormData = {
  objective: '',
  hypothesis: '',
  channel: 'linkedin',
  message: '',
  cta: '',
  kpi: 'clicks',
  baseline: '0',
  duration: '7d',
};

const INITIAL_EXECUTE_CHECKLIST: ExecuteChecklist = {
  messageDefined: true,
  formatChosen: true,
  ctaDefined: true,
  kpiDefined: true,
  publishDateSet: false,
};

const INITIAL_IMPROVE_DATA: ImproveFormData = {
  impressions: '480',
  clicks: '48',
  signups: '7',
  engagement: '18',
  conversions: '2',
  notes: '',
};

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('es');
  const [formData, setFormData] = useState<GrowthFormData>(INITIAL_FORM_DATA);
  const [diagnoseData, setDiagnoseData] = useState<DiagnoseFormData>(INITIAL_DIAGNOSE_DATA);
  const [aiContext, setAiContext] = useState<GrowthAIContext>(INITIAL_AI_CONTEXT);
  const [buildData, setBuildData] = useState<BuildFormData>(INITIAL_BUILD_DATA);
  const [experimentData, setExperimentData] = useState<ExperimentFormData>(INITIAL_EXPERIMENT_DATA);
  const [executeChecklist, setExecuteChecklist] = useState<ExecuteChecklist>(INITIAL_EXECUTE_CHECKLIST);
  const [improveData, setImproveData] = useState<ImproveFormData>(INITIAL_IMPROVE_DATA);

  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);
  const [viewingNextHypothesis, setViewingNextHypothesis] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType = 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-2), { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard navigation: 'Ctrl + Enter' to submit active step, 'Arrow Keys' to change steps
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key exits the next hypothesis deep-dive view
      if (e.key === 'Escape' && viewingNextHypothesis) {
        setViewingNextHypothesis(false);
        return;
      }

      // 1. 'Ctrl + Enter' or 'Cmd + Enter' to submit active form / step
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const primaryBtn = (
          document.querySelector('main [data-primary-cta="true"]') ||
          document.querySelector('main form button[type="submit"]') ||
          document.querySelector('main button[type="submit"]') ||
          document.querySelector('main button.min-w-\\[260px\\]') ||
          document.querySelector('main button.min-w-\\[240px\\]')
        ) as HTMLButtonElement | null;

        if (primaryBtn) {
          primaryBtn.click();
        }
        return;
      }

      // 2. 'Arrow Keys' to navigate between unlocked steps
      const activeEl = document.activeElement;
      const isTyping = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        (activeEl as HTMLElement).isContentEditable
      );

      // Do not hijack arrow keys while user is typing in a text field, unless Alt is pressed
      if (isTyping && !e.altKey) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        if (currentStep > 1) {
          e.preventDefault();
          setCurrentStep((prev) => (prev - 1) as StepNumber);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowRight') {
        if (currentStep < maxUnlockedStep) {
          e.preventDefault();
          setCurrentStep((prev) => (prev + 1) as StepNumber);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (currentStep >= maxUnlockedStep && currentStep < 7) {
          e.preventDefault();
          showToast(
            language === 'pt' 
              ? 'Complete a etapa atual para avançar para a próxima.' 
              : 'Completa el paso actual para avanzar al siguiente.',
            'info'
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, maxUnlockedStep, language, viewingNextHypothesis]);

  // Safely restore persisted state after hydration to avoid SSR/client mismatch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedLang = localStorage.getItem('growth_coach_lang') as Language;
        if (savedLang === 'es' || savedLang === 'pt') {
          setLanguage(savedLang);
        }

        const savedForm = localStorage.getItem('growth_coach_form');
        if (savedForm) setFormData(JSON.parse(savedForm));

        const savedDiag = localStorage.getItem('growth_coach_diagnose');
        if (savedDiag) setDiagnoseData(JSON.parse(savedDiag));

        const savedAi = localStorage.getItem('growth_coach_ai_context');
        if (savedAi) setAiContext(JSON.parse(savedAi));

        const savedBuild = localStorage.getItem('growth_coach_build');
        if (savedBuild) setBuildData(JSON.parse(savedBuild));

        const savedExp = localStorage.getItem('growth_coach_experiment');
        if (savedExp) setExperimentData(JSON.parse(savedExp));

        const savedExec = localStorage.getItem('growth_coach_execute');
        if (savedExec) setExecuteChecklist(JSON.parse(savedExec));

        // Calculate maximum unlocked step
        if (savedExec) {
          setMaxUnlockedStep(7);
        } else if (savedExp) {
          setMaxUnlockedStep(6);
        } else if (savedBuild) {
          setMaxUnlockedStep(5);
        } else if (savedDiag) {
          setMaxUnlockedStep(3);
        } else if (savedForm) {
          setMaxUnlockedStep(2);
        }
      } catch {
        // Storage access error or invalid JSON
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('growth_coach_lang', newLang);
    } catch {}
  };

  const handleDefineSubmit = (data: GrowthFormData) => {
    setFormData(data);
    try {
      localStorage.setItem('growth_coach_form', JSON.stringify(data));
    } catch {}
    setMaxUnlockedStep((prev) => Math.max(prev, 2));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiagnoseSubmit = (diagData: DiagnoseFormData, preparedAiContext: GrowthAIContext) => {
    setDiagnoseData(diagData);
    setAiContext(preparedAiContext);
    try {
      localStorage.setItem('growth_coach_diagnose', JSON.stringify(diagData));
      localStorage.setItem('growth_coach_ai_context', JSON.stringify(preparedAiContext));
    } catch {}
    setMaxUnlockedStep((prev) => Math.max(prev, 3));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLearnContinue = () => {
    setMaxUnlockedStep((prev) => Math.max(prev, 4));
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuildSubmit = (data: BuildFormData) => {
    setBuildData(data);
    try {
      localStorage.setItem('growth_coach_build', JSON.stringify(data));
    } catch {}
    setMaxUnlockedStep((prev) => Math.max(prev, 5));
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExperimentSubmit = (data: ExperimentFormData) => {
    setExperimentData(data);
    try {
      localStorage.setItem('growth_coach_experiment', JSON.stringify(data));
    } catch {}
    setMaxUnlockedStep((prev) => Math.max(prev, 6));
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExecuteSubmit = (checklist: ExecuteChecklist) => {
    setExecuteChecklist(checklist);
    try {
      localStorage.setItem('growth_coach_execute', JSON.stringify(checklist));
    } catch {}
    setMaxUnlockedStep((prev) => Math.max(prev, 7));
    setCurrentStep(7);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartLoop = () => {
    // Loop back to Step 04 (or Step 05) with learnings incorporated!
    setViewingNextHypothesis(false);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStep = (step: StepNumber) => {
    setViewingNextHypothesis(false);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyHypothesis = (hypoQuote: string) => {
    setExperimentData((prev) => ({
      ...prev,
      hypothesis: hypoQuote,
      objective: language === 'pt' ? 'Aumentar a taxa de conversão para 28%' : 'Aumentar la tasa de registro al 28%',
      channel: 'linkedin',
      kpi: 'signups',
      duration: '7d',
    }));
    setViewingNextHypothesis(false);
    setCurrentStep(5);
    setMaxUnlockedStep((prev) => Math.max(prev, 5));
    showToast(
      language === 'pt'
        ? 'Hipótese aplicada com sucesso! Etapa 05 aberta para calibrar o experimento.'
        : '¡Hipótesis aplicada con éxito! Paso 05 abierto para calibrar el experimento.',
      'success'
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick starter helper to populate an authentic beginner sample with 1 click
  const loadExampleGoal = () => {
    const sample: GrowthFormData = language === 'pt'
      ? {
          goalCategory: 'product',
          targetDescription: 'Lançar a versão beta do meu software e conquistar meus primeiros 30 clientes pagantes.',
          timeline: '30d',
          experience: 'beginner',
        }
      : {
          goalCategory: 'product',
          targetDescription: 'Lanzar la versión beta de mi software y conseguir mis primeros 30 clientes de pago.',
          timeline: '30d',
          experience: 'beginner',
        };
    setFormData(sample);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navigation Bar with Logo, Tagline, & Language Switcher */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        brandName={t.brand.name}
        tagline={t.brand.tagline}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* 7-Step Progress Indicator */}
        {!viewingNextHypothesis && (
          <section aria-label="Progress workflow">
            <ProgressSteps
              steps={t.navigation.steps}
              currentStep={currentStep}
              onSelectStep={handleSelectStep}
              maxUnlockedStep={maxUnlockedStep}
            />
          </section>
        )}

        {/* Quick demo banner if on step 1 without input */}
        {currentStep === 1 && !formData.goalCategory && !formData.targetDescription && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-4 bg-amber-50/80 border border-amber-200/60 rounded-xl text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {language === 'pt'
                  ? 'Primeira vez aqui? Você pode preencher o formulário ou carregar um exemplo guiado com 1 clique.'
                  : '¿Primera vez aquí? Puedes llenar el formulario o cargar un ejemplo guiado con 1 clic.'}
              </span>
            </div>
            <button
              type="button"
              onClick={loadExampleGoal}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 underline underline-offset-2 shrink-0 cursor-pointer"
            >
              {language === 'pt' ? 'Preencher com um exemplo' : 'Cargar ejemplo guiado'}
            </button>
          </div>
        )}

        {/* Dynamic Screen Content with Smooth Transitions */}
        <AnimatePresence mode="wait">
          {viewingNextHypothesis ? (
            <motion.div
              key="next-hypothesis-deep-dive"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ScreenNextHypothesis
                t={t.screenNextHypothesis}
                language={language}
                buildData={buildData}
                previousExperimentData={experimentData}
                previousImproveData={improveData}
                onBack={() => {
                  setViewingNextHypothesis(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onApplyHypothesis={handleApplyHypothesis}
                onToast={showToast}
              />
            </motion.div>
          ) : (
            <>
              {/* STEP 01 — DEFINE */}
              {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenDefine
                      t={t.screenDefine}
                      initialData={formData}
                      onSubmit={handleDefineSubmit}
                      onError={(msg) => showToast(msg, 'error')} language={'es'}              />
            </motion.div>
          )}

          {/* STEP 02 — DIAGNOSE */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenDiagnose
                t={t.screenDiagnose}
                language={language}
                defineData={formData}
                initialData={diagnoseData}
                onSubmit={handleDiagnoseSubmit}
                onBack={() => handleSelectStep(1)}
                onError={(msg) => showToast(msg, 'error')}
              />
            </motion.div>
          )}

          {/* STEP 03 — LEARN */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenLearn
                      t={t.screenLearn}
                      tDefine={t.screenDefine}
                      tDiagnose={t.screenDiagnose}
                      language={language}
                      defineData={formData}
                      diagnoseData={diagnoseData}
                      onContinue={handleLearnContinue}
                      onBack={() => handleSelectStep(2)}
                      onError={(msg) => showToast(msg, 'error')}
                      aiContext={aiContext}
                  />
            </motion.div>
          )}

          {/* STEP 04 — BUILD */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenBuild
                t={t.screenBuild}
                language={language}
                initialData={buildData}
                onSubmit={handleBuildSubmit}
                onBack={() => handleSelectStep(3)}
                onError={(msg) => showToast(msg, 'error')}
              />
            </motion.div>
          )}

          {/* STEP 05 — EXPERIMENT */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenExperiment
                t={t.screenExperiment}
                language={language}
                buildData={buildData}
                initialData={experimentData}
                onSubmit={handleExperimentSubmit}
                onBack={() => handleSelectStep(4)}
                onError={(msg) => showToast(msg, 'error')}
              />
            </motion.div>
          )}

          {/* STEP 06 — EXECUTE */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenExecute
                t={t.screenExecute}
                language={language}
                buildData={buildData}
                experimentData={experimentData}
                initialChecklist={executeChecklist}
                onSubmit={handleExecuteSubmit}
                onBack={() => handleSelectStep(5)}
                onError={(msg) => showToast(msg, 'error')}
              />
            </motion.div>
          )}

          {/* STEP 07 — IMPROVE */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenImprove
                t={t.screenImprove}
                language={language}
                initialData={improveData}
                onRestartLoop={handleRestartLoop}
                onBack={() => handleSelectStep(6)}
                onOpenNextHypothesis={() => {
                  setViewingNextHypothesis(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>

      </main>

      {/* Footer with Keyboard Navigation Shortcuts info */}
      <footer className="w-full border-t border-stone-200/70 py-6 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">AI Growth Coach</span>
            <span>·</span>
            <span className="italic">{t.brand.tagline}</span>
          </div>

          {/* Keyboard hints badge */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono-data text-stone-500 bg-stone-100/80 px-2.5 py-1 rounded-lg border border-stone-200/60">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-700 shadow-2xs font-semibold">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-700 shadow-2xs font-semibold">Enter</kbd>
              <span>{language === 'pt' ? 'avançar' : 'continuar'}</span>
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-700 shadow-2xs font-semibold inline-flex items-center">
                <ArrowLeft className="w-3 h-3" />
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-700 shadow-2xs font-semibold inline-flex items-center">
                <ArrowRight className="w-3 h-3" />
              </kbd>
              <span>{language === 'pt' ? 'trocar etapa' : 'cambiar paso'}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>
              {language === 'pt' 
                ? 'Protótipo de Marketing com IA por Orli Dun' 
                : 'Prototipo de Marketing con IA por Orli Dun'}
            </span>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>
      </footer>

      {/* Simple Toast Notification Component */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
