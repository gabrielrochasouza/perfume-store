// Centralized site config — reads NEXT_PUBLIC_ env vars with mock fallbacks.
// To customise, copy .env.example → .env.local and fill in your values.
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || 'Perfume Store',
  slogan: process.env.NEXT_PUBLIC_STORE_SLOGAN || 'Fragrâncias que marcam presença',

  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999',

  // PIX key — defaults to WhatsApp number with +55 country code
  pixKey:
    process.env.NEXT_PUBLIC_PIX_KEY ||
    `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'}`,

  email: process.env.NEXT_PUBLIC_STORE_EMAIL || 'contato@perfumestore.com',
  phone: process.env.NEXT_PUBLIC_STORE_PHONE || '(11) 99999-9999',

  address: process.env.NEXT_PUBLIC_STORE_ADDRESS || 'Rua das Fragrâncias, 123 - Centro',
  city: process.env.NEXT_PUBLIC_STORE_CITY || 'São Paulo',
  state: process.env.NEXT_PUBLIC_STORE_STATE || 'SP',
  cep: process.env.NEXT_PUBLIC_STORE_CEP || '01310-100',

  businessHours:
    process.env.NEXT_PUBLIC_BUSINESS_HOURS || 'Seg–Sex: 9h–18h | Sáb: 9h–13h',

  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'perfumestore',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || 'perfumestore',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK || 'perfumestore',

  foundedYear: process.env.NEXT_PUBLIC_FOUNDED_YEAR || '2024',
} as const;
