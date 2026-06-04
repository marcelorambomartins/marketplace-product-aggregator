import type { PaginatedResponse, Product, ProductFilters } from '@/types';
import { buildProductQueryString } from './filters';

function getApiBaseUrl(): string {
  return (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:3001/api'
  );
}

async function fetchFromApi<T>(path: string): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<PaginatedResponse<Product>> {
  return fetchFromApi<PaginatedResponse<Product>>(
    `/products${buildProductQueryString(filters)}`,
  );
}

export async function getProduct(id: string): Promise<Product> {
  return fetchFromApi<Product>(`/products/${id}`);
}

export { parseFiltersFromSearchParams, buildProductQueryString } from './filters';
