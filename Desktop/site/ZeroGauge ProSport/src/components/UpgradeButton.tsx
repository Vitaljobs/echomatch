"use client";

import { useState } from "react";

export default function UpgradeButton() {
    const [loading, setLoading] = useState(false);

    const upgradeSubscription = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/create-checkout', {
                method: 'POST',
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("No checkout URL returned", data);
                if (data.error) {
                    alert(`Fout bij aanmaken checkout: ${data.details || data.error}`);
                } else {
                    alert("Er is iets misgegaan. Probeer het later opnieuw.");
                }
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("Er is een onverwachte fout opgetreden. Controleer de console voor meer details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={upgradeSubscription}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Bezig...
                </>
            ) : (
                <>
                    🚀 Upgrade Team (€250/maand iDEAL)
                </>
            )}
        </button>
    );
}
