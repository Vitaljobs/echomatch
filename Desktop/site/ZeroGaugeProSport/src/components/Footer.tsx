import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-slate-950 to-slate-900 text-white py-16 px-6 border-t border-white/5">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <span className="text-lg font-bold tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        ZeroGauge <span className="text-feature-accent">ProSport</span>
                    </span>
                    <p className="text-sm text-slate-500 mt-2">
                        © {new Date().getFullYear()} ZeroGauge. All rights reserved.
                    </p>
                </div>

                <nav className="flex gap-8 text-sm font-medium text-slate-400">
                    <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy</Link>
                    <Link href="/voorwaarden" className="hover:text-white transition-colors duration-200">Voorwaarden</Link>
                    <Link href="mailto:info@zerogauge.nl" className="hover:text-white transition-colors duration-200">Contact</Link>
                </nav>
            </div>
        </footer>
    );
}
