import SparklineChart from "./SparklineChart";

interface MetricCardProps {
    title: string;
    value: string;
    trend?: string; // e.g. "high", "low", "neutral"
}

export default function MetricCard({ title, value }: MetricCardProps) {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-800 p-8 rounded-3xl border-2 border-blue-500/20 shadow-2xl hover:shadow-[0_0_32px_theme(colors.blue.500/0.4)] hover:border-blue-500/40 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl p-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">{value}</p>
                </div>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 w-[87%] rounded-full shadow-inner"></div>
            </div>
            {/* Sparkline placeholder */}
            <SparklineChart className="w-full h-20 mt-4 opacity-60" />
        </div>
    );
}
