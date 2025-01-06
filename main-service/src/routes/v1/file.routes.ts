import { Router } from "express";
import fileController from "../../controllers/file.controller";
import { authorize } from "../../middlewares/authorize";
import {
  createFileRequestSchema,
  slugSchema,
  updateFileSchema,
} from "../../types/file.type";
import { validate } from "../../validators";

const fileRouter = Router();

// Create File
fileRouter.post(
  "/",
  authorize,
  validate(createFileRequestSchema),
  fileController.createFile
);
// Get  User Files
fileRouter.get("/", authorize, fileController.getUserFiles);
// Update a File
fileRouter.put(
  "/:id",
  validate(updateFileSchema),
  authorize,
  fileController.updateFile
);
// Get user file by slug
fileRouter.get(
  "/:slug",
  validate(slugSchema, false),
  authorize,
  fileController.getAuthorisedFileBySlug
);

export default fileRouter;
