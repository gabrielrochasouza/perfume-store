# 🎬 Como Rodar o Projeto - Guia Rápido

## ⚡ Início Rápido (5 minutos)

### Passo 1: Instalar Dependências
```bash
cd /home/exati/workspace-git/perfume-store
npm install
```
⏱️ Espera ~2-3 minutos

### Passo 2: Configurar WhatsApp
Edite `.env.local`:
```bash
nano .env.local
```

Cole:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```
(substitua pelo seu número com código de país)

### Passo 3: Copiar Imagens
```bash
# Cria pasta
mkdir -p public/assets/perfumes

# Copia imagens (Linux/Mac)
cp assets/WhatsApp\ Image\ 2026-06-01\ at\ 22.17.44.jpeg public/assets/perfumes/1.jpeg
cp assets/WhatsApp\ Image\ 2026-06-01\ at\ 22.17.44\ \(1\).jpeg public/assets/perfumes/2.jpeg
# ... continue para as 12 imagens
```

**OU copie manualmente:**
1. Abra `/assets/` 
2. Selecione as 12 imagens WhatsApp
3. Copie para `/public/assets/perfumes/`
4. Renomeie como `1.jpeg`, `2.jpeg`, ..., `12.jpeg`

### Passo 4: Rodar o Projeto
```bash
npm run dev
```

🎉 Abra: http://localhost:3000

---

## 📸 O que Você Verá

### Na Home Page:
```
┌─────────────────────────────────────────┐
│ 💬 WhatsApp Banner (verde topo)        │ ← NOVO!
├─────────────────────────────────────────┤
│ [Logo com Sparkles] [Menu] [Search] 🛒 │
├─────────────────────────────────────────┤
│                                         │
│    [Carrossel com 4 Imagens]           │ ← NOVO!
│    Auto-play + Setas + Dots            │
│                                         │
├─────────────────────────────────────────┤
│  Por que escolher a gente?              │
│  [4 Benefit Cards com Ícones]          │ ← Melhorado
├─────────────────────────────────────────┤
│  Destaques                              │
│  [6 Produtos em 3 colunas]             │
├─────────────────────────────────────────┤
│  Toda Nossa Coleção                     │
│  [20 Produtos em 4 colunas]            │ ← NOVO!
│                                         │
│  [Prod1] [Prod2] [Prod3] [Prod4]       │
│  [Prod5] [Prod6] [Prod7] [Prod8]       │
│  ...                                    │
├─────────────────────────────────────────┤
│  Avaliações                             │
│  [3 Depoimentos]                       │ ← Melhorado
├─────────────────────────────────────────┤
│  Categorias                             │
│  [Masculino] [Feminino] [Unissex]      │
├─────────────────────────────────────────┤
│  CTA Final                              │
│  "Pronto para encontrar seu perfume?"  │
└─────────────────────────────────────────┘
```

---

## 🔍 O que Mudou em Cada Componente

### WhatsAppBanner (NOVO)
```tsx
// Verde sticky no topo
<div className="bg-gradient-to-r from-green-600 to-green-700">
  💬 Dúvidas? +55 (11) 99999-9999
</div>
```

### ImageCarousel (NOVO)
```tsx
// 4 slides automáticos
Slide 1: "Luxo em Cada Spray"
Slide 2: "Perfumes Premium"
Slide 3: "Frete Grátis"
Slide 4: "Exclusivos"
```

### ProductCard (MELHORADO)
```
Antes:              Depois:
[Produto]    →     [Produto]
Destaque     →     ⭐ Destaque
❌ sem ícone       ❌ ESTOQUE LIMITADO
-                  R$ 299,00 ✓ Frete
```

### Header (MELHORADO)
```
Antes:            Depois:
PERFUME    →    🌟 PERFUME
Home       →    Home (com underline hover)
```

### Footer (MELHORADO)
```
Antes:                Depois:
Email: xxx      →     📧 xxx
Tel: xxx        →     📞 xxx
São Paulo       →     📍 São Paulo
```

---

## ✅ Checklist de Verificação

Depois de rodar `npm run dev`:

- [ ] Página carrega sem erros
- [ ] WhatsApp banner verde no topo (fixo)
- [ ] Carrossel com imagens rodando (auto-play)
- [ ] Setas de navegação funcionando
- [ ] 20 produtos visíveis (grid 4 colunas desktop)
- [ ] Produtos com badges com ícones
- [ ] Menu com hover underline
- [ ] Footer com ícones
- [ ] Responsivo em mobile (1 coluna)
- [ ] Responsivo em tablet (2 colunas)

---

## 🎨 Customizações Fáceis

### Mudar Cor do WhatsApp Banner
**Arquivo:** `src/components/WhatsAppBanner.tsx`
```tsx
className="bg-gradient-to-r from-green-600 to-green-700"
                                  ↓
                  from-blue-600 to-blue-700
