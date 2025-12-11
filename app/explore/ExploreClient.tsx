'use client';

import { useMemo, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { EchoCard } from '@/components/EchoCard';

const TAGS = ['werk', 'relatie', 'stress', 'groei', 'gevoel'];

type Echo = {
  id: number;
  content: string;
  tag: string | null;
};

export function ExploreClient({ echoes }: { echoes: Echo[] }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();

    return echoes.filter((echo) => {
      const content = echo.content.toLowerCase();
      const t = (echo.tag ?? '').toLowerCase();

      const matchesSearch =
        !s || content.includes(s) || t.includes(s);

      const matchesTag =
        !activeTag || t === activeTag.toLowerCase();

      return matchesSearch && matchesTag;
    });
  }, [echoes, search, activeTag]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Explore Echo’s
        </h1>
        <p className="text-slate-400">
          Ontdek wat anderen anoniem delen.
        </p>
      </div>

      {/* Filterbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        {/* Zoekveld */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek op woorden of tags..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              !activeTag
                ? 'bg-violet-500 text-white'
                : 'border border-slate-700 bg-slate-950/60 text-slate-300 hover:border-violet-500 hover:text-violet-300'
            }`}
          >
            Alle
          </button>
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTag(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                activeTag === t
                  ? 'bg-violet-500 text-white'
                  : 'border border-slate-700 bg-slate-950/60 text-slate-300 hover:border-violet-500 hover:text-violet-300'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Lijst */}
      <div className="grid gap-4">
        {filtered.map((echo) => (
          <EchoCard
            key={echo.id}
            id={echo.id.toString()}
            content={echo.content}
            tag={echo.tag ?? undefined}
          />
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-slate-400">
            Nog geen echo’s gevonden.
          </p>
        )}
      </div>
    </div>
  );
}
