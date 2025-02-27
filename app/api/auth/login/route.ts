import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        
        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        // Sign in with Supabase
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Supabase login error:", error);
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        if (!session) {
            console.error("No session data returned");
            return NextResponse.json({ error: "Authentication failed - no session" }, { status: 401 });
        }

        // Generate a session token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret');
        const token = await new SignJWT({ 
            email: session.user.email,
            userId: session.user.id,
            supabaseSession: session.access_token 
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('8h')
            .sign(secret);

        // Create response with success status
        const response = NextResponse.json({ success: true });
        
        // Set cookie with proper settings
        response.cookies.set('session-token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            path: '/', 
            sameSite: 'lax',
            maxAge: 60 * 60 * 8 // 8 hours
        });

        return response;

    } catch (err) {
        console.error("Login route error:", err);
        return NextResponse.json({ error: "Server error during login" }, { status: 500 });
    }
}