```

### Mudar Número WhatsApp
**Arquivo:** `.env.local`
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
                              ↓
                   SEU_NUMERO_REAL
```

### Mudar Mensagem WhatsApp
**Arquivo:** `src/components/WhatsAppBanner.tsx`
```tsx
text=Olá! Gostaria de mais informações sobre os perfumes.
          ↓
text=Sua mensagem aqui
```

### Mudar Slides do Carrossel
**Arquivo:** `src/components/ImageCarousel.tsx`
```tsx
const slides = [
  { title: 'Seu título', subtitle: 'Seu subtítulo', image: 'sua-url' },
  // ...
]
```

---

## 🐛 Problemas Comuns

### ❌ Erro: "Cannot find module '@/components/WhatsAppBanner'"
**Solução:**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### ❌ Imagens não aparecem
**Verificar:**
1. Pasta existe: `/public/assets/perfumes/`
2. Imagens nomeadas: `1.jpeg`, `2.jpeg`, etc
3. Limpar cache:
```bash
# Parar com Ctrl+C
rm -rf .next
npm run dev
```

### ❌ WhatsApp banner não aparece
**Verificar:**
1. `.env.local` salvo
2. Número com código país (55)
3. Reiniciar servidor

### ❌ Porta 3000 ocupada
**Solução:**
```bash
npm run dev -- -p 3001
```

---

## 📊 Estrutura do Projeto Final

```
perfume-store/
├── public/
│   └── assets/
│       └── perfumes/
│           ├── 1.jpeg
│           ├── 2.jpeg
│           ├── ... (até 12)
│
├── src/
│   ├── app/
│   │   ├── page.tsx              (HOME - refatorada)
│   │   ├── layout.tsx            (com Header/Footer/Banner)
│   │   ├── produtos/
│   │   │   └── page.tsx          (PRODUTOS - melhorada)
│   │   ├── produto/
│   │   │   └── [slug]/page.tsx
│   │   └── carrinho/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx            (ícones melhorados)
│   │   ├── Footer.tsx            (ícones melhorados)
│   │   ├── ProductCard.tsx       (com ícones)
│   │   ├── WhatsAppBanner.tsx    (NOVO)
│   │   ├── ImageCarousel.tsx     (NOVO)
│   │   └── Animations.tsx
│   │
│   ├── data/
│   │   └── products.ts           (20 perfumes)
│   │
│   ├── store/
│   │   └── cart.ts
│   │
│   └── styles/
│       └── globals.css
│
├── .env.local                     (NOVO - WhatsApp config)
├── tailwind.config.ts            (updated - fontes)
├── package.json                  (updated - Swiper)
│
└── docs/
    ├── REFACTOR_SUMMARY.md       (NOVO)
    ├── SETUP_COMPLETE.md         (NOVO)
    ├── DESIGN_REFACTOR.md        (NOVO)
    └── ...
```

---

## 🎯 Próximos Passos Recomendados

1. ✅ **Rodar localmente** - `npm run dev`
2. ✅ **Testar em mobile** - DevTools F12
3. ✅ **Testar WhatsApp** - Clicar no banner
4. ✅ **Verificar imagens** - Devem aparecer nos cards
5. 🔜 **Deploy** - Vercel/Netlify

---

## 🚀 Deployment (Vercel)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Seguir instruções
# - Conectar GitHub
# - Configurar .env.local em Vercel dashboard
# - Push para produção
```

---

## 📞 Suporte

Se houver problemas:
1. Verificar console de erros (F12)
2. Procurar no arquivo de logs
3. Reinstalar node_modules

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

**✅ Projeto está pronto! Bom trabalho! 🎉**
