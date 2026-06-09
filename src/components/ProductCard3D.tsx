'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';

interface Props {
  product: Product;
  large?: boolean;
}

export function ProductCard3D({ product, large = false }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Throttle via RAF — avoids re-renders on every pixel
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = tiltRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 14}deg) rotateY(${(x - 0.5) * -14}deg)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.09) 0%, transparent 55%)`;
      }
    });
  }, []);

  const onEnter = useCallback(() => {
    const el = tiltRef.current;
    if (el) el.style.transition = 'transform 0.1s ease-out';
    if (glareRef.current) glareRef.current.style.opacity = '1';
    if (contentRef.current) contentRef.current.style.transform = 'translateY(-6px)';
  }, []);

  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const el = tiltRef.current;
    if (el) {
      el.style.transition = 'transform 0.7s ease-out';
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    if (glareRef.current) glareRef.current.style.opacity = '0';
    if (contentRef.current) contentRef.current.style.transform = 'translateY(0px)';
  }, []);

  return (
    <Link href={`/produto/${product.slug}`} className="block">
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Inner div owns the 3D tilt — direct DOM mutation avoids React re-renders */}
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ willChange: 'transform' }}
        className={`group relative overflow-hidden cursor-pointer bg-dark ${
          large ? 'h-[540px] lg:h-[620px]' : 'h-[390px] lg:h-[460px]'
        }`}
      >
        {/* Image */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]">
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            className="object-cover"
            sizes={large ? '(max-width:768px) 100vw, 70vw' : '(max-width:768px) 100vw, 35vw'}
          />
        </div>

        {/* Glare — direct opacity mutation, no state */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: 0, transition: 'opacity 0.3s' }}
        />

        {/* Two overlays — CSS group-hover toggles opacity, no JS needed */}
        <div
          className="absolute inset-0 z-[2] group-hover:opacity-0 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(to top, rgba(15,15,15,0.97) 0%, rgba(15,15,15,0.65) 40%, rgba(15,15,15,0.12) 70%, transparent 100%)',
          }}
        />

        {/* Top amber tint — visible before hover, fades on hover */}
        <div
          className="absolute inset-0 z-[2] group-hover:opacity-0 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(to bottom, rgba(201,162,39,0.42) 0%, rgba(201,162,39,0.18) 38%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(to top, rgba(15,15,15,0.80) 0%, rgba(15,15,15,0.08) 45%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-[3] flex flex-col justify-end p-6 lg:p-8">
          <div
            ref={contentRef}
            style={{ transition: 'transform 0.5s cubic-bezier(0.22,0.61,0.36,1)' }}
          >
            <span className="text-accent text-[9px] tracking-[0.4em] font-light uppercase mb-2 block">
              {product.familiaOlfativa}
            </span>
            <h3
              className={`font-elegant text-white font-light tracking-tight leading-none mb-3 ${
                large ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
              }`}
            >
              {product.nome}
            </h3>
            <p className="text-white/35 text-sm font-light mb-4 line-clamp-2 leading-relaxed">
              {product.descricao}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-accent font-light text-base tracking-wide">
                R${' '}
                {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="inline-flex items-center gap-2 text-white/50 group-hover:text-accent text-[10px] tracking-[0.25em] transition-colors duration-300">
                VER
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
