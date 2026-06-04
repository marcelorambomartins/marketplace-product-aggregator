import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <Link href={`/products/${product.id}`} className="relative aspect-square bg-slate-50">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>
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
      </div>
    </article>
  );
}
