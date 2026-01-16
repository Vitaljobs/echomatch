"use client";

import { CheckCircle, Clock, MessageSquare, AlertTriangle, TrendingUp, Send, ChevronRight, X, User } from "lucide-react";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { nl } from "date-fns/locale";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CheckInStatus = {
    color: 'green' | 'orange' | 'red';
    label: string;
    bgClass: string;
    textClass: string;
};

type CheckInItem = {
    player: {
        id: string;
        name: string;
        photoUrl?: string;
    };
    date: Date;
    status: CheckInStatus;
    notes?: string;
    isRecent: boolean;
    // Add ID to item to allow updates
    lastCheckIn?: any;
};

export default function CoachCheckInFeed({ items }: { items: CheckInItem[] }) {
    const [selectedItem, setSelectedItem] = useState<CheckInItem | null>(null);
    const [feedback, setFeedback] = useState("");
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const openFeedback = (item: CheckInItem) => {
        setSelectedItem(item);
        setFeedback(item.lastCheckIn?.coachFeedback || "");
    };

    const closeFeedback = () => {
        setSelectedItem(null);
        setFeedback("");
    };

    const saveFeedback = async () => {
        if (!selectedItem?.lastCheckIn?.id) return;

        setSaving(true);
        try {
            const res = await fetch('/api/daily-wellness', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedItem.lastCheckIn.id,
                    coachFeedback: feedback
                })
            });

            if (res.ok) {
                // Success! Close and perhaps refresh?
                closeFeedback();
                router.refresh();
            } else {
                alert("Opslaan mislukt");
            }
        } catch (e) {
            console.error(e);
            alert("Er ging iets mis");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-3">
            {items.map((item, idx) => {
                const dateLabel = isToday(new Date(item.date))
                    ? `Vandaag, ${format(new Date(item.date), 'HH:mm')}`
                    : isYesterday(new Date(item.date))
                        ? `Gisteren, ${format(new Date(item.date), 'HH:mm')}`
                        : format(new Date(item.date), 'dd MMM, HH:mm');

                return (
                    <div key={idx} className={`bg-[#121214] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-colors ${!item.isRecent ? 'opacity-50 grayscale' : ''}`}>

                        {/* LEFT: Name + Time */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 overflow-hidden border border-white/5">
                                {item.player.photoUrl ? (
                                    <img src={item.player.photoUrl} alt={item.player.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-6 h-6" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{item.player.name}</h4>
                                <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                                    <Clock className="w-3 h-3" />
                                    {dateLabel}
                                </p>
                            </div>
                        </div>

                        {/* MIDDLE: Status */}
                        {item.isRecent ? (
                            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border ${item.status.bgClass}`}>
                                <div className={`w-2 h-2 rounded-full ${item.status.textClass.replace('text-', 'bg-')} animate-pulse`}></div>
                                <span className={`text-xs font-bold ${item.status.textClass}`}>{item.status.label}</span>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50">
                                <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                                <span className="text-xs font-bold text-zinc-500">Geen recente data</span>
                            </div>
                        )}

                        {/* RIGHT: Action */}
                        <button
                            onClick={() => openFeedback(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-white rounded-lg transition-colors border border-white/5 group-hover:border-zinc-700"
                        >
                            <MessageSquare className="w-3 h-3 text-blue-400" />
                            <span className="hidden sm:inline">Bekijk & Reageer</span>
                            <ChevronRight className="w-3 h-3 text-zinc-500" />
                        </button>

                    </div>
                );
            })}

            {items.length === 0 && (
                <div className="text-center p-8 text-zinc-500 text-sm italic">
                    Nog geen check-ins om te tonen.
                </div>
            )}

            {/* FEEDBACK MODAL */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#18181b] w-full max-w-lg rounded-3xl border border-white/10 p-6 shadow-2xl space-y-6 relative">
                        <button onClick={closeFeedback} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-4 h-4 text-zinc-400" />
                        </button>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto mb-4 overflow-hidden border-2 border-white/10">
                                {selectedItem.player.photoUrl ? (
                                    <img src={selectedItem.player.photoUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-8 h-8 text-zinc-500 m-auto mt-3" />
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white">{selectedItem.player.name}</h2>
                            <p className="text-zinc-500 text-sm">Check-in van vandaag</p>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <span className="text-xs text-zinc-500 uppercase font-bold">RPE Score</span>
                                <div className="text-2xl font-black text-white">{selectedItem.lastCheckIn?.sessionLoad || '-'}</div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <span className="text-xs text-zinc-500 uppercase font-bold">Slaap</span>
                                <div className="text-2xl font-black text-white">{selectedItem.lastCheckIn?.sleepHours || '-'}h</div>
                            </div>
                            <div className="col-span-2 bg-black/40 p-4 rounded-xl border border-white/5">
                                <span className="text-xs text-zinc-500 uppercase font-bold">Opmerking Speler</span>
                                <p className="text-sm font-medium text-zinc-300 italic">"{selectedItem.notes || 'Geen opmerking'}"</p>
                            </div>
                        </div>

                        {/* Feedback Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-zinc-400 uppercase">Jouw Feedback</label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Goed bezig, let op je rust..."
                                className="w-full h-24 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 resize-none"
                            />
                        </div>

                        <button
                            onClick={saveFeedback}
                            disabled={saving}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
                        >
                            {saving ? 'Opslaan...' : 'Feedback Versturen'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
