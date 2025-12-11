// app/admin/page.tsx
import { ArrowUpRight, MessageCircle, Users, ShieldCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/90">
        <div className="px-6 py-5 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight text-white">
            EchoMatch<span className="text-xs font-mono text-violet-300">_ADMIN</span>
          </h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <button className="w-full flex items-center gap-3 rounded-lg bg-violet-500/15 border border-violet-500/50 px-3 py-2 text-violet-200 font-medium">
            <span className="text-lg">📊</span>
            <span className="font-mono text-xs uppercase tracking-[0.16em]">
              Overzicht
            </span>
          </button>
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100">
            <span className="text-lg">💬</span>
            <span className="font-mono text-xs uppercase tracking-[0.16em]">
              Echo’s
            </span>
          </button>
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100">
            <span className="text-lg">👥</span>
            <span className="font-mono text-xs uppercase tracking-[0.16em]">
              Gebruikers
            </span>
          </button>
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100">
            <span className="text-lg">⚙️</span>
            <span className="font-mono text-xs uppercase tracking-[0.16em]">
              Instellingen
            </span>
          </button>
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100">
            <span className="text-lg">🛡️</span>
            <span className="font-mono text-xs uppercase tracking-[0.16em]">
              Moderatie
            </span>
          </button>
        </nav>

        <div className="px-4 py-4 border-t border-slate-800 bg-slate-950/95">
          <button className="w-full rounded-lg border border-red-500/40 px-3 py-2 text-xs font-mono uppercase tracking-[0.16em] text-red-400 hover:bg-red-500/10">
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Dashboard overzicht
            </h2>
            <p className="text-sm text-slate-400">
              Hoog-over inzicht in echo-activiteit en community gezondheid.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live statistieken
          </div>
        </header>

        <div className="space-y-8">
          {/* Stat cards */}
          <section className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                Totaal echo’s
              </p>
              <p className="mt-2 text-3xl font-bold text-white">1.248</p>
              <p className="mt-1 text-xs text-emerald-400">+18% deze week</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                Nieuwe echo’s vandaag
              </p>
              <p className="mt-2 text-3xl font-bold text-white">42</p>
              <p className="mt-1 text-xs text-slate-400">Laatste uur: 7</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                  Actieve gebruikers
                </p>
                <p className="mt-2 text-3xl font-bold text-white">128</p>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-400">
                <Users className="h-3 w-3" />
                <span>Ingelogd afgelopen 24 uur</span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                  Gemelde echo’s
                </p>
                <p className="mt-2 text-3xl font-bold text-amber-300">5</p>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-3 w-3" />
                <span>Moderatie vereist</span>
              </div>
            </div>
          </section>

          {/* Activity + simple list */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-100">
                  Recente echo-activiteit
                </h3>
                <button className="inline-flex items-center gap-1 text-xs text-violet-300 hover:text-violet-200">
                  Bekijk alle
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start justify-between gap-4 rounded-lg bg-slate-950/60 px-3 py-2">
                  <div>
                    <p className="text-slate-100">
                      “Twijfel of ik mijn baan moet opzeggen, maar het vreet energie.”
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Tag: werk • 5 min geleden</p>
                  </div>
                  <span className="rounded-full bg-slate-900 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300">
                    Nieuwe echo
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-lg bg-slate-950/60 px-3 py-2">
                  <div>
                    <p className="text-slate-100">
                      “Voel me onverwacht rustig na een druk weekend vol prikkels.”
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Tag: gevoel • 32 min geleden</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/40 px-2 py-0.5 text-[10px] text-emerald-300">
                    Positieve trend
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-lg bg-slate-950/60 px-3 py-2">
                  <div>
                    <p className="text-slate-100">
                      Echo gemarkeerd door 3 gebruikers wegens mogelijk kwetsende toon.
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Tag: relatie • 1 uur geleden</p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/40 px-2 py-0.5 text-[10px] text-amber-300">
                    Review nodig
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
              <h3 className="text-sm font-semibold text-slate-100">
                Snelle moderatie
              </h3>
              <p className="text-xs text-slate-400">
                Korte lijst met echo’s die mogelijk aandacht vragen.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2">
                  <span className="flex items-center gap-2 text-slate-100">
                    <MessageCircle className="h-4 w-4 text-amber-300" />
                    2 nieuwe gemelde echo’s
                  </span>
                  <span className="text-xs text-slate-500">Vandaag</span>
                </li>
                <li className="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2">
                  <span className="flex items-center gap-2 text-slate-100">
                    <Users className="h-4 w-4 text-sky-300" />
                    1 gebruiker gelimiteerd
                  </span>
                  <span className="text-xs text-slate-500">Deze week</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
