export default function HowItWorks() {
    return (
        <section className="py-24 md:py-32 bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Hoe ZeroGauge ProSport werkt
                </h2>
                <p className="mt-4 text-lg text-slate-300 max-w-3xl">
                    Van dagelijkse check-in naar een duidelijk teambeeld in drie stappen.
                </p>

                <div className="mt-16 grid gap-10 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-900/70 p-8 border border-slate-800">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
                            1
                        </span>
                        <h3 className="mt-4 text-lg font-semibold">Dagelijkse check-in</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Spelers vullen elke dag een korte vragenlijst in: belasting, pijn, slaap, energie,
                            stemming en voeding/drinken. Minder dan één minuut per speler, via telefoon, tablet
                            of laptop.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 p-8 border border-slate-800">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
                            2
                        </span>
                        <h3 className="mt-4 text-lg font-semibold">Automatische risicoscore</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            ZeroGauge zet de antwoorden om naar één risicoscore van 0–100 met duidelijke kleuren.
                            Zo zie je direct wie fit is, wie vermoeid is en waar pijn zich opstapelt.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 p-8 border border-slate-800">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
                            3
                        </span>
                        <h3 className="mt-4 text-lg font-semibold">Teamdashboard voor staf</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Trainers en fysio's krijgen een teamdashboard met kaarten en een risico-ringverdeling.
                            In één oogopslag zie je hoog-risico spelers, gemiddelde RPE en hoeveel metingen er zijn
                            ingevuld.
                        </p>
                    </div>
                </div>

                {/* Waarom ZeroGauge ProSport werkt voor het hele team */}
                <div className="mt-24 pt-16 border-t border-slate-800">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                        Waarom ZeroGauge ProSport werkt voor het hele team
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 text-center max-w-4xl mx-auto">
                        Spelers delen dagelijks hoe ze zich voelen, staf krijgt een helder beeld van belasting,
                        herstel en risico. Zo wordt samenwerken eenvoudiger én slimmer.
                    </p>

                    <div className="mt-16 grid gap-12 md:grid-cols-2">
                        {/* Voor spelers/sporters */}
                        <div className="rounded-2xl bg-gradient-to-br from-blue-900/30 to-slate-900/30 p-8 border border-blue-800/50">
                            <h3 className="text-2xl font-bold text-blue-400">Voor spelers/sporters</h3>
                            <ul className="mt-6 space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                    <p className="text-slate-200">
                                        Je vult in minder dan een minuut per dag hoe je je voelt: energie, slaap, pijn en belasting.
                                    </p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                    <p className="text-slate-200">
                                        Kleine pijntjes en vermoeidheid worden eerder gezien, zodat je niet hoeft door te lopen tot het echt misgaat.
                                    </p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                    <p className="text-slate-200">
                                        Je bouwt samen met staf een duidelijk beeld op van wat voor jou werkt in drukke weken en na wedstrijden.
                                    </p>
                                </li>
                            </ul>
                        </div>

                        {/* Voor trainers en (sport)fysio's */}
                        <div className="rounded-2xl bg-gradient-to-br from-green-900/30 to-slate-900/30 p-8 border border-green-800/50">
                            <h3 className="text-2xl font-bold text-green-400">Voor trainers en (sport)fysio&apos;s</h3>
                            <ul className="mt-6 space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                                    <p className="text-slate-200">
                                        Maak zelf pulses aan - individueel voor één speler of in groepsverband voor het hele team - en stuur ze direct uit vanuit het dashboard.
                                    </p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                                    <p className="text-slate-200">
                                        Je krijgt elke dag objectieve én subjectieve data per speler: load, herstel en klachten in één overzicht.
                                    </p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                                    <p className="text-slate-200">
                                        Je ziet snel welke spelers rood of oranje staan en kunt trainingsbelasting of herstel direct bijsturen.
                                    </p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                                    <p className="text-slate-200">
                                        De dagelijkse check-ins verbeteren de communicatie in de staf en helpen blessures te voorkomen en beschikbaarheid hoog te houden.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Privacy/Juridisch blok */}
                <div className="mt-20 pt-12 border-t border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-center">
                            Jouw data als sporter blijft van jou
                        </h3>
                        <p className="mt-6 text-slate-300 leading-relaxed">
                            ZeroGauge ProSport slaat jouw gegevens veilig op en gebruikt ze alleen om jouw belastings‑
                            en herstelprofiel op te bouwen. Je trainer en (sport)fysio zien alleen de metingen die je
                            met hen deelt binnen jouw teamomgeving, zodat jullie samen beter kunnen beslissen over
                            training en herstel. Gegevens worden nooit verkocht aan derden en je kunt altijd vragen om
                            inzicht in, of verwijdering van, jouw data.
                        </p>
                        <div className="mt-6 text-center">
                            <a
                                href="/privacy"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                            >
                                Lees meer in onze Privacyverklaring
                                <span className="text-lg">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
