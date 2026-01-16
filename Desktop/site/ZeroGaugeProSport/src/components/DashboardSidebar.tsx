"use client";

import React from 'react';
import {
    LayoutGrid,
    ShoppingCart,
    Truck,
    FileText,
    Activity,
    BarChart3,
    MessageSquare,
    Settings,
    HelpCircle,
    Zap,
    Rocket,
    Search,
    Users,
    LogOut
} from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isCoach = (session?.user as any)?.role === 'COACH';

    const NavItem = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => {
        const isActive = pathname === href;
        return (
            <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${isActive ? 'bg-gradient-to-r from-accent/20 to-transparent text-white border-l-2 border-accent' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-200'}`}>
                <span className={isActive ? 'text-accent' : ''}>{icon}</span>
                <span className="text-sm font-medium">{label}</span>
            </Link>
        );
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#0d0d0f] border-r border-white/5 flex flex-col z-50">
            <div className="p-6 flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">PATH WOUNDED</span>
                </Link>
            </div>

            {/* Search removed for Demo */}
            {/* <div className="px-4 py-2">...</div> */}

            <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
                <p className="px-4 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Dashboards</p>
                {isCoach && (
                    <NavItem icon={<Users className="w-4 h-4" />} label="Team Dashboard" href="/dashboard/team" />
                )}
                <NavItem icon={<BarChart3 className="w-4 h-4" />} label="Analytics" href="/dashboard/personal" />

                <p className="px-4 py-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Menu</p>
                <NavItem icon={<LayoutGrid className="w-4 h-4" />} label="Overview" href="/dashboard" />

                {/* Admin / Ops for Coach */}
                {isCoach && (
                    <NavItem icon={<Users className="w-4 h-4 text-emerald-400" />} label="Spelers Beheren" href="/admin/players" />
                )}

                {/* Coming Soon / Disabled Items */}
                <NavItem icon={<MessageSquare className="w-4 h-4" />} label="Messages (Inbox)" href="/dashboard/messages" />

                {/* Hidden for Demo
                <NavItem icon={<ShoppingCart className="w-4 h-4" />} label="Orders" href="#" />
                <NavItem icon={<Truck className="w-4 h-4" />} label="Carriers" href="#" />
                <NavItem icon={<Activity className="w-4 h-4" />} label="Automations" href="#" />
                */}

                {/* 
                <p className="px-4 py-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Support</p>
                <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" href="#" />
                <NavItem icon={<HelpCircle className="w-4 h-4" />} label="Help" href="#" />
                */}
            </nav>

            <div className="p-4 mt-auto border-t border-white/5">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all group"
                >
                    <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                    <span className="text-sm font-medium">Uitloggen</span>
                </button>
            </div>
        </aside>
    );
}
