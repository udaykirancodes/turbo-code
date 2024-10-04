import { Router } from "express";

import problemRouter from "./problems.routes";

const v1Router = Router();

v1Router.use("/problems", problemRouter);

export default v1Router;
