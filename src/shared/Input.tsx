import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={twMerge(
                "bg-[#F9F8F3] border rounded-xl border-[#E1E5E1] text-[#4A5E4E] focus:outline-0",
                className,
            )}
            {...props}
        />
    );
}
