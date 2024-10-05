import { Router } from "express";
import submissionRouter from "./submission.router";
const v1Router = Router();

v1Router.use("/submit", submissionRouter);

export default v1Router;
