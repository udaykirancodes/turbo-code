import { z } from "zod";

export const SubmissionZodSchema = z.object({
  code: z.string().min(1, { message: "lanaguage is required" }),
  language: z.string().min(1, { message: "language is required" }),
  input: z.string(),
  output: z.string().optional(),
});

export type SubmissionBodyRequest = z.infer<typeof SubmissionZodSchema>;
