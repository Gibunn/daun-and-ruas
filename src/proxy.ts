import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("session");

  if (token && request.nextUrl.pathname.startsWith("/sign-in")) {
    console.log("masuk");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/dashboard", "/dashboard/profile/:path*"],
};
