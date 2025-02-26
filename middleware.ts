import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];
const PUBLIC_API_PATHS = ["/api/auth/login", "/api/auth/register", "/api/auth/check"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public paths
  if (PUBLIC_PATHS.includes(path) || PUBLIC_API_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get("session-token");
  if (!token) {
    if (path.startsWith("/api/")) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        },
      });
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Verify token
    await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET || "default-secret")
    );
    return NextResponse.next();
  } catch (error) {
    // Token is invalid
    if (path.startsWith("/api/")) {
      return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        },
      });
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};