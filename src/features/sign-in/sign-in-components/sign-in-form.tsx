"use client";
import AuthFormCard from "@/shared/AuthFormCard";
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
          <input
            id="email"
            placeholder="nama@email.com"
            {...reactHookForm.register("email")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Masukkan password"
            {...reactHookForm.register("password")}
          />
        </div>

        <button className="mt-8" type="submit">
          Masuk
        </button>
      </form>
    </AuthFormCard>
  );
}
