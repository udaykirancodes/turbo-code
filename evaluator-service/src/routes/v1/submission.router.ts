import { Router } from "express";
import { SubmissionController } from "../../controller";
import { SubmissionZodSchema } from "../../types/submission.type";
import { validate } from "../../validators";

const submissionRouter = Router();

submissionRouter.post(
  "/",
  validate(SubmissionZodSchema),
  SubmissionController.addSubmission
);

export default submissionRouter;
