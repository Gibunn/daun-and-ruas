import { prisma } from "@/lib/prisma";
import type { Prisma } from "../../../generated/prisma/client";

export async function signUp(data: Prisma.UserCreateInput) {
  return await prisma.user.create({ data });
}
