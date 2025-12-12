import { AppShell } from '@/components/AppShell';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function createEcho(formData: FormData) {
  'use server';

  const content = (formData.get('content') as string)?.trim();

  if (!content || content.length < 10) {
    return;
  }

  await prisma.echo.create({
    data: {
      content,
    },
  });

  redirect('/explore');
}

export default function NewEchoPage() {
  return (
    <AppShell>
      <main className="max-w-xl mx-auto py-12 px-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Start een nieuwe echo</h1>
        <p className="text-slate-300 mb-8">
          Deel je gedachte, ervaring of vraag volledig anoniem. Schrijf zo concreet mogelijk,
          maar zonder herkenbare namen of gegevens.
        </p>

        <form action={createEcho} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="content">
              Echo
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              className="w-full rounded-xl bg-slate-900/70 border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Beschrijf wat je bezighoudt..."
              required
              minLength={10}
            />
            <p className="mt-1 text-xs text-slate-400">
              Minimaal 10 tekens. Deel geen namen, adressen of andere privacygevoelige gegevens.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 py-3 text-sm font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Echo plaatsen
          </button>
        </form>
      </main>
    </AppShell>
  );
}
