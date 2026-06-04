'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { buildProductQueryString, parseFiltersFromSearchParams } from '@/lib/filters';
import type { PaginatedResponse, Product } from '@/types';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import { ProductCard } from './ProductCard';

export function ProductsList() {
  const searchParams = useSearchParams();
  const filters = parseFiltersFromSearchParams(
    Object.fromEntries(searchParams.entries()),
  );

  const [result, setResult] = useState<PaginatedResponse<Product> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const queryKey = searchParams.toString();

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get<PaginatedResponse<Product>>(
        `/products${buildProductQueryString(filters)}`,
      )
      .then(setResult)
      .catch((e) => {
        setResult(null);
        setError(
          e instanceof Error
            ? e.message
            : 'Não foi possível carregar os produtos.',
        );
      })
      .finally(() => setLoading(false));
  }, [queryKey]);

  if (loading) {
    return (
      <p className="py-12 text-center text-sm text-slate-600">Carregando...</p>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        {error}
      </div>
    );
  }

  if (!result?.data.length) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-6">
        <Pagination
          page={result.page}
          limit={result.limit}
          total={result.total}
          filters={filters}
        />
      </div>
    </>
  );
}
