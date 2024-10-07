import { Router } from "express";

import problemRouter from "./problems.routes";
import submissionRouter from "./submission.routes";

const v1Router = Router();

v1Router.use("/problems", problemRouter);
v1Router.use("/submission", submissionRouter);

export default v1Router;
