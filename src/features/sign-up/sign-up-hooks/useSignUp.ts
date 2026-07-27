import { useActionState } from "react";
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

  const [_, formAction, isPending] = useActionState(signUp, null);

  const onSubmit = handleSubmit((data) => formAction(data));

  return {
    event: { onSubmit },
    action: { isPending },
    reactHookForm: { register, watch, setValue, errors },
  };
}
