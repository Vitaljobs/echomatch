import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

import { calculateRisk, Meting } from "@/lib/riskCalculator";
import ModernDashboardHeader from "@/components/ModernDashboardHeader";
import {
    Users,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    Activity,
    Search,
    Filter,
    Calendar
} from "lucide-react";
import Link from 'next/link';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export default async function TeamDashboard() {
    // Fetch players with their latest wellness record
    const players = await prisma.player.findMany({
        include: {
            dailyWellness: {
                orderBy: { date: 'desc' },
                take: 1
            }
        }
    });

    // Map database data to our view model
    const teamData = players.map(p => {
        const latest = p.dailyWellness[0];
        const meting: Meting = {
            belastingRPE: latest?.sessionLoad || 0,
            pijn: 0, // Not in simple DailyWellness yet
            slaapKwaliteit: latest?.sleepHours ? (latest.sleepHours > 7 ? 5 : latest.sleepHours > 6 ? 4 : 3) : 3,
            energie: 4,
            stemming: 4,
            hydratatie: latest?.hydrationIntake || 3,
            voeding: 4
        };

        return {
            id: p.id,
            name: p.name,
            position: "Selectie A Speler", // Needs position in DB eventually
            number: 0, // Needs number in DB eventually
            meting,
            lastCheckInDate: latest?.date || null
        };
    });

    const highRiskCount = teamData.filter(p => calculateRisk(p.meting).score >= 70).length;
    const avgLoad = teamData.length > 0
        ? (teamData.reduce((acc, p) => acc + p.meting.belastingRPE, 0) / teamData.length).toFixed(1)
        : "0";

    return (
        <>
            <ModernDashboardHeader title="Team Overview" subtitle="Monitor selectie prestaties en risico's" />

            <section className="pt-8 px-8 pb-24 text-white">
                <div className="max-w-[1600px] mx-auto">

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard label="Selectie Omvang" value={teamData.length.toString()} icon={<Users className="w-6 h-6 text-indigo-400" />} sub="Actieve spelers" />
                        <StatCard label="Kritieke Risico's" value={highRiskCount.toString()} icon={<AlertTriangle className="w-6 h-6 text-red-500" />} sub="Directe actie vereist" highlight={highRiskCount > 0 ? "text-red-500" : "text-white"} />
                        <StatCard label="Team Compliance" value="100%" icon={<CheckCircle className="w-6 h-6 text-emerald-500" />} sub="Metingen ingevuld" />
                        <StatCard label="Gem. Belasting" value={avgLoad} icon={<Activity className="w-6 h-6 text-accent" />} sub="Laatste sessie" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Risk Distribution Chart */}
                        <div className="lg:col-span-1 bg-[#121214] border border-white/5 rounded-[40px] p-10 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-8">Risico Verdeling</h3>
                                <div className="relative w-64 h-64 mx-auto mb-8">
                                    <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                                        <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-zinc-900" strokeWidth="3" />
                                        {(() => {
                                            const high = teamData.filter(p => calculateRisk(p.meting).score >= 70).length;
                                            const mid = teamData.filter(p => { const s = calculateRisk(p.meting).score; return s >= 30 && s < 70; }).length;
                                            const low = teamData.filter(p => calculateRisk(p.meting).score < 30).length;
                                            const total = teamData.length;

                                            const hP = (high / total) * 100;
                                            const mP = (mid / total) * 100;
                                            const lP = (low / total) * 100;

                                            return (high > 0 || mid > 0 || low > 0) ? (
                                                <>
                                                    <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-red-500" strokeWidth="4" strokeDasharray={`${hP} ${100 - hP}`} strokeLinecap="round" />
                                                    <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-amber-400" strokeWidth="4" strokeDasharray={`${mP} ${100 - mP}`} strokeDashoffset={-hP} strokeLinecap="round" />
                                                    <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-emerald-500" strokeWidth="4" strokeDasharray={`${lP} ${100 - lP}`} strokeDashoffset={-(hP + mP)} strokeLinecap="round" />
                                                </>
                                            ) : null;
                                        })()}
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black">{teamData.length}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Selectie</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <LegendItem color="bg-red-500" label="Hoog Risico" count={teamData.filter(p => calculateRisk(p.meting).score >= 70).length} />
                                <LegendItem color="bg-amber-400" label="Medium Risico" count={teamData.filter(p => { const s = calculateRisk(p.meting).score; return s >= 30 && s < 70; }).length} />
                                <LegendItem color="bg-emerald-500" label="Laag Risico" count={teamData.filter(p => calculateRisk(p.meting).score < 30).length} />
                            </div>
                        </div>

                        {/* Selection Table Card */}
                        <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-[40px] p-4">
                            <div className="p-8 flex items-center justify-between">
                                <h3 className="text-xl font-bold">Speler Lijst</h3>
                                <div className="flex items-center gap-4">
                                    <div className="relative text-zinc-300">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input type="text" placeholder="Zoek speler..." className="bg-zinc-900/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent/50" />
                                    </div>
                                    <button className="p-2.5 bg-zinc-900 border border-white/5 rounded-xl hover:bg-zinc-800 transition-all">
                                        <Filter className="w-4 h-4 text-zinc-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto px-4 pb-4">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                                            <th className="px-6 py-4">Speler</th>
                                            <th className="px-6 py-4">Positie</th>
                                            <th className="px-6 py-4 text-center">Laatste Check-in</th>
                                            <th className="px-6 py-4 text-center">RPE</th>
                                            <th className="px-6 py-4 text-center">Score</th>
                                            <th className="px-6 py-4 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.02]">
                                        {teamData.map((player) => {
                                            const risk = calculateRisk(player.meting);
                                            return (
                                                <tr key={player.id} className="group hover:bg-white/[0.02] transition-all cursor-pointer">
                                                    <td className="px-6 py-5">
                                                        <Link href={`/dashboard/team/${player.id}`} className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center font-bold text-zinc-400 group-hover:border-accent/50 transition-all font-mono">
                                                                {player.id.split('-').pop()?.slice(0, 2).toUpperCase() || "??"}
                                                            </div>
                                                            <span className="font-bold group-hover:text-accent transition-colors">{player.name}</span>
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-zinc-500 text-sm font-medium">{player.position}</span>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        {player.lastCheckInDate ? (
                                                            <div className="flex flex-col items-center gap-0.5">
                                                                <span className="text-xs font-bold text-white">
                                                                    {format(new Date(player.lastCheckInDate), 'd MMM yyyy', { locale: nl })}
                                                                </span>
                                                                <span className="text-[10px] font-mono text-zinc-500">
                                                                    {format(new Date(player.lastCheckInDate), 'HH:mm', { locale: nl })}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-zinc-600 italic">Geen data</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className="font-mono font-bold text-zinc-400">{player.meting.belastingRPE}</span>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className={`text-lg font-black ${risk.colorClass}`}>
                                                            {risk.score}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${risk.bgClass} ${risk.colorClass} text-[10px] font-black uppercase tracking-wider`}>
                                                            {risk.level === 'high' ? <AlertTriangle className="w-3 h-3" /> : risk.level === 'medium' ? <TrendingUp className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                                            {risk.level}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function StatCard({ label, value, icon, sub, highlight = "text-white" }: { label: string, value: string, icon: React.ReactNode, sub: string, highlight?: string }) {
    return (
        <div className="bg-[#121214] border border-white/5 rounded-[40px] p-8 group hover:border-accent/30 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-all duration-700"></div>
            <div className="relative z-10">
                <div className="p-3 bg-zinc-900 rounded-2xl w-fit mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">{label}</p>
                <div className={`text-4xl font-black tracking-tight mb-2 ${highlight}`}>{value}</div>
                <p className="text-xs text-zinc-600 font-bold">{sub}</p>
            </div>
        </div>
    );
}

function LegendItem({ color, label, count }: { color: string, label: string, count: number }) {
    return (
        <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <span className="text-xs font-bold text-zinc-400">{label}</span>
            </div>
            <span className="font-mono font-black">{count}</span>
        </div>
    );
}
