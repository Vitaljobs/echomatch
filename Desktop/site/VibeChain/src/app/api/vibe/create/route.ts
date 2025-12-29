import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({ status: 'PENDING', id: 'demo-vibe-1' });
}
