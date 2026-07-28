import { EyeClosed, EyeIcon } from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputPassword extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string;
}

export function InputPassword({ inputClassName, className, ...props }: InputPassword) {
    const [show, setShow] = useState(false);

    return (
        <div className={twMerge('flex justify-between items-center bg-[#F9F8F3] border rounded-xl border-[#E1E5E1] text-[#4A5E4E]', className)}>
            <input className={twMerge('focus:outline-0 w-full rounded-xl', inputClassName)} type={!show ? "password" : "text"} {...props} />
            <button className="cursor-pointer pr-4" type="button" onClick={() => setShow(!show)}>
                {!show ?
                    <EyeIcon size={18} /> : <EyeClosed size={18} />
                }
            </button>
        </div>
    );
}
