"use client";

import { useEffect, useState } from "react";
import { Zap, CheckCircle, Clock, AlertCircle } from "lucide-react";

type Pulse = {
    id: string;
    content: string;
    createdAt: string;
    actionType: string;
    linkedDailyWellnessId?: string | null;
    linkedDailyWellness?: { createdAt: string };
    recipientId: string; // "ALL" or player ID
    actionLabel?: string;
};

export default function CoachPulseMonitor() {
    const [pulses, setPulses] = useState<Pulse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPulses();
    }, []);

    const fetchPulses = async () => {
        try {
            const res = await fetch('/api/messages?box=sent&type=PULSE');
            if (res.ok) {
                const data = await res.json();
                setPulses(data);
            }
        } catch (error) {
            console.error("Failed to fetch pulses", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="py-4 text-center text-zinc-600 text-xs">Laden van pulses...</div>;

    if (pulses.length === 0) {
        return (
            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-900 mx-auto mb-3 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-zinc-600" />
                </div>
                <p className="text-zinc-500 text-sm">Nog geen actieve pulses verstuurd.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#121214] border border-white/5 rounded-[32px] p-6 mt-6">
            <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" /> Recente Pulses
            </h3>

            <div className="space-y-3">
                {pulses.slice(0, 5).map(pulse => (
                    <div key={pulse.id} className="bg-black/20 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white line-clamp-1">"{pulse.content}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase font-bold">
                                    {pulse.actionLabel || "Pulse"}
                                </span>
                                <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {new Date(pulse.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>

                        {/* Status Indicator */}
                        <div>
                            {pulse.linkedDailyWellnessId ? (
                                <div className="flex flex-col items-center">
                                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                                    <span className="text-[9px] font-bold text-emerald-500 mt-1 uppercase">Voltooid</span>
                                    {pulse.linkedDailyWellness && (
                                        <span className="text-[9px] text-emerald-500/70 font-mono">
                                            {new Date(pulse.linkedDailyWellness.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center opacity-50">
                                    <div className="w-6 h-6 rounded-full border-2 border-dashed border-zinc-600 animate-spin-slow"></div>
                                    <span className="text-[9px] font-bold text-zinc-500 mt-1 uppercase">Open</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

