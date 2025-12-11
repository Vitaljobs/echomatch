import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, tag } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is verplicht' },
        { status: 400 }
      );
    }

    const echo = await prisma.echo.create({
      data: {
        content,
        tag: tag && typeof tag === 'string' ? tag : null,
      },
    });

    return NextResponse.json(echo, { status: 201 });
  } catch (error) {
    console.error('Error creating echo', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het opslaan' },
      { status: 500 }
    );
  }
}
