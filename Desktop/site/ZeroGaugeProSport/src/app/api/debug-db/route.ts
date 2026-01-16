import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const start = Date.now();
        // Try to count users to check connection
        const userCount = await prisma.user.count();

        // Check specific coach user
        const coach = await prisma.user.findUnique({
            where: { email: 'coach@zerogauge.nl' }
        });

        const duration = Date.now() - start;

        // Mask the DB URL for security but show standard parts
        const dbUrl = process.env.DATABASE_URL || "";
        const maskedUrl = dbUrl.replace(/:[^:@]*@/, ':***@');

        return NextResponse.json({
            status: "success",
            message: "Database connection successful",
            userCount,
            coachFound: !!coach,
            coachRole: coach?.role,
            duration: `${duration}ms`,
            env: {
                databaseUrlConfigured: !!process.env.DATABASE_URL,
                databaseUrlPreview: maskedUrl,
                nodeEnv: process.env.NODE_ENV
            }
        });

    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: "Database connection failed",
            errorDetails: error.message,
            stack: error.stack,
            env: {
                databaseUrlConfigured: !!process.env.DATABASE_URL,
            }
        }, { status: 500 });
    }
}
