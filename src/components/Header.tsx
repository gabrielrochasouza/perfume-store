'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cartItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/produtos?q=${encodeURIComponent(q)}`);
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-accent text-dark sticky top-0 z-50 border-b-2 border-dark/20 shadow-lg">
      <div className="container-custom flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <div className="flex items-center gap-2 md:gap-3">
            <Sparkles size={22} strokeWidth={1.5} className="text-dark group-hover:text-dark/60 transition-colors duration-300" />
            <span className="font-elegant text-xl md:text-2xl font-light tracking-widest text-dark group-hover:text-dark/60 transition-colors duration-300">
              PERFUME
            </span>
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex gap-8 xl:gap-12">
          <Link href="/" className="text-xs md:text-sm font-medium tracking-wide text-dark hover:text-dark/60 transition-colors duration-300 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/produtos" className="text-xs md:text-sm font-medium tracking-wide text-dark hover:text-dark/60 transition-colors duration-300 relative group">
            Produtos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/pedidos" className="text-xs md:text-sm font-medium tracking-wide text-dark hover:text-dark/60 transition-colors duration-300 relative group">
            Pedidos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark group-hover:w-full transition-all duration-300" />
          </Link>
          <a href="#contato" className="text-xs md:text-sm font-medium tracking-wide text-dark hover:text-dark/60 transition-colors duration-300 relative group">
            Contato
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2 text-dark hover:text-dark/60 transition-all duration-300 hover:scale-110 rounded-full hover:bg-dark/10"
            aria-label="Buscar"
          >
            {searchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
          </button>
          <Link href="/carrinho" className="p-2 text-dark hover:text-dark/60 transition-all duration-300 relative group hover:scale-110 rounded-full hover:bg-dark/10">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {mounted && cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-dark text-accent text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-125 transition-transform shadow-md">
                {cartItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-dark hover:text-dark/60 transition-all duration-300 rounded-full hover:bg-dark/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <form
          onSubmit={handleSearch}
          className="border-t border-dark/10 px-4 py-2.5 flex items-center gap-3 bg-accent/95 animate-fade-in"
        >
          <Search size={16} strokeWidth={1.5} className="text-dark/40 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar perfumes, marcas..."
            className="flex-1 bg-transparent outline-none text-dark placeholder:text-dark/35 text-sm font-light"
          />
          {searchQuery && (
            <button
              type="submit"
              className="text-xs font-medium text-dark/60 hover:text-dark transition-colors px-2"
            >
              Buscar
            </button>
          )}
        </form>
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden bg-accent/95 backdrop-blur-md border-t border-dark/20 px-4 py-4 space-y-3 animate-fade-in">
          <Link
            href="/"
            className="block px-4 py-2 text-sm font-medium text-dark hover:text-dark/60 hover:bg-dark/10 rounded-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/produtos"
            className="block px-4 py-2 text-sm font-medium text-dark hover:text-dark/60 hover:bg-dark/10 rounded-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Produtos
          </Link>
          <Link
            href="/pedidos"
            className="block px-4 py-2 text-sm font-medium text-dark hover:text-dark/60 hover:bg-dark/10 rounded-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Pedidos
          </Link>
          <a
            href="#contato"
            className="block px-4 py-2 text-sm font-medium text-dark hover:text-dark/60 hover:bg-dark/10 rounded-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contato
          </a>
        </nav>
      )}
    </header>
  );
}
