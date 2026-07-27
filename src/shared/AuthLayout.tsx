import Image from "next/image";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#F9F8F3]">
      <Image
        width={720}
        height={900}
        alt="Sign in panel"
        className="w-full h-screen object-cover"
        src="/sign-in-panel-image.svg"
      />
      {children}
    </div>
  );
}
