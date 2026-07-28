import { twMerge } from "tailwind-merge";

export default function Loader({ className }: { className?: string }) {
  return (
    <span className="flex items-center justify-center">
      <span
        className={twMerge(
          "h-4 w-4 animate-spin rounded-full border-3 border-white border-t-transparent",
          className,
        )}
      ></span>
    </span>
  );
}
