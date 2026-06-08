import type { Metadata } from 'next';
import { Truck, Lock, MessageCircle, Trophy } from 'lucide-react';
import { HeroSection } from '@/components/hero/HeroSection';
import { EditorialGrid } from '@/components/EditorialGrid';
import { SectionTitle } from '@/components/SectionTitle';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Home - Perfume Store',
  description:
    'Descubra os melhores perfumes premium com entrega rápida e segura. Mais de 2.000 clientes satisfeitos.',
};

const benefits = [
  { Icon: Trophy, label: 'Originais', desc: '100% autênticos' },
  { Icon: Truck, label: 'Entrega Rápida', desc: 'Despacho em 24h' },
  { Icon: Lock, label: 'Compra Segura', desc: 'Pagamento criptografado' },
  { Icon: MessageCircle, label: 'Suporte Premium', desc: 'WhatsApp 24/7' },
];

export default function Home() {
  const featured = products.filter((p) => p.destaque);
  const displayProducts =
    featured.length >= 3 ? featured : products.slice(0, 7);

  return (
    <div className="min-h-screen bg-dark">
      <HeroSection />

      {/* Benefits strip */}
      <section id="beneficios" className="py-8 md:py-12 border-y border-white/[0.05]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {benefits.map(({ Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-5 md:p-6 border border-accent/40 hover:border-accent transition-colors duration-500 group"
              >
                <Icon
                  size={19}
                  strokeWidth={1.5}
                  className="text-accent mb-3 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-white text-sm font-light tracking-wide mb-1">
                  {label}
                </span>
                <span className="text-white/30 text-xs font-light">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial collection */}
      <section id="colecao" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionTitle
              eyebrow="Nossa Coleção"
              title={'Fragrâncias que\ncontam histórias.'}
            />
            <a
              href="/produtos"
              className="self-start md:self-auto inline-flex items-center gap-2 text-white/35 hover:text-accent text-[10px] tracking-[0.35em] transition-colors duration-300 group"
            >
              VER TUDO
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
          <EditorialGrid products={displayProducts} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 border-t border-white/[0.05]">
        <div className="container-custom text-center">
          <p className="text-white/20 text-[9px] tracking-[0.45em] mb-6 uppercase">
            Pronto para começar?
          </p>
          <h2 className="font-elegant text-4xl md:text-6xl font-light text-white mb-10 leading-tight tracking-tight">
            Encontre sua fragrância perfeita.
          </h2>
          <a
            href="/produtos"
            className="group inline-flex items-center gap-3 bg-accent text-dark px-10 py-5 text-[11px] tracking-[0.25em] font-semibold hover:bg-yellow-400 transition-all duration-500"
          >
            EXPLORAR PRODUTOS
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-base leading-none">
              →
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
