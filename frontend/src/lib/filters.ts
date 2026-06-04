import type { ProductFilters } from '@/types';

export function parseFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): ProductFilters {
  const get = (key: string) => {
    const value = params[key];
    return typeof value === 'string' ? value : undefined;
  };

  const page = get('page');
  const limit = get('limit');
  const minPrice = get('minPrice');
  const maxPrice = get('maxPrice');

  return {
    category: get('category'),
    search: get('search'),
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 12,
    minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
    maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
  };
}

export function buildProductQueryString(filters: ProductFilters): string {
  const params = new URLSearchParams();

  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (filters.minPrice !== undefined)
    params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    params.set('maxPrice', String(filters.maxPrice));
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}
