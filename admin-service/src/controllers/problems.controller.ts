import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "../config";
import { NotFoundError } from "../errors";
import { ProblemRepository } from "../repositories";
import { ProblemService } from "../services";
import ApiResponse from "../utils/api.request";

const problemService = new ProblemService(new ProblemRepository());

// Get All Problems
async function getProblems(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Get All Problems");
    const problems = await problemService.getProblems();
    if (!problems) {
      return new NotFoundError("Problems Not Found", {});
    }
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "Fetched Successfully", problems));
  } catch (error) {
    next(error);
  }
}
// Add a Problem
async function createProblem(req: Request, res: Response, next: NextFunction) {
  try {
    const problems = await problemService.createProblem(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(StatusCodes.CREATED, "Created successfully", problems)
      );
  } catch (error) {
    next(error);
  }
}
// Get Single Problem
async function getProblem(req: Request, res: Response, next: NextFunction) {
  try {
    const problem = await problemService.getProblem(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "Fetched Successfully", problem));
  } catch (error) {
    next(error);
  }
}
// delete single problem
async function deleteProblem(req: Request, res: Response, next: NextFunction) {
  try {
    const problemId = await problemService.deleteProblem(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "Deleted Successfully", problemId));
  } catch (error) {
    next(error);
  }
}
// delete single problem
async function editProblem(req: Request, res: Response, next: NextFunction) {
  try {
    const problemId = await problemService.editProblem(req.params.id, req.body);
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, "Edited Successfully", problemId));
  } catch (error) {
    next(error);
  }
}
export default {
  getProblems,
  getProblem,
  createProblem,
  deleteProblem,
  editProblem,
};
