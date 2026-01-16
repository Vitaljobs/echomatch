'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

export default function PlayersAdmin() {
    const [players, setPlayers] = useState<any[]>([]);
    const [newPlayer, setNewPlayer] = useState({ name: '', email: '', position: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const res = await fetch('/api/players');
            if (res.ok) {
                setPlayers(await res.json());
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const addPlayer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/players', {
                method: 'POST',
                body: JSON.stringify(newPlayer),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Er ging iets mis');
                if (data.details) console.error(data.details);
                return;
            }

            setNewPlayer({ name: '', email: '', position: '' });
            fetchPlayers();
        } catch (err) {
            console.error(err);
            alert('Netwerkfout bij toevoegen speler');
        }
    };

    const deletePlayer = async (id: string) => {
        if (!confirm("Weet je zeker dat je deze speler wilt deactiveren?")) return;
        await fetch(`/api/players/${id}`, { method: 'DELETE' });
        fetchPlayers();
    };

    return (
        <div className="min-h-screen bg-[#050509] pt-28 pb-12">
            <div className="max-w-6xl mx-auto px-8">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-sm font-medium">
                    <ChevronLeft className="w-4 h-4" /> Terug naar Dashboard
                </Link>
                <h1 className="text-3xl font-bold mb-8 text-white">Spelers Beheer</h1>

                {/* Add Player Form */}
                <form onSubmit={addPlayer} className="bg-[#121214] border border-white/5 shadow-2xl rounded-[32px] p-8 mb-10 text-white">
                    <h2 className="text-lg font-bold mb-6 text-zinc-300 uppercase tracking-widest text-xs">Nieuwe speler</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Naam</label>
                            <input
                                placeholder="Ronald R."
                                required
                                value={newPlayer.name}
                                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-600/50 outline-none text-white placeholder:text-zinc-600 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Email</label>
                            <input
                                placeholder="naam@voorbeeld.nl"
                                value={newPlayer.email}
                                onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-600/50 outline-none text-white placeholder:text-zinc-600 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Positie</label>
                            <input
                                placeholder="Middenvelder"
                                value={newPlayer.position}
                                onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-600/50 outline-none text-white placeholder:text-zinc-600 transition-all"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-500 font-bold transition-all shadow-lg shadow-blue-900/20">
                            Speler Toevoegen
                        </button>
                    </div>
                </form>

                {/* Players Table */}
                <div className="bg-[#121214] border border-white/5 shadow-2xl rounded-[32px] overflow-hidden">
                    <table className="w-full text-white">
                        <thead className="bg-[#18181b] border-b border-white/5">
                            <tr>
                                <th className="p-6 text-left text-xs font-bold text-zinc-500 uppercase tracking-widest">Naam</th>
                                <th className="p-6 text-left text-xs font-bold text-zinc-500 uppercase tracking-widest">Positie</th>
                                <th className="p-6 text-left text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                                <th className="p-6 text-right text-xs font-bold text-zinc-500 uppercase tracking-widest">Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} className="p-8 text-center text-zinc-500 font-medium">Laden...</td></tr>
                            ) : players.map((player) => (
                                <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            {player.photoUrl ? (
                                                <img src={player.photoUrl} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                                            ) : (
                                                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 font-bold border border-white/5">
                                                    {player.name.charAt(0)}
                                                </div>
                                            )}
                                            <Link href={`/admin/players/${player.id}`} className="font-bold text-white hover:text-blue-400 transition-colors">
                                                {player.name}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="p-6 text-zinc-400 font-medium">{player.position || '-'}</td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${player.isActive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {player.isActive ? 'Actief' : 'Inactief'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right space-x-4">
                                        <Link href={`/admin/players/${player.id}`} className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all">Bewerken</Link>
                                        <button onClick={() => deletePlayer(player.id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all">Deactiveren</button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && players.length === 0 && (
                                <tr><td colSpan={4} className="p-12 text-center text-zinc-500 italic">Geen spelers gevonden. Voeg er eentje toe!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
