"use client"
import useSignOut from "../sign-out-hooks/useSignOut";

export default function SignOutButton() {
  const { event } = useSignOut();

  return (
    <button type="button" onClick={event.onSignOut}>
      Sign Out
    </button>
  );
}
