import { Router } from "express";
import { submissionController } from "../../controllers";
import { SubmissionReqBodySchema } from "../../types/submission.type";
import { validate } from "../../validators";

const submissionRouter = Router();

submissionRouter.post(
  "/",
  validate(SubmissionReqBodySchema),
  submissionController.addSubmission
);

submissionRouter.get("/:id", submissionController.getSubmissionById);

export default submissionRouter;
