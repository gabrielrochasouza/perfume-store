'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function WhatsAppBanner() {
  const whatsappLink = `https://wa.me/${siteConfig.whatsapp}?text=Olá! Gostaria de mais informações sobre os perfumes.`;

  return (
    <div className="bg-dark text-white py-1.5 sticky top-0 z-40">
      <div className="container-custom flex items-center justify-center gap-1.5">
        <MessageCircle size={13} strokeWidth={1.5} className="text-green-400" />
        <span className="font-light text-xs">
          Dúvidas? Fale no WhatsApp:
        </span>
        <a
          href={whatsappLink}
          className="font-semibold text-xs text-green-400 hover:underline transition-all ml-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
