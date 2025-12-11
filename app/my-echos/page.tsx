// app/my-echos/page.tsx
import { prisma } from '@/lib/prisma';
import { PostForm } from '@/components/PostForm';
import { MyEchosClient } from './MyEchosClient';

export default async function MyEchosPage() {
  const echoes = await prisma.echo.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <>
      <div className="text-slate-100 text-2xl font-semibold mb-8">
        Mijn Echo's
      </div>
      <PostForm />
      <MyEchosClient initialEchoes={echoes} />
    </>
  );
}
