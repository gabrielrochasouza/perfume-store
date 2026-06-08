'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Trash2, Info, X } from 'lucide-react';
import { useToastStore, type Toast } from '@/store/toast';

const ICONS = {
  add: ShoppingBag,
  remove: Trash2,
  info: Info,
};

const STYLES = {
  add: {
    bar: 'bg-accent',
    icon: 'text-accent bg-accent/10',
    border: 'border-l-accent',
  },
  remove: {
    bar: 'bg-gray-400',
    icon: 'text-gray-500 bg-gray-100',
    border: 'border-l-gray-300',
  },
  info: {
    bar: 'bg-dark',
    icon: 'text-dark bg-gray-100',
    border: 'border-l-dark/30',
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const dismiss = useToastStore((s) => s.dismiss);
  const progressRef = useRef<HTMLDivElement>(null);
  const Icon = ICONS[toast.type];
  const style = STYLES[toast.type];

  // Animate the progress bar width from 100% → 0 over 3.2s
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.width = '100%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'width 3.2s linear';
        el.style.width = '0%';
      });
    });
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.93, transition: { duration: 0.2 } }}
      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
      className={`relative flex items-center gap-3 bg-white rounded-xl shadow-lg border border-gray-100 border-l-4 ${style.border} pl-4 pr-3 py-3 max-w-xs w-full overflow-hidden`}
    >
      {/* Icon */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${style.icon}`}>
        <Icon size={15} strokeWidth={1.8} />
      </div>

      {/* Message */}
      <p className="text-sm font-light text-dark flex-1 leading-snug pr-1">
        {toast.message}
      </p>

      {/* Dismiss */}
      <button
        onClick={() => dismiss(toast.id)}
        className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
      >
        <X size={14} strokeWidth={2} />
      </button>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className={`absolute bottom-0 left-0 h-[2px] ${style.bar}`}
        style={{ width: '100%' }}
      />
    </motion.div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[99999] flex flex-col-reverse gap-2 items-end pointer-events-none">
      <AnimatePresence mode="sync">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
