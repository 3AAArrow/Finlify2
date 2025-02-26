import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, private',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    if (!user) {
      return new NextResponse(
        JSON.stringify({ authenticated: false }), 
        { status: 401, headers }
      );
    }

    return new NextResponse(
      JSON.stringify({ 
        authenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          totalScore: user.totalScore,
          quizzesTaken: user.quizzesTaken
        }
      }), 
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Auth check error:", error);
    return new NextResponse(
      JSON.stringify({ authenticated: false }), 
      { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate, private',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}