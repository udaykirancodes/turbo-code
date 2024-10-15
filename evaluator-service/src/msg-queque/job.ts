import { COMPLETED_JOB_NAME, COMPLETED_QUEUE_NAME } from "../constants";
import cppRunner from "../docker/services/cpp-runner";
import { SubmissionType } from "../types/submission.type";
import addJobToQueue from "./add-job";

class ExecutionJob {
  data: SubmissionType;
  constructor(data: SubmissionType) {
    this.data = data;
  }
  handle = async () => {
    if (this.data.language === "CPP") {
      const res = await cppRunner(
        this.data.code,
        this.data.input,
        this.data.output || ""
      );
      this.data.output = res.output;
      this.data.status = res.status;
      // Add this submission to anther Queue
      await addJobToQueue(COMPLETED_QUEUE_NAME, this.data, COMPLETED_JOB_NAME);
    }
  };
  failed = () => {};
}
export default ExecutionJob;
