'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { Trash2, Plus, Minus, MessageCircle } from 'lucide-react';

export default function CarrinhoPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const total = getTotalPrice();
  const freeShippingThreshold = 299;
  const hasShipping = total < freeShippingThreshold;
  const shippingCost = 30;
  const finalTotal = total + (hasShipping ? shippingCost : 0);

  const handleBuyOnWhatsApp = () => {
    let message = 'Olá! Gostaria de fazer o seguinte pedido:\n\n🛍️ Produtos:\n\n';
    items.forEach((item) => {
      message += `• ${item.nome} - ${item.volume}\n  Quantidade: ${item.quantidadeCarrinho}\n  Valor: R$ ${(item.preco * item.quantidadeCarrinho).toFixed(2)}\n\n`;
    });
    message += hasShipping
      ? `📦 Frete: R$ ${shippingCost.toFixed(2)}\n`
      : `📦 Frete: Grátis\n`;
    message += `\n💰 Total do Pedido: R$ ${finalTotal.toFixed(2)}\n\nObrigado!`;

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white text-dark">
        <div className="container-custom py-20 text-center">
          <h1 className="font-elegant text-5xl md:text-6xl font-light mb-4 tracking-tight text-dark">
            Seu Carrinho
          </h1>
          <p className="text-gray-600 text-lg mb-8 font-light">Seu carrinho está vazio</p>
          <a href="/produtos" className="btn-primary inline-block font-light">
            Continuar Comprando
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-dark">
      <div className="container-custom py-8 md:py-12">
        <h1 className="font-elegant text-4xl md:text-6xl font-light mb-8 tracking-tight text-dark">
          Seu Carrinho
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-light rounded-lg border border-gray-100 hover:border-accent/30 transition-all duration-300 p-4"
              >
                {/* Top row: image + info */}
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.imagem}
                      alt={item.nome}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-elegant font-light text-base sm:text-lg text-dark leading-tight">
                      {item.nome}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-light mt-0.5">
                      {item.marca} · {item.volume}
                    </p>
                    <p className="text-accent font-light text-sm mt-1">
                      R$ {item.preco.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                {/* Bottom row: quantity + subtotal + remove */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1 py-0.5">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantidadeCarrinho - 1))
                      }
                      className="p-1.5 hover:bg-light rounded transition-colors"
                    >
                      <Minus size={13} strokeWidth={1.5} className="text-dark" />
                    </button>
                    <span className="px-2 font-light text-dark text-sm min-w-[1.75rem] text-center">
                      {item.quantidadeCarrinho}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantidadeCarrinho + 1)
                      }
                      className="p-1.5 hover:bg-light rounded transition-colors"
                    >
                      <Plus size={13} strokeWidth={1.5} className="text-dark" />
                    </button>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="flex items-center gap-4">
                    <span className="font-light text-dark text-sm sm:text-base">
                      R${' '}
                      {(item.preco * item.quantidadeCarrinho)
                        .toFixed(2)
                        .replace('.', ',')}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="mt-2 text-red-500 hover:text-red-700 font-light text-sm transition-colors duration-300"
            >
              Limpar Carrinho
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-light p-6 rounded-lg sticky top-20 border border-gray-200 text-dark">
              <h2 className="font-elegant text-2xl md:text-3xl font-light mb-6 text-dark">
                Resumo
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                <div className="flex justify-between font-light text-dark">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>

                {hasShipping ? (
                  <>
                    <div className="flex justify-between text-red-500 font-light">
                      <span>Frete:</span>
                      <span>R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-light">
                      Frete grátis acima de R$ {freeShippingThreshold.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <div className="flex justify-between text-green-600 font-light">
                    <span>Frete:</span>
                    <span>Grátis</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6 text-dark">
                <span className="font-light">Total:</span>
                <span className="font-elegant text-2xl font-light text-accent">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                onClick={handleBuyOnWhatsApp}
                className="w-full bg-dark text-white py-3 flex items-center justify-center gap-2 mb-3 font-light rounded-lg hover:bg-dark/80 transition-colors"
              >
                <MessageCircle size={20} strokeWidth={1.5} />
                Finalizar no WhatsApp
              </button>

              <a
                href="/produtos"
                className="block w-full text-center py-3 border border-accent text-accent rounded-lg font-light hover:bg-accent hover:text-dark transition-all duration-300"
              >
                Continuar Comprando
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
