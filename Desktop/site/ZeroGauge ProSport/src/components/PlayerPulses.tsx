"use client";

import { useEffect, useState } from "react";
import { Zap, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useRouter } from "next/navigation";

type Pulse = {
    id: string;
    title: string | null;
    content: string;
    validUntil: string | null;
    actionLink: string | null;
    actionLabel: string | null;
    linkedDailyWellnessId: string | null;
    createdAt: string;
};

export default function PlayerPulses({ playerId }: { playerId: string }) {
    const [pulses, setPulses] = useState<Pulse[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPulses();
    }, [playerId]);

    const fetchPulses = async () => {
        try {
            const res = await fetch(`/api/messages?playerId=${playerId}`);
            if (res.ok) {
                const messages = await res.json();

                // Filter for active pulses only
                const activePulses = messages.filter((m: any) => {
                    // Must be PULSE type
                    if (m.type !== 'PULSE') return false;

                    // Must not be completed (linkedDailyWellnessId should be null)
                    if (m.linkedDailyWellnessId) return false;

                    // Must have validUntil (filter out old pulses without expiry)
                    if (!m.validUntil) return false;

                    // Must not be expired
                    const validDate = new Date(m.validUntil);
                    if (validDate < new Date()) return false;

                    return true;
                });

                setPulses(activePulses);
            }
        } catch (error) {
            console.error("Failed to fetch pulses:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#121214] border border-white/5 rounded-[32px] p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-zinc-800 rounded w-1/3"></div>
                    <div className="h-20 bg-zinc-800 rounded"></div>
                </div>
            </div>
        );
    }

    if (pulses.length === 0) {
        return (
            <div className="bg-[#121214] border border-white/5 rounded-[32px] p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600/10 rounded-full">
                        <Zap className="w-6 h-6 text-blue-500 fill-blue-500/20" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Actieve Pulses</h3>
                        <p className="text-zinc-500 text-xs">Geen actieve pulses op dit moment</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#121214] border border-white/5 rounded-[32px] p-8 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600/10 rounded-full">
                    <Zap className="w-6 h-6 text-blue-500 fill-blue-500/20" />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Actieve Pulses</h3>
                    <p className="text-zinc-500 text-xs">{pulses.length} {pulses.length === 1 ? 'pulse' : 'pulses'} beschikbaar</p>
                </div>
            </div>

            <div className="space-y-4">
                {pulses.map((pulse) => (
                    <div
                        key={pulse.id}
                        className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 space-y-4 hover:border-blue-500/40 transition-all"
                    >
                        {/* Title */}
                        {pulse.title && (
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-blue-400" />
                                {pulse.title}
                            </h4>
                        )}

                        {/* Content */}
                        <p className="text-slate-300 text-sm leading-relaxed">{pulse.content}</p>

                        {/* Validity Date */}
                        {pulse.validUntil && (
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <Calendar className="w-4 h-4" />
                                <span>Geldig tot: {format(new Date(pulse.validUntil), 'd MMMM yyyy', { locale: nl })}</span>
                            </div>
                        )}

                        {/* Action Button */}
                        {pulse.actionLink && pulse.actionLabel && (
                            <button
                                onClick={() => router.push(pulse.actionLink!)}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                            >
                                {pulse.actionLabel}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
