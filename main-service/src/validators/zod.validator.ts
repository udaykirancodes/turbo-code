import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";
import { ApiError, BadRequestError } from "../errors";

const validate = (schema: z.ZodObject<any>, isReqBody = true) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isReqBody) {
        schema.parse(req.body);
      } else {
        schema.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        let msg: string = "";
        error.errors.forEach((issue) => {
          issue.message;
        });
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(new BadRequestError(msg, error));
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            new ApiError(
              "Internal Server Error",
              StatusCodes.INTERNAL_SERVER_ERROR,
              "Internal Server Error",
              {}
            )
          );
      }
    }
  };
};

export default validate;
