'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Product } from '@/types';

interface Props {
  product: Product;
  large?: boolean;
}

export function ProductCard3D({ product, large = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ x: (y - 0.5) * 14, y: (x - 0.5) * -14 });
    setGlare({ x: x * 100, y: y * 100 });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.7s ease-out',
        willChange: 'transform',
      }}
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
          sizes={
            large
              ? '(max-width:768px) 100vw, 70vw'
              : '(max-width:768px) 100vw, 35vw'
          }
        />
      </div>

      {/* Glass glare following cursor */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.09) 0%, transparent 55%)`,
        }}
      />

      {/* Dark overlay — darker at rest so text is legible, lighter on hover */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(15,15,15,0.80) 0%, rgba(15,15,15,0.08) 45%, transparent 100%)'
            : 'linear-gradient(to top, rgba(15,15,15,0.97) 0%, rgba(15,15,15,0.65) 40%, rgba(15,15,15,0.12) 70%, transparent 100%)',
          transition: 'background 0.55s ease',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-end p-6 lg:p-8">
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
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
              {product.preco.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </span>
            <a
              href={`/produto/${product.slug}`}
              className="inline-flex items-center gap-2 text-white/50 hover:text-accent text-[10px] tracking-[0.25em] transition-colors duration-300 group/link"
            >
              VER
              <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
