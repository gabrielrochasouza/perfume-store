'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug, products } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { ProductCard } from '@/components/ProductCard';
import { useToastStore } from '@/store/toast';
import { ShoppingBag, Heart } from 'lucide-react';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const showToast = useToastStore((s) => s.show);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-dark">
        <div className="text-center">
          <h1 className="font-elegant text-5xl md:text-6xl font-light mb-4 text-dark">
            Produto não encontrado
          </h1>
          <p className="text-gray-600 mb-8 font-light">
            Desculpe, esse perfume não existe em nosso catálogo.
          </p>
          <a href="/produtos" className="btn-primary inline-block">
            Voltar para Produtos
          </a>
        </div>
      </div>
    );
  }

  // Related: same category first, then others, max 4
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.categoria === product.categoria ? 0 : 1;
      const bMatch = b.categoria === product.categoria ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast(`${product.nome} adicionado ao carrinho`, 'add');
  };

  const handleFinishPurchase = () => {
    addItem(product, quantity);
    router.push('/carrinho');
  };

  return (
    <main className="min-h-screen bg-white text-dark">
      <div className="container-custom py-12">
        <a
          href="/produtos"
          className="text-accent hover:text-accent/80 transition-colors mb-8 inline-block font-light text-sm"
        >
          ← Voltar para Produtos
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="relative h-96 md:h-[500px] bg-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Image
                src={product.imagem}
                alt={product.nome}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 tracking-widest font-light uppercase">
                  {product.marca}
                </p>
                <h1 className="font-elegant text-4xl md:text-5xl font-light mt-2 tracking-tight text-dark">
                  {product.nome}
                </h1>
              </div>
              <button className="p-3 rounded-full bg-light hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 text-dark">
                <Heart size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-accent text-3xl md:text-4xl font-light">
                R$ {product.preco.toFixed(2).replace('.', ',')}
              </p>
              {product.preco > 299 && (
                <p className="text-green-600 mt-3 font-light">✓ Frete grátis neste pedido</p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-xs text-gray-500 tracking-widest font-light uppercase">Volume</p>
                <p className="text-lg font-light text-dark">{product.volume}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 tracking-widest font-light uppercase">Categoria</p>
                <p className="text-lg font-light capitalize text-dark">{product.categoria}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 tracking-widest font-light uppercase">Família Olfativa</p>
                <p className="text-lg font-light text-dark">{product.familiaOlfativa}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p className="text-gray-700 font-light leading-relaxed">{product.descricao}</p>
            </div>

            {/* Scent Notes */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: 'Notas de Topo', notas: product.notasTopo },
                  { label: 'Notas de Coração', notas: product.notasCoracao },
                  { label: 'Notas de Fundo', notas: product.notasFundo },
                ].map(({ label, notas }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500 tracking-widest font-light uppercase mb-3">
                      {label}
                    </p>
                    <div className="space-y-1.5">
                      {notas.map((nota, i) => (
                        <p key={i} className="text-sm font-light text-dark">{nota}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-light text-dark">Quantidade:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-light transition-colors font-light text-dark"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-light text-dark border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-light transition-colors font-light text-dark"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-accent text-dark py-3.5 flex items-center justify-center gap-2 font-medium text-sm tracking-wide hover:bg-yellow-400 transition-colors rounded-lg"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                Adicionar ao Carrinho
              </button>

              <button
                onClick={handleFinishPurchase}
                className="w-full bg-dark text-white py-3.5 font-light text-sm tracking-wide hover:bg-dark/80 transition-colors rounded-lg"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-200">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-elegant text-3xl md:text-4xl font-light tracking-tight text-dark">
                Outros Produtos
              </h2>
              <a
                href="/produtos"
                className="text-accent hover:text-accent/80 text-sm font-light transition-colors"
              >
                Ver todos →
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={(prod) => addItem(prod, 1)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
