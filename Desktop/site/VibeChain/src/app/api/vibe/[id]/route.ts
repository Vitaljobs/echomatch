import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// import { prisma } from '@/lib/prisma'; // If using Prisma

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const { id } = params;

    // Example: Fetch from Supabase or Prisma
    // const { data, error } = await supabase.from('VibeChain').select('*').eq('id', id).single();

    // Return mock data for MVP demo
    return NextResponse.json({
        id,
        status: 'PENDING',
        sender: { name: 'Lisa', age: 24, match: 0.98 },
        receiver: { name: 'You', status: 'ONLINE' },
        butterfly_effect: true
    });
}
