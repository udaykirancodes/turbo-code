import { StatusCodes } from "http-status-codes";
import ApiError from "./api.error";

class NotFoundError extends ApiError {
  constructor(message: string, error: any) {
    super("Not Found Error", StatusCodes.NOT_FOUND, message, error);
  }
}

export default NotFoundError;
