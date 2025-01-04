import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import FileRepository from "../repositories/file.repository";
import FileService from "../services/file.services";
import { CreateFileRequestType } from "../types/file.type";
import ApiResponse from "../utils/api.request";
import { logger } from "../utils/logger";

const fileService = new FileService(new FileRepository());

// Get All Problems
async function createFile(
  req: Request<{}, {}, CreateFileRequestType>, // {req.params} , {} , {req.body}
  res: Response,
  next: NextFunction
) {
  logger.info("file-controller : create file");
  try {
    const file = await fileService.createFile(req.body, 1);
    if (!file) {
      throw new BadRequestError("Unable to create a user", {});
    }
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "Created Successfully", file));
  } catch (error) {
    next(error);
  }
}

export default {
  createFile,
};
