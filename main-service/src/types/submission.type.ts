import z from "zod";
const SubmissionReqBodySchema = z.object({
  type: z.enum(["RUN", "SUBMIT"]),
  problemId: z.string().min(1, "problem id is required"),
  userId: z.string().min(1, "user id is required"),
  userSnippet: z.string().min(1, "code is required"),
  language: z.enum(["CPP", "PYTHON"]),
});

const SubmissionQueueData = z.object({
  type: z.enum(["RUN", "SUBMIT"]),
  input: z.string(),
  output: z.string(),
  problemId: z.string().min(1, "problem id is required"),
  userId: z.string().min(1, "user id is required"),
  code: z.string().min(1, "user snippet is required"), // Changed from 'code' to 'userSnippet'
  language: z.enum(["CPP", "PYTHON"]),
  status: z.enum(["PENDING", "WA", "TLE", "MLE", "SUCCESS"]).default("PENDING"),
});

type SubmissionReqBodyType = z.infer<typeof SubmissionReqBodySchema>;
type SubmissionQueueDataType = z.infer<typeof SubmissionQueueData>;

export {
  SubmissionQueueDataType,
  SubmissionReqBodySchema,
  SubmissionReqBodyType,
};
