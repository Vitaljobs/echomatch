import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        if (path.startsWith("/dashboard/team") || path.startsWith("/admin")) {
            if (token?.role !== "COACH" && token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/dashboard/personal", req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login", // Updated from /auth/login based on file structure
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
