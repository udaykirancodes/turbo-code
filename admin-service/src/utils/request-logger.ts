import { NextFunction, Request, Response } from "express";
import { logger } from "../config";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} : ${req.originalUrl}`);
  next();
};

export default requestLogger;
