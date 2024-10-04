import { StatusCodes } from "http-status-codes";
import ApiError from "./api.error";

class BadRequestError extends ApiError {
  constructor(message: string, error: any) {
    super("Bad Request Error", StatusCodes.BAD_REQUEST, message, error);
  }
}

export default BadRequestError;
