"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tighter text-white">
                        ZeroGauge <span className="text-feature-accent">ProSport</span>
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link href="#" className="hover:text-white transition-colors">Features</Link>
                    <Link href="#" className="hover:text-white transition-colors">Hoe het werkt</Link>
                    <Link href="#" className="hover:text-white transition-colors">Voor teams</Link>

                    {session ? (
                        <>
                            <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="text-red-400 hover:text-red-300 transition-colors"
                            >
                                Uitloggen
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                    )}

                    {!session && (
                        <button className="bg-white text-slate-950 px-5 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                            Start met meten
                        </button>
                    )}
                </nav>

                {/* Mobile Menu Button Placeholder */}
                <button className="md:hidden text-white">
                    Menu
                </button>
            </div>
        </header>
    );
}
