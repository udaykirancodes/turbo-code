import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, InternalServerError } from "../errors";
import ApiResponse from "./api.request";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, err.message, err.error));
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(
      new ApiResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        new InternalServerError(err.message, err)
      )
    );
}

export default errorHandler;
