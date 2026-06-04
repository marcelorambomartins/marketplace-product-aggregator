'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { api } from '@/lib/api';
import { buildCompareHref, MIN_COMPARE, parseCompareIds } from '@/lib/compare';
import type { Product } from '@/types';
import { ComparisonTable } from './ComparisonTable';

export function ComparePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selected, remove, clear } = useCompare();

  const urlIds = parseCompareIds(searchParams.get('ids') ?? undefined);
  const ids =
    urlIds.length >= MIN_COMPARE
      ? urlIds
      : selected.map((p) => p.id);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length < MIN_COMPARE) {
      setLoading(false);
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all(ids.map((id) => api.get<Product>(`/products/${id}`)))
      .then(setProducts)
      .catch((e) => {
        setProducts([]);
        setError(
          e instanceof Error
            ? e.message
            : 'Não foi possível carregar os produtos para comparação.',
        );
      })
      .finally(() => setLoading(false));
  }, [ids.join(',')]);

  const lowestPriceId =
    products.length > 0
      ? products.reduce((min, p) => (p.price < min.price ? p : min)).id
      : '';

  function handleRemove(id: string) {
    remove(id);
    const nextIds = ids.filter((i) => i !== id);
    if (nextIds.length < MIN_COMPARE) {
      router.push('/');
      return;
    }
    router.push(buildCompareHref(nextIds));
  }

  if (ids.length < MIN_COMPARE) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-6 py-8 text-center">
        <p className="text-amber-900">
          Selecione pelo menos {MIN_COMPARE} produtos na listagem para comparar.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Ir para produtos
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <p className="py-12 text-center text-sm text-slate-600">Carregando comparação...</p>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Comparando {products.length} produto{products.length !== 1 ? 's' : ''}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              clear();
              router.push('/');
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpar seleção
          </button>
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Voltar à listagem
          </Link>
        </div>
      </div>

      <ComparisonTable
        products={products}
        lowestPriceId={lowestPriceId}
        onRemove={handleRemove}
      />
    </div>
  );
}
