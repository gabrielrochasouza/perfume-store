import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Aguardando',
  confirmed: 'Confirmado',
  preparing: 'Em Preparo',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  preparing: 'bg-orange-100 text-orange-700 border-orange-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export const ORDER_STATUS_DOT: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-blue-500',
  preparing: 'bg-orange-500',
  shipped: 'bg-purple-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
};

export interface OrderItem {
  id: string;
  nome: string;
  marca: string;
  volume: string;
  preco: number;
  quantidadeCarrinho: number;
  imagem: string;
}

export interface OrderAddress {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  buyer: { name: string; phone: string };
  address: OrderAddress;
  payment: string;
  total: number;
  shipping: number;
  items: OrderItem[];
  needsChange?: boolean;
  changeAmount?: string | null;
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => string;
  updateStatus: (id: string, status: OrderStatus) => void;
  removeOrder: (id: string) => void;
}

export const useOrderStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) => {
        const id = `#${Date.now().toString(36).toUpperCase()}`;
        set((s) => ({
          orders: [
            { ...order, id, createdAt: new Date().toISOString(), status: 'pending' },
            ...s.orders,
          ],
        }));
        return id;
      },

      updateStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      removeOrder: (id) =>
        set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
    }),
    { name: 'perfume-orders' }
  )
);
