// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Middleware for handling login redirection on paths that require authentication (currently only checks if a session cookie is set) */
export function middleware(request: NextRequest) {
    // Backend sets a cookie called "session"
    const session = request.cookies.get("session");

    // Redirect to login if there is no active session
    if (!session) {
        const loginUrl = `${request.nextUrl.origin}/api/auth/login?current_url=${encodeURIComponent(request.url)}`;
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

/** Paths where the session cookie will be checked */
export const config = {
    matcher: ["/manager", "/manager/:path*"],
};
