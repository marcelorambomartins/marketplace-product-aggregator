'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { MAX_COMPARE } from '@/lib/compare';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isSelected, toggle, canAddMore } = useCompare();
  const selected = isSelected(product.id);
  const disabled = !selected && !canAddMore;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md ${
        selected
          ? 'border-blue-500 ring-2 ring-blue-200'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="relative">
        <Link
          href={`/products/${product.id}`}
          className="relative block aspect-square bg-slate-50"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>
        <label className="absolute right-2 top-2 flex cursor-pointer items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm">
          <input
            type="checkbox"
            checked={selected}
            disabled={disabled}
            onChange={() => toggle(product)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Comparar
        </label>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h2 className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-blue-600">
            {product.title}
          </h2>
        </Link>
        <p className="text-lg font-bold text-slate-900">
          {formatPrice(product.price)}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
          <span>★ {product.rating.toFixed(1)}</span>
          <span>{product.stock} em estoque</span>
        </div>
        {disabled && (
          <p className="text-xs text-amber-600">
            Máximo de {MAX_COMPARE} produtos na comparação
          </p>
        )}
      </div>
    </article>
  );
}
