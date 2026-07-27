"use server";
import { hashPassword } from "@/lib/bcrypt";
import { prisma } from "@/lib/prisma";
import { Response } from "@/lib/response-handler";
import type {
  ResponseWithData,
  ResponseWithoutData,
} from "@/models/response-model";
import type { SignUpSchema } from "./sign-up-schemas";

export async function signUp(
  _prevState: ResponseWithData | ResponseWithoutData | null,
  data: SignUpSchema,
) {
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

    return Response({ success: true, message: "Success sign up" });
  } catch {
    return Response({ success: false, message: "Failed sign up" });
  }
}
