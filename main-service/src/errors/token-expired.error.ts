import { StatusCodes } from "http-status-codes";
import ApiError from "./api.error";

class UnAuthorizedError extends ApiError {
  constructor(message: string, error: any) {
    super("Token Expired Error", StatusCodes.UNAUTHORIZED, message, error);
  }
}

export default UnAuthorizedError;
