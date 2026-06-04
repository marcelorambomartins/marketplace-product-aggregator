'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { MAX_COMPARE } from '@/lib/compare';
import type { Product } from '@/types';

interface CompareContextValue {
  selected: Product[];
  isSelected: (id: string) => boolean;
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Product[]>([]);

  const isSelected = useCallback(
    (id: string) => selected.some((p) => p.id === id),
    [selected],
  );

  const toggle = useCallback((product: Product) => {
    setSelected((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const value = useMemo(
    () => ({
      selected,
      isSelected,
      toggle,
      remove,
      clear,
      canAddMore: selected.length < MAX_COMPARE,
    }),
    [selected, isSelected, toggle, remove, clear],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare deve ser usado dentro de CompareProvider');
  }
  return ctx;
}
