import Header from "@/components/Header";
import { calculateRisk, Meting, evaluateCheckInStatus } from "@/lib/riskCalculator";
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import CoachCheckInFeed from "@/components/CoachCheckInFeed";
import CoachPulseForm from "@/components/CoachPulseForm";
import RecentMessagesWidget from "@/components/RecentMessagesWidget";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { isToday, isYesterday } from "date-fns";
import UpgradeButton from "@/components/UpgradeButton";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    // Simple role check (if needed, or just allow all authenticated for now and assume layout handles nav)
    if (!session) {
        redirect("/auth/login");
    }

    const user = session.user as any;
    if (user.role === 'PLAYER') {
        redirect("/dashboard/personal");
    }

    // Fetch fresh user data to check subscription status
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { stripeSubscriptionId: true }
    });

    const isPro = !!dbUser?.stripeSubscriptionId;

    // Fetch players with their LATEST daily wellness
    const players = await prisma.player.findMany({
        where: { isActive: true },
        include: {
            dailyWellness: {
                orderBy: { date: 'desc' },
                take: 1
            }
        }
    });

    // Map to simple structure
    const teamData = players.map(p => {
        const w = p.dailyWellness[0];
        // Default meting
        const meting: Meting = w ? {
            ...w,
            belastingRPE: w.sessionLoad || 0,
            pijn: w.pijn || 0,
            slaapKwaliteit: w.sleepKwaliteit || 3,
            energie: w.energie || 3,
            stemming: w.stemming || 3,
            hydratatie: w.hydratatie || 3,
            voeding: w.voeding || 3,
        } as any : {
            belastingRPE: 0, pijn: 0, slaapKwaliteit: 3, energie: 3, stemming: 3, hydratatie: 3, voeding: 3
        };

        return {
            id: p.id,
            name: p.name,
            position: p.position || "Speler",
            photoUrl: p.photoUrl,
            meting,
            lastCheckIn: w
        };
    });

    // Valid check-ins for the feed
    const checkInItems = teamData.map(p => {
        const hasCheckIn = !!p.lastCheckIn;
        const date = hasCheckIn ? new Date(p.lastCheckIn!.date) : new Date(0); // Old date if none
        const isRecent = hasCheckIn && (isToday(date) || isYesterday(date));
        const status = evaluateCheckInStatus(p.meting);

        return {
            player: { id: p.id, name: p.name, photoUrl: p.photoUrl || undefined },
            date: date,
            status: status,
            notes: p.lastCheckIn?.notes || undefined,
            isRecent: isRecent,
            lastCheckIn: p.lastCheckIn || undefined
        };
    })
        // Sort: Recent first, then by date
        .sort((a, b) => {
            if (a.isRecent && !b.isRecent) return -1;
            if (!a.isRecent && b.isRecent) return 1;
            return b.date.getTime() - a.date.getTime();
        });

    return (
        <main className="min-h-screen bg-[#050509] text-white font-sans">
            <Header />

            <section className="pt-32 px-6 pb-24 max-w-[1800px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm font-semibold text-blue-500 mb-4 uppercase tracking-wider">
                            Team Dashboard
                        </span>
                        <h1 className="text-4xl font-bold tracking-tight">Selectie Overzicht</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {!isPro && <UpgradeButton />}

                        {/* Legenda */}
                        <div className="flex gap-4 px-6 py-3 bg-[#121214] rounded-full border border-white/5">
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> Laag
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span> Midden
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span> Hoog
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">

                    {/* LEFT COLUMN: Analytics & Table */}
                    <div className="space-y-8">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* High Risk Count */}
                            <div className="bg-[#121214] border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <AlertTriangle className="w-24 h-24 text-red-500" />
                                </div>
                                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Hoog Risico</h3>
                                <div className="text-5xl font-black text-white mb-2">
                                    {teamData.filter(p => calculateRisk(p.meting).score >= 60).length} <span className="text-lg text-zinc-600 font-medium">spelers</span>
                                </div>
                                <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300">
                                    Bekijk details <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {/* Avg RPE */}
                            <div className="bg-[#121214] border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Activity className="w-24 h-24 text-blue-500" />
                                </div>
                                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Team Belasting</h3>
                                <div className="text-5xl font-black text-white mb-2">
                                    {(teamData.length > 0 ? (teamData.reduce((acc, p) => acc + p.meting.belastingRPE, 0) / teamData.length) : 0).toFixed(1)}
                                </div>
                                <p className="text-sm font-bold text-zinc-500">Gemiddelde RPE Score</p>
                            </div>

                            {/* Compliance */}
                            <div className="bg-[#121214] border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <CheckCircle className="w-24 h-24 text-emerald-500" />
                                </div>
                                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Vandaag Ingevuld</h3>
                                <div className="text-5xl font-black text-white mb-2">
                                    {checkInItems.filter(i => i.isRecent && isToday(i.date)).length}/{teamData.length}
                                </div>
                                <p className="text-sm font-bold text-zinc-500">Spelers gereed</p>
                            </div>
                        </div>

                        {/* Players Table */}
                        <div className="bg-[#121214] border border-white/5 rounded-[40px] overflow-hidden">
                            <div className="p-8 border-b border-white/5 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Speler Overzicht</h3>
                                <button className="px-4 py-2 bg-zinc-900 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                                    Exporteer CSV
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 text-zinc-500 text-xs uppercase tracking-[0.15em]">
                                            <th className="p-6 font-bold">Speler</th>
                                            <th className="p-6 font-bold">Positie</th>
                                            <th className="p-6 font-bold text-center">RPE</th>
                                            <th className="p-6 font-bold text-center">Slaap</th>
                                            <th className="p-6 font-bold text-center">Score</th>
                                            <th className="p-6 font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {teamData.map((player) => {
                                            const risk = calculateRisk(player.meting);
                                            return (
                                                <tr key={player.id} className="hover:bg-white/5 transition-colors group">
                                                    <td className="p-6 font-bold text-white flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                                                            {player.photoUrl ? <img src={player.photoUrl} className="w-full h-full object-cover" /> : null}
                                                        </div>
                                                        <Link href={`/admin/players/${player.id}`} className="hover:underline decoration-blue-500 underline-offset-4">
                                                            {player.name}
                                                        </Link>
                                                    </td>
                                                    <td className="p-6 text-zinc-400 text-sm font-medium">
                                                        {player.position}
                                                    </td>
                                                    <td className="p-6 text-center text-zinc-300 font-bold font-mono">
                                                        {player.meting.belastingRPE}
                                                    </td>
                                                    <td className="p-6 text-center text-zinc-300 font-bold font-mono">
                                                        {player.meting.slaapKwaliteit}
                                                    </td>
                                                    <td className="p-6 text-center">
                                                        <span className="font-mono font-black text-lg text-white">{risk.score}</span>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${risk.bgClass} ${risk.colorClass}`}>
                                                            {risk.level === 'low' && <CheckCircle className="w-3 h-3" />}
                                                            {risk.level === 'medium' && <TrendingUp className="w-3 h-3" />}
                                                            {risk.level === 'high' && <AlertTriangle className="w-3 h-3" />}
                                                            {risk.level === 'low' ? 'FIT' : risk.level === 'medium' ? 'CHECKEN' : 'RISICO'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Feed & Actions */}
                    <div className="space-y-6">

                        {/* Pulse Composer */}
                        <CoachPulseForm players={teamData.map(p => ({ id: p.id, name: p.name }))} />


                        <div className="h-[300px] mb-6">
                            <RecentMessagesWidget />
                        </div>

                        <div className="bg-[#121214] border border-white/5 rounded-[32px] p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-[0.15em]">Laatste Check-ins</h3>
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            </div>

                            <CoachCheckInFeed items={checkInItems} />

                            <div className="mt-6 pt-6 border-t border-white/5 text-center">
                                <Link href="/admin/players" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                                    Bekijk alle spelers
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
