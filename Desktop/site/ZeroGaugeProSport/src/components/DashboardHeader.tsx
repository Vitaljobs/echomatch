import { Search, UserCircle, Bell } from "lucide-react";

export default function DashboardHeader() {
    return (
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                {/* Logo Icon */}
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">ZeroGauge Pro</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Zoek speler..."
                                className="w-72 pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/75 transition-all duration-300"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400" />
                        </div>

                        <select className="bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none bg-no-repeat bg-right">
                            <option>Alle spelers</option>
                            <option>Actief</option>
                            <option>Beschadigd</option>
                            <option>Herstel</option>
                        </select>

                        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                            + Nieuwe meting
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
