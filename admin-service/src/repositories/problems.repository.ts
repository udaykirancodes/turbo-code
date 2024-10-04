import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors";
import { Problems } from "../models";
import { ProblemType } from "../types/problem.type";

class ProblemRepository {
  // get all problems from mongodb
  async getProblems() {
    try {
      const problems = await Problems.find();
      if (!problems) {
        return new NotFoundError("Cannot Find Problems", {});
      }
      return problems;
    } catch (error) {
      throw error;
    }
  }
  // add problem
  async createProblem(data: ProblemType) {
    try {
      let problem = await Problems.findOne({ title: data.title });
      if (problem) {
        throw new BadRequestError("Problem already Exists", {});
      }
      problem = await Problems.create(data);
      return problem;
    } catch (error) {
      throw error;
    }
  }
  // get problem
  async getProblem(id: string) {
    try {
      const check = mongoose.isValidObjectId(id);
      if (!check) {
        throw new NotFoundError("Problem Not Found", {});
      }
      const problem = await Problems.findById(id);
      if (!problem) {
        throw new NotFoundError("Problem Not Found", {});
      }
      return problem;
    } catch (error) {
      throw error;
    }
  }
  // delete problem
  async deleteProblem(id: string) {
    try {
      const check = mongoose.isValidObjectId(id);
      if (!check) {
        throw new NotFoundError("Problem Not Found", {});
      }
      const problem = await Problems.findByIdAndDelete(id);
      if (!problem) {
        throw new NotFoundError("Problem Not Found", {});
      }
      return problem._id;
    } catch (error) {
      throw error;
    }
  }
  // edit problem
  async editProblem(id: string, data: Partial<ProblemType>) {
    try {
      const check = mongoose.isValidObjectId(id);
      if (!check) {
        throw new NotFoundError("Problem Not Found", {});
      }
      const problem = await Problems.findByIdAndUpdate(id, data, {
        returnDocument: "after",
      });
      if (!problem) {
        throw new NotFoundError("Problem Not Found", {});
      }
      return problem;
    } catch (error) {
      throw error;
    }
  }
}

export default ProblemRepository;
