import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import UserRepository from "../repositories/user.repository";
import UserSerivice from "../services/user.services";
import { CreateUserType } from "../types/user.type";
import ApiResponse from "../utils/api.request";
import { logger } from "../utils/logger";

const userService = new UserSerivice(new UserRepository());

// Get All Problems
async function createUser(
  req: Request<{}, {}, CreateUserType>, // {req.params} , {} , {req.body}
  res: Response,
  next: NextFunction
) {
  logger.info("user-controller : create user");
  try {
    const token = await userService.createUser(req.body);
    console.log("token ; ", token);
    if (!token) {
      throw new BadRequestError("Unable to create a user", {});
    }
    return res.status(StatusCodes.OK).json(
      new ApiResponse(StatusCodes.OK, "Created Successfully", {
        token: token,
      })
    );
  } catch (error) {
    next(error);
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  logger.info("user-controller : login user");
  try {
    const token = await userService.loginUser(req.body);
    console.log("token ; ", token);
    if (!token) {
      throw new BadRequestError("Unable to create a user", {});
    }
    return res.status(StatusCodes.OK).json(
      new ApiResponse(StatusCodes.OK, "Created Successfully", {
        token: token,
      })
    );
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  loginUser,
};
