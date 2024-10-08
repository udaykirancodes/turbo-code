import z from "zod";
const SubmissionReqBodySchema = z.object({
  type: z.enum(["RUN", "SUBMIT"]),
  problemId: z.string().min(1, "problem id is required"),
  userId: z.string().min(1, "user id is required"),
  userSnippet: z.string().min(1, "code is required"),
  language: z.enum(["CPP", "PYTHON"]),
  status: z.enum(["PENDING", "WA", "TLE", "MLE", "SUCCESS"]).default("PENDING"),
});

const SubmissionSchema = z.object({
  problemId: z.string().min(1, "problem id is required"),
  userId: z.string().min(1, "user id is required"),
  userSnippet: z.string().min(1, "code is required"),
  language: z.enum(["CPP", "PYTHON"]),
  status: z.enum(["PENDING", "WA", "TLE", "MLE", "SUCCESS"]).default("PENDING"),
});

type SubmissionReqBodyType = z.infer<typeof SubmissionReqBodySchema>;
type SubmissionSchemaType = z.infer<typeof SubmissionSchema>;

export {
  SubmissionReqBodySchema,
  SubmissionReqBodyType,
  SubmissionSchema,
  SubmissionSchemaType,
};
