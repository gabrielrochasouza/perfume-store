import type { Metadata } from 'next';
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppBanner } from '@/components/WhatsAppBanner';
import '@/styles.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Perfume Store - Perfumes Premium',
  description: 'Loja de perfumes premium com as melhores fragrâncias importadas e nacionais. Entrega rápida e segura.',
  keywords: ['perfumes', 'fragrâncias', 'premium', 'importados', 'original'],
  openGraph: {
    type: 'website',
    url: 'https://perfume-store.com',
    title: 'Perfume Store - Perfumes Premium',
    description: 'Loja de perfumes premium com as melhores fragrâncias importadas e nacionais.',
    siteName: 'Perfume Store',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="bg-white text-dark">
        <WhatsAppBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
