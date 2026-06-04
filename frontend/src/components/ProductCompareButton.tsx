'use client';

import { useCompare } from '@/context/CompareContext';
import { MAX_COMPARE } from '@/lib/compare';
import type { Product } from '@/types';

interface ProductCompareButtonProps {
  product: Product;
}

export function ProductCompareButton({ product }: ProductCompareButtonProps) {
  const { isSelected, toggle, canAddMore } = useCompare();
  const selected = isSelected(product.id);
  const disabled = !selected && !canAddMore;

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
      <input
        type="checkbox"
        checked={selected}
        disabled={disabled}
        onChange={() => toggle(product)}
        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      {selected ? 'Selecionado para comparar' : 'Adicionar à comparação'}
    </label>
  );
}
