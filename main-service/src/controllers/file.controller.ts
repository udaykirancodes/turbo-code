import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import FileRepository from "../repositories/file.repository";
import FileService from "../services/file.services";
import { CustomJwtPayload } from "../services/user.services";
import {
  CreateFileRequestType,
  UpdateFileRequestType,
} from "../types/file.type";
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
    const user = req.user as CustomJwtPayload;

    const file = await fileService.createFile(req.body, user.id);
    if (!file) {
      throw new BadRequestError("Unable to create a user", {});
    }
    return res
      .status(StatusCodes.CREATED)
      .json(new ApiResponse(StatusCodes.CREATED, "Created Successfully", file));
  } catch (error) {
    next(error);
  }
}
// Update File
async function updateFile(
  req: Request<{ id: string }, {}, UpdateFileRequestType>, // {req.params} , {} , {req.body}
  res: Response,
  next: NextFunction
) {
  logger.info("file-controller : update file");
  try {
    const user = req.user as CustomJwtPayload;

    const fileId = Number(req.params.id);

    const file = await fileService.updateFile(req.body, user.id, fileId);

    if (!file) {
      throw new BadRequestError("Unable to update file", {});
    }
    return res
      .status(StatusCodes.CREATED)
      .json(new ApiResponse(StatusCodes.CREATED, "Updated Successfully", file));
  } catch (error) {
    next(error);
  }
}
// Get User Files
async function getUserFiles(
  req: Request<{}, {}, {}>, // {req.params} , {} , {req.body}
  res: Response,
  next: NextFunction
) {
  logger.info("file-controller : get user files");
  try {
    const user = req.user as CustomJwtPayload;

    const files = await fileService.getUserFiles(user.id);
    if (!files) {
      throw new BadRequestError("Unable to update file", {});
    }
    logger.debug("all the files : ", files);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(StatusCodes.OK, "Files fetched successfully", files)
      );
  } catch (error) {
    next(error);
  }
}
// Get Authorized File
async function getAuthorisedFile(
  req: Request<{ id: string }, {}, {}>, // {req.params} , {} , {req.body}
  res: Response,
  next: NextFunction
) {
  logger.info("file-controller : get user files");
  try {
    const user = req.user as CustomJwtPayload;

    const fileId = Number(req.params.id);

    const file = await fileService.getAuthorizedFileById(user.id, fileId);
    if (!file) {
      throw new BadRequestError("Unable get the file", {});
    }
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "File fetched successfully", file));
  } catch (error) {
    next(error);
  }
}
// Get Authorized File
async function getAuthorisedFileBySlug(
  req: Request<{ slug: string }, {}, {}>, // {req.params} , {} , {req.body}
  res: Response,
  next: NextFunction
) {
  logger.info("file-controller : get user files");
  try {
    const user = req.user as CustomJwtPayload;

    const slug = req.params.slug;

    const file = await fileService.getAuthorizedFileBySlug(user.id, slug);
    if (!file) {
      throw new BadRequestError("Unable get the file", {});
    }
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "File fetched successfully", file));
  } catch (error) {
    next(error);
  }
}

export default {
  createFile,
  updateFile,
  getUserFiles,
  getAuthorisedFile,
  getAuthorisedFileBySlug,
};
