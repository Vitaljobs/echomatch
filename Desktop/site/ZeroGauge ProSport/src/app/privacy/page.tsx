import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Header />

            <section className="py-24 md:py-32 bg-slate-950 text-slate-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Privacyverklaring ZeroGauge ProSport
                    </h1>
                    <p className="mt-4 text-slate-400 text-sm">
                        Laatst bijgewerkt: december 2024
                    </p>

                    {/* Inleiding */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Inleiding
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            ZeroGauge ProSport verwerkt persoonsgegevens van spelers/sporters, trainers en (sport)fysio&apos;s
                            om dagelijkse metingen, risicoscores en teamrapportages mogelijk te maken. Het gaat bijvoorbeeld om
                            naam, contactgegevens, team, antwoorden op check-ins (zoals belasting, pijn, slaap en energie) en
                            technische gegevens zoals tijdstip en apparaat. Deze gegevens worden gebruikt om individuele en
                            teamgerichte inzichten te tonen in het dashboard en om de dienst veilig te laten functioneren.
                        </p>
                    </div>

                    {/* Welke gegevens verzamelen we */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Welke gegevens verzamelen we?
                        </h2>
                        <div className="mt-4 space-y-4">
                            <div className="rounded-xl bg-slate-900/50 p-6 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Accountgegevens</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Naam, e-mailadres, team/club naam, rol (speler, trainer, fysio)
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 p-6 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Gezondheids- en sportgegevens</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Dagelijkse check-in antwoorden: belasting (RPE), pijnscore, slaapkwaliteit, energieniveau,
                                    stemming, voeding en vochtinname. Deze gegevens zijn nodig voor het berekenen van risicoscores
                                    en het bewaken van jouw herstel.
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 p-6 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Technische gegevens</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    IP-adres, apparaattype, browser, tijdstip van toegang. Deze worden alleen gebruikt voor
                                    beveiliging en technisch beheer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Waarom verwerken we deze gegevens */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Waarom verwerken we deze gegevens?
                        </h2>
                        <ul className="mt-4 space-y-3">
                            <li className="flex gap-3 text-slate-300">
                                <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                <span>Om jouw persoonlijke belastings- en herstelprofiel op te bouwen</span>
                            </li>
                            <li className="flex gap-3 text-slate-300">
                                <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                <span>Om risicoscores te berekenen en trends te visualiseren</span>
                            </li>
                            <li className="flex gap-3 text-slate-300">
                                <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                <span>Om trainers en (sport)fysio&apos;s inzicht te geven in het teambeeld</span>
                            </li>
                            <li className="flex gap-3 text-slate-300">
                                <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                <span>Om de dienst veilig en functioneel te houden</span>
                            </li>
                        </ul>
                    </div>

                    {/* Met wie delen we gegevens */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Met wie delen we jouw gegevens?
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Je gegevens worden opgeslagen op beveiligde servers binnen de EU of gelijkwaardige regio&apos;s.
                            Toegang is beperkt tot geautoriseerde gebruikers (bijvoorbeeld jouw trainer en (sport)fysio binnen
                            jouw team) en technische beheerders die de dienst onderhouden.
                        </p>
                        <div className="mt-6 p-6 rounded-xl bg-blue-900/20 border border-blue-800/50">
                            <p className="text-sm text-slate-200 font-semibold">
                                ⚠️ Belangrijke garantie
                            </p>
                            <p className="mt-2 text-sm text-slate-300">
                                Er worden <strong>geen gegevens verkocht</strong> aan derden. Gegevens kunnen wel worden
                                geanonimiseerd en in groepen samengevat om statistieken en productverbeteringen te maken.
                            </p>
                        </div>
                    </div>

                    {/* Bewaartermijn */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Hoe lang bewaren we jouw gegevens?
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Persoonsgegevens worden bewaard zolang je actief gebruik maakt van ZeroGauge ProSport. Na beëindiging
                            van je account worden gegevens maximaal 2–5 jaar bewaard voor historische analyse en worden
                            vervolgens geanonimiseerd of verwijderd. Je kunt altijd eerder verwijdering aanvragen.
                        </p>
                    </div>

                    {/* Jouw rechten (AVG) */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Jouw rechten volgens de AVG
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Als betrokkene heb je rechten volgens de AVG:
                        </p>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl bg-slate-900/50 p-5 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Recht op inzage</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Vraag een overzicht op van alle gegevens die we van jou verwerken
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 p-5 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Recht op correctie</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Laat onjuiste of onvolledige gegevens aanpassen
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 p-5 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Recht op verwijdering</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Vraag om volledige verwijdering van jouw gegevens
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 p-5 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Recht op dataportabiliteit</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Ontvang jouw gegevens in een gestructureerd formaat
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 p-5 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Recht op bezwaar</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Maak bezwaar tegen bepaalde verwerkingen
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-900/50 p-5 border border-slate-800">
                                <h3 className="font-semibold text-slate-200">Recht om te klagen</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Dien een klacht in bij de Autoriteit Persoonsgegevens
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data eigenaarschap */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Wie is eigenaar van de data?
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            De data blijft eigendom van de <strong>sporter en/of de club</strong>. ZeroGauge ProSport
                            treedt op als verwerker en dienstverlener. Wij verwerken de gegevens alleen volgens jouw
                            instructies en in het kader van de dienstverlening.
                        </p>
                    </div>

                    {/* Geen medisch hulpmiddel */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Belangrijke disclaimer
                        </h2>
                        <div className="mt-4 p-6 rounded-xl bg-yellow-900/20 border border-yellow-800/50">
                            <p className="text-sm text-slate-200 font-semibold">
                                ⚠️ Geen medisch hulpmiddel
                            </p>
                            <p className="mt-2 text-sm text-slate-300">
                                ZeroGauge ProSport is <strong>geen medisch hulpmiddel</strong> en geen vervanging van medisch
                                advies. De risicoscores en inzichten zijn hulpmiddelen voor trainers en (sport)fysio&apos;s,
                                maar vervangen geen diagnose of behandeling door een erkend zorgverlener.
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-12 pb-8">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Contact en verzoeken
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Voor vragen over deze privacyverklaring of om een van je rechten uit te oefenen, kun je contact
                            met ons opnemen via:
                        </p>
                        <div className="mt-6 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                            <p className="text-sm text-slate-300">
                                <strong className="text-slate-100">E-mail:</strong> privacy@zerogauge.nl
                            </p>
                            <p className="mt-2 text-sm text-slate-300">
                                We streven ernaar om binnen 30 dagen te reageren op verzoeken.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
