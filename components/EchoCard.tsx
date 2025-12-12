type Echo = {
  id: number;
  content: string;
  tag: string | null;
  createdAt: Date;
};

type EchoCardProps = {
  echo?: Echo;
};

export function EchoCard({ echo }: EchoCardProps) {
  if (!echo) {
    return null; // of een skeleton/placeholder
  }

  return (
    <article className="rounded-xl bg-slate-900/60 border border-slate-800 px-4 py-3">
      <p className="text-slate-100 text-sm whitespace-pre-line">
        {echo.content}
      </p>
      {echo.tag && (
        <p className="mt-2 text-xs text-purple-300">#{echo.tag}</p>
      )}
      <p className="mt-1 text-[11px] text-slate-500">
        Echo #{echo.id}
      </p>
    </article>
  );
}