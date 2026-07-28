"use client";
import AuthFormCard from "@/shared/AuthFormCard";
import { useSignUp } from "../sign-up-hooks/useSignUp";
import { Input } from "@/shared/Input";
import { InputNumber } from "@/shared/InputNumber";
import { InputPassword } from "@/shared/InputPassword";
import Link from "next/link";
import { Button } from "@/shared/Button";
import Loader from "@/shared/Loader";

export default function SignUpForm() {
  const { action, event, reactHookForm } = useSignUp();

  return (
    <AuthFormCard className="p-10 w-125 h-fit" logoClassName="mb-3">
      <form onSubmit={event.onSubmit}>
        <div className="flex items-center justify-center flex-col mb-6">
          <h2 className="text-[#1B3B22] text-[28px] font-bold">
            Buat Akun Baru
          </h2>
          <p className={`text-[#4A5E4E] text-sm font-figtree`}>
            Bergabunglah dengan sahabat hijau kami hari ini
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-4 font-figtree">
          <label htmlFor="fullname" className="font-semibold">
            Nama Lengkap
          </label>
          <Input
            type="text"
            id="fullname"
            {...reactHookForm.register("fullname")}
            placeholder="Masukkan nama lengkap Anda..."
            className="py-2 px-4 text-[15px] font-semibold"
          />
          {reactHookForm.errors.fullname && (
            <span className="text-red-500 text-sm">
              {reactHookForm.errors.fullname.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4 font-figtree">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <Input
            id="email"
            type="text"
            placeholder="nama@email.com"
            {...reactHookForm.register("email")}
            className="py-2 px-4 text-[15px] font-semibold"
          />
          {reactHookForm.errors.email && (
            <span className="text-red-500 text-sm">
              {reactHookForm.errors.email.message}
            </span>
          )}
          {action.state?.status === 409 && !reactHookForm.errors.email && (
            <span className="text-red-500 text-sm">
              {action.state.message.includes("email") &&
                "Akun dengan email tersebut sudah ada"}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4 font-figtree">
          <label htmlFor="phone_number" className="font-semibold">
            No. WhatsApp
          </label>
          <InputNumber
            id="phone_number"
            placeholder="0812XXXXXXXX"
            {...reactHookForm.register("phone_number")}
            className="py-2 px-4 text-[15px] font-semibold"
          />

          {reactHookForm.errors.phone_number && (
            <span className="text-red-500 text-sm">
              {reactHookForm.errors.phone_number.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4 font-figtree">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <InputPassword
            id="password"
            {...reactHookForm.register("password")}
            placeholder="Buat password minimal 8 karakter..."
            inputClassName="py-2 px-4 text-[15px] font-semibold"
          />

          {reactHookForm.errors.password && (
            <span className="text-red-500 text-sm">
              {reactHookForm.errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4 font-figtree">
          <label htmlFor="confirm_password" className="font-semibold">
            Konfirmasi Password
          </label>
          <InputPassword
            id="confirm_password"
            placeholder="Ulangi password Anda..."
            {...reactHookForm.register("confirm_password")}
            inputClassName="py-2 px-4 text-[15px] font-semibold"
          />

          {reactHookForm.errors.confirm_password && (
            <span className="text-red-500 text-sm">
              {reactHookForm.errors.confirm_password.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-[13px] font-light font-figtree">
          <input
            id="remember_me"
            type="checkbox"
            className="bg-[#F9F8F3] border border-[#E1E5E1] rounded-sm"
          />
          <label htmlFor="remember_me" className="text-[#4A5E4E]">
            Saya setuju dengan{" "}
            <Link href="/" className="text-[#C97A53] font-semibold">
              Syarat & Ketentuan
            </Link>{" "}
            serta
            <Link href="/" className="text-[#C97A53] font-semibold">
              Kebijakan Privasi
            </Link>{" "}
            Daun & Ruas.
          </label>
        </div>

        <Button className="mt-6 mb-4 rounded-[30px] py-3 w-full" type="submit">
          {action.isPending ? (
            <span className="flex gap-2 items-center justify-center">
              <Loader />
              DAFTAR
            </span>
          ) : (
            "DAFTAR"
          )}
        </Button>

        <div className="flex justify-center">
          <span className="text-sm font-figtree font-light text-[#4A5E4E]">
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="text-[#C97A53] font-bold">
              Masuk di sini
            </Link>
          </span>
        </div>
      </form>
    </AuthFormCard>
  );
}
