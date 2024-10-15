import cppRunner from "../docker/services/cpp-runner";
import { SubmissionType } from "../types/submission.type";

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
      console.info("Result of CPP : ", res);
    }
  };
  failed = () => {};
}
export default ExecutionJob;
