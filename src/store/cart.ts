import { create } from 'zustand';
import { CartState, Product } from '@/types';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantidadeCarrinho: quantity }],
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantidadeCarrinho: quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantidadeCarrinho, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.preco * item.quantidadeCarrinho,
      0
    );
  },
}));
