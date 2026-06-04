import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Marketplace Aggregator',
  description: 'Compare produtos de múltiplos marketplaces',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-100 pb-16 text-slate-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
