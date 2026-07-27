"use server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { comparePassword } from "@/lib/bcrypt";
import { JWT_SECRET } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { PrismaErrorResponse, Response } from "@/lib/response-handler";
import type { ResponseWithoutData } from "@/models/response-model";
import type { SignInSchema } from "./sign-in-schemas";

const secret = new TextEncoder().encode(JWT_SECRET);

export async function signIn(
  _prevState: ResponseWithoutData | null,
  data: SignInSchema,
): Promise<ResponseWithoutData | null> {
  try {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (!user)
      return Response({
        success: false,
        status: 400,
        message: "Akun tidak terdaftar",
      });

    const compareResult = await comparePassword(
      data.password,
      user?.password ?? "",
    );

    if (!compareResult)
      return Response({
        success: false,
        status: 400,
        message: "Email atau password salah",
      });

    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setExpirationTime("7d")
      .sign(secret);

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, status: 200, message: "Berhasil login" };
  } catch (e) {
    const prismaResponse = PrismaErrorResponse(e);
    return Response({
      success: false,
      status: prismaResponse.status,
      message:
        prismaResponse.status === 400
          ? "Email atau password salah"
          : prismaResponse.message,
    });
  }
}
