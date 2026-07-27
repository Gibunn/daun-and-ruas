import { startTransition, useActionState } from "react";
import { signUp } from "../sign-up-actions";
import { useSignUpForm } from "./useSignUpForm";

export default function useSignUp() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm();

  const [state, formAction, isPending] = useActionState(signUp, null);

  console.log(state);

  const onSubmit = handleSubmit((data) =>
    startTransition(() => {
      formAction(data);
    }),
  );

  return {
    event: { onSubmit },
    action: { isPending, state },
    reactHookForm: { register, watch, setValue, errors },
  };
}
