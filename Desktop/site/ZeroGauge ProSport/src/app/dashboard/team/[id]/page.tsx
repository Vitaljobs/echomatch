import { prisma } from "@/lib/prisma";
import { calculateRisk, Meting } from "@/lib/riskCalculator";
import ModernDashboardHeader from "@/components/ModernDashboardHeader";
import MessagesPanel from "@/components/MessagesPanel";
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    ChevronLeft,
    Mail
} from "lucide-react";
import Link from 'next/link';

export default async function TeamPlayerDetail({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const player = await prisma.player.findUnique({
        where: { id },
        include: {
            dailyWellness: {
                orderBy: { date: 'desc' },
                take: 7
            }
        }
    });

    if (!player) return <div className="p-10 text-white">Speler niet gevonden.</div>;

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

    return (
        <>
            <ModernDashboardHeader title={player.name} subtitle="Speler Profiel & Communicatie" />

            <section className="pt-8 px-8 pb-24 text-white">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-8">
                        <Link href="/dashboard/team" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wide">
                            <ChevronLeft className="w-4 h-4" /> Terug naar Team
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Player Stats Column */}
                        <div className="space-y-6">
                            <div className="bg-[#121214] border border-white/5 rounded-[32px] p-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center font-mono text-2xl font-bold text-zinc-500">
                                        {player.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black">{player.name}</h2>
                                        <p className="text-zinc-500 font-medium">{player.position || "Speler"}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                                        <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Huidig Risico</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide border ${risk.bgClass} ${risk.colorClass}`}>
                                            {risk.score} / 100
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                                        <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Status</span>
                                        <span className={`flex items-center gap-2 ${player.isActive ? 'text-emerald-500' : 'text-red-500'} font-bold text-sm`}>
                                            {player.isActive ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                            {player.isActive ? 'Actief' : 'Non-actief'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messaging Column */}
                        <div className="lg:col-span-2 h-[600px]">
                            <MessagesPanel playerId={player.id} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
