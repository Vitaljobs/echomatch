import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VoorwaardenPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Header />

            <section className="py-24 md:py-32 bg-slate-950 text-slate-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Algemene Voorwaarden
                    </h1>
                    <p className="mt-4 text-slate-400 text-sm">
                        Laatst bijgewerkt: december 2024
                    </p>

                    {/* Inleiding */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            1. Toepasselijkheid
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Deze algemene voorwaarden zijn van toepassing op het gebruik van ZeroGauge ProSport,
                            een platform voor het monitoren van belasting, herstel en risicoscores van sporters.
                            Door gebruik te maken van ZeroGauge ProSport ga je akkoord met deze voorwaarden.
                        </p>
                    </div>

                    {/* Gebruik van het platform */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            2. Gebruik van het platform
                        </h2>
                        <div className="mt-4 space-y-4 text-slate-300">
                            <p className="leading-relaxed">
                                ZeroGauge ProSport is bedoeld voor trainers, (sport)fysio&apos;s en sporters die dagelijkse
                                metingen willen bijhouden om belasting en herstel te monitoren. Het platform biedt
                                inzichten en risicoscores, maar is geen vervanging voor medisch advies of professionele
                                begeleiding.
                            </p>
                            <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Je verplicht je tot:</h3>
                                <ul className="mt-3 space-y-2 text-sm">
                                    <li className="flex gap-3">
                                        <span className="text-blue-400 flex-shrink-0">•</span>
                                        <span>Correcte en actuele informatie te verstrekken</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-400 flex-shrink-0">•</span>
                                        <span>Je inloggegevens vertrouwelijk te houden</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-400 flex-shrink-0">•</span>
                                        <span>Het platform niet te misbruiken of schade toe te brengen</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-400 flex-shrink-0">•</span>
                                        <span>Alleen gegevens in te voeren waarvoor je toestemming hebt</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Geen medisch hulpmiddel */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            3. Disclaimer: geen medisch hulpmiddel
                        </h2>
                        <div className="mt-4 p-6 rounded-xl bg-yellow-900/20 border border-yellow-800/50">
                            <p className="text-sm font-semibold text-slate-200">
                                ⚠️ Belangrijke waarschuwing
                            </p>
                            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                                ZeroGauge ProSport is <strong>geen medisch hulpmiddel</strong> en is niet bedoeld om
                                blessures te diagnosticeren, te behandelen of medische adviezen te vervangen. De risicoscores
                                en inzichten die het platform biedt, zijn hulpmiddelen voor coaches en (sport)fysio&apos;s
                                om trainingsbelasting bij te sturen, maar mogen nooit worden gebruikt als enige basis voor
                                medische beslissingen.
                            </p>
                            <p className="mt-3 text-sm text-slate-300">
                                Raadpleeg altijd een erkend zorgverlener bij gezondheidsproblemen of blessures.
                            </p>
                        </div>
                    </div>

                    {/* Data eigenaarschap */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            4. Eigenaarschap van gegevens
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Alle gegevens die worden ingevoerd in ZeroGauge ProSport blijven eigendom van de
                            <strong> sporter en/of de club</strong>. ZeroGauge treedt op als verwerker en dienstverlener
                            en verwerkt gegevens alleen volgens jouw instructies en voor de doeleinden waarvoor ze zijn
                            verzameld.
                        </p>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Je behoudt te allen tijde het recht om jouw gegevens in te zien, te corrigeren, te exporteren
                            of te verwijderen. Zie onze{" "}
                            <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                                Privacyverklaring
                            </a>{" "}
                            voor meer informatie.
                        </p>
                    </div>

                    {/* Toestemming voor gezondheidsgegevens */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            5. Toestemming voor gezondheidsgegevens
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Door een account aan te maken bij ZeroGauge ProSport geef je <strong>expliciete toestemming</strong>
                            voor het verwerken van bijzondere persoonsgegevens (zoals pijn, blessures, herstel en energieniveau)
                            voor de volgende doeleinden:
                        </p>
                        <ul className="mt-4 space-y-2 text-slate-300">
                            <li className="flex gap-3">
                                <span className="text-blue-400 flex-shrink-0">✓</span>
                                <span>Het berekenen van risicoscores</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-400 flex-shrink-0">✓</span>
                                <span>Het tonen van trends in jouw persoonlijke profiel</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-400 flex-shrink-0">✓</span>
                                <span>Het delen van inzichten met jouw trainer en (sport)fysio binnen jouw team</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-slate-400">
                            Je kunt deze toestemming te allen tijde intrekken door contact met ons op te nemen.
                        </p>
                    </div>

                    {/* Intellectueel eigendom */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            6. Intellectueel eigendom
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Alle rechten op de software, het ontwerp, de content en de functionaliteit van ZeroGauge ProSport
                            behoren toe aan ZeroGauge of haar licentiegevers. Het is niet toegestaan om het platform te
                            kopiëren, aan te passen, te distribueren of te gebruiken voor commerciële doeleinden zonder
                            uitdrukkelijke schriftelijke toestemming.
                        </p>
                    </div>

                    {/* Bewaartermijn */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            7. Bewaartermijn van gegevens
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Persoonsgegevens worden bewaard zolang je actief gebruik maakt van ZeroGauge ProSport.
                            Na beëindiging van je account worden gegevens bewaard voor een periode van <strong>2 tot 5 jaar</strong>
                            voor historische analyse en vervolgens geanonimiseerd of verwijderd.
                        </p>
                        <p className="mt-4 text-slate-300">
                            Je kunt op elk moment eerder verwijdering aanvragen via de instellingen in de app of door
                            contact met ons op te nemen.
                        </p>
                    </div>

                    {/* Aansprakelijkheid */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            8. Aansprakelijkheid
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            ZeroGauge ProSport streeft ernaar om een betrouwbare en veilige dienst te leveren, maar kan
                            niet garanderen dat het platform te allen tijde foutloos of ononderbroken beschikbaar is.
                            ZeroGauge is niet aansprakelijk voor:
                        </p>
                        <ul className="mt-4 space-y-2 text-slate-300">
                            <li className="flex gap-3">
                                <span className="text-slate-500 flex-shrink-0">•</span>
                                <span>Schade als gevolg van onjuist gebruik van het platform</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-slate-500 flex-shrink-0">•</span>
                                <span>Blessures of gezondheidsproblemen die voortkomen uit beslissingen op basis van de inzichten</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-slate-500 flex-shrink-0">•</span>
                                <span>Verlies van gegevens door technische storingen (tenzij aantoonbaar door grove nalatigheid)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Wijzigingen */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            9. Wijzigingen in de voorwaarden
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            ZeroGauge behoudt zich het recht voor om deze voorwaarden te wijzigen. Wijzigingen worden
                            minimaal 30 dagen van tevoren aangekondigd via e-mail of een melding in de app. Door het
                            platform te blijven gebruiken na de ingangsdatum van de nieuwe voorwaarden, ga je akkoord
                            met de wijzigingen.
                        </p>
                    </div>

                    {/* Toepasselijk recht */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            10. Toepasselijk recht en geschillen
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Op deze voorwaarden is Nederlands recht van toepassing. Geschillen zullen in eerste instantie
                            worden opgelost via overleg. Indien dit niet tot een oplossing leidt, zijn de rechtbanken in
                            Nederland bevoegd.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="mt-12 pb-8">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Contact
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Voor vragen over deze algemene voorwaarden kun je contact met ons opnemen via:
                        </p>
                        <div className="mt-6 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                            <p className="text-sm text-slate-300">
                                <strong className="text-slate-100">E-mail:</strong> info@zerogauge.nl
                            </p>
                            <p className="mt-2 text-sm text-slate-300">
                                <strong className="text-slate-100">Privacy:</strong> privacy@zerogauge.nl
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
