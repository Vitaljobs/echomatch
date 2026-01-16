import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function TestDashboard() {
    // Get first player for testing
    const player = await prisma.player.findFirst({
        include: {
            dailyWellness: {
                orderBy: { date: 'desc' },
                take: 30
            }
        }
    });

    if (!player) {
        return <div className="p-8 text-white">No players found in database</div>;
    }

    // Redirect to player dashboard
    redirect(`/dashboard/player/${player.id}`);
}
