"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const params = useSearchParams();
    const router = useRouter();

    const callbackUrl = params.get("callbackUrl") || "/dashboard";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Ongeldig email of wachtwoord");
        } else {
            // Force full reload to ensure cookies are set and middleware runs fresh
            // This fixes the "2x login" and session race conditions
            window.location.href = callbackUrl;
        }
    };

    return (
        <div className="w-full max-w-sm bg-[#121214] border border-white/5 rounded-2xl p-8 space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-black text-white">ZeroGauge ProSport</h1>
                <p className="text-zinc-500 text-sm mt-2">Log in met je account</p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-zinc-600"
                        placeholder="naam@voorbeeld.nl"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Wachtwoord</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-zinc-600"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-all shadow-lg shadow-blue-900/20 mt-2"
                >
                    {loading ? "Bezig met inloggen..." : "Inloggen"}
                </button>
            </form>

            <div className="text-center text-xs text-zinc-600">
                Nog geen account? Vraag je trainer.
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050509] text-white">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
