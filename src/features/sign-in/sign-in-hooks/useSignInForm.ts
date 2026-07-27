import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type SignInSchema, signInSchema } from "../sign-in-schemas";

export function useSignInForm() {
  return useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
}
