'use client';

import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { buildCompareHref, MIN_COMPARE } from '@/lib/compare';

export function CompareBar() {
  const { selected, clear } = useCompare();

  if (selected.length === 0) return null;

  const ids = selected.map((p) => p.id);
  const canCompare = selected.length >= MIN_COMPARE;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">{selected.length}</span>{' '}
          {selected.length === 1 ? 'produto selecionado' : 'produtos selecionados'}
          {selected.length < MIN_COMPARE && (
            <span className="text-slate-500">
              {' '}
              (selecione pelo menos {MIN_COMPARE})
            </span>
          )}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clear}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpar
          </button>
          {canCompare ? (
            <Link
              href={buildCompareHref(ids)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Comparar
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-md bg-slate-300 px-4 py-2 text-sm font-medium text-white"
            >
              Comparar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
