import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const echoes = await prisma.echo.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  return NextResponse.json(echoes);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { content, tag } = body as { content?: string; tag?: string };

  if (!content || content.trim().length === 0) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  const echo = await prisma.echo.create({
    data: {
      content: content.trim(),
      tag: tag ?? null,
    },
  });

  return NextResponse.json(echo, { status: 201 });
}
