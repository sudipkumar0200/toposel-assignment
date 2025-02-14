import z from "zod";

export const signUpInput = z.object({
  userName: z.string(),
  fullName: z.string(),
  email: z.string().email().max(70),
  password: z.string().min(6).max(30),
  gender: z.enum(["male", "female", "Other"]).default("male"),
  DOB: z.string(),
  country: z.string(),
});
export const signInInput = z.object({
  email: z.string().email().max(70),
  password: z.string().min(6).max(30),
});

