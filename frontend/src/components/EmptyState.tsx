interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = 'Nenhum produto encontrado com os filtros aplicados.',
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <p className="text-slate-600">{message}</p>
    </div>
  );
}
