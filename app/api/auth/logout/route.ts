import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        // Sign out from Supabase
        await supabase.auth.signOut();
        
        // Clear all cookies
        const response = NextResponse.json({ success: true });
        
        // Clear the main session token
        response.cookies.set("session-token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            expires: new Date(0)
        });

        // Clear Supabase cookies if they exist
        ['sb-access-token', 'sb-refresh-token'].forEach(cookieName => {
            response.cookies.set(cookieName, "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "lax",
                expires: new Date(0)
            });
        });
        
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
}