'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div 
      aria-live="polite" 
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          let bgClass = 'bg-white border-amber-300 text-amber-950 shadow-md';
          let icon = <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />;

          if (toast.type === 'error') {
            bgClass = 'bg-white border-rose-300 text-rose-950 shadow-md';
            icon = <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />;
          } else if (toast.type === 'success') {
            bgClass = 'bg-white border-emerald-300 text-emerald-950 shadow-md';
            icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
          } else if (toast.type === 'info') {
            bgClass = 'bg-white border-indigo-300 text-indigo-950 shadow-md';
            icon = <Info className="w-4 h-4 text-indigo-600 shrink-0" />;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto p-4 rounded-xl border flex items-start justify-between gap-3 text-xs sm:text-sm font-medium ${bgClass}`}
            >
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5">{icon}</span>
                <span className="leading-snug">{toast.message}</span>
              </div>

              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                aria-label="Cerrar notificación"
                className="text-stone-400 hover:text-stone-700 transition-colors p-0.5 -mr-1 -mt-1 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
