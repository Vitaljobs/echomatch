// app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Instellingen
        </h1>
        <p className="text-slate-400">
          Pas je alias aan en lees hoe EchoMatch met anonimiteit omgaat.
        </p>
      </div>

      {/* Alias / naam */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Jouw alias
          </h2>
          <p className="text-sm text-slate-400">
            Kies een naam die alleen in de interface gebruikt wordt.
            Echo’s zelf blijven altijd anoniem.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Alias
          </label>
          <input
            type="text"
            placeholder="Bijv. Stiltezoeker, Nachtdenker..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          />
          <p className="text-xs text-slate-500">
            Later kun je deze alias gebruiken in notificaties of
            persoonlijke overzichten. Je echte naam wordt nergens getoond.
          </p>
        </div>
      </section>

      {/* Uitleg anonimiteit */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">
          Anonimiteit in EchoMatch
        </h2>
        <p className="text-sm text-slate-300">
          EchoMatch is ontworpen als een rustige plek voor anonieme
          mini-dagboekzinnen. Je echo’s worden opgeslagen zonder
          zichtbare koppeling aan een profiel of echte naam.
        </p>
        <p className="text-sm text-slate-300">
          Andere gebruikers zien alleen de inhoud van je echo en
          eventueel een eenvoudige tag, zoals werk, relatie of gevoel.
          Zo blijft de focus op wat je deelt, niet op wie je bent.
        </p>
      </section>
    </div>
  );
}
