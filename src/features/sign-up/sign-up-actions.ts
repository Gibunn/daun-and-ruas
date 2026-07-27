"use server";
import { prisma } from "@/lib/prisma";
import { Response } from "@/lib/response-handler";
import type {
  ResponseWithData,
  ResponseWithoutData,
} from "@/models/response-model";
import type { Prisma } from "../../../generated/prisma/client";

export async function signUp(
  _prevState: ResponseWithData | ResponseWithoutData | null,
  data: Prisma.UserCreateInput,
) {
  try {
    await prisma.user.create({ data });
    return Response({ success: true, message: "Success sign up" });
  } catch {
    return Response({ success: false, message: "Failed sign up" });
  }
}
