import { CheckCircle2 } from "lucide-react";

export default function TeamsSection() {
    return (
        <section className="bg-black text-white py-24 px-6 md:py-32">
            <div className="container mx-auto">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Voor teams en clubs.
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Professionaliseer je begeleiding. ZeroGauge biedt tools die normaal alleen beschikbaar zijn voor elite organisaties, nu toegankelijk voor jouw club.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Players Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-accent">Voor spelers</h3>
                        <ul className="space-y-6">
                            {[
                                "Inzicht in eigen fitheid en herstel",
                                "Automatische blessure-waarschuwingen",
                                "Vergelijk jezelf met teamgenoten",
                                "Directe feedback na trainingen"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-gray-500 shrink-0" />
                                    <span className="text-lg font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Teams Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-white">Voor trainers & staf</h3>
                        <ul className="space-y-6">
                            {[
                                "Real-time aanwezigheid en belasting",
                                "Centraal dashboard voor medische staf",
                                "Export data naar Excel/CSV",
                                "Periodiseer trainingen op basis van data"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                                    <span className="text-lg font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
