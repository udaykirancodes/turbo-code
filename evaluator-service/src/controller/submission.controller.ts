import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils";

const addSubmission = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .json(new ApiResponse(StatusCodes.NOT_IMPLEMENTED, "Not Implemented", {}));
};

export default { addSubmission };
