import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Risk calculation formula (simplified version of the one in lib/riskCalculator for the API)
function calculateRiskScore(data: {
    belastingRPE: number;
    pijn: number;
    slaapKwaliteit: number;
    energie: number;
    stemming: number;
    hydratatie: number;
    voeding: number;
}): number {
    const score = (
        data.belastingRPE * 8 +
        data.pijn * 10 +
        (5 - data.slaapKwaliteit) * 10 +
        (5 - data.energie) * 8 +
        (5 - data.stemming) * 6 +
        (5 - data.hydratatie) * 5 +
        (5 - data.voeding) * 5
    ) / 47 * 100;

    return Math.round(Math.min(100, Math.max(0, score)));
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const riskScore = calculateRiskScore({
            belastingRPE: data.belastingRPE,
            pijn: data.pijn,
            slaapKwaliteit: data.slaapKwaliteit,
            energie: data.energie,
            stemming: data.stemming,
            hydratatie: data.hydratatie,
            voeding: data.voeding,
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkIn = await prisma.dailyWellness.upsert({
            where: {
                playerId_date: {
                    playerId: data.playerId,
                    date: today
                }
            },
            update: {
                sessionLoad: data.belastingRPE,
                pijn: data.pijn,
                sleepHours: data.slaapUren || 8,
                sleepKwaliteit: data.slaapKwaliteit,
                energie: data.energie,
                stemming: data.stemming,
                hydratatie: data.hydratatie,
                voeding: data.voeding,
                riskScore,
                sessionType: data.sessionType || 'training'
            },
            create: {
                playerId: data.playerId,
                date: today,
                sessionLoad: data.belastingRPE,
                pijn: data.pijn,
                sleepHours: data.slaapUren || 8,
                sleepKwaliteit: data.slaapKwaliteit,
                energie: data.energie,
                stemming: data.stemming,
                hydratatie: data.hydratatie,
                voeding: data.voeding,
                riskScore,
                sessionType: data.sessionType || 'training'
            },
        });

        // AUTO-CLOSE PULSES: Find open 'CHECKIN' pulses for this player and link them
        // This ensures they disappear from the "Active Pulses" list
        await prisma.message.updateMany({
            where: {
                playerId: data.playerId,
                type: 'PULSE',
                actionType: 'CHECKIN',
                linkedDailyWellnessId: null, // Only if not already closed
                validUntil: { gte: new Date() } // Only if not expired
            },
            data: {
                linkedDailyWellnessId: checkIn.id
            }
        });

        return NextResponse.json({ success: true, checkIn });
    } catch (error) {
        console.error('Check-in submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit check-in' },
            { status: 500 }
        );
    }
}
