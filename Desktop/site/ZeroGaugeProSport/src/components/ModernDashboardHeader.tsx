"use client";

import React, { useState, useEffect } from 'react';
import {
    Bell,
    Sun,
    Moon,
    Zap,
    ChevronRight,
    MessageSquare
} from "lucide-react";
import ProfileImageUpload from "./ProfileImageUpload";
import { useSession } from "next-auth/react";
import Link from 'next/link';

interface ModernDashboardHeaderProps {
    title: string;
    subtitle: string;
    riskScore?: number;
    user?: {
        name: string;
        role: string;
        photoUrl?: string;
    }
}

export default function ModernDashboardHeader({ title, subtitle, riskScore = 0, user }: ModernDashboardHeaderProps) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { data: session } = useSession();
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    // Fallback user data if not passed
    const displayName = user?.name || session?.user?.name || "Gebruiker";
    const displayRole = user?.role || (session?.user as any)?.role || "Unknown";
    const playerId = (session?.user as any)?.playerId;

    useEffect(() => {
        if (playerId) {
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30s
            return () => clearInterval(interval);
        }
    }, [playerId]);

    const fetchUnreadCount = async () => {
        try {
            // Using existing endpoint, simplistic unread filter client-side or new param?
            // For now, let's fetch messages and filter locally since we don't have a specialized endpoint yet.
            // Ideally should be optimised.
            if (!playerId) return;
            const res = await fetch(`/api/messages?playerId=${playerId}`);
            if (res.ok) {
                const msgs = await res.json();
                // Count messages where I am receiver and isRead is false.
                // Logic: Message model has `playerId` and `coachId`.
                // If I am PLAYER, I receive messages from COACH.
                // The current API returns all messages for a player thread.
                // We assume messages from Coach have `coachId` set and are intended for Player.
                // Wait, Message model doesn't explicitly have 'sender'. It's strictly Player <-> Coach chat.
                // Usually we infer sender/receiver.
                // Let's assume for now we just count *total* messages for testing or count messages NOT from me?
                // The API doesn't return who sent it easily without `senderId` field.
                // But generally: if I am user, and message.coachId is valid...
                // Let's rely on looking at a 'read' status.
                // For simplicity in this iteration: Count all unread messages in the thread.
                const unread = msgs.filter((m: any) => !m.isRead && m.coachId /* simplistic assumption */).length;

                // Correction: The Message model lacks a 'sender' field. It is ambiguous.
                // However, usually `isRead` is set to true when the recipient views it.
                // If I am a player, any unread message is potentially new for me.
                setUnreadCount(unread);
            }
        } catch (e) {
            console.error("Failed to fetch unread count", e);
        }
    };

    return (
        <header className="h-[80px] border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0a0a0c]/80 backdrop-blur-md z-40">
            <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                <p className="text-xs text-zinc-500">{subtitle}</p>
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle (Visual Only for now as requested) */}
                <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
                    <button
                        onClick={() => setIsDarkMode(false)}
                        className={`p-1.5 rounded-lg transition-all ${!isDarkMode ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500'}`}
                    >
                        <Sun className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsDarkMode(true)}
                        className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500'}`}
                    >
                        <Moon className="w-4 h-4" />
                    </button>
                </div>

                {/* Energy/Risk Score */}
                <div className="h-10 px-3 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center gap-2" title="Jouw Herstel Score">
                    <Zap className={`w-4 h-4 ${riskScore < 40 ? 'text-emerald-400' : riskScore < 70 ? 'text-orange-400' : 'text-red-400'}`} />
                    <span className="text-sm font-bold text-white">{100 - riskScore /* Invert risk to 'energy' logic if needed, or just show risk. User had '40' with emerald. Let's assume 100-risk = Readiness? */}</span>
                    {/* User screenshot showed '40' in green with Zap. Usually Zap = Energy. Risk = Bad. So Energy = 100 - Risk makes sense? */}
                    {/* Let's disable the calc and just show the raw score if passed, or maybe 100-risk if it represents 'Energy' */}
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="h-10 px-3 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center gap-2 relative hover:bg-zinc-800 transition-colors"
                    >
                        <Bell className={`w-4 h-4 ${unreadCount > 0 ? 'text-white' : 'text-zinc-400'}`} />
                        {unreadCount > 0 && (
                            <span className="px-1.5 py-0.5 bg-red-500/20 border border-red-500/50 text-red-500 text-[10px] font-bold rounded-lg whitespace-nowrap">
                                {unreadCount} New
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute top-12 right-0 w-80 bg-[#121214] border border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 z-50">
                            <h3 className="text-sm font-bold text-white mb-2">Notificaties</h3>
                            {unreadCount > 0 ? (
                                <div className="space-y-2">
                                    <div className="p-3 bg-zinc-900 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-1">
                                            <MessageSquare className="w-3 h-3 text-blue-400" />
                                            <span className="text-xs font-bold text-white">Nieuw bericht</span>
                                        </div>
                                        <p className="text-xs text-zinc-400">Je hebt {unreadCount} ongelezen berichten van je coach.</p>
                                    </div>
                                    <button
                                        className="w-full py-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                        onClick={() => setShowNotifications(false)} // Ideally scroll to messages
                                    >
                                        Bekijk in dashboard
                                    </button>
                                </div>
                            ) : (
                                <p className="text-xs text-zinc-500 text-center py-4">Geen nieuwe meldingen.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold leading-none mb-1 text-white">{displayName}</p>
                        <p className="text-[10px] text-zinc-500 font-medium uppercase">{displayRole}</p>
                    </div>
                    <ProfileImageUpload
                        initialImage={user?.photoUrl || "/avatars/default.jpg"}
                        userId={(session?.user as any)?.id}
                    />
                    <div className="hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-500 text-[10px] font-bold">{displayName.charAt(0)}</div>
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                </div>
            </div>
        </header>
    );
}
