'use client';

import { CompareProvider } from '@/context/CompareContext';
import { CompareBar } from './CompareBar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CompareProvider>
      {children}
      <CompareBar />
    </CompareProvider>
  );
}
