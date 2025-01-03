import { Router } from "express";

import userRouter from "./user.routes";

const v1Router = Router();

v1Router.use("/user", userRouter);

export default v1Router;
