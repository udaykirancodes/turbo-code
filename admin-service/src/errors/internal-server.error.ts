import { StatusCodes } from "http-status-codes";
import ApiError from "./api.error";

class InternalServerError extends ApiError {
  constructor(message: string, error: any) {
    super(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      error
    );
  }
}

export default InternalServerError;
