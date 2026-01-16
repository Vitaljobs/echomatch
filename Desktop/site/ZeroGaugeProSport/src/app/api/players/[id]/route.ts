import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const player = await prisma.player.findUnique({
        where: { id: resolvedParams.id }
    });

    if (!player) {
        return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json(player);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const data = await req.json();
    const player = await prisma.player.update({
        where: { id: resolvedParams.id },
        data
    });
    return NextResponse.json(player);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    await prisma.player.update({
        where: { id: resolvedParams.id },
        data: { isActive: false }
    });
    return NextResponse.json({ success: true });
}
