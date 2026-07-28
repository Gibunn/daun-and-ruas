"use client";
import Link from "next/link";
import AuthFormCard from "@/shared/AuthFormCard";
import { Button } from "@/shared/Button";
import { Input } from "@/shared/Input";
import { InputPassword } from "@/shared/InputPassword";
import { useSignIn } from "../sign-in-hooks/useSignIn";
import SignInFormSeparator from "./sign-in-form-separator";
import Loader from "@/shared/Loader";

export default function SignInForm() {
  const { action, event, reactHookForm } = useSignIn();

  return (
    <AuthFormCard>
      <form onSubmit={event.onSubmit}>
        <div className="flex items-center justify-center flex-col gap-2 mb-8">
          <h2 className="text-[#1B3B22] text-[28px] font-bold">
            Masuk ke Akunmu
          </h2>
          <p className={`text-[#4A5E4E] text-sm font-figtree`}>
            Silakan masukkan detail akun Anda untuk melanjutkan
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-5 font-figtree">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <Input
            id="email"
            disabled={action.pending}
            placeholder="nama@email.com"
            {...reactHookForm.register("email")}
            className="py-2 px-4 text-[15px] font-semibold"
          />
          {action.state?.status === 400 && !reactHookForm.errors.email && (
            <span className="text-red-500 text-sm">{action.state.message}</span>
          )}
          {reactHookForm.errors.email && (
            <span className="text-red-500 text-sm">
              {reactHookForm.errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5 font-figtree">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <InputPassword
            id="password"
            disabled={action.pending}
            placeholder="Masukkan password Anda..."
            {...reactHookForm.register("password")}
            inputClassName="py-2 pl-4 text-[15px] font-semibold"
          />
          {action.state?.status === 400 && (
            <span className="text-red-500 text-sm">{action.state.message}</span>
          )}
          {reactHookForm.errors.password && (
            <span className="text-red-500 text-sm">
              {reactHookForm.errors.password.message}
            </span>
          )}
        </div>

        <div className="flex justify-between font-figtree">
          <div className="flex items-center justify-center gap-2 text-[13px] font-light">
            <input
              id="remember_me"
              type="checkbox"
              className="bg-[#F9F8F3] border border-[#E1E5E1] rounded-sm"
            />
            <label htmlFor="remember_me" className="text-[#4A5E4E]">
              Ingat saya
            </label>
          </div>

          <Link href="/" className="text-[#C97A53] text-[13px] font-semibold">
            Lupa Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={action.pending}
          className="mt-8 mb-4 rounded-[30px] py-3 w-full"
        >
          {action.pending ? (
            <span className="flex gap-2 items-center justify-center">
              <Loader />
              MASUK
            </span>
          ) : (
            "MASUK"
          )}
        </Button>

        <SignInFormSeparator />

        <Button
          type="submit"
          variant="outline"
          disabled={action.pending}
          className="mt-4 rounded-[30px] py-3 w-full mb-8"
        >
          Masuk dengan Google
        </Button>

        <div className="flex justify-center">
          <span className="text-sm font-figtree font-light text-[#4A5E4E]">
            Belum punya akun?{" "}
            <Link href="/sign-up" className="text-[#C97A53] font-bold">
              Daftar di sini
            </Link>
          </span>
        </div>
      </form>
    </AuthFormCard>
  );
}
