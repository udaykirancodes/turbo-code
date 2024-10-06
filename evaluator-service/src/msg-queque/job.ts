import { Job } from "bullmq";
import cppRunner from "../docker/services/cpp-runner";
import { SubmissionBodyRequest } from "../types/submission.type";

class ExecutionJob {
  name: string;
  data: SubmissionBodyRequest;
  constructor(name: string, data: SubmissionBodyRequest) {
    this.data = data;
    this.name = name;
  }
  handle = async () => {
    if (this.data.language === "CPP") {
      const res = await cppRunner(
        this.data.code,
        this.data.input,
        this.data.output || ""
      );
      console.log(res);
    }
  };
  failed = (job: Job) => {
    if (job) {
      console.log(job?.id);
    }
  };
}
export default ExecutionJob;
