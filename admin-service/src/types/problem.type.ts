import { z } from "zod";

const CodeStub = z.object({
  language: z.enum(["CPP", "PYTHON"]),
  startSnippet: z.string().min(1, "start snippet is required"),
  userSnippet: z.string().min(1, "user snippet is required"),
  endSnippet: z.string().min(1, "end snippet is required"),
});
const TestCaseZodSchema = z.object({
  input: z.string(z.string()).optional(),
  output: z.string(z.string()).optional(),
});

const ProblemZodSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  testCases: z.array(TestCaseZodSchema),
  codeStubs: z.array(CodeStub),
});

type ProblemType = z.infer<typeof ProblemZodSchema>;

export { ProblemType, ProblemZodSchema };
