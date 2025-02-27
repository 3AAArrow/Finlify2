import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// List of paths that require authentication
const protectedPaths = ['/profile', '/leaderboard', '/quiz'];

// List of paths that are public
const publicPaths = ['/', '/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for public paths or non-protected paths
  if (publicPaths.includes(path) || !protectedPaths.some(prefix => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Check for session-token cookie
  const sessionToken = request.cookies.get('session-token')?.value;

  if (!sessionToken) {
    // Redirect to login if no token
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }

  try {
    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret');
    await jwtVerify(sessionToken, secret);
    
    // Token is valid, proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    
    // Redirect to login on invalid token
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};