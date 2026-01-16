import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let playerId = req.nextUrl.searchParams.get('playerId');
    const user = session.user as any;

    // Security: If user is PLAYER, force playerId to be their own
    if (user.role === 'PLAYER') {
        playerId = user.playerId;
    }

    // COACH: If no playerId, fetch RECENT messages from ALL players (Inbox view)
    if (!playerId) {
        if (user.role !== 'COACH') {
            return NextResponse.json({ error: 'Player ID required' }, { status: 400 });
        }

        // Fetch last 50 messages for this coach context
        const messages = await prisma.message.findMany({
            where: {
                // optional: coachId: user.id
            },
            include: {
                player: {
                    select: { id: true, name: true, photoUrl: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });
        return NextResponse.json(messages);
    }

    // Specific thread fetch
    const messages = await prisma.message.findMany({
        where: { playerId },
        include: {
            player: true,
            linkedDailyWellness: { select: { createdAt: true } }
        },
        orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { recipientId, playerId, content, coachId, type, actionType, actionLink, actionLabel, title, validUntil } = await req.json(); // recipientId preferred
        const user = session.user as any;

        // Determine the actual type or default
        const msgType = type || "CHAT";
        const msgActionType = actionType || "NONE";

        let targetId = recipientId || playerId;

        // Security: If user is PLAYER, force them availability message only their own thread
        if (user.role === 'PLAYER') {
            targetId = user.playerId;
            // Players can only send CHAT
            if (msgType !== "CHAT") {
                return NextResponse.json({ error: 'Players cannot send Pulses' }, { status: 403 });
            }
        }

        // BROADCAST LOGIC (Only for COACH)
        if (targetId === "ALL") {
            if (user.role !== 'COACH') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
            }

            // Fetch all active players
            const players = await prisma.player.findMany({
                where: { isActive: true },
                select: { id: true }
            });

            const activeCoachId = coachId || user.id;

            // Use a transaction or Promise.all
            // createMany is supported in SQLite
            await prisma.message.createMany({
                data: players.map(p => ({
                    playerId: p.id,
                    coachId: activeCoachId,
                    content,
                    title,
                    type: msgType,
                    actionType: msgActionType,
                    actionLink,
                    actionLabel,
                    validUntil: validUntil ? new Date(validUntil) : null,
                    isRead: false
                }))
            });

            return NextResponse.json({ success: true, count: players.length }, { status: 201 });
        }

        // SINGLE MESSAGE
        const activeCoachId = coachId || (user.role === 'COACH' ? user.id : 'coach-1');

        const message = await prisma.message.create({
            data: {
                playerId: targetId,
                content,
                coachId: activeCoachId,
                title,
                type: msgType,
                actionType: msgActionType,
                actionLink,
                actionLabel,
                validUntil: validUntil ? new Date(validUntil) : null
            }
        });

        return NextResponse.json(message, { status: 201 });
    } catch (error: any) {
        console.error("Message API Error:", error);
        return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
    }
}
