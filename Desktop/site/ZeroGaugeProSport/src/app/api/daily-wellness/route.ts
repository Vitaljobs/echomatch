
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { calculateRisk, Meting } from "@/lib/riskCalculator";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'PLAYER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const playerId = (session.user as any).playerId;
  if (!playerId) {
    return NextResponse.json({ error: 'Player ID missing from session' }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Destructure and validate simplistic fields
    const {
      sessionType = "Training", // Default
      sessionLoad,
      sleepHours,
      sleepQuality, // Kept for legacy/risk calc
      sleepStartTime, // NEW
      nightAwakenings, // NEW
      pain,
      energy,
      mood,
      hydration, // Kept for legacy/risk calc (1-5)
      waterIntakeLiters, // NEW
      lastMealTime, // NEW
      urineColorMorning, // NEW
      urineColorEvening, // NEW
      nutrition,
      notes
    } = body;

    // Extract pulseId separately
    const pulseId = body.pulseId;

    // Construct meting object for risk calculation
    const meting: Meting = {
      belastingRPE: sessionLoad || 0,
      pijn: pain || 0,
      slaapKwaliteit: sleepQuality || 3,
      energie: energy || 3,
      stemming: mood || 3,
      hydratatie: hydration || 3,
      voeding: nutrition || 3
    };

    const riskResult = calculateRisk(meting);

    // Normalize date to start of day to prevent duplicates for same day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Uses Upsert to allow correction within the same day
    const dailyWellness = await prisma.dailyWellness.upsert({
      where: {
        playerId_date: {
          playerId: playerId,
          date: today
        }
      },
      update: {
        sessionType,
        sessionLoad: meting.belastingRPE,
        sleepHours: parseFloat(sleepHours) || 0,
        sleepKwaliteit: meting.slaapKwaliteit,
        sleepBedtime: sleepStartTime,
        nightAwakenings: nightAwakenings,
        pijn: meting.pijn,
        energie: meting.energie,
        stemming: meting.stemming,
        hydratatie: meting.hydratatie, // Score 1-5
        hydrationIntake: parseFloat(waterIntakeLiters) || null, // Liters
        urineColorMorning: urineColorMorning,
        urineColorEvening: urineColorEvening,
        lastMealTime: lastMealTime,
        voeding: meting.voeding,
        notes: notes,
        riskScore: riskResult.score,
        // detail recovery fields could be added later
      },
      create: {
        playerId: playerId,
        date: today,
        sessionType,
        sessionLoad: meting.belastingRPE,
        sleepHours: parseFloat(sleepHours) || 0,
        sleepKwaliteit: meting.slaapKwaliteit,
        sleepBedtime: sleepStartTime,
        nightAwakenings: nightAwakenings,
        pijn: meting.pijn,
        energie: meting.energie,
        stemming: meting.stemming,
        hydratatie: meting.hydratatie,
        hydrationIntake: parseFloat(waterIntakeLiters) || null,
        urineColorMorning: urineColorMorning,
        urineColorEvening: urineColorEvening,
        lastMealTime: lastMealTime,
        voeding: meting.voeding,
        notes: notes,
        riskScore: riskResult.score
      }
    });

    // CLOSE THE LOOP: If this check-in came from a Pulse, link it!
    if (pulseId) {
      // We do this asynchronously or awaited, doesn't strictly matter for the user response, but safe to await.
      try {
        await prisma.message.update({
          where: { id: pulseId },
          data: { linkedDailyWellnessId: dailyWellness.id }
        });
      } catch (linkError) {
        console.warn("Failed to link pulse:", linkError);
        // Don't fail the whole request just because linking failed
      }
    }

    return NextResponse.json(dailyWellness, { status: 200 });

  } catch (error) {
    console.error("Daily wellness submit error:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
