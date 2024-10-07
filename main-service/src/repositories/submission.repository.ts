import { Submissions } from "../models";
import { SubmissionSchemaType } from "../types/submission.type";

class SubmissionRepository {
  // Adds the Submission
  async addSubmission(data: SubmissionSchemaType) {
    try {
      const submission = await Submissions.create(data);
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
