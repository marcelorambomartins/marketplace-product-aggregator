import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { formatDate, formatPrice } from '@/lib/format';
import type { Product } from '@/types';

interface ComparisonTableProps {
  products: Product[];
  lowestPriceId: string;
  onRemove?: (id: string) => void;
}

type CompareRow = {
  label: string;
  values: (product: Product) => ReactNode;
};

export function ComparisonTable({
  products,
  lowestPriceId,
  onRemove,
}: ComparisonTableProps) {
  const rows: CompareRow[] = [
    {
      label: 'Imagem',
      values: (p) => (
        <div className="relative mx-auto aspect-square w-full max-w-[140px] bg-slate-50">
          <Image
            src={p.thumbnail}
            alt={p.title}
            fill
            className="object-contain p-2"
            sizes="140px"
          />
        </div>
      ),
    },
    {
      label: 'Título',
      values: (p) => (
        <Link
          href={`/products/${p.id}`}
          className="font-semibold text-blue-600 hover:text-blue-800"
        >
          {p.title}
        </Link>
      ),
    },
    {
      label: 'Preço',
      values: (p) => (
        <span
          className={
            p.id === lowestPriceId
              ? 'text-lg font-bold text-green-700'
              : 'text-lg font-bold text-slate-900'
          }
        >
          {formatPrice(p.price)}
          {p.id === lowestPriceId && (
            <span className="ml-1 text-xs font-normal text-green-600">
              (menor)
            </span>
          )}
        </span>
      ),
    },
    {
      label: 'Categoria',
      values: (p) => p.category,
    },
    {
      label: 'Avaliação',
      values: (p) => `★ ${p.rating.toFixed(1)}`,
    },
    {
      label: 'Estoque',
      values: (p) => `${p.stock} un.`,
    },
    {
      label: 'Marketplace',
      values: (p) => p.marketplace,
    },
    {
      label: 'Ingerido em',
      values: (p) => formatDate(p.ingestedAt),
    },
    {
      label: 'Descrição',
      values: (p) => (
        <p className="line-clamp-4 text-sm text-slate-600">{p.description}</p>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="sticky left-0 z-10 w-36 bg-slate-50 px-4 py-3 text-left font-medium text-slate-700">
              Atributo
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                className="min-w-[180px] px-4 py-3 text-left font-medium text-slate-900"
              >
                <div className="flex items-start justify-between gap-2">
                  <span>#{product.id}</span>
                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(product.id)}
                      className="text-xs text-slate-500 hover:text-red-600"
                      aria-label={`Remover ${product.title}`}
                    >
                      Remover
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-slate-100">
              <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                {row.label}
              </td>
              {products.map((product) => (
                <td key={product.id} className="px-4 py-3 align-top text-slate-900">
                  {row.values(product)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
