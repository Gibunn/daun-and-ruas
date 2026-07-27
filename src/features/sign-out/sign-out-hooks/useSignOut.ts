import { startTransition, useActionState } from "react";
import { signOut } from "../sign-out-actions";

export default function useSignOut() {
  const [_state, formAction, _pending] = useActionState(signOut, null);

  const onSignOut = () => {
    startTransition(() => formAction());
  };

  return { event: { onSignOut } };
}
