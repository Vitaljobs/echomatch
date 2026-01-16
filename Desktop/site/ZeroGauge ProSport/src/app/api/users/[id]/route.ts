import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!session || (session.user as any).id !== id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                photoUrl: data.photoUrl
            }
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Update user error:", error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
