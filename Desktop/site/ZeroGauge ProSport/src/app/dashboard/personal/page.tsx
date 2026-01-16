import { prisma } from "@/lib/prisma";
import { calculateRisk, Meting } from "@/lib/riskCalculator";
import ModernDashboardHeader from "@/components/ModernDashboardHeader";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import {
    Clock,
    Activity,
    Zap,
    Flame,
    Droplets,
    Moon,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    BarChart2
} from "lucide-react";
import { PlayerSelect } from "@/components/PlayerSelect";
import MessagesPanel from "@/components/MessagesPanel";
import PlayerPulses from "@/components/PlayerPulses";
import WellnessGauge from "@/components/WellnessGauge";
import HistoricalTrend from "@/components/HistoricalTrend";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function PersonalDashboard(props: Props) {
    const searchParams = await props.searchParams;
    const session = await getServerSession(authOptions);
    const user = session?.user as any;

    if (!session || (user.role !== "PLAYER" && user.role !== "COACH")) {
        redirect("/auth/login");
    }

    let playerId = user.playerId as string;
    let allPlayers: { id: string; name: string }[] = [];

    // COACH LOGIC: Allow viewing ANY player
    if (user.role === 'COACH') {
        // Fetch all players for the dropdown
        allPlayers = await prisma.player.findMany({
            where: { isActive: true },
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        });

        // Determine which player to view:
        // 1. Search Param ?playerId=...
        // 2. First player in the list
        if (typeof searchParams?.playerId === 'string') {
            playerId = searchParams.playerId;
        } else if (allPlayers.length > 0) {
            playerId = allPlayers[0].id;
        }
    }

    if (!playerId) {
        return (
            <div className="p-20 text-center text-white">
                <h1 className="text-2xl font-bold mb-4">Geen Speler Profiel Gevonden</h1>
                <p className="text-zinc-400 mb-6">Je account (ID: {user.id}) is nog niet gekoppeld aan een speler.</p>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl inline-block text-left text-sm">
                    <p className="font-bold text-red-400">Instructie voor Coach:</p>
                    <p className="text-zinc-400">Ga naar Admin &rarr; Spelers en koppel dit account aan een speler.</p>
                </div>
            </div>
        );
    }

    const player = await prisma.player.findFirst({
        where: { id: playerId },
        include: {
            dailyWellness: {
                orderBy: { date: 'desc' },
                take: 30
            }
        }
    });

    if (!player) {
        return <div className="p-20 text-center text-white text-3xl font-black">Speler profiel niet gevonden.</div>;
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

    const avgRPE = player.dailyWellness.length > 0
        ? (player.dailyWellness.reduce((acc: number, w: any) => acc + w.sessionLoad, 0) / player.dailyWellness.length).toFixed(1)
        : "0";

    const avgSleep = player.dailyWellness.length > 0
        ? (player.dailyWellness.reduce((acc: number, w: any) => acc + (w.sleepHours || 0), 0) / player.dailyWellness.length).toFixed(1)
        : "0";

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 pt-8 max-w-[1600px] mx-auto gap-4">
                <ModernDashboardHeader
                    title={user.role === 'COACH' ? "Coach Analytics View" : "Athlete Dashboard"}
                    subtitle={`ZeroGauge ProSport – ${player.name}`}
                    riskScore={risk.score}
                    user={{
                        name: user.name || "User",
                        role: user.role,
                        photoUrl: user.image || undefined
                    }}
                />

                {user.role === 'COACH' && (
                    <div className="w-full md:w-64">
                        <PlayerSelect players={allPlayers} currentId={playerId} />
                    </div>
                )}
            </div>

            {/* Athlete Dashboard Content */}
            <div className="p-8 space-y-8 max-w-[1600px] mx-auto text-white">

                {/* Profile Hero Block */}
                <div className="relative rounded-[40px] overflow-hidden bg-[#121214] border border-white/5 p-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent"></div>

                    <div className="relative z-10">
                        <ProfileImageUpload initialImage={player.photoUrl || "/avatars/ronald.jpg"} playerId={player.id} />
                    </div>

                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                            <h2 className="text-4xl font-black tracking-tight text-white">{player.name}</h2>
                            <div className="flex gap-2 justify-center md:justify-start">
                                <span className="px-4 py-1.5 rounded-full bg-accent/20 border border-accent/50 text-accent text-xs font-black uppercase tracking-widest">
                                    Middenvelder • #10
                                </span>
                                <span className={`px-4 py-1.5 rounded-full border ${risk.bgClass} ${risk.colorClass} text-xs font-black uppercase tracking-widest flex items-center gap-2`}>
                                    <CheckCircle className={`w-3 h-3 ${risk.colorClass.replace('text-', 'fill-')}`} /> {risk.level === 'low' ? 'Fit' : risk.level.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <p className="text-zinc-500 max-w-lg font-medium leading-relaxed mb-6">
                            Jouw persoonlijke prestaties en wellness overzicht. Je herstelscore is {risk.score < 30 ? 'optimaal' : 'aandachtspunt'} voor de training van vandaag.
                        </p>

                        {/* Check-in CTA - Conditionally could be hidden if already done, but kept visible for demo/updates */}
                        <div className="flex justify-center md:justify-start">
                            <a href="/daily-check-in" className="group relative px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-3 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <Zap className="w-5 h-5 text-black fill-black" />
                                Start Check-in
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    <div className="relative z-10 bg-zinc-900/50 border border-white/5 p-6 rounded-[32px] backdrop-blur-md">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Huidige Streak</p>
                            <div className="text-4xl font-black text-white flex items-center justify-center gap-2">
                                14 <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
                            </div>
                            <p className="text-[10px] font-bold text-zinc-500 mt-2">Dagen op rij ingevuld</p>
                        </div>
                    </div>
                </div>

                {/* Kern-KPI's Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard label="Gem. RPE (30d)" value={avgRPE} icon={<Activity className="w-6 h-6 text-indigo-400" />} sub="Matige belasting" />
                    <StatCard label="Gem. Slaap (30d)" value={`${avgSleep}h`} icon={<Moon className="w-6 h-6 text-accent" />} sub="Boven gemiddeld" />
                    <StatCard label="Wellness Score" value="84" icon={<Zap className="w-6 h-6 text-emerald-400" />} sub="gebaseerd op slaap, vermoeidheid, stress" />
                    <StatCard label="Compliance" value="100%" icon={<CheckCircle className="w-6 h-6 text-orange-400" />} sub="14 / 14 dagen ingevuld" />
                </div>

                <div className="space-y-8">
                    {/* Primary Grid: Chart (Left) + Messages (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] gap-6">
                        {/* Main Performance Graph */}
                        <div className="bg-[#121214] border border-white/5 rounded-[40px] p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold">Huidige Status</h3>
                                    <p className="text-sm text-zinc-500 mt-1">Laatste check-in waarden</p>
                                </div>
                            </div>

                            <WellnessGauge
                                rpeValue={latest?.sessionLoad || 0}
                                sleepValue={latest?.sleepHours || 0}
                            />
                        </div>

                        {/* Right Column: Pulses + Messages */}
                        <div className="space-y-6">
                            {/* Active Pulses */}
                            <PlayerPulses playerId={player.id} />

                            {/* Messages Panel */}
                            <section className="bg-[#121214] rounded-2xl p-0 border border-white/5 flex flex-col">
                                <div className="px-6 pt-5 pb-3 border-b border-white/5">
                                    <h3 className="text-sm font-semibold tracking-[0.12em] text-zinc-400 uppercase">
                                        Berichten
                                    </h3>
                                </div>
                                <div className="flex-1 px-6 py-4">
                                    <MessagesPanel playerId={player.id} role="player" className="h-full" />
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Secondary Row: Historical Trend + Latest Check-in */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Historical Trend Chart */}
                        <HistoricalTrend
                            data={player.dailyWellness.map((w: any) => ({
                                date: new Date(w.date),
                                sessionLoad: w.sessionLoad || 0,
                                sleepHours: w.sleepHours || 0
                            }))}
                        />

                        {/* Vandaag Check-in */}
                        <div className="bg-[#121214] border border-white/5 rounded-[40px] p-8">
                            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-6">Laatste Check-in</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400 font-medium">RPE Belasting</span>
                                    <span className="text-2xl font-black">{latest?.sessionLoad || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400 font-medium">Slaapkwaliteit</span>
                                    <span className="text-2xl font-black text-emerald-400">{latest?.sleepHours?.toFixed(1) || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400 font-medium">Hydratatie</span>
                                    <div className="flex gap-1">
                                        {Array.from({ length: latest?.hydrationIntake || 0 }).map((_, i) => <Droplets key={i} className="w-4 h-4 text-accent fill-accent" />)}
                                        {Array.from({ length: 5 - (latest?.hydrationIntake || 0) }).map((_, i) => <Droplets key={i} className="w-4 h-4 text-zinc-800" />)}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-xs text-zinc-500 italic">"{latest?.notes || "Geen opmerkingen."}"</p>
                                </div>
                            </div>
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-all duration-700"></div>
            <div className="relative z-10 text-zinc-200">
                <div className="p-3 bg-zinc-900 rounded-2xl w-fit mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">{label}</p>
                <div className="text-4xl font-black tracking-tight mb-2 text-white">{value}</div>
                <p className="text-xs text-zinc-600 font-bold">{sub}</p>
            </div>
        </div>
    );
}
