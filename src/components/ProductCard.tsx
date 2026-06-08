'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isLowStock = product.estoqueAtual && product.estoqueAtual < 5;

  return (
    <div className="group bg-light text-dark rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30">
      {/* Image Container */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          {product.destaque && (
            <span className="bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={12} strokeWidth={2.5} fill="currentColor" /> DESTAQUE
            </span>
          )}
          {isLowStock && (
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Zap size={12} strokeWidth={2.5} /> LIMITADO
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute bottom-4 right-4 bg-white text-dark p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-white hover:scale-110">
          <Heart size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs text-gray-500 tracking-widest font-light uppercase">{product.marca}</p>
          <p className="text-xs text-gray-500 tracking-wide font-light">{product.volume}</p>
        </div>

        <h3 className="font-elegant text-xl font-light mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {product.nome}
        </h3>

        <p className="text-xs text-gray-600 mb-4 line-clamp-2 font-light">
          {product.familiaOlfativa}
        </p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-light text-accent">
            R$ {product.preco.toFixed(2).replace('.', ',')}
          </p>
          {product.preco > 299 && (
            <p className="text-xs text-green-600 font-light mt-1">
              ✓ Frete grátis
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <a
            href={`/produto/${product.slug}`}
            className="block w-full text-center py-2.5 border border-accent text-accent rounded-lg font-light text-sm tracking-wide hover:bg-accent hover:text-white transition-all duration-300"
          >
            Ver Detalhes
          </a>
          <button
            onClick={() => onAddToCart?.(product)}
            className="w-full py-2.5 bg-accent text-white rounded-lg font-light text-sm tracking-wide hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <ShoppingCart size={16} strokeWidth={1.5} className="group-hover/btn:scale-110 transition-transform" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
