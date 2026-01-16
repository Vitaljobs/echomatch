'use client';

import Image from 'next/image';

export default function FuturePreview() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
            <div className="container mx-auto max-w-7xl">
                {/* Badge + Title */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/50 text-sm font-semibold text-purple-400 mb-4 uppercase tracking-wider animate-pulse">
                        🔮 Binnenkort
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        De toekomst: 3D Pijn Tracking
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        In Phase 2: Spelers klikken op een interactief 3D lichaam waar ze pijn hebben.
                        Trainers zien op een heatmap exact waar het team klachten heeft - vandaag én historisch.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Mockup Image - 2/3 width */}
                    <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                        <Image
                            src="/3d-pain-tracking-preview.png"
                            alt="3D Pain Tracking System - Phase 2 Preview"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                            priority={false}
                        />

                        {/* Overlay badge */}
                        <div className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-purple-600 text-white font-bold text-sm shadow-lg">
                            CONCEPT PREVIEW
                        </div>
                    </div>

                    {/* Animated Metrics Panel - 1/3 width */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Live Metrics Preview</h3>

                        {/* Active Pain Points */}
                        <div className="bg-slate-900/80 border border-purple-500/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-slate-400">Actieve Pijnpunten</span>
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-2 tabular-nums">
                                <span className="animate-[countUp_2s_ease-out]">24</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-[widthGrow_3s_ease-out]" style={{ width: '68%' }}></div>
                            </div>
                        </div>

                        {/* Team Coverage */}
                        <div className="bg-slate-900/80 border border-purple-500/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-slate-400">Team Coverage</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-2 tabular-nums">
                                <span className="animate-[countUp_2s_ease-out]">92</span>%
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-[widthGrow_3s_ease-out_0.5s]" style={{ width: '92%' }}></div>
                            </div>
                        </div>

                        {/* High Risk Areas */}
                        <div className="bg-slate-900/80 border border-purple-500/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-slate-400">High Risk Zones</span>
                                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-2 tabular-nums">
                                <span className="animate-[countUp_2s_ease-out]">7</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full animate-[widthGrow_3s_ease-out_1s]" style={{ width: '45%' }}></div>
                            </div>
                        </div>

                        {/* Data Accuracy */}
                        <div className="bg-slate-900/80 border border-purple-500/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-slate-400">Data Nauwkeurigheid</span>
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-2 tabular-nums">
                                <span className="animate-[countUp_2s_ease-out]">96</span>%
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-[widthGrow_3s_ease-out_1.5s]" style={{ width: '96%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features list */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
                        <div className="text-purple-400 text-2xl mb-3">🎯</div>
                        <h3 className="text-lg font-bold text-white mb-2">Exacte Locatie</h3>
                        <p className="text-slate-400 text-sm">
                            Klik op precies waar je pijn hebt - geen vage beschrijvingen meer
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
                        <div className="text-purple-400 text-2xl mb-3">📊</div>
                        <h3 className="text-lg font-bold text-white mb-2">Heatmap Analyse</h3>
                        <p className="text-slate-400 text-sm">
                            Zie in één oogopslag waar je team de meeste klachten heeft
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
                        <div className="text-purple-400 text-2xl mb-3">📅</div>
                        <h3 className="text-lg font-bold text-white mb-2">Historie Tracking</h3>
                        <p className="text-slate-400 text-sm">
                            Jaar later nog precies weten waar en wanneer pijn was
                        </p>
                    </div>
                </div>

                {/* CSS Animations */}
                <style jsx>{`
                    @keyframes widthGrow {
                        from { width: 0%; }
                    }

                    @keyframes countUp {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </section>
    );
}
