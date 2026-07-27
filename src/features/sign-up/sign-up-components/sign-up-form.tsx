"use client";

import useSignUp from "../sign-up-hooks/useSignUp";

export default function SignUpForm() {
  const { action, event, reactHookForm } = useSignUp();

  return (
    <form onSubmit={event.onSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="fullname">Nama Lengkap</label>
        <input
          type="text"
          id="fullname"
          {...reactHookForm.register("fullname")}
          placeholder="Masukkan nama lengkap"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="nama@email.com"
          {...reactHookForm.register("email")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone_number">No. WhatsApp</label>
        <input
          type="number"
          id="phone_number"
          placeholder="0812XXXXXXXX"
          value={reactHookForm.watch("phone_number")}
          onChange={(e) => {
            reactHookForm.setValue(
              "phone_number",
              e.target.value.replace(/\D/g, ""),
              { shouldDirty: true, shouldTouch: true, shouldValidate: true },
            );
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...reactHookForm.register("password")}
          placeholder="Buat password minimal 8 karakter..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirm_password">Konfirmasi Password</label>
        <input
          type="password"
          id="confirm_password"
          {...reactHookForm.register("confirm_password")}
          placeholder="Ulangi password Anda..."
        />
      </div>

      <button type="submit">DAFTAR</button>
    </form>
  );
}
