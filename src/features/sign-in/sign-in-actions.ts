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

    const compareResult = comparePassword(data.password, user?.password ?? "");

    console.log(compareResult);

    return { success: true, status: 200, message: "" };
  } catch (e) {
    const prismaResponse = PrismaErrorResponse(e);
    return Response({
      success: false,
      status: prismaResponse.status,
      message: prismaResponse.message,
    });
  }
}
