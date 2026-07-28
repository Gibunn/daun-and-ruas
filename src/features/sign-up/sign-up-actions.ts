"use server";
import { hashPassword } from "@/lib/bcrypt";
import { prisma } from "@/lib/prisma";
import { PrismaErrorResponse, Response } from "@/lib/response-handler";
import type {
  ResponseWithData,
  ResponseWithoutData,
} from "@/models/response-model";
import type { SignUpSchema } from "./sign-up-schemas";
import { redirect } from "next/navigation";

export async function signUp(
  _prevState: ResponseWithData | ResponseWithoutData | null,
  data: SignUpSchema,
) {
  let isSuccess = false;

  try {
    const hashedPassword = await hashPassword(data.password);

    await prisma.user.create({
      data: {
        email: data.email,
        fullname: data.fullname,
        password: hashedPassword,
        phone_number: data.phone_number,
      },
    });

    isSuccess = true;
  } catch (e) {
    console.log(e);
    const prismaResponse = PrismaErrorResponse(e);

    return Response({
      success: false,
      status: prismaResponse.status,
      message: prismaResponse.message,
    });
  }

  if (isSuccess) redirect("/sign-in");

  return null;
}
