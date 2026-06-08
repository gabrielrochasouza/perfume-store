'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

export const FadeIn = ({ children, delay = 0 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    {children}
  </motion.div>
);

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
}

export const SlideUp = ({ children, delay = 0 }: SlideUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    {children}
  </motion.div>
);

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
}

export const ScaleIn = ({ children, delay = 0 }: ScaleInProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
  >
    {children}
  </motion.div>
);

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
}

export const StaggerContainer = ({ children, delay = 0 }: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: delay,
        },
      },
    }}
  >
    {children}
  </motion.div>
);
