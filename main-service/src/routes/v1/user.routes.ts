import { Router } from "express";
import { userController } from "../../controllers";
import { createUserSchema } from "../../types/user.type";
import { validate } from "../../validators";

const userRouter = Router();

userRouter.post(
  "/register",
  validate(createUserSchema),
  userController.createUser
);

export default userRouter;
