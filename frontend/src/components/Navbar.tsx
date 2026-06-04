'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCompare } from '@/context/CompareContext';
import { buildCompareHref, MIN_COMPARE } from '@/lib/compare';

const links = [
  { href: '/', label: 'Produtos', match: (path: string) => path === '/' },
  {
    href: '/compare',
    label: 'Comparar',
    match: (path: string) => path.startsWith('/compare'),
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { selected } = useCompare();

  const compareHref =
    selected.length >= MIN_COMPARE
      ? buildCompareHref(selected.map((p) => p.id))
      : '/compare';

  return (
    <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principal">
      {links.map((link) => {
        const href = link.label === 'Comparar' ? compareHref : link.href;
        const isActive = link.match(pathname);

        return (
          <Link
            key={link.href}
            href={href}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {link.label}
            {link.label === 'Comparar' && selected.length > 0 && (
              <span
                className={`ml-1.5 inline-flex min-w-[1.25rem] justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {selected.length}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
