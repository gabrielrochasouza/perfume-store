'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getProductBySlug } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { ShoppingBag, Heart } from 'lucide-react';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-elegant text-5xl md:text-6xl font-light mb-4">Produto não encontrado</h1>
          <p className="text-gray-600 mb-8 font-light">Desculpe, esse perfume não existe em nosso catálogo.</p>
          <a href="/produtos" className="btn-primary inline-block">
            Voltar para Produtos
          </a>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  const handleBuyOnWhatsApp = () => {
    const message = `Olá! Gostaria de comprar:\n\n🛍️ ${product.nome}\n📦 Volume: ${product.volume}\n📊 Quantidade: ${quantity}\n💰 Valor total: R$ ${(product.preco * quantity).toFixed(2)}\n\nObrigado!`;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <a href="/produtos" className="text-accent hover:text-accent/80 transition-colors mb-8 inline-block font-light">
          ← Voltar para Produtos
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-96 md:h-[500px] bg-light rounded-lg overflow-hidden mb-4 shadow-md hover:shadow-lg transition-shadow">
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
                <p className="text-xs text-gray-500 tracking-widest font-light uppercase">{product.marca}</p>
                <h1 className="font-elegant text-4xl md:text-5xl font-light mt-2 tracking-tight">{product.nome}</h1>
              </div>
              <button className="p-3 rounded-full bg-light hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
                <Heart size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-accent text-3xl md:text-4xl font-light">R$ {product.preco.toFixed(2).replace('.', ',')}</p>
              {product.preco > 299 && (
                <p className="text-green-600 mt-3 font-light">✓ Frete grátis neste pedido</p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-5 mb-8">
              <div>
                <p className="text-xs text-gray-600 tracking-widest font-light uppercase">Volume</p>
                <p className="text-lg font-light">{product.volume}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 tracking-widest font-light uppercase">Categoria</p>
                <p className="text-lg font-light capitalize">{product.categoria}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 tracking-widest font-light uppercase">Família Olfativa</p>
                <p className="text-lg font-light">{product.familiaOlfativa}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p className="text-gray-700 font-light leading-relaxed">{product.descricao}</p>
            </div>

            {/* Scent Notes */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-600 tracking-widest font-light uppercase mb-3">Notas de Topo</p>
                  <div className="space-y-2">
                    {product.notasTopo.map((nota, i) => (
                      <p key={i} className="text-sm font-light">{nota}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 tracking-widest font-light uppercase mb-3">Notas de Coração</p>
                  <div className="space-y-2">
                    {product.notasCoracao.map((nota, i) => (
                      <p key={i} className="text-sm font-light">{nota}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 tracking-widest font-light uppercase mb-3">Notas de Fundo</p>
                  <div className="space-y-2">
                    {product.notasFundo.map((nota, i) => (
                      <p key={i} className="text-sm font-light">{nota}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-light">Quantidade:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-light transition-colors font-light"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-light">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-light transition-colors font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center gap-2 font-light"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                Adicionar ao Carrinho
              </button>

              <button
                onClick={handleBuyOnWhatsApp}
                className="w-full btn-secondary font-light"
              >
                Comprar via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
