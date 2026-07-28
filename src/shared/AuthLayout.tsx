"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div className="flex bg-[#F9F8F3]">
      {path === "/sign-in" && (
        <Image
          width={720}
          height={900}
          alt="Sign in panel"
          className="w-full h-screen object-cover"
          src="/sign-in-panel-image.svg"
        />
      )}

      {path === "/sign-up" && (
        <Image
          width={720}
          height={900}
          alt="Sign in panel"
          className="w-full h-screen object-cover"
          src="/sign-up-panel-image.svg"
        />
      )}
      {children}
    </div>
  );
}
