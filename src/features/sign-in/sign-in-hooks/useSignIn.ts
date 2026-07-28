import { startTransition, useActionState } from "react";
import { signIn } from "../sign-in-actions";
import { useSignInForm } from "./useSignInForm";

export function useSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const [state, formAction, pending] = useActionState(signIn, null);

  const onSubmit = handleSubmit(async (data) => {
    startTransition(() => formAction(data));
  });

  return {
    event: { onSubmit },
    reactHookForm: { register, errors },
    action: { formAction, state, pending },
  };
}
