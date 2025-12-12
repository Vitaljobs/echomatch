import { AppShell } from '@/components/AppShell';

export default function TermsPage() {
  return (
    <AppShell>
      <main className="max-w-3xl mx-auto py-12 px-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Gebruiksvoorwaarden</h1>
        <p className="text-slate-300 mb-4">
          Deze pagina beschrijft in eenvoudige taal de belangrijkste regels voor het gebruik van EchoMatch.
          Het is een algemene toelichting, geen juridisch advies. [web:26]
        </p>

        <section className="space-y-2 mb-6">
          <h2 className="text-xl font-semibold">Wat je wel en niet mag plaatsen</h2>
          <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1">
            <li>Plaats geen berichten met haat, bedreigingen of doelbewuste intimidatie.</li>
            <li>Deel geen persoonsgegevens van jezelf of anderen (namen, adressen, telefoonnummers).</li>
            <li>Plaats geen spam, reclame of links die duidelijk niet bij het onderwerp passen.</li>
          </ul>
        </section>

        <section className="space-y-2 mb-6">
          <h2 className="text-xl font-semibold">Moderatie en verwijderen van inhoud</h2>
          <p className="text-slate-300 text-sm">
            Echo&apos;s die in strijd zijn met deze regels of met wetgeving kunnen worden verborgen of verwijderd.
            Bij herhaald misbruik kan een gebruiker technisch worden geblokkeerd (bron wordt geblokkeerd). [web:26]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Wijzigingen</h2>
          <p className="text-slate-300 text-sm">
            De inhoud van deze voorwaarden kan in de toekomst worden aangepast wanneer de werking van het
            platform verandert. De meest recente versie is steeds te vinden op deze pagina. [web:26]
          </p>
        </section>
      </main>
    </AppShell>
  );
}
