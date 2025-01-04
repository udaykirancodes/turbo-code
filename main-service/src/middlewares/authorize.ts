import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { serverConfig } from "../config";
import { BadRequestError } from "../errors";
import UnAuthorizedError from "../errors/token-expired.error";
import { UserRepository } from "../repositories";
import UserSerivice, { CustomJwtPayload } from "../services/user.services";
import { logger } from "../utils/logger";

const userService = new UserSerivice(new UserRepository());

declare global {
  namespace Express {
    interface Request {
      email: string;
      password: string;
      user?: JwtPayload;
    }
  }
}

export async function authorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("middleware - isRegisteredUser");
  try {
    const token: string = req.header("Authorization") || "";
    if (!token) {
      throw new BadRequestError("autherisation token not found", {});
    }
    const decoded = jwt.verify(
      token,
      serverConfig.JWT_SECRET
    ) as CustomJwtPayload;
    const id = decoded.id;
    const user = await userService.getUserById(id);
    if (!user) {
      throw new BadRequestError("user not found", {});
    }
    req["user"] = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      next(new UnAuthorizedError(error.message, error));
    }
    next(error);
  }
}
