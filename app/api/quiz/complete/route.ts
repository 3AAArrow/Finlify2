import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { score } = await request.json();

    // Update user's total score and quizzes taken
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        totalScore: { increment: score },
        quizzesTaken: { increment: 1 }
      },
      select: {
        id: true,
        totalScore: true,
        quizzesTaken: true
      }
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error updating quiz results" },
      { status: 500 }
    );
  }
}