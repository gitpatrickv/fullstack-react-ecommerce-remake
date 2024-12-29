import { z } from "zod";

export interface User {
  userId: number;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  picture?: string;
  gender: string;
  role: string;
  userModel: string;
  storeName?: string;
  status: string;
}

export const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email(),
    gender: z.string().min(1, "Gender is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must match the password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password & Confirm Password do not match!",
    path: ["confirmPassword"],
  });
