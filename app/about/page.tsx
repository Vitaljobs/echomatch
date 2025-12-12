import { AppShell } from '@/components/AppShell';

export default function AboutPage() {
  return (
    <AppShell>
      <main className="max-w-3xl mx-auto py-12 px-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Over EchoMatch</h1>
        <p className="text-slate-300 mb-4">
          EchoMatch is een anonieme plek om gedachten, twijfels en ervaringen te delen,
          zodat je merkt dat je niet alleen bent.
        </p>
        <p className="text-slate-300 mb-4">
          Het platform is ontworpen met focus op veiligheid, anonimiteit en een prettige
          ervaring voor iedereen.
        </p>
      </main>
    </AppShell>
  );
}
