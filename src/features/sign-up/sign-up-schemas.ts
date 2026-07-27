import z from "zod";

export const signUpSchema = z
  .object({
    fullname: z.string().min(1, "Nama lengkap tidak boleh kosong"),
    email: z.email("Format email tidak valid"),
    phone_number: z.string().min(1, "No. WhatsApp tidak boleh kosong"),
    password: z.string().min(8, "Password minimal harus 8 karakter"),
    confirm_password: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Password tidak sama",
        path: ["confirm_password"],
      });
    }

    if (!/[A-Z]/.test(val.password)) {
      ctx.addIssue({
        code: "custom",
        message: "Password harus mengandung minimal satu huruf besar",
        path: ["password"],
      });
    }

    if (!/[a-z]/.test(val.password)) {
      ctx.addIssue({
        code: "custom",
        message: "Password harus mengandung minimal satu huruf kecil",
        path: ["password"],
      });
    }

    if (!/[0-9]/.test(val.password)) {
      ctx.addIssue({
        code: "custom",
        message: "Password harus mengandung minimal satu angka",
        path: ["password"],
      });
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(val.password)) {
      ctx.addIssue({
        code: "custom",
        message: "Password harus mengandung minimal satu simbol",
        path: ["password"],
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
