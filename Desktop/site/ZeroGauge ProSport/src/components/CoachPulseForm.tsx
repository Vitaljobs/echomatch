"use client";

import { useState } from "react";
import { Send, Users, User, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CoachPulseForm({ players }: { players: { id: string; name: string }[] }) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [recipientId, setRecipientId] = useState("ALL"); // "ALL", "TEAM", or specific UUID
    const [actionType, setActionType] = useState<'NONE' | 'CHECKIN' | 'MATCH'>('NONE');
    const [validUntil, setValidUntil] = useState(() => {
        // Default: 7 days from now
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    });
    const [sending, setSending] = useState(false);
    const router = useRouter();

    const handleSend = async () => {
        if (!content.trim()) return;

        setSending(true);

        let actionLink = undefined;
        let actionLabel = undefined;

        if (actionType === 'CHECKIN') {
            actionLink = "/daily-check-in";
            actionLabel = "Start Check-in";
        } else if (actionType === 'MATCH') {
            actionLink = "/match-report";
            actionLabel = "Vul Wedstrijd Rapport In";
        }

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipientId, // Special handling in API for "ALL"
                    content,
                    title: actionType !== 'NONE' ? title : undefined,
                    type: "PULSE",
                    actionType, // <--- Added this
                    actionLink,
                    actionLabel,
                    validUntil: actionType !== 'NONE' ? new Date(validUntil).toISOString() : undefined
                })
            });

            if (res.ok) {
                setContent("");
                setTitle("");
                setRecipientId("ALL");
                setActionType('NONE');
                const date = new Date();
                date.setDate(date.getDate() + 7);
                setValidUntil(date.toISOString().split('T')[0]);
                alert("Pulse verstuurd!");
                router.refresh();
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error("Pulse error:", errorData);
                alert(`Fout bij versturen: ${errorData.error || res.statusText}`);
            } // ... rest of existing catch block

        } catch (error) {
            console.error(error);
            alert("Er ging iets mis.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="bg-[#121214] border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600/10 rounded-full">
                    <Zap className="w-6 h-6 text-blue-500 fill-blue-500/20" />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Coach Pulse</h3>
                    <p className="text-zinc-500 text-xs">Stuur een directe prompt of bericht.</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Recipient Selector */}
                <div className="relative">
                    <select
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 appearance-none focus:border-blue-500 focus:outline-none"
                    >
                        <option value="ALL">📢 Iedereen (Hele Selectie)</option>
                        {/* <option value="TEAM_A">Team A</option> Future proofing */}
                        <optgroup label="Specifieke Speler">
                            {players.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </optgroup>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        {recipientId === 'ALL' ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                </div>

                {/* Title Input (only when action is selected) */}
                {actionType !== 'NONE' && (
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Pulse Titel *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="bijv. 'Herstel Check Week 1'"
                            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none placeholder:text-zinc-600"
                            required
                        />
                    </div>
                )}

                {/* Validity Date (only when action is selected) */}
                {actionType !== 'NONE' && (
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Geldig tot *</label>
                        <input
                            type="date"
                            value={validUntil}
                            onChange={(e) => setValidUntil(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                )}

                {/* Content Area */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Motivatiebericht of belangrijke instructie..."
                    maxLength={280}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl p-4 min-h-[100px] focus:border-blue-500 focus:outline-none resize-none text-sm placeholder:text-zinc-600 mb-4"
                />

                {/* Action Selector */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={() => setActionType('NONE')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${actionType === 'NONE' ? 'bg-zinc-800 border-zinc-600 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                    >
                        Geen Actie
                    </button>
                    <button
                        onClick={() => setActionType('CHECKIN')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${actionType === 'CHECKIN' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-zinc-800 text-zinc-500 hover:border-emerald-500/50'}`}
                    >
                        + Check-in Knop
                    </button>
                    <button
                        onClick={() => setActionType('MATCH')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${actionType === 'MATCH' ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'border-zinc-800 text-zinc-500 hover:border-orange-500/50'}`}
                    >
                        + Wedstrijd Raport
                    </button>
                </div>

                <div className="flex justify-between items-center text-xs text-zinc-500 px-1">
                    <span>{content.length}/280</span>
                    <button
                        onClick={handleSend}
                        disabled={!content.trim() || sending}
                        className={`font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg ${actionType !== 'NONE' ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}
                    >
                        {sending ? 'Versturen...' : (
                            <>
                                {actionType === 'NONE' ? 'Verstuur Bericht' : 'Verstuur Pulse + Actie'} <Send className="w-3 h-3" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
