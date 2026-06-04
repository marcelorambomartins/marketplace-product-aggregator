import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { ComparePageContent } from '@/components/ComparePageContent';

function CompareFallback() {
  return (
    <p className="py-12 text-center text-sm text-slate-600">Carregando...</p>
  );
}

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Comparar produtos
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Preço, avaliação, estoque e demais atributos lado a lado.
          </p>
        </div>

        <Suspense fallback={<CompareFallback />}>
          <ComparePageContent />
        </Suspense>
      </main>
    </>
  );
}
