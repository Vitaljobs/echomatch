import { prisma } from '@/lib/prisma';
import { EchoCard } from '@/components/EchoCard';

export default async function Home() {
  const echoes = await prisma.echo.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  const topEchoes = echoes.slice(0, 3);
  const latestEchoes = echoes.slice(0, 9);

  return (
    <>
      {/* HERO */}
      <section className="min-h-[70vh] bg-gradient-to-br from-slate-950 via-purple-950/60 to-indigo-950/60 flex flex-col items-center justify-center text-white py-16 px-6">
        <div className="max-w-2xl text-center space-y-6 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Deel je gedachten veilig.<br />
            Vind herkenning in echo&apos;s van anderen.
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            EchoMatch is een anonieme plek om twijfels, zorgen en ervaringen te delen, 
            zonder oordeel – zodat je ziet dat je niet alleen bent.
          </p>

          {/* CTA KNOPPEN */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            {/* Start echo */}
            <a
              href="/echo/new"
              className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 blur-md opacity-70 transition-opacity"></span>
              <span className="relative rounded-full bg-slate-950/60 px-8 py-3 border border-white/10">
                Start een echo
              </span>
            </a>

            {/* Explore */}
            <a
              href="/explore"
              className="px-8 py-3 rounded-full text-lg font-medium text-slate-100 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-lg hover:bg-slate-800/80 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              Echo&apos;s verkennen
            </a>
          </div>
        </div>

        {/* TOP 3 ECHOS */}
        <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-300">
          {topEchoes.map((echo, i) => (
            <div
              key={echo.id}
              className={`group p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer
              bg-slate-900/70 border border-white/10 backdrop-blur-xl animate-bounce-card ${`animation-delay-${i * 200}`}`}
            >
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:-translate-y-0.5 transition-transform">
                {echo.title || 'Top Echo'}
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Hot spot vandaag 🔥
              </p>
              <p className="text-xs text-slate-400">
                {new Date(echo.createdAt).toLocaleDateString('nl-NL', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}{' '}
                –{' '}
                {new Date(echo.createdAt).toLocaleTimeString('nl-NL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                Echo ID: {echo.id}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LAATSTE ECHOS + BULLETS */}
      <section className="py-12 bg-slate-950/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Laatste echo&apos;s
          </h2>

          {/* GRID MET LAATSTE ECHOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-fade-in-up">
            {latestEchoes.map((echo) => (
              <EchoCard key={echo.id} echo={echo} />
            ))}
          </div>

          {/* BULLETS: ANONIEM / VEILIG / COMMUNITY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-base text-slate-200">
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-1">Anoniem</h3>
              <p>Je identiteit wordt niet getoond; je deelt volledig anoniem.</p>
            </div>
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-1">Veilig</h3>
              <p>Meldingen en moderatie houden misbruik en schadelijke content tegen.</p>
            </div>
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-1">Community</h3>
              <p>Lees echo&apos;s van anderen en ontdek dat je niet alleen staat.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
