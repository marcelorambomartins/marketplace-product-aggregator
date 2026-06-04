import Link from 'next/link';
import { Navbar } from './Navbar';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Marketplace Aggregator
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
