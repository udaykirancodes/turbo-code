import { z } from "zod";

export const SubmissionZodSchema = z.object({
  type: z.enum(["RUN", "SUBMIT"]),
  problemId: z.string().min(1, "problem id is required"),
  code: z.string().min(1, { message: "code is required" }),
  language: z.string().min(1, { message: "language is required" }),
  input: z.string(),
  output: z.string().default(""),
  userId: z.string().min(1, "user id is required"),
  status: z.enum(["PENDING", "WA", "TLE", "MLE", "SUCCESS"]).default("PENDING"),
});

export type SubmissionType = z.infer<typeof SubmissionZodSchema>;
