import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { formatDate, formatPrice } from '@/lib/format';
import { getProduct } from '@/lib/products';

interface ProductDetailPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  let product;

  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Voltar para listagem
        </Link>

        <article className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 md:grid-cols-2">
          <div className="relative aspect-square rounded-lg bg-slate-50">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                {product.category}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                {product.title}
              </h1>
            </div>

            <p className="text-3xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </p>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-500">Avaliação</dt>
                <dd className="font-medium text-slate-900">
                  ★ {product.rating.toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Estoque</dt>
                <dd className="font-medium text-slate-900">{product.stock}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Marketplace</dt>
                <dd className="font-medium text-slate-900">
                  {product.marketplace}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Ingerido em</dt>
                <dd className="font-medium text-slate-900">
                  {formatDate(product.ingestedAt)}
                </dd>
              </div>
            </dl>

            <div>
              <h2 className="mb-2 text-sm font-semibold text-slate-900">
                Descrição
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description}
              </p>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
