import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import SubmissionRepository from "../repositories/submission.repository";
import SubmissionService from "../services/submission.services";
import { SubmissionReqBodyType } from "../types/submission.type";
import ApiResponse from "../utils/api.request";

const submissionService = new SubmissionService(new SubmissionRepository());

// Add a submission
async function addSubmission(req: Request, res: Response, next: NextFunction) {
  try {
    const submission = await submissionService.createSubmission(
      req.body as SubmissionReqBodyType
    );
    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          "Submission created successfully",
          submission
        )
      );
  } catch (error) {
    next(error);
  }
}

async function getSubmissionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id || "";
    const submission = await submissionService.getSubmissionById(id);
    if (!submission) {
      return new NotFoundError("submission not found", {});
    }
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "fetched submission", submission));
  } catch (error) {
    next(error);
  }
}
export default { addSubmission, getSubmissionById };
