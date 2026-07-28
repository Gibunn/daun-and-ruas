import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function AuthFormCard({
  children,
  className,
  logoClassName,
}: {
  children: React.ReactNode;
  className?: string;
  logoClassName?: string;
}) {
  return (
    <div
      className={twMerge(
        "w-125 p-12 rounded-3xl bg-white border border-[#E1E5E1]",
        className,
      )}
    >
      <div
        className={twMerge(
          "flex items-center justify-center mb-4",
          logoClassName,
        )}
      >
        <Image
          width={193}
          height={30}
          alt="Company logo"
          src="/company-logo.svg"
        />
      </div>
      {children}
    </div>
  );
}
