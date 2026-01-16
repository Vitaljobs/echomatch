import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 bg-slate-950">
            {/* Refined Spotlight Effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-blue-600/15 blur-[120px] rounded-full opacity-30 mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-purple-600/8 blur-[100px] rounded-full opacity-20"></div>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 relative">
                    {/* Subtle spotlight behind headline */}
                    <div className="absolute -inset-10 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none -z-10"></div>

                    <div className="inline-block">
                        <span className="text-xs font-bold tracking-widest uppercase border-b-2 border-feature-accent text-slate-400 pb-1">
                            ZeroGauge ProSport
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
                        Meet. Train. <br />
                        <span className="text-feature-accent relative inline-block">
                            Presteer beter.
                            <span className="absolute inset-0 bg-blue-500/20 blur-xl block -z-10"></span>
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                        Dagelijkse metingen, diepgaande analyses en een pro-dashboard voor teams.
                        Optimaliseer je prestaties met data-gedreven inzichten.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="bg-feature-accent text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-blue-900/40 transform hover:scale-105 duration-200">
                            Download app <ArrowRight className="w-5 h-5" />
                        </button>
                        <a href="/dashboard" className="border-2 border-slate-700 text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all block text-center">
                            Bekijk pro-dashboard
                        </a>
                    </div>
                </div>

                {/* Translucent Dashboard Shape */}
                <div className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden group border border-white/5 shadow-2xl shadow-blue-900/10 backdrop-blur-sm bg-gradient-to-br from-slate-800/40 to-slate-950/80">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none"></div>

                    {/* Abstract Dashboard Elements - Meters */}
                    <div className="absolute top-12 left-8 right-8 space-y-4">
                        {/* Header Row */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                            <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                        </div>

                        {/* Horizontal Meters */}
                        {[
                            {
                                label: "Recovery",
                                value: "85%",
                                width: "85%",
                                gradient: "from-blue-600 to-emerald-400"
                            },
                            {
                                label: "Load",
                                value: "65%",
                                width: "65%",
                                gradient: "from-blue-600 to-blue-400"
                            },
                            {
                                label: "Balance",
                                value: "92%",
                                width: "92%",
                                gradient: "from-blue-600 via-emerald-400 to-emerald-300"
                            }
                        ].map((meter, i) => (
                            <div key={i} className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                                <div className="flex justify-between text-xs font-medium text-slate-400">
                                    <span>{meter.label}</span>
                                    <span className="text-white">{meter.value}</span>
                                </div>
                                <div className="h-3 w-full bg-slate-800/50 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full bg-gradient-to-r shadow-lg shadow-blue-900/20",
                                            meter.gradient
                                        )}
                                        style={{ width: meter.width }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Graph Area */}
                    <div className="absolute top-72 left-8 right-8 bottom-8 bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                        <div className="absolute inset-0 flex items-end justify-between px-8 pb-8 gap-2 opacity-20">
                            {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75].map((h, i) => (
                                <div key={i} className="w-full bg-blue-500/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
