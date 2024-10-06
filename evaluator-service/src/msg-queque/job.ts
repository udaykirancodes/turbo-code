import cppRunner from "../docker/services/cpp-runner";
import { SubmissionBodyRequest } from "../types/submission.type";

class ExecutionJob {
  data: SubmissionBodyRequest;
  constructor(data: SubmissionBodyRequest) {
    this.data = data;
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
  failed = () => {};
}
export default ExecutionJob;
