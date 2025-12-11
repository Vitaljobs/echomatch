import { prisma } from '@/lib/prisma';
import { ExploreClient } from './ExploreClient';

export default async function ExplorePage() {
  const echoes = await prisma.echo.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return <ExploreClient echoes={echoes} />;
}
