import { NotFoundError } from "../errors";
import { Submissions } from "../models";
import { SubmissionModelType } from "../types/submission.type";

class SubmissionRepository {
  // Adds the Submission
  async addSubmission(data: SubmissionModelType) {
    try {
      const submission = await Submissions.create(data);
      return submission;
    } catch (error) {
      throw error;
    }
  }
  // Find By id & Update
  async findByIdAndUpdate(id: string, data: SubmissionModelType) {
    try {
      const submission = await Submissions.findOneAndUpdate(
        { id: id },
        { ...data }
      );
      if (!submission) {
        throw new NotFoundError("Submission not found", {});
      }
      return submission;
    } catch (error) {
      throw error;
    }
  }
  async getSubmissionById(id: string) {
    try {
      const submission = await Submissions.findById(id);
      return submission;
    } catch (error) {
      throw error;
    }
  }
}

export default SubmissionRepository;
