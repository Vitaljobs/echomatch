import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Ongeldige id' }, { status: 400 });
  }

  await prisma.echo.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
