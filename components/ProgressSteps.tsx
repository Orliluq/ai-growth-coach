'use client';

import React from 'react';
import { StepNumber } from '@/types/growth';
import { Check } from 'lucide-react';

interface StepItem {
  id: number;
  num: string;
  label: string;
  shortDesc: string;
}

interface ProgressStepsProps {
  steps: StepItem[];
  currentStep: StepNumber;
  onSelectStep?: (step: StepNumber) => void;
  maxUnlockedStep?: number;
}

export function ProgressSteps({
  steps,
  currentStep,
  onSelectStep,
  maxUnlockedStep = 2,
}: ProgressStepsProps) {
  return (
    <nav aria-label="Workflow progress" className="w-full">
      {/* Desktop & Tablet View */}
      <div className="hidden md:block bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-2xs">
        <ol className="grid grid-cols-7 gap-2">
          {steps.map((step) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isUnlocked = step.id <= maxUnlockedStep;

            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => isUnlocked && onSelectStep && onSelectStep(step.id as StepNumber)}
                  disabled={!isUnlocked}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col justify-between h-full group ${
                    isCurrent
                      ? 'bg-amber-50/90 border border-amber-300 shadow-xs ring-1 ring-amber-200/60'
                      : isCompleted
                      ? 'bg-stone-50/60 border border-stone-200 hover:bg-stone-100/60 cursor-pointer'
                      : isUnlocked
                      ? 'border border-transparent hover:bg-stone-50 cursor-pointer opacity-80'
                      : 'opacity-40 cursor-not-allowed border border-transparent'
                  }`}
                >
                  {/* Step number & indicator */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`font-mono-data text-xs font-semibold ${
                        isCurrent
                          ? 'text-amber-900'
                          : isCompleted
                          ? 'text-emerald-700'
                          : 'text-stone-400'
                      }`}
                    >
                      {step.num}
                    </span>

                    {isCompleted ? (
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-200 group-hover:bg-stone-300" />
                    )}
                  </div>

                  {/* Step title */}
                  <div>
                    <span
                      className={`block text-xs font-bold truncate leading-tight ${
                        isCurrent
                          ? 'text-stone-900'
                          : isCompleted
                          ? 'text-stone-800'
                          : 'text-stone-500'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="block text-[11px] text-stone-400 truncate mt-0.5 font-normal">
                      {step.shortDesc}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile Compact View */}
      <div className="md:hidden bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-data text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
              {steps[currentStep - 1]?.num || '01'} / 07
            </span>
            <span className="text-xs font-bold text-stone-900">
              {steps[currentStep - 1]?.label}
            </span>
          </div>
          <span className="text-xs text-stone-500">
            {steps[currentStep - 1]?.shortDesc}
          </span>
        </div>

        {/* 7 mini indicator dots with progress bar */}
        <div className="flex items-center gap-1.5">
          {steps.map((step) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isUnlocked = step.id <= maxUnlockedStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isUnlocked && onSelectStep && onSelectStep(step.id as StepNumber)}
                disabled={!isUnlocked}
                aria-label={`Paso ${step.num}: ${step.label}`}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 ring-2 ring-amber-200'
                    : isCompleted
                    ? 'bg-emerald-500'
                    : 'bg-stone-200'
                }`}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
