import Link from 'next/link';
import { PostForm } from '@/components/PostForm';
import { EchoCard } from '@/components/EchoCard';

const dummyEchoes = [
  { id: 1, content: 'Eerste test-echo', tag: 'test' },
  { id: 2, content: 'Ik voel me vandaag verrassend rustig na een drukke week.', tag: 'gevoel' },
  { id: 3, content: 'Twijfel over mijn werkrichting, maar kleine stappen helpen.', tag: 'werk' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-12 lg:px-10 lg:py-16">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Hero text */}
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300/80">
              EchoMatch
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Alle echo’s over jouw wereld
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                in één rustige feed.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl">
              EchoMatch is een rustige plek voor anonieme mini-dagboekzinnen.
              Volg gedachten en gevoelens van mensen zoals jij, ontdek patronen
              rond werk, relaties en groei, en deel je eigen echo’s zonder druk.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-600"
              >
                Echo’s verkennen
              </Link>
              <a
                href="#mijn-echos"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm sm:text-base font-semibold text-slate-100 transition hover:bg-slate-800/80"
              >
                Start een echo
              </a>
            </div>

            <ul className="mt-2 space-y-1 text-sm text-slate-400">
              <li>• Anoniem delen zonder oordeel.</li>
              <li>• Zie echo’s rond thema’s als werk, relaties en groei.</li>
              <li>• Bouw langzaam aan een eerlijker beeld van je wereld.</li>
            </ul>
          </div>

          {/* Hero preview */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-2xl shadow-violet-500/20">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-200">
                  Laatste echo’s
                </p>
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  Live preview
                </span>
              </div>
              <div className="space-y-3">
                {dummyEchoes.slice(0, 3).map((echo) => (
                  <EchoCard
                    key={echo.id}
                    id={echo.id.toString()}
                    content={echo.content}
                    tag={echo.tag}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover + echte feed */}
      <main className="px-6 py-10 lg:px-10 lg:py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Discover-blok */}
          <section className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
                  Discover Echo’s
                </h2>
                <p className="text-sm text-slate-400">
                  Verken wat anderen delen en vind echo’s die met jou resoneren.
                </p>
              </div>
            </div>

            {/* Echo van de dag */}
            <div className="grid gap-4 lg:grid-cols-[2fr,1.2fr]">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300 mb-2">
                  Echo van de dag
                </p>
                <EchoCard
                  id="featured-1"
                  content="Soms voelt het alsof iedereen al weet wat hij wil, en ik nog aan het zoeken ben."
                  tag="twijfel"
                />
              </div>

              {/* Trending tags */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300 mb-3">
                  Trending tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {['werk', 'relatie', 'stress', 'groei', 'eenzaamheid'].map((tag) => (
                    <button
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-200 hover:border-violet-500 hover:text-violet-300"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured echo’s grid */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                  Featured echo’s
                </p>
                <span className="text-xs text-slate-500">Geselecteerd voor jou</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {dummyEchoes.map((echo) => (
                  <EchoCard
                    key={echo.id}
                    id={echo.id.toString()}
                    content={echo.content}
                    tag={echo.tag}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Jouw eigen echo-feed (PostForm + lijst) */}
          <section id="mijn-echos" className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-100">
              Jouw echo’s
            </h2>
            <PostForm />
            <div className="space-y-3">
              {dummyEchoes.map((echo) => (
                <EchoCard
                  key={echo.id}
                  id={echo.id.toString()}
                  content={echo.content}
                  tag={echo.tag}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
