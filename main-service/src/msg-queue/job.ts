import { SubmissionQueueDataType } from "../types/submission.type";

class EvaluatedJob {
  data: SubmissionQueueDataType;
  constructor(data: SubmissionQueueDataType) {
    this.data = data;
  }
  handle = async () => {
    console.log("Result : ", this.data);
  };
  failed = () => {};
}
export default EvaluatedJob;
