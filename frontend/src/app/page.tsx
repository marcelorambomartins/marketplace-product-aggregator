import { EmptyState } from '@/components/EmptyState';
import { Header } from '@/components/Header';
import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { ProductFiltersSection } from '@/components/ProductFiltersSection';
import { getProducts, parseFiltersFromSearchParams } from '@/lib/products';

interface HomePageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const filters = parseFiltersFromSearchParams(searchParams);

  let result;
  let error: string | null = null;

  try {
    result = await getProducts(filters);
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : 'Não foi possível carregar os produtos. Verifique se o backend está rodando.';
    result = { data: [], total: 0, page: 1, limit: filters.limit ?? 12 };
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
          <p className="mt-1 text-sm text-slate-600">
            Busque e filtre produtos agregados da fonte externa.
          </p>
        </div>

        <div className="mb-6">
          <ProductFiltersSection />
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {result.data.length === 0 ? (
          <EmptyState />
        ) : (
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
        )}
      </main>
    </>
  );
}
