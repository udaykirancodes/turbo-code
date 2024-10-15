import { z } from "zod";

const statusZodSchema = z
  .enum(["PENDING", "WA", "TLE", "MLE", "SUCCESS", "ERROR"])
  .default("PENDING");

export const SubmissionZodSchema = z.object({
  type: z.enum(["RUN", "SUBMIT"]),
  problemId: z.string().min(1, "problem id is required"),
  code: z.string().min(1, { message: "code is required" }),
  language: z.string().min(1, { message: "language is required" }),
  input: z.string(),
  output: z.string().default(""),
  userId: z.string().min(1, "user id is required"),
  status: statusZodSchema,
  id: z.string().uuid(),
});

export type SubmissionType = z.infer<typeof SubmissionZodSchema>;
export type StatusType = z.infer<typeof statusZodSchema>;
