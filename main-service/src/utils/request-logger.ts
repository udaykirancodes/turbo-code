import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} : ${req.originalUrl}`);
  next();
};

export default requestLogger;
