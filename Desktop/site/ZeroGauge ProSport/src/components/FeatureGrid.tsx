import { Activity, BarChart3, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Herstel",
        description: "Monitor direct het fysieke herstel na belasting.",
        icon: Activity,
        theme: "light", // White card
    },
    {
        title: "Belastingsmonitor",
        description: "Visualiseer acute vs. chronische load.",
        icon: BarChart3,
        theme: "dark", // Dark card
    },
    {
        title: "Blessure-risico",
        description: "AI-gestuurde preventie voor de hele selectie.",
        icon: ShieldCheck,
        theme: "dark", // Dark card
    },
    {
        title: "Teamoverzicht",
        description: "Real-time inzicht in beschikbaarheid en fitheid.",
        icon: Users,
        theme: "light", // White card
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-24 px-6 bg-slate-950 text-white">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Data-gedreven <span className="text-feature-accent">prestaties</span>.
                    </h2>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-6">
                        Professionele tools voor top-amateurs en pro-clubs. Meet jezelf dagelijks en stem trainingen af met trainer of fysio, van losse sessie tot seizoensanalyse.
                    </p>
                    <p className="text-lg text-slate-300 max-w-3xl mx-auto font-medium">
                        ZeroGauge draait om één ding: de juiste data verzamelen, zodat jij en je staf elke dag betere trainingsbeslissingen kunnen nemen.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={cn(
                                "group relative overflow-hidden rounded-[2rem] p-10 transition-all duration-500 hover:scale-[1.02]",
                                feature.theme === "light"
                                    ? "bg-white text-slate-950 shadow-[0_0_40px_-10px_rgba(37,99,235,0.15)] ring-1 ring-blue-50/50 hover:ring-blue-200 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)]"
                                    : "bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-800 text-white shadow-xl hover:-translate-y-2 hover:shadow-blue-900/20 hover:border-slate-700"
                            )}
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110",
                                feature.theme === "light"
                                    ? "bg-slate-50 text-feature-accent shadow-inner" // Subtle indent for light
                                    : "bg-slate-950/50 text-feature-accent border border-slate-700/50" // Dark inset
                            )}>
                                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-3xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                            <p className={cn(
                                "text-lg leading-relaxed font-medium",
                                feature.theme === "light" ? "text-slate-600" : "text-slate-400"
                            )}>
                                {feature.description}
                            </p>

                            {/* Hover effect glow */}
                            <div className={cn(
                                "absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                                feature.theme === "light" ? "bg-blue-200/50" : "bg-blue-600/20"
                            )} />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="bg-feature-accent hover:bg-blue-700 text-white text-lg font-bold px-10 py-5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all inline-flex items-center gap-3 transform hover:scale-105">
                        Plan een demo
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
