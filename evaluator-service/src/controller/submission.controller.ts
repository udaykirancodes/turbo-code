import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addJobToQueue } from "../msg-queque";
import { SubmissionBodyRequest } from "../types/submission.type";
import { ApiResponse } from "../utils";

const addSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as SubmissionBodyRequest;
  await addJobToQueue(data);
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .json(new ApiResponse(StatusCodes.NOT_IMPLEMENTED, "Not Implemented", {}));
};

export default { addSubmission };
