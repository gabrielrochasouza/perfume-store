# 🛠️ Guia de Desenvolvimento - Perfume Store

## 🎯 Índice Rápido

1. [Setup Inicial](#setup-inicial)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Convenções de Código](#convenções-de-código)
4. [Adicionando Features](#adicionando-features)
5. [Deploy](#deploy)

---

## 🔧 Setup Inicial

### Requisitos
- Node.js 18+ ([download](https://nodejs.org/))
- npm ou yarn
- Conhecimento básico de React e TypeScript
- Editor de código (VS Code recomendado)

### Instalação Passo a Passo

```bash
# 1. Clonar ou acessar o repositório
cd perfume-store

# 2. Instalar dependências
npm install

# 3. Criar arquivo .env.local
echo "NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999" > .env.local

# 4. Iniciar servidor
npm run dev

# 5. Abrir no navegador
# http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
perfume-store/
├── src/
│   ├── app/                 # Páginas (App Router)
│   │   ├── page.tsx        # Home
│   │   ├── layout.tsx      # Layout global
│   │   ├── produtos/
│   │   │   └── page.tsx    # Lista de produtos
│   │   ├── produto/
│   │   │   └── [slug]/     # Detalhe do produto
│   │   └── carrinho/
│   │       └── page.tsx    # Carrinho
│   │
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── Animations.tsx
│   │
│   ├── data/                # Dados mockados
│   │   └── products.ts      # Base de produtos
│   │
│   ├── store/               # State management (Zustand)
│   │   └── cart.ts
│   │
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   │
│   ├── utils/               # Funções utilitárias
│   │   └── helpers.ts
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useCart.ts
│   │
│   ├── lib/                 # Bibliotecas
│   │   └── seo.ts
│   │
│   ├── styles.css           # Estilos globais
│   └── globals.css
│
├── public/                  # Arquivos estáticos
│   └── assets/
│       └── perfumes/        # Imagens dos produtos
│
├── .env.local               # Variáveis de ambiente
├── .eslintrc.json           # ESLint config
├── .gitignore               # Git ignore
├── next.config.ts           # Next.js config
├── package.json             # Dependências
├── postcss.config.js        # PostCSS config
├── tailwind.config.ts       # TailwindCSS config
├── tsconfig.json            # TypeScript config
│
├── README.md                # Documentação principal
├── SETUP.md                 # Guia de setup
├── FEATURES.md              # Features e roadmap
├── IMAGES.md                # Guia de imagens
├── DELIVERY.md              # Sumário da entrega
└── DEVELOPMENT.md           # Este arquivo
```

---

## 💻 Convenções de Código

### Naming Conventions

```typescript
// Componentes (PascalCase, .tsx)
function ProductCard() {}
export function Header() {}

// Páginas (lowercase, page.tsx)
export default function page() {}

// Tipos (PascalCase)
type Product = {}
interface CartState {}

// Variáveis (camelCase)
const productList = []
let currentIndex = 0

// Constantes (UPPER_SNAKE_CASE)
const MAX_ITEMS = 100
const API_KEY = 'xxx'

// Funções (camelCase)
function calculateShipping() {}
const formatPrice = () => {}

// Hooks (camelCase com 'use' prefix)
function useCart() {}
function useProducts() {}
```

### Arquivo Structure

```typescript
// Ordem dentro de um componente
import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from 'lucide-react';
import { Button } from '@/components/Button';
import { useCart } from '@/hooks/useCart';
import styles from './component.module.css';

// Type definitions
interface ComponentProps {
  title: string;
}

// Component
export function MyComponent({ title }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();
  const { items } = useCart();

  // Functions
  const handleClick = () => {};

  // JSX
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

### TypeScript Best Practices

```typescript
// ✅ BOM - Tipos explícitos
function addToCart(product: Product, quantity: number): void {
  // ...
}

// ❌ RUIM - Any type
function addToCart(product: any, quantity: any) {}

// ✅ BOM - Interface clara
interface CartItem extends Product {
  quantidadeCarrinho: number;
}

// ✅ BOM - Union types
type Category = 'masculino' | 'feminino' | 'unissex' | 'importados';

// ✅ BOM - Generics
function getList<T>(items: T[]): T[] {
  return items;
}
```

---

## ➕ Adicionando Features

### 1. Adicionar Novo Produto

**Arquivo:** `src/data/products.ts`

```typescript
const newProduct: Product = {
  id: '21',
  slug: 'novo-perfume',
  nome: 'Novo Perfume',
  marca: 'Marca',
  descricao: 'Descrição...',
  preco: 399.90,
  volume: '100ml',
  categoria: 'masculino',
  familiaOlfativa: 'Floral',
  notasTopo: ['Nota1', 'Nota2'],
  notasCoracao: ['Nota3', 'Nota4'],
  notasFundo: ['Nota5', 'Nota6'],
  destaque: false,
  imagem: '/assets/perfumes/novo.jpg',
  estoqueAtual: 10,
};

// Adicionar ao array
export const products: Product[] = [
  // ... produtos existentes
  newProduct,
];
```

### 2. Adicionar Novo Componente

**Arquivo:** `src/components/MyComponent.tsx`

```typescript
'use client'; // Se usar hooks/interatividade

import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
  title: string;
}

export function MyComponent({ children, title }: MyComponentProps) {
  return (
    <div className="my-component">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
```

### 3. Adicionar Função Utilitária

**Arquivo:** `src/utils/helpers.ts`

```typescript
export const meuHelper = (parametro: string): string => {
  // lógica
  return resultado;
};
```

### 4. Adicionar Hook Custom

**Arquivo:** `src/hooks/useMeuHook.ts`

```typescript
import { useState } from 'react';

export const useMeuHook = () => {
  const [state, setState] = useState<string>('');

  const meuMetodo = () => {
    setState('novo valor');
  };

  return { state, meuMetodo };
};
```

### 5. Adicionar Nova Página

**Arquivo:** `src/app/minhaRota/page.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Página',
  description: 'Descrição da página',
};

export default function MinhaPage() {
  return (
    <main className="min-h-screen">
      <h1>Minha Página</h1>
    </main>
  );
}
```

---

## 🎨 Usando TailwindCSS

### Classes Úteis

```html
<!-- Layout -->
<div class="container-custom">  <!-- Container customizado -->
<div class="flex gap-4">         <!-- Flexbox com gap -->
<div class="grid grid-cols-3">   <!-- Grid 3 colunas -->

<!-- Tamanhos -->
<div class="w-full h-64">        <!-- Largura/altura -->
<p class="text-lg font-bold">    <!-- Tamanho/peso de fonte -->

<!-- Cores -->
<div class="bg-accent text-white">  <!-- Accent color (dourado) -->
<div class="bg-dark text-light">    <!-- Dark mode -->
<div class="border-2 border-accent"> <!-- Borders com accent -->

<!-- Espaçamento -->
<div class="p-4 m-8">            <!-- Padding/Margin -->
<div class="mb-6 pb-4">          <!-- Margin/Padding bottom -->

<!-- Responsividade -->
<div class="text-sm md:text-lg lg:text-2xl">
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- Hover/Transições -->
<button class="hover:bg-accent transition-colors">
<div class="group hover:shadow-lg transition-all duration-300">

<!-- Animações -->
<div class="animate-fade-in">
<div class="animate-slide-up">
```

---

## 🧪 Testando Localmente

### Testar Responsividade

```bash
# Abrir DevTools no navegador
F12 ou Cmd+Option+I

# Modo responsivo
Ctrl+Shift+M ou Cmd+Shift+M
```

### Testar WhatsApp Link

1. Ir para `/produto/blue-chanel` (exemplo)
2. Clicar em "Comprar via WhatsApp"
3. Verifique se abre em nova aba com mensagem

### Testar Carrinho

1. Adicionar produtos
2. Verificar badge do header atualizar
3. Ir para `/carrinho`
4. Ajustar quantidades
5. Verificar cálculos de preço/frete

---

## 🚀 Build e Deploy

### Build Local

```bash
# Criar build para produção
npm run build

# Testar build localmente
npm start

# Acessar em http://localhost:3000
```

### Deploy Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Configurar variáveis de ambiente no dashboard
# Adicionar NEXT_PUBLIC_WHATSAPP_NUMBER
```

### Deploy Netlify

1. Push para GitHub
2. Conectar repo em netlify.com
3. Configurar build command: `npm run build`
4. Configurar publish directory: `.next`

---

## 🐛 Debugging

### Debug no VS Code

Crie `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Console Logs

```typescript
// ✅ Desenvolvimento
console.log('Debug:', variavel);

// ❌ Nunca em produção - será removido pelo Next.js
```

---

## 📊 Performance

### Checklist

- [ ] Imagens otimizadas (< 200KB)
- [ ] Lazy loading configurado
- [ ] Code splitting automático (Next.js faz)
- [ ] CSS crítico inline (TailwindCSS faz)
- [ ] Rodas de fonte otimizadas (Google Fonts)

### Verificar Performance

```bash
# Build analysis
npm run build

# Lighthouse score
# F12 > Lighthouse > Audit
```

---

## 🔐 Segurança

### Boas Práticas

```typescript
// ✅ BOM - Nunca exponha secrets
process.env.NEXT_PUBLIC_WHATSAPP_NUMBER  // Público

// ❌ RUIM - Não use secrets públicos
process.env.DATABASE_PASSWORD  // Privado, não funciona

// ✅ BOM - Sanitize inputs
const safe = encodeURIComponent(userInput);

// ✅ BOM - Validate data
import { z } from 'zod';
const schema = z.object({ email: z.string().email() });
```

---

## 🎓 Recursos Adicionais

### Documentação Oficial

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Comunidades

- Stack Overflow
- GitHub Discussions
- Next.js Discord
- React Community

---

## ✅ Checklist de Desenvolvimento

Antes de fazer commit:

- [ ] Código está bem formatado
- [ ] Sem console.logs desnecessários
- [ ] Tipos TypeScript corretos
- [ ] Testes locais passando
- [ ] Mobile responsivo
- [ ] Sem erros no console
- [ ] Performance aceitável

---

## 🎯 Próximos Passos

1. **Familiarize-se** com a estrutura
2. **Rode localmente** e teste as pages
3. **Customize** conforme necessário
4. **Faça deploy** inicial
5. **Monitore** performance e feedback

---

**Bem-vindo ao desenvolvimento da Perfume Store! 🚀**

Qualquer dúvida, consulte a documentação ou crie uma issue no GitHub.
