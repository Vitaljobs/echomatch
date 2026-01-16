import { prisma } from "@/lib/prisma";
import { calculateRisk, Meting } from "@/lib/riskCalculator";
import ModernDashboardHeader from "@/components/ModernDashboardHeader";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import {
    Activity,
    Moon,
    Zap,
    Flame,
    Droplets,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    BarChart2,
    Calendar,
    ChevronLeft,
    Coffee,
    Brain,
    Beef,
    ArrowRight
} from "lucide-react";
import Link from 'next/link';

export default async function PlayerDetailView({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch player with their historical wellness records
    const player = await prisma.player.findUnique({
        where: { id },
        include: {
            dailyWellness: {
                orderBy: { date: 'desc' },
                take: 30
            }
        }
    });

    if (!player) {
        return <div className="p-20 text-center text-white">Player not found</div>;
    }

    const latest = player.dailyWellness[0];
    const meting: Meting = {
        belastingRPE: latest?.sessionLoad || 0,
        pijn: 0,
        slaapKwaliteit: latest?.sleepHours ? (latest.sleepHours > 7 ? 5 : latest.sleepHours > 6 ? 4 : 3) : 3,
        energie: 4,
        stemming: 4,
        hydratatie: latest?.hydrationIntake || 3,
        voeding: 4
    };

    const risk = calculateRisk(meting);

    // Calculate averages for KPI tiles
    const avgRPE = player.dailyWellness.length > 0
        ? (player.dailyWellness.reduce((acc: number, w: any) => acc + w.sessionLoad, 0) / player.dailyWellness.length).toFixed(1)
        : "0";

    const avgSleep = player.dailyWellness.length > 0
        ? (player.dailyWellness.reduce((acc: number, w: any) => acc + (w.sleepHours || 0), 0) / player.dailyWellness.length).toFixed(1)
        : "0";

    return (
        <>
            <ModernDashboardHeader title={`Profile: ${player.name}`} subtitle="Individueel prestatie en wellness diepte-analyse" />

            <div className="p-8 space-y-8 max-w-[1600px] mx-auto text-white">

                {/* Back Link */}
                <Link href="/dashboard/team" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Terug naar Team Overzicht
                </Link>

                {/* Player Profile Hero */}
                <div className="relative rounded-[40px] overflow-hidden bg-[#121214] border border-white/5 p-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent"></div>

                    <div className="relative z-10 text-zinc-200">
                        <div className="w-32 h-32 rounded-[32px] bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden">
                            <span className="text-4xl font-black text-zinc-700">{player.name.charAt(0)}</span>
                        </div>
                    </div>

                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <h2 className="text-5xl font-black tracking-tighter mb-4">{player.name}</h2>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <span className="px-4 py-1.5 rounded-xl bg-zinc-900/80 border border-white/5 text-zinc-400 text-xs font-black uppercase tracking-widest">
                                Selectie A • #??
                            </span>
                            <span className={`px-4 py-1.5 rounded-xl border ${risk.bgClass} ${risk.colorClass} text-xs font-black uppercase tracking-widest flex items-center gap-2`}>
                                <div className={`w-2 h-2 rounded-full ${risk.colorClass.replace('text-', 'bg-')} shadow-lg`}></div> {risk.level.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 flex gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-[32px] backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Risico Score</p>
                                    <p className={`text-2xl font-black ${risk.colorClass}`}>{risk.score}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard label="Gem. RPE (30d)" value={avgRPE} icon={<Activity className="w-5 h-5 text-indigo-400" />} sub="Training Load" />
                    <StatCard label="Gem. Slaap (30d)" value={`${avgSleep}h`} icon={<Moon className="w-5 h-5 text-accent" />} sub="Herstel Duur" />
                    <StatCard label="Wellness Index" value="81" icon={<Zap className="w-5 h-5 text-emerald-400" />} sub="Fysieke Status" />
                    <StatCard label="Compliance" value="100%" icon={<CheckCircle className="w-5 h-5 text-orange-400" />} sub="Inzet Metingen" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Detailed Performance Chart */}
                    <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-[40px] p-10">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-xl font-bold">Belasting Ontwikkeling</h3>
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Laatste 14 dagen</div>
                        </div>
                        <div className="h-[400px] w-full relative">
                            <div className="absolute inset-0 flex items-end justify-between px-2">
                                {player.dailyWellness.slice(0, 14).reverse().map((w: any, i: number) => (
                                    <div key={i} className="flex flex-col items-center gap-2 group flex-1 max-w-[50px]">
                                        <div className="relative w-full px-1">
                                            <div
                                                className="w-full bg-accent/20 border border-accent/30 rounded-t-xl group-hover:bg-accent/40 group-hover:border-accent transition-all duration-300"
                                                style={{ height: `${(w.sessionLoad / 10) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-[9px] font-bold text-zinc-700 whitespace-nowrap">
                                            {new Date(w.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Wellness Stats Tile Grid */}
                    <div className="bg-[#121214] border border-white/5 rounded-[40px] p-10">
                        <h3 className="text-xl font-bold mb-8">Laatste Wellness</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <WellnessCard label="RPE Load" value={latest?.sessionLoad.toString() || "0"} icon={<Activity className="w-4 h-4 text-orange-500" />} />
                            <WellnessCard label="Slaapuren" value={latest?.sleepHours?.toFixed(1) || "0"} icon={<Moon className="w-4 h-4 text-indigo-400" />} />
                            <WellnessCard label="Hydratatie" value={latest?.hydrationIntake?.toString() || "0"} icon={<Droplets className="w-4 h-4 text-accent" />} />
                            <WellnessCard label="Urine Kleur" value={latest?.urineColorMorning?.toString() || "0"} icon={<Zap className="w-4 h-4 text-amber-500" />} />
                        </div>

                        <div className="mt-10 p-6 bg-accent/5 border border-accent/10 rounded-3xl">
                            <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-3">Speler Opmerking</p>
                            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                                {latest?.notes || "Geen opmerkingen bij de laatste meting."}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

function StatCard({ label, value, icon, sub }: { label: string, value: string, icon: React.ReactNode, sub: string }) {
    return (
        <div className="bg-[#121214] border border-white/5 rounded-[32px] p-8 group hover:border-accent/30 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full -mr-14 -mt-14 group-hover:bg-accent/10 transition-all duration-700"></div>
            <div className="relative z-10 flex items-center gap-6">
                <div className="p-3.5 bg-zinc-900 rounded-2xl border border-white/5 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all">
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">{label}</p>
                    <div className="text-3xl font-black text-white">{value}</div>
                </div>
            </div>
        </div>
    );
}

function WellnessCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all cursor-default">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-xl font-black text-white">{value}</div>
        </div>
    );
}
