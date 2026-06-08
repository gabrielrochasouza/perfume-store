'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const PerfumeScene = dynamic(() => import('./PerfumeScene'), { ssr: false });

const letterVariants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: 0,
    transition: {
      delay: 0.9 + i * 0.038,
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

function RevealText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap">
        {text.split('').map((ch, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  return (
    <section
      className="relative min-h-screen bg-dark flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas full background */}
      <div className="absolute inset-0 z-0">
        <PerfumeScene mouseX={mouse.x} mouseY={mouse.y} />
      </div>

      {/* Depth gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-dark/88 via-dark/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-dark/75 via-transparent to-dark/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] container-custom py-28 lg:py-36">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="inline-block text-accent text-[10px] tracking-[0.55em] font-light mb-7"
        >
          COLEÇÃO PREMIUM
        </motion.span>

        <h1 className="font-elegant font-light text-white leading-none tracking-tight mb-8 select-none">
          <RevealText
            text="LUXURY"
            className="text-[clamp(3.5rem,9vw,7.5rem)]"
          />
          <RevealText
            text="FRAGRANCES"
            className="text-[clamp(2.5rem,6.8vw,5.8rem)]"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-white/45 text-base md:text-lg font-light leading-relaxed mb-10 max-w-sm"
        >
          Descubra fragrâncias que marcam presença.
          <br />Uma experiência sensorial única.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/produtos"
            className="group inline-flex items-center gap-3 bg-accent text-dark px-8 py-4 text-[11px] tracking-[0.22em] font-semibold hover:bg-yellow-400 transition-all duration-500"
          >
            EXPLORAR COLEÇÃO
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-base leading-none">
              →
            </span>
          </a>
          <a
            href="#colecao"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 px-8 py-4 text-[11px] tracking-[0.22em] font-light hover:border-accent/60 hover:text-accent transition-all duration-500"
          >
            VER DESTAQUES
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-3"
      >
        <span className="text-white/20 text-[9px] tracking-[0.45em]">SCROLL</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
