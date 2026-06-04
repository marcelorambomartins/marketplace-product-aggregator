'use client';

import { Suspense } from 'react';
import { ProductFilters } from './ProductFilters';

function FiltersFallback() {
  return (
    <div className="h-32 animate-pulse rounded-lg border border-slate-200 bg-slate-100" />
  );
}

export function ProductFiltersSection() {
  return (
    <Suspense fallback={<FiltersFallback />}>
      <ProductFilters />
    </Suspense>
  );
}
