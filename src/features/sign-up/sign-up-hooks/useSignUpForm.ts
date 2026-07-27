import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type SignUpSchema, signUpSchema } from "../sign-up-schemas";

export function useSignUpForm() {
  return useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    },
  });
}
