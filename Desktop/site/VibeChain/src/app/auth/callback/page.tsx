"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

function AuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleAuth = async () => {
            const code = searchParams.get("code");
            const next = searchParams.get("next") ?? "/";

            if (code) {
                try {
                    const { error } = await supabase.auth.exchangeCodeForSession(code);
                    if (error) {
                        setError(error.message);
                    } else {
                        router.push(next);
                    }
                } catch (err: any) {
                    setError(err.message);
                }
            } else {
                // No code found, maybe we are already logged in or it's an implicit flow?
                // Check session
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    router.push(next);
                } else {
                    setError("No auth code found.");
                }
            }
        };

        handleAuth();
    }, [router, searchParams]);

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
                <h1 className="text-2xl font-bold mb-4 text-red-500">Login Failed</h1>
                <p className="text-white/60 mb-8">{error}</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-emerald-500 rounded hover:bg-emerald-600"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-500 mb-4" />
            <p className="text-white/60">Verifying your vibe...</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black text-white"><Loader2 className="animate-spin" /></div>}>
            <AuthContent />
        </Suspense>
    );
}
