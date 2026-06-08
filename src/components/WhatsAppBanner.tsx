'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppBanner() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de mais informações sobre os perfumes.`;

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
          +55 (11) 99999-9999
        </a>
      </div>
    </div>
  );
}
