import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning database...');
  await prisma.message.deleteMany();
  await prisma.dailyWellness.deleteMany();
  await prisma.user.deleteMany(); // Added User cleanup
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();

  // Default password for demo
  const password = await hash('welcome123', 10);

  // Create Coach Account
  const coach = await prisma.user.create({
    data: {
      email: 'coach@zerogauge.nl',
      password: password,
      role: 'COACH',
    },
  });
  console.log('👑 Created Coach user: coach@zerogauge.nl (pw: welcome123)');

  // Demo team
  const team = await prisma.team.create({
    data: {
      id: 'demo-team-1',
      name: 'ZeroGauge ProSport – Selectie A',
    },
  });

  console.log('✅ Created team:', team.name);

  const players = [
    { name: 'Ronald R.', position: 'Middenvelder', number: 10, photoUrl: 'https://ui-avatars.com/api/?name=Ronald+R&background=random' },
    { name: 'Daan van Dijk', position: 'Middenvelder', number: 8, photoUrl: 'https://ui-avatars.com/api/?name=Daan+van+Dijk&background=random' },
    { name: 'Levi de Jong', position: 'Aanvaller', number: 9, photoUrl: 'https://ui-avatars.com/api/?name=Levi+de+Jong&background=random' },
    { name: 'Sem Bakker', position: 'Verdediger', number: 4, photoUrl: 'https://ui-avatars.com/api/?name=Sem+Bakker&background=random' },
    { name: 'Lucas Visser', position: 'Keeper', number: 1, photoUrl: 'https://ui-avatars.com/api/?name=Lucas+Visser&background=random' },
    { name: 'Noah Smit', position: 'Verdediger', number: 5, photoUrl: 'https://ui-avatars.com/api/?name=Noah+Smit&background=random' },
    { name: 'Tim Peters', position: 'Middenvelder', number: 6, photoUrl: 'https://ui-avatars.com/api/?name=Tim+Peters&background=random' },
  ];

  const now = new Date();

  for (const p of players) {
    const email = `${p.name.toLowerCase().replace(/ /g, '.').replace(/\.$/, '')}@zerogauge.nl`;

    const player = await prisma.player.create({
      data: {
        name: p.name,
        teamId: team.id,
        position: p.position,
        email: email,
        isActive: true,
        photoUrl: p.photoUrl,
        // Create linked User account for Player
        user: {
          create: {
            email: email,
            password: password,
            role: 'PLAYER'
          }
        }
      },
    });

    console.log(`👤 Creating player & user: ${player.name} (${email})`);

    // Create a welcome message
    await prisma.message.create({
      data: {
        playerId: player.id,
        coachId: coach.id, // Use real coach ID
        content: `Welkom bij ZeroGauge, ${p.name.split(' ')[0]}! Vul elke dag je wellness in.`,
        isRead: false,
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      }
    });

    // Generate 14 days of historical data
    for (let i = 13; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      date.setHours(0, 0, 0, 0);

      // Random but somewhat realistic stats
      const sessionLoad = 4 + Math.floor(Math.random() * 6); // 4-10
      const sleepHours = 6 + Math.random() * 3; // 6-9
      const hydration = 3 + Math.floor(Math.random() * 3); // 3-5

      await prisma.dailyWellness.create({
        data: {
          playerId: player.id,
          date: date,
          sessionType: i % 7 === 0 ? 'Match' : 'Training',
          sessionLoad: sessionLoad,
          sleepHours: sleepHours,
          sleepKwaliteit: 3 + Math.floor(Math.random() * 3),
          pijn: Math.floor(Math.random() * 4),
          energie: 3 + Math.floor(Math.random() * 3),
          stemming: 3 + Math.floor(Math.random() * 3),
          hydratatie: hydration,
          urineColorMorning: 1 + Math.floor(Math.random() * 3),
          notes: i === 0 ? "Voelde me sterk vandaag." : null,
        },
      });
    }
  }

  console.log('\n🎉 Seed complete! 14 days of detailed data created per player.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
