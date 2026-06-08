'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useCartStore } from '@/store/cart';

const categories = ['Todos', 'Masculino', 'Feminino', 'Unissex', 'Importados'];
const sortOptions = [
  { label: 'Mais vendidos', value: 'popular' },
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
  { label: 'Lançamentos', value: 'newest' },
];

export default function ProdutosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'Todos') {
      result = result.filter(
        (p) => p.categoria === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.marca.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.preco - b.preco);
        break;
      case 'price-desc':
        result.sort((a, b) => b.preco - a.preco);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        result.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem(product, 1);
  };

  return (
    <main className="min-h-screen bg-white text-dark">
      {/* Header */}
      <section className="bg-dark text-white py-16 border-b border-accent/10">
        <div className="container-custom">
          <h1 className="font-elegant text-5xl md:text-6xl font-light tracking-tight">
            Nossa Coleção
          </h1>
          <p className="text-gray-300 mt-3 font-light">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrados
          </p>
        </div>
      </section>

      <div className="container-custom py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            {/* Mobile toggle */}
            <button
              className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-accent/40 rounded-lg text-dark mb-4"
              onClick={() => setFiltersOpen((v) => !v)}
            >
              <span className="flex items-center gap-2 font-light text-sm">
                <SlidersHorizontal size={16} strokeWidth={1.5} />
                Filtros
              </span>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className={`transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Filter content */}
            <div
              className={`${
                filtersOpen ? 'block' : 'hidden'
              } lg:block sticky top-24`}
            >
              <h3 className="font-elegant text-lg font-light mb-4 tracking-wide text-dark hidden lg:block">
                Filtros
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="font-light text-sm text-gray-600 mb-2 block">
                  Buscar
                </label>
                <input
                  type="text"
                  placeholder="Nome ou marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-light text-sm text-dark bg-white"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="font-light text-sm text-gray-600 mb-2 block">
                  Categoria
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-300 font-light ${
                        selectedCategory === category
                          ? 'bg-accent text-dark shadow-sm font-medium'
                          : 'text-dark hover:bg-gray-100 border border-transparent hover:border-accent/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="font-light text-sm text-gray-600 mb-2 block">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-light text-sm text-dark bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-4">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 font-light text-sm">
                    Mostrando {filteredProducts.length}{' '}
                    {filteredProducts.length === 1 ? 'produto' : 'produtos'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-24">
                <p className="text-gray-600 text-lg font-light mb-4">
                  Nenhum produto encontrado
                </p>
                <p className="text-gray-500 font-light text-sm">
                  Tente ajustar os filtros de busca
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
