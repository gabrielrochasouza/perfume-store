import type { Metadata } from 'next';
import { Truck, Lock, MessageCircle, Trophy } from 'lucide-react';
import { ImageCarousel } from '@/components/ImageCarousel';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Home - Perfume Store',
  description: 'Descubra os melhores perfumes premium com entrega rápida e segura. Mais de 2.000 clientes satisfeitos.',
};

export default function Home() {
  const featuredProducts = products.filter((p) => p.destaque).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="bg-light pt-2 md:pt-4 pb-4 md:pb-6">
        <div className="container-custom">
          <ImageCarousel />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-6 md:py-8 bg-white">
        <div className="container-custom">
          <h2 className="font-elegant text-3xl md:text-4xl font-light text-center mb-6 tracking-tight">
            Por que escolher a gente?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Benefit 1 */}
            <div className="text-center p-4 hover:bg-light rounded-lg transition-all duration-300">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy size={20} strokeWidth={1.5} className="text-dark" />
              </div>
              <h3 className="font-elegant text-xl font-light mb-2">Perfumes Originais</h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                100% autênticos e certificados. Garantia de qualidade em cada fragrância premium.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center p-4 hover:bg-light rounded-lg transition-all duration-300">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck size={20} strokeWidth={1.5} className="text-dark" />
              </div>
              <h3 className="font-elegant text-xl font-light mb-2">Entrega Rápida</h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                Despachamos em até 24h. Frete grátis para compras acima de R$ 299.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center p-4 hover:bg-light rounded-lg transition-all duration-300">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock size={20} strokeWidth={1.5} className="text-dark" />
              </div>
              <h3 className="font-elegant text-xl font-light mb-2">Compra Segura</h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                Pagamento seguro e criptografado. Sua privacidade é nossa prioridade.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center p-4 hover:bg-light rounded-lg transition-all duration-300">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle size={20} strokeWidth={1.5} className="text-dark" />
              </div>
              <h3 className="font-elegant text-xl font-light mb-2">Suporte Premium</h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                Atendimento especializado via WhatsApp 24/7. Estamos sempre prontos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-light">
          <div className="container-custom">
            <h2 className="font-elegant text-5xl md:text-6xl font-light text-center mb-4 tracking-tight">
              Destaques
            </h2>
            <p className="text-center text-gray-600 mb-12 font-light">
              Conheça nossos perfumes mais procurados
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <a href="/produtos" className="btn-primary inline-block">
                Ver Todos os Produtos
              </a>
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-elegant text-5xl md:text-6xl font-light text-center mb-4 tracking-tight">
            Toda Nossa Coleção
          </h2>
          <p className="text-center text-gray-600 mb-12 font-light">
            {products.length} perfumes premium para você escolher
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="section-padding bg-dark text-white">
        <div className="container-custom text-center">
          <h2 className="font-elegant text-5xl md:text-6xl font-light mb-6 tracking-tight">
            Pronto para encontrar seu perfume?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Navegue por nossa coleção exclusiva e descubra fragrâncias que refletem sua personalidade.
          </p>
          <a href="/produtos" className="btn-primary inline-block">
            Explorar Produtos
          </a>
        </div>
      </section>
    </div>
  );
}
