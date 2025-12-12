import { AppShell } from '@/components/AppShell';

export default function PrivacyPage() {
  return (
    <AppShell>
      <main className="max-w-3xl mx-auto py-12 px-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Privacyverklaring</h1>
        <p className="text-slate-300 mb-4">
          EchoMatch is ontworpen als anonieme omgeving. Deze pagina legt in eenvoudige taal uit
          welke gegevens wij verwerken en waarom. Deze uitleg is algemeen en vormt geen juridisch advies. [web:26]
        </p>

        <section className="space-y-3 mb-8">
          <h2 className="text-xl font-semibold">Welke gegevens verwerken we?</h2>
          <p className="text-slate-300">
            Wanneer je een echo plaatst, slaan we de inhoud van je bericht, de datum en tijd van plaatsing
            en een intern echo‑ID op in onze database. Persoonsgegevens zoals naam of e‑mail vragen we
            niet bij het plaatsen van een echo. [web:26]
          </p>
          <p className="text-slate-300">
            De hosting en database worden verzorgd door externe partijen (zoals Netlify en Supabase),
            die eigen logbestanden en technische gegevens kunnen opslaan, bijvoorbeeld IP‑adressen en
            foutlogs. Deze gegevens gebruiken we uitsluitend voor beveiliging, misbruikdetectie en om
            het platform technisch draaiende te houden. [web:26]
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-xl font-semibold">Waarom verwerken we deze gegevens?</h2>
          <p className="text-slate-300">
            De gegevens zijn nodig om echo&apos;s op het platform te tonen, misbruik te kunnen melden
            en om bij overtredingen van de regels actie te kunnen ondernemen (bijvoorbeeld verbergen
            of verwijderen van berichten). [web:26]
          </p>
          <p className="text-slate-300">
            Gegevens uit logs kunnen worden gebruikt om technische problemen op te lossen en aanvallen
            of spam te detecteren, zodat EchoMatch veilig en stabiel blijft voor alle gebruikers. [web:26]
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-xl font-semibold">Hoe lang bewaren we gegevens?</h2>
          <p className="text-slate-300">
            Echo&apos;s blijven zichtbaar zolang het platform actief is, tenzij jij of een beheerder
            ze verwijdert of verbergt. Technische loggegevens bij onze hostingproviders worden
            doorgaans automatisch na een beperkte periode verwijderd volgens hun eigen beleid. [web:26]
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-xl font-semibold">Beveiliging</h2>
          <p className="text-slate-300">
            Toegang tot de beheeromgeving is beperkt tot bevoegde admin‑accounts. Daarnaast maken we
            gebruik van beveiligde verbindingen (HTTPS) en de beveiligingsmaatregelen die onze
            hosting‑ en databaseproviders standaard bieden. [web:26]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Vragen over privacy</h2>
          <p className="text-slate-300">
            Heb je vragen over deze privacyverklaring of wil je een specifiek bericht laten verwijderen,
            neem dan contact op via de contactpagina van EchoMatch. [web:23]
          </p>
        </section>
      </main>
    </AppShell>
  );
}
