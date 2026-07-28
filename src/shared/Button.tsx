import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariant = {
  fill: { style: "bg-[#1B3B22] text-white" },
  outline: { style: "border-[1.5px] border-[#1B3B22] text-[#1B3B22]" },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "fill" | "outline";
}

export function Button({
  disabled = false,
  className,
  type = "button",
  variant = "fill",
  children = "Action",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        `${buttonVariant[variant].style} font-figtree font-medium ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`,
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
