'use client';

import { useState, useTransition } from 'react';
import { EchoCard } from '@/components/EchoCard';

type Echo = {
  id: number;
  content: string;
  tag: string | null;
};

export function MyEchosClient({ initialEchoes }: { initialEchoes: Echo[] }) {
  const [echoes, setEchoes] = useState(initialEchoes);
  const [isPending, startTransition] = useTransition();

  async function handleDelete(id: number) {
    const previous = echoes;
    setEchoes((cur) => cur.filter((e) => e.id !== id));

    try {
      const res = await fetch(`/api/echo/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Delete failed');
      }
    } catch (err) {
      // rollback bij fout
      setEchoes(previous);
    }
  }

  return (
    <div>
      <section className="mt-8 space-y-4">
        {echoes.map((echo) => (
          <div
            key={echo.id}
            className="relative group"
          >
            <EchoCard
              id={echo.id.toString()}
              content={echo.content}
              tag={echo.tag ?? undefined}
            />

            <button
              type="button"
              onClick={() =>
                startTransition(() => handleDelete(echo.id))
              }
              className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 opacity-0 shadow-sm transition group-hover:opacity-100 hover:border-red-500 hover:text-red-300"
            >
              {isPending ? '...' : 'Verwijderen'}
            </button>
          </div>
        ))}

        {echoes.length === 0 && (
          <p className="text-sm text-slate-400">
            Je hebt nog geen echo’s (meer).
          </p>
        )}
      </section>
    </div>
  );
}
