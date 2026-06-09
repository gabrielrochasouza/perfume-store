'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const SLIDES = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/10873814/pexels-photo-10873814.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Perfume de luxo',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/4154204/pexels-photo-4154204.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Fragrância premium',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/15096784/pexels-photo-15096784.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Coleção exclusiva',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/23230653/pexels-photo-23230653.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Perfumaria sofisticada',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/9790391/pexels-photo-9790391.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Fragrância exclusiva',
  },
];

const INTERVAL = 5500;

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
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section className="relative min-h-screen bg-dark flex items-center overflow-hidden">
      {/* Carousel background */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={i === current ? { animation: 'heroKenBurns 8s ease-out forwards' } : {}}
          />
        </div>
      ))}

      {/* Depth overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-dark/90 via-dark/60 to-dark/25 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-dark/80 via-transparent to-dark/25 pointer-events-none" />

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

      {/* Arrow navigation */}
      <button
        onClick={() => { prev(); setPaused(true); }}
        aria-label="Slide anterior"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-[3] p-2.5 border border-white/15 text-white/50 hover:border-accent/60 hover:text-accent transition-all duration-300 bg-dark/20 backdrop-blur-sm"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={() => { next(); setPaused(true); }}
        aria-label="Próximo slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-[3] p-2.5 border border-white/15 text-white/50 hover:border-accent/60 hover:text-accent transition-all duration-300 bg-dark/20 backdrop-blur-sm"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Slide counter + dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true); }}
              aria-label={`Slide ${i + 1}`}
              className="py-2 flex items-center"
            >
              <span
                className={`block h-px transition-all duration-500 ${
                  i === current ? 'w-8 bg-accent' : 'w-3 bg-white/30 hover:bg-white/55'
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-white/20 text-[9px] tracking-[0.35em]">
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
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
