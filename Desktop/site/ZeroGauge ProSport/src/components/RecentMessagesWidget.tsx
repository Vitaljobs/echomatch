"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Clock, User, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

type Message = {
    id: string;
    content: string;
    createdAt: string;
    player: {
        id: string;
        name: string;
        photoUrl?: string;
    };
    type: string;
    isRead: boolean;
};

export default function RecentMessagesWidget() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/messages'); // No param = inbox mode
                if (res.ok) {
                    const data = await res.json();
                    // Filter to unique players or just show stream?
                    // Let's show stream but maybe filter out own messages if possible?
                    // actually for now just show all recent
                    setMessages(data);
                }
            } catch (error) {
                console.error("Failed to fetch recent messages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 15000); // Poll every 15s
        return () => clearInterval(interval);
    }, []);

    // Filter out COACH messages to only show what Players sent?
    // Or show conversation? Usually inbox shows what OTHERS sent.
    // We can filter client side if needed, assuming we can detect role or sender.
    // The API returns all. Ideally we check if coachId matches current user, but msg doesn't always have sender field explicitly separate from coachId.
    // Logic: If msg.type === 'PULSE', it's from Coach. If not, check context.
    // Simplest: Check if content looks like system or user.
    // Better: Filter where type != 'PULSE' and maybe infer sender.
    // actually, let's just show *Player* messages mainly.
    // For now, let's just render all and see.

    const incomingMessages = messages.filter(m => m.type !== 'PULSE'); // Hide pulses sent by coach

    return (
        <div className="bg-[#121214] border border-white/5 rounded-[32px] p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Recente Berichten</h3>
                </div>
                <div className="px-3 py-1 bg-zinc-900 rounded-full border border-white/5 text-xs font-bold text-zinc-400">
                    {incomingMessages.length}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {loading ? (
                    <div className="text-center py-8 text-zinc-500 text-xs">Laden...</div>
                ) : incomingMessages.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 text-xs italic">Geen recente berichten</div>
                ) : (
                    incomingMessages.slice(0, 10).map((msg) => (
                        <Link
                            key={msg.id}
                            href={`/admin/players/${msg.player.id}`}
                            className="block bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 hover:border-white/10 p-3 rounded-xl transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10">
                                    {msg.player.photoUrl ? (
                                        <img src={msg.player.photoUrl} alt={msg.player.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-4 h-4 text-zinc-500" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h4 className="text-xs font-bold text-white truncate">{msg.player.name}</h4>
                                        <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                                            {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: nl }).replace('ongeveer ', '')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 truncate group-hover:text-zinc-300 transition-colors">
                                        {msg.content}
                                    </p>
                                </div>
                                <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors mt-2" />
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-center">
                <Link href="/dashboard/messages" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                    Bekijk Inbox
                </Link>
            </div>
        </div>
    );
}
