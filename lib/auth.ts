import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCurrentUser() {
  const token = cookies().get("session-token");

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET || "default-secret")
    );

    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: {
        id: true,
        name: true,
        email: true,
        totalScore: true,
        quizzesTaken: true
      }
    });

    return user;
  } catch (error) {
    return null;
  }
}