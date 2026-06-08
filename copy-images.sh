#!/bin/bash

# Script para copiar e renomear imagens de perfume
# De: assets/ (nomes longos do WhatsApp)
# Para: public/assets/perfumes/ (nomes numéricos)

# Criar diretório de destino se não existir
mkdir -p public/assets/perfumes

# Array com os nomes das imagens no diretório assets (em ordem)
images=(
  "WhatsApp Image 2026-06-01 at 22.17.44.jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.44 (1).jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.44 (2).jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.44 - 2.jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.45.jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.45 (1).jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.45 (2).jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.45 (3).jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.45 (4).jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.46.jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.46 (1).jpeg"
  "WhatsApp Image 2026-06-01 at 22.17.46 (2).jpeg"
)

# Copiar cada imagem com novo nome
for i in "${!images[@]}"; do
  source_file="assets/${images[$i]}"
  dest_file="public/assets/perfumes/$((i + 1)).jpeg"
  
  if [ -f "$source_file" ]; then
    cp "$source_file" "$dest_file"
    echo "✓ Copiado: ${images[$i]} → $((i + 1)).jpeg"
  else
    echo "✗ Arquivo não encontrado: $source_file"
  fi
done

echo ""
echo "✅ Cópia de imagens concluída!"
echo "   Verifique em: public/assets/perfumes/"
