import Link from 'next/link';
import { Header } from '@/components/Header';

export default function ProductNotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Produto não encontrado</h1>
        <p className="mt-2 text-slate-600">
          O produto que você procura não existe ou foi removido.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Voltar para listagem
        </Link>
      </main>
    </>
  );
}
