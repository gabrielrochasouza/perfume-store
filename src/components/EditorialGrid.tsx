'use client';

import { ProductCard3D } from './ProductCard3D';
import type { Product } from '@/types';

export function EditorialGrid({ products }: { products: Product[] }) {
  // alternates: large card → pair of medium cards → large → pair…
  const groups: Array<{ large: boolean; items: Product[] }> = [];
  let i = 0;
  while (i < products.length) {
    if (groups.length % 2 === 0 && i < products.length) {
      groups.push({ large: true, items: [products[i]] });
      i += 1;
    } else {
      const pair = products.slice(i, i + 2);
      if (pair.length === 0) break;
      groups.push({ large: false, items: pair });
      i += 2;
    }
  }

  return (
    <div className="space-y-4 md:space-y-5">
      {groups.map((g, gi) =>
        g.large ? (
          <ProductCard3D key={gi} product={g.items[0]} large />
        ) : (
          <div key={gi} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {g.items.map((p) => (
              <ProductCard3D key={p.id} product={p} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
