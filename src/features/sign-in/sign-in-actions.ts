"use server";
import { comparePassword } from "@/lib/bcrypt";
import { prisma } from "@/lib/prisma";
import { PrismaErrorResponse, Response } from "@/lib/response-handler";
import type { ResponseWithoutData } from "@/models/response-model";
import type { SignInSchema } from "./sign-in-schemas";

export async function signIn(
  _prevState: ResponseWithoutData | null,
  data: SignInSchema,
): Promise<ResponseWithoutData | null> {
  try {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

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
