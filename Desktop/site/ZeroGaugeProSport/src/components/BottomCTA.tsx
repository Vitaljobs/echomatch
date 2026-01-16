export function BottomCTA() {
    return (
        <section className="py-16 bg-slate-950 text-slate-50">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Wil je ZeroGauge ProSport met jouw team gebruiken?
                </h2>
                <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
                    Laat een bericht achter en we kijken samen hoe we jouw spelers, staf en (sport)fysio&apos;s
                    kunnen aansluiten op het platform.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition">
                        Plan een demo
                    </button>
                    <button className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition">
                        Neem contact op
                    </button>
                </div>
            </div>
        </section>
    );
}
