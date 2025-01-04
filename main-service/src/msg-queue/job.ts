import { SubmissionQueueDataType } from "../types/submission.type";
import { NOTIFY_JOB, NOTIFY_QUEUE } from "../utils/constants";
import addJobToQueue from "./add-job";

class EvaluatedJob {
  data: SubmissionQueueDataType;
  constructor(data: SubmissionQueueDataType) {
    this.data = data;
  }
  handle = async () => {
    if (this.data.type === "SUBMIT") {
      // await submissionService.updateByIdField(this.data.id, this.data);
    }
    await addJobToQueue(NOTIFY_QUEUE, this.data, NOTIFY_JOB);
  };
  failed = () => {};
}
export default EvaluatedJob;
