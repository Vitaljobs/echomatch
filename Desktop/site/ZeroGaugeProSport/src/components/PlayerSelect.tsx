"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export function PlayerSelect({ players, currentId }: { players: { id: string; name: string }[], currentId: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newId = e.target.value;
        const params = new URLSearchParams(searchParams);
        if (newId) {
            params.set("playerId", newId);
        } else {
            params.delete("playerId");
        }
        router.push(`/dashboard/personal?${params.toString()}`);
    };

    return (
        <div className="relative inline-block text-left mb-6">
            <div className="relative">
                <select
                    value={currentId}
                    onChange={handleChange}
                    className="appearance-none bg-[#121214] border border-white/10 text-white py-3 pl-4 pr-10 rounded-xl leading-tight focus:outline-none focus:border-accent font-bold"
                >
                    {players.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/50">
                    <ChevronDown className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
