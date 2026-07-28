import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputNumber({
  onChange,
  className,
  ...props
}: InputNumberProps) {
  return (
    <input
      className={twMerge(
        "bg-[#F9F8F3] border rounded-xl border-[#E1E5E1] text-[#4A5E4E] focus:outline-0",
        className,
      )}
      inputMode="numeric"
      onChange={(e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        onChange?.(e);
      }}
      {...props}
    />
  );
}
