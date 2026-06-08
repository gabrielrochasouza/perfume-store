# Perfume Store - Premium E-commerce

Uma loja virtual elegante e sofisticada para venda de perfumes premium, desenvolvida com as melhores tecnologias modernas.

## 🎯 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática completa
- **TailwindCSS** - Estilização responsiva
- **Zustand** - Gerenciamento de estado do carrinho
- **Framer Motion** - Animações suaves
- **React Hook Form** - Validação de formulários
- **Zod** - Validação de dados
- **Lucide Icons** - Ícones modernos

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Edite .env.local com seu número do WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas e rotas
│   ├── page.tsx           # Home
│   ├── produtos/          # Lista de produtos
│   ├── produto/[slug]/    # Detalhe do produto
│   ├── carrinho/          # Carrinho de compras
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho
│   ├── Footer.tsx         # Rodapé
│   └── ProductCard.tsx    # Card de produto
├── data/                  # Mock de dados
│   └── products.ts        # Base de produtos
├── store/                 # Estado global (Zustand)
│   └── cart.ts           # Store do carrinho
├── types/                 # Tipos TypeScript
│   └── index.ts          # Definições de tipos
├── utils/                # Funções utilitárias
└── styles.css           # Estilos globais
```

## 🎨 Identidade Visual

### Paleta de Cores
- **Preto**: #0F0F0F
- **Dourado**: #C9A227
- **Branco**: #FFFFFF
- **Cinza Claro**: #F5F5F5

### Tipografia
- **Display**: Playfair Display (títulos)
- **Body**: Inter (textos)

## ✨ Funcionalidades

### 🏠 Home
- Hero section impactante
- Benefícios e diferenciais
- Produtos em destaque
- Categorias de produtos
- Depoimentos de clientes
- CTA's de conversão

### 🛍️ Produtos
- Grid responsivo com 20+ perfumes
- Busca por nome e marca
- Filtro por categoria (Masculino, Feminino, Unissex, Importados)
- Ordenação (Mais vendidos, Preço, Lançamentos)
- Cards com informações completas
- Animações suaves

### 📄 Detalhes do Produto
- Galeria de imagens
- Informações completas
- Família olfativa e notas
- Controle de quantidade
- Adicionar ao carrinho
- Compra direta via WhatsApp
- Produtos relacionados

### 🛒 Carrinho
- Lista de produtos com imagens
- Aumentar/diminuir quantidade
- Remover itens
- Cálculo automático de frete
- Resumo de compra
- Checkout via WhatsApp
- Indicação de frete grátis

### 💬 WhatsApp
- Integração completa
- Mensagens formatadas
- Detalhes do pedido
- Cálculo automático de frete
- Links diretos para contato

## 🚀 Performance

- Lazy loading de imagens
- Server Components quando possível
- Otimização para Lighthouse > 90
- Mobile-first responsive design
- Animações otimizadas com Framer Motion

## 📱 Responsividade

- Design mobile-first
- Breakpoints: sm, md, lg, xl
- Testes em múltiplos dispositivos
- Navegação adaptativa

## 🔐 SEO

- Metadata dinâmica
- Open Graph configurado
- URLs amigáveis
- Schema.org Product
- Sitemap (pronto para implementar)
- Robots.txt (pronto para implementar)

## 💡 Elementos de Conversão

- ✓ Prova social (2.000+ clientes)
- ✓ Urgência (Estoque limitado)
- ✓ Confiança (Selos, original, seguro)
- ✓ Incentivo (Frete grátis > R$ 299)
- ✓ CTA destacados
- ✓ Facilidade de pagamento (WhatsApp)

## 📊 Mock de Produtos

20 perfumes premium com:
- Informações completas
- Preços variados
- Categorias diversas
- Notas de aroma
- Descrições detalhadas
- Imagens de placeholders

## 🛠️ Desenvolvimento

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Lint do código
npm run lint

# Type checking
npm run type-check
```

## 📈 Próximas Etapas

- [ ] Integração com banco de dados real
- [ ] Sistema de autenticação
- [ ] Pagamento integrado (Stripe/MercadoPago)
- [ ] Sistema de avaliações
- [ ] Wishlist persistente
- [ ] Integração com CMS
- [ ] Analytics avançado
- [ ] Testes automatizados

## 📝 Licença

Projeto privado - Todos os direitos reservados

---

**Desenvolvido com ❤️ para conversão máxima**
