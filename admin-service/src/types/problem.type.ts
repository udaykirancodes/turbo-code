import { z } from "zod"

const TestCaseZodSchema = z.object({
  input: z.array(z.string()).optional(),
  output: z.array(z.string()).optional()
})

const CodeStub = z.object({
  language: z.enum(["CPP", "PYTHON"]),
  startSnippet: z.string().min(1, "start snippet code is required"),
  endSnippet: z.string().min(1, "end snippet code is required"),
  userSnippet: z.string().min(1, "user snippet is required")
})

const ProblemZodSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  testCases: z.array(TestCaseZodSchema).optional(),
  codeStubs: z.array(CodeStub).optional(),
  editorial: z.string().min(1, "Editorial is required")
})

type ProblemType = z.infer<typeof ProblemZodSchema>

export { ProblemType, ProblemZodSchema }
