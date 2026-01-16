export function CoachPulses() {
    return (
        <section className="py-16 bg-slate-950 text-slate-50">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Pulses die door trainers zelf worden aangestuurd
                </h2>
                <p className="mt-3 text-slate-300 max-w-2xl">
                    In plaats van losse appjes of gesprekken kan de trainer vanuit één plek een meting voor
                    het hele team starten – en ziet hij de antwoorden direct terug in het dashboard.
                </p>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-900/70 p-6 border border-slate-800">
                        <h3 className="text-base font-semibold">Maak zelf team-metingen</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Stel in een paar klikken een pulse samen: van dagelijkse wellness-check tot een korte
                            vragenlijst na een zware trainingsweek of toernooi.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 p-6 border border-slate-800">
                        <h3 className="text-base font-semibold">Na toernooien en belangrijke wedstrijden</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Start direct na een toernooi of belangrijke wedstrijd een korte pulse voor het hele team. Spelers
                            geven aan hoe vermoeid ze zijn, waar ze pijn voelen en hoeveel energie ze nog hebben, zodat je de
                            eerstvolgende trainingen meteen kunt afstemmen.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 p-6 border border-slate-800">
                        <h3 className="text-base font-semibold">Betere gesprekken, minder ruis</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            De pulses geven trainers en (sport)fysio&apos;s een duidelijk groepsbeeld. Zo ontstaat er
                            sneller een eerlijk gesprek over belasting, motivatie en herstel – niet alleen op gevoel.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
