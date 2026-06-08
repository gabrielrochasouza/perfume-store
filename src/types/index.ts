export type Product = {
  id: string;
  slug: string;
  nome: string;
  marca: string;
  descricao: string;
  preco: number;
  volume: string;
  categoria: 'masculino' | 'feminino' | 'unissex' | 'importados';
  familiaOlfativa: string;
  notasTopo: string[];
  notasCoracao: string[];
  notasFundo: string[];
  destaque: boolean;
  imagem: string;
  estoqueAtual?: number;
};

export type CartItem = Product & {
  quantidadeCarrinho: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};
