'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MessagesPanel from '@/components/MessagesPanel';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PlayerDetail() {
    const params = useParams();
    const [player, setPlayer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (params.id) fetchPlayer();
    }, [params.id]);

    const fetchPlayer = async () => {
        try {
            const res = await fetch(`/api/players/${params.id}`);
            const data = await res.json();
            setPlayer(data);
            setFormData(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const updatePlayer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/players/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                const updated = await res.json();
                setPlayer(updated);
                setEditing(false);
            }
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const toggleStatus = async () => {
        if (!confirm(`Weet je zeker dat je deze speler wilt ${player.isActive ? 'deactiveren' : 'reactiveren'}?`)) return;

        try {
            let res;
            if (player.isActive) {
                res = await fetch(`/api/players/${params.id}`, { method: 'DELETE' });
            } else {
                res = await fetch(`/api/players/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ isActive: true }),
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (res.ok) {
                fetchPlayer();
            }
        } catch (error) {
            console.error('Toggle status failed:', error);
        }
    };

    if (loading) return <div className="p-8 text-white">Laden...</div>;
    if (!player) return <div className="p-8 text-white">Speler niet gevonden.</div>;

    return (
        <div className="min-h-screen bg-[#050509] pt-28 pb-12">
            <div className="max-w-[1600px] mx-auto space-y-8 px-8 text-slate-900">
                <Link href="/admin/players" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                    <ChevronLeft className="w-4 h-4" /> Terug naar overzicht
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Player Card */}
                    <div className="lg:col-span-2 bg-slate-900 border border-white/10 shadow-xl rounded-2xl p-8 text-white">
                        <div className="flex items-center gap-6 mb-8">
                            {player.photoUrl ? (
                                <img
                                    src={player.photoUrl}
                                    alt={player.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500/20"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-3xl font-bold text-slate-500">
                                    {player.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold text-white">{player.name}</h1>
                                <p className="text-xl text-slate-400">{player.position || 'Geen positie'}</p>
                            </div>
                        </div>

                        {/* Edit Form */}
                        <form onSubmit={updatePlayer} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Naam</label>
                                    <input
                                        disabled={!editing}
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                    <input
                                        disabled={!editing}
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Positie</label>
                                    <input
                                        disabled={!editing}
                                        value={formData.position || ''}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Foto URL</label>
                                    <input
                                        disabled={!editing}
                                        value={formData.photoUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                                        placeholder="https://example.com/photo.jpg"
                                        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                {editing ? (
                                    <>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-bold transition-colors"
                                        >
                                            Opslaan
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setEditing(false); setFormData(player); }}
                                            className="px-8 py-3 border border-slate-600 rounded-xl hover:bg-slate-800 text-slate-300 font-bold transition-colors"
                                        >
                                            Annuleren
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-bold transition-colors"
                                    >
                                        Bewerken
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={toggleStatus}
                                    className={`ml-auto border px-8 py-3 rounded-xl font-bold transition-colors ${player.isActive
                                        ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20'
                                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20'
                                        }`}
                                >
                                    {player.isActive ? 'Deactiveren' : 'Reactiveren'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Messages Sidebar */}
                    <div className="h-[600px] lg:h-auto lg:min-h-[600px]">
                        <MessagesPanel playerId={player.id} role="coach" />
                    </div>
                </div>
            </div>
        </div>
    );
}
