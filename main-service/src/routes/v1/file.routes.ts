import { Router } from "express";
import fileController from "../../controllers/file.controller";
import { authorize } from "../../middlewares/authorize";
import {
  createFileRequestSchema,
  updateFileSchema,
} from "../../types/file.type";
import { validate } from "../../validators";

const fileRouter = Router();

fileRouter.post(
  "/",
  authorize,
  validate(createFileRequestSchema),
  fileController.createFile
);
fileRouter.put(
  "/:id",
  authorize,
  validate(updateFileSchema),
  fileController.updateFile
);

export default fileRouter;
