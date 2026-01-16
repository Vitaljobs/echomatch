import Image from "next/image";
import { Check } from "lucide-react";

export default function DashboardShowcase() {
    return (
        <section className="py-24 px-6 bg-slate-950 overflow-hidden">
            <div className="container mx-auto max-w-6xl space-y-32">

                {/* Intro Headline */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-relaxed">
                        Zo werken team-dashboard en spelers-overzicht samen in ZeroGauge ProSport.
                    </h2>
                </div>

                {/* Block 1: Team Dashboard (Text Left, Image Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 space-y-8">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm font-semibold text-feature-accent uppercase tracking-wider">
                            Voor trainers & staf
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                            Team-dashboard <span className="text-slate-500">voor clubs</span>
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "Overzicht van load, herstel en balans per speler.",
                                "Filter op positie, risiconiveau en beschikbaarheid."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-lg text-slate-400">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-feature-accent">
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                    </div>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2 relative group perspective-1000">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-blue-600/10 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/50 bg-slate-900 transform transition-transform duration-700 group-hover:rotate-y-[-2deg] group-hover:rotate-x-[2deg]">
                            <Image
                                src="/dashboard-team-dark.png"
                                alt="Team Dashboard"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Block 2: Personal Dashboard (Image Left, Text Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-1 relative group perspective-1000">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-purple-600/10 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/50 bg-slate-900 transform transition-transform duration-700 group-hover:rotate-y-[2deg] group-hover:rotate-x-[2deg]">
                            <Image
                                src="/dashboard-player-purple.png"
                                alt="Personal Player Dashboard"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="order-2 space-y-8">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-950/30 border border-purple-900/50 text-sm font-semibold text-purple-400 uppercase tracking-wider">
                            Voor spelers
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                            Persoonlijk overzicht <span className="text-slate-500">voor elke speler</span>
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "Zie dagelijks je herstel, belasting en balansscore.",
                                "Vergelijk je week met eerdere periodes en afspraken met je trainer."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-lg text-slate-400">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-purple-950/30 border border-purple-900/50 flex items-center justify-center text-purple-400">
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                    </div>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
}
