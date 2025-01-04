import { Router } from "express";
import { userController } from "../../controllers";
import { createUserSchema, loginUserRequest } from "../../types/user.type";
import { validate } from "../../validators";

const userRouter = Router();

userRouter.post(
  "/register",
  validate(createUserSchema),
  userController.createUser
);
userRouter.post("/login", validate(loginUserRequest), userController.loginUser);

export default userRouter;
