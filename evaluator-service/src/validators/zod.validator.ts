import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils";

const validate = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        let msg: string = "";
        error.errors.forEach((issue) => {
          issue.message;
        });
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(new ApiResponse(StatusCodes.BAD_REQUEST, msg, {}));
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json("Something went wrong");
      }
    }
  };
};

export default validate;
