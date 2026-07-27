"use client";

import useSignUp from "../sign-up-hooks/useSignUp";

export default function SignUpForm() {
  const { action, event, reactHookForm } = useSignUp();

  return (
    <form onSubmit={event.onSubmit}>
      <button type="button">DAFTAR</button>
    </form>
  );
}
