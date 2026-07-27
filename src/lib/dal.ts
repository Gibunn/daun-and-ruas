import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { JWT_SECRET } from "./constants";

const secret = new TextEncoder().encode(JWT_SECRET);

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) redirect("/sign-in");

  try {
    const { payload } = await jwtVerify(token, secret);
    return { userId: payload.userId as string, role: payload.role as string };
  } catch {
    redirect("/sign-in");
  }
});
