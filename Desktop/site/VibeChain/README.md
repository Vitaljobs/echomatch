# VibeChain Setup & Deploy

## Environment Variables
Create a `.env` file in the root directory with the following keys:

```bash
DATABASE_URL="postgresql://user:password@host:5432/db"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## Deployment
1. Login to Vercel:
   ```bash
   npx vercel login
   ```
2. Deploy:
   ```bash
   npx vercel --prod
   ```
   (Or connect your GitHub repository to Vercel).

## Database
Sync your Prisma schema with the database:
```bash
npx prisma db push
```

## Project Structure
- `src/app/page.tsx`: Hero Section
- `src/app/vibe/chain/[id]/page.tsx`: Butterfly Chain Flow
- `src/lib/supabase.ts`: Supabase Client
- `prisma/schema.prisma`: Database Schema
