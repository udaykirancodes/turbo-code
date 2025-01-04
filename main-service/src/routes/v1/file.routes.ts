import { Router } from "express";
import fileController from "../../controllers/file.controller";
import { createFileRequestSchema } from "../../types/file.type";
import { validate } from "../../validators";

const fileRouter = Router();

fileRouter.post(
  "/",
  validate(createFileRequestSchema),
  fileController.createFile
);

export default fileRouter;
