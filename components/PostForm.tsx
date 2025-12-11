'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Send, Hash } from 'lucide-react';

export function PostForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!res.ok) {
        console.error('Fout bij versturen', await res.json());
        return;
      }

      setContent('');
      router.refresh();
    } catch (err) {
      console.error('Onverwachte fout', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // jouw bestaande JSX (textarea, button, tags) blijft hetzelfde,
  // alleen `onSubmit={handleSubmit}` koppelen aan het formulier.
    return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 mb-4 rounded-lg border border-slate-800 bg-slate-900/70 p-4"
    >
      <label className="block text-sm font-medium text-slate-100 mb-2">
        Nieuwe echo
      </label>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Deel een gedachte, inzicht of echo..."
        className="w-full rounded-md bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none border border-slate-800 focus:border-violet-500"
        rows={3}
      />

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Plaatsen...' : 'Echo plaatsen'}
        </button>
      </div>
    </form>
  );
}
