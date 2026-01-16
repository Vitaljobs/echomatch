"use client";

import { Activity, Moon } from "lucide-react";

type WellnessGaugeProps = {
    rpeValue: number; // 0-10
    sleepValue: number; // 0-12 hours
};

export default function WellnessGauge({ rpeValue, sleepValue }: WellnessGaugeProps) {
    // Calculate percentages
    const rpePercentage = (rpeValue / 10) * 100;
    const sleepPercentage = (sleepValue / 12) * 100;

    // Determine colors based on values
    const getRPEColor = (value: number) => {
        if (value <= 3) return { bg: 'from-emerald-500/20 to-emerald-600/20', stroke: 'stroke-emerald-500', text: 'text-emerald-400' };
        if (value <= 6) return { bg: 'from-blue-500/20 to-blue-600/20', stroke: 'stroke-blue-500', text: 'text-blue-400' };
        if (value <= 8) return { bg: 'from-orange-500/20 to-orange-600/20', stroke: 'stroke-orange-500', text: 'text-orange-400' };
        return { bg: 'from-red-500/20 to-red-600/20', stroke: 'stroke-red-500', text: 'text-red-400' };
    };

    const getSleepColor = (value: number) => {
        if (value >= 8) return { bg: 'from-emerald-500/20 to-emerald-600/20', stroke: 'stroke-emerald-500', text: 'text-emerald-400' };
        if (value >= 6) return { bg: 'from-blue-500/20 to-blue-600/20', stroke: 'stroke-blue-500', text: 'text-blue-400' };
        if (value >= 4) return { bg: 'from-orange-500/20 to-orange-600/20', stroke: 'stroke-orange-500', text: 'text-orange-400' };
        return { bg: 'from-red-500/20 to-red-600/20', stroke: 'stroke-red-500', text: 'text-red-400' };
    };

    const rpeColor = getRPEColor(rpeValue);
    const sleepColor = getSleepColor(sleepValue);

    const CircularGauge = ({
        percentage,
        value,
        label,
        icon,
        color,
        unit = ""
    }: {
        percentage: number;
        value: number;
        label: string;
        icon: React.ReactNode;
        color: { bg: string; stroke: string; text: string };
        unit?: string;
    }) => {
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    {/* Background circle */}
                    <svg className="transform -rotate-90" width="180" height="180">
                        <circle
                            cx="90"
                            cy="90"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-zinc-800"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="90"
                            cy="90"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className={`${color.stroke} transition-all duration-1000 ease-out`}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${color.bg} mb-2`}>
                            {icon}
                        </div>
                        <div className={`text-4xl font-black ${color.text}`}>
                            {value.toFixed(1)}{unit}
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{label}</p>
                    <p className="text-xs text-zinc-600 mt-1">
                        {percentage.toFixed(0)}% van max
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-2 gap-8 p-8">
            <CircularGauge
                percentage={rpePercentage}
                value={rpeValue}
                label="RPE Belasting"
                icon={<Activity className="w-6 h-6 text-white" />}
                color={rpeColor}
            />
            <CircularGauge
                percentage={sleepPercentage}
                value={sleepValue}
                label="Slaap"
                icon={<Moon className="w-6 h-6 text-white" />}
                color={sleepColor}
                unit="h"
            />
        </div>
    );
}
