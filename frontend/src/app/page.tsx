import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { ProductFiltersSection } from '@/components/ProductFiltersSection';
import { ProductsList } from '@/components/ProductsList';

function ProductsListFallback() {
  return (
    <p className="py-12 text-center text-sm text-slate-600">Carregando...</p>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
          <p className="mt-1 text-sm text-slate-600">
            Busque, filtre e selecione produtos para comparar lado a lado.
          </p>
        </div>

        <div className="mb-6">
          <ProductFiltersSection />
        </div>

        <Suspense fallback={<ProductsListFallback />}>
          <ProductsList />
        </Suspense>
      </main>
    </>
  );
}
