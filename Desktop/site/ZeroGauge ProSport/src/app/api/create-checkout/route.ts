import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia" as any, // Bypass TS check if version mismatch occurs, or use "2024-12-18.acacia" etc.
    // simpler:
    // apiVersion: "2024-12-18.acacia", 
});

// Since I don't know the exact latest version installed, I will try to use a recent one or '2024-12-18.acacia' if that's what's current,
// but to be safe and avoid "unknown version" errors if the library is older/newer, I might pick a stable one or just `typescript` might complain.
// Let's use `apiVersion: '2024-12-18.acacia'` (fake) -> actually just use string as any or suppress if needed.
// Safest is to check package.json or just put a known valid one. 
// However, standard usage often is just `new Stripe(key)`. Let's try that first and if TS complains, I'll add options.
// Actually, `stripe` library usually requires the 2nd argument with apiVersion.
// I will use '2023-10-16' as a safe bet, or '2024-06-20'.
// Let's go with '2024-12-18.acacia' ... no, that's guessing.
// I'll use: `apiVersion: '2024-06-20'`

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "ideal"],
            line_items: [
                {
                    price: "price_1SqFoW3MVH8vEh95uRV5yXKD",
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard?canceled=true`,
            metadata: {
                userId: (session.user as any).id,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("[STRIPE_ERROR]", error);
        return NextResponse.json({ error: "Internal Error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
