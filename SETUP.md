# 🚀 Guia de Inicialização - Perfume Store

## 📋 Pré-requisitos

- Node.js v18+ instalado
- npm ou yarn disponível
- Git (opcional)

## 🔧 Instalação e Configuração

### 1. Instalar Dependências

```bash
npm install
```

Este comando irá instalar todas as dependências necessárias listadas em `package.json`:
- Next.js e React
- TailwindCSS
- Zustand
- Framer Motion
- Lucide Icons
- E muito mais...

### 2. Configurar Variáveis de Ambiente

O arquivo `.env.local` já está configurado com um número de WhatsApp de demonstração:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

**Para usar seu próprio número:**

1. Edite `.env.local`
2. Substitua o número por seu WhatsApp Business ou pessoal
3. Formato: `[código de país][DDD][número]` (ex: `5511987654321` para Brasil)

### 3. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

## 🎯 Próximos Passos

### Personalização

1. **Alterar Número do WhatsApp**
   - Edite `.env.local`
   - Use um número válido do WhatsApp Business

2. **Adicionar/Editar Produtos**
   - Edite `src/data/products.ts`
   - Cada produto deve ter todas as propriedades definidas em `src/types/index.ts`

3. **Customizar Cores**
   - Edite `tailwind.config.ts`
   - Modifique a paleta de cores no objeto `colors`

4. **Adicionar Imagens dos Produtos**
   - Coloque as imagens em `public/assets/perfumes/`
   - Atualize o campo `imagem` em `src/data/products.ts`
   - Use URLs absolutas se preferir servir de um CDN

### Melhorias Recomendadas

- [ ] Conectar banco de dados real (Supabase, Firebase, etc)
- [ ] Implementar autenticação de usuário
- [ ] Integrar gateway de pagamento (Stripe, MercadoPago)
- [ ] Adicionar sistema de avaliações/reviews
- [ ] Implementar wishlist persistente
- [ ] Adicionar analytics
- [ ] Configurar sitemap.xml
- [ ] Implementar notificações por email

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🧪 Validações de Código

```bash
# Executar linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Estrutura de Pastas Explicada

| Pasta | Descrição |
|-------|-----------|
| `src/app/` | Páginas e rotas do Next.js |
| `src/components/` | Componentes React reutilizáveis |
| `src/data/` | Mock de dados (produtos) |
| `src/store/` | Estado global com Zustand |
| `src/types/` | Definições de tipos TypeScript |
| `src/utils/` | Funções utilitárias |
| `src/hooks/` | Custom React hooks |
| `src/lib/` | Bibliotecas e configurações |
| `public/` | Arquivos estáticos e imagens |

## 🔗 URLs Principais

| Rota | Descrição |
|------|-----------|
| `/` | Home com hero section |
| `/produtos` | Lista de todos os produtos |
| `/produto/[slug]` | Detalhe do produto específico |
| `/carrinho` | Carrinho de compras |

## 🆘 Troubleshooting

### Erro: "Não é possível localizar o módulo..."

**Solução:** Delete `node_modules` e `.next`, depois execute:
```bash
npm install
npm run dev
```

### WhatsApp não abre links

**Verificar:** 
- O número está no formato correto sem caracteres especiais
- Use apenas dígitos: `5511987654321`

### Imagens não carregam

**Solução:**
- Verifique os caminhos em `src/data/products.ts`
- Coloque as imagens em `public/assets/perfumes/`
- Use caminhos relativos começando com `/`

### Estilos TailwindCSS não aplicam

**Solução:**
- Limpe cache: `rm -rf .next`
- Reinicie o servidor
- Verifique se o arquivo está listado em `content` do `tailwind.config.ts`

## 🚀 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte o repositório em vercel.com
3. As variáveis de ambiente serão configuradas automaticamente
4. Deploy automático em cada push

### Docker

```bash
docker build -t perfume-store .
docker run -p 3000:3000 perfume-store
```

### Outras Plataformas

- Netlify
- AWS Amplify
- Railway
- Render

## 💡 Dicas Importantes

✅ **DO's:**
- Manter o `.env.local` seguro e não fazer commit
- Usar componentes reutilizáveis
- Manter tipos TypeScript sempre definidos
- Otimizar imagens para web

❌ **DON'Ts:**
- Não mudar números diretos no código (use .env)
- Não commitar `.env.local`
- Não usar console.log em produção
- Não deixar logs sensíveis no código

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique a documentação do Next.js: https://nextjs.org/docs
- TailwindCSS: https://tailwindcss.com/docs
- Zustand: https://github.com/pmndrs/zustand
- Lucide Icons: https://lucide.dev

---

**Pronto para começar! 🎉**

Qualquer dúvida, consulte este guia ou a documentação das dependências.
