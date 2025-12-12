'use client';
import { useState } from 'react';

export default function MeldButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Onveilig gevoel');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (description.trim().length < 20) {
      setError('Beschrijving moet minimaal 20 tekens zijn.');
      return;
    }

        setIsSubmitting(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          description,
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || 'Er ging iets mis bij het versturen.');
        return;
      }

      setSuccess('Je melding is verstuurd (API-demo, nog zonder database).');
      setSubject('');
      setDescription('');
      setCategory('Onveilig gevoel');
    } catch (err) {
      setError('Er ging iets mis bij het versturen. Probeer het later opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
     }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-medium text-white shadow-lg"
        aria-label="Anoniem melden"
      >
        Anoniem melden
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center text-white">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full shadow-xl border border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Anonieme melding</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">Onderwerp</label>
                <input
                  type="text"
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Korte titel van je melding"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Beschrijving</label>
                <textarea
                  rows={4}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Beschrijf wat er is gebeurd (min. 20 tekens)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Categorie</label>
                <select
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Onveilig gevoel</option>
                  <option>Grensoverschrijdend gedrag</option>
                  <option>Pesten of uitsluiting</option>
                  <option>Discriminatie</option>
                  <option>Anders</option>
                </select>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}
              {success && (
                <p className="text-sm text-emerald-400">{success}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="px-3 py-2 rounded-md text-sm bg-slate-800 hover:bg-slate-700"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  {isSubmitting ? 'Versturen…' : 'Melding versturen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
