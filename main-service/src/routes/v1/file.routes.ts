import { Router } from "express";
import fileController from "../../controllers/file.controller";
import { authorize } from "../../middlewares/authorize";
import {
  createFileRequestSchema,
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
  authorize,
  validate(updateFileSchema),
  fileController.updateFile
);
// Get users single file
fileRouter.get("/:id", authorize, fileController.getAuthorisedFile);

export default fileRouter;
