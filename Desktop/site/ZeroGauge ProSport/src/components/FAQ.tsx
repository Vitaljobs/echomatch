const faqs = [
    {
        question: 'Moeten spelers elke dag invullen?',
        answer:
            'Idealiter wel, omdat trends dan duidelijker worden. Maar ook 3–4 keer per week geeft staf al veel beter inzicht dan losse gesprekken.'
    },
    {
        question: 'Ziet mijn trainer alles wat ik invul?',
        answer:
            'Binnen een teamomgeving kunnen trainer en (sport)fysio je scores zien. Er worden geen gegevens gedeeld buiten de club of met andere teams.'
    },
    {
        question: 'Hoeveel tijd kost een dagelijkse check-in?',
        answer:
            'Gemiddeld minder dan één minuut per speler. De vragenlijst is bewust kort gehouden zodat hij goed vol te houden is in het seizoen.'
    },
    {
        question: 'Kunnen we eigen vragen toevoegen?',
        answer:
            'In een volgende versie wordt het mogelijk om extra velden of custom vragen toe te voegen, afgestemd op de wensen van jouw staf.'
    },
    {
        question: 'Werkt ZeroGauge ProSport ook met wearables of GPS-data?',
        answer:
            'De eerste versie focust op subjectieve metingen (RPE, pijn, slaap, energie). Later kan dit worden uitgebreid met externe load, zoals GPS of hartslag.'
    }
];

export function FAQ() {
    return (
        <section className="py-16 bg-slate-950 text-slate-50">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Veelgestelde vragen
                </h2>
                <p className="mt-3 text-slate-300 max-w-2xl">
                    Korte antwoorden op vragen die spelers, trainers en fysio&apos;s vaak stellen wanneer ze met
                    ZeroGauge ProSport starten.
                </p>

                <dl className="mt-10 space-y-6">
                    {faqs.map((item) => (
                        <div
                            key={item.question}
                            className="rounded-2xl bg-slate-900/70 p-5 border border-slate-800"
                        >
                            <dt className="text-sm font-semibold">{item.question}</dt>
                            <dd className="mt-2 text-sm text-slate-300">{item.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
