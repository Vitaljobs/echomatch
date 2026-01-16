'use client';
import { useEffect, useState, useRef } from 'react';
import { getCurrentCoachId } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Zap, CheckCircle } from "lucide-react";

type MessagesPanelProps = {
    playerId: string;
    role?: 'player' | 'coach';
    className?: string;
};

export default function MessagesPanel({ playerId, role = 'player', className }: MessagesPanelProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const coachId = getCurrentCoachId();

    const fetchMessages = async () => {
        try {
            if (!playerId) return;
            const res = await fetch(`/api/messages?playerId=${playerId}`);
            if (res.ok) {
                const text = await res.text();
                try {
                    const data = JSON.parse(text);
                    // Filter out PULSE messages - those are shown in PlayerPulses component
                    const chatMessages = data.filter((m: any) => m.type !== 'PULSE');
                    setMessages(chatMessages);
                } catch (jsonError) {
                    console.error("Failed to parse messages JSON:", jsonError, text.substring(0, 100));
                }
            } else {
                console.error("Fetch messages failed:", res.status, res.statusText);
            }
        } catch (error) {
            console.error("Network error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 30000);
        return () => clearInterval(interval);
    }, [playerId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const send = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setSending(true);
        await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId, content: newMessage, coachId }),
        });
        setNewMessage('');
        fetchMessages();
        setSending(false);
    };

    return (
        <div className={cn("flex flex-col h-[340px]", className)}>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                {messages.length === 0 && <p className="text-zinc-600 text-xs italic text-center mt-4">Nog geen berichten...</p>}
                {messages.map((msg) => {
                    const isCoach = msg.coachId === coachId;
                    const isPulse = msg.type === 'PULSE';
                    const alignRight = role === 'coach' ? isCoach : !isCoach;

                    return (
                        <div
                            key={msg.id}
                            className={cn(
                                "max-w-[85%] rounded-2xl px-4 py-3 text-sm relative group",
                                alignRight
                                    ? isPulse
                                        ? 'ml-auto bg-indigo-600 text-white shadow-[0_0_18px_rgba(79,70,229,0.4)] border border-indigo-400'
                                        : 'ml-auto bg-blue-600/80 text-white shadow-[0_0_18px_rgba(37,99,235,0.35)]'
                                    : isPulse
                                        ? 'mr-auto bg-indigo-900/40 border border-indigo-500/50 text-indigo-100 shadow-[0_0_15px_rgba(79,70,229,0.15)]'
                                        : 'mr-auto bg-zinc-800 text-zinc-100'
                            )}
                        >
                            {isPulse && (
                                <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm border border-indigo-400 flex items-center gap-1">
                                    <Zap className="w-2.5 h-2.5 fill-white" /> Coach Pulse
                                </span>
                            )}
                            <p className={cn(isPulse && "mt-1 font-medium leading-relaxed")}>{msg.content}</p>

                            {/* Action Button */}
                            {isPulse && msg.actionType !== 'NONE' && (
                                <div className="mt-3 pt-2 border-t border-white/10">
                                    {msg.linkedDailyWellnessId ? (
                                        <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-500/20 text-emerald-100 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Voltooid
                                        </div>
                                    ) : (
                                        msg.actionLink && (
                                            <a
                                                href={`${msg.actionLink}?pulseId=${msg.id}`}
                                                className="block w-full text-center py-2 px-4 rounded-lg bg-white/10 hover:bg-white text-white hover:text-indigo-600 font-bold text-xs uppercase tracking-wider transition-all border border-white/20 hover:border-white shadow-lg"
                                            >
                                                {msg.actionLabel || 'Start Actie'}
                                            </a>
                                        )
                                    )}
                                </div>
                            )}

                            <p className={cn("mt-1 text-[11px] text-right", alignRight ? "text-white/60" : "text-zinc-500")}>
                                {new Date(msg.createdAt).toLocaleTimeString('nl-NL', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    );
                })}
            </div>

            <form onSubmit={send} className="mt-3 flex gap-2 border-t border-white/5 pt-3">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={role === 'coach' ? 'Stuur een bericht...' : 'Stel een vraag aan de trainer...'}
                    className="flex-1 bg-zinc-900 border border-zinc-700/70 rounded-xl px-3 py-2 text-sm text-zinc-100
                     placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition-all"
                />
                <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white
                     hover:bg-blue-500 disabled:opacity-40 transition-colors shadow-lg shadow-blue-900/20"
                >
                    {sending ? '...' : 'Verstuur'}
                </button>
            </form>
        </div>
    );
}
