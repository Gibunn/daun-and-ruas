import type React from "react";
import AuthLayout from "@/shared/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
