import Link from 'next/link';
import type { ProductFilters } from '@/types';

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  filters: ProductFilters;
}

function buildPageHref(filters: ProductFilters, page: number): string {
  const params = new URLSearchParams();

  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (filters.minPrice !== undefined)
    params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    params.set('maxPrice', String(filters.maxPrice));
  params.set('page', String(page));
  params.set('limit', String(filters.limit ?? 12));

  return `/?${params.toString()}`;
}

export function Pagination({ page, limit, total, filters }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
      aria-label="Paginação"
    >
      <p className="text-sm text-slate-600">
        Página {page} de {totalPages} ({total} produtos)
      </p>
      <div className="flex gap-2">
        {hasPrev ? (
          <Link
            href={buildPageHref(filters, page - 1)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Anterior
          </Link>
        ) : (
          <span className="rounded-md border border-slate-100 px-3 py-1.5 text-sm text-slate-300">
            Anterior
          </span>
        )}
        {hasNext ? (
          <Link
            href={buildPageHref(filters, page + 1)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Próxima
          </Link>
        ) : (
          <span className="rounded-md border border-slate-100 px-3 py-1.5 text-sm text-slate-300">
            Próxima
          </span>
        )}
      </div>
    </nav>
  );
}
