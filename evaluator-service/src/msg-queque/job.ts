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
      this.data.output = res.output;
      this.data.status = res.status;
      console.log("Here : ", this.data);
    }
  };
  failed = () => {};
}
export default ExecutionJob;
