#!/bin/bash

# Perfume Store - Setup Automático
# Execute este script para preparar o projeto automaticamente

echo "🎀 Perfume Store - Setup Automático"
echo "=================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado"
    echo "📥 Baixe em: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo ""

# Criar diretórios
echo "📁 Criando diretórios..."
mkdir -p public/assets/perfumes
echo "✅ Diretórios criados"

echo ""

# Verificar .env.local
if [ ! -f .env.local ]; then
    echo "🔑 Criando .env.local..."
    echo "NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999" > .env.local
    echo "✅ .env.local criado (use seu número do WhatsApp)"
else
    echo "✅ .env.local já existe"
fi

echo ""

# Build check
echo "🔍 Verificando build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build bem-sucedido!"
else
    echo "⚠️  Build teve problemas, mas pode funcionar em dev"
fi

echo ""
echo "=================================="
echo "✅ Setup concluído com sucesso!"
echo ""
echo "🚀 Para iniciar o servidor:"
echo "   npm run dev"
echo ""
echo "📱 Acesse: http://localhost:3000"
echo ""
