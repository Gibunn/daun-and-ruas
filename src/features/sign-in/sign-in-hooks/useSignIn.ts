import { startTransition, useActionState, useEffect } from "react";
import { signIn } from "../sign-in-actions";
import { useSignInForm } from "./useSignInForm";

export function useSignIn() {
  const { register, handleSubmit } = useSignInForm();

  const [state, formAction, pending] = useActionState(signIn, null);

  const onSubmit = handleSubmit(async (data) => {
    startTransition(() => formAction(data));
  });

  return {
    event: { onSubmit },
    reactHookForm: { register },
    action: { formAction, state, pending },
  };
}
