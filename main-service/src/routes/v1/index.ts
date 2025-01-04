import { Router } from "express";

import fileRouter from "./file.routes";
import userRouter from "./user.routes";

const v1Router = Router();

v1Router.use("/user", userRouter);
v1Router.use("/file", fileRouter);

export default v1Router;
