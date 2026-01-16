import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { hash } from 'bcryptjs';

const createSchema = z.object({
    name: z.string().min(1, 'Naam is verplicht'),
    email: z.string().email('Geldig emailadres is verplicht'), // Email is now required for login
    position: z.string().optional(),
    photoUrl: z.string().url().optional().or(z.literal('')),
});

export async function GET() {
    try {
        const players = await prisma.player.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(players);
    } catch (error) {
        return NextResponse.json(
            { error: 'Fout bij ophalen spelers' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const json = await req.json();
        const data = createSchema.parse(json);

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Er bestaat al een gebruiker met dit emailadres' },
                { status: 400 }
            );
        }

        const hashedPassword = await hash('welcome123', 10);

        const player = await prisma.player.create({
            data: {
                name: data.name,
                email: data.email,
                position: data.position,
                photoUrl: data.photoUrl,
                user: {
                    create: {
                        email: data.email,
                        password: hashedPassword,
                        role: 'PLAYER'
                    }
                }
            }
        });

        return NextResponse.json(player, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Ongeldige data', details: error.issues }, // use .issues or .errors
                { status: 400 }
            );
        }
        console.error('Create player error:', error);
        return NextResponse.json(
            { error: 'Fout bij aanmaken speler', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
