"use client";

import { useState } from "react";
import { Activity, Moon, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

type WellnessData = {
    date: Date;
    sessionLoad: number;
    sleepHours: number;
};

type HistoricalTrendProps = {
    data: WellnessData[];
};

export default function HistoricalTrend({ data }: HistoricalTrendProps) {
    const [period, setPeriod] = useState<'week' | 'month'>('week');

    // Debug logging
    console.log('HistoricalTrend received data:', data);
    console.log('Data length:', data.length);

    // Filter data based on period
    const filteredData = data.slice(0, period === 'week' ? 7 : 30).reverse();

    console.log('Filtered data:', filteredData);
    console.log('Filtered length:', filteredData.length);

    // Calculate max values for scaling
    const maxRPE = 10;
    const maxSleep = 12;

    if (filteredData.length === 0) {
        return (
            <div className="bg-[#121214] border border-white/5 rounded-[40px] p-8">
                <h3 className="text-xl font-bold mb-4">Jouw Progressie</h3>
                <p className="text-zinc-500 text-sm">Nog geen check-in data beschikbaar. Doe je eerste check-in!</p>
                <p className="text-zinc-600 text-xs mt-2">Debug: Ontvangen {data.length} items</p>
            </div>
        );
    }

    return (
        <div className="bg-[#121214] border border-white/5 rounded-[40px] p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        Jouw Progressie
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">Volg je eigen ontwikkeling</p>
                </div>

                {/* Period Selector */}
                <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl">
                    <button
                        onClick={() => setPeriod('week')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${period === 'week'
                            ? 'bg-blue-600 text-white'
                            : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        7 Dagen
                    </button>
                    <button
                        onClick={() => setPeriod('month')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${period === 'month'
                            ? 'bg-blue-600 text-white'
                            : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        30 Dagen
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-zinc-400 uppercase">RPE Belasting</span>
                </div>
                <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-zinc-400 uppercase">Slaap (uren)</span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[280px] relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[10, 8, 6, 4, 2, 0].map((val) => (
                        <div key={val} className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-600 font-mono w-4">{val}</span>
                            <div className="flex-1 border-t border-zinc-800/50"></div>
                        </div>
                    ))}
                </div>

                {/* Data points and lines */}
                <div className="absolute inset-0 flex items-end justify-between px-8 gap-1">
                    {filteredData.map((item, i) => {
                        const rpeHeight = (item.sessionLoad / maxRPE) * 100;
                        const sleepHeight = (item.sleepHours / maxSleep) * 100;

                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                                {/* Hover tooltip */}
                                <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                                    <div className="text-xs font-bold text-white mb-2">
                                        {format(item.date, 'd MMMM yyyy', { locale: nl })}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Activity className="w-3 h-3 text-red-400" />
                                        <span className="text-zinc-400">RPE: {item.sessionLoad}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Moon className="w-3 h-3 text-blue-400" />
                                        <span className="text-zinc-400">Slaap: {item.sleepHours.toFixed(1)}h</span>
                                    </div>
                                </div>

                                {/* Bars */}
                                <div className="w-full flex gap-0.5 items-end h-full">
                                    {/* RPE bar */}
                                    <div
                                        className="flex-1 bg-gradient-to-t from-red-500/60 to-red-400/40 rounded-t-md transition-all group-hover:from-red-500 group-hover:to-red-400"
                                        style={{ height: `${rpeHeight}%` }}
                                    />
                                    {/* Sleep bar */}
                                    <div
                                        className="flex-1 bg-gradient-to-t from-blue-500/60 to-blue-400/40 rounded-t-md transition-all group-hover:from-blue-500 group-hover:to-blue-400"
                                        style={{ height: `${sleepHeight}%` }}
                                    />
                                </div>

                                {/* Date label */}
                                <span className="text-[9px] font-bold text-zinc-700 uppercase">
                                    {format(item.date, 'd', { locale: nl })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                <div className="bg-zinc-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-bold text-zinc-500 uppercase">Gem. RPE</span>
                    </div>
                    <div className="text-2xl font-black text-white">
                        {(filteredData.reduce((acc, d) => acc + d.sessionLoad, 0) / filteredData.length).toFixed(1)}
                    </div>
                </div>
                <div className="bg-zinc-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-zinc-500 uppercase">Gem. Slaap</span>
                    </div>
                    <div className="text-2xl font-black text-white">
                        {(filteredData.reduce((acc, d) => acc + d.sleepHours, 0) / filteredData.length).toFixed(1)}h
                    </div>
                </div>
            </div>
        </div>
    );
}
