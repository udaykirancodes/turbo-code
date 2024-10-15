import SubmissionRepository from "../repositories/submission.repository";
import SubmissionService from "../services/submission.services";
import { SubmissionQueueDataType } from "../types/submission.type";

const submissionService = new SubmissionService(new SubmissionRepository());

class EvaluatedJob {
  data: SubmissionQueueDataType;
  constructor(data: SubmissionQueueDataType) {
    this.data = data;
  }
  handle = async () => {
    if (this.data.type === "SUBMIT") {
      await submissionService.updateByIdField(this.data.id, this.data);
    }
    // Todo Update it to socket io server to send events to the user
  };
  failed = () => {};
}
export default EvaluatedJob;
