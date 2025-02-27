import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { jwtVerify } from 'jose';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // First check if a valid session-token cookie exists
    const cookieHeader = request.headers.get('cookie');
    let customTokenValid = false;
    
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split(';').map(cookie => {
          const [key, value] = cookie.trim().split('=');
          return [key, value];
        })
      );
      
      if (cookies['session-token']) {
        try {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret');
          await jwtVerify(cookies['session-token'], secret);
          customTokenValid = true;
        } catch (tokenError) {
          console.error('Token verification failed:', tokenError);
        }
      }
    }

    // If custom token is valid, user is authenticated
    if (customTokenValid) {
      return NextResponse.json({ authenticated: true });
    }
    
    // Fallback to Supabase session check
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ authenticated: false, error: error.message }, { status: 401 });
    }

    return NextResponse.json({ authenticated: Boolean(user) });
  } catch (err) {
    console.error('Auth check error:', err);
    return NextResponse.json({ authenticated: false, error: 'Server error' }, { status: 500 });
  }
}