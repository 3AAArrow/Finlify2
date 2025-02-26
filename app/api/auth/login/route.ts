import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if password is correct
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Create session token
    const token = await new SignJWT({ 
      id: user.id,
      email: user.email
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret'));

    // Create the response
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

    // Set cookie with updated configuration
    response.cookies.set('session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' to allow redirects
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/' // Ensure cookie is available across all paths
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Error during login" },
      { status: 500 }
    );
  }
}