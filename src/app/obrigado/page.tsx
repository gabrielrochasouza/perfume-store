'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MessageCircle, ShoppingBag, Copy, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { generatePix } from '@/lib/pix';

interface LastOrder {
  payment: string;
  total: number;
  needsChange?: boolean;
  changeAmount?: string | null;
}

export default function ObrigadoPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('last-order');
      if (raw) {
        setOrder(JSON.parse(raw));
        sessionStorage.removeItem('last-order');
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const pixCode =
    order?.payment === 'pix'
      ? generatePix({
          key: siteConfig.pixKey,
          name: siteConfig.name,
          city: siteConfig.city,
          amount: order.total,
        })
      : null;

  const handleCopy = async () => {
    if (!pixCode) return;
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <main className="min-h-screen bg-white text-dark flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        className="text-center max-w-md w-full"
      >
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle size={42} strokeWidth={1.3} className="text-accent" />
          </div>
        </motion.div>

        <h1 className="font-elegant text-5xl font-light tracking-tight text-dark mb-3">
          Obrigado!
        </h1>
        <p className="text-gray-500 font-light leading-relaxed mb-2">
          Seu pedido foi enviado com sucesso pelo WhatsApp.
        </p>
        <p className="text-gray-400 text-sm font-light mb-8">
          Em breve entraremos em contato pelo número{' '}
          <span className="text-dark font-medium">{siteConfig.phone}</span> para confirmar.
        </p>

        {/* PIX payment section */}
        <AnimatePresence>
          {pixCode && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mb-8 text-left"
            >
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    {/* PIX logo-like icon */}
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 5.5L10 10M18.5 5.5L14 10M5.5 18.5L10 14M18.5 18.5L14 14M10 10L12 12M14 10L12 12M10 14L12 12M14 14L12 12" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Pagar via PIX</p>
                    <p className="text-xs text-gray-400 font-light">
                      Total: <span className="text-accent font-medium">R$ {order!.total.toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Instructions */}
                <ol className="text-xs text-gray-500 font-light space-y-1 mb-4 list-none">
                  <li className="flex gap-2"><span className="text-accent font-medium">1.</span> Abra o app do seu banco</li>
                  <li className="flex gap-2"><span className="text-accent font-medium">2.</span> Acesse a área PIX → Pagar</li>
                  <li className="flex gap-2"><span className="text-accent font-medium">3.</span> Escolha &quot;Copia e Cola&quot; e cole o código abaixo</li>
                </ol>

                {/* Code block */}
                <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3">
                  <p className="text-[10px] text-gray-400 tracking-[0.12em] uppercase mb-1.5">Código PIX Copia e Cola</p>
                  <p className="text-[10px] font-mono text-dark break-all leading-relaxed select-all">
                    {pixCode}
                  </p>
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    copied
                      ? 'bg-green-50 text-green-600 border border-green-200'
                      : 'bg-accent text-dark hover:bg-yellow-400'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={15} strokeWidth={2.5} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={15} strokeWidth={1.8} />
                      Copiar código PIX
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="w-12 h-px bg-accent mx-auto mb-8" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/produtos"
            className="inline-flex items-center justify-center gap-2 bg-accent text-dark px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide hover:bg-yellow-400 transition-colors"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            Continuar Comprando
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-dark/20 text-dark px-8 py-3.5 rounded-lg text-sm font-light tracking-wide hover:border-dark transition-colors"
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            Falar no WhatsApp
          </a>
        </div>
      </motion.div>
    </main>
  );
}
