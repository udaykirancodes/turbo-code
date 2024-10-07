import SubmissionRepository from "../repositories/submission.repository";
import { SubmissionReqBodyType } from "../types/submission.type";

class SubmissionService {
  private submissionRepository: SubmissionRepository;
  constructor(submissionRepository: SubmissionRepository) {
    this.submissionRepository = submissionRepository;
  }
  private async addSubmissionToQueue() {
    console.log("Adding Submission to Queue : WIP");
    // TODO : get the problem related input output cases & codeStubs and add to the queue
  }
  async createSubmission(data: SubmissionReqBodyType) {
    if (data.type === "RUN") {
      // no need to store in the db
      this.addSubmissionToQueue();
      return {};
    } else {
      // store in the db
      const { type, ...others } = data;
      const submission = await this.submissionRepository.addSubmission(others);
      this.addSubmissionToQueue();
      return submission;
    }
  }
  async getSubmissionById(id: string) {
    const submission = await this.submissionRepository.getSubmissionById(id);
    return submission;
  }
}

export default SubmissionService;
