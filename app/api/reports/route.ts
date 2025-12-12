import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { subject, description, category } = body;

    if (!description || description.trim().length < 20) {
      return NextResponse.json(
        { ok: false, error: 'Beschrijving moet minimaal 20 tekens zijn.' },
        { status: 400 }
      );
    }

    // TODO: later Prisma aanroepen om echt op te slaan
    console.log('Ontvangen melding (API):', { subject, description, category });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Fout in /api/reports', error);
    return NextResponse.json(
      { ok: false, error: 'Interne serverfout' },
      { status: 500 }
    );
  }
}
