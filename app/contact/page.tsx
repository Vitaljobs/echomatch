import { AppShell } from '@/components/AppShell';

export default function ContactPage() {
  return (
    <AppShell>
      <main className="max-w-3xl mx-auto py-12 px-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-slate-300 mb-6">
          Heb je een vraag over EchoMatch, wil je een probleem melden of een specifieke echo laten beoordelen?
          Gebruik onderstaand formulier om contact op te nemen. [web:23]
        </p>

        <form className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              E‑mailadres
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-xl bg-slate-900/70 border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="jij@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Bericht
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-xl bg-slate-900/70 border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Beschrijf je vraag of melding zo duidelijk mogelijk."
            />
          </div>

          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-6 py-2 text-sm font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Bericht verzenden
          </button>
        </form>
      </main>
    </AppShell>
  );
}
