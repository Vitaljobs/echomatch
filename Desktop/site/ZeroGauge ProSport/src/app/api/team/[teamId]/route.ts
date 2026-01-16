import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ teamId: string }> }
) {
    try {
        const { teamId } = await params;

        // Fetch all players with their latest check-in
        const players = await prisma.player.findMany({
            where: { teamId },
            include: {
                dailyWellness: {
                    orderBy: { date: 'desc' },
                    take: 1,
                },
            },
        });

        // Calculate aggregated metrics
        const recentCheckIns = players
            .map(p => p.dailyWellness[0])
            .filter(Boolean);

        const totalPlayers = players.length;
        const playersWithCheckIns = recentCheckIns.length;

        const highRiskCount = recentCheckIns.filter(c => (c.riskScore ?? 0) >= 60).length;
        const mediumRiskCount = recentCheckIns.filter(c => (c.riskScore ?? 0) >= 30 && (c.riskScore ?? 0) < 60).length;
        const lowRiskCount = recentCheckIns.filter(c => (c.riskScore ?? 0) < 30).length;

        const avgRPE = recentCheckIns.length > 0
            ? recentCheckIns.reduce((sum, c) => sum + (c.sessionLoad ?? 0), 0) / recentCheckIns.length
            : 0;

        const playersWithPain = recentCheckIns.filter(c => (c.pijn ?? 0) >= 4).length;

        const compliancePercent = totalPlayers > 0
            ? Math.round((playersWithCheckIns / totalPlayers) * 100)
            : 0;

        return NextResponse.json({
            players: players.map(player => ({
                id: player.id,
                name: player.name,
                latestCheckIn: player.dailyWellness[0] || null,
            })),
            metrics: {
                highRiskCount,
                mediumRiskCount,
                lowRiskCount,
                avgRPE: Number(avgRPE.toFixed(1)),
                playersWithPain,
                compliancePercent,
                totalPlayers,
            },
        });
    } catch (error) {
        console.error('Team data fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team data' },
            { status: 500 }
        );
    }
}
