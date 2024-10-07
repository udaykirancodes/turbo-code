import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import SubmissionRepository from "../repositories/submission.repository";
import SubmissionService from "../services/submission.services";
import { SubmissionReqBodyType } from "../types/submission.type";
import ApiResponse from "../utils/api.request";

const submissionService = new SubmissionService(new SubmissionRepository());

// Add a Problem
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

export default { addSubmission };
