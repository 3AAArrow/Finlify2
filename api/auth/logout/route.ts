import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });
  // Expire the session-token cookie
  response.cookies.set('session-token', '', { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    path: '/', 
    sameSite: 'lax',
    expires: new Date(0) 
  });
  return response;
}
