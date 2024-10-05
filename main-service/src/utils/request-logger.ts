import { NextFunction, Request, Response } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.info(`${req.method} : ${req.originalUrl}`);
  next();
};

export default requestLogger;
