import { z } from "zod";

export const SubmissionZodSchema = z.object({
  type: z.enum(["RUN", "SUBMIT"]),
  code: z.string().min(1, { message: "code is required" }),
  language: z.string().min(1, { message: "language is required" }),
  input: z.string(),
  output: z.string().default(""),
  userId: z.string().min(1, "user id is required"),
});

export type SubmissionBodyRequest = z.infer<typeof SubmissionZodSchema>;
