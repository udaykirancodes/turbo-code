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
  //   getUserSubmissionsWithProblemId() {
  // This will fetch the user's submissions for a particular problem
  //   }
}

export default SubmissionRepository;
