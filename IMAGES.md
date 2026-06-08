# 🖼️ Guia de Imagens - Perfume Store

## 📁 Estrutura de Imagens

As imagens de produtos devem estar organizadas em:
```
public/
└── assets/
    └── perfumes/
        ├── blue-chanel.jpg
        ├── dior-sauvage.jpg
        ├── creed-aventus.jpg
        └── ... (outros perfumes)
```

## 📸 Imagens Fornecidas

Você tem as seguintes imagens em `assets/`:

```
WhatsApp Image 2026-06-01 at 22.17.44 - 2.jpeg
WhatsApp Image 2026-06-01 at 22.17.44 (1).jpeg
WhatsApp Image 2026-06-01 at 22.17.44 (2).jpeg
WhatsApp Image 2026-06-01 at 22.17.44.jpeg
WhatsApp Image 2026-06-01 at 22.17.45 (1).jpeg
WhatsApp Image 2026-06-01 at 22.17.45 (2).jpeg
WhatsApp Image 2026-06-01 at 22.17.45 (3).jpeg
WhatsApp Image 2026-06-01 at 22.17.45 (4).jpeg
WhatsApp Image 2026-06-01 at 22.17.45.jpeg
WhatsApp Image 2026-06-01 at 22.17.46 (1).jpeg
WhatsApp Image 2026-06-01 at 22.17.46 (2).jpeg
WhatsApp Image 2026-06-01 at 22.17.46.jpeg
```

Total: 12 imagens

## 🔧 Como Usar as Imagens

### Opção 1: Renomear e Organizar (Recomendado)

1. Crie a pasta estrutura:
```bash
mkdir -p public/assets/perfumes
```

2. Renomeie e copie as imagens para `public/assets/perfumes/`:
```bash
# Exemplo de renomeação
cp "assets/WhatsApp Image 2026-06-01 at 22.17.44.jpeg" "public/assets/perfumes/blue-chanel.jpg"
cp "assets/WhatsApp Image 2026-06-01 at 22.17.45.jpeg" "public/assets/perfumes/dior-sauvage.jpg"
# ... e assim por diante
```

3. Atualize `src/data/products.ts` com os novos caminhos:
```typescript
{
  // ...
  imagem: '/assets/perfumes/blue-chanel.jpg',
}
```

### Opção 2: Usar Diretamente (Temporário)

Se quiser usar as imagens diretamente de `assets/`:

1. Copie as imagens para `public/assets/`:
```bash
cp -r assets/* public/assets/
```

2. Use os caminhos completos em `products.ts`:
```typescript
imagem: '/assets/WhatsApp Image 2026-06-01 at 22.17.44.jpeg'
```

### Opção 3: Usar URLs Externas

Se tiver as imagens em um CDN:

```typescript
imagem: 'https://seu-cdn.com/perfumes/blue-chanel.jpg'
```

## 📐 Recomendações de Imagem

### Dimensões Ideais
- **Thumbnail/Card**: 400x500px (80% da altura)
- **Detalhe do Produto**: 600x750px
- **Hero**: 1920x1080px (16:9)

### Formato
- Prefira: WebP ou JPEG
- Máximo: 200KB por imagem

### Otimização
```bash
# Usar ImageMagick para redimensionar
convert original.jpg -resize 600x750 -quality 85 perfume.jpg

# Ou usar ffmpeg
ffmpeg -i original.jpg -vf scale=600:750 perfume.jpg
```

## 🎨 Distribuição das Imagens

Com 12 imagens, você pode:

### Distribuição por Categoria
```
Masculino (4):
- Blue de Chanel
- Dior Sauvage
- Acqua di Gio
- Gentleman

Feminino (4):
- J'adore
- Chance
- La Vie Est Belle
- Light Blue

Unissex (2):
- Meu Único
- L'Immortelle Bleue

Importados (2):
- Creed Aventus
- Prada Amber Oud
```

## 🔄 Rotação de Imagens

Para exibir a mesma imagem para múltiplos produtos:

```typescript
// Em products.ts
const imagePool = [
  '/assets/perfumes/img1.jpg',
  '/assets/perfumes/img2.jpg',
  '/assets/perfumes/img3.jpg',
  // ...
];

export const products: Product[] = [
  {
    // ...
    imagem: imagePool[Math.floor(Math.random() * imagePool.length)],
  },
  // ...
];
```

## 🖥️ Configuração no Next.js

O Next.js está configurado para servir imagens otimizadas:

```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

Isso permite URLs locais e remotas.

## ⚡ Performance

### Image Component (Recomendado)
```typescript
import Image from 'next/image';

<Image
  src="/assets/perfumes/perfume.jpg"
  alt="Nome do perfume"
  width={600}
  height={750}
  quality={85}
  priority={false}
/>
```

### Lazy Loading
```typescript
// Por padrão, imagens são carregadas sob demanda
<Image
  src={...}
  loading="lazy"
/>
```

## 📝 Renomeação em Lote (Linux/Mac)

```bash
# Script para renomear automaticamente
cd public/assets/perfumes

i=1
for file in *.jpeg; do
  mv "$file" "perfume-$i.jpg"
  ((i++))
done
```

## ✅ Checklist de Implementação

- [ ] Criar pasta `public/assets/perfumes/`
- [ ] Copiar/renomear imagens
- [ ] Atualizar `products.ts` com novos caminhos
- [ ] Testar carregamento das imagens
- [ ] Verificar tamanho/qualidade
- [ ] Otimizar se necessário
- [ ] Validar em mobile
- [ ] Verificar performance com Lighthouse

## 🐛 Troubleshooting

### "Imagem não carrega"
- Verifique o caminho: `/assets/perfumes/nome.jpg`
- Arquivo existe em `public/`?
- Reinicie o servidor

### "Imagem distorcida"
- Defina `width` e `height` corretos
- Use `objectFit: 'cover'`

### "Carregamento lento"
- Comprima a imagem
- Use WebP em vez de JPEG
- Implemente lazy loading

---

**Dica Final:** Use imagens de alta qualidade inicialmente. Você sempre pode compactá-las depois!
