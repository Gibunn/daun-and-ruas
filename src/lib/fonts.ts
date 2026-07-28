import { Figtree, Fraunces } from "next/font/google";

export const fraunces = Fraunces({ subsets: ["latin"] });
export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
});
