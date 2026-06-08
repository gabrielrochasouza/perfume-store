# 🚀 Instruções para Rodar o Projeto

## 1️⃣ Instalação de Dependências

```bash
npm install
```

## 2️⃣ Configurar Variáveis de Ambiente

Edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

Substitua o número pelo seu WhatsApp real.

## 3️⃣ Copiar Imagens para o Projeto

**Localização das imagens source:**
```
/home/exati/workspace-git/perfume-store/assets/
```

**Destino:**
```
/home/exati/workspace-git/perfume-store/public/assets/perfumes/
```

**Script para copiar e renomear:**
```bash
#!/bin/bash

# Cria o diretório se não existir
mkdir -p public/assets/perfumes

# Copia as imagens
for i in {1..12}; do
  # Encontrar a i-ésima imagem em assets/
  img=$(ls assets/WhatsApp\ Image\ 2026-06-01\ at\ 22.17* | head -$i | tail -1)
  if [ -f "$img" ]; then
    cp "$img" "public/assets/perfumes/$i.jpeg"
    echo "Copiado: $img -> public/assets/perfumes/$i.jpeg"
  fi
done

echo "✅ Imagens copiadas com sucesso!"
```

**Ou manualmente:**
1. Abra a pasta `/assets/`
2. Copie as 12 imagens do WhatsApp
3. Cole em `/public/assets/perfumes/`
4. Renomeie cada uma como: `1.jpeg`, `2.jpeg`, ..., `12.jpeg`

## 4️⃣ Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 5️⃣ Build para Produção

```bash
npm run build
npm run start
```

## 📁 Estrutura de Arquivos Criados/Modificados

### ✨ Arquivos Novos:
```
src/components/
├── WhatsAppBanner.tsx       (Banner verde com WhatsApp)
├── ImageCarousel.tsx        (Carrossel de imagens)

docs/
├── DESIGN_REFACTOR.md       (Este documento de design)
├── SETUP_IMAGES.md          (Instruções de setup)
```

### 📝 Arquivos Modificados:
```
src/app/
├── layout.tsx              (Adicionado Header, Footer, WhatsAppBanner)
├── page.tsx                (Refatorado com carrossel e todos os produtos)
├── produtos/page.tsx       (Grid 4 colunas, filtros melhorados)

src/components/
├── Header.tsx              (Ícones melhorados, logo com Sparkles)
├── Footer.tsx              (Ícones Lucide)
├── ProductCard.tsx         (Badges com ícones, melhor tipografia)

tailwind.config.ts          (Novas fontes e tamanhos de texto)
```

## ✅ Checklist de Verificação

- [ ] Dependências instaladas (`npm install` executado)
- [ ] `.env.local` configurado com WhatsApp
- [ ] Imagens copiadas para `/public/assets/perfumes/`
- [ ] Rodar `npm run dev` com sucesso
- [ ] Home page mostrando:
  - [ ] WhatsApp banner no topo
  - [ ] Carrossel com imagens
  - [ ] Seção de benefícios
  - [ ] 6 destaques
  - [ ] 20 produtos em grid 4 colunas
- [ ] Página de produtos funcionando
- [ ] Carrinho funcionando
- [ ] Página de produto individual funcionando

## 🎨 Personalizações Possíveis

### Mudar Cores:
Edit `tailwind.config.ts`:
```typescript
colors: {
  accent: '#SEU_COLOR_HEX', // Mudar cor dourada
  dark: '#SEU_COLOR_HEX',   // Mudar cor preta
}
```

### Mudar Número WhatsApp:
Edit `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=55999999999
```

### Adicionar Mais Imagens:
1. Coloque novas imagens em `/public/assets/perfumes/13.jpeg`, etc
2. Elas serão usadas ciclicamente pelos produtos

## 🐛 Troubleshooting

### Erro: "Module not found: @/components/WhatsAppBanner"
```bash
rm -rf node_modules
npm install
npm run dev
```

### Imagens não aparecem
- Verificar se estão em `/public/assets/perfumes/`
- Limpar cache: `npm run dev` com `Ctrl+C` e reiniciar

### Erro de porta
```bash
# Se a porta 3000 está em uso:
npm run dev -- -p 3001
```

## 📱 Teste Responsivo

- Desktop (1200px+): 4 colunas de produtos
- Tablet (768px-1199px): 2 colunas
- Mobile (<768px): 1 coluna

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy a pasta .next
```

## 📞 Suporte WhatsApp

O banner no topo automaticamente:
1. Pega o número do `.env.local`
2. Cria um link do WhatsApp Web
3. Permite conversa direta com o cliente

Customize a mensagem em `src/components/WhatsAppBanner.tsx`:
```typescript
text=Olá! Gostaria de mais informações sobre os perfumes.
```
