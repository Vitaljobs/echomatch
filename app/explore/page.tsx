import { prisma } from '@/lib/prisma';
import { AppShell } from '@/components/AppShell';
import { EchoCard } from '@/components/EchoCard';

export default async function ExplorePage() {
  const echoes = await prisma.echo.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <AppShell>
      <main className="max-w-6xl mx-auto py-12 px-6 text-white">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Echo&apos;s verkennen
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Bekijk de meest recente echo&apos;s uit de community.
          </p>
        </header>

        {/* GRID MET ECHOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {echoes.map((echo) => (
            <EchoCard key={echo.id} echo={echo} />
          ))}
        </section>
      </main>
    </AppShell>
  );
}
