export function UseCases() {
    return (
        <section className="py-16 bg-slate-950 text-slate-50">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Hoe teams ZeroGauge ProSport inzetten
                </h2>
                <p className="mt-3 text-slate-300 max-w-2xl">
                    Van wedstrijddagen tot revalidatie: dagelijkse check-ins geven staf een eerlijk beeld van
                    wat spelers écht aankunnen.
                </p>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-900/70 p-6 border border-slate-800">
                        <h3 className="text-base font-semibold">In de aanloop naar wedstrijden</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Volg hoe spelers zich voelen in de dagen voor een wedstrijd. Zie snel wie fris is en
                            wie extra herstel nodig heeft.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 p-6 border border-slate-800">
                        <h3 className="text-base font-semibold">Revalidatie & terugkeer na blessure</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Combineer pijnscores en belasting per dag, zodat fysio en trainer samen kunnen bepalen
                            wanneer een speler klaar is voor de volgende stap.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 p-6 border border-slate-800">
                        <h3 className="text-base font-semibold">Talententeams & academies</h3>
                        <p className="mt-2 text-sm text-slate-300">
                            Bewaak de balans bij jonge spelers met school, training en wedstrijden. Voorkom
                            overbelasting in drukke periodes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
