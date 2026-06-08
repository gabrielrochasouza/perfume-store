'use client';

import { motion } from 'framer-motion';

interface Props {
  eyebrow: string;
  title: string;
  className?: string;
}

export function SectionTitle({ eyebrow, title, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      <span className="text-accent text-[10px] tracking-[0.5em] font-light block mb-4 uppercase">
        {eyebrow}
      </span>
      <h2 className="font-elegant text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight whitespace-pre-line leading-tight">
        {title}
      </h2>
    </motion.div>
  );
}
