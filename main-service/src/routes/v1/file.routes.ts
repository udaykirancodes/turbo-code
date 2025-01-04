import { Router } from "express";
import fileController from "../../controllers/file.controller";
import { authorize } from "../../middlewares/authorize";
import { createFileRequestSchema } from "../../types/file.type";
import { validate } from "../../validators";

const fileRouter = Router();

fileRouter.post(
  "/",
  authorize,
  validate(createFileRequestSchema),
  fileController.createFile
);

export default fileRouter;
