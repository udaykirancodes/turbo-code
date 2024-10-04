import { z } from "zod";

const TestCaseZodSchema = z.object({
  input: z.array(z.string()).optional(),
  output: z.array(z.string()).optional(),
});

const ProblemZodSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  testCases: z.array(TestCaseZodSchema).optional(),
});

type ProblemType = z.infer<typeof ProblemZodSchema>;

export { ProblemType, ProblemZodSchema };
