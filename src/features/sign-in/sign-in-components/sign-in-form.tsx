"use client";
import AuthFormCard from "@/shared/AuthFormCard";
import { Button } from "@/shared/Button";
import { Input } from "@/shared/Input";
import { InputPassword } from "@/shared/InputPassword";
import { useSignIn } from "../sign-in-hooks/useSignIn";

export default function SignInForm() {
  const { event, reactHookForm } = useSignIn();

  return (
    <AuthFormCard>
      <form onSubmit={event.onSubmit}>
        <div className="flex items-center justify-center flex-col gap-2 mb-8">
          <h2 className="text-[#1B3B22] text-[28px] font-bold">
            Masuk ke Akunmu
          </h2>
          <p className={`text-[#4A5E4E] text-sm font-['Figtree']`}>
            Silakan masukkan detail akun Anda untuk melanjutkan
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            placeholder="nama@email.com"
            {...reactHookForm.register("email")}
            className="py-3 px-4 font-['Figtree']"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <InputPassword id="password" placeholder="Masukkan password" {...reactHookForm.register("password")} inputClassName="py-3 pl-4 font-['Figtree']" />
        </div>

        <Button className="mt-8 rounded-[30px] py-3.5 w-full" type="submit">
          Masuk
        </Button>
      </form>
    </AuthFormCard>
  );
}
