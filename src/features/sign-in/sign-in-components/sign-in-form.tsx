"use client";
import AuthFormCard from "@/shared/AuthFormCard";
import { useSignIn } from "../sign-in-hooks/useSignIn";

export default function SignInForm() {
  const { action, event, reactHookForm } = useSignIn();

  return (
    <AuthFormCard>
      <form onSubmit={event.onSubmit}>
        <div className="flex flex-col gap-2">
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

        <button type="submit">Masuk</button>
      </form>
    </AuthFormCard>
  );
}
