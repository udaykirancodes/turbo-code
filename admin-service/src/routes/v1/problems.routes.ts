import { Router } from "express";
import { problemsController } from "../../controllers";
import { ProblemZodSchema } from "../../types/problem.type";
import validate from "../../validators/zod.validator";

const problemRouter = Router();

// get all problems
problemRouter.get("/", problemsController.getProblems);

// create a problem
problemRouter.post(
  "/",
  validate(ProblemZodSchema),
  problemsController.createProblem
);

// get single problem
problemRouter.get("/:id", problemsController.getProblem);

// delete problem
problemRouter.delete("/:id", problemsController.deleteProblem);

// edit problem
problemRouter.patch("/:id", problemsController.editProblem);

export default problemRouter;
