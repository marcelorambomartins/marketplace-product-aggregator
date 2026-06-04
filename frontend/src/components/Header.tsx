import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Marketplace Aggregator
        </Link>
        <span className="text-sm text-slate-500">DummyJSON</span>
      </div>
    </header>
  );
}
